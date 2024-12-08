import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8604] via-[#FF7A00] to-[#FF9B4D] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className=" mx-auto py-4">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;
