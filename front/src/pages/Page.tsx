import Header from "components/header/Header";
import { DrawerState } from "components/spellbook/Spellbook";
import { Character } from "types";

type Props = {
    children: React.ReactNode;
    currentCharacter: Character;
    toggleDrawerState: (targetState: DrawerState) => void;
};

function Page({ children, currentCharacter, toggleDrawerState }: Props) {
    return (
        <>
            <Header
                characterName={currentCharacter.name}
                onToggleMenu={() => toggleDrawerState(DrawerState.Menu)}
                onToggleSettings={() => toggleDrawerState(DrawerState.Settings)}
            />
            {children}
        </>
    );
}

export default Page;
