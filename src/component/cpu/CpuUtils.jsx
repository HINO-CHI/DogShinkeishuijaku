// src/components/cpu/CpuUtils.jsx

// ランダムにカードを選ぶ関数
export function getRandomCard(availableCards) {
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
}

// 覚えたカードやマッチしたカードを除外し、利用可能なカードを取得する関数
export function filterAvailableCards(cards, matchedCards, memorizedCards) {
  return cards.filter(
    (card) => !matchedCards.includes(card.id) && !memorizedCards.includes(card.id)
  );
}
