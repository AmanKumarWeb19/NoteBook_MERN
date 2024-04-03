const express = require("express");
const notesRoute = express.Router();

notesRoute.get("/", (req, res) => {
  res.send({ msg: "Get All the Created Notes" });
});

notesRoute.post("/create", (req, res) => {
  res.send({ msg: "Notes Created" });
});

notesRoute.delete("/create/:id", (req, res) => {
  res.send({ msg: "Notes has been deleted" });
});

module.exports = { notesRoute };
