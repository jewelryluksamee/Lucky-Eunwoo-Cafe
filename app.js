// ══ CONFIG ══
const BIRTHDAY = new Date('2026-03-30T00:00:00'); // 📅 BIRTHDAY

const TICKET_PHOTOS = [ // 🎟 TICKET_PHOTOS
  { src:'c1.jpg', cap:'♡' },
  { src:'c2.jpg', cap:'♡' },
  { src:'c3.jpg', cap:'♡' },
  { src:'c4.jpg', cap:'♡' },
  { src:'c5.jpg', cap:'♡' },
  { src:'images/ticket6.jpg', cap:'♡' },
];

const MAX_STAMPS = 3;

// ══ API ══
const API_BASE='https://backend-lucky-eunwoo-cafe.vercel.app';

// ══ LANDING TICKER ══
const lwMsg = 'Happy Lee Dongmin Day \u2003 차은우 \u2003 30 March 2026 \u2003 Aroha ♡ Astro \u2003 Lucky Eunwoo ☘︎  \u2003 Our Shining Star \u2003 19970330 \u2003 ♡ ♥︎ ♡ ♥︎ ♡ ♥︎ ♡ ♥︎ \u2003 Birthday Cafe \u2003 ᯓ★ ';
document.getElementById('lwTicker').textContent = lwMsg + lwMsg;

// ══ LANDING FALLING ITEMS ══
const lwFcs=['☘️','ᯓ★','♡','♥︎','★','⭐','🍵','👀','🐰','☁️'];
const lwRoot=document.getElementById('pgLanding');
function spawnLwFC(){
  const p=document.createElement('div'); p.className='lw-fc';
  const dur=9+Math.random()*11;
  p.textContent=lwFcs[Math.floor(Math.random()*lwFcs.length)];
  Object.assign(p.style,{left:Math.random()*100+'%',fontSize:(.5+Math.random()*.5)+'rem',animationDuration:dur+'s',animationDelay:(Math.random()*-dur)+'s'});
  lwRoot.appendChild(p);
  setTimeout(()=>p.remove(),(dur+2)*1000);
}
for(let i=0;i<14;i++) spawnLwFC();
setInterval(spawnLwFC,1900);

// ══ NAME & GREETING ══
let visitorName='';
function submitName(){
  const val=document.getElementById('visitorNameInput').value.trim();
  if(!val){alert('โรฮ่าจ๋าา กรอกชื่อก่อนน้า~');return;}
  visitorName=val;
  const overlay=document.getElementById('nameOverlay');
  overlay.style.transition='opacity .5s';
  overlay.style.opacity='0';
  overlay.style.pointerEvents='none';
  setTimeout(()=>overlay.style.display='none',500);
  document.getElementById('greetingNameText').textContent=val;
  document.getElementById('greetingBanner').style.display='block';
  // 🎵 เริ่มเพลงทันทีที่กด "เข้าไปกันเลยย"
  startMusic();
}
document.getElementById('visitorNameInput').addEventListener('keydown',e=>{if(e.key==='Enter')submitName();});

// ══ COUNTDOWN ══
function pad(n){return String(n).padStart(2,'0');}
function tick(){
  let diff=BIRTHDAY-new Date(); if(diff<0)diff=0;
  const d=Math.floor(diff/86400000);diff-=d*86400000;
  const h=Math.floor(diff/3600000);diff-=h*3600000;
  const m=Math.floor(diff/60000);diff-=m*60000;
  const s=Math.floor(diff/1000);
  const vals=[d,h,m,s];
  ['cdD','cdH','cdM','cdS'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=pad(vals[i]);});
  ['hD','hH','hM','hS'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=pad(vals[i]);});
}
tick(); setInterval(tick,1000);

// ══ FLOATIES ══
const FLOAT_EMOJIS=['🌿','✨','🍃','☕','🌸','🎂','🍵','💚','⭐','🌱','🍀','☘️'];
function spawnFloatie(){
  const el=document.createElement('span'); const dur=12+Math.random()*12;
  el.className='floatie'; el.textContent=FLOAT_EMOJIS[Math.floor(Math.random()*FLOAT_EMOJIS.length)];
  el.style.left=Math.random()*100+'vw'; el.style.fontSize=(0.9+Math.random()*1.1)+'rem';
  el.style.animationDuration=dur+'s'; el.style.animationDelay=(Math.random()*-dur)+'s';
  document.getElementById('floaties').appendChild(el);
  setTimeout(()=>el.remove(),(dur+2)*1000);
}
for(let i=0;i<14;i++)spawnFloatie(); setInterval(spawnFloatie,2800);

const sparksEl=document.getElementById('hdrSparks');
if(sparksEl){for(let i=0;i<22;i++){const s=document.createElement('div');s.className='hdr-spark';s.style.top=Math.random()*100+'%';s.style.left=Math.random()*100+'%';s.style.animationDelay=(Math.random()*2)+'s';s.style.animationDuration=(1.4+Math.random()*1.5)+'s';sparksEl.appendChild(s);}}

// ══ PAGE ROUTING ══
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden','gone'));const pg=document.getElementById(id);pg.classList.remove('gone');requestAnimationFrame(()=>requestAnimationFrame(()=>pg.classList.remove('hidden')));}
function enterCafe(){
  if(!visitorName){
    const ov=document.getElementById('nameOverlay');
    ov.style.display='flex';ov.style.opacity='1';ov.style.pointerEvents='all';ov.style.transition='';
    document.getElementById('visitorNameInput').focus();
    return;
  }
  showPage('pgCafe');
}
function openWall(){showPage('pgWall');renderWall();}
function closeWall(){showPage('pgCafe');}

// ══ LUCKY CARD DRAW ══
const LUCKY_CARDS = [
  { name:'Lucky Eunwoo ◡̈', img:'c1.jpg', msg:'เอ้ะๆๆ เหมือนคนแถวนี้้จะมีดวงกับเมนนะ!' },
  { name:'Lucky Eunwoo ◡̈', img:'c2.jpg', msg:'วันนี้จะเจอแต่เรื่องดีแน่นอน รอรับได้เลยยยย~' },
  { name:'Lucky Eunwoo ◡̈', img:'c3.jpg', msg:'ความสุขกำลังจะมาถึง เตรียมรับมันด้วยรอยยิ้มน้าาาาา ♡' },
  { name:'Lucky Eunwoo ◡̈', img:'c4.jpg', msg:'อย่าหักโหมตัวเองมากไป พักผ่อนเยอะๆ ดูแลตัวเองด้วยน้า ♡' },
  { name:'Lucky Eunwoo ◡̈', img:'c5.jpg', msg:'ความโชคดีอยู่ใกล้กว่าที่คิด ขอให้ทำอะไรก็สำเร็จ คิดอะไรก็สมปราถนา พ่อหมออึนอูเป็นกำลังใจให้อยู่นะ!' },
];

let lcDrawn = false;
const LC_ANGLES  = [-12, -6, 0, 6, 12];
const LC_OFFSETS = [-56,-28, 0,28, 56];

function lcBuildDeck(){
  const area=document.getElementById('cardDeckArea'); area.innerHTML='';
  LUCKY_CARDS.forEach((c,i)=>{
    const card=document.createElement('div'); card.className='lc-card'; card.id='lcCard'+i;
    card.style.setProperty('--br',LC_ANGLES[i]+'deg');
    card.style.cssText+=`left:calc(50% + ${LC_OFFSETS[i]}px - 60px);top:24px;transform:rotate(${LC_ANGLES[i]}deg);z-index:${i+1};`;
    card.innerHTML=`<div class="lc-card-inner">
      <div class="lc-card-back"><div class="lcb-icon">☘️</div><div class="lcb-txt">Lucky Eunwoo</div></div>
      <div class="lc-card-front">
        <img class="lcf-img" src="${c.img}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div class="lcf-img-ph" style="display:none">✨</div>
        <div class="lcf-name">${c.name}</div>
        <div class="lcf-msg">${c.msg}</div>
      </div>
    </div>`;
    area.appendChild(card);
  });
}

function luckyDraw(){
  if(lcDrawn)return; lcDrawn=true;
  const btn=document.getElementById('cardDrawBtn'); btn.disabled=true;
  const hint=document.getElementById('cardDrawHint'); hint.textContent='กำลังสับไพ่...รอแป๊บนะ!';
  LUCKY_CARDS.forEach((_,i)=>{const card=document.getElementById('lcCard'+i);card.style.animation=`shuffleWiggle .55s ease ${i*.07}s 2`;});
  setTimeout(()=>{
    hint.textContent='อึนอูเลือกการ์ดให้แล้วนะ เปิดดูเลย! ';
    const idx=Math.floor(Math.random()*LUCKY_CARDS.length);
    LUCKY_CARDS.forEach((_,i)=>{
      const card=document.getElementById('lcCard'+i); card.style.animation='';
      if(i!==idx){const dir=LC_OFFSETS[i]>=0?1:-1;card.style.transition='transform .5s cubic-bezier(.4,0,.2,1), opacity .4s';card.style.transform=`translateX(${dir*180}px) rotate(${LC_ANGLES[i]*2}deg) translateY(40px)`;card.style.opacity='0';}
    });
    setTimeout(()=>{
      const picked=document.getElementById('lcCard'+idx);
      picked.style.transition='left .45s cubic-bezier(.4,0,.2,1), top .45s cubic-bezier(.4,0,.2,1), transform .45s cubic-bezier(.4,0,.2,1)';
      picked.style.left='calc(50% - 60px)'; picked.style.top='20px'; picked.style.transform='rotate(0deg) translateY(-12px) scale(1.08)'; picked.style.zIndex='20';
      setTimeout(()=>{
        picked.classList.add('flipped');
        setTimeout(()=>{
          const c=LUCKY_CARDS[idx]; const result=document.getElementById('cardResult');
          const img=document.getElementById('cardResImg'); const ph=document.getElementById('cardResPh');
          document.getElementById('cardResName').textContent=c.name;
          document.getElementById('cardResMsg').textContent=c.msg;
          ph.style.display='none'; img.style.display='block'; img.src=c.img;
          img.onerror=()=>{img.style.display='none';ph.style.display='flex';ph.textContent='✨';};
          result.classList.remove('vis'); void result.offsetWidth; result.classList.add('vis');
          result.scrollIntoView({behavior:'smooth',block:'nearest'});
        },700);
      },500);
    },400);
  },1300);
}

function resetLuckyDraw(){
  lcDrawn=false;
  document.getElementById('cardDrawBtn').disabled=false;
  document.getElementById('cardDrawHint').textContent='ให้อึนอูทำนายกันนนนนน!';
  document.getElementById('cardResult').classList.remove('vis');
  lcBuildDeck();
}

lcBuildDeck();

// ══ STAMP CARD ══
let stampCount=parseInt(localStorage.getItem('luckyStamps')||'0');
function buildStampGrid(){
  const grid=document.getElementById('stampGrid');if(!grid)return;grid.innerHTML='';
  for(let i=0;i<MAX_STAMPS;i++){const cell=document.createElement('div');cell.className='stamp-cell'+(i<stampCount?' stamped':'');cell.textContent=i<stampCount?'👀':String(i+1);grid.appendChild(cell);}
  document.getElementById('stampProgress').innerHTML=`Stamps: <strong>${stampCount} / ${MAX_STAMPS}</strong>`;
  const btn=document.getElementById('stampMainBtn');if(btn)btn.textContent=stampCount>=MAX_STAMPS?'See your Ticket!!':'Get a Stamp!';
}
function addStamp(){if(stampCount>=MAX_STAMPS){showTicket();return;}stampCount++;localStorage.setItem('luckyStamps',stampCount);buildStampGrid();if(stampCount===MAX_STAMPS)setTimeout(showTicket,600);}
function resetStamps(){stampCount=0;localStorage.setItem('luckyStamps','0');buildStampGrid();}
buildStampGrid();

// ══ TICKET ══
function shufflePick(arr,n){const copy=[...arr];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy.slice(0,Math.min(n,copy.length));}
function showTicket(){
  document.getElementById('ticketName').textContent=visitorName||'Guest';
  const now=new Date();
  document.getElementById('ticketDate').textContent=now.toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'numeric'})+' · '+now.toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'});
  const strip=document.getElementById('ticketPhotos');strip.innerHTML='';
  shufflePick(TICKET_PHOTOS,3).forEach((photo,i)=>{
    const pol=document.createElement('div');pol.className='ticket-pol';pol.style.transform=`rotate(${[-3,0.5,2.5][i]}deg)`;if(i===1)pol.style.marginTop='-6px';
    pol.innerHTML=`<img src="${photo.src}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/><div class="ticket-pol-ph" style="display:none">♡</div><div class="tpol-cap">${photo.cap}</div>`;
    strip.appendChild(pol);
  });
  const stampRow=document.getElementById('ticketStamps');stampRow.innerHTML='';
  for(let i=0;i<MAX_STAMPS;i++){const s=document.createElement('span');s.className='ticket-s';s.textContent='🍀';stampRow.appendChild(s);}
  const bc=document.getElementById('ticketBarcode');bc.innerHTML='';
  [28,18,26,14,30,22,18,28,16,24,30,18,26,20,28,14,24,18,30,22].forEach(h=>{const bar=document.createElement('span');bar.style.height=h+'px';bc.appendChild(bar);});
  document.getElementById('ticketOverlay').classList.add('show');
}
function closeTicket(e){const overlay=document.getElementById('ticketOverlay');if(!e||e.target===overlay||e.target.classList.contains('ticket-close'))overlay.classList.remove('show');}

// ══ MESSAGE WALL ══
// wallItems = items fetched from API (stickies + stickers)
// localPolaroids = polaroids stored locally (image upload stays offline)
let wallItems=[];
let localPolaroids=JSON.parse(localStorage.getItem('luckyWall_pol')||'[]');
let dragOX=0,dragOY=0;

function savePolaroids(){try{localStorage.setItem('luckyWall_pol',JSON.stringify(localPolaroids));}catch(e){}}
function deterministicRot(id,range){let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))&0x7fffffff;return((h%(range*200))-range*100)/100;}
function expandCanvas(){
  const canvas=document.getElementById('wallCanvas'); let maxBottom=window.innerHeight-56;
  canvas.querySelectorAll('.sticky,.wall-sticker,.wall-pol').forEach(el=>{const bottom=parseFloat(el.style.top)+el.offsetHeight+60;if(bottom>maxBottom)maxBottom=bottom;});
  canvas.style.minHeight=maxBottom+'px';
}
async function renderWall(){
  const canvas=document.getElementById('wallCanvas');canvas.innerHTML='';
  try{
    const res=await fetch(`${API_BASE}/api/wall`);
    if(res.ok){
      const data=await res.json();
      const arr=Array.isArray(data)?data:(data.items||data.wall||data.data||[]);
      wallItems=arr.map(item=>({...item,rot:item.rot??deterministicRot(item.id,item.type==='sticker'?15:6)}));
    }
  }catch(e){console.warn('Wall API unavailable',e);wallItems=[];}
  const allItems=[...wallItems,...localPolaroids];
  allItems.forEach((item,i)=>{if(item.type==='sticky')buildSticky(item,i);if(item.type==='sticker')buildWallSticker(item);if(item.type==='polaroid')buildWallPolaroid(item);});
  expandCanvas();
}

// ══ STICKY COLORS ══
const STICKY_COLORS=['#fffde0','#e8f5e9','#fce4ec','#e3f2fd','#fff3e0'];
let stickyColorIdx=0;
const colorRow=document.getElementById('colorRow');
STICKY_COLORS.forEach((color,i)=>{
  const dot=document.createElement('div');dot.className='col-opt'+(i===0?' active':'');
  dot.style.background=color;dot.style.border='2.5px solid '+(i===0?'var(--green-dark)':'transparent');
  dot.onclick=()=>{stickyColorIdx=i;colorRow.querySelectorAll('.col-opt').forEach((x,j)=>{x.classList.toggle('active',j===i);x.style.border='2.5px solid '+(j===i?'var(--green-dark)':'transparent');});};
  colorRow.appendChild(dot);
});

function openStickyModal(){document.getElementById('stickyModal').classList.add('open');document.getElementById('sText').focus();}
function closeModal(id){document.getElementById(id).classList.remove('open');}

async function addSticky(){
  const author=visitorName;
  const text=document.getElementById('sText').value.trim();
  if(!text){alert('Please write something!');return;}
  const canvas=document.getElementById('wallCanvas');
  const x=60+Math.random()*(canvas.offsetWidth-220);
  const y=20+Math.random()*(canvas.offsetHeight-200);
  const color=STICKY_COLORS[stickyColorIdx];
  document.getElementById('sText').value='';closeModal('stickyModal');
  try{
    const res=await fetch(`${API_BASE}/api/wall/sticky`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({author,text,color})});
    if(!res.ok)throw new Error(res.status);
    const data=await res.json();
    const item={...data,type:'sticky',x,y,rot:deterministicRot(data.id,6)};
    await fetch(`${API_BASE}/api/wall/${data.id}/position`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({x,y})});
    wallItems.push(item);buildSticky(item,wallItems.length-1);expandCanvas();
  }catch(e){alert('ไม่สามารถเชื่อมต่อ server ได้ กรุณาลองใหม่');console.error(e);}
}
function buildSticky(item,idx){
  const el=document.createElement('div');el.className='sticky c'+(1+idx%5);
  el.style.cssText=`background:${item.color};left:${item.x}px;top:${item.y}px;transform:rotate(${item.rot}deg)`;
  el.innerHTML=`<div class="sticky-tape"></div><div class="sticky-author">${esc(item.author)}</div><div class="sticky-text">${esc(item.text)}</div><button class="sticky-del" onclick="deleteItem('${item.id}',event)">✕</button>`;
  makeDraggable(el,item);document.getElementById('wallCanvas').appendChild(el);
}

// ══ STICKER ══
const STICKERS=[
  'images/sticker1.png','images/sticker2.png','images/sticker3.png',
  'images/sticker4.png','images/sticker5.png','images/sticker6.png',
];
function openStickerModal(){
  const grid=document.getElementById('stickerGrid');grid.innerHTML='';
  STICKERS.forEach((src,i)=>{
    const btn=document.createElement('div');btn.className='sticker-opt';
    btn.innerHTML=`<img src="${src}" alt="sticker ${i+1}"/>`;
    btn.onclick=()=>{addSticker(src);closeModal('stickerModal');};
    grid.appendChild(btn);
  });
  document.getElementById('stickerModal').classList.add('open');
}
async function addSticker(src){
  const canvas=document.getElementById('wallCanvas');
  const size=80+Math.floor(Math.random()*40);
  const x=60+Math.random()*(canvas.offsetWidth-160);
  const y=60+Math.random()*300;
  try{
    const res=await fetch(`${API_BASE}/api/wall/sticker`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({src,size})});
    if(!res.ok)throw new Error(res.status);
    const data=await res.json();
    const item={...data,type:'sticker',x,y,size,rot:deterministicRot(data.id,15)};
    await fetch(`${API_BASE}/api/wall/${data.id}/position`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({x,y})});
    wallItems.push(item);buildWallSticker(item);expandCanvas();
  }catch(e){alert('ไม่สามารถเชื่อมต่อ server ได้ กรุณาลองใหม่');console.error(e);}
}
function buildWallSticker(item){
  const el=document.createElement('div');el.className='wall-sticker';
  el.style.cssText=`left:${item.x}px;top:${item.y}px;width:${item.size}px;height:${item.size}px;transform:rotate(${item.rot}deg)`;
  el.innerHTML=`<img src="${item.src}" alt=""/><button class="wall-sticker-del" onclick="deleteItem('${item.id}',event)">✕</button>`;
  makeDraggable(el,item);document.getElementById('wallCanvas').appendChild(el);
}

// ══ POLAROID (local only — image upload stays offline) ══
let polFileDataUrl=null;
function openPolaroidModal(){
  polFileDataUrl=null;
  document.getElementById('polFileInput').value='';
  document.getElementById('polCaption').value='';
  document.getElementById('polPreview').style.display='none';
  document.getElementById('polDropZone').style.display='flex';
  document.getElementById('polaroidModal').classList.add('open');
}
function handlePolFile(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    polFileDataUrl=ev.target.result;
    const preview=document.getElementById('polPreview');preview.src=polFileDataUrl;preview.style.display='block';
    document.getElementById('polDropZone').style.display='none';
  };
  reader.readAsDataURL(file);
}
function addPolaroid(){
  if(!polFileDataUrl){alert('โรฮ่าจ๋aaaา เพิ่มรูปก่อนนะ');return;}
  const author=visitorName;
  const caption=document.getElementById('polCaption').value.trim();
  const canvas=document.getElementById('wallCanvas');
  const item={type:'polaroid',_local:true,id:'pol_'+Date.now(),src:polFileDataUrl,author,caption,x:60+Math.random()*Math.max(0,canvas.offsetWidth-210),y:40+Math.random()*300,rot:Math.random()*14-7};
  localPolaroids.push(item);savePolaroids();buildWallPolaroid(item);expandCanvas();
  closeModal('polaroidModal');
}
function buildWallPolaroid(item){
  const el=document.createElement('div');el.className='wall-pol';
  el.style.cssText=`left:${item.x}px;top:${item.y}px;transform:rotate(${item.rot}deg);width:150px;`;
  const capLine=item.caption?`<div class="pol-cap">${esc(item.caption)}</div>`:'';
  const authLine=item.author?`<div style="position:absolute;bottom:${item.caption?'17px':'4px'};left:0;right:0;text-align:center;font-family:var(--f-hand);font-size:.7rem;color:#aaa;">${esc(item.author)}</div>`:'';
  el.innerHTML=`<div class="pol-tape-t"></div><img src="${item.src}" alt="" style="width:136px;height:130px;display:block;object-fit:cover;"/>${capLine}${authLine}<button class="wall-pol-del" onclick="deleteItem('${item.id}',event)">✕</button>`;
  makeDraggable(el,item);document.getElementById('wallCanvas').appendChild(el);
}

// ══ DRAG ══
function makeDraggable(el,item){
  const isDelBtn=e=>e.target.classList.contains('sticky-del')||e.target.classList.contains('wall-pol-del')||e.target.classList.contains('wall-sticker-del');
  el.addEventListener('mousedown',e=>{if(!isDelBtn(e))startDrag(e,el,item,'mouse');});
  el.addEventListener('touchstart',e=>{if(!isDelBtn(e))startDrag(e,el,item,'touch');},{passive:false});
}
function startDrag(e,el,item,type){
  e.preventDefault();el.classList.add('selected');el.style.zIndex='50';
  const rect=document.getElementById('wallCanvas').getBoundingClientRect();
  const cx=type==='mouse'?e.clientX:e.touches[0].clientX;const cy=type==='mouse'?e.clientY:e.touches[0].clientY;
  dragOX=cx-rect.left-parseFloat(el.style.left);dragOY=cy-rect.top-parseFloat(el.style.top);
  function onMove(ev){const ex=ev.clientX||(ev.touches&&ev.touches[0].clientX)||0;const ey=ev.clientY||(ev.touches&&ev.touches[0].clientY)||0;el.style.left=Math.max(0,ex-rect.left-dragOX)+'px';el.style.top=Math.max(0,ey-rect.top-dragOY)+'px';item.x=Math.max(0,ex-rect.left-dragOX);item.y=Math.max(0,ey-rect.top-dragOY);}
  async function onUp(){
    el.classList.remove('selected');el.style.zIndex='10';expandCanvas();
    if(item._local){savePolaroids();}
    else{try{await fetch(`${API_BASE}/api/wall/${item.id}/position`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({x:item.x,y:item.y})});}catch(e){console.warn('Position save failed',e);}}
    document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);document.removeEventListener('touchmove',onMove);document.removeEventListener('touchend',onUp);
  }
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
  document.addEventListener('touchmove',onMove,{passive:false});document.addEventListener('touchend',onUp);
}
let _pendingDeleteId=null;
function deleteItem(itemId,e){
  e.stopPropagation();
  _pendingDeleteId=itemId;
  document.getElementById('deleteConfirmModal').classList.add('open');
}
async function confirmDelete(){
  const itemId=_pendingDeleteId;
  closeModal('deleteConfirmModal');
  _pendingDeleteId=null;
  if(!itemId)return;
  const apiItem=wallItems.find(i=>String(i.id)===String(itemId));
  if(apiItem){
    try{await fetch(`${API_BASE}/api/wall/${itemId}`,{method:'DELETE'});}catch(err){console.warn('Delete failed',err);}
    wallItems=wallItems.filter(i=>String(i.id)!==String(itemId));
  }else{
    localPolaroids=localPolaroids.filter(i=>String(i.id)!==String(itemId));
    savePolaroids();
  }
  renderWall();
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

// ══ SCROLL TRACK INFINITE LOOP ══
// Duplicate each track's items so translateX(-50%) loops seamlessly forever
document.querySelectorAll('.scroll-track').forEach(track=>{
  const items=[...track.children];
  items.forEach(item=>track.appendChild(item.cloneNode(true)));
});

// ══ HEADER SLIDESHOW ══
(function(){
  let hdrIdx=0;
  const hdrSlides=document.querySelectorAll('.cafe-hdr-slide');
  if(hdrSlides.length>1){
    hdrSlides[0].classList.add('active');
    setInterval(function(){
      hdrSlides[hdrIdx].classList.remove('active');
      hdrIdx=(hdrIdx+1)%hdrSlides.length;
      hdrSlides[hdrIdx].classList.add('active');
    },2500);
  }
})();

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal('stickyModal');closeModal('stickerModal');closeModal('polaroidModal');}});
['stickyModal','stickerModal','polaroidModal'].forEach(id=>{document.getElementById(id).addEventListener('click',function(e){if(e.target===this)closeModal(id);});});
