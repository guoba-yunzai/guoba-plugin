import{d as defineComponent,o as openBlock,e as createElementBlock,F as Fragment,f as renderList,z as normalizeClass,v as createBaseVNode,m as toDisplayString}from"./index.js";const _hoisted_1={class:"mode-box"},_hoisted_2=["onClick"],_hoisted_3={class:"title"},_hoisted_4={class:"desc"},_sfc_main=defineComponent({__name:"ModeBox",props:{active:{type:[Number,String],default:""},modeList:{type:Array,default:()=>[]},allowCancel:Boolean},emits:["update:active"],setup(__props,{emit:__emit}){const props=__props,emit=__emit;return(_ctx,_cache)=>(openBlock(),createElementBlock("div",_hoisted_1,[(openBlock(!0),createElementBlock(Fragment,null,renderList(__props.modeList,(item=>(openBlock(),createElementBlock("div",{key:item.key,class:normalizeClass(["mode-item",{recommended:item.recommended,active:__props.active===item.key}]),onClick:$event=>function(item){item.key===props.active?props.allowCancel&&emit("update:active",""):emit("update:active",item.key)}(item)},[createBaseVNode("div",_hoisted_3,toDisplayString(item.title),1),createBaseVNode("div",_hoisted_4,toDisplayString(item.desc),1)],10,_hoisted_2)))),128))]))}});export{_sfc_main as _};