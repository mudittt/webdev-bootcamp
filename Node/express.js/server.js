const express = require("express");
const app = express();
app.use(express.static(__dirname));
//
app.get("/", function (req, res) {
  res.send("home page of the server");
});

app.get("/contact", function (req, res) {
  res.send("contact me @mudittyagi2002@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("i am a student. currently learning full-stack web development.");
});

app.get("/projects", function (req, res) {
  res.send("<ul><li>c-basics</li><li>cpp-basics</li></ul>");
});
//

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
