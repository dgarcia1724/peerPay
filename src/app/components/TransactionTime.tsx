"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function TransactionTime({ timestamp }: { timestamp: Date }) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    // Initial update
    setTimeAgo(formatDistanceToNow(timestamp, { addSuffix: true }));

    // Update every minute
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(timestamp, { addSuffix: true }));
    }, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  // Show nothing until client-side hydration is complete
  if (!timeAgo) return null;

  return <span>{timeAgo}</span>;
}
