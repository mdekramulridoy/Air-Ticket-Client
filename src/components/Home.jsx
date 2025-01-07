import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Reveal } from "react-reveal";

// Import Slider
import Slider from "./Slider"; // Slider component import করা হয়েছে।

const Home = () => {
  const { user } = useContext(AuthContext);

  const [visas, setVisas] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [text] = useTypewriter({
    words: ["Welcome to Free Visa"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    fetch("https://air-ticket-server.vercel.app/visas")
      .then((response) => response.json())
      .then((data) => {
        const uniqueVisas = [
          ...new Map(data.map((visa) => [visa.country, visa])).values(),
        ];
        setVisas(uniqueVisas);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visa data:", error);
        setError("Failed to load visa data.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Slider />

      <h2 className="text-4xl font-bold text-center mt-2 text-white">
        {text}
        <Cursor cursorColor="black" />
      </h2>

      <button
        onClick={toggleTheme}
        className="text-red-400 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
      >
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          All Visas
        </h1>

        {loading && <div className="text-white text-xl">Loading...</div>}
        {error && <div className="text-white text-xl">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visas.map((visa) => (
              <div
                key={visa._id}
                className="border visa-card max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
              >
                <img
                  src={visa.countryImage}
                  alt={visa.country}
                  className="w-full h-48 object-cover"
                />
                <div className="px-6 py-4">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                    {visa.country}
                  </h3>
                  <p className="text-gray-600 mt-2 dark:text-gray-300">
                    Visa Type: {visa.visa_type}
                  </p>
                  <p className="text-gray-600 mt-1 dark:text-gray-300">
                    Processing Time: {visa.processing_time}
                  </p>
                  <p className="text-gray-600 mt-1 dark:text-gray-300">
                    Fee: ${visa.fee}
                  </p>
                  <p className="text-gray-600 mt-1 dark:text-gray-300">
                    Validity: {visa.validity}
                  </p>
                  <p className="text-gray-600 mt-1 dark:text-gray-300">
                    Application Method: {visa.application_method}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <Link
                    to={`/visa-details/${visa._id}`}
                    className="bg-[#FF8604] text-white font-bold border py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Link
          className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full border hover:bg-yellow-600 transition-colors"
          to="/visas"
        >
          See all visas
        </Link>
      </div>


      {/* Add relevant section here  */}
        {/* Highlighted/Top-Rated Campaign */}
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Top-Rated Campaigns
        </h2>
        <div className="flex justify-center gap-6">
          {/* Example of Top Campaign */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Best Visa Deals 2025
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get the best visa deals for 2025. Apply now and get exclusive offers!
            </p>
            <Link
              to="about"
              className="text-[#FF8604] hover:underline"
            >
              Learn More
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Best Visa Deals 2026
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get the best visa deals for 2026. Apply now and get exclusive offers!
            </p>
            <Link
              to="about"
              className="text-[#FF8604] hover:underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Visa Categories
        </h2>
        <div className="flex justify-between gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Student Visa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore study visa options for top educational destinations.
            </p>
            <Link
              to="visas"
              className="text-[#FF8604] hover:underline"
            >
              Browse Student Visas
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Tourist Visa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Plan your dream vacation with the best tourist visa options.
            </p>
            <Link
              to="visas"
              className="text-[#FF8604] hover:underline"
            >
              Browse Tourist Visas
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Latest Blogs
        </h2>
        <div className="flex justify-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              How to Apply for a BD Visa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive guide to applying for a Bangladeshi visa and what to expect.
            </p>
            <Link
              to="visa-details/677cd5f8f2492fd5facb3cf1"
              className="text-[#FF8604] hover:underline"
            >
              Read Blog
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              How to Apply for a US Visa
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive guide to applying for a US visa and what to expect.
            </p>
            <Link
              to="visa-details/677cd5f8f2492fd5facb3ced"
              className="text-[#FF8604] hover:underline"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Promotions & Offers Section */}
      <div className="container mx-auto p-10 bg-yellow-100 rounded-lg flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Special Offers
        </h2>
        <p className="text-black dark:text-black mb-4">
          Don't miss out on our limited-time offers. Apply for visas and get amazing discounts!
        </p>
        <Link
          to="/visas"
          className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full border hover:bg-yellow-600 transition-colors"
        >
          Explore Offers
        </Link>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto p-4 bg-gray-800 text-white rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-center mb-4">
          Stay updated with the latest visa news, offers, and travel guides!
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-lg"
          />
          <button className="bg-[#FF8604] text-white p-2 rounded-r-lg">
            Subscribe
          </button>
        </div>
      </div>

      {/* End here extra section */}
    </div>
  );
};

export default Home;
