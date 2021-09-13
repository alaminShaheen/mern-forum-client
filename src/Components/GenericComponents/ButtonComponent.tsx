import IF from "Components/GenericComponents/IF";
import { ReactNode } from "react";
import { Button, Spinner } from "reactstrap";
import styled from "styled-components";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonText: string;
	children?: ReactNode;
}

const StyledButton = styled(Button)`
	&:hover, &:focus, &:active {
		/* border: 2px solid rgb(96, 165, 250); */
		box-shadow: none;
	}
	&:disabled {
		opacity: 1;
	}
`;

const ButtonComponent = ({ buttonText, children, ...rest }: IButton) => {
	return (
		<StyledButton {...rest} color="primary">
			<IF predicate={!!children}>{children}</IF>
			<IF predicate={!!rest.disabled}>
				<Spinner size="sm" color="light" />
			</IF>
			<IF predicate={!rest.disabled}>{buttonText}</IF>
		</StyledButton>
	);
};

export default ButtonComponent;
