import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '@/components/ErrorMessage'

describe('ErrorMessage', () => {
  const mockOnDismiss = vi.fn()

  it('should not render when message is null', () => {
    const { container } = render(
      <ErrorMessage message={null} onDismiss={mockOnDismiss} />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('should not render when message is empty string', () => {
    const { container } = render(
      <ErrorMessage message="" onDismiss={mockOnDismiss} />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('should render error message when provided', () => {
    render(
      <ErrorMessage message="Test error message" onDismiss={mockOnDismiss} />
    )
    
    expect(screen.getByText('Error:')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('should call onDismiss when dismiss button is clicked', () => {
    render(
      <ErrorMessage message="Test error" onDismiss={mockOnDismiss} />
    )
    
    const dismissButton = screen.getByRole('button')
    fireEvent.click(dismissButton)
    
    expect(mockOnDismiss).toHaveBeenCalledOnce()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <ErrorMessage message="Test error" onDismiss={mockOnDismiss} />
    )
    
    const errorContainer = screen.getByText('Test error').closest('div')
    expect(errorContainer).toHaveClass('bg-red-50', 'border-red-200', 'text-red-700')
  })

  it('should display error icon', () => {
    render(
      <ErrorMessage message="Test error" onDismiss={mockOnDismiss} />
    )
    
    const icon = screen.getByText('Error:').previousElementSibling
    expect(icon).toBeInTheDocument()
    expect(icon?.tagName).toBe('svg')
  })
})
