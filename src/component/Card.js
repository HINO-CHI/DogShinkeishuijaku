import React from 'react';

function Card({ card, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {card.revealed ? (
        <img src={card.image} alt={card.breed} />
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
}

export default Card;
