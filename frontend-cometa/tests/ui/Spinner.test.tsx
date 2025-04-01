import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '@/ui/components/Spinner';

describe('Spinner Component', () => {
  it('renders with default size', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner.firstChild).toHaveClass('h-8 w-8');
  });

  it('renders with small size', () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('h-4 w-4');
  });

  it('renders with custom className', () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
});