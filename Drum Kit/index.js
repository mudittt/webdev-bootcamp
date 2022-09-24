// click detection
// this will add the 'click' event listner to every button
for (
  let index = 0;
  index < document.querySelectorAll("button").length;
  index++
) {
  // sound is a function which will get all the details of that click event.
  document.querySelectorAll("button")[index].addEventListener("click", sound);
}

// keypress detection
// this will add the 'keydown' event listner to every button
document.addEventListener("keydown", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

// sending inner-html-element of the perticular button to another function which generates sound
function sound(params) {
  makeSound(this.innerHTML);
  buttonAnimation(this.innerHTML);
}

// function which generates sound.
function makeSound(buttonInnerHTML) {
  switch (buttonInnerHTML) {
    case "w":
      let crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "a":
      let kickbass = new Audio("sounds/kick-bass.mp3");
      kickbass.play();
      break;
    case "s":
      let snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "d":
      let tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
    case "j":
      let tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case "k":
      let tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
    case "l":
      let tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
    default:
      // alert(`Enter a valid key -> [ W , A , S , D , J , K , L ]`);
      break;
  }
}

// the function which will animate the clicked button by adding a class to it
// and them removing it.
function buttonAnimation(pressedKey) {
  let activeButton = document.querySelector(`.${pressedKey}`);

  // adding a class
  activeButton.classList.add("pressed");

  // removing the class after a while
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
