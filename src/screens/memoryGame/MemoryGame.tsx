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
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div className="counter flex gap-24">
          <div
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"
            style={{ boxShadow: "0 0 4px rgba(0, 255, 0, 0.5)" }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {correctCount}
            </span>
          </div>
          <div
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"
            style={{ boxShadow: "0 0 4px rgba(255, 0, 0, 0.5)" }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {incorrectCount}
            </span>
          </div>
        </div>
      </header>
      <div className="card-container flex gap-5 justify-center flex-wrap">
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
