/**
 * PC 웹 브라우저인지 판별. TTS 오디오 캐싱 활성화 여부 결정에 사용.
 */
export function isDesktopBrowser(): boolean {
  if (typeof window === 'undefined') return false;

  const wideScreen = window.innerWidth >= 1024;
  if (!wideScreen) return false;

  if (navigator.maxTouchPoints === 0) return true;

  // 터치스크린 노트북 대응: 넓은 화면 + 데스크톱 UA
  const ua = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'mobile'];
  return !mobileKeywords.some((kw) => ua.includes(kw));
}
