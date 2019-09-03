const Entity = require("./Entity");

class Player extends Entity {
    
    constructor(lvl, name) {
        //Construct Entity object
        super(lvl, name);
        this.type = Entity.TYPES.Player;
        this.xp = 0;
        this.party = null;
        this.partyData = [];
        this.updateBase();
        this.updateTotals();
        this.refresh();
    }
}

module.exports = Player;