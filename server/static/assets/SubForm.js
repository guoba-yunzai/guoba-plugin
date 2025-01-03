var __defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value}):obj[key]=value,__async=(__this,__arguments,generator)=>new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));import{j as createVNode,I as Icon,d as defineComponent,p as propTypes,s as inject,r as ref,c as resolveComponent,o as openBlock,e as createElementBlock,F as Fragment,f as renderList,v as createBaseVNode,m as toDisplayString,x as createCommentVNode,y as unref,z as normalizeClass,A as useMessage,B as useForm,C as computed,h as createBlock,i as withCtx,D as mergeProps,k as createTextVNode,E as useDesign,w as watch,G as provide}from"./index.js";import{u as useModalInner,B as BasicModal,a as useModal}from"./index19.js";import BasicForm from"./BasicForm.js";import"./BasicForm.vue_vue_type_style_index_0_lang.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./upperFirst.js";import"./uniqBy.js";import"./index21.js";import"./index22.js";import"./useFormItem.js";/* empty css       */import"./DeleteOutlined.js";import"./transButton.js";import"./download.js";import"./index23.js";import"./index24.js";var MinusCircleFilled$1={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"}}]},name:"minus-circle",theme:"filled"};function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?Object(arguments[i]):{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter((function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable})))),ownKeys.forEach((function(key){_defineProperty(target,key,source[key])}))}return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var MinusCircleFilled=function(props,context){var p=_objectSpread({},props,context.attrs);return createVNode(Icon,_objectSpread({},p,{icon:MinusCircleFilled$1}),null)};MinusCircleFilled.displayName="MinusCircleFilled",MinusCircleFilled.inheritAttrs=!1;const SCHEMAS_KEY=Symbol(),PREFIX_CLS_KEY=Symbol(),_hoisted_1$1={key:0,class:"card-item"},_hoisted_2={class:"label"},_hoisted_3={class:"value"},_sfc_main$3=defineComponent({__name:"SettingCard",props:{models:propTypes.object.def((()=>({}))),allowRemove:propTypes.bool.def(!1)},emits:["remove"],setup(__props,{emit:__emit}){const emit=__emit,prefixCls=inject(PREFIX_CLS_KEY),schemas=inject(SCHEMAS_KEY,ref([])),{createConfirmSync:createConfirmSync}=useMessage();function onRemove(e){return __async(this,null,(function*(){e.stopPropagation(),(yield createConfirmSync({title:"删除",content:"确定删除吗？"}))&&emit("remove")}))}return(_ctx,_cache)=>{const _component_GSpan=resolveComponent("GSpan");return openBlock(),createElementBlock("div",{class:normalizeClass([`${unref(prefixCls)}-card`])},[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(schemas),(schema=>(openBlock(),createElementBlock(Fragment,null,["Divider"!==schema.component?(openBlock(),createElementBlock("div",_hoisted_1$1,[createBaseVNode("div",_hoisted_2,toDisplayString(schema.label),1),createBaseVNode("div",_hoisted_3,[createVNode(_component_GSpan,{value:__props.models[schema.field],password:"InputPassword"===schema.component},null,8,["value","password"])])])):createCommentVNode("",!0)],64)))),256)),__props.allowRemove?(openBlock(),createElementBlock("div",{key:0,class:"remove",onClick:onRemove},[createVNode(unref(MinusCircleFilled))])):createCommentVNode("",!0)],2)}}}),_sfc_main$2=defineComponent({__name:"SubFormModal",props:{modalProps:{type:Object,default:()=>({})}},emits:["register","ok"],setup(__props,{emit:__emit}){const props=__props,emit=__emit,schemasRef=inject(SCHEMAS_KEY,ref([])),payload=ref(null),[registerFormModal,formModal]=useModalInner((function(data){return __async(this,null,(function*(){payload.value=data.payload,yield formRef.resetFields(),yield formRef.setFieldsValue(data.models)}))})),[registerForm,formRef]=useForm({labelWidth:120,schemas:schemasRef,labelAlign:"right",showActionButtonGroup:!1,baseColProps:{span:24}}),formModalProps=computed((()=>((a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a})({title:"子表单",width:800,minHeight:100,onOk:onOk},props.modalProps)));function onOk(){return __async(this,null,(function*(){let values=yield formRef.validate();emit("ok",{values:values,payload:payload.value}),formModal.closeModal()}))}return(_ctx,_cache)=>(openBlock(),createBlock(unref(BasicModal),mergeProps(formModalProps.value,{onRegister:unref(registerFormModal)}),{default:withCtx((()=>[createVNode(unref(BasicForm),{onRegister:unref(registerForm)},null,8,["onRegister"])])),_:1},16,["onRegister"]))}}),_hoisted_1={style:{padding:"10px"}},_sfc_main$1=defineComponent({__name:"FormListModal",props:{modalProps:{type:Object,default:()=>({})}},emits:["register","ok"],setup(__props,{emit:__emit}){const emit=__emit,modelList=ref([]),[registerListModal,listModal]=useModalInner((function(data){return __async(this,null,(function*(){modelList.value=data.list}))})),[registerFormModal,formModal]=useModal(),listModalProps=computed((()=>({title:"填写列表",width:800,minHeight:400,onOk:onOk})));function onAdd(){onOpenSingleForm({})}function onOk(){return __async(this,null,(function*(){emit("ok",modelList.value),listModal.closeModal()}))}function onCancel(){listModal.closeModal()}function onOpenSingleForm(models,payload){payload=payload||{isUpdate:!1},formModal.openModal(!0,{models:models,payload:payload})}function onFormModalOk({values:values,payload:{isUpdate:isUpdate,modelIndex:modelIndex}}){isUpdate?modelList.value[modelIndex]=values:modelList.value.push(values),emit("ok",modelList.value)}return(_ctx,_cache)=>{const _component_a_empty=resolveComponent("a-empty"),_component_a_button=resolveComponent("a-button"),_component_a_col=resolveComponent("a-col"),_component_a_row=resolveComponent("a-row");return openBlock(),createElementBlock(Fragment,null,[createVNode(unref(BasicModal),mergeProps(listModalProps.value,{onRegister:unref(registerListModal)}),{footer:withCtx((()=>[createVNode(_component_a_row,{type:"flex",justify:"space-between"},{default:withCtx((()=>[createVNode(_component_a_col,null,{default:withCtx((()=>[createVNode(_component_a_button,{type:"primary",preIcon:"ant-design:plus",onClick:onAdd},{default:withCtx((()=>[createTextVNode("新增")])),_:1})])),_:1}),createVNode(_component_a_col,null,{default:withCtx((()=>[createVNode(_component_a_button,{onClick:onCancel},{default:withCtx((()=>[createTextVNode("关闭")])),_:1})])),_:1})])),_:1})])),default:withCtx((()=>[createBaseVNode("div",_hoisted_1,[0===modelList.value.length?(openBlock(),createBlock(_component_a_empty,{key:0,description:"暂无数据，请点击下方的“新增”按钮添加"})):createCommentVNode("",!0),(openBlock(!0),createElementBlock(Fragment,null,renderList(modelList.value,((models,idx)=>(openBlock(),createBlock(_sfc_main$3,{models:models,allowRemove:"",onClick:$event=>function(models,modelIndex){onOpenSingleForm(models,{modelIndex:modelIndex,isUpdate:!0})}(models,idx),onRemove:$event=>{return modelIndex=idx,modelList.value.splice(modelIndex,1),void emit("ok",modelList.value);var modelIndex}},null,8,["models","onClick","onRemove"])))),256))])])),_:1},16,["onRegister"]),createVNode(_sfc_main$2,{modalProps:__props.modalProps,onRegister:unref(registerFormModal),onOk:onFormModalOk},null,8,["modalProps","onRegister"])],64)}}}),_sfc_main=defineComponent({__name:"SubForm",props:{value:{type:[Array,Object]},schemas:{type:Array,default:()=>[]},multiple:propTypes.bool.def(!1),alwaysArray:propTypes.bool.def(!1),modalProps:{type:Object,default:()=>({})}},emits:["change","update:value"],setup(__props,{emit:__emit}){const props=__props,emit=__emit,{prefixCls:prefixCls}=useDesign("g-sub-form"),inputRef=ref(),schemasRef=computed((()=>props.schemas)),getAlwaysArray=computed((()=>props.alwaysArray||props.multiple)),multipleValue=computed((()=>{const{value:value,multiple:multiple}=props;if(null==value||0===value.length)return getAlwaysArray.value?[]:{};if(multiple){if(!Array.isArray(value))return[value]}else if(getAlwaysArray.value&&!Array.isArray(value))return[value];return value})),singleValue=computed((()=>{var _a;return null!=(_a=Array.isArray(multipleValue.value)?multipleValue.value[0]:multipleValue.value)?_a:{}})),inputValue=computed((()=>{var _a,_b;const{multiple:multiple}=props;return multiple?`已配置 ${null!=(_b=null==(_a=multipleValue.value)?void 0:_a.length)?_b:0} 项`:""}));watch(inputRef,(()=>{var _a;const inputNode=null==(_a=inputRef.value)?void 0:_a.input;inputNode&&inputNode.setAttribute("readonly","readonly")}),{immediate:!0});const[registerListModal,listModal]=useModal();function onOpenMultipleForm(){listModal.openModal(!0,{list:multipleValue.value})}function onListModalOk(list){emit("change",list)}const[registerFormModal,formModal]=useModal();function onOpenSingleForm(){formModal.openModal(!0,{models:singleValue.value})}function onFormModalOk({values:values}){getAlwaysArray.value&&(values=[values]),emit("change",values)}return provide(PREFIX_CLS_KEY,prefixCls),provide(SCHEMAS_KEY,schemasRef),(_ctx,_cache)=>{const _component_a_input=resolveComponent("a-input");return openBlock(),createElementBlock("div",{class:normalizeClass([unref(prefixCls)])},[__props.multiple?(openBlock(),createElementBlock("div",{key:0,class:"multiple-mode",onClick:onOpenMultipleForm},[createVNode(_component_a_input,{ref_key:"inputRef",ref:inputRef,value:inputValue.value},null,8,["value"])])):(openBlock(),createElementBlock("div",{key:1,class:"single-mode",onClick:onOpenSingleForm},[createVNode(_sfc_main$3,{models:singleValue.value},null,8,["models"])])),createVNode(_sfc_main$1,{modalProps:__props.modalProps,onRegister:unref(registerListModal),onOk:onListModalOk},null,8,["modalProps","onRegister"]),createVNode(_sfc_main$2,{modalProps:__props.modalProps,onRegister:unref(registerFormModal),onOk:onFormModalOk},null,8,["modalProps","onRegister"])],2)}}});export{_sfc_main as default};
