import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularProgress } from '../CircularProgress';

describe('CircularProgress', () => {
  it('renders with percentage', () => {
    render(<CircularProgress percentage={75} />);
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<CircularProgress percentage={50} size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '98');
    expect(svg).toHaveAttribute('height', '98');
  });

  it('renders with medium size', () => {
    const { container } = render(<CircularProgress percentage={50} size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '144');
    expect(svg).toHaveAttribute('height', '144');
  });

  it('renders with large size', () => {
    const { container } = render(<CircularProgress percentage={50} size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('applies green color for high percentage (>=70)', () => {
    const { container } = render(<CircularProgress percentage={85} />);
    const circle = container.querySelectorAll('circle')[1];
    expect(circle).toHaveAttribute('stroke', '#10b981');
  });

  it('applies yellow color for medium percentage (40-69)', () => {
    const { container } = render(<CircularProgress percentage={50} />);
    const circle = container.querySelectorAll('circle')[1];
    expect(circle).toHaveAttribute('stroke', '#FFE000');
  });

  it('applies red color for low percentage (<40)', () => {
    const { container } = render(<CircularProgress percentage={25} />);
    const circle = container.querySelectorAll('circle')[1];
    expect(circle).toHaveAttribute('stroke', '#ef4444');
  });

  it('handles 0 percentage', () => {
    render(<CircularProgress percentage={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles 100 percentage', () => {
    render(<CircularProgress percentage={100} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<CircularProgress percentage={50} className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
