type CongratulationsProps = {
  correctCount: number;
  incorrectCount: number;
  isGameOver: boolean;
  playerName: string;
  onPlayAgain: () => void;
};

const Congratulations = ({
  correctCount,
  incorrectCount,
  playerName,
  onPlayAgain,
  isGameOver,
}: CongratulationsProps) => {
  const handlePlayAgain = () => {
    onPlayAgain();
  };
  return (
    <div
      className="floating-card"
      style={{
        opacity: isGameOver ? 1 : 0,
        pointerEvents: isGameOver ? "all" : "none",
        overflow: isGameOver ? "hidden" : "auto",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <h2>Congratulations!</h2>
      <p>
        {playerName}, you have completed the game with{" "}
        <strong>{correctCount}</strong> correct matches and{" "}
        <strong>{incorrectCount}</strong> incorrect attempts.
      </p>
      <p>You have completed the game!</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Congratulations;
