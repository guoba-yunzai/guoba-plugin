import{de as e,x as t,I as s,aM as a,w as o}from"./index.js";import"./BasicForm.js";import{l as r}from"./lodash.default.js";function l(e,{emit:t}){let l=null;const i=n(),u=s((()=>i.models));let m=null;if(e.schemas){const[t]=a({schemas:e.schemas,labelWidth:120,labelAlign:"right",showActionButtonGroup:!1,baseColProps:{span:24},labelCol:{xs:24,sm:8},wrapperCol:{xs:24,sm:16}});m=function(e,s){t(e),o(u,(e=>r.merge(s,e)),{deep:!0,immediate:!0}),o(s,(e=>r.merge(u.value,e)),{deep:!0})}}function c(t){let s=e[`${t}Check`],a=!0;"function"==typeof s&&(a=s()),a&&p(t)}function p(e){t(e,{})}return[function(t){l=t,l.setProps(r.merge({prevBtn:{onClick:()=>c("prev")},nextBtn:{onClick:()=>c("next")}},e))},{emitStep:p,models:u,stepStore:i,registerForm:m}]}const n=e({id:"v2-steps",state:()=>({models:{mode:"full",installMode:"new",installPath:"",gitAddress:"gitee",userCookie:!0,groupBind:!0,userGacha:!0,miao_userData:!0,ach_userData:!0,cfg_basic:!0,commonCookie:!0,cfg_group:!0,cfg_groupDefault:!0,cfg_pushNews:!0,groupFace:!0,userNote:!0,redisClean:!1,rubbishClean:!0,moduleTool:"pnpm",transferJsMode:"passed",jsPluginInfo:{passed:null,noPass:null}},status:{state:0,logs:[],percent:0,reason:""},timer:null}),getters:{},actions:{updateStatus(){return e=this,s=null,a=function*(){this.status=yield t.get({url:"/v2-transfer/status"})},new Promise(((t,o)=>{var r=e=>{try{n(a.next(e))}catch(t){o(t)}},l=e=>{try{n(a.throw(e))}catch(t){o(t)}},n=e=>e.done?t(e.value):Promise.resolve(e.value).then(r,l);n((a=a.apply(e,s)).next())}));var e,s,a},startPolling(){this.timer||(this.timer=setInterval((()=>this.updateStatus()),1e3))},stopPolling(){this.timer&&(clearInterval(this.timer),this.timer=null)}}});export{l as a,n as u};
