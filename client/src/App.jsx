import { Link } from "react-router-dom";

export default function App() {
  const title = "Guess n' Gobble";

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-br from-[#ff7a00] to-[#ff4800] flex flex-col items-center justify-center overflow-hidden text-white">
      {/* === Small floating icons === */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-10 left-10 text-7xl opacity-40">🍔</span>
        <span className="absolute top-10 right-12 text-7xl opacity-40">🌮</span>
        <span className="absolute bottom-12 left-16 text-7xl opacity-40">🍣</span>
        <span className="absolute bottom-10 right-20 text-7xl opacity-40">🍜</span>
      </div>

      {/* === Main container === */}
      <div className="relative z-10 bg-[#fff5eb] text-black rounded-3xl shadow-2xl p-12 w-[90%] max-w-3xl border border-[#ffdeb8] text-center">
        {/* Animated Title */}
        <h1 className="text-6xl italic font-bold mb-4 text-[#ff7a00] drop-shadow-lg flex justify-center flex-wrap">
          {title.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-single-wave"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="text-lg text-gray-700 italic mb-10">
          Where every bite’s a surprise ✨
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            to="/create-account"
            className="w-60 text-center bg-[#ff7a00] text-white py-3 px-8 rounded-full italic text-lg font-semibold hover:bg-[#ff5400] transition shadow-md hover:shadow-lg"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="w-60 text-center bg-[#ff7a00] text-white py-3 px-8 rounded-full italic text-lg font-semibold hover:bg-[#ff5400] transition shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        </div>
      </div>

      {/* CSS for single wave */}
      <style>
        {`
          @keyframes singleWave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }

          .animate-single-wave {
            display: inline-block;
            animation: singleWave 0.6s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
