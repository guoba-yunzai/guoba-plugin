import t from"./Step1.js";import e from"./Step2.js";import{u as s}from"./hooks.js";import{b as r,ad as o,r as i,J as a,w as m,e as p,o as n,f as j,i as l,m as u,W as d,s as v}from"./index.js";import"./Step1-1.js";import"./PathSelect.js";import"./index2.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./index3.js";import"./ModeBox.js";import"./StepBtn.js";import"./lodash.default.js";import"./upperFirst.js";import"./_baseIteratee.js";import"./get.js";import"./find.js";import"./throttle.js";import"./merge.js";import"./uniqBy.js";import"./Step1-2.js";import"./Step1-3.js";import"./BasicForm.js";import"./index4.js";import"./index5.js";import"./index6.js";import"./useFormItem.js";import"./transButton.js";import"./download.js";import"./index7.js";import"./index8.js";import"./Step1-4.js";import"./common.js";const c={key:3},x=r({__name:"TransferBox",setup(r){const x=o("isMobile",i(!1)),f=s(),S=i(!0),h=i(1),y=i("default");return x.value&&(y.value="small"),a((()=>{return t=this,e=null,s=function*(){yield f.updateStatus(),m((()=>f.status.state),(t=>{h.value=0===t?1:2}),{immediate:!0}),S.value=!1},new Promise(((r,o)=>{var i=t=>{try{m(s.next(t))}catch(e){o(e)}},a=t=>{try{m(s.throw(t))}catch(e){o(e)}},m=t=>t.done?r(t.value):Promise.resolve(t.value).then(i,a);m((s=s.apply(t,e)).next())}));var t,e,s})),(s,r)=>{const o=p("a-skeleton");return n(),j("div",{class:d(["transfer-box",{"is-mobile":v(x)}])},[S.value?(n(),l(o,{key:0,active:""})):1===h.value?(n(),l(t,{key:1})):2===h.value?(n(),l(e,{key:2})):(n(),j("span",c,"error step "+u(h.value),1))],2)}}});export{x as default};
