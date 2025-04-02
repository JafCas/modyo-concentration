import React from "react";
import "./memoryCard.css";

const MemoryCard = ({
  card,
  index,
  flippedCards,
  matchedCards,
  handleCardClick,
}: {
  card: { fields: { image: { url: string; title: string } } };
  index: number;
  flippedCards: number[];
  matchedCards: number[];
  handleCardClick: (index: number) => void;
}) => {
  return (
    <div
      key={index}
      className="card"
      style={{
        borderColor: matchedCards.includes(index)
          ? "green"
          : flippedCards.includes(index)
          ? "red"
          : "black",
        transform: flippedCards.includes(index) ? "scale(1.1)" : "scale(1)",
      }}
      onClick={() => handleCardClick(index)}
    >
      <img src={card.fields.image.url} alt={card.fields.image.title} />
    </div>
  );
};

export default MemoryCard;
