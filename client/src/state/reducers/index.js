import {
    combineReducers
} from "redux";
import Game from "./game";
import userType from "./userType";
import render from "./render";

const rootReducer = combineReducers({
    game: Game,
    userType: userType,
    render: render
});

export default rootReducer;