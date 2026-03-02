import { render, screen } from '@testing-library/react';
import ProgressBar from '@/components/ProgressBar';

describe('ProgressBar', () => {
  test('renders percentage text when label is provided', () => {
    render(<ProgressBar percentage={50} label="학습 진행률" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('학습 진행률')).toBeInTheDocument();
  });

  test('does not render label when not provided', () => {
    const { container } = render(<ProgressBar percentage={75} />);
    expect(container.querySelector('.text-xs')).not.toBeInTheDocument();
  });

  test('bar width matches percentage', () => {
    const { container } = render(<ProgressBar percentage={30} />);
    const bar = container.querySelector('.bg-blue-500');
    expect(bar).toHaveStyle({ width: '30%' });
  });

  test('renders 0% correctly', () => {
    const { container } = render(<ProgressBar percentage={0} label="진행률" />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    const bar = container.querySelector('.bg-blue-500');
    expect(bar).toHaveStyle({ width: '0%' });
  });

  test('renders 100% correctly', () => {
    render(<ProgressBar percentage={100} label="완료" />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('sm size uses h-2 class', () => {
    const { container } = render(<ProgressBar percentage={50} size="sm" />);
    const bar = container.querySelector('.bg-blue-500');
    expect(bar).toHaveClass('h-2');
  });

  test('md size uses h-3 class by default', () => {
    const { container } = render(<ProgressBar percentage={50} />);
    const bar = container.querySelector('.bg-blue-500');
    expect(bar).toHaveClass('h-3');
  });
});
