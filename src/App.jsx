import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './component/GameBoard';
import GameControls from './component/GameControls';
import PlayerInfo from './component/PlayerInfo';
import GameResult from './component/GameResult';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [turns, setTurns] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      fetchCards();
    }
  }, [gameStarted]);

  const fetchCards = async () => {
    const dogBreeds = ['poodle', 'bulldog', 'beagle', 'dalmatian', 'retriever', 'terrier', 'husky', 'chihuahua'];
    let dogImages = [];

    for (const breed of dogBreeds) {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/2`);
      const data = await response.json();
      dogImages = dogImages.concat(data.message.map(image => ({
        breed,
        image
      })));
    }

    if (dogImages.length === 16) {
      const shuffledCards = dogImages
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({
          id: index,
          breed: card.breed,
          image: card.image,
          revealed: false,
        }));

      setCards(shuffledCards);
    } else {
      console.error('犬種の画像が16枚未満です。');
    }
  };

  const startGame = (cardCount, player1, player2) => {
    setPlayer1Name(player1);  // プレイヤー1の名前を設定
    setPlayer2Name(player2);  // プレイヤー2の名前を設定
    setGameStarted(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTurns(0);
    setSelectedCards([]);
    setMatchedCards([]);
    setGameFinished(false);
  };

  const startNewGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTurns(0);
    setSelectedCards([]);
    setMatchedCards([]);
    setGameFinished(false);
    setGameStarted(true);  // ゲームを開始
  };

  const handleCardClick = (index) => {
    if (selectedCards.length === 2 || cards[index].revealed) return;

    const updatedCards = [...cards];
    updatedCards[index].revealed = true;
    setCards(updatedCards);

    setSelectedCards((prev) => [...prev, index]);

    if (selectedCards.length === 1) {
      const [firstCardIndex] = selectedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[index];

      if (firstCard.breed === secondCard.breed) {
        setMatchedCards((prev) => [...prev, firstCardIndex, index]);

        if (currentPlayer === 1) {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        }

        if (matchedCards.length + 2 === cards.length) {
          setGameFinished(true);
        }

        // カードが揃った場合はターンを切り替えない
        setTimeout(() => {
          setSelectedCards([]);
          updatedCards[firstCardIndex].revealed = false;
          updatedCards[index].revealed = false;
          setCards(updatedCards);
        }, 1000);
        return; // カードが揃った場合はターンを切り替えない
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
      ) : gameFinished ? (
        <GameResult
          player1Score={player1Score}
          player2Score={player2Score}
          player1Name={player1Name}  // プレイヤー1の名前をGameResultに渡す
          player2Name={player2Name}  // プレイヤー2の名前をGameResultに渡す
          startNewGame={startNewGame}  // New Gameボタンの処理
        />
      ) : (
        <>
          <PlayerInfo
            player1Name={player1Name}
            player2Name={player2Name}
            player1Score={player1Score}
            player2Score={player2Score}
            currentPlayer={currentPlayer}
          />
          <GameBoard cards={cards} handleCardClick={handleCardClick} matchedCards={matchedCards} />
        </>
      )}
    </div>
  );
}

export default App;
