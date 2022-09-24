console.log("calculator");

const express = require("express");
const app = express();

// body-parser
const bodyParser = require("body-parser");
// app.use(bodyParser.text());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
// home route
app.get("/", function (req, res) {
  //   res.send("<p>This is a calculator</p><p>Please enter two Numbers. </p>");
  res.sendFile(`${__dirname}/normal-calculator.html`);
});

// bmi route
app.get("/bmi", function (req, res) {
  res.sendFile(`${__dirname}/bmi.html`);
});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
  console.log(`${__dirname}`);
});

app.post("/", function (req, res) {
  //   console.log(req.body);
  //   console.log(req.body.num1);
  let number1 = Number(req.body.num1);
  let number2 = Number(req.body.num2);
  res.send(
    `<p>Thankyou for entering the number.</p><p>The result is ${
      number1 + number2
    }</p>`
  );
});

app.post("/bmi", function (req, res) {
  let wt = Number(req.body.weight);
  let ht = Number(req.body.height);
  //   let wt = parseFloat(req.body.weight);
  //   let ht = parseFloat(req.body.height);
  let bmi = wt / (ht * ht);
  res.send(
    `<h3>Thankyou for entering your height and weight.</h3><p>Your BMI is ${bmi}</p>`
  );
});
