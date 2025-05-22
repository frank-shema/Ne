
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { Calendar, Download, FileText, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "../../components/date/DateRangePicker";

type Report = {
  id: string;
  plateNumber: string;
  parkingName: string;
  entryTime: string;
  exitTime?: string;
  duration?: string;
  fee?: number;
};

const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [reportType, setReportType] = useState<"incoming" | "outgoing">("incoming");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for reports
  const incomingReports: Report[] = [
    {
      id: "1",
      plateNumber: "ABC123",
      parkingName: "Parking A",
      entryTime: "2025-05-15 08:30:00",
    },
    {
      id: "2",
      plateNumber: "XYZ789",
      parkingName: "Parking B",
      entryTime: "2025-05-16 09:15:00",
    },
    {
      id: "3",
      plateNumber: "DEF456",
      parkingName: "Parking A",
      entryTime: "2025-05-17 10:45:00",
    },
    {
      id: "4",
      plateNumber: "GHI789",
      parkingName: "Parking C",
      entryTime: "2025-05-18 11:20:00",
    },
    {
      id: "5",
      plateNumber: "JKL012",
      parkingName: "Parking B",
      entryTime: "2025-05-19 13:10:00",
    },
  ];
  
  const outgoingReports: Report[] = [
    {
      id: "1",
      plateNumber: "ABC123",
      parkingName: "Parking A",
      entryTime: "2025-05-15 08:30:00",
      exitTime: "2025-05-15 10:45:00",
      duration: "2.25 hours",
      fee: 5.63,
    },
    {
      id: "2",
      plateNumber: "XYZ789",
      parkingName: "Parking B",
      entryTime: "2025-05-16 09:15:00",
      exitTime: "2025-05-16 12:30:00",
      duration: "3.25 hours",
      fee: 8.13,
    },
    {
      id: "3",
      plateNumber: "DEF456",
      parkingName: "Parking A",
      entryTime: "2025-05-17 10:45:00",
      exitTime: "2025-05-17 11:15:00",
      duration: "0.5 hours",
      fee: 1.25,
    },
  ];
  
  const reports = reportType === "incoming" ? incomingReports : outgoingReports;
  
  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert("CSV export functionality would be implemented here");
  };
  
  const totalRevenue = outgoingReports.reduce((sum, report) => sum + (report.fee || 0), 0);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">View and export parking reports</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <div className="flex space-x-4 mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="reportType"
                    value="incoming"
                    checked={reportType === "incoming"}
                    onChange={() => setReportType("incoming")}
                  />
                  <span className="ml-2">Incoming Cars</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="reportType"
                    value="outgoing"
                    checked={reportType === "outgoing"}
                    onChange={() => setReportType("outgoing")}
                  />
                  <span className="ml-2">Outgoing Cars</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors disabled:bg-gray-400"
            >
              <Filter size={18} />
              <span>{isLoading ? "Generating..." : "Generate Report"}</span>
            </button>
            
            <button
              onClick={handleExportCSV}
              className="bg-white border border-primary text-primary hover:bg-gray-50 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              <Download size={18} />
              <span>Export as CSV</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {reportType === "incoming" ? "Incoming Cars" : "Outgoing Cars & Revenue"}
            </h2>
            {reportType === "outgoing" && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
              </div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plate Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parking Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry Time
                  </th>
                  {reportType === "outgoing" && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exit Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{report.plateNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{report.parkingName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{report.entryTime}</div>
                    </td>
                    {reportType === "outgoing" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-700">{report.exitTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-700">{report.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-primary">${report.fee?.toFixed(2)}</div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {reports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your filters or date range.
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{reports.length}</span> results
              </div>
              <div>
                {/* Pagination would go here */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminReports;
