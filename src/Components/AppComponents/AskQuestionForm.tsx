import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import IF from "Components/GenericComponents/IF";
import InputField from "Components/GenericComponents/InputField";
import { Question } from "Models/question.models";
import { RegisterFormType } from "Pages/Register";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ModalBody, ModalFooter, Form, FormGroup, Label, Button } from "reactstrap";
import QuestionServices from "Services/question.services";
import { useUserContext } from "Store";

export type QuestionFormType = {
	Title: string;
	Description: string;
	CreatedBy: string;
};

interface IAskQuestionForm {
	handleClose: Function;
	setQuestions: Function;
}

const AskQuestionForm = ({ handleClose, setQuestions }: IAskQuestionForm) => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		control,
		formState: { errors }
	} = useForm<QuestionFormType>();
	const [loading, setLoading] = useState(false);
	const { userState, userDispatch } = useUserContext();
	const handleFormSubmit: SubmitHandler<QuestionFormType> = async (formData) => {
		setLoading(true);
		try {
			const { data }: any = await QuestionServices.postQuestion({ ...formData, CreatedBy: `${userState?.FirstName ?? "User"} ${userState?.LastName}` });
			setQuestions((prev: Question[]) => [new Question(data), ...prev]);
			handleClose();
		} catch (error: any) {
			console.log(error.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<ModalBody>
				<Form onSubmit={handleSubmit(handleFormSubmit)}>
					<FormGroup className="mt-2">
						<Label for="Title">Title</Label>
						<Controller
							name="Title"
							control={control}
							rules={{
								required: "Title is required",
								maxLength: {
									value: 40,
									message: "Question title cannot be greater than 40 characters"
								}
							}}
							render={({ field }) => <InputField hasError={!!errors.Title} errorText={errors.Title?.message} type="text" placeholder="Enter your question" {...field} />}
						/>
					</FormGroup>
					<FormGroup className="mt-2">
						<Label for="Description">Description</Label>
						<Controller
							name="Description"
							control={control}
							rules={{ required: "Description is required" }}
							render={({ field }) => (
								<InputField
									style={{ height: "10rem" }}
									hasError={!!errors.Description}
									errorText={errors.Description?.message}
									type="textarea"
									placeholder="Enter a description"
									{...field}
								/>
							)}
						/>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<ButtonComponent style={{ backgroundColor: "green", color: "white", width: "8rem" }} buttonText="Post" disabled={loading} onClick={handleSubmit(handleFormSubmit)}>
					<IF predicate={!loading}>
						<i style={{ color: "white" }} className="fas fa-check mr-3" />
					</IF>
				</ButtonComponent>
				<ButtonComponent style={{ backgroundColor: "tomato", color: "white", width: "8rem" }} buttonText="Cancel" color="secondary" onClick={() => handleClose()}>
					<IF predicate={!loading}>
						<i style={{ color: "white" }} className="fas fa-ban mr-3" />
					</IF>
				</ButtonComponent>
			</ModalFooter>
		</>
	);
};

export default AskQuestionForm;
