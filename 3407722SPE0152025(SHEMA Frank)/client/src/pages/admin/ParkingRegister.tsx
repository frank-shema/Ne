
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";

const ParkingRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    location: "",
    spaces: "",
    feePerHour: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.code || !formData.name || !formData.location || !formData.spaces || !formData.feePerHour) {
        throw new Error("All fields are required");
      }

      // Check if spaces and fee are valid numbers
      const spaces = parseInt(formData.spaces);
      const feePerHour = parseFloat(formData.feePerHour);

      if (isNaN(spaces) || spaces <= 0) {
        throw new Error("Spaces must be a positive number");
      }

      if (isNaN(feePerHour) || feePerHour <= 0) {
        throw new Error("Fee per hour must be a positive number");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success - in a real app this would be an API call
      console.log("Parking registered:", {
        ...formData,
        spaces: spaces,
        feePerHour: feePerHour,
      });

      // Redirect to parking list
      navigate("/admin/parking/list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register parking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Register Parking</h1>
          <p className="text-gray-600">Add a new parking area to the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. PKA"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Main Building Parking"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. North Wing, Floor 1"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="spaces" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Spaces
                </label>
                <input
                  type="number"
                  id="spaces"
                  name="spaces"
                  value={formData.spaces}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  placeholder="e.g. 50"
                  required
                />
              </div>

              <div>
                <label htmlFor="feePerHour" className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Per Hour ($)
                </label>
                <input
                  type="number"
                  id="feePerHour"
                  name="feePerHour"
                  value={formData.feePerHour}
                  onChange={handleChange}
                  className="form-input"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 2.50"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-navy-800 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400"
              >
                {loading ? "Registering..." : "Register Parking"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/parking/list")}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ParkingRegister;
