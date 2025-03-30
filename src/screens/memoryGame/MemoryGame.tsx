import React from "react";
import { entriesSample } from "../../services/getCardEntries";

const MemoryGame = () => {
  return (
    <div>
      <div className="game-container">
        <div className="card-container">
          {entriesSample.map((card, index) => (
            <>
              <div className="card" key={index}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  src={card.fields.image.url}
                  alt={card.fields.image.title}
                  className="card-image"
                />
                <div className="card-name">{card.meta.name}</div>
              </div>
              <div className="card" key={index}>
                <img
                  src={card.fields.image.url}
                  alt={card.fields.image.title}
                  className="card-image"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div className="card-name">{card.meta.name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
