import{d as defineComponent,bc as Card,a2 as Icon,bb as Tag,aH as useGo,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,j as createVNode,k as createTextVNode,e as createElementBlock,F as Fragment,f as renderList,v as createBaseVNode,m as toDisplayString,x as createCommentVNode,D as mergeProps}from"./index.js";import{a as useModal}from"./index19.js";import{G as GPluginModal}from"./GPluginModal.js";import{_ as _sfc_main$1}from"./PluginIcon.vue_vue_type_style_index_0_lang.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./index31.js";import"./onMountedOrActivated.js";import"./MarkdownViewer.vue_vue_type_script_setup_true_lang.js";import"./guoba.js";import"./BasicForm.js";import"./BasicForm.vue_vue_type_style_index_0_lang.js";import"./index21.js";import"./index22.js";import"./useFormItem.js";/* empty css       */import"./DeleteOutlined.js";import"./transButton.js";import"./upperFirst.js";import"./download.js";import"./index23.js";import"./index24.js";import"./uniqBy.js";import"./lodash.default.js";import"./throttle.js";import"./merge.js";import"./common.js";const _sfc_main=defineComponent({components:{Card:Card,CardGrid:Card.Grid,Icon:Icon,Tag:Tag,GPluginModal:GPluginModal,PluginIcon:_sfc_main$1},props:{plugins:{type:Array,required:!0}},setup(){const[registerModal,{openModal:openModal}]=useModal(),go=useGo();return{onClick:function(plugin){plugin.showInMenu?go(`/plugin/@/${plugin.name}`):openModal(!0,{plugin:plugin})},parseAuthor:function(author){return Array.isArray(author)?author.join(" "):author},registerModal:registerModal}}}),_hoisted_1={class:"flex"},_hoisted_2=["title"],_hoisted_3={key:0,style:{"text-decoration":"line-through"}},_hoisted_4={key:1},_hoisted_5={class:"flex mt-2 h-10 text-secondary"},_hoisted_6=["title"],_hoisted_7={class:"flex justify-between text-secondary ellipsis",style:{"max-width":"100%"}},_hoisted_8={class:"ellipsis",style:{"max-width":"calc(100% - 100px)"}};const PluginsCard=_export_sfc(_sfc_main,[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_router_link=resolveComponent("router-link"),_component_a_button=resolveComponent("a-button"),_component_PluginIcon=resolveComponent("PluginIcon"),_component_Tag=resolveComponent("Tag"),_component_CardGrid=resolveComponent("CardGrid"),_component_GPluginModal=resolveComponent("GPluginModal"),_component_Card=resolveComponent("Card");return openBlock(),createBlock(_component_Card,mergeProps({title:"插件"},_ctx.$attrs),{extra:withCtx((()=>[createVNode(_component_a_button,{type:"link",size:"small"},{default:withCtx((()=>[createVNode(_component_router_link,{to:"/plugins"},{default:withCtx((()=>[createTextVNode("更多")])),_:1})])),_:1})])),default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.plugins,((item,idx)=>(openBlock(),createElementBlock(Fragment,{key:item.name},[idx<12?(openBlock(),createBlock(_component_CardGrid,{key:0,class:"!md:w-1/3 !w-full plugin-item",onClick:()=>_ctx.onClick(item)},{default:withCtx((()=>[createBaseVNode("span",_hoisted_1,[createVNode(_component_PluginIcon,{plugin:item,size:30},null,8,["plugin"]),createBaseVNode("span",{class:"text-lg ml-4 ellipsis",title:item.title},[item.isDeleted?(openBlock(),createElementBlock("span",_hoisted_3,toDisplayString(item.title),1)):(openBlock(),createElementBlock("span",_hoisted_4,toDisplayString(item.title),1))],8,_hoisted_2)]),createBaseVNode("div",_hoisted_5,[createBaseVNode("div",{class:"ellipsis",title:item.description},toDisplayString(item.description),9,_hoisted_6)]),createBaseVNode("div",_hoisted_7,[createBaseVNode("span",_hoisted_8,toDisplayString(_ctx.parseAuthor(item.author)),1),createBaseVNode("span",null,[item.hasConfig?(openBlock(),createBlock(_component_Tag,{key:0,color:"purple"},{default:withCtx((()=>[createTextVNode("可配置")])),_:1})):createCommentVNode("",!0),item.installed?(openBlock(),createBlock(_component_Tag,{key:1,color:"green"},{default:withCtx((()=>[createTextVNode("已安装")])),_:1})):(openBlock(),createBlock(_component_Tag,{key:2},{default:withCtx((()=>[createTextVNode("未安装")])),_:1}))])])])),_:2},1032,["onClick"])):createCommentVNode("",!0)],64)))),128)),createVNode(_component_GPluginModal,{onRegister:_ctx.registerModal},null,8,["onRegister"])])),_:1},16)}],["__scopeId","data-v-e3472f64"]]);export{PluginsCard as default};
