import images from "../../assets/images";
import "./memoryCard.css";

const MemoryCard = ({
  card,
  index,
  handleCardClick,
  isSelected,
  isMatched,
}: {
  card: { fields: { image: { url: string; title: string } } };
  index: number;
  handleCardClick: (index: number) => void;
  isSelected: boolean;
  isMatched: boolean;
}) => {
  const tailwindClassForBG = isSelected
    ? "bg-blue-300"
    : isMatched
    ? "bg-green-300"
    : "bg-gray-200";

  return (
    <div
      key={index}
      className={`card ${tailwindClassForBG}`}
      style={{
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
      onClick={() => handleCardClick(index)}
    >
      <img
        src={isSelected || isMatched ? card.fields.image.url : images.cardCover}
        alt={card.fields.image.title}
      />
    </div>
  );
};

export default MemoryCard;
