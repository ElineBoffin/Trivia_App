let currentQuestion = 0;

const flags = [
    {
        imgSrc: "../../images/flags/Eritrea.png",
        options: ["Gambia", "Eritrea", "Barbados", "Moldova"],
        correctAnswer: "Eritrea"
    },
    {
        imgSrc: "../../images/flags/Kenya.png",
        options: ["Libya", "South Africa", "Zambia", "Kenya"],
        correctAnswer: "Kenya"
    },
    {
        imgSrc: "../../images/flags/SriLanka.png",
        options: ["Sri Lanka", "Paraguay", "Guatemala", "Suriname"],
        correctAnswer: "Sri Lanka"
    },
    {
        imgSrc: "../../images/flags/BosniaandHerzegovina.png",
        options: ["Solomon Islands", "Czechia", "Malaysia", "Bosnia and Herzegovina"],
        correctAnswer: "Bosnia and Herzegovina"
    },
    {
        imgSrc: "../../images/flags/SolomonIslands.png",
        options: ["Solomon Islands", "Paraguay", "Tanzania", "Honduras"],
        correctAnswer: "Solomon Islands"
    },
    {
        imgSrc: "../../images/flags/Chile.png",
        options: ["Cuba", "Costa Rica", "Chile", "Dominican Republic"],
        correctAnswer: "Chile"
    },
    {
        imgSrc: "../../images/flags/Fiji.png",
        options: ["Fiji", "Australia", "New Zealand", "Tuvalu"],
        correctAnswer: "Fiji"
    },
    {
        imgSrc: "../../images/flags/Uzbekistan.png",
        options: ["Ethipia", "Tajikistan", "Uzbekistan", "Djibouti"],
        correctAnswer: "Uzbekistan"
    },
    {
        imgSrc: "../../images/flags/Madagascar.png",
        options: ["Malawi", "Madagascar", "Serbia", "Belarus"],
        correctAnswer: "Madagascar"
    },
    {
        imgSrc: "../../images/flags/Latvia.png",
        options: ["Austria", "Poland", "Tunisia", "Latvia"],
        correctAnswer: "Latvia"
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