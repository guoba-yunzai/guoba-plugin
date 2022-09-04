var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,o,n)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,i=(e,t)=>{for(var o in t||(t={}))r.call(t,o)&&a(e,o,t[o]);if(n)for(var o of n(t))s.call(t,o)&&a(e,o,t[o]);return e},l=(e,n)=>t(e,o(n));import{a as u,b as p,p as m,r as f,c as d,w as c,t as j,e as b,o as y,f as g,F as h,h as v,i as w,j as O,k as x,l as C,m as F,n as P,q as k}from"./index.js";import{u as V}from"./usePrompt.js";import"./Prompt.js";import"./BasicForm.js";import"./index2.js";import"./_baseIteratee.js";import"./get.js";import"./index4.js";import"./index5.js";import"./index6.js";import"./useFormItem.js";import"./transButton.js";import"./index3.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./download.js";import"./index7.js";import"./index8.js";import"./uniqBy.js";import"./useForm.js";const I=p({name:"GTags",inheritAttrs:!1,props:{value:m.array.def((()=>[])),allowAdd:m.bool.def(!1),allowDel:m.bool.def(!1),showPrompt:m.bool.def(!1),promptProps:m.object.def((()=>({}))),valueFormatter:m.oneOfType([m.func,m.string])},emits:["change"],setup(e,{emit:t}){const{createPrompt:o}=V(),n=f(),r=d({tags:[],inputVisible:!1,inputValue:""});function s(){const e=r.inputValue;let t=r.tags;e&&-1===t.indexOf(e)&&(t=[...t,a(e)]),Object.assign(r,{tags:t,inputVisible:!1,inputValue:""}),u()}function a(t){if(e.valueFormatter){if("function"!=typeof e.valueFormatter)return new Function(`return ${e.valueFormatter}`)()(t);e.valueFormatter(t)}return t}function u(){t("change",r.tags)}return c((()=>e.value),(e=>{r.tags=null==e?[]:e}),{immediate:!0}),l(i({},j(r)),{handleClose:function(e){r.tags=r.tags.filter((t=>t!==e)),u()},showInput:function(){e.showPrompt?o(l(i({title:"添加",required:!0},e.promptProps),{onOk(e){r.inputValue=e,s()}})):(r.inputVisible=!0,k((()=>{n.value.focus()})))},handleInputConfirm:s,inputRef:n})}}),B=C(" 新增 ");var _=u(I,[["render",function(e,t,o,n,r,s){const a=b("a-tag"),i=b("a-tooltip"),l=b("a-input"),u=b("icon");return y(),g(h,null,[(y(!0),g(h,null,v(e.tags,(t=>(y(),g(h,{key:t},[t.length>20?(y(),w(i,{key:0,title:t},{default:O((()=>[x(a,{closable:"",onClose:o=>e.handleClose(t)},{default:O((()=>[C(F(`${t.slice(0,20)}...`),1)])),_:2},1032,["onClose"])])),_:2},1032,["title"])):(y(),w(a,{key:1,closable:"",onClose:o=>e.handleClose(t)},{default:O((()=>[C(F(t),1)])),_:2},1032,["onClose"]))],64)))),128)),e.inputVisible?(y(),w(l,{key:0,ref:"inputRef",value:e.inputValue,"onUpdate:value":t[0]||(t[0]=t=>e.inputValue=t),type:"text",size:"small",style:{width:"78px"},onBlur:e.handleInputConfirm,onKeyup:P(e.handleInputConfirm,["enter"])},null,8,["value","onBlur","onKeyup"])):(y(),w(a,{key:1,style:{background:"#fff","border-style":"dashed",cursor:"pointer"},onClick:e.showInput},{default:O((()=>[x(u,{icon:"ant-design:plus"}),B])),_:1},8,["onClick"]))],64)}]]);export{_ as default};