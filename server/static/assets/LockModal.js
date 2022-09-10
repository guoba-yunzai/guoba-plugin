import{a as e,b as s,bD as r,bQ as a,d2 as o,v as t,e as i,o as l,i as n,j as c,z as m,bT as d,m as p,k as u,l as f,bG as j}from"./index.js";import{B as x,a as h}from"./index3.js";import{B as v}from"./BasicForm.js";import{u as g}from"./useForm.js";import{u as k}from"./lock.js";import{h as _}from"./header.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./index2.js";import"./_baseIteratee.js";import"./get.js";import"./index4.js";import"./index5.js";import"./index6.js";import"./useFormItem.js";import"./transButton.js";import"./download.js";import"./index7.js";import"./index8.js";import"./uniqBy.js";const y=s({name:"LockModal",components:{BasicModal:x,BasicForm:v},setup(){const{t:e}=r(),{prefixCls:s}=a("header-lock-modal"),i=o(),l=k(),n=t((()=>{var e;return null==(e=i.getUserInfo)?void 0:e.realName})),[c,{closeModal:m}]=h(),[d,{validateFields:p,resetFields:u}]=g({showActionButtonGroup:!1,schemas:[{field:"password",label:e("layout.header.lockScreenPassword"),colProps:{span:24},component:"InputPassword",required:!0}]});return{t:e,prefixCls:s,getRealName:n,register:c,registerForm:d,handleLock:function(){return e=this,s=null,r=function*(){const e=(yield p()).password;m(),l.setLockInfo({isLock:!0,pwd:e}),yield u()},new Promise(((a,o)=>{var t=e=>{try{l(r.next(e))}catch(s){o(s)}},i=e=>{try{l(r.throw(e))}catch(s){o(s)}},l=e=>e.done?a(e.value):Promise.resolve(e.value).then(t,i);l((r=r.apply(e,s)).next())}));var e,s,r},avatar:t((()=>{const{avatar:e}=i.getUserInfo;return e||_}))}}}),B=["src"];var F=e(y,[["render",function(e,s,r,a,o,t){const x=i("BasicForm"),h=i("a-button"),v=i("BasicModal");return l(),n(v,j({footer:null,title:e.t("layout.header.lockScreen")},e.$attrs,{class:e.prefixCls,onRegister:e.register}),{default:c((()=>[m("div",{class:d(`${e.prefixCls}__entry`)},[m("div",{class:d(`${e.prefixCls}__header`)},[m("img",{src:e.avatar,class:d(`${e.prefixCls}__header-img`)},null,10,B),m("p",{class:d(`${e.prefixCls}__header-name`)},p(e.getRealName),3)],2),u(x,{onRegister:e.registerForm},null,8,["onRegister"]),m("div",{class:d(`${e.prefixCls}__footer`)},[u(h,{type:"primary",block:"",class:"mt-2",onClick:e.handleLock},{default:c((()=>[f(p(e.t("layout.header.lockScreenBtn")),1)])),_:1},8,["onClick"])],2)],2)])),_:1},16,["title","class","onRegister"])}]]);export{F as default};
