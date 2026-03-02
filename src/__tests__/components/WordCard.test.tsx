import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordCard from '@/components/WordCard';
import type { Word } from '@/types';

const mockWord: Word = {
  id: 'test-001',
  word: 'hello',
  pronunciation: '/həˈloʊ/',
  partOfSpeech: '감탄사',
  meaning: '안녕하세요',
  exampleEn: 'Hello, how are you?',
  exampleKo: '안녕하세요, 어떻게 지내세요?',
};

const mockSpeak = jest.fn();
const mockToggle = jest.fn();

describe('WordCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders word on both card faces', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    // word appears on both front and back
    const wordElements = screen.getAllByText('hello');
    expect(wordElements.length).toBe(2);
    expect(screen.getByText('/həˈloʊ/')).toBeInTheDocument();
  });

  test('shows part of speech', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    expect(screen.getAllByText('감탄사').length).toBeGreaterThanOrEqual(1);
  });

  test('calls onSpeak when audio button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );

    const speakButton = screen.getByLabelText('발음 듣기');
    await user.click(speakButton);
    expect(mockSpeak).toHaveBeenCalledWith('hello');
  });

  test('calls onToggleComplete when complete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );

    const completeButton = screen.getByText('학습 완료로 표시');
    await user.click(completeButton);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('shows "학습 완료" when isCompleted is true', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={true}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    expect(screen.getByText('학습 완료')).toBeInTheDocument();
  });

  test('shows "학습 완료로 표시" when isCompleted is false', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    expect(screen.getByText('학습 완료로 표시')).toBeInTheDocument();
  });

  test('meaning is rendered on the back face', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });

  test('example sentences are rendered', () => {
    render(
      <WordCard
        word={mockWord}
        isCompleted={false}
        onToggleComplete={mockToggle}
        onSpeak={mockSpeak}
      />
    );
    expect(
      screen.getByText(/Hello, how are you\?/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('안녕하세요, 어떻게 지내세요?')
    ).toBeInTheDocument();
  });
});
