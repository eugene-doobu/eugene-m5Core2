# Salvador - 나만의 영어 단어장

Fork하고, 단어 데이터를 교체하고, 배포하세요.
코드 수정 없이 누구나 자기만의 영어 단어 학습 사이트를 만들 수 있습니다.

## Quick Start

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

---

## 나만의 단어장 만들기 (3단계)

> **수정하는 파일은 딱 2종류:** `wordbook.config.json` + `src/data/` 안의 JSON 파일.
> 소스코드(`.tsx`, `.ts`)는 **절대 수정할 필요 없습니다.**

### Step 1. 이 저장소를 Fork

GitHub에서 **Fork** 버튼을 클릭하고, 로컬에 clone합니다:

```bash
git clone https://github.com/{내-아이디}/salvador.git
cd salvador
npm install
```

### Step 2. 단어집 설정 + 데이터 추가

#### 2-1. `wordbook.config.json` 편집

`wordbooks` 배열에 나만의 단어집을 추가합니다. 기존 `frequency-english`를 삭제하거나 그대로 두고 추가해도 됩니다.

```json
{
  "app": {
    "title": "내 사이트 이름",
    "description": "사이트 설명",
    "logo": "ABC",
    "heroTitle": "메인 페이지\n큰 제목",
    "heroHighlight": "큰 제목",
    "heroDescription": "메인 페이지 설명 텍스트",
    "startButtonText": "학습 시작하기",
    "features": [
      { "icon": "📊", "title": "기능1", "description": "기능1 설명" },
      { "icon": "🔊", "title": "기능2", "description": "기능2 설명" },
      { "icon": "📝", "title": "기능3", "description": "기능3 설명" }
    ],
    "nav": { "home": "홈", "learn": "학습하기" },
    "lang": "ko"
  },
  "wordbooks": [
    {
      "id": "travel-english",
      "name": "Travel English",
      "nameKo": "여행 영어",
      "description": "여행에서 꼭 필요한 핵심 단어",
      "icon": "✈️",
      "levels": [
        {
          "id": "airport",
          "name": "Airport",
          "nameKo": "공항",
          "description": "공항에서 쓰는 단어 20개",
          "icon": "🛫"
        },
        {
          "id": "hotel",
          "name": "Hotel",
          "nameKo": "호텔",
          "description": "호텔에서 쓰는 단어 15개",
          "icon": "🏨"
        }
      ]
    }
  ]
}
```

**핵심 규칙:**
- 단어집 `id`는 **영문 소문자 + 하이픈** (예: `travel-english`)
- 레벨 `id`도 **영문 소문자 + 하이픈** (예: `airport`, `level-1`)
- 이 ID들이 URL과 파일명에 그대로 사용됩니다

#### 2-2. 단어 데이터 JSON 파일 생성

`src/data/` 아래에 **단어집 ID와 동일한 이름의 디렉토리**를 만들고, 그 안에 **`words-{레벨ID}.json`** 파일을 넣습니다.

```
src/data/
  travel-english/          ← 단어집 ID = "travel-english"
    words-airport.json     ← 레벨 ID = "airport"
    words-hotel.json       ← 레벨 ID = "hotel"
```

각 JSON 파일은 단어 배열입니다:

```json
[
  {
    "id": "travel-english-airport-001",
    "word": "passport",
    "pronunciation": "/ˈpæspɔːrt/",
    "partOfSpeech": "명사",
    "meaning": "여권",
    "exampleEn": "Don't forget your passport.",
    "exampleKo": "여권 잊지 마세요."
  },
  {
    "id": "travel-english-airport-002",
    "word": "boarding pass",
    "pronunciation": "/ˈbɔːrdɪŋ pæs/",
    "partOfSpeech": "명사",
    "meaning": "탑승권",
    "exampleEn": "Here is my boarding pass.",
    "exampleKo": "제 탑승권입니다."
  }
]
```

**단어 필드 설명:**

| 필드 | 필수 | 설명 | 예시 |
|---|---|---|---|
| `id` | O | 전체에서 유니크한 ID. `{단어집}-{레벨}-{번호}` 형식 권장 | `"travel-english-airport-001"` |
| `word` | O | 영어 단어 | `"passport"` |
| `pronunciation` | O | IPA 발음기호 (`/`로 감싸기) | `"/ˈpæspɔːrt/"` |
| `partOfSpeech` | O | 품사 (한글) | `"명사"` |
| `meaning` | O | 한글 뜻 | `"여권"` |
| `exampleEn` | O | 영어 예문 | `"Don't forget your passport."` |
| `exampleKo` | O | 한글 번역 | `"여권 잊지 마세요."` |

#### 2-3. 로컬 확인

```bash
npm run dev
```

브라우저에서 `/learn` → 내 단어집 클릭 → 레벨 클릭 → 카드 학습이 되면 성공입니다.

### Step 3. Vercel에 배포

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 로그인
2. **New Project** → Fork한 저장소 선택
3. **Deploy** 클릭

배포 완료 후 `https://{프로젝트명}.vercel.app`에서 확인할 수 있습니다.
이후 GitHub에 push하면 자동으로 재배포됩니다.

---

## AI로 단어 추가하기

Claude Code의 내장 명령어로 단어를 자동 생성할 수 있습니다:

```
/add-words 여행 관련 단어 30개 추가
/add-words TOEIC 빈출 단어 50개
```

---

## 체크리스트

배포 전에 확인하세요:

- [ ] 단어집 `id`와 `src/data/` 디렉토리명이 일치하는가?
- [ ] 레벨 `id`와 `words-{레벨ID}.json` 파일명이 일치하는가?
- [ ] 단어 `id`가 전체에서 중복되지 않는가?
- [ ] 모든 단어에 7개 필드가 빠짐없이 있는가?
- [ ] `npm run build`가 에러 없이 통과하는가?

---

## 프로젝트 구조

```
wordbook.config.json               ← 유일한 설정 파일
src/
  data/
    frequency-english/              ← 단어집 디렉토리 (ID와 동일)
      words-level-1.json            ← 레벨별 단어 데이터
      words-level-2.json
    index.ts                        ← 자동 로딩 (수정 불필요)
  app/
    page.tsx                        ← 홈
    learn/
      page.tsx                      ← 단어집 선택
      [wordbook]/page.tsx           ← 레벨 선택
      [wordbook]/[level]/page.tsx   ← 카드 학습
  components/                       ← UI 컴포넌트 (수정 불필요)
  hooks/                            ← 진행도, TTS (수정 불필요)
```

## 기술 스택

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Jest + React Testing Library

## 개발

```bash
npm run dev          # 개발 서버
npm test             # 테스트
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
```
