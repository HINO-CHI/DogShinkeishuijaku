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

    if (isCpuTurn) {
      setTimeout(() => {
        const selectedCard = this.selectCard();
        if (this.isMatching(selectedCard)) {
          onCardMatched(selectedCard); 
          if (this.isMountedFlag) { 
            this.setState({ isCpuTurn: true });
          }
        } else {
          if (this.isMountedFlag) {
            this.setState({ isCpuTurn: false });
          }
        }
      }, 1000);
    }
  }

  isMatching = (selectedCard) => {
    return selectedCard === selectedCard; 
  };

  render() {
    return null; 
  }
}

export default CpuLogic;
