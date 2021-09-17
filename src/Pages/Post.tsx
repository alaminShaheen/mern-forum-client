import { relativeTimeFromDates } from 'Helpers/time.helper';
import { Question } from 'Models/question.models';
import { useLocation, useParams, withRouter } from 'react-router';
import { CardText, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, UncontrolledDropdown } from 'reactstrap';
import styled from 'styled-components';
import Answers from 'Components/AppComponents/Answers';
import { useEffect, useState } from 'react';
import QuestionServices from 'Services/question.services';
import IF from 'Components/GenericComponents/IF';
import InputField from 'Components/GenericComponents/InputField';
import { Controller, useForm } from 'react-hook-form';
import { QuestionFormType } from 'Components/AppComponents/AskQuestionForm';
import ButtonComponent from 'Components/GenericComponents/ButtonComponent';

interface ParamTypes {
    postId: string;
}

interface IPost {
    question: Question;
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

const Post = () => {
    const { postId: questionId } = useParams<ParamTypes>();
    const [question, setQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState(false);
    const [convertToTextField, setConvertToTextField] = useState(false);
    const [bufferTitle, setBufferTitle] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        formState: { errors },
    } = useForm<QuestionFormType>();

    const fetchQuestion = async () => {
        setIsLoading(true);
        try {
            const { data }: any = await QuestionServices.getQuestion(questionId);
            setQuestion(new Question(data.question));
            setBufferTitle(data.question.Title);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const editQuestion = async () => {};

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <Container className="pt-5 position-relative">
            <IF predicate={!isLoading}>
                {question && (
                    <>
                        <CardText className="d-flex justify-content-between align-content-center">
                            <small className="text-muted">
                                {`Posted ${relativeTimeFromDates(new Date(question.CreatedAt))} by `} <span style={{ color: 'black', fontWeight: 400, fontStyle: 'italic' }}>{question.CreatedBy}</span>
                            </small>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle tag="span" style={{ cursor: 'pointer' }} className="border-0 bg-white pointer-event">
                                    <StyledGear className="fas fa-cog" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setConvertToTextField(!convertToTextField)}>Edit</DropdownItem>
                                    <DropdownItem onClick={() => {}}>Delete</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardText>
                        {convertToTextField ? (
                            <Form className="d-flex flex-column">
                                <Controller name="Title" control={control} defaultValue={bufferTitle} render={({ field }) => <InputField style={{ fontSize: '2rem', marginBottom: '0.5rem' }} hasError={!!errors.Title} errorText={errors.Title?.message} type="text" {...field} />} />
                                <Controller name="Description" control={control} defaultValue={bufferTitle} render={({ field }) => <InputField hasError={!!errors.Title} errorText={errors.Title?.message} type="text" {...field} />} />
                                <div className="align-self-end">
                                    <ButtonComponent buttonText="Update" disabled={false} style={{ width: '5rem', margin: '1em 0.5em' }} />
                                    <ButtonComponent buttonText="Cancel" onClick={() => setConvertToTextField(false)} disabled={false} style={{ width: '5rem', margin: '1em 0' }} />
                                </div>
                            </Form>
                        ) : (
                            <>
                                <h3>{bufferTitle}</h3>
                                <StyledParagraph>{question.Description}</StyledParagraph>
                            </>
                        )}
                    </>
                )}
            </IF>
            {question && <Answers answers={question.Answers} questionId={questionId} />}
            <IF predicate={isLoading}>
                <div className="dot-flashing position-absolute" style={{ top: '600%', left: '50%' }}></div>
            </IF>
        </Container>
    );
}

export default withRouter(Post);
