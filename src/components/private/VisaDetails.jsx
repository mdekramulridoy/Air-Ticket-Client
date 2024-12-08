import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

const VisaDetails = () => {
  const { id } = useParams(); 
  const [visa, setVisa] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    fetch(`http://localhost:5000/visas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch visa details');
        }
        return response.json();
      })
      .then((data) => setVisa(data))
      .catch((error) => {
        console.error('Error fetching visa details:', error);
        setError('Error loading visa details');
      });
  }, [id]);

  const handleApply = () => {
    if (!user) {
      toast.error("Please log in to apply.");  
      return;
    }

    const applicationData = {
      visaId: visa._id,
      userEmail: user.email, 
      applicantFirstName: user.firstName, // Ensure this is passed correctly
      applicantLastName: user.lastName, // Ensure this is passed correctly
      country: visa.country,
      visaType: visa.visa_type,
      fee: visa.fee,
      status: "Applied",  
    };

    fetch('http://localhost:5000/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success("Application submitted successfully!");  
        } else {
          toast.error("Failed to submit application.");  
        }
      })
      .catch(error => {
        console.error("Error applying for visa:", error);
        toast.error("Error applying for visa.");  
      });
};


  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!visa) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Visa Details for {visa.country}</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-64">
          <img
            src={visa.countryImage}
            alt={visa.country}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{visa.country} Visa</h2>
            <p className="text-gray-600 mt-2">{visa.visa_type} Visa</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Processing Time:</span>
              <span className="text-gray-600">{visa.processing_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Fee:</span>
              <span className="text-gray-600">${visa.fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Validity:</span>
              <span className="text-gray-600">{visa.validity}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Application Method:</span>
              <span className="text-gray-600">{visa.application_method}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 bg-[#FF8604] text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
              onClick={handleApply}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VisaDetails;
