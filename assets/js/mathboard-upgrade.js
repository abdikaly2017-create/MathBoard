/* MathBoard enhancement: theme toggle + decorative math symbols. No external dependencies. */
(()=>{'use strict';
const KEY='mathboard-theme';
try{if(localStorage.getItem(KEY)==='dark')document.documentElement.classList.add('mb-dark')}catch(_){}
function addToggle(){if(!document.body||document.querySelector('.mb-theme-toggle'))return;const b=document.createElement('button');b.className='mb-theme-toggle';b.type='button';b.setAttribute('aria-label','Түсті режимді ауыстыру');const paint=()=>{const dark=document.documentElement.classList.contains('mb-dark');b.textContent=dark?'☀️ Ашық режим':'🌙 Қараңғы режим';b.setAttribute('aria-pressed',String(dark))};b.addEventListener('click',()=>{const dark=document.documentElement.classList.toggle('mb-dark');try{localStorage.setItem(KEY,dark?'dark':'light')}catch(_){}paint()});paint();document.body.appendChild(b)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addToggle,{once:true});else addToggle();
})();