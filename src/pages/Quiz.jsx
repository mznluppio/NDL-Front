import React, { useState } from 'react';
import QuizMultiple from '../components/QuizMultiple';
import Velo from './Velo';
import Tri from './Tri';

const Quiz = () => {
    const [showQuiz, setShowQuiz] = useState(true);
    const [showGame, setShowGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [tri, setTri] = useState(true);
    const [quizCounter, setQuizCounter] = useState(0);

    let score;
    const handleQuizFinish = (quizScore) => {
        setShowQuiz(false);
        setShowGame(true);
        setQuizCounter(quizCounter + 1);
    };

    const handleGameFinish = () => {
        setShowGame(false);
        setGameOver(true);
    };

    const handleTriFinish = () => {
        setTri(true);
    }

    return (
        <>
            {showQuiz && !gameOver && quizCounter === 0 && <QuizMultiple onQuizFinish={handleQuizFinish} score={score} />}
            {showGame && !gameOver && <Velo onGameFinish={handleGameFinish} score={score} />}
            {gameOver && quizCounter === 1 && <QuizMultiple onQuizFinish={handleQuizFinish} score={score} />}
            {tri && <Tri onTriFinish={handleTriFinish} />}
        </>
    );
};

export default Quiz;
