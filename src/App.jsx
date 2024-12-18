import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './component/GameBoard';
import GameControls from './component/GameControls';
import PlayerInfo from './component/PlayerInfo';
import GameResult from './component/GameResult';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [turns, setTurns] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]); // 一致したカードのインデックスを管理
  const [gameFinished, setGameFinished] = useState(false); // ゲーム終了状態を追加

  useEffect(() => {
    if (gameStarted) {
      fetchCards();
    }
  }, [gameStarted]);

  const fetchCards = async () => {
    const dogBreeds = ['poodle', 'bulldog', 'beagle', 'dalmatian', 'retriever', 'terrier', 'husky', 'chihuahua'];
    let dogImages = [];

    // 各犬種ごとに2枚の画像を取得
    for (const breed of dogBreeds) {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/2`);
      const data = await response.json();
      
      // 画像データに犬種名を追加して、dogImagesに格納
      dogImages = dogImages.concat(data.message.map(image => ({
        breed,  // 各画像に対応する犬種名を追加
        image
      })));
    }

    // dogImagesのサイズが16枚かどうかを確認
    console.log('dogImages length:', dogImages.length);  // ここで長さが16か確認

    // dogImagesのサイズが16枚になるはず
    if (dogImages.length === 16) {
      // 画像のカードをシャッフル
      const shuffledCards = dogImages
        .sort(() => Math.random() - 0.5) // シャッフル
        .map((card, index) => ({
          id: index,
          breed: card.breed, // 取得した犬種をそのまま使用
          image: card.image,
          revealed: false,
        }));

      setCards(shuffledCards);
    } else {
      console.error('犬種の画像が16枚未満です。');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTurns(0);
    setSelectedCards([]);
    setMatchedCards([]); // ゲーム開始時に一致したカードをリセット
    setGameFinished(false); // ゲーム終了状態をリセット
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
        // 一致したカードをマッチ済みカードとして追加
        setMatchedCards((prev) => [...prev, firstCardIndex, index]);

        if (currentPlayer === 1) {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        }

        // すべてのカードがマッチした場合、ゲームを終了
        if (matchedCards.length + 2 === cards.length) {
          setGameFinished(true);
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
      ) : gameFinished ? (
        <GameResult player1Score={player1Score} player2Score={player2Score} />
      ) : (
        <>
          <PlayerInfo player1Score={player1Score} player2Score={player2Score} currentPlayer={currentPlayer} />
          <GameBoard cards={cards} handleCardClick={handleCardClick} matchedCards={matchedCards} />
        </>
      )}
    </div>
  );
}

export default App;