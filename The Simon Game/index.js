let gamePattern = [];
let buttonNumber = ["one", "two", "three", "four"];
let userClickedPattern = [];
let Level = 1;
let Started = false;

/* to check if the user clicked the right buttons. */
/* In sequence with the randomly generated buttons. */
function checkAnswer() {
  if (gamePattern.toString() === userClickedPattern.toString()) {
    return true;
  } else {
    wrongAnswer();
    startOver();
    return false;
  }
}

/* generating the first button of the game pattern when user presses a key */
$(document).keydown(function (e) {
  if (!Started) {
    nextSequence();
    Started = true;
  }
});

//
function nextSequence() {
  /* for generating a random number between (1-4) */
  let randomNumber = Math.floor(Math.random() * 4);

  /* using the random number generated as an index of an array */
  let randomColorChosen = buttonNumber[randomNumber];

  /* pushing the randomly chosen color to an game-array */
  /* using the random number generated as an index of an array */
  /* pushing the randomly chosen color to an array */
  gamePattern.push(randomColorChosen);

  /* calling button animator function for randomColorChosen */
  animateButton(randomColorChosen);

  /* calling sound generating function for randomColorChosen */
  generateSound(randomColorChosen);

  // incrementing level
  $("h1").text(`Level - ${Level}`);
  Level++;
}

/* using the random number generated as an index of an array */
// let randomColorChosen = buttonNumber[nextSequence()];
/* pushing the randomly chosen color to an array */
// gamePattern.push(randomColorChosen);
/* calling sound generating function for randomColorChosen */
// generateSound(randomColorChosen);
/* calling button animator function for randomColorChosen */
// animateButton(randomColorChosen);

//

/* genrating a sound effect for different buttons */
function generateSound(element) {
  switch (`${element}`) {
    case "one":
      let one = new Audio("sounds/red.mp3");
      one.play();
      break;
    case "two":
      let two = new Audio("sounds/yellow.mp3");
      two.play();
      break;
    case "three":
      let three = new Audio("sounds/blue.mp3");
      three.play();
      break;
    case "four":
      let four = new Audio("sounds/green.mp3");
      four.play();
      break;
    default:
      break;
  }
}

/* To animate the randomly selected color. */
/* It will make the box disappear and then reappear */
function animateButton(element) {
  $(`#${element}`)
    .animate(
      {
        opacity: "0",
      },
      "Fast"
    )
    .animate(
      {
        opacity: "1",
      },
      "Fast"
    );
}

/* To animate the user clicked button. */
function animateClickedButton(id) {
  $(`#${id}`).addClass(`pressed-${id}`);
  setTimeout(() => {
    $(`#${id}`).removeClass(`pressed-${id}`);
  }, 100);
}

// what happens when user clicks a button
$(".btn").click(function () {
  // will contain the id of that clicked-btn
  let userChosenColour = `${$(this).attr("id")}`;

  /* pushing the clicked button's id into an user-array */
  userClickedPattern.push(userChosenColour);

  /* calling sound generating function for userChosenColour*/
  generateSound(userChosenColour);

  /* calling button animator function for userChosenColour */
  animateClickedButton(userChosenColour);

  /* to check if the clicked button is right or wrong */
  if (userClickedPattern.length + 1 === Level) {
    if (checkAnswer()) {
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
});

/* what happens when the user makes a mistake in selecting the right button */
function wrongAnswer() {
  $("body").addClass("wrong");
  $("h1").text(`Game Over.`);
  setTimeout(() => {
    $("body").removeClass("wrong");
  }, 200);
}

// to restart the game
function startOver() {
  Level = 1;
  Started = false;
  gamePattern = [];
  userClickedPattern = [];
  setTimeout(() => {
    $("h1").text(`Press Any Key to Start.`);
  }, 1000);
}
