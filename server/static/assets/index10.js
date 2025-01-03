import{d as defineComponent,f_ as Skeleton,b9 as Tabs,E as useDesign,r as ref,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,j as createVNode,e as createElementBlock,F as Fragment,f as renderList,z as normalizeClass,aV as Transition,aX as KeepAlive,x as createCommentVNode}from"./index.js";import{P as PageWrapper}from"./index30.js";import{C as ConfigForm,q as queryConfigTabs}from"./ConfigForm.js";import"./index32.js";import"./onMountedOrActivated.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./ArrowLeftOutlined.js";import"./transButton.js";import"./BasicForm.vue_vue_type_style_index_0_lang.js";import"./index21.js";import"./index22.js";import"./useFormItem.js";/* empty css       */import"./DeleteOutlined.js";import"./index19.js";import"./FullscreenOutlined.js";import"./upperFirst.js";import"./download.js";import"./index23.js";import"./index24.js";import"./CardForm.js";import"./BasicForm.js";import"./uniqBy.js";/* empty css                                                          */import"./ArrayForm.js";const index=_export_sfc(defineComponent({components:{PageWrapper:PageWrapper,Skeleton:Skeleton,Tabs:Tabs,TabPane:Tabs.TabPane,ConfigForm:ConfigForm},setup(){const{prefixCls:prefixCls}=useDesign("system-config"),loading=ref(!0),pageLoading=ref(!0),configTabs=ref([]),activeKey=ref("");return function(){return __this=this,__arguments=null,generator=function*(){loading.value=!0;try{configTabs.value=yield queryConfigTabs(),activeKey.value=configTabs.value[0].key}finally{loading.value=!1,pageLoading.value=!1}},new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));var __this,__arguments,generator}(),{prefixCls:prefixCls,pageLoading:pageLoading,loading:loading,configTabs:configTabs,activeKey:activeKey}}}),[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_Skeleton=resolveComponent("Skeleton"),_component_TabPane=resolveComponent("TabPane"),_component_Tabs=resolveComponent("Tabs"),_component_ConfigForm=resolveComponent("ConfigForm"),_component_a_col=resolveComponent("a-col"),_component_a_row=resolveComponent("a-row"),_component_PageWrapper=resolveComponent("PageWrapper");return _ctx.pageLoading?(openBlock(),createBlock(_component_Skeleton,{key:0,active:""})):(openBlock(),createBlock(_component_PageWrapper,{key:1,title:"配置管理",content:"在这里可以配置机器人的基础设置以及原神相关设置",loading:_ctx.loading,sticky:""},{footer:withCtx((()=>[createVNode(_component_Tabs,{activeKey:_ctx.activeKey,"onUpdate:activeKey":_cache[0]||(_cache[0]=$event=>_ctx.activeKey=$event)},{default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.configTabs,(tab=>(openBlock(),createBlock(_component_TabPane,{key:tab.key,tab:tab.title},null,8,["tab"])))),128))])),_:1},8,["activeKey"])])),default:withCtx((()=>[createVNode(_component_a_row,{class:normalizeClass([_ctx.prefixCls]),justify:"center"},{default:withCtx((()=>[createVNode(_component_a_col,{xxl:16,xl:18,lg:20,md:22,sm:24,xs:24},{default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.configTabs,(tab=>(openBlock(),createBlock(Transition,{key:tab.key,name:"scroll-x-transition",mode:"out-in"},{default:withCtx((()=>[(openBlock(),createBlock(KeepAlive,null,[_ctx.activeKey===tab.key?(openBlock(),createBlock(_component_ConfigForm,{key:0,cards:tab.cards},null,8,["cards"])):createCommentVNode("",!0)],1024))])),_:2},1024)))),128))])),_:1})])),_:1},8,["class"])])),_:1},8,["loading"]))}]]);export{index as default};
