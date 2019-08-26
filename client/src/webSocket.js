import store from "./state/store";
import {
    updatePlayer,
    updatePlayers,
    updateSelf
} from "./state/actions/game";
import {
    changerender
} from "./state/actions/render";

//WebSocket needs to be moved somewhere else :(
const webSocket = new WebSocket(`${window.location.href.replace("http", "ws").replace(":3000", ":5000")}`);

let uid = "";

export const connect = () => {
    webSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(`Received ${data.type}`);
        switch (data.type) {

            case "connection": {
                console.log(data.payload);
                uid = data.payload;
                break;
            }

            case "game": {
                store.dispatch(updatePlayers(data.payload.players));
                break;
            }

            case "playerSelection": {
                store.dispatch(updatePlayers(data.payload));
                break;
            }

            case "self": {
                store.dispatch(updateSelf(data.payload));
                break;
            }

            //GM  "exclusive - populate players with way more info"
            case "gm": {
                store.dispatch(updatePlayers(data.payload));
            }

            default: {
                break;
            }

        }
    }
}

export const impersonatePlayer = (id) => {
    webSocket.send(JSON.stringify({
        uid,
        action: "player",
        id: id
    }));
}

export const impersonateGM = () => {
    webSocket.send(JSON.stringify({
        uid,
        action: "gm",
    }))
}

export default connect;