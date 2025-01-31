import React, { Component } from 'react';
import { getRandomCard, filterAvailableCards } from './CpuUtils';

class CpuLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memorizedCards: [],
      isCpuTurn: true, // CPUターンを管理
    };
    this.isMountedFlag = false;  // マウント状態を管理
  }

  componentDidMount() {
    this.isMountedFlag = true; // コンポーネントがマウントされた時にフラグを立てる
  }

  componentWillUnmount() {
    this.isMountedFlag = false; // コンポーネントがアンマウントされる時にフラグを下げる
  }

  selectCard = () => {
    const { cards, difficulty, matchedCards } = this.props;
    const { memorizedCards } = this.state;
    const availableCards = filterAvailableCards(cards, matchedCards, memorizedCards);
    let selectedCard;

    if (difficulty === 'CPUよわい') {
      selectedCard = getRandomCard(availableCards);
    } else if (difficulty === 'CPUふつう') {
      if (Math.random() < 0.8 && memorizedCards.length > 0) {
        selectedCard = memorizedCards[Math.floor(Math.random() * memorizedCards.length)];
      } else {
        selectedCard = getRandomCard(availableCards);
      }
    } else if (difficulty === 'CPUつよい') {
      if (Math.random() < 0.9 && memorizedCards.length > 0) {
        selectedCard = memorizedCards[Math.floor(Math.random() * memorizedCards.length)];
      } else {
        selectedCard = getRandomCard(availableCards);
      }
    }

    this.setState((prevState) => ({
      memorizedCards: [...prevState.memorizedCards, selectedCard],
    }));

    return selectedCard;
  };

  componentDidUpdate(prevProps, prevState) {
    const { isCpuTurn } = this.state;
    const { cards, matchedCards, onCardMatched } = this.props;

    // CPUターンの時にカードを選ぶ
    if (isCpuTurn) {
      setTimeout(() => {
        const selectedCard = this.selectCard();

        // 2枚目のカードが同じ場合、再度CPUのターン
        if (this.isMatching(selectedCard)) {
          onCardMatched(selectedCard); // 適切な関数でカードが一致したことを通知
          if (this.isMountedFlag) { // コンポーネントがマウントされているかチェック
            this.setState({ isCpuTurn: true }); // 再度CPUターンに
          }
        } else {
          if (this.isMountedFlag) {
            this.setState({ isCpuTurn: false }); // プレイヤーターンに
          }
        }
      }, 1000); // 1秒後に選択を行う（適切な時間に調整できます）
    }
  }

  isMatching = (selectedCard) => {
    // 2枚目のカードが一致するかどうかを判断するロジックをここに
    return selectedCard === selectedCard; // 仮の一致判定
  };

  render() {
    return null; // このコンポーネント自体はUIを描画しない
  }
}

export default CpuLogic;
