"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { friends } from "@/data/friends";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useRouter } from "next/navigation";

export default function SendPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { withdraw } = useBalanceStore();
  const { addTransaction } = useTransactionStore();

  const [selectedFriend, setSelectedFriend] = useState<
    (typeof friends)[0] | null
  >(null);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Handle friend from URL
  useEffect(() => {
    const username = searchParams.get("to");
    if (username) {
      const friend = friends.find((f) => f.username === username);
      if (friend) setSelectedFriend(friend);
    }
  }, [searchParams]);

  const handleSend = () => {
    if (!selectedFriend || !amount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Add transaction and update balance
    addTransaction({
      type: "sent",
      amount: numAmount,
      timestamp: new Date(),
      description: description || "💸 Payment sent",
      otherUser: selectedFriend,
    });

    withdraw(numAmount);
    router.push("/home");
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h1>

      <div className="flex flex-col gap-6">
        {/* Friend Selector */}
        {!selectedFriend ? (
          <select
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
            onChange={(e) => {
              const friend = friends.find((f) => f.id === e.target.value);
              setSelectedFriend(friend || null);
            }}
            value={selectedFriend?.id || ""}
            aria-label="Select a friend"
          >
            <option value="">Select a friend</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.displayName}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={selectedFriend.avatarUrl}
                alt={selectedFriend.displayName}
                fill
                className="rounded-full object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-900">
                {selectedFriend.displayName}
              </p>
              <p className="text-sm text-gray-700">
                @{selectedFriend.username}
              </p>
            </div>
            <button
              onClick={() => setSelectedFriend(null)}
              className="text-gray-700 hover:text-gray-900 font-medium"
              aria-label={`Change selected friend (currently ${selectedFriend.displayName})`}
            >
              Change
            </button>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
            aria-label="Payment amount"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's it for? (optional)"
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
            aria-label="Payment description (optional)"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!selectedFriend || !amount}
          className="w-full bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#1A91DA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DA1F2]"
          aria-label={
            selectedFriend
              ? `Send ${amount || "0.00"} to ${selectedFriend.displayName}`
              : "Send payment"
          }
        >
          Send ${amount || "0.00"}
        </button>
      </div>
    </div>
  );
}
