const Entity = require("./Entity");

class Player extends Entity {
    
    constructor(lvl, name) {
        //Construct Entity object
        super(lvl, name);
        this.type = Entity.TYPES.Player;
        this.updateStats();
        this.updateTotals();
        this.heal();
    }
}

module.exports = Player;