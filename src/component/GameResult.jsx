import React from 'react';

function GameResult({ player1Score, player2Score }) {
  let resultMessage = '';

  if (player1Score > player2Score) {
    resultMessage = 'Player 1 wins!';
  } else if (player1Score < player2Score) {
    resultMessage = 'Player 2 wins!';
  } else {
    resultMessage = 'It\'s a tie!';
  }

  return (
    <div className="game-result">
      <h2>{resultMessage}</h2>
    </div>
  )
}

export default GameResult;
