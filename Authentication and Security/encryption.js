require("dotenv").config();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/secureDB");

//
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// const secret = "thisistheendofreality";
// var secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
var secret = process.env.SECRET;
accountSchema.plugin(encrypt, {
  secret: secret,
  encryptedFields: ["password"],
});

const Account = mongoose.model("Account", accountSchema);
