import{d8 as r,b as e,r as o,bx as t,ef as s,w as i,q as n,bZ as a,e as l,o as m,f as p,F as u,h as d,Y as c,Z as j,k as f,x as y,j as g,l as x,m as b,i as v,bO as h}from"./index.js";import w from"./DetailModal.js";import{B as k}from"./TableImg.js";import{T as L}from"./BasicForm.js";import{u as C}from"./useTable.js";import{b as F}from"./index3.js";import{getColumns as T}from"./data2.js";import"./index13.js";import"./get.js";import"./useForm.js";import"./index12.js";import"./index14.js";import"./onMountedOrActivated.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./ArrowLeftOutlined.js";import"./transButton.js";import"./index4.js";import"./index5.js";import"./merge.js";import"./upperFirst.js";import"./_baseIteratee.js";import"./sortable.esm.js";import"./RedoOutlined.js";import"./FullscreenOutlined.js";import"./scrollTo.js";import"./index19.js";import"./index2.js";import"./find.js";import"./useFormItem.js";import"./download.js";import"./index6.js";import"./index7.js";import"./uniqBy.js";const _={class:"p-4"},R=["src"],A=e({__name:"index",setup(e){const A=o(),E=o([]),{t:I}=t(),O=s(),[B,{setTableData:D}]=C({title:I("sys.errorLog.tableTitle"),columns:T(),actionColumn:{width:80,title:"Action",dataIndex:"action"}}),[M,{openModal:q}]=F();function P(r){A.value=r,q(!0)}function V(){throw new Error("fire vue error!")}function Z(){E.value.push(`${(new Date).getTime()}.png`)}function z(){return e=this,o=null,t=function*(){yield r.get({url:"/error"})},new Promise(((r,s)=>{var i=r=>{try{a(t.next(r))}catch(e){s(e)}},n=r=>{try{a(t.throw(r))}catch(e){s(e)}},a=e=>e.done?r(e.value):Promise.resolve(e.value).then(i,n);a((t=t.apply(e,o)).next())}));var e,o,t}return i((()=>O.getErrorLogInfoList),(r=>{n((()=>{D(a(r))}))}),{immediate:!0}),(r,e)=>{const o=l("a-button");return m(),p("div",_,[(m(!0),p(u,null,d(E.value,(r=>c((m(),p("img",{key:r,src:r,alt:""},null,8,R)),[[j,!1]]))),128)),f(w,{info:A.value,onRegister:y(M)},null,8,["info","onRegister"]),f(y(k),{onRegister:y(B),class:"error-handle-table"},{toolbar:g((()=>[f(o,{onClick:V,type:"primary"},{default:g((()=>[x(b(y(I)("sys.errorLog.fireVueError")),1)])),_:1}),f(o,{onClick:Z,type:"primary"},{default:g((()=>[x(b(y(I)("sys.errorLog.fireResourceError")),1)])),_:1}),f(o,{onClick:z,type:"primary"},{default:g((()=>[x(b(y(I)("sys.errorLog.fireAjaxError")),1)])),_:1})])),bodyCell:g((({column:r,record:e})=>["action"===r.key?(m(),v(y(L),{key:0,actions:[{label:y(I)("sys.errorLog.tableActionDesc"),onClick:P.bind(null,e)}]},null,8,["actions"])):h("",!0)])),_:1},8,["onRegister"])])}}});export{A as default};
