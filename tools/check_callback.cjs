const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync('assets/site.js','utf8');

async function check({ok=true,valid=true,bot='',storageBlocked=false}={}) {
  let submit, request;
  const fields = {source:{value:'direct'},medium:{value:'website'},campaign:{value:'intro-and-training'},'landing-page':{value:'website'},mode:{value:'Hyderabad',options:[{value:'Online'},{value:'Hyderabad'}]}};
  const button = {disabled:false}; const status = {textContent:''};
  const form = {elements:{namedItem:name=>fields[name]},reportValidity:()=>valid,querySelector:()=>button,addEventListener:(key,fn)=>submit=fn};
  const window = {location:{search:'?utm_source=parent_referral&utm_medium=whatsapp&utm_campaign=oct2026_intro&mode=Online',pathname:'/free-abacus-session.html'},matchMedia:()=>({addEventListener:()=>{}})};
  const document = {querySelector:s=>s==='#callback-form'?form:s==='#callback-status'?status:null,addEventListener:()=>{}};
  const sessionStorage = {getItem:()=>{if(storageBlocked)throw Error('Blocked');return null;},setItem:()=>{if(storageBlocked)throw Error('Blocked');}};
  class FormData {
    *[Symbol.iterator]() {
      yield ['form-name','academy-callback']; yield ['name','TEST Parent & Learner']; yield ['phone','9866219903'];
      yield ['interest','Child classes']; yield ['consent','Yes - contact me about this enquiry']; yield ['bot-field',bot];
      for(const [key,field] of Object.entries(fields)) yield [key,field.value];
    }
  }
  vm.runInNewContext(code,{window,document,sessionStorage,URLSearchParams,FormData,encodeURIComponent,fetch:async(url,options)=>{request={url,...options};return {ok};}});
  assert.equal(fields.source.value,'parent_referral'); assert.equal(fields.mode.value,'Online');
  await submit({preventDefault:()=>{}});
  if (!valid || bot) {assert.equal(request,undefined); return;}
  assert.equal(request.url,'/'); assert.equal(request.method,'POST');
  const body = new URLSearchParams(request.body);
  assert.equal(body.get('form-name'),'academy-callback'); assert.equal(body.get('phone'),'9866219903');
  assert.equal(body.get('landing-page'),'/free-abacus-session.html'); assert.equal(body.get('source'),'parent_referral');
  assert.equal(body.get('name'),'TEST Parent & Learner'); assert.equal(button.disabled,false);
  if (ok) assert.equal(window.location.href,'/enquiry-received.html');
  else {assert.equal(window.location.href,undefined); assert.ok(status.textContent.includes('could not be saved'));}
}
(async()=>{await check();await check({ok:false});await check({valid:false});await check({bot:'spam'});await check({storageBlocked:true});console.log('PASS: callback success/failure, invalid form, honeypot, attribution and blocked storage.');})().catch(error=>{console.error(error);process.exitCode=1;});
