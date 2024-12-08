import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 

const AddVisa = () => {
  const [formData, setFormData] = useState({
    countryImage: "",
    country: "",
    visaType: "Tourist visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "online",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedDocuments = checked
          ? [...prev.requiredDocuments, value]
          : prev.requiredDocuments.filter((doc) => doc !== value);
        return { ...prev, requiredDocuments: updatedDocuments };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const {
      processingTime,
      ageRestriction,
      fee,
      requiredDocuments,
      visaType,
      description,
      country,
      countryImage,
      validity,
      applicationMethod,
    } = formData;
  
    const documents = requiredDocuments.length > 0 ? requiredDocuments : [];
    const age = ageRestriction ? parseInt(ageRestriction) : 0;
    const visaFee = fee ? parseFloat(fee) : 0;
  
    const dataToSubmit = {
      countryImage: countryImage || "", 
      country: country || "", 
      visaType: visaType || "Tourist visa", 
      processingTime: processingTime || 0, 
      requiredDocuments: documents, 
      description: description || "", 
      ageRestriction: age, 
      fee: visaFee,
      validity: validity || "", 
      applicationMethod: applicationMethod || "online", 
    };
  
    console.log("Data being submitted:", dataToSubmit); 
  
    fetch("https://air-ticket-server.vercel.app//visas/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => response.json())
      .then((data) => {

        toast.success("Visa added successfully!");
      })
      .catch((error) => {
        console.error("Error adding visa:", error);

        toast.error("There was an error adding the visa.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Visa</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="countryImage" className="block text-lg font-medium">
            Country Image URL
          </label>
          <input
            type="text"
            id="countryImage"
            name="countryImage"
            value={formData.countryImage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-lg font-medium">
            Country Name
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="visaType" className="block text-lg font-medium">
            Visa Type
          </label>
          <select
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Tourist visa">Tourist visa</option>
            <option value="Student visa">Student visa</option>
            <option value="Official visa">Official visa</option>
          </select>
        </div>

        <div>
          <label htmlFor="processingTime" className="block text-lg font-medium">
            Processing Time (Select Date)
          </label>
          <input
            type="date"
            id="processingTime"
            name="processingTime"
            value={formData.processingTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Required Documents</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Valid passport"
                onChange={handleChange}
                checked={formData.requiredDocuments.includes("Valid passport")}
              />
              <span className="ml-2">Valid passport</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Visa application form"
                onChange={handleChange}
                checked={formData.requiredDocuments.includes("Visa application form")}
              />
              <span className="ml-2">Visa application form</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Recent passport-sized photograph"
                onChange={handleChange}
                checked={formData.requiredDocuments.includes("Recent passport-sized photograph")}
              />
              <span className="ml-2">Recent passport-sized photograph</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="ageRestriction" className="block text-lg font-medium">
            Age Restriction
          </label>
          <input
            type="number"
            id="ageRestriction"
            name="ageRestriction"
            value={formData.ageRestriction}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="fee" className="block text-lg font-medium">
            Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="validity" className="block text-lg font-medium">
            Validity
          </label>
          <input
            type="date"
            id="validity"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Application Method</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="applicationMethod"
                value="online"
                onChange={handleChange}
                checked={formData.applicationMethod === "online"}
              />
              <span className="ml-2">Online</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="applicationMethod"
                value="embassy"
                onChange={handleChange}
                checked={formData.applicationMethod === "embassy"}
              />
              <span className="ml-2">Embassy</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold p-3 rounded-md mt-4 hover:bg-[#ff7300] focus:outline-none focus:ring-2 focus:ring-blue-500 border"
        >
          Add Visa
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddVisa;
