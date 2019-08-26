import store from "./state/store";
import {
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
                console.log(data.data);
                uid = data.data;
                break;
            }

            case "game": {
                store.dispatch(updatePlayers(data.data.players));
                break;
            }

            case "playerSelection": {
                store.dispatch(updatePlayers(data.data));
                break;
            }

            case "subscription": {
                store.dispatch(updateSelf(data.data));
                store.dispatch(changerender("main"));
                break;
            }

            default: {
                break;
            }

        }
    }
}

export const subscribeToPlayer = (id) => {
    webSocket.send(JSON.stringify({
        uid,
        action: "subscribe",
        subscribe: id
    }));
}

export default connect;