
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";

// Types for our parking data
type Parking = {
  id: string;
  code: string;
  name: string;
  location: string;
  spaces: number;
  available: number;
  feePerHour: number;
};

const ParkingList: React.FC = () => {
  // Mock data for parkings
  const [parkings, setParkings] = useState<Parking[]>([
    {
      id: "1",
      code: "PKA",
      name: "Parking A",
      location: "Main Building",
      spaces: 50,
      available: 32,
      feePerHour: 2.5,
    },
    {
      id: "2",
      code: "PKB",
      name: "Parking B",
      location: "East Wing",
      spaces: 40,
      available: 28,
      feePerHour: 3.0,
    },
    {
      id: "3",
      code: "PKC",
      name: "Parking C",
      location: "West Wing",
      spaces: 30,
      available: 18,
      feePerHour: 2.0,
    },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this parking?")) {
      setParkings(parkings.filter(parking => parking.id !== id));
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Parking Management</h1>
            <p className="text-gray-600">Manage all parking areas</p>
          </div>
          <Link
            to="/admin/parking/register"
            className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add New Parking
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spaces
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee / Hour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parkings.map((parking) => (
                  <tr key={parking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{parking.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{parking.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{parking.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{parking.spaces}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        parking.available / parking.spaces > 0.3 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {parking.available}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${parking.feePerHour.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(parking.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ParkingList;
