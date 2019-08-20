const express = require('express');

const Player = require("./saorpg/Player");
const Enums = require("./EnumExport");

const app = express();

app.get('/api/enums', (req, res) => {
  res.json(Enums);
});

app.get("/api/createPlayer/:name", (req, res) => {
  res.json(new Player(1, req.params.name));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);