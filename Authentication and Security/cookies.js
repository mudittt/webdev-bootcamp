const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
// const LocalStrategy = require("passport-local");
//
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    cookie: {},
  })
);
app.use(passport.initialize());
app.use(passport.session());

// define a new Schema from mongoose Schema class
accountSchema.plugin(passportLocalMongoose);
// to hash and salt our passwords and save them to our database

// define a model, then -
passport.use(Account.createStrategy());
// passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//
app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

//
app.route("/register").post((req, res) => {
  // passport-local-mongoose
  Account.register(
    {
      username: req.body.username,
    },
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    }
  );
});

//
app.route("/login").post((req, res) => {
  const newUser = new Account({
    username: req.body.username,
    password: req.body.password,
  });

  //passport
  req.login(newUser, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});
