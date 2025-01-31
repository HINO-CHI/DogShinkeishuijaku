import React, { useState, useEffect } from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick, matchedCards }) {
  const [delayedMatchedCards, setDelayedMatchedCards] = useState(matchedCards);

  useEffect(() => {
    if (matchedCards.length > 0) {
      const timer = setTimeout(() => {
        setDelayedMatchedCards(matchedCards);
      }, 1000); // 1秒後に一致したカードを更新
      return () => clearTimeout(timer);
    }
  }, [matchedCards]);

  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onClick={() => handleCardClick(index)}
          matched={delayedMatchedCards.includes(index)} // 一致したカードを背景色に変更
        />
      ))}
    </div>
  );
}

export default GameBoard;
