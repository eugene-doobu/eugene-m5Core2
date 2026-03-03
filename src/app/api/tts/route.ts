import { NextRequest, NextResponse } from 'next/server';
import { AZURE_DEFAULT_REGION, TTS_TEXT_MAX_LENGTH, TTS_CACHE_MAX_AGE } from '@/lib/constants';

const AZURE_TTS_KEY = process.env.AZURE_TTS_KEY;
const AZURE_TTS_REGION = process.env.AZURE_TTS_REGION || AZURE_DEFAULT_REGION;

export async function GET() {
  return NextResponse.json({ available: !!AZURE_TTS_KEY });
}

const VOICE_MAP: Record<string, string> = {
  'en-US': 'en-US-JennyNeural',
  'en-GB': 'en-GB-SoniaNeural',
  'ko-KR': 'ko-KR-SunHiNeural',
};

const OUTPUT_FORMAT = 'audio-24khz-48kbitrate-mono-opus';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function POST(request: NextRequest) {
  if (!AZURE_TTS_KEY) {
    return NextResponse.json(
      { error: 'TTS service not configured' },
      { status: 503 }
    );
  }

  try {
    const { text, lang = 'en-US' } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "text" parameter' },
        { status: 400 }
      );
    }

    if (text.length > TTS_TEXT_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Text too long (max ${TTS_TEXT_MAX_LENGTH} characters)` },
        { status: 400 }
      );
    }

    const voice = VOICE_MAP[lang] || VOICE_MAP['en-US'];
    const ssml = `<speak version='1.0' xml:lang='${lang}'><voice name='${voice}'>${escapeXml(text)}</voice></speak>`;

    const endpoint = `https://${AZURE_TTS_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TTS_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': OUTPUT_FORMAT,
      },
      body: ssml,
    });

    if (!response.ok) {
      console.error(`Azure TTS error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: 'TTS synthesis failed' },
        { status: 502 }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/opus',
        'Cache-Control': `public, max-age=${TTS_CACHE_MAX_AGE}, immutable`,
      },
    });
  } catch (error) {
    console.error('TTS route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
