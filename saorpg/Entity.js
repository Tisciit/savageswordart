class Entity {

    constructor(lvl, name) {

        this.id = Entity.nextId++;
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

    manipulateHealth(amount) {

        amount = parseInt(amount);

        let current = this.Stats[Entity.STATENUM.HP].current;
        let total = this.Stats[Entity.STATENUM.HP].total;

        current += amount;

        current = current > total ? total : current;
        current = current <= 0 ? 0 : current;

        this.Stats[Entity.STATENUM.HP].current = current;
        this.checkAlive();
    }

    manipulateEN(amount) {
        amount = parseInt(amount);

        let current = this.Stats[Entity.STATENUM.EN].current;
        let total = this.Stats[Entity.STATENUM.EN].total;

        current += amount;

        //EN only needs overflow "protection";
        current = current > total ? total : current;
    }

    refresh(){
        for (let stat of Object.getOwnPropertyNames(this.Stats)) {
            const ownProperties = Object.getOwnPropertyNames(this.Stats[stat]);
            if (ownProperties.indexOf("current") !== -1) {
                const s = this.Stats[stat];
                s.current = s.total;
            }
        }
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

    updateBase() {
        this.Stats[Entity.STATENUM.HP].base = 250 + (70 * (this.Stats[Entity.STATENUM.LVL] - 1));
        this.Stats[Entity.STATENUM.EN].base = 7 + this.Stats[Entity.STATENUM.LVL];
        this.Stats[Entity.STATENUM.CARRY].base = 100 + (5 * this.Stats[Entity.STATENUM.STR].total);
    }

    updateTotals() {
        for (let stat of Object.getOwnPropertyNames(this.Stats)) {
            const ownProperties = Object.getOwnPropertyNames(this.Stats[stat]);
            if (ownProperties.indexOf("modifiers") !== -1) {
                const s = this.Stats[stat];
                s.total = s.base + s.modifiers.reduce((sum, modifier) => sum += modifier.value, 0);
            }
        }
    }
}

Entity.nextId = 1;


//#region Class Enums and set up stuff
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
Entity.STATS = {}
Entity.STATS[Entity.STATENUM.HP] = {
    base: 0,
    modifiers: [],
    total: 0,
    current: 0
};
Entity.STATS[Entity.STATENUM.EN] = {
    base: 0,
    modifiers: [],
    total: 0,
    current: 0
};
Entity.STATS[Entity.STATENUM.CARRY] = {
    base: 0,
    modifiers: [],
    total: 0,
};
Entity.STATS[Entity.STATENUM.LVL] = 0;
Entity.STATS[Entity.STATENUM.STR] = {
    base: 1,
    modifiers: [],
    total: 0,
}
Entity.STATS[Entity.STATENUM.AGI] = {
    base: 1,
    modifiers: [],
    total: 0,
}
Entity.STATS[Entity.STATENUM.EVA] = {
    base: 1,
    modifiers: [],
    total: 0,
}
//#endregion

module.exports = Entity;