import React, { useEffect, useState } from "react";
import "./Welcome.css";
import texts from "../../assets/texts";

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
    <div className={`floating-card welcome ${tailwindClasses}`}>
      <div className="welcome-header">
        <h1>{texts.WELCOME_MESSAGE}</h1>
        <p>{texts.INSTRUCTION_MESSAGE}</p>
      </div>
      <form className="welcome-input gap-10" onSubmit={handleSubmit}>
        <div className="align-bottom">
          <label htmlFor="playerName">{labelText}</label>
          <input
            onChange={handleNameChange}
            type="text"
            id="playerName"
            name="playerName"
            placeholder={texts.NAME_PLACEHOLDER}
            required
          />
        </div>
        <button type="submit">{texts.START_GAME}</button>
      </form>
    </div>
  );
};

export default Welcome;
