import { Answer } from "Models/answer.model";

export class Question {
	Id: string;
	Title: string;
	Description: string;
	Answers: Answer[];
	CreatedAt: Date;
	CreatedBy: string;

	constructor(data: any) {
		this.Id = data._id;
		this.Title = data.Title;
		this.Description = data.Description;
		this.Answers = data.Answers ? data.Answers.map((answer: any) => new Answer(answer)) : [];
		this.CreatedAt = new Date(data.CreatedAt);
		this.CreatedBy = data.CreatedBy;
	}
}
