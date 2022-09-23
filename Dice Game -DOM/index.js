// This will generate a random number between 1-6
let randomNumber = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

//
let numberINstring = "none";
switch (randomNumber) {
  case 1:
    // if randomly '1' is generated
    numberINstring = "fa-solid fa-dice-one";
    break;
  case 2:
    numberINstring = "fa-solid fa-dice-two";
    break;
  case 3:
    numberINstring = "fa-solid fa-dice-three";
    break;
  case 4:
    numberINstring = "fa-solid fa-dice-four";
    break;
  case 5:
    numberINstring = "fa-solid fa-dice-five";
    break;
  case 6:
    numberINstring = "fa-solid fa-dice-six";
    break;

  default:
    break;
}

//
let numberINstring2 = "none";
switch (randomNumber2) {
  case 1:
    numberINstring2 = "fa-solid fa-dice-one";
    break;
  case 2:
    numberINstring2 = "fa-solid fa-dice-two";
    break;
  case 3:
    numberINstring2 = "fa-solid fa-dice-three";
    break;
  case 4:
    numberINstring2 = "fa-solid fa-dice-four";
    break;
  case 5:
    // if randomly '5' is generated
    numberINstring2 = "fa-solid fa-dice-five";
    break;
  case 6:
    numberINstring2 = "fa-solid fa-dice-six";
    break;

  default:
    break;
}

// DOM
// it will target the icon inside the class "icon".
// and set its class attribute to the randomly generated string
document.querySelector(".icon i").setAttribute("class", `${numberINstring}`);
document.querySelector(".icon2 i").setAttribute("class", `${numberINstring2}`);

// to check who won?
if (randomNumber > randomNumber2) {
  // it will target the class "result".
  // and add a text-content to it.
  document.querySelector(".result").textContent = "You won !!!";
} else if (randomNumber < randomNumber2) {
  document.querySelector(".result").textContent = "Mudit won !!!";
} else {
  document.querySelector(".result").textContent = "Looks like a Draw";
}
