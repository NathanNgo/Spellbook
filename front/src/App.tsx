import { useEffect, useState } from "react";
import "App.css";
import type { Spell } from "components/spellRow/types";
import Header from "components/header/Header";
import Spellbook from "components/spellbook/Spellbook";
import SpellbookToolbar from "components/spellbookToolbar/SpellbookToolbar";

type UnvalidatedSpell = {
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
    const [filteredList, setFilteredList] = useState<Spell[]>(spells);
    const [characterName, setCharacterName] = useState<string>("Josh Mann");

    const handleSearch = (query: string) => {
        if (query.trim() == "") {
            setFilteredList(spells);
        } else {
            const lowerCaseQuery = query.trim().toLowerCase();
            setFilteredList(
                spells.filter((spell) =>
                    spell.name.toLowerCase().includes(lowerCaseQuery)
                )
            );
        }
    };

    useEffect(() => {
        fetch("http://localhost:3000")
            .then((response) => response.json())
            .then((unvalidatedSpells: UnvalidatedSpell[]) => {
                unvalidatedSpells.sort((a, b) => a.name.localeCompare(b.name));
                const convertedSpells = unvalidatedSpells.map(
                    (spell): Spell => {
                        return {
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
                setFilteredList(convertedSpells);
            });
    }, []);

    return (
        <>
            <Header characterName={characterName} />
            <SpellbookToolbar handleSearch={handleSearch} />
            <Spellbook spells={filteredList} />
        </>
    );
}

export default App;
