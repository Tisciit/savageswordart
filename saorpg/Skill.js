class Skill {
    constructor(name) {
        this.skillId = Skill.nextID++;
        this.name = name;
    }

    addPerk(name, proficiency, effects) {
        const perk =  new Perk(this.skillId, name, proficiency, effects);
        this.perks.push(perk);
    }
}

Skill.nextID = 0;

module.exports = Skill;