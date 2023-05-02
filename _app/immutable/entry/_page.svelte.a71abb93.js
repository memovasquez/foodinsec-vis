import{S as L,i as W,s as Z,k as $,q as y,a as Y,l as j,m as w,r as E,h as d,c as P,b as T,G as v,H as B,o as G,u as K,y as J,z as Q,n as x,A as tt,g as nt,d as et,B as rt}from"../chunks/index.e8d42111.js";var V={},F={},I=34,b=10,M=13;function z(t){return new Function("d","return {"+t.map(function(n,e){return JSON.stringify(n)+": d["+e+'] || ""'}).join(",")+"}")}function it(t,n){var e=z(t);return function(a,o){return n(e(a),o,t)}}function X(t){var n=Object.create(null),e=[];return t.forEach(function(a){for(var o in a)o in n||e.push(n[o]=o)}),e}function p(t,n){var e=t+"",a=e.length;return a<n?new Array(n-a+1).join(0)+e:e}function ot(t){return t<0?"-"+p(-t,6):t>9999?"+"+p(t,6):p(t,4)}function at(t){var n=t.getUTCHours(),e=t.getUTCMinutes(),a=t.getUTCSeconds(),o=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":ot(t.getUTCFullYear())+"-"+p(t.getUTCMonth()+1,2)+"-"+p(t.getUTCDate(),2)+(o?"T"+p(n,2)+":"+p(e,2)+":"+p(a,2)+"."+p(o,3)+"Z":a?"T"+p(n,2)+":"+p(e,2)+":"+p(a,2)+"Z":e||n?"T"+p(n,2)+":"+p(e,2)+"Z":"")}function st(t){var n=new RegExp('["'+t+`
\r]`),e=t.charCodeAt(0);function a(r,i){var l,u,f=o(r,function(C,k){if(l)return l(C,k-1);u=C,l=i?it(C,i):z(C)});return f.columns=u||[],f}function o(r,i){var l=[],u=r.length,f=0,C=0,k,D=u<=0,A=!1;r.charCodeAt(u-1)===b&&--u,r.charCodeAt(u-1)===M&&--u;function H(){if(D)return F;if(A)return A=!1,V;var S,O=f,R;if(r.charCodeAt(O)===I){for(;f++<u&&r.charCodeAt(f)!==I||r.charCodeAt(++f)===I;);return(S=f)>=u?D=!0:(R=r.charCodeAt(f++))===b?A=!0:R===M&&(A=!0,r.charCodeAt(f)===b&&++f),r.slice(O+1,S-1).replace(/""/g,'"')}for(;f<u;){if((R=r.charCodeAt(S=f++))===b)A=!0;else if(R===M)A=!0,r.charCodeAt(f)===b&&++f;else if(R!==e)continue;return r.slice(O,S)}return D=!0,r.slice(O,u)}for(;(k=H())!==F;){for(var N=[];k!==V&&k!==F;)N.push(k),k=H();i&&(N=i(N,C++))==null||l.push(N)}return l}function s(r,i){return r.map(function(l){return i.map(function(u){return m(l[u])}).join(t)})}function c(r,i){return i==null&&(i=X(r)),[i.map(m).join(t)].concat(s(r,i)).join(`
`)}function h(r,i){return i==null&&(i=X(r)),s(r,i).join(`
`)}function _(r){return r.map(g).join(`
`)}function g(r){return r.map(m).join(t)}function m(r){return r==null?"":r instanceof Date?at(r):n.test(r+="")?'"'+r.replace(/"/g,'""')+'"':r}return{parse:a,parseRows:o,format:c,formatBody:h,formatRows:_,formatRow:g,formatValue:m}}var ut=st(","),ct=ut.parse;function ft(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function lt(t,n){return fetch(t,n).then(ft)}function ht(t){return function(n,e,a){return arguments.length===2&&typeof e=="function"&&(a=e,e=void 0),lt(n,e).then(function(o){return t(o,a)})}}var pt=ht(ct);function U(t,n,e){this.k=t,this.x=n,this.y=e}U.prototype={constructor:U,scale:function(t){return t===1?this:new U(this.k*t,this.x,this.y)},translate:function(t,n){return t===0&n===0?this:new U(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};U.prototype;function q(t){let n,e=t[0][0]+"",a;return{c(){n=$("p"),a=y(e)},l(o){n=j(o,"P",{});var s=w(n);a=E(s,e),s.forEach(d)},m(o,s){T(o,n,s),v(n,a)},p(o,s){s&1&&e!==(e=o[0][0]+"")&&K(a,e)},d(o){o&&d(n)}}}function mt(t){let n,e,a,o,s=t[0].length>0&&q(t);return{c(){n=$("main"),e=$("h1"),a=y("App component"),o=Y(),s&&s.c()},l(c){n=j(c,"MAIN",{});var h=w(n);e=j(h,"H1",{});var _=w(e);a=E(_,"App component"),_.forEach(d),o=P(h),s&&s.l(h),h.forEach(d)},m(c,h){T(c,n,h),v(n,e),v(e,a),v(n,o),s&&s.m(n,null)},p(c,[h]){c[0].length>0?s?s.p(c,h):(s=q(c),s.c(),s.m(n,null)):s&&(s.d(1),s=null)},i:B,o:B,d(c){c&&d(n),s&&s.d()}}}let dt="https://raw.githubusercontent.com/memovasquez/data/main/FAO_DatasetAbridged.csv";function vt(t,n,e){let a=[];return console.log("Outside onmount method"),G(async()=>{pt(dt).then(o=>{e(0,a=o),console.log("Got data",o)}),console.log("After then block")}),[a]}class _t extends L{constructor(n){super(),W(this,n,vt,mt,Z,{})}}function gt(t){let n,e,a,o,s,c,h,_,g,m,r;return m=new _t({}),{c(){n=$("h1"),e=y("Welcome to SvelteKit"),a=Y(),o=$("p"),s=y("Visit "),c=$("a"),h=y("kit.svelte.dev"),_=y(" to read the documentation"),g=Y(),J(m.$$.fragment),this.h()},l(i){n=j(i,"H1",{});var l=w(n);e=E(l,"Welcome to SvelteKit"),l.forEach(d),a=P(i),o=j(i,"P",{});var u=w(o);s=E(u,"Visit "),c=j(u,"A",{href:!0});var f=w(c);h=E(f,"kit.svelte.dev"),f.forEach(d),_=E(u," to read the documentation"),u.forEach(d),g=P(i),Q(m.$$.fragment,i),this.h()},h(){x(c,"href","https://kit.svelte.dev")},m(i,l){T(i,n,l),v(n,e),T(i,a,l),T(i,o,l),v(o,s),v(o,c),v(c,h),v(o,_),T(i,g,l),tt(m,i,l),r=!0},p:B,i(i){r||(nt(m.$$.fragment,i),r=!0)},o(i){et(m.$$.fragment,i),r=!1},d(i){i&&d(n),i&&d(a),i&&d(o),i&&d(g),rt(m,i)}}}class Ct extends L{constructor(n){super(),W(this,n,null,gt,Z,{})}}export{Ct as default};
