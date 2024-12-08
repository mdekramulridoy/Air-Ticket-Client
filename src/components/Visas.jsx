import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Visas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [visaTypeFilter, setVisaTypeFilter] = useState(''); 

  useEffect(() => {
    fetch('http://localhost:5000/visas')
      .then((response) => response.json())
      .then((data) => {
        const uniqueVisas = [
          ...new Map(data.map((visa) => [visa.country, visa])).values(),
        ];
        setVisas(uniqueVisas);
        setFilteredVisas(uniqueVisas);
      })
      .catch((error) => console.error('Error fetching visa data:', error));
  }, []);

  const handleVisaTypeChange = (event) => {
    const selectedVisaType = event.target.value;
    setVisaTypeFilter(selectedVisaType);

    if (selectedVisaType === '') {
      
      setFilteredVisas(visas);
    } else {
      
      const filtered = visas.filter((visa) => visa.visa_type === selectedVisaType);
      setFilteredVisas(filtered);
    }
  };

  
  const uniqueVisaTypes = [
    ...new Set(visas.map((visa) => visa.visa_type)),
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#FF8604]">All Visas</h1>
      
     
      <div className="mb-6 flex justify-center">
        <select
          className="select select-bordered w-1/4"
          value={visaTypeFilter}
          onChange={handleVisaTypeChange}
        >
          <option value="">All Visa Types</option>
          {uniqueVisaTypes.map((visaType, index) => (
            <option key={index} value={visaType}>
              {visaType}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredVisas.map((visa) => (
          <div
            key={visa._id}
            className="visa-card max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={visa.countryImage}
              alt={visa.country}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">{visa.country}</h3>
              <p className="text-white mt-2 text-lg">Visa Type: {visa.visa_type || 'N/A'}</p>
              <p className="text-white mt-1">Processing Time: {visa.processing_time || 'N/A'}</p>
              <p className="text-white mt-1">Fee: ${visa.fee}</p>
              <p className="text-white mt-1">Validity: {visa.validity || 'N/A'}</p>
            </div>
            <div className="px-6 py-4 flex justify-center">
              <Link
                to={`/visa-details/${visa._id}`}
                className="bg-[#FF8604] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-yellow-600 transition-all ease-in-out"
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
