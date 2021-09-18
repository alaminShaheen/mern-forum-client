import ButtonComponent from "Components/GenericComponents/ButtonComponent";
import IF from "Components/GenericComponents/IF";
import { useState } from "react";
import { ModalBody, ModalFooter } from "reactstrap";

interface IWarningModal {
    warningText: string;
    handleConfirmation: () => void;
    handleRejection: () => void;
    handleClose: () => void;
}

enum Status {
    Confirmed = 1,
    Rejected,
}

const WarningModal = ({ warningText, handleConfirmation, handleRejection, handleClose }: IWarningModal) => {
    const [isConfirmed, setIsConfirmed] = useState<Status>();
    const rejection = () => {
        setIsConfirmed(Status.Rejected);
        handleRejection();
    };

    const confirmation = () => {
        setIsConfirmed(Status.Confirmed);
        handleConfirmation();
    };

    return (
        <>
            <ModalBody className="d-flex justify-content-between align-items-center">
                <i className="fas fa-exclamation-triangle mr-4" style={{ fontSize: "3rem", color: "red" }} />
                <h4 className="text-left">{warningText}</h4>
            </ModalBody>
            <ModalFooter>
                <ButtonComponent
                    style={{ backgroundColor: "green", color: "white", width: "8rem" }}
                    disabled={!!isConfirmed && isConfirmed === Status.Confirmed}
                    buttonText="Yes"
                    onClick={confirmation}
                >
                    <IF predicate={!isConfirmed || isConfirmed === Status.Rejected}>
                        <i style={{ color: "white" }} className="fas fa-check mr-3" />
                    </IF>
                </ButtonComponent>
                <ButtonComponent
                    style={{ backgroundColor: "tomato", color: "white", width: "8rem" }}
                    disabled={!!isConfirmed && isConfirmed === Status.Rejected}
                    buttonText="No"
                    color="secondary"
                    onClick={rejection}
                >
                    <IF predicate={!isConfirmed || isConfirmed === Status.Confirmed}>
                        <i style={{ color: "white" }} className="fas fa-ban mr-3" />
                    </IF>
                </ButtonComponent>
            </ModalFooter>
        </>
    );
};

export default WarningModal;
