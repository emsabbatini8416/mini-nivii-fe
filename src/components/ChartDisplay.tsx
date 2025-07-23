import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend 
} from 'recharts';
import type { ChartDisplayProps, ChartType } from '@/types';

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, chartType = 'bar' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="py-12">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data to display</h3>
          <p className="mt-1 text-sm text-gray-500">
            Enter a question above to see your results visualized here.
          </p>
        </div>
      </div>
    );
  }

  const dataKeys = Object.keys(data[0]);
  const xAxisKey = dataKeys[0];
  const yAxisKey = dataKeys[1];

  // Color palette for charts
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${xAxisKey}: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-blue-600">
              {`${entry.dataKey || yAxisKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'pie':
        // For pie charts, we need to transform data if needed
        const pieData = data.map((item, index) => ({
          ...item,
          fill: colors[index % colors.length]
        }));

        return (
          <PieChart {...commonProps}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={yAxisKey}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
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
            <Line 
              type="monotone" 
              dataKey={yAxisKey} 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
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
            <Area 
              type="monotone" 
              dataKey={yAxisKey} 
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.6}
            />
          </AreaChart>
        );

      case 'bar':
      default:
        return (
          <BarChart {...commonProps}>
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
        );
    }
  };

  const getChartTypeDisplayName = (type: ChartType): string => {
    switch (type) {
      case 'pie': return 'Pie Chart';
      case 'line': return 'Line Chart';
      case 'area': return 'Area Chart';
      case 'bar': return 'Bar Chart';
      default: return 'Chart';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Query Results
        </h3>
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {getChartTypeDisplayName(chartType)}
        </span>
      </div>
      
      <div className="w-full h-96 mt-6 p-4 bg-white rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Showing {data.length} result{data.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default ChartDisplay;
