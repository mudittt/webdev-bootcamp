const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let items = ["Buy the food", "Cook the food", "Eat the food", "Wash your face"];
let workItems = ["Check your mails/Spams"];
app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  /*
  let currentDay = today.getDay();
  let day = "";
  switch (currentDay) {
    case 0:
      day = "Sunday :DD";
      break;
    case 1:
      day = "Monday :(((";
      break;
    case 2:
      day = "Tuesday :((";
      break;
    case 3:
      day = "Wednesday :(";
      break;
    case 4:
      day = "Thursday :{";
      break;
    case 5:
      day = "Friday :}";
      break;
    case 6:
      day = "Saturday :D";
      break;
    default:
      break;
  }
  */
  let day = today.toLocaleDateString("en-IN", options);
  // passed the items-array and which day it is
  res.render("index", { kindOfDay: day, newListItems: items });
});

app.get("/work", function (req, res) {
  res.render("index", { kindOfDay: "work", newListItems: workItems });
});

app.listen(3000, function () {
  console.log(`server started succesfully at port:3000`);
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.button === "work") {
    workItems.push(`${item}`);
    res.redirect("/work");
  } else {
    items.push(`${item}`);
    res.redirect("/");
  }
});
