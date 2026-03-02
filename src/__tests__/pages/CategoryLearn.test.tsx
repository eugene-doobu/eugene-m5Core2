import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LevelLearnPage from '@/app/learn/[wordbook]/[level]/page';

jest.mock('@/hooks/useTTS', () => ({
  useTTS: () => ({ speak: jest.fn(), stop: jest.fn(), isAvailable: false }),
}));

const mockNotFound = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ wordbook: 'frequency-english', level: 'level-1' }),
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
      ],
    },
  ],
  getWordbookLevels: (wordbookId: string) => {
    if (wordbookId === 'frequency-english') {
      return [
        { id: 'level-1', name: 'Level 1', nameKo: 'Lv.1 입문', description: '기본 단어', icon: '🌱' },
      ];
    }
    return [];
  },
  getWordsByLevel: (wordbookId: string, levelId: string) => {
    if (wordbookId === 'frequency-english' && levelId === 'level-1') {
      return [
        {
          id: 'lv1-001',
          word: 'apple',
          pronunciation: '/ˈæpəl/',
          partOfSpeech: '명사',
          meaning: '사과',
          exampleEn: 'I eat an apple.',
          exampleKo: '나는 사과를 먹는다.',
        },
        {
          id: 'lv1-002',
          word: 'book',
          pronunciation: '/bʊk/',
          partOfSpeech: '명사',
          meaning: '책',
          exampleEn: 'Read a book.',
          exampleKo: '책을 읽어라.',
        },
        {
          id: 'lv1-003',
          word: 'cat',
          pronunciation: '/kæt/',
          partOfSpeech: '명사',
          meaning: '고양이',
          exampleEn: 'The cat is sleeping.',
          exampleKo: '고양이가 자고 있다.',
        },
      ];
    }
    return [];
  },
}));

// Mock SpeechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: { speak: jest.fn(), cancel: jest.fn() },
});
global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
  text,
  lang: '',
  rate: 1,
  pitch: 1,
})) as unknown as typeof SpeechSynthesisUtterance;

describe('LevelLearn page', () => {
  const user = userEvent.setup();

  test('renders level title and word counter', () => {
    render(<LevelLearnPage />);
    expect(screen.getByText('Lv.1 입문')).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  test('renders first word card (front and back)', () => {
    render(<LevelLearnPage />);
    const wordElements = screen.getAllByText('apple');
    expect(wordElements).toHaveLength(2);
    expect(screen.getByText('/ˈæpəl/')).toBeInTheDocument();
  });

  test('renders progress bar', () => {
    render(<LevelLearnPage />);
    expect(screen.getByText('학습 진행률')).toBeInTheDocument();
  });

  test('renders back link to wordbook page', () => {
    render(<LevelLearnPage />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/learn/frequency-english');
  });

  test('prev button is disabled on first word', () => {
    render(<LevelLearnPage />);
    const prevButton = screen.getByText('이전');
    expect(prevButton).toBeDisabled();
  });

  test('next button navigates to second word', async () => {
    render(<LevelLearnPage />);
    const nextButton = screen.getByText('다음');

    await user.click(nextButton);

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    expect(screen.getAllByText('book')).toHaveLength(2);
  });

  test('prev button navigates back after going next', async () => {
    render(<LevelLearnPage />);

    await user.click(screen.getByText('다음'));
    expect(screen.getAllByText('book')).toHaveLength(2);

    await user.click(screen.getByText('이전'));
    expect(screen.getAllByText('apple')).toHaveLength(2);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  test('next button is disabled on last word', async () => {
    render(<LevelLearnPage />);

    await user.click(screen.getByText('다음'));
    await user.click(screen.getByText('다음'));

    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    expect(screen.getByText('다음')).toBeDisabled();
  });

  test('dot indicators match word count', () => {
    render(<LevelLearnPage />);
    const dots = screen.getAllByRole('button', { name: /단어 \d+/ });
    expect(dots).toHaveLength(3);
  });

  test('clicking dot navigates to that word', async () => {
    render(<LevelLearnPage />);
    const dot3 = screen.getByRole('button', { name: '단어 3' });

    await user.click(dot3);

    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    expect(screen.getAllByText('cat')).toHaveLength(2);
  });

  test('renders complete toggle button', () => {
    render(<LevelLearnPage />);
    expect(screen.getByText('학습 완료로 표시')).toBeInTheDocument();
  });
});

describe('LevelLearn page - invalid params', () => {
  beforeEach(() => {
    mockNotFound.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls notFound for invalid wordbook/level', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const navigation = require('next/navigation');
    jest.spyOn(navigation, 'useParams').mockReturnValue({
      wordbook: 'nonexistent',
      level: 'level-1',
    });

    try {
      render(<LevelLearnPage />);
    } catch {
      // React may re-throw the error from notFound
    }

    expect(mockNotFound).toHaveBeenCalled();
  });
});
