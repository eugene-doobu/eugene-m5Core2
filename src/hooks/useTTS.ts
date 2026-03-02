'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { azureSpeak } from '@/lib/tts/azure-tts';
import { getCachedAudio, setCachedAudio } from '@/lib/tts/audio-cache';

function playAudioBuffer(
  buffer: ArrayBuffer,
  contentType: string,
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
): void {
  const blob = new Blob([buffer], { type: contentType });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audioRef.current = audio;

  const cleanup = () => {
    URL.revokeObjectURL(url);
    if (audioRef.current === audio) {
      audioRef.current = null;
    }
  };

  audio.onended = cleanup;
  audio.onerror = cleanup;

  audio.play().catch(cleanup);
}

export function useTTS() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    fetch('/api/tts')
      .then((res) => res.json())
      .then((data) => setIsAvailable(data.available === true))
      .catch(() => setIsAvailable(false));
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const speak = useCallback(
    async (text: string, lang: string = 'en-US') => {
      if (!isAvailable) return;
      stop();

      try {
        // 1. 캐시 확인
        const cached = await getCachedAudio(text, lang);
        if (cached) {
          playAudioBuffer(cached, 'audio/opus', audioRef);
          return;
        }

        // 2. Azure TTS
        const result = await azureSpeak(text, lang);
        playAudioBuffer(result.audio, result.contentType, audioRef);

        // 3. 캐시 저장 (fire-and-forget)
        setCachedAudio(text, lang, result.audio, result.contentType);
      } catch {
        // Azure 실패 시 조용히 무시
      }
    },
    [isAvailable, stop]
  );

  return { speak, stop, isAvailable };
}
