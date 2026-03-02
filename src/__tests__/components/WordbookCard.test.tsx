import { render, screen } from '@testing-library/react';
import WordbookCard from '@/components/WordbookCard';

jest.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('WordbookCard', () => {
  const defaultProps = {
    id: 'frequency-english',
    nameKo: '빈도순 영단어',
    description: '가장 많이 쓰이는 단어부터 차근차근 배우세요.',
    icon: '📊',
    totalWordCount: 270,
    progressRate: 30,
  };

  test('renders wordbook name', () => {
    render(<WordbookCard {...defaultProps} />);
    expect(screen.getByText('빈도순 영단어')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<WordbookCard {...defaultProps} />);
    expect(
      screen.getByText('가장 많이 쓰이는 단어부터 차근차근 배우세요.')
    ).toBeInTheDocument();
  });

  test('renders word count', () => {
    render(<WordbookCard {...defaultProps} />);
    expect(screen.getByText('단어 270개')).toBeInTheDocument();
  });

  test('renders progress rate', () => {
    render(<WordbookCard {...defaultProps} />);
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  test('links to correct wordbook page', () => {
    render(<WordbookCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/learn/frequency-english');
  });

  test('renders icon', () => {
    render(<WordbookCard {...defaultProps} />);
    expect(screen.getByText('📊')).toBeInTheDocument();
  });
});
