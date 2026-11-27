// ===============================================================
//  슬라이드 내용 — 순서·문구를 바꾸려면 이 파일을 고치세요.
//  key: 응답 저장용 고유값(바꾸면 기존 응답과 연결이 끊깁니다)
//  둔촌중학교 3학년 · AI 활용 탐구 특강 (2026.11.27. 15:10~17:10)
// ===============================================================
window.SECTIONS = ['시작', 'AI와 공부하는 규칙', '논문 찾기', '논문 읽기', 'Gemini 노트북', '프롬프트', '마무리'];

// 실습 논문 (수업 전에 링크가 열리는지 꼭 확인하세요)
const PAPER_A = {
  pdf: 'https://koreascience.kr/article/JAKO202412343287537.pdf',
  apa: '김예솔란. (2024). 청소년의 스마트폰 중독이 또래 관계의 질에 미치는 영향: 우울의 매개 역할. <i>한국인터넷방송통신학회 논문지, 24</i>(2), 161–166. https://doi.org/10.7236/JIIBC.2024.24.2.161',
};
const PAPER_B = {
  page: 'https://e-mch.org/journal/view.php?number=581',
  apa: '이은지, 박찬미, 김현옥. (2023). 여자 청소년의 또래관계가 스마트폰 과의존에 미치는 영향: 우울의 매개효과. <i>Journal of the Korean Society of Maternal and Child Health, 27</i>(1), 14–23. https://doi.org/10.21896/jksmch.2023.27.1.14',
};
const btn = (url, label) => `<a class="btn" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;

window.SLIDES = [
  // ───────────── 시작 (10분) ─────────────
  {
    key: 'cover', section: 0, layout: 'cover',
    kicker: '둔촌중학교 3학년 · AI 활용 탐구 특강',
    title: 'AI와 함께 논문 찾고, 읽고, 확인하기',
    html: `<p class="lead">AI가 대신 써 주는 법이 아니라, AI와 함께 <b>자료를 찾고 읽고 검증하는 법</b>을 배워요.</p>
      <div class="chips"><span class="chip">2시간 · 15:10~17:10</span><span class="chip">디벗 + 학교 구글 계정</span><span class="chip">오른쪽 채팅창에 의견을 남겨요</span><span class="chip">화면은 선생님이 넘겨요</span></div>`,
    chatPrompt: '들어왔다면 인사 한마디!',
  },
  {
    key: 'agenda', section: 0, title: '오늘의 지도',
    html: `<div class="steps three">
        <div class="step"><b>1</b><div><h4>AI와 공부하는 규칙</h4><p>어디까지가 도움이고, 어디부터가 대신일까? · 20분</p></div></div>
        <div class="step"><b>2</b><div><h4>논문 찾기</h4><p>RISS·KCI에서 똑똑하게 검색하기 · 20분</p></div></div>
        <div class="step"><b>3</b><div><h4>논문 읽기</h4><p>구조를 알면 빨라진다 · 참고문헌 읽는 법 · 25분</p></div></div>
        <div class="step"><b>4</b><div><h4>Gemini 노트북</h4><p>내가 고른 논문만 근거로 묻고 답하기 · 20분</p></div></div>
        <div class="step"><b>5</b><div><h4>프롬프트 A/B</h4><p>같은 AI, 다른 질문, 다른 답 · 12분</p></div></div>
        <div class="step"><b>6</b><div><h4>내 탐구 씨앗</h4><p>오늘 찾은 것으로 다음 한 걸음 정하기 · 8분</p></div></div>
      </div>
      <div class="callout small"><b>오늘 쓰는 무료 도구 3가지</b> Google Gemini · Gemini 노트북(옛 이름 NotebookLM) · RISS/KCI 학술 검색. 모두 <b>학교 구글 계정</b>으로 로그인해요.</div>`,
    chatPrompt: '오늘 가장 기대되는 순서는?',
  },
  {
    key: 'survey-freq', section: 0, title: 'AI를 얼마나 자주 쓰나요?',
    html: `<p class="sub">ChatGPT, Gemini, 뤼튼, 번역기, 사진 앱의 AI 기능까지 모두 포함해요.</p>`,
    poll: { options: ['거의 매일', '일주일에 2~3번', '한 달에 몇 번', '거의 안 써요'] },
    chatPrompt: '가장 자주 쓰는 AI 이름과 주로 하는 일',
  },
  {
    key: 'survey-paper', section: 0, title: '논문을 직접 읽어 본 적이 있나요?',
    poll: { options: ['한 편을 끝까지 읽어 봤다', '초록(요약)만 본 적 있다', '검색만 해 봤다', '오늘이 처음이다'] },
    chatPrompt: '논문 하면 떠오르는 단어 하나',
  },
  {
    key: 'interest', section: 0, layout: 'question',
    kicker: '자유 응답',
    title: '요즘 내가 더 깊이 파고들고 싶은 주제는?',
    html: `<p class="sub">진로, 좋아하는 과목, 뉴스에서 본 것 모두 좋아요. 예: 숏폼과 집중력 · 기후와 급식 · 게임과 뇌 · 로봇과 일자리</p>`,
    chatPrompt: '내 관심 주제를 적어 주세요 (오늘 이 주제로 실습해요)',
  },

  // ───────────── ① AI와 공부하는 규칙 (20분) ─────────────
  {
    key: 'div-1', section: 1, layout: 'divider', title: 'AI와 공부하는 규칙',
    divider: { n: 1, sub: '어디까지가 도움이고, 어디부터가 대신일까?', mins: '20분' },
    chatPrompt: '어디까지가 도움이고, 어디부터가 대신일까?',
  },
  {
    key: 'judge', section: 1, title: 'AI 사용, 어디까지 괜찮을까?',
    html: `<p class="sub">네 친구가 소논문(탐구 보고서)을 준비하며 AI를 썼어요. O(괜찮다) · △(조건부) · X(안 된다)로 판정하고, 이유는 채팅에 써 주세요.</p>`,
    cards: {
      choices: ['O', '△', 'X'],
      items: [
        { title: '민서', text: '탐구 주제를 정하려고 Gemini에게 "중학생이 탐구할 만한 환경 주제 10개"를 물어보고, 그중 하나를 직접 골랐다.', answer: 'O', explain: '아이디어를 넓히는 데 쓰고, 고르는 판단은 스스로 했어요. 다만 그 주제가 실제로 연구된 적이 있는지 논문으로 확인해야 해요.' },
        { title: '하린', text: '직접 쓴 보고서를 AI에게 맞춤법만 고쳐 달라고 하고, 끝에 "AI로 맞춤법 검토"라고 표시했다.', answer: '△', explain: '표시까지 한 좋은 습관이에요. 하지만 수행평가·대회마다 허용 범위가 달라요. 제출 전에 그 과제의 규칙을 먼저 확인해야 해요.' },
        { title: '서아', text: 'AI가 알려 준 논문 3편을 참고문헌에 그대로 넣었다. 실제로 찾아 읽어 보지는 않았다.', answer: 'X', explain: 'AI는 존재하지 않는 논문을 그럴듯하게 만들어 낼 수 있어요(환각). 읽지 않은 자료를 참고문헌에 넣는 것 자체가 문제예요.' },
        { title: '지후', text: 'AI가 써 준 문단을 거의 그대로 복사해서 내 이름으로 제출했다.', answer: 'X', explain: '생각과 문장의 주인이 내가 아니에요. 학교 평가에서는 부정행위로 처리될 수 있고, 무엇보다 내 실력이 남지 않아요.' },
      ],
    },
    chatPrompt: '내 판정의 이유를 적어 주세요 (예: 하린 △ — 과제마다 규칙이 달라서)',
  },
  {
    key: 'hallu', section: 1, title: '실험: AI가 알려 준 논문, 진짜일까?',
    html: `<div class="steps three">
        <div class="step"><b>1</b><div><h4>Gemini에게 묻기</h4><p class="copy">청소년 스마트폰 사용과 수면에 관한 한국 학술논문 3편을 저자, 연도, 제목, 학술지 이름과 함께 알려줘.</p></div></div>
        <div class="step"><b>2</b><div><h4>RISS에서 검색</h4><p>논문 제목을 그대로 복사해 RISS 검색창에 넣어요.</p></div></div>
        <div class="step"><b>3</b><div><h4>하나씩 대조</h4><p><b>저자 · 연도 · 학술지</b>까지 모두 일치해야 "진짜"예요. 제목만 비슷하면 가짜일 수 있어요.</p></div></div>
      </div>
      <div class="linkrow">${btn('https://www.riss.kr/', 'RISS 열기')}</div>`,
    link: { url: 'https://gemini.google.com/', label: 'Gemini 열기', hint: '학교 계정으로 로그인해요. 3분 뒤 결과를 골라 주세요.' },
    poll: { label: 'AI가 알려 준 3편 중, 저자·연도·학술지까지 그대로 확인된 논문은?', options: ['3편 모두', '2편', '1편', '0편'] },
    chatPrompt: '어디가 달랐나요? (저자, 연도, 학술지, 제목…)',
  },
  {
    key: 'hallu-why', section: 1, title: 'AI는 왜 없는 논문을 만들어 낼까?',
    html: `<div class="grid-2">
        <div class="info-card orange"><div class="tag">환각 (hallucination)</div><h3>그럴듯한 다음 말을 이어 붙이는 기계</h3><p>생성형 AI는 학습한 글의 패턴으로 <b>가장 그럴듯한 다음 단어</b>를 만들어요. 그래서 "있을 법한" 저자 이름과 제목을 지어낼 수 있어요. (예: "세종대왕은 맥북으로 훈민정음을 만들었다"처럼 그럴듯한 거짓말) 검색 기능이 켜져 있으면 줄어들지만, <b>0이 되지는 않아요.</b></p></div>
        <div class="info-card blue"><div class="tag">오늘의 원칙</div><h3>AI의 답은 출발점, 원문이 증거</h3><p>숫자 · 인용문 · 논문 제목은 <b>반드시 원문에서</b> 확인해요. 확인하지 못한 것은 쓰지 않아요.</p></div>
      </div>`,
    chatPrompt: '내가 AI 답을 그대로 믿었다가 틀렸던 경험이 있나요?',
  },
  {
    key: 'factcheck', section: 1, title: '환각에 속지 않는 팩트체크 3단계',
    html: `<div class="steps three">
        <div class="step"><b>1</b><div><h4>비판적으로 바라보기</h4><p>AI의 답이 <b>항상 옳지는 않다</b>는 것을 기억하고, 논리가 어긋나거나 어색한 부분을 찾아요.</p></div></div>
        <div class="step"><b>2</b><div><h4>출처 직접 확인하기</h4><p>AI가 말한 자료의 <b>원본에 직접 들어가</b> AI의 답과 같은지 확인해요. 논문이라면 원문을 열어 읽어요.</p></div></div>
        <div class="step"><b>3</b><div><h4>교차 검증하기</h4><p>믿을 수 있는 <b>다른 자료</b>(공공데이터, 학술지, 백과사전, 뉴스)에도 같은 내용이 있는지 비교해요.</p></div></div>
      </div>
      <div class="callout small"><b>예시</b> AI가 만든 출산율 표 → 통계청(KOSIS)에서 숫자를 대조 → 맞으면 <b>통계청을 출처로</b> 적어요. AI가 아니라 원자료가 출처예요.</div>`,
    chatPrompt: '오늘 환각 실험은 몇 단계까지 해 봤나요?',
  },
  {
    key: 'ox', section: 1, title: '시나리오 OX 퀴즈',
    html: `<p class="sub">이 행동은 올바를까요? O 또는 X를 고르고, 이유는 채팅에 써 주세요.</p>`,
    cards: {
      choices: ['O', 'X'],
      items: [
        { title: '철수 · 국어 보고서', text: 'AI가 김한국 교수의 논문을 출처로 알려 줬다. 그 논문이 실제로 있는지는 확인했지만, 원문은 읽지 않고 AI가 알려 준 내용을 그대로 보고서에 넣었다.', answer: 'X', explain: '논문이 "있다"는 것과 AI의 설명이 "맞다"는 것은 달라요. 반드시 원문을 열어 내용까지 확인해요.' },
        { title: '지훈 · 과학 보고서', text: '논문을 먼저 직접 읽으며 핵심 주장과 근거에 밑줄을 그었다. 그다음 AI 요약과 비교해 빠진 내용을 보완하고, 자기 말로 다시 정리해 출처와 함께 냈다.', answer: 'O', explain: '먼저 읽고 → AI 요약과 비교하고 → 내 말로 정리했어요. AI를 보조 도구로 잘 쓴 사례예요.' },
        { title: '민지 · 사회 수행평가', text: '긴 기사를 통째로 AI에 넣어 요약을 받았다. 원문은 읽지 않고, 요약을 그대로 복사해 보고서에 붙여 넣었다.', answer: 'X', explain: 'AI가 줄여 준 글은 내 요약이 아니에요. 중요한 맥락이 빠졌는지 확인할 수도 없어요.' },
        { title: '성훈 · 수학 질문', text: '모르는 문제를 사진으로 찍어 AI에게 보냈다. 사진 구석에 이름표와 집 주소가 적힌 택배 상자가 같이 찍혀 있었지만 확인하지 않았다.', answer: 'X', explain: '글뿐 아니라 사진·파일도 올리기 전에 확인해요. 필요한 부분만 잘라서 보내요.' },
      ],
    },
    chatPrompt: '가장 헷갈렸던 사례와 이유는?',
  },
  {
    key: 'three-steps', section: 1, title: 'AI와 함께할 때, 상황별 3단계',
    html: `<p class="sub">카드를 눌러 각 상황에서 지킬 3단계를 확인해요. 공통점은 <b>내가 먼저 하고, AI는 돕고, 마지막 판단은 내가</b> 한다는 것이에요.</p>`,
    flips: [
      { tag: '자료 검색', q: 'AI로 자료를 찾을 때는?', a: '① 비판적으로 바라보기 ② 출처 직접 확인하기 ③ 교차 검증하기' },
      { tag: '요약·정리', q: '논문이나 기사를 AI로 요약할 때는?', a: '① <b>먼저 읽고</b> 핵심 표시하기 ② AI 요약과 비교하기(빠진 것·다른 것·과장된 것) ③ 나의 말로 다시 정리하기' },
      { tag: '보고서·발표', q: 'AI로 글이나 발표자료를 만들 때는?', a: '① <b>스스로 초안</b> 작성하기 ② AI에게 검토 요청하기 ③ 나만의 언어로 수정하기' },
      { tag: '번역', q: '영어 논문 초록을 AI로 번역할 때는?', a: '① 사전으로 <b>먼저 스스로</b> 해 보기 ② AI에게 피드백 요청하기 ③ 교과서·사전과 교차 검증해 내 지식으로 만들기' },
      { tag: '개인정보', q: 'AI에 무언가를 올리기 전에는?', a: '① 멈추고 점검하기(이름·학교·주소·전화번호) ② 가상의 인물·상황으로 바꿔 표현하기 ③ 채팅 기록·학습 사용 설정 확인하기' },
      { tag: '이미지·영상', q: 'AI로 그림이나 영상을 만들 때는?', a: '① 목적과 사용 범위 생각하기 ② 실제 인물·캐릭터·브랜드 등 권리 침해 확인하기 ③ "AI 생성" 사실 밝히기' },
    ],
    chatPrompt: '내가 가장 자주 하는 상황은 무엇이고, 지금까지 몇 단계를 지켜 왔나요?',
  },
  {
    key: 'rules', section: 1, title: 'AI와 공부할 때 지키는 5가지',
    html: `<div class="rules">
        <div class="rule"><b>1</b><p><strong>생각의 주인은 나</strong> — AI는 아이디어·설명·질문 상대. 결론과 문장은 내가 써요.</p></div>
        <div class="rule"><b>2</b><p><strong>원문으로 확인</strong> — 숫자, 인용, 논문 정보는 원문을 직접 열어 대조해요.</p></div>
        <div class="rule"><b>3</b><p><strong>출처 표기</strong> — 읽은 자료는 참고문헌으로, AI의 도움은 'AI 활용 표기'로 밝혀요.</p></div>
        <div class="rule"><b>4</b><p><strong>개인정보는 넣지 않기</strong> — 내 이름·연락처, 친구 이야기·사진을 AI에 올리지 않아요.</p></div>
        <div class="rule"><b>5</b><p><strong>허용된 범위에서만</strong> — 수업·과제에서는 선생님이 미리 허용한 도구와 범위 안에서만 써요. 어기면 표절·부정행위가 될 수 있어요.</p></div>
      </div>
      <div class="callout small"><b>AI 활용 표기 예시</b> 이 보고서의 주제 아이디어 정리와 영어 초록 번역에 Google Gemini를 사용했고, 인용한 내용은 모두 원문과 대조해 확인했습니다. (2026. 11. 27.)</div>`,
    chatPrompt: '5가지 중 나에게 가장 어려울 것 같은 것은?',
  },

  // ───────────── ② 논문 찾기 (20분) ─────────────
  {
    key: 'div-2', section: 2, layout: 'divider', title: '논문 찾기',
    divider: { n: 2, sub: '믿을 수 있는 곳에서, 똑똑한 검색어로', mins: '20분' },
    chatPrompt: '믿을 수 있는 곳에서, 똑똑한 검색어로',
  },
  {
    key: 'where', section: 2, title: '논문은 어디서 찾을까?',
    html: `<div class="cases-list">
        <div class="mini"><b>RISS · riss.kr</b><span>한국교육학술정보원. 국내 학술지 논문과 학위논문을 한 번에 검색해요. 논문 초록을 18개 언어로 바로 번역해 보여 주는 기능도 있어요.</span></div>
        <div class="mini"><b>KCI · kci.go.kr</b><span>한국연구재단의 학술지 인용색인. <b>KCI 등재</b> 표시는 심사를 거친 학술지라는 뜻이에요. 원문을 무료로 볼 수 있는 논문이 많아요.</span></div>
        <div class="mini"><b>KoreaScience · koreascience.kr</b><span>과학기술 분야 국내 학술지 원문을 PDF로 무료 공개하는 곳이 많아요. 오늘 읽을 논문 A도 여기 있어요.</span></div>
        <div class="mini"><b>Google 학술검색 · scholar.google.com</b><span>영어 논문까지 넓게 찾아요. <b>인용 횟수</b>와 <b>관련 학술자료</b>로 다음 논문을 이어서 찾을 수 있어요.</span></div>
      </div>
      <div class="callout small"><b>원문이 유료라면?</b> '원문 무료' 표시가 있는 다른 논문을 찾거나, 같은 저자의 다른 논문·학위논문을 찾아봐요. 공공도서관 회원으로 무료 열람이 되는 경우도 있어요.</div>
      <div class="linkrow">${btn('https://www.riss.kr/', 'RISS')}${btn('https://www.kci.go.kr/', 'KCI')}${btn('https://www.koreascience.kr/', 'KoreaScience')}${btn('https://scholar.google.com/', 'Google 학술검색')}</div>`,
    chatPrompt: '들어가 본 적 있는 사이트가 있나요?',
  },
  {
    key: 'search-tips', section: 2, title: '검색어를 바꾸면 결과가 바뀐다',
    html: `<div class="steps">
        <div class="step"><b>1</b><div><h4>핵심어 2~3개로 쪼개기</h4><p>"청소년이 스마트폰을 많이 하면 잠을 못 자나?" → <b>청소년 스마트폰 수면</b></p></div></div>
        <div class="step"><b>2</b><div><h4>비슷한 말로 바꿔 보기</h4><p>중독 ↔ 과의존 ↔ 의존 · 청소년 ↔ 중학생 · 수면 ↔ 수면의 질</p></div></div>
        <div class="step"><b>3</b><div><h4>"큰따옴표"로 정확히</h4><p><b>"스마트폰 과의존"</b>처럼 묶으면 그 구절이 그대로 있는 논문만 나와요.</p></div></div>
        <div class="step"><b>4</b><div><h4>좁히기</h4><p>최근 5년 · KCI 등재 · 원문 있음으로 걸러요.</p></div></div>
      </div>
      <div class="callout small"><b>AI 활용 팁</b> Gemini에게 "<i>[내 주제]</i>로 학술 검색할 때 쓸 키워드와 유의어를 한국어·영어로 10개 추천해 줘"라고 물어 검색어를 넓혀요. 검색 자체는 학술 사이트에서!</div>`,
    chatPrompt: '내 주제의 핵심어 2~3개는?',
  },
  {
    key: 'mission-search', section: 2, title: '미션: 내 주제로 논문 1편 찾기',
    html: `<div class="grid-2 make">
        <div>
          <ol class="howto">
            <li>내 관심 주제를 <b>핵심어 2~3개</b>로 바꿔요.</li>
            <li>RISS에서 검색하고, 안 나오면 <b>유의어</b>로 다시 검색해요.</li>
            <li>제목만 보지 말고 <b>초록</b>을 읽고 1편을 골라요.</li>
            <li>오른쪽 칸에 정보를 적어 제출해요.</li>
          </ol>
          <p class="hint">7분 · 다 찾았으면 옆 친구의 검색어를 하나 빌려 다시 검색해 봐요.</p>
        </div>
        <div class="submit-host"></div>
      </div>`,
    link: { url: 'https://www.riss.kr/', label: 'RISS 열기', hint: '새 탭에서 열려요. 찾은 뒤 이 화면으로 돌아오세요.' },
    submit: {
      fields: [
        { id: 'topic', label: '내 관심 주제', placeholder: '예: 숏폼 영상과 집중력', rows: 1 },
        { id: 'keywords', label: '사용한 검색어', placeholder: '예: 숏폼 집중력 / 숏폼 중독 청소년', rows: 1 },
        { id: 'title', label: '찾은 논문 (제목 · 저자 · 연도 · 학술지)', placeholder: '예: Z세대 이용자의 숏폼 동영상 지속 이용의도 및 중독 결정요인 / 이정기·최진호 / 2025 / 한국방송학보', rows: 3 },
        { id: 'why', label: '이 논문을 고른 이유 (초록에서 본 한 가지)', placeholder: '예: 중독에 영향을 주는 요인 중 자기통제가 있다는 결과가 궁금해서', rows: 2 },
      ],
      button: '제출하고 채팅에 공유',
    },
    chatPrompt: '제출하면 여기에 공유돼요. 친구 논문 중 읽고 싶은 것에 댓글!',
  },
  {
    key: 'break', section: 2, layout: 'question',
    kicker: '쉬는 시간',
    title: '5분 쉬어요',
    html: `<p class="sub">디벗은 그대로 켜 두세요. 다음은 논문을 실제로 함께 읽어요.</p>`,
    chatPrompt: '쉬는 동안 자유롭게!',
  },

  // ───────────── ③ 논문 읽기 (25분) ─────────────
  {
    key: 'div-3', section: 3, layout: 'divider', title: '논문 읽기',
    divider: { n: 3, sub: '처음부터 끝까지 다 읽지 않아도 돼요. 구조를 알면 빨라져요', mins: '25분' },
    chatPrompt: '구조를 알면 빨라져요',
  },
  {
    key: 'structure', section: 3, title: '논문은 이렇게 생겼어요',
    html: `<p class="sub">카드를 눌러 각 부분에 무엇이 들어 있는지 확인해요.</p>`,
    flips: [
      { tag: '초록·키워드', q: '논문 맨 앞의 짧은 요약. 여기에는 무엇이 있을까?', a: '연구 목적 · 대상 · 방법 · 결과를 <b>한 문단</b>으로. 이 논문을 읽을지 말지 결정하는 곳이에요.' },
      { tag: '서론', q: '연구자는 왜 이 연구를 했을까?', a: '문제 상황, 지금까지의 연구(선행연구), 그리고 <b>아직 모르는 것 = 연구 질문</b>이 나와요.' },
      { tag: '연구 방법', q: '누구를, 어떻게 조사했을까?', a: '대상(몇 명, 누구), 자료(설문·실험·공개 데이터), 측정 도구, 분석 방법. <b>믿을 만한지 판단하는 곳</b>이에요.' },
      { tag: '연구 결과', q: '숫자와 표가 가득한 이 부분은?', a: '무엇을 발견했는지. 처음엔 <b>표 제목과 본문 첫 문장</b>만 읽어도 충분해요.' },
      { tag: '논의·결론', q: '그래서 이 결과는 무슨 뜻일까?', a: '결과의 의미, <b>한계</b>(이 연구가 못 밝힌 것), 앞으로의 연구 제안. 내 탐구 주제의 씨앗이 여기 숨어 있어요.' },
      { tag: '참고문헌', q: '맨 뒤의 긴 목록은 왜 있을까?', a: '연구자가 읽고 근거로 삼은 자료. <b>다음에 읽을 논문의 지도</b>예요.' },
    ],
    chatPrompt: '어느 부분이 가장 중요해 보이나요? 이유는?',
  },
  {
    key: 'order', section: 3, title: '논문 읽는 순서 (추천)',
    html: `<div class="steps three">
        <div class="step"><b>1</b><div><h4>제목 · 키워드</h4><p>무엇에 관한 연구인지</p></div></div>
        <div class="step"><b>2</b><div><h4>초록</h4><p>목적·대상·방법·결과 한눈에</p></div></div>
        <div class="step"><b>3</b><div><h4>결론</h4><p>그래서 무엇을 알게 됐나</p></div></div>
        <div class="step"><b>4</b><div><h4>그림 · 표</h4><p>제목과 화살표만 먼저</p></div></div>
        <div class="step"><b>5</b><div><h4>연구 방법</h4><p>누구를 어떻게 조사했나</p></div></div>
        <div class="step"><b>6</b><div><h4>서론 · 논의</h4><p>왜 했고, 한계는 무엇인가</p></div></div>
      </div>
      <div class="callout"><b>모든 문장을 이해하려 하지 마세요</b> 네 가지만 찾으면 성공이에요: <b>무엇을</b> 알고 싶었나 · <b>누구를</b> 조사했나 · <b>어떻게</b> 조사했나 · <b>그래서</b> 무엇을 알게 됐나</div>`,
    chatPrompt: '평소 글을 읽는 순서와 무엇이 다른가요?',
  },
  {
    key: 'paper-a', section: 3, title: '함께 읽을 논문 A',
    html: `<div class="paper-card">
        <div class="tag">논문 A · 6쪽 · 원문 무료</div>
        <h3>청소년의 스마트폰 중독이 또래 관계의 질에 미치는 영향: 우울의 매개 역할</h3>
        <p class="ref">${PAPER_A.apa}</p>
      </div>
      <div class="grid-2">
        <div class="info-card blue"><div class="tag">이 논문을 고른 이유</div><ul><li>조사 대상이 <b>만 14세 청소년 2,288명</b> — 여러분 또래예요.</li><li>6쪽으로 짧고 구조가 교과서처럼 깔끔해요.</li><li>국가 패널조사 자료를 써서 조사 방법이 분명해요.</li></ul></div>
        <div class="info-card"><div class="tag">함께 하기</div><p>PDF를 열어 <b>초록 → 결론 → 그림·표</b> 순서로 3분 동안 훑어봐요. 다음 장에서 네 가지를 찾아 적어요.</p></div>
      </div>`,
    link: { url: PAPER_A.pdf, label: '논문 A PDF 열기', hint: 'KoreaScience 원문이에요. 열리지 않으면 RISS에서 제목으로 검색해요.' },
    chatPrompt: '제목만 보고 예상한 결과는?',
  },
  {
    key: 'paper-a-4', section: 3, title: '논문 A에서 네 가지를 찾아라',
    html: `<div class="grid-2 make">
        <div>
          <ol class="howto">
            <li><b>무엇을</b> — 연구 질문은? (서론 끝부분)</li>
            <li><b>누구를</b> — 대상과 인원은? (연구 방법 · 데이터 개요)</li>
            <li><b>어떻게</b> — 어떤 자료를 어떻게 분석했나? (한 줄이면 충분)</li>
            <li><b>그래서</b> — 핵심 결과는? (초록·결론)</li>
          </ol>
          <div class="share-guide"><b>모르는 단어는?</b> 그대로 적어 두세요. 4장 Gemini 노트북에서 물어볼 거예요.</div>
          <p class="hint">8분 · AI 없이 직접 찾아요. 찾은 문장이 몇 쪽에 있는지도 적어 두면 좋아요.</p>
        </div>
        <div class="submit-host"></div>
      </div>`,
    link: { url: PAPER_A.pdf, label: '논문 A PDF', hint: '' },
    submit: {
      fields: [
        { id: 'what', label: '무엇을 (연구 질문)', placeholder: '예: 스마트폰 중독이 ~에 어떤 영향을 미치는가?', rows: 2 },
        { id: 'who', label: '누구를 (대상·인원)', placeholder: '', rows: 1 },
        { id: 'how', label: '어떻게 (자료·분석)', placeholder: '', rows: 2 },
        { id: 'sowhat', label: '그래서 (핵심 결과)', placeholder: '', rows: 2 },
        { id: 'hard', label: '어려웠던 단어', placeholder: '예: 매개, 단면 데이터, 부트스트래핑', rows: 1 },
      ],
      button: '제출하고 채팅에 공유',
    },
    chatPrompt: '찾기 가장 어려웠던 것은 무엇이었나요?',
  },
  {
    key: 'mediator', section: 3, title: '매개변수: 원인과 결과 사이의 다리',
    html: `<div class="flow">
        <div class="node"><small>독립변수 (원인 쪽)</small><b>스마트폰 중독</b></div>
        <div class="arrow">→</div>
        <div class="node mid"><small>매개변수 (중간 다리)</small><b>우울</b></div>
        <div class="arrow">→</div>
        <div class="node"><small>종속변수 (결과 쪽)</small><b>또래 관계의 질</b></div>
      </div>
      <p class="sub center">논문 A의 결과: 스마트폰 중독이 높을수록 우울이 높았고, 우울이 높을수록 또래 관계의 질이 낮았어요. 우울이 둘 사이를 <b>일부 이어 주는</b> 것으로 나타났어요.</p>`,
    poll: { label: '그럼 이 연구로 "스마트폰 중독이 우울을 일으킨다"고 확실히 말할 수 있을까?', options: ['그렇다', '아니다', '잘 모르겠다'] },
    chatPrompt: '그렇게 고른 이유는?',
  },
  {
    key: 'limit', section: 3, title: '논문이 스스로 밝힌 한계',
    html: `<div class="grid-2">
        <div class="info-card orange"><div class="tag">단면 데이터</div><h3>한 시점에 한 번 조사했어요</h3><p>같은 시기에 함께 나타났다는 것(관련)은 알 수 있지만, <b>무엇이 먼저였는지(원인)</b>는 확정하기 어려워요. 저자도 이 점을 한계로 적었어요.</p></div>
        <div class="info-card orange"><div class="tag">자기보고</div><h3>학생 스스로 답한 설문이에요</h3><p>자기 상태를 실제보다 좋거나 나쁘게 답했을 수 있어요. 그래서 다른 방법의 연구와 <b>비교</b>해 보는 것이 중요해요.</p></div>
      </div>
      <div class="callout"><b>탐구의 씨앗은 '한계'에 있어요</b> "다음 연구에서는 ~를 살펴볼 필요가 있다"는 문장이 곧 내 소논문의 질문이 될 수 있어요.</div>`,
    chatPrompt: '내가 이 연구를 이어서 한다면 무엇을 바꿔 보고 싶나요?',
  },
  {
    key: 'apa', section: 3, title: '참고문헌은 왜 이렇게 쓸까? (APA 스타일)',
    html: `<div class="ref-anatomy">
        <span class="p1">김예솔란.</span> <span class="p2">(2024).</span> <span class="p3">청소년의 스마트폰 중독이 또래 관계의 질에 미치는 영향: 우울의 매개 역할.</span> <span class="p4"><i>한국인터넷방송통신학회 논문지, 24</i>(2), 161–166.</span> <span class="p5">https://doi.org/10.7236/JIIBC.2024.24.2.161</span>
      </div>
      <div class="legend5"><span class="p1">누가</span><span class="p2">언제</span><span class="p3">무엇을</span><span class="p4">어디에 (학술지, 권(호), 쪽)</span><span class="p5">어디서 찾나 (DOI 주소)</span></div>
      <div class="grid-2">
        <div class="info-card"><div class="tag">왜 이렇게 쓸까?</div><p>읽는 사람 누구나 <b>똑같은 자료를 다시 찾아갈 수 있게</b> 하려고요. 순서와 기호를 약속해 두면 한눈에 알아볼 수 있어요.</p></div>
        <div class="info-card"><div class="tag">본문에서는 짧게</div><p>"스마트폰 중독은 우울과 관련이 있었다<b>(김예솔란, 2024)</b>." 이렇게 쓰고, 자세한 정보는 맨 뒤 참고문헌에 적어요.</p></div>
      </div>`,
    chatPrompt: 'DOI가 무엇의 줄임말인지 찾아본 사람은 채팅에!',
  },
  {
    key: 'snowball', section: 3, title: '같은 조사 자료, 반대 방향? 논문 B',
    html: `<p class="sub">논문 A의 키워드(<b>또래관계 · 우울 · 스마트폰</b>)로 다시 검색하면 이런 논문이 나와요. 같은 '한국아동·청소년패널조사 2018'을 썼지만(조사 시점·대상은 달라요), 화살표 방향이 반대예요.</p>
      <div class="flow two">
        <div class="row"><span class="lab">논문 A</span><div class="node">스마트폰 중독</div><div class="arrow">→</div><div class="node mid">우울</div><div class="arrow">→</div><div class="node">또래 관계</div></div>
        <div class="row"><span class="lab">논문 B</span><div class="node">또래 관계</div><div class="arrow">→</div><div class="node mid">우울</div><div class="arrow">→</div><div class="node">스마트폰 과의존</div></div>
      </div>
      <p class="ref small">${PAPER_B.apa}</p>
      <div class="linkrow">${btn(PAPER_B.page, '논문 B 원문 페이지')}</div>`,
    poll: { label: '어느 쪽이 더 그럴듯할까?', options: ['스마트폰 → 우울 → 친구 관계', '친구 관계 → 우울 → 스마트폰', '서로 영향을 주고받는다', '더 조사해야 알 수 있다'] },
    chatPrompt: '내 생각과 그 이유 (이게 바로 탐구 질문!)',
  },

  // ───────────── ④ Gemini 노트북 (20분) ─────────────
  {
    key: 'div-4', section: 4, layout: 'divider', title: 'Gemini 노트북',
    divider: { n: 4, sub: '내가 고른 자료만 근거로 답하는 AI 공부 도우미 (옛 이름 NotebookLM)', mins: '20분' },
    chatPrompt: '내가 고른 자료만 근거로 답하는 AI',
  },
  {
    key: 'nb-what', section: 4, title: '일반 챗봇과 무엇이 다를까?',
    html: `<div class="table-wrap"><table class="terms">
        <thead><tr><th></th><th>일반 챗봇 (Gemini 등)</th><th>Gemini 노트북</th></tr></thead>
        <tbody>
          <tr><th>답의 근거</th><td>학습한 지식 + 웹 검색</td><td><b>내가 넣은 자료(소스)</b> 중심</td></tr>
          <tr><th>출처 확인</th><td>출처가 없거나 불분명할 때가 있어요</td><td>답마다 <b>[번호]</b>가 붙고, 누르면 원문 위치로 가요</td></tr>
          <tr><th>잘하는 일</th><td>아이디어, 설명, 검색어 추천</td><td>논문 요약·비교, 용어 풀이, 퀴즈·마인드맵</td></tr>
        </tbody></table></div>
      <div class="callout small"><b>이름이 바뀌었어요</b> 2026년 7월 NotebookLM의 이름이 <b>Gemini 노트북(Gemini Notebook)</b>으로 바뀌었어요. 주소(notebooklm.google.com)와 기능은 그대로예요. 학교 교육용 계정에서는 만 18세 미만에게 더 엄격한 콘텐츠 기준이 적용되고, 올린 자료는 AI 학습에 쓰이지 않아요.</div>`,
    chatPrompt: '써 본 적 있다면 어디에 썼나요?',
  },
  {
    key: 'nb-setup', section: 4, title: '따라 하기: 노트북 만들고 논문 넣기',
    html: `<div class="steps">
        <div class="step"><b>1</b><div><h4>접속·로그인</h4><p>notebooklm.google.com에 <b>학교 구글 계정</b>으로 로그인해요.</p></div></div>
        <div class="step"><b>2</b><div><h4>새 노트북</h4><p>'새로 만들기'를 누르고 이름을 <b>스마트폰과 청소년</b>으로 바꿔요.</p></div></div>
        <div class="step"><b>3</b><div><h4>소스 추가</h4><p>논문 A·B의 PDF를 내려받아 올려요. 내가 찾은 논문도 함께 넣어도 좋아요.</p></div></div>
        <div class="step"><b>4</b><div><h4>질문하고 [번호] 누르기</h4><p>답의 숫자를 눌러 <b>원문 어느 문장</b>에서 왔는지 확인해요.</p></div></div>
      </div>
      <div class="linkrow">${btn(PAPER_A.pdf, '논문 A PDF')}${btn(PAPER_B.page, '논문 B 페이지 (PDF 버튼)')}</div>`,
    link: { url: 'https://notebooklm.google.com/', label: 'Gemini 노트북 열기', hint: '새 탭에서 열려요.' },
    chatPrompt: '소스를 다 넣었으면 "완료!", 막혔다면 어디서 막혔는지',
  },
  {
    key: 'nb-check', section: 4, title: '근거 확인 미션',
    html: `<div class="grid-2 make">
        <div>
          <ol class="howto">
            <li>3장에서 적은 <b>어려운 단어</b>를 물어봐요. 예: "논문 A에서 '매개 역할'이 무슨 뜻인지 중학생이 이해하게 설명해 줘."</li>
            <li>사실 질문도 하나 해요. 예: "논문 B의 연구 대상은 누구이고 몇 명이야?"</li>
            <li>답의 <b>[번호]</b>를 눌러 원문 문장과 <b>일치하는지</b> 확인해요.</li>
          </ol>
          <div class="banlist"><b>잊지 말기</b> Gemini 노트북도 틀릴 수 있어요. 숫자와 인용은 원문 문장으로 확인!</div>
        </div>
        <div class="submit-host"></div>
      </div>`,
    submit: {
      fields: [
        { id: 'q', label: '내가 한 질문', placeholder: '', rows: 2 },
        { id: 'a', label: 'AI 답 요약 (한두 줄)', placeholder: '', rows: 2 },
        { id: 'match', label: '[번호]를 눌러 본 원문과 답이…', options: ['정확히 일치했다', '일부만 일치했다', '달랐다'] },
      ],
      button: '제출하고 채팅에 공유',
    },
    tally: ['match'],
    chatPrompt: '답과 원문이 달랐던 사례가 있었나요?',
  },
  {
    key: 'nb-tools', section: 4, title: '공부 도구로 한 단계 더',
    html: `<div class="cases-list">
        <div class="mini"><b>퀴즈 · 플래시카드</b><span>두 논문으로 문제를 만들어 스스로 풀어 봐요. 틀린 문제는 [번호]로 원문을 다시 읽어요.</span></div>
        <div class="mini"><b>마인드맵</b><span>개념들이 어떻게 이어지는지 한눈에. 논문 A와 B의 공통점·차이점을 찾기 좋아요.</span></div>
        <div class="mini"><b>보고서 · 학습 가이드</b><span>핵심 용어와 요약을 정리해 줘요. 그대로 베끼지 말고 <b>내 말로 다시 쓰기</b>의 재료로!</span></div>
        <div class="mini"><b>오디오 개요</b><span>두 진행자가 대화하듯 자료를 설명해 줘요. 이동하면서 듣기 좋아요.</span></div>
      </div>
      <p class="hint">학교 계정의 나이·관리자 설정에 따라 일부 기능이나 사용 횟수가 다를 수 있어요.</p>`,
    poll: { label: '직접 써 보니 가장 쓸모 있는 기능은?', options: ['퀴즈·플래시카드', '마인드맵', '보고서·학습 가이드', '오디오 개요', '채팅 질문'] },
    chatPrompt: '퀴즈에서 가장 어려웠던 문제를 공유해요',
  },

  // ───────────── ⑤ 프롬프트 (12분) ─────────────
  {
    key: 'div-5', section: 5, layout: 'divider', title: '프롬프트',
    divider: { n: 5, sub: '같은 AI, 다른 질문, 다른 답', mins: '12분' },
    chatPrompt: '같은 AI, 다른 질문, 다른 답',
  },
  {
    key: 'ab', section: 5, title: 'A와 B, 어느 질문이 더 좋은 답을 받을까?',
    html: `<div class="ab">
        <div class="abox a"><span class="ab-tag">A</span><p class="copy">스마트폰 논문 요약해 줘.</p></div>
        <div class="abox b"><span class="ab-tag">B</span><p class="copy">너는 중학생에게 논문을 쉽게 풀어 주는 과학 선생님이야. 나는 소논문 주제를 찾고 있는 중학교 3학년이야. 내가 올린 두 논문만 근거로 연구 대상, 조사 방법, 핵심 결과를 비교해 줘. 답하기 전에 내가 무엇이 궁금한지 알 수 있도록 나에게 먼저 질문 3개를 해 줘.</p></div>
      </div>
      <p class="hint">Gemini 노트북에 A와 B를 각각 넣어 보고 답을 비교해요. (3분)</p>`,
    poll: { label: '어느 답이 내 공부에 더 쓸모 있었나요?', options: ['A', 'B', '비슷했다'] },
    chatPrompt: 'B의 어떤 부분이 차이를 만들었을까요?',
  },
  {
    key: 'formula', section: 5, title: '좋은 프롬프트 = 화자 · 청자 · 리소스 + 먼저 묻게 하기',
    html: `<div class="pf3">
        <div class="pf"><span class="pf-k">화자</span><h4>AI는 누구로서 말할까?</h4><p class="copy">너는 중학생에게 논문을 쉽게 풀어 주는 과학 선생님이야.</p></div>
        <div class="pf"><span class="pf-k">청자</span><h4>누가 듣는 답일까?</h4><p class="copy">나는 소논문 주제를 찾는 중학교 3학년이야.</p></div>
        <div class="pf"><span class="pf-k">리소스</span><h4>무엇을 근거로?</h4><p class="copy">내가 올린 두 논문만 근거로, 출처 번호를 달아서.</p></div>
      </div>
      <div class="aba"><span class="pf-k plus">+ Ask-before-answer</span><div><h4>바로 답하지 말고, 나에게 먼저 묻게 하기</h4><p class="copy">답하기 전에 내 상황을 알 수 있도록 나에게 질문 3개를 먼저 해 줘.</p><p class="sub">AI가 내 관심과 수준을 먼저 확인하니, 여러 번 고쳐 묻지 않아도 맞춤형 답이 나와요. 시간이 절약돼요.</p></div></div>`,
    chatPrompt: '내 주제로 화자·청자·리소스를 한 줄씩 써 보세요',
  },
  {
    key: 'my-prompt', section: 5, title: '미션: 내 프롬프트 만들기',
    html: `<div class="grid-2 make">
        <div>
          <ol class="howto">
            <li><b>화자 · 청자 · 리소스</b>를 넣고, 끝에 <b>"먼저 질문해 줘"</b>를 붙여 프롬프트를 써요.</li>
            <li>Gemini 노트북(또는 Gemini)의 질문에 답한 뒤 결과를 확인해요.</li>
            <li>이어서 물을 <b>후속 질문</b> 하나를 정해요.</li>
          </ol>
          <div class="label-guide"><b>예시</b> "너는 청소년 연구를 도와주는 탐구 멘토야(화자). 나는 숏폼과 집중력에 관심 있는 중3이야(청자). 내가 올린 논문만 근거로(리소스) 중학생 대상 설문 탐구 아이디어를 제안해 줘. 답하기 전에 나에게 질문 3개를 먼저 해 줘(Ask-before-answer)."</div>
        </div>
        <div class="submit-host"></div>
      </div>`,
    submit: {
      fields: [
        { id: 'prompt', label: '내 프롬프트', placeholder: '', rows: 4 },
        { id: 'gain', label: '답에서 건진 것 한 가지', placeholder: '', rows: 2 },
        { id: 'next', label: '이어서 물을 질문', placeholder: '예: 3번 질문을 설문 문항으로 바꾸면?', rows: 1 },
      ],
      button: '제출하고 채팅에 공유',
    },
    chatPrompt: '친구 프롬프트에서 따라 하고 싶은 부분에 댓글!',
  },

  // ───────────── 마무리 (8분) ─────────────
  {
    key: 'div-6', section: 6, layout: 'divider', title: '마무리',
    divider: { n: 6, sub: '오늘 찾은 것으로 다음 한 걸음 정하기', mins: '8분' },
    chatPrompt: '오늘 찾은 것으로 다음 한 걸음',
  },
  {
    key: 'seed', section: 6, title: '내 탐구 씨앗 카드',
    html: `<div class="grid-2 make">
        <div>
          <ol class="howto">
            <li><b>주제</b>를 <b>질문</b>으로 바꿔요. "숏폼" → "숏폼 시청 시간은 중학생의 집중력과 관련이 있을까?"</li>
            <li>오늘 찾은 논문 1편을 <b>APA 형식</b>으로 적어요.</li>
            <li>다음에 할 일 하나를 정해요. (논문 1편 더 읽기, 선생님께 질문하기 등)</li>
          </ol>
          <p class="hint">제출한 카드는 선생님이 모아서 담당 선생님께 전달해요.</p>
        </div>
        <div class="submit-host"></div>
      </div>`,
    submit: {
      fields: [
        { id: 'question', label: '내 탐구 질문', placeholder: '~은 ~와 관련이 있을까? / ~은 ~에 어떤 영향을 줄까?', rows: 2 },
        { id: 'ref', label: '오늘 찾은 논문 (APA)', placeholder: '저자. (연도). 제목. 학술지, 권(호), 쪽.', rows: 3 },
        { id: 'next', label: '다음에 할 일', placeholder: '', rows: 1 },
      ],
      button: '씨앗 카드 제출',
    },
    chatPrompt: '내 탐구 질문을 공유해요',
  },
  {
    key: 'takeaway', section: 6, title: '오늘 기억할 세 문장',
    html: `<div class="rules">
        <div class="rule"><b>1</b><p>AI는 <strong>대신 써 주는 도구가 아니라, 찾고 읽고 묻는 것을 돕는 도구</strong>예요.</p></div>
        <div class="rule"><b>2</b><p>AI의 답은 출발점, <strong>원문이 증거</strong>. 확인하고, 출처를 밝혀요.</p></div>
        <div class="rule"><b>3</b><p><strong>좋은 질문을 하는 사람</strong>이 AI도, 논문도 잘 써요.</p></div>
      </div>`,
    poll: { label: '오늘 배운 것 중 가장 쓸모 있을 것은?', options: ['AI와 공부하는 규칙', '논문 찾기·검색어', '논문 읽는 순서·참고문헌', 'Gemini 노트북', '프롬프트 (화자·청자·리소스)'] },
    chatPrompt: '오늘 소감 한 줄',
  },
];
