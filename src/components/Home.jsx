import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const { user } = useContext(AuthContext);
  const images = [
    "https://i.ibb.co/7yJ27wx/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-2.jpg",
    "https://i.ibb.co/5cbYXBJ/Leonardo-Phoenix-A-sleek-commercial-airliner-soaring-through-a-1.jpg",
    "https://i.ibb.co/7RHyrcb/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-1.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visas, setVisas] = useState([]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
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
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          All Visas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className="visa-card max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <img
                src={visa.countryImage}
                alt={visa.country}
                className="w-full h-48 object-cover"
              />
              <div className="px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  {visa.country}
                </h3>
                <p className="text-gray-600 mt-2">
                  Visa Type: {visa.visa_type}
                </p>
                <p className="text-gray-600 mt-1">
                  Processing Time: {visa.processing_time}
                </p>
                <p className="text-gray-600 mt-1">Fee: ${visa.fee}</p>
                <p className="text-gray-600 mt-1">Validity: {visa.validity}</p>
                <p className="text-gray-600 mt-1">
                  Application Method: {visa.application_method}
                </p>
              </div>
              <div className="px-6 py-4">
                <Link
                  to={`/visa-details/${visa._id}`}
                  className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors"
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
          className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors"
          to="/visas"
        >
          See all visas
        </Link>
      </div>

      <div className="w-full bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white py-12 px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="flex flex-col items-center gap-6 transition-transform transform hover:scale-105 duration-500 ease-in-out">
            <img
              src="https://i.ibb.co/3cFnx4r/user-icon-feature1.png"
              alt="Feature 1"
              className="w-24 h-24 rounded-full border-4 border-white p-4 shadow-xl"
            />
            <h3 className="text-2xl font-semibold">Global Visa Access</h3>
            <p className="text-center">
              We offer visa services for a wide range of countries, ensuring
              that your travel plans are covered.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 transition-transform transform hover:scale-105 duration-500 ease-in-out">
            <img
              src="https://i.ibb.co/Bz3hC1p/user-icon-feature2.png"
              alt="Feature 2"
              className="w-24 h-24 rounded-full border-4 border-white p-4 shadow-xl"
            />
            <h3 className="text-2xl font-semibold">Easy Application Process</h3>
            <p className="text-center">
              Applying for a visa is simple and fast with our intuitive
              platform, making your journey hassle-free.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 transition-transform transform hover:scale-105 duration-500 ease-in-out">
            <img
              src="https://i.ibb.co/ZMmqg7D/user-icon-feature3.png"
              alt="Feature 3"
              className="w-24 h-24 rounded-full border-4 border-white p-4 shadow-xl"
            />
            <h3 className="text-2xl font-semibold">24/7 Support</h3>
            <p className="text-center">
              Our dedicated support team is available around the clock to assist
              you with your visa inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Call to Action */}
      <div className="w-full bg-[#FF8604] text-white py-16 px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              'url("https://i.ibb.co/7yJ27wx/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-2.jpg")',
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Travel?</h2>
          <p className="text-lg mb-8">
            Join thousands of satisfied travelers who’ve trusted us for their
            visa needs. Get started today and embark on your adventure.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-[#e77603] transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
