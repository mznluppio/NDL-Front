import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const predefinedCoordinates = [
    { top: '400px', left: '100px' },
    { top: '350px', left: '477px' },
    { top: '600px', left: '800px' },
    { top: '300px', left: '840px' },
    { top: '500px', left: '300px' },
    { top: '240px', left: '300px' },
    // Ajoutez d'autres coordonnées au besoin
];

const Cube = ({ onCanetteArrivee }) => {
    const [currentCoordinateIndex, setCurrentCoordinateIndex] = useState(0);

    const handleCubeClick = () => {
        setCurrentCoordinateIndex((prevIndex) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * predefinedCoordinates.length);
            } while (newIndex === prevIndex);
            return newIndex;
        });
        clearTimeout(autoDisappearTimeout);
    };

    const currentCoordinate = predefinedCoordinates[currentCoordinateIndex];

    useEffect(() => {
        const autoDisappearTimeout = setTimeout(() => {
            setCurrentCoordinateIndex((prevIndex) => (prevIndex + 1) % predefinedCoordinates.length);
            onCanetteArrivee(); // Appel de la fonction de rappel lorsque la canette arrive à ses coordonnées
        }, 2000);

        return () => clearTimeout(autoDisappearTimeout);
    }, [currentCoordinateIndex, onCanetteArrivee]);

    return (
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
    );
};


export default Cube;
