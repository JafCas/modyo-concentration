import React from "react";

type WelcomeProps = {
  startGameWithName: (name: string) => void;
};

const Welcome = ({ startGameWithName }: WelcomeProps) => {
  const [playerName, setPlayerName] = React.useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleStartGame = () => {
    if (playerName) {
      startGameWithName(playerName);
    }
  };

  return (
    // TODO: Hide this component when the game starts
    <div className="welcome" style={{}}>
      <h1>Welcome to the Memory Game!</h1>
      <p>Test your memory and have fun!</p>
      <div>
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
