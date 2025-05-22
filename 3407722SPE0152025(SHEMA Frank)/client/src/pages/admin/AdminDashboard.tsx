
import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import ParkingStatusChart from "../../components/dashboard/ParkingStatusChart";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ActivityLog from "../../components/dashboard/ActivityLog";
import { motion } from "framer-motion";
import { Car, DollarSign, CirclePlus, CircleMinus } from "lucide-react";

const AdminDashboard: React.FC = () => {
  // Mock data for charts
  const parkingStatusData = [
    { name: "Available", value: 78, color: "#10B981" },
    { name: "Occupied", value: 22, color: "#3B82F6" },
  ];

  const revenueData = [
    { name: "Mon", revenue: 1200 },
    { name: "Tue", revenue: 1900 },
    { name: "Wed", revenue: 1500 },
    { name: "Thu", revenue: 1700 },
    { name: "Fri", revenue: 2200 },
    { name: "Sat", revenue: 2500 },
    { name: "Sun", revenue: 1800 },
  ];

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
      action: "Payment Received",
      time: "Today, 09:15 AM",
      details: "$12.50 received for Car XYZ789",
    },
    {
      id: "4",
      action: "New Parking Added",
      time: "Yesterday, 03:20 PM",
      details: "Admin added Parking C with 45 spaces",
    },
    {
      id: "5",
      action: "Car Entered",
      time: "Yesterday, 02:10 PM",
      details: "Car DEF456 entered at Parking A",
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to Smart Parking Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Parking Spaces" 
            value="120" 
            icon={<Car size={24} />} 
            color="bg-primary"
          />
          <StatCard 
            title="Available Spaces" 
            value="78" 
            icon={<CirclePlus size={24} />} 
            color="bg-green-500"
          />
          <StatCard 
            title="Occupied Spaces" 
            value="42" 
            icon={<CircleMinus size={24} />} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Today's Revenue" 
            value="$1,250" 
            icon={<DollarSign size={24} />} 
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParkingStatusChart data={parkingStatusData} />
          <RevenueChart data={revenueData} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <ActivityLog activities={recentActivities} />
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
