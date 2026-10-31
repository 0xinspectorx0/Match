// Kullanım: node tools/sim.js [speed] [saniye]  — index.html'i DOM-stub ile koşturur
const fs=require('fs');const SPEED=+(process.argv[2]||1),SECS=+(process.argv[3]||62);
let html=fs.readFileSync(__dirname+'/../index.html','utf8');
let js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].pop()[1];
js=js.replace(/speed:1,/,'speed:'+SPEED+',').replace('const impact=-vrel,px','window.__hits=(window.__hits||0)+1;window.__pmax=Math.max(window.__pmax||0,-vrel);const impact=-vrel,px');
const ctxP=new Proxy({},{get(t,k){if(k in t)return t[k];if(k==='createLinearGradient'||k==='createRadialGradient'||k==='createPattern')return()=>({addColorStop(){}});if(k==='measureText')return()=>({width:10});if(k==='getImageData')return()=>({data:new Uint8ClampedArray(4)});return function(){};},set(t,k,v){t[k]=v;return true;}});
const els={};
function mkEl(id){const st=new Proxy({removeProperty(){},setProperty(){}},{get(t,k){return k in t?t[k]:'';},set(t,k,v){t[k]=v;return true;}});
 const e={id,style:st,dataset:{},children:[],value:'',checked:false,textContent:'',innerHTML:'',width:800,height:1422,
 classList:{_s:new Set(),add(...c){c.forEach(x=>this._s.add(x))},remove(...c){c.forEach(x=>this._s.delete(x))},toggle(c,f){(f??!this._s.has(c))?this._s.add(c):this._s.delete(c)},contains(c){return this._s.has(c)}},
 addEventListener(){},removeEventListener(){},appendChild(c){return c},append(){},remove(){},insertAdjacentHTML(){},setAttribute(){},getAttribute(){return null},focus(){},click(){},
 getContext(){return ctxP},querySelector(){return mkEl('q')},querySelectorAll(){return []},closest(){return null},getBoundingClientRect(){return{left:0,top:0,width:400,height:711}}};return e;}
global.window=global;global.document={getElementById:id=>els[id]||(els[id]=mkEl(id)),querySelector:s=>els[s]||(els[s]=mkEl(s)),querySelectorAll:()=>[],createElement:t=>mkEl(t),addEventListener(){},body:mkEl('body'),documentElement:mkEl('html'),fonts:{ready:Promise.resolve()}};
global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};global.devicePixelRatio=2;global.addEventListener=()=>{};global.matchMedia=()=>({matches:false,addEventListener(){}});
global.Image=function(){return mkEl('img')};global.performance={now:()=>T*1000};
let T=0,cbs=[];global.requestAnimationFrame=f=>cbs.push(f);
const log=[];eval(js);
let lastStatus='';
for(let i=0;i<60*SECS;i++){T+=1/60;const c=cbs;cbs=[];c.forEach(f=>f(T*1000));const st=(els.status||{}).textContent;if(st&&st!==lastStatus){lastStatus=st;if(/GOL|VAR|KART|DİREK|PENALTI|FAUL|BİTTİ|KAZANAN|BERABERE/.test(st))log.push('t='+T.toFixed(1)+' '+st);}}
console.log(log.slice(-8).join('\n'));
let sc='?';try{sc=eval('scores').join('-')}catch(e){}console.log('FINAL: '+lastStatus+' skor='+sc+' | carpisma='+(window.__hits||0)+' maxDarbe='+(window.__pmax||0).toFixed(0));
