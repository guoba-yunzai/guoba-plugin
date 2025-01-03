import{al as createContext,r as ref,C as computed,y as unref}from"./index.js";import{u as useWindowSizeFn}from"./useWindowSizeFn.js";const key=Symbol();const headerHeightRef=ref(0),footerHeightRef=ref(0);function useLayoutHeight(){return{headerHeightRef:headerHeightRef,footerHeightRef:footerHeightRef,setHeaderHeight:function(val){headerHeightRef.value=val},setFooterHeight:function(val){footerHeightRef.value=val}}}function useContentViewHeight(){const contentHeight=ref(window.innerHeight),pageHeight=ref(window.innerHeight),getViewHeight=computed((()=>unref(contentHeight)-unref(headerHeightRef)-unref(footerHeightRef)||0));useWindowSizeFn((()=>{contentHeight.value=window.innerHeight}),100,{immediate:!0}),createContext({contentHeight:getViewHeight,setPageHeight:function(height){return __this=this,__arguments=null,generator=function*(){pageHeight.value=height},new Promise(((resolve,reject)=>{var fulfilled=value=>{try{step(generator.next(value))}catch(e){reject(e)}},rejected=value=>{try{step(generator.throw(value))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));var __this,__arguments,generator},pageHeight:pageHeight},key,{native:!0})}export{useLayoutHeight as a,useContentViewHeight as u};
