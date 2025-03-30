import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./modals/welcome/Welcome";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleSrtartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
    console.log(`Game started for player: ${name}`);
  };

  useEffect(() => {
    if (gameStarted) {
      console.log("Game is in progress...");
      // Logic to start the game goes here
    }
  }, [gameStarted]);

  return (
    <>
      {/* Welcome */}
      <Welcome startGameWithName={handleSrtartGame} />

      {/* MemoryGame */}

      {/* Congratulations */}
    </>
  );
}

export default App;
