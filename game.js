const question = document.getElementById("question")
let questions = [];

fetch('Apprentice_TandemFor400_Data.json')
    .then(res => res.json())
    .then(loadedQuestions => {
        // convert object for use in app
        questions = loadedQuestions.map(loadedQuestion => {
            // assign random num 0 - 3 to be the answer
            let rand = Math.floor(Math.random() * loadedQuestion.incorrect.length + 1);
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
    const rand = Math.floor(Math.random() * questions.length)
    question.innerText = questions[rand].question;
    console.log(questions)
}