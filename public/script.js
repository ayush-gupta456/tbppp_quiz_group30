let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let currentQuestions = [];

const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const quizCard = document.getElementById('quiz-card');
const scoreCard = document.getElementById('score-card');
const finalScore = document.getElementById('final-score');
const scorePercentage = document.getElementById('score-percentage');
const restartButton = document.getElementById('restart-button');

fetch('/questions.json')
  .then(response => response.json())
  .then(questions => {
    initializeQuiz(questions);
  })
  .catch(error => {
    console.error('Error loading questions:', error);
    questionText.textContent = "Error loading questions. Please try again later.";
    nextButton.disabled = true;
    restartButton.disabled = true;
  });

function initializeQuiz(questions) {
  currentQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  displayQuestion();
}

function displayQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  questionText.textContent = question.question;

  optionsContainer.innerHTML = '';
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(option, button));
    optionsContainer.appendChild(button);
  });

  nextButton.classList.add('hidden');
  selectedAnswer = null;
}

function selectAnswer(answer, button) {
  const buttons = optionsContainer.getElementsByClassName('option-button');
  Array.from(buttons).forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
  selectedAnswer = answer;
  nextButton.classList.remove('hidden');
}

function handleNextQuestion() {
  if (selectedAnswer === currentQuestions[currentQuestionIndex].answer) {
    score++;
  }

  if (currentQuestionIndex === currentQuestions.length - 1) {
    showScore();
  } else {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function showScore() {
  quizCard.classList.add('hidden');
  scoreCard.classList.remove('hidden');
  finalScore.textContent = `${score} / ${currentQuestions.length}`;
  const percentage = (score / currentQuestions.length) * 100;
  scorePercentage.textContent = `You scored ${percentage.toFixed(0)}%`;
}

function restartQuiz() {
  fetch('/questions.json')
    .then(response => response.json())
    .then(questions => {
      initializeQuiz(questions);
      quizCard.classList.remove('hidden');
      scoreCard.classList.add('hidden');
    })
    .catch(error => {
      console.error('Error loading questions:', error);
      questionText.textContent = "Error loading questions. Please try again later.";
      nextButton.disabled = true;
      restartButton.disabled = true;
    });
}

nextButton.addEventListener('click', handleNextQuestion);
restartButton.addEventListener('click', restartQuiz);