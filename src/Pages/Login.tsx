import AlertMessage from "Components/GenericComponents/AlertMessage";
import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import InputField from "Components/GenericComponents/InputField";
import Title from "Components/GenericComponents/Title";
import { ALERT_TIMEOUT_DEFAULT_TIME } from "Constants/alert.constant";
import { AlertType, Alert } from "Models/alert.model";
import { Token } from "Models/token.model";
import { User } from "Models/user.model";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, FormGroup, Label } from "reactstrap";
import AuthServices from "Services/auth.services";
import { useAlertContext, useTokenContext, useUserContext } from "Store";
import { displayAlert } from "Store/Alert/alertAction";
import { updateToken } from "Store/Token/tokenAction";
import { updateUser } from "Store/User/userAction";
import styled from "styled-components";

export type LoginFormType = {
	Email: string;
	Password: string;
};

const StyledSpan = styled.span`
	text-decoration: none;
	color: cadetblue;
	font-weight: 500;
`;

const Login = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<LoginFormType>();
	const [loading, setLoading] = useState(false);
	const { alertDispatch, alertState } = useAlertContext();
	const { tokenDispatch } = useTokenContext();
	const { userDispatch } = useUserContext();
	const history = useHistory();

	const handleFormSubmit: SubmitHandler<LoginFormType> = async (formData) => {
		setLoading(true);
		try {
			const {
				data: { AccessToken, RefreshToken, User: user }
			}: any = await AuthServices.login(formData);
			tokenDispatch(updateToken(new Token({ AccessToken, RefreshToken })));
			userDispatch(updateUser(new User(user)));
			history.push("/");
		} catch (error: any) {
			console.error(error);
			alertDispatch(
				displayAlert(
					new Alert({
						Message: error.data?.message || "An unexpected error occurred",
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
		<Container style={{ width: '20%', minWidth: "25rem", height: "calc(100vh - 23px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
			<Title titleText="Sign In"></Title>
			<AlertMessage alert={alertState} />
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
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
				<ButtonComponent buttonText="Login" disabled={loading} onClick={handleSubmit(handleFormSubmit)} style={{width: "10rem", display: "block", margin: "2em auto"}} />
				<p style={{ textAlign: "center", fontWeight: 500 }}>
					Don't have an account?{" "}
					<Link to={"/register"}>
						<StyledSpan>Sign Up</StyledSpan>
					</Link>
				</p>
			</Form>
		</Container>
	);
};

export default Login;
