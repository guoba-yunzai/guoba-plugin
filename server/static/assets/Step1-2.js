import{b as e,c as s,o as t,f as o,k as i,j as a,s as m,ax as r,c0 as d,v as p}from"./index.js";import{a as n}from"./hooks.js";import l from"./ModeBox.js";import j from"./StepBtn.js";import"./BasicForm.js";import"./index4.js";import"./find.js";import"./_baseIteratee.js";import"./get.js";import"./index5.js";import"./index6.js";import"./useFormItem.js";import"./index3.js";import"./transButton.js";import"./index2.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./upperFirst.js";import"./download.js";import"./index7.js";import"./index8.js";import"./uniqBy.js";import"./lodash.default.js";import"./throttle.js";import"./merge.js";const u={class:"step-box"},c=p("div",{class:"step-tip"},"请选择迁移模式",-1),f={key:0,class:"s-tip"},x=[p("span",null,"全量迁移会完整复制“data”文件夹，以及redis中用户uid的绑定关系。",-1)],k={key:1,class:"s-tip"},v=[p("span",{style:{color:"red"}},"[不推荐] ",-1),p("span",null," 选择迁移可选择迁移哪些项目。由于plugin可能会将数据存放到data文件夹， 如果使用选择迁移，锅巴无法考虑到所有插件，极有可能导致数据丢失！ ",-1)],y={key:2},g=e({__name:"Step1-2",emits:["prev","next"],setup(e,{emit:p}){const g=p,[h,{models:B}]=n({},{emit:g}),F=s({mode:[{key:"full",title:"全量迁移",desc:"完整复制“data”文件夹",recommended:!0},{key:"choose",title:"选择迁移",desc:"选择要迁移的项目"}]});return(e,s)=>(t(),o("div",u,[c,i(d,{name:"fade-slide",mode:"out-in",appear:""},{default:a((()=>[i(l,{active:m(B).mode,"onUpdate:active":s[0]||(s[0]=e=>m(B).mode=e),modeList:F.mode,key:"trans-mode"},null,8,["active","modeList"]),i(r,{name:"fade-slide",mode:"out-in",appear:"",key:"trans-1"},{default:a((()=>["full"===m(B).mode?(t(),o("div",f,x)):"choose"===m(B).mode?(t(),o("div",k,v)):(t(),o("span",y))])),_:1})])),_:1}),i(j,{onRegister:m(h)},null,8,["onRegister"])]))}});export{g as default};
