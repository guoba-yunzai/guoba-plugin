import{a as e,b as o,bp as s,bn as t,cT as r,p as a,bQ as n,c$ as i,v as l,e as c,o as p,f as d,k as m,j as u,i as f,bU as g,z as k,bT as _,m as j,F as x,bD as h,cS as C}from"./index.js";import{D}from"./siteSetting.js";import{u as I}from"./index9.js";import{b}from"./index3.js";import{h as w}from"./header.js";import{c as v}from"./createAsyncComponent.js";import"./FullscreenOutlined.js";import"./index10.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./uniqBy.js";import"./_baseIteratee.js";import"./get.js";import"./RedoOutlined.js";import"./lock.js";var y=e(o({name:"UserDropdown",components:{Dropdown:s,Menu:t,MenuItem:v((()=>r((()=>import("./DropMenuItem.js")),["assets/DropMenuItem.js","assets/index.js","assets/index13.css"]))),MenuDivider:t.Divider,LockAction:v((()=>r((()=>import("./LockModal.js")),["assets/LockModal.js","assets/LockModal.css","assets/index.js","assets/index13.css","assets/index3.js","assets/index2.css","assets/useWindowSizeFn.js","assets/FullscreenOutlined.js","assets/BasicForm.js","assets/BasicForm.css","assets/index2.js","assets/index17.css","assets/_baseIteratee.js","assets/get.js","assets/index4.js","assets/index16.css","assets/index5.js","assets/index14.css","assets/index6.js","assets/index5.css","assets/useFormItem.js","assets/transButton.js","assets/download.js","assets/index7.js","assets/index.css","assets/index8.js","assets/index3.css","assets/uniqBy.js","assets/useForm.js","assets/lock.js","assets/header.js"])))},props:{theme:a.oneOf(["dark","light"])},setup(){const{prefixCls:e}=n("header-user-dropdown"),{t:o}=h(),{getShowDoc:s,getUseLockPage:t}=I(),r=i(),a=l((()=>{const{realName:e="",avatar:o,desc:s,userId:t}=r.getUserInfo||{};return{realName:e,avatar:o||w,desc:s,userId:t}})),[c,{openModal:p}]=b();return{prefixCls:e,t:o,getUserInfo:a,handleMenuClick:function(e){switch(e.key){case"logout":r.confirmLoginOut();break;case"doc":C(D);break;case"lock":p(!0)}},getShowDoc:s,register:c,getUseLockPage:t}}}),[["render",function(e,o,s,t,r,a){const n=c("GAvatar"),i=c("MenuDivider"),l=c("MenuItem"),h=c("Menu"),C=c("Dropdown"),D=c("LockAction");return p(),d(x,null,[m(C,{placement:"bottomLeft",overlayClassName:`${e.prefixCls}-dropdown-overlay`},{overlay:u((()=>[m(h,{onClick:e.handleMenuClick},{default:u((()=>[e.getShowDoc?(p(),f(i,{key:0})):g("",!0),e.getUseLockPage?(p(),f(l,{key:"lock",text:e.t("layout.header.tooltipLock"),icon:"ion:lock-closed-outline"},null,8,["text"])):g("",!0),m(l,{key:"logout",text:e.t("layout.header.dropdownItemLoginOut"),icon:"ion:power-outline"},null,8,["text"])])),_:1},8,["onClick"])])),default:u((()=>[k("span",{class:_([[e.prefixCls,`${e.prefixCls}--${e.theme}`],"flex"])},[m(n,{class:_(`${e.prefixCls}__header`),id:e.getUserInfo.userId,qs:100,size:24},null,8,["class","id"]),k("span",{class:_(`${e.prefixCls}__info hidden md:block`)},[k("span",{class:_([`${e.prefixCls}__name  `,"truncate"])},j(e.getUserInfo.realName),3)],2)],2)])),_:1},8,["overlayClassName"]),m(D,{onRegister:e.register},null,8,["onRegister"])],64)}]]);export{y as default};