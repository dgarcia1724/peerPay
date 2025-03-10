"use client";

import Image from "next/image";
import { useTransactionStore } from "@/store/useTransactionStore";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "@/utils/format";

export default function TransactionFeed() {
  const { transactions } = useTransactionStore();

  return (
    <div className="flex flex-col gap-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
        >
          {/* Profile Picture */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={transaction.otherUser.avatarUrl}
              alt={transaction.otherUser.displayName}
              fill
              className="rounded-full object-cover"
              sizes="48px"
            />
          </div>

          {/* Transaction Details */}
          <div className="flex-grow">
            <p className="text-[15px] text-gray-900">
              {transaction.type === "sent" ? (
                <>
                  You paid{" "}
                  <span className="font-semibold">
                    {transaction.otherUser.displayName}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold">
                    {transaction.otherUser.displayName}
                  </span>{" "}
                  paid you
                </>
              )}
            </p>
            <p className="text-sm text-gray-600">{transaction.description}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
            </p>
          </div>

          {/* Amount */}
          <div
            className={`text-right ${
              transaction.type === "sent" ? "text-red-500" : "text-green-500"
            }`}
          >
            <p className="font-semibold">
              {transaction.type === "sent" ? "-" : "+"}$
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
