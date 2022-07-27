/* ----------------------------- page selectors ----------------------------- */

const quizGameWrapper = document.querySelector('.quiz-game-wrapper');
const questionAsked = document.querySelector('.question-text');
const answersList = document.querySelector('.answers-list');
const choiceBtns = document.querySelectorAll('.choice-btns');
const timeCounter = document.querySelector('.time-counter');
const answerStatus = document.querySelector('.answer-status-text');
const questionCounterText = document.querySelector('.question-counter');
const scoreText = document.querySelector('.score');
const quizCompletedWrapper = document.querySelector('.quiz-completed-wrapper');

/* ------------------------ quiz rules and variables ------------------------ */

// variables for questions
let currentQuestion = {};
let acceptingAnswers = false;
let scoreCounter = 0;
let availableQuestions = [];
let questionCounter = -1;

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// Quiz rules variables
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
let seconds = MAX_QUESTIONS * 15;

/* --------------------------- HTML to be injected -------------------------- */

const quizGameCompletedPage = `
<h1 class="quiz-completed-title colorful-headers">Quiz Quashed!</h1>
      <p class="final-score-text">
        Your final score is <span class="result-number">69</span>
      </p>
      <form class="player-highscore-form">
        <label for="playerName" class="player-name-label"
          >Enter your name:</label
        >
        <input type="text" name="playerName" id="playerName" />
        <input type="submit" value="Submit" id="submitNameBtn" disabled />
      </form>
`;

/* ---------------------------- quiz.io api call ---------------------------- */

// API call variables
const quizIOAPIKey = 'Uvyti6DXt1klHzPKT90h8U7tc6ejhoCk45Jm05zb';
const quizQueryURL = `https://quizapi.io/api/v1/questions?apiKey=${quizIOAPIKey}&difficulty=Easy&limit=10&tags=JavaScript`;

let questionArray = [];

// store data in an array of objects
async function getQuestions() {
    const response = await fetch(quizQueryURL);
    const questions = await response.json();
    return (questionArray = questions);
}

getQuestions();

// answers.answer_a
// question
// correct answer

// function printQuestions() {
//     questionArray.map((loadedQuestion) => {
//         const formattedQuestion = {
//             question: loadedQuestion.question,
//         };

//         const correctAnswer = loadedQuestion.correct_answer;
//     });
// }

/* -------------- remove quiz game page and add completed page -------------- */

function removeAllChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateCompletedQuiz() {
    // Removes the quiz game from the DOM
    removeAllChildElements(quizGameWrapper);
    // Make the quiz game wrapper invisible
    quizGameWrapper.style.display = 'none';
    // Display the quiz completed wrapper
    quizCompletedWrapper.style.display = 'flex';
    // Purify the HTML to be added
    const cleanCompletedPage = DOMPurify.sanitize(quizGameCompletedPage, { USE_PROFILE: { html: true } });
    // Add purified completed quiz page
    quizCompletedWrapper.innerHTML += cleanCompletedPage;
    // Update the final score text
    const resultText = document.querySelector('.result-number');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    resultText.innerText = mostRecentScore;
    return quizCompletedWrapper;
}

/* ----------------- submit final score to high scores page ----------------- */

function completedQuizPage() {
    // Selectors for the generated page
    const resultText = document.querySelector('.result-number');
    const playerNameForm = document.querySelector('.player-highscore-form');
    const playerName = document.getElementById('playerName');
    const submitNameBtn = document.getElementById('submitNameBtn');

    // Maximum number of high scores displayed

    // Get a reference to the most recent score
    const mostRecentScore = localStorage.getItem('mostRecentScore');

    // Get a reference to the high scores
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Event for player name submit btn
    playerName.addEventListener('keyup', () => {
        submitNameBtn.disabled = !playerName.value;
    });

    function submitHighScore(e) {
        e.preventDefault();
        // Store the score in an object
        const score = {
            score: mostRecentScore,
            name: playerName.value,
        };
        // push the score into the array
        highScores.push(score);
        // sort from highest score to lowest score
        highScores.sort((a, b) => b.score - a.score);
        // cut out the lowest scores
        highScores.splice(5);
        // Save the scores to the local storage
        localStorage.setItem('highScores', JSON.stringify(highScores));
        // Go to the high scores page
        window.location.assign('/pages/highscores.html');
    }

    // event listener
    submitNameBtn.addEventListener('click', submitHighScore);
}

/* ------------------- Accessing new questions and choices ------------------ */

function getNewQuestion() {
    // Check if all the questions have been answered
    if (questionCounter >= MAX_QUESTIONS - 1) {
        // Save score to local storage
        localStorage.setItem('mostRecentScore', scoreCounter + seconds);
        // Remove quiz page and generate completed page
        generateCompletedQuiz();
        // Functions to run on completed page
        completedQuizPage();
        return;
    }

    // increment the current question counter so you can select the next question
    questionCounter++;
    // Set the question counter HUD text
    questionCounterText.innerText = `${questionCounter + 1}/${MAX_QUESTIONS}`;

    // Access the current question property
    currentQuestion = availableQuestions[questionCounter];
    // set the question text to the current question being asked
    questionAsked.innerText = currentQuestion.question;

    // fill the choice btns with answer choices
    choiceBtns.forEach((choice) => {
        const { number } = choice.dataset;
        choice.innerText = currentQuestion[`choice${number}`];
    });

    acceptingAnswers = true;
}

/* ------------------------ increment score function ------------------------ */

function incrementScore(number) {
    scoreCounter += number;
    // Set the score text to the current score count
    scoreText.innerText = scoreCounter;
}

/* --------------------- event listeners for choice btns -------------------- */

choiceBtns.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        // If we're not ready to accept the answers then we return
        if (!acceptingAnswers) return;

        // To stop the player from clicking immediately
        acceptingAnswers = false;
        // Get the current button
        const selectedBtnChoice = e.target;
        // Get the data-number data attribute
        const selectedAnswer = selectedBtnChoice.dataset.number;

        // Check if the choice selected was the correct answer and display the results visually
        let idToApplyBtn = 'incorrect';
        if (selectedAnswer === String(currentQuestion.answer)) {
            idToApplyBtn = 'correct';
            // Increment score if correct
            incrementScore(CORRECT_BONUS);
            // Style the answer correct text
            answerStatus.style.visibility = 'visible';
            answerStatus.classList.add('correct-status-text');
            answerStatus.innerText = 'CORRECT!';
        } else {
            // Style the answer incorrect text
            answerStatus.style.visibility = 'visible';
            answerStatus.classList.add('incorrect-status-text');
            answerStatus.innerText = 'INCORRECT!';
        }
        // style the button depending on whether it was correct or not
        selectedBtnChoice.setAttribute('id', idToApplyBtn);
        // remove the button styles and hide answer status text
        setTimeout(() => {
            selectedBtnChoice.removeAttribute('id');
            answerStatus.style.visibility = 'hidden';
            getNewQuestion();
        }, 1500);
    });
});

/* --------------------- starting the quiz on page load --------------------- */

function startQuiz() {
    // Timer for the quiz
    const timer = setInterval(() => {
        timeCounter.innerText = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
        }
    }, 1000);

    questionCounter = -1;
    scoreCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

startQuiz();
