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
    // You can implement the logic to check for matches or flip cards
    // For example, you can use a state variable to track the flipped cards
    // and check if they match when two cards are flipped.
    // If they match, you can keep them flipped; if not, you can flip them back.
    // You can also implement a scoring system and a timer for the game.
    // This is just a placeholder for the card click logic.
    if (!flippedCards.includes(cardIndex)) {
      setFlippedCards((prev) => [...prev, cardIndex]);
    }
    if (flippedCards.length === 2) {
      // Check if the two flipped cards match
      const [firstCardIndex, secondCardIndex] = flippedCards;
      if (
        cards[firstCardIndex].meta.uuid === cards[secondCardIndex].meta.uuid
      ) {
        console.log("Match found!");
        // Logic for a successful match can go here
      } else {
        console.log("No match. Flipping back.");
        // Logic for flipping back the cards can go here
      }
      // Reset the flipped cards after checking
      setFlippedCards([]);
    }
  };

  useEffect(() => {
    // Shuffle the cards when the component mounts
    const shuffledCards = shuffleCards(cardsSample);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    // Check if all cards are flipped
    if (cards.length > 0 && flippedCards.length === cards.length) {
      console.log("All cards flipped! Game over.");
      // Logic for game over can go here
    }
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
