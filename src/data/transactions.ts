import { friends } from "./friends";

type TransactionType = "sent" | "received";

// Set base date to current time
const BASE_DATE = new Date().getTime();

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
    timestamp: new Date(BASE_DATE - 1000 * 60 * 30), // 30 mins ago
    description: "💼 Freelance project",
    otherUser: friends[3], // James Kim
  },
  {
    id: "2",
    type: "sent",
    amount: 45.99,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 2), // 2 hours ago
    description: "🛒 Grocery shopping",
    otherUser: friends[2], // Sophia Nguyen
  },
  {
    id: "3",
    type: "sent",
    amount: 25.5,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 5), // 5 hours ago
    description: "🍣 Sushi dinner",
    otherUser: friends[0], // Emma Rodriguez
  },
  {
    id: "4",
    type: "received",
    amount: 95.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24), // 1 day ago
    description: "🎸 Concert tickets",
    otherUser: friends[1], // Michael Patel
  },
  {
    id: "5",
    type: "sent",
    amount: 32.5,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    description: "🍕 Pizza night",
    otherUser: friends[4], // Ava Thompson
  },
  {
    id: "6",
    type: "received",
    amount: 750.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    description: "🏠 Rent payment",
    otherUser: friends[0], // Emma Rodriguez
  },
  {
    id: "7",
    type: "sent",
    amount: 18.99,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    description: "📚 Book purchase",
    otherUser: friends[1], // Michael Patel
  },
  {
    id: "8",
    type: "received",
    amount: 65.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    description: "🎾 Tennis lesson",
    otherUser: friends[2], // Sophia Nguyen
  },
  {
    id: "9",
    type: "sent",
    amount: 42.75,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
    description: "🎬 Movie night",
    otherUser: friends[3], // James Kim
  },
  {
    id: "10",
    type: "received",
    amount: 1500.0,
    timestamp: new Date(BASE_DATE - 1000 * 60 * 60 * 24 * 60), // 2 months ago
    description: "💻 Web development",
    otherUser: friends[4], // Ava Thompson
  },
];
