import {UPDATEPLAYERS, UPDATEPLAYER} from "../actions";


const defaultVal = {
    players: []
}

const rootReducer = (state = defaultVal, action) => {
    switch (action.type) {

        case UPDATEPLAYER: {
            const copy = [...state];
            const player = copy.players.find((pl) => pl.name == action.payload.name);
            Object.assign(player, action.payload);
            return copy;
        }

        case UPDATEPLAYERS: {
            const copy = [...state];
            copy.players = action.payload;
            return copy;
        }

        default:
            return state;
    }
}

export default rootReducer;

const state = {
    type: "GM / Player",
    render: "Welcome / UI / Battle / ...",
    Game: {
        players: [],
        quests: [],
        items: []
    }
}