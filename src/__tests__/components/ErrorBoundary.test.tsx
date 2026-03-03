import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

function ProblemChild() {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>정상 콘텐츠</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('정상 콘텐츠')).toBeInTheDocument();
  });

  test('renders fallback UI on error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByText(/예상치 못한 오류/)).toBeInTheDocument();
  });

  test('renders clickable reload button on error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const button = screen.getByText('새로고침');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });
});
