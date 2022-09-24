const mongoose = require("mongoose");

// if mongooseTestDB doesn't exist, it will create a database
mongoose.connect("mongodb://localhost:27017/mongooseTestDB", {
  useNewUrlParser: true,
});

// blueprint - it lays out the foundation for every new fruits document that will be added to the database
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// model - mongoose will automatically Decapitalise the first letter and make it a plural word using _lodash i.e from "Fruit" to "fruits"
const Fruit = mongoose.model("Fruit", fruitSchema);

// creating a document
const apple = new Fruit({
  name: "apple",
  rating: 7,
  review: "pretty solid as a fruit.",
});
const kiwi = new Fruit({
  name: "kiwi",
  rating: 10,
  review: "awesome fruit.",
});
const orange = new Fruit({
  name: "orange",
  rating: 9,
  review: "sour but healthy.",
});
const banana = new Fruit({
  name: "banana",
  rating: 2,
  review: "i don't like it.",
});

// saving the document
// fruit.save();

// insert many
Fruit.insertMany([apple, kiwi, orange, banana], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully saved all fruit docs to Fruits database");
  }
});

// Creating a new Schema for a different type of document
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  favourite_fruit: fruitSchema,
});

// creating a model(database) for all the documents to get saved in
const Person = mongoose.model("Person", personSchema);

// creating a document of a person
const Mudit = new Person({
  name: "Mudit",
  age: 19.9,
  favourite_fruit: kiwi,
});

// insert many
Person.insertMany([Mudit], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully saved all person docs to person database");
  }
});

// saving the document
// person.save();

// UPDATING
Person.updateOne({ name: "Mudit" }, { gender: "male" }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully update gender.");
  }
});

// DELETING
// Fruit.deleteOne({ name: "banana" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(
//       "succesfully deleted an object with name 'banana' from fruits collection."
//     );
//   }
// });

// READING
// Fruit.find(function (err, whateverInside) {
//   if (err) {
//     console.log(err);
//   } else {
//     // mongoose.connection.close();
//     whateverInside.forEach((element) => {
//       console.log(element.name);
//     });
//   }
// });

// Person.find(function (err, whateverInside) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(whateverInside);
//   }
// });
