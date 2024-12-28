import React from 'react';

function GameResult({ player1Score, player2Score, player1Name, player2Name, startNewGame }) {
  let resultMessage = '';

  if (player1Score > player2Score) {
    resultMessage = `${player1Name} wins!`;
  } else if (player1Score < player2Score) {
    resultMessage = `${player2Name} wins!`;
  } else {
    resultMessage = 'It\'s a tie!';
  }

  return (
    <div className="game-result">
      <h2>{resultMessage}</h2>
      <button onClick={startNewGame}>New Game</button> {/* New Gameボタン */}
    </div>
  );
}

export default GameResult;
