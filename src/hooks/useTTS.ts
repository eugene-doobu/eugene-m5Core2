'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { azureSpeak } from '@/lib/tts/azure-tts';
import { getCachedAudio, setCachedAudio } from '@/lib/tts/audio-cache';
import { TTS_API_ENDPOINT } from '@/lib/constants';

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

let cachedAvailability: boolean | null = null;

/** @internal 테스트 전용 — 모듈 캐시 초기화 */
export function _resetTTSCache() {
  cachedAvailability = null;
}

export function useTTS() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (cachedAvailability !== null) {
      setIsAvailable(cachedAvailability);
      return;
    }
    fetch(TTS_API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        cachedAvailability = data.available === true;
        setIsAvailable(cachedAvailability);
      })
      .catch(() => {
        cachedAvailability = false;
        setIsAvailable(false);
      });
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
      } catch (err) {
        console.warn('[TTS] Speech synthesis failed:', err);
      }
    },
    [isAvailable, stop]
  );

  return { speak, stop, isAvailable };
}
