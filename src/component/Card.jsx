import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card, onClick, matched }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (card.revealed) {
      // revealed後に裏面を一定時間表示
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 1秒後に裏面を表示

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false); // revealedが解除されたら非表示
    }
  }, [card.revealed]);

  return (
    <div
      className={`card ${card.revealed ? 'revealed' : ''} ${matched ? 'matched' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: matched ? 'lightgray' : 'white', // 一致した場合は背景色に変更
        border: matched ? 'none' : '1px solid #000', // 枠線を消す場合
        visibility: matched ? 'hidden' : 'visible', // 一致した場合は全体を非表示
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src="/src/component/images/Usagichan.png" alt="Usagichan" />
        </div>
        <div className={`card-back ${isVisible ? 'visible' : ''}`}>
          {!matched && <img src={card.image} alt={card.breed} />} {/* 一致した場合は画像を非表示 */}
        </div>
      </div>
      {/* カード外部に犬種名を表示 */}
      {card.revealed && !matched && <div className="breed-text">{card.breed}</div>}
    </div>
  );
}

export default Card;
