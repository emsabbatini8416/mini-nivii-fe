import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { apiService } from '@/services/api'
import { MESSAGES } from '@/config/constants'

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}))

const mockedAxios = axios as any

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('askQuestion', () => {
    it('should successfully make API call and return data', async () => {
      const mockResponse = {
        data: {
          data: [
            { product: 'Laptop', sales: 1200 },
            { product: 'Phone', sales: 800 }
          ],
          chartType: 'bar'
        }
      }

      mockedAxios.post.mockResolvedValueOnce(mockResponse)

      const result = await apiService.askQuestion('top selling products')

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:8000/ask',
        { question: 'top selling products' }
      )
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle server error response', async () => {
      const mockError = {
        response: {
          data: { error: 'Server error occurred' }
        }
      }

      mockedAxios.post.mockRejectedValueOnce(mockError)

      await expect(apiService.askQuestion('test question')).rejects.toThrow(
        'Server error occurred'
      )
    })

    it('should handle network error', async () => {
      const mockError = {
        request: {}
      }

      mockedAxios.post.mockRejectedValueOnce(mockError)

      await expect(apiService.askQuestion('test question')).rejects.toThrow(
        MESSAGES.ERRORS.NETWORK_ERROR
      )
    })

    it('should handle generic error', async () => {
      const mockError = new Error('Generic error')

      mockedAxios.post.mockRejectedValueOnce(mockError)

      await expect(apiService.askQuestion('test question')).rejects.toThrow(
        MESSAGES.ERRORS.API_ERROR
      )
    })

    it('should handle server error without error message', async () => {
      const mockError = {
        response: {
          data: {}
        }
      }

      mockedAxios.post.mockRejectedValueOnce(mockError)

      await expect(apiService.askQuestion('test question')).rejects.toThrow(
        MESSAGES.ERRORS.API_ERROR
      )
    })
  })
})
