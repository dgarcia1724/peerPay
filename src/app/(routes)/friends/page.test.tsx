"use client";

import { render, screen } from "@testing-library/react";
import FriendsPage from "./page";
import { friends } from "@/data/friends";
import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-image" />
  ),
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  ),
}));

describe("FriendsPage", () => {
  it("renders the friends page title", () => {
    render(<FriendsPage />);
    expect(screen.getByText("Friends")).toBeInTheDocument();
  });

  it("renders all friends from the friends data", () => {
    render(<FriendsPage />);

    // Check if all friends are rendered
    friends.forEach((friend) => {
      expect(screen.getByText(friend.displayName)).toBeInTheDocument();
      expect(screen.getByText(`@${friend.username}`)).toBeInTheDocument();
    });
  });

  it("renders friend profile pictures", () => {
    render(<FriendsPage />);
    const images = screen.getAllByTestId("mock-image");
    expect(images).toHaveLength(friends.length);

    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", friends[index].avatarUrl);
      expect(img).toHaveAttribute("alt", friends[index].displayName);
    });
  });

  it("renders pay buttons with correct links", () => {
    render(<FriendsPage />);
    const payButtons = screen.getAllByText("Pay");
    expect(payButtons).toHaveLength(friends.length);

    const links = screen.getAllByTestId("mock-link");
    links.forEach((link, index) => {
      expect(link).toHaveAttribute(
        "href",
        `/send?to=${friends[index].username}`
      );
    });
  });
});
