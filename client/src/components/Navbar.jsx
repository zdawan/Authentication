import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center p-6 sm:p-8 sm:px-30 absolute top-0">
      <img src={assets.logo} alt="" className="w-30 sm:w-30" />
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-4 border border-gray-400 rounded full px-4 py-2 rounded-full text-gray-800 hover:bg-black hover:text-white  transition-all"
      >
        Login <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
