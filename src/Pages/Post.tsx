import { relativeTimeFromDates } from "Helpers/time.helper";
import { Question } from "Models/question.models";
import { useHistory, useLocation, useParams, withRouter } from "react-router";
import { Alert, CardText, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, UncontrolledDropdown } from "reactstrap";
import styled from "styled-components";
import Answers from "Components/AppComponents/Answers";
import { useEffect, useState } from "react";
import QuestionServices from "Services/question.services";
import IF from "Components/GenericComponents/IF";
import InputField from "Components/GenericComponents/InputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { QuestionFormType } from "Components/AppComponents/AskQuestionForm";
import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import { ALERT_TIMEOUT_DEFAULT_TIME } from "Constants/alert.constant";
import { AlertType, Alert as AlertModel } from "Models/alert.model";
import { clearAlert, displayAlert } from "Store/Alert/alertAction";
import { useAlertContext } from "Store";
import AlertMessage from "Components/GenericComponents/AlertMessage";
import WarningModal from "Components/AppComponents/WarningModal";
import Modal from "Components/GenericComponents/Modal";
import logging from "Config/logging";

interface ParamTypes {
    postId: string;
}

interface IPost {
    prev: string;
}

const StyledParagraph = styled.p`
    font-size: medium;
    margin-top: 1em;
`;

const StyledGear = styled.i`
    &:hover {
        color: slateblue;
    }
`;

export type UpdateQuestionType = {
    Title: string;
    Description: string;
};

interface LocationState {
    from: string;
}

const Post = () => {
    const {
        state: { from },
    } = useLocation<LocationState>();
    const { postId: questionId } = useParams<ParamTypes>();
    const [question, setQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState(false);
    const [isPreFetching, setIsPreFetching] = useState(false);
    const [convertToTextField, setConvertToTextField] = useState(false);
    const [bufferTitle, setBufferTitle] = useState("");
    const [bufferDescription, setBufferDescription] = useState("");
    const [showWarningModal, setShowWarningModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        reset,
        formState: { errors },
    } = useForm<UpdateQuestionType>();
    const { alertDispatch, alertState } = useAlertContext();
    const history = useHistory();

    const fetchQuestion = async () => {
        setIsPreFetching(true);
        try {
            const { data }: any = await QuestionServices.getQuestion(questionId);
            setQuestion(new Question(data.question));
            setBufferTitle(data.question.Title);
            setBufferDescription(data.question.Description);
        } catch (error) {
            console.error(error);
        } finally {
            setIsPreFetching(false);
        }
    };

    const updateQuestion: SubmitHandler<UpdateQuestionType> = async (formData) => {
        setIsLoading(true);
        alertState.Message = "";
        try {
            const { data }: any = await QuestionServices.updateQuestion({ Title: formData.Title, Description: formData.Description }, question?.Id!);
            console.log(data);
            alertDispatch(
                displayAlert(
                    new AlertModel({
                        Message: "Question updated successfully",
                        Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
                        Type: AlertType.Success,
                    })
                )
            );
        } catch (error: any) {
            console.log(error);
            alertDispatch(
                displayAlert(
                    new AlertModel({
                        Message: error.data?.message ?? "An unexpected error occurred",
                        Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
                        Type: AlertType.Error,
                    })
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEditing = () => {
        reset();
        setConvertToTextField(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data }: any = await QuestionServices.deleteQuestion(questionId);
            console.log(data);
            alertDispatch(
                displayAlert(
                    new AlertModel({
                        Message: "Question deleted successfully",
                        Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
                        Type: AlertType.Success,
                    })
                )
            );
            history.push("/");
        } catch (error: any) {
            logging.error(error);
            alertDispatch(
                displayAlert(
                    new AlertModel({
                        Message: error.data.message ?? "An unexpected error occurred",
                        Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
                        Type: AlertType.Error,
                    })
                )
            );
        } finally {
            setShowWarningModal(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
        return () => {
            if (alertState.Message.includes("updated") || alertState.Type === AlertType.Error) alertState.Message = "";
        };
    }, []);

    return (
        <Container className="pt-5 position-relative">
            <IF predicate={showWarningModal}>
                <Modal isModalOpen={showWarningModal} setIsModalOpen={setShowWarningModal} title="Confirm Delete">
                    <WarningModal
                        warningText="Are you sure you want to delete this post?"
                        handleConfirmation={handleDelete}
                        handleRejection={() => setShowWarningModal(false)}
                        handleClose={() => setShowWarningModal(false)}
                    />
                </Modal>
            </IF>
            <AlertMessage className="mb-4" />
            <IF predicate={!isPreFetching}>
                {question && (
                    <>
                        <CardText className="d-flex justify-content-between align-content-center">
                            <small className="text-muted">
                                {`Posted ${relativeTimeFromDates(new Date(question.CreatedAt))} by `}{" "}
                                <span style={{ color: "black", fontWeight: 400, fontStyle: "italic" }}>{question.CreatedBy}</span>
                            </small>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle tag="span" style={{ cursor: "pointer" }} className="border-0 bg-white pointer-event">
                                    <StyledGear className="fas fa-cog" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setConvertToTextField(true)}>Edit</DropdownItem>
                                    <DropdownItem onClick={() => setShowWarningModal(true)}>Delete</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardText>
                        {convertToTextField ? (
                            <Form onSubmit={handleSubmit(updateQuestion)} className="d-flex flex-column">
                                <Controller
                                    name="Title"
                                    control={control}
                                    defaultValue={bufferTitle}
                                    rules={{
                                        required: "Title is required",
                                        maxLength: {
                                            value: 100,
                                            message: "Question title cannot be greater than 100 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <InputField
                                            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                                            hasError={!!errors.Title}
                                            errorText={errors.Title?.message}
                                            disabled={isLoading}
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="Description"
                                    control={control}
                                    defaultValue={bufferDescription}
                                    rules={{ required: "Description is required" }}
                                    render={({ field }) => (
                                        <InputField
                                            style={{ height: "5rem" }}
                                            disabled={isLoading}
                                            hasError={!!errors.Description}
                                            errorText={errors.Description?.message}
                                            type="textarea"
                                            {...field}
                                        />
                                    )}
                                />
                                <div className="align-self-end">
                                    <ButtonComponent
                                        buttonText="Update"
                                        onClick={handleSubmit(updateQuestion)}
                                        disabled={isLoading}
                                        style={{ width: "5rem", margin: "1em 0.5em" }}
                                    />
                                    <ButtonComponent buttonText="Cancel" onClick={cancelEditing} style={{ width: "5rem", margin: "1em 0" }} />
                                </div>
                            </Form>
                        ) : (
                            <>
                                <h3>{question.Title}</h3>
                                <StyledParagraph>{question.Description}</StyledParagraph>
                            </>
                        )}
                    </>
                )}
            </IF>
            {question && <Answers answers={question.Answers} questionId={questionId} />}
            <IF predicate={isPreFetching}>
                <div className="dot-flashing position-absolute" style={{ top: "600%", left: "50%" }}></div>
            </IF>
        </Container>
    );
};

export default withRouter(Post);
