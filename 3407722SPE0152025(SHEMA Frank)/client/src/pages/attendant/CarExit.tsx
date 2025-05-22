
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

type ParkedCar = {
  id: string;
  plateNumber: string;
  parkingName: string;
  parkingCode: string;
  entryTime: string;
  entryTimeObj: Date;
};

const CarExit: React.FC = () => {
  const [searchPlate, setSearchPlate] = useState("");
  const [selectedCar, setSelectedCar] = useState<ParkedCar | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for cars currently parked
  const parkedCars: ParkedCar[] = [
    {
      id: "1",
      plateNumber: "ABC123",
      parkingName: "Parking A",
      parkingCode: "PKA",
      entryTime: "Today, 08:30 AM",
      entryTimeObj: new Date(new Date().getTime() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
    {
      id: "2",
      plateNumber: "XYZ789",
      parkingName: "Parking B",
      parkingCode: "PKB",
      entryTime: "Today, 09:15 AM",
      entryTimeObj: new Date(new Date().getTime() - 2.5 * 60 * 60 * 1000) // 2.5 hours ago
    },
    {
      id: "3",
      plateNumber: "DEF456",
      parkingName: "Parking A",
      parkingCode: "PKA",
      entryTime: "Today, 10:45 AM",
      entryTimeObj: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
  ];

  const filteredCars = searchPlate
    ? parkedCars.filter(car => 
        car.plateNumber.toLowerCase().includes(searchPlate.toLowerCase()))
    : parkedCars;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch from an API based on the search term
  };

  const handleSelectCar = (car: ParkedCar) => {
    setSelectedCar(car);
  };

  const handleRegisterExit = async () => {
    if (!selectedCar) return;
    
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show receipt after successful submission
      setShowReceipt(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register car exit");
    } finally {
      setLoading(false);
    }
  };

  const handleNewExit = () => {
    setShowReceipt(false);
    setSelectedCar(null);
    setSearchPlate("");
  };

  // Calculate fee if a car is selected
  const exitTime = new Date();
  const durationInHours = selectedCar 
    ? ((exitTime.getTime() - selectedCar.entryTimeObj.getTime()) / (1000 * 60 * 60))
    : 0;
  const roundedDuration = Math.ceil(durationInHours * 10) / 10; // Round to 1 decimal place
  const feePerHour = 2.5; // Mock fee per hour
  const totalFee = (roundedDuration * feePerHour).toFixed(2);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Car Exit</h1>
          <p className="text-gray-600">Register a car leaving the parking</p>
        </div>

        {showReceipt ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Payment Receipt</h2>
              <p className="text-gray-500">Please give this receipt to the driver</p>
            </div>

            <div className="border-t border-b border-dashed border-gray-300 py-4 my-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Plate Number</p>
                  <p className="font-bold text-lg">{selectedCar?.plateNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Parking</p>
                  <p className="font-bold">{selectedCar?.parkingName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Entry Time</p>
                  <p className="font-medium">{selectedCar?.entryTime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Exit Time</p>
                  <p className="font-medium">{exitTime.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-dashed pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">Duration</p>
                  <p className="font-bold">{roundedDuration.toFixed(1)} hours</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Rate per Hour</p>
                  <p className="font-bold">${feePerHour.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <p className="font-bold">Total Amount</p>
                  <p className="font-bold text-primary">${totalFee}</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-4">
                Thank you for using our parking service!
              </p>
              <button
                onClick={handleNewExit}
                className="bg-primary hover:bg-navy-800 text-white px-6 py-2 rounded-md transition-colors"
              >
                Register Another Exit
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchPlate}
                  onChange={(e) => setSearchPlate(e.target.value)}
                  placeholder="Search by plate number..."
                  className="form-input flex-1"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Car List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Currently Parked Cars</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {filteredCars.length === 0 ? (
                <p className="text-gray-500">No cars found with that plate number.</p>
              ) : (
                <div className="space-y-4">
                  {filteredCars.map(car => (
                    <div
                      key={car.id}
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        selectedCar?.id === car.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectCar(car)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold text-lg">{car.plateNumber}</p>
                          <p className="text-gray-600">{car.parkingName} ({car.parkingCode})</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Entry Time</p>
                          <p>{car.entryTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedCar && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium">Exit Summary</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-gray-600">Duration:</p>
                    <p>{roundedDuration.toFixed(1)} hours</p>
                    <p className="text-gray-600">Fee:</p>
                    <p className="font-bold">${totalFee}</p>
                  </div>
                  <button
                    onClick={handleRegisterExit}
                    disabled={loading}
                    className="mt-4 w-full bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400"
                  >
                    {loading ? "Processing..." : "Register Exit & Print Receipt"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default CarExit;
