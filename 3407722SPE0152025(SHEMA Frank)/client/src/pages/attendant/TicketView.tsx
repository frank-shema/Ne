
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, Download } from "lucide-react";

type Ticket = {
  id: string;
  plateNumber: string;
  parkingCode: string;
  parkingName: string;
  entryTime: string;
  ticketNumber: string;
  vehicleType: string;
};

const TicketView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch ticket details
    setLoading(true);
    setTimeout(() => {
      // Mock data
      if (id) {
        const mockTicket: Ticket = {
          id,
          plateNumber: "ABC123",
          parkingCode: "PKA",
          parkingName: "Parking A",
          entryTime: new Date().toLocaleString(),
          ticketNumber: "T" + id.padStart(6, "0"),
          vehicleType: "Sedan"
        };
        setTicket(mockTicket);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF file
    alert("Downloading ticket as PDF...");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ticket Not Found</h2>
          <p className="text-gray-600 mb-6">
            The ticket you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/attendant/dashboard")}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-navy-800 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <Printer size={18} className="mr-2" />
              Print Ticket
            </button>
            <button
              onClick={handleDownload}
              className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Printable Ticket Section */}
        <div className="bg-white rounded-lg shadow-md p-6" id="printable-ticket">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Parking Entry Ticket</h2>
              <div className="text-right">
                <p className="font-bold text-primary">Smart Parking</p>
                <p className="text-sm text-gray-600">System generated ticket</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <p className="text-gray-600">Plate Number:</p>
                    <p className="font-semibold">{ticket.plateNumber}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-gray-600">Vehicle Type:</p>
                    <p>{ticket.vehicleType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Parking Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <p className="text-gray-600">Parking Area:</p>
                    <p>{ticket.parkingName} ({ticket.parkingCode})</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-gray-600">Entry Time:</p>
                    <p>{ticket.entryTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600">Ticket Number:</p>
                  <p className="font-bold text-lg">{ticket.ticketNumber}</p>
                </div>
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center border">
                  <span className="text-sm text-gray-600">QR Code</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600 mb-1">Important Information:</p>
                <ul className="list-disc text-sm text-gray-600 pl-5 space-y-1">
                  <li>Please keep this ticket safe. You will need it when exiting.</li>
                  <li>Lost ticket may result in additional fees.</li>
                  <li>The parking fee is calculated based on your duration of stay.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Thank you for using Smart Parking System</p>
            <p>© {new Date().getFullYear()} Smart Parking. All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default TicketView;
