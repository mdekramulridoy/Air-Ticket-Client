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
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Visas</h1>
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
                <h3 className="text-xl font-semibold text-gray-700">{visa.country}</h3>
                <p className="text-gray-600 mt-2">Visa Type: {visa.visa_type}</p>
                <p className="text-gray-600 mt-1">Processing Time: {visa.processing_time}</p>
                <p className="text-gray-600 mt-1">Fee: ${visa.fee}</p>
                <p className="text-gray-600 mt-1">Validity: {visa.validity}</p>
                <p className="text-gray-600 mt-1">Application Method: {visa.application_method}</p>
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
        <Link className="bg-[#FF8604] text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors" to="/visas">See all visas</Link>
      </div>



    
      <div className="w-full bg-[#FF8604] text-white py-12 px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              alt="Feature 1"
              className="w-20 h-20 rounded-full bg-white p-2"
            />
            <h3 className="text-2xl font-semibold">Feature One</h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              alt="Feature 2"
              className="w-20 h-20 rounded-full bg-white p-2"
            />
            <h3 className="text-2xl font-semibold">Feature Two</h3>
            <p className="text-center">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              alt="Feature 3"
              className="w-20 h-20 rounded-full bg-white p-2"
            />
            <h3 className="text-2xl font-semibold">Feature Three</h3>
            <p className="text-center">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>


      <div className="w-full bg-white py-12 px-8">
        <h2 className="text-4xl font-bold text-center text-[#FF8604] mb-8">Join Us Today!</h2>
        <p className="text-center text-gray-700 mb-8">
          Discover a world of opportunities with our platform. Sign up now and start your journey with us.
        </p>
        <div className="flex justify-center">
          <button className="bg-[#FF8604] hover:bg-[#e77603] text-white py-3 px-6 rounded-lg text-lg font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
