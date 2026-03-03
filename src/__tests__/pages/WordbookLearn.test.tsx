import { render, screen, waitFor } from '@testing-library/react';
import WordbookLearnPage from '@/app/learn/[wordbook]/page';

const mockNotFound = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ wordbook: 'frequency-english' }),
  notFound: () => {
    mockNotFound();
    throw new Error('NEXT_NOT_FOUND');
  },
}));

jest.mock('next/link', () => {
  function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  }
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/data', () => ({
  wordbooks: [
    {
      id: 'frequency-english',
      name: 'Frequency English',
      nameKo: '빈도순 영단어',
      description: '가장 많이 쓰이는 단어부터 차근차근 배우세요.',
      icon: '📊',
      levels: [
        { id: 'level-1', name: 'Level 1', nameKo: 'Lv.1 입문', description: '기본 단어', icon: '🌱' },
        { id: 'level-2', name: 'Level 2', nameKo: 'Lv.2 초급', description: '초급 단어', icon: '🌿' },
      ],
    },
  ],
  getWordbookLevels: (wordbookId: string) => {
    if (wordbookId === 'frequency-english') {
      return [
        { id: 'level-1', name: 'Level 1', nameKo: 'Lv.1 입문', description: '기본 단어', icon: '🌱' },
        { id: 'level-2', name: 'Level 2', nameKo: 'Lv.2 초급', description: '초급 단어', icon: '🌿' },
      ];
    }
    return [];
  },
  getWordsByLevel: async (wordbookId: string, levelId: string) => {
    if (wordbookId === 'frequency-english' && levelId === 'level-1') {
      return [{ id: 'lv1-001', word: 'test' }];
    }
    if (wordbookId === 'frequency-english' && levelId === 'level-2') {
      return [{ id: 'lv2-001', word: 'hello' }];
    }
    return [];
  },
}));

describe('WordbookLearn page (level selection)', () => {
  test('renders wordbook title', async () => {
    render(<WordbookLearnPage />);
    expect(screen.getByText('빈도순 영단어')).toBeInTheDocument();
  });

  test('renders all level cards', async () => {
    render(<WordbookLearnPage />);
    await waitFor(() => {
      expect(screen.getByText('Lv.1 입문')).toBeInTheDocument();
      expect(screen.getByText('Lv.2 초급')).toBeInTheDocument();
    });
  });

  test('renders total progress bar', async () => {
    render(<WordbookLearnPage />);
    expect(screen.getByText('전체 진행률')).toBeInTheDocument();
  });

  test('each level links to correct path', async () => {
    render(<WordbookLearnPage />);
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      const hrefs = links.map((l) => l.getAttribute('href'));
      expect(hrefs).toContain('/learn/frequency-english/level-1');
      expect(hrefs).toContain('/learn/frequency-english/level-2');
    });
  });

  test('back link points to /learn', async () => {
    render(<WordbookLearnPage />);
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      const hrefs = links.map((l) => l.getAttribute('href'));
      expect(hrefs).toContain('/learn');
    });
  });
});

describe('WordbookLearn page - invalid wordbook', () => {
  beforeEach(() => {
    mockNotFound.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls notFound for invalid wordbook', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const navigation = require('next/navigation');
    jest.spyOn(navigation, 'useParams').mockReturnValue({
      wordbook: 'nonexistent',
    });

    try {
      render(<WordbookLearnPage />);
    } catch {
      // React may re-throw the error from notFound
    }

    expect(mockNotFound).toHaveBeenCalled();
  });
});
