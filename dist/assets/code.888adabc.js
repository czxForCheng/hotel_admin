import{r as n}from"./index.0be731c2.js";function r(e){return n.get({url:"/gen/list",params:e})}function a(e){return n.get({url:"/gen/db",params:e})}function l(){return n.get({url:"/gen/dbAll"})}function u(e){return n.get({url:"/gen/dbColumn",params:e})}function o(e){return n.post({url:"/gen/importTable",params:e},{isParamsToData:!1})}function s(e){return n.get({url:"/gen/detail",params:e})}function g(e){return n.post({url:"/gen/syncTable",params:e},{isParamsToData:!1})}function i(e){return n.post({url:"/gen/delTable",params:e})}function d(e){return n.post({url:"/gen/editTable",params:e})}function f(e){return n.get({url:"/gen/previewCode",params:e})}function b(e){return n.get({url:"/gen/genCode",params:e})}function c(e){return n.get({responseType:"blob",url:"/gen/downloadCode",params:e},{isTransformResponse:!1})}export{u as a,r as b,i as c,l as d,f as e,c as f,d as g,b as h,a as i,o as j,g as s,s as t};