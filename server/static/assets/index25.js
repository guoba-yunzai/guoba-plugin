var r=(r,e,i)=>new Promise(((t,n)=>{var o=r=>{try{s(i.next(r))}catch(e){n(e)}},a=r=>{try{s(i.throw(r))}catch(e){n(e)}},s=r=>r.done?t(r.value):Promise.resolve(r.value).then(o,a);s((i=i.apply(r,e)).next())}));import{a as e,b as i,fv as t,r as n,e as o,o as a,i as s,j as l,k as m,v as u,V as d,fU as p}from"./index.js";import{P as c}from"./index14.js";import j from"./QuickNav2.js";import f from"./SaleRadar2.js";import g from"./PluginsCard.js";import h from"./DynamicInfo2.js";import v from"./WorkbenchHeader2.js";import{u as y}from"./index26.js";import{_ as w}from"./illustration.js";import"./index16.js";import"./onMountedOrActivated.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./ArrowLeftOutlined.js";import"./transButton.js";import"./data3.js";import"./index2.js";import"./FullscreenOutlined.js";import"./GPluginModal.js";import"./index15.js";import"./get.js";import"./MarkdownViewer.js";import"./guoba.js";import"./BasicForm.js";import"./index4.js";import"./find.js";import"./_baseIteratee.js";import"./index5.js";import"./index6.js";import"./useFormItem.js";import"./index3.js";import"./upperFirst.js";import"./download.js";import"./index7.js";import"./index8.js";import"./uniqBy.js";import"./common.js";const x=i({components:{Card:t,PageWrapper:c,QuickNav:j,SaleRadar:f,PluginsCard:g,DynamicInfo:h,WorkbenchHeader:v},setup(){const e=y(),i=n(!0),t=n({}),o=n(""),a=n([]);function s(){return r(this,null,(function*(){t.value=yield p.getHomeData().catch(console.error)}))}function l(){return r(this,null,(function*(){a.value=yield e.getPlugins().catch(console.error)}))}function m(){return r(this,null,(function*(){o.value="欢迎使用锅巴插件~"}))}return function(){r(this,null,(function*(){try{i.value=!0,yield Promise.all([s(),l(),m()])}finally{i.value=!1}}))}(),{homeData:t,weather:o,plugins:a,loading:i}}}),P={class:"lg:flex"},k={class:"lg:w-7/10 w-full !mr-4 enter-y"},C={class:"lg:w-3/10 w-full enter-y"};var b=e(x,[["render",function(r,e,i,t,n,p){const c=o("WorkbenchHeader"),j=o("PluginsCard"),f=(o("DynamicInfo"),o("QuickNav")),g=(o("Card"),o("SaleRadar")),h=o("PageWrapper");return a(),s(h,null,{headerContent:l((()=>[m(c,{data:r.homeData,weather:r.weather},null,8,["data","weather"])])),default:l((()=>[u("div",P,[u("div",k,[m(j,{plugins:r.plugins,loading:r.loading,class:"enter-y"},null,8,["plugins","loading"]),d("",!0)]),u("div",C,[m(f,{loading:r.loading,class:"enter-y"},null,8,["loading"]),d("",!0),m(g,{loading:r.loading,class:"!my-4 enter-y"},null,8,["loading"])])])])),_:1})}]]);export{b as default};
