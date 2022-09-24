const md5 = require("md5");

app.route("/register").post((req, res) => {
  const newUser = new Account({
    username: req.body.username,
    password: md5(req.body.password),
  });
  newUser.save((err) => {
    if (!err) {
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

//
app.route("/login").post((req, res) => {
  Account.findOne({ username: req.body.username }, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      if (results) {
        if (results.password === md5(req.body.password)) {
          res.render("secrets");
        }
      } else {
        res.send("INVALID!");
      }
    }
  });
});
