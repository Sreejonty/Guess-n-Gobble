import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!address.trim()) return alert("Please enter your delivery address.");
    if (!phone.trim()) return alert("Please enter your phone number.");
    if (!/^\d{7,15}$/.test(phone.trim()))
      return alert("Please enter a valid phone number (digits only).");
    if (!payment) return alert("Please choose a payment method.");

    const order = {
      address: address.trim(),
      phone: phone.trim(),
      payment,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    existingOrders.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(existingOrders));
    localStorage.setItem("latestOrder", JSON.stringify(order));

    alert("Processing payment (mock)...");
    navigate("/order-confirmation");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffb36b] to-[#ff914d] flex flex-col items-center justify-center py-16 text-white">
      <h1 className="text-5xl italic mb-8 font-semibold">Confirm Your Order 🧾</h1>

      <form
        onSubmit={handleConfirm}
        className="bg-[#fff6ee] text-black rounded-3xl shadow-2xl p-10 w-full max-w-lg transition hover:shadow-3xl"
      >
        <label className="block mb-4">
          <div className="mb-2 font-semibold">Delivery Address</div>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, Postal code..."
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#ff7a00]"
            rows={3}
          />
        </label>

        <label className="block mb-4">
          <div className="mb-2 font-semibold">Phone Number</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digits only"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#ff7a00]"
          />
        </label>

        <div className="mb-6">
          <div className="mb-2 font-semibold">Payment Method</div>
          <div className="flex flex-col gap-2">
            {["Card", "Online Payment", "Cash on Delivery"].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === method}
                  onChange={() => setPayment(method)}
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <button
            type="submit"
            className="bg-[#ff9a4b] text-white py-3 px-10 rounded-full italic text-lg hover:bg-[#ff7a00] transition shadow-md hover:shadow-lg"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}
