const bcrypt = require("bcrypt");
const saltRounds = 10;

//
app.route("/register").post((req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new Account({
      username: req.body.username,
      password: hash,
    });
    newUser.save((err) => {
      if (!err) {
        res.render("secrets");
      } else {
        console.log(err);
      }
    });
  });
});

//
app.route("/login").post((req, res) => {
  Account.findOne({ username: req.body.username }, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      if (results) {
        bcrypt.compare(req.body.password, results.password, (err, done) => {
          if (done) {
            // done -> either TRUE or FALSE
            res.render("secrets");
          }
        });
      } else {
        res.send("INVALID!");
      }
    }
  });
});
