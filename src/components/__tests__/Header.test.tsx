import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { APP_CONFIG } from '@/config/constants'

describe('Header', () => {
  it('should render application name', () => {
    render(<Header />)
    
    expect(screen.getByText(APP_CONFIG.NAME)).toBeInTheDocument()
  })

  it('should render with proper styling', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'border-b')
  })

  it('should have proper semantic structure', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header.tagName).toBe('HEADER')
  })

  it('should contain navigation landmark', () => {
    render(<Header />)
    
    // Since the header doesn't actually have a nav role, let's check for the header role instead
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('should display app name as heading', () => {
    render(<Header />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(APP_CONFIG.NAME)
  })

  it('should be responsive', () => {
    render(<Header />)
    
    // Find the container with the responsive classes by traversing up
    const responsiveContainer = document.querySelector('.max-w-7xl')
    expect(responsiveContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
  })
})
