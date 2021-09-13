import AskQuestionForm from "Components/AppComponents/AskQuestionForm";
import IF from "Components/GenericComponents/IF";
import { ReactNode } from "react";
import { Modal as ModalComp, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

interface IModal {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    title: string;
    children: ReactNode;
}

const Modal = ({isModalOpen, setIsModalOpen, title, children}: IModal) => {
    const handleClose = () => setIsModalOpen(false);
    return (
        <ModalComp isOpen={isModalOpen} toggle={handleClose} className="">
            <ModalHeader toggle={handleClose}>{title}</ModalHeader>
            <IF predicate={!!children}>
                {children}
            </IF>
        </ModalComp>
    )
}

export default Modal
