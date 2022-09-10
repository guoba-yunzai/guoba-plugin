import{b as e,aG as a,r as n,w as t,y as o,q as l,_ as r,U as u,E as i,k as c,L as d,a0 as s,av as p,D as v,af as f,am as y,ak as b,C as h,O as k}from"./index.js";var g=globalThis&&globalThis.__rest||function(e,a){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(t=Object.getOwnPropertySymbols(e);o<t.length;o++)a.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]])}return n},m=e({name:"Checkbox",inheritAttrs:!1,props:a({prefixCls:String,name:String,id:String,type:String,defaultChecked:{type:[Boolean,Number],default:void 0},checked:{type:[Boolean,Number],default:void 0},disabled:Boolean,tabindex:{type:[Number,String]},readonly:Boolean,autofocus:Boolean,value:s.any,required:Boolean},{prefixCls:"rc-checkbox",type:"checkbox",defaultChecked:!1}),emits:["click","change"],setup:function(e,a){var s=a.attrs,p=a.emit,v=a.expose,f=n(void 0===e.checked?e.defaultChecked:e.checked),y=n();t((function(){return e.checked}),(function(){f.value=e.checked})),o((function(){l((function(){}))})),v({focus:function(){var e;null===(e=y.value)||void 0===e||e.focus()},blur:function(){var e;null===(e=y.value)||void 0===e||e.blur()}});var b=n(),h=function(a){if(!e.disabled){void 0===e.checked&&(f.value=a.target.checked),a.shiftKey=b.value;var n={target:r(r({},e),{checked:a.target.checked}),stopPropagation:function(){a.stopPropagation()},preventDefault:function(){a.preventDefault()},nativeEvent:a};void 0!==e.checked&&(y.value.checked=!!e.checked),p("change",n),b.value=!1}},k=function(e){p("click",e),b.value=e.shiftKey};return function(){var a,n=e.prefixCls,t=e.name,o=e.id,l=e.type,p=e.disabled,v=e.readonly,b=e.tabindex,m=e.autofocus,x=e.value,C=e.required,O=g(e,["prefixCls","name","id","type","disabled","readonly","tabindex","autofocus","value","required"]),B=s.class,S=s.onFocus,w=s.onBlur,j=s.onKeydown,K=s.onKeypress,A=s.onKeyup,P=r(r({},O),s),_=Object.keys(P).reduce((function(e,a){return"aria-"!==a.substr(0,5)&&"data-"!==a.substr(0,5)&&"role"!==a||(e[a]=P[a]),e}),{}),F=u(n,B,(i(a={},"".concat(n,"-checked"),f.value),i(a,"".concat(n,"-disabled"),p),a)),G=r(r({name:t,id:o,type:l,readonly:v,disabled:p,tabindex:b,class:"".concat(n,"-input"),checked:!!f.value,autofocus:m,value:x},_),{onChange:h,onClick:k,onFocus:S,onBlur:w,onKeydown:j,onKeypress:K,onKeyup:A,required:C});return c("span",{class:F},[c("input",d({ref:y},G),null),c("span",{class:"".concat(n,"-inner")},null)])}}}),x=function(){return r(r({},{name:String,prefixCls:String,options:{type:Array,default:function(){return[]}},disabled:Boolean,id:String}),{defaultValue:{type:Array},value:{type:Array},onChange:{type:Function},"onUpdate:value":{type:Function}})},C=Symbol("CheckboxGroupContext"),O=globalThis&&globalThis.__rest||function(e,a){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(t=Object.getOwnPropertySymbols(e);o<t.length;o++)a.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]])}return n},B=e({name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:r(r({},{prefixCls:String,defaultChecked:{type:Boolean,default:void 0},checked:{type:Boolean,default:void 0},disabled:{type:Boolean,default:void 0},isGroup:{type:Boolean,default:void 0},value:s.any,name:String,id:String,indeterminate:{type:Boolean,default:void 0},type:{type:String,default:"checkbox"},autofocus:{type:Boolean,default:void 0},onChange:Function,"onUpdate:checked":Function,onClick:Function,skipGroup:{type:Boolean,default:!1}}),{indeterminate:{type:Boolean,default:!1}}),setup:function(e,a){var t=a.emit,l=a.attrs,s=a.slots,g=a.expose,x=p(),B=v("checkbox",e),S=B.prefixCls,w=B.direction,j=f(C,void 0),K=Symbol("checkboxUniId");y((function(){!e.skipGroup&&j&&j.registerValue(K,e.value)})),b((function(){j&&j.cancelValue(K)})),o((function(){h(void 0!==e.checked||j||void 0===e.value,"Checkbox","`value` is not validate prop, do you mean `checked`?")}));var A=function(e){var a=e.target.checked;t("update:checked",a),t("change",e)},P=n();return g({focus:function(){var e;null===(e=P.value)||void 0===e||e.focus()},blur:function(){var e;null===(e=P.value)||void 0===e||e.blur()}}),function(){var a,n,o=k(null===(n=s.default)||void 0===n?void 0:n.call(s)),p=e.indeterminate,v=e.skipGroup,f=e.id,y=void 0===f?x.id.value:f,b=O(e,["indeterminate","skipGroup","id"]),h=l.onMouseenter,g=l.onMouseleave;l.onInput;var C=l.class,B=l.style,K=O(l,["onMouseenter","onMouseleave","onInput","class","style"]),_=r(r(r({},b),{id:y,prefixCls:S.value}),K);j&&!v?(_.onChange=function(){for(var a=arguments.length,n=new Array(a),l=0;l<a;l++)n[l]=arguments[l];t.apply(void 0,["change"].concat(n)),j.toggleOption({label:o,value:e.value})},_.name=j.name.value,_.checked=-1!==j.mergedValue.value.indexOf(e.value),_.disabled=e.disabled||j.disabled.value,_.indeterminate=p):_.onChange=A;var F=u((i(a={},"".concat(S.value,"-wrapper"),!0),i(a,"".concat(S.value,"-rtl"),"rtl"===w.value),i(a,"".concat(S.value,"-wrapper-checked"),_.checked),i(a,"".concat(S.value,"-wrapper-disabled"),_.disabled),a),C),G=u(i({},"".concat(S.value,"-indeterminate"),p));return c("label",{class:F,style:B,onMouseenter:h,onMouseleave:g},[c(m,d(d({},_),{},{class:G,ref:P}),null),o.length?c("span",null,[o]):null])}}});export{C,m as V,B as a,x as c};
