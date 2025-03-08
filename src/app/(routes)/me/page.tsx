"use client";

import { useState } from "react";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

export default function MePage() {
  const { balance, deposit, withdraw } = useBalanceStore();
  const { username, avatarUrl } = useUserStore();
  const [amount, setAmount] = useState<string>("");

  const handleTransaction = (type: "deposit" | "withdraw") => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (type === "withdraw" && numAmount > balance) {
      alert("Insufficient funds");
      return;
    }

    if (type === "deposit") {
      deposit(numAmount);
    } else {
      withdraw(numAmount);
    }
    setAmount("");
  };

  return (
    <div className="p-4 flex flex-col items-center gap-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-24">
          <Image
            src={avatarUrl}
            alt="Profile picture"
            fill
            className="rounded-full object-cover"
            sizes="96px"
            priority
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{username}</h2>
      </div>

      {/* Balance Display */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Current Balance</p>
        <h1 className="text-4xl font-bold text-[#14171A]">
          ${balance.toFixed(2)}
        </h1>
      </div>

      {/* Amount Input */}
      <div className="w-full max-w-xs">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 border border-gray-400 rounded-full text-center mb-4 placeholder:text-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={() => handleTransaction("deposit")}
          className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#1A91DA] active:bg-[#1681BF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
        >
          <span className="text-xl">⬆️</span>
          Deposit
        </button>

        <button
          onClick={() => handleTransaction("withdraw")}
          className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#1A91DA] active:bg-[#1681BF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
        >
          <span className="text-xl">⬇️</span>
          Withdraw
        </button>
      </div>
    </div>
  );
}
