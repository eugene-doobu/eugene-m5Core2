#!/usr/bin/env python3
"""Patch fallback entries: academic-L1 (75) + academic-L2 (83)"""
import json, glob

DICT19 = {
    # academic-L1 remaining
    "linguistic": ("/lɪŋˈɡwɪstɪk/", "형용사", "언어의, 언어학의", "Linguistic analysis was conducted.", "언어 분석이 수행됐다."),
    "velocity": ("/vɪˈlɒsɪti/", "명사", "속도, 속력", "Monetary velocity declined.", "화폐 유통 속도가 감소했다."),
    "discourse": ("/ˈdɪskɔːrs/", "명사", "담론, 담화", "Academic discourse evolved.", "학술 담론이 발전했다."),
    "finite": ("/ˈfaɪnaɪt/", "형용사", "유한한", "Resources are finite.", "자원은 유한하다."),
    "electron": ("/ɪˈlektrɒn/", "명사", "전자", "Electrons carry current.", "전자가 전류를 운반한다."),
    "receptor": ("/rɪˈseptər/", "명사", "수용체", "Drug receptors were studied.", "약물 수용체가 연구됐다."),
    "theorem": ("/ˈθɪərəm/", "명사", "정리, 이론", "The Pythagorean theorem applies.", "피타고라스 정리가 적용된다."),
    "fluid": ("/ˈfluːɪd/", "형용사", "유동적인", "Fluid market conditions exist.", "유동적인 시장 상황이 존재한다."),
    "developmental": ("/dɪˌveləpˈmentəl/", "형용사", "발달의", "Developmental stages were mapped.", "발달 단계가 매핑됐다."),
    "molecular": ("/məˈlekjʊlər/", "형용사", "분자의", "Molecular biology advanced.", "분자 생물학이 발전했다."),
    "spatial": ("/ˈspeɪʃəl/", "형용사", "공간적인", "Spatial data was analyzed.", "공간 데이터가 분석됐다."),
    "membrane": ("/ˈmembreɪn/", "명사", "막, 세포막", "Cell membranes were studied.", "세포막이 연구됐다."),
    "neuron": ("/ˈnjʊərɒn/", "명사", "뉴런, 신경세포", "Neurons transmit signals.", "뉴런이 신호를 전달한다."),
    "lexical": ("/ˈleksɪkəl/", "형용사", "어휘의", "Lexical frequency was measured.", "어휘 빈도가 측정됐다."),
    "marker": ("/ˈmɑːrkər/", "명사", "표지, 마커", "Biological markers were found.", "생물학적 표지가 발견됐다."),
    "vowel": ("/ˈvaʊəl/", "명사", "모음", "Five vowels exist in Spanish.", "스페인어에는 5개의 모음이 있다."),
    "diagnosis": ("/ˌdaɪəɡˈnoʊsɪs/", "명사", "진단", "An early diagnosis helped.", "조기 진단이 도움이 됐다."),
    "mortality": ("/mɔːrˈtælɪti/", "명사", "사망률", "Child mortality fell sharply.", "아동 사망률이 크게 감소했다."),
    "antibody": ("/ˈæntɪbɒdi/", "명사", "항체", "Antibodies fight infection.", "항체가 감염과 싸운다."),
    "temporal": ("/ˈtempərəl/", "형용사", "시간적인, 측두의", "Temporal patterns were detected.", "시간적 패턴이 탐지됐다."),
    "bilingual": ("/baɪˈlɪŋɡwəl/", "형용사", "이중 언어의", "Bilingual children showed advantages.", "이중 언어 아이들이 이점을 보였다."),
    "phonological": ("/ˌfɒnəˈlɒdʒɪkəl/", "형용사", "음운의", "Phonological awareness develops early.", "음운 인식이 일찍 발달한다."),
    "nucleus": ("/ˈnjuːklɪəs/", "명사", "핵", "The cell nucleus contains DNA.", "세포핵이 DNA를 포함한다."),
    "onset": ("/ˈɒnset/", "명사", "시작, 발병", "The onset of symptoms occurred.", "증상이 시작됐다."),
    "pathway": ("/ˈpɑːθweɪ/", "명사", "경로", "Metabolic pathways were mapped.", "대사 경로가 매핑됐다."),
    "subset": ("/ˈsʌbset/", "명사", "부분 집합", "A subset of data was used.", "데이터의 부분 집합이 사용됐다."),
    "syntactic": ("/sɪnˈtæktɪk/", "형용사", "구문의", "Syntactic rules govern sentences.", "구문 규칙이 문장을 지배한다."),
    "prevalence": ("/ˈprevələns/", "명사", "유병률, 만연함", "Disease prevalence rose.", "질병 유병률이 올랐다."),
    "pulse": ("/pʌls/", "명사", "맥박, 펄스", "A pulse signal was sent.", "펄스 신호가 전송됐다."),
    "syllable": ("/ˈsɪləbəl/", "명사", "음절", "Words have different syllable counts.", "단어마다 음절 수가 다르다."),
    "chromosome": ("/ˈkroʊməsoʊm/", "명사", "염색체", "Chromosomes carry genes.", "염색체가 유전자를 운반한다."),
    "locus": ("/ˈloʊkəs/", "명사", "위치, 유전자 자리", "The gene locus was identified.", "유전자 위치가 확인됐다."),
    "thesis": ("/ˈθiːsɪs/", "명사", "논문, 논제", "A doctoral thesis was completed.", "박사 논문이 완성됐다."),
    "sin": ("/sɪn/", "명사", "사인 (수학)", "Sin and cosine are related.", "사인과 코사인은 관련이 있다."),
    "syndrome": ("/ˈsɪndroʊm/", "명사", "증후군", "A rare syndrome was studied.", "희귀 증후군이 연구됐다."),
    "adolescent": ("/ˌædəˈlesənt/", "명사", "청소년", "Adolescent behavior was studied.", "청소년 행동이 연구됐다."),
    "vocabulary": ("/vəˈkæbjʊləri/", "명사", "어휘", "Vocabulary acquisition improves reading.", "어휘 습득이 읽기를 향상시킨다."),
    "utterance": ("/ˈʌtərəns/", "명사", "발화, 발언", "Child utterances were analyzed.", "아동 발화가 분석됐다."),
    "encode": ("/ɪnˈkoʊd/", "동사", "부호화하다", "Memory is encoded in the brain.", "기억이 뇌에 부호화된다."),
    "incidence": ("/ˈɪnsɪdəns/", "명사", "발생률", "Cancer incidence rose.", "암 발생률이 올랐다."),
    "trajectory": ("/trəˈdʒektəri/", "명사", "궤도, 발전 경로", "The growth trajectory was steep.", "성장 궤도가 가팔랐다."),
    "manuscript": ("/ˈmænjʊskrɪpt/", "명사", "원고, 필사본", "The manuscript was submitted.", "원고가 제출됐다."),
    "grammatical": ("/ɡrəˈmætɪkəl/", "형용사", "문법적인", "Grammatical errors were found.", "문법적 오류가 발견됐다."),
    "amplitude": ("/ˈæmplɪtjuːd/", "명사", "진폭", "Signal amplitude was measured.", "신호 진폭이 측정됐다."),
    "adaptation": ("/ˌædæpˈteɪʃən/", "명사", "적응, 개작", "Natural adaptation takes centuries.", "자연 적응은 수백 년이 걸린다."),
    "cortex": ("/ˈkɔːrteks/", "명사", "피질", "The cerebral cortex processes thought.", "대뇌 피질이 사고를 처리한다."),
    "synthesis": ("/ˈsɪnθəsɪs/", "명사", "합성, 종합", "Protein synthesis requires enzymes.", "단백질 합성에는 효소가 필요하다."),
    "diameter": ("/daɪˈæmɪtər/", "명사", "지름", "The pipe diameter was 5cm.", "파이프 지름이 5cm였다."),
    "cone": ("/koʊn/", "명사", "원뿔", "A cone shape was used.", "원뿔 모양이 사용됐다."),
    "organism": ("/ˈɔːrɡənɪzəm/", "명사", "생물체", "Single-celled organisms exist.", "단세포 생물체가 존재한다."),
    "enzyme": ("/ˈenzaɪm/", "명사", "효소", "Enzymes catalyze reactions.", "효소가 반응을 촉진한다."),
    "conception": ("/kənˈsepʃən/", "명사", "개념, 수정", "The conception of the theory.", "이론의 개념."),
    "sperm": ("/spɜːrm/", "명사", "정자", "Sperm cells were analyzed.", "정자 세포가 분석됐다."),
    "sphere": ("/sfɪər/", "명사", "구, 영역", "Economic sphere of influence.", "경제적 영향권."),
    "mediate": ("/ˈmiːdɪeɪt/", "동사", "중재하다, 매개하다", "Hormones mediate the response.", "호르몬이 반응을 매개한다."),
    "variant": ("/ˈveərɪənt/", "명사", "변형, 이형", "A new gene variant was found.", "새로운 유전자 변형이 발견됐다."),
    "evolutionary": ("/ˌiːvəˈluːʃənəri/", "형용사", "진화적인", "Evolutionary advantages exist.", "진화적 이점이 존재한다."),
    "nonlinear": ("/ˌnɒnˈlɪnɪər/", "형용사", "비선형의", "Nonlinear dynamics were modeled.", "비선형 역학이 모델링됐다."),
    "morphology": ("/mɔːrˈfɒlədʒi/", "명사", "형태론, 형태학", "Morphology studies word forms.", "형태론이 단어 형태를 연구한다."),
    "syntax": ("/ˈsɪntæks/", "명사", "통사론", "Syntax governs sentence structure.", "통사론이 문장 구조를 지배한다."),
    "radiation": ("/ˌreɪdɪˈeɪʃən/", "명사", "방사선, 복사", "Radiation therapy was applied.", "방사선 치료가 적용됐다."),
    "acute": ("/əˈkjuːt/", "형용사", "급성의, 심각한", "An acute shortage occurred.", "급성 부족이 발생했다."),
    "leaf": ("/liːf/", "명사", "잎", "Leaf area index was calculated.", "잎 면적 지수가 계산됐다."),
    "corpus": ("/ˈkɔːrpəs/", "명사", "자료 집합, 코퍼스", "A linguistic corpus was built.", "언어 코퍼스가 구축됐다."),
    "gradient": ("/ˈɡreɪdɪənt/", "명사", "기울기, 경사도", "The gradient was calculated.", "기울기가 계산됐다."),
    "tumor": ("/ˈtjuːmər/", "명사", "종양", "Tumor growth was halted.", "종양 성장이 중단됐다."),
    "infinite": ("/ˈɪnfɪnɪt/", "형용사", "무한한", "Infinite possibilities exist.", "무한한 가능성이 존재한다."),
    "outer": ("/ˈaʊtər/", "형용사", "외부의", "The outer layer was removed.", "외층이 제거됐다."),
    "notation": ("/noʊˈteɪʃən/", "명사", "표기법", "Scientific notation was used.", "과학적 표기법이 사용됐다."),
    "disturbance": ("/dɪˈstɜːrbəns/", "명사", "교란, 방해", "An ecological disturbance occurred.", "생태적 교란이 발생했다."),
    "rotation": ("/roʊˈteɪʃən/", "명사", "회전", "Crop rotation improved yields.", "작물 순환이 수확량을 향상시켰다."),
    # academic-L2 remaining
    "inhibit": ("/ɪnˈhɪbɪt/", "동사", "억제하다", "Antibiotics inhibit bacteria.", "항생제가 박테리아를 억제한다."),
    "consonant": ("/ˈkɒnsənənt/", "명사", "자음", "English has 21 consonants.", "영어에는 21개의 자음이 있다."),
    "morphological": ("/ˌmɔːrfəˈlɒdʒɪkəl/", "형용사", "형태론적인", "Morphological analysis was done.", "형태론적 분석이 이루어졌다."),
    "lateral": ("/ˈlætərəl/", "형용사", "측면의", "Lateral thinking solves problems.", "측면적 사고가 문제를 해결한다."),
    "insect": ("/ˈɪnsekt/", "명사", "곤충", "Insect populations declined.", "곤충 개체수가 감소했다."),
    "calculus": ("/ˈkælkjʊləs/", "명사", "미적분학", "Calculus is required.", "미적분학이 필요하다."),
    "longitudinal": ("/ˌlɒŋɡɪˈtjuːdɪnəl/", "형용사", "종단적인", "A longitudinal study was done.", "종단 연구가 이루어졌다."),
    "characterization": ("/ˌkærɪktəraɪˈzeɪʃən/", "명사", "특성화", "Material characterization methods.", "재료 특성화 방법들."),
    "composer": ("/kəmˈpoʊzər/", "명사", "작곡가", "The composer studied acoustics.", "작곡가가 음향학을 연구했다."),
    "singular": ("/ˈsɪŋɡjʊlər/", "형용사", "단수의, 독특한", "A singular finding emerged.", "독특한 발견이 나타났다."),
    "fetal": ("/ˈfiːtəl/", "형용사", "태아의", "Fetal development was monitored.", "태아 발달이 모니터링됐다."),
    "oxygen": ("/ˈɒksɪdʒən/", "명사", "산소", "Oxygen levels were measured.", "산소 수준이 측정됐다."),
    "dialect": ("/ˈdaɪəlekt/", "명사", "방언", "Regional dialects were studied.", "지역 방언이 연구됐다."),
    "colony": ("/ˈkɒləni/", "명사", "식민지, 군집", "Bacterial colonies were counted.", "박테리아 군집이 계산됐다."),
    "algebra": ("/ˈældʒɪbrə/", "명사", "대수학", "Linear algebra is fundamental.", "선형 대수학이 기본적이다."),
    "diffusion": ("/dɪˈfjuːʒən/", "명사", "확산", "Gas diffusion was measured.", "기체 확산이 측정됐다."),
    "specimen": ("/ˈspesɪmɪn/", "명사", "표본", "Specimens were collected.", "표본이 수집됐다."),
    "fusion": ("/ˈfjuːʒən/", "명사", "융합, 핵융합", "Nuclear fusion research progressed.", "핵융합 연구가 진전됐다."),
    "amino": ("/əˈmiːnoʊ/", "형용사", "아미노", "Amino acids form proteins.", "아미노산이 단백질을 형성한다."),
    "philosophical": ("/ˌfɪləˈsɒfɪkəl/", "형용사", "철학적인", "Philosophical questions arose.", "철학적 질문들이 제기됐다."),
    "indigenous": ("/ɪnˈdɪdʒɪnəs/", "형용사", "토착의", "Indigenous knowledge was valued.", "토착 지식이 가치를 인정받았다."),
    "symbolic": ("/sɪmˈbɒlɪk/", "형용사", "상징적인", "A symbolic gesture was made.", "상징적인 몸짓이 이루어졌다."),
    "physiological": ("/ˌfɪzɪəˈlɒdʒɪkəl/", "형용사", "생리적인", "Physiological responses were measured.", "생리적 반응이 측정됐다."),
    "calcium": ("/ˈkælsɪəm/", "명사", "칼슘", "Calcium intake is important.", "칼슘 섭취가 중요하다."),
    "psychiatric": ("/ˌsaɪkɪˈætrɪk/", "형용사", "정신의학적인", "Psychiatric treatment improved.", "정신의학 치료가 향상됐다."),
    "critique": ("/krɪˈtiːk/", "명사", "비평", "A rigorous critique was published.", "엄격한 비평이 발표됐다."),
    "cue": ("/kjuː/", "명사", "단서, 신호", "Visual cues guide behavior.", "시각적 단서가 행동을 안내한다."),
    "parental": ("/pəˈrentəl/", "형용사", "부모의", "Parental involvement matters.", "부모 참여가 중요하다."),
    "ritual": ("/ˈrɪtʃuəl/", "명사", "의식, 의례", "Cultural rituals were studied.", "문화적 의식이 연구됐다."),
    "fertility": ("/fɜːrˈtɪlɪti/", "명사", "출산율, 비옥도", "Fertility rates declined.", "출산율이 감소했다."),
    "inhibition": ("/ˌɪnhɪˈbɪʃən/", "명사", "억제", "Enzyme inhibition was studied.", "효소 억제가 연구됐다."),
    "tense": ("/tens/", "명사", "시제", "Verb tense affects meaning.", "동사 시제가 의미에 영향을 미친다."),
    "transcription": ("/trænsˈkrɪpʃən/", "명사", "전사, 전사본", "Gene transcription was analyzed.", "유전자 전사가 분석됐다."),
    "nutrient": ("/ˈnjuːtrɪənt/", "명사", "영양소", "Soil nutrients were depleted.", "토양 영양소가 고갈됐다."),
    "dense": ("/dens/", "형용사", "밀집한, 빽빽한", "A dense network was formed.", "밀집된 네트워크가 형성됐다."),
    "ecology": ("/ɪˈkɒlədʒi/", "명사", "생태학", "Ecology studies ecosystems.", "생태학이 생태계를 연구한다."),
    "adaptive": ("/ˈædæptɪv/", "형용사", "적응적인", "Adaptive responses were observed.", "적응적 반응이 관찰됐다."),
    "ecological": ("/ˌiːkəˈlɒdʒɪkəl/", "형용사", "생태적인", "Ecological damage was assessed.", "생태적 피해가 평가됐다."),
    "aesthetic": ("/ɪsˈθetɪk/", "형용사", "심미적인", "Aesthetic qualities were analyzed.", "심미적 특성이 분석됐다."),
    "equivalence": ("/ɪˈkwɪvələns/", "명사", "등가, 동등성", "Statistical equivalence was tested.", "통계적 등가성이 검증됐다."),
    "pragmatic": ("/præɡˈmætɪk/", "형용사", "실용적인", "A pragmatic approach was taken.", "실용적인 접근이 취해졌다."),
    "arrow": ("/ˈæroʊ/", "명사", "화살표", "The diagram uses arrows.", "다이어그램이 화살표를 사용한다."),
    "commentary": ("/ˈkɒməntəri/", "명사", "해설, 논평", "A detailed commentary was written.", "상세한 해설이 작성됐다."),
    "residue": ("/ˈrezɪdjuː/", "명사", "잔류물, 잔기", "Toxic residues were found.", "독성 잔류물이 발견됐다."),
    "unstable": ("/ʌnˈsteɪbəl/", "형용사", "불안정한", "The molecule is unstable.", "분자가 불안정하다."),
    "radius": ("/ˈreɪdɪəs/", "명사", "반지름", "The radius of influence.", "영향의 반지름."),
    "monkey": ("/ˈmʌŋki/", "명사", "원숭이", "Primate studies used monkeys.", "영장류 연구에 원숭이가 사용됐다."),
    "habitat": ("/ˈhæbɪtæt/", "명사", "서식지", "Natural habitats were destroyed.", "자연 서식지가 파괴됐다."),
    "problematic": ("/ˌprɒbləˈmætɪk/", "형용사", "문제가 있는", "The assumption is problematic.", "가정이 문제가 있다."),
    "linguistics": ("/lɪŋˈɡwɪstɪks/", "명사", "언어학", "Applied linguistics grew.", "응용 언어학이 성장했다."),
    "hormone": ("/ˈhɔːrmoʊn/", "명사", "호르몬", "Stress hormones were elevated.", "스트레스 호르몬이 상승했다."),
    "primitive": ("/ˈprɪmɪtɪv/", "형용사", "원시적인", "Primitive tools were found.", "원시 도구가 발견됐다."),
    "substrate": ("/ˈsʌbstreɪt/", "명사", "기질, 기판", "Enzyme substrate binding was studied.", "효소 기질 결합이 연구됐다."),
    "randomize": ("/ˈrændəmaɪz/", "동사", "무작위화하다", "Trials were randomized.", "실험이 무작위화됐다."),
    "sensory": ("/ˈsensəri/", "형용사", "감각의", "Sensory perception was tested.", "감각 지각이 테스트됐다."),
    "peripheral": ("/pəˈrɪfərəl/", "형용사", "주변의", "Peripheral vision was tested.", "주변 시각이 테스트됐다."),
    "spontaneous": ("/spɒnˈteɪnɪəs/", "형용사", "자발적인", "Spontaneous combustion occurred.", "자연발화가 발생했다."),
    "reproduction": ("/ˌriːprəˈdʌkʃən/", "명사", "번식, 재생산", "Asexual reproduction was studied.", "무성 생식이 연구됐다."),
    "lung": ("/lʌŋ/", "명사", "폐", "Lung capacity was measured.", "폐 용량이 측정됐다."),
    "decay": ("/dɪˈkeɪ/", "명사", "분해, 부패", "Radioactive decay was measured.", "방사성 붕괴가 측정됐다."),
    "thickness": ("/ˈθɪknəs/", "명사", "두께", "Wall thickness was analyzed.", "벽 두께가 분석됐다."),
    "conceive": ("/kənˈsiːv/", "동사", "개념화하다, 임신하다", "A new theory was conceived.", "새로운 이론이 개념화됐다."),
    "offspring": ("/ˈɒfsprɪŋ/", "명사", "자손", "Offspring survival rates rose.", "자손 생존율이 올랐다."),
    "metaphor": ("/ˈmetəfər/", "명사", "은유", "A powerful metaphor was used.", "강력한 은유가 사용됐다."),
    "tract": ("/trækt/", "명사", "경로, 소책자", "The digestive tract was studied.", "소화관이 연구됐다."),
    "liver": ("/ˈlɪvər/", "명사", "간", "Liver function was tested.", "간 기능이 테스트됐다."),
    "valve": ("/vælv/", "명사", "밸브", "Heart valves were examined.", "심장 판막이 검사됐다."),
    "plural": ("/ˈplʊərəl/", "형용사", "복수의", "Plural forms were analyzed.", "복수형이 분석됐다."),
    "thermal": ("/ˈθɜːrməl/", "형용사", "열의, 온도의", "Thermal conductivity was measured.", "열 전도율이 측정됐다."),
    "flux": ("/flʌks/", "명사", "유동, 플럭스", "Magnetic flux was measured.", "자기 플럭스가 측정됐다."),
    "analogy": ("/əˈnælədʒi/", "명사", "유사성, 유추", "An analogy was drawn.", "유추가 이루어졌다."),
    "nitrogen": ("/ˈnaɪtrədʒən/", "명사", "질소", "Nitrogen fixation occurs naturally.", "질소 고정이 자연적으로 발생한다."),
    "vein": ("/veɪn/", "명사", "정맥", "Blood flows through veins.", "혈액이 정맥을 통해 흐른다."),
    "peasant": ("/ˈpezənt/", "명사", "농부, 소작농", "Peasant farming dominated.", "소작 농업이 지배했다."),
    "binary": ("/ˈbaɪnəri/", "형용사", "이진의", "Binary code was used.", "이진 코드가 사용됐다."),
    "contour": ("/ˈkɒntʊər/", "명사", "윤곽, 등고선", "Contour maps were drawn.", "등고선 지도가 그려졌다."),
    "rhythm": ("/ˈrɪðəm/", "명사", "리듬", "Circadian rhythm was studied.", "일주기 리듬이 연구됐다."),
    "strand": ("/strænd/", "명사", "가닥, 실", "DNA strands were sequenced.", "DNA 가닥이 염기서열이 분석됐다."),
    "philosopher": ("/fɪˈlɒsəfər/", "명사", "철학자", "The philosopher argued.", "철학자가 주장했다."),
    "acceleration": ("/əkˌseləˈreɪʃən/", "명사", "가속", "Gravitational acceleration is 9.8m/s².", "중력 가속도는 9.8m/s²이다."),
    "dictionary": ("/ˈdɪkʃənəri/", "명사", "사전", "A specialized dictionary was used.", "전문 사전이 사용됐다."),
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
                if key in DICT19:
                    pron, pos, meaning, ex_en, ex_ko = DICT19[key]
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
    print("=== Patching with fill_more19.py ===\n")
    patch_files()
