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
  const tailwindClasses = isGameOver
    ? "opacity-100 pointer-events-auto overflow-hidden transition-all duration-200 ease-in-out"
    : "opacity-0 pointer-events-none overflow-auto transition-all duration-200 ease-in-out";

  const handlePlayAgain = () => {
    onPlayAgain();
  };

  return (
    <div className={`floating-card congratulations ${tailwindClasses}`}>
      <h2>Congratulations!</h2>
      <p>
        {playerName}, you have completed the game with{" "}
        <strong className="text-green-500">{correctCount} correct </strong>
        matches and{" "}
        <strong className="text-red-500">
          {incorrectCount} incorrect{" "}
        </strong>{" "}
        attempts.
      </p>
      <p>You have completed the game!</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default Congratulations;
