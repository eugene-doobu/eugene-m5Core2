import { render, screen } from '@testing-library/react';
import LearnPage from '@/app/learn/page';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Learn page', () => {
  test('renders page title', () => {
    render(<LearnPage />);
    expect(screen.getByText('학습하기')).toBeInTheDocument();
  });

  test('renders all 4 level cards', () => {
    render(<LearnPage />);
    expect(screen.getByText('Lv.1 입문')).toBeInTheDocument();
    expect(screen.getByText('Lv.2 초급')).toBeInTheDocument();
    expect(screen.getByText('Lv.3 중급')).toBeInTheDocument();
    expect(screen.getByText('Lv.4 중고급')).toBeInTheDocument();
  });

  test('renders total progress bar', () => {
    render(<LearnPage />);
    expect(screen.getByText('전체 진행률')).toBeInTheDocument();
  });

  test('each level links to correct path', () => {
    render(<LearnPage />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/learn/level-1');
    expect(hrefs).toContain('/learn/level-2');
    expect(hrefs).toContain('/learn/level-3');
    expect(hrefs).toContain('/learn/level-4');
  });
});
