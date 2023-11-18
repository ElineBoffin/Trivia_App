let currentQuestion = 0;
let score = 0;
updateScoreDisplay();

const flags = [
    {
        imgSrc: "../../images/flags/Argentina.png",
        options: ["Cyprus", "Argentina", "San Marino", "Uruguay"],
        correctAnswer: "Argentina"
    },
    {
        imgSrc: "../../images/flags/Switzerland.png",
        options: ["Canada", "Norway", "Georgia", "Switzerland"],
        correctAnswer: "Switzerland"
    },
    {
        imgSrc: "../../images/flags/Egypt.png",
        options: ["Albania", "Iraq", "Serbia", "Egypt"],
        correctAnswer: "Egypt"
    },
    {
        imgSrc: "../../images/flags/Finland.png",
        options: ["Iceland", "Finland", "Norway", "Poland"],
        correctAnswer: "Finland"
    },
    {
        imgSrc: "../../images/flags/Morocco.png",
        options: ["Monaco", "Vietnam", "Morocco", "China"],
        correctAnswer: "Morocco"
    },
    {
        imgSrc: "../../images/flags/SouthKorea.png",
        options: ["Japan", "South Korea", "Cyprus", "Malaysia"],
        correctAnswer: "South Korea"
    },
    {
        imgSrc: "../../images/flags/Australia.png",
        options: ["United Kingdom", "New Zealand", "Marshall Islands", "Australia"],
        correctAnswer: "Australia"
    },
    {
        imgSrc: "../../images/flags/Russia.png",
        options: ["Russia", "Yemen", "Serbia", "Netherlands"],
        correctAnswer: "Russia"
    },
    {
        imgSrc: "../../images/flags/Israel.png",
        options: ["Honduras", "Israel", "Somalia", "Argentina"],
        correctAnswer: "Israel"
    },
    {
        imgSrc: "../../images/flags/SouthAfrica.png",
        options: ["South Sudan", "Ugandan", "Zimbabwe", "South Africa"],
        correctAnswer: "South Africa"
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