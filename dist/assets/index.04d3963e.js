import{V as S,W as V,J as D}from"./element-plus.0777841c.js";import{a as R,i as p,R as U,f as m,d as L}from"./index.0be731c2.js";import{d as P,s as _,r as f,e as b,t as j,o as i,c as g,U as A,L as C,H as N,K as I,a as h,V as q,a7 as H,T as J,R as K}from"./@vue.e8706010.js";const O=P({components:{},props:{type:{type:String,default:"image"},multiple:{type:Boolean,default:!0},limit:{type:Number,default:10},data:{type:Object,default:()=>({})},showProgress:{type:Boolean,default:!1}},emits:["change","error"],setup(e,{emit:o}){const v=R(),r=_(),E=f(`${p.baseUrl}${p.urlPrefix}/upload/${e.type}`),F=b(()=>({["like-admin"]:v.token,version:p.version})),a=f(!1),n=f([]),c=(s,u,t)=>{a.value=!0,n.value=j(t)},l=(s,u,t)=>{var y;t.every(B=>B.status=="success")&&((y=r.value)==null||y.clearFiles(),a.value=!1,o("change")),s.code==U.FAILED&&s.msg&&m.msgError(s.msg)},d=(s,u)=>{var t;m.msgError(`${u.name}\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25`),(t=r.value)==null||t.abort(u),a.value=!1,o("change"),o("error")},$=()=>{m.msgError(`\u8D85\u51FA\u4E0A\u4F20\u4E0A\u9650${e.limit}\uFF0C\u8BF7\u91CD\u65B0\u4E0A\u4F20`)},k=()=>{var s;(s=r.value)==null||s.clearFiles(),a.value=!1},w=b(()=>{switch(e.type){case"image":return".jpj,.png,.gif,.jpeg,.ico,.bmp";case"video":return".wmv,.avi,.mov,.mp4,.flv,.rmvb";default:return"*"}});return{uploadRefs:r,action:E,headers:F,visible:a,fileList:n,getAccept:w,handleProgress:c,handleSuccess:l,handleError:d,handleExceed:$,handleClose:k}}}),T={class:"upload"},W={class:"file-list p-4"},z={class:"flex-1"};function G(e,o,v,r,E,F){const a=S,n=V,c=D;return i(),g("div",T,[A(a,{ref:"uploadRefs",action:e.action,multiple:e.multiple,limit:e.limit,"show-file-list":!1,headers:e.headers,data:e.data,"on-progress":e.handleProgress,"on-success":e.handleSuccess,"on-exceed":e.handleExceed,"on-error":e.handleError,accept:e.getAccept},{default:C(()=>[N(e.$slots,"default")]),_:3},8,["action","multiple","limit","headers","data","on-progress","on-success","on-exceed","on-error","accept"]),e.showProgress&&e.fileList.length?(i(),I(c,{key:0,modelValue:e.visible,"onUpdate:modelValue":o[0]||(o[0]=l=>e.visible=l),title:"\u4E0A\u4F20\u8FDB\u5EA6","close-on-click-modal":!1,width:"500px",modal:!1,onClose:e.handleClose},{default:C(()=>[h("div",W,[(i(!0),g(q,null,H(e.fileList,(l,d)=>(i(),g("div",{key:d,class:"mb-5"},[h("div",null,J(l.name),1),h("div",z,[A(n,{percentage:parseInt(l.percentage)},null,8,["percentage"])])]))),128))])]),_:1},8,["modelValue","onClose"])):K("",!0)])}const Z=L(O,[["render",G]]);export{Z as U};
