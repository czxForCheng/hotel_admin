import{_ as A}from"./index.7fbf7ca8.js";import{K as C,I as h,B as w,C as b,D as g,w as I}from"./element-plus.0777841c.js";import{r as d,f as S}from"./index.0be731c2.js";import{d as _,$ as V,af as x,o as c,c as k,U as e,L as u,M as y,K as N,a as r,S as U}from"./@vue.e8706010.js";import"./@vueuse.fc17487b.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.771f24d4.js";import"./axios.c369f2ff.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.d13b4135.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.66a64c42.js";import"./color.bf494a29.js";import"./clone.7f7b5050.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.cffdefa4.js";import"./ms.a9ae1d6d.js";import"./nprogress.6c190664.js";import"./vue-clipboard3.94e9f0b6.js";import"./clipboard.36db0eb4.js";import"./echarts.234b3572.js";import"./zrender.8ee1a698.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";function K(p){return d.post({url:"/channel/op/save",params:p})}function W(){return d.get({url:"/channel/op/detail"})}const q=r("div",{class:"font-medium mb-7"},"\u7F51\u7AD9\u5E94\u7528",-1),L={class:"w-80"},M={class:"w-80"},R=U("\u4FDD\u5B58"),T=_({name:"wxDevConfig"}),Ce=_({...T,setup(p){const t=V({appId:"",appSecret:""}),n=async()=>{const l=await W();for(const o in t)t[o]=l[o]},F=async()=>{await K(t),n(),S.msgSuccess("\u64CD\u4F5C\u6210\u529F")};return n(),(l,o)=>{const f=C,s=h,i=w,m=b,E=g,D=I,v=A,B=x("perms");return c(),k("div",null,[e(s,{class:"!border-none",shadow:"never"},{default:u(()=>[e(f,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A\u586B\u5199\u5FAE\u4FE1\u5F00\u653E\u5E73\u53F0\u5F00\u53D1\u914D\u7F6E\uFF0C\u8BF7\u524D\u5F80\u5FAE\u4FE1\u5F00\u653E\u5E73\u53F0\u521B\u5EFA\u5E94\u7528\u5E76\u5B8C\u6210\u8BA4\u8BC1\uFF1B\u7F51\u7AD9\u5E94\u7528\u914D\u7F6E\u4E3B\u8981\u7528\u4E8E\u7F51\u7AD9\u5FAE\u4FE1\u767B\u5F55\u548C\u5FAE\u4FE1\u652F\u4ED8",closable:!1,"show-icon":""})]),_:1}),e(E,{ref:"formRef",model:t,"label-width":"160px"},{default:u(()=>[e(s,{class:"!border-none mt-4",shadow:"never"},{default:u(()=>[q,e(m,{label:"AppID",prop:"appId"},{default:u(()=>[r("div",L,[e(i,{modelValue:t.appId,"onUpdate:modelValue":o[0]||(o[0]=a=>t.appId=a),placeholder:"\u8BF7\u8F93\u5165AppID"},null,8,["modelValue"])])]),_:1}),e(m,{label:"AppSecret",prop:"appSecret"},{default:u(()=>[r("div",null,[r("div",M,[e(i,{modelValue:t.appSecret,"onUpdate:modelValue":o[1]||(o[1]=a=>t.appSecret=a),placeholder:"\u8BF7\u8F93\u5165AppSecret"},null,8,["modelValue"])])])]),_:1})]),_:1})]),_:1},8,["model"]),y((c(),N(v,null,{default:u(()=>[e(D,{type:"primary",onClick:F},{default:u(()=>[R]),_:1})]),_:1})),[[B,["channel:op:save"]]])])}}});export{Ce as default};