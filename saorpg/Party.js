class Party {
    
    constructor(player1, player2) {
        this.id = nextId++;
        this.players = [];
        this.addPlayer(player1);
        this.addPlayer(player2);
        this.lead = player1;
    }

    getInfo() {
        const data = [];

        for (let player of this.players) {
            data.push({
                id: player.id,
                name: player.name,
                percentage: player.Stats.HP.current / player.Stats.HP.total
            });
        }

        return data;
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