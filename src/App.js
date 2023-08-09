import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Block from './Block';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [shuffledAnswer, setShuffledAnswer] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const answerLength = currentQuestion ? currentQuestion.answer.length : 0;

  useEffect(() => {
    if (currentQuestion) {
      const originalAnswer = currentQuestion.answer.split('');
      const shuffledCharacters = [...originalAnswer].sort(() => Math.random() - 0.5);
      setShuffledAnswer(shuffledCharacters);
      setAnswer(Array(answerLength).fill(''));
    }
  }, [currentQuestion]);

  const handleCharacterClick = (character) => {
    const emptyBlockIndex = answer.indexOf('');
    if (emptyBlockIndex !== -1) {
      const newAnswer = [...answer];
      newAnswer[emptyBlockIndex] = character;
      setAnswer(newAnswer);
    }
  };

  const checkAnswer = () => {
    const selectedAnswer = answer.join('');
    if (currentQuestion && selectedAnswer === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  return (
    <div>
      <h1 className="zz">Assignment</h1>
      <p className="score">Score: {score}</p>
      {currentQuestion && (
        <div className="bb">
          <p className="hh">Which word is closest to {currentQuestion.question} ?</p>
          <div className="blocks-container">
            {answer.map((character, index) => (
              <Block key={index} filled={character !== ''} character={character} />
            ))}
          </div>
          <div className="characters-container">
            {shuffledAnswer.map((character, index) => (
              <button
                key={index}
                className={`character-button ${answer.includes(character) ? 'disabled' : ''}`}
                onClick={() => handleCharacterClick(character)}
                disabled={answer.includes(character)}
              >
                {character}
              </button>
            ))}
          </div>
          <button
          className="check-button"
            onClick={checkAnswer}
          >
            Check Answer
          </button>
         
          <button
            className="next-button"
            onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
