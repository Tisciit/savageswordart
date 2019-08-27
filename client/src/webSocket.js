import store from "./state/store";
import {
    updatePlayers,
    updateSelf,
    updateParties
} from "./state/actions/game";

//WebSocket needs to be moved somewhere else :(
const webSocket = new WebSocket(`${window.location.href.replace("http", "ws").replace(":3000", ":5000")}`);

export let uid = "";

export const connect = () => {
    webSocket.addEventListener("message", (message) => {
        const data = JSON.parse(message.data);
        console.log(`Received ${data.type}`);
        switch (data.type) {

            case "connection": {
                console.log(data.payload);
                uid = data.payload;
                break;
            }

            case "self": {
                store.dispatch(updateSelf(data.payload));
                break;
            }

            case "players": {
                store.dispatch(updatePlayers(data.payload));
                break;
            }
            
            case "game": {
                const {players, parties} = data.payload;
                store.dispatch(updatePlayers(players));
                store.dispatch(updateParties(parties));
            }

            default: {
                break;
            }

        }
    });
}

export const impersonatePlayerAsync = (id) => {
    return new Promise((resolve, reject) => {
        webSocket.send(JSON.stringify({
            uid,
            action: "player",
            id: id
        }));

        //Self deleting event listener
        const listener = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "self") {
                store.dispatch(updateSelf(data.payload));
                webSocket.removeEventListener("message", listener);
                clearInterval(timeOut);
                resolve("self");
            }
        }

        webSocket.addEventListener("message", listener);

        //timeout after 2s
        const timeOut = setInterval(() => {
            console.log("reject");
            webSocket.removeEventListener("message", listener);
            reject("timeout");
        }, 2000);


    })
};

export const impersonateGMAsync = () => {
    return new Promise((resolve, reject) => {
        webSocket.send(JSON.stringify({
            uid,
            action: "gm",
        }));

        //Self deleting event listener
        const listener = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "gm") {
                store.dispatch(updatePlayers(data.payload));
                webSocket.removeEventListener("message", listener);
                clearInterval(timeOut);
                resolve("gm");
            }
        }

        webSocket.addEventListener("message", listener);

        //timeout after 2s
        const timeOut = setInterval(() => {
            console.log("reject");
            webSocket.removeEventListener("message", listener);
            reject("timeout");
        }, 2000);
    });
}

export default connect;