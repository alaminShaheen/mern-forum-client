import { Question } from "Models/question.models";
import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Collapse } from "reactstrap";
import styled from "styled-components";
import { relativeTimeFromDates } from "Helpers/time.helper";
import Answers from "Components/AppComponents/Answers";
import { Link } from "react-router-dom";
import { Answer } from "Models/answer.model";

interface ISingleQuestion {
	question: Question;
}

const StyledCardTitle = styled(CardTitle)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledCard = styled(Card)`
	&:hover {
		border: 1px solid skyblue;
	}
	cursor: pointer;
`;

const SingleQuestion = ({ question }: ISingleQuestion) => {
	const [isOpen, setIsOpen] = useState(false);

	console.log(question);

	return (
		<Link to={{ pathname: `/${question.Id}`, state: { question } }} style={{ color: "black", textDecoration: "none" }}>
			<StyledCard className="mb-4">
				<CardBody>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<CardText>
								<small className="text-muted">
									{`Posted ${relativeTimeFromDates(new Date(question.CreatedAt))} by `}{" "}
									<span style={{ color: "black", fontWeight: 400, fontStyle: "italic" }}>{question.CreatedBy}</span>
								</small>
							</CardText>
							<StyledCardTitle tag="h5">{question.Title}</StyledCardTitle>
							<CardText>{question.Description}</CardText>
						</div>
						{/* {question.Answers.length > 0 && (collapse ? <AiIcons.AiFillCaretUp /> : <AiIcons.AiFillCaretDown />)} */}
					</div>
					<div className="mt-2">
						<CardText>
							{question.Answers.length > 0 ? (
								<small className="text-muted">{question.Answers.length > 1 ? `${question.Answers.length} replies` : "1 reply"}</small>
							) : (
								<small className="text-muted">No replies posted yet.</small>
							)}
						</CardText>
					</div>
					{/* <Answers key={21983123} questionId={question.Id} answers={question.Answers} /> */}
				</CardBody>
			</StyledCard>
		</Link>
	);
};

export default SingleQuestion;
