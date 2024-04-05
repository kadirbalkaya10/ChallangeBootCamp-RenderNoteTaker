// DEPENDENCIES===================
// Importing the 'Router' function from the 'express' module
const router = require("express").Router();
// Importing the router module for handling notes-related routes
const notesRouter = require("./notes");

router.use("./notes.js", notesRouter);

// Exporting the router instance, making it available for use in other files
module.exports = router;
