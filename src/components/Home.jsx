import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  const { user } = useContext(AuthContext);
  const images = [
    "https://i.ibb.co.com/7yJ27wx/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-2.jpg",
    "https://i.ibb.co.com/5cbYXBJ/Leonardo-Phoenix-A-sleek-commercial-airliner-soaring-through-a-1.jpg",
    "https://i.ibb.co.com/7RHyrcb/Leonardo-Phoenix-A-stunning-cover-photo-featuring-a-sleek-silv-1.jpg",
  ];

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
    <div className="flex flex-col items-center gap-4">
      
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
    </div>
  );
};

export default Home;
