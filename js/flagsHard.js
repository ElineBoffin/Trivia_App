let currentQuestion = 0;

const flags = [
    {
        imgSrc: "../../images/flags/Eritrea.png",
        options: ["Cyprus", "Eritrea", "San Marino", "Uruguay"],
        correctAnswer: "Eritrea"
    },
    {
        imgSrc: "../../images/flags/Kenya.png",
        options: ["Kenya", "Norway", "Georgia", "Switzerland"],
        correctAnswer: "Kenya"
    },
    {
        imgSrc: "../../images/flags/SriLanka.png",
        options: ["Albania", "Iraq", "Serbia", "Egypt"],
        correctAnswer: "Sri Lanka"
    },
    {
        imgSrc: "../../images/flags/Bosnia.png",
        options: ["Iceland", "Finland", "Norway", "Poland"],
        correctAnswer: "Bosnia and Herzegovina"
    },
    {
        imgSrc: "../../images/flags/SolomonIslands.png",
        options: ["Monaco", "Vietnam", "Morocco", "China"],
        correctAnswer: "Solomon Islands"
    },
    {
        imgSrc: "../../images/flags/South Chile.png",
        options: ["South Sudan", "Ugandan", "Zimbabwe", "South Africa"],
        correctAnswer: "Chile"
    },
    {
        imgSrc: "../../images/flags/Fiji.png",
        options: ["Japan", "South Korea", "Cyprus", "Malaysia"],
        correctAnswer: "Fiji"
    },
    {
        imgSrc: "../../images/flags/Uzbekistan.png",
        options: ["United Kingdom", "New Zealand", "Marshall Islands", "Australia"],
        correctAnswer: "Uzbekistan"
    },
    {
        imgSrc: "../../images/flags/Madagascar.png",
        options: ["Russia", "Yemen", "Serbia", "Netherlands"],
        correctAnswer: "Madagascar"
    },
    {
        imgSrc: "../../images/flags/Latvia.png",
        options: ["Honduras", "Israel", "Somalia", "Argentina"],
        correctAnswer: "Latvia"
    },
];

const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
    const currentFlag = flags[currentQuestion];
    questionContainer.innerHTML = `<img src="${currentFlag.imgSrc}" alt="Flag">`;
    questionContainer.style.width = 150;
    questionContainer.style.width = 100;
    
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
    optionsContainer.children[correctOptionIndex].style.backgroundColor = "green";

    // Highlight selected option in red if it's wrong
    if (answer !== currentFlag.correctAnswer) {
        selectedOption.style.backgroundColor = "red";
    }

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

            window.location.href = "../../html/index.html";
        }, 1000);
    }
}

showQuestion();