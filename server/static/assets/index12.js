var __async=(__this,__arguments,generator)=>new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));import{d as defineComponent,E as useDesign,r as ref,a as reactive,A as useMessage,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,j as createVNode,v as createBaseVNode,aV as Transition,x as createCommentVNode,z as normalizeClass}from"./index.js";import{P as PageWrapper}from"./index30.js";import{_ as _sfc_main$1}from"./MiaoHeader.vue_vue_type_script_setup_true_lang.js";import HelpPanel from"./HelpPanel.js";import{B as BackupDrawer,s as saveMiaoHelpCfg,g as getMiaoHelpCfg,a as getHelpIconList}from"./BackupDrawer.js";import{a as useDrawer}from"./index35.js";import"./index32.js";import"./onMountedOrActivated.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./ArrowLeftOutlined.js";import"./transButton.js";import"./EditBodyModal.js";import"./index22.js";import"./SelectIconModal.js";import"./IconUploader.js";import"./esm.js";import"./miao.api.js";import"./base64Conver.js";import"./index19.js";import"./FullscreenOutlined.js";import"./UploadIconHelpModal.vue_vue_type_script_setup_true_lang.js";import"./21ae6624.js";/* empty css       *//* empty css                                                          */import"./index29.js";const _sfc_main=defineComponent({name:"MiaoPluginExtra",components:{HelpPanel:HelpPanel,EditMiaoHeader:_sfc_main$1,PageWrapper:PageWrapper,BackupDrawer:BackupDrawer},setup(){const{prefixCls:prefixCls}=useDesign("edit-miao-help"),{createMessage:$message,createConfirm:createConfirm}=useMessage(),pageLoading=ref(!0),loading=ref(!0),cacheVer=ref(0),helpCfg=ref(null),helpList=ref(null),bgB64=ref(null),mainB64=ref(null),iconB64List=ref(null),versions=reactive({miao:"x.x.x",yunzai:"x.x.x"}),modelData=ref({show:!1,cell:null,cellIndex:null,group:null,groupIndex:null}),[registerDrawer,{openDrawer:openDrawer}]=useDrawer(),loadData=()=>__async(this,null,(function*(){try{loading.value=!0;let result=yield getMiaoHelpCfg();helpCfg.value=result.helpCfg,helpList.value=result.helpList,versions.miao=result.miaoVersion,versions.yunzai=result.yunzaiVersion,bgB64.value=null,mainB64.value=null,iconB64List.value=yield getHelpIconList()}finally{loading.value=!1,pageLoading.value=!1,cacheVer.value++}}));return loadData(),{prefixCls:prefixCls,loading:loading,pageLoading:pageLoading,helpCfg:helpCfg,helpList:helpList,bgB64:bgB64,mainB64:mainB64,iconB64List:iconB64List,cacheVer:cacheVer,versions:versions,modelData:modelData,onBackup:function(){openDrawer(!0,{})},onRollback:function(){createConfirm({title:"提示",iconType:"warning",content:"确定要放弃所有修改吗？",onOk:()=>{loadData()}})},loadData:loadData,saveData:()=>__async(this,null,(function*(){try{loading.value=!0,yield saveMiaoHelpCfg(helpCfg,helpList,iconB64List,mainB64),yield loadData(),$message.success("保存成功~")}finally{loading.value=!1}})),registerDrawer:registerDrawer}}}),_hoisted_1={class:"flex justify-center md:pt-4 my-4"};const index=_export_sfc(_sfc_main,[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_EditMiaoHeader=resolveComponent("EditMiaoHeader"),_component_HelpPanel=resolveComponent("HelpPanel"),_component_BackupDrawer=resolveComponent("BackupDrawer"),_component_PageWrapper=resolveComponent("PageWrapper");return openBlock(),createBlock(_component_PageWrapper,{class:normalizeClass([_ctx.prefixCls]),title:"编辑喵喵帮助",dense:"",sticky:"",stickyTop:"-14px",loading:_ctx.loading},{headerContent:withCtx((()=>[createVNode(_component_EditMiaoHeader,{onSave:_ctx.saveData,onRollback:_ctx.onRollback,onBackup:_ctx.onBackup},null,8,["onSave","onRollback","onBackup"])])),default:withCtx((()=>[createBaseVNode("div",_hoisted_1,[createVNode(Transition,{name:"scroll-y-reverse-transition"},{default:withCtx((()=>[_ctx.pageLoading?createCommentVNode("",!0):(openBlock(),createBlock(_component_HelpPanel,{key:0,cacheVer:_ctx.cacheVer,versions:_ctx.versions,helpCfg:_ctx.helpCfg,"onUpdate:helpCfg":_cache[0]||(_cache[0]=$event=>_ctx.helpCfg=$event),helpList:_ctx.helpList,"onUpdate:helpList":_cache[1]||(_cache[1]=$event=>_ctx.helpList=$event),bgB64:_ctx.bgB64,"onUpdate:bgB64":_cache[2]||(_cache[2]=$event=>_ctx.bgB64=$event),mainB64:_ctx.mainB64,"onUpdate:mainB64":_cache[3]||(_cache[3]=$event=>_ctx.mainB64=$event),iconB64List:_ctx.iconB64List,"onUpdate:iconB64List":_cache[4]||(_cache[4]=$event=>_ctx.iconB64List=$event),modelData:_ctx.modelData,"onUpdate:modelData":_cache[5]||(_cache[5]=$event=>_ctx.modelData=$event)},null,8,["cacheVer","versions","helpCfg","helpList","bgB64","mainB64","iconB64List","modelData"]))])),_:1})]),createVNode(_component_BackupDrawer,{onRegister:_ctx.registerDrawer,onReload:_ctx.loadData},null,8,["onRegister","onReload"])])),_:1},8,["class","loading"])}]]);export{index as default};
