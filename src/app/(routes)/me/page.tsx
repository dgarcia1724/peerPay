export default function MePage() {
  return (
    <div className="p-4 flex flex-col items-center gap-8">
      {/* Balance Display */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">Current Balance</p>
        <h1 className="text-4xl font-bold text-[#14171A]">$1,234.56</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        <button className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2">
          <span className="text-xl">⬆️</span>
          Deposit
        </button>

        <button className="flex-1 bg-[#1DA1F2] text-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2">
          <span className="text-xl">⬇️</span>
          Withdraw
        </button>
      </div>
    </div>
  );
}
