import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePriceStore } from "./PriceStore";
const Navbar = () => {
  const { price, updatePrice } = usePriceStore();

  useEffect(() => {
    updatePrice();
    const interval = setInterval(updatePrice, 5000);
    return () => clearInterval(interval);
  }, [updatePrice]);

  console.log(price);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="animate-fadeIn">
      <div className="flex items-center justify-between pl-2 pr-2 bg-[#a7a4a481] h-[10vh] shadow-md">
        <div className="Logo flex items-center">
          <img
            className="h-[12vh] w-[6vw] transition-transform duration-300 hover:scale-110"
            src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1187710/android-chrome-512x512.png"
            alt="Error"
          />
          <span className="mt-5 text-xl font-semibold text-gray-800">
            Energy Trading Platform
          </span>
        </div>
        <div className="flex justify-between gap-[10vw]">
          <div className="Nav-Components flex items-center gap-10 text-xl text-gray-700">
            {[
              { name: "Home", path: "/" },
              { name: "Trade", path: "/Trade" },
              { name: "Search", path: "/Search" },
              { name: "Tutorial", path: "/Tutorial" },
              { name: "Contact", path: "/Contact" },
              { name: "About", path: "/About" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
                  }`
                }
                end={item.path === "/"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
         
          <div className="Profile flex items-center gap-5 text-xl text-gray-700">
            {isLoggedIn ? (
              <>
                <div className="bg-[#ab9d9d8a] text-black py-2 px-3 rounded-2xl">Current Price : {price}</div>
                <NavLink to="/Profile">Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
