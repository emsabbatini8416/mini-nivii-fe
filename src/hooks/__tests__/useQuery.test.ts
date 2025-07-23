import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useQuery } from '@/hooks/useQuery'
import { apiService } from '@/services/api'
import { MESSAGES } from '@/config/constants'

// Mock the API service
vi.mock('@/services/api', () => ({
  apiService: {
    askQuestion: vi.fn()
  }
}))

const mockApiService = vi.mocked(apiService)

describe('useQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useQuery())

    expect(result.current.data).toBeNull()
    expect(result.current.chartType).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should handle empty question', async () => {
    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('')
    })

    expect(result.current.error).toBe(MESSAGES.ERRORS.EMPTY_QUESTION)
    expect(result.current.data).toBeNull()
    expect(mockApiService.askQuestion).not.toHaveBeenCalled()
  })

  it('should handle successful API response with array data', async () => {
    const mockData = [
      { product: 'Laptop', sales: 1200 },
      { product: 'Phone', sales: 800 }
    ]

    mockApiService.askQuestion.mockResolvedValueOnce({
      data: mockData,
      chart_suggestion: {
        chart_type: 'bar',
        title: 'Top Products',
        description: 'Bar chart recommended for rankings'
      }
    })

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('top selling products')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.chartType).toBe('bar')
    expect(result.current.error).toBeNull()
  })

  it('should use chart suggestion from backend response', async () => {
    const mockData = [
      { category: 'A', percentage: 40 },
      { category: 'B', percentage: 60 }
    ]

    mockApiService.askQuestion.mockResolvedValueOnce({
      data: mockData,
      chart_suggestion: {
        chart_type: 'pie',
        title: 'Distribution Chart',
        description: 'Pie chart recommended for distributions'
      }
    })

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('distribution of sales by category')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.chartType).toBe('pie')
  })

  it('should fallback to legacy chartType property', async () => {
    const mockData = [
      { month: 'Jan', revenue: 1000 },
      { month: 'Feb', revenue: 1200 }
    ]

    mockApiService.askQuestion.mockResolvedValueOnce({
      data: mockData,
      chartType: 'line' // Legacy format
    })

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('revenue evolution')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.chartType).toBe('line')
  })

  it('should default to bar chart when no suggestion provided', async () => {
    const mockData = [
      { quarter: 'Q1', total: 25000 },
      { quarter: 'Q2', total: 52000 }
    ]

    mockApiService.askQuestion.mockResolvedValueOnce({
      data: mockData
      // No chart_suggestion or chartType
    })

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('quarterly data')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.chartType).toBe('bar')
  })

  it('should handle legacy format with columns and rows', async () => {
    const mockResponse = {
      data: {
        columns: ['product', 'sales'],
        rows: [
          ['Laptop', 1200],
          ['Phone', 800]
        ]
      }
    }

    mockApiService.askQuestion.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('product sales')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual([
      { product: 'Laptop', sales: 1200 },
      { product: 'Phone', sales: 800 }
    ])
  })

  it('should handle null response', async () => {
    mockApiService.askQuestion.mockResolvedValueOnce(null as any)

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('test query')
    })

    expect(result.current.error).toBe(MESSAGES.ERRORS.NO_DATA)
    expect(result.current.data).toBeNull()
  })

  it('should handle empty array response', async () => {
    mockApiService.askQuestion.mockResolvedValueOnce({
      data: []
    })

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('test query')
    })

    expect(result.current.error).toBe(MESSAGES.ERRORS.NO_RESULTS)
    expect(result.current.data).toBeNull()
  })

  it('should handle API errors', async () => {
    mockApiService.askQuestion.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('test query')
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.data).toBeNull()
  })

  it('should clear data and error', () => {
    const { result } = renderHook(() => useQuery())

    // Set some initial state
    act(() => {
      result.current.clearData()
    })

    expect(result.current.data).toBeNull()
    expect(result.current.chartType).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('should handle invalid legacy format', async () => {
    const mockResponse = {
      data: {
        columns: null,
        rows: []
      }
    }

    mockApiService.askQuestion.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useQuery())

    await act(async () => {
      await result.current.executeQuery('test query')
    })

    expect(result.current.error).toBe(MESSAGES.ERRORS.INVALID_FORMAT)
    expect(result.current.data).toBeNull()
  })
})
