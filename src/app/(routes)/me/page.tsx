"use client";

import { useState } from "react";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export default function MePage() {
  const { balance, deposit, withdraw } = useBalanceStore();
  const { displayName, username, avatarUrl } = useUserStore();
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
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{displayName}</h2>
          <p className="text-sm text-gray-600">@{username}</p>
        </div>
      </div>

      {/* Balance Display */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Current Balance</p>
        <AnimatePresence mode="wait">
          <motion.h1
            key={balance}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl font-bold text-[#14171A]"
          >
            ${formatCurrency(balance)}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Friends Button */}
      <Link
        href="/friends"
        className="w-full max-w-xs bg-white text-[#1DA1F2] py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 border-2 border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors"
      >
        <span className="text-xl">👥</span>
        Friends
      </Link>

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
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTransaction("deposit")}
          className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#1A91DA] active:bg-[#1681BF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
        >
          <span className="text-xl">⬆️</span>
          Deposit
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTransaction("withdraw")}
          className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#1A91DA] active:bg-[#1681BF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
        >
          <span className="text-xl">⬇️</span>
          Withdraw
        </motion.button>
      </div>
    </div>
  );
}
