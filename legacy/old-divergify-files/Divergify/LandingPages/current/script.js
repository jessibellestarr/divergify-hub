(function(){
  const form = document.querySelector('form[name="divergify-signup"]');
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  function burst(){
    const parts = [];
    for(let i=0;i<180;i++){
      parts.push({x:canvas.width/2,y:canvas.height/3,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.8)*7-3,g:0.15+Math.random()*0.1,l:120+Math.random()*60,a:0,size:3+Math.random()*3});
    }
    function tick(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      parts.forEach(p=>{p.a++; p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; ctx.globalAlpha=Math.max(0,1-p.a/p.l); ctx.fillRect(p.x,p.y,p.size,p.size);});
      if(parts.some(p=>p.a<p.l && p.y<canvas.height+20)) requestAnimationFrame(tick);
    }
    tick();
    setTimeout(()=>{
      const m=document.createElement('div'); m.textContent="Wow, you actually finished something. Proud of you.";
      m.style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(15,22,31,.95);color:#eaf3ff;padding:10px 14px;border:1px solid #203041;border-radius:10px;font-weight:800;";
      document.body.appendChild(m); setTimeout(()=>m.remove(), 2500);
    },120);
  }
  if(form){ form.addEventListener('submit', ()=> setTimeout(burst,50)); }
})();