let currentQuestion = 0;
let questions = [];
let score = 0;
updateScoreDisplay();

//shuffle answers every round;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//fetch easy quiestions from api
async function getQuestionsEasy() {
  fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple').then(result => result.json()).then(
    data => {
        questions = data.results;
        shuffleQuestions();
        showQuestion();
    }
  ).catch();
}

//fetch easy quiestions from api
async function getQuestionsMedium() {
  fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple').then(result => result.json()).then(
    data => {
        questions = data.results;
        shuffleQuestions();
        showQuestion();
    }
  ).catch();
}

//fetch easy quiestions from api
async function getQuestionsHard() {
  fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple').then(result => result.json()).then(
    data => {
        questions = data.results;
        shuffleQuestions();
        showQuestion();
    }
  ).catch();
}

//shuffles question so every answer is on a different place.
function shuffleQuestions() {
  shuffle(questions);
}

//show the questions and answers
function showQuestion() {
  //the box with questions and answers
  const questionContainer = document.getElementById('question-container');
  //question
  const questionElement = document.getElementById('question');
  //this container contains the answer options
  const optionsContainer = document.getElementById('options-container');
  const feedbackElement = document.getElementById('feedback');

  const current = questions[currentQuestion];
  questionElement.innerHTML = current.question;
  optionsContainer.innerHTML = '';

  //Shows all answer options
  const allOptions = [...current.incorrect_answers, current.correct_answer];
  shuffle(allOptions);

  allOptions.forEach((option) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(optionElement);
  });

  //changes questioncontainer back to white after a answerd question
  feedbackElement.innerHTML = '';
  questionContainer.style.backgroundColor = '#fff';
}

//checks the answer if its correct or wrong.
function checkAnswer(selectedOption) {
  const feedbackElement = document.getElementById('feedback');
  const questionContainer = document.getElementById('question-container');
  const options = document.querySelectorAll('.option');

  const correctAnswer = questions[currentQuestion].correct_answer;

  //Options changes color
  options.forEach(option => {
    if (option.textContent === correctAnswer) {
      // Correct answer will turn green and update score
      option.style.backgroundColor = '#8bc34a';
      score++;
      updateScoreDisplay();
    } else if (option.textContent === selectedOption) {
      // Clicked incorrect answer will turn red and not update score
      option.style.backgroundColor = '#ff5722';
      score--;
      updateScoreDisplay();
    }
    //multiple click disabled
    option.onclick = null;
  });
  //shows if the answer is correct or wrong by text (for colorblind people)
  feedbackElement.innerHTML = selectedOption === correctAnswer ? 'Correct!' : 'Wrong!';
}


//Delay on quiestion click, to show the correct answer
function nextQuestion() {
        let delay = 1000;
      setTimeout( next, delay )
      
    function next() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            //after completing redirect to end page
            window.location.href = "../../html/End.html?score=" + score;
        }
    }   
}

// check specific string is present in url
const checkUrl = (url) => {
  if (url.includes('Easy')) {
    getQuestionsEasy();
  } else if (url.includes('Medium')) {
    getQuestionsMedium();
  } else if (url.includes('Hard')) {
    getQuestionsHard();
  }
}

// retrieve the current url and pass it to checkUrl
const currentUrl = window.location.href;
checkUrl(currentUrl);


// Function to update score display
function updateScoreDisplay() {
  if (document.getElementById('score')) {
    document.getElementById('score').innerHTML = score;
  }
}

// Get the quiz score from local storage
let quizScore = localStorage.getItem('quizScore');
if (!quizScore) {
    quizScore = 0;
}

// Display the quiz score
const urlParams = new URLSearchParams(window.location.search);
const finalscore = parseInt(urlParams.get('score'));
document.getElementById('quiz-score').textContent = 'Your score is: ' + finalscore;

// Save the score to local storage with the user's name
document.getElementById('save-score').addEventListener('click', function() {
    let userName = document.getElementById('user-name').value;
    if (userName) {
        let scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push({ name: userName, score: finalscore });
        localStorage.setItem('scores', JSON.stringify(scores));
        alert('Your score has been saved.');
    }
});

// Play again button
document.getElementById('play-again').addEventListener('click', function() {
    window.location.href = "../../html/animals/Easy.html"; 
});

// Go back to homepage button
document.getElementById('go-back').addEventListener('click', function() {
    window.location.href = "../../html/index.html"; 
});
