import React, { useState } from 'react';
import QuizMultiple from '../components/QuizMultiple';
import Velo from './Velo';

const Quiz = () => {
    const [showQuiz, setShowQuiz] = useState(true);
    const [showGame, setShowGame] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleQuizFinish = (quizScore) => {
        setScore(quizScore);
        setShowQuiz(false);
        setShowGame(true);
    };

    const handleGameFinish = () => {
        setShowGame(false);
        setGameOver(true);
    };

    return (
        <>
            {showQuiz && !gameOver && <QuizMultiple onQuizFinish={handleQuizFinish} />}
            {showGame && !gameOver && <Velo onGameFinish={handleGameFinish} />}
            {gameOver && <QuizMultiple onQuizFinish={handleQuizFinish} />}
        </>
    );
};

export default Quiz;
