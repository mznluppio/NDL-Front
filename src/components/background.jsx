// SceneBackground.jsx
import React from 'react';
import styled from 'styled-components';
import fond from '../assets/img/background.jpeg';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${fond});
  background-size: cover;
`;

const SceneBackground = () => {
  return <BackgroundContainer />;
};

export default SceneBackground;
