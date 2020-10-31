const question = document.getElementById("question")
let choices = Array.from(document.getElementsByClassName("choice"))
let questions = [];
let availableQuestions = [];
let currentQuestion = {};
let questionCount = 0;
let score = 0;

fetch('Apprentice_TandemFor400_Data.json')
    .then(res => res.json())
    .then(loadedQuestions => {
        // convert object for use in app
        questions = loadedQuestions.map(loadedQuestion => {
            // assign random num 0 - 3 to be the answer
            const rand = Math.floor(Math.random() * loadedQuestion.incorrect.length + 1);
            // save correct answer
            let answer = loadedQuestion.correct;
            // build return object
            loadedQuestion = {
                // keep the question
                question: loadedQuestion.question,
                // copy the incorrect choices
                choices: [...loadedQuestion.incorrect],
                answer: rand
            }
            // splice answer into choices array using random number
            loadedQuestion.choices.splice(rand, 0, answer)
            return loadedQuestion;
        })

        startGame();
    })
    .catch(err => console.dir(err))

function startGame(){
    score = 0;
    availableQuestions = [...questions];

    getNextQuestion();
}

function getNextQuestion(){
    // check end/win conditions
    if(questionCount === 10){
        // save score to local storage
        localStorage.setItem('score', score)
        // return to end screen
        return window.location.assign("/end.html");
    }

    // gets the next question at random
    const rand = Math.floor(Math.random() * availableQuestions.length)

    // sets as current question
    currentQuestion = availableQuestions[rand];

    // prevent questions from repeating
    // physically remove element from array
    availableQuestions.splice(rand, 1)

    // put it on the screen
    question.innerText = currentQuestion.question;

    for(let i = 0; i < 4; i++){
        choices[i].innerText = currentQuestion.choices[i];
    }
    // add to question count
    questionCount++;
}

// add event listeners
choices.forEach(choice => {
    choice.addEventListener('click', event => {
        // if choice correct, increase score
        if(event.target.dataset["number"] == currentQuestion.answer + 1){ score++ };

        getNextQuestion();
    })
});