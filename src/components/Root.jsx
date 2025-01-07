import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#bfbfbf] via-[#a4a3a3] to-[#bfbfbf] text-white">
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
