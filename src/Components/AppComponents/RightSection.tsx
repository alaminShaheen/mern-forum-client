import AskQuestionForm from "Components/AppComponents/AskQuestionForm";
import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import Modal from "Components/GenericComponents/Modal";
import { Question } from "Models/question.models";
import { useState } from "react";
import styled from "styled-components";

const RightSectionContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface IRightSection {
	setQuestions: Function;
}

const RightSection = ({setQuestions}: IRightSection) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<RightSectionContainer>
			<ButtonComponent onClick={() => setIsModalOpen(true)} style={{ width: "15rem", backgroundColor: "rgb(96, 165, 250)", borderColor: "rgb(96, 165, 250)" }} buttonText="Ask a question">
				<i className="fas fa-comment-medical mr-3"></i>
			</ButtonComponent>
			<Modal title="Ask a Question" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
				<AskQuestionForm handleClose={() => setIsModalOpen(false)} setQuestions={setQuestions} />
			</Modal>
		</RightSectionContainer>
	);
};

export default RightSection;
