var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,a=(t,r,i)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i,s=(e,t)=>{for(var r in t||(t={}))n.call(t,r)&&a(e,r,t[r]);if(i)for(var r of i(t))o.call(t,r)&&a(e,r,t[r]);return e},l=(e,t,r)=>new Promise(((i,n)=>{var o=e=>{try{s(r.next(e))}catch(t){n(t)}},a=e=>{try{s(r.throw(e))}catch(t){n(t)}},s=e=>e.done?i(e.value):Promise.resolve(e.value).then(o,a);s((r=r.apply(e,t)).next())}));import{B as p,a as m}from"./index29.js";import{a as c,b as d,bD as u,r as f,v as y,x as j,e as b,o as g,i as w,j as v,k as h,z as x,m as O,A as P,B as k,l as D,bW as _}from"./index.js";import{u as B}from"./usePrompt.js";import"./Prompt.js";import{b as C,c as I,r as F,d as L}from"./miao.api.js";import"./index9.js";import"./ArrowLeftOutlined.js";import"./BasicForm.js";import"./index2.js";import"./_baseIteratee.js";import"./get.js";import"./index4.js";import"./index5.js";import"./useFormItem.js";import"./transButton.js";import"./index3.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./download.js";import"./index6.js";import"./index7.js";import"./uniqBy.js";import"./useForm.js";const A=d({name:"BackupDrawer",components:{BasicDrawer:p},emits:["register","reload"],setup(e,{emit:i}){const n=u(),{createMessage:o}=_(),{createPrompt:a}=B(),p=f(!1),c=f([]),[d,{closeDrawer:b,setDrawerProps:g}]=m((function(){w()}));function w(){return l(this,null,(function*(){try{h(!0),c.value=(yield C()).reverse()}finally{h(!1)}}))}function v(){b()}function h(e){p.value=e,g({confirmLoading:e})}return{getProps:y((()=>{let i={width:document.body.clientWidth>=768?700:"100%",title:"喵喵帮助备份",confirmLoading:j(p)};var o;return o=s(s(s({},j(n)),i),e),t(o,r({onOk:v,onCancel:v,onRegister:d}))})),loading:p,backupList:c,onAdd:function(){a({title:"新增备份",required:!0,placeholder:"请输入备注",onOk(e){return l(this,null,(function*(){yield I(e),yield w()}))}})},onRollback:function(e){return l(this,null,(function*(){try{h(!0),yield F(e),i("reload")}finally{h(!1)}}))},onDelete:function(e){return l(this,null,(function*(){try{if(e.isInit)return void o.warn("初始备份不可删除");h(!0),yield L(e.id),yield w()}finally{h(!1)}}))}}}}),S={style:{"margin-bottom":"8px"}},z=D("新增备份");var R=c(A,[["render",function(e,t,r,i,n,o){const a=b("a-button"),s=b("a-popconfirm"),l=b("a-list-item-meta"),p=b("a-list-item"),m=b("a-list"),c=b("a-spin"),d=b("BasicDrawer");return g(),w(d,P(k(e.getProps)),{default:v((()=>[h(c,{wrapperClassName:"p-2",spinning:e.loading},{default:v((()=>[x("div",S,[h(a,{type:"primary",preIcon:"ant-design:plus",onClick:e.onAdd},{default:v((()=>[z])),_:1},8,["onClick"])]),h(m,{size:"large",bordered:"",dataSource:e.backupList},{renderItem:v((({item:t})=>[h(p,null,{actions:v((()=>[h(s,{title:"确定要还原吗？",placement:"left",onConfirm:()=>e.onRollback(t.id)},{default:v((()=>[h(a,{type:"primary",shape:"circle",preIcon:"ant-design:undo"})])),_:2},1032,["onConfirm"]),h(s,{title:"确定要删除吗？",placement:"left",onConfirm:()=>e.onDelete(t)},{default:v((()=>[h(a,{type:"primary",shape:"circle",danger:"",preIcon:"ant-design:delete"})])),_:2},1032,["onConfirm"])])),default:v((()=>[h(l,{description:t.time},{title:v((()=>[x("span",null,O(t.remark),1)])),_:2},1032,["description"])])),_:2},1024)])),_:1},8,["dataSource"])])),_:1},8,["spinning"])])),_:1},16)}]]);export{R as default};
