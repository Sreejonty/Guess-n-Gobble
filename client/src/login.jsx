import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("✅ Logged in successfully!");
    navigate("/user-profile");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#f36f21] to-[#ff9355] flex flex-col items-center justify-center text-white">
      {/* Title outside the card */}
      <h2 className="text-5xl font-semibold italic mb-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] animate-bounce">
        Log In
      </h2>

      {/* Cute Rounded Card */}
      <div className="bg-[#ffa673] rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] p-10 w-[400px] flex flex-col items-center border-4 border-[#ffb98c] hover:shadow-[0_12px_25px_rgba(0,0,0,0.4)] transition-all duration-300">
        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-full text-gray-800 border-2 border-[#ffd3b6] focus:outline-none focus:ring-2 focus:ring-[#f36f21] hover:shadow-md transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-full text-gray-800 border-2 border-[#ffd3b6] focus:outline-none focus:ring-2 focus:ring-[#f36f21] hover:shadow-md transition-all"
            required
          />
          <button className="bg-[#f36f21] py-3 rounded-full text-lg italic hover:bg-[#ff9355] border-2 border-[#ffb98c] shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
            Log In
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 underline italic text-black hover:text-white transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
