import{p as parseAuthorLink,g as getStatusTags}from"./guoba.js";import{j as createVNode}from"./index.js";const columns=[{title:"插件标题",dataIndex:"title",width:200,slots:{customRender:"plugin-title"}},{title:"插件名称",dataIndex:"name",width:200,customRender:({record:record})=>record.link?createVNode("a",{href:record.link,target:"_blank"},[record.name]):record.name},{title:"插件作者",dataIndex:"author",width:180,customRender:({record:record})=>parseAuthorLink(record)},{title:"插件说明",dataIndex:"description",align:"left"},{title:"状态",dataIndex:"installed",align:"left",width:240,customRender:({record:record})=>getStatusTags(record,8)}];export{columns};
