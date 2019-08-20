class Quest {
    constructor() {
        console.log("Helllo thereee");
    }
}

Quest.STATEENUM = {
    OPEN: 1,
    CLOSED: 2,
    FAILED: 3
}

module.exports = Quest;