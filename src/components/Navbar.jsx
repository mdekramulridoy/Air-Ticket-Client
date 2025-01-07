import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="px-2 py-1">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/visas" className="px-2 py-1">
          All Visas
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="px-2 py-1">
          About Us
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/login" className="px-2 py-1">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="px-2 py-1">
              SignUp
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <li className="flex flex-row gap-2">
          <NavLink to="/add-visa" className="px-2 py-1">
            Add Visa
          </NavLink>
          <NavLink to="/my-added-visas" className="px-2 py-1">
            My Added Visas
          </NavLink>
          <NavLink to="/my-visa-applications" className="px-2 py-1">
            My Visa Applications
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 bg-[#08a9e9e7] px-4 lg:px-16 py-2 z-50 shadow-md">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content bg-primary rounded-box z-[1] mt-3 p-2 shadow flex flex-col gap-2 text-white"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="lg:w-12 md:w-10 w-8"
              src="https://i.ibb.co.com/y0drfXS/logo-new.png"
              alt="visa logo"
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex lg:flex">
          <ul className="menu gap-2 menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative group">
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />

              <div className="absolute right-0 hidden group-hover:flex flex-col bg-white border border-gray-300 shadow-lg p-2 rounded-lg w-40 z-50">
                <span className="font-bold text-primary">
                  {user.displayName || "User"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-[#e77603]"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
