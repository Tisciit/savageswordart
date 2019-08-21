const express = require('express');
const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", function connection(ws){
  console.log("Connection?");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  const data = Game.players.length == 0 ? [] : Game.players

  ws.send(JSON.stringify(data));
});

const Player = require("./saorpg/Player");
const Enums = require("./EnumExport");

const app = express();



//--- Game Objects ---
  const Game = {
    effects: [],
    skills: [],
    perks: [],
    players: [],
    monsters: [],
    quests: []
  }
//--------------------

app.post("/api/readFromFile", (req, res) => {
  res.send("it works!");

  //TODO
});

app.get('/api/enums', (req, res) => {
  res.json(Enums);
});

app.get("/api/createPlayer/:name", (req, res) => {
  const player = new Player(1, req.params.name);
  Game.players.push(player);
  res.json(player);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(Game.players));
    }
  });
});

app.get("/api/changePlayer/")

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);