import React from 'react';
import type { ChartType } from '@/types';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
  disabled?: boolean;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ 
  selectedType, 
  onTypeChange, 
  disabled = false 
}) => {
  const chartTypes: { value: ChartType; label: string; icon: string }[] = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'area', label: 'Area Chart', icon: '📉' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Chart Type</h4>
      <div className="flex flex-wrap gap-2">
        {chartTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            disabled={disabled}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedType === type.value
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Chart type is auto-detected based on your question, but you can override it here.
      </p>
    </div>
  );
};

export default ChartTypeSelector;
