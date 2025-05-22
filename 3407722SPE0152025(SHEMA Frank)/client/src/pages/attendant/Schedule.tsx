
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DashboardLayout from "../../components/layouts/DashboardLayout";

interface Shift {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  status: "upcoming" | "completed" | "canceled";
}

const Schedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample schedule data
  const shifts: Shift[] = [
    {
      id: 1,
      date: new Date(),
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      location: "Downtown Parking Lot A",
      status: "upcoming",
    },
    {
      id: 2,
      date: new Date(Date.now() + 86400000), // tomorrow
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      location: "Central Mall Parking",
      status: "upcoming",
    },
    {
      id: 3,
      date: new Date(Date.now() - 86400000), // yesterday
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      location: "Airport Parking Terminal B",
      status: "completed",
    },
    {
      id: 4,
      date: new Date(Date.now() - 172800000), // 2 days ago
      startTime: "10:00 AM",
      endTime: "06:00 PM",
      location: "Hospital Parking",
      status: "completed",
    },
    {
      id: 5,
      date: new Date(Date.now() + 172800000), // 2 days from now
      startTime: "07:00 AM",
      endTime: "03:00 PM",
      location: "Shopping Center East",
      status: "upcoming",
    },
  ];

  // Filter shifts for selected date
  const filteredShifts = shifts.filter(
    (shift) => date && shift.date.toDateString() === date.toDateString()
  );

  // Filter upcoming shifts (regardless of selected date)
  const upcomingShifts = shifts
    .filter((shift) => shift.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Work Schedule</h1>
          <p className="text-gray-500">View and manage your parking attendant shifts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" size={20} />
                Calendar View
              </CardTitle>
              <CardDescription>
                Select a date to view your scheduled shifts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-4">
                    {date ? (
                      `Shifts for ${format(date, "MMMM d, yyyy")}`
                    ) : (
                      "Select a date"
                    )}
                  </h3>

                  {filteredShifts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredShifts.map((shift) => (
                        <div
                          key={shift.id}
                          className="p-3 bg-white border rounded-lg shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{shift.location}</p>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Clock size={16} className="mr-1" />
                                {shift.startTime} - {shift.endTime}
                              </div>
                            </div>
                            <span
                              className={`${getStatusColor(
                                shift.status
                              )} text-xs px-2 py-1 rounded-full capitalize`}
                            >
                              {shift.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {date ? "No shifts scheduled for this day" : "Select a date to view shifts"}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2" size={20} />
                Upcoming Shifts
              </CardTitle>
              <CardDescription>Your next scheduled shifts</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingShifts.length > 0 ? (
                <div className="space-y-4">
                  {upcomingShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="p-3 bg-white border rounded-lg shadow-sm"
                    >
                      <div>
                        <p className="font-medium">{shift.location}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <CalendarIcon size={14} className="mr-1" />
                            {format(shift.date, "MMMM d, yyyy")}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock size={14} className="mr-1" />
                            {shift.startTime} - {shift.endTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming shifts scheduled
                </div>
              )}

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Shifts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>
              Your work summary for this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">Total Shifts</p>
                <p className="text-3xl font-bold">14</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm font-medium">Hours Worked</p>
                <p className="text-3xl font-bold">112</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 text-sm font-medium">Coming Up</p>
                <p className="text-3xl font-bold">6</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-800 text-sm font-medium">Different Locations</p>
                <p className="text-3xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Schedule;
