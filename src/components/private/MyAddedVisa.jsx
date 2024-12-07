import React, { useEffect, useState } from "react";

const MyAddedVisa = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState(null); 
  const [showModal, setShowModal] = useState(false); 


  useEffect(() => {
    fetch("http://localhost:5000/visas") 
      .then((response) => response.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visas:", error);
        setLoading(false);
      });
  }, []);


  const handleUpdate = (updatedVisa) => {
    fetch(`http://localhost:5000/visas/${updatedVisa._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVisa),
    })
      .then((response) => response.json())
      .then(() => {
        setVisas((prevVisas) =>
          prevVisas.map((visa) =>
            visa._id === updatedVisa._id ? updatedVisa : visa
          )
        );
        setShowModal(false); 
      })
      .catch((error) => console.error("Error updating visa:", error));
  };


  const handleDelete = (visaId) => {
    fetch(`http://localhost:5000/visas/${visaId}`, {
      method: "DELETE",
    })
      .then(() => {
        setVisas((prevVisas) => prevVisas.filter((visa) => visa._id !== visaId));
      })
      .catch((error) => console.error("Error deleting visa:", error));
  };

  const openModal = (visa) => {
    setSelectedVisa(visa);
    setShowModal(true);
  };


  const closeModal = () => {
    setSelectedVisa(null);
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (visas.length === 0) {
    return <div>No visas added yet.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Added Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <div
            key={visa._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={visa.countryImage}
              alt={visa.country}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-4">{visa.country}</h2>
            <p>Type: {visa.visa_type}</p>
            <p>Fee: ${visa.fee}</p>
            <p>Processing Time: {visa.processing_time} days</p>
            <p>Validity: {visa.validity}</p>
            <p>Application Method: {visa.application_method}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => openModal(visa)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(visa._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

 
      {showModal && selectedVisa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Visa</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedVisa);
              }}
            >
              <label className="block mb-2">
                Country:
                <input
                  type="text"
                  value={selectedVisa.country}
                  onChange={(e) =>
                    setSelectedVisa({ ...selectedVisa, country: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Visa Type:
                <input
                  type="text"
                  value={selectedVisa.visa_type}
                  onChange={(e) =>
                    setSelectedVisa({
                      ...selectedVisa,
                      visa_type: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Fee:
                <input
                  type="number"
                  value={selectedVisa.fee}
                  onChange={(e) =>
                    setSelectedVisa({ ...selectedVisa, fee: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Processing Time:
                <input
                  type="number"
                  value={selectedVisa.processing_time}
                  onChange={(e) =>
                    setSelectedVisa({
                      ...selectedVisa,
                      processing_time: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Validity:
                <input
                  type="text"
                  value={selectedVisa.validity}
                  onChange={(e) =>
                    setSelectedVisa({
                      ...selectedVisa,
                      validity: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Application Method:
                <input
                  type="text"
                  value={selectedVisa.application_method}
                  onChange={(e) =>
                    setSelectedVisa({
                      ...selectedVisa,
                      application_method: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </label>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedVisa;
