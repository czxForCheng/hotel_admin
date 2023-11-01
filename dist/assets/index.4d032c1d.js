import{B as H,C as J,w as Q,D as W,I as X,L as Y,p as Z,q as ee,r as oe,M as te,N as ne}from"./element-plus.0777841c.js";import{u as ae,_ as le}from"./usePaging.37c23e5c.js";import{j as se,f as h,b as ie}from"./index.0be731c2.js";import{d as L,$ as U,r as de,b0 as ue,a4 as me,af as re,o as s,c as y,U as e,L as o,M as u,u as m,K as b,R as ce,a9 as N,a as F,k as pe,S as d}from"./@vue.e8706010.js";import{b as _e,c as fe,e as be,f as ge,h as Ce,s as we}from"./code.888adabc.js";import{_ as he}from"./data-table.vue_vue_type_script_setup_true_lang.c56d4b34.js";import{_ as ye}from"./code-preview.vue_vue_type_script_setup_true_lang.bcace3e9.js";import"./@vueuse.fc17487b.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.771f24d4.js";import"./axios.c369f2ff.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.d13b4135.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.66a64c42.js";import"./color.bf494a29.js";import"./clone.7f7b5050.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.cffdefa4.js";import"./ms.a9ae1d6d.js";import"./nprogress.6c190664.js";import"./vue-clipboard3.94e9f0b6.js";import"./clipboard.36db0eb4.js";import"./echarts.234b3572.js";import"./zrender.8ee1a698.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";import"./index.afee7163.js";function Fe(D,p="\u6587\u4EF6\u540D\u79F0.zip"){const _=new Blob([D],{type:"application/octet-stream;charset=UTF-8"}),f=window.URL.createObjectURL(_),l=document.createElement("a");l.style.display="none",l.href=f,l.setAttribute("download",p),document.body.appendChild(l),l.click(),document.body.removeChild(l),window.URL.revokeObjectURL(f)}const ve={class:"code-generation"},ke=d("\u67E5\u8BE2"),Ee=d("\u91CD\u7F6E"),De={class:"flex"},Te=d(" \u5BFC\u5165\u6570\u636E\u8868 "),Ve=d(" \u5220\u9664 "),Be=d(" \u751F\u6210\u4EE3\u7801 "),xe={class:"mt-4"},Se={class:"flex items-center"},Ue=d(" \u9884\u89C8 "),Ne=d(" \u7F16\u8F91 "),Le=d(" \u66F4\u591A "),$e=d(" \u751F\u6210\u4EE3\u7801 "),Ae=d(" \u540C\u6B65 "),Pe=d(" \u5220\u9664 "),Re={class:"flex justify-end mt-4"},Ke=L({name:"codeGenerate"}),Eo=L({...Ke,setup(D){const p=U({tableName:"",tableComment:""}),_=U({show:!1,loading:!1,code:{}}),{pager:f,getLists:l,resetParams:$,resetPage:v}=ae({fetchFun:_e,params:p}),C=de([]),A=n=>{C.value=n},P=async n=>{await h.confirm("\u786E\u5B9A\u8981\u540C\u6B65\u8868\u7ED3\u6784\uFF1F"),await we({id:n}),h.msgSuccess("\u64CD\u4F5C\u6210\u529F")},T=async n=>{n||(n=C.value.map(({id:t})=>t)),await h.confirm("\u786E\u5B9A\u8981\u5220\u9664\uFF1F"),await fe({ids:n}),h.msgSuccess("\u5220\u9664\u6210\u529F"),l()},R=async n=>{const t=await be({id:n});_.code=t,_.show=!0},V=async n=>{const t=B(n,0),r=B(n,1);if(t){const w=await ge({tables:t});Fe(w,"likeadmin-curd.zip")}r&&(await Ce({tables:r}),h.msgSuccess("\u751F\u6210\u6210\u529F"))},B=(n,t)=>n.filter(({genType:r})=>r==t).map(({tableName:r})=>r).join(),K=(n,t)=>{switch(n){case"generate":V([t]);break;case"sync":P(t.id);break;case"delete":T([t.id])}};return ue(()=>{l()}),l(),(n,t)=>{const r=H,w=J,i=Q,j=W,x=X,k=ie,g=Y,z=me("router-link"),E=Z,I=ee,M=oe,q=te,G=le,c=re("perms"),O=ne;return s(),y("div",ve,[e(x,{class:"!border-none",shadow:"never"},{default:o(()=>[e(j,{class:"mb-[-16px]",model:p,inline:""},{default:o(()=>[e(w,{label:"\u8868\u540D\u79F0"},{default:o(()=>[e(r,{class:"w-[280px]",modelValue:p.tableName,"onUpdate:modelValue":t[0]||(t[0]=a=>p.tableName=a),clearable:"",onKeyup:N(m(v),["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(w,{label:"\u8868\u63CF\u8FF0"},{default:o(()=>[e(r,{class:"w-[280px]",modelValue:p.tableComment,"onUpdate:modelValue":t[1]||(t[1]=a=>p.tableComment=a),clearable:"",onKeyup:N(m(v),["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(w,null,{default:o(()=>[e(i,{type:"primary",onClick:m(v)},{default:o(()=>[ke]),_:1},8,["onClick"]),e(i,{onClick:m($)},{default:o(()=>[Ee]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),_:1}),u((s(),b(x,{class:"!border-none mt-4",shadow:"never"},{default:o(()=>[F("div",De,[u((s(),b(he,{class:"inline-block mr-[10px]",onSuccess:m(l)},{default:o(()=>[e(i,{type:"primary"},{icon:o(()=>[e(k,{name:"el-icon-Plus"})]),default:o(()=>[Te]),_:1})]),_:1},8,["onSuccess"])),[[c,["gen:importTable"]]]),u((s(),b(i,{disabled:!C.value.length,onClick:t[2]||(t[2]=a=>T()),type:"danger"},{icon:o(()=>[e(k,{name:"el-icon-Delete"})]),default:o(()=>[Ve]),_:1},8,["disabled"])),[[c,["gen:delTable"]]]),u((s(),b(i,{disabled:!C.value.length,onClick:t[3]||(t[3]=a=>V(C.value))},{default:o(()=>[Be]),_:1},8,["disabled"])),[[c,["gen:genCode","gen:downloadCode"]]])]),F("div",xe,[e(q,{data:m(f).lists,size:"large",onSelectionChange:A},{default:o(()=>[e(g,{type:"selection",width:"55"}),e(g,{label:"\u8868\u540D\u79F0",prop:"tableName","min-width":"180"}),e(g,{label:"\u8868\u63CF\u8FF0",prop:"tableComment","min-width":"180"}),e(g,{label:"\u521B\u5EFA\u65F6\u95F4",prop:"createTime","min-width":"180"}),e(g,{label:"\u66F4\u65B0\u65F6\u95F4",prop:"updateTime","min-width":"180"}),e(g,{label:"\u64CD\u4F5C",width:"160",fixed:"right"},{default:o(({row:a})=>[F("div",Se,[u((s(),b(i,{type:"primary",link:"",onClick:S=>R(a.id)},{default:o(()=>[Ue]),_:2},1032,["onClick"])),[[c,["gen:previewCode"]]]),u((s(),b(i,{type:"primary",link:""},{default:o(()=>[e(z,{to:{path:m(se)("gen:editTable"),query:{id:a.id}}},{default:o(()=>[Ne]),_:2},1032,["to"])]),_:2},1024)),[[c,["gen:editTable"]]]),u((s(),b(M,{class:"ml-2",onCommand:S=>K(S,a)},{dropdown:o(()=>[e(I,null,{default:o(()=>[u((s(),y("div",null,[e(E,{command:"generate"},{default:o(()=>[e(i,{type:"primary",link:""},{default:o(()=>[$e]),_:1})]),_:1})])),[[c,["gen:genCode","gen:downloadCode"]]]),u((s(),y("div",null,[e(E,{command:"sync"},{default:o(()=>[e(i,{type:"primary",link:""},{default:o(()=>[Ae]),_:1})]),_:1})])),[[c,["gen:syncTable"]]]),u((s(),y("div",null,[e(E,{command:"delete"},{default:o(()=>[e(i,{type:"danger",link:""},{default:o(()=>[Pe]),_:1})]),_:1})])),[[c,["gen:delTable"]]])]),_:1})]),default:o(()=>[e(i,{type:"primary",link:""},{default:o(()=>[Le,e(k,{name:"el-icon-ArrowDown",size:14})]),_:1})]),_:2},1032,["onCommand"])),[[c,["gen:genCode","gen:downloadCode","gen:syncTable","gen:delTable"]]])])]),_:1})]),_:1},8,["data"])]),F("div",Re,[e(G,{modelValue:m(f),"onUpdate:modelValue":t[4]||(t[4]=a=>pe(f)?f.value=a:null),onChange:m(l)},null,8,["modelValue","onChange"])])]),_:1})),[[O,m(f).loading]]),_.show?(s(),b(ye,{key:0,modelValue:_.show,"onUpdate:modelValue":t[5]||(t[5]=a=>_.show=a),code:_.code},null,8,["modelValue","code"])):ce("",!0)])}}});export{Eo as default};