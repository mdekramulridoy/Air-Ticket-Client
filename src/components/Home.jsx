import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Reveal } from "react-reveal";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [visas, setVisas] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [
    "https://i.ibb.co/7yJ27wx/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-2.jpg",
    "https://i.ibb.co/5cbYXBJ/Leonardo-Phoenix-A-sleek-commercial-airliner-soaring-through-a-1.jpg",
    "https://i.ibb.co/7RHyrcb/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-1.jpg",
  ];

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-4xl font-bold text-center mt-2 text-white">
        {text}
        <Cursor cursorColor="black" />
      </h2>

      <button
        onClick={toggleTheme}
        className="text-red-400 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
      >
        {isDarkMode ? "Light" : "Dark"} In Card
      </button>

      {/* Carousel */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          All Visas
        </h1>

        {/* Loading and Error Handling */}
        {loading && <div className="text-white text-xl">Loading...</div>}
        {error && <div className="text-white text-xl">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* New Contact Section */}
      <div className="bg-[#FF8604] py-16 w-full">
        <div className="container mx-auto text-center">
          <Reveal effect="fadeInUp" duration={1200}>
            <h2 className="text-3xl font-semibold mb-8 text-white">
              Get in Touch
            </h2>
          </Reveal>
          <p className="text-lg mb-8 text-white">
            Have questions or need assistance? Contact us today!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="contact-card p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">Email</h3>
              <p className="text-[#FF8604]">vut@petni.com</p>
            </div>
            <div className="contact-card p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">Phone</h3>
              <p className="text-[#FF8604]">+880 123456789</p>
            </div>
            <div className="contact-card p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">Address</h3>
              <p className="text-[#FF8604]">420 Vuter golli, Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 p-8 bg-white shadow-xl rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#FF8604]">
              Contact Form
            </h3>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full text-black p-3 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border text-black rounded-lg"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full text-black p-3 border rounded-lg"
                ></textarea>
              </div>
              <button className="bg-[#FF8604] text-white py-2 px-6 rounded-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
