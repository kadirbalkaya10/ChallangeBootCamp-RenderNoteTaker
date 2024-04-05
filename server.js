//DEPENDENCIES=========================

const express = require("express");
const path = require("path");
const api = require("./routes/notes.js");

// APP / PORT==========================
const app = express();
const PORT = process.env.PORT || 3001;

//MIDDLEWARE===========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", api);

//For static pages ,that we would like show ,it will look for folder called public and it will take whatevery inside and its gonna render all for us
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
//GET Route for homepage
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// START THE APP=======================
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
