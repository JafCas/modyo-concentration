import React from "react";

type CongratulationsProps = {
  onPlayAgain: () => void;
  isGameOver: boolean;
};

const Congratulations = ({ onPlayAgain, isGameOver }: CongratulationsProps) => {
  const handlePlayAgain = () => {
    onPlayAgain();
    // Logic to reset the game state and start a new game
    // window.location.reload();
  };
  return (
    <div
      className="congratulations-modal"
      style={{ display: isGameOver ? "block" : "none" }}
    >
      <h2>Congratulations!</h2>
      <p>You have completed the game!</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Congratulations;
