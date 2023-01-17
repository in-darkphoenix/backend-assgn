const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "./upload" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("<h3>Unexpected Error</h3>");
  } else {
    console.log(file);
    res.status(201).send("<h3>File Uploaded Successfully</h3>");
  }
});

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
