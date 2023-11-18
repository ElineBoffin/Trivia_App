const flags = [
    {
        question: "Which country does this flag belong to?",
        imgSrc: "../../images/flags/Belgium.png",
        options: ["Netherlands", "Germany", "France", "Belgium"],
        correctAnswer: "Belgium"
    },
    // Add more quiz data as needed
];

let currentQuestion = 0;
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");

function loadQuestion() {
    const currentFlag = flags[currentQuestion];
    questionContainer.innerHTML = `<img src="${currentFlag.imgSrc}" alt="Flag">`;
    
    optionsContainer.innerHTML = "";
    for (let i = 0; i < currentFlag.options.length; i++) {
        const option = document.createElement("div");
        option.className = "option";
        option.innerHTML = currentFlag.options[i];
        option.setAttribute("onclick", `checkAnswer('${currentFlag.options[i]}')`);
        optionsContainer.appendChild(option);
    }
}

function checkAnswer(answer) {
    const currentFlag = flags[currentQuestion];
    if (answer === currentFlag.correctAnswer) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    if (currentQuestion < flags.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        alert("Quiz completed!");
        currentQuestion = 0;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < flags.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        alert("Quiz completed!");
        currentQuestion = 0;
        loadQuestion();
    }
}

// Initial load
loadQuestion();
