import{d as defineComponent,a3 as useUserStore,C as computed,o as openBlock,e as createElementBlock,j as createVNode,y as unref,fx as Avatar,v as createBaseVNode,m as toDisplayString,dN as createStaticVNode}from"./index.js";import{h as headerImg}from"./header.js";const _hoisted_1={class:"lg:flex"},_hoisted_2={class:"md:ml-6 flex flex-col justify-center md:mt-0 mt-2"},_hoisted_3={class:"md:text-lg text-md"},_hoisted_4=createBaseVNode("span",{class:"text-secondary"}," 今日晴，20℃ - 32℃！ ",-1),_hoisted_5=createStaticVNode('<div class="flex flex-1 justify-end md:mt-0 mt-4"><div class="flex flex-col justify-center text-right"><span class="text-secondary"> 待办 </span><span class="text-2xl">2/10</span></div><div class="flex flex-col justify-center text-right md:mx-16 mx-12"><span class="text-secondary"> 项目 </span><span class="text-2xl">8</span></div><div class="flex flex-col justify-center text-right md:mr-10 mr-4"><span class="text-secondary"> 团队 </span><span class="text-2xl">300</span></div></div>',1),_sfc_main=defineComponent({__name:"WorkbenchHeader",setup(__props){const userStore=useUserStore(),userinfo=computed((()=>userStore.getUserInfo));return(_ctx,_cache)=>(openBlock(),createElementBlock("div",_hoisted_1,[createVNode(unref(Avatar),{src:userinfo.value.avatar||unref(headerImg),size:72,class:"!mx-auto !block"},null,8,["src"]),createBaseVNode("div",_hoisted_2,[createBaseVNode("h1",_hoisted_3,"早安, "+toDisplayString(userinfo.value.realName)+", 开始您一天的工作吧！",1),_hoisted_4]),_hoisted_5]))}});export{_sfc_main as _};
