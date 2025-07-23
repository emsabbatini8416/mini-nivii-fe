import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChartDisplay from '@/components/ChartDisplay'
import type { ChartDataPoint } from '@/types'

// Mock Recharts components
vi.mock('recharts', () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  Line: () => <div data-testid="line" />,
  Pie: () => <div data-testid="pie" />,
  Area: () => <div data-testid="area" />,
  Cell: () => <div data-testid="cell" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Legend: () => <div data-testid="legend" />
}))

describe('ChartDisplay', () => {
  const sampleData: ChartDataPoint[] = [
    { product: 'Laptop', sales: 1200 },
    { product: 'Phone', sales: 800 },
    { product: 'Tablet', sales: 600 }
  ]

  it('should render empty state when no data is provided', () => {
    render(<ChartDisplay data={null} />)
    
    expect(screen.getByText('No data to display')).toBeInTheDocument()
    expect(screen.getByText('Enter a question above to see your results visualized here.')).toBeInTheDocument()
  })

  it('should render empty state when data array is empty', () => {
    render(<ChartDisplay data={[]} />)
    
    expect(screen.getByText('No data to display')).toBeInTheDocument()
  })

  it('should render bar chart by default', () => {
    render(<ChartDisplay data={sampleData} />)
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
    expect(screen.getByTestId('bar')).toBeInTheDocument()
    expect(screen.getByText('Bar Chart')).toBeInTheDocument()
  })

  it('should render line chart when chartType is line', () => {
    render(<ChartDisplay data={sampleData} chartType="line" />)
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('line')).toBeInTheDocument()
    expect(screen.getByText('Line Chart')).toBeInTheDocument()
  })

  it('should render pie chart when chartType is pie', () => {
    render(<ChartDisplay data={sampleData} chartType="pie" />)
    
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
    expect(screen.getByTestId('pie')).toBeInTheDocument()
    expect(screen.getByText('Pie Chart')).toBeInTheDocument()
  })

  it('should render area chart when chartType is area', () => {
    render(<ChartDisplay data={sampleData} chartType="area" />)
    
    expect(screen.getByTestId('area-chart')).toBeInTheDocument()
    expect(screen.getByTestId('area')).toBeInTheDocument()
    expect(screen.getByText('Area Chart')).toBeInTheDocument()
  })

  it('should display query results heading', () => {
    render(<ChartDisplay data={sampleData} />)
    
    expect(screen.getByText('Query Results')).toBeInTheDocument()
  })

  it('should display data count', () => {
    render(<ChartDisplay data={sampleData} />)
    
    expect(screen.getByText('Showing 3 results')).toBeInTheDocument()
  })

  it('should display singular result count', () => {
    const singleData = [{ product: 'Laptop', sales: 1200 }]
    render(<ChartDisplay data={singleData} />)
    
    expect(screen.getByText('Showing 1 result')).toBeInTheDocument()
  })

  it('should render responsive container', () => {
    render(<ChartDisplay data={sampleData} />)
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('should render chart components for bar chart', () => {
    render(<ChartDisplay data={sampleData} chartType="bar" />)
    
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument()
    expect(screen.getByTestId('x-axis')).toBeInTheDocument()
    expect(screen.getByTestId('y-axis')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })

  it('should render legend for pie chart', () => {
    render(<ChartDisplay data={sampleData} chartType="pie" />)
    
    expect(screen.getByTestId('legend')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    render(<ChartDisplay data={sampleData} />)
    
    // Find the container with the correct styling classes
    const container = document.querySelector('.bg-white.rounded-lg.shadow-md')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('bg-white', 'rounded-lg', 'shadow-md')
  })

  it('should show empty state icon', () => {
    render(<ChartDisplay data={null} />)
    
    const icon = screen.getByText('No data to display').closest('div')?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
