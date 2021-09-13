import { relativeTimeFromDates } from "Helpers/time.helper";
import { Answer as AnswerModel } from "Models/answer.model";
import { Card, CardBody, CardText } from "reactstrap";

interface IAnswer {
	answer: AnswerModel;
}

const Answer = ({ answer }: IAnswer) => {
	return (
		<Card className="mb-3">
			<CardBody>
				{/* <CardTitle tag="h5">Card Title</CardTitle> */}
				<CardText>{answer.Description}</CardText>
				<CardText>
					<small className="text-muted">
						{`Replied ${relativeTimeFromDates(new Date(answer.CreatedAt))} by `} <span style={{ color: "black", fontWeight: 400, fontStyle: "italic" }}>{answer.CreatedBy}</span>
					</small>
				</CardText>
			</CardBody>
		</Card>
	);
};

export default Answer;
