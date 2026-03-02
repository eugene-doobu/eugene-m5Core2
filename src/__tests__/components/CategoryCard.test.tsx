import { render, screen } from '@testing-library/react';
import CategoryCard from '@/components/CategoryCard';

jest.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('CategoryCard', () => {
  const defaultProps = {
    wordbookId: 'frequency-english',
    id: 'level-1',
    nameKo: 'Lv.1 입문',
    description: '가장 기본이 되는 필수 단어 68개',
    icon: '\u{1F331}',
    wordCount: 68,
    progressRate: 25,
  };

  test('renders level name', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText('Lv.1 입문')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(
      screen.getByText('가장 기본이 되는 필수 단어 68개')
    ).toBeInTheDocument();
  });

  test('renders word count', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText('단어 68개')).toBeInTheDocument();
  });

  test('renders progress rate', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('links to correct learn page', () => {
    render(<CategoryCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/learn/frequency-english/level-1');
  });

  test('renders icon', () => {
    render(<CategoryCard {...defaultProps} />);
    expect(screen.getByText('\u{1F331}')).toBeInTheDocument();
  });
});
