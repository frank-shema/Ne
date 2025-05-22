import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import ActivityLog from "../../components/dashboard/ActivityLog";
import { motion } from "framer-motion";
import { 
  Car, LogIn, LogOut, Clock, ArrowRight, 
  Ticket, Receipt
} from "lucide-react";

const AttendantDashboard: React.FC = () => {
  const recentActivities = [
    {
      id: "1",
      action: "Car Entered",
      time: "Today, 10:30 AM",
      details: "Car ABC123 entered at Parking A",
    },
    {
      id: "2",
      action: "Car Exited",
      time: "Today, 09:45 AM",
      details: "Car XYZ789 exited from Parking B",
    },
    {
      id: "3",
      action: "Car Entered",
      time: "Today, 09:15 AM",
      details: "Car DEF456 entered at Parking A",
    },
    {
      id: "4",
      action: "Car Exited",
      time: "Today, 08:20 AM",
      details: "Car JKL012 exited from Parking A",
    },
  ];

  // Parking occupancy data
  const parkingData = [
    { name: "Parking A", total: 50, occupied: 32, available: 18 },
    { name: "Parking B", total: 40, occupied: 15, available: 25 },
    { name: "Parking C", total: 30, occupied: 28, available: 2 },
  ];

  // Sample IDs for demo purposes
  const sampleTicketId = "12345";
  const sampleBillId = "67890";

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendant Dashboard</h1>
          <p className="text-gray-600">Manage parking entries and exits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Cars Today" 
            value="47" 
            icon={<Car size={24} />} 
            color="bg-primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Cars Entered" 
            value="28" 
            icon={<LogIn size={24} />} 
            color="bg-green-500"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Cars Exited" 
            value="19" 
            icon={<LogOut size={24} />} 
            color="bg-red-500"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Average Stay" 
            value="2.5 hrs" 
            icon={<Clock size={24} />} 
            color="bg-blue-500"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Parking Status Section */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Parking Status</h3>
                <span className="text-sm text-gray-500">Updated just now</span>
              </div>
              
              <div className="space-y-6">
                {parkingData.map((parking) => (
                  <div key={parking.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{parking.name}</span>
                      <span className="text-sm text-gray-500">
                        {parking.occupied} / {parking.total} spaces occupied
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          parking.available <= 5 
                            ? "bg-red-500" 
                            : parking.available <= 15 
                              ? "bg-yellow-500" 
                              : "bg-green-500"
                        }`}
                        style={{ 
                          width: `${(parking.occupied / parking.total) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{parking.available} spaces available</span>
                      <span>{Math.round((parking.occupied / parking.total) * 100)}% occupied</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <Link to="/attendant/car-entry" className="block">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-4 bg-primary text-white rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <LogIn className="mr-3" size={24} />
                      <div>
                        <h4 className="font-semibold">Register Car Entry</h4>
                        <p className="text-sm opacity-80">Record new cars entering the parking</p>
                      </div>
                    </div>
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
                
                <Link to="/attendant/car-exit" className="block">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between p-4 border border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-3" size={24} />
                      <div>
                        <h4 className="font-semibold">Register Car Exit</h4>
                        <p className="text-sm text-gray-600">Process payments and car exits</p>
                      </div>
                    </div>
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>

                {/* Sample Ticket and Bill Links */}
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm text-gray-500 mb-3">Quick Access (Demo)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={`/attendant/ticket/${sampleTicketId}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Ticket size={20} />
                        <span className="mt-2 text-xs text-center">Sample Ticket</span>
                      </motion.div>
                    </Link>
                    
                    <Link to={`/attendant/bill/${sampleBillId}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <Receipt size={20} />
                        <span className="mt-2 text-xs text-center">Sample Bill</span>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-primary hover:underline text-sm flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <ActivityLog activities={recentActivities} />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AttendantDashboard;
