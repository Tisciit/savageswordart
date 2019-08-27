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

app.post("/api/assignGM", (req, res) => {
  const {
    uid
  } = req.body;

  if (!uid) {
    res.status(500).send(`Can´t find client with id ${uid}`);
    return;
  }

  console.log(`${uid} impersonated GM`);
  Object.assign(CLIENTS[uid], {
    type: "gm"
  });

  res.json(Game.players);
});

app.post("/api/assignSelf", (req, res) => {
  const {
    uid,
    id
  } = req.body;

  const player = Game.players.find(elt => elt.id === id);

  if (!player || !uid) {
    res.status(500).send(`Can´t find client with id ${uid} and / or player with id ${id}`);
    return;
  }

  console.log(`${id} impersonated to ${player.id}`);

  //Set up wss Subscription
  Object.assign(CLIENTS[uid], {
    self: player.id
  });

  //Return Player to client
  res.json(player);

});

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
  WSSUpdatePlayers();
});

app.post("/api/save", (req, res) => {
  const path = "./userData/game.json";
  fs.writeFileSync(path, JSON.stringify(Game));
  res.send("Success!");
});

app.post("/api/hp", (req, res) => {

  const {
    id,
    value
  } = req.body;

  //Parse for integer
  const playerid = parseInt(id);
  const theValue = parseInt(value);

  const player = Game.players.find(elt => elt.id === playerid);
  if (player) {
    player.manipulateHealth(theValue);
    res.send("Updated Players Health");
    WSSupdatePlayer(player.id);
  } else {
    res.send("Could not find player :(");
  }
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

const CLIENTS = {};
const wsMessageTypes = {
  connection: "connection",
  self: "self",
  players: "players"
}

wss.on("connection", function connection(ws) {
  console.log("Client connected, generating ID");

  //#region --- Assign ID to client
  const id = Math.random() * 1000;

  console.log(`Assigned ID ${id} to new Client`)
  CLIENTS[id] = {
    connected: Date.now(),
    socket: ws,
    type: "player"
  }

  ws.send(JSON.stringify({
    type: wsMessageTypes.connection,
    payload: id,
  }));
  //#endregion

  //#region --- Handle messages from client
  ws.on("message", function incoming(message) {
    console.log(`Received message ${message}`);
    console.log(`Messages are not handled`);
  });
  //#endregion

  //#region --- Initialy send Player names and ids
  const playerSelection = [];
  Game.players.forEach(elt => playerSelection.push({
    id: elt.id,
    name: elt.name
  }));

  ws.send(JSON.stringify({
    type: wsMessageTypes.players,
    payload: playerSelection
  }));
  //#endregion
});


//Websocket function which sends updates of a specific player to the corresponding clients
function WSSupdatePlayer(playerID) {
  // Get all connections for player object

  const player = Game.players.find(elt => elt.id === playerID);

  for (let prop of Object.getOwnPropertyNames(CLIENTS)) {
    const client = CLIENTS[prop];
    if (playerID == client.self || client.type == "gm") {
      client.socket.send(JSON.stringify({
        type: wsMessageTypes.self,
        payload: player
      }));
    }
  }
}

function WSSUpdatePlayers() {
  const playerSelection = [];
  Game.players.forEach(elt => playerSelection.push({
    id: elt.id,
    name: elt.name
  }));

  for (let prop of Object.getOwnPropertyNames(CLIENTS)) {
    CLIENTS[prop].socket.send(JSON.stringify({
      type: wsMessageTypes.players,
      payload: CLIENTS[prop].type == "gm" ? Game.players : playerSelection
    }));
  }
}

//#endregion

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${server.address().port}`));