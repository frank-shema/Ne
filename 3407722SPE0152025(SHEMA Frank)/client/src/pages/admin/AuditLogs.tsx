
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { DateRangePicker } from "../../components/date/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Download, Filter, Search } from "lucide-react";

type LogType = "info" | "warning" | "error" | "success";

type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress: string;
  type: LogType;
};

const AuditLogs: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogTypes, setSelectedLogTypes] = useState<LogType[]>([]);

  // Sample audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: "1",
      timestamp: "2023-05-19 08:30:22",
      user: "Admin User",
      userRole: "admin",
      action: "User Login",
      details: "Successfully logged in",
      ipAddress: "192.168.1.1",
      type: "info"
    },
    {
      id: "2",
      timestamp: "2023-05-19 09:15:45",
      user: "Admin User",
      userRole: "admin",
      action: "Create Parking",
      details: "Created new parking area 'Parking C'",
      ipAddress: "192.168.1.1",
      type: "success"
    },
    {
      id: "3",
      timestamp: "2023-05-19 10:22:18",
      user: "Attendant User",
      userRole: "attendant",
      action: "Car Entry",
      details: "Registered car ABC123 entry at Parking A",
      ipAddress: "192.168.1.2",
      type: "info"
    },
    {
      id: "4",
      timestamp: "2023-05-19 11:05:30",
      user: "System",
      userRole: "system",
      action: "Payment Failed",
      details: "Payment failed for car XYZ789, invalid card details",
      ipAddress: "192.168.1.3",
      type: "error"
    },
    {
      id: "5",
      timestamp: "2023-05-19 12:15:10",
      user: "Attendant User",
      userRole: "attendant",
      action: "Car Exit",
      details: "Registered car DEF456 exit from Parking B",
      ipAddress: "192.168.1.2",
      type: "info"
    },
    {
      id: "6",
      timestamp: "2023-05-19 14:30:05",
      user: "Admin User",
      userRole: "admin",
      action: "Update Settings",
      details: "Updated system settings",
      ipAddress: "192.168.1.1",
      type: "warning"
    },
    {
      id: "7",
      timestamp: "2023-05-20 09:10:15",
      user: "Admin User",
      userRole: "admin",
      action: "Delete User",
      details: "Deleted user 'John Doe'",
      ipAddress: "192.168.1.1",
      type: "warning"
    }
  ];

  const logTypeOptions: { value: LogType; label: string; color: string }[] = [
    { value: "info", label: "Info", color: "bg-blue-100 text-blue-700" },
    { value: "success", label: "Success", color: "bg-green-100 text-green-700" },
    { value: "warning", label: "Warning", color: "bg-amber-100 text-amber-700" },
    { value: "error", label: "Error", color: "bg-red-100 text-red-700" }
  ];

  const toggleLogType = (type: LogType) => {
    setSelectedLogTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedLogTypes.length === 0 || selectedLogTypes.includes(log.type);
    
    return matchesSearch && matchesType;
  });

  const getLogTypeClass = (type: LogType): string => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const handleExportLogs = () => {
    alert("Exporting logs to CSV file...");
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
            <h1 className="text-3xl font-bold text-gray-800">Audit Logs</h1>
            <p className="text-gray-600">Track system activities and changes</p>
          </div>
          <button
            onClick={handleExportLogs}
            className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export Logs
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                id="search"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <DateRangePicker 
              date={dateRange} 
              onDateChange={setDateRange} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Filter size={16} className="mr-1" />
              Log Types
            </label>
            <div className="flex flex-wrap gap-2">
              {logTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleLogType(option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    selectedLogTypes.includes(option.value)
                      ? option.color
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.user}</div>
                      <div className="text-xs text-gray-500">{log.userRole}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLogTypeClass(log.type)}`}>
                        {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No logs matching your criteria</p>
            </div>
          )}
          
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredLogs.length}</span> results
              </div>
              <div className="flex-1 flex justify-center sm:justify-end">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AuditLogs;
