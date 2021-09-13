import { Answer as AnswerModel } from "Models/answer.model";
import { useState } from "react";
import { CardText, Collapse, Input } from "reactstrap";
import * as BsIcons from "react-icons/bs";
import styled from "styled-components";
import Answer from "Components/AppComponents/Answer";
import AnswerServices from "Services/answer.services";
import { useUserContext } from "Store";

interface IAnswers {
	answers: AnswerModel[];
	questionId: string;
}

const StyledInput = styled(Input)`
	&:hover,
	&:focus {
		border: 2px solid rgb(96, 165, 250);
		box-shadow: none;
	}
	padding-right: 3em;
	height: 100px;
	overflow-y: hidden;
`;

const ReplyText = styled.small`
	font-size: small;
	cursor: pointer;
`;

const Answers = ({ answers: answerData, questionId }: IAnswers) => {
	const [answers, setAnswers] = useState<AnswerModel[]>(answerData);
	const [status, setStatus] = useState("Closed");
	const [answerText, setAnswerText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(true);
	const { userState, userDispatch } = useUserContext();

	const onEntering = () => setStatus("Opening...");

	const onEntered = () => setStatus("Opened");

	const onExiting = () => setStatus("Closing...");

	const onExited = () => setStatus("Closed");

	const postAnswer = async () => {
		setIsLoading(true);
		try {
			const { data }: any = await AnswerServices.postAnswer(questionId, { Description: answerText, CreatedBy: `${userState?.FirstName ?? "User"} ${userState.LastName}` });
			setAnswers((prev) => [...prev, new AnswerModel(data)]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!answerText) return;
		if (event.key === "Enter") {
			postAnswer();
		}
	};

	return (
		<div className="mt-2">
			{answers.length > 0 ? (
				<>
					<CardText onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
						<BsIcons.BsArrowReturnRight />
						{isOpen ? (
							<ReplyText className="ml-2 text-muted">Hide all replies</ReplyText>
						) : (
							<ReplyText className="ml-2 text-muted">{answers.length > 1 ? `View all ${answers.length} replies` : "View 1 reply"}</ReplyText>
						)}
					</CardText>
					<Collapse
						isOpen={isOpen}
						// onEntering={onEntering}
						// onEntered={onEntered}
						// onExiting={onExiting}
						// onExited={onExited}
					>
						{answers.map((answer) => (
							<Answer answer={answer} key={answer.Id} />
						))}
					</Collapse>
					<div style={{ position: "relative" }}>
						<StyledInput
							onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onEnterPress(e)}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
							value={answerText}
							className="my-3"
							placeholder="Write a reply..."
							type="textarea"
							name="text"
						/>
						<i onClick={() => answerText && postAnswer()} style={{ position: "absolute", top: "40%", right: "2%", cursor: "pointer" }} className="fas fa-paper-plane"></i>
					</div>
				</>
			) : (
				<CardText>
					<small className="text-muted">No replies posted yet.</small>
				</CardText>
			)}
		</div>
	);
};

export default Answers;
