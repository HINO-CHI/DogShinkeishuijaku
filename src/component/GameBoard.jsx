import React, { useState, useEffect } from 'react';
import Card from './Card';

function GameBoard({ cards, handleCardClick, matchedCards }) {
  const [delayedMatchedCards, setDelayedMatchedCards] = useState(matchedCards);

  useEffect(() => {
    if (matchedCards.length > 0) {
      const timer = setTimeout(() => {
        setDelayedMatchedCards(matchedCards);
      }, 1000); 
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
          matched={delayedMatchedCards.includes(index)} 
        />
      ))}
    </div>
  );
}

export default GameBoard;
