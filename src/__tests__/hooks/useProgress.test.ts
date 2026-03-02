import { renderHook, act } from '@testing-library/react';
import { useProgress } from '@/hooks/useProgress';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useProgress', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('returns empty progress initially', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.completedWords).toEqual([]);
    expect(result.current.progress.lastStudied).toBeNull();
  });

  test('toggleWord adds word to completed list', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('lv1-001');
    });

    expect(result.current.progress.completedWords).toContain('lv1-001');
    expect(result.current.isCompleted('lv1-001')).toBe(true);
  });

  test('toggleWord removes word if already completed', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('lv1-001');
    });
    expect(result.current.isCompleted('lv1-001')).toBe(true);

    act(() => {
      result.current.toggleWord('lv1-001');
    });
    expect(result.current.isCompleted('lv1-001')).toBe(false);
  });

  test('isCompleted returns false for uncompleted words', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.isCompleted('lv1-999')).toBe(false);
  });

  test('getProgressRate calculates correct percentage', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('a');
      result.current.toggleWord('b');
    });

    const rate = result.current.getProgressRate(['a', 'b', 'c', 'd']);
    expect(rate).toBe(50);
  });

  test('getProgressRate returns 0 for empty word list', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.getProgressRate([])).toBe(0);
  });

  test('getProgressRate returns 100 when all completed', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('x');
      result.current.toggleWord('y');
    });

    expect(result.current.getProgressRate(['x', 'y'])).toBe(100);
  });

  test('persists progress to localStorage', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('lv1-001');
    });

    const stored = JSON.parse(
      localStorageMock.getItem('english-study-progress')!
    );
    expect(stored.completedWords).toContain('lv1-001');
  });

  test('toggleWord updates lastStudied timestamp', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.toggleWord('lv1-001');
    });

    expect(result.current.progress.lastStudied).toBeTruthy();
  });
});
