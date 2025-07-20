import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddAccount() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/bank/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Bank account added successfully!");
      navigate("/dashboard"); // Assuming you have a dashboard route
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "An error occurred while adding the bank account."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Bank Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* IFSC Code */}
        <div>
          <label htmlFor="ifsc" className="block text-gray-700 font-medium mb-1">
            IFSC Code
          </label>
          <input
            type="text"
            id="ifsc"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="e.g., SBIN0000123"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Branch Name */}
        <div>
          <label htmlFor="branchName" className="block text-gray-700 font-medium mb-1">
            Branch Name
          </label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            placeholder="e.g., Connaught Place"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Bank Name */}
        <div>
          <label htmlFor="bankName" className="block text-gray-700 font-medium mb-1">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="e.g., State Bank of India"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Account Number */}
        <div>
          <label htmlFor="accountNumber" className="block text-gray-700 font-medium mb-1">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="e.g., 123456789012"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Account Holder’s Name */}
        <div>
          <label htmlFor="accountHolder" className="block text-gray-700 font-medium mb-1">
            Account Holder’s Name
          </label>
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="e.g., Rahul Sharma"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
