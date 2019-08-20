const Entity = require("./saorpg/Entity");
const Item = require("./saorpg/Item");
const Quest = require("./saorpg/Quest");

module.exports = {
    STATS: Entity.STATENUM,
    ITEMTYPES: Item.TYPES,
    QuestStatus: Quest.STATEENUM
}