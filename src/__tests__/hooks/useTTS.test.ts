import { renderHook, act, waitFor } from '@testing-library/react';
import { useTTS, _resetTTSCache } from '@/hooks/useTTS';
import * as azureTts from '@/lib/tts/azure-tts';
import * as audioCache from '@/lib/tts/audio-cache';

// Mock modules
jest.mock('@/lib/tts/azure-tts');
jest.mock('@/lib/tts/audio-cache');

const mockAzureSpeak = azureTts.azureSpeak as jest.MockedFunction<
  typeof azureTts.azureSpeak
>;
const mockGetCachedAudio = audioCache.getCachedAudio as jest.MockedFunction<
  typeof audioCache.getCachedAudio
>;
const mockSetCachedAudio = audioCache.setCachedAudio as jest.MockedFunction<
  typeof audioCache.setCachedAudio
>;

// Mock Audio element
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();
const mockAudioInstance = {
  play: mockPlay,
  pause: mockPause,
  currentTime: 0,
  onended: null as (() => void) | null,
  onerror: null as (() => void) | null,
};

global.Audio = jest.fn(() => mockAudioInstance) as unknown as typeof Audio;
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock fetch for /api/tts availability check
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useTTS', () => {
  const mockAudioBuffer = new ArrayBuffer(8);

  beforeEach(() => {
    jest.clearAllMocks();
    _resetTTSCache();
    mockGetCachedAudio.mockResolvedValue(null);
    mockSetCachedAudio.mockResolvedValue(undefined);
    mockAudioInstance.onended = null;
    mockAudioInstance.onerror = null;
    mockAudioInstance.currentTime = 0;
    // Default: TTS available
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ available: true }),
      arrayBuffer: () => Promise.resolve(mockAudioBuffer),
      headers: new Headers({ 'Content-Type': 'audio/opus' }),
    });
  });

  test('isAvailable is true when API reports available', async () => {
    const { result } = renderHook(() => useTTS());

    await waitFor(() => {
      expect(result.current.isAvailable).toBe(true);
    });
  });

  test('isAvailable is false when API reports unavailable', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ available: false }),
    });

    const { result } = renderHook(() => useTTS());

    await waitFor(() => {
      expect(result.current.isAvailable).toBe(false);
    });
  });

  test('uses Azure TTS and plays audio on success', async () => {
    mockAzureSpeak.mockResolvedValue({
      audio: mockAudioBuffer,
      contentType: 'audio/opus',
    });

    const { result } = renderHook(() => useTTS());
    await waitFor(() => expect(result.current.isAvailable).toBe(true));

    await act(async () => {
      await result.current.speak('hello');
    });

    expect(mockAzureSpeak).toHaveBeenCalledWith('hello', 'en-US');
    expect(global.Audio).toHaveBeenCalled();
    expect(mockPlay).toHaveBeenCalled();
  });

  test('caches audio after successful Azure TTS', async () => {
    mockAzureSpeak.mockResolvedValue({
      audio: mockAudioBuffer,
      contentType: 'audio/opus',
    });

    const { result } = renderHook(() => useTTS());
    await waitFor(() => expect(result.current.isAvailable).toBe(true));

    await act(async () => {
      await result.current.speak('test');
    });

    expect(mockSetCachedAudio).toHaveBeenCalledWith(
      'test',
      'en-US',
      mockAudioBuffer,
      'audio/opus'
    );
  });

  test('plays from cache when available (skips Azure)', async () => {
    mockGetCachedAudio.mockResolvedValue(mockAudioBuffer);

    const { result } = renderHook(() => useTTS());
    await waitFor(() => expect(result.current.isAvailable).toBe(true));

    await act(async () => {
      await result.current.speak('cached-word');
    });

    expect(mockGetCachedAudio).toHaveBeenCalledWith('cached-word', 'en-US');
    expect(mockAzureSpeak).not.toHaveBeenCalled();
    expect(mockPlay).toHaveBeenCalled();
  });

  test('does nothing when Azure fails (no browser fallback)', async () => {
    mockAzureSpeak.mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useTTS());
    await waitFor(() => expect(result.current.isAvailable).toBe(true));

    await act(async () => {
      await result.current.speak('fail-word');
    });

    expect(mockPlay).not.toHaveBeenCalled();
  });

  test('does not call Azure when isAvailable is false', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ available: false }),
    });

    const { result } = renderHook(() => useTTS());
    await waitFor(() => expect(result.current.isAvailable).toBe(false));

    await act(async () => {
      await result.current.speak('no-key');
    });

    expect(mockAzureSpeak).not.toHaveBeenCalled();
  });

  test('stop pauses audio element', async () => {
    const { result } = renderHook(() => useTTS());

    act(() => {
      result.current.stop();
    });

    // stop should be callable without error even with no active audio
    expect(mockPause).not.toHaveBeenCalled(); // no audio playing
  });
});
