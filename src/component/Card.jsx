import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card, onClick, matched }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMatched, setIsMatched] = useState(false); 

  useEffect(() => {
    if (card.revealed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); 
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); 
    }
  }, [card.revealed]);

  useEffect(() => {
    if (matched && !isMatched) {
      const timer = setTimeout(() => {
        setIsMatched(true); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [matched, isMatched]);

  useEffect(() => {
    if (isMatched) {
      setIsVisible(false); 
    }
  }, [isMatched]);

  return (
    <div
      className={`card ${card.revealed ? 'revealed' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: matched ? 'lightgray' : 'white',
        border: matched ? 'none' : '1px solid #000',
        visibility: matched || isMatched ? 'hidden' : 'visible', 
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          {/* Usagichan.pngの表示ができない場合にCSS模様を表示 */}
          <img 
            src="/images/Usagichan.png" 
            alt="Usagichan" 
            onError={(e) => e.target.style.display = 'none'} 
          />
          <div className="card-pattern" /> {/* 画像読み込み失敗時に模様を表示 */}
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
