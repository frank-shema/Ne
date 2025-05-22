
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";

type ParkingOption = {
  id: string;
  code: string;
  name: string;
  availableSpaces: number;
};

const CarEntry: React.FC = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [parkingId, setParkingId] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock parking options
  const parkingOptions: ParkingOption[] = [
    { id: "1", code: "PKA", name: "Parking A", availableSpaces: 32 },
    { id: "2", code: "PKB", name: "Parking B", availableSpaces: 28 },
    { id: "3", code: "PKC", name: "Parking C", availableSpaces: 18 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!plateNumber) {
        throw new Error("Plate number is required");
      }
      if (!parkingId) {
        throw new Error("Please select a parking location");
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show ticket after successful submission
      setShowTicket(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register car entry");
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntry = () => {
    setShowTicket(false);
    setPlateNumber("");
    setParkingId("");
  };

  const selectedParking = parkingOptions.find(p => p.id === parkingId);
  const entryTime = new Date();
  const formattedEntryTime = entryTime.toLocaleString();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Car Entry</h1>
          <p className="text-gray-600">Register a new car entering the parking</p>
        </div>

        {showTicket ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Entry Ticket</h2>
              <p className="text-gray-500">Please give this ticket to the driver</p>
            </div>

            <div className="border-t border-b border-dashed border-gray-300 py-4 my-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Plate Number</p>
                  <p className="font-bold text-lg">{plateNumber.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Parking Location</p>
                  <p className="font-bold">{selectedParking?.name} ({selectedParking?.code})</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-500">Entry Time</p>
                <p className="font-bold">{formattedEntryTime}</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-4">
                Please keep this ticket safe. You will need it when exiting.
              </p>
              <button
                onClick={handleNewEntry}
                className="bg-primary hover:bg-navy-800 text-white px-6 py-2 rounded-md transition-colors"
              >
                Register Another Entry
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label htmlFor="plateNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate Number
                </label>
                <input
                  type="text"
                  id="plateNumber"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  className="form-input"
                  placeholder="e.g. ABC123"
                  required
                />
              </div>

              <div>
                <label htmlFor="parkingId" className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Location
                </label>
                <select
                  id="parkingId"
                  value={parkingId}
                  onChange={(e) => setParkingId(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select Parking Location</option>
                  {parkingOptions.map((option) => (
                    <option key={option.id} value={option.id} disabled={option.availableSpaces === 0}>
                      {option.name} ({option.code}) - {option.availableSpaces} spaces available
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="entryTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Entry Time
                </label>
                <input
                  type="text"
                  id="entryTime"
                  value={formattedEntryTime}
                  className="form-input bg-gray-100"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Current time is set automatically</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-navy-800 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400"
              >
                {loading ? "Registering..." : "Register Entry"}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default CarEntry;
