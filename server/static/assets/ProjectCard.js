import{d as defineComponent,bc as Card,a2 as Icon,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,j as createVNode,k as createTextVNode,e as createElementBlock,F as Fragment,f as renderList,v as createBaseVNode,m as toDisplayString,D as mergeProps}from"./index.js";import{g as groupItems}from"./data2.js";const _sfc_main=defineComponent({components:{Card:Card,CardGrid:Card.Grid,Icon:Icon},setup:()=>({items:groupItems})}),_hoisted_1={class:"flex"},_hoisted_2={class:"text-lg ml-4"},_hoisted_3={class:"flex mt-2 h-10 text-secondary"},_hoisted_4={class:"flex justify-between text-secondary"};const ProjectCard=_export_sfc(_sfc_main,[["render",function(_ctx,_cache,$props,$setup,$data,$options){const _component_a_button=resolveComponent("a-button"),_component_Icon=resolveComponent("Icon"),_component_CardGrid=resolveComponent("CardGrid"),_component_Card=resolveComponent("Card");return openBlock(),createBlock(_component_Card,mergeProps({title:"项目"},_ctx.$attrs),{extra:withCtx((()=>[createVNode(_component_a_button,{type:"link",size:"small"},{default:withCtx((()=>[createTextVNode("更多")])),_:1})])),default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.items,(item=>(openBlock(),createBlock(_component_CardGrid,{key:item,class:"!md:w-1/3 !w-full"},{default:withCtx((()=>[createBaseVNode("span",_hoisted_1,[createVNode(_component_Icon,{icon:item.icon,color:item.color,size:"30"},null,8,["icon","color"]),createBaseVNode("span",_hoisted_2,toDisplayString(item.title),1)]),createBaseVNode("div",_hoisted_3,toDisplayString(item.desc),1),createBaseVNode("div",_hoisted_4,[createBaseVNode("span",null,toDisplayString(item.group),1),createBaseVNode("span",null,toDisplayString(item.date),1)])])),_:2},1024)))),128))])),_:1},16)}]]);export{ProjectCard as default};
