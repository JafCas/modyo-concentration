import { useEffect, useState } from "react";
import { Card, cardsSample } from "../../services/getCardEntries";

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const shuffleCards = (cards: Card[]): Card[] => {
    // Shuffle the cards array
    const shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    return shuffledCards;
  };

  const handleCardClick = (cardIndex: number) => {
    // Handle card click logic here
    console.log(`Card clicked: ${cardIndex}`);

    if (flippedCards.includes(cardIndex) || flippedCards.length === 2) {
      console.log("Card already flipped or two cards are already flipped.");
      setFlippedCards([]); // TODO: Replace for card cleaning method
      return;
    }
    setFlippedCards((prev) => [...prev, cardIndex]);
  };

  useEffect(() => {
    // Shuffle the cards when the component mounts
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
      } else {
        console.log("No match, flipping back...");
        // Logic to flip cards back can go here
      }
    }

    // // Check if all cards are flipped
    // if (cards.length > 0 && flippedCards.length === cards.length) {
    //   console.log("All cards flipped! Game over.");
    //   // Logic for game over can go here
    // }
  }, [flippedCards, cards]);

  return (
    <div>
      <div className="game-container">
        <div className="card-container">
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
