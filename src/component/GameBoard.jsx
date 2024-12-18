import React from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick, matchedCards }) {
  return (
    <div className="game-board">
      {cards.map((card, index) => (
        // 一致したカードの場合は非表示にする
        !matchedCards.includes(index) && (
          <Card key={index} card={card} onClick={() => handleCardClick(index)} />
        )
      ))}
    </div>
  );
}

export default GameBoard;