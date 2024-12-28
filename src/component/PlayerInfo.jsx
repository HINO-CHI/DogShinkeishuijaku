import React from 'react';

function PlayerInfo({ player1Name, player2Name, player1Score, player2Score, currentPlayer }) {
  return (
    <div className="player-info">
      <h2>{player1Name}: {player1Score} points</h2>
      <h2>{player2Name}: {player2Score} points</h2>
      <h3>Current Turn: {currentPlayer === 1 ? player1Name : player2Name}</h3>
    </div>
  );
}

export default PlayerInfo;
