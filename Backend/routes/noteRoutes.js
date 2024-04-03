const express = require("express");
const { NotesModel } = require("../model/notesModel");
const notesRoute = express.Router();

notesRoute.get("/", async (req, res) => {
  try {
    const notes = await NotesModel.find();
    res.send(notes);
  } catch (error) {
    res.send({ msg: "Something wents Wrong", error: error.message });
  }
});

notesRoute.post("/create", async (req, res) => {
  try {
    const note = new NotesModel(req.body);
    await note.save();
    res.send({ msg: "Notes Created" });
  } catch (error) {
    res.send({ msg: "not Created Notes", error: error.message });
  }
});

notesRoute.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await NotesModel.findByIdAndUpdate({ _id: ID },payload);
    res.send({ msg: "Notes has been updated" });
  } catch (error) {
    res.send({ msg: "not Created Notes", error: error.message });
  }
});

notesRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await NotesModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: "Notes has been deleted" });
  } catch (error) {
    res.send({ msg: "not Created Notes", error: error.message });
  }
});

module.exports = { notesRoute };
