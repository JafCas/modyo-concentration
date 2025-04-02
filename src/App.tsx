import { useCallback, useState } from "react";

import "./App.css";

import Welcome from "./modals/welcome/Welcome";
import Congratulations from "./modals/congratulations/Congratulations";
import MemoryGame from "./screens/memoryGame/MemoryGame";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isPlayingAgain, setIsPlayingAgain] = useState(false);

  const handleGameOver = useCallback((correct: number, incorrect: number) => {
    setGameOver(true);
    setGameStarted(false);
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
  }, []);

  const handleSrtartGame = (name: string) => {
    setPlayerName(name);
    setGameOver(false);
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsPlayingAgain(true);
    setGameStarted(false);
  };

  const headerClassName = `counter flex flex-row gap-28 fixed z-500 ${
    !gameStarted ? "blur-xs" : ""
  }`;

  return (
    <>
      {/* Welcome */}
      <Welcome
        startGameWithName={handleSrtartGame}
        isGameStarted={gameStarted}
        isGameOver={gameOver}
        isPlayingAgain={isPlayingAgain}
      />

      <header
        className={`${headerClassName}`}
        style={{ top: "1.2em", left: "50%", transform: "translateX(-50%)" }}
      >
        <div
          className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white"
          style={{ boxShadow: "0 0 4px rgb(2, 150, 2)" }}
        >
          <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
            {correctCount}
          </span>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white"
          style={{ boxShadow: "0 0 4px rgb(129, 10, 10)" }}
        >
          <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
            {incorrectCount}
          </span>
        </div>
      </header>

      {/* MemoryGame */}
      <MemoryGame onGameOver={handleGameOver} isGameStarted={gameStarted} />

      {/* Congratulations */}
      <Congratulations
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        isGameOver={gameOver}
        playerName={playerName}
        onPlayAgain={handlePlayAgain}
      />
    </>
  );
}

export default App;
