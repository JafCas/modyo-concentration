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

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (
        matchedCards.includes(cardIndex) ||
        flippedCards.includes(cardIndex)
      ) {
        return;
      }
      setFlippedCards((prev) => [...prev, cardIndex]);
    },
    [matchedCards, flippedCards]
  );

  const restartGame = useCallback(() => {
    initializeAndShuffleCards();
    setFlippedCards([]);
    setMatchedCards([]);
    setCorrectCount(0);
    setIncorrectCount(0);
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
        cards[firstCardIndex]?.meta.uuid === cards[secondCardIndex]?.meta.uuid;

      setTimeout(() => {
        if (isMatch) {
          setMatchedCards((prev) => [...prev, firstCardIndex, secondCardIndex]);
          setCorrectCount((prev) => prev + 1);
        } else {
          setIncorrectCount((prev) => prev + 1);
        }
        setFlippedCards([]);
      }, 400);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      onGameOver(correctCount, incorrectCount);
    }
  }, [matchedCards, cards.length, onGameOver, correctCount, incorrectCount]);

  return (
    <div style={{ filter: isGameStarted ? "blur(0px)" : "blur(4px)" }}>
      
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
