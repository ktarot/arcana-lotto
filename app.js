/* ARCANA LOTTO — static client v1.1. No database, network, tracking, or external libraries. */
(() => {
  'use strict';
  const stats = window.TAROT_LOTTO_STATS;
  const config = window.TAROT_LOTTO_CONFIG || {};
  if (!stats || !Array.isArray(stats.frequencies) || stats.frequencies.length !== 45) {
    document.body.textContent = '통계 파일(stats.js)을 읽지 못했습니다. 배포 파일을 함께 보관하세요.';
    return;
  }
  const $ = id => document.getElementById(id);
  const args = new URLSearchParams(location.search);
  const src = ['wordpress', 'googlesites', 'naver'].includes(args.get('src')) ? args.get('src') : 'default';
  if (args.get('embed') === '1') document.body.classList.add('is-embed');
  const statsVersion = stats.version || `through-${stats.lastRound}`;
  const keyHistory = 'arcana-lotto-saved-v1';
  const roleNames = ['시작', '흐름', '완성'];
  const slotDescriptions = ['번호의 성향', '선택 방식', '조합의 형태'];

  // Each card has three fixed, independently meaningful mappings.
  // seed: candidate preference; flow: randomization/correlation; shape: final constraints.
  const cards = [
    [0, '바보', 'THE FOOL', '✧', '자유로운 시작', 'any', 'wild', 'free', '새로운 경험에 마음을 열어두고 가볍게 시작해 보세요.'],
    [1, '마법사', 'THE MAGICIAN', '✶', '능동적인 선택', 'numerology', 'focused', 'spread', '가능한 도구를 살펴보고 나에게 필요한 것을 스스로 선택해 보세요.'],
    [2, '여사제', 'THE HIGH PRIESTESS', '☾', '조용한 탐색', 'cold', 'gentle', 'spread', '당장 답을 내리기보다 내 생각을 한 번 더 들여다볼 때입니다.'],
    [3, '여황제', 'THE EMPRESS', '❀', '성장과 풍요', 'hot', 'open', 'balanced', '이미 가진 것을 잘 돌보면 작은 가능성을 키울 수 있습니다.'],
    [4, '황제', 'THE EMPEROR', '♜', '질서와 구조', 'hot', 'focused', 'balanced', '기준을 세우고 차근차근 실행하는 태도가 도움이 됩니다.'],
    [5, '교황', 'THE HIEROPHANT', '✠', '지식과 전통', 'adjhigh', 'steady', 'balanced', '오래된 지식이나 신뢰할 만한 조언을 다시 살펴보세요.'],
    [6, '연인', 'THE LOVERS', '♡', '연결과 선택', 'adjhigh', 'connected', 'adjacent', '관계 속에서 무엇을 우선할지 마음의 기준을 확인해 보세요.'],
    [7, '전차', 'THE CHARIOT', '⟡', '집중과 전진', 'numerology', 'focused', 'spread', '목표를 작게 나누고 한 방향으로 꾸준히 움직여 보세요.'],
    [8, '힘', 'STRENGTH', '♌', '인내와 조절', 'mixed', 'steady', 'balanced', '서두르지 않는 자신감이 상황을 안정시킬 수 있습니다.'],
    [9, '은둔자', 'THE HERMIT', '✦', '탐색과 성찰', 'cold', 'gentle', 'spread', '잠깐의 고요함이 놓쳤던 관점을 찾게 할 수 있습니다.'],
    [10, '운명의 수레바퀴', 'WHEEL OF FORTUNE', '☼', '변화와 우연', 'any', 'wild', 'free', '계획 밖의 작은 변화도 새로운 가능성으로 바라보세요.'],
    [11, '정의', 'JUSTICE', '⚖', '균형과 판단', 'mixed', 'steady', 'balanced', '선택의 양쪽을 공정하게 살피면 판단이 더 명료해집니다.'],
    [12, '매달린 사람', 'THE HANGED MAN', '◇', '관점의 전환', 'cold', 'reverse', 'spread', '익숙한 문제를 다른 각도에서 바라보는 시간을 가져보세요.'],
    [13, '죽음', 'DEATH', '✣', '변화와 정리', 'adjlow', 'wild', 'free', '지금은 끝낼 것과 새로 시작할 것을 나눠볼 시기입니다.'],
    [14, '절제', 'TEMPERANCE', '◈', '조화와 절제', 'mixed', 'gentle', 'balanced', '서로 다른 요소를 조화롭게 연결하는 방법을 찾아보세요.'],
    [15, '악마', 'THE DEVIL', '♢', '욕망과 집착', 'hot', 'focused', 'adjacent', '내가 무엇에 너무 매달리고 있는지 차분히 점검해 보세요.'],
    [16, '탑', 'THE TOWER', '♜', '돌발과 전환', 'any', 'reverse', 'spread', '생각과 다른 변화가 생겨도 새롭게 조정할 여지는 있습니다.'],
    [17, '별', 'THE STAR', '✩', '회복과 희망', 'numerology', 'open', 'balanced', '한 번에 모든 것을 해결하기보다 작은 희망을 이어가 보세요.'],
    [18, '달', 'THE MOON', '☽', '불확실성과 감각', 'cold', 'wild', 'free', '분명하지 않은 일에는 확인할 시간을 충분히 두세요.'],
    [19, '태양', 'THE SUN', '☀', '명료함과 활력', 'hot', 'open', 'balanced', '좋은 에너지는 주변과 나누고 작은 성취를 알아보세요.'],
    [20, '심판', 'JUDGEMENT', '♬', '재평가와 결정', 'adjlow', 'connected', 'spread', '지나온 선택을 돌아보고 지금의 기준으로 다시 생각해 보세요.'],
    [21, '세계', 'THE WORLD', '◎', '완성과 통합', 'mixed', 'steady', 'balanced', '지금까지 쌓아온 경험을 하나로 정리해 보는 것이 좋겠습니다.']
  ].map(([id, name, en, glyph, trait, seed, flow, shape, reading]) => ({id, name, en, glyph, trait, seed, flow, shape, reading}));

  const seeds = {
    any: {label:'전체 번호', explanation:'1~45 전체 번호에 동일한 시작 가중치를 부여합니다.'},
    cold: {label:'저빈도 우대', explanation:'과거 출현 횟수가 적었던 15개 번호에 더 높은 선택 가중치를 부여합니다.'},
    hot: {label:'고빈도 우대', explanation:'과거 출현 횟수가 많았던 15개 번호에 더 높은 선택 가중치를 부여합니다.'},
    adjhigh: {label:'연속 포함 고빈도', explanation:'과거 연속번호에 자주 포함되었던 15개 번호를 우대합니다.'},
    adjlow: {label:'연속 포함 저빈도', explanation:'과거 연속번호에 드물게 포함되었던 15개 번호를 우대합니다.'},
    mixed: {label:'통계 혼합', explanation:'고·저빈도와 연속번호 통계의 후보를 균형 있게 혼합합니다.'},
    numerology: {label:'수비학 후보군', explanation:'카드 번호의 자릿수 합과 연결되는 1~45의 번호군을 우대합니다.'}
  };
  const flows = {
    wild: {label:'자유로운 무작위', mix:.96, strength:.5, correlate:0, invert:false, explanation:'통계 선호도를 거의 줄여 무작위 비중을 크게 높입니다.'},
    focused: {label:'집중 선택', mix:.14, strength:1.05, correlate:0, invert:false, explanation:'첫 카드가 정한 후보 우대 가중치를 비교적 강하게 유지합니다.'},
    gentle: {label:'부드러운 혼합', mix:.50, strength:.95, correlate:0, invert:false, explanation:'후보 우대와 무작위를 부드럽게 섞습니다.'},
    open: {label:'넓은 선택', mix:.75, strength:.8, correlate:0, invert:false, explanation:'선택의 폭을 넓혀 다양한 번호가 등장하도록 합니다.'},
    steady: {label:'안정적인 혼합', mix:.40, strength:.95, correlate:0, invert:false, explanation:'통계 후보 우대와 무작위를 중간 수준으로 혼합합니다.'},
    connected: {label:'동반 출현 연결', mix:.35, strength:.95, correlate:.8, invert:false, explanation:'이미 선택한 번호와 과거 같은 회차에 함께 나온 번호의 가중치를 약하게 높입니다.'},
    reverse: {label:'역발상 선택', mix:.35, strength:.85, correlate:0, invert:true, explanation:'첫 카드의 후보 가중치를 일부 반대로 적용해 다른 번호를 탐색합니다.'}
  };
  const shapes = {
    free: {label:'자유 조합', explanation:'연속번호나 홀짝·구간 비율에 별도 조건을 적용하지 않습니다.'},
    balanced: {label:'균형 조합', explanation:'홀수·짝수와 1~22·23~45 구간이 각각 2~4개가 되도록 선택합니다.'},
    adjacent: {label:'연속번호 포함', explanation:'나란히 붙은 번호가 최소 한 쌍 포함되도록 구성합니다.'},
    spread: {label:'넓은 번호 분포', explanation:'가장 작은 수와 큰 수의 차이가 25 이상인 조합을 구성합니다.'}
  };

  const state = {mode:'tarot', picks:[], deck:[], count:[1,3,5,10].includes(config.defaultSetCount) ? config.defaultSetCount : 5, results:[], generation:null};
  const adapters = {onGenerated:()=>{}, onSaved:()=>{}}; // future API/DB integration hooks

  function randomUint32(){const u=new Uint32Array(1);crypto.getRandomValues(u);return u[0];}
  function randomFloat(){return randomUint32()/4294967296;}
  function randomInt(max){if (!Number.isInteger(max)||max<1) throw new Error('randomInt invalid max');const range=4294967296;const ceiling=range-(range%max);let k;do{k=randomUint32();}while(k>=ceiling);return k%max;}
  function shuffle(array){const a=[...array];for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
  function uniformSix(){return shuffle(Array.from({length:45},(_,i)=>i+1)).slice(0,6).sort((a,b)=>a-b);}
  function rankPool(series, high, count=15){return Array.from({length:45},(_,i)=>i+1).sort((a,b)=>((series[b-1]-series[a-1])*(high?1:-1)) || a-b).slice(0,count);}
  function root(n){return n === 0 ? 0 : ((n-1)%9)+1;}
  function weightForCard(card){
    const w=Array(46).fill(1);
    const boost=(list,amt)=>list.forEach(n=>{w[n]+=amt;});
    if(card.seed==='hot') boost(rankPool(stats.frequencies,true),1.1);
    else if(card.seed==='cold') boost(rankPool(stats.frequencies,false),1.1);
    else if(card.seed==='adjhigh') boost(rankPool(stats.adjacency,true),1.1);
    else if(card.seed==='adjlow') boost(rankPool(stats.adjacency,false),1.1);
    else if(card.seed==='mixed'){
      for(const [arr,hi] of [[stats.frequencies,true],[stats.frequencies,false],[stats.adjacency,true],[stats.adjacency,false]])boost(rankPool(arr,hi),.31);
    }else if(card.seed==='numerology' && card.id>0){
      const r=root(card.id);boost(Array.from({length:45},(_,i)=>i+1).filter(n=>root(n)===r),1.35);
    }
    return w;
  }
  function weightedSix(first,second){
    const flow=flows[second.flow];
    let weights=weightForCard(first);
    if(flow.invert){weights=weights.map((w,i)=>i===0?0:Math.max(.35,1.5-(w-1)*.5));}
    const selected=[];
    for(let pick=0;pick<6;pick++){
      let sum=0; const options=[];
      for(let n=1;n<=45;n++){
        if(selected.includes(n))continue;
        let w=Math.max(.05,1+(weights[n]-1)*(1-flow.mix)*flow.strength);
        if(flow.correlate&&selected.length){
          let affinity=0;
          for(const s of selected){const val=stats.cooccurrence[s-1][n-1];affinity+=val/Math.max(1,stats.frequencies[s-1]);}
          w *= 1 + flow.correlate * Math.min(1,affinity/selected.length*6);
        }
        sum+=w;options.push([n,sum]);
      }
      const r=randomFloat()*sum;
      const item=options.find(x=>r<x[1])||options[options.length-1];
      selected.push(item[0]);
    }
    return selected.sort((a,b)=>a-b);
  }
  function satisfiesShape(numbers,type){
    const odds=numbers.filter(n=>n%2).length;
    const lows=numbers.filter(n=>n<=22).length;
    if(type==='balanced')return odds>=2&&odds<=4&&lows>=2&&lows<=4;
    if(type==='adjacent')return numbers.some((n,i)=>i>0&&n===numbers[i-1]+1);
    if(type==='spread')return numbers[5]-numbers[0]>=25;
    return true;
  }
  function keyFor(numbers){return numbers.map(n=>String(n).padStart(2,'0')).join('-');}
  function generateSets(mode,picks,count){
    const keys=new Set();const result=[];const limit=count*450;
    for(let attempt=0;attempt<limit&&result.length<count;attempt++){
      const numbers=mode==='quick'?uniformSix():weightedSix(picks[0],picks[1]);
      if(mode==='tarot'&&!satisfiesShape(numbers,picks[2].shape))continue;
      const key=keyFor(numbers);if(keys.has(key))continue;
      keys.add(key);result.push(numbers);
    }
    return result;
  }
  const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function reseed(){state.deck=shuffle(cards.map(c=>c.id));state.picks=[];state.results=[];state.generation=null;renderAll();}
  function showToast(message){const box=$('toast');box.textContent=message;box.classList.remove('hidden');clearTimeout(showToast.timeout);showToast.timeout=setTimeout(()=>box.classList.add('hidden'),2400);}
  function renderChosen(){
    $('chosenCards').innerHTML=roleNames.map((role,i)=>{
      const c=state.picks[i];
      if(!c)return `<div class="chosen-slot"><span class="slot-n">0${i+1}</span><span>${role}</span><small>${slotDescriptions[i]}</small></div>`;
      return `<div class="chosen-slot picked" aria-label="${role}: ${safe(c.name)}"><span class="slot-n">0${i+1}</span><span class="chosen-glyph" aria-hidden="true">${c.glyph}</span><span class="chosen-name">${safe(c.name)}</span><small>${role}</small></div>`;
    }).join('');
  }
  function updateDeckScrollUI(){
    const grid=$('deckGrid'); const prev=$('deckPrev'); const next=$('deckNext');
    if(!grid||!prev||!next||$('deckArea').classList.contains('hidden')) return;
    const max=Math.max(0, grid.scrollWidth-grid.clientWidth-2);
    const atStart=grid.scrollLeft<=2;
    const atEnd=grid.scrollLeft>=max;
    prev.disabled=atStart; next.disabled=atEnd;
    prev.classList.toggle('is-disabled',atStart); next.classList.toggle('is-disabled',atEnd);
  }
  function scrollDeck(direction){
    const grid=$('deckGrid'); if(!grid) return;
    const amount=Math.max(180, Math.floor(grid.clientWidth*0.72));
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    grid.scrollBy({left: amount*direction, behavior: reduce?'auto':'smooth'});
  }
  function renderDeck(){
    const done=state.picks.length===3;
    $('deckArea').classList.toggle('hidden',done);
    if(done)return;
    $('deckRemain').textContent=`남은 카드 ${state.deck.length}장`;
    $('deckGrid').setAttribute('aria-label', `남아 있는 뒤집힌 타로카드 ${state.deck.length}장. 좌우로 스크롤할 수 있습니다.`);
    $('deckGrid').innerHTML=state.deck.map((id,i)=>`<button type="button" class="deck-card" data-pick="${id}" aria-label="펼쳐진 카드 ${i+1}번 선택"></button>`).join('');
    $('stepNum').textContent=String(state.picks.length+1).padStart(2,'0');
    $('stepHeading').textContent=['첫 번째 카드를 선택하세요','두 번째 카드를 선택하세요','마지막 카드를 선택하세요'][state.picks.length];
    $('stepDesc').textContent=[
      '첫 카드는 번호 후보의 성향을 결정합니다.',
      '두 번째 카드는 번호를 고르는 방식을 결정합니다.',
      '세 번째 카드는 조합의 형태를 결정합니다.'
    ][state.picks.length];
    requestAnimationFrame(updateDeckScrollUI);
  }
  function renderStrategy(){
    const node=$('strategyReveal');
    const done=state.picks.length===3;
    node.classList.toggle('hidden',!done);
    if(!done)return;
    $('stepNum').textContent='03';
    $('stepHeading').textContent='나만의 번호 레시피가 완성됐어요';
    $('stepDesc').textContent='선택한 카드의 상징을 아래의 생성 규칙으로 변환했습니다.';
    const [a,b,c]=state.picks;
    const lines=[['시작',`${a.name} · ${seeds[a.seed].label}`,seeds[a.seed].explanation],['흐름',`${b.name} · ${flows[b.flow].label}`,flows[b.flow].explanation],['완성',`${c.name} · ${shapes[c.shape].label}`,shapes[c.shape].explanation]];
    node.innerHTML=`<h3>✦ CARD RECIPE</h3>${lines.map(([position,label,detail])=>`<div class="strategy-line"><strong>${safe(position)}</strong><span><b>${safe(label)}</b><br>${safe(detail)}</span></div>`).join('')}`;
  }
  function renderControl(){
    document.querySelectorAll('[data-count]').forEach(b=>{const active=Number(b.dataset.count)===state.count;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
    const enabled=state.mode==='quick'||state.picks.length===3;
    const btn=$('generateBtn');btn.disabled=!enabled;btn.innerHTML=enabled?`${state.count}세트 생성하기 <span aria-hidden="true">→</span>`:'카드 3장을 먼저 선택해 주세요 <span aria-hidden="true">→</span>';
  }
  function colorClass(n){return n<=10?'y':n<=20?'b':n<=30?'r':n<=40?'k':'g';}
  function renderResults(){
    const node=$('results');node.classList.toggle('hidden',!state.results.length);
    if(!state.results.length)return;
    const mode=state.generation?.mode||state.mode;
    const extra=mode==='tarot' ? '카드의 상징을 반영한 통계적 선택 규칙을 사용했어요.' : '통계나 카드 조건 없이 균등 무작위로 골랐어요.';
    $('resultSub').textContent=`${state.results.length}세트 · ${extra}`;
    $('numbersList').innerHTML=state.results.map((numbers,i)=>`<div class="number-set"><div class="number-topline"><strong>SET ${String(i+1).padStart(2,'0')}</strong><small>${mode==='quick'?'UNIFORM RANDOM':'TAROT RECIPE'}</small></div><div class="ball-row">${numbers.map(n=>`<span class="ball ${colorClass(n)}" aria-label="${n}번">${n}</span>`).join('')}</div></div>`).join('');
    $('resultFlags').innerHTML=mode==='tarot'?`<strong>적용된 규칙:</strong> ${safe(seeds[state.picks[0].seed].label)} · ${safe(flows[state.picks[1].flow].label)} · ${safe(shapes[state.picks[2].shape].label)}<br>통계 스냅샷: ${safe(statsVersion)}`:`<strong>적용된 규칙:</strong> 균등 무작위 · 조합 내 중복 없음 · 동일 요청 내 세트 중복 방지`;
    $('readingTeaser').classList.toggle('hidden',mode!=='tarot');
    renderBlogLinks();
  }
  function verifiedExternalUrl(url){try{const u=new URL(url);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
  function renderBlogLinks(){
    const links=config.links?.[src]||config.links?.default||{};
    const items=[];
    for(const [k,label] of [['reading','타로 상담 알아보기'],['learning','타로 학습 알아보기']]){
      const url=verifiedExternalUrl(links[k]);if(url)items.push(`<a href="${safe(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`);
    }
    $('blogLinks').innerHTML=items.join('');$('blogLinks').classList.toggle('hidden',!items.length);
  }
  function renderAll(){
    const tarot=state.mode==='tarot';$('tarotPanel').classList.toggle('hidden',!tarot);$('quickPanel').classList.toggle('hidden',tarot);
    document.querySelectorAll('[data-mode]').forEach(b=>{const on=b.dataset.mode===state.mode;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
    renderChosen();renderDeck();renderStrategy();renderControl();renderResults();updateSavedCount();
    $('statRound').textContent=String(stats.lastRound);
  }
  function openModal(title,content){$('modalTitle').textContent=title;$('modalContent').innerHTML=content;$('modal').classList.remove('hidden');$('closeModal').focus();document.body.style.overflow='hidden';}
  function closeModal(){$('modal').classList.add('hidden');document.body.style.overflow='';}
  function selectedReading(){
    if(state.picks.length!==3)return;
    const subtitles=['오늘 나의 태도','살펴볼 부분','가볍게 실천할 일'];
    const content=`<p>같은 카드를 로또 생성 규칙이 아닌 상징적인 일상 메시지로 읽어봅니다. 이는 미래를 예측하는 결과가 아닙니다.</p>`+
      state.picks.map((c,i)=>`<section class="reading-card"><strong>${i+1}. ${subtitles[i]} — ${safe(c.name)} (${safe(c.en)})</strong><p>${safe(c.reading)}</p></section>`).join('')+
      `<p>카드의 의미를 더 알아보고 싶다면 연결된 타로 상담·학습 콘텐츠로 이어갈 수 있습니다.</p>`;
    openModal('오늘의 카드 이야기',content);
  }
  function getSaved(){try{const data=JSON.parse(localStorage.getItem(keyHistory)||'[]');return Array.isArray(data)?data:[];}catch{return [];}}
  function putSaved(items){localStorage.setItem(keyHistory,JSON.stringify(items));updateSavedCount();}
  function updateSavedCount(){$('historyCount').textContent=getSaved().length;}
  function saveCurrent(){
    if(!state.results.length)return;
    try{
      const items=getSaved();items.unshift({id:Date.now().toString(36)+'-'+randomInt(999999),date:new Date().toISOString(),mode:state.generation.mode,cardIds:state.generation.cardIds,sets:state.results,statsVersion});
      putSaved(items.slice(0,config.savedLimit||30));showToast('이 기기에 저장했어요.');try{adapters.onSaved(items[0]);}catch(_){}
    }catch{showToast('저장할 수 없는 브라우저 환경입니다. 번호를 복사해 주세요.');}
  }
  function showHistory(){
    const items=getSaved();
    if(!items.length){openModal('내 저장 목록','<p>아직 저장한 번호가 없어요. 생성한 번호를 내 기기에 저장할 수 있습니다.</p>');return;}
    const html=`<p>이 목록은 이 기기·브라우저에만 저장됩니다. 다른 기기와 동기화되지 않습니다.</p>`+
      items.map((item)=>`<div class="history-item"><div class="date">${safe(new Date(item.date).toLocaleString('ko-KR'))} · ${item.mode==='quick'?'완전 무작위':'타로 생성'}</div><div class="lines">${item.sets.map((nums,i)=>`${i+1}. ${nums.map(n=>String(n).padStart(2,'0')).join(' · ')}`).join('\n')}</div></div>`).join('')+
      '<button class="delete-history" id="clearHistory" type="button">저장 목록 모두 삭제</button>';
    openModal('내 저장 목록',html);
  }
  function resultText(){const title=state.generation.mode==='quick'?'완전 무작위 로또번호':'타로로 만든 로또번호';const cardsLine=state.generation.mode==='tarot'?`선택한 카드: ${state.picks.map(c=>c.name).join(' · ')}\n`:'';return `${title}\n${cardsLine}${state.results.map((nums,i)=>`${i+1}세트: ${nums.join(', ')}`).join('\n')}\n\n모든 조합의 1등 당첨 확률은 같습니다.`;}
  async function copyText(text){
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return true;}}catch(_){}
    const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.left='-9999px';document.body.appendChild(area);area.select();let ok=false;try{ok=document.execCommand('copy');}catch(_){}area.remove();return ok;
  }
  async function shareCurrent(){
    if(!state.results.length)return;
    try{if(navigator.share){await navigator.share({title:'ARCANA LOTTO 번호 조합',text:resultText()});return;}}catch(e){if(e?.name==='AbortError')return;}
    const copied=await copyText(resultText());showToast(copied?'공유용 내용을 복사했어요.':'공유가 지원되지 않는 환경입니다.');
  }
  function saveResultImage(){
    if(!state.results.length)return;
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;const ctx=canvas.getContext('2d');
    if(!ctx){showToast('이미지 저장을 지원하지 않는 환경입니다.');return;}
    const bg=ctx.createLinearGradient(0,0,1080,1920);bg.addColorStop(0,'#152833');bg.addColorStop(1,'#253b41');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1920);
    ctx.strokeStyle='rgba(222,193,141,.24)';ctx.lineWidth=2;for(const r of [320,440,560]){ctx.beginPath();ctx.arc(1010,100,r,0,2*Math.PI);ctx.stroke();}
    ctx.fillStyle='#dfc18c';ctx.font='600 35px Georgia, serif';ctx.fillText('✧  ARCANA LOTTO',85,120);
    ctx.fillStyle='#fff7e6';ctx.font='700 71px sans-serif';ctx.fillText('나만의 번호 조합',82,240);
    ctx.fillStyle='#c4c9c1';ctx.font='30px sans-serif';ctx.fillText(state.generation.mode==='tarot'?state.picks.map(c=>c.name).join('  ·  '):'완전 무작위',87,310);
    const rows=state.results.length;const yStart=400;const rowH=Math.min(185,Math.floor(1250/rows));
    for(let i=0;i<rows;i++){
      const y=yStart+i*rowH;
      ctx.fillStyle='rgba(255,255,255,.065)';ctx.beginPath();ctx.roundRect(75,y,930,rowH-16,22);ctx.fill();
      ctx.font='700 26px Georgia, serif';ctx.fillStyle='#d8bf94';ctx.fillText(`SET ${String(i+1).padStart(2,'0')}`,104,y+37);
      const radius=rows>7?33:41;const ballY=y+rowH-64;
      state.results[i].forEach((n,j)=>{
        const x=151+j*151;ctx.beginPath();ctx.arc(x,ballY,radius,0,Math.PI*2);
        ctx.fillStyle=n<=10?'#d4a33c':n<=20?'#478bb8':n<=30?'#bf6d75':n<=40?'#727680':'#698b74';ctx.fill();
        ctx.font=`700 ${rows>7?29:35}px sans-serif`;ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(n),x,ballY+2);ctx.textAlign='left';ctx.textBaseline='alphabetic';
      });
    }
    ctx.fillStyle='#dec99f';ctx.font='25px sans-serif';ctx.fillText(`기준 통계: 1~${stats.lastRound}회 · 보너스 제외`,85,1770);
    ctx.fillStyle='#b9c6c2';ctx.font='22px sans-serif';ctx.fillText('엔터테인먼트용 번호 생성 · 모든 조합의 1등 당첨 확률은 동일합니다.',85,1820);
    const download=url=>{const a=document.createElement('a');a.download='arcana-lotto-numbers.png';a.href=url;document.body.appendChild(a);a.click();a.remove();};
    if(canvas.toBlob){canvas.toBlob(blob=>{if(!blob){showToast('이미지를 만들지 못했습니다.');return;}const url=URL.createObjectURL(blob);download(url);setTimeout(()=>URL.revokeObjectURL(url),8000);},'image/png');}
    else download(canvas.toDataURL('image/png'));
  }
  function generate(){
    if(state.mode==='tarot'&&state.picks.length!==3)return;
    const picked=[...state.picks];const sets=generateSets(state.mode,picked,state.count);
    if(!sets.length){showToast('현재 조건으로 번호를 만들 수 없었습니다. 다시 시도해 주세요.');return;}
    state.results=sets;
    state.generation={mode:state.mode,cardIds:state.mode==='tarot'?picked.map(c=>c.id):[],count:state.count,date:new Date().toISOString(),statsVersion};
    renderResults();
    if(sets.length<state.count)showToast(`${sets.length}세트만 생성했습니다. 조건에 맞는 추가 조합을 찾지 못했습니다.`);
    try{adapters.onGenerated({sets,mode:state.mode,cardIds:state.generation.cardIds,statsVersion});}catch(_){}
    $('results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }

  // Bind only concrete UI controls; no external script or app registration required.
  $('deckGrid').addEventListener('click',event=>{
    const el=event.target.closest('[data-pick]');if(!el||state.picks.length>=3)return;
    const id=Number(el.dataset.pick);const index=state.deck.indexOf(id);if(index<0)return;
    state.deck.splice(index,1);state.picks.push(cards[id]);state.results=[];state.generation=null;renderAll();
    if(state.picks.length===3)showToast('세 장의 카드가 선택됐어요.');
  });
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{state.mode=b.dataset.mode;state.results=[];state.generation=null;renderAll();}));
  document.querySelectorAll('[data-count]').forEach(b=>b.addEventListener('click',()=>{state.count=Number(b.dataset.count);renderControl();}));
  $('reshuffleBtn').addEventListener('click',reseed);
  $('deckPrev').addEventListener('click',()=>scrollDeck(-1));
  $('deckNext').addEventListener('click',()=>scrollDeck(1));
  $('deckGrid').addEventListener('scroll',updateDeckScrollUI,{passive:true});
  window.addEventListener('resize',updateDeckScrollUI);
  $('generateBtn').addEventListener('click',generate);
  $('redoBtn').addEventListener('click',generate);
  $('copyBtn').addEventListener('click',async()=>showToast(await copyText(resultText())?'번호를 복사했어요.':'복사를 지원하지 않는 환경입니다.'));
  $('saveBtn').addEventListener('click',saveCurrent);
  $('shareBtn').addEventListener('click',shareCurrent);
  $('imageBtn').addEventListener('click',saveResultImage);
  $('readingBtn').addEventListener('click',selectedReading);
  $('historyBtn').addEventListener('click',showHistory);
  $('infoBtn').addEventListener('click',()=>openModal('서비스 안내',`<p><strong>ARCANA LOTTO</strong>는 타로카드의 상징을 이용해 로또번호를 생성하는 무료 엔터테인먼트 도구입니다.</p><h3>타로 모드</h3><p>세 장의 카드가 각각 후보 번호의 성향, 추출 방식, 조합 조건을 결정합니다. 같은 카드를 선택해도 무작위 추첨에 따라 다른 번호가 생성됩니다.</p><h3>완전 무작위 모드</h3><p>통계를 적용하지 않고 1~45 중 서로 다른 6개 번호를 균등 무작위로 추출합니다.</p><h3>통계와 확률</h3><p>업로드된 1~${stats.lastRound}회 데이터에서 보너스 번호를 제외해 집계했습니다. 과거 통계나 타로카드는 미래 당첨번호를 예측하지 못합니다. 모든 유효한 6개 조합의 1등 확률은 1/8,145,060입니다.</p><h3>개인정보와 저장</h3><p>초기 버전은 서버와 데이터베이스를 사용하지 않습니다. 저장 목록은 이 브라우저의 로컬 저장소에만 남습니다. 이미지 저장과 복사 기능도 기기 안에서 처리됩니다.</p>`));
  $('closeModal').addEventListener('click',closeModal);
  $('modal').addEventListener('click',e=>{if(e.target.dataset.close==='true')closeModal();if(e.target.id==='clearHistory'){if(confirm('이 기기에 저장된 모든 로또번호를 삭제할까요?')){try{localStorage.removeItem(keyHistory);closeModal();updateSavedCount();showToast('저장 목록을 삭제했어요.');}catch{showToast('삭제할 수 없습니다.');}}}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('modal').classList.contains('hidden'))closeModal();});

  window.TarotLottoApp={ // integration surface for a future API/DB adapter
    getState:()=>({mode:state.mode,cardIds:state.picks.map(c=>c.id),setCount:state.count,statsVersion}),
    generateUniform:()=>uniformSix(),
    generateWithCards:(ids,count=5)=>{
      if(!Array.isArray(ids)||ids.length!==3||new Set(ids).size!==3||ids.some(id=>!Number.isInteger(id)||id<0||id>21))throw new Error('3 distinct Major Arcana IDs (0..21) required');
      if(!Number.isInteger(count)||count<1||count>10)throw new Error('Count must be between 1 and 10');
      return generateSets('tarot',ids.map(id=>cards[id]),count);
    },
    installAdapters:(next={})=>{if(typeof next.onGenerated==='function')adapters.onGenerated=next.onGenerated;if(typeof next.onSaved==='function')adapters.onSaved=next.onSaved;},
    getStatistics:()=>({version:statsVersion,lastRound:stats.lastRound,drawCount:stats.drawCount})
  };
  reseed();
})();
