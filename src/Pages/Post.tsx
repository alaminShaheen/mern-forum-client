import { relativeTimeFromDates } from 'Helpers/time.helper';
import { Question } from 'Models/question.models';
import { useLocation, useParams, withRouter } from 'react-router';
import { CardText, Container } from 'reactstrap';
import styled from 'styled-components';
import Answers from 'Components/AppComponents/Answers';
import { useEffect, useState } from 'react';
import QuestionServices from 'Services/question.services';
import IF from 'Components/GenericComponents/IF';

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
    const [question, setQuestion] = useState<Question>();
    const [isLoading, setIsLoading] = useState(false);

    const fetchQuestion = async () => {
        setIsLoading(true);
        try {
            const { data }: any = await QuestionServices.getQuestion(questionId);
            setQuestion(new Question(data.question));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <Container className="pt-5 position-relative" >
            <IF predicate={!isLoading}>
                {question && (
                    <>
                        <CardText>
                            <small className="text-muted">
                                {`Posted ${relativeTimeFromDates(new Date(question.CreatedAt))} by `} <span style={{ color: 'black', fontWeight: 400, fontStyle: 'italic' }}>{question.CreatedBy}</span>
                            </small>
                        </CardText>
                        <h3>{question.Title}</h3>
                        <StyledParagraph>{question.Description}</StyledParagraph>
                        <Answers answers={question.Answers} questionId={questionId} />
                    </>
                )}
            </IF>
			<IF predicate={isLoading}>
				<div className="dot-flashing position-absolute" style={{ top: '600%', left: '50%' }}></div>
			</IF>
        </Container>
    );
};

export default withRouter(Post);
