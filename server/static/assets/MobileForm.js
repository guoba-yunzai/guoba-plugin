import{b as e,r as s,c as a,I as l,o,f as t,k as r,j as i,s as n,bN as m,bt as u,l as c,m as d,F as f,V as p,y as g}from"./index.js";import{F as b}from"./index4.js";import{C as v}from"./index8.js";import{u as x,a as y,_,L as h,b as k}from"./LoginFormTitle.js";import"./find.js";import"./_baseIteratee.js";import"./get.js";import"./useFormItem.js";const j=e({__name:"MobileForm",setup(e){const j=b.Item,{t:F}=g(),{handleBackLogin:I,getLoginState:C}=x(),{getFormRules:L}=y(),z=s(),B=s(!1),w=a({mobile:"",sms:""}),{validForm:M}=k(z),P=l((()=>n(C)===h.MOBILE));function R(){return e=this,s=null,a=function*(){const e=yield M();e&&console.log(e)},new Promise(((l,o)=>{var t=e=>{try{i(a.next(e))}catch(s){o(s)}},r=e=>{try{i(a.throw(e))}catch(s){o(s)}},i=e=>e.done?l(e.value):Promise.resolve(e.value).then(t,r);i((a=a.apply(e,s)).next())}));var e,s,a}return(e,s)=>P.value?(o(),t(f,{key:0},[r(_,{class:"enter-x"}),r(n(b),{class:"p-4 enter-x",model:w,rules:n(L),ref_key:"formRef",ref:z},{default:i((()=>[r(n(j),{name:"mobile",class:"enter-x"},{default:i((()=>[r(n(m),{size:"large",value:w.mobile,"onUpdate:value":s[0]||(s[0]=e=>w.mobile=e),placeholder:n(F)("sys.login.mobile"),class:"fix-auto-fill"},null,8,["value","placeholder"])])),_:1}),r(n(j),{name:"sms",class:"enter-x"},{default:i((()=>[r(n(v),{size:"large",class:"fix-auto-fill",value:w.sms,"onUpdate:value":s[1]||(s[1]=e=>w.sms=e),placeholder:n(F)("sys.login.smsCode")},null,8,["value","placeholder"])])),_:1}),r(n(j),{class:"enter-x"},{default:i((()=>[r(n(u),{type:"primary",size:"large",block:"",onClick:R,loading:B.value},{default:i((()=>[c(d(n(F)("sys.login.loginButton")),1)])),_:1},8,["loading"]),r(n(u),{size:"large",block:"",class:"mt-4",onClick:n(I)},{default:i((()=>[c(d(n(F)("sys.login.backSignIn")),1)])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model","rules"])],64)):p("",!0)}});export{j as default};
