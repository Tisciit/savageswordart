import {
    combineReducers
} from "redux";
import Game from "./game";

const rootReducer = combineReducers({
    game: Game
});

export default rootReducer;


/* Thoughts on state
 * Application needs to know of GM or Player is "logged in"
 * Application needs to know which component to render
 * Application needs "Game" objects, GM needs more than the player, which "only" needs the player component
 */
const state = {
    type: "Unknown / GM / Player",
    render: "Welcome / UI / Battle / ...",
    Game: {
        players: [],
        quests: [],
        items: []
    }
}