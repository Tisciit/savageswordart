const express = require('express');
const fs = require("fs");
const WebSocket = require("ws");

const wss = new WebSocket.Server({
  port: 8080
});

wss.on("connection", function connection(ws) {
  console.log("Client connected :))");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  const data = Game.players.length == 0 ? [] : Game.players

  ws.send(JSON.stringify({
    dataType: "Players",
    data: data
  }));
});

const Player = require("./saorpg/Player");
const Enums = require("./EnumExport");

const app = express();



//--- Game Objects ---
const path = "./userData/game.json"
const Game = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {
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
      client.send(JSON.stringify({
        dataType: "Players",
        data: Game.players
      }));
    }
  });
});

app.get("/api/save", (req, res) => {
  fs.writeFileSync(path, JSON.stringify(Game));
  res.send("Success!");
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);