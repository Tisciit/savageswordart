export const UPDATEPLAYERS = "UPDATE_PLAYERS";
export const UPDATEPLAYER = "UPDATE_PLAYER";

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