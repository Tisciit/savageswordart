import { CHANGERENDER } from "../actions/render";

const defaultState = "welcome"

const render = (state = defaultState, action) => {
    switch(action.type){

        case CHANGERENDER:
            return action.payload;

        default:
            return state;
    }
};

export default render;