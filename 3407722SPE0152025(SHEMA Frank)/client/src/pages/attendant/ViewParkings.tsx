
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { Car, Search } from "lucide-react";

type ParkingArea = {
  id: string;
  code: string;
  name: string;
  location: string;
  totalSpaces: number;
  availableSpaces: number;
  occupiedPercentage: number;
  feePerHour: number;
  isAssigned?: boolean;
};

const ViewParkings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock parking areas
  const parkingAreas: ParkingArea[] = [
    { 
      id: "1", 
      code: "PKA", 
      name: "Parking A", 
      location: "Main Building, North Side", 
      totalSpaces: 50, 
      availableSpaces: 12, 
      occupiedPercentage: 76, 
      feePerHour: 2.5,
      isAssigned: true
    },
    { 
      id: "2", 
      code: "PKB", 
      name: "Parking B", 
      location: "West Wing", 
      totalSpaces: 30, 
      availableSpaces: 8, 
      occupiedPercentage: 73, 
      feePerHour: 3.0,
      isAssigned: true
    },
    { 
      id: "3", 
      code: "PKC", 
      name: "Parking C", 
      location: "South Building", 
      totalSpaces: 45, 
      availableSpaces: 28, 
      occupiedPercentage: 38, 
      feePerHour: 2.0,
      isAssigned: false
    },
    { 
      id: "4", 
      code: "PKD", 
      name: "Parking D", 
      location: "East Wing", 
      totalSpaces: 60, 
      availableSpaces: 5, 
      occupiedPercentage: 92, 
      feePerHour: 4.0,
      isAssigned: false
    }
  ];

  const filteredParkings = parkingAreas.filter(parking => 
    parking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    parking.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parking.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (occupiedPercentage: number): string => {
    if (occupiedPercentage >= 90) return "text-red-600";
    if (occupiedPercentage >= 70) return "text-amber-600";
    return "text-green-600";
  };

  const getStatusText = (occupiedPercentage: number): string => {
    if (occupiedPercentage >= 90) return "Full";
    if (occupiedPercentage >= 70) return "Busy";
    return "Available";
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
          <h1 className="text-3xl font-bold text-gray-800">Parking Areas</h1>
          <p className="text-gray-600">View and monitor all parking spaces</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Search parking areas by name, code or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Parking Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredParkings.map((parking) => (
            <motion.div
              key={parking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                parking.isAssigned ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-800">{parking.name}</h3>
                    {parking.isAssigned && (
                      <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        Assigned
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{parking.code} - {parking.location}</p>
                </div>
                <div className={`flex items-center ${getStatusColor(parking.occupiedPercentage)}`}>
                  <Car size={18} className="mr-1" />
                  <span className="font-medium">{getStatusText(parking.occupiedPercentage)}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Space Availability</span>
                  <span>
                    {parking.availableSpaces}/{parking.totalSpaces} spaces available
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      parking.occupiedPercentage >= 90 
                        ? "bg-red-500" 
                        : parking.occupiedPercentage >= 70 
                          ? "bg-amber-500" 
                          : "bg-green-500"
                    }`}
                    style={{ width: `${parking.occupiedPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Fee Rate</p>
                  <p className="font-medium">${parking.feePerHour.toFixed(2)} per hour</p>
                </div>
                <div>
                  <button 
                    className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors text-sm"
                    disabled={!parking.isAssigned}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredParkings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No parking areas found matching your search criteria.</p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ViewParkings;
