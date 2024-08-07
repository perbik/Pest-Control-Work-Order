import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} onLogin={handleLogin} />
      ) : null}
      <div className="app">
        {!isAuthPage && (
          <NavBar
            setShowLogin={setShowLogin}
            user={user}
            onLogout={handleLogout}
          />
        )}
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
