import { Alert, AlertType } from "Models/alert.model";
import { AlertActions, AlertActionTypes } from "Store/Alert/types";

export const ALERT_INITIAL_VALUE: Alert = {
	Message: "",
	Timeout: 0,
	Type: AlertType.Info
};

export const messageReducer = (state: Alert, action: AlertActions): Alert => {
	switch (action.type) {
		case AlertActionTypes.DISPLAY_ALERT:
			return { ...state, ...action.payload };
		case AlertActionTypes.CLEAR_ALERT:
			return ALERT_INITIAL_VALUE;
		default:
			return state;
	}
};
