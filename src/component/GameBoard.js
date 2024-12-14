import React from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick }) {
  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => handleCardClick(index)} />
      ))}
    </div>
  );
}

export default GameBoard;
