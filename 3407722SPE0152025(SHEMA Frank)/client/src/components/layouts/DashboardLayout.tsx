
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { 
  Home, LogOut, Menu, X, Car, Settings, 
  ClipboardList, Users, PieChart, Clock, 
  FileText, ChevronRight, Calendar 
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  title: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  title, 
  to, 
  isActive,
  isCollapsed 
}) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3 my-1 rounded-md transition-all ${
        isActive 
          ? "bg-navy-800 text-white" 
          : "text-gray-300 hover:bg-navy-800/50"
      }`}
    >
      <Icon size={20} />
      {!isCollapsed && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="ml-3"
        >
          {title}
        </motion.span>
      )}
    </Link>
  );
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const adminMenuItems = [
    { icon: Home, title: "Dashboard", to: "/admin/dashboard" },
    { icon: Car, title: "Parking Management", to: "/admin/parking/list" },
    { icon: ClipboardList, title: "Register Parking", to: "/admin/parking/register" },
    { icon: FileText, title: "Incoming Reports", to: "/admin/reports/incoming" },
    { icon: FileText, title: "Outgoing Reports", to: "/admin/reports/outgoing" },
    { icon: Users, title: "Users", to: "/admin/users" },
    { icon: Clock, title: "Audit Logs", to: "/admin/logs" },
    { icon: Settings, title: "Profile", to: "/admin/profile" },
  ];

  const attendantMenuItems = [
    { icon: Home, title: "Dashboard", to: "/attendant/dashboard" },
    { icon: Car, title: "Car Entry", to: "/attendant/car-entry" },
    { icon: Clock, title: "Car Exit", to: "/attendant/car-exit" },
    { icon: Calendar, title: "Schedule", to: "/attendant/schedule" },
    { icon: Car, title: "View Parkings", to: "/attendant/parking" },
    { icon: Settings, title: "Profile", to: "/attendant/profile" },
  ];

  const menuItems = user?.role === "admin" ? adminMenuItems : attendantMenuItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className={`bg-primary h-full ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 ease-in-out`}
        initial={{ width: isCollapsed ? 80 : 256 }}
        animate={{ width: isCollapsed ? 80 : 256 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-navy-800">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white text-xl font-bold"
            >
              Smart Parking
            </motion.div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={24} /> : <X size={24} />}
          </button>
        </div>

        <div className="p-4">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              title={item.title}
              to={item.to}
              isActive={location.pathname === item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-300 hover:bg-navy-800/50 rounded-md transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between">
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu size={24} />
          </button>
          <div className="text-gray-800 font-medium">
            {user?.firstName} {user?.lastName} ({user?.role})
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
