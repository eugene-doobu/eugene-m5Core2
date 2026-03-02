#!/usr/bin/env python3
"""Fill TOEIC edge cases + business-L1 (144 words)"""
import json, glob

DICT15 = {
    # TOEIC edge cases
    "ma'am":         ("/mæm/", "명사", "마님, 여사", "Yes, ma'am.", "예, 마님."),
    "by-law":        ("/ˈbaɪlɔː/", "명사", "부칙, 규정", "Corporate by-law.", "회사 부칙."),

    # business-L1
    "non":           ("/nɒn/", "접두사", "비~, 아닌", "Non-profit organization.", "비영리 단체."),
    "maturity":      ("/məˈtʃʊərɪti/", "명사", "만기, 성숙", "Bond maturity date.", "채권 만기일."),
    "marginal":      ("/ˈmɑːrdʒɪnəl/", "형용사", "한계의, 미미한", "Marginal cost.", "한계 비용."),
    "variance":      ("/ˈvɛəriəns/", "명사", "분산, 차이", "Budget variance.", "예산 차이."),
    "depreciation":  ("/dɪˌpriːʃiˈeɪʃən/", "명사", "감가상각", "Asset depreciation.", "자산 감가상각."),
    "anti":          ("/ˈænti/", "접두사", "반~, 대항하는", "Anti-corruption measures.", "부패 방지 조치."),
    "entity":        ("/ˈɛntɪti/", "명사", "법인, 실체", "Legal entity.", "법적 실체."),
    "commodity":     ("/kəˈmɒdɪti/", "명사", "상품, 원자재", "Commodity price.", "상품 가격."),
    "monetary":      ("/ˈmɒnɪtəri/", "형용사", "금전의, 통화의", "Monetary policy.", "통화 정책."),
    "aggregate":     ("/ˈæɡrɪɡɪt/", "형용사", "집합적인, 총합의", "Aggregate demand.", "총수요."),
    "valuation":     ("/ˌvæljuˈeɪʃən/", "명사", "평가, 가치 평가", "Asset valuation.", "자산 평가."),
    "default":       ("/dɪˈfɔːlt/", "명사", "채무 불이행, 기본값", "Loan default.", "대출 채무 불이행."),
    "subsidiary":    ("/səbˈsɪdiəri/", "명사", "자회사", "Overseas subsidiary.", "해외 자회사."),
    "mid":           ("/mɪd/", "형용사", "중간의", "Mid-year review.", "중간 연도 검토."),
    "allocation":    ("/ˌæləˈkeɪʃən/", "명사", "할당, 배분", "Resource allocation.", "자원 배분."),
    "volatility":    ("/ˌvɒləˈtɪlɪti/", "명사", "변동성", "Market volatility.", "시장 변동성."),
    "deviation":     ("/ˌdiːviˈeɪʃən/", "명사", "편차, 이탈", "Standard deviation.", "표준 편차."),
    "receivable":    ("/rɪˈsiːvəbəl/", "명사", "미수금", "Accounts receivable.", "매출 채권."),
    "equilibrium":   ("/ˌiːkwɪˈlɪbriəm/", "명사", "균형", "Market equilibrium.", "시장 균형."),
    "pre":           ("/priː/", "접두사", "사전~, 이전의", "Pre-approval required.", "사전 승인이 필요합니다."),
    "creditor":      ("/ˈkrɛdɪtər/", "명사", "채권자", "Pay the creditors.", "채권자에게 갚으세요."),
    "derivative":    ("/dɪˈrɪvətɪv/", "명사", "파생 상품", "Financial derivative.", "금융 파생 상품."),
    "sub":           ("/sʌb/", "접두사", "하위~, 부~", "Submarine.", "잠수함."),
    "surplus":       ("/ˈsɜːrpləs/", "명사", "잉여, 흑자", "Trade surplus.", "무역 흑자."),
    "annuity":       ("/əˈnjuːɪti/", "명사", "연금", "Annuity payment.", "연금 지급."),
    "disclosure":    ("/dɪsˈkloʊʒər/", "명사", "공개, 폭로", "Financial disclosure.", "재무 공시."),
    "regime":        ("/reɪˈʒiːm/", "명사", "정권, 체제", "Under a new regime.", "새로운 체제 하에서."),
    "risky":         ("/ˈrɪski/", "형용사", "위험한", "Risky investment.", "위험한 투자."),
    "leverage":      ("/ˈlɛvərɪdʒ/", "명사", "레버리지, 영향력", "Financial leverage.", "재무 레버리지."),
    "parliament":    ("/ˈpɑːrləmənt/", "명사", "의회", "Parliament voted.", "의회가 투표했다."),
    "coalition":     ("/ˌkoʊəˈlɪʃən/", "명사", "연합, 연립", "Coalition government.", "연립 정부."),
    "beta":          ("/ˈbeɪtə/", "명사", "베타, 변동 계수", "Beta coefficient.", "베타 계수."),
    "lender":        ("/ˈlɛndər/", "명사", "대출자, 채권자", "Mortgage lender.", "주택 대출 기관."),
    "gross":         ("/ɡroʊs/", "형용사", "총, 전체의", "Gross profit.", "매출 총이익."),
    "liquidity":     ("/lɪˈkwɪdɪti/", "명사", "유동성", "Market liquidity.", "시장 유동성."),
    "fraud":         ("/frɔːd/", "명사", "사기", "Commit fraud.", "사기를 저지르다."),
    "regulator":     ("/ˈrɛɡjʊleɪtər/", "명사", "규제 기관", "Financial regulator.", "금융 규제 기관."),
    "swap":          ("/swɒp/", "명사", "교환, 스왑", "Interest rate swap.", "이자율 스왑."),
    "regression":    ("/rɪˈɡrɛʃən/", "명사", "회귀, 퇴보", "Linear regression.", "선형 회귀."),
    "constitution":  ("/ˌkɒnstɪˈtjuːʃən/", "명사", "헌법, 규정", "Constitutional rights.", "헌법적 권리."),
    "trader":        ("/ˈtreɪdər/", "명사", "트레이더, 거래자", "Stock trader.", "주식 거래자."),
    "monopoly":      ("/məˈnɒpəli/", "명사", "독점", "Market monopoly.", "시장 독점."),
    "correlation":   ("/ˌkɒrəˈleɪʃən/", "명사", "상관관계", "Positive correlation.", "양의 상관관계."),
    "stockmarket":   ("/ˈstɒkmɑːrkɪt/", "명사", "주식 시장", "Stock market crash.", "주식 시장 붕괴."),
    "ex":            ("/ɛks/", "접두사", "전~, 이전의", "Ex-employee.", "전 직원."),
    "breach":        ("/briːtʃ/", "명사", "위반, 위약", "Breach of contract.", "계약 위반."),
    "subsidy":       ("/ˈsʌbsɪdi/", "명사", "보조금", "Government subsidy.", "정부 보조금."),
    "corruption":    ("/kəˈrʌpʃən/", "명사", "부패", "Fight corruption.", "부패와 싸우세요."),
    "issuer":        ("/ˈɪʃuːər/", "명사", "발행자", "Bond issuer.", "채권 발행자."),
    "borrower":      ("/ˈbɒroʊər/", "명사", "차입자", "Mortgage borrower.", "주택 담보 차입자."),
    "insurer":       ("/ɪnˈʃʊərər/", "명사", "보험사", "Life insurer.", "생명 보험사."),
    "profitability": ("/ˌprɒfɪtəˈbɪlɪti/", "명사", "수익성", "Improve profitability.", "수익성을 개선하세요."),
    "scenario":      ("/sɪˈnɑːrioʊ/", "명사", "시나리오", "Worst-case scenario.", "최악의 시나리오."),
    "terrorism":     ("/ˈtɛrərɪzəm/", "명사", "테러리즘", "Counter terrorism.", "테러 대응."),
    "regulatory":    ("/ˈrɛɡjʊlətɔːri/", "형용사", "규제의", "Regulatory compliance.", "규제 준수."),
    "coefficient":   ("/ˌkoʊɪˈfɪʃənt/", "명사", "계수", "Correlation coefficient.", "상관 계수."),
    "optimal":       ("/ˈɒptɪməl/", "형용사", "최적의", "Optimal solution.", "최적 솔루션."),
    "nominal":       ("/ˈnɒmɪnəl/", "형용사", "명목의, 최소의", "Nominal GDP.", "명목 GDP."),
    "infrastructure":("/ˌɪnfrəˈstrʌktʃər/", "명사", "인프라", "Infrastructure investment.", "인프라 투자."),
    "disclose":      ("/dɪsˈkloʊz/", "동사", "공개하다", "Disclose financial data.", "재무 데이터를 공개하세요."),
    "offset":        ("/ˈɒfsɛt/", "동사", "상쇄하다", "Offset the costs.", "비용을 상쇄하세요."),
    "conversion":    ("/kənˈvɜːrʃən/", "명사", "전환, 변환", "Conversion rate.", "전환율."),
    "taxpayer":      ("/ˈtækspeɪər/", "명사", "납세자", "Taxpayer money.", "납세자 돈."),
    "alliance":      ("/əˈlaɪəns/", "명사", "동맹, 연합", "Strategic alliance.", "전략적 동맹."),
    "debtor":        ("/ˈdɛbtər/", "명사", "채무자", "Debtor and creditor.", "채무자와 채권자."),
    "liable":        ("/ˈlaɪəbəl/", "형용사", "책임이 있는", "Legally liable.", "법적 책임이 있는."),
    "integration":   ("/ˌɪntɪˈɡreɪʃən/", "명사", "통합", "System integration.", "시스템 통합."),
    "scandal":       ("/ˈskændəl/", "명사", "스캔들", "Financial scandal.", "금융 스캔들."),
    "interval":      ("/ˈɪntərvəl/", "명사", "간격, 구간", "At regular intervals.", "정기적인 간격으로."),
    "defer":         ("/dɪˈfɜːr/", "동사", "연기하다", "Defer the payment.", "지급을 연기하세요."),
    "payoff":        ("/ˈpeɪɒf/", "명사", "성과, 수익", "Big payoff.", "큰 성과."),
    "ethical":       ("/ˈɛθɪkəl/", "형용사", "윤리적인", "Ethical business.", "윤리적인 사업."),
    "publicly":      ("/ˈpʌblɪkli/", "부사", "공개적으로", "Publicly traded.", "공개적으로 거래되는."),
    "governance":    ("/ˈɡʌvərnəns/", "명사", "거버넌스, 지배구조", "Corporate governance.", "기업 지배구조."),
    "marketer":      ("/ˈmɑːrkɪtər/", "명사", "마케터", "Digital marketer.", "디지털 마케터."),
    "rebel":         ("/ˈrɛbəl/", "명사", "반란군", "Rebel forces.", "반란군."),
    "statute":       ("/ˈstætjuːt/", "명사", "법령, 규정", "Company statute.", "회사 법령."),
    "restructure":   ("/ˌriːˈstrʌktʃər/", "동사", "구조 조정하다", "Restructure the company.", "회사를 구조 조정하세요."),
    "residual":      ("/rɪˈzɪdjuəl/", "형용사", "잔여의", "Residual income.", "잔여 소득."),
    "bubble":        ("/ˈbʌbəl/", "명사", "거품, 버블", "Housing bubble.", "주택 거품."),
    "arbitrage":     ("/ˈɑːrbɪtrɑːʒ/", "명사", "차익 거래", "Arbitrage opportunity.", "차익 거래 기회."),
    "execute":       ("/ˈɛksɪkjuːt/", "동사", "실행하다, 처형하다", "Execute the plan.", "계획을 실행하세요."),
    "deem":          ("/diːm/", "동사", "여기다, 간주하다", "Deemed appropriate.", "적절하다고 여겨진다."),
    "defendant":     ("/dɪˈfɛndənt/", "명사", "피고인", "The defendant pleaded.", "피고인이 항변했다."),
    "statistical":   ("/stəˈtɪstɪkəl/", "형용사", "통계적인", "Statistical analysis.", "통계 분석."),
    "allowance":     ("/əˈlaʊəns/", "명사", "수당, 공제", "Tax allowance.", "세금 공제."),
    "enforce":       ("/ɪnˈfɔːrs/", "동사", "시행하다, 강요하다", "Enforce the law.", "법을 시행하세요."),
    "emission":      ("/ɪˈmɪʃən/", "명사", "배출", "Carbon emission.", "탄소 배출."),
    "warrant":       ("/ˈwɒrənt/", "명사", "영장, 신주인수권", "Search warrant.", "수색 영장."),
    "telecom":       ("/ˈtɛlɪkɒm/", "명사", "통신", "Telecom company.", "통신 회사."),
    "diversify":     ("/daɪˈvɜːrsɪfaɪ/", "동사", "다양화하다", "Diversify investments.", "투자를 다양화하세요."),
    "exploit":       ("/ɪkˈsplɔɪt/", "동사", "이용하다, 착취하다", "Exploit the opportunity.", "기회를 이용하세요."),
    "referendum":    ("/ˌrɛfəˈrɛndəm/", "명사", "국민투표", "Hold a referendum.", "국민투표를 실시하세요."),
    "treaty":        ("/ˈtriːti/", "명사", "조약, 협정", "Sign a treaty.", "조약에 서명하세요."),
    "sophisticate":  ("/səˈfɪstɪkeɪt/", "동사", "세련되게 하다", "Sophisticate the approach.", "접근법을 세련되게 하세요."),
    "multi":         ("/ˈmʌlti/", "접두사", "다중의, 여러", "Multi-national company.", "다국적 기업."),
    "taxation":      ("/tækˈseɪʃən/", "명사", "과세, 세금 제도", "Taxation policy.", "과세 정책."),
    "technological": ("/ˌtɛknəˈlɒdʒɪkəl/", "형용사", "기술적인", "Technological advancement.", "기술적 발전."),
    "multinational": ("/ˌmʌltiˈnæʃənəl/", "명사", "다국적 기업", "Multinational corporation.", "다국적 기업."),
    "plaintiff":     ("/ˈpleɪntɪf/", "명사", "원고", "The plaintiff sued.", "원고가 소송을 제기했다."),
    "tariff":        ("/ˈtærɪf/", "명사", "관세, 요금", "Import tariff.", "수입 관세."),
    "shrink":        ("/ʃrɪŋk/", "동사", "줄어들다, 수축하다", "The market shrank.", "시장이 줄어들었다."),
    "foreigner":     ("/ˈfɒrɪnər/", "명사", "외국인", "Welcome foreigners.", "외국인을 환영하세요."),
    "consolidate":   ("/kənˈsɒlɪdeɪt/", "동사", "통합하다, 강화하다", "Consolidate the accounts.", "계좌를 통합하세요."),
    "taxable":       ("/ˈtæksəbəl/", "형용사", "과세 대상의", "Taxable income.", "과세 소득."),
    "disadvantage":  ("/ˌdɪsədˈvɑːntɪdʒ/", "명사", "불리함, 단점", "Competitive disadvantage.", "경쟁 불리."),
    "subordinate":   ("/səˈbɔːrdɪnɪt/", "명사", "부하 직원", "Talk to subordinates.", "부하 직원들과 이야기하세요."),
    "inflow":        ("/ˈɪnfloʊ/", "명사", "유입", "Capital inflow.", "자본 유입."),
    "pledge":        ("/plɛdʒ/", "동사", "서약하다, 담보로 제공하다", "Pledge support.", "지원을 서약하세요."),
    "collateral":    ("/kəˈlætərəl/", "명사", "담보", "Collateral damage.", "담보 피해."),
    "modest":        ("/ˈmɒdɪst/", "형용사", "겸손한, 적당한", "Modest growth.", "적당한 성장."),
    "convertible":   ("/kənˈvɜːrtɪbəl/", "형용사", "전환 가능한", "Convertible bond.", "전환 사채."),
    "thereby":       ("/ˌðɛərˈbaɪ/", "부사", "그렇게 함으로써", "Thereby reducing costs.", "그렇게 함으로써 비용을 줄인다."),
    "ledger":        ("/ˈlɛdʒər/", "명사", "원장", "General ledger.", "일반 원장."),
    "linear":        ("/ˈlɪniər/", "형용사", "선형의", "Linear growth.", "선형 성장."),
    "summit":        ("/ˈsʌmɪt/", "명사", "정상 회담", "G7 summit.", "G7 정상 회담."),
    "repay":         ("/rɪˈpeɪ/", "동사", "갚다, 상환하다", "Repay the loan.", "대출을 상환하세요."),
    "ministry":      ("/ˈmɪnɪstri/", "명사", "부처, 장관직", "Finance ministry.", "재무부."),
    "multiply":      ("/ˈmʌltɪplaɪ/", "동사", "곱하다, 증가하다", "Multiply by two.", "2를 곱하세요."),
    "consensus":     ("/kənˈsɛnsəs/", "명사", "합의", "Reach a consensus.", "합의에 도달하세요."),
    "essentially":   ("/ɪˈsɛnʃəli/", "부사", "본질적으로", "Essentially correct.", "본질적으로 옳다."),
    "presidency":    ("/ˈprɛzɪdənsi/", "명사", "대통령직", "Presidential presidency.", "대통령직."),
    "rational":      ("/ˈræʃənəl/", "형용사", "합리적인", "Rational decision.", "합리적인 결정."),
    "con":           ("/kɒn/", "명사", "단점, 사기", "Pros and cons.", "장단점."),
    "undermine":     ("/ˌʌndərˈmaɪn/", "동사", "약화시키다", "Undermine authority.", "권위를 약화시키다."),
    "identical":     ("/aɪˈdɛntɪkəl/", "형용사", "동일한", "Identical results.", "동일한 결과."),
    "surge":         ("/sɜːrdʒ/", "명사", "급증, 급등", "Demand surge.", "수요 급증."),
    "predecessor":   ("/ˈpriːdɪsɛsər/", "명사", "전임자, 전신", "Replace the predecessor.", "전임자를 교체하다."),
    "deputy":        ("/ˈdɛpjʊti/", "명사", "부관, 부장관", "Deputy minister.", "부장관."),
    "sole":          ("/soʊl/", "형용사", "유일한, 단독의", "Sole proprietor.", "단독 사업자."),
    "chancellor":    ("/ˈtʃɑːnsələr/", "명사", "수상, 장관", "The chancellor announced.", "수상이 발표했다."),
    "lawsuit":       ("/ˈlɔːsuːt/", "명사", "소송", "File a lawsuit.", "소송을 제기하세요."),
    "notably":       ("/ˈnoʊtəbli/", "부사", "특히, 두드러지게", "Notably increased.", "특히 증가했다."),
    "fluctuation":   ("/ˌflʌktʃuˈeɪʃən/", "명사", "변동", "Price fluctuation.", "가격 변동."),
    "discrimination":("/dɪˌskrɪmɪˈneɪʃən/", "명사", "차별", "End discrimination.", "차별을 끝내세요."),
    "widespread":    ("/ˈwaɪdsprɛd/", "형용사", "광범위한", "Widespread support.", "광범위한 지지."),
    "goodwill":      ("/ˈɡʊdwɪl/", "명사", "영업권, 호의", "Brand goodwill.", "브랜드 영업권."),
    "diversification":("/daɪˌvɜːrsɪfɪˈkeɪʃən/", "명사", "다각화", "Portfolio diversification.", "포트폴리오 다각화."),
    "likelihood":    ("/ˈlaɪklɪhʊd/", "명사", "가능성", "High likelihood.", "높은 가능성."),
    "orient":        ("/ˈɔːriɛnt/", "동사", "방향을 잡다", "Orient the strategy.", "전략의 방향을 잡으세요."),
    "metric":        ("/ˈmɛtrɪk/", "명사", "지표", "Key metric.", "핵심 지표."),
    "insider":       ("/ˈɪnsaɪdər/", "명사", "내부자", "Insider trading.", "내부자 거래."),
    "minus":         ("/ˈmaɪnəs/", "전치사", "빼기, 마이너스", "Ten minus two.", "10에서 2를 빼면."),
    "constitutional":("/ˌkɒnstɪˈtjuːʃənəl/", "형용사", "헌법의", "Constitutional rights.", "헌법적 권리."),
}

def patch_files():
    files = sorted(glob.glob("src/data/**/*.json", recursive=True))
    total = 0
    for filepath in files:
        with open(filepath, encoding="utf-8") as f:
            entries = json.load(f)
        changed = 0
        for entry in entries:
            word = entry.get("word", "")
            key = word.lower()
            if entry.get("meaning", "") in ("", word):
                if key in DICT15:
                    pron, pos, meaning, ex_en, ex_ko = DICT15[key]
                    entry["pronunciation"] = pron
                    entry["partOfSpeech"] = pos
                    entry["meaning"] = meaning
                    entry["exampleEn"] = ex_en
                    entry["exampleKo"] = ex_ko
                    changed += 1
        if changed:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(entries, f, ensure_ascii=False, indent=2)
            print(f"  ✓ {filepath}: +{changed} patched")
        total += changed
    print(f"\n=== Done. Total patched: {total} ===")

if __name__ == "__main__":
    print("=== Patching with fill_more15.py ===\n")
    patch_files()
