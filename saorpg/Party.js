class Party {
    constructor(Player1, Player2) {
        this.id = nextId++;
        this.players = [];
        this.addPlayer(Player1);
        this.addPlayer(Player2);
    }

    getInfo() {
        const data = [];

        for (let p of this.players) {
            data.push({
                id: p.id,
                name: p.name,
                percentage: p.Stats.HP.current / p.Stats.HP.total
            });
        }

        return data;
    }

    addPlayer(Player) {
        this.players.push(Player);
        Player.party = this.id;
    }

    removePlayer(Player) {
        this.players = this.players.filter(elt => elt.id !== Player.id);
    }
}

Party.nextId = 0;