var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(t,n,l)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[n]=l,i=(e,i)=>{for(var o in i||(i={}))n.call(i,o)&&a(e,o,i[o]);if(t)for(var o of t(i))l.call(i,o)&&a(e,o,i[o]);return e};import{B as o,u as E}from"./index32.js";import{c_ as s,c$ as u,g9 as _,ga as r,gb as g,eC as O,eD as d,gc as S,y as T,f4 as A,eY as N,gd as M,ge as R,eW as I,gf as c,gg as D,gh as H,gi as C,b as m,f3 as L,eF as y,I as U,k as p,s as b,c7 as f,gj as B,X as v,F as G,gk as W,gl as h,gm as P,a as F,c5 as w,e as x,o as X,f as k}from"./index.js";import{u as j,a as K}from"./index10.js";const V=s((()=>u((()=>import("./TypePicker.js")),["assets/TypePicker.js","assets/TypePicker.css","assets/index.js","assets/index25.css"]))),Y=s((()=>u((()=>import("./ThemeColorPicker.js")),["assets/ThemeColorPicker.js","assets/ThemeColorPicker.css","assets/index.js","assets/index25.css","assets/index32.js","assets/index13.css","assets/index11.js","assets/index23.css","assets/ArrowLeftOutlined.js","assets/index10.js","assets/index12.css","assets/PluginIcon.js","assets/PluginIcon.css","assets/FullscreenOutlined.js","assets/index12.js","assets/index4.css","assets/useWindowSizeFn.js","assets/useContentViewHeight.js","assets/uniqBy.js","assets/_baseIteratee.js","assets/get.js","assets/RedoOutlined.js","assets/lock.js"]))),Q=s((()=>u((()=>import("./SettingFooter.js")),["assets/SettingFooter.js","assets/SettingFooter.css","assets/index.js","assets/index25.css","assets/CopyOutlined.js","assets/RedoOutlined.js"]))),$=s((()=>u((()=>import("./SwitchItem.js")),["assets/SwitchItem.js","assets/SwitchItem.css","assets/index.js","assets/index25.css","assets/index6.js","assets/index18.css","assets/index32.js","assets/index13.css","assets/index11.js","assets/index23.css","assets/ArrowLeftOutlined.js","assets/index10.js","assets/index12.css","assets/PluginIcon.js","assets/PluginIcon.css","assets/FullscreenOutlined.js","assets/index12.js","assets/index4.css","assets/useWindowSizeFn.js","assets/useContentViewHeight.js","assets/uniqBy.js","assets/_baseIteratee.js","assets/get.js","assets/RedoOutlined.js","assets/lock.js"]))),Z=s((()=>u((()=>import("./SelectItem.js")),["assets/SelectItem.js","assets/SelectItem.css","assets/index.js","assets/index25.css","assets/index32.js","assets/index13.css","assets/index11.js","assets/index23.css","assets/ArrowLeftOutlined.js","assets/index10.js","assets/index12.css","assets/PluginIcon.js","assets/PluginIcon.css","assets/FullscreenOutlined.js","assets/index12.js","assets/index4.css","assets/useWindowSizeFn.js","assets/useContentViewHeight.js","assets/uniqBy.js","assets/_baseIteratee.js","assets/get.js","assets/RedoOutlined.js","assets/lock.js"]))),z=s((()=>u((()=>import("./InputNumberItem.js")),["assets/InputNumberItem.js","assets/InputNumberItem.css","assets/index.js","assets/index25.css","assets/index5.js","assets/index24.css","assets/index32.js","assets/index13.css","assets/index11.js","assets/index23.css","assets/ArrowLeftOutlined.js","assets/index10.js","assets/index12.css","assets/PluginIcon.js","assets/PluginIcon.css","assets/FullscreenOutlined.js","assets/index12.js","assets/index4.css","assets/useWindowSizeFn.js","assets/useContentViewHeight.js","assets/uniqBy.js","assets/_baseIteratee.js","assets/get.js","assets/RedoOutlined.js","assets/lock.js"]))),{t:q}=T();var J=(e=>(e[e.CHANGE_LAYOUT=0]="CHANGE_LAYOUT",e[e.CHANGE_THEME_COLOR=1]="CHANGE_THEME_COLOR",e[e.CHANGE_THEME=2]="CHANGE_THEME",e[e.MENU_HAS_DRAG=3]="MENU_HAS_DRAG",e[e.MENU_ACCORDION=4]="MENU_ACCORDION",e[e.MENU_TRIGGER=5]="MENU_TRIGGER",e[e.MENU_TOP_ALIGN=6]="MENU_TOP_ALIGN",e[e.MENU_COLLAPSED=7]="MENU_COLLAPSED",e[e.MENU_COLLAPSED_SHOW_TITLE=8]="MENU_COLLAPSED_SHOW_TITLE",e[e.MENU_WIDTH=9]="MENU_WIDTH",e[e.MENU_SHOW_SIDEBAR=10]="MENU_SHOW_SIDEBAR",e[e.MENU_THEME=11]="MENU_THEME",e[e.MENU_SPLIT=12]="MENU_SPLIT",e[e.MENU_FIXED=13]="MENU_FIXED",e[e.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE=14]="MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE",e[e.MENU_TRIGGER_MIX_SIDEBAR=15]="MENU_TRIGGER_MIX_SIDEBAR",e[e.MENU_FIXED_MIX_SIDEBAR=16]="MENU_FIXED_MIX_SIDEBAR",e[e.HEADER_SHOW=17]="HEADER_SHOW",e[e.HEADER_THEME=18]="HEADER_THEME",e[e.HEADER_FIXED=19]="HEADER_FIXED",e[e.HEADER_SEARCH=20]="HEADER_SEARCH",e[e.TABS_SHOW_QUICK=21]="TABS_SHOW_QUICK",e[e.TABS_SHOW_REDO=22]="TABS_SHOW_REDO",e[e.TABS_SHOW=23]="TABS_SHOW",e[e.TABS_SHOW_FOLD=24]="TABS_SHOW_FOLD",e[e.LOCK_TIME=25]="LOCK_TIME",e[e.FULL_CONTENT=26]="FULL_CONTENT",e[e.CONTENT_MODE=27]="CONTENT_MODE",e[e.SHOW_BREADCRUMB=28]="SHOW_BREADCRUMB",e[e.SHOW_BREADCRUMB_ICON=29]="SHOW_BREADCRUMB_ICON",e[e.GRAY_MODE=30]="GRAY_MODE",e[e.COLOR_WEAK=31]="COLOR_WEAK",e[e.SHOW_LOGO=32]="SHOW_LOGO",e[e.SHOW_FOOTER=33]="SHOW_FOOTER",e[e.ROUTER_TRANSITION=34]="ROUTER_TRANSITION",e[e.OPEN_PROGRESS=35]="OPEN_PROGRESS",e[e.OPEN_PAGE_LOADING=36]="OPEN_PAGE_LOADING",e[e.OPEN_ROUTE_TRANSITION=37]="OPEN_ROUTE_TRANSITION",e))(J||{});const ee=[{value:_.FULL,label:q("layout.setting.contentModeFull")},{value:_.FIXED,label:q("layout.setting.contentModeFixed")}],te=[{value:r.CENTER,label:q("layout.setting.topMenuAlignRight")},{value:r.START,label:q("layout.setting.topMenuAlignLeft")},{value:r.END,label:q("layout.setting.topMenuAlignCenter")}],ne=[g.ZOOM_FADE,g.FADE,g.ZOOM_OUT,g.FADE_SIDE,g.FADE_BOTTOM,g.FADE_SCALE].map((e=>({label:e,value:e}))),le=[{title:q("layout.setting.menuTypeSidebar"),mode:O.INLINE,type:d.SIDEBAR},{title:q("layout.setting.menuTypeMix"),mode:O.INLINE,type:d.MIX},{title:q("layout.setting.menuTypeTopMenu"),mode:O.HORIZONTAL,type:d.TOP_MENU},{title:q("layout.setting.menuTypeMixSidebar"),mode:O.INLINE,type:d.MIX_SIDEBAR}],ae=[{value:S.HOVER,label:q("layout.setting.triggerHover")},{value:S.CLICK,label:q("layout.setting.triggerClick")}];function ie(e,t){const n=N(),l=function(e,t){const n=N(),{getThemeColor:l,getDarkMode:a}=I();switch(e){case J.CHANGE_LAYOUT:const{mode:e,type:o,split:E}=t;return{menuSetting:i({mode:e,type:o,collapsed:!1,show:!0,hidden:!1},void 0===E?{split:E}:{})};case J.CHANGE_THEME_COLOR:return l.value===t?{}:(C(t),{themeColor:t});case J.CHANGE_THEME:return a.value===t||H(t),{};case J.MENU_HAS_DRAG:return{menuSetting:{canDrag:t}};case J.MENU_ACCORDION:return{menuSetting:{accordion:t}};case J.MENU_TRIGGER:return{menuSetting:{trigger:t}};case J.MENU_TOP_ALIGN:return{menuSetting:{topMenuAlign:t}};case J.MENU_COLLAPSED:return{menuSetting:{collapsed:t}};case J.MENU_WIDTH:return{menuSetting:{menuWidth:t}};case J.MENU_SHOW_SIDEBAR:return{menuSetting:{show:t}};case J.MENU_COLLAPSED_SHOW_TITLE:return{menuSetting:{collapsedShowTitle:t}};case J.MENU_THEME:return R(t),{menuSetting:{bgColor:t}};case J.MENU_SPLIT:return{menuSetting:{split:t}};case J.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:return{menuSetting:{closeMixSidebarOnChange:t}};case J.MENU_FIXED:return{menuSetting:{fixed:t}};case J.MENU_TRIGGER_MIX_SIDEBAR:return{menuSetting:{mixSideTrigger:t}};case J.MENU_FIXED_MIX_SIDEBAR:return{menuSetting:{mixSideFixed:t}};case J.OPEN_PAGE_LOADING:return n.setPageLoading(!1),{transitionSetting:{openPageLoading:t}};case J.ROUTER_TRANSITION:return{transitionSetting:{basicTransition:t}};case J.OPEN_ROUTE_TRANSITION:return{transitionSetting:{enable:t}};case J.OPEN_PROGRESS:return{transitionSetting:{openNProgress:t}};case J.LOCK_TIME:return{lockTime:t};case J.FULL_CONTENT:return{fullContent:t};case J.CONTENT_MODE:return{contentMode:t};case J.SHOW_BREADCRUMB:return{showBreadCrumb:t};case J.SHOW_BREADCRUMB_ICON:return{showBreadCrumbIcon:t};case J.GRAY_MODE:return D(t),{grayMode:t};case J.SHOW_FOOTER:return{showFooter:t};case J.COLOR_WEAK:return c(t),{colorWeak:t};case J.SHOW_LOGO:return{showLogo:t};case J.TABS_SHOW_QUICK:return{multiTabsSetting:{showQuick:t}};case J.TABS_SHOW:return{multiTabsSetting:{show:t}};case J.TABS_SHOW_REDO:return{multiTabsSetting:{showRedo:t}};case J.TABS_SHOW_FOLD:return{multiTabsSetting:{showFold:t}};case J.HEADER_THEME:return M(t),{headerSetting:{bgColor:t}};case J.HEADER_SEARCH:return{headerSetting:{showSearch:t}};case J.HEADER_FIXED:return{headerSetting:{fixed:t}};case J.HEADER_SHOW:return{headerSetting:{show:t}};default:return{}}}(e,t);n.setProjectConfig(l),e===J.CHANGE_THEME&&(M(),R())}const{t:oe}=T();var Ee=m({name:"SettingDrawer",setup(e,{attrs:t}){const{getContentMode:n,getShowFooter:l,getShowBreadCrumb:a,getShowBreadCrumbIcon:i,getShowLogo:E,getFullContent:s,getColorWeak:u,getGrayMode:_,getLockTime:r,getShowDarkModeToggle:g,getThemeColor:O}=I(),{getOpenPageLoading:S,getBasicTransition:T,getEnableTransition:N,getOpenNProgress:M}=L(),{getIsHorizontal:R,getShowMenu:c,getMenuType:D,getTrigger:H,getCollapsedShowTitle:C,getMenuFixed:m,getCollapsed:F,getCanDrag:w,getTopMenuAlign:x,getAccordion:X,getMenuWidth:k,getMenuBgColor:Ee,getIsTopMenu:se,getSplit:ue,getIsMixSidebar:_e,getCloseMixSidebarOnChange:re,getMixSideTrigger:ge,getMixSideFixed:Oe}=y(),{getShowHeader:de,getFixed:Se,getHeaderBgColor:Te,getShowSearch:Ae}=j(),{getShowMultipleTab:Ne,getShowQuick:Me,getShowRedo:Re,getShowFold:Ie}=K(),ce=U((()=>b(c)&&!b(R)));function De(){let e=b(H);const t=(l=b(ue),[{value:A.NONE,label:q("layout.setting.menuTriggerNone")},{value:A.FOOTER,label:q("layout.setting.menuTriggerBottom")},...l?[]:[{value:A.HEADER,label:q("layout.setting.menuTriggerTop")}]]);var l;return t.some((t=>t.value===e))||(e=A.FOOTER),p(G,null,[p($,{title:oe("layout.setting.splitMenu"),event:J.MENU_SPLIT,def:b(ue),disabled:!b(ce)||b(D)!==d.MIX},null),p($,{title:oe("layout.setting.mixSidebarFixed"),event:J.MENU_FIXED_MIX_SIDEBAR,def:b(Oe),disabled:!b(_e)},null),p($,{title:oe("layout.setting.closeMixSidebarOnChange"),event:J.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,def:b(re),disabled:!b(_e)},null),p($,{title:oe("layout.setting.menuCollapse"),event:J.MENU_COLLAPSED,def:b(F),disabled:!b(ce)},null),p($,{title:oe("layout.setting.menuDrag"),event:J.MENU_HAS_DRAG,def:b(w),disabled:!b(ce)},null),p($,{title:oe("layout.setting.menuSearch"),event:J.HEADER_SEARCH,def:b(Ae),disabled:!b(de)},null),p($,{title:oe("layout.setting.menuAccordion"),event:J.MENU_ACCORDION,def:b(X),disabled:!b(ce)},null),p($,{title:oe("layout.setting.collapseMenuDisplayName"),event:J.MENU_COLLAPSED_SHOW_TITLE,def:b(C),disabled:!b(ce)||!b(F)||b(_e)},null),p($,{title:oe("layout.setting.fixedHeader"),event:J.HEADER_FIXED,def:b(Se),disabled:!b(de)},null),p($,{title:oe("layout.setting.fixedSideBar"),event:J.MENU_FIXED,def:b(m),disabled:!b(ce)||b(_e)},null),p(Z,{title:oe("layout.setting.mixSidebarTrigger"),event:J.MENU_TRIGGER_MIX_SIDEBAR,def:b(ge),options:ae,disabled:!b(_e)},null),p(Z,{title:oe("layout.setting.topMenuLayout"),event:J.MENU_TOP_ALIGN,def:b(x),options:te,disabled:!b(de)||b(ue)||!b(se)&&!b(ue)||b(_e)},null),p(Z,{title:oe("layout.setting.menuCollapseButton"),event:J.MENU_TRIGGER,def:e,options:t,disabled:!b(ce)||b(_e)},null),p(Z,{title:oe("layout.setting.contentMode"),event:J.CONTENT_MODE,def:b(n),options:ee},null),p(z,{title:oe("layout.setting.autoScreenLock"),min:0,event:J.LOCK_TIME,defaultValue:b(r),formatter:e=>0===parseInt(e)?`0(${oe("layout.setting.notAutoScreenLock")})`:`${e}${oe("layout.setting.minute")}`},null),p(z,{title:oe("layout.setting.expandedMenuWidth"),max:600,min:100,step:10,event:J.MENU_WIDTH,disabled:!b(ce),defaultValue:b(k),formatter:e=>`${parseInt(e)}px`},null)])}return()=>p(o,v(t,{title:oe("layout.setting.drawerTitle"),width:330,class:"setting-drawer"}),{default:()=>[b(g)&&p(f,null,{default:()=>oe("layout.setting.darkMode")}),b(g)&&p(B,{class:"mx-auto"},null),p(f,null,{default:()=>oe("layout.setting.navMode")}),p(G,null,[p(V,{menuTypeList:le,handler:e=>{ie(J.CHANGE_LAYOUT,{mode:e.mode,type:e.type,split:!b(R)&&void 0})},def:b(D)},null)]),p(f,null,{default:()=>oe("layout.setting.sysTheme")}),p(Y,{colorList:P,def:b(O),event:J.CHANGE_THEME_COLOR},null),p(f,null,{default:()=>oe("layout.setting.headerTheme")}),p(Y,{colorList:W,def:b(Te),event:J.HEADER_THEME},null),p(f,null,{default:()=>oe("layout.setting.sidebarTheme")}),p(Y,{colorList:h,def:b(Ee),event:J.MENU_THEME},null),p(f,null,{default:()=>oe("layout.setting.interfaceFunction")}),De(),p(f,null,{default:()=>oe("layout.setting.interfaceDisplay")}),p(G,null,[p($,{title:oe("layout.setting.breadcrumb"),event:J.SHOW_BREADCRUMB,def:b(a),disabled:!b(de)},null),p($,{title:oe("layout.setting.breadcrumbIcon"),event:J.SHOW_BREADCRUMB_ICON,def:b(i),disabled:!b(de)},null),p($,{title:oe("layout.setting.tabs"),event:J.TABS_SHOW,def:b(Ne)},null),p($,{title:oe("layout.setting.tabsRedoBtn"),event:J.TABS_SHOW_REDO,def:b(Re),disabled:!b(Ne)},null),p($,{title:oe("layout.setting.tabsQuickBtn"),event:J.TABS_SHOW_QUICK,def:b(Me),disabled:!b(Ne)},null),p($,{title:oe("layout.setting.tabsFoldBtn"),event:J.TABS_SHOW_FOLD,def:b(Ie),disabled:!b(Ne)},null),p($,{title:oe("layout.setting.sidebar"),event:J.MENU_SHOW_SIDEBAR,def:b(c),disabled:b(R)},null),p($,{title:oe("layout.setting.header"),event:J.HEADER_SHOW,def:b(de)},null),p($,{title:"Logo",event:J.SHOW_LOGO,def:b(E),disabled:b(_e)},null),p($,{title:oe("layout.setting.footer"),event:J.SHOW_FOOTER,def:b(l)},null),p($,{title:oe("layout.setting.fullContent"),event:J.FULL_CONTENT,def:b(s)},null),p($,{title:oe("layout.setting.grayMode"),event:J.GRAY_MODE,def:b(_)},null),p($,{title:oe("layout.setting.colorWeak"),event:J.COLOR_WEAK,def:b(u)},null)]),p(f,null,{default:()=>oe("layout.setting.animation")}),p(G,null,[p($,{title:oe("layout.setting.progress"),event:J.OPEN_PROGRESS,def:b(M)},null),p($,{title:oe("layout.setting.switchLoading"),event:J.OPEN_PAGE_LOADING,def:b(S)},null),p($,{title:oe("layout.setting.switchAnimation"),event:J.OPEN_ROUTE_TRANSITION,def:b(N)},null),p(Z,{title:oe("layout.setting.animationType"),event:J.ROUTER_TRANSITION,def:b(T),options:ne,disabled:!b(N)},null)]),p(f,null,null),p(Q,null,null)]})}});var se=F(m({name:"SettingButton",components:{SettingDrawer:Ee,Icon:w},setup(){const[e,{openDrawer:t}]=E();return{register:e,openDrawer:t}}}),[["render",function(e,t,n,l,a,i){const o=x("Icon"),E=x("SettingDrawer");return X(),k("div",{onClick:t[0]||(t[0]=t=>e.openDrawer(!0))},[p(o,{icon:"ion:settings-outline"}),p(E,{onRegister:e.register},null,8,["onRegister"])])}]]),ue=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"}));export{ie as b,ue as i};
