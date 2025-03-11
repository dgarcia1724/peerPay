import { create } from "zustand";
import { persist } from "zustand/middleware";
import { transactions as initialTransactions } from "@/data/transactions";
import type { Transaction } from "@/data/transactions";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.random().toString(36).substring(7),
            },
            ...state.transactions,
          ],
        })),
    }),
    {
      name: "transaction-store",
    }
  )
);

export { useTransactionStore };
