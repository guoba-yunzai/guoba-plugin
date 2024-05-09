var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(t,o,s)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[o]=s,i=(e,t)=>{for(var o in t||(t={}))l.call(t,o)&&n(e,o,t[o]);if(s)for(var o of s(t))r.call(t,o)&&n(e,o,t[o]);return e},a=(e,s)=>t(e,o(s));import{B as d}from"./TableImg.js";import"./BasicForm.js";import{b as m,bn as c,p,B as u,r as f,s as x,x as g,k as j,e as b,l as h,a as w,o as S,i as C,j as O,X as R,v as y,V as I}from"./index.js";import{B as v,u as B}from"./index2.js";import{s as P,u as _}from"./useSelectModal.js";import"./index3.js";import"./index14.js";import"./index16.js";import"./onMountedOrActivated.js";import"./useWindowSizeFn.js";import"./useContentViewHeight.js";import"./ArrowLeftOutlined.js";import"./transButton.js";import"./index5.js";import"./index6.js";import"./merge.js";import"./upperFirst.js";import"./_baseIteratee.js";import"./get.js";import"./sortable.esm.js";import"./RedoOutlined.js";import"./FullscreenOutlined.js";import"./scrollTo.js";import"./index21.js";import"./index22.js";import"./index4.js";import"./find.js";import"./useFormItem.js";import"./download.js";import"./index7.js";import"./index8.js";import"./uniqBy.js";function k(e){return g.get({url:"/oicq/friend/list",params:e})}var F=m({name:"UserSelectModal",components:{BasicModal:v,BasicTable:d,FormItemRest:c},props:a(i({},P),{modalTitle:p.string.def("选择好友")}),emits:["register","getSelectResult"],setup(e,{emit:t}){const o=u(),s=f(),l=Object.assign({},x(e),x(o),{canResize:!1,bordered:!0,size:"small"}),[{rowSelection:r,visibleChange:n,selectValues:d,indexColumnProps:m,getSelectResult:c,handleDeleteSelected:p,selectRows:g}]=_(k,l),w=f({x:!1}),[S,{closeModal:C}]=B((()=>{window.innerWidth<900?w.value={x:900}:w.value={x:!1},setTimeout((()=>{s.value&&s.value.setSelectedRowKeys(d.value||[])}),800)})),O=[{title:"头像",dataIndex:"user_id",width:60,customRender:({text:e})=>j(b("g-avatar"),{id:e,qs:100},null)},{title:"QQ号",dataIndex:"user_id",width:120},{title:"昵称",dataIndex:"nickname",ellipsis:!0,align:"left",customRender:({text:e,record:t})=>t.remark!==e?j("span",null,[j("span",null,[t.remark]),j("span",{style:"color:#999;font-size:8px;"},[h("（"),e,h("）")])]):e},{title:"性别",dataIndex:"sex",width:60,customRender:({text:e})=>"female"===e?"女":"male"===e?"男":e}];return{handleOk:function(){c(((e,o)=>{t("getSelectResult",e,o),C()}))},searchInfo:f(e.params),register:S,indexColumnProps:m,visibleChange:n,getBindValue:l,getFriendList:k,formConfig:{baseColProps:{xs:24,sm:8,md:6,lg:8,xl:8,xxl:8},actionColOptions:{xs:24,sm:8,md:8,lg:8,xl:8,xxl:8,style:{paddingLeft:"8px",textAlign:"left"}},labelCol:{xs:24,sm:6},wrapperCol:{xs:24,sm:18},schemas:[{label:"QQ号",field:"query_qq",component:"Input",componentProps:{placeholder:"请输入QQ号"}},{label:"昵称",field:"query_name",component:"Input",componentProps:{placeholder:"请输入昵称"}}],autoSubmitOnEnter:!0},columns:O,rowSelection:r,selectRows:g,selectedTable:{rowKey:"user_id",size:"small",bordered:!0,scroll:{y:390},canResize:!1,pagination:!1,showIndexColumn:!1,columns:[O[0],a(i({},O[1]),{show:!1}),O[2]]},handleDeleteSelected:p,tableScroll:w,tableRef:s}}});const T=["onClick"];var q=w(F,[["render",function(e,t,o,s,l,r){const n=b("BasicTable"),i=b("a-col"),a=b("Icon"),d=b("a-row"),m=b("BasicModal"),c=b("FormItemRest");return S(),C(c,null,{default:O((()=>[j(m,R({width:"800px",title:e.modalTitle,onOk:e.handleOk,onRegister:e.register,onVisibleChange:e.visibleChange},e.$attrs),{default:O((()=>[j(d,null,{default:O((()=>[j(i,{span:e.showSelected?18:24},{default:O((()=>[j(n,R({ref:"tableRef",columns:e.columns,scroll:e.tableScroll},e.getBindValue,{useSearchForm:!0,formConfig:e.formConfig,api:e.getFriendList,searchInfo:e.searchInfo,rowSelection:e.rowSelection,indexColumnProps:e.indexColumnProps}),null,16,["columns","scroll","formConfig","api","searchInfo","rowSelection","indexColumnProps"])])),_:1},8,["span"]),e.showSelected?(S(),C(i,{key:0,span:6},{default:O((()=>[j(n,R(e.selectedTable,{dataSource:e.selectRows,useSearchForm:!0,formConfig:{showActionButtonGroup:!1,baseRowStyle:{minHeight:"40px"}}}),{action:O((({record:t})=>[y("a",{onClick:o=>e.handleDeleteSelected(t)},[j(a,{icon:"ant-design:delete-outlined"})],8,T)])),_:1},16,["dataSource"])])),_:1})):I("",!0)])),_:1})])),_:1},16,["title","onOk","onRegister","onVisibleChange"])])),_:1})}]]);export{q as default};
