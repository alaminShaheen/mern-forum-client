export class User {
	Id: string;
	FirstName: string;
	LastName: string;
	Email: string;
	CreatedAt: Date;

	constructor(data: any) {
		this.Id = data._id;
		this.FirstName = data.FirstName;
		this.LastName = data.LastName;
		this.Email = data.Email;
		this.CreatedAt = new Date(data.CreatedAt);
	}
}
