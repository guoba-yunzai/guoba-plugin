var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__async=(__this,__arguments,generator)=>new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));import{a5 as defHttp,d as defineComponent,aK as ScrollContainer,p as propTypes,r as ref,an as onMounted,B as useForm,n as nextTick,A as useMessage,b as _export_sfc,c as resolveComponent,o as openBlock,e as createElementBlock,F as Fragment,f as renderList,h as createBlock}from"./index.js";import"./BasicForm.vue_vue_type_style_index_0_lang.js";import"./index19.js";import CardForm from"./CardForm.js";import ArrayForm from"./ArrayForm.js";function queryConfigTabs(){return defHttp.get({url:"/config/tabs"})}const ConfigForm=_export_sfc(defineComponent({name:"ConfigForm",components:{ArrayForm:ArrayForm,CardForm:CardForm,ScrollContainer:ScrollContainer},props:{cards:propTypes.object.isRequired.type},setup(props){const{createMessage:createMessage}=useMessage(),keyForms=ref({}),arrayForms=ref({}),forms=ref(props.cards.map((function(card){if("keyFormCard"===card.type)return keyForms.value[card.key]=[],{key:card.key,loading:!1,isKeyForm:!0,card:card};if("arrayFormCard"===card.type)return arrayForms.value[card.key]=[],{key:card.key,loading:!1,isArrayForm:!0,card:card};return useNormalForm(card)})));function useNormalForm(card,other){const[register,actions]=useForm({labelWidth:120,schemas:card.schemas,labelAlign:"right",showActionButtonGroup:!1,baseColProps:{span:24}});return __spreadValues({key:card.key,loading:!1,register:register,actions:actions},other)}function onRedo(form){return __async(this,null,(function*(){var _a,_b,key;try{form.loading=!0;let configKey=form.key;form.isKeyForm&&(configKey=form.card.key);let values=yield(key=configKey,defHttp.get({url:"/config/data",params:{key:key}},{errorMessageMode:"modal"}));if(form.isKeyForm){let replaceFn=s=>s.replace(/^INTEGER__/,""),keys=Object.keys(values),oldKeys=[],newKeys=[],removeKeys=[],forms2=null!=(_a=keyForms.value[form.card.key])?_a:[];keys.forEach((k=>{forms2.find((f=>f.key===replaceFn(k)))||newKeys.push(k)})),forms2.forEach((f=>{keys.find((k=>replaceFn(k)===f.key))||removeKeys.push(f.key)})),oldKeys=keys.filter((k=>!newKeys.includes(k)&&!removeKeys.includes(k)));let setFormValue=(form2,fieldKey)=>{var _a2;let formValues={};for(const[fKey,value]of Object.entries(values))if(fKey===fieldKey){formValues[fieldKey]=value;break}formValues[fieldKey]&&(null==(_a2=form2.actions)||_a2.setFieldsValue(formValues[fieldKey]))},newForm=newKeys.map((key=>{let fieldKey=key,keyForm=useNormalForm({key:replaceFn(key),schemas:form.card.schemas},{fieldKey:fieldKey,isKeyForm:form.isKeyForm,card:form.card,values:values[key]}),_register=keyForm.register;return keyForm.register=function(...args){_register(...args),nextTick((()=>setFormValue(keyForm,fieldKey)))},keyForm})),sortFn=i=>(a,b)=>"default"===a.key?i:a.key.localeCompare(b.key);forms2=forms2.concat(newForm).filter((f=>!removeKeys.includes(f.key))),forms2=forms2.sort(sortFn(1)).sort(sortFn(-1)),forms2.forEach((f=>{for(const fieldKey of oldKeys)if(replaceFn(fieldKey)===f.key){nextTick((()=>setFormValue(f,fieldKey)));break}})),keyForms.value[form.card.key]=forms2}else form.isArrayForm?arrayForms.value[form.key]=values:yield null==(_b=form.actions)?void 0:_b.setFieldsValue(values)}finally{form.loading=!1}}))}function onSubmit(form){return __async(this,null,(function*(){var _a,key,data;try{form.loading=!0;let values=yield null==(_a=form.actions)?void 0:_a.validate(),configKey=form.key;if(form.isKeyForm){configKey=form.card.key;let entries=Object.entries(values);values={};for(let[field,value]of entries)if(field.includes(".")){let[pKey,cKey]=field.split(".");values[pKey]||(values[pKey]={}),values[pKey][cKey]=value}else values[field]=value}form.fieldKey&&(values={[form.fieldKey]:values}),yield(key=configKey,data=values,defHttp.post({url:"/config/data",params:{key:key,data:data}},{trimValues:!1})),createMessage.success("保存成功~"),yield onRedo(form)}finally{form.loading=!1}}))}return onMounted((()=>{for(let form of forms.value)onRedo(form)})),{forms:forms,keyForms:keyForms,arrayForms:arrayForms,onRedo:onRedo,onSubmit:onSubmit,onAddCard:function(_0){return __async(this,arguments,(function*({form:form,key:key}){if(keyForms.value[form.card.key].findIndex((f=>f.key===key))>-1)return createMessage.warn("已存在相同的配置"),!1;yield onSubmit(__spreadProps(__spreadValues({},form),{key:key,fieldKey:"INTEGER__"+key,actions:__spreadProps(__spreadValues({},form.actions),{validate:()=>__async(this,null,(function*(){return{__place__:0}}))})}))}))},onDelCard:function(_0){return __async(this,arguments,(function*({form:form}){try{form.loading=!0;let formKey=form.fieldKey,cardKey=form.card.key;yield function(formKey,cardKey){return defHttp.delete({url:"/config/card-Form",params:{formKey:formKey,cardKey:cardKey}},{errorMessageMode:"modal"})}(formKey,cardKey),createMessage.success("删除成功~"),yield onRedo(form)}finally{form.loading=!1}}))}}}}),[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_CardForm=resolveComponent("CardForm"),_component_ArrayForm=resolveComponent("ArrayForm");return openBlock(),createElementBlock("div",null,[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.cards,((card,idx)=>(openBlock(),createElementBlock(Fragment,{key:card.key},["keyFormCard"===card.type?(openBlock(!0),createElementBlock(Fragment,{key:0},renderList(_ctx.keyForms[card.key],(keyForm=>(openBlock(),createBlock(_component_CardForm,{key:keyForm.key,card:card,form:keyForm,isDefault:"default"===keyForm.key,allowFold:"default"!==keyForm.key,defaultFold:"",onRedo:_ctx.onRedo,onSubmit:_ctx.onSubmit,onAddCard:_ctx.onAddCard,onDelCard:_ctx.onDelCard},null,8,["card","form","isDefault","allowFold","onRedo","onSubmit","onAddCard","onDelCard"])))),128)):"arrayFormCard"===card.type?(openBlock(),createBlock(_component_ArrayForm,{key:1,card:card,form:_ctx.forms[idx],value:_ctx.arrayForms[card.key],onRedo:_ctx.onRedo,onSubmit:_ctx.onSubmit},null,8,["card","form","value","onRedo","onSubmit"])):(openBlock(),createBlock(_component_CardForm,{key:2,card:card,form:_ctx.forms[idx],onRedo:_ctx.onRedo,onSubmit:_ctx.onSubmit},null,8,["card","form","onRedo","onSubmit"]))],64)))),128))])}]]),ConfigForm$1=Object.freeze(Object.defineProperty({__proto__:null,default:ConfigForm},Symbol.toStringTag,{value:"Module"}));export{ConfigForm as C,ConfigForm$1 as a,queryConfigTabs as q};
