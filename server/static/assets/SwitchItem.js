import{a as e,b as t,bK as n,bx as i,v as s,e as o,o as a,f as r,z as d,m as l,k as p,bA as m,bN as c}from"./index.js";import{S as u}from"./index5.js";import{b as h}from"./index34.js";import"./index28.js";import"./index9.js";import"./ArrowLeftOutlined.js";import"./createAsyncComponent.js";import"./index8.js";import"./FullscreenOutlined.js";import"./index10.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./uniqBy.js";import"./_baseIteratee.js";import"./get.js";import"./RedoOutlined.js";import"./lock.js";var f=e(t({name:"SwitchItem",components:{Switch:u},props:{event:{type:Number},disabled:{type:Boolean},title:{type:String},def:{type:Boolean}},setup(e){const{prefixCls:t}=n("setting-switch-item"),{t:o}=i();return{prefixCls:t,t:o,handleChange:function(t){e.event&&h(e.event,t)},getBindValue:s((()=>e.def?{checked:e.def}:{}))}}}),[["render",function(e,t,n,i,s,u){const h=o("Switch");return a(),r("div",{class:c(e.prefixCls)},[d("span",null,l(e.title),1),p(h,m(e.getBindValue,{onChange:e.handleChange,disabled:e.disabled,checkedChildren:e.t("layout.setting.on"),unCheckedChildren:e.t("layout.setting.off")}),null,16,["onChange","disabled","checkedChildren","unCheckedChildren"])],2)}],["__scopeId","data-v-fd7354e2"]]);export{f as default};
