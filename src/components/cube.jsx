import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timer from '../components/Timer';
import canette from '../assets/img/canette.png';

const CubeContainer = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${canette});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: transform 1s; /* Ajoutez une transition pour créer un effet de déplacement en douceur */
`;



const Cube = ({ predefinedCoordinates, onCanetteArrivee, timer, increaseScore }) => {
    const [currentCoordinateIndex, setCurrentCoordinateIndex] = useState(0);

    const handleCubeClick = () => {
        setCurrentCoordinateIndex((prevIndex) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * predefinedCoordinates.length);
            } while (newIndex === prevIndex);
            return newIndex;
        });

        // Augmentez le score en appelant la fonction passée en prop
        increaseScore();
    };

    const currentCoordinate = predefinedCoordinates[currentCoordinateIndex];

    useEffect(() => {
        const autoDisappearTimeout = setTimeout(() => {
            setCurrentCoordinateIndex((prevIndex) => (prevIndex + 1) % predefinedCoordinates.length);
            onCanetteArrivee();
        }, 2000);

        return () => clearTimeout(autoDisappearTimeout);
    }, [currentCoordinateIndex, onCanetteArrivee]);

    return (
        <div>
            <CubeContainer
                style={{
                    top: currentCoordinate.top,
                    left: currentCoordinate.left,
                    transform:
                        currentCoordinateIndex % 3 === 1
                            ? `translate(${Math.random() * 75 - 25}px, ${Math.random() * 75 - 25}px)`
                            : 'translate(0)',
                }}
                onClick={handleCubeClick}
            />
            <Timer time={timer} />
        </div>
    );
};

export default Cube;
