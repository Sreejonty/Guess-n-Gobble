import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CreateAccount from "./CreateAccount.jsx";
import Login from "./Login.jsx";
import UserProfile from "./UserProfile.jsx";
import Preferences from "./Preferences.jsx";
import Order from "./Order.jsx";
import OrderConfirmation from "./OrderConfirmation.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  </BrowserRouter>
);
