
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { DateRangePicker } from "../../components/date/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Download, Filter, Search, ArrowDownUp } from "lucide-react";

type IncomingCar = {
  id: string;
  plateNumber: string;
  entryTime: string;
  parkingName: string;
  parkingCode: string;
  attendantName: string;
  vehicleType: string;
};

const IncomingReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingFilter, setParkingFilter] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof IncomingCar>("entryTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sample incoming cars data
  const incomingCars: IncomingCar[] = [
    {
      id: "1",
      plateNumber: "ABC123",
      entryTime: "2023-05-20 08:30:15",
      parkingName: "Parking A",
      parkingCode: "PKA",
      attendantName: "John Doe",
      vehicleType: "Sedan"
    },
    {
      id: "2",
      plateNumber: "DEF456",
      entryTime: "2023-05-20 09:45:22",
      parkingName: "Parking B",
      parkingCode: "PKB",
      attendantName: "Jane Smith",
      vehicleType: "SUV"
    },
    {
      id: "3",
      plateNumber: "GHI789",
      entryTime: "2023-05-19 14:20:05",
      parkingName: "Parking A",
      parkingCode: "PKA",
      attendantName: "John Doe",
      vehicleType: "Truck"
    },
    {
      id: "4",
      plateNumber: "JKL012",
      entryTime: "2023-05-19 10:10:45",
      parkingName: "Parking C",
      parkingCode: "PKC",
      attendantName: "Robert Johnson",
      vehicleType: "Sedan"
    },
    {
      id: "5",
      plateNumber: "MNO345",
      entryTime: "2023-05-18 15:35:10",
      parkingName: "Parking B",
      parkingCode: "PKB",
      attendantName: "Jane Smith",
      vehicleType: "Motorcycle"
    }
  ];

  const parkingOptions = [
    { value: "PKA", label: "Parking A" },
    { value: "PKB", label: "Parking B" },
    { value: "PKC", label: "Parking C" }
  ];

  const toggleParkingFilter = (value: string) => {
    setParkingFilter(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSort = (column: keyof IncomingCar) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredCars = incomingCars
    .filter(car => {
      const matchesSearch = 
        car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.attendantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.parkingName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesParking = parkingFilter.length === 0 || parkingFilter.includes(car.parkingCode);
      
      return matchesSearch && matchesParking;
    })
    .sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      
      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleExportReport = () => {
    alert("Exporting report to CSV file...");
  };

  const renderSortIcon = (column: keyof IncomingCar) => {
    if (sortColumn === column) {
      return (
        <ArrowDownUp 
          size={16} 
          className={`ml-1 inline ${sortDirection === "asc" ? "transform rotate-180" : ""}`}
        />
      );
    }
    return null;
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
            <h1 className="text-3xl font-bold text-gray-800">Incoming Cars Report</h1>
            <p className="text-gray-600">View and export data on cars entering parking areas</p>
          </div>
          <button
            onClick={handleExportReport}
            className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export Report
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
                placeholder="Search by plate number, attendant..."
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
              Parking Locations
            </label>
            <div className="flex flex-wrap gap-2">
              {parkingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleParkingFilter(option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    parkingFilter.includes(option.value)
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("plateNumber")}
                  >
                    <div className="flex items-center">
                      Plate Number
                      {renderSortIcon("plateNumber")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("entryTime")}
                  >
                    <div className="flex items-center">
                      Entry Time
                      {renderSortIcon("entryTime")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("parkingName")}
                  >
                    <div className="flex items-center">
                      Parking Location
                      {renderSortIcon("parkingName")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("attendantName")}
                  >
                    <div className="flex items-center">
                      Attendant
                      {renderSortIcon("attendantName")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("vehicleType")}
                  >
                    <div className="flex items-center">
                      Vehicle Type
                      {renderSortIcon("vehicleType")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {car.plateNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.entryTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{car.parkingName}</div>
                      <div className="text-xs text-gray-500">{car.parkingCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.attendantName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.vehicleType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No incoming cars matching your criteria</p>
            </div>
          )}
          
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredCars.length}</span> results
              </div>
              <div className="flex-1 flex justify-center sm:justify-end">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Total Entries</h3>
            <p className="text-3xl font-bold text-primary">{filteredCars.length}</p>
            <p className="text-sm text-gray-500">in selected period</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Most Active Location</h3>
            <p className="text-3xl font-bold text-primary">Parking A</p>
            <p className="text-sm text-gray-500">with 18 entries</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Peak Entry Time</h3>
            <p className="text-3xl font-bold text-primary">9:00 - 10:00 AM</p>
            <p className="text-sm text-gray-500">with 12 entries</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default IncomingReport;
