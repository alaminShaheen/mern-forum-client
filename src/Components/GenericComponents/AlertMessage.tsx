import IF from "Components/GenericComponents/IF";
import { Alert as AlertModel, AlertType } from "Models/alert.model";
import { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { useAlertContext } from "Store";
import { clearAlert } from "Store/Alert/alertAction";

interface IAlertMessage {
    className?: string;
}

const AlertMessage = ({className = "my-3"}: IAlertMessage) => {
    const { alertState, alertDispatch } = useAlertContext();
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);

    useEffect(() => {
        if (!!alertState.Message) setVisible(true);
        let id: NodeJS.Timeout;
        if (alertState.Timeout) {
            id = setTimeout(() => {
                alertState.Message = "";
                onDismiss();
            }, alertState.Timeout);
        }
        return () => {
            if (id) clearTimeout(id);
        };
    }, [alertState]);

    return (
        <IF predicate={!!alertState.Message}>
            <Alert className={`${className}`} isOpen={visible} color={alertState.Type} toggle={onDismiss}>
                {alertState.Message}
            </Alert>
        </IF>
    );
};

export default AlertMessage;
