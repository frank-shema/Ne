
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type ParkingStatusChartProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const ParkingStatusChart: React.FC<ParkingStatusChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Parking Status</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParkingStatusChart;
