import{d as u,f as c}from"./element-plus.0777841c.js";import{d,o as t,K as r,L as p,c as _,a7 as f,V as x,a as y,T as V}from"./@vue.e8706010.js";import{d as g}from"./index.0be731c2.js";import"./@vueuse.fc17487b.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.771f24d4.js";import"./axios.c369f2ff.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.d13b4135.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.66a64c42.js";import"./color.bf494a29.js";import"./clone.7f7b5050.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.cffdefa4.js";import"./ms.a9ae1d6d.js";import"./nprogress.6c190664.js";import"./vue-clipboard3.94e9f0b6.js";import"./clipboard.36db0eb4.js";import"./echarts.234b3572.js";import"./zrender.8ee1a698.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";const v=d({__name:"menu",props:{menus:{type:Object,default:()=>({})},modelValue:{type:String,default:"1"}},emits:["update:modelValue"],setup(e,{emit:a}){const i=o=>{a("update:modelValue",o)};return(o,h)=>{const n=u,s=c;return t(),r(s,{"default-active":e.modelValue,class:"w-[160px] min-h-[668px] pages-menu",onSelect:i},{default:p(()=>[(t(!0),_(x,null,f(e.menus,(m,l)=>(t(),r(n,{index:l,key:m.id},{default:p(()=>[y("span",null,V(m.name),1)]),_:2},1032,["index"]))),128))]),_:1},8,["default-active"])}}});const et=g(v,[["__scopeId","data-v-a5360079"]]);export{et as default};