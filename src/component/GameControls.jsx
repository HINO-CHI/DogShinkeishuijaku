import React, { useState } from 'react';

function GameControls({ startGame }) {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');

  const handleStartGame = () => {
    startGame(16, player1Name, player2Name); // プレイヤー名をstartGameに渡す
  };

  return (
    <div className="game-controls">
      <h1>Dog Memory Game</h1>
      <label>
        Player 1 Name:
        <input
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
      </label>
      <br />
      <label>
        Player 2 Name:
        <input
          type="text"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default GameControls;
