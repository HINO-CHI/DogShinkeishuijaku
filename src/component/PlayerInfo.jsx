import React from 'react';

function PlayerInfo({ player1Score, player2Score, currentPlayer }) {
  return (
    <div className="player-info">
      <h2>Player 1: {player1Score} points</h2>
      <h2>Player 2: {player2Score} points</h2>
      <h3>Current Turn: Player {currentPlayer}</h3>
    </div>
  );
}

export default PlayerInfo;
