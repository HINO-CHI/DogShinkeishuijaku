import React, { useState } from 'react';

function GameControls({ startGame }) {
  const [cardCount, setCardCount] = useState(16);

  const handleCardCountChange = (event) => {
    const count = Number(event.target.value);
    if (count >= 16 && count <= 100 && Math.sqrt(count) % 1 === 0) {
      setCardCount(count);
    }
  };

  return (
    <div className="game-controls">
      <h1>Dog Memory Game</h1>
      <label>
        Select number of cards:
        <input type="number" value={cardCount} onChange={handleCardCountChange} />
      </label>
      <button onClick={() => startGame(cardCount)}>Start Game</button>
    </div>
  );
}

export default GameControls;
