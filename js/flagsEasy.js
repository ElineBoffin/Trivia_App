let currentQuestion = 0;
let score = 0;
updateScoreDisplay();

const flags = [
    {
        imgSrc: "../../images/flags/Belgium.png",
        options: ["Netherlands", "Germany", "France", "Belgium"],
        correctAnswer: "Belgium"
    },
    {
        imgSrc: "../../images/flags/Spain.png",
        options: ["Italy", "Spain", "France", "Portugal"],
        correctAnswer: "Spain"
    },
    {
        imgSrc: "../../images/flags/France.png",
        options: ["Netherlands", "sweden", "France", "Brazil"],
        correctAnswer: "France"
    },
    {
        imgSrc: "../../images/flags/Italy.png",
        options: ["Turkey", "Italy", "Belgium", "Portugal"],
        correctAnswer: "Italy"
    },
    {
        imgSrc: "../../images/flags/Sweden.png",
        options: ["Germany", "Italy", "Sweden", "Ukraine"],
        correctAnswer: "Sweden"
    },
    {
        imgSrc: "../../images/flags/Portugal.png",
        options: ["Portugal", "France", "South Korea", "Netherlands"],
        correctAnswer: "Portugal"
    },
    {
        imgSrc: "../../images/flags/Netherlands.png",
        options: ["Turkey", "France", "Netherlands", "Germany"],
        correctAnswer: "Netherlands"
    },
    {
        imgSrc: "../../images/flags/Brazil.png",
        options: ["Sri Lanka", "Brazil", "Argentina", "China"],
        correctAnswer: "Brazil"
    },
    {
        imgSrc: "../../images/flags/Germany.png",
        options: ["Netherlands", "Germany", "Belgium", "Armenia"],
        correctAnswer: "Germany"
    },
    {
        imgSrc: "../../images/flags/Turkey.png",
        options: ["Turkey", "Algeria", "Brazil", "Canada"],
        correctAnswer: "Turkey"
    },
];

const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
    const currentFlag = flags[currentQuestion];
    questionContainer.innerHTML = `<img src="${currentFlag.imgSrc}" alt="Flag">`;
    
    optionsContainer.innerHTML = "";
    for (let i = 0; i < currentFlag.options.length; i++) {
        const option = document.createElement("div");
        option.className = "option";
        option.innerHTML = currentFlag.options[i];
        option.setAttribute("onclick", `checkAnswer('${currentFlag.options[i]}', this)`);
        optionsContainer.appendChild(option);
    }
}

function checkAnswer(answer, selectedOption) {
    const currentFlag = flags[currentQuestion];

    // Highlight correct answer in green
    const correctOptionIndex = currentFlag.options.indexOf(currentFlag.correctAnswer);
    optionsContainer.children[correctOptionIndex].style.backgroundColor = "#8bc34a";

    // Highlight selected option in red if it's wrong and update the score
    if (answer !== currentFlag.correctAnswer) {
        selectedOption.style.backgroundColor = "#ff5722";
    } else {
        // Increment the score if the answer is correct
        score++;
    }

    // Update the score display
    updateScoreDisplay();

    // Disable further clicks on options
    for (let i = 0; i < optionsContainer.children.length; i++) {
        optionsContainer.children[i].onclick = null;
    }

    if (currentQuestion < flags.length - 1) {
        // Delay to show correct and incorrect answers
        setTimeout(() => {
            // Reset colors for the next question
            optionsContainer.children[correctOptionIndex].style.backgroundColor = "";
            selectedOption.style.backgroundColor = "";
            
            currentQuestion++;
            showQuestion();
        }, 1000);
    } else {
        // Delay to show correct and incorrect answers for the last question
        setTimeout(() => {
            // Reset colors for the last question
            optionsContainer.children[correctOptionIndex].style.backgroundColor = "";
            selectedOption.style.backgroundColor = "";

            window.location.href = `../../html/End.html?score=${score}`;
        }, 1000);
    }
}


showQuestion();



// Function to update score display
function updateScoreDisplay() {
  if (document.getElementById('score')) {
    document.getElementById('score').innerHTML = score;
  }
}