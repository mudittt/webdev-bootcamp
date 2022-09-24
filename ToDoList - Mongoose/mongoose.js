const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://admin-mudit:mudit-admin@cluster0.oey3nun.mongodb.net/todolistDB");
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const customSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

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

function createItem(string) {
  let new_item = new Item({
    name: string,
  });
  pushItem([new_item]);
}

function pushItem([new_item]) {
  Item.insertMany(new_item, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function createItemforCustom(string) {
  let ItemOfCustom = new Item({
    name: string,
  });
  return ItemOfCustom;
}

app.get("/", function (req, res) {
  Item.find(function (err, everything_in_Item_collection) {
    if (err) {
      console.log(err);
    } else {
      if (everything_in_Item_collection.length === 0) {
        pushItem([default_task1]);
        pushItem([default_task2]);
        pushItem([default_task3]);
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
  // this will store the value of what we entered after "/"
  const customPageName = req.params.customPage;

  Custom.findOne({ name: customPageName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // console.log("Doesn't Exist");
        const custom = new Custom({
          name: customPageName,
          items: [default_task1, default_task2, default_task3],
        });
        custom.save();
        res.redirect(`/${customPageName}`);
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

app.listen(3000, function () {
  console.log(`server started succesfully at port:3000`);
});

app.post("/", function (req, res) {
  let user_entered_item = req.body.newItem;
  // the input we entered to add in our todolist

  let customPageName = req.body.button;
  // the parameter we entered in the link after "/"

  if (user_entered_item === "") {
    if (customPageName === "General") {
      res.redirect("/");
    }
    res.redirect(`/${customPageName}`);
  } else {
    if (customPageName === "General") {
      createItem(user_entered_item);
      res.redirect("/");
    } else {
      Custom.findOne({ name: customPageName }, function (err, foundList) {
        if (!err) {
          // console.log(foundList);
          // console.log(createItemforCustom(user_entered_item));
          foundList.items.push(createItemforCustom(user_entered_item));
          foundList.save();
          res.redirect(`/${customPageName}`);
        }
      });
    }
  }
});

app.post("/delete", function (req, res) {
  const tickedID = req.body.check_box;
  const PageName = req.body.PageName;

  if (PageName === "General") {
    Item.deleteOne({ _id: tickedID }, function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/");
  } else {
    // Custom.findOne({ name: PageName }, function (err, docs) {
    //   if (!err) {
    //     console.log(docs.items);
    //   }
    // });

    Custom.findOneAndUpdate(
      { name: PageName },
      {
        $pull: { items: { _id: { $in: tickedID } } },
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        }
        // console.log(docs);
        res.redirect(`/${PageName}`);
      }
    );
  }
});
