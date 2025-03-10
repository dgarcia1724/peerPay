"use client";

import Image from "next/image";
import { friends } from "@/data/friends";
import Link from "next/link";

export default function FriendsPage() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Friends</h1>

      <div className="flex flex-col gap-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Profile Picture */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={friend.avatarUrl}
                alt={friend.displayName}
                fill
                className="rounded-full object-cover"
                sizes="48px"
              />
            </div>

            {/* Friend Details */}
            <div className="flex-grow">
              <p className="text-[15px] font-semibold text-gray-900">
                {friend.displayName}
              </p>
              <p className="text-sm text-gray-600">@{friend.username}</p>
            </div>

            {/* Pay Button */}
            <Link
              href={`/send?to=${friend.username}`}
              className="bg-[#1DA1F2] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1A91DA] transition-colors"
            >
              Pay
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
