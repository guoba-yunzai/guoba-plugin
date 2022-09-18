import{_ as e,a0 as t,b as n,c as a,r as o,y as l,q as r,w as i,a_ as s,v as c,dT as u,U as d,E as f,k as v,L as p,J as h,ah as y,b7 as b,aF as m,dU as g,Q as w,R as C,af as k,D as O,aT as S,ae as x,T,V as N}from"./index.js";var j=function(){return{prefixCls:String,width:t.oneOfType([t.string,t.number]),height:t.oneOfType([t.string,t.number]),style:{type:Object,default:void 0},class:String,placement:{type:String},wrapperClassName:String,level:{type:[String,Array]},levelMove:{type:[Number,Function,Array]},duration:String,ease:String,showMask:{type:Boolean,default:void 0},maskClosable:{type:Boolean,default:void 0},maskStyle:{type:Object,default:void 0},afterVisibleChange:Function,keyboard:{type:Boolean,default:void 0},contentWrapperStyle:{type:Object,default:void 0},autofocus:{type:Boolean,default:void 0},open:{type:Boolean,default:void 0}}};var E={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend"},M=E[Object.keys(E).filter((function(e){if("undefined"==typeof document)return!1;var t=document.getElementsByTagName("html")[0];return e in(t?t.style:{})}))[0]];function P(e,t,n,a){e.addEventListener?e.addEventListener(t,n,a):e.attachEvent&&e.attachEvent("on".concat(t),n)}function V(e,t,n,a){e.removeEventListener?e.removeEventListener(t,n,a):e.attachEvent&&e.detachEvent("on".concat(t),n)}var A=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},B=!("undefined"!=typeof window&&window.document&&window.document.createElement),L=function e(t,n,a,o){if(!n||n===document||n instanceof Document)return!1;if(n===t.parentNode)return!0;var l=Math.max(Math.abs(a),Math.abs(o))===Math.abs(o),r=Math.max(Math.abs(a),Math.abs(o))===Math.abs(a),i=n.scrollHeight-n.clientHeight,s=n.scrollWidth-n.clientWidth,c=document.defaultView.getComputedStyle(n),u="auto"===c.overflowY||"scroll"===c.overflowY,d="auto"===c.overflowX||"scroll"===c.overflowX,f=i&&u,v=s&&d;return!!(l&&(!f||f&&(n.scrollTop>=i&&o<0||n.scrollTop<=0&&o>0))||r&&(!v||v&&(n.scrollLeft>=s&&a<0||n.scrollLeft<=0&&a>0)))&&e(t,n.parentNode,a,o)},F=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(n[a[o]]=e[a[o]])}return n},I={},D=n({inheritAttrs:!1,props:e(e({},j()),{getContainer:Function,getOpenCount:Function,scrollLocker:t.any,switchScrollingEffect:Function}),emits:["close","handleClick","change"],setup:function(t,n){var m,g=n.emit,w=n.slots,C=a({startPos:{x:null,y:null}}),k=o(),O=o(),S=o(),x=o(),T=o(),N=[],j="drawer_id_".concat(Number((Date.now()+Math.random()).toString().replace(".",Math.round(9*Math.random()).toString())).toString(16)),E=!(B||!b)&&{passive:!1};l((function(){r((function(){var e,n=t.open,a=t.getContainer,o=t.showMask,l=t.autofocus,i=null==a?void 0:a();G(t),n&&(i&&i.parentNode===document.body&&(I[j]=n),U(),r((function(){l&&D()})),o&&(null===(e=t.scrollLocker)||void 0===e||e.lock()))}))})),i((function(){return t.level}),(function(){G(t)}),{flush:"post"}),i((function(){return t.open}),(function(){var e=t.open,n=t.getContainer,a=t.scrollLocker,o=t.showMask,l=t.autofocus,r=null==n?void 0:n();r&&r.parentNode===document.body&&(I[j]=!!e),U(),e?(l&&D(),o&&(null==a||a.lock())):null==a||a.unLock()}),{flush:"post"}),s((function(){var e,n=t.open;delete I[j],n&&(q(!1),document.body.style.touchAction=""),null===(e=t.scrollLocker)||void 0===e||e.unLock()})),i((function(){return t.placement}),(function(e){e&&(T.value=null)}));var D=function(){var e,t;null===(t=null===(e=O.value)||void 0===e?void 0:e.focus)||void 0===t||t.call(e)},z=function(e){e.touches.length>1||(C.startPos={x:e.touches[0].clientX,y:e.touches[0].clientY})},_=function(e){if(!(e.changedTouches.length>1)){var t=e.currentTarget,n=e.changedTouches[0].clientX-C.startPos.x,a=e.changedTouches[0].clientY-C.startPos.y;(t===S.value||t===x.value||t===T.value&&L(t,e.target,n,a))&&e.cancelable&&e.preventDefault()}},H=function e(t){var n=t.target;V(n,M,e),n.style.transition=""},R=function(e){g("close",e)},W=function(e){e.keyCode===y.ESC&&(e.stopPropagation(),R(e))},X=function(e){var n=t.open,a=t.afterVisibleChange;e.target===k.value&&e.propertyName.match(/transform$/)&&(O.value.style.transition="",!n&&$()&&(document.body.style.overflowX="",S.value&&(S.value.style.left="",S.value.style.width="")),a&&a(!!n))},Y=c((function(){var e=t.placement,n="left"===e||"right"===e;return{isHorizontal:n,placementName:"translate".concat(n?"X":"Y")}})),U=function(){var e=t.open,n=t.width,a=t.height,o=Y.value,l=o.isHorizontal,r=o.placementName,i=T.value?T.value.getBoundingClientRect()[l?"width":"height"]:0;K(e,r,(l?n:a)||i)},q=function(e,n,a,o){var l=t.placement,r=t.levelMove,i=t.duration,s=t.ease,c=t.showMask;N.forEach((function(t){t.style.transition="transform ".concat(i," ").concat(s),P(t,M,H);var u,d,f,v=e?a:0;if(r){var p=(d={target:t,open:e},f="function"==typeof(u=r)?u(d):u,Array.isArray(f)?2===f.length?f:[f[0],f[1]]:[f]);v=e?p[0]:p[1]||0}var h="number"==typeof v?"".concat(v,"px"):v,y="left"===l||"top"===l?h:"-".concat(h);y=c&&"right"===l&&o?"calc(".concat(y," + ").concat(o,"px)"):y,t.style.transform=v?"".concat(n,"(").concat(y,")"):""}))},K=function(e,t,n){if(!B){var a=document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth?u(!0):0;q(e,t,n,a),Z(a)}g("change",e)},Z=function(e){var n=t.getContainer,a=t.showMask,o=t.open,l=null==n?void 0:n();if(l&&l.parentNode===document.body&&a){var r=["touchstart"],i=[document.body,S.value,x.value,T.value];o&&"hidden"!==document.body.style.overflow?(e&&J(e),document.body.style.touchAction="none",i.forEach((function(e,t){e&&P(e,r[t]||"touchmove",t?_:z,E)}))):$()&&(document.body.style.touchAction="",e&&Q(e),i.forEach((function(e,t){e&&V(e,r[t]||"touchmove",t?_:z,E)})))}},J=function(e){var n=t.placement,a=t.duration,o=t.ease,l="width ".concat(a," ").concat(o),r="transform ".concat(a," ").concat(o);switch(O.value.style.transition="none",n){case"right":O.value.style.transform="translateX(-".concat(e,"px)");break;case"top":case"bottom":O.value.style.width="calc(100% - ".concat(e,"px)"),O.value.style.transform="translateZ(0)"}clearTimeout(m),m=setTimeout((function(){O.value&&(O.value.style.transition="".concat(r,",").concat(l),O.value.style.width="",O.value.style.transform="")}))},Q=function(e){var n,a=t.placement,o=t.duration,l=t.ease;O.value.style.transition="none";var r="width ".concat(o," ").concat(l),i="transform ".concat(o," ").concat(l);switch(a){case"left":O.value.style.width="100%",r="width 0s ".concat(l," ").concat(o);break;case"right":O.value.style.transform="translateX(".concat(e,"px)"),O.value.style.width="100%",r="width 0s ".concat(l," ").concat(o),S.value&&(S.value.style.left="-".concat(e,"px"),S.value.style.width="calc(100% + ".concat(e,"px)"));break;case"top":case"bottom":O.value.style.width="calc(100% + ".concat(e,"px)"),O.value.style.height="100%",O.value.style.transform="translateZ(0)",n="height 0s ".concat(l," ").concat(o)}clearTimeout(m),m=setTimeout((function(){O.value&&(O.value.style.transition="".concat(i,",").concat(n?"".concat(n,","):"").concat(r),O.value.style.transform="",O.value.style.width="",O.value.style.height="")}))},$=function(){return!Object.keys(I).some((function(e){return I[e]}))},G=function(e){var t=e.level,n=e.getContainer;if(!B){var a,o=null==n?void 0:n(),l=o?o.parentNode:null;if(N=[],"all"===t)(l?Array.prototype.slice.call(l.children):[]).forEach((function(e){"SCRIPT"!==e.nodeName&&"STYLE"!==e.nodeName&&"LINK"!==e.nodeName&&e!==o&&N.push(e)}));else t&&(a=t,Array.isArray(a)?a:[a]).forEach((function(e){document.querySelectorAll(e).forEach((function(e){N.push(e)}))}))}},ee=function(e){g("handleClick",e)},te=o(!1);return i(O,(function(){r((function(){te.value=!0}))})),function(){var n,a,o,l=t.width,r=t.height,i=t.open,s=t.prefixCls,c=t.placement;t.level,t.levelMove,t.ease,t.duration,t.getContainer,t.onChange,t.afterVisibleChange;var u=t.showMask,y=t.maskClosable,b=t.maskStyle,m=t.keyboard;t.getOpenCount,t.scrollLocker;var g=t.contentWrapperStyle,C=t.style,N=t.class,j=F(t,["width","height","open","prefixCls","placement","level","levelMove","ease","duration","getContainer","onChange","afterVisibleChange","showMask","maskClosable","maskStyle","keyboard","getOpenCount","scrollLocker","contentWrapperStyle","style","class"]),E=i&&te.value,M=d(s,(f(n={},"".concat(s,"-").concat(c),!0),f(n,"".concat(s,"-open"),E),f(n,N,!!N),f(n,"no-mask",!u),n)),P=Y.value.placementName,V="left"===c||"top"===c?"-100%":"100%",B=E?"":"".concat(P,"(").concat(V,")");return v("div",p(p({},h(j,["switchScrollingEffect","autofocus"])),{},{tabindex:-1,class:M,style:C,ref:O,onKeydown:E&&m?W:void 0,onTransitionend:X}),[u&&v("div",{class:"".concat(s,"-mask"),onClick:y?R:void 0,style:b,ref:S},null),v("div",{class:"".concat(s,"-content-wrapper"),style:e({transform:B,msTransform:B,width:A(l)?"".concat(l,"px"):l,height:A(r)?"".concat(r,"px"):r},g),ref:k},[v("div",{class:"".concat(s,"-content"),ref:T},[null===(a=w.default)||void 0===a?void 0:a.call(w)]),w.handler?v("div",{onClick:ee,ref:x},[null===(o=w.handler)||void 0===o?void 0:o.call(w)]):null])])}}}),z=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(n[a[o]]=e[a[o]])}return n},_=n({inheritAttrs:!1,props:m(e(e({},j()),{forceRender:{type:Boolean,default:void 0},getContainer:t.oneOfType([t.string,t.func,t.object,t.looseBool])}),{prefixCls:"drawer",placement:"left",getContainer:"body",level:"all",duration:".3s",ease:"cubic-bezier(0.78, 0.14, 0.15, 0.86)",afterVisibleChange:function(){},showMask:!0,maskClosable:!0,maskStyle:{},wrapperClassName:"",keyboard:!0,forceRender:!1,autofocus:!0}),emits:["handleClick","close"],slots:["handler"],setup:function(e,t){var n=t.emit,a=t.slots,l=o(null),r=function(e){n("handleClick",e)},i=function(e){n("close",e)};return function(){e.afterVisibleChange;var t=e.getContainer,n=e.wrapperClassName,o=e.forceRender,s=z(e,["afterVisibleChange","getContainer","wrapperClassName","forceRender"]),c=null;if(!t)return v("div",{class:n,ref:l},[v(D,p(p({},s),{},{open:e.open,getContainer:function(){return l.value},onClose:i,onHandleClick:r}),a)]);var u=!!a.handler||o;return(u||e.open||l.value)&&(c=v(g,{visible:e.open,forceRender:u,getContainer:t,wrapperClassName:n},{default:function(t){var n=t.visible,o=t.afterClose,c=z(t,["visible","afterClose"]);return v(D,p(p(p({ref:l},s),c),{},{open:void 0!==n?n:e.open,afterVisibleChange:void 0!==o?o:e.afterVisibleChange,onClose:i,onHandleClick:r}),a)}})),c}}}),H=globalThis&&globalThis.__rest||function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(n[a[o]]=e[a[o]])}return n},R=C("top","right","bottom","left");C("default","large");var W={distance:180},X=w(n({name:"ADrawer",inheritAttrs:!1,props:m({autofocus:{type:Boolean,default:void 0},closable:{type:Boolean,default:void 0},closeIcon:t.any,destroyOnClose:{type:Boolean,default:void 0},forceRender:{type:Boolean,default:void 0},getContainer:t.any,maskClosable:{type:Boolean,default:void 0},mask:{type:Boolean,default:void 0},maskStyle:{type:Object,default:void 0},wrapStyle:{type:Object,default:void 0},style:{type:Object,default:void 0},class:t.any,wrapClassName:String,size:{type:String},drawerStyle:{type:Object,default:void 0},headerStyle:{type:Object,default:void 0},bodyStyle:{type:Object,default:void 0},contentWrapperStyle:{type:Object,default:void 0},title:t.any,visible:{type:Boolean,default:void 0},width:t.oneOfType([t.string,t.number]),height:t.oneOfType([t.string,t.number]),zIndex:Number,prefixCls:String,push:t.oneOfType([t.looseBool,{type:Object}]),placement:t.oneOf(R),keyboard:{type:Boolean,default:void 0},extra:t.any,footer:t.any,footerStyle:{type:Object,default:void 0},level:t.any,levelMove:{type:[Number,Array,Function]},handle:t.any,afterVisibleChange:Function,onAfterVisibleChange:Function,"onUpdate:visible":Function,onClose:Function},{closable:!0,placement:"right",maskClosable:!0,mask:!0,level:null,keyboard:!0,push:W}),slots:["closeIcon","title","extra","footer","handle"],setup:function(t,n){var a=n.emit,u=n.slots,p=n.attrs,y=o(!1),b=o(!1),m=o(null),g=k("parentDrawerOpts",null),w=O("drawer",t).prefixCls;S(!t.afterVisibleChange,"Drawer","`afterVisibleChange` prop is deprecated, please use `@afterVisibleChange` event instead"),S(void 0===t.wrapStyle,"Drawer","`wrapStyle` prop is deprecated, please use `style` instead"),S(void 0===t.wrapClassName,"Drawer","`wrapClassName` prop is deprecated, please use `class` instead");x("parentDrawerOpts",{setPush:function(){y.value=!0},setPull:function(){y.value=!1,r((function(){C()}))}}),l((function(){t.visible&&g&&g.setPush()})),s((function(){g&&g.setPull()})),i((function(){return t.visible}),(function(e){g&&(e?g.setPush():g.setPull())}),{flush:"post"});var C=function(){var e,t;null===(t=null===(e=m.value)||void 0===e?void 0:e.domFocus)||void 0===t||t.call(e)},j=function(e){a("update:visible",!1),a("close",e)},E=function(e){var n;null===(n=t.afterVisibleChange)||void 0===n||n.call(t,e),a("afterVisibleChange",e)},M=c((function(){return t.destroyOnClose&&!t.visible})),P=function(){M.value&&(t.visible||(b.value=!0))},V=c((function(){var e,n=t.push,a=t.placement;return e="boolean"==typeof n?n?W.distance:0:n.distance,e=parseFloat(String(e||0)),"left"===a||"right"===a?"translateX(".concat("left"===a?e:-e,"px)"):"top"===a||"bottom"===a?"translateY(".concat("top"===a?e:-e,"px)"):null})),A=c((function(){var e=t.visible,n=t.mask,a=t.placement,o=t.size,l=void 0===o?"default":o,r=t.width,i=t.height;if(!e&&!n)return{};var s={};if("left"===a||"right"===a){var c="large"===l?736:378;s.width=void 0===r?c:r,s.width="string"==typeof s.width?s.width:"".concat(s.width,"px")}else{var u="large"===l?736:378;s.height=void 0===i?u:i,s.height="string"==typeof s.height?s.height:"".concat(s.height,"px")}return s})),B=c((function(){var n=t.zIndex,a=t.wrapStyle,o=t.mask,l=t.style,r=o?{}:A.value;return e(e(e({zIndex:n,transform:y.value?V.value:void 0},r),a),l)})),L=function(e){var n=t.closable,a=t.headerStyle,o=T(u,t,"extra"),l=T(u,t,"title");return l||n?v("div",{class:d("".concat(e,"-header"),f({},"".concat(e,"-header-close-only"),n&&!l&&!o)),style:a},[v("div",{class:"".concat(e,"-header-title")},[F(e),l&&v("div",{class:"".concat(e,"-title")},[l])]),o&&v("div",{class:"".concat(e,"-extra")},[o])]):null},F=function(e){var n,a=t.closable,o=u.closeIcon?null===(n=u.closeIcon)||void 0===n?void 0:n.call(u):t.closeIcon;return a&&v("button",{key:"closer",onClick:j,"aria-label":"Close",class:"".concat(e,"-close")},[void 0===o?v(N,null,null):o])},I=function(e){var n=T(u,t,"footer");if(!n)return null;var a="".concat(e,"-footer");return v("div",{class:a,style:t.footerStyle},[n])};return function(){var n;t.width,t.height;var a=t.visible,o=t.placement,l=t.mask,r=t.wrapClassName,i=t.class,s=H(t,["width","height","visible","placement","mask","wrapClassName","class"]),c=l?A.value:{},y=l?"":"no-mask",g=e(e(e(e({},p),h(s,["size","closeIcon","closable","destroyOnClose","drawerStyle","headerStyle","bodyStyle","title","push","wrapStyle","onAfterVisibleChange","onClose","onUpdate:visible"])),c),{onClose:j,afterVisibleChange:E,handler:!1,prefixCls:w.value,open:a,showMask:l,placement:o,class:d((n={},f(n,i,i),f(n,r,!!r),f(n,y,!!y),n)),style:B.value,ref:m});return v(_,g,{handler:t.handle?function(){return t.handle}:u.handle,default:function(){return function(n){var a;if(b.value&&!t.visible)return null;b.value=!1;var o=t.bodyStyle,l=t.drawerStyle,r={};return M.value&&(r.opacity=0,r.transition="opacity .3s"),v("div",{class:"".concat(n,"-wrapper-body"),style:e(e({},r),l),onTransitionend:P},[L(n),v("div",{key:"body",class:"".concat(n,"-body"),style:o},[null===(a=u.default)||void 0===a?void 0:a.call(u)]),I(n)])}(w.value)}})}}}));export{X as D};
