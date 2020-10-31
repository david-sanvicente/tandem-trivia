# Tandem Trivia!

Live demo link: https://tandem-trivia.netlify.app/

To get started:

- `npm install`
- `npm start`

This will start a small http server, which will serve up the index.html file, as well as any "static resources" (that is, CSS and JS files, as well as fonts) that the index.html requests (via `link` and `script` tags). You can view the page by opening `http://localhost:8080/` in your browser!

Assumptions:

- `A round of trivia has 10 Questions`
- `All questions are multiple-choice questions`
- `Your score does not need to update in real time`
- `Results can update on form submit, button click, or any interaction you choose`
- `We will provide you with the trivia data such as the questions, correct and incorrect answers via a JSON file.`

Acceptance Criteria:

- `A user can view questions.`
- `Questions with their multiple choice options must be displayed one at a time.`
- `Questions should not repeat in a round.`
- `A user can select only 1 answer out of the 4 possible answers.`
- `The correct answer must be revealed after a user has submitted their answer`
- `A user can see the score they received at the end of the round`
