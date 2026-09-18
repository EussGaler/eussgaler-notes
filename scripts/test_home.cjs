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

assert.equal(new Set(phrases).size, phrases.length, "duplicate phrase text in source");
function boot(storage, animated) {
  let clock=0, sequence=0;
  const pending=new Map(), text=element(), next=element(), doc=element(), win=element();
  Object.assign(doc,{hidden:false,readyState:"complete",body:element(),documentElement:element(),
    querySelector(s){return {".home-shell":element(),".home-rotating-text":text,".home-phrase-next":next}[s]||null;}});
  Object.assign(win,{innerWidth:1100,innerHeight:800,sessionStorage:storage,
    matchMedia(){return {matches:!animated,addEventListener(){}}},
    requestAnimationFrame(){return 1},cancelAnimationFrame(){},
    setTimeout(f,ms){pending.set(++sequence,{f,ms});return sequence},clearTimeout(i){pending.delete(i)}});
  vm.runInNewContext(source,{document:doc,window:win,performance:{now:()=>clock},Math,Array,Set,JSON,Number});
  const fire=()=>{assert.equal(pending.size,1);const [id,t]=pending.entries().next().value;pending.delete(id);clock+=t.ms;t.f();};
  return {text,next,doc,win,pending,fire};
}
for (const animated of [false,true]) {
  const saved=new Map();
  const storage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)};
  let app=boot(storage,animated), previous=null;
  for(let round=0;round<10;round++){
    const seen=new Set();
    for(let i=0;i<phrases.length;i++){
      const current=app.text.textContent;
      assert(!seen.has(current),"visible phrase repeated before round completion");
      assert.notEqual(current,previous,"round boundary repeated");
      seen.add(current);previous=current;
      if(i%7===0){
        app=boot(storage,animated);
        assert.equal(app.text.textContent,current,"reload did not resume current phrase");
      }
      if(i%2===0) app.fire(); // Automatic transition, same queue as the button.
      else app.next.listeners.click();
      if(animated){
        for(let n=0;n<15;n++) app.next.listeners.click();
        assert.equal(app.text.textContent,current,"fade should not consume entries early");
        app.fire();
      }
    }
    assert.equal(seen.size,phrases.length,"round omitted phrases");
  }
  if(animated){
    const current=app.text.textContent;
    app.next.listeners.click(); // Cancel a pending fade by leaving the page.
    app.win.listeners.pagehide();
    assert.equal(app.pending.size,0);
    app.win.listeners.pageshow({persisted:true});
    assert.equal(app.text.textContent,current);
    app.next.listeners.click();app.fire();
    assert.notEqual(app.text.textContent,current);
    app.win.listeners.pagehide(); // Must also clean up on the second BFCache visit.
    assert.equal(app.pending.size,0);
  }
  const key=[...saved.keys()][0];
  for(const bad of ["not JSON",JSON.stringify({signature:"old list",current:0,queue:[1]}),
    JSON.stringify({signature:JSON.stringify(phrases),current:0,queue:[1,1]})]){
    saved.set(key,bad);
    assert(phrases.includes(boot(storage,animated).text.textContent),"invalid state failed recovery");
  }
}
const blocked={getItem(){throw Error("blocked")},setItem(){throw Error("blocked")}};
assert(phrases.includes(boot(blocked,true).text.textContent));
console.log("PASS: animated/reduced-motion, 10 complete rounds each, rapid clicks, auto/manual mixing, reload continuity, repeated BFCache, invalid/blocked storage");
