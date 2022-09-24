const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const customSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

/*
// const workItemsSchema = new mongoose.Schema({
//   name: String,
// });
*/

const Item = mongoose.model("Item", itemsSchema);

const Custom = mongoose.model("Custom", customSchema);

// const workItem = mongoose.model("workItem", workItemsSchema);

const default_task1 = new Item({
  name: "Welcome to your ToDoList!",
});

const default_task2 = new Item({
  name: "Brush your Teeth!",
});

const default_task3 = new Item({
  name: "<<- Hit this to delete a Task!",
});

/*
// const default_worktask1 = new Item({
//   name: "Check your Emails!",
// });
*/

/*
// Item.find(function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     result.forEach((element) => {
//       console.log(element.name);
//     });
//   }
// });
*/

/*
// workItem.find(function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     result.forEach((element) => {
//       console.log(element.name);
//     });
//   }
// });
*/

function createItem(string) {
  let new_item = new Item({
    name: string,
  });
  pushItem(new_item);
}

/*
// function createWorkItem(string) {
//   let new_item = new workItem({
//     name: string,
//   });
//   pushWorkItem(new_item);
// }
*/

function pushItem(new_item) {
  Item.insertMany([new_item], function (err) {
    if (err) {
      console.log(err);
    }
  });
}

/*
function pushWorkItem(new_item) {
  workItem.insertMany([new_item], function (err) {
    if (err) {
      console.log(err);
    }
  });
}
*/
function pushCustomItem(new_item) {
  Custom.insertMany([new_item], function (err) {
    if (err) {
      console.log(err);
    }
  });
}

app.get("/", function (req, res) {
  // let today = new Date();
  // let options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  // };
  // let day = today.toLocaleDateString("en-IN", options);

  Item.find(function (err, everything_in_Item_collection) {
    if (err) {
      console.log(err);
    } else {
      if (everything_in_Item_collection.length === 0) {
        pushItem(default_task1);
        pushItem(default_task2);
        pushItem(default_task3);
        res.redirect("/");
      }
      res.render("index", {
        kindOfDay: "General",
        newListItems: everything_in_Item_collection,
      });
    }
  });
});

app.get("/:customPage", function (req, res) {
  // console.log(req.params.customPage);
  const customPageName = req.params.customPage;

  Custom.findOne({ name: customPageName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // console.log("Doesn't Exist");
        const custom = new Custom({
          name: customPageName,
          items: [default_task1, default_task2, default_task3],
        });
        pushCustomItem(custom);
        res.redirect("/" + customPageName);
      } else {
        // console.log("Already Exists");
        res.render("index", {
          kindOfDay: customPageName,
          newListItems: foundList.items,
        });
      }
    }
  });
});

/*
// app.get("/work", function (req, res) {
//   workItem.find(function (err, everything_in_workItem_collection) {
//     if (err) {
//       console.log(err);
//     } else {
//       if (everything_in_workItem_collection.length === 0) {
//         pushWorkItem(default_worktask1);
//         res.redirect("/work");
//       }
//       res.render("index", {
//         kindOfDay: "work",
//         newListItems: everything_in_workItem_collection,
//       });
//     }
//   });
// });
*/

app.listen(3000, function () {
  console.log(`server started succesfully at port:3000`);
});
app.post("/", function (req, res) {
  let user_entered_item = req.body.newItem;
  let kind_Of_Day = req.body.button;
  console.log(kind_Of_Day);

  if (user_entered_item === "") {
    // if (req.body.button === "work") {
    //   res.redirect("/work");
    // } else {
    if (kind_Of_Day === "General") {
      res.redirect("/");
    }
    res.redirect("/" + kind_Of_Day);
    // }
  } else {
    // if (req.body.button === "work") {
    //   createWorkItem(user_entered_item);
    //   res.redirect("/work");
    // } else {
    if (kind_Of_Day === "General") {
      createItem(user_entered_item);
      res.redirect("/");
    } else {
      Custom.findOne({ name: kind_Of_Day }, function (err, foundList) {
        if (!err) {
          let temp = new Item({
            name: user_entered_item,
          });
          foundList.items.push(temp);
        }
      });
      res.redirect("/" + kind_Of_Day);
    }
  }
  // }
});

app.post("/delete", function (req, res) {
  //   console.log(req.body.check_box);
  Item.deleteOne({ _id: req.body.check_box }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});
