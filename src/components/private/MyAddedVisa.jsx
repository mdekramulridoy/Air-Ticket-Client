import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Error Boundary to catch any unexpected errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children;
  }
}

const MyAddedVisa = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://air-ticket-server.vercel.app/visas")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVisas(data); // Set visas only if the response is an array
        } else {
          console.error("Expected an array, but received:", data);
          setVisas([]); // Set visas as an empty array in case of unexpected data
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visas:", error);
        setVisas([]); // If there's an error, set visas as an empty array
        setLoading(false);
      });
  }, []);

  const handleUpdate = (updatedVisa) => {
    fetch(`https://air-ticket-server.vercel.app/visas/${updatedVisa._id}`, {
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
        toast.success("Visa updated successfully!");  // Success toast for update
      })
      .catch((error) => {
        console.error("Error updating visa:", error);
        toast.error("Error updating visa!");  // Error toast if update fails
      });
  };

  const handleDelete = (visaId) => {
    fetch(`https://air-ticket-server.vercel.app/visas/${visaId}`, {
      method: "DELETE",
    })
      .then(() => {
        setVisas((prevVisas) => prevVisas.filter((visa) => visa._id !== visaId));
        toast.success("Visa deleted successfully!"); // Success toast for delete
      })
      .catch((error) => {
        console.error("Error deleting visa:", error);
        toast.error("Error deleting visa!"); // Error toast if delete fails
      });
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

  if (!Array.isArray(visas) || visas.length === 0) {
    return <div>No visas added yet.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Added Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-[#ff7300] hover:bg-[#FF8C2B] border text-white px-4 py-2 rounded"
                onClick={() => openModal(visa)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(visa._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedVisa && (
        <div className="fixed inset-0 bg-black text-bl bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg shadow-lg w-96">
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
                  className="w-full border p-2 text-black rounded"
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
                  className="w-full border p-2 text-black rounded"
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
                  className="w-full border text-black p-2 rounded"
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
                  className="w-full border text-black p-2 rounded"
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
                  className="w-full border text-black p-2 rounded"
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
                  className="w-full border text-black p-2 rounded"
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
                  className="bg-[#FF8C2B] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

// Wrap the MyAddedVisa component in the ErrorBoundary
const MyAddedVisaWithErrorBoundary = () => (
  <ErrorBoundary>
    <MyAddedVisa />
  </ErrorBoundary>
);

export default MyAddedVisaWithErrorBoundary;
