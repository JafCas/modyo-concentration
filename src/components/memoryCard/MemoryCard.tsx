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
  return (
    <div
      key={index}
      className="card"
      style={{
        borderColor: isMatched
          ? "green"
          : isSelected
          ? "red"
          : "black",
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
      onClick={() => handleCardClick(index)}
    >
      {/* <img src={card.fields.image.url} alt={card.fields.image.title} /> */}
      <img
        // src={images.cardCover}
        src={isSelected || isMatched ? card.fields.image.url : images.cardCover}
        alt={card.fields.image.title}
        // style={{ marginTop: "-1px" }}
      />
    </div>
  );
};

export default MemoryCard;
