import store from "./state/store";
import {
    updatePlayers
} from "./state/actions/game";

//WebSocket needs to be moved somewhere else :(
const webSocket = new WebSocket(`${window.location.href.replace("http", "ws").replace(":3000", ":5000")}`);

const connect = () => {
    webSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(`Received ${data.dataType}`);
        switch (data.dataType) {

            case  "game": {
                store.dispatch(updatePlayers(data.data.players));
                break;
            }

            case "players": {
                store.dispatch(updatePlayers(data.data));
                break;
            }

            default: {
                break;
            }

        }
    }
}
export default connect;