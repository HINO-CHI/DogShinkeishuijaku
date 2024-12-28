import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card, onClick, matched }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (card.revealed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // 1秒後に表示

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // revealedが解除されたら非表示
    }
  }, [card.revealed]);

  return (
    <div
      className={`card ${card.revealed ? 'revealed' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: matched ? 'lightgray' : 'white',
        border: matched ? 'none' : '1px solid #000',
        visibility: matched ? 'hidden' : 'visible',
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src="./images/Usagichan.png" alt="Usagichan" />
        </div>
        <div className={`card-back ${isVisible ? 'visible' : ''}`}>
          <img src={card.image} alt={card.breed} />
        </div>
      </div>
      {!matched && card.revealed && <div className="breed-text">{card.breed}</div>}
    </div>
  );
}

export default Card;
