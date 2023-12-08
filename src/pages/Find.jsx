import React, { useState, useEffect } from 'react';
import SceneBackground from '../components/background';
import Cube from '../components/cube';
import Container from '../components/container';

const Coordinates = new Array(6).fill(null).map(() => ({
    top: Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.4,
    left: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
}));
console.log(Coordinates);

export default function Find() {

    return (
        <div>
            <SceneBackground />
            <Container predefinedCoordinates={Coordinates} style={{ zIndex: 0, position: 'absolute',display: 'flex'}} />
            <Cube predefinedCoordinates={Coordinates} style={{ zIndex: 1, position: 'absolute' ,display: 'flex'}} />
        </div>
    );

}

