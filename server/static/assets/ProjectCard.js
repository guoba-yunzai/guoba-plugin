import{b as s,fv as a,c5 as t,a as e,e as l,o as n,i as o,j as r,k as c,l as d,f as i,F as u,h as f,v as m,m as p,X as x}from"./index.js";import{g as v}from"./data.js";const y=s({components:{Card:a,CardGrid:a.Grid,Icon:t},setup:()=>({items:v})}),j={class:"flex"},C={class:"text-lg ml-4"},b={class:"flex mt-2 h-10 text-secondary"},g={class:"flex justify-between text-secondary"};var k=e(y,[["render",function(s,a,t,e,v,y){const k=l("a-button"),w=l("Icon"),G=l("CardGrid"),_=l("Card");return n(),o(_,x({title:"项目"},s.$attrs),{extra:r((()=>[c(k,{type:"link",size:"small"},{default:r((()=>[d("更多")])),_:1})])),default:r((()=>[(n(!0),i(u,null,f(s.items,(s=>(n(),o(G,{key:s,class:"!md:w-1/3 !w-full"},{default:r((()=>[m("span",j,[c(w,{icon:s.icon,color:s.color,size:"30"},null,8,["icon","color"]),m("span",C,p(s.title),1)]),m("div",b,p(s.desc),1),m("div",g,[m("span",null,p(s.group),1),m("span",null,p(s.date),1)])])),_:2},1024)))),128))])),_:1},16)}]]);export{k as default};
