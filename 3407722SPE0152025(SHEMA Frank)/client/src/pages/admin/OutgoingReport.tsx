
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { DateRangePicker } from "../../components/date/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Download, Filter, Search, ArrowDownUp } from "lucide-react";

type OutgoingCar = {
  id: string;
  plateNumber: string;
  entryTime: string;
  exitTime: string;
  duration: string;
  parkingName: string;
  parkingCode: string;
  attendantName: string;
  amount: number;
  paymentMethod: string;
};

const OutgoingReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingFilter, setParkingFilter] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof OutgoingCar>("exitTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sample outgoing cars data
  const outgoingCars: OutgoingCar[] = [
    {
      id: "1",
      plateNumber: "XYZ789",
      entryTime: "2023-05-20 08:30:15",
      exitTime: "2023-05-20 11:45:22",
      duration: "3h 15m",
      parkingName: "Parking A",
      parkingCode: "PKA",
      attendantName: "John Doe",
      amount: 8.13,
      paymentMethod: "Credit Card"
    },
    {
      id: "2",
      plateNumber: "PQR456",
      entryTime: "2023-05-20 07:15:30",
      exitTime: "2023-05-20 10:20:45",
      duration: "3h 5m",
      parkingName: "Parking B",
      parkingCode: "PKB",
      attendantName: "Jane Smith",
      amount: 7.75,
      paymentMethod: "Cash"
    },
    {
      id: "3",
      plateNumber: "MNO123",
      entryTime: "2023-05-19 14:20:05",
      exitTime: "2023-05-19 18:35:18",
      duration: "4h 15m",
      parkingName: "Parking A",
      parkingCode: "PKA",
      attendantName: "John Doe",
      amount: 10.63,
      paymentMethod: "Mobile Payment"
    },
    {
      id: "4",
      plateNumber: "JKL012",
      entryTime: "2023-05-19 09:05:12",
      exitTime: "2023-05-19 12:10:45",
      duration: "3h 5m",
      parkingName: "Parking C",
      parkingCode: "PKC",
      attendantName: "Robert Johnson",
      amount: 6.17,
      paymentMethod: "Credit Card"
    },
    {
      id: "5",
      plateNumber: "GHI345",
      entryTime: "2023-05-18 15:35:10",
      exitTime: "2023-05-18 17:40:25",
      duration: "2h 5m",
      parkingName: "Parking B",
      parkingCode: "PKB",
      attendantName: "Jane Smith",
      amount: 4.17,
      paymentMethod: "Cash"
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

  const handleSort = (column: keyof OutgoingCar) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredCars = outgoingCars
    .filter(car => {
      const matchesSearch = 
        car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.attendantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.parkingName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesParking = parkingFilter.length === 0 || parkingFilter.includes(car.parkingCode);
      
      return matchesSearch && matchesParking;
    })
    .sort((a, b) => {
      if (sortColumn === "amount") {
        return sortDirection === "asc" 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      }
      
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

  const totalRevenue = filteredCars.reduce((sum, car) => sum + car.amount, 0);

  const handleExportReport = () => {
    alert("Exporting report to CSV file...");
  };

  const renderSortIcon = (column: keyof OutgoingCar) => {
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
            <h1 className="text-3xl font-bold text-gray-800">Outgoing Cars Report</h1>
            <p className="text-gray-600">View and export data on cars exiting parking areas and revenue generated</p>
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
                    onClick={() => handleSort("exitTime")}
                  >
                    <div className="flex items-center">
                      Exit Time
                      {renderSortIcon("exitTime")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("duration")}
                  >
                    <div className="flex items-center">
                      Duration
                      {renderSortIcon("duration")}
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
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {renderSortIcon("amount")}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("paymentMethod")}
                  >
                    <div className="flex items-center">
                      Payment Method
                      {renderSortIcon("paymentMethod")}
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
                      {car.exitTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{car.parkingName}</div>
                      <div className="text-xs text-gray-500">{car.parkingCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${car.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No outgoing cars matching your criteria</p>
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
            <h3 className="text-lg font-medium text-gray-800 mb-2">Total Exits</h3>
            <p className="text-3xl font-bold text-primary">{filteredCars.length}</p>
            <p className="text-sm text-gray-500">in selected period</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-500">from all exits</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Average Amount</h3>
            <p className="text-3xl font-bold text-primary">
              ${filteredCars.length ? (totalRevenue / filteredCars.length).toFixed(2) : "0.00"}
            </p>
            <p className="text-sm text-gray-500">per exit</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default OutgoingReport;
