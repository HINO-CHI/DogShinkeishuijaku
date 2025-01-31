// src/components/cpu/CpuUtils.jsx

export function getRandomCard(availableCards) {
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  return availableCards[randomIndex];
}

export function filterAvailableCards(cards, matchedCards, memorizedCards) {
  return cards.filter(
    (card) => !matchedCards.includes(card.id) && !memorizedCards.includes(card.id)
  );
}
