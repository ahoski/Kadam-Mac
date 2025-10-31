// mcq.js - MCQ Translation Questions (Telugu to English and English to Telugu)

// Generate MCQ questions
async function generateMCQQuestions(words) {
  const questions = [];
  
  // Create MCQ questions for each word
  for (const word of words) {
    if (word.telugu && word.telugu.trim() !== '') {
      // Randomly decide translation direction
      const isTeluguToEnglish = Math.random() < 0.5;
      
      const question = createMCQQuestion(
        word.english, 
        word.telugu,
        isTeluguToEnglish,
        words
      );
      questions.push(question);
    }
  }
  
  return questions;
}

// Create a single MCQ question
function createMCQQuestion(english, telugu, isTeluguToEnglish, allWords) {
  let questionText, correctAnswer, wrongOptions;
  
  if (isTeluguToEnglish) {
    // Telugu to English
    questionText = `What is the English translation of "${telugu}"?`;
    correctAnswer = english;
    
    // Get wrong English options
    wrongOptions = allWords
      .filter(w => w.english !== english && w.english)
      .map(w => w.english)
      .slice(0, 3);
    
    // Add default options if needed
    if (wrongOptions.length < 3) {
      const defaults = ['book', 'water', 'tree', 'sun', 'moon', 'star', 'friend'];
      for (const defaultWord of defaults) {
        if (!wrongOptions.includes(defaultWord) && defaultWord !== english) {
          wrongOptions.push(defaultWord);
          if (wrongOptions.length === 3) break;
        }
      }
    }
  } else {
    // English to Telugu
    questionText = `What is the Telugu translation of "${english}"?`;
    correctAnswer = telugu;
    
    // Get wrong Telugu options
    wrongOptions = allWords
      .filter(w => w.telugu !== telugu && w.telugu)
      .map(w => w.telugu)
      .slice(0, 3);
    
    // Add default Telugu options if needed
    if (wrongOptions.length < 3) {
      const defaults = ['పుస్తకం', 'నీరు', 'చెట్టు', 'సూర్యుడు', 'చంద్రుడు', 'నక్షత్రం', 'స్నేహితుడు'];
      for (const defaultWord of defaults) {
        if (!wrongOptions.includes(defaultWord) && defaultWord !== telugu) {
          wrongOptions.push(defaultWord);
          if (wrongOptions.length === 3) break;
        }
      }
    }
  }
  
  // Shuffle wrong options and take 3
  wrongOptions = shuffleArray(wrongOptions).slice(0, 3);
  
  // Create all options with correct answer in random position
  const allOptions = [...wrongOptions];
  const correctPosition = Math.floor(Math.random() * 4);
  allOptions.splice(correctPosition, 0, correctAnswer);
  
  return {
    type: 'mcq',
    word: english,
    text: questionText,
    options: allOptions,
    correctAnswer: correctAnswer,
    telugu: telugu,
    isTeluguToEnglish: isTeluguToEnglish
  };
}

// Set up MCQ question in the UI
function setupMCQQuestion(question, answerArea) {
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';
  
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.setAttribute('data-option', option);
    optionElement.addEventListener('click', () => selectOption(optionElement, option));
    optionsContainer.appendChild(optionElement);
  });
  
  answerArea.appendChild(optionsContainer);
}

// Select an option
function selectOption(element, value) {
  // Clear previous selection
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // Select new option
  element.classList.add('selected');
  selectedOption = value;
}

// Check MCQ answer
async function checkMCQAnswer(question) {
  const feedback = document.getElementById('feedback');
  
  if (!selectedOption) {
    feedback.textContent = 'Please select an answer';
    feedback.className = 'feedback incorrect';
    return;
  }
  
  isAnswerCorrect = (selectedOption === question.correctAnswer);
  
  if (isAnswerCorrect) {
    feedback.textContent = '✓ Correct!';
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = '✗ Incorrect';
    feedback.className = 'feedback incorrect';
    
    // Show correct answer by making it green
    document.querySelectorAll('.option').forEach(opt => {
      if (opt.getAttribute('data-option') === question.correctAnswer) {
        opt.classList.add('correct');
      } else if (opt.getAttribute('data-option') === selectedOption) {
        opt.classList.add('wrong');
      }
    });
  }
}

// Utility function to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Make functions available globally
if (typeof window !== 'undefined') {
  window.generateMCQQuestions = generateMCQQuestions;
  window.setupMCQQuestion = setupMCQQuestion;
  window.checkMCQAnswer = checkMCQAnswer;
  window.selectOption = selectOption;
  window.shuffleArray = shuffleArray;
}