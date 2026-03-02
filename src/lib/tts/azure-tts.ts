import type { TTSResult } from './types';

export async function azureSpeak(
  text: string,
  lang: string = 'en-US'
): Promise<TTSResult> {
  const response = await fetch('/api/tts', {
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
