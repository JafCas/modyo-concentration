import "@testing-library/jest-dom"; // Import jest-dom matchers
import { render, fireEvent } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome Component", () => {
  const mockStartGameWithName = jest.fn();
  const mockSetDifficulty = jest.fn();

  beforeAll(() => {
    global.alert = jest.fn(); // Mock alert
  });

  it("renders the Welcome component", () => {
    const { getByText } = render(
      <Welcome
        isGameStarted={false}
        isGameOver={false}
        isPlayingAgain={false}
        startGameWithName={mockStartGameWithName}
        setDifficulty={mockSetDifficulty}
      />
    );
    expect(getByText("Enter your name:")).toBeInTheDocument();
  });
});
