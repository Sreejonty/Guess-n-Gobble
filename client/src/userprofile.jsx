import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [section, setSection] = useState("profile");
  const [mockUser, setMockUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load saved data
  useEffect(() => {
    const savedUser = localStorage.getItem("mockUser");
    const savedPrefs = localStorage.getItem("userPreferences");
    const savedOrders = localStorage.getItem("orderHistory");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setMockUser(user);
      setSettings({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mockUser");
    alert("Logged out (mock).");
    navigate("/");
  };

  const handleSettingChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    const updatedUser = { ...mockUser, ...settings };
    localStorage.setItem("mockUser", JSON.stringify(updatedUser));
    alert("✅ Settings saved!");
    setMockUser(updatedUser);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#ffb36b] to-[#ff914d] flex items-center justify-center">
      <div className="w-[90%] h-[85%] bg-white rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#ff9a4b] text-white flex flex-col items-center justify-center gap-5 py-8">
          <h2 className="text-2xl italic mb-4 font-semibold">Dashboard</h2>
          {["profile", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSection(tab)}
              className={`w-3/4 py-3 rounded-xl text-center font-semibold transition-all duration-300 ${
                section === tab
                  ? "bg-white text-[#ff7a00] shadow-lg scale-105"
                  : "bg-[#ffb36b] hover:bg-[#ffe0c2]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="mt-10 px-6 py-2 bg-[#ffb36b] rounded-xl hover:bg-[#ffd2a5] transition text-white font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 overflow-y-auto text-[#2b2b2b]">
          {/* Profile Section */}
          {section === "profile" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl italic font-semibold mb-6">
                Welcome, {mockUser?.username || "Guest"} 👋
              </h2>

              <div className="bg-[#fff6ee] p-6 rounded-2xl shadow-md mb-6">
                <h3 className="text-2xl mb-4 text-[#ff7a00] font-semibold">
                  Account Info
                </h3>
                <p><b>Email:</b> {mockUser?.email || "Not provided"}</p>
                <p><b>Phone:</b> {mockUser?.phone || "Not provided"}</p>
                <p><b>Address:</b> {mockUser?.address || "Not provided"}</p>
              </div>

              <div className="bg-[#fff6ee] p-6 rounded-2xl shadow-md">
                <h3 className="text-2xl mb-4 text-[#ff7a00] font-semibold">
                  Your Preferences
                </h3>
                {preferences ? (
                  <>
                    <p><b>Cuisine:</b> {preferences.cuisine}</p>
                    <p>
                      <b>Allergies:</b>{" "}
                      {preferences.allergies?.length
                        ? preferences.allergies.join(", ")
                        : "None"}
                    </p>
                    <p><b>Spice Level:</b> {preferences.spice}</p>
                  </>
                ) : (
                  <p className="italic">No preferences saved yet.</p>
                )}
              </div>

              <button
                onClick={() => navigate("/preferences")}
                className="mt-8 bg-[#ff9a4b] text-white py-3 px-10 rounded-full italic text-lg hover:bg-[#ff7a00] transition"
              >
                Edit Preferences →
              </button>
            </div>
          )}

          {/* Orders Section */}
          {section === "orders" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl italic font-semibold mb-6 text-[#ff7a00]">
                Your Orders
              </h2>
              {orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {orders.map((order, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#fff6ee] shadow-md hover:shadow-lg transition-all border border-[#ffdeb8]"
                    >
                      <h3 className="text-xl font-semibold text-[#ff7a00] mb-2">
                        Order #{idx + 1}
                      </h3>
                      <p><b>Status:</b> {order.status}</p>
                      <p><b>Payment:</b> {order.payment}</p>
                      <p><b>Date:</b> {order.date}</p>
                      <p><b>Address:</b> {order.address}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-500">No past orders yet.</p>
              )}
            </div>
          )}

          {/* Settings Section */}
          {section === "settings" && (
            <div className="animate-fadeIn">
              <h2 className="text-4xl italic font-semibold mb-6 text-[#ff7a00]">
                Settings
              </h2>
              <div className="flex flex-col gap-4 max-w-md">
                {["username", "email", "phone"].map((field) => (
                  <label key={field} className="flex flex-col text-sm font-semibold">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                    <input
                      value={settings[field]}
                      onChange={(e) => handleSettingChange(field, e.target.value)}
                      className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-[#ff7a00]"
                    />
                  </label>
                ))}
                <label className="flex flex-col text-sm font-semibold">
                  Address:
                  <textarea
                    value={settings.address}
                    onChange={(e) =>
                      handleSettingChange("address", e.target.value)
                    }
                    className="mt-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-[#ff7a00]"
                    rows={3}
                  />
                </label>

                <button
                  onClick={saveSettings}
                  className="mt-4 bg-[#ff9a4b] text-white py-3 px-8 rounded-full italic text-lg hover:bg-[#ff7a00] transition self-start"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
