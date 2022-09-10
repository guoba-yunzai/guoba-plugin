var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,i=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,l=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&i(e,n,t[n]);if(r)for(var n of r(t))a.call(t,n)&&i(e,n,t[n]);return e},s=(e,t,n)=>new Promise(((r,o)=>{var a=e=>{try{l(n.next(e))}catch(t){o(t)}},i=e=>{try{l(n.throw(e))}catch(t){o(t)}},l=e=>e.done?r(e.value):Promise.resolve(e.value).then(a,i);l((n=n.apply(e,t)).next())}));import{B as u,a as c}from"./index30.js";import{d3 as p,x as d,a as m,b as f,bC as g,r as y,v as h,e as b,o as w,i as v,j as M,k as P,z as k,m as O,A as j,B as C,l as _,bV as D}from"./index.js";import{u as I}from"./usePrompt.js";import"./Prompt.js";function R(){return p.get({url:"/plugin/miao/help"},{errorMessageMode:"modal"})}function x(e,t,n,r){return s(this,null,(function*(){let o=new FormData;return o.append("helpCfg",JSON.stringify(d(e),null,2)),o.append("helpList",JSON.stringify(d(t),null,2)),o.append("icon",yield function(e){return s(this,null,(function*(){return yield new Promise((t=>{let n=document.createElement("canvas");n.width=1e3,n.height=1e3;let r,o,a=n.getContext("2d");for(let i=0;i<100;i++){let l=new Image;o=Math.floor(i/10),r=i-10*o,l.src=e[i+1];let s=r,u=o,c=i;l.onload=function(){a.drawImage(l,100*s,100*u,100,100),99===c&&n.toBlob((e=>t(e)))}}}))}))}(d(n))),o.append("main",yield function(e){const t=e.split(","),n=t[0].match(/:(.*?);/)[1],r=window.atob(t[1]);let o=r.length;const a=new Uint8Array(o);for(;o--;)a[o]=r.charCodeAt(o);return new Blob([a],{type:n})}(d(r))),p.post({url:"/plugin/miao/help",params:o},{errorMessageMode:"modal"})}))}function A(){return L("/plugin/miao/help/theme/main")}function B(){return L("/plugin/miao/help/theme/bg")}function L(e){return s(this,null,(function*(){let t=(yield p.get({url:e,responseType:"blob"},{isTransformResponse:!1,isReturnNativeResponse:!0,errorMessageMode:"modal"})).data;return yield function(e){return new Promise((t=>{let n=new FileReader;n.readAsDataURL(e),n.onload=function(e){t(e.target.result)}}))}(t)}))}function S(){return s(this,null,(function*(){let e=new Image;return e.src=yield L("/plugin/miao/help/icon"),yield new Promise((t=>e.onload=t)),yield function(e){return new Promise((t=>{e.setAttribute("crossOrigin","Anonymous");let n=document.createElement("canvas");n.width=100,n.height=100;let r=n.getContext("2d");if(r){let o,a,i=[];for(let t=0;t<100;t++)a=Math.floor(t/10),o=t-10*a,r.drawImage(e,100*o,100*a,100,100,0,0,100,100),i[t+1]=n.toDataURL(),r.clearRect(0,0,100,100);t(i)}else t(null)}))}(e)}))}const N=f({name:"BackupDrawer",components:{BasicDrawer:u},emits:["register","reload"],setup(e,{emit:r}){const o=g(),{createMessage:a}=D(),{createPrompt:i}=I(),u=y(!1),m=y([]),[f,{closeDrawer:b,setDrawerProps:w}]=c((function(){v()}));function v(){return s(this,null,(function*(){try{P(!0),m.value=(yield p.get({url:"/plugin/miao/help/backup/list"},{errorMessageMode:"modal"})).reverse()}finally{P(!1)}}))}function M(){b()}function P(e){u.value=e,w({confirmLoading:e})}return{getProps:h((()=>{let r={width:document.body.clientWidth>=768?700:"100%",title:"喵喵帮助备份",confirmLoading:d(u)};var a;return a=l(l(l({},d(o)),r),e),t(a,n({onOk:M,onCancel:M,onRegister:f}))})),loading:u,backupList:m,onAdd:function(){i({title:"新增备份",required:!0,placeholder:"请输入备注",onOk(e){return s(this,null,(function*(){var t;yield(t=e,p.post({url:"/plugin/miao/help/backup",params:{remark:t}},{errorMessageMode:"modal"})),yield v()}))}})},onRollback:function(e){return s(this,null,(function*(){try{P(!0),yield function(e){return p.post({url:"/plugin/miao/help/backup/restore",params:{id:e}},{errorMessageMode:"modal"})}(e),r("reload")}finally{P(!1)}}))},onDelete:function(e){return s(this,null,(function*(){try{if(e.isInit)return void a.warn("初始备份不可删除");P(!0),yield(t=id,p.delete({url:"/plugin/miao/help/backup/delete",params:{id:t}},{errorMessageMode:"modal"})),yield v()}finally{P(!1)}var t}))}}}}),z={style:{"margin-bottom":"8px"}},E=_("新增备份");var T=m(N,[["render",function(e,t,n,r,o,a){const i=b("a-button"),l=b("a-popconfirm"),s=b("a-list-item-meta"),u=b("a-list-item"),c=b("a-list"),p=b("a-spin"),d=b("BasicDrawer");return w(),v(d,j(C(e.getProps)),{default:M((()=>[P(p,{wrapperClassName:"p-2",spinning:e.loading},{default:M((()=>[k("div",z,[P(i,{type:"primary",preIcon:"ant-design:plus",onClick:e.onAdd},{default:M((()=>[E])),_:1},8,["onClick"])]),P(c,{size:"large",bordered:"",dataSource:e.backupList},{renderItem:M((({item:t})=>[P(u,null,{actions:M((()=>[P(l,{title:"确定要还原吗？",placement:"left",onConfirm:()=>e.onRollback(t.id)},{default:M((()=>[P(i,{type:"primary",shape:"circle",preIcon:"ant-design:undo"})])),_:2},1032,["onConfirm"]),P(l,{title:"确定要删除吗？",placement:"left",onConfirm:()=>e.onDelete(t)},{default:M((()=>[P(i,{type:"primary",shape:"circle",danger:"",preIcon:"ant-design:delete"})])),_:2},1032,["onConfirm"])])),default:M((()=>[P(s,{description:t.time},{title:M((()=>[k("span",null,O(t.remark),1)])),_:2},1032,["description"])])),_:2},1024)])),_:1},8,["dataSource"])])),_:1},8,["spinning"])])),_:1},16)}]]),U=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));export{T as B,B as a,A as b,S as c,U as d,R as g,x as s};
