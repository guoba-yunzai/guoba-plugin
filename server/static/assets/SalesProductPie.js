import{b as e,r as a,w as t,o as i,i as n,j as s,v as o,O as r,s as l,fv as u}from"./index.js";import{u as d}from"./useECharts.js";const m=e({__name:"SalesProductPie",props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(e){const m=e,p=a(null),{setOptions:g}=d(p);return t((()=>m.loading),(()=>{m.loading||g({tooltip:{trigger:"item"},series:[{name:"访问来源",type:"pie",radius:"80%",center:["50%","50%"],color:["#5ab1ef","#b6a2de","#67e0e3","#2ec7c9"],data:[{value:500,name:"电子产品"},{value:310,name:"服装"},{value:274,name:"化妆品"},{value:400,name:"家居"}].sort((function(e,a){return e.value-a.value})),roseType:"radius",animationType:"scale",animationEasing:"exponentialInOut",animationDelay:function(){return 400*Math.random()}}]})}),{immediate:!0}),(a,t)=>(i(),n(l(u),{title:"成交占比",loading:e.loading},{default:s((()=>[o("div",{ref_key:"chartRef",ref:p,style:r({width:e.width,height:e.height})},null,4)])),_:1},8,["loading"]))}});export{m as default};
