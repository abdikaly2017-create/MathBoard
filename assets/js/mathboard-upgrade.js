/* MathBoard enhancement: theme toggle + decorative math symbols. No external dependencies. */
(()=>{'use strict';
const KEY='mathboard-theme';
try{if(localStorage.getItem(KEY)==='dark')document.documentElement.classList.add('mb-dark')}catch(_){}
function addToggle(){if(!document.body||document.querySelector('.mb-theme-toggle'))return;const b=document.createElement('button');b.className='mb-theme-toggle';b.type='button';b.setAttribute('aria-label','Түсті режимді ауыстыру');const paint=()=>{const dark=document.documentElement.classList.contains('mb-dark');b.textContent=dark?'☀️ Ашық режим':'🌙 Қараңғы режим';b.setAttribute('aria-pressed',String(dark))};b.addEventListener('click',()=>{const dark=document.documentElement.classList.toggle('mb-dark');try{localStorage.setItem(KEY,dark?'dark':'light')}catch(_){}paint()});paint();document.body.appendChild(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addToggle,{once:true});else addToggle();
})();
/* Animated math atmosphere, local notifications, and daily challenge interactions. */
function initMathBoardExtras(){
  if(!document.getElementById('mb-math-canvas')){
    const canvas=document.createElement('canvas');canvas.id='mb-math-canvas';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
    const ctx=canvas.getContext('2d');let w=0,h=0,dpr=1,particles=[];const glyphs=['π','∑','√','∫','x²','÷','Δ','∞','f(x)','aₙ','sin'];
    function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(38,Math.floor(w/32))},()=>({x:Math.random()*w,y:Math.random()*h,size:14+Math.random()*30,g:glyphs[Math.floor(Math.random()*glyphs.length)],speed:.12+Math.random()*.35,drift:(Math.random()-.5)*.24,alpha:.07+Math.random()*.15,phase:Math.random()*6.28}))}
    function draw(t){ctx.clearRect(0,0,w,h);for(const p of particles){p.y-=p.speed;p.x+=Math.sin(t*.00045+p.phase)*.18+p.drift;if(p.y<-45){p.y=h+30;p.x=Math.random()*w}if(p.x<-60)p.x=w+20;if(p.x>w+60)p.x=-20;ctx.globalAlpha=p.alpha;ctx.fillStyle=p.phase%2?'#6b62ee':'#1bb9c9';ctx.font='700 '+p.size+'px ui-rounded,system-ui,sans-serif';ctx.fillText(p.g,p.x,p.y)}ctx.globalAlpha=1;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(draw)}
    resize();window.addEventListener('resize',resize,{passive:true});if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(draw);
  }
  if(!document.getElementById('mb-notify-button')){
    const b=document.createElement('button');b.id='mb-notify-button';b.className='mb-notify-button';b.type='button';b.setAttribute('aria-label','Хабарландырулар');b.setAttribute('aria-expanded','false');b.innerHTML='♧<span class="mb-notify-dot" aria-hidden="true"></span>';
    const p=document.createElement('aside');p.id='mb-notify-panel';p.className='mb-notify-panel';p.hidden=true;p.setAttribute('aria-label','Хабарландырулар тізімі');
    p.innerHTML='<div class="mb-notify-top"><h3>🔔 Хабарландырулар</h3><button type="button" class="mb-notify-close" id="mb-notify-close">Жабу</button></div><div class="mb-notice"><strong>✨ MathBoard жаңарды</strong><p>Жаңа оқу орталығы мен күнделікті шағын есеп қосылды.</p><time>Жаңа</time></div><div class="mb-notice"><strong>📘 Прогрессиялар зертханасы</strong><p>Арифметикалық және геометриялық прогрессияны мысалдармен қайтала.</p><time>Оқу бөлімі</time></div><div class="mb-notice"><strong>🎯 Бүгінгі мақсат</strong><p>Бір тақырыпты таңдап, кемінде үш есепті түсініп шығар.</p><time>Ұсыныс</time></div>';
    document.body.append(b,p);
    const close=()=>{p.hidden=true;b.setAttribute('aria-expanded','false')};
    b.addEventListener('click',()=>{p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden));const dot=b.querySelector('.mb-notify-dot');if(dot)dot.hidden=true});
    p.querySelector('#mb-notify-close').addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    document.addEventListener('click',e=>{if(!p.hidden&&!p.contains(e.target)&&e.target!==b)close()});
  }
  const reveal=document.getElementById('mb-challenge-reveal'),answer=document.getElementById('mb-challenge-answer');
  if(reveal&&answer&&!reveal.dataset.bound){reveal.dataset.bound='1';reveal.addEventListener('click',()=>{answer.hidden=!answer.hidden;reveal.innerHTML=answer.hidden?'Жауабын тексеру <span>→</span>':'Жауап көрсетілді ✓';if(!answer.hidden)answer.scrollIntoView({behavior:'smooth',block:'nearest'})})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMathBoardExtras,{once:true});else initMathBoardExtras();
