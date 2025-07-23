import { useState } from 'react';
import { apiService } from '@/services/api';
import { MESSAGES } from '@/config/constants';
import type { ChartDataPoint, UseQueryResult } from '@/types';

export const useQuery = (): UseQueryResult => {
  const [data, setData] = useState<ChartDataPoint[] | null>(null);
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
      
      // Transform the response data to chart format
      if (response.data && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        // Handle legacy format with columns and rows
        const { columns, rows } = response.data as any;
        const chartData: ChartDataPoint[] = rows.map((row: any[]) =>
          Object.fromEntries(columns.map((col: string, index: number) => [col, row[index]]))
        );
        setData(chartData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : MESSAGES.ERRORS.API_ERROR;
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = (): void => {
    setData(null);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    executeQuery,
    clearData
  };
};
