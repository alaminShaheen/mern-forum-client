import { Question } from "Models/question.models";
import { Answer as AnswerModel } from "Models/answer.model";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { withRouter } from "react-router";
import RightSection from "Components/AppComponents/RightSection";
import LeftSection from "Components/AppComponents/LeftSection";
import QuestionServices from "Services/question.services";
const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);

	const fetchAllQuestions = async () => {
		setIsLoading(true);
		try {
			const {
				data: { questions }
			} = await QuestionServices.getAllQuestions();
			setQuestions(
				questions
					.map((question: any) => {
						return new Question({
							...question,
							Answers: question.Answers.map((answer: any) => new AnswerModel(answer))
						});
					})
					.sort((a: Question, b: Question) => {
						const da = new Date(a.CreatedAt);
						const db = new Date(b.CreatedAt);
						return db.getTime() - da.getTime();
					})
			);
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllQuestions();
	}, []);

	return (
		<Container style={{ display: "flex", paddingTop: "2em" }}>
			<Col style={{ flexBasis: "70%" }}>
				<LeftSection questions={questions} />
				{/* <SearchBar setQuestions={setQuestions} />
				 */}
			</Col>
			<Col style={{ flexBasis: "30%" }}>
				<RightSection setQuestions={setQuestions} />
				{/* <Card className="mt-4 p-3" style={{ height: "50%" }}>
					yo mamam
				</Card> */}
			</Col>
		</Container>
	);
};

export default withRouter(Home);
