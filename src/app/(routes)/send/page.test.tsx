"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import SendPage from "./page";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { friends } from "@/data/friends";
import toast from "react-hot-toast";
import "@testing-library/jest-dom";

// Mock the stores and navigation
jest.mock("@/store/useBalanceStore");
jest.mock("@/store/useTransactionStore");
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));
jest.mock("react-hot-toast");

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-image" />
  ),
}));

const mockRouter = {
  push: jest.fn(),
};

const mockSearchParams = new URLSearchParams();
const mockWithdraw = jest.fn();
const mockAddTransaction = jest.fn();

const mockedUseBalanceStore = useBalanceStore as jest.MockedFunction<
  typeof useBalanceStore
>;
const mockedUseTransactionStore = useTransactionStore as jest.MockedFunction<
  typeof useTransactionStore
>;

describe("SendPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete("to");
    (mockedUseBalanceStore as unknown as jest.Mock).mockReturnValue({
      balance: 1000,
      withdraw: mockWithdraw,
    });
    (mockedUseTransactionStore as unknown as jest.Mock).mockReturnValue({
      addTransaction: mockAddTransaction,
    });
  });

  it("renders the send money title", () => {
    render(<SendPage />);
    expect(screen.getByText("Send Money")).toBeInTheDocument();
  });

  it("displays current balance", () => {
    render(<SendPage />);
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("renders friend selection dropdown when no friend is selected", () => {
    render(<SendPage />);
    const select = screen.getByRole("combobox", { name: "Select a friend" });
    expect(select).toBeInTheDocument();

    // Check if all friends are in the dropdown
    friends.forEach((friend) => {
      expect(screen.getByText(friend.displayName)).toBeInTheDocument();
    });
  });

  it("pre-selects friend from URL parameter", () => {
    mockSearchParams.set("to", friends[0].username);
    render(<SendPage />);

    expect(screen.getByText(friends[0].displayName)).toBeInTheDocument();
    expect(screen.getByText(`@${friends[0].username}`)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Change selected friend (currently ${friends[0].displayName})`,
      })
    ).toBeInTheDocument();
  });

  it("handles friend selection from dropdown", () => {
    render(<SendPage />);

    const select = screen.getByRole("combobox", { name: "Select a friend" });
    fireEvent.change(select, { target: { value: friends[0].id } });

    expect(screen.getByText(friends[0].displayName)).toBeInTheDocument();
    expect(screen.getByText(`@${friends[0].username}`)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Change selected friend (currently ${friends[0].displayName})`,
      })
    ).toBeInTheDocument();
  });

  it("validates insufficient funds", () => {
    render(<SendPage />);

    // Select a friend
    const select = screen.getByRole("combobox", { name: "Select a friend" });
    fireEvent.change(select, { target: { value: friends[0].id } });

    // Enter amount larger than balance
    const input = screen.getByRole("spinbutton", { name: "Payment amount" });
    fireEvent.change(input, { target: { value: "2000" } });

    // Try to send
    const sendButton = screen.getByRole("button", {
      name: `Send 2,000.00 to ${friends[0].displayName}`,
    });
    fireEvent.click(sendButton);

    expect(toast.error).toHaveBeenCalledWith("Insufficient funds");
    expect(mockWithdraw).not.toHaveBeenCalled();
    expect(mockAddTransaction).not.toHaveBeenCalled();
  });

  it("validates invalid amount", () => {
    render(<SendPage />);

    // Select a friend
    const select = screen.getByRole("combobox", { name: "Select a friend" });
    fireEvent.change(select, { target: { value: friends[0].id } });

    // Enter negative amount
    const input = screen.getByRole("spinbutton", { name: "Payment amount" });
    fireEvent.change(input, { target: { value: "-100" } });

    // Try to send
    const sendButton = screen.getByRole("button", {
      name: `Send -100.00 to ${friends[0].displayName}`,
    });
    fireEvent.click(sendButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockWithdraw).not.toHaveBeenCalled();
    expect(mockAddTransaction).not.toHaveBeenCalled();
  });

  it("successfully sends payment", () => {
    render(<SendPage />);

    // Select a friend
    const select = screen.getByRole("combobox", { name: "Select a friend" });
    fireEvent.change(select, { target: { value: friends[0].id } });

    // Enter valid amount
    const input = screen.getByRole("spinbutton", { name: "Payment amount" });
    fireEvent.change(input, { target: { value: "500" } });

    // Add description
    const description = screen.getByRole("textbox", {
      name: "Payment description (optional)",
    });
    fireEvent.change(description, { target: { value: "Test payment" } });

    // Send payment
    const sendButton = screen.getByRole("button", {
      name: `Send 500.00 to ${friends[0].displayName}`,
    });
    fireEvent.click(sendButton);

    expect(mockWithdraw).toHaveBeenCalledWith(500);
    expect(mockAddTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "sent",
        amount: 500,
        description: "Test payment",
        otherUser: friends[0],
      })
    );
    expect(toast.success).toHaveBeenCalledWith(
      `Sent $500.00 to ${friends[0].displayName}`
    );
    expect(mockRouter.push).toHaveBeenCalledWith("/home");
  });

  it("handles payment errors", () => {
    mockWithdraw.mockImplementationOnce(() => {
      throw new Error("Transaction failed");
    });

    render(<SendPage />);

    // Select a friend
    const select = screen.getByRole("combobox", { name: "Select a friend" });
    fireEvent.change(select, { target: { value: friends[0].id } });

    // Enter amount
    const input = screen.getByRole("spinbutton", { name: "Payment amount" });
    fireEvent.change(input, { target: { value: "500" } });

    // Try to send
    const sendButton = screen.getByRole("button", {
      name: `Send 500.00 to ${friends[0].displayName}`,
    });
    fireEvent.click(sendButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to send payment. Please try again."
    );
  });
});
