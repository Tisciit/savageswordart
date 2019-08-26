const fs = require("fs");
const express = require('express');
const bodyParser = require("body-parser");
const http = require("http");
const webSocket = require("ws");

const Enums = require("./EnumExport");

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new webSocket.Server({
  server
});

//--- Game Objects ---
const Game = require("./initialize")();


//#region --- GET Requests ---
app.get('/api/enums', (req, res) => {
  res.json(Enums);
});

app.get("/api/get/:object", (req, res) => {

  const obj = req.params.object;

  if (obj.toLowerCase() === "game") {
    res.json(Game);
  } else {
    const gameobj = Game[obj];
    if (gameobj === undefined) {
      res.status(500).send(`Can not find object ${obj}`);
    } else {
      res.json(gameobj);
    }
  }
});

//#endregion

//#region --- POST Requests ---

app.post("/api/createPlayer", (req, res) => {

  const level = req.body.level || 1;
  const name = req.body.name;

  if (!name) {
    res.status(500).send("A name has to be provided");
    return;
  }
  const Player = require("./saorpg/Player");
  const player = new Player(level, name);
  Game.players.push(player);
  res.json(player);
  sendToClients("players");
});

app.post("/api/save", (req, res) => {
  const path = "./userData/game.json";
  fs.writeFileSync(path, JSON.stringify(Game));
  res.send("Success!");
});

app.post("/api/hp", (req, res) => {

  const {
    player,
    value
  } = req.body;

  const p = Game.players.find(pl => pl.name === player);
  if (p) {
    p.manipulateHealth(value);
    res.send("Updated Players Health");
  } else {
    res.send("Could not find player :(");
  }
  sendToClients("players");
});

app.post("/api/en", (req, res) => {

  const {
    player,
    value
  } = req.body;

  const p = Game.players.find(pl => pl.name === player);
  if (p) {
    p.manipulateEN(value);
    res.status(500).send("Updated Players EN")
  }
  res.send("Could not find player :(");
});

//#endregion

//#region --- WSS ----

const PLAYERSUBSCRIPTION = {};

wss.on("connection", function connection(ws) {
  console.log("Client connected, generating ID");

  //TODO: Make better!
  const id = Math.random() * 1000;

  ws.send(JSON.stringify({
    type: "connection",
    data: id,
  }));

  ws.on("message", function incoming(message) {
    const request = JSON.parse(message);
    switch (request.action) {
      case "subscribe":
        const id = request.uid;
        const player = Game.players.find(elt => elt.id === request.subscribe);
        PLAYERSUBSCRIPTION[id] = {
          ws,
          id: player.id
        };
        console.log(`${id} subscribed to ${player.id}`);
        WSSupdatePlayer(player.id);
        break;

      default:
        break;
    }
  });

  const playerSelection = [];
  Game.players.forEach(elt => playerSelection.push({
    id: elt.id,
    name: elt.name
  }));

  ws.send(JSON.stringify({
    type: "playerSelection",
    data: playerSelection
  }));
});

function WSSupdatePlayer(playerID) {
  //Get all connections for player object
  // const connectionsToSend = WSSCONNECTIONS.filter(connection => connection.player === id);

  const player = Game.players.find(elt => elt.id === playerID);

  for (let prop of Object.getOwnPropertyNames(PLAYERSUBSCRIPTION)) {
    if (playerID == PLAYERSUBSCRIPTION[prop].id) {
      PLAYERSUBSCRIPTION[prop].ws.send(JSON.stringify({
        type: "subscription",
        data: player
      }));
    }
  }
}

function sendToClients(type) {

  let data = {};
  type = type.toLowerCase();

  if (type === "game") {
    data = Game;
  } else {
    data = Game[type];

    if (data === undefined) {
      console.log(`Can not send ${type}`);
      return;
    }
  }
  wss.clients.forEach(l => {
    l.send(JSON.stringify({
      dataType: type,
      data: data
    }))
  });
}

//#endregion

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${server.address().port}`));