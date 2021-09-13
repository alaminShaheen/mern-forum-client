import IF from "Components/GenericComponents/IF";
import { InputHTMLAttributes, useState } from "react";
import { FormFeedback, Input } from "reactstrap";
import styled from "styled-components";

const StyledInput = styled(Input)`
	/* &:hover, */
	&:focus {
		border: 2px solid rgb(96, 165, 250);
		box-shadow: none;
	}
`;

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	errorText?: string;
	hasError?: boolean;
}

const InputField = ({ className, errorText, hasError, ...rest }: IInput) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<>
			<div style={{ position: "relative" }}>
				<IF predicate={rest.type === "password"}>
					<StyledInput {...rest} type={showPassword ? "text" : rest.type} invalid={!!hasError} />
					<IF predicate={!showPassword}>
						<i style={{ cursor: 'pointer', position: "absolute", top: `${hasError ? '20%' : '30%'}`, left: `${hasError ? '82%' : '90%'}` }} className="far fa-eye-slash" onClick={() => setShowPassword(!showPassword)} />
					</IF>
					<IF predicate={showPassword}>
						<i style={{ cursor: 'pointer', position: "absolute", top: `${hasError ? '20%' : '30%'}`, left: `${hasError ? '82%' : '90%'}` }} className="far fa-eye" onClick={() => setShowPassword(!showPassword)} />
					</IF>
				</IF>
				<IF predicate={rest.type !== "password"}>
					<StyledInput {...rest} invalid={!!hasError} />
				</IF>
				<IF predicate={!!hasError}>
					<FormFeedback>{errorText}</FormFeedback>
				</IF>
			</div>
		</>
	);
};

export default InputField;
