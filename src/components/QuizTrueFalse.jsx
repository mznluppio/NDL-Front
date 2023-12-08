import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function QuizTrueFalse() {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const questions = [
        { id: 'question1', content: 'La Terre est plate ?', answer: false },
        { id: 'question2', content: 'Le soleil tourne autour de la Terre ?', answer: true },
        // Ajoute d'autres questions ici
    ];

    const onDragEnd = (result) => {
        if (!result.destination) return; // Si la destination est null, ne rien faire

        const currentQuestion = questions[currentQuestionIndex];

        const isCorrect =
            (result.destination.droppableId === 'true' && currentQuestion.answer) ||
            (result.destination.droppableId === 'false' && !currentQuestion.answer);

        if (isCorrect) {
            setScore(score + 1);
        } else {
            setScore(0);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('Quiz terminé! Score final:', score);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Droppable droppableId="true">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ width: '30%', margin: '8px' }}
                        >
                            <h2>Vrai</h2>
                            {questions.map((question, index) => (
                                <Draggable key={question.id} draggableId={question.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <p>{question.content}</p>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <div style={{ width: '40%', margin: '8px' }}>
                    <h3>{questions[currentQuestionIndex].content}</h3>
                </div>

                <Droppable droppableId="false">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ width: '30%', margin: '8px' }}
                        >
                            <h2>Faux</h2>

                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}
