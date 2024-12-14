import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import PlayerInfo from './components/PlayerInfo';
import GameResult from './components/GameResult';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [turns, setTurns] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      // APIを呼び出してカード情報を取得
      fetchCards();
    }
  }, [gameStarted]);

  const fetchCards = async () => {
    // DogAPIのURLを使用して犬画像と犬種を取得
    const response = await fetch('https://dog.ceo/api/breeds/image/random/16');
    const data = await response.json();
    const dogImages = data.message;
    const dogBreeds = dogImages.map((img) => img.split('/')[4]);

    // シャッフルしてカードをセット
    const shuffledCards = [...dogBreeds, ...dogBreeds]
      .sort(() => Math.random() - 0.5)
      .map((breed, index) => ({
        id: index,
        breed,
        image: dogImages[index],
        revealed: false,
      }));

    setCards(shuffledCards);
  };

  const startGame = () => {
    setGameStarted(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTurns(0);
    setSelectedCards([]);
  };

  const handleCardClick = (index) => {
    if (selectedCards.length === 2 || cards[index].revealed) return;

    const updatedCards = [...cards];
    updatedCards[index].revealed = true;
    setCards(updatedCards);

    setSelectedCards((prev) => [...prev, index]);

    if (selectedCards.length === 1) {
      // 同じ犬種のカードを選んだ場合
      const [firstCardIndex] = selectedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[index];

      if (firstCard.breed === secondCard.breed) {
        if (currentPlayer === 1) {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        }
      }

      setTurns(turns + 1);

      setTimeout(() => {
        setSelectedCards([]);
        updatedCards[firstCardIndex].revealed = false;
        updatedCards[index].revealed = false;
        setCards(updatedCards);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }, 1000);
    }
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <GameControls startGame={startGame} />
      ) : (
        <>
          <PlayerInfo player1Score={player1Score} player2Score={player2Score} currentPlayer={currentPlayer} />
          <GameBoard cards={cards} handleCardClick={handleCardClick} />
          {turns === cards.length / 2 && (
            <GameResult player1Score={player1Score} player2Score={player2Score} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
