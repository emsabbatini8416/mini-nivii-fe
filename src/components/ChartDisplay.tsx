import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { ChartDisplayProps } from '@/types';

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const dataKeys = Object.keys(data[0]);
  const xAxisKey = dataKeys[0];
  const yAxisKey = dataKeys[1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${xAxisKey}: ${label}`}</p>
          <p className="text-blue-600">
            {`${yAxisKey}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Query Results
      </h3>
      
      <div className="w-full h-96 mt-6 p-4 bg-white rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={yAxisKey} 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Showing {data.length} result{data.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default ChartDisplay;
