import type { ApiConfig, AppConfig, UIConfig, Messages } from '@/types';

export const API_CONFIG: ApiConfig = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    ASK: '/ask'
  }
};

export const APP_CONFIG: AppConfig = {
  NAME: import.meta.env.VITE_APP_NAME || 'Mini Nivii',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
};

export const UI_CONFIG: UIConfig = {
  CHART_HEIGHT: 320,
  ANIMATION_DURATION: 300
};

export const MESSAGES: Messages = {
  ERRORS: {
    EMPTY_QUESTION: 'Please enter a question',
    API_ERROR: 'Could not process question. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    NO_DATA: 'No data received from the server. Please try a different question.',
    NO_RESULTS: 'No results found for your query. Please try a different question.',
    INVALID_FORMAT: 'Invalid data format received. Please try again.'
  },
  PLACEHOLDERS: {
    SEARCH: 'Try: "top-selling product in October" (bar) | "distribution of sold products" (pie) | "evolution of total sales through time" (line)'
  }
};
