import{aR as e,aS as n,b as a,bm as c,cE as o,aN as u,r as l,I as d,w as t,aG as i,J as s,q as r,af as h,k as v,_ as f,at as k,aD as p,aT as C,cF as y,ag as b,aB as g}from"./index.js";var m=n("small","default"),F=e(a({compatConfig:{MODE:3},name:"ASwitch",__ANT_SWITCH:!0,inheritAttrs:!1,props:{id:String,prefixCls:String,size:b.oneOf(m),disabled:{type:Boolean,default:void 0},checkedChildren:b.any,unCheckedChildren:b.any,tabindex:b.oneOfType([b.string,b.number]),autofocus:{type:Boolean,default:void 0},loading:{type:Boolean,default:void 0},checked:b.oneOfType([b.string,b.number,b.looseBool]),checkedValue:b.oneOfType([b.string,b.number,b.looseBool]).def(!0),unCheckedValue:b.oneOfType([b.string,b.number,b.looseBool]).def(!1),onChange:{type:Function},onClick:{type:Function},onKeydown:{type:Function},onMouseup:{type:Function},"onUpdate:checked":{type:Function},onBlur:Function,onFocus:Function},slots:["checkedChildren","unCheckedChildren"],setup:function(e,n){var a=n.attrs,b=n.slots,m=n.expose,F=n.emit,w=c();o((function(){u(!("defaultChecked"in a),"Switch","'defaultChecked' is deprecated, please use 'v-model:checked'"),u(!("value"in a),"Switch","`value` is not validate prop, do you mean `checked`?")}));var B=l(void 0!==e.checked?e.checked:a.defaultChecked),T=d((function(){return B.value===e.checkedValue}));t((function(){return e.checked}),(function(){B.value=e.checked}));var V=i("switch",e),x=V.prefixCls,S=V.direction,O=V.size,E=l(),_=function(){var e;null===(e=E.value)||void 0===e||e.focus()};m({focus:_,blur:function(){var e;null===(e=E.value)||void 0===e||e.blur()}}),s((function(){r((function(){e.autofocus&&!e.disabled&&E.value.focus()}))}));var A=function(n,a){e.disabled||(F("update:checked",n),F("change",n,a),w.onFieldChange())},I=function(e){F("blur",e)},M=function(n){_();var a=T.value?e.unCheckedValue:e.checkedValue;A(a,n),F("click",a,n)},N=function(n){n.keyCode===g.LEFT?A(e.unCheckedValue,n):n.keyCode===g.RIGHT&&A(e.checkedValue,n),F("keydown",n)},z=function(e){var n;null===(n=E.value)||void 0===n||n.blur(),F("mouseup",e)},D=d((function(){var n;return h(n={},"".concat(x.value,"-small"),"small"===O.value),h(n,"".concat(x.value,"-loading"),e.loading),h(n,"".concat(x.value,"-checked"),T.value),h(n,"".concat(x.value,"-disabled"),e.disabled),h(n,x.value,!0),h(n,"".concat(x.value,"-rtl"),"rtl"===S.value),n}));return function(){var n;return v(y,{insertExtraNode:!0},{default:function(){return[v("button",f(f(f({},k(e,["prefixCls","checkedChildren","unCheckedChildren","checked","autofocus","checkedValue","unCheckedValue","id","onChange","onUpdate:checked"])),a),{},{id:null!==(n=e.id)&&void 0!==n?n:w.id.value,onKeydown:N,onClick:M,onBlur:I,onMouseup:z,type:"button",role:"switch","aria-checked":B.value,disabled:e.disabled||e.loading,class:[a.class,D.value],ref:E}),[v("div",{class:"".concat(x.value,"-handle")},[e.loading?v(p,{class:"".concat(x.value,"-loading-icon")},null):null]),v("span",{class:"".concat(x.value,"-inner")},[T.value?C(b,e,"checkedChildren"):C(b,e,"unCheckedChildren")])])]}})}}}));export{F as S};
