import{a as e,b as t,b5 as s,bR as a,e as i,o as l,f as n,F as p,h as r,i as o,j as c,z as d,bU as f,cV as u,cW as m}from"./index.js";const y=t({name:"MenuTypePicker",components:{Tooltip:s},props:{menuTypeList:{type:Array,defualt:()=>[]},handler:{type:Function,default:()=>({})},def:{type:String,default:""}},setup(){const{prefixCls:e}=a("setting-menu-type-picker");return{prefixCls:e}}}),x=["onClick"],_=[(e=>(u("data-v-7796e69a"),e=e(),m(),e))((()=>d("div",{class:"mix-sidebar"},null,-1)))];var C=e(y,[["render",function(e,t,s,a,u,m){const y=i("Tooltip");return l(),n("div",{class:f(e.prefixCls)},[(l(!0),n(p,null,r(e.menuTypeList||[],(t=>(l(),o(y,{key:t.title,title:t.title,placement:"bottom"},{default:c((()=>[d("div",{onClick:s=>e.handler(t),class:f([`${e.prefixCls}__item`,`${e.prefixCls}__item--${t.type}`,{[`${e.prefixCls}__item--active`]:e.def===t.type}])},_,10,x)])),_:2},1032,["title"])))),128))],2)}],["__scopeId","data-v-7796e69a"]]);export{C as default};
