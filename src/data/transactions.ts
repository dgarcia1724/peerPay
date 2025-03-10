import { friends } from "./friends";

type TransactionType = "sent" | "received";

// Create a fixed reference date (e.g., January 1, 2024)
const BASE_DATE = new Date("2024-01-01T12:00:00Z").getTime();

export const transactions: {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: Date;
  description: string;
  otherUser: (typeof friends)[0];
}[] = [
  {
    id: "1",
    type: "received",
    amount: 1250.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 30), // 30 mins before base
    description: "💼 Freelance project",
    otherUser: friends[3], // James Kim
  },
  {
    id: "2",
    type: "sent",
    amount: 45.99,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 2), // 2 hours before base
    description: "🛒 Grocery shopping",
    otherUser: friends[2], // Sophia Nguyen
  },
  {
    id: "3",
    type: "sent",
    amount: 25.5,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 12), // 12 hours before base
    description: "🍣 Sushi dinner",
    otherUser: friends[0], // Emma Rodriguez
  },
  {
    id: "4",
    type: "received",
    amount: 95.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24), // 1 day before base
    description: "🎸 Concert tickets",
    otherUser: friends[1], // Michael Patel
  },
  {
    id: "5",
    type: "sent",
    amount: 32.5,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 2), // 2 days before base
    description: "🍕 Pizza night",
    otherUser: friends[4], // Ava Thompson
  },
  {
    id: "6",
    type: "received",
    amount: 750.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 3), // 3 days before base
    description: "🏠 Rent payment",
    otherUser: friends[0], // Emma Rodriguez
  },
  {
    id: "7",
    type: "sent",
    amount: 18.99,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 4), // 4 days before base
    description: "📚 Book purchase",
    otherUser: friends[1], // Michael Patel
  },
  {
    id: "8",
    type: "received",
    amount: 65.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 5), // 5 days before base
    description: "🎾 Tennis lesson",
    otherUser: friends[2], // Sophia Nguyen
  },
  {
    id: "9",
    type: "sent",
    amount: 42.75,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 6), // 6 days before base
    description: "🎬 Movie night",
    otherUser: friends[3], // James Kim
  },
  {
    id: "10",
    type: "received",
    amount: 1500.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 7), // 7 days before base
    description: "💻 Web development",
    otherUser: friends[4], // Ava Thompson
  },
];
