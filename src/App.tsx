import { useCallback, useState } from "react";

import "./App.css";

import Welcome from "./modals/welcome/Welcome";
import Congratulations from "./modals/congratulations/Congratulations";
import MemoryGame from "./screens/memoryGame/MemoryGame";

export type Difficulty = "easy" | "medium" | "hard";

const difficultyPairs = {
  easy: 2,
  medium: 4,
  hard: 20,
};

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isPlayingAgain, setIsPlayingAgain] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [cardCount, setCardCount] = useState(difficultyPairs[difficulty]);

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

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setCardCount(difficultyPairs[difficulty]);
  };

  return (
    <>
      {/* Welcome */}
      <Welcome
        startGameWithName={handleSrtartGame}
        setDifficulty={handleSelectDifficulty}
        isGameStarted={gameStarted}
        isGameOver={gameOver}
        isPlayingAgain={isPlayingAgain}
      />

      {/* MemoryGame */}
      <MemoryGame
        onGameOver={handleGameOver}
        isGameStarted={gameStarted}
        numberOfCards={cardCount}
      />

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
