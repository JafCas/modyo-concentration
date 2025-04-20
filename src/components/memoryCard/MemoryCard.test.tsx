import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MemoryCard from "./MemoryCard";

describe("MemoryCard - tailwindClassForBG", () => {
    const mockCard = {
        fields: { image: { url: "test-url", title: "test-title" } },
    };
    const mockHandleCardClick = jest.fn();

    const testCases = [
        { isSelected: true, isMatched: false, expectedClass: "bg-blue-300" },
        { isSelected: false, isMatched: true, expectedClass: "bg-green-300" },
        { isSelected: false, isMatched: false, expectedClass: "bg-gray-200" },
    ];

    testCases.forEach(({ isSelected, isMatched, expectedClass }) => {
        it(`should apply '${expectedClass}' when isSelected=${isSelected} and isMatched=${isMatched}`, () => {
            const { container } = render(
                <MemoryCard
                    card={mockCard}
                    index={0}
                    handleCardClick={mockHandleCardClick}
                    isSelected={isSelected}
                    isMatched={isMatched}
                />
            );
            expect(container.firstChild).toHaveClass(expectedClass);
        });
    });
});
