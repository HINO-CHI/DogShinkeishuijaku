import React, { useState, useEffect } from 'react';
import './Card.css';

function Card({ card, onClick }) {
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
    <div className={`card ${card.revealed ? 'revealed' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src="/src/component/images/Usagichan.png" alt="Usagichan" />
        </div>
        <div className={`card-back ${isVisible ? 'visible' : ''}`}>
          <img src={card.image} alt={card.breed} />
        </div>
      </div>
      {/* カード外部に犬種名を表示 */}
      {card.revealed && <div className="breed-text">{card.breed}</div>}
    </div>
  );
}

export default Card;