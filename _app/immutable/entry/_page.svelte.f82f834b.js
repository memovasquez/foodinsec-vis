import{S as X,i as q,s as L,k as R,q as T,l as U,m as N,r as $,h as m,b as j,G as _,H as F,o as Z,a as B,y as z,c as H,z as K,n as G,A as J,g as Q,d as tt,B as nt}from"../chunks/index.e8d42111.js";var P={},M={},O=34,E=10,Y=13;function W(t){return new Function("d","return {"+t.map(function(n,i){return JSON.stringify(n)+": d["+i+'] || ""'}).join(",")+"}")}function et(t,n){var i=W(t);return function(a,o){return n(i(a),o,t)}}function V(t){var n=Object.create(null),i=[];return t.forEach(function(a){for(var o in a)o in n||i.push(n[o]=o)}),i}function f(t,n){var i=t+"",a=i.length;return a<n?new Array(n-a+1).join(0)+i:i}function rt(t){return t<0?"-"+f(-t,6):t>9999?"+"+f(t,6):f(t,4)}function it(t){var n=t.getUTCHours(),i=t.getUTCMinutes(),a=t.getUTCSeconds(),o=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":rt(t.getUTCFullYear())+"-"+f(t.getUTCMonth()+1,2)+"-"+f(t.getUTCDate(),2)+(o?"T"+f(n,2)+":"+f(i,2)+":"+f(a,2)+"."+f(o,3)+"Z":a?"T"+f(n,2)+":"+f(i,2)+":"+f(a,2)+"Z":i||n?"T"+f(n,2)+":"+f(i,2)+"Z":"")}function ot(t){var n=new RegExp('["'+t+`
\r]`),i=t.charCodeAt(0);function a(e,r){var c,s,u=o(e,function(g,d){if(c)return c(g,d-1);s=g,c=r?et(g,r):W(g)});return u.columns=s||[],u}function o(e,r){var c=[],s=e.length,u=0,g=0,d,I=s<=0,C=!1;e.charCodeAt(s-1)===E&&--s,e.charCodeAt(s-1)===Y&&--s;function x(){if(I)return M;if(C)return C=!1,P;var b,D=u,y;if(e.charCodeAt(D)===O){for(;u++<s&&e.charCodeAt(u)!==O||e.charCodeAt(++u)===O;);return(b=u)>=s?I=!0:(y=e.charCodeAt(u++))===E?C=!0:y===Y&&(C=!0,e.charCodeAt(u)===E&&++u),e.slice(D+1,b-1).replace(/""/g,'"')}for(;u<s;){if((y=e.charCodeAt(b=u++))===E)C=!0;else if(y===Y)C=!0,e.charCodeAt(u)===E&&++u;else if(y!==i)continue;return e.slice(D,b)}return I=!0,e.slice(D,s)}for(;(d=x())!==M;){for(var S=[];d!==P&&d!==M;)S.push(d),d=x();r&&(S=r(S,g++))==null||c.push(S)}return c}function l(e,r){return e.map(function(c){return r.map(function(s){return h(c[s])}).join(t)})}function p(e,r){return r==null&&(r=V(e)),[r.map(h).join(t)].concat(l(e,r)).join(`
`)}function k(e,r){return r==null&&(r=V(e)),l(e,r).join(`
`)}function A(e){return e.map(v).join(`
`)}function v(e){return e.map(h).join(t)}function h(e){return e==null?"":e instanceof Date?it(e):n.test(e+="")?'"'+e.replace(/"/g,'""')+'"':e}return{parse:a,parseRows:o,format:p,formatBody:k,formatRows:A,formatRow:v,formatValue:h}}var at=ot(","),st=at.parse;function ut(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function ct(t,n){return fetch(t,n).then(ut)}function ft(t){return function(n,i,a){return arguments.length===2&&typeof i=="function"&&(a=i,i=void 0),ct(n,i).then(function(o){return t(o,a)})}}var ht=ft(st);function w(t,n,i){this.k=t,this.x=n,this.y=i}w.prototype={constructor:w,scale:function(t){return t===1?this:new w(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new w(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};w.prototype;function lt(t){let n,i,a;return{c(){n=R("main"),i=R("h1"),a=T("App component")},l(o){n=U(o,"MAIN",{});var l=N(n);i=U(l,"H1",{});var p=N(i);a=$(p,"App component"),p.forEach(m),l.forEach(m)},m(o,l){j(o,n,l),_(n,i),_(i,a)},p:F,i:F,o:F,d(o){o&&m(n)}}}let pt="https://raw.githubusercontent.com/memovasquez/data/main/FAO_DatasetAbridged.csv";function mt(t){return Z(async()=>{ht(pt).then(n=>{})}),[]}class vt extends X{constructor(n){super(),q(this,n,mt,lt,L,{})}}function dt(t){let n,i,a,o,l,p,k,A,v,h,e;return h=new vt({}),{c(){n=R("h1"),i=T("Welcome to SvelteKit"),a=B(),o=R("p"),l=T("Visit "),p=R("a"),k=T("kit.svelte.dev"),A=T(" to read the documentation"),v=B(),z(h.$$.fragment),this.h()},l(r){n=U(r,"H1",{});var c=N(n);i=$(c,"Welcome to SvelteKit"),c.forEach(m),a=H(r),o=U(r,"P",{});var s=N(o);l=$(s,"Visit "),p=U(s,"A",{href:!0});var u=N(p);k=$(u,"kit.svelte.dev"),u.forEach(m),A=$(s," to read the documentation"),s.forEach(m),v=H(r),K(h.$$.fragment,r),this.h()},h(){G(p,"href","https://kit.svelte.dev")},m(r,c){j(r,n,c),_(n,i),j(r,a,c),j(r,o,c),_(o,l),_(o,p),_(p,k),_(o,A),j(r,v,c),J(h,r,c),e=!0},p:F,i(r){e||(Q(h.$$.fragment,r),e=!0)},o(r){tt(h.$$.fragment,r),e=!1},d(r){r&&m(n),r&&m(a),r&&m(o),r&&m(v),nt(h,r)}}}class gt extends X{constructor(n){super(),q(this,n,null,dt,L,{})}}export{gt as default};
