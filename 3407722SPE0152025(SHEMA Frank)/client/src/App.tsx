
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Public Pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RoleSelect from "./pages/auth/RoleSelect";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfile from "./pages/admin/AdminProfile";
import AuditLogs from "./pages/admin/AuditLogs";
import IncomingReport from "./pages/admin/IncomingReport";
import OutgoingReport from "./pages/admin/OutgoingReport";
import ParkingList from "./pages/admin/ParkingList";
import ParkingRegister from "./pages/admin/ParkingRegister";

// Attendant Pages
import AttendantDashboard from "./pages/attendant/AttendantDashboard";
import AttendantProfile from "./pages/attendant/AttendantProfile";
import ViewParkings from "./pages/attendant/ViewParkings";
import CarEntry from "./pages/attendant/CarEntry";
import CarExit from "./pages/attendant/CarExit";
import TicketView from "./pages/attendant/TicketView";
import BillView from "./pages/attendant/BillView";
import Schedule from "./pages/attendant/Schedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports/incoming" element={<IncomingReport />} />
              <Route path="/admin/reports/outgoing" element={<OutgoingReport />} />
              <Route path="/admin/parking/list" element={<ParkingList />} />
              <Route path="/admin/parking/register" element={<ParkingRegister />} />
              <Route path="/admin/logs" element={<AuditLogs />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>

            {/* Attendant Routes */}
            <Route element={<PrivateRoute allowedRoles={["attendant"]} />}>
              <Route path="/attendant/dashboard" element={<AttendantDashboard />} />
              <Route path="/attendant/parking" element={<ViewParkings />} />
              <Route path="/attendant/profile" element={<AttendantProfile />} />
              <Route path="/attendant/car-entry" element={<CarEntry />} />
              <Route path="/attendant/car-exit" element={<CarExit />} />
              <Route path="/attendant/ticket/:id" element={<TicketView />} />
              <Route path="/attendant/bill/:id" element={<BillView />} />
              <Route path="/attendant/schedule" element={<Schedule />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
