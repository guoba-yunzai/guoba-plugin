import{a as e,b as t,ds as s,bR as a,bE as o,dG as n,d4 as l,dA as r,e as c,o as i,f as d,k as u,j as f,l as p,m as C,bU as g,ff as y,x as m,dQ as S,f7 as k,f8 as b,bW as R}from"./index.js";import{C as h}from"./CopyOutlined.js";import{R as x}from"./RedoOutlined.js";var O=e(t({name:"SettingFooter",components:{CopyOutlined:h,RedoOutlined:x},setup(){const e=s(),{prefixCls:t}=a("setting-footer"),{t:c}=o(),{createSuccessModal:i,createMessage:d}=R(),u=n(),f=l(),p=r();return{prefixCls:t,t:c,handleCopy:function(){const{isSuccessRef:e}=y(JSON.stringify(m(p.getProjectConfig),null,2));m(e)&&i({title:c("layout.setting.operatingTitle"),content:c("layout.setting.operatingContent")})},handleResetSetting:function(){try{p.setProjectConfig(S);const{colorWeak:e,grayMode:t}=S;k(e),b(t),d.success(c("layout.setting.resetSuccess"))}catch(e){d.error(e)}},handleClearAndRedo:function(){localStorage.clear(),p.resetAllState(),e.resetState(),u.resetState(),f.resetState(),location.reload()}}}}),[["render",function(e,t,s,a,o,n){const l=c("CopyOutlined"),r=c("a-button"),y=c("RedoOutlined");return i(),d("div",{class:g(e.prefixCls)},[u(r,{type:"primary",block:"",onClick:e.handleCopy},{default:f((()=>[u(l,{class:"mr-2"}),p(" "+C(e.t("layout.setting.copyBtn")),1)])),_:1},8,["onClick"]),u(r,{color:"warning",block:"",onClick:e.handleResetSetting,class:"my-3"},{default:f((()=>[u(y,{class:"mr-2"}),p(" "+C(e.t("common.resetText")),1)])),_:1},8,["onClick"]),u(r,{color:"error",block:"",onClick:e.handleClearAndRedo},{default:f((()=>[u(y,{class:"mr-2"}),p(" "+C(e.t("layout.setting.clearBtn")),1)])),_:1},8,["onClick"])],2)}],["__scopeId","data-v-40ca4b3c"]]);export{O as default};
