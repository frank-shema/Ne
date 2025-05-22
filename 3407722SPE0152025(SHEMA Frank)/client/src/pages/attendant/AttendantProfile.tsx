
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { User, Settings, Lock, Mail, Eye, EyeOff, Save } from "lucide-react";

const AttendantProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: "123-456-7890", // Example data
    assignedParkings: "Parking A, Parking C", // Example data
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match if changing password
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call to update profile
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
      // Reset password fields after save
      setProfileData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    }, 1000);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
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
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">View and update your account information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary hover:bg-navy-800 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Settings size={16} className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary text-white p-4 rounded-full">
              <User size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2 ${
                    !isEditing ? 'bg-gray-100' : 'focus:outline-none focus:ring-2 focus:ring-primary'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2 ${
                    !isEditing ? 'bg-gray-100' : 'focus:outline-none focus:ring-2 focus:ring-primary'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full rounded-md border border-gray-300 pl-10 px-4 py-2 ${
                      !isEditing ? 'bg-gray-100' : 'focus:outline-none focus:ring-2 focus:ring-primary'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2 ${
                    !isEditing ? 'bg-gray-100' : 'focus:outline-none focus:ring-2 focus:ring-primary'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="assignedParkings" className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Parking Locations
                </label>
                <input
                  type="text"
                  id="assignedParkings"
                  name="assignedParkings"
                  value={profileData.assignedParkings}
                  readOnly
                  className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Assigned by administrator</p>
              </div>
            </div>

            {isEditing && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Lock size={18} className="mr-2" /> Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={profileData.currentPassword}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          value={profileData.newPassword}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-500"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={profileData.confirmPassword}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-500"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-navy-800 text-white px-6 py-2 rounded-md flex items-center transition-colors"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Activity Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-3xl font-bold text-primary">247</p>
              <p className="text-sm text-gray-500">Cars Registered</p>
            </div>
            <div className="border rounded-md p-4 text-center">
              <p className="text-3xl font-bold text-primary">183</p>
              <p className="text-sm text-gray-500">Cars Exited</p>
            </div>
            <div className="border rounded-md p-4 text-center">
              <p className="text-3xl font-bold text-primary">14</p>
              <p className="text-sm text-gray-500">Days Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="font-medium">March 22, 2023</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="font-medium">Today, 8:45 AM</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AttendantProfile;
