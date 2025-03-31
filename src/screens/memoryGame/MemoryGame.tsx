import { useCallback, useEffect, useState } from "react";
import { Card, cardsSample } from "../../services/getCardEntries";

type MemoryGameProps = {
  onGameOver: () => void;
};

const MemoryGame = ({ onGameOver }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const shuffleCards = (cards: Card[]): Card[] => {
    const shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    return shuffledCards;
  };

  const handleCardClick = (cardIndex: number) => {
    // Handle card click logic here
    console.log(`Card clicked: ${cardIndex} and flippedCards: ${flippedCards}`);

    if (flippedCards.includes(cardIndex)) {
      setFlippedCards([]); // TODO: Replace for card cleaning method
      return;
    }
    setFlippedCards((prev) => [...prev, cardIndex]);
  };

  const restartGame = useCallback(() => {
    setCards(shuffleCards(cardsSample));
    setFlippedCards([]);
    setMatchedCards([]);
    setCorrectCount(0);
    setIncorrectCount(0);
    console.log("Game restarted!");
  }, []);

  useEffect(() => {
    const shuffledCards = shuffleCards(cardsSample);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    const [firstCardIndex, secondCardIndex] = flippedCards;
    if (firstCardIndex !== undefined && secondCardIndex !== undefined) {
      if (
        cards[firstCardIndex].meta.uuid === cards[secondCardIndex].meta.uuid
      ) {
        console.log("Match found!");
        setMatchedCards((prev) => [...prev, firstCardIndex, secondCardIndex]);
        setCorrectCount((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        console.log("No match, flipping back...");
        setIncorrectCount((prev) => prev + 1);
        setFlippedCards([]);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      console.log("Game Over! All cards matched.");
      onGameOver();
      restartGame();
    }
  }, [cards, matchedCards, restartGame, onGameOver]);

  return (
    <div>
      <div className="game-container">
        <div className="card-container">
          <div style={{ display: "flex", flexDirection: "row", gap: "40px", alignItems: "center" }}>
            <h2>Memory Game</h2>
            <p>Correct Matches: {correctCount}</p>
            <p>Incorrect Matches: {incorrectCount}</p>
          </div>
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(index)}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                src={card.fields.image.url}
                alt={card.fields.image.title}
                className="card-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
