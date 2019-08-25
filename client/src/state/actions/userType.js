export const CHANGEUSERTYPE = "CHANGE_USER_TYPE";
export const SETUSERIS = "SET_USER_IS";

export const userTypes = {
    "Undefined": 0,
    "GM": 1,
    "Player": 2
}

export const setUserGM = () => {
    return {
        type: CHANGEUSERTYPE,
        payload: userTypes.GM
    }
}
export const setUserPlayer = () => {
    return {
        type: CHANGEUSERTYPE,
        payload: userTypes.Player
    }
}
export const setUserUndefined = () => {
    return {
        type: CHANGEUSERTYPE,
        payload: userTypes.Undefined
    }
}

export const setUserIS = (player) => {
    return {
        type: SETUSERIS,
        payload: player
    }
}