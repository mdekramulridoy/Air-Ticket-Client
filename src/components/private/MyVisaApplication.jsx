import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchApplications(user.email); 
    } else {
      setApplications([]); // Clear applications if user is not logged in
      setLoading(false);
    }
  }, [user]);

  const fetchApplications = async (userEmail) => {
    setLoading(true);
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
    } finally {
      setLoading(false); 
    }
  };

  const handleCancelApplication = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:5000/applications/${applicationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setApplications(prevApplications => prevApplications.filter(app => app._id !== applicationId));
      } else {
        console.error('Failed to cancel application');
      }
    } catch (error) {
      console.error('Error canceling application:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500">Please log in to view your applications.</div>;
  }

  
  const [firstName, lastName] = user.displayName ? user.displayName.split(" ") : ["", ""];

  return (
    <div className="min-h-screen bg-gray-100 py-8"> 
      <div className="w-full max-w-7xl mx-auto p-6">
        {Array.isArray(applications) && applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={application.countryImage || "https://via.placeholder.com/400"}
                  alt={`Visa for ${application.country}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors">
                    {application.country} - {application.visaType}
                  </h3>
                  <p className="text-gray-600 mt-2">Fee: ${application.fee}</p>
                  <p className="text-gray-600">Processing Time: {application.processingTime} days</p>
                  <p className="text-gray-600">Validity: {application.validity}</p>
                  <p className="text-gray-600">Application Method: {application.applicationMethod}</p> 
                  <p className="text-gray-600">Applied Date: {new Date(application.appliedDate).toLocaleDateString()}</p> 
                  <p className="text-gray-600">Name: {firstName} {lastName}</p>
                  <p className="text-gray-600">Email: {application.applicantEmail}</p> 

                  <button
                    onClick={() => handleCancelApplication(application._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;
