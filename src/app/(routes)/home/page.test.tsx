"use client";

import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { useTransactionStore } from "@/store/useTransactionStore";
import { transactions as mockTransactions } from "@/data/transactions";
import "@testing-library/jest-dom";

// Mock the transaction store
jest.mock("@/store/useTransactionStore");
const mockedUseTransactionStore = useTransactionStore as jest.MockedFunction<
  typeof useTransactionStore
>;

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-image" />
  ),
}));

// Mock the TransactionTime component to avoid hydration issues
jest.mock("@/app/components/TransactionTime", () => ({
  __esModule: true,
  default: ({ timestamp }: { timestamp: Date }) => (
    <span data-testid="mock-time">{timestamp.toISOString()}</span>
  ),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockedUseTransactionStore as unknown as jest.Mock).mockReturnValue({
      transactions: mockTransactions,
    });
  });

  it("renders the transactions page title", () => {
    render(<HomePage />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("renders all transactions from the store", () => {
    render(<HomePage />);

    // Check if transactions are rendered
    mockTransactions.forEach((transaction) => {
      // Check transaction description
      expect(screen.getByText(transaction.description)).toBeInTheDocument();

      // Check transaction amount
      const formattedAmount = transaction.type === "sent" ? "-$" : "+$";
      const amountElements = screen.getAllByText((content) =>
        content.startsWith(formattedAmount)
      );

      // Convert amount to a number for comparison
      const amount = transaction.amount.toFixed(2);
      expect(
        amountElements.some((el) => {
          const text = el.textContent || "";
          // Remove commas and any whitespace
          const cleanedText = text.replace(/,|\s/g, "");
          return cleanedText.includes(amount);
        })
      ).toBe(true);

      // Check user name
      const userNameElements = screen.getAllByText(
        transaction.otherUser.displayName
      );
      expect(userNameElements.length).toBeGreaterThan(0);
    });
  });

  it("renders transaction profile pictures", () => {
    render(<HomePage />);
    const images = screen.getAllByTestId("mock-image");
    expect(images).toHaveLength(mockTransactions.length);

    images.forEach((img, index) => {
      expect(img).toHaveAttribute(
        "src",
        mockTransactions[index].otherUser.avatarUrl
      );
      expect(img).toHaveAttribute(
        "alt",
        mockTransactions[index].otherUser.displayName
      );
    });
  });

  it("renders correct transaction text based on type", () => {
    render(<HomePage />);

    mockTransactions.forEach((transaction) => {
      const userNameElements = screen.getAllByText(
        transaction.otherUser.displayName
      );

      // Find the element that's part of the transaction text
      const transactionElement = userNameElements.find((element) => {
        const parentP = element.closest("p");
        if (!parentP) return false;

        if (transaction.type === "sent") {
          return parentP.textContent?.includes("You paid");
        } else {
          return parentP.textContent?.includes("paid you");
        }
      });

      expect(transactionElement).toBeTruthy();
      const parentElement = transactionElement?.closest("p");

      if (transaction.type === "sent") {
        expect(parentElement?.textContent).toMatch(
          new RegExp(`You paid.*${transaction.otherUser.displayName}`)
        );
      } else {
        expect(parentElement?.textContent).toMatch(
          new RegExp(`${transaction.otherUser.displayName}.*paid you`)
        );
      }
    });
  });

  it("renders timestamps for all transactions", () => {
    render(<HomePage />);
    const timestamps = screen.getAllByTestId("mock-time");
    expect(timestamps).toHaveLength(mockTransactions.length);

    timestamps.forEach((timestamp, index) => {
      expect(timestamp).toHaveTextContent(
        mockTransactions[index].timestamp.toISOString()
      );
    });
  });
});
