import{d as defineComponent,aB as usePermissionStore,E as useDesign,aT as useMultipleTabStore,a3 as useUserStore,aN as useAppStore,a9 as useI18n,gv as useCopyToClipboard,y as unref,b7 as setting,gn as updateColorWeak,go as updateGrayMode,A as useMessage,b as _export_sfc,c as resolveComponent,o as openBlock,e as createElementBlock,j as createVNode,i as withCtx,k as createTextVNode,m as toDisplayString,z as normalizeClass}from"./index.js";import{C as CopyOutlined}from"./CopyOutlined.js";import{R as RedoOutlined}from"./RedoOutlined.js";const SettingFooter=_export_sfc(defineComponent({name:"SettingFooter",components:{CopyOutlined:CopyOutlined,RedoOutlined:RedoOutlined},setup(){const permissionStore=usePermissionStore(),{prefixCls:prefixCls}=useDesign("setting-footer"),{t:t}=useI18n(),{createSuccessModal:createSuccessModal,createMessage:createMessage}=useMessage(),tabStore=useMultipleTabStore(),userStore=useUserStore(),appStore=useAppStore();return{prefixCls:prefixCls,t:t,handleCopy:function(){const{isSuccessRef:isSuccessRef}=useCopyToClipboard(JSON.stringify(unref(appStore.getProjectConfig),null,2));unref(isSuccessRef)&&createSuccessModal({title:t("layout.setting.operatingTitle"),content:t("layout.setting.operatingContent")})},handleResetSetting:function(){try{appStore.setProjectConfig(setting);const{colorWeak:colorWeak,grayMode:grayMode}=setting;updateColorWeak(colorWeak),updateGrayMode(grayMode),createMessage.success(t("layout.setting.resetSuccess"))}catch(error){createMessage.error(error)}},handleClearAndRedo:function(){localStorage.clear(),appStore.resetAllState(),permissionStore.resetState(),tabStore.resetState(),userStore.resetState(),location.reload()}}}}),[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_CopyOutlined=resolveComponent("CopyOutlined"),_component_a_button=resolveComponent("a-button"),_component_RedoOutlined=resolveComponent("RedoOutlined");return openBlock(),createElementBlock("div",{class:normalizeClass(_ctx.prefixCls)},[createVNode(_component_a_button,{type:"primary",block:"",onClick:_ctx.handleCopy},{default:withCtx((()=>[createVNode(_component_CopyOutlined,{class:"mr-2"}),createTextVNode(" "+toDisplayString(_ctx.t("layout.setting.copyBtn")),1)])),_:1},8,["onClick"]),createVNode(_component_a_button,{color:"warning",block:"",onClick:_ctx.handleResetSetting,class:"my-3"},{default:withCtx((()=>[createVNode(_component_RedoOutlined,{class:"mr-2"}),createTextVNode(" "+toDisplayString(_ctx.t("common.resetText")),1)])),_:1},8,["onClick"]),createVNode(_component_a_button,{color:"error",block:"",onClick:_ctx.handleClearAndRedo},{default:withCtx((()=>[createVNode(_component_RedoOutlined,{class:"mr-2"}),createTextVNode(" "+toDisplayString(_ctx.t("layout.setting.clearBtn")),1)])),_:1},8,["onClick"])],2)}],["__scopeId","data-v-27b3c6cc"]]);export{SettingFooter as default};
