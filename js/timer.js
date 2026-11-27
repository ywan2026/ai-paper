// ===============================================================
//  수업 타이머 (모래시계)
//  - 교사: 1·3·5·10분 시작, 일시정지/계속, 끄기
//  - 학생: 교사와 같은 타이머가 자동으로 표시
//  - 위치는 드래그로 옮길 수 있고(기기별 저장), 최소화하면 화면에서 숨김
//  - 동기화: '__timer__' 슬라이드 키의 메시지로 저장 → 실시간·새로고침 모두 반영
// ===============================================================
(function () {
  const KEY = '__timer__';
  const PRESETS = [1, 3, 5, 10];
  let ctx = null, el = null, lastId = null, st = { s: 'off', d: 0, r: 0, base: 0 }, raf = 0, srvOff = 0, beeped = false;
  let minimized = false;
  const $ = (id) => document.getElementById(id);
  const posKey = () => 'class-timer-pos:' + ctx.ROOM;

  const fmt = (ms) => { const t = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
  const remaining = () => (st.s === 'run' ? st.base + st.r - (Date.now() - srvOff) : st.s === 'pause' ? st.r : 0);

  function build() {
    el = document.createElement('div');
    el.className = 'ctimer'; el.id = 'ctimer'; el.hidden = true;
    el.innerHTML = `
      <div class="ct-head" id="ctHead"><span class="ct-grip">⋮⋮</span><b>타이머</b><button class="ct-ico" id="ctMin" title="최소화(숨기기)">–</button></div>
      <div class="ct-body">
        <svg class="ct-glass" id="ctGlass" viewBox="0 0 60 90" aria-hidden="true">
          <defs>
            <clipPath id="ctTop"><path d="M10 8 H50 C50 26 34 36 31 45 H29 C26 36 10 26 10 8Z"/></clipPath>
            <clipPath id="ctBot"><path d="M29 45 H31 C34 54 50 64 50 82 H10 C10 64 26 54 29 45Z"/></clipPath>
          </defs>
          <rect x="6" y="3" width="48" height="5" rx="2.5" class="ct-cap"/>
          <rect x="6" y="82" width="48" height="5" rx="2.5" class="ct-cap"/>
          <path d="M10 8 H50 C50 26 34 36 31 45 C34 54 50 64 50 82 H10 C10 64 26 54 29 45 C26 36 10 26 10 8Z" class="ct-shell"/>
          <g clip-path="url(#ctTop)"><rect id="ctSandTop" x="0" y="8" width="60" height="37" class="ct-sand"/></g>
          <g clip-path="url(#ctBot)"><rect id="ctSandBot" x="0" y="82" width="60" height="0" class="ct-sand"/></g>
          <line id="ctStream" x1="30" y1="44" x2="30" y2="80" class="ct-stream"/>
        </svg>
        <div class="ct-right">
          <div class="ct-time" id="ctTime">00:00</div>
          <div class="ct-state" id="ctState">대기 중</div>
          <div class="ct-bar"><i id="ctBar"></i></div>
        </div>
      </div>
      <div class="ct-ctrl teacher-only">
        <div class="ct-presets">${PRESETS.map((m) => `<button class="ct-btn" data-min="${m}">${m}분</button>`).join('')}</div>
        <div class="ct-actions"><button class="ct-btn wide" id="ctPause">일시정지</button><button class="ct-btn wide danger" id="ctOff">끄기</button></div>
      </div>`;
    document.body.appendChild(el);

    // 최소화 시 다시 여는 버튼 (상단 주소창 오른쪽)
    const pill = document.createElement('button');
    pill.className = 'ct-pill'; pill.id = 'ctPill'; pill.hidden = true; pill.title = '타이머 보기';
    pill.innerHTML = '⏳ <span id="ctPillTime"></span>';
    const right = document.querySelector('.chrome-right');
    if (right) right.insertBefore(pill, right.firstChild); else document.body.appendChild(pill);
    pill.onclick = () => { minimized = false; show(); };

    $('ctMin').onclick = () => { minimized = true; show(); };
    el.querySelectorAll('[data-min]').forEach((b) => (b.onclick = () => send({ s: 'run', d: +b.dataset.min * 60000, r: +b.dataset.min * 60000 })));
    $('ctPause').onclick = () => {
      if (st.s === 'run') send({ s: 'pause', d: st.d, r: Math.max(0, remaining()) });
      else if (st.s === 'pause') send({ s: 'run', d: st.d, r: st.r });
    };
    $('ctOff').onclick = () => send({ s: 'off', d: 0, r: 0 });
    drag();
  }

  async function send(state) {
    if (!ctx.S.teacher) return;
    // 바로 반영(낙관적 업데이트) 후 서버에 저장
    apply({ ...state, base: Date.now() - srvOff }, true);
    try { await ctx.api.teacherSend(ctx.S.code, KEY, JSON.stringify(state)); }
    catch (e) { console.error(e); alert('타이머를 학생 화면에 보내지 못했어요. 인터넷 연결을 확인해 주세요.'); }
  }

  function apply(state, fresh) {
    const wasOff = st.s === 'off';
    const same = st.s === state.s && st.d === state.d && st.r === state.r;
    if (same) { st.base = state.base; show(); loop(); return; }
    st = state;
    beeped = st.s !== 'run' ? beeped : (remaining() <= 0);
    if (fresh && st.s === 'run' && (wasOff || st.r === st.d)) { minimized = false; flip(); beeped = false; }
    show();
    loop();
  }

  // 메시지 목록에서 가장 최근 타이머 상태를 찾아 반영
  function sync(messages, liveRow) {
    if (!el) return;
    if (liveRow && liveRow.created_at) {
      const off = Date.now() - Date.parse(liveRow.created_at);
      if (Number.isFinite(off) && Math.abs(off) < 10 * 60000) srvOff = off;
    }
    let last = null;
    for (const m of messages) if (m.slide_key === KEY && (!last || m.id > last.id)) last = m;
    if (!last) { if (lastId !== null) { lastId = null; apply({ s: 'off', d: 0, r: 0, base: 0 }); } return; }
    if (last.id === lastId) return;
    lastId = last.id;
    let p = null; try { p = JSON.parse(last.body); } catch (e) { return; }
    const fresh = Date.now() - srvOff - Date.parse(last.created_at) < 15000;
    apply({ s: p.s, d: p.d || 0, r: p.r || 0, base: Date.parse(last.created_at) }, fresh);
  }

  function show() {
    const active = st.s !== 'off';
    const want = ctx.S.teacher ? !minimized && (active || el.dataset.open === '1') : active && !minimized;
    el.hidden = !want;
    $('ctPill').hidden = !(active && minimized);
    $('ctPause').textContent = st.s === 'pause' ? '계속' : '일시정지';
    $('ctPause').disabled = !active;
    if (want) place();
  }

  function draw() {
    const rem = remaining(), d = st.d || 1;
    const frac = st.s === 'off' ? 0 : Math.max(0, Math.min(1, rem / d));
    const done = st.s !== 'off' && rem <= 0;
    $('ctTime').textContent = fmt(st.s === 'off' ? 0 : rem);
    $('ctPillTime').textContent = fmt(rem);
    $('ctState').textContent = st.s === 'off' ? '시간을 골라 시작하세요' : done ? '시간 종료!' : st.s === 'pause' ? '일시정지' : `${Math.round(d / 60000)}분 타이머`;
    $('ctBar').style.width = (frac * 100).toFixed(1) + '%';
    // 모래: 위(37) → 아래(37)
    const topH = 37 * frac, botH = st.s === 'off' ? 0 : 37 * (1 - frac);
    const t = $('ctSandTop'); t.setAttribute('y', 45 - topH); t.setAttribute('height', topH);
    const b = $('ctSandBot'); b.setAttribute('y', 82 - botH); b.setAttribute('height', botH);
    $('ctStream').style.opacity = st.s === 'run' && !done ? 1 : 0;
    el.classList.toggle('done', done);
    el.classList.toggle('low', !done && st.s === 'run' && rem <= 10000);
    el.classList.toggle('running', st.s === 'run' && !done);
    if (done && !beeped) { beeped = true; if (ctx.S.teacher) beep(); }
  }

  function loop() {
    cancelAnimationFrame(raf);
    const step = () => { draw(); if (st.s === 'run' && remaining() > -1000) raf = requestAnimationFrame(step); };
    step();
  }

  function flip() {
    const g = $('ctGlass'); g.classList.remove('flip'); void g.getBoundingClientRect(); g.classList.add('flip');
  }

  function beep() {
    try {
      const A = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach((t) => {
        const o = A.createOscillator(), g = A.createGain(); o.frequency.value = 880; o.connect(g); g.connect(A.destination);
        g.gain.setValueAtTime(0.0001, A.currentTime + t); g.gain.exponentialRampToValueAtTime(0.25, A.currentTime + t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, A.currentTime + t + 0.28); o.start(A.currentTime + t); o.stop(A.currentTime + t + 0.3);
      });
    } catch (e) {}
  }

  // ---------- 위치 이동 ----------
  function place() {
    let p = null; try { p = JSON.parse(localStorage.getItem(posKey())); } catch (e) {}
    const w = el.offsetWidth || 260, h = el.offsetHeight || 160;
    const x = p ? p.x : window.innerWidth - w - 24, y = p ? p.y : 96;
    el.style.left = Math.max(4, Math.min(window.innerWidth - w - 4, x)) + 'px';
    el.style.top = Math.max(4, Math.min(window.innerHeight - h - 4, y)) + 'px';
  }
  function drag() {
    const head = $('ctHead');
    let sx, sy, ox, oy, on = false;
    head.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      on = true; sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
      head.setPointerCapture(e.pointerId); el.classList.add('dragging'); e.preventDefault();
    });
    head.addEventListener('pointermove', (e) => {
      if (!on) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      el.style.left = Math.max(4, Math.min(window.innerWidth - w - 4, ox + e.clientX - sx)) + 'px';
      el.style.top = Math.max(4, Math.min(window.innerHeight - h - 4, oy + e.clientY - sy)) + 'px';
    });
    const end = () => {
      if (!on) return; on = false; el.classList.remove('dragging');
      try { localStorage.setItem(posKey(), JSON.stringify({ x: el.offsetLeft, y: el.offsetTop })); } catch (e) {}
    };
    head.addEventListener('pointerup', end); head.addEventListener('pointercancel', end);
    window.addEventListener('resize', () => { if (!el.hidden) place(); });
  }

  window.ClassTimer = {
    init(c) {
      ctx = c; build();
      const tb = $('tbTimer');
      if (tb) tb.onclick = () => {
        const open = !el.hidden;
        if (open) { minimized = true; el.dataset.open = '0'; }
        else { minimized = false; el.dataset.open = '1'; }
        show(); draw();
      };
      draw();
    },
    sync,
    isTimerKey: (k) => k === KEY,
  };
})();
