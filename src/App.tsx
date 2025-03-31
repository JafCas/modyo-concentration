import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./modals/welcome/Welcome";
import MemoryGame from "./screens/memoryGame/MemoryGame";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    console.log("Game Over! All cards matched.");
  };

  const handleSrtartGame = (name: string) => {
    setPlayerName(name);
    setGameOver(false);
    setGameStarted(true);
    console.log(`Game started for player: ${name}`);
  };

  useEffect(() => {
    if (gameStarted) {
      console.log("Game is in progress...");
    }
  }, [gameStarted]);

  return (
    <>
      {/* Welcome */}
      <Welcome startGameWithName={handleSrtartGame} />

      {/* MemoryGame */}
      <MemoryGame onGameOver={handleGameOver} />

      {/* Congratulations */}
    </>
  );
}

export default App;
