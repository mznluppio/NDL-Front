import React, { useState } from 'react';

const StartButton = () => {
  const [isStarted, setStarted] = useState(false);
  const [test, setTest] = useState("");

const azert= {
    border: 'none', // Bordure de 2 pixels de couleur verte (#008000)
    backgroundColor: '#38761d', // Fond de couleur verte (#00FF00)
    borderRadius: '14px', // Bordures arrondies de 10 pixels
    padding: '20px', // Ajout d'un espace intérieur de 10 pixels
    cursor: isStarted ? 'not-allowed' : 'pointer', // Changement de curseur en fonction de l'état
  };


  const handleStartClick = () => {
    setStarted(true);
    // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton est cliqué.
  };

  return (
    <div>
      <button
        onClick={handleStartClick}
        disabled={isStarted}
        style={azert}
      >
        {isStarted ? 'Démarré' : 'Démarrer'}
      </button>
    </div>
  );
};

export default StartButton;
