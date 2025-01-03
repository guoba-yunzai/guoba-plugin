import{d as defineComponent,r as ref,w as watch,o as openBlock,h as createBlock,i as withCtx,v as createBaseVNode,W as normalizeStyle,y as unref,bc as Card}from"./index.js";import{u as useECharts}from"./useECharts.js";const _sfc_main=defineComponent({__name:"VisitSource",props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(__props){const props=__props,chartRef=ref(null),{setOptions:setOptions}=useECharts(chartRef);return watch((()=>props.loading),(()=>{props.loading||setOptions({tooltip:{trigger:"item"},legend:{bottom:"1%",left:"center"},series:[{color:["#5ab1ef","#b6a2de","#67e0e3","#2ec7c9"],name:"访问来源",type:"pie",radius:["40%","70%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:2},label:{show:!1,position:"center"},emphasis:{label:{show:!0,fontSize:"12",fontWeight:"bold"}},labelLine:{show:!1},data:[{value:1048,name:"搜索引擎"},{value:735,name:"直接访问"},{value:580,name:"邮件营销"},{value:484,name:"联盟广告"}],animationType:"scale",animationEasing:"exponentialInOut",animationDelay:function(){return 100*Math.random()}}]})}),{immediate:!0}),(_ctx,_cache)=>(openBlock(),createBlock(unref(Card),{title:"访问来源",loading:__props.loading},{default:withCtx((()=>[createBaseVNode("div",{ref_key:"chartRef",ref:chartRef,style:normalizeStyle({width:__props.width,height:__props.height})},null,4)])),_:1},8,["loading"]))}});export{_sfc_main as _};
