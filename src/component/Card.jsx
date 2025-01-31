import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card, onClick, matched }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMatched, setIsMatched] = useState(false); // 追加: 一致したカードの管理

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

  useEffect(() => {
    if (matched && !isMatched) {
      // 一致した場合、1秒後にカードを隠す
      const timer = setTimeout(() => {
        setIsMatched(true); // 1秒後に一致した状態を確定
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [matched, isMatched]);

  useEffect(() => {
    if (isMatched) {
      setIsVisible(false); // 一致した後にカードを隠す
    }
  }, [isMatched]);

  return (
    <div
      className={`card ${card.revealed ? 'revealed' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: matched ? 'lightgray' : 'white',
        border: matched ? 'none' : '1px solid #000',
        visibility: matched || isMatched ? 'hidden' : 'visible', // 一致したカードを隠す
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src="/images/Usagichan.png" alt="Usagichan" />
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
