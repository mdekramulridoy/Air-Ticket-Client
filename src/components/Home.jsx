import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Reveal } from "react-awesome-reveal";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visas, setVisas] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    fetch("http://localhost:5000/visas")
      .then((response) => response.json())
      .then((data) => {
        const uniqueVisas = [
          ...new Map(data.map((visa) => [visa.country, visa])).values(),
        ];
        setVisas(uniqueVisas);
      })
      .catch((error) => console.error("Error fetching visa data:", error));
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
      <h2 className="text-4xl font-bold text-center mt-2 text-white">
        {text}
        <Cursor cursorColor="black" />
      </h2>

      <button
        onClick={toggleTheme}
        className="text-red-400 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
      >
        {isDarkMode ? "Light" : "Dark"} Theme
      </button>

      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-all duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover flex-shrink-0 aspect-[16/5]"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          All Visas
        </h1>
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
      </div>

      <div>
        <Link
          className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full border hover:bg-yellow-600 transition-colors"
          to="/visas"
        >
          See all visas
        </Link>
      </div>
      {/* New Features Section */}
      <div className="bg-white py-16 w-full">
        <div className="container mx-auto text-center text-white">
          <Reveal effect="fadeInUp" duration={1200}>
            <h2 className="text-3xl font-bold mb-8 text-[#FF8604]">
              Our Features
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="feature-card p-6 bg-[#FF8604] rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-4xl text-yellow-400 mb-4">🌍</div>
              <h3 className="text-2xl font-semibold mb-4">Global Coverage</h3>
              <p>
                We offer visa services for multiple countries across the globe,
                making it easy for you to travel anywhere.
              </p>
            </div>
            <div className="feature-card p-6 bg-[#FF8604] rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-4xl text-yellow-400 mb-4">📅</div>
              <h3 className="text-2xl font-semibold mb-4">Fast Processing</h3>
              <p>
                We ensure that your visa applications are processed in the
                quickest possible time, so you don’t have to wait.
              </p>
            </div>
            <div className="feature-card p-6 bg-[#FF8604] rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-4xl text-yellow-400 mb-4">💬</div>
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p>
                Our customer service team is available around the clock to
                assist you with any visa-related queries or issues.
              </p>
            </div>
          </div>
        </div>
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
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">
                Email
              </h3>
              <p className="text-[#FF8604]">vut@petni.com</p>
            </div>
            <div className="contact-card p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">
                Phone
              </h3>
              <p className="text-[#FF8604]">+880 123456789</p>
            </div>
            <div className="contact-card p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-[#FF8604]">
                Address
              </h3>
              <p className="text-[#FF8604]">
                420 Vuter golli, Dhaka, Bangladesh
              </p>
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
