import React, { useState } from "react";
import "./Welcome.css";

type WelcomeProps = {
  isGameStarted: boolean;
  startGameWithName: (name: string) => void;
};

const Welcome = ({ isGameStarted, startGameWithName }: WelcomeProps) => {
  const [playerName, setPlayerName] = useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleStartGame = () => {
    if (playerName) {
      startGameWithName(playerName);
    }
  };

  return (
    <div
      className="floating-card welcome"
      style={{
        opacity: !isGameStarted ? 1 : 0,
        pointerEvents: !isGameStarted ? "all" : "none",
        overflow: !isGameStarted ? "hidden" : "auto",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div className="welcome-header">
        <h1>Welcome to the Memory Game!</h1>
        <p>Test your memory and have fun!</p>
      </div>
      <div className="welcome-input">
        <label htmlFor="playerName">Enter your name: </label>
        <input
          onChange={handleNameChange}
          type="text"
          id="playerName"
          name="playerName"
          placeholder="Your name"
        />
      </div>
      <button disabled={!playerName} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default Welcome;
