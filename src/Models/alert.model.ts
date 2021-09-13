export enum AlertType {
	Info = "info",
	Error = 'danger',
	Success = 'success',
	Warning = 'warning'
}

export class Alert {
	Message: string;
	Timeout: number;
	Type: AlertType;

	constructor(data: any) {
		this.Message = data.Message;
		this.Timeout = data.Timeout;
		this.Type = data.Type;
	}
}
