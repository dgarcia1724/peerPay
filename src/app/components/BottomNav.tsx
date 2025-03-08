import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-8 py-4">
        {/* Home */}
        <Link
          href="/home"
          className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]"
        >
          <div className="text-2xl mb-1">🏠</div>
          Home
        </Link>

        {/* Friends */}
        <Link
          href="/friends"
          className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]"
        >
          <div className="text-2xl mb-1">👥</div>
          Friends
        </Link>

        {/* Profile - ME */}
        <Link
          href="/me"
          className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]"
        >
          <div className="w-8 h-8 rounded-full bg-[#1DA1F2] mb-1"></div>
          ME
        </Link>
      </div>
    </nav>
  );
}
