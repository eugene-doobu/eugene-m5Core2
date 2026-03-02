import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  test('renders hero title', () => {
    render(<Home />);
    // h1 contains text split by <br> and <span>
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
