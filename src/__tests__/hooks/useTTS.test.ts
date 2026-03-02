import { renderHook, act } from '@testing-library/react';
import { useTTS } from '@/hooks/useTTS';

// Mock SpeechSynthesis API
const mockSpeak = jest.fn();
const mockCancel = jest.fn();

Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: mockSpeak,
    cancel: mockCancel,
  },
});

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = jest.fn().mockImplementation((text) => ({
  text,
  lang: '',
  rate: 1,
  pitch: 1,
})) as unknown as typeof SpeechSynthesisUtterance;

describe('useTTS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('speak calls speechSynthesis.speak', () => {
    const { result } = renderHook(() => useTTS());

    act(() => {
      result.current.speak('hello');
    });

    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalledTimes(1);
  });

  test('speak creates utterance with correct text', () => {
    const { result } = renderHook(() => useTTS());

    act(() => {
      result.current.speak('test word');
    });

    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('test word');
  });

  test('stop cancels ongoing speech', () => {
    const { result } = renderHook(() => useTTS());

    act(() => {
      result.current.stop();
    });

    expect(mockCancel).toHaveBeenCalled();
  });

  test('speak cancels previous speech before starting new one', () => {
    const { result } = renderHook(() => useTTS());

    act(() => {
      result.current.speak('first');
      result.current.speak('second');
    });

    expect(mockCancel).toHaveBeenCalledTimes(2);
    expect(mockSpeak).toHaveBeenCalledTimes(2);
  });
});
