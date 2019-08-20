const Entity = require("./Entity");

class Effect {
    /** Creates a new Effect which can be applied f.e. to items or perks
     * @param {Entity.STATENUM} effectedStat The effected stat
     * @param {Number} value A number indicating the change in the effected stat. Use negatives for debuffs
     * @param {Effect.apply} apply 
     * @param {Number} duuration The duration of the effect. Use -1 for effects without duration
     */
    constructor(effectedStat, value, apply, duration) {
        this.effectedStat = effectedStat;
        this.apply = apply;
        this.value = value;
        this.duration = duration;

        /*
        Doubles the given Attribute
        new Effect("TOTALHP","*2",APPLY.static, -1}

        Poison effect
        new Effect("CURRENTHP","*.95",APPLY.continuous, 20)

        Instant Heal potion
        new Effect("CURRENTHP","+200", APPLY.static, 1)

        Heal Pot // Heal 200 HP over 20 time units (10 each time unit for 20 tu)
        new Effect("CURRENTHP", "+10", APPLY.continuous, 20)

        */
    }
}

Effect.apply = {
    "static": 1,
    "continuous": 2,
}

module.exports = Effect;