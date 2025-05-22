
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCog, Users } from "lucide-react";

const RoleSelect: React.FC = () => {
  const navigate = useNavigate();
  
  const roleOptions = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage the entire parking system, users, and generate reports",
      icon: <UserCog size={48} />,
      color: "bg-blue-500",
      path: "/login?role=admin"
    },
    {
      id: "attendant",
      title: "Parking Attendant",
      description: "Handle car entry and exit, manage parking spaces",
      icon: <Users size={48} />,
      color: "bg-green-500",
      path: "/login?role=attendant"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Smart Parking</h2>
          <p className="mt-2 text-gray-600">Select your role to continue</p>
        </div>

        <div className="mt-8 space-y-4">
          {roleOptions.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="relative"
            >
              <Link 
                to={role.path}
                className="w-full flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className={`${role.color} text-white p-3 rounded-lg mr-4`}>
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{role.title}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-gray-600 hover:text-primary"
          >
            &larr; Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
