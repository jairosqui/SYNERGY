(()=>{
const $=s=>document.querySelector(s);
const hd=$('#hd'),nav=$('#nav'),bg=$('#burger');
addEventListener('scroll',()=>hd.classList.toggle('s',scrollY>10),{passive:true});
bg.addEventListener('click',()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');bg.setAttribute('aria-expanded',false)}});
const y=$('#yr');if(y)y.textContent=new Date().getFullYear();
const els=document.querySelectorAll('.rv,.steps');
if('IntersectionObserver'in window){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
els.forEach(el=>io.observe(el));
}else els.forEach(el=>el.classList.add('in'));
// Formulario (Web3Forms)
const f=$('#form');
if(f){
const m=$('#msg'),b=f.querySelector('button');
const say=(t,c)=>{m.textContent=t;m.className='msg '+c};
f.addEventListener('submit',async e=>{
e.preventDefault();
let ok=true;
f.querySelectorAll('[required]').forEach(i=>{const bad=!i.checkValidity();i.classList.toggle('invalid',bad);if(bad)ok=false});
if(!ok){say('Por favor complete los campos obligatorios.','err');return}
if(f.botcheck.checked)return;
if(f.access_key.value.startsWith('TU_ACCESS')){say('Formulario sin configurar: falta la clave de Web3Forms.','err');return}
b.disabled=true;say('Enviando…','');
try{
const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)});
const j=await r.json();
if(j.success){say('¡Gracias! Recibimos su solicitud y le contactaremos pronto.','ok');f.reset()}
else say('No pudimos enviar el mensaje. Intente de nuevo.','err');
}catch(_){say('Error de conexión. Intente de nuevo.','err')}
b.disabled=false;
});
f.addEventListener('input',e=>e.target.classList.remove('invalid'));
}
})();
