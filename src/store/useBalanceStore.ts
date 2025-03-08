import { create } from "zustand";

interface BalanceStore {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 1234.56, // Initial balance
  deposit: (amount: number) =>
    set((state) => ({ balance: state.balance + amount })),
  withdraw: (amount: number) =>
    set((state) => ({ balance: state.balance - amount })),
}));
