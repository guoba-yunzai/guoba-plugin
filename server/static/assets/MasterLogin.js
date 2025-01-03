import{d as defineComponent,C as computed,a3 as useUserStore,a4 as router,a5 as defHttp,n as nextTick,b as _export_sfc,e as createElementBlock,o as openBlock}from"./index.js";const MasterLogin=_export_sfc(defineComponent({name:"MasterLogin",setup(){let code=computed((()=>router.currentRoute.value.params.code));const userStore=useUserStore();return function(){return __this=this,__arguments=null,generator=function*(){let{ok:ok,result:result}=yield defHttp.post({url:"/login/quick",params:{code:code.value}},{retryRequest:{isOpenRetry:!1},isTransformResponse:!1});ok&&result&&result.token&&(userStore.setToken(result.token),yield nextTick()),router.replace("/login")},new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));var __this,__arguments,generator}(),{}}}),[["render",function(_ctx,_cache,$props,$setup,$data,$options){return openBlock(),createElementBlock("div",null," 登录中…… ")}]]);export{MasterLogin as default};
