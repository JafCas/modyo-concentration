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

  const handleGameOver = useCallback((correct: number, incorrect: number) => {
    setGameOver(true);
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
    setGameStarted(false);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return (
    <>
      {/* Welcome */}
      <Welcome
        startGameWithName={handleSrtartGame}
        isGameStarted={gameStarted}
      />

      {/* MemoryGame */}
      <MemoryGame onGameOver={handleGameOver} gameStarted={gameStarted} />

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
