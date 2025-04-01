import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./modals/welcome/Welcome";
import MemoryGame from "./screens/memoryGame/MemoryGame";
import Congratulations from "./modals/congratulations/Congratulations";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleGameOver = (correct: number, incorrect: number) => {
    setGameOver(true);
    setGameStarted(false);
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    console.log(`Game Over! Correct: ${correct}, Incorrect: ${incorrect}`);
  };

  const handleSrtartGame = (name: string) => {
    setPlayerName(name);
    setGameOver(false);
    setGameStarted(true);
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setGameStarted(true);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return (
    <>
      {/* Welcome */}
      <Welcome startGameWithName={handleSrtartGame} />

      {/* MemoryGame */}
      <MemoryGame onGameOver={handleGameOver} gameStarted={gameStarted} />

      {/* Congratulations */}
      <Congratulations onPlayAgain={handlePlayAgain} isGameOver={gameOver} />
    </>
  );
}

export default App;
