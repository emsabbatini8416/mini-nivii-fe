import axios, { AxiosError } from 'axios';
import { API_CONFIG, MESSAGES } from '@/config/constants';
import type { QueryResponse, ApiResponse } from '@/types';

export const apiService = {
  async askQuestion(question: string): Promise<QueryResponse> {
    try {
      const response = await axios.post<QueryResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASK}`, 
        { question }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      if (axiosError.response) {
        // Server responded with error status
        throw new Error(axiosError.response.data?.error || MESSAGES.ERRORS.API_ERROR);
      } else if (axiosError.request) {
        // Network error
        throw new Error(MESSAGES.ERRORS.NETWORK_ERROR);
      } else {
        // Other error
        throw new Error(MESSAGES.ERRORS.API_ERROR);
      }
    }
  }
};
