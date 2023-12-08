import React, { useState, useEffect } from 'react';
import questionData from '../data/questionMultiple.json';
import { Button, List, ListItem, ListItemButton } from '@mui/material';
import Score from './Score';
import "../index.css"

export default function QuizMultiple({ onQuizFinish }) {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        const tempQuestions = [...questionData.questions];
        const selected = [];

        while (selected.length < 5 && tempQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * tempQuestions.length);
            selected.push(tempQuestions[randomIndex]);
            tempQuestions.splice(randomIndex, 1);
        }

        setQuestions(selected);
    }, []);

    const handleAnswer = (answerIndex) => {
        if (userAnswers[selectedQuestionIndex] === undefined) {
            const updatedUserAnswers = { ...userAnswers };
            updatedUserAnswers[selectedQuestionIndex] = answerIndex;
            setUserAnswers(updatedUserAnswers);
            setShowNextButton(true);
        }
    };

    const getButtonStyle = (answerIndex) => {
        if (userAnswers[selectedQuestionIndex] !== undefined) {
            const correctAnswerIndex = questions[selectedQuestionIndex].reponses.findIndex((answer) => answer.correcte);
            return userAnswers[selectedQuestionIndex] === answerIndex
                ? answerIndex === correctAnswerIndex
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: 'red' }
                : null;
        }
        return null;
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = selectedQuestionIndex + 1;
        setSelectedQuestionIndex(nextQuestionIndex);
        setShowNextButton(false);
    };

    const handleQuizFinish = () => {
        let finalScore = 0;

        Object.keys(userAnswers).forEach((questionIndex) => {
            const index = parseInt(questionIndex, 10);
            const correctAnswerIndex = questions[index].reponses.findIndex((answer) => answer.correcte);

            if (userAnswers[index] === correctAnswerIndex) {
                finalScore += 1;
            }
        });

        onQuizFinish(finalScore);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (selectedQuestionIndex === 5) {
        handleQuizFinish();
        return <Score score={finalScore} />;
    }

    const currentQuestion = questions[selectedQuestionIndex];
    const totalQuestions = 5;
    const progress = ((selectedQuestionIndex + 1) / totalQuestions) * 100;



    return (
        <div className="quiz-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }} />
            </div>
            <h1>{`Question ${selectedQuestionIndex + 1} of ${totalQuestions}`}</h1>
            <h2>{currentQuestion.question}</h2>
            <List>
                {currentQuestion.reponses.map((answer, answerIndex) => (
                    <ListItem key={answerIndex} className="answer-item">
                        <ListItemButton
                            className="answer-button"
                            style={getButtonStyle(answerIndex)}
                            disabled={userAnswers[selectedQuestionIndex] !== undefined}
                            onClick={() => handleAnswer(answerIndex)}
                        >
                            <p>{answer.reponse}</p>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {showNextButton && (
                <Button variant="contained" onClick={handleNextQuestion} className="next-button">
                    Question suivante
                </Button>
            )}
        </div>
    );
}
