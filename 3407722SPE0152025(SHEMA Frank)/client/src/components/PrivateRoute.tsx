
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "@/hooks/use-toast";

type PrivateRouteProps = {
  allowedRoles?: Array<"admin" | "attendant">;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If auth is still loading, we could show a loading spinner
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If there's no user, redirect to login
  if (!user) {
    // Show a toast notification only if the user was trying to access a protected route
    if (location.pathname !== "/login") {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is empty, then any authenticated user is allowed
  if (allowedRoles.length === 0) {
    return <Outlet />;
  }

  // If user's role is allowed, render the outlet
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // If user's role is not allowed, redirect to their dashboard
  if (user.role === "admin") {
    // Show unauthorized access toast
    toast({
      title: "Unauthorized access",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    // Show unauthorized access toast
    toast({
      title: "Unauthorized access",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    
    return <Navigate to="/attendant/dashboard" replace />;
  }
};

export default PrivateRoute;
