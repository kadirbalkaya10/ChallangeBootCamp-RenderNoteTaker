//DEPENDENCIES

const notes = require("express").Router();
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

//Api Routes==================

//Get
notes.get("/", (req, res) => {
  // Reads file db.json in db folder
  readFromFile("./db/db.json").then((data) => {
    // returns that respon
    res.json(JSON.parse(data));
  });
});

// Post
notes.post("/", (req, res) => {
  // Extracting 'title' and 'text' from the request body
  const { title, text } = req.body;

  // Checking if both 'title' and 'text' are provided in the request body
  if (title && text) {
    // Creating a new note object with provided 'title', 'text', and a unique ID generated using uuidv4()
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Appending the new note to the file "./db/db.json"
    readAndAppend(newNote, "./db/db.json");

    // Constructing a response object with status and the new note's body
    const response = {
      status: "succes",
      body: newNote,
    };

    // Sending a JSON response with the created note
    res.json(response);
  } else {
    // If 'title' or 'text' is missing in the request body, send an error message
    res.json("Error in posting new note");
  }
});

//Delete
// Delete request handler for deleting a note with a specific ID
notes.delete("/:id", (req, res) => {
  // Extracting the note ID from the request parameters
  const { id } = req.params;

  // Reading data from the JSON file containing notes
  readFromFile("./db/db.json").then((data) => {
    // Parsing the JSON data into a JavaScript object (an array of notes)
    let notes = JSON.parse(data);
    // Logging the current state of the notes array
    console.log(notes);
    // Finding the index of the note with the given ID in the notes array
    const deletedNote = notes.findIndex((note) => note.id === id);
    // Logging the index of the note to be deleted
    console.log(`deleted note is ${deletedNote}`);
    // Checking if the note with the given ID exists in the notes array
    if (deletedNote !== -1) {
      // If the note exists, removing it from the notes array
      notes.splice(deletedNote, 1);
      // Logging the updated state of the notes array after deletion
      console.log(notes);

      // Writing the updated notes array back to the JSON file
      writeToFile("./db/db.json", notes);
      // Sending a success response with status code 204 (No Content) to indicate successful deletion
      res.status(204).send();
    }
  });
});

module.exports = notes;
