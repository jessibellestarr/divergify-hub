// Lightweight confetti
(function(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W, H, particles=[], anim=null;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize); resize();

  function burst(x=W/2, y=H/2, n=120){
    for(let i=0;i<n;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = 2 + Math.random()*5;
      particles.push({
        x, y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed - 2,
        g: 0.05 + Math.random()*0.1,
        life: 60 + Math.random()*60,
        r: 2 + Math.random()*3,
        rot: Math.random()*Math.PI,
        vr: (Math.random()-.5)*0.2,
        alpha: 1
      });
    }
    if(!anim) loop();
  }

  function loop(){
    anim = requestAnimationFrame(loop);
    ctx.clearRect(0,0,W,H);
    particles = particles.filter(p => p.life>0 && p.alpha>0.02);
    for(const p of particles){
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life--;
      p.alpha = p.life/120;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
      ctx.restore();
    }
    if(particles.length===0){ cancelAnimationFrame(anim); anim=null; }
  }

  window.DivergifyConfetti = { burst };
})();