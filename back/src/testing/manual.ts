import fetch from "node-fetch";

const singleSpell = { spellNames: ["Identify"] };
// const multipleSpells = { spellNames: ["Wish", "Fireball", "Magic Missile"] };

/*
fetch("http://localhost:3000/spellSummaries")
    .then((response) => response.json())
    .then((response) => console.log(response));
*/

fetch("http://localhost:3000/spells", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(singleSpell),
})
    .then((response) => response.json())
    .then((response) => console.log(response));

/*
fetch("http://localhost:3000/spells", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(multipleSpells),
})
    .then((response) => response.json())
    .then((response) => console.log(response));
*/
