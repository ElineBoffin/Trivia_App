// Function to handle quiz completion
function handleQuizCompletion() {
    // Calculate final score based on user's answers
    // ... calculate score based on correct/incorrect answers
    let score = 0;
    // Save the final score to local storage
    localStorage.setItem('quizScore', score);
  }
  // Get the quiz score from local storage
  let quizScore = localStorage.getItem('quizScore');
  if (!quizScore) {
      quizScore = 0;
  }
  
  // Display the quiz score
  const urlParams = new URLSearchParams(window.location.search);
  const score = parseInt(urlParams.get('score'));
  document.getElementById('quiz-score').textContent = 'Your score is: ' + quizScore;
  
  // Save the score to local storage with the user's name
  document.getElementById('save-score').addEventListener('click', function() {
      let userName = document.getElementById('user-name').value;
      if (userName) {
          let scores = JSON.parse(localStorage.getItem('scores') || '[]');
          scores.push({ name: userName, score: quizScore });
          localStorage.setItem('scores', JSON.stringify(scores));
          alert('Your score has been saved.');
      }
  });
  
  // Play again button
  document.getElementById('play-again').addEventListener('click', function() {
      window.location.href = "../../html/animals/Easy.html"; 
  });
  
  // Go back to homepage button
  document.getElementById('go-back').addEventListener('click', function() {
      window.location.href = "../../html/index.html"; 
  });