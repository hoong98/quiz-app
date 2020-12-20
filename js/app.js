
//target html
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

// create variables
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

//push questions into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion() {
    //set question number
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`

    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of 'questionIndex' from availableQuestions[]
    const index1 = availableQuestions.indexOf(questionIndex)
    //remove the 'questionIndex' from availableQuestions[]
    availableQuestions.splice(index1, 1);

    //set options
    //get the length of options
    const optionLength = currentQuestion.options.length;

    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i)
    }
    console.log(availableOptions)

    optionContainer.innerHTML = ''
    let animationDelay = 0.2;
    //create options in HTML
    for (let i = 0; i < optionLength; i++) {
        //random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of "optonIndex" from availableoptions
        const index2 = availableOptions.indexOf(optonIndex);
        //remove the optionindex from the availableoptions, so wont repeat
        availableOptions.splice(index2, 1)

        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    // optionContainer.innerHTML = `${currentQuestion.options.map((option) => {
    //     const optonIndex = `${option}[Math.floor(Math.random() * ${option}.length)]`;
    //     const index2 = `${option}.indexOf(${optonIndex})`;
    //     `${option}.splice(${index2}, 1)`
    //     return `<div id=${option}[optonIndex] class="option">${option}</div>`
    // }).join('')
    //     } `

    questionCounter++;
}

//get the result of current attempt question
function getResult(element) {

    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        //set to green to correct option
        element.classList.add('correct')
        //update the indicator status
        updateAnswerIndicator('correct')

        correctAnswer++;
    } else {
        //set to red to wrong option
        element.classList.add('wrong')
        //update the indicator status
        updateAnswerIndicator('wrong')
        //show correct answer when wrong
        const optionLength = optionContainer.children.length;
        for (let i = 0; i < optionLength; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add('correct');
            }
        }

    }
    attempt++
    unclickableOptions();

}

function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

//make all the options unclikable once the user select a option
function unclickableOptions() {
    const optionLength = optionContainer.children.length;
    for (let i = 0; i < optionLength; i++) {
        optionContainer.children[i].classList.add('already-answered');
    }
}

function answerIndicator() {
    answerIndicatorContainer.innerHTML = ''
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement('div')
        answerIndicatorContainer.appendChild(indicator)
    }
}

function quizOver() {
    //set hide quiz box
    quizBox.classList.add('hide');
    //remove hide result box
    resultBox.classList.remove('hide');

    quizResult();
}

function quizResult() {
    resultBox.querySelector('.total-question').innerHTML = quiz.length;
    resultBox.querySelector('.total-attempt').innerHTML = attempt;
    resultBox.querySelector('.total-correct').innerHTML = correctAnswer;
    resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswer;
    const percentange = (correctAnswer / quiz.length) * 100;
    resultBox.querySelector('.percentage').innerHTML = `${percentange.toFixed(2)}%`;
    resultBox.querySelector('.total-score').innerHTML = `${correctAnswer} / ${quiz.length}`;
}

function tryAgain() {
    //hide the result
    resultBox.classList.add('hide');
    //show the quizbox
    quizBox.classList.remove('hide');

    restartQuiz();
    start()
}

function restartQuiz() {
    questionCounter = 0;
    correctAnswer = 0;
    attempt = 0;
}

function goToHome() {
    //show homeBox
    homeBox.classList.remove('hide');
    //hide result
    resultBox.classList.add('hide');
    restartQuiz();
}

function next() {
    if (questionCounter === quiz.length) {
        console.log('quiz is over pls try again...');
        quizOver()
    } else {
        getNewQuestion();
    }
}
function start() {
    //home box hide
    homeBox.classList.add('hide');
    //show quiz
    quizBox.classList.remove('hide');
    //first will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second will call getNewQuestion()
    getNewQuestion();
    //create indicator
    answerIndicator()
}

window.onload = function () {
    homeBox.querySelector('.total-question').innerHTML = ` ${quiz.length}`
}