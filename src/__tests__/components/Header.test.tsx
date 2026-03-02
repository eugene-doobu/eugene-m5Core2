import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

jest.mock('next/link', () => {
  function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/lib/config', () => ({
  appConfig: {
    app: {
      logo: 'ABC',
      title: '영어단어 학습',
      nav: {
        home: '홈',
        learn: '학습하기',
      },
    },
  },
}));

describe('Header', () => {
  beforeEach(() => {
    mockPathname = '/';
  });

  test('renders logo', () => {
    render(<Header />);
    expect(screen.getByText('ABC')).toBeInTheDocument();
  });

  test('renders app title', () => {
    render(<Header />);
    expect(screen.getByText('영어단어 학습')).toBeInTheDocument();
  });

  test('renders nav links', () => {
    render(<Header />);
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('학습하기')).toBeInTheDocument();
  });

  test('logo links to home', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    expect(homeLink).toBeDefined();
  });

  test('learn link points to /learn', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    const learnLink = links.find((l) => l.getAttribute('href') === '/learn');
    expect(learnLink).toBeDefined();
  });

  test('home link is active on home page', () => {
    mockPathname = '/';
    render(<Header />);
    const homeLink = screen.getByText('홈');
    expect(homeLink).toHaveClass('text-blue-500');
  });

  test('learn link is active on learn pages', () => {
    mockPathname = '/learn';
    render(<Header />);
    const learnLink = screen.getByText('학습하기');
    expect(learnLink).toHaveClass('text-blue-500');
  });

  test('learn link is active on nested learn pages', () => {
    mockPathname = '/learn/level-1';
    render(<Header />);
    const learnLink = screen.getByText('학습하기');
    expect(learnLink).toHaveClass('text-blue-500');
  });

  test('home link is not active on learn page', () => {
    mockPathname = '/learn';
    render(<Header />);
    const homeLink = screen.getByText('홈');
    expect(homeLink).not.toHaveClass('text-blue-500');
  });
});
