var t=Object.defineProperty,e=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,r=(e,n,o)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o,s=(t,e)=>{for(var n in e||(e={}))a.call(e,n)&&r(t,n,e[n]);if(o)for(var n of o(e))l.call(e,n)&&r(t,n,e[n]);return t};import{k as i,au as u,Q as c,b as d,D as f,r as v,d_ as g,v as p,O as b,U as h,E as m,d$ as y,a0 as C,e0 as x,aB as w,e1 as H,bi as O,bK as k,dh as j,a as S,o as F,f as P,z as $,bD as B,bN as R,c4 as T,w as A,q as _,x as L,e2 as E,e3 as I,bB as W,bV as z,p as D,ad as N,by as M,e as V,i as q,bC as K,h as Q,j as U,A as G,B as J,F as X,l as Y,m as Z,bA as tt,bO as et,bS as nt}from"./index.js";import{B as ot}from"./index14.js";import{o as at}from"./onMountedOrActivated.js";import{u as lt}from"./useWindowSizeFn.js";import{a as rt}from"./useContentViewHeight.js";import{A as st}from"./ArrowLeftOutlined.js";import{T as it}from"./transButton.js";var ut={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};function ct(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?Object(arguments[e]):{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),o.forEach((function(e){dt(t,e,n[e])}))}return t}function dt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ft=function(t,e){var n=ct({},t,e.attrs);return i(u,ct({},n,{icon:ut}),null)};ft.displayName="ArrowRightOutlined",ft.inheritAttrs=!1;var vt=ft,gt=c(d({name:"APageHeader",props:{backIcon:C.any,prefixCls:String,title:C.any,subTitle:C.any,breadcrumb:C.object,tags:C.any,footer:C.any,extra:C.any,avatar:C.object,ghost:{type:Boolean,default:void 0},onBack:Function},slots:["backIcon","avatar","breadcrumb","title","subTitle","tags","extra","footer"],setup:function(t,e){var n=e.emit,o=e.slots,a=f("page-header",t),l=a.prefixCls,r=a.direction,s=a.pageHeader,u=v(!1),c=g(),d=function(t){var e=t.width;c.value||(u.value=e<768)},C=p((function(){var e,n,o;return null===(o=null!==(e=t.ghost)&&void 0!==e?e:null===(n=s.value)||void 0===n?void 0:n.ghost)||void 0===o||o})),k=function(){var e;return t.breadcrumb?i(ot,t.breadcrumb,null):null===(e=o.breadcrumb)||void 0===e?void 0:e.call(o)},j=function(){var e,a,s,u,c,d,f,v,g,p=t.avatar,b=null!==(e=t.title)&&void 0!==e?e:null===(a=o.title)||void 0===a?void 0:a.call(o),h=null!==(s=t.subTitle)&&void 0!==s?s:null===(u=o.subTitle)||void 0===u?void 0:u.call(o),m=null!==(c=t.tags)&&void 0!==c?c:null===(d=o.tags)||void 0===d?void 0:d.call(o),y=null!==(f=t.extra)&&void 0!==f?f:null===(v=o.extra)||void 0===v?void 0:v.call(o),C="".concat(l.value,"-heading"),w=b||h||m||y;if(!w)return null;var H=function(){var e,n,a;return null!==(a=null!==(e=t.backIcon)&&void 0!==e?e:null===(n=o.backIcon)||void 0===n?void 0:n.call(o))&&void 0!==a?a:"rtl"===r.value?i(vt,null,null):i(st,null,null)}(),k=function(e){return e&&t.onBack?i(O,{componentName:"PageHeader",children:function(t){var o=t.back;return i("div",{class:"".concat(l.value,"-back")},[i(it,{onClick:function(t){n("back",t)},class:"".concat(l.value,"-back-button"),"aria-label":o},{default:function(){return[e]}})])}},null):null}(H);return i("div",{class:C},[(k||p||w)&&i("div",{class:"".concat(C,"-left")},[k,p?i(x,p,null):null===(g=o.avatar)||void 0===g?void 0:g.call(o),b&&i("span",{class:"".concat(C,"-title"),title:"string"==typeof b?b:void 0},[b]),h&&i("span",{class:"".concat(C,"-sub-title"),title:"string"==typeof h?h:void 0},[h]),m&&i("span",{class:"".concat(C,"-tags")},[m])]),y&&i("span",{class:"".concat(C,"-extra")},[y])])},S=function(){var e,n,a=null!==(e=t.footer)&&void 0!==e?e:w(null===(n=o.footer)||void 0===n?void 0:n.call(o));return H(a)?null:i("div",{class:"".concat(l.value,"-footer")},[a])},F=function(t){return i("div",{class:"".concat(l.value,"-content")},[t])};return function(){var e,n,a,s=(null===(n=t.breadcrumb)||void 0===n?void 0:n.routes)||o.breadcrumb,c=t.footer||o.footer,f=b(null===(a=o.default)||void 0===a?void 0:a.call(o)),v=h(l.value,(m(e={"has-breadcrumb":s,"has-footer":c},"".concat(l.value,"-ghost"),C.value),m(e,"".concat(l.value,"-rtl"),"rtl"===r.value),m(e,"".concat(l.value,"-compact"),u.value),e));return i(y,{onResize:d},{default:function(){return[i("div",{class:v},[k(),j(),f.length?F(f):null,S()])]}})}}}));var pt=S(d({name:"PageFooter",inheritAttrs:!1,setup(){const{prefixCls:t}=k("page-footer"),{getCalcContentWidth:e}=j();return{prefixCls:t,getCalcContentWidth:e}}}),[["render",function(t,e,n,o,a,l){return F(),P("div",{class:R(t.prefixCls),style:T({width:t.getCalcContentWidth})},[$("div",{class:R(`${t.prefixCls}__left`)},[B(t.$slots,"left",{},void 0,!0)],2),B(t.$slots,"default",{},void 0,!0),$("div",{class:R(`${t.prefixCls}__right`)},[B(t.$slots,"right",{},void 0,!0)],2)],6)}],["__scopeId","data-v-7984b8f2"]]);function bt(t,e,n,o,a=0,l=v(0)){const r=v(null),{footerHeightRef:s}=rt();let i={useLayoutFooter:!0};function u(t,e="all"){var n,o,a,l;function r(t){return Number(t.replace(/[^\d]/g,""))}let s=0;const i="0px";if(t){const u=getComputedStyle(t),c=r(null!=(n=null==u?void 0:u.marginTop)?n:i),d=r(null!=(o=null==u?void 0:u.marginBottom)?o:i),f=r(null!=(a=null==u?void 0:u.paddingTop)?a:i),v=r(null!=(l=null==u?void 0:u.paddingBottom)?l:i);"all"===e?(s+=c,s+=d,s+=f,s+=v):"top"===e?(s+=c,s+=f):(s+=d,s+=v)}return s}function c(t){return null==t?null:t instanceof HTMLDivElement?t:t.$el}function d(){return d=this,f=null,v=function*(){var d;if(!t.value)return;yield _();const f=c(L(e));if(!f)return;const{bottomIncludeBody:v}=E(f);let g=0;n.forEach((t=>{var e,n;g+=null!=(n=null==(e=c(L(t)))?void 0:e.offsetHeight)?n:0}));let p=null!=(d=u(f))?d:0;o.forEach((t=>{p+=u(c(L(t)))}));let b=0;function h(t,e){if(t&&e){const n=t.parentElement;n&&(W(e)?n.classList.contains(e)?b+=u(n,"bottom"):(b+=u(n,"bottom"),h(n,e)):z(e)&&e>0&&(b+=u(n,"bottom"),h(n,--e)))}}I(a)?h(f,L(a)):h(f,a);let m=v-L(s)-L(l)-g-p-b;const y=()=>{var t;null==(t=i.elements)||t.forEach((t=>{var e,n;m+=null!=(n=null==(e=c(L(t)))?void 0:e.offsetHeight)?n:0}))};i.useLayoutFooter&&L(s),y(),r.value=m},new Promise(((t,e)=>{var n=t=>{try{a(v.next(t))}catch(n){e(n)}},o=t=>{try{a(v.throw(t))}catch(n){e(n)}},a=e=>e.done?t(e.value):Promise.resolve(e.value).then(n,o);a((v=v.apply(d,f)).next())}));var d,f,v}return at((()=>{_((()=>{d()}))})),lt((()=>{d()}),50,{immediate:!0}),A((()=>[s.value]),(()=>{d()}),{flush:"post",immediate:!0}),{redoHeight:function(){_((()=>{d()}))},setCompensation:t=>{i=t},contentHeight:r}}var ht=S(d({name:"PageWrapper",components:{PageFooter:pt,PageHeader:gt},inheritAttrs:!1,props:{title:D.string,dense:D.bool,ghost:D.bool,content:D.string,contentStyle:{type:Object},contentBackground:D.bool,contentFullHeight:D.bool,contentClass:D.string,fixedHeight:D.bool,upwardSpace:D.oneOfType([D.number,D.string]).def(0),loading:D.bool,sticky:D.bool,stickyTop:D.string},setup(t,{slots:o,attrs:a}){const l=v(null),r=v(null),i=v(null),u=v(null),{prefixCls:c}=k("page-wrapper");N(yt,p((()=>t.fixedHeight)));const d=p((()=>t.contentFullHeight)),f=p((()=>t.upwardSpace)),{redoHeight:g,setCompensation:b,contentHeight:h}=bt(d,l,[r,u],[i],f);b({useLayoutFooter:!0,elements:[u]});const m=p((()=>{var e;return[c,{[`${c}--dense`]:t.dense},null!=(e=a.class)?e:{}]})),y=p((()=>t.content||(null==o?void 0:o.headerContent)||t.title||w.value.length)),C=p((()=>{var e;let n={};return t.sticky&&(n.position="sticky",n.zIndex=1,n.top=null!=(e=t.stickyTop)?e:"-60px",n.boxShadow="0 0 5px -2px"),n})),x=p((()=>(null==o?void 0:o.leftFooter)||(null==o?void 0:o.rightFooter))),w=p((()=>Object.keys(M(o,"default","leftFooter","rightFooter","headerContent")))),H=p((()=>{const{contentFullHeight:o,contentStyle:a,fixedHeight:l}=t;if(!o)return s({},a);const r=`${L(h)}px`;return s((i=s({},a),e(i,n({minHeight:r}))),l?{height:r}:{});var i})),O=p((()=>{const{contentBackground:e,contentClass:n}=t;return[`${c}-content`,n,{[`${c}-content-bg`]:e}]}));return A((()=>[x.value]),(()=>{g()}),{flush:"post",immediate:!0}),{getContentStyle:H,wrapperRef:l,headerRef:r,contentRef:i,footerRef:u,getClass:m,getHeaderSlots:w,prefixCls:c,getShowHeader:y,getHeaderStyle:C,getShowFooter:x,omit:M,getContentClass:O}}}),[["render",function(t,e,n,o,a,l){const r=V("PageHeader"),s=V("a-spin"),u=V("PageFooter");return F(),P("div",{class:R(t.getClass),ref:"wrapperRef"},[t.getShowHeader?(F(),q(r,tt({key:0,ghost:t.ghost,title:t.title},t.omit(t.$attrs,"class"),{ref:"headerRef",style:t.getHeaderStyle}),K({default:U((()=>[t.content?(F(),P(X,{key:0},[Y(Z(t.content),1)],64)):B(t.$slots,"headerContent",{key:1})])),_:2},[Q(t.getHeaderSlots,(e=>({name:e,fn:U((n=>[B(t.$slots,e,G(J(n||{})))]))})))]),1040,["ghost","title","style"])):et("",!0),$("div",{class:R(["overflow-hidden",t.getContentClass]),style:T(t.getContentStyle),ref:"contentRef"},[i(s,{spinning:t.loading},{default:U((()=>[B(t.$slots,"default")])),_:3},8,["spinning"])],6),t.getShowFooter?(F(),q(u,{key:1,ref:"footerRef"},{left:U((()=>[B(t.$slots,"leftFooter")])),right:U((()=>[B(t.$slots,"rightFooter")])),_:3},512)):et("",!0)],2)}]]);nt(pt);const mt=nt(ht),yt="PageWrapperFixedHeight";export{mt as P,yt as a};
