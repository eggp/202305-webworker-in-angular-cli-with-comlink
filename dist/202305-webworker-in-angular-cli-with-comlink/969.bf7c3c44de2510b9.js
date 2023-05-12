(()=>{"use strict";const H=Symbol("Comlink.proxy"),Q=Symbol("Comlink.endpoint"),Z=Symbol("Comlink.releaseProxy"),I=Symbol("Comlink.finalizer"),_=Symbol("Comlink.thrown"),U=t=>"object"==typeof t&&null!==t||"function"==typeof t,N=new Map([["proxy",{canHandle:t=>U(t)&&t[H],serialize(t){const{port1:e,port2:r}=new MessageChannel;return C(t,e),[r,[r]]},deserialize:t=>(t.start(),function se(t,e){return M(t,[],e)}(t))}],["throw",{canHandle:t=>U(t)&&_ in t,serialize({value:t}){let e;return e=t instanceof Error?{isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:{isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}}]]);function C(t,e=globalThis,r=["*"]){e.addEventListener("message",function n(s){if(!s||!s.data)return;if(!function re(t,e){for(const r of t)if(e===r||"*"===r||r instanceof RegExp&&r.test(e))return!0;return!1}(r,s.origin))return void console.warn(`Invalid origin '${s.origin}' for comlink proxy`);const{id:i,type:o,path:c}=Object.assign({path:[]},s.data),u=(s.data.argumentList||[]).map(b);let a;try{const l=c.slice(0,-1).reduce((f,w)=>f[w],t),p=c.reduce((f,w)=>f[w],t);switch(o){case"GET":a=p;break;case"SET":l[c.slice(-1)[0]]=b(s.data.value),a=!0;break;case"APPLY":a=p.apply(l,u);break;case"CONSTRUCT":a=function ue(t){return Object.assign(t,{[H]:!0})}(new p(...u));break;case"ENDPOINT":{const{port1:f,port2:w}=new MessageChannel;C(t,w),a=function ae(t,e){return Y.set(t,e),t}(f,[f])}break;case"RELEASE":a=void 0;break;default:return}}catch(l){a={value:l,[_]:0}}Promise.resolve(a).catch(l=>({value:l,[_]:0})).then(l=>{const[p,f]=A(l);e.postMessage(Object.assign(Object.assign({},p),{id:i}),f),"RELEASE"===o&&(e.removeEventListener("message",n),V(e),I in t&&"function"==typeof t[I]&&t[I]())}).catch(l=>{const[p,f]=A({value:new TypeError("Unserializable return value"),[_]:0});e.postMessage(Object.assign(Object.assign({},p),{id:i}),f)})}),e.start&&e.start()}function V(t){(function ne(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function S(t){if(t)throw new Error("Proxy has been released and is not useable")}function j(t){return y(t,{type:"RELEASE"}).then(()=>{V(t)})}const P=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(t=>{const e=(P.get(t)||0)-1;P.set(t,e),0===e&&j(t)});function M(t,e=[],r=function(){}){let n=!1;const s=new Proxy(r,{get(i,o){if(S(n),o===Z)return()=>{(function oe(t){x&&x.unregister(t)})(s),j(t),n=!0};if("then"===o){if(0===e.length)return{then:()=>s};const c=y(t,{type:"GET",path:e.map(u=>u.toString())}).then(b);return c.then.bind(c)}return M(t,[...e,o])},set(i,o,c){S(n);const[u,a]=A(c);return y(t,{type:"SET",path:[...e,o].map(l=>l.toString()),value:u},a).then(b)},apply(i,o,c){S(n);const u=e[e.length-1];if(u===Q)return y(t,{type:"ENDPOINT"}).then(b);if("bind"===u)return M(t,e.slice(0,-1));const[a,l]=W(c);return y(t,{type:"APPLY",path:e.map(p=>p.toString()),argumentList:a},l).then(b)},construct(i,o){S(n);const[c,u]=W(o);return y(t,{type:"CONSTRUCT",path:e.map(a=>a.toString()),argumentList:c},u).then(b)}});return function ie(t,e){const r=(P.get(e)||0)+1;P.set(e,r),x&&x.register(t,e,t)}(s,t),s}function ce(t){return Array.prototype.concat.apply([],t)}function W(t){const e=t.map(A);return[e.map(r=>r[0]),ce(e.map(r=>r[1]))]}const Y=new WeakMap;function A(t){for(const[e,r]of N)if(r.canHandle(t)){const[n,s]=r.serialize(t);return[{type:"HANDLER",name:e,value:n},s]}return[{type:"RAW",value:t},Y.get(t)||[]]}function b(t){switch(t.type){case"HANDLER":return N.get(t.name).deserialize(t.value);case"RAW":return t.value}}function y(t,e,r){return new Promise(n=>{const s=function le(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}();t.addEventListener("message",function i(o){!o.data||!o.data.id||o.data.id!==s||(t.removeEventListener("message",i),n(o.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:s},e),r)})}function h(t){return"function"==typeof t}const R=function fe(t){const r=t(n=>{Error.call(n),n.stack=(new Error).stack});return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r}(t=>function(r){t(this),this.message=r?`${r.length} errors occurred during unsubscription:\n${r.map((n,s)=>`${s+1}) ${n.toString()}`).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=r});function L(t,e){if(t){const r=t.indexOf(e);0<=r&&t.splice(r,1)}}class d{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;const{_parentage:r}=this;if(r)if(this._parentage=null,Array.isArray(r))for(const i of r)i.remove(this);else r.remove(this);const{initialTeardown:n}=this;if(h(n))try{n()}catch(i){e=i instanceof R?i.errors:[i]}const{_finalizers:s}=this;if(s){this._finalizers=null;for(const i of s)try{q(i)}catch(o){e=e??[],o instanceof R?e=[...e,...o.errors]:e.push(o)}}if(e)throw new R(e)}}add(e){var r;if(e&&e!==this)if(this.closed)q(e);else{if(e instanceof d){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(r=this._finalizers)&&void 0!==r?r:[]).push(e)}}_hasParent(e){const{_parentage:r}=this;return r===e||Array.isArray(r)&&r.includes(e)}_addParent(e){const{_parentage:r}=this;this._parentage=Array.isArray(r)?(r.push(e),r):r?[r,e]:e}_removeParent(e){const{_parentage:r}=this;r===e?this._parentage=null:Array.isArray(r)&&L(r,e)}remove(e){const{_finalizers:r}=this;r&&L(r,e),e instanceof d&&e._removeParent(this)}}function $(t){return t instanceof d||t&&"closed"in t&&h(t.remove)&&h(t.add)&&h(t.unsubscribe)}function q(t){h(t)?t():t.unsubscribe()}d.EMPTY=(()=>{const t=new d;return t.closed=!0,t})();const g={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},T={setTimeout(t,e,...r){const{delegate:n}=T;return n?.setTimeout?n.setTimeout(t,e,...r):setTimeout(t,e,...r)},clearTimeout(t){const{delegate:e}=T;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function G(){}const de=F("C",void 0,void 0);function F(t,e,r){return{kind:t,value:e,error:r}}let m=null;class B extends d{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,$(e)&&e.add(this)):this.destination=_e}static create(e,r,n){return new O(e,r,n)}next(e){this.isStopped?D(function be(t){return F("N",t,void 0)}(e),this):this._next(e)}error(e){this.isStopped?D(function pe(t){return F("E",void 0,t)}(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?D(de,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}}const ye=Function.prototype.bind;function z(t,e){return ye.call(t,e)}class Ee{constructor(e){this.partialObserver=e}next(e){const{partialObserver:r}=this;if(r.next)try{r.next(e)}catch(n){v(n)}}error(e){const{partialObserver:r}=this;if(r.error)try{r.error(e)}catch(n){v(n)}else v(e)}complete(){const{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(r){v(r)}}}class O extends B{constructor(e,r,n){let s;if(super(),h(e)||!e)s={next:e??void 0,error:r??void 0,complete:n??void 0};else{let i;this&&g.useDeprecatedNextContext?(i=Object.create(e),i.unsubscribe=()=>this.unsubscribe(),s={next:e.next&&z(e.next,i),error:e.error&&z(e.error,i),complete:e.complete&&z(e.complete,i)}):s=e}this.destination=new Ee(s)}}function v(t){g.useDeprecatedSynchronousErrorHandling?function me(t){g.useDeprecatedSynchronousErrorHandling&&m&&(m.errorThrown=!0,m.error=t)}(t):function he(t){T.setTimeout(()=>{const{onUnhandledError:e}=g;if(!e)throw t;e(t)})}(t)}function D(t,e){const{onStoppedNotification:r}=g;r&&T.setTimeout(()=>r(t,e))}const _e={closed:!0,next:G,error:function we(t){throw t},complete:G},Se="function"==typeof Symbol&&Symbol.observable||"@@observable";function Pe(t){return t}let xe=(()=>{class t{constructor(r){r&&(this._subscribe=r)}lift(r){const n=new t;return n.source=this,n.operator=r,n}subscribe(r,n,s){const i=function Te(t){return t&&t instanceof B||function Ae(t){return t&&h(t.next)&&h(t.error)&&h(t.complete)}(t)&&$(t)}(r)?r:new O(r,n,s);return function ge(t){if(g.useDeprecatedSynchronousErrorHandling){const e=!m;if(e&&(m={errorThrown:!1,error:null}),t(),e){const{errorThrown:r,error:n}=m;if(m=null,r)throw n}}else t()}(()=>{const{operator:o,source:c}=this;i.add(o?o.call(i,c):c?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(r){try{return this._subscribe(r)}catch(n){r.error(n)}}forEach(r,n){return new(n=X(n))((s,i)=>{const o=new O({next:c=>{try{r(c)}catch(u){i(u),o.unsubscribe()}},error:i,complete:s});this.subscribe(o)})}_subscribe(r){var n;return null===(n=this.source)||void 0===n?void 0:n.subscribe(r)}[Se](){return this}pipe(...r){return function K(t){return 0===t.length?Pe:1===t.length?t[0]:function(r){return t.reduce((n,s)=>s(n),r)}}(r)(this)}toPromise(r){return new(r=X(r))((n,s)=>{let i;this.subscribe(o=>i=o,o=>s(o),()=>n(i))})}}return t.create=e=>new t(e),t})();function X(t){var e;return null!==(e=t??g.Promise)&&void 0!==e?e:Promise}class ve extends d{constructor(e,r){super()}schedule(e,r=0){return this}}const k={setInterval(t,e,...r){const{delegate:n}=k;return n?.setInterval?n.setInterval(t,e,...r):setInterval(t,e,...r)},clearInterval(t){const{delegate:e}=k;return(e?.clearInterval||clearInterval)(t)},delegate:void 0},J={now:()=>(J.delegate||Date).now(),delegate:void 0};class E{constructor(e,r=E.now){this.schedulerActionCtor=e,this.now=r}schedule(e,r=0,n){return new this.schedulerActionCtor(this,e).schedule(n,r)}}E.now=J.now;const Ce=new class Ie extends E{constructor(e,r=E.now){super(e,r),this.actions=[],this._active=!1}flush(e){const{actions:r}=this;if(this._active)return void r.push(e);let n;this._active=!0;do{if(n=e.execute(e.state,e.delay))break}while(e=r.shift());if(this._active=!1,n){for(;e=r.shift();)e.unsubscribe();throw n}}}(class ke extends ve{constructor(e,r){super(e,r),this.scheduler=e,this.work=r,this.pending=!1}schedule(e,r=0){var n;if(this.closed)return this;this.state=e;const s=this.id,i=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(i,s,r)),this.pending=!0,this.delay=r,this.id=null!==(n=this.id)&&void 0!==n?n:this.requestAsyncId(i,this.id,r),this}requestAsyncId(e,r,n=0){return k.setInterval(e.flush.bind(e,this),n)}recycleAsyncId(e,r,n=0){if(null!=n&&this.delay===n&&!1===this.pending)return r;null!=r&&k.clearInterval(r)}execute(e,r){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const n=this._execute(e,r);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,r){let s,n=!1;try{this.work(e)}catch(i){n=!0,s=i||new Error("Scheduled action threw falsy error")}if(n)return this.unsubscribe(),s}unsubscribe(){if(!this.closed){const{id:e,scheduler:r}=this,{actions:n}=r;this.work=this.state=this.scheduler=null,this.pending=!1,L(n,this),null!=e&&(this.id=this.recycleAsyncId(r,e,null)),this.delay=null,super.unsubscribe()}}});C(class Fe{constructor(e,r){this._paramString=e,this._paramFn=r}get paramString(){return this._paramString}set paramString(e){console.log("[ComlinkWorker]","call setParamString: ",e),this._paramString=e}get paramFn(){return this._paramFn}set paramFn(e){this._paramFn=e}callParamFn(){this._paramFn("call")}doSomething(e){return 5*e}withCallback(e){(function Le(t=0,e,r=Ce){let n=-1;return null!=e&&(function Me(t){return t&&h(t.schedule)}(e)?r=e:n=e),new xe(s=>{let i=function Re(t){return t instanceof Date&&!isNaN(t)}(t)?+t-r.now():t;i<0&&(i=0);let o=0;return r.schedule(function(){s.closed||(s.next(o++),0<=n?this.schedule(void 0,n):s.complete())},i)})})(2e3,2e3).subscribe(e)}paramComplexObject(e){console.log("[WORKER]","paramComplexObject:",e)}})})();