import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialBalance } from "@/data/initialBalance";

interface BalanceStore {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set) => ({
      balance: initialBalance,
      deposit: (amount: number) =>
        set((state) => ({ balance: state.balance + amount })),
      withdraw: (amount: number) =>
        set((state) => ({ balance: state.balance - amount })),
    }),
    {
      name: "balance-storage",
    }
  )
);
