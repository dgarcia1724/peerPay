"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Friend, friends } from "@/data/friends";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/format";
import toast from "react-hot-toast";

function SendPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { withdraw, balance } = useBalanceStore();
  const { addTransaction } = useTransactionStore();

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleFriendSelect = (friendId: string) => {
    const friend = friends.find((f) => f.id === friendId);
    setSelectedFriend(friend || null);
  };

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
      toast.error("Please enter a valid amount");
      return;
    }

    // Check for insufficient funds
    if (numAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    try {
      // Add transaction and update balance
      addTransaction({
        type: "sent",
        amount: numAmount,
        timestamp: new Date(),
        description: description || "💸 Payment sent",
        otherUser: selectedFriend,
      });

      withdraw(numAmount);
      toast.success(
        `Sent $${formatCurrency(numAmount)} to ${selectedFriend.displayName}`
      );
      router.push("/home");
    } catch {
      toast.error("Failed to send payment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h1>

      {/* Available Balance */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <p className="text-sm text-gray-700 mb-1">Available Balance</p>
        <p className="text-2xl font-bold text-gray-900">
          ${formatCurrency(balance)}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Friend Selector */}
        {!selectedFriend ? (
          <select
            className="w-full p-3 border border-gray-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
            onChange={(e) => handleFriendSelect(e.target.value)}
            value=""
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
            className={`w-full p-3 border rounded-lg text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent ${
              amount && parseFloat(amount) > balance
                ? "border-red-500 bg-red-50"
                : "border-gray-400"
            }`}
            aria-label="Payment amount"
            required
          />
          {/* Error Message */}
          {amount && parseFloat(amount) > balance && (
            <p className="text-red-500 text-sm mt-1">
              Amount exceeds available balance
            </p>
          )}
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
              ? `Send ${formatCurrency(parseFloat(amount) || 0)} to ${
                  selectedFriend.displayName
                }`
              : "Send payment"
          }
        >
          Send ${formatCurrency(parseFloat(amount) || 0)}
        </button>
      </div>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendPageContent />
    </Suspense>
  );
}
