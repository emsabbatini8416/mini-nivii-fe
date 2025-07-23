import { useState } from 'react';
import { apiService } from '@/services/api';
import { MESSAGES } from '@/config/constants';
import type { ChartDataPoint, UseQueryResult, ChartType } from '@/types';

export const useQuery = (): UseQueryResult => {
  const [data, setData] = useState<ChartDataPoint[] | null>(null);
  const [chartType, setChartType] = useState<ChartType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async (question: string): Promise<void> => {
    if (!question.trim()) {
      setError(MESSAGES.ERRORS.EMPTY_QUESTION);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.askQuestion(question);
      
      // Check if response exists and has data
      if (!response || !response.data) {
        setError(MESSAGES.ERRORS.NO_DATA);
        setData(null);
        return;
      }
      
      // Transform the response data to chart format
      let finalData: ChartDataPoint[] = [];
      
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setError(MESSAGES.ERRORS.NO_RESULTS);
          setData(null);
          setChartType(null);
          return;
        } else {
          finalData = response.data;
        }
      } else if (response.data && typeof response.data === 'object') {
        // Handle legacy format with columns and rows
        const { columns, rows } = response.data as any;
        
        if (!columns || !rows || !Array.isArray(columns) || !Array.isArray(rows)) {
          setError(MESSAGES.ERRORS.INVALID_FORMAT);
          setData(null);
          setChartType(null);
          return;
        }
        
        if (rows.length === 0) {
          setError(MESSAGES.ERRORS.NO_RESULTS);
          setData(null);
          setChartType(null);
          return;
        } else {
          finalData = rows.map((row: any[]) =>
            Object.fromEntries(columns.map((col: string, index: number) => [col, row[index]]))
          ) as ChartDataPoint[];
        }
      } else {
        setError(MESSAGES.ERRORS.INVALID_FORMAT);
        setData(null);
        setChartType(null);
        return;
      }
      
      // Use chart type from backend suggestion, with fallback to legacy format or default
      let detectedChartType: ChartType = 'bar';
      
      if (response.chart_suggestion?.chart_type) {
        detectedChartType = response.chart_suggestion.chart_type;
      } else if (response.chartType) {
        // Backward compatibility
        detectedChartType = response.chartType;
      }
      
      setData(finalData);
      setChartType(detectedChartType);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERRORS.API_ERROR;
      setError(errorMessage);
      setData(null);
      setChartType(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = (): void => {
    setData(null);
    setChartType(null);
    setError(null);
  };

  return {
    data,
    chartType,
    loading,
    error,
    executeQuery,
    clearData
  };
};
