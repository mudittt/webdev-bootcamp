const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(process.env.PORT || 5500, function () {
  console.log("server started succesfully at port:5500 ");
});

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.emailAddress;
  console.log(fName);
  console.log(lName);
  console.log(email);

  // all the entered details in an object form.
  // mailchimp docs - format
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  // compressed the entered data
  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  // url of the list in which the entered data will be stored.
  const url = "https://us13.api.mailchimp.com/3.0/lists/78003c9c5e";
  // we are posting the data
  // my admin id, original one will be found in .env file (auth&security)
  // MAIL_CHIMP_AUTH
  const options = {
    method: "POST",
    auth: "admin:34338153d6-notavalidid-6503ef8c4f5-us13",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(`${__dirname}/success.html`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.post("/success", function (req, res) {
  res.redirect("/");
});

// api 34338153d6717835d42d26503ef8c4f5-us13
// list id 78003c9c5e
// https://us13.api.mailchimp.com/3.0
