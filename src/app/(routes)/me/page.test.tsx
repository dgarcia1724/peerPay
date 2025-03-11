import { render, screen, fireEvent } from "@testing-library/react";
import MePage from "./page";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";
import "@testing-library/jest-dom";
import { ImageProps } from "next/image";

// Mock the stores
jest.mock("@/store/useBalanceStore");
jest.mock("@/store/useUserStore");
jest.mock("react-hot-toast");
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: ImageProps) => {
    // Only pass through the props that img element accepts
    return <img src={src as string} alt={alt} data-testid="mock-image" />;
  },
}));

const mockedUseBalanceStore = useBalanceStore as jest.MockedFunction<
  typeof useBalanceStore
>;
const mockedUseUserStore = useUserStore as jest.MockedFunction<
  typeof useUserStore
>;

describe("MePage", () => {
  const mockDeposit = jest.fn();
  const mockWithdraw = jest.fn();

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock store values
    mockedUseBalanceStore.mockReturnValue({
      balance: 1000,
      deposit: mockDeposit,
      withdraw: mockWithdraw,
    });

    mockedUseUserStore.mockReturnValue({
      displayName: "Test User",
      username: "testuser",
      avatarUrl: "/test-avatar.jpg",
    });
  });

  it("renders user profile information correctly", () => {
    render(<MePage />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByAltText("Profile picture")).toHaveAttribute(
      "src",
      "/test-avatar.jpg"
    );
  });

  it("displays current balance correctly", () => {
    render(<MePage />);

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("handles deposit successfully", async () => {
    render(<MePage />);

    const input = screen.getByPlaceholderText(
      "Enter amount"
    ) as HTMLInputElement;
    const depositButton = screen.getByText("Deposit");

    fireEvent.change(input, { target: { value: "500" } });
    fireEvent.click(depositButton);

    expect(mockDeposit).toHaveBeenCalledWith(500);
    expect(toast.success).toHaveBeenCalledWith("Deposited $500.00");
    expect(input.value).toBe("");
  });

  it("handles withdraw successfully", async () => {
    render(<MePage />);

    const input = screen.getByPlaceholderText(
      "Enter amount"
    ) as HTMLInputElement;
    const withdrawButton = screen.getByText("Withdraw");

    fireEvent.change(input, { target: { value: "500" } });
    fireEvent.click(withdrawButton);

    expect(mockWithdraw).toHaveBeenCalledWith(500);
    expect(toast.success).toHaveBeenCalledWith("Withdrew $500.00");
    expect(input.value).toBe("");
  });

  it("shows error for invalid amount", () => {
    render(<MePage />);

    const input = screen.getByPlaceholderText("Enter amount");
    const depositButton = screen.getByText("Deposit");

    fireEvent.change(input, { target: { value: "-100" } });
    fireEvent.click(depositButton);

    expect(toast.error).toHaveBeenCalledWith("Please enter a valid amount");
    expect(mockDeposit).not.toHaveBeenCalled();
  });

  it("shows error for insufficient funds on withdraw", () => {
    render(<MePage />);

    const input = screen.getByPlaceholderText("Enter amount");
    const withdrawButton = screen.getByText("Withdraw");

    fireEvent.change(input, { target: { value: "2000" } });
    fireEvent.click(withdrawButton);

    expect(toast.error).toHaveBeenCalledWith("Insufficient funds");
    expect(mockWithdraw).not.toHaveBeenCalled();
  });

  it("handles transaction errors", () => {
    mockDeposit.mockImplementationOnce(() => {
      throw new Error("Transaction failed");
    });

    render(<MePage />);

    const input = screen.getByPlaceholderText("Enter amount");
    const depositButton = screen.getByText("Deposit");

    fireEvent.change(input, { target: { value: "500" } });
    fireEvent.click(depositButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to deposit. Please try again."
    );
  });
});
