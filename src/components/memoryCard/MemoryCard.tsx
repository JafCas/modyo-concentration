import images from "../../assets/images";
import "./memoryCard.css";

const MemoryCard = ({
  card,
  index,
  flippedCards,
  matchedCards,
  handleCardClick,
  isSelected,
  isMatched,
}: {
  card: { fields: { image: { url: string; title: string } } };
  index: number;
  flippedCards: number[];
  matchedCards: number[];
  handleCardClick: (index: number) => void;
  isSelected: boolean;
  isMatched: boolean;
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
      {/* <img src={card.fields.image.url} alt={card.fields.image.title} /> */}
      <img
        // src={images.cardCover}
        src={
          flippedCards.includes(index) || matchedCards.includes(index)
            ? card.fields.image.url
            : images.cardCover
        }
        alt={card.fields.image.title}
        // style={{ marginTop: "-1px" }}
      />
    </div>
  );
};

export default MemoryCard;
