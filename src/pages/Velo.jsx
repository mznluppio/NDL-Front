import React, { useState, useEffect, useRef } from 'react';
import bikeImage from '../assets/images/bike.png';
import bikeImage2 from '../assets/images/bike2.png';
import backgroundImage from '../assets/images/background.jpg';

function Velo() {
  const [currentKey, setCurrentKey] = useState('');
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bikeImageSrc, setBikeImageSrc] = useState(bikeImage);
  const [keyPressed, setKeyPressed] = useState(false);

  const positionRef = useRef(position);

  useEffect(() => {
    generateRandomKey();
    const intervalId = setInterval(() => {
      setScore((prevScore) => Math.max(0, Math.min(500, prevScore)));
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setGameOver(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const animate = () => {
      const maxPosition = window.innerWidth - 50;
      const newPosition = (score / 500) * maxPosition;
      positionRef.current = newPosition;
      setPosition(newPosition);

      if (!gameOver) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [score, gameOver]);

  const generateRandomKey = () => {
    const randomKeyCode = Math.floor(Math.random() * 26) + 65;
    const randomKeyChar = String.fromCharCode(randomKeyCode);
    setCurrentKey(randomKeyChar);

    setTimeout(() => {
      generateRandomKey();
    }, 5000);
  };

  const handleKeyDown = (event) => {
    if (!gameOver && !keyPressed) {
      setKeyPressed(true);

      if (event.key.toUpperCase() === currentKey) {
        setScore((prevScore) => Math.max(0, Math.min(500, prevScore + 1)));
      } else {
        setScore((prevScore) => Math.max(0, prevScore - 1));
      }

      // Alterner entre bike et bike2 à chaque appui de touche
      setBikeImageSrc((prevImage) => (prevImage === bikeImage ? bikeImage2 : bikeImage));
    }
  };

  const handleKeyUp = () => {
    setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentKey, gameOver, keyPressed]);

  const pageStyle = {
    position: 'relative',
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    color: 'white',
  };

  const shapeStyle = {
    position: 'absolute',
    left: `${positionRef.current}px`,
    top: '82%',
    transform: 'translateY(-50%)',
    width: '150px',
    zIndex: 1,
  };

  const endGameContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    backgroundColor: '#7ccc47',
    padding: '20px',
  };

  const endGameStyle = {
    fontSize: '24px',
    textAlign: 'center',
    color: 'white',
  };

  const pressKeyStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    textAlign: 'center',
    zIndex: 2,
    color: 'black',
  };

  const scoreStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    zIndex: 2,
    color: 'white',
  };

  // Apply overflow: hidden to the body to make the page not scrollable
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="Velo" style={pageStyle}>
      <h1>Bike Game</h1>
      {!gameOver && (
        <>
          <div style={pressKeyStyle}>Press the key: {currentKey}</div>
          <div style={scoreStyle}>Score: {score}</div>
        </>
      )}
      {gameOver && (
        <div style={endGameContainerStyle}>
          <div style={endGameStyle}>
            <p>Game Over!</p>
            <p>Final Score: {score}</p>
          </div>
        </div>
      )}
      <img src={bikeImageSrc} alt="Bike" style={{ ...shapeStyle, objectFit: 'cover' }} />
    </div>
  );
}

export default Velo;
