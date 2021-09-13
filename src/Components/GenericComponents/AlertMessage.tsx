import IF from "Components/GenericComponents/IF";
import { Alert as AlertModel, AlertType } from "Models/alert.model";
import { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { useAlertContext } from "Store";
import { clearAlert } from "Store/Alert/alertAction";

interface IAlertMessage {
	alert: AlertModel;
}

const AlertMessage = ({ alert }: IAlertMessage) => {
	const { alertState, alertDispatch } = useAlertContext();
	const [visible, setVisible] = useState(false);
	const onDismiss = () => setVisible(false);

	useEffect(() => {
		if(!!alertState.Message) setVisible(true);
		let id: NodeJS.Timeout;
		if (alertState.Timeout) {
			id = setTimeout(() => {
				alertDispatch(clearAlert());
				onDismiss();
			}, alertState.Timeout);
		}
		return () => {
			if (id) clearTimeout(id);
		};
	}, [alertState]);

	return (
		<Alert className="mt-3 mb-3" isOpen={visible} color={alertState.Type} toggle={onDismiss}>
			{alertState.Message}
		</Alert>
	);
};

export default AlertMessage;
