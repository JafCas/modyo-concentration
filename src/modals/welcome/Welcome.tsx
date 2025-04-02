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

  const tailwindClasses = isCardVisible
    ? "opacity-100 pointer-events-auto overflow-hidden transition-all duration-200 ease-in-out"
    : "opacity-0 pointer-events-none overflow-auto transition-all duration-200 ease-in-out";

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    const isValid = /^[a-zA-Z\s]*$/.test(input); // Allow only letters and spaces
    if (isValid) {
      setPlayerName(input);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (playerName) {
      const sanitizedPlayerName = playerName.replace(/\s+/g, " ").trim(); // Remove extra spaces
      startGameWithName(sanitizedPlayerName);
    }
  };

  useEffect(() => {
    document.body.style.pointerEvents = isGameStarted ? "auto" : "none";
  }, [isGameStarted]);

  const labelText = isPlayingAgain ? "Are you still?" : "Enter your name: ";

  return (
    <div
      className={`floating-card welcome ${tailwindClasses}`}
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
      <form
        className="welcome-input"
        onSubmit={handleSubmit}
        style={{ gap: "1rem" }}
      >
        <label
          style={{ fontSize: "1.4rem", fontWeight: "bold" }}
          htmlFor="playerName"
        >
          {labelText}
        </label>
        <input
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            borderRadius: "0.5rem",
          }}
          onChange={handleNameChange}
          type="text"
          id="playerName"
          name="playerName"
          placeholder="Your name"
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default Welcome;
