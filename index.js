let questionCounter = 0;
let score = 0;

function updateQuestionCounter(){
    //updates question counter as quiz progeesses
    questionCounter++;
    $('.questionNum').text(questionCounter+1);
};

function updateScore (){
    //updates score
    score++;
    $('.scoreTotal').text(score);
};

function getNewQuestion(){
    //generates a new question with new multiple choice answers
    if (questionCounter < STORE.length) {
        return `<div class="js-quiz-form">
                    <div class="question"><h2>${STORE[questionCounter].question}</h2></div>
                    <div class="answers">
                    <form id="answerForm">
                    <fieldset style="border:none" >
                    <legend></legend>
                        <label class="multipleChoiceA">
                            <input type="radio" class="rButton" value="${STORE[questionCounter].answer[0]}" name="answer" required>
                            <span class="answerOption">${STORE[questionCounter].answer[0]}</span>
                        </label>
                        <label class="multipleChoiceB">
                                <input type="radio" class="rButton" value="${STORE[questionCounter].answer[1]}" name="answer">
                                <span class="answerOption">${STORE[questionCounter].answer[1]}</span>
                        </label>
                        <label class="multipleChoiceC">
                                <input type="radio" class="rButton" value="${STORE[questionCounter].answer[2]}" name="answer">
                                <span class="answerOption">${STORE[questionCounter].answer[2]}</span>
                        </label>
                        <label class="multipleChoiceD">
                                <input type="radio" class="rButton" value="${STORE[questionCounter].answer[3]}" name="answer">
                                <span class="answerOption">${STORE[questionCounter].answer[3]}</span>
                        </label>
                        <button type="button" class="submitButton">Submit Answer</button>
                        </fieldset>
                        </form>
                    </div>
                    </div>
                </div>`
    }
    else {
        finalResults();
        restartQuiz();
        
    }
};

function renderQuestion () {
    $('.js-quiz-form').html(getNewQuestion());
    $('.js-quiz-form').show();
    
};

function checkAnswer() {
    //checks answer and replies accordingly
    $('.js-quiz-form').on('click', '.submitButton', event => {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionCounter].correctAnswer}`;
        if (answer === correctAnswer) {
            ifCorrectAnswer();
        } else {
            ifWrongAnswer();
        }        
      });
};

function ifCorrectAnswer() {
    let correctAnswer = `${STORE[questionCounter].correctAnswer}`;
    $('.js-quiz-form').html(`<div class="correctAnswerFeedback"><div class="icon">
    <img src="${STORE[questionCounter].icon}" alt="${STORE[questionCounter].alt}"/>
    </div><p><b>Well done!</b></p><button type=button class="nextButton">Next</button></div>`);
    updateScore();
    
};

function ifWrongAnswer() {
    let correctAnswer = `${STORE[questionCounter].correctAnswer}`;
    $('.js-quiz-form').html(`<div class="correctAnswerFeedback"><div class="icon">
    <img src="${STORE[questionCounter].icon}" alt="${STORE[questionCounter].alt}"/>
    </div><p><b>WRONG! The correct answer was: <br> ${correctAnswer}</b></p><button type=button class="nextButton">Next</button></div>`);
    
};


function nextButton(){
    //applies a action when the next button it pressed
    $('main').on('click', '.nextButton', event => {
        updateQuestionCounter();
        renderQuestion ();
    });
};



function finalResults(){
    //renders the last page of the quiz.  Displays the total score.
    $('.questionNum').text(10);
    $('.js-quiz-form').html(`<div class="finalResults"><div class="icon">
    </div><p><b>Then end! <br> Your final score is: ${score}</b></p><button type=button class="restartButton">try again</button></div>`);
    
};

function restartQuiz(){
    //restarts the quiz
    $('main').on('click', '.restartButton', event => {
        $('.js-quizStart').show();
        $('.js-quiz-form').hide();
        questionCounter = 0;
        $('.questionNum').text(0);
        score = 0;
        $('.scoreTotal').text(score);
        startQuiz();
    });
};

function startQuiz(){
    // when start button clicked, starts the quiz.  Hides the welcome page and displays the first question
    $('.js-quizStart').on('click', '.startButton', event => {
        event.preventDefault();
        $('.js-quizStart').hide();
        $('.questionNum').text(1);
        renderQuestion ();  
    });
};



function createQuiz(){
    startQuiz();
    checkAnswer();
    nextButton();
    
};

$(createQuiz());
