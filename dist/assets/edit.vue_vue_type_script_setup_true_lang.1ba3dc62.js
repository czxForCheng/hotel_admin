import{B,C as S,v as k,t as x,D as y}from"./element-plus.0777841c.js";import{a as R,b as g,c as A}from"./article.44df880c.js";import{P as U}from"./index.afee7163.js";import{f as I}from"./index.0be731c2.js";import{d as N,s as c,r as P,e as q,$ as L,o as T,c as $,U as u,L as l,a as p,u as j}from"./@vue.e8706010.js";const z={class:"edit-popup"},G=p("div",{class:"form-tips"},"\u9ED8\u8BA4\u4E3A0\uFF0C \u6570\u503C\u8D8A\u5927\u8D8A\u6392\u524D",-1),W=N({__name:"edit",emits:["success","close"],setup(H,{expose:f,emit:i}){const m=c(),s=c(),n=P("add"),_=q(()=>n.value=="edit"?"\u7F16\u8F91\u680F\u76EE":"\u65B0\u589E\u680F\u76EE"),o=L({id:"",name:"",sort:0,isShow:1}),F={name:[{required:!0,message:"\u8BF7\u8F93\u5165\u680F\u76EE\u540D\u79F0",trigger:["blur"]}]},E=async()=>{var t,e;await((t=m.value)==null?void 0:t.validate()),n.value=="edit"?await R(o):await g(o),I.msgSuccess("\u64CD\u4F5C\u6210\u529F"),(e=s.value)==null||e.close(),i("success")},v=(t="add")=>{var e;n.value=t,(e=s.value)==null||e.open()},d=t=>{for(const e in o)t[e]!=null&&t[e]!=null&&(o[e]=t[e])},w=async t=>{const e=await A({id:t.id});d(e)},C=()=>{i("close")};return f({open:v,setFormData:d,getDetail:w}),(t,e)=>{const D=B,r=S,b=k,V=x,h=y;return T(),$("div",z,[u(U,{ref_key:"popupRef",ref:s,title:j(_),async:!0,width:"550px",onConfirm:E,onClose:C},{default:l(()=>[u(h,{ref_key:"formRef",ref:m,model:o,"label-width":"84px",rules:F},{default:l(()=>[u(r,{label:"\u680F\u76EE\u540D\u79F0",prop:"name"},{default:l(()=>[u(D,{modelValue:o.name,"onUpdate:modelValue":e[0]||(e[0]=a=>o.name=a),placeholder:"\u8BF7\u8F93\u5165\u680F\u76EE\u540D\u79F0",clearable:""},null,8,["modelValue"])]),_:1}),u(r,{label:"\u6392\u5E8F",prop:"sort"},{default:l(()=>[p("div",null,[u(b,{modelValue:o.sort,"onUpdate:modelValue":e[1]||(e[1]=a=>o.sort=a),min:0,max:9999},null,8,["modelValue"]),G])]),_:1}),u(r,{label:"\u72B6\u6001",prop:"isShow"},{default:l(()=>[u(V,{modelValue:o.isShow,"onUpdate:modelValue":e[2]||(e[2]=a=>o.isShow=a),"active-value":1,"inactive-value":0},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title"])])}}});export{W as _};
