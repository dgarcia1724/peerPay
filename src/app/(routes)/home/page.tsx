"use client";

import TransactionFeed from "@/app/components/TransactionFeed";

export default function HomePage() {
  return (
    <main className="container mx-auto max-w-lg px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h1>
      <TransactionFeed />
    </main>
  );
}
