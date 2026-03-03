import type { TTSResult } from './types';
import { TTS_API_ENDPOINT } from '@/lib/constants';

export async function azureSpeak(
  text: string,
  lang: string = 'en-US'
): Promise<TTSResult> {
  const response = await fetch(TTS_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
  });

  if (!response.ok) {
    throw new Error(`TTS API error: ${response.status}`);
  }

  const audio = await response.arrayBuffer();
  const contentType = response.headers.get('Content-Type') || 'audio/opus';

  return { audio, contentType };
}
