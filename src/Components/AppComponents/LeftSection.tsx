import Questions from "Components/AppComponents/Questions";
import { Answer } from "Models/answer.model";
import { Question } from "Models/question.models";
import { useState, useEffect } from "react";
import QuestionServices from "Services/question.services";

interface ILeftSection {
    questions: Question[]
}

const LeftSection = ({questions}: ILeftSection) => {
	return <section>
        <Questions questionsData={questions} />
    </section>;
};

export default LeftSection;
