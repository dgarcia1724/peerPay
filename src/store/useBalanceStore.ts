import { create } from "zustand";
import { initialBalance } from "@/data/initialBalance";

interface BalanceStore {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: initialBalance,
  deposit: (amount: number) =>
    set((state) => ({ balance: state.balance + amount })),
  withdraw: (amount: number) =>
    set((state) => ({ balance: state.balance - amount })),
}));
