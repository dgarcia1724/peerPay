"use client";

import { useEffect } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useBalanceStore } from "@/store/useBalanceStore";

export function StoreHydration() {
  const { transactions } = useTransactionStore();
  const { balance } = useBalanceStore();

  useEffect(() => {
    // This effect ensures the stores are hydrated
    // The mere act of accessing the store values triggers hydration
  }, [transactions, balance]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydration />
      {children}
    </>
  );
}
