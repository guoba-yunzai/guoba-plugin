import{b as e,bE as s,r as a,c as l,v as o,x as t,o as r,f as i,k as n,j as m,I as u,aR as c,l as d,m as f,F as p,bV as g}from"./index.js";import{F as b}from"./index2.js";import{C as v}from"./index7.js";import{u as x,a as y,L as _,_ as h,b as k}from"./LoginFormTitle.js";import"./_baseIteratee.js";import"./get.js";import"./useFormItem.js";const j=e({__name:"MobileForm",setup(e){const j=b.Item,{t:F}=s(),{handleBackLogin:I,getLoginState:C}=x(),{getFormRules:L}=y(),z=a(),B=a(!1),R=l({mobile:"",sms:""}),{validForm:w}=k(z),E=o((()=>t(C)===_.MOBILE));function M(){return e=this,s=null,a=function*(){yield w()},new Promise(((l,o)=>{var t=e=>{try{i(a.next(e))}catch(s){o(s)}},r=e=>{try{i(a.throw(e))}catch(s){o(s)}},i=e=>e.done?l(e.value):Promise.resolve(e.value).then(t,r);i((a=a.apply(e,s)).next())}));var e,s,a}return(e,s)=>t(E)?(r(),i(p,{key:0},[n(h,{class:"enter-x"}),n(t(b),{class:"p-4 enter-x",model:R,rules:t(L),ref_key:"formRef",ref:z},{default:m((()=>[n(t(j),{name:"mobile",class:"enter-x"},{default:m((()=>[n(t(u),{size:"large",value:R.mobile,"onUpdate:value":s[0]||(s[0]=e=>R.mobile=e),placeholder:t(F)("sys.login.mobile"),class:"fix-auto-fill"},null,8,["value","placeholder"])])),_:1}),n(t(j),{name:"sms",class:"enter-x"},{default:m((()=>[n(t(v),{size:"large",class:"fix-auto-fill",value:R.sms,"onUpdate:value":s[1]||(s[1]=e=>R.sms=e),placeholder:t(F)("sys.login.smsCode")},null,8,["value","placeholder"])])),_:1}),n(t(j),{class:"enter-x"},{default:m((()=>[n(t(c),{type:"primary",size:"large",block:"",onClick:M,loading:B.value},{default:m((()=>[d(f(t(F)("sys.login.loginButton")),1)])),_:1},8,["loading"]),n(t(c),{size:"large",block:"",class:"mt-4",onClick:t(I)},{default:m((()=>[d(f(t(F)("sys.login.backSignIn")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","rules"])],64)):g("",!0)}});export{j as default};
