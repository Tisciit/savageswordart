
class Perk {
    constructor(skillId, name, proficiency, effects = []){
        //Reference the skill
        this.skillId = skillId;

        //Give it a name
        this.name = name;
        //Proficiency needed in the Skill to unlock
        this.proficiency = proficiency;
        this.description = "";
        this.effects = [...effects];
    }
}

module.exports = Perk;