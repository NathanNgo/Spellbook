import { useEffect, useState } from "react";
import "App.css";
import type { Spell } from "components/spellRow/types";
import Header from "components/header/Header";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";

type UnvalidatedSpell = {
    id: number;
    name: string;
    short_description: string;
    sor: number;
    duration: string;
    range: string;
    saving_throw: string;
    spell_resistance: string;
};

function App() {
    const [spells, setSpells] = useState<Spell[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [characterName, setCharacterName] = useState<string>("Josh Mann");

    function handleSearchQueryChange(query: string) {
        setSearchQuery(query);
    }

    let filteredList: Spell[] = spells;
    const query = searchQuery.trim().toLowerCase();

    if (query !== "") {
        filteredList = spells.filter((spell) =>
            spell.name.toLowerCase().includes(query)
        );
    }

    useEffect(() => {
        fetch("http://localhost:3000")
            .then((response) => response.json())
            .then((unvalidatedSpells: UnvalidatedSpell[]) => {
                unvalidatedSpells.sort((a, b) => a.name.localeCompare(b.name));
                const convertedSpells = unvalidatedSpells.map(
                    (spell): Spell => {
                        return {
                            id: spell.id,
                            name: spell.name,
                            description: spell.short_description,
                            level: spell.sor,
                            duration: spell.duration,
                            range: spell.range,
                            savingThrow: spell.saving_throw,
                            spellResistance: spell.spell_resistance,
                        };
                    }
                );
                setSpells(convertedSpells);
            });
    }, []);
    return (
        <>
            <Header characterName={characterName} />
            <SpellbookToolbar
                onSearchQueryChange={handleSearchQueryChange}
                searchQuery={searchQuery}
            />
            <Spellbook spells={filteredList} />
        </>
    );
}

export default App;
