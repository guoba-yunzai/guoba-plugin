var e=(e,l,n)=>new Promise(((t,i)=>{var a=e=>{try{s(n.next(e))}catch(l){i(l)}},u=e=>{try{s(n.throw(e))}catch(l){i(l)}},s=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,u);s((n=n.apply(e,l)).next())}));import{r as l,a_ as n,x as t,cl as i,w as a,cm as u,u as s,q as r}from"./index.js";function o(o){const d=l(null),c=l(!1);function h(){return e(this,null,(function*(){const e=t(d);return e||s("The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"),yield r(),e}))}return[function(e){n((()=>{d.value=null,c.value=null})),t(c)&&i()&&e===t(d)||(d.value=e,c.value=!0,a((()=>o),(()=>{o&&e.setProps(u(o))}),{immediate:!0,deep:!0}))},{scrollToField:(l,n)=>e(this,null,(function*(){(yield h()).scrollToField(l,n)})),setProps:l=>e(this,null,(function*(){(yield h()).setProps(l)})),updateSchema:l=>e(this,null,(function*(){(yield h()).updateSchema(l)})),resetSchema:l=>e(this,null,(function*(){(yield h()).resetSchema(l)})),clearValidate:l=>e(this,null,(function*(){(yield h()).clearValidate(l)})),resetFields:()=>e(this,null,(function*(){h().then((l=>e(this,null,(function*(){yield l.resetFields()}))))})),removeSchemaByFiled:l=>e(this,null,(function*(){var e;null==(e=t(d))||e.removeSchemaByFiled(l)})),getFieldsValue:()=>{var e;return null==(e=t(d))?void 0:e.getFieldsValue()},setFieldsValue:l=>e(this,null,(function*(){(yield h()).setFieldsValue(l)})),appendSchemaByField:(l,n,t)=>e(this,null,(function*(){(yield h()).appendSchemaByField(l,n,t)})),submit:()=>e(this,null,(function*(){return(yield h()).submit()})),validate:l=>e(this,null,(function*(){return(yield h()).validate(l)})),validateFields:l=>e(this,null,(function*(){return(yield h()).validateFields(l)}))}]}export{o as u};
