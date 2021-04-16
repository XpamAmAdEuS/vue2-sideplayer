import e from"vue";import t from"wavesurfer.js";import r from"wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";function n(e){return"function"==typeof e&&/native code/.test(e.toString())}var i="undefined"!=typeof Symbol&&n(Symbol)&&"undefined"!=typeof Reflect&&n(Reflect.ownKeys),o=function(e){return e},a={enumerable:!0,configurable:!0,get:o,set:o};function s(e,t,r){var n=r.get,i=r.set;a.get=n||o,a.set=i||o,Object.defineProperty(e,t,a)}function l(e,t,r,n){Object.defineProperty(e,t,{value:r,enumerable:!!n,writable:!0,configurable:!0})}function u(e,t){return Object.hasOwnProperty.call(e,t)}function c(e){return Array.isArray(e)}function p(e){return"[object Object]"===function(e){return Object.prototype.toString.call(e)}(e)}function d(e){return"function"==typeof e}function h(t,r){e.util.warn(t,r)}var f=void 0;try{var v=require("vue");v&&y(v)?f=v:v&&"default"in v&&y(v.default)&&(f=v.default)}catch(se){}var w=null,m=null;function y(e){return e&&"function"==typeof e&&"Vue"===e.name}function g(){return w}function _(e){m=e}function b(){return m?x(m):null}var C=new WeakMap;function x(e){if(C.has(e))return C.get(e);var t={proxy:e,update:e.$forceUpdate,uid:e._uid,emit:e.$emit.bind(e),parent:null,root:null};return["data","props","attrs","refs","vnode","slots"].forEach((function(r){s(t,r,{get:function(){return e["$"+r]}})})),s(t,"isMounted",{get:function(){return e._isMounted}}),s(t,"isUnmounted",{get:function(){return e._isDestroyed}}),s(t,"isDeactivated",{get:function(){return e._inactive}}),s(t,"emitted",{get:function(){return e._events}}),C.set(e,t),e.$parent&&(t.parent=x(e.$parent)),e.$root&&(t.root=x(e.$root)),t}function S(e,t){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return e.$scopedSlots[t]?e.$scopedSlots[t].apply(e,r):h("slots."+t+'() got called outside of the "render()" scope',e)}}function k(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,o=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)a.push(n.value)}catch(s){i={error:s}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return a}function L(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(k(arguments[t]));return e}var R="composition-api.refKey",V=new WeakMap,E=new WeakMap,M=function(e){s(this,"value",{get:e.get,set:e.set})};function z(e,t){var r=new M(e),n=Object.seal(r);return E.set(n,!0),n}function $(e){var t;if(P(e))return e;var r=W(((t={})[R]=e,t));return z({get:function(){return r[R]},set:function(e){return r[R]=e}})}function P(e){return e instanceof M}function T(e,t){var r=e[t];return P(r)?r:z({get:function(){return e[t]},set:function(r){return e[t]=r}})}function N(e){var t;return Boolean((null==e?void 0:e.__ob__)&&(null===(t=e.__ob__)||void 0===t?void 0:t.__raw__))}function j(e){var t;return Boolean((null==e?void 0:e.__ob__)&&!(null===(t=e.__ob__)||void 0===t?void 0:t.__raw__))}function B(e){if(!(!p(e)||N(e)||Array.isArray(e)||P(e)||(t=e,r=g(),r&&t instanceof r)||V.has(e))){var t,r;V.set(e,!0);for(var n=Object.keys(e),i=0;i<n.length;i++)H(e,n[i])}}function H(e,t,r){if("__ob__"!==t&&!N(e[t])){var n,i,o=Object.getOwnPropertyDescriptor(e,t);if(o){if(!1===o.configurable)return;n=o.get,i=o.set,n&&!i||2!==arguments.length||(r=e[t])}B(r),Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var i=n?n.call(e):r;return t!==R&&P(i)?i.value:i},set:function(o){if(!n||i){var a=n?n.call(e):r;t!==R&&P(a)&&!P(o)?a.value=o:i?i.call(e,o):r=o,B(o)}}})}}function O(e){var t,r=w||f;r.observable?t=r.observable(e):t=function(e,t){void 0===t&&(t={});var r=e.config.silent;e.config.silent=!0;var n=new e(t);return e.config.silent=r,n}(r,{data:{$$state:e}})._data.$$state;return u(t,"__ob__")||l(t,"__ob__",function(e){void 0===e&&(e={});return{value:e,dep:{notify:o,depend:o,addSub:o,removeSub:o}}}(t)),t}function W(e){if(!p(e)&&!c(e)||N(e)||!Object.isExtensible(e))return e;var t=O(e);return B(t),t}function I(e){return function(t){var r,n=function(e){var t=b();return null==t?void 0:t.proxy}(((r=e)[0].toUpperCase(),r.slice(1)));n&&function(e,t,r,n){var i=t.$options,o=e.config.optionMergeStrategies[r];i[r]=o(i[r],function(e,t){return function(){for(var r,n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var o=null===(r=b())||void 0===r?void 0:r.proxy;_(e);try{return t.apply(void 0,L(n))}finally{_(o)}}}(t,n))}(g(),n,e,t)}}var A=I("mounted"),D=I("beforeDestroy"),F={};function U(e,t,r){var n;if(void 0===r&&(r=!1),!e)return t;var i=null===(n=b())||void 0===n?void 0:n.proxy;if(i){var o=function(e,t){for(var r=t;r;){if(r._provided&&u(r._provided,e))return r._provided[e];r=r.$parent}return F}(e,i);return o!==F?o:r&&d(t)?t():t}h("inject() can only be used inside setup() or functional components.")}var q={set:function(e,t,r){(e.__composition_api_state__=e.__composition_api_state__||{})[t]=r},get:function(e,t){return(e.__composition_api_state__||{})[t]}};function X(e){var t=q.get(e,"rawBindings")||{};if(t&&Object.keys(t).length){for(var r=e.$refs,n=q.get(e,"refs")||[],i=0;i<n.length;i++){var o=t[l=n[i]];!r[l]&&o&&P(o)&&(o.value=null)}var a=Object.keys(r),s=[];for(i=0;i<a.length;i++){var l;o=t[l=a[i]];r[l]&&o&&P(o)&&(o.value=r[l],s.push(l))}q.set(e,"refs",s)}}function G(e,t){var r=e.$options._parentVnode;if(r){for(var n=q.get(e,"slots")||[],i=function(e,t){var r;if(e){if(e._normalized)return e._normalized;for(var n in r={},e)e[n]&&"$"!==n[0]&&(r[n]=!0)}else r={};for(var n in t)n in r||(r[n]=!0);return r}(r.data.scopedSlots,e.$slots),o=0;o<n.length;o++){i[s=n[o]]||delete t[s]}var a=Object.keys(i);for(o=0;o<a.length;o++){var s;t[s=a[o]]||(t[s]=S(e,s))}q.set(e,"slots",a)}}function K(e,t,r){var n=m;_(e);try{return t(e)}catch(i){if(!r)throw i;r(i)}finally{_(n)}}function Z(e){function t(e){if(p(e)&&!P(e)&&!j(e)&&!N(e)){var r=g().util.defineReactive;Object.keys(e).forEach((function(n){var i=e[n];r(e,n,i),i&&t(i)}))}}function r(e,t){return void 0===t&&(t=new Map),t.has(e)?t.get(e):(t.set(e,!1),Array.isArray(e)&&j(e)?(t.set(e,!0),!0):!(!p(e)||N(e))&&Object.keys(e).some((function(n){return r(e[n],t)})))}e.mixin({beforeCreate:function(){var e=this,n=e.$options,i=n.setup,o=n.render;o&&(n.render=function(){for(var t=this,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return K(e,(function(){return o.apply(t,r)}))});if(!i)return;if("function"!=typeof i)return;var a=n.data;n.data=function(){return function(e,n){void 0===n&&(n={});var i,o=e.$options.setup,a=function(e){var t={slots:{}},r=["attrs"],n=["emit"];return["root","parent","refs","listeners","isServer","ssrContext"].forEach((function(r){var n="$"+r;s(t,r,{get:function(){return e[n]},set:function(){h("Cannot assign to '"+r+"' because it is a read-only property",e)}})})),r.forEach((function(r){var n="$"+r;s(t,r,{get:function(){var t,r,i=W({}),o=e[n],a=function(t){s(i,t,{get:function(){return e[n][t]}})};try{for(var l=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(Object.keys(o)),u=l.next();!u.done;u=l.next()){a(u.value)}}catch(c){t={error:c}}finally{try{u&&!u.done&&(r=l.return)&&r.call(l)}finally{if(t)throw t.error}}return i},set:function(){h("Cannot assign to '"+r+"' because it is a read-only property",e)}})})),n.forEach((function(r){var n="$"+r;s(t,r,{get:function(){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];e[n].apply(e,t)}}})})),t}(e);if(l(n,"__ob__",function(){return O({}).__ob__}()),G(e,a.slots),K(e,(function(){i=o(n,a)})),!i)return;if(d(i)){var f=i;return void(e.$options.render=function(){return G(e,a.slots),K(e,(function(){return f()}))})}if(p(i)){j(i)&&(i=function(e){if(!p(e))return e;var t={};for(var r in e)t[r]=T(e,r);return t}(i)),q.set(e,"rawBindings",i);var v=i;Object.keys(v).forEach((function(n){var i,o=v[n];P(o)||(j(o)?c(o)&&(o=$(o)):d(o)?o=o.bind(e):null===(i=o)||"object"!=typeof i?o=$(o):r(o)&&t(o)),function(e,t,r){var n=e.$options.props;t in e||n&&u(n,t)||(P(r)?s(e,t,{get:function(){return r.value},set:function(e){r.value=e}}):e[t]=r)}(e,n,o)}))}}(e,e.$props),"function"==typeof a?a.call(e,e):a||{}}},mounted:function(){X(this)},updated:function(){X(this)}})}function J(e,t){if(!e)return t;if(!t)return e;for(var r,n,o,a=i?Reflect.ownKeys(e):Object.keys(e),s=0;s<a.length;s++)"__ob__"!==(r=a[s])&&(n=t[r],o=e[r],u(t,r)?n!==o&&p(n)&&!P(n)&&p(o)&&!P(o)&&J(o,n):t[r]=o);return t}function Q(e){(function(e){return u(e,"__composition_api_installed__")})(e)||(e.config.optionMergeStrategies.setup=function(e,t){return function(r,n){return J("function"==typeof e?e(r,n)||{}:void 0,"function"==typeof t?t(r,n)||{}:void 0)}},function(e){w=e,Object.defineProperty(e,"__composition_api_installed__",{configurable:!0,writable:!0,value:!0})}(e),Z(e))}var Y={install:function(e){return Q(e)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(Y);class ee{constructor(e,t){if(this._onScroll=()=>{this.wrapper&&this.drawer.wrapper&&(this.wrapper.scrollLeft=this.drawer.wrapper.scrollLeft)},this._onRedraw=()=>this.render(),this._onAudioProcess=()=>this.updateNowPosition(),this._onReady=()=>{const e=this.wavesurfer;this.drawer=e.drawer,e.drawer.wrapper.addEventListener("scroll",this._onScroll),e.on("redraw",this._onRedraw),e.on("zoom",this._onZoom),e.on("audioprocess",this._onAudioProcess),this.render()},this._onWrapperClick=e=>{e.preventDefault();const t="offsetX"in e?e.offsetX:e.layerX;this.fireEvent("click",t/this.wrapper.scrollWidth||0)},this.container="string"==typeof e.container?document.querySelector(e.container):e.container,!this.container)throw new Error("No container for wavesurfer side");this.wavesurfer=t,this.util=t.util,this.params=Object.assign({},{height:20,notchPercentHeight:90,labelPadding:5,unlabeledNotchColor:"#c0c0c0",primaryColor:"#000",secondaryColor:"#c0c0c0",primaryFontColor:"#000",secondaryFontColor:"#000",fontFamily:"Arial",fontSize:10,duration:null,zoomDebounce:!1,formatTimeCallback:this.defaultFormatTimeCallback,timeInterval:this.defaultTimeInterval,primaryLabelInterval:this.defaultPrimaryLabelInterval,secondaryLabelInterval:this.defaultSecondaryLabelInterval,offset:0},e),this.wrapper=null,this.totalduration=null,this.nowtime=null,this._onZoom=this.params.zoomDebounce?this.wavesurfer.util.debounce((()=>this.render()),this.params.zoomDebounce):()=>this.render()}static create(e){return{name:"side",deferInit:!(!e||!e.deferInit)&&e.deferInit,params:e,instance:ee}}init(){this.wavesurfer.isReady?this._onReady():this.wavesurfer.once("ready",this._onReady)}destroy(){this.unAll(),this.wavesurfer.un("redraw",this._onRedraw),this.wavesurfer.un("zoom",this._onZoom),this.wavesurfer.un("ready",this._onReady),this.wavesurfer.drawer.wrapper.removeEventListener("scroll",this._onScroll),this.wrapper&&this.wrapper.parentNode&&(this.wrapper.removeEventListener("click",this._onWrapperClick),this.wrapper.parentNode.removeChild(this.wrapper),this.wrapper=null)}createWrapper(){this.container.innerHTML="",this.wrapper=this.container.appendChild(document.createElement("div")),this.totalduration=this.wrapper.appendChild(document.createElement("span")),this.totalduration.className="float-right",this.nowtime=this.wrapper.appendChild(document.createElement("span")),this.nowtime.className="float-left",this.util.style(this.wrapper,{display:"block",position:"relative",userSelect:"none",webkitUserSelect:"none",height:`${this.params.height}px`})}render(){this.wrapper||this.createWrapper(),this.updateTotalDuration(),this.updateNowPosition()}updateNowPosition(){const e=this.wavesurfer.backend.getCurrentTime()||0;e<=0||(this.nowtime.innerText="",this.nowtime.innerText=Math.floor(e/60)+":"+(e%60/100).toFixed(2).slice(-2)||0)}updateTotalDuration(){const e=this.wavesurfer.backend.getDuration()||0;e<=0||(this.totalduration.innerText="",this.totalduration.innerText=Math.floor(e/60)+":"+(e%60/100).toFixed(2).slice(-2)||0)}}class te{constructor(e,t){if(this._onRedraw=()=>this.render(),this._onPause=()=>this.updatePaused(),this._onPlay=()=>this.updatePlaying(),this._onReady=()=>{const e=this.wavesurfer;e.on("redraw",this._onRedraw),e.on("pause",this._onPause),e.on("play",this._onPlay),this.render()},this.container="string"==typeof e.container?document.querySelector(e.container):e.container,!this.container)throw new Error("No container for wavesurfer controls");this.wavesurfer=t,this.props=e,this.wrapper=null,this.playpause=null,this.stop=null,this.forward=null,this.backward=null,this.next=null,this.prev=null}static create(e){return{name:"controls",deferInit:!(!e||!e.deferInit)&&e.deferInit,params:e,instance:te}}init(){this.bindClick(),this.wavesurfer.isReady?this._onReady():this.wavesurfer.once("ready",this._onReady)}destroy(){this.unAll(),this.wavesurfer.un("redraw",this._onRedraw),this.wavesurfer.un("ready",this._onReady),this.wrapper&&this.wrapper.parentNode&&(this.wrapper.removeEventListener("click",this._onClick),this.wrapper.parentNode.removeChild(this.wrapper),this.wrapper=null)}createWrapper(){this.container.innerHTML="",this.wrapper=this.container.appendChild(document.createElement("div")),this.wrapper.style.paddingBottom="5px";const e=this.props;this.backward=this.wrapper.appendChild(document.createElement("a")),this.backward.style.marginRight="20px",this.backward.style.marginLeft="20px",this.backward.innerHTML='<svg  aria-hidden="true" id="#backward" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M12 447h8c6.6 0 12-5.4 12-12V277.3c.9 1 1.9 2 3 2.9l200.5 159.4c20.6 17.2 52.5 2.8 52.5-24.6V297.2l171.5 142.4c20.6 17.2 52.5 2.8 52.5-24.6V95c0-27.4-31.9-41.8-52.5-24.6L288 213.9V95.1c0-27.4-31.9-41.8-52.5-24.6L35 231c-1.1.9-2.1 1.9-3 2.9V75c0-6.6-5.4-12-12-12h-8C5.4 63 0 68.4 0 75v360c0 6.6 5.4 12 12 12zm280.5-191.4l.2-.1.2-.1L480 95v320L292.7 255.8l-.1-.1-.1-.1zM61 255.2l194.8-160 .1-.1.1-.1v320l-.1-.1-.1-.1L61 256v-.8z"></path></svg>',e.prev&&(this.prev=this.wrapper.appendChild(document.createElement("a")),this.prev.style.marginRight="20px",this.prev.style.marginLeft="20px",this.prev.innerHTML='<svg  aria-hidden="true" id="#prev" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M76 479h8c6.6 0 12-5.4 12-12V276.7c1.1 1.2 2.2 2.4 3.5 3.4l232 191.4c20.6 17.2 52.5 2.8 52.5-24.6V63c0-27.4-31.9-41.8-52.5-24.6L99.5 231c-1.3 1.1-2.4 2.2-3.5 3.4V43c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v424c0 6.6 5.4 12 12 12zm40.5-223.4L351.8 63.2l.1-.1.1-.1v384l-.1-.1-.2-.1-235.2-191.2z"></path></svg>'),this.stop=this.wrapper.appendChild(document.createElement("a")),this.stop.style.marginRight="20px",this.stop.style.marginLeft="20px",this.stop.id="#stop",this.stop.innerHTML='<svg  aria-hidden="true" id="#stop" style="color: rgb(255,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"></path></svg>',this.playpause=this.wrapper.appendChild(document.createElement("a")),this.playpause.style.marginRight="20px",this.playpause.style.marginLeft="20px",e.next&&(this.next=this.wrapper.appendChild(document.createElement("a")),this.next.style.marginRight="20px",this.next.style.marginLeft="20px",this.next.id="#next",this.next.innerHTML='<svg  aria-hidden="true" id="#next" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M372 31h-8c-6.6 0-12 5.4-12 12v190.3c-1.1-1.2-2.2-2.4-3.5-3.4l-232-191.4C95.9 21.3 64 35.6 64 63v384c0 27.4 31.9 41.8 52.5 24.6l232-192.6c1.3-1.1 2.4-2.2 3.5-3.4V467c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V43c0-6.6-5.4-12-12-12zm-40.5 223.4L96.2 446.8l-.1.1-.1.1V63l.1.1.2.1 235.2 191.2z"></path></svg>'),this.forward=this.wrapper.appendChild(document.createElement("a")),this.forward.style.marginRight="20px",this.forward.style.marginLeft="20px",this.forward.innerHTML='<svg  aria-hidden="true" id="#forward" style="color: rgb(0,0,0);height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M500 63h-8c-6.6 0-12 5.4-12 12v157.7c-.9-1-1.9-2-3-2.9L276.5 70.4C255.9 53.3 224 67.6 224 95v117.8L52.5 70.4C31.9 53.3 0 67.6 0 95v320c0 27.4 31.9 41.8 52.5 24.6L224 296.2V415c0 27.4 31.9 41.8 52.5 24.6L477 279c1.1-.9 2.1-1.9 3-2.9V435c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V75c0-6.6-5.4-12-12-12zM219.5 254.4l-.2.1-.2.1L32 415V95l187.3 159.2.1.1.1.1zm231.5.5l-194.8 160-.1.1h-.1V95l.1.1.1.1L451 254v.9z"></path></svg>'}bindClick(){this._onClick=e=>{const t=e.target.id;"#play"===t.toString()&&this.wavesurfer.playPause(),"#stop"===t.toString()&&this.wavesurfer.stop(),"#prev"===t.toString()&&this.wavesurfer.fireEvent("prev",this),"#next"===t.toString()&&this.wavesurfer.fireEvent("next",this),"#forward"===t.toString()&&this.wavesurfer.skipForward(),"#backward"===t.toString()&&this.wavesurfer.skipBackward()},this.container.addEventListener("click",this._onClick)}render(){this.wrapper||this.createWrapper()}updatePaused(){this.playpause.innerHTML='<svg aria-hidden="true" id="#play" style="color: #28c76f;height: 1.5em;"   role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"></path></svg>'}updatePlaying(){this.playpause.innerHTML='<svg aria-hidden="true" id="#play" style="color: rgb(255, 159, 67);height: 1.5em;"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M48 479h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48H48C21.5 31 0 52.5 0 79v352c0 26.5 21.5 48 48 48zM32 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V79zm272 400h96c26.5 0 48-21.5 48-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48zM288 79c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v352c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16V79z"></path></svg>'}}class re{constructor(e,t){if(this._onRedraw=()=>this.render(),this._onPlay=()=>this.setVol(),this._onReady=()=>{const e=this.wavesurfer;this.util=e.util,e.on("redraw",this._onRedraw),e.on("play",this._onPlay),this.render()},this.container="string"==typeof e.container?document.querySelector(e.container):e.container,!this.container)throw new Error("No container for wavesurfer voice");this.wavesurfer=t,this.util=t.util,this.wrapper=null,this.params=e}static create(e){return{name:"voice",deferInit:!(!e||!e.deferInit)&&e.deferInit,params:e,instance:re}}init(){this.bindChange(),this.wavesurfer.isReady?this._onReady():this.wavesurfer.once("ready",this._onReady)}destroy(){this.unAll(),this.wavesurfer.un("redraw",this._onRedraw),this.wavesurfer.un("ready",this._onReady),this.wrapper&&this.wrapper.parentNode&&(this.wrapper.removeEventListener("change",this._onChange),this.wrapper.parentNode.removeChild(this.wrapper),this.wrapper=null)}createWrapper(){this.container.innerHTML="",this.wrapper=this.container.appendChild(document.createElement("input")),this.wrapper.classList.add("voice-input"),this.wrapper.type="range",this.wrapper.id="#voicerange",this.wrapper.style.width="100%",this.wrapper.min="0",this.wrapper.max="1",this.wrapper.step="0.01",this.wrapper.value=this.params.volume,this.wavesurfer.setVolume(this.params.volume)}bindChange(){this._onChange=e=>{this.wavesurfer.setVolume(e.target.value)},this.container.addEventListener("change",this._onChange)}setVol(){this.wavesurfer.setVolume(this.wrapper.value)}render(){this.wrapper||this.createWrapper()}}var ne={props:{authToken:{type:String,default:null},volume:{type:Number,default:.5},prev:{default:!1,type:Boolean},next:{default:!1,type:Boolean},audioContext:{default:null,type:AudioContext},audioScriptProcessor:{default:null,type:ScriptProcessorNode},audioRate:{default:1,type:Number},autoCenter:{default:!0,type:Boolean},autoCenterRate:{default:5,type:Number},autoCenterImmediately:{default:!1,type:Boolean},backend:{default:"WebAudio",type:[String]},backgroundColor:{default:null,type:String},barHeight:{default:1,type:Number},barRadius:{default:0,type:Number},barGap:{default:null,type:Number},barWidth:{default:null,type:Number},barMinHeight:{default:null,type:Number},container:{default:null,type:[String,HTMLElement]},cursorColor:{default:"#333",type:String},cursorWidth:{default:1,type:Number},dragSelection:{default:!0,type:Boolean},duration:{default:null,type:Number},fillParent:{default:!0,type:Boolean},forceDecode:{default:!1,type:Boolean},height:{default:128,type:Number},hideScrollbar:{default:!1,type:Boolean},interact:{default:!0,type:Boolean},loopSelection:{default:!0,type:Boolean},maxCanvasWidth:{default:4e3,type:Number},mediaControls:{default:!1,type:Boolean},mediaType:{default:"audio",type:String},progressColor:{default:"#555",type:String},removeMediaElementOnDestroy:{default:!0,type:Boolean},responsive:{default:!1,type:Boolean},scrollParent:{default:!1,type:Boolean},skipLength:{default:2,type:Number},waveColor:{default:"#999",type:[String,CanvasGradient]}},setup(e,n){const i=U("emitter"),o=$(null),a={container:o,backend:e.backend,waveColor:e.waveColor,progressColor:e.progressColor,scrollParent:e.scrollParent,barWidth:e.barWidth,hideScrollbar:e.hideScrollbar,barHeight:e.barHeight,responsive:e.responsive,cursorColor:e.cursorColor,cursorWidth:e.cursorWidth,mediaControls:e.mediaControls,xhr:{cache:"default",mode:"cors",method:"GET",credentials:"same-origin",redirect:"follow",referrer:"client",requestHeaders:[{key:"Authorization",value:"Bearer "+e.authToken}]},plugins:[r.create({showTime:!0,customShowTimeStyle:{"background-color":"#000",color:"#fff",padding:"2px","font-size":"10px"}}),ee.create({container:"#side"}),te.create({container:"#controls",prev:e.prev,next:e.next}),re.create({container:"#voice",volume:e.volume})]},s=W({open:!1,stopped:!1,playing:!1,paused:!1,musicHash:null,index:null,audio:{type:Object,default:()=>({artist:"",title:""})},volume:e.volume,waveSurfer:null});i.on("loadMusic",(e=>{d(e)})),i.on("loadNext",(e=>{h(e)})),i.on("musicToggle",(()=>l())),i.on("play",(()=>u())),i.on("stop",(()=>p())),A((()=>{s.waveSurfer=new t(a),s.waveSurfer.init(),s.waveSurfer.on("ready",(()=>{c(s.volume),u()})),s.waveSurfer.on("pause",(()=>{i.emit("sidepause",{hash:s.musicHash,pause:!0}),s.playing=!1,s.paused=!0})),s.waveSurfer.on("play",(()=>{i.emit("sideplaying",{hash:s.musicHash,playing:!0}),s.playing=!0,s.paused=!1})),s.waveSurfer.on("finish",(()=>{i.emit("sidefinish",s.index)})),s.waveSurfer.on("prev",(e=>{i.emit("sideprev",s.index)})),s.waveSurfer.on("next",(e=>{i.emit("sidenext",s.index)}))})),D((()=>{s.waveSurfer.destroy()}));const l=()=>{s.waveSurfer.playPause()},u=()=>{s.waveSurfer.play()},c=e=>{s.waveSurfer.setVolume(e)},p=()=>{s.waveSurfer.stop(),i.emit("sidestop",{hash:s.musicHash,stop:!0}),s.playing=!1,s.paused=!1,s.stopped=!0,s.musicHash=null,s.audio={artist:"",title:""}},d=e=>{s.musicHash=e.row.item.hash,s.index=e.row.index,s.audio={artist:e.row.item.artist,title:e.row.item.title},s.waveSurfer.load(e.link)},h=e=>{s.musicHash=e.hash,s.index=e.index,s.audio={artist:e.artist,title:e.title},s.waveSurfer.load(e.link)};return{state:s,toggle:()=>{s.open=!s.open},pause:()=>{s.waveSurfer.pause()},play:u,stop:p,containerRef:o}}};const ie={};var oe=function(e,t,r,n,i,o,a,s){var l,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=l):i&&(l=s?function(){i.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(e,t){return l.call(t),c(e,t)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,l):[l]}return{exports:e,options:u}}(ne,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"side-player d-none d-md-block",class:{open:e.state.open}},[r("div",{staticClass:"side-player-toggle side-player-spinner d-flex align-items-center justify-content-center",on:{click:e.toggle}},[r("svg",{attrs:{"aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[r("path",{attrs:{fill:"currentColor",d:"M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"}})]),e._v(" "),r("svg",{attrs:{"aria-hidden":"true",focusable:"false",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[r("path",{attrs:{fill:"currentColor",d:"M481.44 0a29.38 29.38 0 0 0-9.25 1.5l-290.78 96C168.72 101.72 160 114 160 128v244.75C143 360 120.69 352 96 352c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V256l288-96v148.75C463 296 440.69 288 416 288c-53 0-96 35.81-96 80s43 80 96 80 96-35.81 96-80V32c0-18.25-14.31-32-30.56-32zM96 480c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm320-64c-34.69 0-64-22-64-48s29.31-48 64-48 64 22 64 48-29.31 48-64 48zm64-289.72l-288 96V128h-.56v-.12L480 32.62z"}})])]),e._v(" "),r("div",{staticClass:"side-player-content"},[r("div",{staticClass:"text-center"},[e._v(e._s(e.state.audio.artist)+" - "+e._s(e.state.audio.title))]),e._v(" "),r("div",{ref:"containerRef"}),e._v(" "),r("div",{attrs:{id:"io"}}),e._v(" "),r("div",{attrs:{id:"side"}}),e._v(" "),r("div",{staticClass:"text-center",attrs:{id:"controls"}}),e._v(" "),r("div",{staticClass:"voice-range",attrs:{id:"voice"}})])])}),[],!1,(function(e){for(let t in ie)this[t]=ie[t]}),null,null,null).exports,ae={install(e){e.component("SidePlayer",oe)}};export default ae;