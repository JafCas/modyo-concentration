import { render } from "@testing-library/react";
import App from "./App";

describe("Renders App", () => {
  beforeAll(() => {
    global.alert = jest.fn(); // Mock alert
  });
  it("renders the app", () => {
    render(<App />);
  });
});
