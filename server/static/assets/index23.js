import{dV as t,eQ as e}from"./index.js";const n=t({id:"guoba",state:()=>({plugins:null}),getters:{},actions:{getPlugins(t=!1){return n=this,s=null,i=function*(){if(t||null==this.plugins){let n=yield e.getPlugins(t);return this.plugins=n,n}return this.plugins||[]},new Promise(((t,e)=>{var l=t=>{try{u(i.next(t))}catch(n){e(n)}},r=t=>{try{u(i.throw(t))}catch(n){e(n)}},u=e=>e.done?t(e.value):Promise.resolve(e.value).then(l,r);u((i=i.apply(n,s)).next())}));var n,s,i}}});export{n as u};
