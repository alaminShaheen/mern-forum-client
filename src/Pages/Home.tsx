import { Question } from "Models/question.models";
import { Answer as AnswerModel } from "Models/answer.model";
import { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { withRouter } from "react-router";
import RightSection from "Components/AppComponents/RightSection";
import LeftSection from "Components/AppComponents/LeftSection";
import QuestionServices from "Services/question.services";
import "Assets/Styles/dots.css";
import IF from "Components/GenericComponents/IF";
import AlertMessage from "Components/GenericComponents/AlertMessage";
import { useAlertContext } from "Store";
import { AlertType } from "Models/alert.model";
const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const { alertState } = useAlertContext();

    const fetchAllQuestions = async () => {
        console.log("calling");
        setIsLoading(true);
        try {
            const {
                data: { questions },
            } = await QuestionServices.getAllQuestions();
            setQuestions(
                questions
                    .map((question: any) => {
                        return new Question({
                            ...question,
                            Answers: question.Answers.map((answer: any) => new AnswerModel(answer)),
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
        if (alertState.Type === AlertType.Error) alertState.Message = "";
        fetchAllQuestions();
    }, []);

    return (
        <Container className="">
            <IF predicate={!!alertState.Message}>
                <AlertMessage />
            </IF>
            <div className="d-flex flex-column-reverse flex-md-row pt-5">
                <Col md="8">
                    <IF predicate={isLoading}>
                        <div className="dot-flashing" style={{ top: "900%", left: "50%" }}></div>
                    </IF>
                    <IF predicate={!isLoading}>
                        <LeftSection questions={questions} />
                    </IF>
                    {/* <SearchBar setQuestions={setQuestions} />
                     */}
                </Col>
                <Col md="4" className="mb-4 mb-md-0">
                    <RightSection setQuestions={setQuestions} />
                    {/* <Card className="mt-4 p-3" style={{ height: "50%" }}>
                    yo mamam
                </Card> */}
                </Col>
            </div>
        </Container>
    );
};

export default withRouter(Home);
