class Entity {

    constructor(lvl, name) {

        this.name = name;
        this.isAlive = true;
        this.type = "";
        //#region Stats

        this.generateAttributes();
        this.Stats[Entity.STATENUM.LVL] = lvl;
        this.generateEquipped();
    }

    generateAttributes() {
        //Copy Stats over
        //Create Main Node
        this.Stats = {};
        for (let stat of Object.getOwnPropertyNames(Entity.STATS)) {
            //Generate node for each Derived Stat
            this.Stats[stat] = {};
            for (let prop of Object.getOwnPropertyNames(Entity.STATS[stat])) {
                this.Stats[stat][prop] = Entity.STATS[stat][prop];
            }
        }
    }

    generateEquipped() {
        this.Equipped = {};
        for (let x of Object.getOwnPropertyNames(Entity.Equipment_Slots)) {
            const value = Entity.Equipment_Slots[x];
            this.Equipped[value] = null;
        };
    }

    checkAlive() {
        if (this.Stats[Entity.STATENUM.HP].current <= 0) {
            this.isAlive = false;
        }
    }

    dealDamage(amount) {
        let hp = this.Stats[Entity.STATENUM.HP].current;
        if (hp - amount < 0) {
            hp = 0;
        } else {
            hp -= amount;
        }
        this.Stats[Entity.STATENUM.HP].current = hp;
        this.checkAlive();
    }

    calculateDamageTaken(damageDealt) {
        return damageDealt;
    }

    equipItem(Item, Slot) {
        if (this.equipped[Slot] != null) {
            //Slot is not emty, return
            return -1;
        }

        this.equipped[Slot] = Item;

        const effects = Item.effects;
        for (let effect of effects) {
            this.Stats[effect.effectedStat].modifiers.push(effect);
        }

        this.updateTotals();
    }

    consumeItem(Item) {
        const effects = Item.effects;
        for (let effect of effects) {
            this.Stats[effect.effectedStat].modifiers.push(effect);
        }
        this.updateTotals();
    }

    updateStats() {
        for (let stat of Object.getOwnPropertyNames(this.Stats)) {
            const ownProperties = Object.getOwnPropertyNames(this.Stats[stat]);
            if (ownProperties.indexOf("_formula") !== -1) {
                this.Stats[stat]._formula(this.Stats);
            }
        }
    }

    updateTotals() {
        for (let stat of Object.getOwnPropertyNames(this.Stats)) {
            const ownProperties = Object.getOwnPropertyNames(this.Stats[stat]);
            if (ownProperties.indexOf("_updateTotal") !== -1) {
                this.Stats[stat]._updateTotal(this.Stats);
            }
        }
    }

    heal(amount) {
        let current = this.Stats[Entity.STATENUM.HP].current;
        let total = this.Stats[Entity.STATENUM.HP].total;

        if (!amount) {
            current = total;
        } else {
            current = current + amount > total ? total : current + amount;
        }

        this.Stats[Entity.STATENUM.HP].current = current;
    }
}

Entity.TYPES = {
    "Player": 1,
    "NPC": 2,
    "Monster": 3
};

Entity.Equipment_Slots = {
    "HEAD": 1,
    "TORSO": 2,
    "LEGS": 3,
    "BOOTS": 4,
    "UNDERWEAR": 5,
    "RING01": 6,
    "RING02": 7,
    "SHOULDER01": 8,
    "SHOULDER02": 9,
    "NECKLACE": 10,
    "HAND01": 11,
    "HAND02": 12
};

Entity.STATENUM = {
    STR: "STR",
    AGI: "AGI",
    EVA: "EVA",
    LVL: "LVL",

    HP: "HP",
    EN: "EN",
    CARRY: "CARRY"
}

const UPDATETOTAL = function () {
    this.total = this.base + this.modifiers.reduce((sum, modifier) => sum += modifier.value, 0);
}
Entity.STATS = {}
Entity.STATS[Entity.STATENUM.HP] = {
    _formula: function(Stats){
        this.base = 250 + (70 * (Stats[Entity.STATENUM.LVL] - 1));
    },
    _updateTotal: UPDATETOTAL,
    base: 0,
    modifiers: [],
    total: 0,
    current: 0
};
Entity.STATS[Entity.STATENUM.EN] = {
    _formula: function (Stats) {
        this.base = 7 + Stats[Entity.STATENUM.LVL];
    },
    _updateTotal: UPDATETOTAL,
    base: 0,
    modifiers: [],
    total: 0,
    current: 0
};
Entity.STATS[Entity.STATENUM.CARRY] = {
    _formula: function (Stats) {
        this.base = 100 + (5 * Stats[Entity.STATENUM.STR].total);
    },
    _updateTotal: UPDATETOTAL,
    base: 0,
    modifiers: [],
    total: 0,
};
Entity.STATS[Entity.STATENUM.LVL] = 0;
Entity.STATS[Entity.STATENUM.STR] = {
    _updateTotal: UPDATETOTAL,
    base: 1,
    modifiers: [],
    total: 0,
}
Entity.STATS[Entity.STATENUM.AGI] = {
    _updateTotal: UPDATETOTAL,
    base: 1,
    modifiers: [],
    total: 0,
}
Entity.STATS[Entity.STATENUM.EVA] = {
    _updateTotal: UPDATETOTAL,
    base: 1,
    modifiers: [],
    total: 0,
}

module.exports = Entity;