import Drawer, { DrawerSide } from "components/drawer/Drawer";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function BrowseDrawer({ isOpen, onClose }: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.RIGHT}
            width="60%"
        >
            browse ye spells here!
        </Drawer>
    );
}

export default BrowseDrawer;
