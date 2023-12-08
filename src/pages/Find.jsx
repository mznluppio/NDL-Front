// Importez useState et useEffect
import React, { useState, useEffect } from 'react';
import SceneBackground from '../components/background';
import Cube from '../components/cube';
import Container from '../components/container';

const Coordinates = new Array(6).fill(null).map(() => ({
    top: Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.4,
    left: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
}));

export default function Find() {
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(5);
    const [timeIsUp, setTimeIsUp] = useState(false);

    // Fonction pour augmenter le score
    const increaseScoreHandler = () => {
        setScore((prevScore) => prevScore + 1);
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    alert("Le temps est écoulé!"+score);
                    setTimeIsUp(true);
                    clearInterval(timerInterval);
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    return (
        <div>
            <p>Score: {score}</p>
            {timeIsUp && <p>Le temps est écoulé!{score}</p>}
            <SceneBackground />
            <Container predefinedCoordinates={Coordinates} style={{ zIndex: 0, position: 'absolute', display: 'flex' }} />
            <Cube
                predefinedCoordinates={Coordinates}
                style={{ zIndex: 1, position: 'absolute', display: 'flex' }}
                timer={timer}
                increaseScore={increaseScoreHandler}
            />
        </div>
    );
}

