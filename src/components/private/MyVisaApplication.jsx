import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    if (user) {
      fetchApplications(user.email); 
    }
  }, [user]);

  const fetchApplications = async (userEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/applications?userEmail=${userEmail}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        console.error("Unexpected response format:", data);
        setApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    }
  };

  const handleCancelApplication = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:5000/applications/${applicationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setApplications(applications.filter(app => app._id !== applicationId));
      } else {
        console.error('Failed to cancel application');
      }
    } catch (error) {
      console.error('Error canceling application:', error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100"> {/* Center the container */}
      <div className="w-full max-w-7xl p-6">
        {Array.isArray(applications) && applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={application.countryImage || "https://via.placeholder.com/400"}
                  alt={`Visa for ${application.country}`}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800">{application.country} - {application.visaType}</h3>
                  <p className="text-gray-600">Fee: ${application.fee}</p>
                  <p className="text-gray-600">Processing Time: {application.processingTime} days</p>
                  <p className="text-gray-600">Validity: {application.validity}</p>
                  <p className="text-gray-600">Application Method: {application.applicationMethod}</p> 
                  <p className="text-gray-600">Applied Date: {new Date(application.appliedDate).toLocaleDateString()}</p> 
                  <p className="text-gray-600">Name: {application.applicantFirstName} {application.applicantLastName}</p> 
                  <p className="text-gray-600">Email: {application.applicantEmail}</p> 
                  <button
                    onClick={() => handleCancelApplication(application._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;
