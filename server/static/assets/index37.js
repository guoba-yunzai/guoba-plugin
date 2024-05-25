import{k as e,aC as t,b as n,c as a,w as o,r as i,J as l,I as r,af as s,g6 as c,aB as p,g7 as u,aG as d,_ as v,ak as f,am as y,fz as m,ao as g,au as b,b7 as h,q as C,z as x,aN as w,ba as k,ar as S,at as T,F as j,a6 as O,fj as N,T as E,bP as D,bD as B,g8 as P,fk as z,fx as A,bu as I,U as R,a as M,cf as G,s as L,e as K,o as F,i as _,j as H,f as U,h as $,v as V,O as q,l as W,m as X,V as J,W as Y,d4 as Z,fc as Q,aL as ee}from"./index.js";import{B as te}from"./index21.js";import{T as ne}from"./transButton.js";import{C as ae}from"./CopyOutlined.js";import"./index22.js";var oe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"};function ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){le(e,t,n[t])}))}return e}function le(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var re=function(n,a){var o=ie({},n,a.attrs);return e(t,ie({},o,{icon:oe}),null)};re.displayName="EnterOutlined",re.inheritAttrs=!1;var se,ce=re,pe=n({compatConfig:{MODE:3},name:"Editable",props:{prefixCls:String,value:String,maxlength:Number,autoSize:{type:[Boolean,Object]},onSave:Function,onCancel:Function,onEnd:Function,onChange:Function,originContent:String,direction:String},setup:function(t,n){var u=n.emit,d=n.slots,v=a({current:t.value||"",lastKeyCode:void 0,inComposition:!1,cancelFlag:!1});o((function(){return t.value}),(function(e){v.current=e}));var f=i();function y(e){f.value=e}function m(e){var t=e.target.value;v.current=t.replace(/[\r\n]/g,""),u("change",v.current)}function g(){v.inComposition=!0}function b(){v.inComposition=!1}function h(e){var t=e.keyCode;t===p.ENTER&&e.preventDefault(),v.inComposition||(v.lastKeyCode=t)}function C(e){var n=e.keyCode,a=e.ctrlKey,o=e.altKey,i=e.metaKey,l=e.shiftKey;v.lastKeyCode!==n||v.inComposition||a||o||i||l||(n===p.ENTER?(w(),u("end")):n===p.ESC&&(v.current=t.originContent,u("cancel")))}function x(){w()}function w(){u("save",v.current.trim())}l((function(){if(f.value){var e,t=null===(e=f.value)||void 0===e?void 0:e.resizableTextArea,n=null==t?void 0:t.textArea;n.focus();var a=n.value.length;n.setSelectionRange(a,a)}}));var k=r((function(){var e;return s(e={},"".concat(t.prefixCls),!0),s(e,"".concat(t.prefixCls,"-edit-content"),!0),s(e,"".concat(t.prefixCls,"-rtl"),"rtl"===t.direction),e}));return function(){return e("div",{class:k.value},[e(c,{ref:y,maxlength:t.maxlength,value:v.current,onChange:m,onKeydown:h,onKeyup:C,onCompositionstart:g,onCompositionend:b,onBlur:x,rows:1,autoSize:void 0===t.autoSize||t.autoSize},null),d.enterIcon?d.enterIcon({className:"".concat(t.prefixCls,"-edit-content-confirm")}):e(ce,{class:"".concat(t.prefixCls,"-edit-content-confirm")},null)])}}}),ue={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function de(e,t){e.setAttribute("aria-hidden","true");var n,a=window.getComputedStyle(t),o=(n=a,Array.prototype.slice.apply(n).map((function(e){return"".concat(e,": ").concat(n.getPropertyValue(e),";")})).join(""));e.setAttribute("style",o),e.style.position="fixed",e.style.left="0",e.style.height="auto",e.style.minHeight="auto",e.style.maxHeight="auto",e.style.paddingTop="0",e.style.paddingBottom="0",e.style.borderTopWidth="0",e.style.borderBottomWidth="0",e.style.top="-999999px",e.style.zIndex="-1000",e.style.textOverflow="clip",e.style.whiteSpace="normal",e.style.webkitLineClamp="none"}var ve=function(t,n,a,o,i){se||((se=document.createElement("div")).setAttribute("aria-hidden","true"),document.body.appendChild(se));var l=n.rows,r=n.suffix,s=void 0===r?"":r,c=function(e){var t=document.createElement("div");de(t,e),t.appendChild(document.createTextNode("text")),document.body.appendChild(t);var n=t.getBoundingClientRect().height;return document.body.removeChild(t),n}(t),p=Math.round(c*l*100)/100;de(se,t);var d=u({render:function(){return e("div",{style:ue},[e("span",{style:ue},[a,s]),e("span",{style:ue},[o])])}});function v(){return Math.round(100*se.getBoundingClientRect().height)/100-.1<=p}if(d.mount(se),v())return d.unmount(),{content:a,text:se.innerHTML,ellipsis:!1};var f=Array.prototype.slice.apply(se.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter((function(e){var t=e.nodeType,n=e.data;return 8!==t&&""!==n})),y=Array.prototype.slice.apply(se.childNodes[0].childNodes[1].cloneNode(!0).childNodes);d.unmount();var m=[];se.innerHTML="";var g=document.createElement("span");se.appendChild(g);var b=document.createTextNode(i+s);function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.length,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=Math.floor((n+a)/2),l=t.slice(0,i);if(e.textContent=l,n>=a-1)for(var r=a;r>=n;r-=1){var s=t.slice(0,r);if(e.textContent=s,v()||!s)return r===t.length?{finished:!1,vNode:t}:{finished:!0,vNode:s}}return v()?h(e,t,i,a,i):h(e,t,n,i,o)}function C(e){var t;if(3===e.nodeType){var n=e.textContent||"",a=document.createTextNode(n);return t=a,g.insertBefore(t,b),h(a,n)}return{finished:!1,vNode:null}}return g.appendChild(b),y.forEach((function(e){se.appendChild(e)})),f.some((function(e){var t=C(e),n=t.finished,a=t.vNode;return a&&m.push(a),n})),{content:m,text:se.innerHTML,ellipsis:!0}},fe=["prefixCls","class","direction","component"],ye=n({name:"ATypography",inheritAttrs:!1,props:{prefixCls:String,direction:String,component:String},setup:function(t,n){var a=n.slots,o=n.attrs,i=d("typography",t),l=i.prefixCls,r=i.direction;return function(){var n,i=v(v({},t),o);i.prefixCls,i.class,i.direction;var c=i.component,p=void 0===c?"article":c,u=f(i,fe);return e(p,v({class:y(l.value,s({},"".concat(l.value,"-rtl"),"rtl"===r.value),o.class)},u),{default:function(){return[null===(n=a.default)||void 0===n?void 0:n.call(a)]}})}}}),me=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],a=0;a<e.rangeCount;a++)n.push(e.getRangeAt(a));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}},ge={"text/plain":"Text","text/html":"Url",default:"Text"};function be(e,t){var n,a,o,i,l,r=!1;t||(t={});var s=t.debug||!1;try{if(a=me(),o=document.createRange(),i=document.getSelection(),(l=document.createElement("span")).textContent=e,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",(function(n){if(n.stopPropagation(),t.format)if(n.preventDefault(),void 0===n.clipboardData){s&&console.warn("unable to use e.clipboardData"),s&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=ge[t.format]||ge.default;window.clipboardData.setData(a,e)}else n.clipboardData.clearData(),n.clipboardData.setData(t.format,e);t.onCopy&&(n.preventDefault(),t.onCopy(n.clipboardData))})),document.body.appendChild(l),o.selectNodeContents(l),i.addRange(o),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");r=!0}catch(c){s&&console.error("unable to copy using execCommand: ",c),s&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),r=!0}catch(p){s&&console.error("unable to copy using clipboardData: ",p),s&&console.error("falling back to prompt"),n=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(n,e)}}finally{i&&("function"==typeof i.removeRange?i.removeRange(o):i.removeAllRanges()),l&&document.body.removeChild(l),a()}return r}var he={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"};function Ce(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){xe(e,t,n[t])}))}return e}function xe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var we=function(n,a){var o=Ce({},n,a.attrs);return e(t,Ce({},o,{icon:he}),null)};we.displayName="EditOutlined",we.inheritAttrs=!1;var ke=we,Se=["type","disabled","content","class","style"],Te=m("webkitLineClamp"),je=m("textOverflow"),Oe=function(){return{editable:{type:[Boolean,Object],default:void 0},copyable:{type:[Boolean,Object],default:void 0},prefixCls:String,component:String,type:String,disabled:{type:Boolean,default:void 0},ellipsis:{type:[Boolean,Object],default:void 0},code:{type:Boolean,default:void 0},mark:{type:Boolean,default:void 0},underline:{type:Boolean,default:void 0},delete:{type:Boolean,default:void 0},strong:{type:Boolean,default:void 0},keyboard:{type:Boolean,default:void 0},content:String,"onUpdate:content":Function}},Ne=n({compatConfig:{MODE:3},name:"Base",inheritAttrs:!1,props:Oe(),setup:function(t,n){var c=n.slots,p=n.attrs,u=n.emit,y=d("typography",t),m=y.prefixCls,P=y.direction,z=a({copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1,expandStr:"",copyStr:"",copiedStr:"",editStr:"",copyId:void 0,rafId:void 0,prevProps:void 0,originContent:""}),A=i(),I=i(),R=r((function(){var e=t.ellipsis;return e?v({rows:1,expandable:!1},"object"===g(e)?e:null):{}}));function M(e){var t=R.value.onExpand;z.expanded=!0,null==t||t(e)}function G(e){e.preventDefault(),z.originContent=t.content,W(!0)}function L(e){K(e),W(!1)}function K(e){var n=H.value.onChange;e!==t.content&&(u("update:content",e),null==n||n(e))}function F(){var e,t;null===(e=(t=H.value).onCancel)||void 0===e||e.call(t),W(!1)}function _(e){e.preventDefault(),e.stopPropagation();var n,a,o=t.copyable,i=v({},"object"===g(o)?o:null);void 0===i.text&&(i.text=t.ellipsis||t.editable?t.content:null===(n=A.value)||void 0===n||null===(a=n.$el)||void 0===a?void 0:a.innerText),be(i.text||""),z.copied=!0,C((function(){i.onCopy&&i.onCopy(),z.copyId=setTimeout((function(){z.copied=!1}),3e3)}))}l((function(){z.clientRendered=!0})),b((function(){clearTimeout(z.copyId),h.cancel(z.rafId)})),o([function(){return R.value.rows},function(){return t.content}],(function(){C((function(){X()}))}),{flush:"post",deep:!0,immediate:!0}),x((function(){void 0===t.content&&(w(!t.editable,"Typography","When `editable` is enabled, please use `content` instead of children"),w(!t.ellipsis,"Typography","When `ellipsis` is enabled, please use `content` instead of children"))}));var H=r((function(){var e=t.editable;return e?v({},"object"===g(e)?e:null):{editing:!1}})),U=k(!1,{value:r((function(){return H.value.editing}))}),$=S(U,2),V=$[0],q=$[1];function W(e){var t=H.value.onStart;e&&t&&t(),q(e)}function X(){h.cancel(z.rafId),z.rafId=h((function(){Y()}))}o(V,(function(e){var t;e||(null===(t=I.value)||void 0===t||t.focus())}),{flush:"post"});var J=r((function(){var e=R.value,n=e.rows,a=e.expandable,o=e.suffix,i=e.onEllipsis,l=e.tooltip;return!o&&!l&&(!(t.editable||t.copyable||a||i)&&(1===n?je:Te))})),Y=function(){var e,n,a=z.ellipsisText,o=z.isEllipsis,i=R.value,l=i.rows,r=i.suffix,s=i.onEllipsis;if(l&&!(l<0)&&null!==(e=A.value)&&void 0!==e&&e.$el&&!z.expanded&&void 0!==t.content&&!J.value){var c=ve(null===(n=A.value)||void 0===n?void 0:n.$el,{rows:l,suffix:r},t.content,te(!0),"..."),p=c.content,u=c.text,d=c.ellipsis;a===u&&z.isEllipsis===d||(z.ellipsisText=u,z.ellipsisContent=p,z.isEllipsis=d,o!==d&&s&&s(d))}};function Z(t){var n=R.value,a=n.expandable,o=n.symbol;if(!a)return null;if(!t&&(z.expanded||!z.isEllipsis))return null;var i=(c.ellipsisSymbol?c.ellipsisSymbol():o)||z.expandStr;return e("a",{key:"expand",class:"".concat(m.value,"-expand"),onClick:M,"aria-label":z.expandStr},[i])}function Q(){if(t.editable){var n=t.editable,a=n.tooltip,o=n.triggerType,i=void 0===o?["icon"]:o,l=c.editableIcon?c.editableIcon():e(ke,{role:"button"},null),r=c.editableTooltip?c.editableTooltip():z.editStr,s="string"==typeof r?r:"";return-1!==i.indexOf("icon")?e(E,{key:"edit",title:!1===a?"":r},{default:function(){return[e(ne,{ref:I,class:"".concat(m.value,"-edit"),onClick:G,"aria-label":s},{default:function(){return[l]}})]}}):null}}function ee(){if(t.copyable){var n=t.copyable.tooltip,a=z.copied?z.copiedStr:z.copyStr,o=c.copyableTooltip?c.copyableTooltip({copied:z.copied}):a,i="string"==typeof o?o:"",l=z.copied?e(B,null,null):e(ae,null,null),r=c.copyableIcon?c.copyableIcon({copied:!!z.copied}):l;return e(E,{key:"copy",title:!1===n?"":o},{default:function(){return[e(ne,{class:["".concat(m.value,"-copy"),s({},"".concat(m.value,"-copy-success"),z.copied)],onClick:_,"aria-label":i},{default:function(){return[r]}})]}})}}function te(e){return[Z(e),Q(),ee()].filter((function(e){return e}))}return function(){var n,a,o,i,l,r,u,d=H.value.triggerType,y=void 0===d?["icon"]:d,g=t.ellipsis||t.editable?void 0!==t.content?t.content:null===(n=c.default)||void 0===n?void 0:n.call(c):c.default?c.default():t.content;return V.value?(a=p.class,o=p.style,i=H.value,l=i.maxlength,r=i.autoSize,u=i.onEnd,e(pe,{class:a,style:o,prefixCls:m.value,value:t.content,originContent:z.originContent,maxlength:l,autoSize:r,onSave:L,onChange:K,onCancel:F,onEnd:u,direction:P.value},{enterIcon:c.editableEnterIcon})):e(D,{componentName:"Text",children:function(n){var a,o=v(v({},t),p),i=o.type,l=o.disabled;o.content;var r=o.class,u=o.style,d=f(o,Se),b=R.value,h=b.rows,C=b.suffix,x=b.tooltip,w=n.edit,k=n.copy,S=n.copied,D=n.expand;z.editStr=w,z.copyStr=k,z.copiedStr=S,z.expandStr=D;var B=T(d,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard","onUpdate:content"]),I=J.value,M=1===h&&I,L=h&&h>1&&I,K=g;if(h&&z.isEllipsis&&!z.expanded&&!I){var F,_=d.title,H=_||"";_||"string"!=typeof g&&"number"!=typeof g||(H=String(g)),H=null===(F=H)||void 0===F?void 0:F.slice(String(z.ellipsisContent||"").length),K=e(j,null,[O(z.ellipsisContent),e("span",{title:H,"aria-hidden":"true"},["..."]),C])}else K=e(j,null,[g,C]);K=function(t,n){var a=t.mark,o=t.code,i=t.underline,l=t.delete,r=t.strong,s=t.keyboard,c=n;function p(t,n){if(t){var a=c;c=e(n,null,{default:function(){return[a]}})}}return p(r,"strong"),p(i,"u"),p(l,"del"),p(o,"code"),p(a,"mark"),p(s,"kbd"),c}(t,K);var U=x&&h&&z.isEllipsis&&!z.expanded&&!I,$=c.ellipsisTooltip?c.ellipsisTooltip():x;return e(N,{onResize:X,disabled:!h},{default:function(){return[e(ye,v({ref:A,class:[(a={},s(a,"".concat(m.value,"-").concat(i),i),s(a,"".concat(m.value,"-disabled"),l),s(a,"".concat(m.value,"-ellipsis"),h),s(a,"".concat(m.value,"-single-line"),1===h&&!z.isEllipsis),s(a,"".concat(m.value,"-ellipsis-single-line"),M),s(a,"".concat(m.value,"-ellipsis-multiple-line"),L),a),r],style:v(v({},u),{},{WebkitLineClamp:L?h:void 0}),"aria-label":undefined,direction:P.value,onClick:-1!==y.indexOf("text")?G:function(){}},B),{default:function(){return[U?e(E,{title:!0===x?g:$},{default:function(){return[e("span",null,[K])]}}):K,te()]}})]}})}},null)}}}),Ee=["ellipsis","rel"],De=function(t,n){var a=n.slots,o=n.attrs,i=v(v({},t),o),l=i.ellipsis,r=i.rel,s=f(i,Ee);w("object"!==g(l),"Typography.Link","`ellipsis` only supports boolean value.");var c=v(v({},s),{},{rel:void 0===r&&"_blank"===s.target?"noopener noreferrer":r,ellipsis:!!l,component:"a"});return delete c.navigate,e(Ne,c,a)};De.displayName="ATypographyLink",De.inheritAttrs=!1,De.props=T(v(v({},Oe()),{},{ellipsis:{type:Boolean,default:void 0}}),["component"]);var Be=De,Pe=function(t,n){var a=n.slots,o=n.attrs,i=v(v({},t),{},{component:"div"},o);return e(Ne,i,a)};Pe.displayName="ATypographyParagraph",Pe.inheritAttrs=!1,Pe.props=T(Oe(),["component"]);var ze=Pe,Ae=function(t,n){var a=n.slots,o=n.attrs,i=t.ellipsis;w("object"!==g(i)||!i||!("expandable"in i)&&!("rows"in i),"Typography.Text","`ellipsis` do not support `expandable` or `rows` props.");var l=v(v({},t),{},{ellipsis:i&&"object"===g(i)?T(i,["expandable","rows"]):i,component:"span"},o);return e(Ne,l,a)};Ae.displayName="ATypographyText",Ae.inheritAttrs=!1,Ae.props=v(v({},T(Oe(),["component"])),{},{ellipsis:{type:[Boolean,Object],default:void 0}});var Ie=Ae,Re=["level"],Me=P(1,2,3,4,5),Ge=function(t,n){var a,o=n.slots,i=n.attrs,l=t.level,r=void 0===l?1:l,s=f(t,Re);-1!==Me.indexOf(r)?a="h".concat(r):(w(!1,"Typography","Title only accept `1 | 2 | 3 | 4 | 5` as `level` value."),a="h1");var c=v(v({},s),{},{component:a},i);return e(Ne,c,o)};Ge.displayName="ATypographyTitle",Ge.inheritAttrs=!1,Ge.props=v(v({},T(Oe(),["component","strong"])),{},{level:Number});var Le=Ge;ye.Text=Ie,ye.Title=Le,ye.Paragraph=ze,ye.Link=Be,ye.Base=Ne,ye.install=function(e){return e.component(ye.name,ye),e.component(ye.Text.displayName,Ie),e.component(ye.Title.displayName,Le),e.component(ye.Paragraph.displayName,ze),e.component(ye.Link.displayName,Be),e};var Ke={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"}}]},name:"bell",theme:"outlined"};function Fe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){_e(e,t,n[t])}))}return e}function _e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var He=function(n,a){var o=Fe({},n,a.attrs);return e(t,Fe({},o,{icon:Ke}),null)};He.displayName="BellOutlined",He.inheritAttrs=!1;var Ue=He;const $e=[{key:"1",name:"通知",list:[{id:"000000001",avatar:"https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",title:"你收到了 14 份新周报",description:"",datetime:"2017-08-09",type:"1"},{id:"000000002",avatar:"https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",title:"你推荐的 曲妮妮 已通过第三轮面试",description:"",datetime:"2017-08-08",type:"1"},{id:"000000003",avatar:"https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",title:"这种模板可以区分多种通知类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000004",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000005",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"标题可以设置自动显示省略号，本例中标题行数已设为1行，如果内容超过1行将自动截断并支持tooltip显示完整标题。",description:"",datetime:"2017-08-07",type:"1"},{id:"000000006",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000007",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000008",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000009",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"},{id:"000000010",avatar:"https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",title:"左侧图标用于区分不同的类型",description:"",datetime:"2017-08-07",type:"1"}]},{key:"2",name:"消息",list:[{id:"000000006",avatar:"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",title:"曲丽丽 评论了你",description:"描述信息描述信息描述信息",datetime:"2017-08-07",type:"2",clickClose:!0},{id:"000000007",avatar:"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",title:"朱偏右 回复了你",description:"这种模板用于提醒谁与你发生了互动",datetime:"2017-08-07",type:"2",clickClose:!0},{id:"000000008",avatar:"https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",title:"标题",description:"请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容",datetime:"2017-08-07",type:"2",clickClose:!0}]},{key:"3",name:"待办",list:[{id:"000000009",avatar:"",title:"任务名称",description:"任务需要在 2017-01-12 20:00 前启动",datetime:"",extra:"未开始",color:"",type:"3"},{id:"000000010",avatar:"",title:"第三方紧急代码变更",description:"冠霖 需在 2017-01-07 前完成代码变更任务",datetime:"",extra:"马上到期",color:"red",type:"3"},{id:"000000011",avatar:"",title:"信息安全考试",description:"指派竹尔于 2017-01-09 前完成更新并发布",datetime:"",extra:"已耗时 8 天",color:"gold",type:"3"},{id:"000000012",avatar:"",title:"ABCD 版本发布",description:"指派竹尔于 2017-01-09 前完成更新并发布",datetime:"",extra:"进行中",color:"blue",type:"3"}]}];const Ve=n({components:{[z.name]:z,[A.name]:A,[A.Item.name]:A.Item,AListItemMeta:A.Item.Meta,ATypographyParagraph:ye.Paragraph,[I.name]:I},props:{list:{type:Array,default:()=>[]},pageSize:{type:[Boolean,Number],default:5},currentPage:{type:Number,default:1},titleRows:{type:Number,default:1},descRows:{type:Number,default:2},onTitleClick:{type:Function}},emits:["update:currentPage"],setup(e,{emit:t}){const{prefixCls:n}=R("header-notify-list"),a=i(e.currentPage||1),l=r((()=>{const{pageSize:t,list:n}=e;if(!1===t)return[];let o=G(t)?t:5;return n.slice(o*(L(a)-1),o*L(a))}));o((()=>e.currentPage),(e=>{a.value=e}));const s=r((()=>!!e.onTitleClick));return{prefixCls:n,getPagination:r((()=>{const{list:n,pageSize:o}=e;return!!(o>0&&n&&n.length>o)&&{total:n.length,pageSize:o,current:L(a),onChange(e){a.value=e,t("update:currentPage",e)}}})),getData:l,handleTitleClick:function(t){e.onTitleClick&&e.onTitleClick(t)},isTitleClickable:s}}}),qe={class:"title"},We={key:0,class:"extra"},Xe={key:1},Je={key:0,class:"description"},Ye={class:"datetime"};var Ze=M(Ve,[["render",function(t,n,a,o,i,l){const r=K("a-typography-paragraph"),s=K("a-tag"),c=K("a-avatar"),p=K("a-list-item-meta"),u=K("a-list-item"),d=K("a-list");return F(),_(d,{class:Y(t.prefixCls),bordered:"",pagination:t.getPagination},{default:H((()=>[(F(!0),U(j,null,$(t.getData,(n=>(F(),_(u,{key:n.id,class:"list-item"},{default:H((()=>[e(p,null,{title:H((()=>[V("div",qe,[e(r,{onClick:e=>t.handleTitleClick(n),style:q([{width:"100%","margin-bottom":"0 !important"},{cursor:t.isTitleClickable?"pointer":""}]),delete:!!n.titleDelete,ellipsis:!!(t.$props.titleRows&&t.$props.titleRows>0)&&{rows:t.$props.titleRows,tooltip:!!n.title},content:n.title},null,8,["onClick","style","delete","ellipsis","content"]),n.extra?(F(),U("div",We,[e(s,{class:"tag",color:n.color},{default:H((()=>[W(X(n.extra),1)])),_:2},1032,["color"])])):J("",!0)])])),avatar:H((()=>[n.avatar?(F(),_(c,{key:0,class:"avatar",src:n.avatar},null,8,["src"])):(F(),U("span",Xe,X(n.avatar),1))])),description:H((()=>[V("div",null,[n.description?(F(),U("div",Je,[e(r,{style:{width:"100%","margin-bottom":"0 !important"},ellipsis:!!(t.$props.descRows&&t.$props.descRows>0)&&{rows:t.$props.descRows,tooltip:!!n.description},content:n.description},null,8,["ellipsis","content"])])):J("",!0),V("div",Ye,X(n.datetime),1)])])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["class","pagination"])}],["__scopeId","data-v-38565d80"]]);const Qe=n({components:{Popover:Z,BellOutlined:Ue,Tabs:Q,TabPane:Q.TabPane,Badge:te,NoticeList:Ze},setup(){const{prefixCls:e}=R("header-notify"),{createMessage:t}=ee();return{prefixCls:e,listData:i($e),count:r((()=>{let e=0;for(let t=0;t<$e.length;t++)e+=$e[t].list.length;return e})),onNoticeClick:function(e){t.success("你点击了通知，ID="+e.id),e.titleDelete=!e.titleDelete},numberStyle:{}}}}),et={key:0};var tt=M(Qe,[["render",function(t,n,a,o,i,l){const r=K("BellOutlined"),s=K("Badge"),c=K("NoticeList"),p=K("TabPane"),u=K("Tabs"),d=K("Popover");return F(),U("div",{class:Y(t.prefixCls)},[e(d,{title:"",trigger:"click",overlayClassName:`${t.prefixCls}__overlay`},{content:H((()=>[e(u,null,{default:H((()=>[(F(!0),U(j,null,$(t.listData,(e=>(F(),_(p,{key:e.key},{tab:H((()=>[W(X(e.name)+" ",1),0!==e.list.length?(F(),U("span",et,"("+X(e.list.length)+")",1)):J("",!0)])),default:H((()=>["1"===e.key?(F(),_(c,{key:0,list:e.list,onTitleClick:t.onNoticeClick},null,8,["list","onTitleClick"])):(F(),_(c,{key:1,list:e.list},null,8,["list"]))])),_:2},1024)))),128))])),_:1})])),default:H((()=>[e(s,{count:t.count,dot:"",numberStyle:t.numberStyle},{default:H((()=>[e(r)])),_:1},8,["count","numberStyle"])])),_:1},8,["overlayClassName"])],2)}]]);export{tt as default};
