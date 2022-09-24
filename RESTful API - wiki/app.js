const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { application } = require("express");

//
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
mongoose.connect("mongodb://localhost:27017/wikiDB");
//

//
const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);
//

app.listen(8800, function () {
  console.log("Succesfully started the server at port:8800");
});

app
  .route("/articles")
  .get(function (req, res) {
    Article.find(function (error, results) {
      if (!error) {
        res.send(results);
      } else {
        res.send(error);
      }
    });
  })
  .post(function (req, res) {
    const temp = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    temp.save(function (error) {
      if (!error) {
        res.send("successfully added a new document.");
      } else {
        res.send(error);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("succesfully deleted all documents in 'Articles'.");
      }
    });
  });

//

app
  .route("/articles/:specificArticle")
  .get(function (req, res) {
    Article.findOne(
      { title: req.params.specificArticle },
      function (error, results) {
        if (results) {
          res.send(results);
        } else {
          res.send("No such articles found.");
        }
      }
    );
  })
  .put(function (req, res) {
    Article.replaceOne(
      { title: req.params.specificArticle },
      { title: req.body.title, content: req.body.content },
      function (error) {
        if (!error) {
          res.send("successfully replaced a document.");
        } else {
          res.send(error);
        }
      }
    );
  })
  .patch(function (req, res) {
    Article.updateOne(
      { title: req.params.specificArticle },
      { $set: req.body },
      function (error) {
        if (!error) {
          res.send("successfully patched a document.");
        } else {
          res.send(error);
        }
      }
    );
  })
  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.specificArticle }, function (error) {
      if (!error) {
        res.send("successfully deleted the document.");
      } else {
        res.send(error);
      }
    });
  });
