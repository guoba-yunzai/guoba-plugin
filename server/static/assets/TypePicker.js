import{d as defineComponent,ar as Tooltip,E as useDesign,b as _export_sfc,c as resolveComponent,o as openBlock,e as createElementBlock,F as Fragment,f as renderList,z as normalizeClass,h as createBlock,i as withCtx,v as createBaseVNode,O as pushScopeId,Q as popScopeId}from"./index.js";const _sfc_main=defineComponent({name:"MenuTypePicker",components:{Tooltip:Tooltip},props:{menuTypeList:{type:Array,defualt:()=>[]},handler:{type:Function,default:()=>({})},def:{type:String,default:""}},setup(){const{prefixCls:prefixCls}=useDesign("setting-menu-type-picker");return{prefixCls:prefixCls}}}),_hoisted_1=["onClick"],_hoisted_3=[(n=>(pushScopeId("data-v-93141be1"),n=n(),popScopeId(),n))((()=>createBaseVNode("div",{class:"mix-sidebar"},null,-1)))];const TypePicker=_export_sfc(_sfc_main,[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_Tooltip=resolveComponent("Tooltip");return openBlock(),createElementBlock("div",{class:normalizeClass(_ctx.prefixCls)},[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.menuTypeList||[],(item=>(openBlock(),createBlock(_component_Tooltip,{key:item.title,title:item.title,placement:"bottom"},{default:withCtx((()=>[createBaseVNode("div",{onClick:$event=>_ctx.handler(item),class:normalizeClass([`${_ctx.prefixCls}__item`,`${_ctx.prefixCls}__item--${item.type}`,{[`${_ctx.prefixCls}__item--active`]:_ctx.def===item.type}])},_hoisted_3,10,_hoisted_1)])),_:2},1032,["title"])))),128))],2)}],["__scopeId","data-v-93141be1"]]);export{TypePicker as default};
