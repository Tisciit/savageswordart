const Entity = require("./Entity");

class Monster extends Entity {

    constructor(lvl, name, floor, hpModifier) {
        super(lvl, name);
        this.floor = floor;
        this.type = Entity.TYPES.Monster;
        
        //Override HP calculation
        this.Stats[Entity.STATENUM.HP]._formula = function(Stats) {
            //TODO: Correct
            this.base = 1000;
        };
    }
}

module.exports = Monster;