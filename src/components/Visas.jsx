import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Visas = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/visas')
      .then((response) => response.json())
      .then((data) => {
        const uniqueVisas = [
          ...new Map(data.map((visa) => [visa.country, visa])).values(),
        ];
        setVisas(uniqueVisas);
      })
      .catch((error) => console.error('Error fetching visa data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Visas</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <p className="text-gray-600 mt-2">Visa Type: {visa.visa_type || 'N/A'}</p>
              <p className="text-gray-600 mt-1">Processing Time: {visa.processing_time || 'N/A'}</p>
              <p className="text-gray-600 mt-1">Fee: ${visa.fee}</p>
              <p className="text-gray-600 mt-1">Validity: {visa.validity || 'N/A'}</p>
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
  );
};

export default Visas;
