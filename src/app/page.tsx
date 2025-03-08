export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top navigation bar */}
      <nav className="bg-[#1DA1F2] p-4 shadow-md">
        <h1 className="text-white text-xl font-bold font-sans">App Name</h1>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white">
          <h2 className="text-xl text-[#14171A] font-sans">Home</h2>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-8 py-4">
          {/* Home */}
          <button className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]">
            <div className="text-2xl mb-1">🏠</div>
            Home
          </button>

          {/* Profile - ME */}
          <button className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]">
            <div className="w-8 h-8 rounded-full bg-[#1DA1F2] mb-1"></div>
            ME
          </button>

          {/* Friends */}
          <button className="text-[#1DA1F2] font-semibold text-lg flex flex-col items-center min-w-[80px]">
            <div className="text-2xl mb-1">👥</div>
            Friends
          </button>
        </div>
      </nav>
    </div>
  );
}
