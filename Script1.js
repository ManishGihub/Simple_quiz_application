/* qeustions - It is an array of objects containing question and answers. 
Each answers contains two properties text(which define answer choice) and 
correct(which defines correctness of answer like true/false). */

const questions = [
  {
    question: "which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraff", correct: false },
    ],
  },
  {
    question: "which is largest continent in the world?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "Australia", correct: false },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "which is fruit among the following?",
    answers: [
      { text: "Mango", correct: true },
      { text: "Jawar", correct: false },
      { text: "Wheat", correct: false },
      { text: "Gobi", correct: false },
    ],
  },
  {
    question: "which is largest statue in the world",
    answers: [
      { text: "Vishwas Swaroopam", correct: false },
      { text: "Laykyun Sekkya", correct: false },
      { text: "Spring Temple Buddha", correct: false },
      { text: "Statue of Unity", correct: true },
    ],
  },
];

/* Here 3 variables are created for questions, answer-buttons 
and next-button */

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0; //defines current question index
let score = 0; //defines score
let timer; // Variable to store the timer
let timeLeft = 10; // Initial time left

/* startQuize() function defines starting quiz values for currentQuestionIndex 
 and score (initially 0).It also sets the text of next button to Next and 
 calls showQuestion() function. */

function startQuize() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 10; // Reset the time left
  nextButton.innerHTML = "Next";
  shuffleQuestions(); // Shuffle the questions array
  showQustion();
  startTimer();
}

/* showQustion() function helps in defining questions dynamically. It
changes question text as well as button text dynamically. It calls 
selectAnswer() function on answer-button click event */

function showQustion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

/* resetState() function reset all display. It hides button and
remove all option answer answer buttons.*/

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/* selectAnswer() function check whether selected answer is 
correct or not. If answer is correct score will be updated
by 1. Classes gets added dynamically on the basis of 
correctness of answer gives green or red color to answers.
function also disable all the button once selected any one.*/

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/* showScore() function display the final quiz score out of total
question. change the button text to play quiz again. */

function showScore() {
  resetState();
  questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

/* handleNextButton() handles next button. It calls showQustion()
and showScore() function on the basis of condition. */

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQustion();
  } else {
    clearInterval(timer);
    showScore();
  }
}

/* shuffleQuestions() function shuffles the qustions using 
random function. */

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements randomly
  }
}

/* EventListener added on next button to handle application
dynamically. it will call handleNextButton() and startQuize()
function on the basis of condition. */

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuize();
  }
});

/* startTimer() function starts timer of quiz application 
and displays the score after 10 seconds. */

function startTimer() {
  timer = setInterval(() => {
    timeLeft--; // Decrease time left
    if (timeLeft >= 0) {
      timerElement.innerText = `Time left: ${timeLeft} seconds`; // Update timer element
    } else {
      clearInterval(timer); // Clear the timer
      showScore();
    }
  }, 1000); // Update every second
}

// calling startQuiz() function to start quiz application
startQuize();
