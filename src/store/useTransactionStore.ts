import { create } from "zustand";
import { transactions } from "@/data/transactions";

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
  transactions,
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
