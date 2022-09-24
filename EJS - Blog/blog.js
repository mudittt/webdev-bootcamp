const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit corporis aperiam sit? Hic totam cumque at fuga explicabo quo tempora cupiditate architecto, quasi eligendi eaque iure aliquid ullam similique repellendus omnis, iste maiores! Voluptatibus libero enim minima perferendis modi veritatis quidem veniam distinctio consequatur adipisci, molestiae quam sunt nobis nisi illo dolor magnam animi? Animi minus, qui quas impedit reiciendis vitae quod est ipsam consectetur quam quaerat repellat praesentium tempora dolor, autem in beatae maiores dignissimos voluptatum, facilis odit molestias? Architecto nisi inventore beatae facere nesciunt molestias repudiandae. Ea inventore consectetur veritatis minus nam totam possimus qui ex corrupti commodi. Omnis facilis neque consequatur nesciunt. Assumenda temporibus tempora consectetur quidem in mollitia iure porro adipisci? Voluptas perferendis nisi recusandae porro incidunt officia possimus ex home?";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit corporis aperiam sit? Hic totam cumque at fuga explicabo quo tempora cupiditate architecto, quasi eligendi eaque iure aliquid ullam similique repellendus omnis, iste maiores! Voluptatibus libero enim minima perferendis modi veritatis quidem veniam distinctio consequatur adipisci, molestiae quam sunt nobis nisi illo dolor magnam animi? Animi minus, qui quas impedit reiciendis vitae quod est ipsam consectetur quam quaerat repellat praesentium tempora dolor, autem in beatae maiores dignissimos voluptatum, facilis odit molestias? Architecto nisi inventore beatae facere nesciunt molestias repudiandae. Ea inventore consectetur veritatis minus nam totam possimus qui ex corrupti commodi. Omnis facilis neque consequatur nesciunt. Assumenda temporibus tempora consectetur quidem in mollitia iure porro adipisci? Voluptas perferendis nisi recusandae porro incidunt officia possimus ex about?";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit corporis aperiam sit? Hic totam cumque at fuga explicabo quo tempora cupiditate architecto, quasi eligendi eaque iure aliquid ullam similique repellendus omnis, iste maiores! Voluptatibus libero enim minima perferendis modi veritatis quidem veniam distinctio consequatur adipisci, molestiae quam sunt nobis nisi illo dolor magnam animi? Animi minus, qui quas impedit reiciendis vitae quod est ipsam consectetur quam quaerat repellat praesentium tempora dolor, autem in beatae maiores dignissimos voluptatum, facilis odit molestias? Architecto nisi inventore beatae facere nesciunt molestias repudiandae. Ea inventore consectetur veritatis minus nam totam possimus qui ex corrupti commodi. Omnis facilis neque consequatur nesciunt. Assumenda temporibus tempora consectetur quidem in mollitia iure porro adipisci? Voluptas perferendis nisi recusandae porro incidunt officia possimus ex contact?";

const posts = [];

const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home", {
    Content: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    Content: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    Content: contactContent,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postsID", function (req, res) {
  let requested = _.lowerCase(req.params.postsID);
  posts.forEach((element) => {
    if (_.lowerCase(element.title) === requested) {
      res.render("post", {
        postTitle: element.title,
        postBody: element.content,
      });
    }
  });
});

app.listen(5500, function () {
  console.log("server started successfully at port:5500");
});

app.post("/", function (req, res) {
  res.send("okay");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.newTitle,
    content: req.body.newPost,
  };
  posts.push(post);
  res.redirect("/");
});
