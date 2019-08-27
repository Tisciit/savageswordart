export const UPDATEPLAYERS = "UPDATE_PLAYERS";
export const UPDATEPLAYER = "UPDATE_PLAYER";
export const UPDATESELF = "UPDATE_SELF";
export const UPDATEPARTIES = "UPDATE_PARTIES";

export const updatePlayers = (players) => {
    return {
        type: UPDATEPLAYERS,
        payload: players
    }
}

export const updatePlayer = (player) => {
    return {
        type: UPDATEPLAYER,
        payload: player,
    }
}

export const updateSelf = (self) => {
    return {
        type: UPDATESELF,
        payload: self
    }
}

export const updateParties = (parties) => {
    return {
        type: UPDATEPARTIES,
        payload: parties,
    }
}