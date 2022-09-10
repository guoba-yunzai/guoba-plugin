import{u as e,a,L as s,_ as l,b as o}from"./LoginFormTitle.js";import{b as r,I as t,bD as n,r as i,c,v as d,x as m,o as u,f as p,k as f,j as g,l as v,m as x,aS as y,F as h,bU as _}from"./index.js";import{F as b}from"./index2.js";import{a as k}from"./index4.js";import{S as w}from"./index7.js";import{C as j}from"./index8.js";import"./_baseIteratee.js";import"./get.js";import"./useFormItem.js";const z=r({__name:"RegisterForm",setup(r){const z=b.Item,P=t.Password,{t:F}=n(),{handleBackLogin:U,getLoginState:I}=e(),C=i(),R=i(!1),S=c({account:"",password:"",confirmPassword:"",mobile:"",sms:"",policy:!1}),{getFormRules:L}=a(S),{validForm:T}=o(C),B=d((()=>m(I)===s.REGISTER));function E(){return e=this,a=null,s=function*(){yield T()},new Promise(((l,o)=>{var r=e=>{try{n(s.next(e))}catch(a){o(a)}},t=e=>{try{n(s.throw(e))}catch(a){o(a)}},n=e=>e.done?l(e.value):Promise.resolve(e.value).then(r,t);n((s=s.apply(e,a)).next())}));var e,a,s}return(e,a)=>m(B)?(u(),p(h,{key:0},[f(l,{class:"enter-x"}),f(m(b),{class:"p-4 enter-x",model:S,rules:m(L),ref_key:"formRef",ref:C},{default:g((()=>[f(m(z),{name:"account",class:"enter-x"},{default:g((()=>[f(m(t),{class:"fix-auto-fill",size:"large",value:S.account,"onUpdate:value":a[0]||(a[0]=e=>S.account=e),placeholder:m(F)("sys.login.userName")},null,8,["value","placeholder"])])),_:1}),f(m(z),{name:"mobile",class:"enter-x"},{default:g((()=>[f(m(t),{size:"large",value:S.mobile,"onUpdate:value":a[1]||(a[1]=e=>S.mobile=e),placeholder:m(F)("sys.login.mobile"),class:"fix-auto-fill"},null,8,["value","placeholder"])])),_:1}),f(m(z),{name:"sms",class:"enter-x"},{default:g((()=>[f(m(j),{size:"large",class:"fix-auto-fill",value:S.sms,"onUpdate:value":a[2]||(a[2]=e=>S.sms=e),placeholder:m(F)("sys.login.smsCode")},null,8,["value","placeholder"])])),_:1}),f(m(z),{name:"password",class:"enter-x"},{default:g((()=>[f(m(w),{size:"large",value:S.password,"onUpdate:value":a[3]||(a[3]=e=>S.password=e),placeholder:m(F)("sys.login.password")},null,8,["value","placeholder"])])),_:1}),f(m(z),{name:"confirmPassword",class:"enter-x"},{default:g((()=>[f(m(P),{size:"large",visibilityToggle:"",value:S.confirmPassword,"onUpdate:value":a[4]||(a[4]=e=>S.confirmPassword=e),placeholder:m(F)("sys.login.confirmPassword")},null,8,["value","placeholder"])])),_:1}),f(m(z),{class:"enter-x",name:"policy"},{default:g((()=>[f(m(k),{checked:S.policy,"onUpdate:checked":a[5]||(a[5]=e=>S.policy=e),size:"small"},{default:g((()=>[v(x(m(F)("sys.login.policy")),1)])),_:1},8,["checked"])])),_:1}),f(m(y),{type:"primary",class:"enter-x",size:"large",block:"",onClick:E,loading:R.value},{default:g((()=>[v(x(m(F)("sys.login.registerButton")),1)])),_:1},8,["loading"]),f(m(y),{size:"large",block:"",class:"mt-4 enter-x",onClick:m(U)},{default:g((()=>[v(x(m(F)("sys.login.backSignIn")),1)])),_:1},8,["onClick"])])),_:1},8,["model","rules"])],64)):_("",!0)}});export{z as default};
