var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,r=(t,n,l)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[n]=l,s=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&r(e,n,t[n]);if(l)for(var n of l(t))a.call(t,n)&&r(e,n,t[n]);return e},c=(e,l)=>t(e,n(l));import{k as i,E as u,af as p,r as d,F as f,ba as v,e0 as y,e1 as b,_ as m,a0 as S,b as x,D as h,cG as g,e2 as O,H as C,ak as j,ae as w,ao as P,v as D,e3 as k,O as E,W as I,C as W,bQ as z,bC as B,x as M,bG as A,c2 as L,e4 as N,c1 as $,bF as F,t as G,aC as H,ck as Q,bY as Y}from"./index.js";import{g as _}from"./get.js";function q(e){return null!=e}var J=function(e){var t,n=e.itemPrefixCls,l=e.component,o=e.span,a=e.labelStyle,r=e.contentStyle,s=e.bordered,c=e.label,p=e.content,d=e.colon,f=l;return s?i(f,{class:[(t={},u(t,"".concat(n,"-item-label"),q(c)),u(t,"".concat(n,"-item-content"),q(p)),t)],colSpan:o},{default:function(){return[q(c)&&i("span",{style:a},[c]),q(p)&&i("span",{style:r},[p])]}}):i(f,{class:["".concat(n,"-item")],colSpan:o},{default:function(){return[i("div",{class:"".concat(n,"-item-container")},[c&&i("span",{class:["".concat(n,"-item-label"),u({},"".concat(n,"-item-no-colon"),!d)],style:a},[c]),p&&i("span",{class:"".concat(n,"-item-content"),style:r},[p])])]}})},K=function(e){var t=function(e,t,n){var l=t.colon,o=t.prefixCls,a=t.bordered,r=n.component,s=n.type,c=n.showLabel,u=n.showContent,p=n.labelStyle,d=n.contentStyle;return e.map((function(e,t){var n,f,S=e.props||{},x=S.prefixCls,h=void 0===x?o:x,g=S.span,O=void 0===g?1:g,C=S.labelStyle,j=S.contentStyle,w=S.label,P=void 0===w?null===(f=null===(n=e.children)||void 0===n?void 0:n.label)||void 0===f?void 0:f.call(n):w,D=v(e),k=y(e),E=b(e),I=e.key;return"string"==typeof r?i(J,{key:"".concat(s,"-").concat(String(I)||t),class:k,style:E,labelStyle:m(m({},p.value),C),contentStyle:m(m({},d.value),j),span:O,colon:l,component:r,itemPrefixCls:h,bordered:a,label:c?P:null,content:u?D:null},null):[i(J,{key:"label-".concat(String(I)||t),class:k,style:m(m(m({},p.value),E),C),span:1,colon:l,component:r[0],itemPrefixCls:h,bordered:a,label:P},null),i(J,{key:"content-".concat(String(I)||t),class:k,style:m(m(m({},d.value),E),j),span:2*O-1,component:r[1],itemPrefixCls:h,bordered:a,content:D},null)]}))},n=e.prefixCls,l=e.vertical,o=e.row,a=e.index,r=e.bordered,s=p(V,{labelStyle:d({}),contentStyle:d({})}),c=s.labelStyle,u=s.contentStyle;return l?i(f,null,[i("tr",{key:"label-".concat(a),class:"".concat(n,"-row")},[t(o,e,{component:"th",type:"label",showLabel:!0,labelStyle:c,contentStyle:u})]),i("tr",{key:"content-".concat(a),class:"".concat(n,"-row")},[t(o,e,{component:"td",type:"content",showContent:!0,labelStyle:c,contentStyle:u})])]):i("tr",{key:a,class:"".concat(n,"-row")},[t(o,e,{component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0,labelStyle:c,contentStyle:u})])};S.any;var R=x({name:"ADescriptionsItem",props:{prefixCls:String,label:S.any,labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0},span:{type:Number,default:1}},slots:["label"],setup:function(e,t){var n=t.slots;return function(){var e;return null===(e=n.default)||void 0===e?void 0:e.call(n)}}}),T={xxxl:3,xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function U(e,t,n){var l=e;return(void 0===t||t>n)&&(l=I(e,{span:n}),W(void 0===t,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),l}var V=Symbol("descriptionsContext"),X=x({name:"ADescriptions",props:{prefixCls:String,bordered:{type:Boolean,default:void 0},size:{type:String,default:"default"},title:S.any,extra:S.any,column:{type:[Number,Object],default:function(){return T}},layout:String,colon:{type:Boolean,default:void 0},labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0}},slots:["title","extra"],Item:R,setup:function(e,t){var n,l=t.slots,o=h("descriptions",e),a=o.prefixCls,r=o.direction,s=d({});g((function(){n=O.subscribe((function(t){"object"===C(e.column)&&(s.value=t)}))})),j((function(){O.unsubscribe(n)})),w(V,{labelStyle:P(e,"labelStyle"),contentStyle:P(e,"contentStyle")});var c=D((function(){return function(e,t){if("number"==typeof e)return e;if("object"===C(e))for(var n=0;n<k.length;n++){var l=k[n];if(t[l]&&void 0!==e[l])return e[l]||T[l]}return 3}(e.column,s.value)}));return function(){var t,n,o,s,p=e.size,d=e.bordered,f=void 0!==d&&d,v=e.layout,y=void 0===v?"horizontal":v,b=e.colon,m=void 0===b||b,S=e.title,x=void 0===S?null===(n=l.title)||void 0===n?void 0:n.call(l):S,h=e.extra,g=void 0===h?null===(o=l.extra)||void 0===o?void 0:o.call(l):h,O=function(e,t){var n=E(e),l=[],o=[],a=t;return n.forEach((function(e,r){var s,c=null===(s=e.props)||void 0===s?void 0:s.span,i=c||1;if(r===n.length-1)return o.push(U(e,c,a)),void l.push(o);i<a?(a-=i,o.push(e)):(o.push(U(e,i,a)),l.push(o),a=t,o=[])})),l}(null===(s=l.default)||void 0===s?void 0:s.call(l),c.value);return i("div",{class:[a.value,(t={},u(t,"".concat(a.value,"-").concat(p),"default"!==p),u(t,"".concat(a.value,"-bordered"),!!f),u(t,"".concat(a.value,"-rtl"),"rtl"===r.value),t)]},[(x||g)&&i("div",{class:"".concat(a.value,"-header")},[x&&i("div",{class:"".concat(a.value,"-title")},[x]),g&&i("div",{class:"".concat(a.value,"-extra")},[g])]),i("div",{class:"".concat(a.value,"-view")},[i("table",null,[i("tbody",null,[O.map((function(e,t){return i(K,{key:t,index:t,colon:m,prefixCls:a.value,vertical:"vertical"===y,bordered:f,row:e},null)}))])])])])}}});X.install=function(e){return e.component(X.name,X),e.component(X.Item.name,X.Item),e};var Z=X;function ee(e){if(!H())throw new Error("useDescription() can only be used inside setup() or functional components!");const t=d(null),n=d(!1);return[function(l){M(n)&&Q()||(t.value=l,e&&l.setDescProps(e),n.value=!0)},{setDescProps:e=>{var n;null==(n=M(t))||n.setDescProps(e)}}]}const te=Y(x({name:"Description",props:{useCollapse:{type:Boolean,default:!0},title:{type:String,default:""},size:{type:String,validator:e=>["small","default","middle",void 0].includes(e),default:"small"},bordered:{type:Boolean,default:!0},column:{type:[Number,Object],default:()=>({xxl:4,xl:3,lg:3,md:3,sm:2,xs:1})},collapseOptions:{type:Object,default:null},schema:{type:Array,default:()=>[]},data:{type:Object}},emits:["register"],setup(e,{slots:t,emit:n}){const l=d(null),{prefixCls:o}=z("description"),a=B(),r=D((()=>s(s({},e),M(l)))),u=D((()=>c(s({},M(r)),{title:void 0}))),p=D((()=>!!M(r).title)),f=D((()=>s({canExpand:!1},M(u).collapseOptions))),v=D((()=>s(s({},M(a)),M(u))));function y({label:e,labelMinWidth:t,labelStyle:n}){if(!n&&!t)return e;const l=c(s({},n),{minWidth:`${t}px `});return i("div",{style:l},[e])}const b=()=>{let e;return i(Z,A({class:`${o}`},M(v)),"function"==typeof(t=e=function(){const{schema:e,data:t}=M(u);return M(e).map((e=>{const{render:n,field:l,span:o,show:a,contentMinWidth:r}=e;if(a&&F(a)&&!a(t))return null;const s=()=>{var e;const t=null==(e=M(u))?void 0:e.data;if(!t)return null;const o=_(t,l);return o&&!G(t).hasOwnProperty(l)?F(n)?n("",t):"":F(n)?n(o,t):null!=o?o:""},c=r;return i(Z.Item,{label:y(e),key:l,span:o},{default:()=>r?i("div",{style:{minWidth:`${c}px`}},[s()]):s()})})).filter((e=>!!e))}())||"[object Object]"===Object.prototype.toString.call(t)&&!$(t)?e:{default:()=>[e]});var t};return n("register",{setDescProps:function(e){l.value=s(s({},M(l)),e)}}),()=>M(p)?(()=>{const n=e.useCollapse?b():i("div",null,[b()]);if(!e.useCollapse)return n;const{canExpand:l,helpMessage:o}=M(f),{title:a}=M(r);return i(N,{title:a,canExpan:l,helpMessage:o},{default:()=>n,action:()=>L(t,"action")})})():b()}}));export{te as D,ee as u};
