import{b as t,I as a,c as e,r as n,w as o,K as l,_ as u,k as r,am as c,aG as s,ak as i,aq as v,aU as f,ag as p,fP as d,af as m,aT as y,aQ as x,fQ as b,ao as g,aV as C,ax as h,N as S,av as N}from"./index.js";function w(t){var a,e=t.prefixCls,n=t.value,o=t.current,l=t.offset,u=void 0===l?0:l;return u&&(a={position:"absolute",top:"".concat(u,"00%"),left:0}),r("p",{style:a,class:c("".concat(e,"-only-unit"),{current:o})},[n])}function k(t,a,e){for(var n=t,o=0;(n+10)%10!==a;)n+=e,o+=e;return o}var V=t({compatConfig:{MODE:3},name:"SingleNumber",props:{prefixCls:String,value:String,count:Number},setup:function(t){var c=a((function(){return Number(t.value)})),s=a((function(){return Math.abs(t.count)})),i=e({prevValue:c.value,prevCount:s.value}),v=function(){i.prevValue=c.value,i.prevCount=s.value},f=n();return o(c,(function(){clearTimeout(f.value),f.value=setTimeout((function(){v()}),1e3)}),{flush:"post"}),l((function(){clearTimeout(f.value)})),function(){var a,e={},n=c.value;if(i.prevValue===n||Number.isNaN(n)||Number.isNaN(i.prevValue))a=[w(u(u({},t),{},{current:!0}))],e={transition:"none"};else{a=[];for(var o=n+10,l=[],f=n;f<=o;f+=1)l.push(f);var p=l.findIndex((function(t){return t%10===i.prevValue}));a=l.map((function(a,e){var n=a%10;return w(u(u({},t),{},{value:n,offset:e-p,current:e===p}))}));var d=i.prevCount<s.value?1:-1;e={transform:"translateY(".concat(-k(i.prevValue,n,d),"00%)")}}return r("span",{class:"".concat(t.prefixCls,"-only"),style:e,onTransitionend:function(){return v()}},[a])}}}),A=["prefixCls","count","title","show","component","class","style"],B=t({compatConfig:{MODE:3},name:"ScrollNumber",inheritAttrs:!1,props:{prefixCls:String,count:p.any,component:String,title:p.any,show:Boolean},setup:function(t,a){var e=a.attrs,n=a.slots,o=s("scroll-number",t).prefixCls;return function(){var a,l=u(u({},t),e);l.prefixCls;var s=l.count,p=l.title;l.show;var d=l.component,m=void 0===d?"sup":d,y=l.class,x=l.style,b=i(l,A),g=u(u({},b),{},{style:x,"data-show":t.show,class:c(o.value,y),title:p}),C=s;if(s&&Number(s)%1==0){var h=String(s).split("");C=h.map((function(t,a){return r(V,{prefixCls:o.value,count:Number(s),value:t,key:h.length-a},null)}))}x&&x.borderColor&&(g.style=u(u({},x),{},{boxShadow:"0 0 0 1px ".concat(x.borderColor," inset")}));var S=v(null===(a=n.default)||void 0===a?void 0:a.call(n));return S&&S.length?f(S,{class:c("".concat(o.value,"-custom-component"))},!1):r(m,g,{default:function(){return[C]}})}}});function O(t){return-1!==d.indexOf(t)}var T=["class","style"],M=t({compatConfig:{MODE:3},name:"ABadgeRibbon",inheritAttrs:!1,props:{prefix:String,color:{type:String},text:p.any,placement:{type:String,default:"end"}},slots:["text"],setup:function(t,e){var n=e.attrs,o=e.slots,l=s("ribbon",t),c=l.prefixCls,v=l.direction,f=a((function(){return O(t.color)})),p=a((function(){var a;return[c.value,"".concat(c.value,"-placement-").concat(t.placement),(a={},m(a,"".concat(c.value,"-rtl"),"rtl"===v.value),m(a,"".concat(c.value,"-color-").concat(t.color),f.value),a)]}));return function(){var a,e,l=n.class,s=n.style,v=i(n,T),d={},m={};return t.color&&!f.value&&(d.background=t.color,m.color=t.color),r("div",u({class:"".concat(c.value,"-wrapper")},v),[null===(a=o.default)||void 0===a?void 0:a.call(o),r("div",{class:[p.value,l],style:u(u({},d),s)},[r("span",{class:"".concat(c.value,"-text")},[t.text||(null===(e=o.text)||void 0===e?void 0:e.call(o))]),r("div",{class:"".concat(c.value,"-corner"),style:m},null)])])}}}),D=t({compatConfig:{MODE:3},name:"ABadge",Ribbon:M,inheritAttrs:!1,props:{count:p.any,showZero:{type:Boolean,default:void 0},overflowCount:{type:Number,default:99},dot:{type:Boolean,default:void 0},prefixCls:String,scrollNumberPrefixCls:String,status:{type:String},size:{type:String,default:"default"},color:String,text:p.any,offset:Array,numberStyle:{type:Object,default:void 0},title:String},slots:["text","count"],setup:function(t,e){var l=e.slots,i=e.attrs,v=s("badge",t),p=v.prefixCls,d=v.direction,w=a((function(){return t.count>t.overflowCount?"".concat(t.overflowCount,"+"):t.count})),k=a((function(){return null!==t.status&&void 0!==t.status||null!==t.color&&void 0!==t.color})),V=a((function(){return"0"===w.value||0===w.value})),A=a((function(){return t.dot&&!V.value})),T=a((function(){return A.value?"":w.value})),M=a((function(){return(null===T.value||void 0===T.value||""===T.value||V.value&&!t.showZero)&&!A.value})),D=n(t.count),E=n(T.value),I=n(A.value);o([function(){return t.count},T,A],(function(){M.value||(D.value=t.count,E.value=T.value,I.value=A.value)}),{immediate:!0});var j=a((function(){var a;return m(a={},"".concat(p.value,"-status-dot"),k.value),m(a,"".concat(p.value,"-status-").concat(t.status),!!t.status),m(a,"".concat(p.value,"-status-").concat(t.color),O(t.color)),a})),z=a((function(){return t.color&&!O(t.color)?{background:t.color}:{}})),P=a((function(){var a;return m(a={},"".concat(p.value,"-dot"),I.value),m(a,"".concat(p.value,"-count"),!I.value),m(a,"".concat(p.value,"-count-sm"),"small"===t.size),m(a,"".concat(p.value,"-multiple-words"),!I.value&&E.value&&E.value.toString().length>1),m(a,"".concat(p.value,"-status-").concat(t.status),!!t.status),m(a,"".concat(p.value,"-status-").concat(t.color),O(t.color)),a}));return function(){var a,e,n,o=t.offset,s=t.title,v=t.color,w=i.style,V=y(l,t,"text"),A=p.value,T=D.value,I=x(null===(a=l.default)||void 0===a?void 0:a.call(l));I=I.length?I:null;var R=!(M.value&&!l.count),Q=function(){if(!o)return u({},w);var t={marginTop:b(o[1])?"".concat(o[1],"px"):o[1]};return"rtl"===d.value?t.left="".concat(parseInt(o[0],10),"px"):t.right="".concat(-parseInt(o[0],10),"px"),u(u({},t),w)}(),Z=null!=s?s:"string"==typeof T||"number"==typeof T?T:void 0,q=R||!V?null:r("span",{class:"".concat(A,"-status-text")},[V]),G="object"===g(T)||void 0===T&&l.count?f(null!=T?T:null===(e=l.count)||void 0===e?void 0:e.call(l),{style:Q},!1):null,K=c(A,(m(n={},"".concat(A,"-status"),k.value),m(n,"".concat(A,"-not-a-wrapper"),!I),m(n,"".concat(A,"-rtl"),"rtl"===d.value),n),i.class);if(!I&&k.value){var U=Q.color;return r("span",u(u({},i),{},{class:K,style:Q}),[r("span",{class:j.value,style:z.value},null),r("span",{style:{color:U},class:"".concat(A,"-status-text")},[V])])}var Y=C(I?"".concat(A,"-zoom"):"",{appear:!1}),_=u(u({},Q),t.numberStyle);return v&&!O(v)&&((_=_||{}).background=v),r("span",u(u({},i),{},{class:K}),[I,r(h,Y,{default:function(){return[S(r(B,{prefixCls:t.scrollNumberPrefixCls,show:R,class:P.value,count:E.value,title:Z,style:_,key:"scrollNumber"},{default:function(){return[G]}}),[[N,R]])]}}),q])}}});export{D as B,M as R};
