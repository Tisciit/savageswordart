import {UPDATEPLAYERS, UPDATEPLAYER} from "../actions/game";


const defaultVal = {
    players: []
}

const Game = (state = defaultVal, action) => {
    switch (action.type) {

        case UPDATEPLAYER: {
            const copy = [...state];
            const player = copy.players.find((pl) => pl.name == action.payload.name);
            Object.assign(player, action.payload);
            return copy;
        }

        case UPDATEPLAYERS: {
            const copy = Object.assign({}, state);
            copy.players = action.payload;
            return copy;
        }

        default:
            return state;
    }
}

export default Game;