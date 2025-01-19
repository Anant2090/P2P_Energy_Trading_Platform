import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between pl-2 pr-2 bg-[#D9D9D9] h-[10vh]">
        <div className="Logo flex items-center">
          <img
            className="h-[12vh] w-[6vw]"
            src="https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/1187710/android-chrome-512x512.png "
            alt="Error"
          />
          <span className="mt-5 text-xl">Energy Trading Platform</span>
        </div>
        <div className="flex justify-between gap-[10vw] ">
          <div className="Nav-Components flex items-center gap-10 text-xl ">
            <Link to="/">Trade</Link>
            <Link to="/Tutorial">Search</Link>
            <Link to="/Search">Tutorial</Link>
            <Link to="/Tutorial">Contact</Link>
            <Link to="/Tutorial">About</Link>
          </div>
          <div className="Profile flex items-center gap-5 text-xl">
            <Link to="/Tutorial">Profile</Link>
            <CgProfile className="text-5xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
