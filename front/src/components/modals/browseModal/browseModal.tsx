import Modal, { ModalSide } from "components/modal/Modal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function BrowseModal({ isOpen, onClose }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            side={ModalSide.RIGHT}
            width="60%"
        >
            browse ye spells here!
        </Modal>
    );
}

export default BrowseModal;
