import React from "react";
const Congratulations = () => {
  const handlePlayAgain = () => {
    // Logic to reset the game state and start a new game
    window.location.reload();
  };
  return (
    <div className="congratulations-modal">
      <h2>Congratulations!</h2>
      <p>You have completed the game!</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Congratulations;
