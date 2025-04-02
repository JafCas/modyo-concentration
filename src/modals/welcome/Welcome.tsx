import React, { useEffect, useState } from "react";
import "./Welcome.css";

type WelcomeProps = {
  isGameStarted: boolean;
  isGameOver: boolean;
  isPlayingAgain: boolean;
  startGameWithName: (name: string) => void;
};

const Welcome = ({
  isGameStarted,
  isGameOver,
  isPlayingAgain,
  startGameWithName,
}: WelcomeProps) => {
  const [playerName, setPlayerName] = useState("");
  const isCardVisible = !isGameStarted && !isGameOver;
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleStartGame = () => {
    if (playerName) {
      startGameWithName(playerName);
    }
  };

  useEffect(() => {
    if (!isGameStarted) {
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [isGameStarted]);

  const labelText = isPlayingAgain ? "Are you still?" : "Enter your name: ";

  return (
    <div
      className="floating-card welcome"
      style={{
        opacity: isCardVisible ? 1 : 0,
        pointerEvents: isCardVisible ? "all" : "none",
        overflow: isCardVisible ? "hidden" : "auto",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div className="welcome-header">
        <h1>Welcome to the Memory Game!</h1>
        <p>Test your memory and have fun!</p>
      </div>
      <div className="welcome-input">
        <label htmlFor="playerName">{labelText}</label>
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
