import { isDesktopBrowser } from './device-detect';

const CACHE_NAME = 'salvador-tts-audio-v1';

function getCacheKey(text: string, lang: string): string {
  let hash = 5381;
  const input = `${lang}:${text}`;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) & 0xffffffff;
  }
  return `/_tts_cache/${lang}/${(hash >>> 0).toString(16)}.opus`;
}

export function isCacheEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    'caches' in window &&
    isDesktopBrowser()
  );
}

export async function getCachedAudio(
  text: string,
  lang: string
): Promise<ArrayBuffer | null> {
  if (!isCacheEnabled()) return null;

  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(getCacheKey(text, lang));
    if (response) {
      return await response.arrayBuffer();
    }
  } catch {
    // non-fatal
  }
  return null;
}

export async function setCachedAudio(
  text: string,
  lang: string,
  audioData: ArrayBuffer,
  contentType: string = 'audio/opus'
): Promise<void> {
  if (!isCacheEnabled()) return;

  try {
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(audioData, {
      headers: { 'Content-Type': contentType },
    });
    await cache.put(getCacheKey(text, lang), response);
  } catch {
    // non-fatal
  }
}

export async function clearAudioCache(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    await caches.delete(CACHE_NAME);
  } catch {
    // non-fatal
  }
}
