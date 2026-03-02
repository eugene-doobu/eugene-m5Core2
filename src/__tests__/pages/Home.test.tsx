import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/lib/config', () => ({
  appConfig: {
    app: {
      heroTitle: '영어단어,\n빈도순으로 배우자',
      heroHighlight: '빈도순',
      heroDescription:
        '가장 많이 쓰이는 단어부터 차근차근.\n카드 플립으로 재미있게 학습하세요.',
      startButtonText: '학습 시작하기',
      features: [
        {
          icon: '📊',
          title: '빈도순 학습',
          description: '영어에서 가장 자주 쓰이는 단어부터 순서대로 학습합니다.',
        },
        {
          icon: '🔊',
          title: '원어민 발음',
          description:
            'TTS로 단어와 예문의 원어민 발음을 바로 들어볼 수 있습니다.',
        },
        {
          icon: '📝',
          title: '진행도 추적',
          description:
            '학습 완료한 단어를 체크하고 진행률을 한눈에 확인하세요.',
        },
      ],
    },
  },
}));

describe('Home page', () => {
  test('renders hero title', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/영어단어/);
    expect(heading).toHaveTextContent(/빈도순/);
  });

  test('renders description', () => {
    render(<Home />);
    expect(
      screen.getByText(/가장 많이 쓰이는 단어부터 차근차근/)
    ).toBeInTheDocument();
  });

  test('renders start learning button', () => {
    render(<Home />);
    const button = screen.getByText('학습 시작하기');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/learn');
  });

  test('renders three feature cards', () => {
    render(<Home />);
    expect(screen.getByText('빈도순 학습')).toBeInTheDocument();
    expect(screen.getByText('원어민 발음')).toBeInTheDocument();
    expect(screen.getByText('진행도 추적')).toBeInTheDocument();
  });
});
