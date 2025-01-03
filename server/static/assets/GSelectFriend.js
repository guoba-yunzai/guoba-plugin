const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SelectFriendModal.js","assets/TableImg.vue_vue_type_style_index_0_lang.js","assets/index.js","assets/index.css","assets/BasicForm.js","assets/BasicForm.vue_vue_type_style_index_0_lang.js","assets/index21.js","assets/index6.css","assets/index22.js","assets/index7.css","assets/useFormItem.js","assets/DeleteOutlined.js","assets/transButton.js","assets/index19.js","assets/useWindowSizeFn.js","assets/FullscreenOutlined.js","assets/index4.css","assets/upperFirst.js","assets/download.js","assets/index23.js","assets/index8.css","assets/index24.js","assets/index9.css","assets/BasicForm.css","assets/index5.css","assets/uniqBy.js","assets/index30.js","assets/index32.js","assets/index14.css","assets/onMountedOrActivated.js","assets/useContentViewHeight.js","assets/ArrowLeftOutlined.js","assets/index12.css","assets/merge.js","assets/sortable.esm.js","assets/RedoOutlined.js","assets/scrollTo.js","assets/index33.js","assets/index15.css","assets/TableImg.css","assets/useSelectModal.js"])))=>i.map(i=>d[i]);
import{d as defineComponent,H as createAsyncComponent,J as __vitePreload,p as propTypes,K as useAttrs,r as ref,a as reactive,y as unref,G as provide,L as watchEffect,w as watch,b as _export_sfc,c as resolveComponent,o as openBlock,e as createElementBlock,j as createVNode,D as mergeProps}from"./index.js";import{a as useModal}from"./index19.js";import{u as useRuleFormItem}from"./useFormItem.js";import{G as GSelectBiz}from"./GSelectBiz.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";const GSelectFriend=_export_sfc(defineComponent({name:"GSelectFriend",inheritAttrs:!1,components:{GSelectBiz:GSelectBiz,SelectFriendModal:createAsyncComponent((()=>__vitePreload((()=>import("./SelectFriendModal.js")),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]))))},props:{value:propTypes.array,rowKey:propTypes.string.def("user_id"),labelKey:propTypes.string.def("nickname"),params:propTypes.object.def((()=>({})))},emits:["options-change","change","update:value"],setup(props,{emit:emit}){const attrs=useAttrs(),emitData=ref([]),[regModal,{openModal:openModal}]=useModal(),[state]=useRuleFormItem(props,"value","change",emitData),selectOptions=ref([]),selectValues=reactive({value:[],change:!1}),getBindValue=Object.assign({},unref(props),unref(attrs)),btnLoading=ref(!0),loadingEcho=ref(!1);return provide("selectOptions",selectOptions),provide("selectValues",selectValues),provide("loadingEcho",loadingEcho),watchEffect((()=>function(){let value=props.value;value&&value.length>0?selectValues.value=value:selectValues.value=[]}())),watch(selectValues,(()=>{selectValues&&(state.value=selectValues.value)})),{state:state,attrs:attrs,selectOptions:selectOptions,getBindValue:getBindValue,selectValues:selectValues,btnLoading:btnLoading,loadingEcho:loadingEcho,registerModal:function(...args){btnLoading.value=!1,regModal.apply(null,args)},setValue:function(options,values){selectOptions.value=options,state.value=values,selectValues.value=values,emit("update:value",values)},handleOpen:function(){openModal(!0,{isUpdate:!1})}}}}),[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_GSelectBiz=resolveComponent("GSelectBiz"),_component_SelectFriendModal=resolveComponent("SelectFriendModal");return openBlock(),createElementBlock("div",null,[createVNode(_component_GSelectBiz,mergeProps({onHandleOpen:_ctx.handleOpen,loading:_ctx.btnLoading||_ctx.loadingEcho,showButton:""},_ctx.attrs),null,16,["onHandleOpen","loading"]),createVNode(_component_SelectFriendModal,mergeProps({rowKey:_ctx.rowKey,onRegister:_ctx.registerModal,onGetSelectResult:_ctx.setValue},_ctx.getBindValue),null,16,["rowKey","onRegister","onGetSelectResult"])])}],["__scopeId","data-v-8aadf2f4"]]);export{GSelectFriend as default};
