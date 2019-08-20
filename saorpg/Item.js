const Effect = require("./Effect"); //for JsDoc

class Item {

    /** Creates a new Item
     * @param {String} name the display name of this item
     * @param {String} description some fluff description about this item
     * @param {Number} value the base value of this item when bought or selled
     * @param {Array.<Effect>} effects an Array of effects 
     */
    constructor(name, description, value, effects) {
        this.name = name;
        this.description = description;
        this.value = value;

        this.effects = effects;
    }
}

Item.TYPES= {
    "Weapon": {

    },
    "Armor": {

    },
    "Material": {

    },
    "Consumable": {

    }
}

module.exports = Item;