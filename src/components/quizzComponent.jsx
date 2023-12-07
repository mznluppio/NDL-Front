// Quizz.jsx
import React, { useState } from 'react';
import QuizzLoader from './quizzLoader';

const Quizz = () => {
  const [quizzData, setQuizzData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleQuizzLoaded = (data) => {
    setQuizzData(data);
  };

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;

    quizzData.questions.forEach((question, questionIndex) => {
      const userAnswerIndex = userAnswers[questionIndex];
      const userAnswer = question.reponses[userAnswerIndex];
      
      if (userAnswer.correcte) {
        newScore += 1;
      }
    });

    setScore(newScore);
  };

  if (!quizzData) {
    return <QuizzLoader quizzFile="chemin/vers/votre/fichier/quizz.json" onQuizzLoaded={handleQuizzLoaded} />;
  }

  return (
    <div>
      <h1>Mon Quizz</h1>
      {quizzData.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <p>{question.question}</p>
          {question.reponses.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <input
                type={question.type === 'truefalse' ? 'radio' : 'checkbox'}
                id={`q${questionIndex}a${answerIndex}`}
                onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                checked={userAnswers[questionIndex] === answerIndex}
              />
              <label htmlFor={`q${questionIndex}a${answerIndex}`}>{answer.reponse}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Soumettre</button>
      {score !== null && <p>Votre score : {score}</p>}
    </div>
  );
};

export default Quizz;
