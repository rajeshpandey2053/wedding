'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const config = window.WEDDING_CONFIG;
const store = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let toastTimer;
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500)}
// Retire previously shared theme URLs without changing anchors or other parameters.
const cleanURL=new URL(location.href);cleanURL.searchParams.delete('theme');history.replaceState(null,'',cleanURL);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let motion=store.get('wedding-motion')!==null?store.get('wedding-motion')==='on':!reduced.matches;
function applyMotion(){document.documentElement.dataset.motion=motion?'on':'off';$('#motion').checked=motion;if(!motion)stopPlaying()}
$('#motion').onchange=e=>{motion=e.target.checked;store.set('wedding-motion',motion?'on':'off');applyMotion()};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(e=>observer.observe(e));
function countdown(){const ms=new Date('2026-12-23T00:00:00+05:45')-new Date();const t=Math.max(0,ms);$('#days').textContent=Math.floor(t/86400000);$('#hours').textContent=String(Math.floor(t/3600000)%24).padStart(2,'0');$('#minutes').textContent=String(Math.floor(t/60000)%60).padStart(2,'0');if(ms<=0)$('#countdown-note').textContent='शुभ सुरुवातको हार्दिक मंगलकामना।'}countdown();setInterval(countdown,60000);
function petals(){if(!motion||reduced.matches)return;for(let i=0;i<28;i++){const p=document.createElement('span');p.className='petal';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*.6+'s';p.style.background=i%2?'var(--gold)':'var(--accent)';$('#petals').append(p);setTimeout(()=>p.remove(),4000)}}
let revealTimer, showerTimer;
function showCurtain(){stopPlaying();clearTimeout(revealTimer);clearTimeout(showerTimer);window.stopFlowerShower();const d=$('#curtain-dialog');d.classList.remove('opening');$('#open-curtain').disabled=false;$('#skip-intro').disabled=false;document.body.classList.add('curtain-active');window.scrollTo({top:0,behavior:'instant'});d.showModal();$('#open-curtain').focus()}
function finishReveal(){clearTimeout(revealTimer);clearTimeout(showerTimer);$('#curtain-dialog').close();document.body.classList.remove('curtain-active');$('.invitation-stage').classList.add('revealed');$('.hero-explore').focus({preventScroll:true})}
function openCurtain(skip=false){$('#open-curtain').disabled=true;$('#skip-intro').disabled=true;$('#curtain-dialog').classList.add('opening');$('.invitation-stage').classList.add('revealed');if(skip||!motion||reduced.matches){finishReveal();return}showerTimer=setTimeout(()=>window.celebrateFlowers(),1038);revealTimer=setTimeout(finishReveal,2300)}
$('#open-curtain').onclick=()=>openCurtain();$('#skip-intro').onclick=()=>openCurtain(true);$('#replay').onclick=showCurtain;
$('#curtain-dialog').addEventListener('cancel',e=>{e.preventDefault();finishReveal()});
const slides=[
 {artwork:true},
 {eyebrow:'दुई हृदय · दुई परिवार',title:'सँगै,<br><em>नयाँ जीवनयात्रा।</em>',text:'हाम्रो शुभविवाहमा सहभागी भई आशीर्वाद दिनुहोस्'},
 {eyebrow:'शुभ विवाह · बुधबार',number:'२३',title:'डिसेम्बर २०२६',text:'MK Reception, Biratnagar'},
 {eyebrow:'स्वागत समारोह · बिहीबार',number:'२४',title:'डिसेम्बर २०२६',text:'आफन्तजनसँग खुसी साट्ने अवसर'},
 {eyebrow:'मायासहित',title:'भेटौँला<br><em>विराटनगरमा।</em>',text:'सनाया कट्टेल र राजेश पाण्डे'}
];
config.photos.forEach(photo=>slides.splice(slides.length-1,0,{photo}));
let slideIndex=0,timer=null,startX=null;
function renderSlide(){const s=slides[slideIndex],el=document.createElement('div');el.className='slide-content';if(s.artwork){el.classList.add('invitation-slide');const img=document.createElement('img');img.src='assets/invitation-venue.png';img.alt='सनाया र राजेश · विवाह २३ डिसेम्बर र स्वागत समारोह २४ डिसेम्बर २०२६ · MK Reception, Biratnagar';el.append(img)}else if(s.photo){el.classList.add('photo');const img=document.createElement('img');img.src=s.photo.src;img.alt=s.photo.alt||'';el.append(img);const caption=document.createElement('p');caption.textContent=s.photo.caption||'';el.append(caption)}else{el.innerHTML=`<p class="eyebrow">${s.eyebrow}</p>${s.number?`<span class="slide-number">${s.number}</span>`:''}<h3>${s.title}</h3><p>${s.text}</p>`}$('#slide-stage').replaceChildren(el);$$('.dots button').forEach((b,i)=>b.setAttribute('aria-current',i===slideIndex));$('#slide-stage').setAttribute('aria-label',`झलक ${slideIndex+1} / ${slides.length}`)}
slides.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`झलक ${i+1} मा जानुहोस्`);b.onclick=()=>{stopPlaying();slideIndex=i;renderSlide()};$('#slide-dots').append(b)});
function moveSlide(delta,user=true){if(user)stopPlaying();slideIndex=(slideIndex+delta+slides.length)%slides.length;renderSlide()}
function stopPlaying(){clearInterval(timer);timer=null;$('#play').textContent='सुरु गर्नुहोस्';$('#play').setAttribute('aria-label','झलकहरू सुरु गर्नुहोस्');$('#slide-stage').setAttribute('aria-live','polite')}
$('#play').onclick=()=>{if(timer){stopPlaying();return}$('#play').textContent='रोक्नुहोस्';$('#play').setAttribute('aria-label','झलकहरू रोक्नुहोस्');$('#slide-stage').setAttribute('aria-live','off');timer=setInterval(()=>moveSlide(1,false),5500)};
$('#prev').onclick=()=>moveSlide(-1);$('#next').onclick=()=>moveSlide(1);
$('.slideshow').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();moveSlide(1)}if(e.key==='ArrowLeft'){e.preventDefault();moveSlide(-1)}});
$('.slide-stage').addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});$('.slide-stage').addEventListener('touchend',e=>{if(startX!==null){const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>45)moveSlide(delta<0?1:-1);startX=null}},{passive:true});
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('.slideshow').requestFullscreen)await $('.slideshow').requestFullscreen();else notify('यस ब्राउजरमा पूरा पर्दाको सुविधा छैन। ठूलो दृश्यका लागि फोन तेर्सो पार्नुहोस्।')}catch{notify('यस ब्राउजरमा पूरा पर्दाको सुविधा उपलब्ध छैन।')}};
document.addEventListener('fullscreenchange',()=>$('#fullscreen').textContent=document.fullscreenElement?'पूरा पर्दाबाट बाहिर निस्कनुहोस्':'पूरा पर्दा');document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlaying()});renderSlide();applyMotion();
function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)}
$$('.calendar').forEach(b=>b.onclick=()=>{const wedding=b.dataset.event==='wedding';const date=wedding?'20261223':'20261224',end=wedding?'20261224':'20261225';const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sanaya and Rajesh//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${date}-sanaya-rajesh@wedding.local`,`DTSTAMP:${stamp}`,`DTSTART;VALUE=DATE:${date}`,`DTEND;VALUE=DATE:${end}`,`SUMMARY:सनाया र राजेश — ${wedding?'शुभ विवाह':'स्वागत समारोह'}`,'LOCATION:MK Reception\\, Biratnagar\\, Nepal','DESCRIPTION:समारोहको समय पछि जानकारी गराइनेछ। यो दिनभरको सम्झना हो।','END:VEVENT','END:VCALENDAR'];download(new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}),`sanaya-rajesh-${b.dataset.event}.ics`);notify('पात्रोको सम्झना डाउनलोड भयो')});
$('#share').onclick=async()=>{const url=new URL(location.href);url.searchParams.delete('theme');url.hash='';try{if(navigator.share)await navigator.share({title:'सनाया र राजेश · विवाह निमन्त्रणा',text:'२३ र २४ डिसेम्बर २०२६ मा विराटनगरमा हाम्रो खुसीमा सहभागी हुनुहोस्।',url:url.href});else{await navigator.clipboard.writeText(url.href);notify('निमन्त्रणाको लिङ्क प्रतिलिपि भयो')}}catch(e){if(e.name!=='AbortError')notify('साझा गर्न ब्राउजरबाट पृष्ठको ठेगाना प्रतिलिपि गर्नुहोस्।')}};
$('#download-card').onclick=()=>{const a=document.createElement('a');a.href='assets/invitation-venue.png';a.download='Sanaya-and-Rajesh-Wedding-Invitation.png';a.click();notify('तपाईंको निमन्त्रणा सुरक्षित गर्न तयार छ')};
showCurtain();
