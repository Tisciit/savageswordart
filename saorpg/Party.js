class Party {

    constructor(members) {
        this.id = Party.nextId++;
        this.players = [];

        if (Array.isArray(members)) {
            for (let m of members) {
                this.addPlayer(m);
            }
            this.lead = members[0];
        } else {
            this.addPlayer(members);
            this.lead = members
        }

        this.setInfo();
    }

    setInfo() {
        const data = [];

        for (let player of this.players) {
            data.push({
                id: player.id,
                name: player.name,
                percentage: (player.Stats.HP.current / player.Stats.HP.total) * 100
            });
        }

        console.log(data);

        for (let player of this.players) {
            player.partyData = data;
            console.log(player);
        }
    }

    changeLead(playerNewLead) {
        this.lead = playerNewLead;
    }

    addPlayer(player) {
        this.players.push(player);
        player.party = this.id;
    }

    removePlayer(player) {
        this.players = this.players.filter(elt => elt.id !== player.id);
        player.party = null;
    }
}

Party.nextId = 0;

module.exports = Party;