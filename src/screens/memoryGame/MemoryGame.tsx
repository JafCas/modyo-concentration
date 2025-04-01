import { useCallback, useEffect, useState } from "react";
import { Card, cardsSample } from "../../services/getCardEntries";

type MemoryGameProps = {
  onGameOver: (correct: number, incorrect: number) => void;
};

const MemoryGame = ({ onGameOver }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const shuffleCards = useCallback(
    () => [...cardsSample, ...cardsSample].sort(() => Math.random() - 0.5),
    []
  );

  const handleCardClick = (cardIndex: number) => {
    // Handle card click logic here
    if (matchedCards.includes(cardIndex)) return;

    if (flippedCards.includes(cardIndex)) {
      setFlippedCards([]); // TODO: Replace for card cleaning method
      return;
    }
    setFlippedCards((prev) => [...prev, cardIndex]);
  };

  const restartGame = useCallback(() => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setCorrectCount(0);
    setIncorrectCount(0);
  }, [shuffleCards]);

  useEffect(() => setCards(shuffleCards()), [shuffleCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const isMatch =
        cards[firstCardIndex].meta.uuid === cards[secondCardIndex].meta.uuid;

      setMatchedCards((prev) =>
        isMatch ? [...prev, firstCardIndex, secondCardIndex] : prev
      );
      setCorrectCount((prev) => (isMatch ? prev + 1 : prev));
      setIncorrectCount((prev) => (!isMatch ? prev + 1 : prev));
      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      onGameOver(correctCount, incorrectCount);
      restartGame();
    }
  }, [
    matchedCards,
    cards,
    onGameOver,
    correctCount,
    incorrectCount,
    restartGame,
  ]);

  return (
    <div>
      <div className="game-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            alignItems: "center",
          }}
        >
          <h2>Memory Game</h2>
          <p>Correct Matches: {correctCount}</p>
          <p>Incorrect Matches: {incorrectCount}</p>
        </div>
        <div
          className="card-container"
          style={{ display: "flex", gap: "20px" }}
        >
          {cards.map((card, index) => (
            <div
              style={{
                cursor: "pointer",
                border: "2px solid",
                borderColor: matchedCards.includes(index)
                  ? "green"
                  : flippedCards.includes(index)
                  ? "red"
                  : "black",
              }}
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
