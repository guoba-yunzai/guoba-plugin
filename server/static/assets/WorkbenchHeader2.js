import{b as e,p as s,d9 as t,I as a,e as l,o as r,f as n,k as o,v as c,m as d}from"./index.js";import{t as i,w as x}from"./common.js";const u={class:"lg:flex"},m={class:"md:ml-6 flex flex-col justify-center md:mt-0 mt-2"},f={class:"md:text-lg text-md"},p={class:"text-secondary"},v={class:"flex flex-1 justify-end md:mt-0 mt-4"},g={class:"flex flex-col justify-center text-right"},y=c("span",{class:"text-secondary"}," Cookie用户数 ",-1),j={class:"text-2xl"},h={class:"flex flex-col justify-center text-right md:mx-16 mx-12"},k=c("span",{class:"text-secondary"}," 群聊数量 ",-1),b={class:"text-2xl"},C={class:"flex flex-col justify-center text-right md:mr-10 mr-4"},q=c("span",{class:"text-secondary"}," 好友数量 ",-1),w={class:"text-2xl"},I=e({__name:"WorkbenchHeader",props:{data:s.object.isRequired,weather:s.string.isRequired},setup(e){const s=e,I=t(),$=a((()=>I.getUserInfo)),R=a((()=>{var e;if(!$.value)return"loading…";let s=i(),t=x();return`${s}，${null==(e=$.value)?void 0:e.realName}，${t}`})),_=a((()=>{let{weather:e}=s;return e||"loading…"}));return(s,t)=>{const a=l("GAvatar");return r(),n("div",u,[o(a,{id:$.value.userId,qs:100,size:60,class:"!mx-auto !block"},null,8,["id"]),c("div",m,[c("h1",f,d(R.value),1),c("span",p,d(_.value),1)]),c("div",v,[c("div",g,[y,c("span",j,d(e.data.cookieCount),1)]),c("div",h,[k,c("span",b,d(e.data.groupCount),1)]),c("div",C,[q,c("span",w,d(e.data.friendCount),1)])])])}}});export{I as default};
