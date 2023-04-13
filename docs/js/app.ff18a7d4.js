(()=>{"use strict";var e={7537:(e,t,r)=>{var o=r(1957),n=r(1947),i=r(499),a=r(9835);function s(e,t,r,o,n,i){const s=(0,a.up)("router-view");return(0,a.wg)(),(0,a.j4)(s)}const l=JSON.parse('{"major":0,"minor":1,"revision":3}');var u,c=function(e,t,r,o){if("a"===r&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"===typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?o:"a"===r?o.call(e):o?o.value:t.get(e)},d=function(e,t,r,o,n){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"===typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?n.call(e,r):n?n.value=r:t.set(e,r),r};class f{get major(){return c(this,u,"f").major}get minor(){return c(this,u,"f").minor}get revision(){return c(this,u,"f").revision}toString(){return`v${this.major}.${this.minor}.${this.revision}`}constructor(e){u.set(this,void 0),d(this,u,e,"f"),this.toString=this.toString.bind(this),Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this))).filter((([e,t])=>"function"===typeof t.get)).forEach((([e,t])=>{var r,o;t.get=null===(r=t.get)||void 0===r?void 0:r.bind(this),t.set=null===(o=t.set)||void 0===o?void 0:o.bind(this),Object.defineProperty(this,e,t)}))}}u=new WeakMap;const h=new f(l),p=h,v=(0,a.aZ)({name:"App",setup(){window["getVersion"]=()=>p.toString()}});var m=r(1639);const g=(0,m.Z)(v,[["render",s]]),b=g;var y=r(3340),w=r(1809),j=r(1903);const O=(0,y.h)((()=>{const e=(0,w.WB)();return e.use(j.Z),e}));var E=r(8339);const k=[{path:"/",component:()=>Promise.all([r.e(736),r.e(113)]).then(r.bind(r,8113)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(919)]).then(r.bind(r,7919))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(760)]).then(r.bind(r,8760))}],C=k,P=(0,y.BC)((function(){const e=E.r5,t=(0,E.p7)({scrollBehavior:()=>({left:0,top:0}),routes:C,history:e("")});return t}));async function T(e,t){const r=e(b);r.use(n.Z,t);const o="function"===typeof O?await O({}):O;r.use(o);const a=(0,i.Xl)("function"===typeof P?await P({store:o}):P);return o.use((({store:e})=>{e.router=a})),{app:r,store:o,router:a}}var S=r(8542),A=r(8482);const N={config:{},lang:S.Z,plugins:{Dialog:A.Z}};async function _({app:e,router:t,store:r}){e.use(t),e.mount("#q-app")}T(o.ri,N).then(_)}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,i)=>{if(!o){var a=1/0;for(c=0;c<e.length;c++){for(var[o,n,i]=e[c],s=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,n,i]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{113:"0995ea74",760:"959b703c",919:"adb5e5a5"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+e+".8ce09b2e.css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="roster-builder:";r.l=(o,n,i,a)=>{if(e[o])e[o].push(n);else{var s,l;if(void 0!==i)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+i){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+i),s.src=o),e[o]=[n];var f=(t,r)=>{s.onerror=s.onload=null,clearTimeout(h);var n=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(r))),t)return t(r)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,r,o,n)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=r=>{if(i.onerror=i.onload=null,"load"===r.type)o();else{var a=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=a,l.request=s,i.parentNode.removeChild(i),n(l)}};return i.onerror=i.onload=a,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=r[o],i=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(i===e||i===t))return n}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){n=a[o],i=n.getAttribute("data-href");if(i===e||i===t)return n}},o=o=>new Promise(((n,i)=>{var a=r.miniCssF(o),s=r.p+a;if(t(a,s))return n();e(o,s,null,n,i)})),n={143:0};r.f.miniCss=(e,t)=>{var r={919:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=o(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}}})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var i=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=i);var a=r.p+r.u(t),s=new Error,l=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,n[1](s)}};r.l(a,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,i,[a,s,l]=o,u=0;if(a.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(l)var c=l(r)}for(t&&t(o);u<a.length;u++)i=a[u],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(c)},o=globalThis["webpackChunkroster_builder"]=globalThis["webpackChunkroster_builder"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(7537)));o=r.O(o)})();