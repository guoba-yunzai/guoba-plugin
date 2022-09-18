import{u as e,a,L as s,_ as l,b as o}from"./LoginFormTitle.js";import{b as r,I as t,bE as n,r as i,c,v as d,x as u,o as m,f as p,k as f,j as g,bk as v,l as y,m as x,aR as h,F as b,bV as _}from"./index.js";import{F as k}from"./index2.js";import{S as w}from"./index6.js";import{C as j}from"./index7.js";import"./_baseIteratee.js";import"./get.js";import"./useFormItem.js";const z=r({__name:"RegisterForm",setup(r){const z=k.Item,P=t.Password,{t:F}=n(),{handleBackLogin:I,getLoginState:R}=e(),U=i(),C=i(!1),L=c({account:"",password:"",confirmPassword:"",mobile:"",sms:"",policy:!1}),{getFormRules:S}=a(L),{validForm:E}=o(U),T=d((()=>u(R)===s.REGISTER));function B(){return e=this,a=null,s=function*(){yield E()},new Promise(((l,o)=>{var r=e=>{try{n(s.next(e))}catch(a){o(a)}},t=e=>{try{n(s.throw(e))}catch(a){o(a)}},n=e=>e.done?l(e.value):Promise.resolve(e.value).then(r,t);n((s=s.apply(e,a)).next())}));var e,a,s}return(e,a)=>u(T)?(m(),p(b,{key:0},[f(l,{class:"enter-x"}),f(u(k),{class:"p-4 enter-x",model:L,rules:u(S),ref_key:"formRef",ref:U},{default:g((()=>[f(u(z),{name:"account",class:"enter-x"},{default:g((()=>[f(u(t),{class:"fix-auto-fill",size:"large",value:L.account,"onUpdate:value":a[0]||(a[0]=e=>L.account=e),placeholder:u(F)("sys.login.userName")},null,8,["value","placeholder"])])),_:1}),f(u(z),{name:"mobile",class:"enter-x"},{default:g((()=>[f(u(t),{size:"large",value:L.mobile,"onUpdate:value":a[1]||(a[1]=e=>L.mobile=e),placeholder:u(F)("sys.login.mobile"),class:"fix-auto-fill"},null,8,["value","placeholder"])])),_:1}),f(u(z),{name:"sms",class:"enter-x"},{default:g((()=>[f(u(j),{size:"large",class:"fix-auto-fill",value:L.sms,"onUpdate:value":a[2]||(a[2]=e=>L.sms=e),placeholder:u(F)("sys.login.smsCode")},null,8,["value","placeholder"])])),_:1}),f(u(z),{name:"password",class:"enter-x"},{default:g((()=>[f(u(w),{size:"large",value:L.password,"onUpdate:value":a[3]||(a[3]=e=>L.password=e),placeholder:u(F)("sys.login.password")},null,8,["value","placeholder"])])),_:1}),f(u(z),{name:"confirmPassword",class:"enter-x"},{default:g((()=>[f(u(P),{size:"large",visibilityToggle:"",value:L.confirmPassword,"onUpdate:value":a[4]||(a[4]=e=>L.confirmPassword=e),placeholder:u(F)("sys.login.confirmPassword")},null,8,["value","placeholder"])])),_:1}),f(u(z),{class:"enter-x",name:"policy"},{default:g((()=>[f(u(v),{checked:L.policy,"onUpdate:checked":a[5]||(a[5]=e=>L.policy=e),size:"small"},{default:g((()=>[y(x(u(F)("sys.login.policy")),1)])),_:1},8,["checked"])])),_:1}),f(u(h),{type:"primary",class:"enter-x",size:"large",block:"",onClick:B,loading:C.value},{default:g((()=>[y(x(u(F)("sys.login.registerButton")),1)])),_:1},8,["loading"]),f(u(h),{size:"large",block:"",class:"mt-4 enter-x",onClick:u(I)},{default:g((()=>[y(x(u(F)("sys.login.backSignIn")),1)])),_:1},8,["onClick"])])),_:1},8,["model","rules"])],64)):_("",!0)}});export{z as default};
