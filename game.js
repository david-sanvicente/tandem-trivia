const question = document.getElementById("question")
const choicesContainer = document.getElementById("choices")
let acceptingAnswers = false;
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
    acceptingAnswers = true;
    // check end/win conditions
    if(questionCount === 10){
        // save score to local storage
        localStorage.setItem('score', score)
        // return to end screen
        return window.location.assign("/end.html");
    }
    
    // clear previous choices
    while(choicesContainer.lastChild){
        choicesContainer.removeChild(choicesContainer.lastChild)
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

    // add choices to the screen dynamically
    for(let i = 0; i < currentQuestion.choices.length; i++){
        // create the p element
        const choice = document.createElement("p");
        choice.innerText = currentQuestion.choices[i];
        choice.dataset.number = i + 1;
        choice.classList.add("choice-text");
        
        // add event listener
        choice.addEventListener('click', event => {
            // prevents user from selecting more than 1 answer
            if (!acceptingAnswers) return;
            acceptingAnswers = false;
            
            // reveal correct answer
            let choices = Array.from(document.getElementsByClassName("choice-text"));
            choices.forEach(choice => {
                if(choice.dataset["number"] == currentQuestion.answer + 1){
                    choice.classList.add("correct");
                    setTimeout(()=>{
                        choice.classList.remove("correct");
                    }, 1000)
                }
            })

            // if choice correct, increase score
            if(event.target.dataset["number"] == currentQuestion.answer + 1){
                score++ 
                event.target.classList.add("correct")
            } else {
                event.target.classList.add("incorrect")
            };

            setTimeout(() => {
                event.target.parentElement.classList.remove("correct");
                getNextQuestion();
            }, 1000);

            
        })

        // add to parent "choices"
        choicesContainer.appendChild(choice)
    }

    questionCount++;
}