export class Token {
	AccessToken: string;
	RefreshToken: string;

	constructor(data: any) {
		this.AccessToken = data.AccessToken;
		this.RefreshToken = data.RefreshToken;
	}
}
