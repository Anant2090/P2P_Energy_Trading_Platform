import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between pl-2 pr-2 bg-[#faf9fac2] h-[10vh] shadow-md">
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
            <NavLink
              to="/Profile"
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
                }`
              }
            >
              Profile
            </NavLink>
            <CgProfile className="text-5xl text-gray-600 transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
