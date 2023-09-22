const userChoice = document.querySelector(".userChoice");
const compChoice = document.querySelector(".compChoice");
const playBtns = document.querySelectorAll(".playBtns");
const buttons = document.querySelectorAll("button");
const newGameBtn = document.querySelector(".new--game");
const clickSound = document.getElementById("click");
const userScore = document.querySelector("div > .h-s-num");
const compScore = document.querySelector("div > .c-s-num");

let finalMessage = document.querySelector(".result-display > h2");
let playResult = document.querySelector(".round-result > p");
let wins, losses, playing;

function start() {
  wins = 0;
  losses = 0;
  playing = true;

  userChoice.textContent = "";
  compChoice.textContent = "";
  userScore.innerHTML = 0;
  compScore.innerHTML = 0;

  document.querySelector("body").classList.remove("player--wins");
  document.querySelector("body").classList.remove("player--loses");
  buttons.forEach((button) => button.classList.remove("finalBtns"));
  finalMessage.textContent = "Can You Win?";
  playResult.textContent = "";
}
start();

function getComputerChoice() {
  if (playing) {
    let randomChoice = Math.floor(Math.random() * 3) + 1;
    if (randomChoice == 1) {
      return "Rock";
    } else if (randomChoice == 2) {
      return "Paper";
    } else {
      return "Scissors";
    }
  }
}

function playRound(playerSelection) {
  if (playing) {
    let computerSelection = getComputerChoice();

    userScore.innerHTML = wins;
    compScore.innerHTML = losses;
    if (playerSelection == computerSelection) {
      finalMessage.textContent = "Tie game.";
    } else if (playerSelection == "Rock" && computerSelection == "Paper") {
      finalMessage.textContent = "Paper covers Rock.";
      compScore.innerHTML = losses += 1;
    } else if (playerSelection == "Rock" && computerSelection == "Scissors") {
      finalMessage.textContent = "Rock breaks Scissors!";
      userScore.innerHTML = wins += 1;
    } else if (playerSelection == "Paper" && computerSelection == "Rock") {
      finalMessage.textContent = "Paper covers Rock!";
      userScore.innerHTML = wins += 1;
    } else if (playerSelection == "Paper" && computerSelection == "Scissors") {
      finalMessage.textContent = "Scissors cuts Paper.";
      compScore.innerHTML = losses += 1;
    } else if (playerSelection == "Scissors" && computerSelection == "Paper") {
      finalMessage.textContent = "Scissors cuts Paper!";
      userScore.innerHTML = wins += 1;
    } else if (playerSelection == "Scissors" && computerSelection == "Rock") {
      finalMessage.textContent = "Rock breaks Scissors.";
      compScore.innerHTML = losses += 1;
    }

    if (userScore.innerHTML == 5) {
      playing = false;
      document.querySelector("body").classList.add("player--wins");
      finalMessage.textContent = "Congratulations,You Won!";
      playResult.textContent = "You were first to 5.";
      buttons.forEach((button) => button.classList.add("finalBtns"));
    } else if (compScore.innerHTML == 5) {
      playing = false;
      document.querySelector("body").classList.add("player--loses");
      finalMessage.textContent = "You Lost.";
      playResult.textContent = "Computer was first to 5.";
      buttons.forEach((button) => button.classList.add("finalBtns"));
    }

    userChoice.textContent = playerSelection;
    compChoice.textContent = computerSelection;
  }
}

playBtns.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
    playRound(button.innerText);
  });
});

newGameBtn.addEventListener("click", start);
