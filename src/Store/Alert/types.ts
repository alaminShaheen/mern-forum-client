import { Alert } from "Models/alert.model";
import { Dispatch } from "react";

export enum AlertActionTypes {
	DISPLAY_ALERT = "DISPLAY_ALERT",
	CLEAR_ALERT = "CLEAR_ALERT"
}

export interface IDisplayAlert {
	type: AlertActionTypes.DISPLAY_ALERT;
	payload: Alert;
}

export interface IClearAlert {
	type: AlertActionTypes.CLEAR_ALERT;
}

export type AlertActions = IDisplayAlert | IClearAlert;

export type IAlertContext = {
	alertState: Alert;
	alertDispatch: Dispatch<AlertActions>;
};
