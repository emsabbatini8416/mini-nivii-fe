// API Types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status?: number;
}

export interface ChartDataPoint {
  [key: string]: any;
}

export type ChartType = 'bar' | 'line' | 'pie' | 'area';

export interface ChartSuggestion {
  chart_type: ChartType;
  title: string;
  description: string;
}

export interface QueryResponse {
  data: ChartDataPoint[] | any;
  chartType?: ChartType; // Keep for backward compatibility
  chart_suggestion?: ChartSuggestion;
  message?: string;
  query?: string;
}

// Component Props Types
export interface SearchFormProps {
  question: string;
  onQuestionChange: (question: string) => void;
  onSubmit: () => void;
  loading: boolean;
  onClear: () => void;
}

export interface ChartDisplayProps {
  data: ChartDataPoint[] | null;
  chartType?: ChartType;
}

export interface ErrorMessageProps {
  message: string | null;
  onDismiss: () => void;
}

export interface EnvDebugProps {
  // No props needed for this component
}

// Hook Types
export interface UseQueryResult {
  data: ChartDataPoint[] | null;
  chartType: ChartType | null;
  loading: boolean;
  error: string | null;
  executeQuery: (question: string) => Promise<void>;
  clearData: () => void;
}

// Configuration Types
export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: {
    ASK: string;
  };
}

export interface AppConfig {
  NAME: string;
  VERSION: string;
}

export interface UIConfig {
  CHART_HEIGHT: number;
  ANIMATION_DURATION: number;
}

export interface Messages {
  ERRORS: {
    EMPTY_QUESTION: string;
    API_ERROR: string;
    NETWORK_ERROR: string;
    NO_DATA: string;
    NO_RESULTS: string;
    INVALID_FORMAT: string;
  };
  PLACEHOLDERS: {
    SEARCH: string;
  };
}
