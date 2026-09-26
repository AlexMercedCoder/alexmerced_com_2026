const TILE = 32;
const W = 60;
const H = 32;
const SAVE_KEY = 'merced-odyssey-v1';

// The story takes its facts from Alex's network. Each chapter has its own source.
const chapters = [
  {
    name: 'Hartford Beginnings', palette: ['#438b65','#347654','#6ab17a','#d6bb89','#26563e'], symbol: 'star',
    source: 'https://whoisalexmerced.com/', sourceName: 'Who Is Alex Merced?',
    intro: 'A tiny spark wakes in Hartford. Before the books, the conferences, and the code, curiosity already had a home.',
    guide: ['Welcome to the beginning, explorer. Alex was born in Hartford, Connecticut in 1985.', 'His Guatemalan and Puerto Rican family roots gave this story more than one rhythm.', 'At Howell Cheney Technical High School, he studied Microcomputer, joined Guitar Club, Mathletes, and robotics, and made early games.', 'Read the three memory tablets. Answer their shrines, then face the Shadow of Doubt.'],
    questions: [
      ['Where did Alex’s story begin?', ['Hartford, Connecticut','Austin, Texas','Brooklyn, New York'], 0, 'The first spark appeared in Hartford, Connecticut.'],
      ['What did Alex study at Howell Cheney Technical High School?', ['Microcomputer','Marine biology','Architecture'], 0, 'At Cheney Tech, the classroom was Microcomputer.'],
      ['Which early game-making tool did Alex use?', ['RPG Maker 2000','Unreal Engine 5','Roblox Studio'], 0, 'The early adventures were built with RPG Maker 2000 and GRAAL scripts.']
    ]
  },
  {
    name: 'The Music Grove', palette: ['#6a5b99','#574b87','#aa8bc0','#bba4a0','#3a356b'], symbol: 'note',
    source: 'https://alexmercedmusic.com/', sourceName: 'Alex Merced Music',
    intro: 'The path turns into a melody. Old songs and new tools echo across a grove of glowing instruments.',
    guide: ['Before data architecture, there were songs. Alex played trombone, then guitar, then taught himself music production.', 'He wrote acoustic songs, made electronic music in FL Studio, and later reimagined some old recordings with AI.', 'An old song can change its arrangement and still carry its original heart. Find the three melody fragments.'],
    questions: [
      ['Which instrument did Alex pick up in high school?', ['Guitar','Oboe','Cello'], 0, 'The guitar followed his middle-school trombone years.'],
      ['What software did Alex use for his electronic productions?', ['FL Studio','Blender','AutoCAD'], 0, 'The electronic catalogue was produced in FL Studio.'],
      ['What happened to several early songs years later?', ['They were reimagined with AI','They became silent films','They were deleted'], 0, 'Eight archive songs were rebuilt with Suno in new styles.']
    ]
  },
  {
    name: 'Radio & Community', palette: ['#ac7255','#915e4b','#d8a577','#dcc39b','#644038'], symbol: 'radio',
    source: 'https://whoisalexmerced.com/', sourceName: 'Who Is Alex Merced?',
    intro: 'A college radio tower hums over a bustling square. Ideas travel farther when people share them.',
    guide: ['At Bowling Green State University, Alex studied Marketing and Popular Culture.', 'He served as Promotion Director at WBGU-FM and helped bring people together through events.', 'Fashionably Numb Music and The Gamers Lounge grew from that same maker spirit.'],
    questions: [
      ['Where did Alex attend college?', ['Bowling Green State University','Yale University','Georgia Tech'], 0, 'Bowling Green State University was the next stop.'],
      ['At which station was Alex Promotion Director?', ['WBGU-FM','WNYC','KEXP'], 0, 'The college airwaves belonged to WBGU-FM.'],
      ['What was The Gamers Lounge?', ['A hobby store','A lakehouse','A radio station'], 0, 'The Gamers Lounge was a hobby store Alex founded.']
    ]
  },
  {
    name: 'The Teaching Quarter', palette: ['#5b8b88','#477772','#8ac4b7','#d5c8a0','#315c58'], symbol: 'book',
    source: 'https://whoisalexmerced.com/', sourceName: 'Who Is Alex Merced?',
    intro: 'An open classroom stands amid a city of competing voices. Knowledge grows when it is shared.',
    guide: ['For more than a decade in New York City, Alex taught finance and economics to professionals.', 'He ran for public office three times and promoted pluralism and tolerance.', 'His guiding belief: explaining an idea to someone else helps you understand it yourself.'],
    questions: [
      ['What did Alex teach in New York City?', ['Finance and economics','Astronomy','Marine navigation'], 0, 'His New York training work centered on finance and economics.'],
      ['How many times did Alex run for public office?', ['Three','One','Seven'], 0, 'He ran three times to promote the exchange of ideas.'],
      ['What helps deepen understanding, according to Alex?', ['Teaching someone else','Keeping ideas secret','Avoiding questions'], 0, 'He says the best way to learn is to teach.']
    ]
  },
  {
    name: 'The Builder’s Workshop', palette: ['#5378a2','#3e658d','#83a7c9','#bdc3bd','#274a73'], symbol: 'code',
    source: 'https://alexmercedcoder.dev/', sourceName: 'Alex Merced Coder',
    intro: 'The workshop smells of warm circuits and fresh starts. A career can be rebuilt one project at a time.',
    guide: ['In 2019 Alex made a major shift into software development.', 'He built GrokOverflow.com, taught a web development masterclass, and worked as an instructor at General Assembly.', 'Here, solving the puzzle means sharing tools that help other builders.'],
    questions: [
      ['In which year did Alex pivot into software development?', ['2019','2001','2026'], 0, 'The transition began in 2019.'],
      ['What site did Alex create during that transition?', ['GrokOverflow.com','Wikipedia.org','MySpace.com'], 0, 'GrokOverflow.com was one of his projects.'],
      ['Where did Alex teach web development?', ['General Assembly','A music conservatory','NASA'], 0, 'He taught as a bootcamp instructor at General Assembly.']
    ]
  },
  {
    name: 'The Open Lakehouse', palette: ['#3c91a8','#287a94','#6ac4d0','#b5d5ce','#245a78'], symbol: 'ice',
    source: 'https://alexmerceddata.com/', sourceName: 'Alex Merced Data',
    intro: 'A crystal lake reflects an open sky. Streams of data flow into a structure anyone can learn to navigate.',
    guide: ['Alex joined Dremio in 2021 and became Head of Developer Relations.', 'He teaches open data lakehouse ideas, especially Apache Iceberg and Apache Polaris.', 'The strongest lakehouse has clear foundations and open doors for learners.'],
    questions: [
      ['Where does Alex lead Developer Relations?', ['Dremio','A radio station','A record label'], 0, 'Dremio is where Alex leads Developer Relations.'],
      ['Which open table format is central to his teaching?', ['Apache Iceberg','JPEG','SMTP'], 0, 'Apache Iceberg is a central lakehouse topic.'],
      ['Which project is a catalog for open lakehouses?', ['Apache Polaris','Apache Guitar','Apache Canvas'], 0, 'Apache Polaris is one of Alex’s flagship topics.']
    ]
  },
  {
    name: 'The Library of Many Worlds', palette: ['#a47a57','#845c46','#d6af76','#d7b992','#5a3d3b'], symbol: 'book',
    source: 'https://books.alexmerced.com/', sourceName: 'Books by Alex Merced',
    intro: 'Shelves spiral beyond sight: data manuals, philosophy, fiction, and tabletop adventures all share a roof.',
    guide: ['Alex’s catalogue crosses technical writing, economics, philosophy, fiction, and roleplaying games.', 'Flagship titles include Apache Iceberg: The Definitive Guide, Apache Polaris: The Definitive Guide, and Architecting an Apache Iceberg Lakehouse.', 'D6 Storyteller turns his love of stories into a tabletop roleplaying engine.'],
    questions: [
      ['Which title is one of Alex’s flagship data books?', ['Apache Iceberg: The Definitive Guide','The Great Gatsby','The Hobbit'], 0, 'The Iceberg definitive guide is one of his flagship titles.'],
      ['What is D6 Storyteller?', ['A tabletop roleplaying engine','A data warehouse','A radio station'], 0, 'D6 Storyteller is a fiction-first tabletop roleplaying engine.'],
      ['Which subjects share shelf space in Alex’s catalogue?', ['Technology, fiction, and philosophy','Only cooking','Only sports'], 0, 'The catalogue spans technology, philosophy, fiction, and more.']
    ]
  },
  {
    name: 'The Agentic Summit', palette: ['#6363a6','#4c4c8d','#a391d9','#b5aed4','#35366f'], symbol: 'spark',
    source: 'https://www.alexmercedai.com/', sourceName: 'Alex Merced AI',
    intro: 'At the summit, the scattered Sparks of Curiosity form a constellation. The final shadow waits below it.',
    guide: ['Alex’s current work brings data, AI agents, and education together.', 'He writes about agentic analytics, open specifications, and systems that help people build with confidence.', 'The adventure ends where it began: curiosity is most powerful when it is shared.'],
    questions: [
      ['Which idea connects Alex’s current AI and data work?', ['Agentic analytics','Underwater mining','Space tourism'], 0, 'Agentic analytics joins agents with trustworthy data.'],
      ['What kind of tools does Alex advocate?', ['Open, educational tools','Secret, inaccessible tools','Tools nobody can learn'], 0, 'The network emphasizes open ideas and education.'],
      ['What should the Sparks of Curiosity do?', ['Help others learn and create','Stay locked away','Erase old stories'], 0, 'The final spark is meant to be shared.']
    ]
  }
];

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
function sizeCanvas(){
  const compact=window.matchMedia('(max-width: 600px)').matches;
  canvas.width=compact?480:960;
  canvas.height=compact?320:576;
  ctx.imageSmoothingEnabled=false;
}
sizeCanvas();
window.addEventListener('resize',sizeCanvas);
const art = {
  hero: new Image(),
  walk: new Image(),
  slash: new Image(),
  world: new Image(),
  terrain: new Image(),
  floor: new Image()
};
art.hero.src='/game/alex-adventurer.png';
art.walk.src='/game/alex-walk-sheet.png';
art.slash.src='/game/arc-attack-sheet.png';
art.world.src='/game/world-atlas.png';
art.terrain.src='/game/terrain-atlas.png';
art.floor.src='/game/floor-atlas.png';
function sprite(img,col,row,x,y,w,h) {
  if(!img.complete || !img.naturalWidth)return false;
  const cw=img.naturalWidth/4,ch=img.naturalHeight/4;
  ctx.drawImage(img,col*cw,row*ch,cw,ch,Math.round(x),Math.round(y),w,h);
  return true;
}
function heroSprite(x,y,w,h) {
  if(!art.hero.complete || !art.hero.naturalWidth)return false;
  ctx.drawImage(art.hero,300,140,540,1130,Math.round(x),Math.round(y),w,h);
  return true;
}
// The generated poses have uneven gutters. Crop each opaque figure and anchor
// every planted foot to the same world-space baseline.
const walkFrames = [
  [[50,21,163,319],[327,21,161,321],[604,25,162,317],[893,21,158,321]],
  [[61,354,141,317],[340,354,152,310],[618,357,141,310],[893,354,161,311]],
  [[62,685,144,315],[330,686,162,307],[621,688,144,309],[894,685,156,306]],
  [[50,1016,163,315],[323,1018,163,321],[604,1017,163,322],[888,1016,164,323]]
];
function walkSprite(col,row,x,footY) {
  if(!art.walk.complete || !art.walk.naturalWidth)return false;
  const [sx,sy,sw,sh]=walkFrames[row][col];
  const scale=.245,w=sw*scale,h=sh*scale;
  ctx.drawImage(art.walk,sx,sy,sw,sh,Math.round(x-w/2),Math.round(footY-h),Math.round(w),Math.round(h));
  return true;
}
const els = {
  title: document.querySelector('#chapter-title'), health: document.querySelector('#health'),
  objective: document.querySelector('#objective'), progress: document.querySelector('#progress-fill'),
  progressLabel: document.querySelector('#progress-label'), prompt: document.querySelector('#prompt'),
  dialog: document.querySelector('#dialog'), dialogTitle: document.querySelector('#dialog-title'),
  dialogBody: document.querySelector('#dialog-body'), dialogActions: document.querySelector('#dialog-actions'),
  dialogKicker: document.querySelector('#dialog-kicker')
};
const fresh = () => ({ chapter: 0, shrines: chapters.map(() => [false,false,false]), guardians: chapters.map(() => false), notes: chapters.map(() => [false,false,false]), shards: chapters.map(() => 0), health: 6, deaths: 0, won: false, started: false });
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!raw || !Array.isArray(raw.shrines) || raw.shrines.length !== chapters.length) return fresh();
    return { ...fresh(), ...raw, shards: Array.isArray(raw.shards) && raw.shards.length===chapters.length ? raw.shards : chapters.map(()=>0), chapter: Math.max(0, Math.min(chapters.length - 1, Number(raw.chapter) || 0)) };
  } catch { return fresh(); }
}
let state = load();
const player = {
  x: 2.5*TILE, y: 9.5*TILE, facing: 'down', moving: false, walkDistance: 0,
  attackStart: 0, attackUntil: 0, attackReady: 0, attackFacing: 'down',
  attackTargets: new Set(), invulnerableUntil: 0
};
const input = { up:false, down:false, left:false, right:false };
let enemies = [];
let projectiles = [];
let blocked = new Set();
let modalOpen = false;
let puzzleCleanup = () => {};
let soundOn = false;
let audioContext;
let last = performance.now();
let effects = [];

function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch {} }
function tone(freq=440, duration=.1, type='square') {
  if (!soundOn) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator(), gain = audioContext.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
    osc.connect(gain).connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + duration);
  } catch {}
}
function rng(n) { let t = (n * 1664525 + 1013904223) >>> 0; return () => ((t = (t * 1664525 + 1013904223) >>> 0) / 4294967296); }
function buildZone() {
  player.attackUntil=0;
  player.attackTargets.clear();
  blocked = new Set();
  for (let x=0;x<W;x++) { blocked.add(x+',0'); blocked.add(x+','+(H-1)); }
  for (let y=0;y<H;y++) { blocked.add('0,'+y); blocked.add((W-1)+','+y); }
  const clusters = [[8,5],[20,10],[42,10],[52,5],[8,24],[20,23],[42,23],[52,24],[26,4],[34,4]];
  for (const [cx,cy] of clusters) for (let dx=0;dx<3;dx++) for(let dy=0;dy<2;dy++) blocked.add((cx+dx)+','+(cy+dy));
  // Four small features frame the central open paths without blocking quests.
  const rand = rng(state.chapter+718);
  enemies = [];
  projectiles = [];
  const spots = [[7,15],[10,7],[16,6],[23,7],[39,7],[48,8],[54,14],[10,25],[19,25],[27,24],[37,24],[49,26],[26,17],[36,18],[55,24],[16,18]];
  for (const [i,[x,y]] of spots.entries()) enemies.push({x:(x+.5)*TILE,y:(y+.5)*TILE,hp: i<9?3:2, speed:.53+rand()*.35, drift:rand()*6, lastHit:0,boss:false});
  if (state.shrines[state.chapter].every(Boolean) && !state.guardians[state.chapter]) spawnGuardian();
  player.x = 2.5*TILE; player.y = 18.5*TILE;
  effects = [];
  updateHud();
}
function spawnGuardian() {
  if (enemies.some(e=>e.boss)) return;
  enemies.push({x:30.5*TILE,y:10.5*TILE,hp:12,speed:.65,drift:0,lastHit:0,boss:true,nextAttack:performance.now()+1500,attackCount:0,warning:null});
  effects.push({text:'GUARDIAN AWAKENS',x:30.5*TILE,y:9*TILE,until:performance.now()+1800,color:'#ffce77'});
  tone(180,.35,'sawtooth');
}
function updateHud() {
  els.title.textContent = chapters[state.chapter].name;
  els.health.innerHTML = Array.from({length:6},(_,i)=>'<span class="'+(i<state.health?'heart-full':'heart-empty')+'">♥</span>').join('');
  const done = state.shrines[state.chapter].filter(Boolean).length;
  els.objective.textContent = state.won ? 'The story lives on. Explore or revisit the network below.' : state.guardians[state.chapter] ? (state.chapter===chapters.length-1 ? 'The final gate is open. Leave the summit to finish.' : 'The guardian is defeated. Travel through the east gate.') : done===3 ? 'Face the guardian near the north end of the central path. Watch its attack warning.' : 'Each shrine needs its nearby tablet OR 1 Insight from a shadow. '+done+'/3 shrines · '+state.shards[state.chapter]+' Insight.';
  const total = chapters.length*4+1;
  const completed = state.guardians.filter(Boolean).length+state.shrines.flat().filter(Boolean).length+(state.won?1:0);
  els.progress.style.width = (completed/total*100)+'%';
  els.progressLabel.textContent = completed+' of '+total+' milestones · Chapter '+(state.chapter+1)+' of '+chapters.length;
}
function modal(title, lines, actions=[], kicker='The Merced Odyssey') {
  puzzleCleanup(); puzzleCleanup=()=>{};
  modalOpen=true; els.dialog.hidden=false; els.dialogTitle.textContent=title; els.dialogKicker.textContent=kicker;
  els.dialogBody.replaceChildren(); els.dialogActions.replaceChildren();
  for (const line of lines) {
    const p=document.createElement('p'); p.textContent=line; els.dialogBody.append(p);
  }
  for (const action of actions) {
    const b=document.createElement('button'); b.type='button'; b.textContent=action.label;
    if(action.primary) b.className='primary';
    b.addEventListener('click',action.run); els.dialogActions.append(b);
  }
  document.querySelector('#dialog-close').focus();
}
function closeModal() { puzzleCleanup(); puzzleCleanup=()=>{}; modalOpen=false; els.dialog.hidden=true; Object.keys(input).forEach(k=>input[k]=false); canvas.focus(); }
document.querySelector('#dialog-close').addEventListener('click',closeModal);
els.dialog.addEventListener('click',e=>{if(e.target===els.dialog)closeModal();});

function begin() {
  state.started=true; save(); canvas.scrollIntoView({behavior:'smooth',block:'center'});
  player.invulnerableUntil=performance.now()+3000;
  modal(state.won ? 'A story to revisit' : 'A spark of curiosity', [
    state.won ? 'You have finished the main quest. Walk the worlds again, or start a new story from the Journal.' : 'The Shadow of Doubt has scattered eight Sparks of Curiosity across Alex’s story. Each world holds three memory shrines, a guardian, and a path forward. Read a nearby tablet or defeat a shadow to activate each shrine.',
    'Move with WASD or arrow keys. Press E near people, tablets, shrines, and gates. Press Space to send a wave of light at nearby shadows. Your progress saves in this browser.'
  ],[{label:'Enter the world',primary:true,run:closeModal}]);
}
document.querySelector('#start-button').addEventListener('click',begin);
document.querySelector('#help-button').addEventListener('click',()=>modal('How to play',[
  'Explore each scrolling chapter from west to east. Reading a nearby tablet or defeating a shadow activates a shrine. Defeated shadows grant insight automatically. Later worlds have special first-shrine challenges: rhythm, relays, circuits, streams, library rooms, and a companion. Defeat the guardian to open the east gate.',
  'Move: WASD or arrow keys. Talk or use: E. Attack: Space. Journal: J. Close dialog: Esc. On touch screens, use the controls below the game.',
  'A fountain near the entrance restores your hearts. If hearts run out, you restart the current area while keeping solved shrines and defeated guardians. Progress saves automatically in local storage.'
],[{label:'Return to adventure',run:closeModal}],'Guide'));
document.querySelector('#sound-button').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.textContent=soundOn?'Sound on':'Sound off';e.currentTarget.setAttribute('aria-pressed',String(soundOn));tone(660,.12);});
document.querySelector('#journal-button').addEventListener('click',journal);
function journal() {
  const lines=chapters.map((c,i)=>`${state.guardians[i]?'✦':i===state.chapter?'➤':'○'} ${i+1}. ${c.name} — ${state.shrines[i].filter(Boolean).length}/3 shrines`);
  modal('Adventure journal',[
    'Eight chapters trace a path from Hartford to music, community, teaching, software, the lakehouse, books, and AI.',
    ...lines,
    'Deaths: '+state.deaths+'. The main story takes roughly 45–60 minutes at an exploratory pace; there is no timer.'
  ],[
    {label:'Continue',primary:true,run:closeModal},
    {label:'Start a new adventure (erase local save)',run:()=>modal('Start over?',[
      'This resets all chapters, shrines, and guardians stored in this browser.'
    ],[{label:'Cancel',run:journal},{label:'Erase save and start over',run:()=>{state=fresh();save();buildZone();closeModal();}}],'Confirm reset')}
  ],'Journal');
}

const positions = {
  guide: [3.5,15.5], fountain:[3.5,20.5], gateBack:[1.5,18.5], gateNext:[58.5,18.5],
  shrines:[[13.5,7.5],[47.5,7.5],[30.5,25.5]],
  notes:[[13.5,9.5],[47.5,9.5],[30.5,23.5]]
};
function near(pos,r=48) { return Math.hypot(player.x-pos[0]*TILE,player.y-pos[1]*TILE)<r; }
function nearestInteractable() {
  const opts=[];
  const add=(pos,label,run)=>{if(near(pos))opts.push({d:Math.hypot(player.x-pos[0]*TILE,player.y-pos[1]*TILE),label,run});};
  add(positions.guide,'Talk to the guide',()=>modal(chapters[state.chapter].name,chapters[state.chapter].guide,[{label:'Continue',run:closeModal}], 'Story guide'));
  add(positions.fountain,'Rest at the fountain',()=>{state.health=6;save();updateHud();tone(740,.25);effects.push({text:'HEARTS RESTORED',x:player.x,y:player.y-22,until:performance.now()+1300,color:'#a9ffe2'});});
  positions.notes.forEach((p,i)=>add(p,'Read memory tablet '+(i+1),()=>{
    state.notes[state.chapter][i]=true;save();
    const c=chapters[state.chapter];
    modal('Memory tablet '+(i+1),[c.questions[i][3],'The nearby shrine is now ready. This clue comes from '+c.sourceName+'.'],[
      {label:'Continue',primary:true,run:closeModal},
      {label:'Open real-world source ↗',run:()=>window.open(c.source,'_blank','noopener')}
    ],'A clue from Alex’s story');
  }));
  positions.shrines.forEach((p,i)=>add(p,state.shrines[state.chapter][i]?'Shrine '+(i+1)+' complete':state.notes[state.chapter][i]||state.shards[state.chapter]>0?'Solve shrine '+(i+1):'Shrine '+(i+1)+' needs tablet or Insight',()=>solveShrine(i)));
  if(state.chapter>0)add(positions.gateBack,'Travel to previous chapter',()=>travel(-1));
  add(positions.gateNext,state.guardians[state.chapter]?'Enter the next chapter':'Inspect the sealed gate',()=>travel(1));
  return opts.sort((a,b)=>a.d-b.d)[0];
}
function solveShrine(i) {
  if(state.shrines[state.chapter][i]) {modal('A restored memory',['This Spark is already shining. Seek the other shrines, or face the guardian.'],[{label:'Continue',run:closeModal}]);return;}
  if(state.shards[state.chapter]<1 && !state.notes[state.chapter][i]) {modal('The shrine needs a clue',['Read its nearby memory tablet or defeat a shadow. Either one will let you attempt this shrine.'],[{label:'Continue',run:closeModal}]);return;}
  const c=chapters[state.chapter],q=c.questions[i];
  modal('Shrine '+(i+1)+': '+c.name,[q[0],state.notes[state.chapter][i]?'You have read the nearby clue.':'A memory tablet nearby may help.'],q[1].map((choice,idx)=>({
    label:choice,
    run:()=>{
      if(idx===q[2]){
        tone(840,.2);
        if(i===0 && [1,2,4,5,6,7].includes(state.chapter))signatureChallenge(state.chapter,i,q[3]);
        else runeChallenge(i,q[3]);
      } else {
        state.health=Math.max(1,state.health-1);save();updateHud();tone(160,.18,'sawtooth');
        modal('The memory flickers',['That answer does not fit the clue. The shrine dimmed one heart, but you can try again.','Hint: '+q[3]],[{label:'Try again',primary:true,run:()=>solveShrine(i)},{label:'Explore more',run:closeModal}],'Keep learning');
      }
    }
  })), 'A memory challenge');
}
function runeChallenge(i,answer) {
  const glyphs=['◆','●','▲','■'];
  const random=rng(987+state.chapter*107+i*53);
  const sequence=Array.from({length:Math.min(6,4+Math.floor(state.chapter/3))},()=>Math.floor(random()*4));
  modal('Awaken the memory',[
    answer,
    'A pattern of light appears: '+sequence.map(n=>glyphs[n]).join('  '),
    'Study it. Press Ready, then repeat the pattern by choosing the four runes in order.'
  ],[{label:'Ready to repeat the pattern',primary:true,run:()=>repeatRunes(i,answer,sequence,glyphs,0)}],'Shrine '+(i+1)+' · light puzzle');
}
function repeatRunes(i,answer,sequence,glyphs,step) {
  modal('Repeat the light pattern',[
    'Choose rune '+(step+1)+' of '+sequence.length+'.',
    'The pattern is hidden now. If it slips away, you can study it again.'
  ],[
    ...glyphs.map((glyph,n)=>({label:glyph,run:()=>{
      if(n===sequence[step]) {
        tone(500+step*80,.1,'triangle');
        if(step+1===sequence.length)completeShrine(i,answer);
        else repeatRunes(i,answer,sequence,glyphs,step+1);
      } else {
        tone(150,.18,'sawtooth');
        modal('The pattern fades',['The light returned to its first rune. Study the pattern and try again. No insight was spent.'],[
          {label:'Study again',primary:true,run:()=>runeChallenge(i,answer)},
          {label:'Return to the world',run:closeModal}
        ],'A memory challenge');
      }
    }})),
    {label:'Study again',run:()=>runeChallenge(i,answer)}
  ],'Shrine '+(i+1)+' · light puzzle');
}
function puzzleButton(label,run,parent=els.dialogBody,className='') {
  const b=document.createElement('button'); b.type='button'; b.textContent=label;
  if(className)b.className=className;
  b.addEventListener('click',run);parent.append(b);return b;
}
function puzzleStatus(message) {
  let p=els.dialogBody.querySelector('.puzzle-status');
  if(!p){p=document.createElement('p');p.className='puzzle-status';p.setAttribute('role','status');els.dialogBody.append(p);}
  p.textContent=message;
}
function signatureChallenge(chapter,i,answer) {
  const finish=()=>completeShrine(i,answer);
  if(chapter===1)musicPuzzle(finish);
  if(chapter===2)radioPuzzle(finish);
  if(chapter===4)workshopPuzzle(finish);
  if(chapter===5)lakehousePuzzle(finish);
  if(chapter===6)libraryPuzzle(finish);
  if(chapter===7)companionPuzzle(finish);
}
function musicPuzzle(finish) {
  modal('The Music Grove · Keep the beat',['Tap along with the five golden beats as the playhead moves. The grove gives you a wide timing window; missed notes can be retried.'],[], 'Signature challenge · rhythm');
  const beats=[0,1,2,4,6],length=8,stepMs=620;
  const track=document.createElement('div');track.className='rhythm-track';els.dialogBody.append(track);
  const cells=Array.from({length},(_,n)=>{const cell=document.createElement('span');cell.textContent=beats.includes(n)?'♪':'·';cell.className=beats.includes(n)?'beat target':'beat';track.append(cell);return cell;});
  let start=0,hit=new Set(),raf=0,playing=false;
  const tap=()=>{
    if(!playing)return;
    const beat=(performance.now()-start)/stepMs;
    const nearest=beats.find(n=>!hit.has(n)&&Math.abs(beat-n-.5)<.42);
    if(nearest===undefined){puzzleStatus('That tap fell between notes. Keep listening to the pulse.');tone(180,.08);return;}
    hit.add(nearest);cells[nearest].classList.add('hit');tone(420+nearest*75,.12,'triangle');
    puzzleStatus(hit.size+' of '+beats.length+' beats played.');
    if(hit.size===beats.length){playing=false;cancelAnimationFrame(raf);finish();}
  };
  const tick=()=>{
    if(!playing)return;
    const beat=(performance.now()-start)/stepMs;
    cells.forEach((cell,n)=>cell.classList.toggle('current',Math.floor(beat)===n));
    if(beat>=length){playing=false;puzzleStatus('The phrase ended. Press Replay and try the rhythm again.');return;}
    raf=requestAnimationFrame(tick);
  };
  const begin=()=>{cancelAnimationFrame(raf);hit=new Set();cells.forEach(c=>c.classList.remove('hit','current'));start=performance.now();playing=true;puzzleStatus('Phrase playing · tap each golden ♪ as it passes.');tick();};
  puzzleButton('Start / replay the phrase',begin,els.dialogActions,'primary');
  puzzleButton('Tap beat',tap,els.dialogActions);
  puzzleStatus('Press Start, then use Tap beat or Space.');
  const key=e=>{if(e.code==='Space'){e.preventDefault();e.stopImmediatePropagation();tap();}};
  window.addEventListener('keydown',key,true);
  puzzleCleanup=()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',key,true);};
}
const PIPE_N=1,PIPE_E=2,PIPE_S=4,PIPE_W=8;
function radioPuzzle(finish) {
  modal('WBGU-FM · Restore the signal',['Rotate the copper relays until a continuous line carries the broadcast from IN on the left to OUT on the right.'],[], 'Signature challenge · radio relays');
  const base=[PIPE_E|PIPE_S,PIPE_E|PIPE_S,PIPE_W|PIPE_S,PIPE_N|PIPE_S,
    PIPE_E|PIPE_W,PIPE_W|PIPE_N,PIPE_N|PIPE_S,PIPE_E|PIPE_S,
    PIPE_N|PIPE_E,PIPE_N|PIPE_S,PIPE_N|PIPE_E,PIPE_W|PIPE_E,
    PIPE_E|PIPE_W,PIPE_N|PIPE_E,PIPE_W|PIPE_N,PIPE_N|PIPE_S];
  const turns=[1,2,1,0,1,2,1,2,0,1,2,1,0,2,1,0];
  let bits=base.map((mask,n)=>{for(let j=0;j<turns[n];j++)mask=((mask<<1)&15)|(mask>>3);return mask;});
  const grid=document.createElement('div');grid.className='puzzle-grid relay-grid';els.dialogBody.append(grid);
  const connected=()=>{
    const seen=new Set([4]),queue=[4];
    while(queue.length){const n=queue.shift(),x=n%4,y=Math.floor(n/4),mask=bits[n];
      if(n===11 && (mask&PIPE_E))return true;
      for(const [bit,opposite,dx,dy] of [[PIPE_N,PIPE_S,0,-1],[PIPE_E,PIPE_W,1,0],[PIPE_S,PIPE_N,0,1],[PIPE_W,PIPE_E,-1,0]]){
        const xx=x+dx,yy=y+dy,to=yy*4+xx;
        if(!(mask&bit)||xx<0||xx>3||yy<0||yy>3||!(bits[to]&opposite)||seen.has(to))continue;
        seen.add(to);queue.push(to);
      }
    }return false;
  };
  const draw=(focusIndex=-1)=>{grid.replaceChildren();bits.forEach((mask,n)=>{
    const b=puzzleButton('',()=>{bits[n]=((bits[n]<<1)&15)|(bits[n]>>3);tone(380,.06);draw(n);if((bits[4]&PIPE_W)&&connected())finish();},grid,'pipe-tile');
    b.setAttribute('aria-label','Rotate relay row '+(Math.floor(n/4)+1)+', column '+(n%4+1)+'. Ports '+[['north',PIPE_N],['east',PIPE_E],['south',PIPE_S],['west',PIPE_W]].filter(([,bit])=>mask&bit).map(([name])=>name).join(' and '));
    for(const [dir,bit] of [['n',PIPE_N],['e',PIPE_E],['s',PIPE_S],['w',PIPE_W]])if(mask&bit){const arm=document.createElement('span');arm.className='pipe-arm '+dir;b.append(arm);}
    const core=document.createElement('span');core.className='pipe-core';b.append(core);
    if(n===4)b.dataset.terminal='IN';if(n===11)b.dataset.terminal='OUT';
  });if(focusIndex>=0)grid.children[focusIndex]?.focus();};draw();
  puzzleStatus('IN enters row 2. OUT leaves row 3. Click a relay to rotate it clockwise.');
}
function workshopPuzzle(finish) {
  modal('Builder’s Workshop · Complete the circuit',['Push both copper blocks onto the glowing sockets. Alex can walk around them, but cannot pull a block. Use arrow keys or the buttons.'],[], 'Signature challenge · block puzzle');
  const walls=new Set(),targets=new Set(['4,2','4,4']);
  ['#######','#.....#','#.....#','#..#..#','#.....#','#######'].forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='#')walls.add(x+','+y);}));
  let hero=[1,4],boxes=new Set(['2,2','3,4']);
  const board=document.createElement('div');board.className='puzzle-grid workshop-grid';els.dialogBody.append(board);
  const render=()=>{board.replaceChildren();for(let y=0;y<6;y++)for(let x=0;x<7;x++){
    const key=x+','+y,t=document.createElement('span');t.className='workshop-cell '+(walls.has(key)?'wall':boxes.has(key)?'block':hero[0]===x&&hero[1]===y?'hero':targets.has(key)?'socket':'floor');
    t.textContent=boxes.has(key)?'▣':hero[0]===x&&hero[1]===y?'A':targets.has(key)?'✦':'';board.append(t);
  }};
  const move=(dx,dy)=>{const nx=hero[0]+dx,ny=hero[1]+dy,key=nx+','+ny,beyond=(nx+dx)+','+(ny+dy);
    if(walls.has(key))return;
    if(boxes.has(key)){if(walls.has(beyond)||boxes.has(beyond))return;boxes.delete(key);boxes.add(beyond);tone(320,.09);}
    hero=[nx,ny];render();
    if([...targets].every(t=>boxes.has(t)))finish();
  };
  const pad=document.createElement('div');pad.className='puzzle-pad';els.dialogActions.append(pad);
  for(const [label,dx,dy] of [['↑',0,-1],['←',-1,0],['↓',0,1],['→',1,0]])puzzleButton(label,()=>move(dx,dy),pad);
  puzzleButton('Reset circuit',()=>{hero=[1,4];boxes=new Set(['2,2','3,4']);render();},els.dialogActions);
  render();puzzleStatus('Push each block onto a ✦ socket.');
  const key=e=>{const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.code];if(d){e.preventDefault();e.stopImmediatePropagation();move(...d);}};
  window.addEventListener('keydown',key,true);puzzleCleanup=()=>window.removeEventListener('keydown',key,true);
}
function lakehousePuzzle(finish) {
  modal('Open Lakehouse · Route the stream',['Open valves to carry the blue stream from SOURCE through an open table and catalog to QUERY. Close any route that sends data into the red shadow sink.'],[], 'Signature challenge · flow gates');
  const edges=[['SOURCE','ICEBERG'],['SOURCE','SILO'],['ICEBERG','POLARIS'],['ICEBERG','SILO'],['SILO','SHADOW'],['POLARIS','QUERY'],['SILO','QUERY']];
  const open=new Set([1,3,4,6]);
  const flow=()=>{const reached=new Set(['SOURCE']);let changed=true;while(changed){changed=false;edges.forEach(([a,b],n)=>{if(open.has(n)&&reached.has(a)&&!reached.has(b)){reached.add(b);changed=true;}});}return reached;};
  const panel=document.createElement('div');panel.className='flow-panel';els.dialogBody.append(panel);
  const draw=(focusIndex=-1)=>{panel.replaceChildren();const reached=flow();
    edges.forEach(([a,b],n)=>{const button=puzzleButton((open.has(n)?'● OPEN  ':'○ CLOSED')+'  '+a+' → '+b,()=>{if(open.has(n))open.delete(n);else open.add(n);tone(open.has(n)?580:240,.07);draw(n);},panel,'valve '+(open.has(n)?'open':''));button.setAttribute('aria-pressed',String(open.has(n)));});
    if(focusIndex>=0)panel.children[focusIndex]?.focus();
    puzzleStatus('Stream reaches: '+[...reached].join(' → ')+(reached.has('SHADOW')?' · Shadow sink active!':''));
  };draw();
  puzzleButton('Test the stream',()=>{const reached=flow();if(reached.has('QUERY')&&reached.has('POLARIS')&&!reached.has('SHADOW'))finish();else puzzleStatus(reached.has('SHADOW')?'The shadow sink is receiving data. Close its route.':'The stream needs an open path through ICEBERG and POLARIS to QUERY.');},els.dialogActions,'primary');
}
function libraryPuzzle(finish) {
  const pages=new Set();let room='foyer';
  const rooms={
    foyer:{title:'The Crossroads',text:'A sign reads: melodies in the west wing, open data in the north wing, stories in the east wing.',links:[['West · Music archive','music'],['North · Data stacks','data'],['East · Story gallery','story'],['South · Constellation door','exit']]},
    music:{title:'Music archive',text:'A guitar chord echoes behind the Studio door. The Silent Exhibit offers no sound at all.',links:[['Follow the guitar to the Studio','studio'],['Enter the Silent Exhibit','silent'],['Return to crossroads','foyer']]},
    studio:{title:'Recording Studio',text:'Acoustic songs and electronic arrangements share a melody page.',page:'Melody',links:[['Return to music archive','music']]},
    silent:{title:'Silent Exhibit',text:'The empty room holds no melody. A guitar chord still sounds beyond the door.',links:[['Return to music archive','music']]},
    data:{title:'Data stacks',text:'A note points toward the open Polaris catalog. A sealed warehouse stands beside it.',links:[['Enter the Polaris alcove','polaris'],['Inspect the sealed warehouse','warehouse'],['Return to crossroads','foyer']]},
    polaris:{title:'Polaris Alcove',text:'An open knowledge page rests beside the catalog.',page:'Open knowledge',links:[['Return to data stacks','data']]},
    warehouse:{title:'Sealed Warehouse',text:'The shelves are shut. The note said to seek the open catalog.',links:[['Return to data stacks','data']]},
    story:{title:'Story gallery',text:'A six-sided die points toward the tabletop hall. A blank stage leads elsewhere.',links:[['Follow the die to the tabletop hall','tabletop'],['Step onto the blank stage','stage'],['Return to crossroads','foyer']]},
    tabletop:{title:'Tabletop Hall',text:'D6 Storyteller holds a page about creating worlds together.',page:'Storytelling',links:[['Return to story gallery','story']]},
    stage:{title:'Blank Stage',text:'The unwritten scene asks for a storyteller. The die still points down the hall.',links:[['Return to story gallery','story']]},
    exit:{title:'Constellation door',text:'Three collected pages illuminate three locks.',links:[['Return to crossroads','foyer']]}
  };
  const visit=id=>{room=id;const r=rooms[id];if(r.page)pages.add(r.page);
    modal('Library · '+r.title,[r.text,'Journal pages: '+([...pages].join(', ')||'none')+' · '+pages.size+'/3'],[], 'Signature challenge · branching rooms');
    if(id==='exit'&&pages.size===3){puzzleButton('Open the constellation door',finish,els.dialogActions,'primary');return;}
    if(id==='exit')puzzleStatus('The door needs a page from each wing.');
    r.links.forEach(([label,next])=>puzzleButton(label,()=>visit(next),els.dialogActions));
  };visit(room);
}
function companionPuzzle(finish) {
  modal('Agentic Summit · Work together',['Guide Alex to the exit. Switch to the companion, move them onto the ✦ pressure plate, then guide Alex through the opened gate.'],[], 'Signature challenge · companion');
  const walls=new Set();['#######','#...GE#','#...#.#','#...#.#','#######'].forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='#')walls.add(x+','+y);}));
  let alex=[1,1],companion=[1,3],active='companion';const plate='3,3',gate='4,1',exit='5,1';
  const board=document.createElement('div');board.className='puzzle-grid companion-grid';els.dialogBody.append(board);
  const render=()=>{board.replaceChildren();for(let y=0;y<5;y++)for(let x=0;x<7;x++){
    const k=x+','+y,cell=document.createElement('span');cell.className='companion-cell '+(walls.has(k)?'wall':k===gate?(companion.join(',')===plate?'gate-open':'gate-closed'):k===plate?'plate':k===exit?'exit':'floor');
    if(alex[0]===x&&alex[1]===y){cell.textContent='A';cell.classList.add('actor');}else if(companion[0]===x&&companion[1]===y){cell.textContent='✹';cell.classList.add('actor');}else if(k===plate)cell.textContent='✦';else if(k===gate)cell.textContent=companion.join(',')===plate?'░':'▥';else if(k===exit)cell.textContent='◈';board.append(cell);
  }puzzleStatus((companion.join(',')===plate?'Gate open. ':'Gate closed. ')+(active==='alex'?'Moving Alex.':'Commanding companion.'));};
  const move=(dx,dy)=>{const actor=active==='alex'?alex:companion,nx=actor[0]+dx,ny=actor[1]+dy,k=nx+','+ny;
    if(nx<0||nx>6||ny<0||ny>4||walls.has(k)||k===(active==='alex'?companion:alex).join(',')||k===gate&&companion.join(',')!==plate||active==='companion'&&nx>=4)return;
    actor[0]=nx;actor[1]=ny;tone(active==='alex'?500:690,.06);render();if(alex.join(',')===exit)finish();
  };
  const toggle=puzzleButton('Commanding companion · switch to Alex',()=>{active=active==='alex'?'companion':'alex';toggle.textContent=active==='alex'?'Moving Alex · switch to companion':'Commanding companion · switch to Alex';render();},els.dialogActions,'primary');
  const pad=document.createElement('div');pad.className='puzzle-pad';els.dialogActions.append(pad);
  for(const [label,dx,dy] of [['↑',0,-1],['←',-1,0],['↓',0,1],['→',1,0]])puzzleButton(label,()=>move(dx,dy),pad);
  render();
  const key=e=>{const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.code];if(d){e.preventDefault();e.stopImmediatePropagation();move(...d);}};
  window.addEventListener('keydown',key,true);puzzleCleanup=()=>window.removeEventListener('keydown',key,true);
}
function completeShrine(i,answer) {
  state.shrines[state.chapter][i]=true;
  if(state.shards[state.chapter]>0)state.shards[state.chapter]--;
  save();updateHud();tone(950,.32,'triangle');
  effects.push({text:'SPARK RESTORED',x:positions.shrines[i][0]*TILE,y:positions.shrines[i][1]*TILE-20,until:performance.now()+1800,color:'#fff2a0'});
  modal('A Spark of Curiosity returns',[answer,state.shrines[state.chapter].every(Boolean)?'All three shrines glow. The guardian has appeared near the north end of the central path.':'Another memory awaits elsewhere in this world.'],[
    {label:'Back to the world',primary:true,run:()=>{closeModal();if(state.shrines[state.chapter].every(Boolean))spawnGuardian();}}
  ],'Chapter '+(state.chapter+1));
}
function travel(direction) {
  if(direction===1 && !state.guardians[state.chapter]) {
    modal('The gate is sealed',['Restore all three shrines and defeat the guardian to open this path.'],[{label:'Continue',run:closeModal}]);return;
  }
  if(direction===1 && state.chapter===chapters.length-1) { win(); return; }
  state.chapter+=direction;state.health=Math.max(4,state.health);save();buildZone();
  const c=chapters[state.chapter];
  modal(c.name,[c.intro,'Read memory tablets or defeat shadows to activate the shrines, then confront the guardian to continue.'],[{label:'Explore',primary:true,run:closeModal}],'Chapter '+(state.chapter+1)+' of '+chapters.length);
}
function win() {
  state.won=true;save();updateHud();tone(880,.45,'triangle');
  modal('The sparks become a constellation',[
    'The Shadow of Doubt dissolves. Hartford, the songs, the radio, the classrooms, the code, the lakehouse, the books, and the agents all shine together.',
    'Alex’s journey keeps changing, but its thread stays clear: curiosity becomes more valuable when it helps someone else learn, create, and act.',
    'You completed The Merced Odyssey. The real stories continue across the Alex Merced network.'
  ],[{label:'Return to the summit',primary:true,run:closeModal},{label:'Read Alex’s story ↗',run:()=>window.open('https://whoisalexmerced.com/','_blank','noopener')}],'Adventure complete');
}
function attack() {
  if(modalOpen || !state.started) return;
  const now=performance.now();if(now<player.attackReady)return;
  player.attackStart=now;player.attackReady=now+390;player.attackUntil=now+300;
  player.attackFacing=player.facing;player.attackTargets.clear();
  player.moving=false;tone(520,.13);
}
const attackOffsets={down:[-50,-20],left:[-82,-83],right:[-23,-83],up:[-50,-112]};
const attackDirections={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const slashMasks=new Map();
function attackPlacement(now) {
  const progress=Math.max(0,Math.min(1,(now-player.attackStart)/(player.attackUntil-player.attackStart)));
  const frame=Math.min(3,Math.floor(progress*4));
  const row={down:0,left:1,right:2,up:3}[player.attackFacing];
  const [dx,dy]=attackDirections[player.attackFacing];
  const [ox,oy]=attackOffsets[player.attackFacing];
  const lunge=Math.sin(progress*Math.PI)*6;
  return {frame,row,x:Math.round(player.x+ox+dx*lunge),y:Math.round(player.y+oy+dy*lunge)};
}
function slashMask(row,frame) {
  if(!art.slash.complete || !art.slash.naturalWidth)return null;
  const key=row*4+frame;
  if(slashMasks.has(key))return slashMasks.get(key);
  const maskCanvas=document.createElement('canvas');
  maskCanvas.width=maskCanvas.height=100;
  const maskContext=maskCanvas.getContext('2d',{willReadFrequently:true});
  const cw=art.slash.naturalWidth/4,ch=art.slash.naturalHeight/4;
  maskContext.drawImage(art.slash,frame*cw,row*ch,cw,ch,0,0,100,100);
  const pixels=maskContext.getImageData(0,0,100,100).data;
  slashMasks.set(key,pixels);
  return pixels;
}
function enemyTouchesSlash(enemy,placement) {
  const cx=enemy.x,cy=enemy.y-(enemy.boss?14:8),radius=enemy.boss?25:15;
  const [forwardX,forwardY]=attackDirections[player.attackFacing];
  const nearX=cx-player.x,nearY=cy-(player.y-12),nearDistance=Math.hypot(nearX,nearY);
  // The hand and first part of the sweep cover enemies standing very close.
  if(nearDistance<32+radius*.3 && nearX*forwardX+nearY*forwardY>nearDistance*.25)return true;
  const localX=cx-placement.x,localY=cy-placement.y;
  if(localX<-radius||localX>100+radius||localY<-radius||localY>100+radius)return false;
  const pixels=slashMask(placement.row,placement.frame);
  if(!pixels){
    const [dx,dy]=attackDirections[player.attackFacing];
    const vx=cx-player.x,vy=cy-(player.y-12),distance=Math.hypot(vx,vy);
    return distance<65+radius && vx*dx+vy*dy>distance*.35;
  }
  const minX=Math.max(0,Math.floor(localX-radius)),maxX=Math.min(99,Math.ceil(localX+radius));
  const minY=Math.max(0,Math.floor(localY-radius)),maxY=Math.min(99,Math.ceil(localY+radius));
  for(let y=minY;y<=maxY;y+=2)for(let x=minX;x<=maxX;x+=2){
    if((x-localX)**2+(y-localY)**2>radius*radius)continue;
    if(pixels[(y*100+x)*4+3]>100)return true;
  }
  return false;
}
function resolveAttackHits(now) {
  if(now>=player.attackUntil)return;
  const placement=attackPlacement(now);
  if(placement.frame<1 || placement.frame>2)return;
  const direction=attackDirections[player.attackFacing];
  for(const enemy of enemies){
    if(enemy.hp<=0 || player.attackTargets.has(enemy) || !enemyTouchesSlash(enemy,placement))continue;
    player.attackTargets.add(enemy);
    enemy.hp--;enemy.x+=direction[0]*16;enemy.y+=direction[1]*16;
    effects.push({text:enemy.boss?'✦':'·',x:enemy.x,y:enemy.y-12,until:now+500,color:'#ffe08a'});
    tone(enemy.boss?280:350,.08,'triangle');
    if(enemy.hp<=0 && !enemy.boss) {
      state.shards[state.chapter]=Math.min(3,state.shards[state.chapter]+1);
      save();updateHud();
      effects.push({text:'INSIGHT +1',x:enemy.x,y:enemy.y-22,until:now+1100,color:'#a8fff0'});
    }
    if(enemy.hp<=0 && enemy.boss){
      projectiles=[];
      state.guardians[state.chapter]=true;save();updateHud();
      modal('Guardian of '+chapters[state.chapter].name+' defeated',[
        'The shadow lifts and the east gate opens.',
        state.chapter===chapters.length-1?'One final step remains: leave the summit through the east gate.':'Travel east to continue the journey.'
      ],[{label:'Continue',primary:true,run:closeModal}],'Spark secured');
    }
  }
}
function interact(){if(modalOpen||!state.started)return;const item=nearestInteractable();if(item)item.run();}
const keyDir={ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right'};
window.addEventListener('keydown',e=>{
  if(keyDir[e.code]) {input[keyDir[e.code]]=true;if(state.started&&!modalOpen)e.preventDefault();}
  if(e.code==='Space'&&state.started){e.preventDefault();attack();}
  if(e.code==='KeyE'&&state.started){e.preventDefault();interact();}
  if(e.code==='KeyJ'){e.preventDefault();if(!modalOpen)journal();}
  if(e.code==='Escape'&&modalOpen)closeModal();
});
window.addEventListener('keyup',e=>{if(keyDir[e.code])input[keyDir[e.code]]=false;});
window.addEventListener('blur',()=>Object.keys(input).forEach(k=>input[k]=false));
document.querySelectorAll('[data-move]').forEach(b=>{
  const dir=b.dataset.move;
  b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);input[dir]=true;});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>input[dir]=false);
});
document.querySelector('#touch-attack').addEventListener('click',attack);
document.querySelector('#touch-interact').addEventListener('click',interact);

function free(x,y,r=10) {
  for (const [dx,dy] of [[-r,-r],[r,-r],[-r,r],[r,r]]) {
    const tx=Math.floor((x+dx)/TILE),ty=Math.floor((y+dy)/TILE);
    if(blocked.has(tx+','+ty))return false;
  }
  return true;
}
function hurt(amount=1) {
  const now=performance.now();if(now<player.invulnerableUntil)return;
  player.invulnerableUntil=now+1100;state.health-=amount;tone(125,.22,'sawtooth');
  effects.push({text:'-'+amount+' HEART',x:player.x,y:player.y-22,until:now+950,color:'#ff9d9d'});
  if(state.health<=0){
    state.deaths++;state.health=6;save();buildZone();
    modal('A small setback',['The shadows pushed you back to the entrance of this chapter. Your solved shrines and defeated guardians are safe. Rest at the fountain, then try again.'],[{label:'Try again',primary:true,run:closeModal}],'Keep going');
  } else {save();updateHud();}
}
const guardianMoves=[['charge'],['pulse'],['bolts'],['summon'],['charge','bolts'],['pulse','summon'],['bolts','pulse'],['charge','pulse','bolts']];
function guardianAttack(e,now) {
  if(!e.warning && now>=e.nextAttack){
    if(Math.hypot(player.x-e.x,player.y-e.y)>280)return;
    const moves=guardianMoves[state.chapter];
    const type=moves[e.attackCount++%moves.length];
    e.warning={type,until:now+850,targetX:player.x,targetY:player.y};
    effects.push({text:{charge:'CHARGE!',pulse:'PULSE!',bolts:'BOLTS!',summon:'SUMMON!'}[type],x:e.x,y:e.y-60,until:now+900,color:'#ffe0a2'});
    tone(185,.18,'sawtooth');
  }
  if(!e.warning||now<e.warning.until)return;
  const {type,targetX,targetY}=e.warning;e.warning=null;e.nextAttack=now+2300;
  if(type==='charge'){
    const angle=Math.atan2(targetY-e.y,targetX-e.x),dx=Math.cos(angle),dy=Math.sin(angle);
    for(let step=0;step<11;step++){
      if(free(e.x+dx*12,e.y+dy*12,18)){e.x+=dx*12;e.y+=dy*12;}
      if(Math.hypot(player.x-e.x,player.y-e.y)<30)hurt(2);
    }
    effects.push({text:'WHOOSH',x:e.x,y:e.y-35,until:now+500,color:'#ffbfba'});
  }else if(type==='pulse'){
    if(Math.hypot(player.x-e.x,player.y-e.y)<95)hurt(1);
    effects.push({text:'✦ PULSE ✦',x:e.x,y:e.y-35,until:now+600,color:'#f5baff'});
  }else if(type==='bolts'){
    const angle=Math.atan2(targetY-e.y,targetX-e.x);
    for(const spread of [-.3,0,.3])projectiles.push({x:e.x,y:e.y-18,vx:Math.cos(angle+spread)*2.5,vy:Math.sin(angle+spread)*2.5,until:now+2100});
  }else if(type==='summon'&&enemies.filter(shadow=>shadow.hp>0&&!shadow.boss).length<20){
    for(const side of [-1,1])enemies.push({x:e.x+side*65,y:e.y+45,hp:2,speed:.9,drift:side,lastHit:0,boss:false});
  }
}
function update(dt,now) {
  if(!state.started||modalOpen)return;
  resolveAttackHits(now);
  if(modalOpen)return;
  let dx=Number(input.right)-Number(input.left),dy=Number(input.down)-Number(input.up);
  const beforeX=player.x,beforeY=player.y;
  if((dx||dy) && now>=player.attackUntil){
    const m=Math.hypot(dx,dy);dx/=m;dy/=m;
    player.facing=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
    const speed=2.75*dt;
    if(free(player.x+dx*speed,player.y))player.x+=dx*speed;
    if(free(player.x,player.y+dy*speed))player.y+=dy*speed;
  }
  const moved=Math.hypot(player.x-beforeX,player.y-beforeY);
  player.moving=moved>.15;
  if(player.moving)player.walkDistance+=moved;
  for(const e of enemies){
    if(e.hp<=0)continue;
    if(e.boss)guardianAttack(e,now);
    const ex=player.x-e.x,ey=player.y-e.y,d=Math.hypot(ex,ey);
    if(d<130 && d>17 && (!e.boss||!e.warning)){
      const speed=e.speed*dt*(e.boss?1.25:1);
      if(free(e.x+ex/d*speed,e.y))e.x+=ex/d*speed;
      if(free(e.x,e.y+ey/d*speed))e.y+=ey/d*speed;
    } else if(!e.boss) {
      e.drift+=.012*dt;
      const nx=e.x+Math.cos(e.drift)*.18*dt,ny=e.y+Math.sin(e.drift)*.18*dt;
      if(free(nx,ny)){e.x=nx;e.y=ny;}
    }
    if(d<22 && now>e.lastHit+800){e.lastHit=now;hurt(e.boss?2:1);}
  }
  for(const bolt of projectiles){
    bolt.x+=bolt.vx*dt;bolt.y+=bolt.vy*dt;
    if(Math.hypot(player.x-bolt.x,player.y-12-bolt.y)<16){hurt(1);bolt.until=0;}
  }
  projectiles=projectiles.filter(b=>b.until>now);
  const item=nearestInteractable();
  els.prompt.textContent=item?'E / Tap Talk · '+item.label:'';
  els.prompt.classList.toggle('is-visible',!!item);
  effects=effects.filter(e=>e.until>now);
}
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
function tile(x,y,c) {
  const px=x*TILE,py=y*TILE;
  if(y===18 || x===30 || (y===7 && x>=13&&x<=47) || (y===25 && x>=13&&x<=47) || ((x===13||x===47) && y>=7&&y<=25)){
    if(!sprite(art.floor,0,2,px,py,TILE,TILE)){
      rect(px,py,TILE,TILE,c[3]);
      rect(px+3,py+4,5,3,'#ffffff1e');
      rect(px+19,py+20,6,2,c[1]);
    }
  }
}
function drawLandmarks(c,now) {
  const kinds=[[0,0],[0,3],[0,3],[1,3],[2,3],[3,3],[1,3],[3,3]];
  for(const [x,y] of [[18.5,16.5],[40.5,16.5],[30.5,4.5],[30.5,28.5]]) {
    const px=x*TILE,py=y*TILE;
    glow(px,py,19,c[2],now);
    const [col,row]=kinds[state.chapter];
    if(!sprite(art.world,col,row,px-51,py-77,102,102)){
      rect(px-12,py-20,24,30,c[4]);rect(px-8,py-16,16,23,c[2]);
    }
  }
  // Low pixel signs orient the player in the larger scrolling maps.
  for(const [x,y,arrow] of [[8.5,18.5,'↑'],[30.5,18.5,'↑ ↓'],[51.5,18.5,'↑']]) {
    const px=x*TILE,py=y*TILE;
    rect(px-2,py-5,4,20,'#5a4051');rect(px-15,py-16,30,13,'#d7ab70');
    ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillStyle='#483550';ctx.fillText(arrow,px,py-6);
  }
}
function obstacle(x,y,c) {
  const px=x*TILE,py=y*TILE;
  rect(px,py,32,32,c[4]);
  if((x%3===0 && y%2===0) || (x===0 && y%3===0) || (x===W-1 && y%3===0)){
    const col=[0,3,1,0,2,2,1,3][state.chapter];
    if(sprite(art.world,col,0,px-20,py-46,72,76))return;
  }
  if(sprite(art.terrain,2,3,px-7,py-7,46,46))return;
  rect(px+2,py+24,28,7,'#172a2f88');
  if(state.chapter===5){
    rect(px+5,py+8,22,21,c[4]);rect(px+8,py+3,16,24,'#81eaff');rect(px+12,py+1,9,20,'#d1ffff');rect(px+8,py+20,16,6,'#3287b5');
  }else if(state.chapter===4||state.chapter===7){
    rect(px+5,py+5,22,25,c[4]);rect(px+8,py+2,16,20,c[2]);rect(px+11,py+7,10,10,'#d8f8ed');rect(px+13,py+10,5,4,c[4]);
  }else{
    rect(px+12,py+18,8,12,c[4]);rect(px+5,py+11,22,14,c[4]);rect(px+9,py+4,16,20,c[1]);rect(px+14,py+1,8,17,c[2]);
  }
}
function glow(x,y,r,color,now) {
  const pulse=1+Math.sin(now/260)*.13;
  ctx.fillStyle=color;ctx.globalAlpha=.2;ctx.beginPath();ctx.arc(x,y,r*pulse,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
}
function drawSymbol(kind,x,y,color='#ffe6a4'){
  ctx.fillStyle=color;
  if(kind==='note'){rect(x+1,y-8,3,17,color);rect(x+4,y-8,9,3,color);rect(x-5,y+5,9,6,color);}
  else if(kind==='book'){rect(x-9,y-7,8,16,color);rect(x+1,y-7,8,16,color);rect(x-1,y-7,2,17,'#6d4b53');}
  else if(kind==='code'){ctx.font='bold 20px monospace';ctx.textAlign='center';ctx.fillText('<>',x,y+6);}
  else if(kind==='ice'){rect(x-3,y-11,6,22,color);rect(x-10,y-3,20,6,color);rect(x-7,y-7,14,14,color);}
  else if(kind==='radio'){rect(x-9,y-5,18,15,color);rect(x-5,y-10,2,6,color);rect(x+2,y+1,4,4,'#4d4358');}
  else {rect(x-2,y-12,4,24,color);rect(x-12,y-2,24,4,color);rect(x-7,y-7,14,14,color);}
}
function drawShrine(pos,i,now) {
  const x=pos[0]*TILE,y=pos[1]*TILE,done=state.shrines[state.chapter][i];
  glow(x,y,done?21:17,done?'#a8fff0':'#fff0a5',now);
  if(sprite(art.world,done?2:1,1,x-39,y-58,78,78))return;
  rect(x-15,y+4,30,8,'#4d4d69');rect(x-12,y-8,24,15,done?'#7ed5c5':'#e1bd7a');rect(x-7,y-16,14,9,'#fff1bc');
  drawSymbol(chapters[state.chapter].symbol,x,y-1,done?'#327d7c':'#715071');
}
function drawNote(pos,i,now){
  const x=pos[0]*TILE,y=pos[1]*TILE;
  glow(x,y,13,'#c7c2ff',now);
  if(sprite(art.world,0,1,x-29,y-42,58,59))return;
  rect(x-10,y-12,20,24,'#4a4b6c');rect(x-7,y-9,14,18,'#eee0b9');rect(x-4,y-5,8,2,'#8c73a0');rect(x-4,y,8,2,'#8c73a0');
  if(state.notes[state.chapter][i])rect(x-3,y+5,6,2,'#43a99b');
}
function drawGate(pos,open,back,now){
  const x=pos[0]*TILE,y=pos[1]*TILE;
  glow(x,y,open?19:11,open?'#99e3ff':'#ff8282',now);
  if(sprite(art.world,open?1:0,2,x-40,y-61,80,83))return;
  rect(x-12,y-19,7,37,'#454c6d');rect(x+6,y-19,7,37,'#454c6d');rect(x-12,y-19,25,6,'#bfc3d0');
  rect(x-5,y-12,11,26,open?'#83dcea':'#b65e6a');
  rect(x-1,y-7,3,14,open?'#d9ffec':'#5e334d');
  if(back)rect(x-4,y+17,8,3,'#ffd195');
}
function drawPlayer(now){
  const x=Math.round(player.x),y=Math.round(player.y),blink=now<player.invulnerableUntil && Math.floor(now/90)%2===0;
  if(blink)glow(x,y-18,26,'#ff9ca8',now);
  const attacking=now<player.attackUntil;
  const facing=attacking?player.attackFacing:player.facing;
  const row={down:0,left:1,right:2,up:3}[facing];
  const phase=attacking?(now-player.attackStart)/(player.attackUntil-player.attackStart):0;
  const frame=attacking?(phase<.28?1:3):(player.moving?1+Math.floor(player.walkDistance/16)%3:0);
  const lunge=attacking?Math.sin(phase*Math.PI)*6:0;
  const [lx,ly]={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[facing];
  ctx.fillStyle='#101b2b77';
  ctx.beginPath();ctx.ellipse(x+lx*lunge,y+14+ly*lunge,19,5,0,0,Math.PI*2);ctx.fill();
  if(walkSprite(frame,row,x+lx*lunge,y+15+ly*lunge))return;
  if(heroSprite(x-27,y-66,54,80))return;
  rect(x-7,y+6,6,8,'#d9cfbb');rect(x+1,y+6,6,8,'#d9cfbb');
  rect(x-9,y-8,18,17,'#9ec0df');rect(x-4,y-6,8,13,'#f8f6e9');
  rect(x-11,y-5,4,12,'#9ec0df');rect(x+7,y-5,4,12,'#9ec0df');
  rect(x-7,y-19,14,13,'#c98756');rect(x-8,y-21,16,6,'#201b20');
  if(player.facing!=='up'){rect(x-5,y-12,11,3,'#1c2434');rect(x-3,y-11,2,2,'#e8f5ff');rect(x+3,y-11,2,2,'#e8f5ff');rect(x-3,y-5,7,2,'#36251f');}
}
function drawAttack(now){
  if(now>=player.attackUntil)return;
  const {frame,row,x,y}=attackPlacement(now);
  if(sprite(art.slash,frame,row,x,y,100,100))return;
  // The generated effect remains optional while its image is loading.
  const angle={down:Math.PI/2,left:Math.PI,right:0,up:-Math.PI/2}[player.attackFacing];
  const progress=(now-player.attackStart)/(player.attackUntil-player.attackStart);
  const centerX=player.x+Math.cos(angle)*32,centerY=player.y-15+Math.sin(angle)*32;
  ctx.save();
  ctx.globalAlpha=1-((now-player.attackStart)/(player.attackUntil-player.attackStart))*.45;
  ctx.strokeStyle='#68e9f4';ctx.lineWidth=11;ctx.lineCap='round';
  ctx.beginPath();ctx.arc(centerX,centerY,30,angle-1.1+progress*.5,angle+.3+progress*.5);ctx.stroke();
  ctx.strokeStyle='#fff4c3';ctx.lineWidth=4;ctx.stroke();
  ctx.restore();
}
function drawEnemy(e,now){
  if(e.hp<=0)return;
  const x=Math.round(e.x),y=Math.round(e.y),size=e.boss?19:11;
  if(e.boss&&e.warning){
    ctx.save();ctx.strokeStyle='#ffb1a8';ctx.lineWidth=3;ctx.setLineDash([7,5]);
    if(e.warning.type==='charge'){ctx.beginPath();ctx.moveTo(x,y-12);ctx.lineTo(e.warning.targetX,e.warning.targetY);ctx.stroke();}
    else if(e.warning.type==='pulse'){ctx.beginPath();ctx.arc(x,y,95,0,Math.PI*2);ctx.stroke();}
    else {ctx.beginPath();ctx.arc(x,y,38,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
  glow(x,y,size+5,e.boss?'#e976af':'#a691d1',now);
  if(sprite(art.terrain,e.boss?2:0,0,x-(e.boss?43:24),y-(e.boss?57:32),e.boss?86:48,e.boss?86:48)){
    if(e.boss){rect(x-20,y-48,40,5,'#25253e');rect(x-20,y-48,40*(e.hp/12),5,'#ff8d9b');}
    return;
  }
  rect(x-size/2,y-size/2,size,size,e.boss?'#423454':'#343454');
  rect(x-size/2+3,y-size/2+4,4,4,'#ffb3ad');rect(x+size/2-7,y-size/2+4,4,4,'#ffb3ad');
  rect(x-size/2+2,y+size/2-1,size-4,4,'#202444');
  if(e.boss){rect(x-11,y-18,5,8,'#eab5d4');rect(x+6,y-18,5,8,'#eab5d4');rect(x-14,y-29,28,5,'#25253e');rect(x-14,y-29,28*(e.hp/12),5,'#ff8d9b');}
}
function render(now){
  const c=chapters[state.chapter].palette;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cameraX=Math.max(0,Math.min(W*TILE-canvas.width,Math.round(player.x-canvas.width/2)));
  const cameraY=Math.max(0,Math.min(H*TILE-canvas.height,Math.round(player.y-canvas.height/2)));
  ctx.save();ctx.translate(-cameraX,-cameraY);
  const firstX=Math.max(0,Math.floor(cameraX/TILE)),lastX=Math.min(W,Math.ceil((cameraX+canvas.width)/TILE));
  const firstY=Math.max(0,Math.floor(cameraY/TILE)),lastY=Math.min(H,Math.ceil((cameraY+canvas.height)/TILE));
  rect(cameraX,cameraY,canvas.width,canvas.height,c[0]);
  const ground=[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1]][state.chapter];
  for(let y=Math.floor(firstY/4)*4;y<lastY;y+=4)for(let x=Math.floor(firstX/4)*4;x<lastX;x+=4){
    sprite(art.floor,ground[0],ground[1],x*TILE,y*TILE,128,128);
    if((x*3+y+state.chapter)%7===0)sprite(art.terrain,1,3,x*TILE+28,y*TILE+38,62,62);
  }
  for(let y=firstY;y<lastY;y++)for(let x=firstX;x<lastX;x++)tile(x,y,c);
  for(const key of blocked){const [x,y]=key.split(',').map(Number);if(x>=firstX&&x<=lastX&&y>=firstY&&y<=lastY)obstacle(x,y,c);}
  drawLandmarks(c,now);
  positions.notes.forEach((p,i)=>drawNote(p,i,now));
  positions.shrines.forEach((p,i)=>drawShrine(p,i,now));
  drawGate(positions.gateBack,state.chapter>0,true,now);
  drawGate(positions.gateNext,state.guardians[state.chapter],false,now);
  const guide=positions.guide;glow(guide[0]*TILE,guide[1]*TILE,17,'#fff6bf',now);
  if(!sprite(art.world,2,2,guide[0]*TILE-28,guide[1]*TILE-48,56,63)){
    rect(guide[0]*TILE-8,guide[1]*TILE-12,16,19,'#f1b776');
    rect(guide[0]*TILE-8,guide[1]*TILE-20,16,9,'#514257');
    rect(guide[0]*TILE-10,guide[1]*TILE+4,20,9,'#685d8b');
  }
  const f=positions.fountain;glow(f[0]*TILE,f[1]*TILE,20,'#79ecf1',now);
  if(!sprite(art.world,3,1,f[0]*TILE-37,f[1]*TILE-46,74,69)){
    rect(f[0]*TILE-14,f[1]*TILE+2,28,10,'#495b79');rect(f[0]*TILE-10,f[1]*TILE-4,20,10,'#72e1e8');rect(f[0]*TILE-2,f[1]*TILE-15,4,15,'#d7ffff');
  }
  for(const e of enemies)drawEnemy(e,now);
  for(const bolt of projectiles){glow(bolt.x,bolt.y,12,'#ffb1d9',now);rect(bolt.x-5,bolt.y-5,10,10,'#fff0b2');rect(bolt.x-2,bolt.y-2,4,4,'#a35baf');}
  if(player.attackFacing==='up')drawAttack(now);
  drawPlayer(now);
  if(player.attackFacing!=='up')drawAttack(now);
  ctx.font='bold 14px monospace';ctx.textAlign='center';
  for(const e of effects){ctx.fillStyle=e.color;ctx.fillText(e.text,e.x,e.y-(e.until-now)/140);}
  ctx.restore();
  drawMiniMap();
  if(!state.started){ctx.fillStyle='#0d1334bb';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff2ca';ctx.font='bold '+(canvas.width<600?15:25)+'px monospace';ctx.fillText('PRESS BEGIN ADVENTURE',canvas.width/2,canvas.height/2);}
}
function drawMiniMap() {
  const x=canvas.width-149,y=12,w=137,h=81;
  ctx.fillStyle='#10172ddd';ctx.fillRect(x-4,y-4,w+8,h+8);
  ctx.strokeStyle='#ffdf9d';ctx.lineWidth=2;ctx.strokeRect(x-4,y-4,w+8,h+8);
  ctx.fillStyle='#456a63';ctx.fillRect(x,y,w,h);
  const mark=(wx,wy,color,size=4)=>{
    ctx.fillStyle=color;ctx.fillRect(x+wx/(W*TILE)*w-size/2,y+wy/(H*TILE)*h-size/2,size,size);
  };
  positions.shrines.forEach((p,i)=>mark(p[0]*TILE,p[1]*TILE,state.shrines[state.chapter][i]?'#82e7c9':'#ffdc84',5));
  mark(positions.gateNext[0]*TILE,positions.gateNext[1]*TILE,state.guardians[state.chapter]?'#a3f4ff':'#ff918d',5);
  mark(player.x,player.y,'#ffffff',5);
  ctx.fillStyle='#fff9de';ctx.font='bold 10px monospace';ctx.textAlign='right';ctx.fillText('MAP',x+w-4,y+h-5);
}
function frame(now){const dt=Math.min((now-last)/16.67,2);last=now;update(dt,now);render(now);requestAnimationFrame(frame);}
buildZone();requestAnimationFrame(frame);
