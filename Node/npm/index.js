const fs = require("fs");
fs.copyFileSync("file.txt", "copied-file.txt");

// included 'superheroes' package in our project
const superheroes = require("superheroes");
// included 'supervillains' package in our project
const supervillains = require("supervillains");

// using 'superheroes'
let mySuperHeroName = superheroes.random();
console.log(mySuperHeroName);
// using 'supervillains'
let myVillainName = supervillains.random();
console.log(myVillainName);
