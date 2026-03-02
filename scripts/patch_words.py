#!/usr/bin/env python3
"""
Patch remaining fallback entries with real Korean data.
Focus: freq L1 missing 41, freq L2 top words, TOEIC L1 key words.
"""
import json, os, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "src", "data")

PATCH = {
# ── freq L1 missing ──────────────────────────────────────────────────────
"I": ("/aɪ/","대명사","나, 저","I would like to check in, please.","체크인하고 싶습니다."),
"by": ("/baɪ/","전치사","~에 의해, ~까지","Please pay by credit card.","신용카드로 지불해 주세요."),
"really": ("/ˈrɪəli/","부사","정말로, 실제로","The view from the room is really beautiful.","방에서 보이는 전망이 정말 아름답습니다."),
"lot": ("/lɒt/","명사","많음, 주차장","There's a lot of traffic this morning.","오늘 아침에 교통이 많이 막힙니다."),
"little": ("/ˈlɪtəl/","형용사","작은, 조금의","Could I have a little extra time?","시간을 조금 더 주실 수 있나요?"),
"meet": ("/miːt/","동사","만나다","Where can we meet tomorrow?","내일 어디서 만날 수 있을까요?"),
"something": ("/ˈsʌmθɪŋ/","대명사","무언가","Is there something wrong with the room?","방에 무슨 문제가 있나요?"),
"why": ("/waɪ/","부사","왜","Why is the flight delayed?","항공편이 왜 지연되나요?"),
"course": ("/kɔːrs/","명사","과정, 물론","Of course, we can arrange a late checkout.","물론이죠, 늦은 체크아웃을 주선해 드릴 수 있습니다."),
"case": ("/keɪs/","명사","경우, 사례","In that case, I'll take the earlier flight.","그런 경우라면 더 이른 항공편을 타겠습니다."),
"around": ("/əˈraʊnd/","전치사","~주위에, 약","The tour takes around three hours.","투어는 약 세 시간 걸립니다."),
"friend": ("/frɛnd/","명사","친구","I'm traveling with a friend.","친구와 함께 여행 중입니다."),
"order": ("/ˈɔːrdər/","동사","주문하다","I'd like to order room service.","룸서비스를 주문하고 싶습니다."),
"word": ("/wɜːrd/","명사","단어, 말","Could you say that word again?","그 단어를 다시 한 번 말씀해 주시겠어요?"),
"build": ("/bɪld/","동사","짓다","This hotel was built in 1920.","이 호텔은 1920년에 지어졌습니다."),
"believe": ("/bɪˈliːv/","동사","믿다, 생각하다","I believe my bag was left in the taxi.","가방이 택시에 남겨진 것 같습니다."),
"second": ("/ˈsɛkənd/","형용사","두 번째의","Take the second exit on the roundabout.","로터리에서 두 번째 출구를 이용하세요."),
"yes": ("/jɛs/","부사","네, 예","Yes, I have a reservation.","네, 예약이 있습니다."),
"love": ("/lʌv/","동사","사랑하다, 좋아하다","I love exploring local markets.","현지 시장을 탐방하는 것을 좋아합니다."),
"job": ("/dʒɒb/","명사","일, 직업","I'm here on a work trip for my job.","직장 출장으로 여기 왔습니다."),
"away": ("/əˈweɪ/","부사","멀리, 떨어진","How far away is the airport?","공항까지 얼마나 멀리 있나요?"),
"buy": ("/baɪ/","동사","사다","Where can I buy a local SIM card?","현지 SIM 카드를 어디서 살 수 있나요?"),
"thank": ("/θæŋk/","동사","감사하다","Thank you for your hospitality.","환대에 감사드립니다."),
"far": ("/fɑːr/","부사","멀리, 많이","How far is the station from here?","역은 여기서 얼마나 멀리 있나요?"),
"today": ("/təˈdeɪ/","부사","오늘","Is there a tour available today?","오늘 이용 가능한 투어가 있나요?"),
"hope": ("/hoʊp/","동사","바라다","I hope the weather is good tomorrow.","내일 날씨가 좋으면 좋겠습니다."),
"idea": ("/aɪˈdɪə/","명사","생각, 아이디어","Do you have any idea where the bus stop is?","버스 정류장이 어디에 있는지 아시나요?"),
"less": ("/lɛs/","형용사","더 적은","I'd like a room that costs less.","비용이 더 적게 드는 방을 원합니다."),
"room": ("/ruːm/","명사","방, 객실","I have a reservation for a room.","방 예약이 있습니다."),
"reason": ("/ˈriːzən/","명사","이유, 이유","Is there a reason for the delay?","지연에 이유가 있나요?"),
"someone": ("/ˈsʌmwʌn/","대명사","누군가","Is there someone who speaks English?","영어를 하시는 분이 계신가요?"),
"feel": ("/fiːl/","동사","느끼다","I feel the room is too cold.","방이 너무 춥게 느껴집니다."),
"air": ("/ɛər/","명사","공기, 항공","The fresh air here is wonderful.","이곳의 신선한 공기가 훌륭합니다."),
"door": ("/dɔːr/","명사","문","Please keep the fire door closed.","방화문을 닫아두세요."),
"ready": ("/ˈrɛdi/","형용사","준비된","Is my room ready?","제 방이 준비됐나요?"),
"place": ("/pleɪs/","명사","장소, 곳","This is a great place to eat.","여기는 식사하기에 좋은 곳입니다."),
"done": ("/dʌn/","형용사","완료된, 익힌","Is my laundry done?","세탁이 완료됐나요?"),
"once": ("/wʌns/","부사","한 번, 일단","Once you arrive, call me.","도착하면 전화해 주세요."),
"near": ("/nɪər/","형용사","가까운","Is there a convenience store near the hotel?","호텔 근처에 편의점이 있나요?"),
"pay": ("/peɪ/","동사","지불하다","Can I pay with a card?","카드로 지불할 수 있나요?"),
"full": ("/fʊl/","형용사","가득 찬, 만실의","I'm afraid we're fully booked.","죄송하지만 만실입니다."),

# ── freq L2 key missing ──────────────────────────────────────────────────
"actually": ("/ˈæktʃuəli/","부사","실제로, 사실은","Actually, there's been a change of plans.","사실, 계획에 변경이 있었습니다."),
"rather": ("/ˈrɑːðər/","부사","오히려, 상당히","I'd rather have a room on a lower floor.","오히려 낮은 층의 방을 선호합니다."),
"view": ("/vjuː/","명사","전망, 경치","I'd like a room with a sea view.","바다 전망의 방을 원합니다."),
"together": ("/təˈɡɛðər/","부사","함께, 같이","Are you all traveling together?","모두 함께 여행 중이신가요?"),
"parent": ("/ˈpɛərənt/","명사","부모","A crib is available for young parents.","어린 부모들을 위해 아기 침대가 이용 가능합니다."),
"hard": ("/hɑːrd/","형용사","단단한, 어려운","It's hard to find a taxi here at night.","밤에는 여기서 택시를 잡기 어렵습니다."),
"party": ("/ˈpɑːrti/","명사","일행, 파티","How many in your party?","일행이 몇 명이세요?"),
"control": ("/kənˈtroʊl/","동사","통제하다, 관리하다","The remote control for the TV is on the desk.","TV 리모컨은 책상 위에 있습니다."),
"concern": ("/kənˈsɜːrn/","명사","걱정, 관심사","If you have any concerns, please let us know.","걱정되는 것이 있으면 알려주세요."),
"product": ("/ˈprɒdʌkt/","명사","제품","All hotel products are eco-friendly.","모든 호텔 제품은 친환경입니다."),
"story": ("/ˈstɔːri/","명사","이야기, 층","Our hotel has an interesting story behind it.","우리 호텔에는 흥미로운 이야기가 있습니다."),
"almost": ("/ˈɔːlmoʊst/","부사","거의","We almost missed our connecting flight.","연결 항공편을 거의 놓칠 뻔했습니다."),
"whole": ("/hoʊl/","형용사","전체의, 모든","I spent the whole day sightseeing.","하루 종일 관광하며 보냈습니다."),
"yet": ("/jɛt/","부사","아직, 그러나","Has the taxi arrived yet?","택시가 아직 도착하지 않았나요?"),
"effect": ("/ɪˈfɛkt/","명사","효과, 영향","The jet lag effect lasted two days.","시차 적응 효과가 이틀 동안 지속됐습니다."),
"sort": ("/sɔːrt/","명사","종류, 분류","What sort of room do you prefer?","어떤 종류의 방을 선호하세요?"),
"ever": ("/ˈɛvər/","부사","언젠가, 이제까지","Have you ever visited this country before?","이 나라를 방문한 적이 있나요?"),
"anything": ("/ˈɛniθɪŋ/","대명사","무엇이든","Is there anything I can help you with?","도와드릴 것이 있나요?"),
"cause": ("/kɔːz/","동사","야기하다","The storm caused flight cancellations.","폭풍이 항공편 취소를 야기했습니다."),
"fall": ("/fɔːl/","동사","떨어지다, 가을","Be careful not to fall on the wet floor.","젖은 바닥에서 넘어지지 않도록 조심하세요."),
"deal": ("/diːl/","명사","거래, 협상","The travel agent offered us a great deal.","여행사에서 훌륭한 거래를 제안했습니다."),
"soon": ("/suːn/","부사","곧","The shuttle will arrive soon.","셔틀이 곧 도착할 것입니다."),
"watch": ("/wɒtʃ/","동사","지켜보다, 조심하다","Watch out for your belongings.","소지품을 조심하세요."),
"base": ("/beɪs/","명사","기반, 기지","Use this hotel as a base for exploring the city.","도시 탐방의 기지로 이 호텔을 이용하세요."),
"probably": ("/ˈprɒbəbli/","부사","아마도","The bus will probably be a few minutes late.","버스가 아마도 몇 분 늦을 것입니다."),
"past": ("/pɑːst/","명사","과거, 지나서","Walk past the fountain and turn left.","분수를 지나쳐 왼쪽으로 도세요."),
"test": ("/tɛst/","동사","시험하다, 테스트하다","I need to test the internet connection.","인터넷 연결을 테스트해야 합니다."),
"visit": ("/ˈvɪzɪt/","동사","방문하다","I plan to visit the museum tomorrow.","내일 박물관을 방문할 계획입니다."),
"grow": ("/ɡroʊ/","동사","성장하다, 자라다","Tourism has grown significantly in this region.","이 지역의 관광이 크게 성장했습니다."),
"nothing": ("/ˈnʌθɪŋ/","대명사","아무것도 없는","There is nothing in the minibar.","미니바에 아무것도 없습니다."),
"mother": ("/ˈmʌðər/","명사","어머니","I'm traveling with my mother.","어머니와 함께 여행 중입니다."),
"matter": ("/ˈmætər/","동사","중요하다","It doesn't matter which floor the room is on.","방이 몇 층에 있든 상관없습니다."),
"mind": ("/maɪnd/","동사","꺼리다, 신경 쓰다","Would you mind moving your luggage?","짐을 옮겨주시겠어요?"),
"record": ("/ˈrɛkɔːrd/","동사","기록하다","Let me record your complaint.","불만 사항을 기록하겠습니다."),
"force": ("/fɔːrs/","명사","힘, 강제","Bad weather forced the cancellation of all flights.","나쁜 날씨로 모든 항공편이 취소됐습니다."),
"several": ("/ˈsɛvərəl/","형용사","몇몇의, 여러","There are several restaurants nearby.","근처에 여러 식당이 있습니다."),
"light": ("/laɪt/","명사","빛, 조명","The room has good natural light.","방에 자연 채광이 잘 들어옵니다."),
"develop": ("/dɪˈvɛləp/","동사","개발하다, 발전하다","The area has developed into a popular tourist zone.","이 지역은 인기 있는 관광 지구로 발전했습니다."),
"remember": ("/rɪˈmɛmbər/","동사","기억하다","Remember to pick up your key card.","키 카드를 챙기는 것을 잊지 마세요."),
"bit": ("/bɪt/","명사","조금, 약간","The room is a bit cold.","방이 조금 춥습니다."),
"answer": ("/ˈɑːnsər/","동사","대답하다, 응답하다","Please answer the phone if the front desk calls.","프런트 데스크에서 전화하면 받아주세요."),
"sit": ("/sɪt/","동사","앉다","Please sit and wait in the lobby.","로비에 앉아서 기다려 주세요."),
"figure": ("/ˈfɪɡər/","동사","생각하다, 알아내다","I figured out the best route to the city.","도심으로 가는 최적의 경로를 알아냈습니다."),
"letter": ("/ˈlɛtər/","명사","편지, 글자","Is there a letter for me at reception?","리셉션에 내 편지가 있나요?"),
"decide": ("/dɪˈsaɪd/","동사","결정하다","We decided to extend our stay.","우리는 숙박을 연장하기로 결정했습니다."),
"language": ("/ˈlæŋɡwɪdʒ/","명사","언어","Do you speak any other language?","다른 언어를 하시나요?"),
"subject": ("/ˈsʌbdʒɪkt/","명사","주제, 과목","The subject of the tour is local history.","투어의 주제는 지역 역사입니다."),
"class": ("/klɑːs/","명사","등급, 수업","I'm booked in business class.","비즈니스 클래스로 예약되어 있습니다."),
"development": ("/dɪˈvɛləpmənt/","명사","개발, 발전","The rapid development of tourism has changed this area.","관광의 급속한 발전이 이 지역을 변화시켰습니다."),
"half": ("/hɑːf/","명사","절반","I'll be there in half an hour.","30분 후에 도착할 것입니다."),

# ── TOEIC Level 1 key missing ─────────────────────────────────────────────
"o'clock": ("/əˈklɒk/","부사","~시 정각","The meeting starts at nine o'clock.","회의는 9시 정각에 시작됩니다."),
"workshop": ("/ˈwɜːrkʃɒp/","명사","워크숍, 작업장","The workshop will be held in conference room B.","워크숍은 B 회의실에서 열릴 것입니다."),
"downtown": ("/ˈdaʊntaʊn/","명사","도심, 시내","The hotel is located downtown.","호텔은 도심에 위치해 있습니다."),
"deadline": ("/ˈdɛdlaɪn/","명사","마감 기한","We need to meet the project deadline.","프로젝트 마감 기한을 맞춰야 합니다."),
"brochure": ("/ˈbroʊʃər/","명사","브로슈어, 안내 책자","Please take a brochure from the front desk.","프런트 데스크에서 브로슈어를 가져가세요."),
"noon": ("/nuːn/","명사","정오","Check-out is at noon.","체크아웃은 정오입니다."),
"accountant": ("/əˈkaʊntənt/","명사","회계사","The company's accountant reviewed the expenses.","회사 회계사가 경비를 검토했습니다."),
"clerk": ("/klɜːrk/","명사","점원, 사무원","The front-desk clerk helped us check in.","프런트 데스크 직원이 체크인을 도와주었습니다."),
"lobby": ("/ˈlɒbi/","명사","로비","Please wait in the lobby.","로비에서 기다려 주세요."),
"résumé": ("/ˈrɛzjuːmeɪ/","명사","이력서","Submit your résumé before the deadline.","마감 기한 전에 이력서를 제출하세요."),
"enclose": ("/ɪnˈkloʊz/","동사","동봉하다","Please find enclosed the contract.","동봉된 계약서를 확인해 주세요."),
"applicant": ("/ˈæplɪkənt/","명사","지원자","The position received many qualified applicants.","그 직책에는 많은 자격 있는 지원자들이 지원했습니다."),
"seminar": ("/ˈsɛmɪnɑːr/","명사","세미나","The annual seminar will be held next week.","연례 세미나가 다음 주에 열릴 것입니다."),
"technician": ("/tɛkˈnɪʃən/","명사","기술자","A technician will fix the issue shortly.","기술자가 곧 문제를 해결할 것입니다."),
"cloth": ("/klɒθ/","명사","천, 옷감","The tablecloths are changed daily.","식탁보는 매일 교체됩니다."),
"fare": ("/fɛər/","명사","요금","The bus fare to downtown is two dollars.","시내행 버스 요금은 2달러입니다."),
"traveler": ("/ˈtrævələr/","명사","여행자","Most travelers prefer the express train.","대부분의 여행자들은 급행열차를 선호합니다."),
"caller": ("/ˈkɔːlər/","명사","전화를 건 사람","The caller asked about room availability.","전화를 건 사람이 방 이용 가능 여부를 물었습니다."),
"subway": ("/ˈsʌbˌweɪ/","명사","지하철","Take the subway to avoid traffic.","교통 체증을 피하려면 지하철을 이용하세요."),
"luggage": ("/ˈlʌɡɪdʒ/","명사","수하물, 짐","May I store my luggage until check-in?","체크인 전까지 짐을 맡아주실 수 있나요?"),
"shipment": ("/ˈʃɪpmənt/","명사","배송, 선적","The shipment will arrive on Thursday.","배송물이 목요일에 도착할 것입니다."),
"infer": ("/ɪnˈfɜːr/","동사","추론하다","We can infer from the data that sales are rising.","데이터에서 판매가 증가하고 있음을 추론할 수 있습니다."),
"waiter": ("/ˈweɪtər/","명사","남자 웨이터","Excuse me, waiter, can I have the menu?","실례합니다, 웨이터, 메뉴판을 주실 수 있나요?"),
"rental": ("/ˈrɛntəl/","명사","렌탈, 임대","The car rental desk is on the ground floor.","렌터카 데스크는 1층에 있습니다."),
"warranty": ("/ˈwɒrənti/","명사","보증, 품질보증서","The product comes with a one-year warranty.","제품에는 1년 품질 보증이 포함되어 있습니다."),
"cafeteria": ("/ˌkæfɪˈtɪəriə/","명사","구내식당","The office cafeteria serves lunch from noon.","사무실 구내식당은 정오부터 점심을 제공합니다."),
"chef": ("/ʃɛf/","명사","주방장, 요리사","The hotel chef prepares fresh meals daily.","호텔 주방장이 매일 신선한 식사를 준비합니다."),
"elevator": ("/ˈɛlɪˌveɪtər/","명사","엘리베이터","Take the elevator to the 10th floor.","10층으로 엘리베이터를 타세요."),
"reception": ("/rɪˈsɛpʃən/","명사","리셉션, 접수처","Please sign in at the reception desk.","리셉션 데스크에서 등록해 주세요."),
"correctly": ("/kəˈrɛktli/","부사","올바르게","Make sure you fill in the form correctly.","양식을 올바르게 작성했는지 확인하세요."),
"bicycle": ("/ˈbaɪsɪkəl/","명사","자전거","Rent a bicycle to explore the city.","자전거를 빌려 도시를 탐방하세요."),
"notify": ("/ˈnoʊtɪˌfaɪ/","동사","알리다","Please notify us of any cancellations.","취소 사항이 있으면 알려주세요."),
"preview": ("/ˈpriːvjuː/","명사","미리 보기","Here is a preview of your tour itinerary.","투어 일정의 미리 보기입니다."),
"attendant": ("/əˈtɛndənt/","명사","승무원, 안내원","The flight attendant explained the safety procedures.","승무원이 안전 절차를 설명했습니다."),
"subscription": ("/səbˈskrɪpʃən/","명사","구독","Cancel your subscription before the trial ends.","체험 기간이 끝나기 전에 구독을 취소하세요."),
"convenient": ("/kənˈviːniənt/","형용사","편리한","The hotel's location is very convenient.","호텔 위치가 매우 편리합니다."),
"manual": ("/ˈmænjuəl/","명사","설명서","Check the manual for operating instructions.","작동 지침은 설명서를 확인하세요."),
"clue": ("/kluː/","명사","단서, 힌트","I have no clue where the key is.","열쇠가 어디 있는지 전혀 모르겠습니다."),
"garage": ("/ɡəˈrɑːʒ/","명사","주차장, 차고","The hotel has an underground garage.","호텔에는 지하 주차장이 있습니다."),

# ── Business English key words ─────────────────────────────────────────────
"correlate": ("/ˈkɒrɪleɪt/","동사","상관관계가 있다","Sales figures correlate with marketing spend.","판매 수치는 마케팅 지출과 상관관계가 있습니다."),
"compel": ("/kəmˈpɛl/","동사","강요하다","The contract compels both parties to meet deadlines.","계약은 양 당사자가 마감일을 지키도록 강제합니다."),
"destination": ("/ˌdɛstɪˈneɪʃən/","명사","목적지","What is your final destination?","최종 목적지가 어디인가요?"),
"agriculture": ("/ˈæɡrɪˌkʌltʃər/","명사","농업","The region's economy is based on agriculture.","그 지역 경제는 농업에 기반합니다."),
"transmission": ("/trænzˈmɪʃən/","명사","전송, 변속기","The data transmission failed due to poor connection.","연결 불량으로 데이터 전송에 실패했습니다."),
"multiplier": ("/ˈmʌltɪplaɪər/","명사","승수, 배율","The economic multiplier effect boosts growth.","경제적 승수 효과가 성장을 촉진합니다."),
"substitution": ("/ˌsʌbstɪˈtjuːʃən/","명사","대체, 대리","Product substitution can reduce costs.","제품 대체는 비용을 줄일 수 있습니다."),
"pursuit": ("/pərˈsjuːt/","명사","추구, 추진","The company is in pursuit of new markets.","회사는 새로운 시장을 추구하고 있습니다."),
"minimal": ("/ˈmɪnɪməl/","형용사","최소한의","The project requires minimal investment.","프로젝트는 최소한의 투자가 필요합니다."),
"eager": ("/ˈiːɡər/","형용사","열렬한, 간절한","She is eager to learn new skills.","그녀는 새로운 기술을 배우기를 간절히 원합니다."),
"seasonal": ("/ˈsiːzənəl/","형용사","계절적인","Seasonal sales peaks occur in December.","계절적 판매 피크는 12월에 발생합니다."),
"vector": ("/ˈvɛktər/","명사","벡터, 방향","Define the strategic vector for growth.","성장을 위한 전략적 방향을 정의하세요."),
"geographical": ("/ˌdʒiːəˈɡræfɪkəl/","형용사","지리적인","The geographical scope of operations has expanded.","운영의 지리적 범위가 확대됐습니다."),
"voucher": ("/ˈvaʊtʃər/","명사","상품권, 바우처","Redeem your voucher at any participating store.","참여 매장 어디서든 바우처를 사용하세요."),
"encompass": ("/ɪnˈkʌmpəs/","동사","포괄하다","The strategy encompasses all market segments.","전략은 모든 시장 부문을 포괄합니다."),
"proportional": ("/prəˈpɔːrʃənəl/","형용사","비례하는","The bonus is proportional to performance.","보너스는 성과에 비례합니다."),
"uncover": ("/ʌnˈkʌvər/","동사","발견하다, 밝히다","The audit uncovered several discrepancies.","감사에서 몇 가지 불일치가 발견됐습니다."),
"outbreak": ("/ˈaʊtˌbreɪk/","명사","발생, 발발","The outbreak of illness affected operations.","질병의 발생이 운영에 영향을 미쳤습니다."),
"deficiency": ("/dɪˈfɪʃənsi/","명사","결핍, 부족","A cash deficiency needs immediate attention.","현금 부족은 즉각적인 주의가 필요합니다."),
"imbalance": ("/ɪmˈbæləns/","명사","불균형","A trade imbalance can affect exchange rates.","무역 불균형은 환율에 영향을 미칠 수 있습니다."),
"bolster": ("/ˈboʊlstər/","동사","강화하다","New investment will bolster the company's finances.","새로운 투자가 회사의 재정을 강화할 것입니다."),
"constructive": ("/kənˈstrʌktɪv/","형용사","건설적인","Please provide constructive feedback.","건설적인 피드백을 제공해 주세요."),
"separatist": ("/ˈsɛpərətɪst/","명사","분리주의자","The report addressed the separatist movement's impact.","보고서는 분리주의 운동의 영향을 다루었습니다."),

# ── Academic English key words ─────────────────────────────────────────────
"transcribe": ("/trænˈskraɪb/","동사","전사하다, 기록하다","Researchers transcribed all interview recordings.","연구자들은 모든 인터뷰 녹음을 전사했습니다."),
"dilute": ("/daɪˈluːt/","동사","희석하다","The solution was diluted to reduce concentration.","농도를 낮추기 위해 용액을 희석했습니다."),
"tribe": ("/traɪb/","명사","부족","The study examined three indigenous tribes.","연구는 세 원주민 부족을 조사했습니다."),
"damp": ("/dæmp/","형용사","습한","The damp climate affects plant growth.","습한 기후가 식물 성장에 영향을 미칩니다."),
"economically": ("/ˌiːkəˈnɒmɪkli/","부사","경제적으로","The region is economically significant.","그 지역은 경제적으로 중요합니다."),
"critically": ("/ˈkrɪtɪkli/","부사","비판적으로, 중요하게","The data must be critically evaluated.","데이터를 비판적으로 평가해야 합니다."),
"par": ("/pɑːr/","명사","동등한 수준, 기준","The results are on par with previous studies.","결과는 이전 연구와 동등한 수준입니다."),
"ion": ("/ˈaɪɒn/","명사","이온","Ions carry electrical charge through the solution.","이온은 용액을 통해 전하를 운반합니다."),
"denote": ("/dɪˈnoʊt/","동사","나타내다, 의미하다","The symbol denotes statistical significance.","이 기호는 통계적 유의미성을 나타냅니다."),
}


def patch_all():
    print("=== Patching fallback entries ===\n")
    total_patched = 0

    json_files = glob.glob(os.path.join(DATA, "**", "words-*.json"), recursive=True)
    # Skip travel-english (already filled)
    json_files = [f for f in json_files if "travel-english" not in f]

    for fp in sorted(json_files):
        with open(fp, encoding="utf-8") as f:
            entries = json.load(f)

        patched = 0
        for entry in entries:
            # Only patch entries where meaning == word (fallback) or empty
            if entry.get("meaning") and entry["meaning"] != entry["word"]:
                continue
            word = entry["word"]
            key = word.lower()
            if key in PATCH:
                pron, pos, meaning, ex_en, ex_ko = PATCH[key]
                entry["pronunciation"] = pron
                entry["partOfSpeech"] = pos
                entry["meaning"] = meaning
                entry["exampleEn"] = ex_en
                entry["exampleKo"] = ex_ko
                patched += 1
            elif word in PATCH:  # case-sensitive match for "I"
                pron, pos, meaning, ex_en, ex_ko = PATCH[word]
                entry["pronunciation"] = pron
                entry["partOfSpeech"] = pos
                entry["meaning"] = meaning
                entry["exampleEn"] = ex_en
                entry["exampleKo"] = ex_ko
                patched += 1

        if patched:
            with open(fp, "w", encoding="utf-8") as f:
                json.dump(entries, f, ensure_ascii=False, indent=2)
            rel = os.path.relpath(fp, BASE)
            print(f"  ✓ {rel}: +{patched} patched")
            total_patched += patched

    print(f"\n=== Done. Total patched: {total_patched} ===")


if __name__ == "__main__":
    patch_all()
