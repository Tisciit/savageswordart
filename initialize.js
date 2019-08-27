const fs = require("fs");

const Effect = require("./saorpg/Effect");
const Skill = require("./saorpg/Skill");
const Perk = require("./saorpg/Perk");
const Player = require("./saorpg/Player");
const Party = require("./saorpg/Party");
const Monster = require("./saorpg/Monster");
const Quest = require("./saorpg/Quest");

function init() {

    const path = "./userData/game.json";
    const Game = {
        effects: [],
        skills: [],
        perks: [],
        players: [],
        parties: [],
        monsters: [],
        quests: []
    };

    if (!fs.existsSync(path)) {
        return Game;
    }

    const obj = JSON.parse(fs.readFileSync(path));
    //"Cast" object to player class :)
    obj.effects.forEach(elt => {
        Game.effects.push(Object.assign(new Effect(), elt));
    });

    obj.skills.forEach(elt => {
        Game.skills.push(Object.assign(new Skill(), elt));
    });
    obj.perks.forEach(elt => {
        Game.perks.push(Object.assign(new Perk(), elt));
    });
    obj.players.forEach(elt => {

        const Party = require("./saorpg/Party");

        const player = Object.assign(new Player(0, ""), elt);
        Game.players.push(player);

        //Read generated entry
        if (player.party != null) {
            //Check if party has already been created
            const party = Game.parties.find(elt => elt.id === player.party);

            if (party) {
                party.addPlayer(player);
            } else {
                //Create Party
                const p = new Party(player);
                Game.parties.push(p);
            }
        }

    });
    obj.monsters.forEach(elt => {
        Game.monsters.push(Object.assign(new Monster(0, ""), elt));
    });
    obj.quests.forEach(elt => {
        Game.quests.push(Object.assign(new Quest(), elt));
    });

    return Game;
};

module.exports = init;