import SingleQuestion from "Components/AppComponents/Question";
import { Question } from "Models/question.models";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import styled from "styled-components";

interface IQuestions {
	questionsData: Question[];
}

const Questions = ({ questionsData }: IQuestions) => {

	return (
		<Container className="mb-5">
			{questionsData.map((question) => (
				<SingleQuestion question={question} key={question.Id} />
			))}
		</Container>
	);
};

export default Questions;
