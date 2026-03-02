import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          영어단어,
          <br />
          <span className="text-blue-500">빈도순</span>으로 배우자
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          가장 많이 쓰이는 단어부터 차근차근.
          <br />
          카드 플립으로 재미있게 학습하세요.
        </p>
        <Link
          href="/learn"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-blue-500/25"
        >
          학습 시작하기
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-3">&#x1F4CA;</div>
          <h3 className="font-bold text-slate-800 mb-2">빈도순 학습</h3>
          <p className="text-sm text-slate-500">
            영어에서 가장 자주 쓰이는 단어부터 순서대로 학습합니다.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-3">&#x1F50A;</div>
          <h3 className="font-bold text-slate-800 mb-2">원어민 발음</h3>
          <p className="text-sm text-slate-500">
            TTS로 단어와 예문의 원어민 발음을 바로 들어볼 수 있습니다.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-3">&#x1F4DD;</div>
          <h3 className="font-bold text-slate-800 mb-2">진행도 추적</h3>
          <p className="text-sm text-slate-500">
            학습 완료한 단어를 체크하고 진행률을 한눈에 확인하세요.
          </p>
        </div>
      </section>
    </div>
  );
}
