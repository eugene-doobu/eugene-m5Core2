import { render, screen } from '@testing-library/react';
import LearnPage from '@/app/learn/page';

jest.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/lib/config', () => ({
  appConfig: {
    app: {
      nav: { learn: '학습하기' },
    },
  },
}));

jest.mock('@/data', () => ({
  wordbooks: [
    {
      id: 'frequency-english',
      name: 'Frequency English',
      nameKo: '빈도순 영단어',
      description: '가장 많이 쓰이는 단어부터 차근차근 배우세요.',
      icon: '📊',
      levels: [],
    },
    {
      id: 'toeic-vocab',
      name: 'TOEIC Vocabulary',
      nameKo: 'TOEIC 필수 단어',
      description: 'TOEIC 시험 대비 핵심 단어.',
      icon: '📝',
      levels: [],
    },
  ],
  getAllWordsForWordbook: (id: string) => {
    if (id === 'frequency-english') return [{ id: 'w1' }, { id: 'w2' }];
    if (id === 'toeic-vocab') return [{ id: 'w3' }];
    return [];
  },
  allWords: [{ id: 'w1' }, { id: 'w2' }, { id: 'w3' }],
}));

describe('Learn page (wordbook selection)', () => {
  test('renders page title', () => {
    render(<LearnPage />);
    expect(screen.getByText('학습하기')).toBeInTheDocument();
  });

  test('renders all wordbook cards', () => {
    render(<LearnPage />);
    expect(screen.getByText('빈도순 영단어')).toBeInTheDocument();
    expect(screen.getByText('TOEIC 필수 단어')).toBeInTheDocument();
  });

  test('renders total progress bar', () => {
    render(<LearnPage />);
    expect(screen.getByText('전체 진행률')).toBeInTheDocument();
  });

  test('each wordbook links to correct path', () => {
    render(<LearnPage />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/learn/frequency-english');
    expect(hrefs).toContain('/learn/toeic-vocab');
  });
});
