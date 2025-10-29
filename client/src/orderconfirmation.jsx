import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/user-profile");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#ff9d55] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-6xl italic mb-6">Order Confirmed! 🎉</h1>

      <div className="bg-[#fff5eb] text-black px-10 py-8 rounded-2xl text-center w-full max-w-lg shadow-lg">
        <p className="text-2xl mb-4">Your mystery meal is on the way!</p>
        <p className="italic text-lg mb-6">
          Sit back, relax, and get ready for a delicious surprise...
        </p>

        {order && (
          <div className="text-left text-base bg-[#fffaf3] border border-gray-300 rounded-lg p-4 mb-6">
            <p>
              <b>Date:</b> {order.date}
            </p>
            <p>
              <b>Address:</b> {order.address}
            </p>
            <p>
              <b>Phone:</b> {order.phone}
            </p>
            <p>
              <b>Payment:</b> {order.payment}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>
          </div>
        )}

        {preferences && (
          <div className="text-left text-base bg-[#fffaf3] border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Meal Preferences</h3>
            <p>
              <b>Cuisine:</b> {preferences.cuisine}
            </p>
            <p>
              <b>Spice Level:</b> {preferences.spice}
            </p>
            <p>
              <b>Allergies:</b>{" "}
              {preferences.allergies?.length
                ? preferences.allergies.join(", ")
                : "None"}
            </p>
          </div>
        )}

        <p className="italic text-gray-700 text-sm mb-6">
          Redirecting you to your profile in a few seconds...
        </p>

        <Link
          to="/user-profile"
          className="bg-[#ffa573] text-white py-3 px-8 rounded-full italic hover:bg-[#ff9355] transition"
        >
          Back to Profile
        </Link>
      </div>
    </div>
  );
}
