
import React from "react";
import { motion } from "framer-motion";

type Activity = {
  id: string;
  action: string;
  time: string;
  details: string;
};

type ActivityLogProps = {
  activities: Activity[];
};

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
      
      <div className="space-y-4 overflow-auto max-h-[400px] pr-2">
        <motion.div variants={container} initial="hidden" animate="show">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={item}
                className="border-l-4 border-primary pl-4 py-2"
              >
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="font-medium">{activity.action}</p>
                <p className="text-gray-600 text-sm">{activity.details}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No recent activities</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityLog;
