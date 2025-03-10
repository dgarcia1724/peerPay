import { users } from "./users";

type TransactionType = "sent" | "received";

export const transactions: {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: Date;
  description: string;
  otherUser: typeof users.others.johnDoe;
}[] = [
  {
    id: "1",
    type: "sent",
    amount: 25.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    description: "🍣 Sushi dinner",
    otherUser: users.others.johnDoe,
  },
  // ... rest of the transactions
];
