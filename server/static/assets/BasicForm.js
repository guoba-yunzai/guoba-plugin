var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key2,value2)=>key2 in obj?__defProp(obj,key2,{enumerable:!0,configurable:!0,writable:!0,value:value2}):obj[key2]=value2,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b)),__async=(__this,__arguments,generator)=>new Promise(((resolve,reject)=>{var fulfilled=value2=>{try{step(generator.next(value2))}catch(e){reject(e)}},rejected=value2=>{try{step(generator.throw(value2))}catch(e){reject(e)}},step=x=>x.done?resolve(x.value):Promise.resolve(x.value).then(fulfilled,rejected);step((generator=generator.apply(__this,__arguments)).next())}));import{C as computed,y as unref,bh as isNumber,d as defineComponent,t as toRefs,T as withDirectives,j as createVNode,bz as Col,bp as isVNode,av as isBoolean,ak as isFunction,bA as getSlot,a9 as useI18n,bB as Divider,D as mergeProps,bC as Form,X as vShow,be as cloneDeep,k as createTextVNode,bD as BasicHelp,bE as isNull,b as _export_sfc,c as resolveComponent,o as openBlock,h as createBlock,i as withCtx,v as createBaseVNode,aq as renderSlot,m as toDisplayString,x as createCommentVNode,W as normalizeStyle,a0 as normalizeProps,aw as isObject,bF as isArray,bG as isString,bH as set,bI as dateUtil,bJ as isNullOrUnDef,bm as useBreakpoint,w as watch,ax as useDebounceFn,ap as getCurrentInstance,n as nextTick,ad as toRaw,bK as isDef,bx as error,bu as deepMerge,bL as isEmpty,L as watchEffect,bM as Row,a as reactive,r as ref,E as useDesign,an as onMounted,e as createElementBlock,f as renderList,F as Fragment,a$ as createSlots,a1 as guardReactiveProps,q as withKeys}from"./index.js";import{c as createPlaceholderMessage,s as setComponentRuleType,a as componentMap,_ as _sfc_main$2,d as defaultValueComponents,h as handleInputNumberValue,b as dateItemType,e as basicProps,f as createFormContext}from"./BasicForm.vue_vue_type_style_index_0_lang.js";import{u as upperFirst}from"./upperFirst.js";import{u as uniqBy}from"./uniqBy.js";import{b as useModalContext}from"./index19.js";import"./index21.js";import"./index22.js";import"./useFormItem.js";/* empty css       */import"./DeleteOutlined.js";import"./transButton.js";import"./download.js";import"./index23.js";import"./index24.js";import"./useWindowSizeFn.js";import"./FullscreenOutlined.js";function useItemLabelWidth(schemaItemRef,propsRef){return computed((()=>{const schemaItem=unref(schemaItemRef),{labelCol:labelCol={},wrapperCol:wrapperCol={}}=schemaItem.itemProps||{},{labelWidth:labelWidth,disabledLabelWidth:disabledLabelWidth}=schemaItem,{labelWidth:globalLabelWidth,labelCol:globalLabelCol,wrapperCol:globWrapperCol,layout:layout}=unref(propsRef);if(!globalLabelWidth&&!labelWidth&&!globalLabelCol||disabledLabelWidth)return labelCol.style={textAlign:"left"},{labelCol:labelCol,wrapperCol:wrapperCol};let width=labelWidth||globalLabelWidth;const col=__spreadValues(__spreadValues({},globalLabelCol),labelCol),wrapCol=__spreadValues(__spreadValues({},globWrapperCol),wrapperCol);return width&&(width=isNumber(width)?`${width}px`:width),{labelCol:__spreadValues({style:{width:width}},col),wrapperCol:__spreadValues({style:{width:"vertical"===layout?"100%":`calc(100% - ${width})`}},wrapCol)}}))}function _isSlot(s){return"function"==typeof s||"[object Object]"===Object.prototype.toString.call(s)&&!isVNode(s)}const _sfc_main$1=defineComponent({name:"BasicFormItem",inheritAttrs:!1,props:{schema:{type:Object,default:()=>({})},formProps:{type:Object,default:()=>({})},allDefaultValues:{type:Object,default:()=>({})},formModel:{type:Object,default:()=>({})},setFormModel:{type:Function,default:null},tableAction:{type:Object},formActionType:{type:Object}},setup(props,{slots:slots}){const{t:t}=useI18n(),{schema:schema2,formProps:formProps}=toRefs(props),itemLabelWidthProp=useItemLabelWidth(schema2,formProps),getValues=computed((()=>{const{allDefaultValues:allDefaultValues,formModel:formModel2,schema:schema3}=props,{mergeDynamicData:mergeDynamicData}=props.formProps;return{field:schema3.field,model:formModel2,values:__spreadValues(__spreadValues(__spreadValues({},mergeDynamicData),allDefaultValues),formModel2),schema:schema3}})),getComponentsProps=computed((()=>{var _a;const{schema:schema3,tableAction:tableAction,formModel:formModel2,formActionType:formActionType}=props;let{componentProps:componentProps={}}=schema3;return isFunction(componentProps)&&(componentProps=null!=(_a=componentProps({schema:schema3,tableAction:tableAction,formModel:formModel2,formActionType:formActionType}))?_a:{}),"Divider"===schema3.component&&(componentProps=Object.assign({type:"horizontal"},componentProps,{orientation:"left",plain:!0})),componentProps})),getDisable=computed((()=>{const{disabled:globDisabled}=props.formProps,{dynamicDisabled:dynamicDisabled}=props.schema,{disabled:itemDisabled=!1}=unref(getComponentsProps);let disabled=!!globDisabled||itemDisabled;return isBoolean(dynamicDisabled)&&(disabled=dynamicDisabled),isFunction(dynamicDisabled)&&(disabled=dynamicDisabled(unref(getValues))),disabled}));function getShow(){const{show:show,ifShow:ifShow}=props.schema,{showAdvancedButton:showAdvancedButton}=props.formProps,itemIsAdvanced=!showAdvancedButton||(!isBoolean(props.schema.isAdvanced)||props.schema.isAdvanced);let isShow=!0,isIfShow=!0;return isBoolean(show)&&(isShow=show),isBoolean(ifShow)&&(isIfShow=ifShow),isFunction(show)&&(isShow=show(unref(getValues))),isFunction(ifShow)&&(isIfShow=ifShow(unref(getValues))),isShow=isShow&&itemIsAdvanced,{isShow:isShow,isIfShow:isIfShow}}function handleRules(){var _a;const{rules:defRules=[],component:component,rulesMessageJoinLabel:rulesMessageJoinLabel,label:label,dynamicRules:dynamicRules,required:required}=props.schema;if(isFunction(dynamicRules))return dynamicRules(unref(getValues));let rules=cloneDeep(defRules);const{rulesMessageJoinLabel:globalRulesMessageJoinLabel}=props.formProps,joinLabel=Reflect.has(props.schema,"rulesMessageJoinLabel")?rulesMessageJoinLabel:globalRulesMessageJoinLabel,defaultMsg=createPlaceholderMessage(component)+`${joinLabel?label:""}`;function validator(rule,value2){const msg=rule.message||defaultMsg;return void 0===value2||isNull(value2)||Array.isArray(value2)&&0===value2.length||"string"==typeof value2&&""===value2.trim()||"object"==typeof value2&&Reflect.has(value2,"checked")&&Reflect.has(value2,"halfChecked")&&Array.isArray(value2.checked)&&Array.isArray(value2.halfChecked)&&0===value2.checked.length&&0===value2.halfChecked.length?Promise.reject(msg):Promise.resolve()}const getRequired=isFunction(required)?required(unref(getValues)):required;if(getRequired)if(rules&&0!==rules.length){-1===rules.findIndex((rule=>Reflect.has(rule,"required")))&&rules.push({required:getRequired,validator:validator})}else rules=[{required:getRequired,validator:validator}];const requiredRuleIndex=rules.findIndex((rule=>Reflect.has(rule,"required")&&!Reflect.has(rule,"validator")));if(-1!==requiredRuleIndex){const rule=rules[requiredRuleIndex],{isShow:isShow}=getShow();if(isShow||(rule.required=!1),component){Reflect.has(rule,"type")||(rule.type="InputNumber"===component?"number":"string"),rule.message=rule.message||defaultMsg,(component.includes("Input")||component.includes("Textarea"))&&(rule.whitespace=!0);const valueFormat=null==(_a=unref(getComponentsProps))?void 0:_a.valueFormat;setComponentRuleType(rule,component,valueFormat)}}const characterInx=rules.findIndex((val=>val.max));return-1===characterInx||rules[characterInx].validator||(rules[characterInx].message=rules[characterInx].message||t("component.form.maxTip",[rules[characterInx].max])),rules}function renderLabelHelpMessage(){const{label:label,helpMessage:helpMessage,helpComponentProps:helpComponentProps,subLabel:subLabel}=props.schema,renderLabel=subLabel?createVNode("span",null,[label,createTextVNode(" "),createVNode("span",{class:"text-secondary"},[subLabel])]):label,getHelpMessage=isFunction(helpMessage)?helpMessage(unref(getValues)):helpMessage;return!getHelpMessage||Array.isArray(getHelpMessage)&&0===getHelpMessage.length?renderLabel:createVNode("span",null,[renderLabel,createVNode(BasicHelp,mergeProps({placement:"top",class:"mx-1",text:getHelpMessage},helpComponentProps),null)])}function renderItem(){const{itemProps:itemProps,slot:slot,render:render,field:field,suffix:suffix,component:component,bottomHelpMessage:bottomHelpMessage}=props.schema,{labelCol:labelCol,wrapperCol:wrapperCol}=unref(itemLabelWidthProp),{colon:colon}=props.formProps;if("Divider"===component){let _slot;return createVNode(Col,{span:24},{default:()=>[createVNode(Divider,unref(getComponentsProps),_isSlot(_slot=renderLabelHelpMessage())?_slot:{default:()=>[_slot]})]})}{const getContent=()=>slot?getSlot(slots,slot,unref(getValues)):render?render(unref(getValues)):function(){var _a;const{renderComponentContent:renderComponentContent,component:component,field:field,changeEvent:changeEvent="change",valueField:valueField}=props.schema,isCheck=component&&["Switch","Checkbox"].includes(component),eventKey=`on${upperFirst(changeEvent)}`,on={[eventKey]:(...args)=>{const[e]=args;propsData[eventKey]&&propsData[eventKey](...args);const target=e?e.target:null,value2=target?isCheck?target.checked:target.value:e;props.setFormModel(field,value2)}},Comp=componentMap.get(component);if(!Comp)return createVNode("div",null,[createTextVNode("未知的组件")]);const{autoSetPlaceHolder:autoSetPlaceHolder,size:size}=props.formProps,propsData=__spreadProps(__spreadValues({allowClear:!0,getPopupContainer:trigger=>trigger.parentNode,size:size},unref(getComponentsProps)),{disabled:unref(getDisable)});!propsData.disabled&&autoSetPlaceHolder&&"RangePicker"!==component&&component&&(propsData.placeholder=(null==(_a=unref(getComponentsProps))?void 0:_a.placeholder)||createPlaceholderMessage(component)),propsData.codeField=field,propsData.formValues=unref(getValues);const bindValue={[valueField||(isCheck?"checked":"value")]:props.formModel[field]},compAttr=__spreadValues(__spreadValues(__spreadValues({},propsData),on),bindValue);if(!renderComponentContent)return createVNode(Comp,compAttr,null);const compSlot=isFunction(renderComponentContent)?__spreadValues({},renderComponentContent(unref(getValues))):{default:()=>renderComponentContent};return createVNode(Comp,compAttr,_isSlot(compSlot)?compSlot:{default:()=>[compSlot]})}(),showSuffix=!!suffix,getSuffix=isFunction(suffix)?suffix(unref(getValues)):suffix;return createVNode(Form.Item,mergeProps({name:field,colon:colon,class:{"suffix-item":showSuffix}},itemProps,{label:renderLabelHelpMessage(),rules:handleRules(),labelCol:labelCol,wrapperCol:wrapperCol}),{default:()=>[createVNode("div",{style:"display:flex"},[createVNode("div",{style:"flex:1;"},[getContent(),bottomHelpMessage&&createVNode("div",{class:"bottom-message"},[bottomHelpMessage])]),showSuffix&&createVNode("span",{class:"suffix"},[getSuffix])])]})}}return()=>{let _slot2;const{colProps:colProps={},colSlot:colSlot,renderColContent:renderColContent}=props.schema,{baseColProps:baseColProps={}}=props.formProps,realColProps=__spreadValues(__spreadValues({},baseColProps),colProps),{isIfShow:isIfShow,isShow:isShow}=getShow(),values2=unref(getValues);return isIfShow&&withDirectives(createVNode(Col,realColProps,_isSlot(_slot2=colSlot?getSlot(slots,colSlot,values2):renderColContent?renderColContent(values2):renderItem())?_slot2:{default:()=>[_slot2]}),[[vShow,isShow]])}}});function _sfc_render$1(_ctx,_cache,$props,$setup,$data,$options){const _component_Button=resolveComponent("Button"),_component_BasicArrow=resolveComponent("BasicArrow"),_component_FormItem=resolveComponent("FormItem"),_component_a_col=resolveComponent("a-col");return _ctx.showActionButtonGroup?(openBlock(),createBlock(_component_a_col,normalizeProps(mergeProps({key:0},_ctx.actionColOpt)),{default:withCtx((()=>[createBaseVNode("div",{style:normalizeStyle([{width:"100%"},{textAlign:_ctx.actionColOpt.style.textAlign}])},[createVNode(_component_FormItem,null,{default:withCtx((()=>[renderSlot(_ctx.$slots,"resetBefore"),_ctx.showResetButton?(openBlock(),createBlock(_component_Button,mergeProps({key:0,type:"default",class:"mr-2"},_ctx.getResetBtnOptions,{onClick:_ctx.resetAction}),{default:withCtx((()=>[createTextVNode(toDisplayString(_ctx.getResetBtnOptions.text),1)])),_:1},16,["onClick"])):createCommentVNode("",!0),renderSlot(_ctx.$slots,"submitBefore"),_ctx.showSubmitButton?(openBlock(),createBlock(_component_Button,mergeProps({key:1,type:"primary",class:"mr-2"},_ctx.getSubmitBtnOptions,{onClick:_ctx.submitAction}),{default:withCtx((()=>[createTextVNode(toDisplayString(_ctx.getSubmitBtnOptions.text),1)])),_:1},16,["onClick"])):createCommentVNode("",!0),renderSlot(_ctx.$slots,"advanceBefore"),_ctx.showAdvancedButton&&!_ctx.hideAdvanceBtn?(openBlock(),createBlock(_component_Button,{key:2,type:"link",size:"small",onClick:_ctx.toggleAdvanced},{default:withCtx((()=>[createTextVNode(toDisplayString(_ctx.isAdvanced?_ctx.t("component.form.putAway"):_ctx.t("component.form.unfold"))+" ",1),createVNode(_component_BasicArrow,{class:"ml-1",expand:!_ctx.isAdvanced,up:""},null,8,["expand"])])),_:1},8,["onClick"])):createCommentVNode("",!0),renderSlot(_ctx.$slots,"advanceAfter")])),_:3})],4)])),_:3},16)):createCommentVNode("",!0)}const FormAction=_export_sfc(_sfc_main$2,[["render",_sfc_render$1]]);function tryDeconstructArray(key2,value2,target){const pattern=/^\[(.+)\]$/;if(pattern.test(key2)){const match=key2.match(pattern);if(match&&match[1]){const keys=match[1].split(",");return value2=Array.isArray(value2)?value2:[value2],keys.forEach(((k,index)=>{set(target,k.trim(),value2[index])})),!0}}}function tryDeconstructObject(key2,value2,target){const pattern=/^\{(.+)\}$/;if(pattern.test(key2)){const match=key2.match(pattern);if(match&&match[1]){const keys=match[1].split(",");return value2=isObject(value2)?value2:{},keys.forEach((k=>{set(target,k.trim(),value2[k.trim()])})),!0}}}function useFormValues({defaultValueRef:defaultValueRef2,getSchema:getSchema2,formModel:formModel2,getProps:getProps2}){return{handleFormValues:function(values2){var _a,_b;if(!isObject(values2))return{};const res={};for(const item of Object.entries(values2)){let[,value2]=item;const[key2]=item;if(!key2||isArray(value2)&&0===value2.length||isFunction(value2))continue;const transformDateFunc=unref(getProps2).transformDateFunc;isObject(value2)&&(value2=null==transformDateFunc?void 0:transformDateFunc(value2)),isArray(value2)&&(null==(_a=value2[0])?void 0:_a.format)&&(null==(_b=value2[1])?void 0:_b.format)&&(value2=value2.map((item2=>null==transformDateFunc?void 0:transformDateFunc(item2)))),isString(value2)&&(value2=value2.trim()),tryDeconstructArray(key2,value2,res)||tryDeconstructObject(key2,value2,res)||set(res,key2,value2)}return function(values2){const fieldMapToTime=unref(getProps2).fieldMapToTime;if(!fieldMapToTime||!Array.isArray(fieldMapToTime))return values2;for(const[field,[startTimeKey,endTimeKey],format="YYYY-MM-DD"]of fieldMapToTime){if(!(field&&startTimeKey&&endTimeKey&&values2[field]))continue;const[startTime,endTime]=values2[field];values2[startTimeKey]=dateUtil(startTime).format(format),values2[endTimeKey]=dateUtil(endTime).format(format),Reflect.deleteProperty(values2,field)}return values2}(res)},initDefault:function(){const schemas=unref(getSchema2),obj={};schemas.forEach((item=>{const{defaultValue:defaultValue}=item;isNullOrUnDef(defaultValue)||(obj[item.field]=defaultValue,void 0===formModel2[item.field]&&(formModel2[item.field]=defaultValue))})),defaultValueRef2.value=cloneDeep(obj)}}}const BASIC_COL_LEN=24;function useAdvanced({advanceState:advanceState,emit:emit2,getProps:getProps2,getSchema:getSchema2,formModel:formModel2,defaultValueRef:defaultValueRef2}){const vm=getCurrentInstance(),{realWidthRef:realWidthRef,screenEnum:screenEnum,screenRef:screenRef}=useBreakpoint(),getEmptySpan=computed((()=>{if(!advanceState.isAdvanced)return 0;const emptySpan=unref(getProps2).emptySpan||0;if(isNumber(emptySpan))return emptySpan;if(isObject(emptySpan)){const{span:span=0}=emptySpan;return emptySpan[unref(screenRef).toLowerCase()]||span||0}return 0})),debounceUpdateAdvanced=useDebounceFn((function(){var _a;let itemColSum=0,realItemColSum=0;const{baseColProps:baseColProps={}}=unref(getProps2);for(const schema2 of unref(getSchema2)){const{show:show,colProps:colProps}=schema2;let isShow=!0;if(isBoolean(show)&&(isShow=show),isFunction(show)&&(isShow=show({schema:schema2,model:formModel2,field:schema2.field,values:__spreadValues(__spreadValues({},unref(defaultValueRef2)),formModel2)})),isShow&&(colProps||baseColProps)){const{itemColSum:sum,isAdvanced:isAdvanced}=getAdvanced(__spreadValues(__spreadValues({},baseColProps),colProps),itemColSum);itemColSum=sum||0,isAdvanced&&(realItemColSum=itemColSum),schema2.isAdvanced=isAdvanced}}null==(_a=null==vm?void 0:vm.proxy)||_a.$forceUpdate(),advanceState.actionSpan=realItemColSum%BASIC_COL_LEN+unref(getEmptySpan),getAdvanced(unref(getProps2).actionColOptions||{span:BASIC_COL_LEN},itemColSum,!0),emit2("advanced-change")}),30);function getAdvanced(itemCol,itemColSum=0,isLastAction=!1){const width=unref(realWidthRef),mdWidth=parseInt(itemCol.md)||parseInt(itemCol.xs)||parseInt(itemCol.sm)||itemCol.span||BASIC_COL_LEN,lgWidth=parseInt(itemCol.lg)||mdWidth,xlWidth=parseInt(itemCol.xl)||lgWidth,xxlWidth=parseInt(itemCol.xxl)||xlWidth;return width<=screenEnum.LG?itemColSum+=mdWidth:width<screenEnum.XL?itemColSum+=lgWidth:width<screenEnum.XXL?itemColSum+=xlWidth:itemColSum+=xxlWidth,isLastAction?(advanceState.hideAdvanceBtn=!1,itemColSum<=2*BASIC_COL_LEN?(advanceState.hideAdvanceBtn=!0,advanceState.isAdvanced=!0):itemColSum>2*BASIC_COL_LEN&&itemColSum<=BASIC_COL_LEN*(unref(getProps2).autoAdvancedLine||3)?advanceState.hideAdvanceBtn=!1:advanceState.isLoad||(advanceState.isLoad=!0,advanceState.isAdvanced=!advanceState.isAdvanced),{isAdvanced:advanceState.isAdvanced,itemColSum:itemColSum}):itemColSum>BASIC_COL_LEN*(unref(getProps2).alwaysShowLines||1)?{isAdvanced:advanceState.isAdvanced,itemColSum:itemColSum}:{isAdvanced:!0,itemColSum:itemColSum}}return watch([()=>unref(getSchema2),()=>advanceState.isAdvanced,()=>unref(realWidthRef)],(()=>{const{showAdvancedButton:showAdvancedButton}=unref(getProps2);showAdvancedButton&&debounceUpdateAdvanced()}),{immediate:!0}),{handleToggleAdvanced:function(){advanceState.isAdvanced=!advanceState.isAdvanced}}}function useFormEvents({emit:emit,getProps:getProps,formModel:formModel,getSchema:getSchema,defaultValueRef:defaultValueRef,formElRef:formElRef,schemaRef:schemaRef,handleFormValues:handleFormValues}){function resetFields(){return __async(this,null,(function*(){const{resetFunc:resetFunc,submitOnReset:submitOnReset}=unref(getProps);resetFunc&&isFunction(resetFunc)&&(yield resetFunc());unref(formElRef)&&(Object.keys(formModel).forEach((key2=>{const schema2=unref(getSchema).find((item=>item.field===key2)),isInput=(null==schema2?void 0:schema2.component)&&defaultValueComponents.includes(schema2.component),defaultValue=cloneDeep(defaultValueRef.value[key2]);formModel[key2]=isInput?defaultValue||"":defaultValue})),nextTick((()=>clearValidate())),emit("reset",toRaw(formModel)),submitOnReset&&handleSubmit())}))}function setFieldsValue(values){return __async(this,null,(function*(){const fields=unref(getSchema).map((item=>item.field)).filter(Boolean),delimiter=".",nestKeyArray=fields.filter((item=>item.indexOf(delimiter)>=0)),validKeys=[];Object.keys(values).forEach((key=>{const schema=unref(getSchema).find((item=>item.field===key));let value=values[key];const hasKey=Reflect.has(values,key);if(value=handleInputNumberValue(null==schema?void 0:schema.component,value),hasKey&&fields.includes(key)){if(itemIsDateType(key))if(Array.isArray(value)){const arr=[];for(const ele of value)arr.push(ele?dateUtil(ele):null);formModel[key]=arr}else{const{componentProps:componentProps}=schema||{};let _props=componentProps;"function"==typeof componentProps&&(_props=_props({formModel:formModel})),formModel[key]=value?(null==_props?void 0:_props.valueFormat)?value:dateUtil(value):null}else formModel[key]=value;validKeys.push(key)}else nestKeyArray.forEach((nestKey=>{try{const value=eval("values"+delimiter+nestKey);isDef(value)&&(formModel[nestKey]=value,validKeys.push(nestKey))}catch(e){isDef(defaultValueRef.value[nestKey])&&(formModel[nestKey]=cloneDeep(defaultValueRef.value[nestKey]))}}))})),validateFields(validKeys).catch((_=>{}))}))}function removeSchemaByFiled(fields2){return __async(this,null,(function*(){const schemaList=cloneDeep(unref(getSchema));if(!fields2)return;let fieldList=isString(fields2)?[fields2]:fields2;isString(fields2)&&(fieldList=[fields2]);for(const field of fieldList)_removeSchemaByFiled(field,schemaList);schemaRef.value=schemaList}))}function _removeSchemaByFiled(field,schemaList){if(isString(field)){const index=schemaList.findIndex((schema2=>schema2.field===field));-1!==index&&(delete formModel[field],schemaList.splice(index,1))}}function appendSchemaByField(schema2,prefixField,first=!1){return __async(this,null,(function*(){const schemaList=cloneDeep(unref(getSchema)),index=schemaList.findIndex((schema3=>schema3.field===prefixField));if(!prefixField||-1===index||first)return first?schemaList.unshift(schema2):schemaList.push(schema2),schemaRef.value=schemaList,void _setDefaultValue(schema2);-1!==index&&schemaList.splice(index+1,0,schema2),_setDefaultValue(schema2),schemaRef.value=schemaList}))}function resetSchema(data){return __async(this,null,(function*(){let updateData=[];isObject(data)&&updateData.push(data),isArray(data)&&(updateData=[...data]);updateData.every((item=>"Divider"===item.component||Reflect.has(item,"field")&&item.field))?schemaRef.value=updateData:error("All children of the form Schema array that need to be updated must contain the `field` field")}))}function updateSchema(data){return __async(this,null,(function*(){let updateData=[];isObject(data)&&updateData.push(data),isArray(data)&&(updateData=[...data]);if(!updateData.every((item=>"Divider"===item.component||Reflect.has(item,"field")&&item.field)))return void error("All children of the form Schema array that need to be updated must contain the `field` field");const schema2=[];updateData.forEach((item=>{unref(getSchema).forEach((val=>{if(val.field===item.field){const newSchema=deepMerge(val,item);schema2.push(newSchema)}else schema2.push(val)}))})),_setDefaultValue(schema2),schemaRef.value=uniqBy(schema2,"field")}))}function _setDefaultValue(data){let schemas=[];isObject(data)&&schemas.push(data),isArray(data)&&(schemas=[...data]);const obj={},currentFieldsValue=getFieldsValue();schemas.forEach((item=>{"Divider"!=item.component&&Reflect.has(item,"field")&&item.field&&!isNullOrUnDef(item.defaultValue)&&!(item.field in currentFieldsValue)&&(obj[item.field]=item.defaultValue)})),setFieldsValue(obj)}function getFieldsValue(){return unref(formElRef)?handleFormValues(toRaw(unref(formModel))):{}}function itemIsDateType(key2){return unref(getSchema).some((item=>item.field===key2&&dateItemType.includes(item.component)))}function validateFields(nameList){return __async(this,null,(function*(){var _a;return null==(_a=unref(formElRef))?void 0:_a.validateFields(nameList)}))}function validate(nameList){return __async(this,null,(function*(){var _a;return handleValidateValues(yield null==(_a=unref(formElRef))?void 0:_a.validate(nameList))}))}function handleValidateValues(values2){for(const segment of unref(getSchema)){let value2=values2[segment.field];if(isEmpty(value2))continue;const componentProps=segment.componentProps;if(componentProps){if("string"==typeof value2){const{trimValue:trimValue=!0}=componentProps;trimValue&&(value2=value2.trim())}values2[segment.field]=value2}}return values2}function clearValidate(name){return __async(this,null,(function*(){var _a;yield null==(_a=unref(formElRef))?void 0:_a.clearValidate(name)}))}function scrollToField(name,options){return __async(this,null,(function*(){var _a;yield null==(_a=unref(formElRef))?void 0:_a.scrollToField(name,options)}))}function handleSubmit(e){return __async(this,null,(function*(){e&&e.preventDefault();const{submitFunc:submitFunc}=unref(getProps);if(submitFunc&&isFunction(submitFunc))return void(yield submitFunc());if(unref(formElRef))try{const values2=yield validate(),res=handleFormValues(values2);emit("submit",res)}catch(error2){throw new Error(error2)}}))}return{handleSubmit:handleSubmit,clearValidate:clearValidate,validate:validate,validateFields:validateFields,getFieldsValue:getFieldsValue,updateSchema:updateSchema,resetSchema:resetSchema,appendSchemaByField:appendSchemaByField,removeSchemaByFiled:removeSchemaByFiled,resetFields:resetFields,setFieldsValue:setFieldsValue,scrollToField:scrollToField}}function useAutoFocus(_0){return __async(this,arguments,(function*({getSchema:getSchema2,getProps:getProps2,formElRef:formElRef2,isInitedDefault:isInitedDefault}){watchEffect((()=>__async(this,null,(function*(){if(unref(isInitedDefault)||!unref(getProps2).autoFocusFirstItem)return;yield nextTick();const schemas=unref(getSchema2),formEl=unref(formElRef2),el=null==formEl?void 0:formEl.$el;if(!formEl||!el||!schemas||0===schemas.length)return;if(!schemas[0].component.includes("Input"))return;const inputEl=el.querySelector(".ant-row:first-child input");inputEl&&(null==inputEl||inputEl.focus())}))))}))}const _sfc_main=defineComponent({name:"BasicForm",components:{FormItem:_sfc_main$1,Form:Form,Row:Row,FormAction:FormAction},props:basicProps,emits:["advanced-change","reset","submit","register","field-value-change"],setup(props,{emit:emit2,attrs:attrs}){const formModel2=reactive({}),modalFn=useModalContext(),advanceState=reactive({isAdvanced:!0,hideAdvanceBtn:!1,isLoad:!1,actionSpan:6}),defaultValueRef2=ref({}),isInitedDefaultRef=ref(!1),propsRef=ref({}),schemaRef2=ref(null),formElRef2=ref(null),{prefixCls:prefixCls}=useDesign("basic-form"),getProps2=computed((()=>__spreadValues(__spreadValues({},props),unref(propsRef)))),getFormClass=computed((()=>[prefixCls,{[`${prefixCls}--compact`]:unref(getProps2).compact}])),getRow=computed((()=>{const{baseRowStyle:baseRowStyle={},rowProps:rowProps}=unref(getProps2);return __spreadValues({style:baseRowStyle},rowProps)})),getBindValue=computed((()=>__spreadValues(__spreadValues(__spreadValues({},attrs),props),unref(getProps2)))),getSchema2=computed((()=>{const schemas=unref(schemaRef2)||unref(getProps2).schemas;for(const schema2 of schemas){const{defaultValue:defaultValue,component:component}=schema2;if(defaultValue&&dateItemType.includes(component))if(Array.isArray(defaultValue)){const def=[];defaultValue.forEach((item=>{def.push(dateUtil(item))})),schema2.defaultValue=def}else schema2.defaultValue=dateUtil(defaultValue)}return unref(getProps2).showAdvancedButton?cloneDeep(schemas.filter((schema2=>"Divider"!==schema2.component))):cloneDeep(schemas)})),{handleToggleAdvanced:handleToggleAdvanced}=useAdvanced({advanceState:advanceState,emit:emit2,getProps:getProps2,getSchema:getSchema2,formModel:formModel2,defaultValueRef:defaultValueRef2}),{handleFormValues:handleFormValues2,initDefault:initDefault}=useFormValues({getProps:getProps2,defaultValueRef:defaultValueRef2,getSchema:getSchema2,formModel:formModel2});useAutoFocus({getSchema:getSchema2,getProps:getProps2,isInitedDefault:isInitedDefaultRef,formElRef:formElRef2});const{handleSubmit:handleSubmit2,setFieldsValue:setFieldsValue2,clearValidate:clearValidate2,validate:validate2,validateFields:validateFields2,getFieldsValue:getFieldsValue2,updateSchema:updateSchema2,resetSchema:resetSchema2,appendSchemaByField:appendSchemaByField2,removeSchemaByFiled:removeSchemaByFiled2,resetFields:resetFields2,scrollToField:scrollToField2}=useFormEvents({emit:emit2,getProps:getProps2,formModel:formModel2,getSchema:getSchema2,defaultValueRef:defaultValueRef2,formElRef:formElRef2,schemaRef:schemaRef2,handleFormValues:handleFormValues2});createFormContext({resetAction:resetFields2,submitAction:handleSubmit2}),watch((()=>unref(getProps2).model),(()=>{const{model:model}=unref(getProps2);model&&setFieldsValue2(model)}),{immediate:!0}),watch((()=>unref(getProps2).schemas),(schemas=>{resetSchema2(null!=schemas?schemas:[])})),watch((()=>getSchema2.value),(schema2=>{nextTick((()=>{var _a;null==(_a=null==modalFn?void 0:modalFn.redoModalHeight)||_a.call(modalFn)})),unref(isInitedDefaultRef)||(null==schema2?void 0:schema2.length)&&(initDefault(),isInitedDefaultRef.value=!0)})),watch((()=>formModel2),useDebounceFn((()=>{unref(getProps2).submitOnChange&&handleSubmit2()}),300),{deep:!0});const formActionType={getFieldsValue:getFieldsValue2,setFieldsValue:setFieldsValue2,resetFields:resetFields2,updateSchema:updateSchema2,resetSchema:resetSchema2,setProps:function(formProps){return __async(this,null,(function*(){propsRef.value=deepMerge(unref(propsRef)||{},formProps)}))},removeSchemaByFiled:removeSchemaByFiled2,appendSchemaByField:appendSchemaByField2,clearValidate:clearValidate2,validateFields:validateFields2,validate:validate2,submit:handleSubmit2,scrollToField:scrollToField2};return onMounted((()=>{initDefault(),emit2("register",formActionType,formModel2)})),__spreadValues({getBindValue:getBindValue,handleToggleAdvanced:handleToggleAdvanced,handleEnterPress:function(e){const{autoSubmitOnEnter:autoSubmitOnEnter}=unref(getProps2);if(autoSubmitOnEnter&&"Enter"===e.key&&e.target&&e.target instanceof HTMLElement){const target=e.target;target&&target.tagName&&"INPUT"==target.tagName.toUpperCase()&&handleSubmit2()}},formModel:formModel2,defaultValueRef:defaultValueRef2,advanceState:advanceState,getRow:getRow,getProps:getProps2,formElRef:formElRef2,getSchema:getSchema2,formActionType:formActionType,setFormModel:function(key2,value2){formModel2[key2]=value2;const{validateTrigger:validateTrigger}=unref(getBindValue);validateTrigger&&"change"!==validateTrigger||validateFields2([key2]).catch((_=>{})),emit2("field-value-change",key2,value2)},getFormClass:getFormClass,getFormActionBindProps:computed((()=>__spreadValues(__spreadValues({},getProps2.value),advanceState)))},formActionType)}});function _sfc_render(_ctx,_cache,$props,$setup,$data,$options){const _component_FormItem=resolveComponent("FormItem"),_component_FormAction=resolveComponent("FormAction"),_component_Row=resolveComponent("Row"),_component_Form=resolveComponent("Form");return openBlock(),createBlock(_component_Form,mergeProps(_ctx.getBindValue,{class:_ctx.getFormClass,ref:"formElRef",model:_ctx.formModel,onKeypress:withKeys(_ctx.handleEnterPress,["enter"])}),{default:withCtx((()=>[createVNode(_component_Row,normalizeProps(guardReactiveProps(_ctx.getRow)),{default:withCtx((()=>[renderSlot(_ctx.$slots,"formHeader"),(openBlock(!0),createElementBlock(Fragment,null,renderList(_ctx.getSchema,(schema2=>(openBlock(),createBlock(_component_FormItem,{key:schema2.field,tableAction:_ctx.tableAction,formActionType:_ctx.formActionType,schema:schema2,formProps:_ctx.getProps,allDefaultValues:_ctx.defaultValueRef,formModel:_ctx.formModel,setFormModel:_ctx.setFormModel},createSlots({_:2},[renderList(Object.keys(_ctx.$slots),(item=>({name:item,fn:withCtx((data=>[renderSlot(_ctx.$slots,item,normalizeProps(guardReactiveProps(data||{})))]))})))]),1032,["tableAction","formActionType","schema","formProps","allDefaultValues","formModel","setFormModel"])))),128)),createVNode(_component_FormAction,mergeProps(_ctx.getFormActionBindProps,{onToggleAdvanced:_ctx.handleToggleAdvanced}),createSlots({_:2},[renderList(["resetBefore","submitBefore","advanceBefore","advanceAfter"],(item=>({name:item,fn:withCtx((data=>[renderSlot(_ctx.$slots,item,normalizeProps(guardReactiveProps(data||{})))]))})))]),1040,["onToggleAdvanced"]),renderSlot(_ctx.$slots,"formFooter")])),_:3},16)])),_:3},16,["class","model","onKeypress"])}const BasicForm=_export_sfc(_sfc_main,[["render",_sfc_render]]);export{BasicForm as default};
