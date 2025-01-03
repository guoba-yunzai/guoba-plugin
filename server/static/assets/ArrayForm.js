import{d as defineComponent,p as propTypes,E as useDesign,r as ref,C as computed,w as watch,A as useMessage,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,j as createVNode,v as createBaseVNode,m as toDisplayString,e as createElementBlock,F as Fragment,f as renderList,x as createCommentVNode,z as normalizeClass}from"./index.js";import BasicForm from"./BasicForm.js";import"./BasicForm.vue_vue_type_style_index_0_lang.js";import"./upperFirst.js";import"./uniqBy.js";import"./index19.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./index21.js";import"./index22.js";import"./useFormItem.js";/* empty css       */import"./DeleteOutlined.js";import"./transButton.js";import"./download.js";import"./index23.js";import"./index24.js";const _sfc_main=defineComponent({name:"ArrayForm",components:{BasicForm:BasicForm},props:{card:propTypes.object.isRequired.type,form:propTypes.object.isRequired.type,value:propTypes.array.def((()=>[]))},emits:["redo","submit"],setup(props,{emit:emit}){const{prefixCls:prefixCls}=useDesign("array-form"),{createMessage:createMessage}=useMessage(),innerValue=ref(props.value),addBtnText=computed((()=>{var _a,_b;return null!=(_b=null==(_a=props.card)?void 0:_a.addBtnText)?_b:"新增"}));function validate(){return __this=this,__arguments=null,generator=function*(){return innerValue.value.filter((v=>!(null==v||""==v)))},new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));var __this,__arguments,generator}return watch((()=>props.value),(()=>innerValue.value=props.value)),{emit:emit,prefixCls:prefixCls,innerValue:innerValue,addBtnText:addBtnText,onAdd:function(){var _a;let lengthMax=null==(_a=props.card)?void 0:_a.lengthMax;null!=lengthMax&&innerValue.value.length>=lengthMax?createMessage.warn(`最多只能添加${lengthMax}个`):innerValue.value.push("")},onRemove:function(idx){var _a;let lengthMin=null==(_a=props.card)?void 0:_a.lengthMin;null!=lengthMin&&innerValue.value.length<=lengthMin?createMessage.warn(`至少要留${lengthMin}个`):innerValue.value.splice(idx,1)},onSubmit:function(){var _a;(null==(_a=props.form)?void 0:_a.actions)||(props.form.actions={validate:validate}),emit("submit",props.form)}}}}),_hoisted_1={style:{color:"#333333"}},_hoisted_2={class:"array-box"},_hoisted_3={class:"array-item"},_hoisted_4={style:{"text-align":"center"}},_hoisted_5=createBaseVNode("span",null,"保存",-1);const ArrayForm=_export_sfc(_sfc_main,[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_icon=resolveComponent("icon"),_component_a_tooltip=resolveComponent("a-tooltip"),_component_a_input=resolveComponent("a-input"),_component_a_button=resolveComponent("a-button"),_component_a_popconfirm=resolveComponent("a-popconfirm"),_component_a_spin=resolveComponent("a-spin"),_component_a_card=resolveComponent("a-card");return openBlock(),createBlock(_component_a_card,{title:_ctx.card.title,class:normalizeClass([_ctx.prefixCls]),bordered:!1},{extra:withCtx((()=>[createVNode(_component_a_tooltip,{title:"刷新"},{default:withCtx((()=>[createVNode(_component_icon,{icon:"ant-design:redo",style:{cursor:"pointer"},onClick:_cache[0]||(_cache[0]=()=>_ctx.emit("redo",_ctx.form))})])),_:1})])),default:withCtx((()=>[createVNode(_component_a_spin,{spinning:_ctx.form.loading},{default:withCtx((()=>[createBaseVNode("div",_hoisted_1,toDisplayString(_ctx.card.desc),1),createBaseVNode("div",_hoisted_2,[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.innerValue,((val,idx)=>(openBlock(),createElementBlock("div",_hoisted_3,[createVNode(_component_a_input,{value:_ctx.innerValue[idx],"onUpdate:value":$event=>_ctx.innerValue[idx]=$event,style:{"max-width":"880px"}},null,8,["value","onUpdate:value"]),_ctx.card.allowDel?(openBlock(),createBlock(_component_a_popconfirm,{key:0,title:"确定要删除吗？",onConfirm:()=>_ctx.onRemove(idx)},{default:withCtx((()=>[createVNode(_component_a_button,{type:"primary","pre-icon":"ant-design:minus",size:"small",shape:"circle",danger:""})])),_:2},1032,["onConfirm"])):createCommentVNode("",!0)])))),256)),_ctx.card.allowAdd?(openBlock(),createBlock(_component_a_button,{key:0,type:"link","pre-icon":"ant-design:plus",size:"small",onClick:_ctx.onAdd},{default:withCtx((()=>[createBaseVNode("span",null,toDisplayString(_ctx.addBtnText),1)])),_:1},8,["onClick"])):createCommentVNode("",!0)]),createBaseVNode("div",_hoisted_4,[createVNode(_component_a_button,{type:"primary","pre-icon":"ant-design:save",onClick:_ctx.onSubmit},{default:withCtx((()=>[_hoisted_5])),_:1},8,["onClick"])])])),_:1},8,["spinning"])])),_:1},8,["title","class"])}]]);export{ArrayForm as default};
