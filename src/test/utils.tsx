import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import type { ChartType, QueryResponse } from '@/types'

// Custom render function that includes common providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

// Mock data generators
export const generateMockChartData = (count = 3) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 100
  }))
}

export const generateMockTimeSeriesData = (count = 6) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return Array.from({ length: count }, (_, i) => ({
    month: months[i],
    value: Math.floor(Math.random() * 1000) + 500
  }))
}

export const generateMockProductData = (count = 4) => {
  const products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones', 'Camera']
  return Array.from({ length: count }, (_, i) => ({
    product: products[i] || `Product ${i + 1}`,
    sales: Math.floor(Math.random() * 2000) + 100
  }))
}

// Common test queries
export const testQueries = {
  bar: [
    'top selling products',
    'revenue by department',
    'sales by region'
  ],
  pie: [
    'distribution of sales',
    'market share percentage',
    'proportion of users'
  ],
  line: [
    'sales evolution over time',
    'revenue trend',
    'growth throughout the year'
  ],
  area: [
    'cumulative revenue',
    'total accumulated sales',
    'cumulative users'
  ]
}

// Mock API responses
export const mockApiResponses = {
  success: (data: any[], chartType?: ChartType): QueryResponse => ({
    data,
    chart_suggestion: chartType ? {
      chart_type: chartType,
      title: 'Chart Title',
      description: `${chartType} chart recommended`
    } : undefined,
    message: 'Query executed successfully'
  }),
  
  legacyFormat: (columns: string[], rows: any[][]) => ({
    data: { columns, rows }
  }),
  
  error: (message: string) => {
    throw new Error(message)
  },
  
  networkError: () => {
    const error: any = new Error('Network Error')
    error.request = {}
    throw error
  },
  
  serverError: (message: string) => {
    const error: any = new Error('Server Error')
    error.response = {
      data: { error: message }
    }
    throw error
  }
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { customRender as render }
