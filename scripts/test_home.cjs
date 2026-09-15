const fs = require("fs"), vm = require("vm"), assert = require("assert");
const source = fs.readFileSync(__dirname + "/../docs/javascripts/home.js", "utf8");
let now = 0, id = 0;
const timers = new Map();
function element() {
  return { textContent: "", listeners: {}, style: {}, classList: {add(){},remove(){}},
    setAttribute(k,v){this[k]=v}, addEventListener(k,f){const previous=this.listeners[k];this.listeners[k]=(...args)=>{previous?.(...args);f(...args)}} };
}
const text = element(), next = element(), doc = element(), win = element();
Object.assign(doc, {hidden:false,readyState:"complete",body:element(),documentElement:element(),
  querySelector(s){return {".home-shell":element(),".home-rotating-text":text,".home-phrase-next":next}[s] || null;}});
Object.assign(win, {innerWidth:1100,innerHeight:800,matchMedia(){return {matches:true,addEventListener(){}}},
  requestAnimationFrame(){return 1},cancelAnimationFrame(){},
  setTimeout(f,ms){timers.set(++id,{f,ms});return id}, clearTimeout(i){timers.delete(i)}});
vm.runInNewContext(source, {document:doc,window:win,performance:{now:()=>now},Math,Array});
const phrases=JSON.parse(source.match(/const phrases = (\[[\s\S]*?\]);/)[1].replace(/,\s*]/,"]"));
assert.equal(timers.size,1);
for(let round=0;round<5;round++){
  const seen=new Set();
  for(let i=0;i<phrases.length;i++){
    assert(!seen.has(text.textContent),"repeated before cycle ended");
    seen.add(text.textContent);
    assert.equal([...timers.values()][0].ms,2500+Array.from(text.textContent).length*70);
    const previous=text.textContent;
    next.listeners.click();
    assert.notEqual(text.textContent,previous);
    assert.equal(timers.size,1);
  }
}
text.listeners.click(); assert.equal(timers.size,0);
text.listeners.click(); assert.equal(timers.size,1);
doc.hidden=true; doc.listeners.visibilitychange(); assert.equal(timers.size,0);
doc.hidden=false; doc.listeners.visibilitychange(); assert.equal(timers.size,1);
text.listeners.pointerenter({pointerType:"mouse"});assert.equal(timers.size,0);
text.listeners.pointerleave();assert.equal(timers.size,1);
console.log("PASS: "+phrases.length+" original phrases; five random cycles, boundary, duration, pause, visibility and hover");
