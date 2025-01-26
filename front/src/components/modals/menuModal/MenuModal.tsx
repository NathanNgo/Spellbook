import Modal, { ModalSide } from "components/modal/Modal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function MenuModal({ isOpen, onClose }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            side={ModalSide.LEFT}
            width="35%"
        >
            hi this is the borgor menu!!
        </Modal>
    );
}

export default MenuModal;
