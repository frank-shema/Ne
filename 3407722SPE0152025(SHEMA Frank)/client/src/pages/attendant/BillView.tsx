
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, Download, Check } from "lucide-react";

type Bill = {
  id: string;
  plateNumber: string;
  parkingCode: string;
  parkingName: string;
  entryTime: string;
  exitTime: string;
  duration: string;
  hoursParked: number;
  rate: number;
  amount: number;
  isPaid: boolean;
  receiptNumber: string;
  paymentMethod: string;
};

const BillView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch bill details
    setLoading(true);
    setTimeout(() => {
      // Mock data
      if (id) {
        const entryDate = new Date();
        entryDate.setHours(entryDate.getHours() - 3);
        
        const mockBill: Bill = {
          id,
          plateNumber: "XYZ789",
          parkingCode: "PKB",
          parkingName: "Parking B",
          entryTime: entryDate.toLocaleString(),
          exitTime: new Date().toLocaleString(),
          duration: "3 hours 15 minutes",
          hoursParked: 3.25,
          rate: 2.5,
          amount: 8.13,
          isPaid: true,
          receiptNumber: "R" + id.padStart(6, "0"),
          paymentMethod: "Credit Card"
        };
        setBill(mockBill);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF file
    alert("Downloading receipt as PDF...");
  };

  const handleProcessPayment = () => {
    // Simulate payment processing
    setShowPaymentSuccess(true);
    setTimeout(() => {
      if (bill) {
        setBill({
          ...bill,
          isPaid: true
        });
      }
      setShowPaymentSuccess(false);
    }, 2000);
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

  if (!bill) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bill Not Found</h2>
          <p className="text-gray-600 mb-6">
            The bill you're looking for doesn't exist or has been removed.
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
              Print Receipt
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

        {/* Payment Success Message */}
        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
          >
            <div className="flex items-center">
              <Check size={20} className="mr-2" />
              <p>Payment processed successfully!</p>
            </div>
          </motion.div>
        )}

        {/* Printable Bill Section */}
        <div className="bg-white rounded-lg shadow-md p-6" id="printable-bill">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Parking Receipt</h2>
                {bill.isPaid && (
                  <div className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">
                    Paid
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">Smart Parking</p>
                <p className="text-sm text-gray-600">Receipt #{bill.receiptNumber}</p>
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
                    <p className="font-semibold">{bill.plateNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Parking Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <p className="text-gray-600">Parking Area:</p>
                    <p>{bill.parkingName} ({bill.parkingCode})</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Billing Details</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <p className="text-gray-600">Entry Time:</p>
                  <p>{bill.entryTime}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-gray-600">Exit Time:</p>
                  <p>{bill.exitTime}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-gray-600">Duration:</p>
                  <p>{bill.duration}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="text-gray-600">Rate:</p>
                  <p>${bill.rate.toFixed(2)} per hour</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg">Total Amount:</p>
                <p className="font-bold text-xl text-primary">${bill.amount.toFixed(2)}</p>
              </div>
              {bill.isPaid && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Payment Method: {bill.paymentMethod}</p>
                  <p className="text-sm text-gray-600">Paid on: {new Date().toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {!bill.isPaid && (
              <div className="flex justify-center">
                <button
                  onClick={handleProcessPayment}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Process Payment
                </button>
              </div>
            )}
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

export default BillView;
