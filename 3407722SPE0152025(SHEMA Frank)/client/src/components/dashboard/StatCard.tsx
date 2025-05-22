
import React from "react";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  footer?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = "bg-primary",
  footer,
  trend
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          <div className={`${color} p-3 rounded-full text-white`}>
            {icon}
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
        
        {trend && (
          <div className="flex items-center">
            <div 
              className={`text-sm ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              } font-medium flex items-center`}
            >
              {trend.isPositive ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              {trend.value}%
            </div>
            <span className="text-xs text-gray-500 ml-2">vs last week</span>
          </div>
        )}
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
