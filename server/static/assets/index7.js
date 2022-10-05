import{r as t,cu as e,x as n,b as a,aQ as s,bx as o,v as u,al as r,a as l,bz as i,e as c,o as d,i as f,j as p,l as v,m,bA as b,bK as C,bC as y,h as S,bD as x,A as g,B as h,k as w,bS as z}from"./index.js";import{u as A}from"./useFormItem.js";var B=l(a({name:"CountButton",components:{Button:s},props:{value:{type:[Object,Number,String,Array]},count:{type:Number,default:60},beforeStartFunc:{type:Function,default:null}},setup(a){const s=t(!1),{currentCount:l,isStart:c,start:d,reset:f}=function(a){const s=t(a),o=t(!1);let u;function r(){u&&window.clearInterval(u)}function l(){o.value=!1,r(),u=null}function i(){n(o)||u||(o.value=!0,u=setInterval((()=>{1===n(s)?(l(),s.value=a):s.value-=1}),1e3))}function c(){s.value=a,l()}return e((()=>{c()})),{start:i,reset:c,restart:function(){c(),i()},clear:r,stop:l,currentCount:s,isStart:o}}(a.count),{t:p}=o(),v=u((()=>n(c)?p("component.countdown.sendText",[n(l)]):p("component.countdown.normalText")));return r((()=>{void 0===a.value&&f()})),{handleStart:function(){return t=this,e=null,n=function*(){const{beforeStartFunc:t}=a;if(t&&i(t)){s.value=!0;try{(yield t())&&d()}finally{s.value=!1}}else d()},new Promise(((a,s)=>{var o=t=>{try{r(n.next(t))}catch(e){s(e)}},u=t=>{try{r(n.throw(t))}catch(e){s(e)}},r=t=>t.done?a(t.value):Promise.resolve(t.value).then(o,u);r((n=n.apply(t,e)).next())}));var t,e,n},currentCount:l,loading:s,getButtonText:v,isStart:c}}}),[["render",function(t,e,n,a,s,o){const u=c("Button");return d(),f(u,b(t.$attrs,{disabled:t.isStart,onClick:t.handleStart,loading:t.loading}),{default:p((()=>[v(m(t.getButtonText),1)])),_:1},16,["disabled","onClick","loading"])}]]);const F=z(l(a({name:"CountDownInput",components:{CountButton:B},inheritAttrs:!1,props:{value:{type:String},size:{type:String,validator:t=>["default","large","small"].includes(t)},count:{type:Number,default:60},sendCodeApi:{type:Function,default:null}},setup(t){const{prefixCls:e}=C("countdown-input"),[n]=A(t);return{prefixCls:e,state:n}}}),[["render",function(t,e,n,a,s,o){const u=c("CountButton"),r=c("a-input");return d(),f(r,b(t.$attrs,{class:t.prefixCls,size:t.size,value:t.state}),y({addonAfter:p((()=>[w(u,{size:t.size,count:t.count,value:t.state,beforeStartFunc:t.sendCodeApi},null,8,["size","count","value","beforeStartFunc"])])),_:2},[S(Object.keys(t.$slots).filter((t=>"addonAfter"!==t)),(e=>({name:e,fn:p((n=>[x(t.$slots,e,g(h(n||{})))]))})))]),1040,["class","size","value"])}]]));z(B);export{F as C};
