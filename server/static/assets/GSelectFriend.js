import{b as e,aR as a,aN as l,bj as t,p as n,bD as o,af as s,r as d,c as i,a as u,e as r,o as c,f as p,k as g,j as h,bU as m,i as f,bH as v,bV as b,cV as y,cW as O,z as _,cX as S,x as w,ae as V,am as j,w as C}from"./index.js";import{b as x}from"./index3.js";import{u as B}from"./useFormItem.js";import{c as M}from"./createAsyncComponent.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";const k=e({name:"GSelectBiz",components:{AButton:a,LoadingOutlined:l,SearchOutlined:t},inheritAttrs:!1,props:{showButton:n.bool.def(!1),disabled:n.bool.def(!1),placeholder:{type:String,default:"请选择"},multiple:{type:String,default:"multiple"},loading:n.bool.def(!1),maxTagCount:n.number},emits:["handleOpen","change"],setup(e,{emit:a}){const l=o(),t=s("selectOptions",d([])),n=s("selectValues",i({value:[],change:!1}));return{attrs:l,selectValues:n,options:t,handleChange:function(e){n.value=e,a("change",e)},openModal:function(){a("handleOpen")}}}}),F=(e=>(y("data-v-5644c45a"),e=e(),O(),e))((()=>_("span",null,"选择",-1)));var G=u(k,[["render",function(e,a,l,t,n,o){const s=r("LoadingOutlined"),d=r("a-input"),i=r("a-select"),u=r("a-col"),y=r("SearchOutlined"),O=r("a-button"),_=r("a-row");return c(),p("div",null,[g(_,{class:"g-select-row",type:"flex",gutter:8},{default:h((()=>[g(u,{class:m(["left",{full:!e.showButton}])},{default:h((()=>[e.loading?(c(),f(d,{key:0,readOnly:"",placeholder:"加载中…"},{prefix:h((()=>[g(s)])),_:1})):(c(),f(i,v({key:1,ref:"select",value:e.selectValues.value,"onUpdate:value":a[0]||(a[0]=a=>e.selectValues.value=a),placeholder:e.placeholder,mode:e.multiple,open:!1,disabled:e.disabled,options:e.options,maxTagCount:e.maxTagCount,onChange:e.handleChange,style:{width:"100%"},onClick:a[1]||(a[1]=a=>!e.disabled&&e.openModal(!1))},e.attrs),null,16,["value","placeholder","mode","disabled","options","maxTagCount","onChange"]))])),_:1},8,["class"]),e.showButton?(c(),f(u,{key:0,class:"right"},{default:h((()=>[g(O,{type:"primary",loading:e.loading,disabled:e.disabled,onClick:a[2]||(a[2]=a=>e.openModal(!0))},{icon:h((()=>[g(y)])),default:h((()=>[F])),_:1},8,["loading","disabled"])])),_:1})):b("",!0)])),_:1})])}],["__scopeId","data-v-5644c45a"]]);var R=u(e({name:"GSelectFriend",inheritAttrs:!1,components:{GSelectBiz:G,SelectFriendModal:M((()=>S((()=>import("./SelectFriendModal.js")),["assets/SelectFriendModal.js","assets/TableImg.js","assets/TableImg.css","assets/index.js","assets/index18.css","assets/BasicForm.js","assets/BasicForm.css","assets/index2.js","assets/index14.css","assets/_baseIteratee.js","assets/get.js","assets/index4.js","assets/index9.css","assets/index5.js","assets/index12.css","assets/useFormItem.js","assets/transButton.js","assets/index3.js","assets/index6.css","assets/useWindowSizeFn.js","assets/FullscreenOutlined.js","assets/download.js","assets/index6.js","assets/index7.css","assets/index7.js","assets/index.css","assets/uniqBy.js","assets/useForm.js","assets/index12.js","assets/index20.css","assets/index14.js","assets/index8.css","assets/onMountedOrActivated.js","assets/useContentViewHeight.js","assets/ArrowLeftOutlined.js","assets/sortable.esm.js","assets/RedoOutlined.js","assets/scrollTo.js","assets/index19.js","assets/index21.css"])))},props:{value:n.array,rowKey:n.string.def("user_id"),labelKey:n.string.def("nickname"),params:n.object.def((()=>({})))},emits:["options-change","change","update:value"],setup(e,{emit:a}){const l=o(),t=d([]),[n,{openModal:s}]=x(),[u]=B(e,"value","change",t),r=d([]),c=i({value:[],change:!1}),p=Object.assign({},w(e),w(l)),g=d(!0),h=d(!1);return V("selectOptions",r),V("selectValues",c),V("loadingEcho",h),j((()=>function(){let a=e.value;a&&a.length>0?c.value=a:c.value=[]}())),C(c,(()=>{c&&(u.value=c.value)})),{state:u,attrs:l,selectOptions:r,getBindValue:p,selectValues:c,btnLoading:g,loadingEcho:h,registerModal:function(...e){g.value=!1,n.apply(null,e)},setValue:function(e,l){r.value=e,u.value=l,c.value=l,a("update:value",l)},handleOpen:function(){s(!0,{isUpdate:!1})}}}}),[["render",function(e,a,l,t,n,o){const s=r("GSelectBiz"),d=r("SelectFriendModal");return c(),p("div",null,[g(s,v({onHandleOpen:e.handleOpen,loading:e.btnLoading||e.loadingEcho,showButton:""},e.attrs),null,16,["onHandleOpen","loading"]),g(d,v({rowKey:e.rowKey,onRegister:e.registerModal,onGetSelectResult:e.setValue},e.getBindValue),null,16,["rowKey","onRegister","onGetSelectResult"])])}],["__scopeId","data-v-376d66e4"]]);export{R as default};
