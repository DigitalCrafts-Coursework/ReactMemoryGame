import "./App.css";
import MemoryCard from "./components/MemoryCard";
import React from "react";

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    const currentCard = deck[i];
    const cardToSwap = deck[swapIndex];
    deck[i] = cardToSwap;
    deck[swapIndex] = currentCard;
  }
  return deck;
};

const generateDeck = () => {
  const symbols = ["∆", "ß", "£", "§", "•", "$", "+", "ø"];
  const deck = [];
  for (let i = 0; i < symbols.length; i++) {
    deck.push({ isFlipped: false, symbol: [i] });
    deck.push({ isFlipped: false, symbol: [i] });
  }
  shuffleDeck(deck);
  console.log(deck);
  return deck;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: generateDeck(), pickedCards: [] };
  }

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped) {
      return;
    }
    const cardToFlip = { ...this.state.deck[cardIndex] };
    cardToFlip.isFlipped = true;

    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0];
      const card2Index = newPickedCards[1];
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(() => {
          this.unflipCards(card1Index, card2Index);
        }, 1000);
      }
      newPickedCards = [];
    }

    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards,
    });
  }

  unflipCards(card1Index, card2Index) {
    const card1 = { ...this.state.deck[card1Index] };
    const card2 = { ...this.state.deck[card2Index] };
    card1.isFlipped = false;
    card2.isFlipped = false;

    const newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1;
      }
      if (card2Index === index) {
        return card2;
      }
      return card;
    });

    this.setState({ deck: newDeck });
  }
  render() {
    const cardsJSX = [
      this.state.deck.map((card, index) => {
        return (
          <MemoryCard
            key={index}
            symbol={card.symbol}
            isFlipped={card.isFlipped}
            pickCard={this.pickCard.bind(this, index)}
          />
        );
      }),
    ];

    return (
      <div className="App">
        <header className="App-header">
          <div>Memory Game</div>
          <div>Match cards to win</div>
        </header>
        {cardsJSX.slice(0, 4)}
        {cardsJSX.slice(4, 8)}
        {cardsJSX.slice(8, 12)}
        {cardsJSX.slice(12, 16)}
      </div>
    );
  }
}

export default App;
