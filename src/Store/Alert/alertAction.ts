import { Alert } from "Models/alert.model";
import { IDisplayAlert, AlertActionTypes, IClearAlert } from "Store/Alert/types";

export function displayAlert(alert: Alert): IDisplayAlert {
	return {
		payload: alert,
		type: AlertActionTypes.DISPLAY_ALERT
	};
}

export function clearAlert(): IClearAlert {
	return {
		type: AlertActionTypes.CLEAR_ALERT
	};
}
