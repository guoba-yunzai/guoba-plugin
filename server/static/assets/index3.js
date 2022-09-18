var e=Object.defineProperty,t=Object.defineProperties,l=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,l,n)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[l]=n,r=(e,t)=>{for(var l in t||(t={}))o.call(t,l)&&s(e,l,t[l]);if(n)for(var l of n(t))a.call(t,l)&&s(e,l,t[l]);return e},i=(e,n)=>t(e,l(n)),c=(e,t,l)=>new Promise(((n,o)=>{var a=e=>{try{r(l.next(e))}catch(t){o(t)}},s=e=>{try{r(l.throw(e))}catch(t){o(t)}},r=e=>e.done?n(e.value):Promise.resolve(e.value).then(a,s);r((l=l.apply(e,t)).next())}));import{bE as u,am as d,x as p,cx as f,b as g,t as m,bD as h,k as b,cy as v,M as y,c2 as C,c7 as F,c8 as H,cz as M,r as k,cA as S,v as O,w as B,y as P,a_ as x,q as w,a as T,e as j,cB as R,o as W,i as $,j as N,Y as E,f as A,bK as _,cb as V,b5 as D,V as L,bR as I,F as q,bV as z,bU as Y,l as X,m as G,bH as J,cC as K,ao as U,bF as Z,aB as Q,bG as ee,cj as te,bJ as le,h as ne,A as oe,B as ae,c as se,bh as re,ct as ie,cl as ce,u as ue,cD as de,bZ as pe}from"./index.js";import{u as fe}from"./useWindowSizeFn.js";import{F as ge,a as me}from"./FullscreenOutlined.js";const{t:he}=u(),be={visible:{type:Boolean},scrollTop:{type:Boolean,default:!0},height:{type:Number},minHeight:{type:Number},draggable:{type:Boolean,default:!0},centered:{type:Boolean},cancelText:{type:String,default:he("common.cancelText")},okText:{type:String,default:he("common.okText")},closeFunc:Function},ve=Object.assign({},be,{defaultFullscreen:{type:Boolean},canFullscreen:{type:Boolean,default:!0},wrapperFooterOffset:{type:Number,default:0},helpMessage:[String,Array],useWrapper:{type:Boolean,default:!0},loading:{type:Boolean},loadingTip:{type:String},showCancelBtn:{type:Boolean,default:!0},showOkBtn:{type:Boolean,default:!0},wrapperProps:Object,afterClose:Function,bodyStyle:Object,closable:{type:Boolean,default:!0},closeIcon:Object,confirmLoading:{type:Boolean},destroyOnClose:{type:Boolean},footer:Object,getContainer:Function,mask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},maskStyle:Object,okType:{type:String,default:"primary"},okButtonProps:Object,cancelButtonProps:Object,title:{type:String},visible:{type:Boolean},width:[String,Number],wrapClassName:{type:String},zIndex:{type:Number}});function ye(e){const t=(e,t)=>getComputedStyle(e)[t],l=l=>{if(!l)return;l.setAttribute("data-drag",p(e.draggable));const n=l.querySelector(".ant-modal-header"),o=l.querySelector(".ant-modal");n&&o&&p(e.draggable)&&(n.style.cursor="move",n.onmousedown=e=>{if(!e)return;const l=e.clientX,n=e.clientY,a=document.body.clientWidth,s=document.documentElement.clientHeight,r=o.offsetWidth,i=o.offsetHeight,c=o.offsetLeft,u=a-o.offsetLeft-r,d=o.offsetTop,p=s-o.offsetTop-i,f=t(o,"left"),g=t(o,"top");let m=+f,h=+g;f.includes("%")?(m=+document.body.clientWidth*(+f.replace(/%/g,"")/100),h=+document.body.clientHeight*(+g.replace(/%/g,"")/100)):(m=+f.replace(/px/g,""),h=+g.replace(/px/g,"")),document.onmousemove=function(e){let t=e.clientX-l,a=e.clientY-n;-t>c?t=-c:t>u&&(t=u),-a>d?a=-d:a>p&&(a=p),o.style.cssText+=`;left:${t+m}px;top:${a+h}px;`},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null}})};d((()=>{p(e.visible)&&p(e.draggable)&&f((()=>{(()=>{const n=document.querySelectorAll(".ant-modal-wrap");for(const o of Array.from(n)){if(!o)continue;const n=t(o,"display"),a=o.getAttribute("data-drag");"none"!==n&&(null===a||p(e.destroyOnClose))&&l(o)}})()}),30)}))}var Ce=g({name:"Modal",inheritAttrs:!1,props:ve,emits:["cancel"],setup(e,{slots:t,emit:l}){const{visible:n,draggable:o,destroyOnClose:a}=m(e),s=h();ye({visible:n,destroyOnClose:a,draggable:o});const c=e=>{l("cancel",e)};return()=>{let l;const n=i(r(r({},p(s)),e),{onCancel:c});return b(y,n,"function"==typeof(o=l=v(t))||"[object Object]"===Object.prototype.toString.call(o)&&!C(o)?l:{default:()=>[l]});var o}}});const Fe=Symbol();function He(){return H(Fe)}const Me=g({name:"ModalWrapper",components:{ScrollContainer:M},inheritAttrs:!1,props:{loading:{type:Boolean},useWrapper:{type:Boolean,default:!0},modalHeaderHeight:{type:Number,default:57},modalFooterHeight:{type:Number,default:74},minHeight:{type:Number,default:200},height:{type:Number},footerOffset:{type:Number,default:0},visible:{type:Boolean},fullScreen:{type:Boolean},loadingTip:{type:String}},emits:["height-change","ext-height"],setup(e,{emit:t}){const l=k(null),n=k(null),o=k(0),a=k(0);let s=0;fe(i.bind(null,!1)),S(n,(()=>{i()}),{attributes:!0,subtree:!0}),F({redoModalHeight:i},Fe);const r=O((()=>({minHeight:`${e.minHeight}px`,[e.fullScreen?"height":"maxHeight"]:`${p(o)}px`})));function i(){return c(this,null,(function*(){if(!e.visible)return;const a=p(l);if(!a)return;const r=a.$el.parentElement;if(r){r.style.padding="0",yield w();try{const l=r.parentElement&&r.parentElement.parentElement;if(!l)return;const a=getComputedStyle(l).top,i=Number.parseInt(a);let c=window.innerHeight-2*i+(e.footerOffset||0)-e.modalFooterHeight-e.modalHeaderHeight;i<40&&(c-=26),yield w();const u=p(n);if(!u)return;yield w(),s=u.scrollHeight,e.fullScreen?o.value=window.innerHeight-e.modalFooterHeight-e.modalHeaderHeight-28:o.value=e.height?e.height:s>c?c:s,t("height-change",p(o))}catch(i){}}}))}return d((()=>{e.useWrapper&&i()})),B((()=>e.fullScreen),(e=>{i(),e?a.value=o.value:o.value=a.value})),P((()=>{const{modalHeaderHeight:l,modalFooterHeight:n}=e;t("ext-height",l+n)})),x((()=>{})),{wrapperRef:l,spinRef:n,spinStyle:r,scrollTop:function(){return c(this,null,(function*(){w((()=>{var e;const t=p(l);t&&(null==(e=null==t?void 0:t.scrollTo)||e.call(t,0))}))}))},setModalHeight:i}}}),ke=["loading-tip"];var Se=T(Me,[["render",function(e,t,l,n,o,a){const s=j("ScrollContainer"),r=R("loading");return W(),$(s,{ref:"wrapperRef"},{default:N((()=>[E((W(),A("div",{ref:"spinRef",style:V(e.spinStyle),"loading-tip":e.loadingTip},[_(e.$slots,"default")],12,ke)),[[r,e.loading]])])),_:3},512)}]]);var Oe=T(g({name:"ModalClose",components:{Tooltip:D,FullscreenExitOutlined:ge,FullscreenOutlined:me,CloseOutlined:L},props:{canFullscreen:{type:Boolean,default:!0},fullScreen:{type:Boolean}},emits:["cancel","fullscreen"],setup(e,{emit:t}){const{prefixCls:l}=I("basic-modal-close"),{t:n}=u();return{t:n,getClass:O((()=>[l,`${l}--custom`,{[`${l}--can-full`]:e.canFullscreen}])),prefixCls:l,handleCancel:function(e){t("cancel",e)},handleFullScreen:function(e){null==e||e.stopPropagation(),null==e||e.preventDefault(),t("fullscreen")}}}}),[["render",function(e,t,l,n,o,a){const s=j("FullscreenExitOutlined"),r=j("Tooltip"),i=j("FullscreenOutlined"),c=j("CloseOutlined");return W(),A("div",{class:Y(e.getClass)},[e.canFullscreen?(W(),A(q,{key:0},[e.fullScreen?(W(),$(r,{key:0,title:e.t("component.modal.restore"),placement:"bottom"},{default:N((()=>[b(s,{role:"full",onClick:e.handleFullScreen},null,8,["onClick"])])),_:1},8,["title"])):(W(),$(r,{key:1,title:e.t("component.modal.maximize"),placement:"bottom"},{default:N((()=>[b(i,{role:"close",onClick:e.handleFullScreen},null,8,["onClick"])])),_:1},8,["title"]))],64)):z("",!0),b(r,{title:e.t("component.modal.close"),placement:"bottom"},{default:N((()=>[b(c,{onClick:e.handleCancel},null,8,["onClick"])])),_:1},8,["title"])],2)}]]);var Be=T(g({name:"BasicModalFooter",props:ve,emits:["ok","cancel"],setup:(e,{emit:t})=>({handleOk:function(e){t("ok",e)},handleCancel:function(e){t("cancel",e)}})}),[["render",function(e,t,l,n,o,a){const s=j("a-button");return W(),A("div",null,[_(e.$slots,"insertFooter"),e.showCancelBtn?(W(),$(s,J({key:0},e.cancelButtonProps,{onClick:e.handleCancel}),{default:N((()=>[X(G(e.cancelText),1)])),_:1},16,["onClick"])):z("",!0),_(e.$slots,"centerFooter"),e.showOkBtn?(W(),$(s,J({key:1,type:e.okType,onClick:e.handleOk,loading:e.confirmLoading},e.okButtonProps),{default:N((()=>[X(G(e.okText),1)])),_:1},16,["type","onClick","loading"])):z("",!0),_(e.$slots,"appendFooter")])}]]);const Pe=g({name:"BasicModalHeader",components:{BasicTitle:K},props:{helpMessage:{type:[String,Array]},title:{type:String}},emits:["dblclick"]});var xe=T(g({name:"BasicModal",components:{Modal:Ce,ModalWrapper:Se,ModalClose:Oe,ModalFooter:Be,ModalHeader:T(Pe,[["render",function(e,t,l,n,o,a){const s=j("BasicTitle");return W(),$(s,{helpMessage:e.helpMessage},{default:N((()=>[X(G(e.title),1)])),_:1},8,["helpMessage"])}]])},inheritAttrs:!1,props:ve,emits:["visible-change","height-change","cancel","ok","register","update:visible"],setup(e,{emit:t,attrs:l}){const n=k(!1),o=k(null),a=k(null),{prefixCls:s}=I("basic-modal"),u=k(0),f={setModalProps:function(e){o.value=te(p(o)||{},e),Reflect.has(e,"visible")&&(n.value=!!e.visible);Reflect.has(e,"defaultFullscreen")&&(v.value=!!e.defaultFullscreen)},emitVisible:void 0,redoModalHeight:()=>{w((()=>{p(a)&&p(a).setModalHeight()}))},visibleRef:n},g=Q();g&&t("register",f,g.uid);const m=O((()=>r(r({},e),p(o)))),{handleFullScreen:h,getWrapClassName:b,fullScreenRef:v}=function(e){const t=k(!1);return{getWrapClassName:O((()=>{const l=p(e.wrapClassName)||"";return p(t)?`fullscreen-modal ${l} `:p(l)})),handleFullScreen:function(e){e&&e.stopPropagation(),t.value=!p(t)},fullScreenRef:t}}({modalWrapperRef:a,extHeightRef:u,wrapClassName:U(m.value,"wrapClassName")}),y=O((()=>{const e=i(r({},p(m)),{visible:p(n),okButtonProps:void 0,cancelButtonProps:void 0,title:void 0});return i(r({},e),{wrapClassName:p(b)})})),C=O((()=>{const e=i(r(r({},l),p(m)),{visible:p(n),wrapClassName:p(b)});return p(v)?Z(e,["height","title"]):Z(e,"title")})),F=O((()=>{if(!p(v))return p(y).height}));return d((()=>{n.value=!!e.visible,v.value=!!e.defaultFullscreen})),B((()=>p(n)),(l=>{var n;t("visible-change",l),t("update:visible",l),g&&(null==(n=f.emitVisible)||n.call(f,l,g.uid)),w((()=>{e.scrollTop&&l&&p(a)&&p(a).scrollTop()}))}),{immediate:!1}),{handleCancel:function(l){return c(this,null,(function*(){var o,a;if(null==l||l.stopPropagation(),!(null==(a=null==(o=l.target)?void 0:o.classList)?void 0:a.contains(s+"-close--custom")))if(e.closeFunc&&ee(e.closeFunc)){const t=yield e.closeFunc();n.value=!t}else n.value=!1,t("cancel",l)}))},getBindValue:C,getProps:y,handleFullScreen:h,fullScreenRef:v,getMergeProps:m,handleOk:function(e){t("ok",e)},visibleRef:n,omit:Z,modalWrapperRef:a,handleExtHeight:function(e){u.value=e},handleHeightChange:function(e){t("height-change",e)},handleTitleDbClick:function(t){e.canFullscreen&&(t.stopPropagation(),h(t))},getWrapperHeight:F}}}),[["render",function(e,t,l,n,o,a){const s=j("ModalClose"),r=j("ModalHeader"),i=j("ModalFooter"),c=j("ModalWrapper"),u=j("Modal");return W(),$(u,J(e.getBindValue,{onCancel:e.handleCancel}),le({default:N((()=>[b(c,J({useWrapper:e.getProps.useWrapper,footerOffset:e.wrapperFooterOffset,fullScreen:e.fullScreenRef,ref:"modalWrapperRef",loading:e.getProps.loading,"loading-tip":e.getProps.loadingTip,minHeight:e.getProps.minHeight,height:e.getWrapperHeight,visible:e.visibleRef,modalFooterHeight:void 0===e.footer||e.footer?void 0:0},e.omit(e.getProps.wrapperProps,"visible","height","modalFooterHeight"),{onExtHeight:e.handleExtHeight,onHeightChange:e.handleHeightChange}),{default:N((()=>[_(e.$slots,"default")])),_:3},16,["useWrapper","footerOffset","fullScreen","loading","loading-tip","minHeight","height","visible","modalFooterHeight","onExtHeight","onHeightChange"])])),_:2},[e.$slots.closeIcon?void 0:{name:"closeIcon",fn:N((()=>[b(s,{canFullscreen:e.getProps.canFullscreen,fullScreen:e.fullScreenRef,onCancel:e.handleCancel,onFullscreen:e.handleFullScreen},null,8,["canFullscreen","fullScreen","onCancel","onFullscreen"])]))},e.$slots.title?void 0:{name:"title",fn:N((()=>[b(r,{helpMessage:e.getProps.helpMessage,title:e.getMergeProps.title,onDblclick:e.handleTitleDbClick},null,8,["helpMessage","title","onDblclick"])]))},e.$slots.footer?void 0:{name:"footer",fn:N((()=>[b(i,J(e.getBindValue,{onOk:e.handleOk,onCancel:e.handleCancel}),le({_:2},[ne(Object.keys(e.$slots),(t=>({name:t,fn:N((l=>[_(e.$slots,t,oe(ae(l||{})))]))})))]),1040,["onOk","onCancel"])]))},ne(Object.keys(e.omit(e.$slots,"default")),(t=>({name:t,fn:N((l=>[_(e.$slots,t,oe(ae(l||{})))]))})))]),1040,["onCancel"])}]]);const we=se({}),Te=se({});function je(){const e=k(null),t=k(!1),l=k("");const n=()=>{const t=p(e);return t||ue("useModal instance is undefined!"),t};return[function(n,o){if(!Q())throw new Error("useModal() can only be used inside setup() or functional components!");l.value=o,x((()=>{e.value=null,t.value=!1,we[p(l)]=null})),p(t)&&ce()&&n===p(e)||(e.value=n,t.value=!0,n.emitVisible=(e,t)=>{Te[t]=e})},{setModalProps:e=>{var t;null==(t=n())||t.setModalProps(e)},getVisible:O((()=>{var t;let n=p(null==(t=e.value)?void 0:t.visibleRef);return null==n?Te[~~p(l)]:n})),redoModalHeight:()=>{var e,t;null==(t=null==(e=n())?void 0:e.redoModalHeight)||t.call(e)},openModal:(e=!0,t,o=!0)=>{var a;if(null==(a=n())||a.setModalProps({visible:e}),!t)return;const s=p(l);if(o)return we[s]=null,void(we[s]=re(t));ie(re(we[s]),re(t))||(we[s]=re(t))},closeModal:()=>{var e;null==(e=n())||e.setModalProps({visible:!1})}}]}const Re=e=>{const t=k(null),l=Q(),n=k(""),o=()=>{const e=p(t);return e||ue("useModalInner instance is undefined!"),e};return d((()=>{const t=we[p(n)];t&&e&&ee(e)&&w((()=>{e(t)}))})),[(e,o)=>{de((()=>{t.value=null})),n.value=o,t.value=e,null==l||l.emit("register",e,o)},{changeLoading:(e=!0)=>{var t;null==(t=o())||t.setModalProps({loading:e})},getVisible:O((()=>{var e;let l=p(null==(e=t.value)?void 0:e.visibleRef);return null==l?Te[~~p(n)]:l})),changeOkLoading:(e=!0)=>{var t;null==(t=o())||t.setModalProps({confirmLoading:e})},closeModal:()=>{var e;null==(e=o())||e.setModalProps({visible:!1})},setModalProps:e=>{var t;null==(t=o())||t.setModalProps(e)},redoModalHeight:()=>{var e;const t=null==(e=o())?void 0:e.redoModalHeight;t&&t()}}]},We=pe(xe);export{We as B,Re as a,je as b,He as u};
