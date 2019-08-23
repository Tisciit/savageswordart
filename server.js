const fs = require("fs");
const express = require('express');
const http = require("http");
const webSocket = require("ws");

const Player = require("./saorpg/Player");
const Enums = require("./EnumExport");

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({
  server
});

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

//Game.players[0].manipulateHealth(-1);
//--------------------

app.get("/websocket", (req, res) => {

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

app.get("/api/hp/:name/:value", (req, res) => {
  const p = Game.players.find(pl => pl.name === req.params.name);
  console.log(p);
  if (p) {
    p.manipulateHealth(req.params.value);
  }
  res.send("Could not find player :(");
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

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${server.address().port}`));