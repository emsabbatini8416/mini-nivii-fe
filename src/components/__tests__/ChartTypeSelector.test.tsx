import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ChartTypeSelector from '@/components/ChartTypeSelector'
import type { ChartType } from '@/types'

describe('ChartTypeSelector', () => {
  const mockOnTypeChange = vi.fn()

  const defaultProps = {
    selectedType: 'bar' as ChartType,
    onTypeChange: mockOnTypeChange,
    disabled: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all chart type options', () => {
    render(<ChartTypeSelector {...defaultProps} />)
    
    // Use regex to handle text split across elements
    expect(screen.getByText(/Bar Chart/)).toBeInTheDocument()
    expect(screen.getByText(/Line Chart/)).toBeInTheDocument()
    expect(screen.getByText(/Pie Chart/)).toBeInTheDocument()
    expect(screen.getByText(/Area Chart/)).toBeInTheDocument()
  })

  it('should highlight selected chart type', () => {
    render(<ChartTypeSelector {...defaultProps} selectedType="pie" />)
    
    const pieButton = screen.getByRole('button', { name: /pie chart/i })
    expect(pieButton).toHaveClass('bg-blue-100', 'text-blue-700', 'border-blue-300')
  })

  it('should call onTypeChange when different chart type is selected', () => {
    render(<ChartTypeSelector {...defaultProps} />)
    
    const lineButton = screen.getByRole('button', { name: /line chart/i })
    fireEvent.click(lineButton)
    
    expect(mockOnTypeChange).toHaveBeenCalledWith('line')
  })

  it('should disable all buttons when disabled prop is true', () => {
    render(<ChartTypeSelector {...defaultProps} disabled={true} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    })
  })

  it('should show explanatory text', () => {
    render(<ChartTypeSelector {...defaultProps} />)
    
    expect(screen.getByText('Chart type is auto-detected based on your question, but you can override it here.')).toBeInTheDocument()
  })

  it('should have proper heading', () => {
    render(<ChartTypeSelector {...defaultProps} />)
    
    expect(screen.getByText('Chart Type')).toBeInTheDocument()
  })

  it('should allow selecting each chart type', () => {
    const chartTypes: ChartType[] = ['bar', 'line', 'pie', 'area']
    
    chartTypes.forEach(type => {
      const { unmount } = render(<ChartTypeSelector {...defaultProps} selectedType={type} />)
      
      const selectedButton = screen.getByRole('button', { name: new RegExp(getChartLabel(type), 'i') })
      expect(selectedButton).toHaveClass('bg-blue-100')
      
      unmount() // Clean up between renders
    })
  })

  it('should have accessible button labels', () => {
    render(<ChartTypeSelector {...defaultProps} />)
    
    expect(screen.getByRole('button', { name: /📊 Bar Chart/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /📈 Line Chart/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🥧 Pie Chart/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /📉 Area Chart/ })).toBeInTheDocument()
  })
})

function getChartLabel(type: ChartType): string {
  switch (type) {
    case 'bar': return 'Bar Chart'
    case 'line': return 'Line Chart'
    case 'pie': return 'Pie Chart'
    case 'area': return 'Area Chart'
    default: return 'Chart'
  }
}
