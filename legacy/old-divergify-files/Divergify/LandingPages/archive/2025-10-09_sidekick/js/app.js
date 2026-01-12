// Divergify Sidekick MVP
const $ = (s, x=document)=> x.querySelector(s);
const $$ = (s, x=document)=> [...x.querySelectorAll(s)];

const STORAGE_KEY = 'divergify.tasks.v1';
const STREAK_KEY = 'divergify.streak.v1';
const PHRASES_KEY = 'divergify.phrases.v1';

const dopamineLines = [
  "Graffiti bomb deployed. You just painted progress.",
  "Confetti unlocked. Your brain: mildly impressed.",
  "Tiny win, big ripple. Keep rolling.",
  "You did the thing. You monster (in a nice way).",
  "Momentum > motivation. You built both.",
  "Gold star energy. Not reusable for 72 hours."
];

function load(k, fallback){
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
}
function save(k, v){ localStorage.setItem(k, JSON.stringify(v)); }

function todayKey(){
  const d = new Date();
  return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-');
}

const state = {
  tasks: load(STORAGE_KEY, []),
  streak: load(STREAK_KEY, { day: todayKey(), count: 0 }),
  usedPhrases: load(PHRASES_KEY, []) // array of {text, ts}
};

function renderTasks(){
  const list = $('#taskList');
  list.innerHTML = '';
  if(state.tasks.length===0) $('#emptyState').style.display='block';
  else $('#emptyState').style.display='none';

  state.tasks.forEach((t, idx)=>{
    const li = document.createElement('li');
    li.className = 'task';
    li.innerHTML = \`
      <input type="checkbox" \${t.done ? 'checked' : ''} aria-label="done">
      <label>\${t.text}</label>
      <button class="kill" aria-label="delete">✕</button>
    \`;
    const cb = $('input', li);
    const kill = $('.kill', li);
    cb.addEventListener('change', () => toggleDone(idx, cb.checked));
    kill.addEventListener('click', ()=> removeTask(idx));
    list.appendChild(li);
  });
}

function addTask(text){
  state.tasks.unshift({ text, done:false, at: Date.now() });
  save(STORAGE_KEY, state.tasks);
  renderTasks();
}

function removeTask(idx){
  state.tasks.splice(idx,1);
  save(STORAGE_KEY, state.tasks);
  renderTasks();
}

function toggleDone(idx, checked){
  const t = state.tasks[idx];
  if(!t) return;
  t.done = checked;
  if(checked){
    celebrate();
    incrementStreak();
  }
  save(STORAGE_KEY, state.tasks);
  renderTasks();
}

function incrementStreak(){
  const day = todayKey();
  if(state.streak.day !== day){
    state.streak.day = day;
    state.streak.count = 0;
  }
  state.streak.count += 1;
  save(STREAK_KEY, state.streak);
  updateStreakUI();
}

function updateStreakUI(){
  const goal = 10;
  const pct = Math.min(100, Math.round((state.streak.count/goal)*100));
  $('#streakBar').style.width = pct + '%';
  $('#streakText').textContent = \`\${state.streak.count} wins today\`;
}

function celebrate(){
  DivergifyConfetti.burst(window.innerWidth*0.5, window.innerHeight*0.3, 140);
  const msg = uniqueDopamineLine();
  $('#nudge').textContent = msg;
}

function uniqueDopamineLine(){
  // filter used in last 72 hours
  const now = Date.now();
  const seventyTwo = 72*60*60*1000;
  const recent = new Set(state.usedPhrases.filter(p=> now - p.ts < seventyTwo).map(p=>p.text));
  const options = dopamineLines.filter(x => !recent.has(x));
  const choice = (options.length ? options : dopamineLines)[Math.floor(Math.random() * (options.length?options.length:dopamineLines.length))];
  state.usedPhrases.push({ text: choice, ts: now });
  // trim log length
  if(state.usedPhrases.length>200) state.usedPhrases.splice(0, state.usedPhrases.length-200);
  save(PHRASES_KEY, state.usedPhrases);
  return choice;
}

// Nudges on tab return
document.addEventListener('visibilitychange', () => {
  if(!document.hidden){
    $('#nudge').textContent = "Did you just switch tasks? Worth it or nah?";
  }
});

// Focus Bubble
$('#focusBtn').addEventListener('click', () => {
  document.documentElement.requestFullscreen?.();
  $('#nudge').textContent = "Focus Bubble ON. Shields up. (Esc to exit)";
});

// Tin Foil Hat Mode (local-only behavior)
$('#tinfoil').addEventListener('change', (e) => {
  const on = e.target.checked;
  if(on){
    // nothing to disable (no analytics), but we can clear network hints and lock down
    $('#nudge').textContent = "Tin Foil Hat is on. Data stays on your device.";
  } else {
    $('#nudge').textContent = "Tin Foil Hat is off. Still no trackers here.";
  }
});

// Task form
$('#taskForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const v = $('#taskInput').value.trim();
  if(!v) return;
  addTask(v);
  $('#taskInput').value = '';
});

// Year
$('#year').textContent = new Date().getFullYear();

// Merch link placeholder
const merch = document.getElementById('merch');
merch.href = localStorage.getItem('divergify.merch.url') || '#';

// Initial render
renderTasks();
updateStreakUI();

// Swirl background animation using canvas gradients
(function(){
  const canvas = document.getElementById('bg-swirl');
  const ctx = canvas.getContext('2d');
  let W, H, t=0;
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  function loop(){
    t += 0.006;
    const g1x = W/2 + Math.cos(t)*W*0.25, g1y = H/2 + Math.sin(t*1.3)*H*0.25;
    const g2x = W/2 + Math.cos(t*1.7+1)*W*0.35, g2y = H/2 + Math.sin(t*1.2+1)*H*0.35;
    const grd = ctx.createRadialGradient(g1x,g1y,10, g2x,g2y, Math.max(W,H)*0.9);
    grd.addColorStop(0, '#12c2e9');
    grd.addColorStop(0.5, '#00b3b3');
    grd.addColorStop(1, '#2af598');
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,W,H);
    requestAnimationFrame(loop);
  }
  loop();
})();
