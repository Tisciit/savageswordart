import {
    CHANGEUSERTYPE,
    SETUSERIS,
    userTypes
} from "../actions/userType";

const defaultState = {
    type: userTypes.Undefined,
    is: null
}

const userType = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGEUSERTYPE: {
            const copy = Object.assign({}, state);
            copy.type = action.payload;
            return copy;
        };

        case SETUSERIS: {
            const copy = Object.assign({}, state);
            copy.is = action.payload;
            return copy;
        }

    default:
        return state;
    }
}

export default userType;