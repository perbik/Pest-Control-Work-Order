import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";

const App = () => {
  const [showLogin, setShowLogin] = useState(true); // Initially show the login page
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false); // Hide login after successful login
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
    </div>
  );
};

export default App;
