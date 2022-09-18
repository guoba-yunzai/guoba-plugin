var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,r=(t,n,l)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[n]=l,s=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&r(e,n,t[n]);if(l)for(var n of l(t))a.call(t,n)&&r(e,n,t[n]);return e},c=(e,l)=>t(e,n(l));import{k as i,E as u,af as p,r as d,F as f,b9 as v,e2 as y,e3 as b,_ as m,a0 as S,b as x,D as h,cH as g,e4 as O,H as j,ak as w,ae as C,ao as D,v as P,e5 as k,O as E,W as I,C as B,bR as W,bD as z,x as M,bH as A,c3 as H,e6 as L,c2 as N,bG as $,t as F,aB as G,cl as R,bZ as Z}from"./index.js";import{g as _}from"./get.js";function q(e){return null!=e}var J=function(e){var t,n=e.itemPrefixCls,l=e.component,o=e.span,a=e.labelStyle,r=e.contentStyle,s=e.bordered,c=e.label,p=e.content,d=e.colon,f=l;return s?i(f,{class:[(t={},u(t,"".concat(n,"-item-label"),q(c)),u(t,"".concat(n,"-item-content"),q(p)),t)],colSpan:o},{default:function(){return[q(c)&&i("span",{style:a},[c]),q(p)&&i("span",{style:r},[p])]}}):i(f,{class:["".concat(n,"-item")],colSpan:o},{default:function(){return[i("div",{class:"".concat(n,"-item-container")},[c&&i("span",{class:["".concat(n,"-item-label"),u({},"".concat(n,"-item-no-colon"),!d)],style:a},[c]),p&&i("span",{class:"".concat(n,"-item-content"),style:r},[p])])]}})},K=function(e){var t=function(e,t,n){var l=t.colon,o=t.prefixCls,a=t.bordered,r=n.component,s=n.type,c=n.showLabel,u=n.showContent,p=n.labelStyle,d=n.contentStyle;return e.map((function(e,t){var n,f,S=e.props||{},x=S.prefixCls,h=void 0===x?o:x,g=S.span,O=void 0===g?1:g,j=S.labelStyle,w=S.contentStyle,C=S.label,D=void 0===C?null===(f=null===(n=e.children)||void 0===n?void 0:n.label)||void 0===f?void 0:f.call(n):C,P=v(e),k=y(e),E=b(e),I=e.key;return"string"==typeof r?i(J,{key:"".concat(s,"-").concat(String(I)||t),class:k,style:E,labelStyle:m(m({},p.value),j),contentStyle:m(m({},d.value),w),span:O,colon:l,component:r,itemPrefixCls:h,bordered:a,label:c?D:null,content:u?P:null},null):[i(J,{key:"label-".concat(String(I)||t),class:k,style:m(m(m({},p.value),E),j),span:1,colon:l,component:r[0],itemPrefixCls:h,bordered:a,label:D},null),i(J,{key:"content-".concat(String(I)||t),class:k,style:m(m(m({},d.value),E),w),span:2*O-1,component:r[1],itemPrefixCls:h,bordered:a,content:P},null)]}))},n=e.prefixCls,l=e.vertical,o=e.row,a=e.index,r=e.bordered,s=p(V,{labelStyle:d({}),contentStyle:d({})}),c=s.labelStyle,u=s.contentStyle;return l?i(f,null,[i("tr",{key:"label-".concat(a),class:"".concat(n,"-row")},[t(o,e,{component:"th",type:"label",showLabel:!0,labelStyle:c,contentStyle:u})]),i("tr",{key:"content-".concat(a),class:"".concat(n,"-row")},[t(o,e,{component:"td",type:"content",showContent:!0,labelStyle:c,contentStyle:u})])]):i("tr",{key:a,class:"".concat(n,"-row")},[t(o,e,{component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0,labelStyle:c,contentStyle:u})])};S.any;var Q=x({name:"ADescriptionsItem",props:{prefixCls:String,label:S.any,labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0},span:{type:Number,default:1}},slots:["label"],setup:function(e,t){var n=t.slots;return function(){var e;return null===(e=n.default)||void 0===e?void 0:e.call(n)}}}),T={xxxl:3,xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function U(e,t,n){var l=e;return(void 0===t||t>n)&&(l=I(e,{span:n}),B(void 0===t,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),l}var V=Symbol("descriptionsContext"),X=x({name:"ADescriptions",props:{prefixCls:String,bordered:{type:Boolean,default:void 0},size:{type:String,default:"default"},title:S.any,extra:S.any,column:{type:[Number,Object],default:function(){return T}},layout:String,colon:{type:Boolean,default:void 0},labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0}},slots:["title","extra"],Item:Q,setup:function(e,t){var n,l=t.slots,o=h("descriptions",e),a=o.prefixCls,r=o.direction,s=d({});g((function(){n=O.subscribe((function(t){"object"===j(e.column)&&(s.value=t)}))})),w((function(){O.unsubscribe(n)})),C(V,{labelStyle:D(e,"labelStyle"),contentStyle:D(e,"contentStyle")});var c=P((function(){return function(e,t){if("number"==typeof e)return e;if("object"===j(e))for(var n=0;n<k.length;n++){var l=k[n];if(t[l]&&void 0!==e[l])return e[l]||T[l]}return 3}(e.column,s.value)}));return function(){var t,n,o,s,p=e.size,d=e.bordered,f=void 0!==d&&d,v=e.layout,y=void 0===v?"horizontal":v,b=e.colon,m=void 0===b||b,S=e.title,x=void 0===S?null===(n=l.title)||void 0===n?void 0:n.call(l):S,h=e.extra,g=void 0===h?null===(o=l.extra)||void 0===o?void 0:o.call(l):h,O=function(e,t){var n=E(e),l=[],o=[],a=t;return n.forEach((function(e,r){var s,c=null===(s=e.props)||void 0===s?void 0:s.span,i=c||1;if(r===n.length-1)return o.push(U(e,c,a)),void l.push(o);i<a?(a-=i,o.push(e)):(o.push(U(e,i,a)),l.push(o),a=t,o=[])})),l}(null===(s=l.default)||void 0===s?void 0:s.call(l),c.value);return i("div",{class:[a.value,(t={},u(t,"".concat(a.value,"-").concat(p),"default"!==p),u(t,"".concat(a.value,"-bordered"),!!f),u(t,"".concat(a.value,"-rtl"),"rtl"===r.value),t)]},[(x||g)&&i("div",{class:"".concat(a.value,"-header")},[x&&i("div",{class:"".concat(a.value,"-title")},[x]),g&&i("div",{class:"".concat(a.value,"-extra")},[g])]),i("div",{class:"".concat(a.value,"-view")},[i("table",null,[i("tbody",null,[O.map((function(e,t){return i(K,{key:t,index:t,colon:m,prefixCls:a.value,vertical:"vertical"===y,bordered:f,row:e},null)}))])])])])}}});X.install=function(e){return e.component(X.name,X),e.component(X.Item.name,X.Item),e};var Y=X;function ee(e){if(!G())throw new Error("useDescription() can only be used inside setup() or functional components!");const t=d(null),n=d(!1);return[function(l){M(n)&&R()||(t.value=l,e&&l.setDescProps(e),n.value=!0)},{setDescProps:e=>{var n;null==(n=M(t))||n.setDescProps(e)}}]}const te=Z(x({name:"Description",props:{useCollapse:{type:Boolean,default:!0},title:{type:String,default:""},size:{type:String,validator:e=>["small","default","middle",void 0].includes(e),default:"small"},bordered:{type:Boolean,default:!0},column:{type:[Number,Object],default:()=>({xxl:4,xl:3,lg:3,md:3,sm:2,xs:1})},collapseOptions:{type:Object,default:null},schema:{type:Array,default:()=>[]},data:{type:Object}},emits:["register"],setup(e,{slots:t,emit:n}){const l=d(null),{prefixCls:o}=W("description"),a=z(),r=P((()=>s(s({},e),M(l)))),u=P((()=>c(s({},M(r)),{title:void 0}))),p=P((()=>!!M(r).title)),f=P((()=>s({canExpand:!1},M(u).collapseOptions))),v=P((()=>s(s({},M(a)),M(u))));function y({label:e,labelMinWidth:t,labelStyle:n}){if(!n&&!t)return e;const l=c(s({},n),{minWidth:`${t}px `});return i("div",{style:l},[e])}const b=()=>{let e;return i(Y,A({class:`${o}`},M(v)),"function"==typeof(t=e=function(){const{schema:e,data:t}=M(u);return M(e).map((e=>{const{render:n,field:l,span:o,show:a,contentMinWidth:r}=e;if(a&&$(a)&&!a(t))return null;const s=()=>{var e;const t=null==(e=M(u))?void 0:e.data;if(!t)return null;const o=_(t,l);return o&&!F(t).hasOwnProperty(l)?$(n)?n("",t):"":$(n)?n(o,t):null!=o?o:""},c=r;return i(Y.Item,{label:y(e),key:l,span:o},{default:()=>r?i("div",{style:{minWidth:`${c}px`}},[s()]):s()})})).filter((e=>!!e))}())||"[object Object]"===Object.prototype.toString.call(t)&&!N(t)?e:{default:()=>[e]});var t};return n("register",{setDescProps:function(e){l.value=s(s({},M(l)),e)}}),()=>M(p)?(()=>{const n=e.useCollapse?b():i("div",null,[b()]);if(!e.useCollapse)return n;const{canExpand:l,helpMessage:o}=M(f),{title:a}=M(r);return i(L,{title:a,canExpan:l,helpMessage:o},{default:()=>n,action:()=>H(t,"action")})})():b()}}));export{te as D,ee as u};
