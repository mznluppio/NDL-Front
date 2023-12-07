import React, { useState, useEffect } from 'react';

const QuizzLoader = ({ quizzFile }) => {
  const [quizzData, setQuizzData] = useState(null);

  useEffect(() => {
    const fetchQuizzData = async () => {
      try {
        const response = await fetch(quizzFile);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setQuizzData(data);
      } catch (error) {
        console.error('Erreur lors du chargement du quizz :', error);
      }
    };

    fetchQuizzData();
  }, [quizzFile]);

  if (!quizzData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Utilisez quizzData ici pour rendre votre composant de quiz */}
      {/* Vous pouvez également le passer en tant que prop à votre composant de quiz */}
    </div>
  );
};

export default QuizzLoader;
