import { relativeTimeFromDates } from "Helpers/time.helper";
import { Question } from "Models/question.models";
import { useLocation, useParams, withRouter } from "react-router";
import { CardText, Container } from "reactstrap";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import Answers from "Components/AppComponents/Answers";

interface ParamTypes {
	postId: string;
}

interface IPost {
	question: Question;
}

const StyledParagraph = styled.p`
	font-size: medium;
	margin-top: 1.5em;
`;

const Post = () => {
	const { postId: questionId } = useParams<ParamTypes>();
	const { question } = useLocation<IPost>().state;
	console.log(question);
	return (
		<Container style={{ paddingTop: "2em" }}>
			<CardText>
				<small className="text-muted">
					{`Posted ${relativeTimeFromDates(new Date(question.CreatedAt))} by `} <span style={{ color: "black", fontWeight: 400, fontStyle: "italic" }}>{question.CreatedBy}</span>
				</small>
			</CardText>
			<h3>{question.Title}</h3>
			<StyledParagraph>{question.Description}</StyledParagraph>
			<Answers answers={question.Answers} questionId={questionId}  />
		</Container>
	);
};

export default withRouter(Post);
