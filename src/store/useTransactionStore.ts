import { create } from "zustand";

interface User {
  username: string;
  displayName: string;
  avatarUrl: string;
}

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  timestamp: Date;
  description: string;
  otherUser: User;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [
    {
      id: "1",
      type: "sent",
      amount: 25.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      description: "🍣 Sushi dinner",
      otherUser: {
        username: "john-doe-92",
        displayName: "John Doe",
        avatarUrl:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      },
    },
    {
      id: "2",
      type: "received",
      amount: 15.0,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
      description: "🎮 Game night",
      otherUser: {
        username: "alex-smith",
        displayName: "Alex Smith",
        avatarUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      },
    },
    {
      id: "3",
      type: "sent",
      amount: 12.75,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
      description: "🚕 Uber ride",
      otherUser: {
        username: "emma-brown",
        displayName: "Emma Brown",
        avatarUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      },
    },
  ],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          id: Math.random().toString(36).substr(2, 9),
        },
        ...state.transactions,
      ],
    })),
}));
