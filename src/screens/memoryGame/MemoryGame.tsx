import { useCallback, useEffect, useState } from "react";
import { Card, getCardEntries } from "../../services/getCardEntries";
import MemoryCard from "../../components/memoryCard/MemoryCard";
// import "./memoryGame.css";

type MemoryGameProps = {
  onGameOver: (correct: number, incorrect: number) => void;
  isGameStarted: boolean;
};

const MemoryGame = ({ onGameOver, isGameStarted }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const initializeAndShuffleCards = useCallback(async () => {
    try {
      const data = await getCardEntries(3);
      const shuffledCards = [...data, ...data].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } catch (error) {
      console.error("Error fetching and shuffling card entries:", error);
    }
  }, []);

  useEffect(() => {
    initializeAndShuffleCards();
  }, [initializeAndShuffleCards]);

  const handleCardClick = (cardIndex: number) => {
    // Handle card click logic here
    if (matchedCards.includes(cardIndex)) return;

    if (flippedCards.includes(cardIndex)) {
      setFlippedCards([]);
      return;
    }

    setFlippedCards((prev) => [...prev, cardIndex]);
  };

  const restartGame = useCallback(() => {
    setTimeout(() => {
      initializeAndShuffleCards();
      setFlippedCards([]);
      setMatchedCards([]);
      setCorrectCount(0);
      setIncorrectCount(0);
    }, 200); // Add a delay to enhance UX
  }, [initializeAndShuffleCards]);

  useEffect(() => {
    if (isGameStarted) {
      restartGame();
    }
  }, [isGameStarted, restartGame]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = flippedCards;
      const isMatch =
        cards[firstCardIndex].meta.uuid === cards[secondCardIndex].meta.uuid;

      setTimeout(() => {
        setMatchedCards((prev) =>
          isMatch ? [...prev, firstCardIndex, secondCardIndex] : prev
        );
        setCorrectCount((prev) => (isMatch ? prev + 1 : prev));
        setIncorrectCount((prev) => (!isMatch ? prev + 1 : prev));
        setFlippedCards([]);
      }, 400); // Add a delay to enhance UX
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      onGameOver(correctCount, incorrectCount);
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
    <div style={{ filter: isGameStarted ? "blur(0px)" : "blur(4px)" }}>
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Memory Game</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <p>Correct Matches: {correctCount}</p>
          <p>Incorrect Matches: {incorrectCount}</p>
        </div>
      </header>
      <div
        className="card-container"
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <MemoryCard
            key={index}
            card={card}
            index={index}
            handleCardClick={handleCardClick}
            isSelected={flippedCards.includes(index)}
            isMatched={matchedCards.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
