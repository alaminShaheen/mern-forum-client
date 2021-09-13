import { Link } from "react-router-dom";
import { Container, Form, FormGroup, Label } from "reactstrap";
import styled from "styled-components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useState } from "react";
import InputField from "Components/GenericComponents/InputField";
import { useAlertContext } from "Store";
import { displayAlert } from "Store/Alert/alertAction";
import { Alert, AlertType } from "Models/alert.model";
import { ALERT_TIMEOUT_DEFAULT_TIME } from "Constants/alert.constant";
import AlertMessage from "Components/GenericComponents/AlertMessage";
import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import Title from "Components/GenericComponents/Title";
import AuthServices from "Services/auth.services";

const StyledSpan = styled.span`
	text-decoration: none;
	color: cadetblue;
	font-weight: 500;
`;

export type RegisterFormType = {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
};

const Register = () => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		control,
		formState: { errors }
	} = useForm<RegisterFormType>();
	const [loading, setLoading] = useState(false);
	const { alertDispatch, alertState } = useAlertContext();

	const handleFormSubmit: SubmitHandler<RegisterFormType> = async (formData) => {
		setLoading(true);
		try {
			const { data }: any = await AuthServices.register(formData);
			alertDispatch(
				displayAlert(
					new Alert({
						Message: "User registered successfully",
						Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
						Type: AlertType.Success
					})
				)
			);
		} catch (error: any) {
			console.log(error.data.message);
			alertDispatch(
				displayAlert(
					new Alert({
						Message: error.data.message,
						Timeout: ALERT_TIMEOUT_DEFAULT_TIME,
						Type: AlertType.Error
					})
				)
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container style={{ width: '20%', minWidth: "25rem", height: "calc(100vh - 23px)", display: "flex", flexDirection: "column", justifyContent: "center", overflow: 'hidden' }}>
			<Title titleText="Sign Up"></Title>
			<AlertMessage alert={alertState} />
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<FormGroup className="mt-2">
					<Label for="FirstName">FirstName</Label>
					<Controller
						name="FirstName"
						control={control}
						rules={{ required: "First name is required" }}
						render={({ field }) => <InputField hasError={!!errors.FirstName} errorText={errors.FirstName?.message} type="text" placeholder="Enter your first name" {...field} />}
					/>
				</FormGroup>
				<FormGroup className="mt-4">
					<Label for="LastName">LastName</Label>
					<Controller
						name="LastName"
						rules={{ required: "Last name is required." }}
						control={control}
						render={({ field }) => <InputField hasError={!!errors.LastName} errorText={errors.LastName?.message} type="text" placeholder="Enter your last name" id="LastName" {...field} />}
					/>
				</FormGroup>
				<FormGroup className="mt-4">
					<Label for="Email">Email</Label>
					<Controller
						name="Email"
						rules={{
							required: "Email is required",
							pattern: {
								value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Please enter a valid email"
							}
						}}
						control={control}
						render={({ field }) => <InputField hasError={!!errors.Email} errorText={errors.Email?.message} type="text" placeholder="Enter your email" id="Email" {...field} />}
					/>
				</FormGroup>
				<FormGroup className="mt-4">
					<Label for="Password">Password</Label>
					<Controller
						name="Password"
						rules={{
							required: "Password is required"
						}}
						control={control}
						render={({ field }) => (
							<InputField type="password" id="Password" placeholder="Enter your password" hasError={!!errors.Password} errorText={errors.Password?.message} {...field} />
						)}
					/>
				</FormGroup>
				<ButtonComponent buttonText="Register" disabled={loading} onClick={handleSubmit(handleFormSubmit)} style={{width: "10rem", display: "block", margin: "2em auto"}} />
				<p style={{ textAlign: "center", fontWeight: 500 }}>
					Already have an account?{" "}
					<Link to={"/login"}>
						<StyledSpan>Sign In</StyledSpan>
					</Link>
				</p>
			</Form>
		</Container>
	);
};

export default Register
