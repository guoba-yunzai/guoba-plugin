var e=(e,t,m)=>new Promise(((o,a)=>{var r=e=>{try{i(m.next(e))}catch(t){a(t)}},s=e=>{try{i(m.throw(e))}catch(t){a(t)}},i=e=>e.done?o(e.value):Promise.resolve(e.value).then(r,s);i((m=m.apply(e,t)).next())}));import{B as t}from"./BasicForm.js";import{u as m}from"./useForm.js";import{a as o,B as a}from"./index28.js";import{s as r}from"./miao.data.js";import s from"./ThemeConfigForm.js";import{b as i,e as l,o as n,i as d,j as p,k as u,x as h,l as j,w as f}from"./index.js";import"./index2.js";import"./find.js";import"./_baseIteratee.js";import"./get.js";import"./index4.js";import"./index5.js";import"./useFormItem.js";import"./transButton.js";import"./index3.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";import"./upperFirst.js";import"./download.js";import"./index6.js";import"./index7.js";import"./uniqBy.js";import"./index9.js";import"./ArrowLeftOutlined.js";import"./lodash.default.js";import"./throttle.js";import"./merge.js";import"./miao.api.js";import"./base64Conver.js";const c=j("上传图标"),g=j("关闭"),y=i({__name:"SettingDrawer",props:{model:{type:Object,default:()=>({})},themeName:String,themeNames:Array,themeStyle:Object,debugThemeName:String},emits:["register","update:model","update:themeStyle","update:debugThemeName"],setup(i,{emit:j}){const y=i,[b,{closeDrawer:x}]=o(),[w,{getFieldsValue:N,setFieldsValue:S,updateSchema:C}]=m({schemas:r,labelWidth:120,labelAlign:"right",labelCol:{xs:24,sm:5},wrapperCol:{xs:24,sm:19},showActionButtonGroup:!1,baseColProps:{span:24}}),F=window.innerWidth>=600?"600px":"100%";function _(t,m){return e(this,null,(function*(){w(t),yield function(){return e(this,null,(function*(){let e=[];yield C({field:"themeSet",componentProps:{onChange(t){t?Array.isArray(e)&&e.length>0?S({theme:e}):S({theme:["default"]}):(e=N().theme,S({theme:"all"}))}}}),f((()=>y.themeNames),(e=>{Array.isArray(e)||(e=[]),0===e.length&&(e=["default"]);let t=e.map((e=>({label:e,value:e})));C([{field:"theme",componentProps:{options:t}},{field:"themeExclude",componentProps:{options:t}}])}),{deep:!0,immediate:!0})}))}(),yield S(y.model),f((()=>y.model),(()=>S(y.model))),f(m,A,{immediate:!0})}))}function A(e){e.themeSet="all"!==e.theme,j("update:model",e)}return(e,m)=>{const o=l("a-button"),r=l("a-col"),f=l("a-row");return n(),d(h(a),{title:"高级设置",width:h(F),placement:"left",showFooter:"",maskStyle:{backgroundColor:"rgba(0,0,0,0.2)"},onRegister:h(b)},{footer:p((()=>[u(f,{type:"flex",justify:"space-between"},{default:p((()=>[u(r,null,{default:p((()=>[u(o,{type:"primary",onClick:m[2]||(m[2]=()=>{})},{default:p((()=>[c])),_:1})])),_:1}),u(r,null,{default:p((()=>[u(o,{onClick:h(x)},{default:p((()=>[g])),_:1},8,["onClick"])])),_:1})])),_:1})])),default:p((()=>[u(h(t),{onRegister:_}),u(s,{model:i.themeStyle,themeName:i.themeName,debugThemeName:i.debugThemeName,themeNames:i.themeNames,"onUpdate:model":m[0]||(m[0]=e=>j("update:themeStyle",e)),"onUpdate:debugThemeName":m[1]||(m[1]=e=>j("update:debugThemeName",e))},null,8,["model","themeName","debugThemeName","themeNames"])])),_:1},8,["width","maskStyle","onRegister"])}}});export{y as default};
