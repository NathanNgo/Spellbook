import Drawer, { DrawerSide } from "components/drawer/Drawer";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function SettingsDrawer({ isOpen, onClose }: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            side={DrawerSide.Left}
            width="35%"
        >
            hi this is the new settings!
        </Drawer>
    );
}

export default SettingsDrawer;
