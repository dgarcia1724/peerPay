import { create } from "zustand";
import { persist } from "zustand/middleware";
import { transactions as initialTransactions } from "@/data/transactions";

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

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
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
    }),
    {
      name: "transactions-storage",
    }
  )
);
