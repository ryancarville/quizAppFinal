function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (event) {
      $('.quizStart').remove();
      $('.questionAnswerForm').css('display', 'block');
      $('.questionNumber').text(1);
  });
  }