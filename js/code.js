let currentQuestion = 0;
let questions = [];

//fetch quiestions from api
async function getQuestions() {
  fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple').then(result => result.json()).then(
    data => {
        questions = data.results;
        showQuestion();
    }
  ).catch();
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

// Fetch questions
getQuestions();