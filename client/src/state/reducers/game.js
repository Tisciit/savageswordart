import {UPDATEPLAYERS, UPDATEPLAYER, UPDATESELF, UPDATEPARTIES} from "../actions/game";


const defaultVal = {
    self: {},
    players: [],
    parties: []
}

const Game = (state = defaultVal, action) => {
    switch (action.type) {

        case UPDATEPLAYER: {
            const copy = [...state];
            const player = copy.players.find((pl) => pl.id === action.payload.id);
            Object.assign(player, action.payload);
            return copy;
        }

        case UPDATEPLAYERS: {
            const copy = Object.assign({}, state);
            copy.players = action.payload;
            return copy;
        }

        case UPDATESELF: {
            const copy = Object.assign({}, state);
            copy.self = action.payload;
            return copy;
        }

        case UPDATEPARTIES: {
            const copy = Object.assign({}, state);
            copy.parties = action.payload;
            return copy;
        }

        default:
            return state;
    }
}

export default Game;