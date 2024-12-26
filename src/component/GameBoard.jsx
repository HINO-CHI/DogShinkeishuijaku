import React from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick, matchedCards }) {
  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onClick={() => handleCardClick(index)}
          matched={matchedCards.includes(index)} // 一致したカードを背景色に変更
        />
      ))}
    </div>
  );
}

export default GameBoard;