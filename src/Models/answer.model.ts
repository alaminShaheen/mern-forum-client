export class Answer {
	Id: string;
	Description: string;
	CreatedAt: Date;
	CreatedBy: string;

	constructor(data: any) {
		this.Id = data._id;
		this.Description = data.Description;
		this.CreatedBy = data.CreatedBy;
		this.CreatedAt = new Date(data.CreatedAt);
	}
}
