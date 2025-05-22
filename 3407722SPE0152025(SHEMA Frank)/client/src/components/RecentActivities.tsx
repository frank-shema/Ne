
import React from "react";
import { motion } from "framer-motion";

export type ActivityType = "entry" | "exit" | "payment" | "parking" | "other";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  className?: string;
  maxItems?: number;
}

const getBorderColor = (type: ActivityType): string => {
  switch (type) {
    case "entry":
      return "border-green-500";
    case "exit":
      return "border-red-500";
    case "payment":
      return "border-blue-500";
    case "parking":
      return "border-purple-500";
    default:
      return "border-gray-500";
  }
};

const getIcon = (type: ActivityType): string => {
  switch (type) {
    case "entry":
      return "🚗";
    case "exit":
      return "🚪";
    case "payment":
      return "💰";
    case "parking":
      return "🅿️";
    default:
      return "📝";
  }
};

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  className = "",
  maxItems = 5
}) => {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No recent activities</p>
      ) : (
        <motion.div 
          className="space-y-4" 
          variants={container}
          initial="hidden"
          animate="show"
        >
          {displayActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className={`border-l-4 pl-4 py-3 ${getBorderColor(activity.type)}`}
              variants={item}
            >
              <div className="flex items-start">
                <span className="mr-2 text-xl">{getIcon(activity.type)}</span>
                <div>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {activities.length > maxItems && (
        <div className="mt-4 text-center">
          <button className="text-primary hover:underline text-sm">
            View all activities
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
