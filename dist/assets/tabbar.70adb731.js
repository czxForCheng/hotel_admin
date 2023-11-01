import{_ as K}from"./index.7fbf7ca8.js";import{s as q,B as $,w as I,C as G,x as H,y as J,D as O,I as Q}from"./element-plus.0777841c.js";import{d as v,e as W,o as p,c as f,U as e,u as h,k as U,L as o,S as b,$ as X,af as Y,M as Z,K as S,a as l,V as ee,a7 as te,P as oe,R as le,t as ae,_ as se,T as ne,b7 as ue,b6 as re}from"./@vue.e8706010.js";import{_ as de}from"./index.b117b3fa.js";import{_ as ie}from"./picker.697429b9.js";import{_ as me}from"./picker.968f55f9.js";import{f as y,b as ce,d as pe}from"./index.0be731c2.js";import{b as _e,c as fe}from"./decoration.064e6708.js";import{D as be}from"./vuedraggable.50abc079.js";import"./@vueuse.fc17487b.js";import"./@element-plus.196c7323.js";import"./lodash-es.29c53eac.js";import"./dayjs.771f24d4.js";import"./axios.c369f2ff.js";import"./async-validator.fb49d0f5.js";import"./@ctrl.82a509e0.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.afee7163.js";import"./index.4bbf7216.js";import"./usePaging.37c23e5c.js";import"./lodash.d13b4135.js";import"./index.04d3963e.js";import"./index.vue_vue_type_script_setup_true_lang.4137060b.js";import"./vue3-video-play.4851e3ad.js";import"./vue-router.12d45bc3.js";import"./pinia.dfca86b4.js";import"./vue-demi.ebc8116b.js";import"./css-color-function.66a64c42.js";import"./color.bf494a29.js";import"./clone.7f7b5050.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./debug.cffdefa4.js";import"./ms.a9ae1d6d.js";import"./nprogress.6c190664.js";import"./vue-clipboard3.94e9f0b6.js";import"./clipboard.36db0eb4.js";import"./echarts.234b3572.js";import"./zrender.8ee1a698.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.2cdc8407.js";import"./vue.10337af2.js";import"./sortablejs.99378e7f.js";const xe={class:"color-picker flex flex-1"},Fe=b("\u91CD\u7F6E"),Ve=v({__name:"index",props:{modelValue:{type:String},defaultColor:{type:String}},emits:["update:modelValue"],setup(i,{emit:D}){const x=i,t=W({get(){return x.modelValue},set(_){D("update:modelValue",_)}}),F=["#409EFF","#28C76F","#EA5455","#FF9F43","#01CFE8","#4A5DFF"],V=()=>{t.value=x.defaultColor};return(_,d)=>{const g=q,a=$,n=I;return p(),f("div",xe,[e(g,{modelValue:h(t),"onUpdate:modelValue":d[0]||(d[0]=m=>U(t)?t.value=m:null),predefine:F},null,8,["modelValue"]),e(a,{modelValue:h(t),"onUpdate:modelValue":d[1]||(d[1]=m=>U(t)?t.value=m:null),class:"mx-[10px] flex-1",type:"text",readonly:""},null,8,["modelValue"]),e(n,{type:"text",onClick:V},{default:o(()=>[Fe]),_:1})])}}}),E=i=>(ue("data-v-7391482c"),i=i(),re(),i),ge={class:"decoration-tabbar min-w-[800px]"},Ce={class:"flex h-full items-start"},ye={class:"pages-preview mx-[30px]"},he={class:"tabbar flex"},ve=["src"],Ee={class:"leading-3 text-[12px] mt-[4px]"},De={class:"flex-1"},Be=E(()=>l("div",{class:"title flex items-center before:w-[3px] before:h-[14px] before:block before:bg-primary before:mr-2"},[b(" \u5E95\u90E8\u5BFC\u822A\u8BBE\u7F6E "),l("span",{class:"form-tips ml-[10px] !mt-0"}," \u81F3\u5C11\u6DFB\u52A02\u4E2A\u5BFC\u822A\uFF0C\u6700\u591A\u6DFB\u52A05\u4E2A\u5BFC\u822A ")],-1)),ke={class:"mb-[18px]"},Ae={class:"bg-fill-light w-full p-4 mt-4"},we={class:"upload-btn w-[60px] h-[60px]"},Ue=E(()=>l("span",{class:"text-xs leading-5"}," \u672A\u9009\u4E2D ",-1)),Se={class:"upload-btn w-[60px] h-[60px]"},$e=E(()=>l("span",{class:"text-xs leading-5"}," \u9009\u4E2D ",-1)),Ie=b(" \u6DFB\u52A0\u5BFC\u822A "),Te=b("\u4FDD\u5B58"),ze=v({name:"decorationTabbar"}),Pe=v({...ze,setup(i){const t=X({style:{defaultColor:"",selectedColor:""},list:[{name:"",selected:"",unselected:"",link:{}},{name:"",selected:"",unselected:"",link:{}}]}),F=()=>{var a;((a=t.list)==null?void 0:a.length)<5?t.list.push({name:"",selected:"",unselected:"",link:{}}):y.msgError(`\u6700\u591A\u6DFB\u52A0${5}\u4E2A`)},V=a=>{var n;if(((n=t.list)==null?void 0:n.length)<=2)return y.msgError(`\u6700\u5C11\u4FDD\u7559${2}\u4E2A`);t.list.splice(a,1)},_=a=>a.relatedContext.index!=0,d=async()=>{const a=await _e();t.list=a.list,t.style=a.style},g=async()=>{await fe(ae(t)),d(),y.msgSuccess("\u4FDD\u5B58\u6210\u529F")};return d(),(a,n)=>{const m=ce,B=me,c=G,T=$,z=ie,P=de,k=I,A=H,w=Ve,N=J,R=O,L=Q,M=K,j=Y("perms");return p(),f("div",ge,[e(L,{shadow:"never",class:"!border-none flex-1","body-style":{height:"100%"}},{default:o(()=>[l("div",Ce,[l("div",ye,[l("div",he,[(p(!0),f(ee,null,te(t.list,(u,s)=>(p(),f("div",{class:"tabbar-item flex flex-col justify-center items-center flex-1",key:s,style:se({color:t.style.defaultColor})},[l("img",{class:"w-[22px] h-[22px]",src:u.unselected,alt:""},null,8,ve),l("div",Ee,ne(u.name),1)],4))),128))])]),l("div",De,[Be,e(R,{"label-width":"70px"},{default:o(()=>[e(N,{"model-value":"content"},{default:o(()=>[e(A,{label:"\u5BFC\u822A\u56FE\u7247",name:"content"},{default:o(()=>{var u;return[l("div",ke,[e(h(be),{class:"draggable",modelValue:t.list,"onUpdate:modelValue":n[0]||(n[0]=s=>t.list=s),animation:"300",draggable:".draggable",move:_},{item:o(({element:s,index:C})=>[e(P,{onClose:r=>V(C),class:oe(["max-w-[400px]",{draggable:C!=0}])},{default:o(()=>[l("div",Ae,[e(c,{label:"\u5BFC\u822A\u56FE\u6807"},{default:o(()=>[e(B,{modelValue:s.unselected,"onUpdate:modelValue":r=>s.unselected=r,"upload-class":"bg-body",size:"60px"},{upload:o(()=>[l("div",we,[e(m,{name:"el-icon-Plus",size:16}),Ue])]),_:2},1032,["modelValue","onUpdate:modelValue"]),e(B,{modelValue:s.selected,"onUpdate:modelValue":r=>s.selected=r,"upload-class":"bg-body",size:"60px"},{upload:o(()=>[l("div",Se,[e(m,{name:"el-icon-Plus",size:16}),$e])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(c,{label:"\u5BFC\u822A\u540D\u79F0"},{default:o(()=>[e(T,{modelValue:s.name,"onUpdate:modelValue":r=>s.name=r,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(c,{label:"\u94FE\u63A5\u5730\u5740"},{default:o(()=>[e(z,{modelValue:s.link,"onUpdate:modelValue":r=>s.link=r,disabled:C==0},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:2},1024)])]),_:2},1032,["onClose","class"])]),_:1},8,["modelValue"])]),((u=t.list)==null?void 0:u.length)<5?(p(),S(c,{key:0,"label-width":"0"},{default:o(()=>[e(k,{type:"primary",onClick:F},{default:o(()=>[Ie]),_:1})]),_:1})):le("",!0)]}),_:1}),e(A,{label:"\u6837\u5F0F\u8BBE\u7F6E",name:"styles"},{default:o(()=>[e(c,{label:"\u9ED8\u8BA4\u989C\u8272"},{default:o(()=>[e(w,{class:"max-w-[400px]",modelValue:t.style.defaultColor,"onUpdate:modelValue":n[1]||(n[1]=u=>t.style.defaultColor=u),"default-color":"#999999"},null,8,["modelValue"])]),_:1}),e(c,{label:"\u9009\u4E2D\u989C\u8272"},{default:o(()=>[e(w,{class:"max-w-[400px]",modelValue:t.style.selectedColor,"onUpdate:modelValue":n[2]||(n[2]=u=>t.style.selectedColor=u),"default-color":"#4173ff"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})])])]),_:1}),Z((p(),S(M,{class:"mt-4",fixed:!1},{default:o(()=>[e(k,{type:"primary",onClick:g},{default:o(()=>[Te]),_:1})]),_:1})),[[j,["decorate:tabbar:save"]]])])}}});const Ut=pe(Pe,[["__scopeId","data-v-7391482c"]]);export{Ut as default};