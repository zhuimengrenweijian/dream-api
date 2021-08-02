define("appmsg/wxwork_hidden.js",["biz_wap/utils/mmversion.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
e&&(e.style.display="none");
}
var t=e("biz_wap/utils/mmversion.js"),a=e("biz_common/dom/class.js"),s=t.is_wxwork,r={
profileBt:document.getElementById("profileBt"),
profileName:document.getElementById("js_name"),
shareAuthor:document.getElementById("js_share_author"),
accoutNameInner:document.getElementsByClassName("account_nickname_inner"),
reportArticle:document.getElementById("js_report_article3"),
goProfile:document.getElementsByClassName("js_go_profile"),
authorName:document.getElementById("js_author_name")
};
s&&(r.profileName&&a.addClass(r.profileName,"tips_global_primary"),r.shareAuthor&&a.addClass(r.shareAuthor,"tips_global_primary"),
r.authorName&&a.addClass(r.authorName,"tips_global_primary"),o(r.reportArticle),
"5"!==window.item_show_type&&(r.goProfile.length&&a.addClass(r.goProfile[0],"tips_global_primary"),
r.accoutNameInner.length&&a.addClass(r.accoutNameInner[0],"tips_global_primary")),
console.log=function(){},console.info=function(){});
});define("appmsg/set_article_read.js",["biz_wap/jsapi/core.js","common/utils.js","biz_common/dom/event.js","appmsg/rec_report_key.js"],function(e,o,t){
"use strict";
var n=e("biz_wap/jsapi/core.js"),c=e("common/utils.js"),i=e("biz_common/dom/event.js"),s=e("appmsg/rec_report_key.js"),r=s.RecActionType,a=s.reportRecAction,d=function(e){
n.invoke("handleMPPageAction",{
action:"syncReadState",
state:e
},function(o){
console.log("[set artile read]",e?"read":"unread",o);
});
},l=function(){
var e=[0,10,8];
if(-1!==e.indexOf(1*window.item_show_type)){
var o=document.getElementById("js_toobar3");
o&&"none"!==o.style.display&&!function(){
var e=!1,t=function n(){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,s=o.offsetTop;
t+c.getInnerHeight()>s&&s>=t&&(d(1),a(r.kReadOver),i.off(window,"scroll",n)),t>=.2*s&&!e&&(e=!0,
a(r.kRead20Percent));
};
t(),a(r.kRead),i.on(window,"scroll",t);
}();
}
};
t.exports={
setArticleRead:d,
bindArticleReadEvent:l
};
});define("appmsg/getForbidConfig.js",[],function(){
"use strict";
return function(n){
window.getWXLongPressImageEventConfig=function(){
return n.isPaySubscribe?{
forbidForward:1
}:{
forbidForward:0
};
};
};
});define("biz_wap/utils/jsmonitor_report.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax.js","biz_wap/utils/log.js"],function(o){
"use strict";
function n(o,t){
r=window.setTimeout(function(){
o(),n(o,t);
},t);
}
var t=o("biz_common/utils/monitor.js"),i=o("biz_wap/utils/ajax.js"),e=o("biz_wap/utils/log.js"),r=null,s={};
return window.__jsmonitorReport?window.__jsmonitorReport:(window.__monitor_unload_has_done__=!1,
s.setSum=function(o,n,i){
return t.setSum(o,n,i),s;
},s.setAvg=function(o,n,i){
return t.setAvg(o,n,i),s;
},s.setLogs=function(o){
return t.setLogs(o),s;
},s.send=function(o){
return o!==!1&&(o=!0),t.send(o,i),s;
},n(function(){
s.send();
},1e3),window.addEventListener("unload",function(){
e("[leaveReport in jsmonitor_report 4]"),console.log("[leaveReport in jsmonitor_report 4]"),
window.__monitor_report_has_done__||(e("[leaveReport in jsmonitor_report 5]"),console.log("[leaveReport in jsmonitor_report 5]"),
window.__ajaxtest="2",r&&(window.clearTimeout(r),r=null),s.send(!1),window.__monitor_unload_has_done__=!0);
},!1),window.__jsmonitorReport=s,s);
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);
}
return e;
};
define("appmsg/topbar.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/comm_report.js","pages/utils.js","biz_common/dom/event.js","common/utils.js","biz_wap/utils/setMpInfo.js"],function(e){
"use strict";
function t(e){
e="undefined"!=typeof e?e:!1;
var t={
userName:b.userName,
brandName:b.bizNickName,
title:b.title,
brandIcon:b.headImg,
topBarStyle:N?1:0,
topBarShowed:e,
isMenuShowBrandInfo:1,
cover:b.cover,
digest:b.digest
};
if(""!==b.itemShowType&&null!==b.itemShowType&&void 0!==b.itemShowType&&_extends(t,{
itemShowType:b.itemShowType
}),""!==b.showSourceInfo&&_extends(t,{
showSourceInfo:b.showSourceInfo
}),"0"===b.itemShowType)_extends(t,{
isPaySubscribe:window.isPaySubscribe,
forbidForward:window.isPaySubscribe?1:0
});else if("5"===window.item_show_type)_extends(t,{
vid:b.vid,
duration:b.videoDuration,
videoWidth:b.videoWidth,
videoHeight:b.videoHeight
});else{
var i=b.voiceid||0,o=b.duration||0;
_extends(t,{
audioUrl:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid="+i,
audioLen:o
});
}
f.currentMpInfo(t);
}
function i(){
N&&p.invoke("currentMpInfoShow",{
userName:b.userName,
brandName:b.bizNickName
});
}
function o(){
N&&p.invoke("currentMpInfoHide");
}
function n(){
N&&(t(),v.getScrollTop()>b.showTitleHeight&&i());
}
function r(){
N&&(v.getScrollTop()>b.showTitleHeight?i():o());
}
function a(e){
var t=parseInt(Date.now()/1e3,10);
b.reportData.EnterId=b.reportData.EnterId&&10===b.reportData.EnterId.toString().length?b.reportData.EnterId:t;
var i=1*(v.getScrollTop()+v.getInnerHeight()),o=_extends({},b.reportData,{
Event:e,
CurrScreen:3===e?Math.ceil(v.getScrollTop()/v.getInnerHeight()):0,
ExitHeight:3===e?Math.ceil(i):0
});
h.report(17335,o);
}
function s(){
p.on("topbar:click",function(){
a(3);
});
}
function c(){
var e=v.getScrollTop();
e>=b.showTitleHeight&&!S?(S=!0,N?(p.invoke("currentMpInfoShow",{
userName:b.userName,
brandName:b.bizNickName
}),I||(a(1),I=!0)):document.title=b.bizNickName):e<b.showTitleHeight&&S&&(S=!1,N?p.invoke("currentMpInfoHide"):document.title="");
}
function d(){
w.bindVisibilityChangeEvt(function(e){
e&&v.getScrollTop()>=b.showTitleHeight&&(t(),i());
});
}
function u(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.bizNickName||(e.bizNickName=N?"Unnamed Official Account":e.bizNickNameBackup);
for(var t in e)e[t]&&(b[t]=e[t]);
b.bizNickName=b.bizNickName.htmlDecode(),b.title=b.title.htmlDecode(),b.headImg=b.headImg.replace(/\/0$/,"/132");
}
function m(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
u(e),t(),s(),d(),w.on(window,"load",function(){
document.title="",c();
}),w.on(window,"scroll",T),window.addEventListener("pageshow",function(e){
e.persisted&&n();
});
}
var p=e("biz_wap/jsapi/core.js"),l=e("biz_wap/utils/mmversion.js"),h=e("common/comm_report.js"),g=e("pages/utils.js"),w=e("biz_common/dom/event.js"),v=e("common/utils.js"),f=e("biz_wap/utils/setMpInfo.js"),b={
showTitleHeight:40,
userName:"",
bizNickName:"",
bizNickNameBackup:"",
title:"",
headImg:"",
voiceid:"",
duration:"",
vid:"",
videoDuration:0,
videoWidth:0,
videoHeight:0,
itemShowType:window.item_show_type,
showSourceInfo:"",
reportData:{},
cover:"",
digest:""
},N=!1,S=!1,I=!1;
N="5"===b.itemShowType?l.isIOS&&l.gtVersion("7.0.12",!0)||l.isAndroid&&l.gtVersion("7.0.12",!0):l.isIOS&&l.gtVersion("7.0.10",!0)||l.isAndroid&&l.gtVersion("7.0.12",!0);
var T=g.throttle(c,50);
return{
setCurrentMpInfo:t,
showCurrentMpInfo:i,
hideCurrentMpInfo:o,
resetTopBar:n,
setTopBar:r,
update:u,
init:m
};
});define("appmsg/finance_communicate.js",[],function(){
"use strict";
function e(e){
console.info("postPageHeightMessage");
var t=getComputedStyle(n);
window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"http://finance.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"http://gu.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"https://gu.qq.com"),window.parent.postMessage({
name:e,
data:parseFloat(t.height)
},"https://wzq.tenpay.com");
}
function t(e){
console.log("[IFRAME RECEIVE MESSAGE]: ",e);
var t;
if(e.origin?t=e.origin:e.originalEvent&&(t=e.originalEvent.origin),/^http(s)?\:\/\/finance\.qq\.com$/.test(t)&&/^http(s)?\:\/\/gu\.qq\.com$/.test(t)&&/^http(s)?\:\/\/wzq\.tenpay\.com$/.test(t)&&e.source){
e.data,document.getElementsByTagName("body")[0],document.getElementById("activity-name"),
document.getElementById("meta_content"),document.getElementById("page-content");
}
}
if(window.parent===window)return!1;
document.getElementsByTagName("html")[0].style.width="1px",document.getElementsByTagName("html")[0].style.minWidth="100%";
var n=(document.getElementById("js_content"),document.getElementById("img-content"),
document.getElementById("page-content")),a=document.getElementsByClassName("rich_media_area_extra")[0];
return a.style.display="none",e("pageHeight"),window.addEventListener("message",t,!1),
{
postPageHeightMessage:e
};
});define("appmsg/loading.js",["tpl/appmsg/loading.html.js"],function(e){
"use strict";
var n=e("tpl/appmsg/loading.html.js"),t=document.createElement("div");
t.innerHTML=n,t=t.children[0];
var a=t.querySelector(".js_loading_content");
return document.querySelector("body").appendChild(t),t.addEventListener("touchstart",function(e){
e.preventDefault();
},!1),{
show:function(){
var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];
a.innerHTML=e,t.style.display="";
},
hide:function(){
t.style.display="none";
}
};
});define("appmsg/pay_report_utils.js",["biz_wap/jsapi/core.js","common/comm_report.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js"],function(e){
"use strict";
function n(e){
var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+e+"_"+n+"&r="+Math.random();
}
function i(e){
var n=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
r.isIOS?(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+e+"_"+n+"&r="+Math.random():r.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=110809_"+(1*e+1)+"_"+n+"&r="+Math.random());
}
var t=e("biz_wap/jsapi/core.js"),o=e("common/comm_report.js"),r=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/utils/device.js"),d={
netType:null
},w=function(e){
t.invoke("getNetworkType",{},function(n){
switch(n.err_msg){
case"network_type:edge":
case"network_type:wwan":
switch(n.detailtype){
case"2g":
d.netType=2;
break;

case"3g":
d.netType=3;
break;

case"4g":
d.netType=4;
break;

default:
d.netType=0;
}
break;

case"network_type:wifi":
d.netType=1;
break;

case"network_type:fail":
d.netType=-1;
break;

default:
d.netType=0;
}
"function"==typeof e&&e();
});
},a=function(e,n,i){
var t=arguments.length<=3||void 0===arguments[3]?"":arguments[3],r=arguments.length<=4||void 0===arguments[4]?"":arguments[4],s=arguments.length<=5||void 0===arguments[5]?"":arguments[5];
o.report(18485,{
bizuin:window.biz,
msgid:1*window.mid,
itemidx:1*window.idx,
price:1*window.paySubscribeInfo.fee,
Preview:1*window.previewPercent,
worthycnt:1*window.paySubscribeInfo.like_cnt,
paidcnt:1*window.paySubscribeInfo.pay_cnt,
is_finished:1*window.is_finished_preview,
PayTime:1*e,
PayResult:1*n,
ErrMsg:t+"",
ErrCodeInt:1*r,
ErrDomain:s+"",
Order_Id:i+"",
EnterId:1*window.enterid
});
},p=function g(e){
if(window.isPaySubscribe)if(null===d.netType)w(function(){
return g(e);
});else{
var n=Math.round(new Date/1e3);
o.report(18488,{
NetType:d.netType,
Bizuin:window.biz,
MsgId:1*window.mid,
itemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
EventTime:n,
EventType:e,
Scene:1*window.source,
Subscene:1*window.subscene,
IsFans:1*window.isFans,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
});
}
},c=function I(e,n){
if(null===d.netType)w(function(){
return I(e,n);
});else{
var i=Math.round(new Date/1e3),t={
NetType:d.netType,
Bizuin:window.biz,
MsgId:1*window.mid,
itemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
EventTime:i,
EventType:e,
Scene:1*window.source,
Subscene:1*window.subscene,
IsFans:1*window.isFans,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
};
void 0!==n&&(t.ActionType=n),o.report(18488,t);
}
},u=function b(e,n){
if(null===d.netType)w(function(){
return b(e,n);
});else{
var i=Math.round(new Date/1e3),t={
NetType:d.netType,
EventTime:i,
EventType:e,
SessionId:window.sessionid+"",
EnterId:1*window.enterid
};
void 0!==n&&(t.ActionType=n),o.report(18488,t);
}
},m=function(e,n,i,t,r,d,w){
o.report(19158,{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
OriPrice:window.paySubscribeInfo?1*window.paySubscribeInfo.fee:0,
IAPCurrency:e,
IAPPrice:n,
GetIAPType:i,
GetIAPTime:t,
ProductId:window.payProductId,
EnterId:1*window.enterid,
CountryCode:r,
SystemVer:s.os.version,
GetIAPResult:d,
GetIAPErrMsg:w
});
},y=function(e){
o.report(22287,{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
Url:window.msg_link+"",
Title:window.msg_title+"",
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
EventTime:Math.round(new Date/1e3),
EventType:e
});
},l={
report110809:n,
reportPay:a,
reportPayAppmsg:p,
reportPayWall:c,
reportProfile:u,
report110809ForDevice:i,
reportOverseaPay:m,
reportSend:y
};
return l;
});define("appmsg/popup_report.js",["biz_wap/utils/ajax.js","biz_common/base64.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function i(e){
r({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:17988,
buffer:a.concat(e).join(",")
},
async:!1,
timeout:2e3
});
}
function t(e){
var i=2,t=u.getQuery("__biz",e)||"",n=u.getQuery("mid",e)||"",r=u.getQuery("idx",e)||"";
return t.length&&n.length&&r.length?i=3:-1!==e.indexOf("mp.weixin.qq.com")&&(i=4),
i;
}
function n(e){
var i="",t=u.getQuery("__biz",e)||"",n=u.getQuery("mid",e)||"",r=u.getQuery("idx",e)||"";
return i=-1===e.indexOf("mp.weixin.qq.com")?e:t.length&&n.length&&r.length?t+"_"+n+"_"+r:e;
}
var r=e("biz_wap/utils/ajax.js"),o=e("biz_common/base64.js"),u=e("biz_common/utils/url/parse.js"),a=["",""+o.decode(window.biz),""+window.mid,""+window.idx,""+window.enterid];
return{
report:i,
getRedirectType:t,
getUrlData:n
};
});define("complain/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,l=0,t=t||function(){};o>l&&(e=localStorage.key(l),
t.call(this,e,this.get(e))!==!1);l++)localStorage.length<o&&(o--,l--);
}
}:{
set:function(){},
get:function(){}
};
});define("common/utils.js",["biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","biz_wap/utils/wapsdk.js","biz_wap/utils/storage.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/log.js","biz_wap/utils/jsmonitor_report.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(){
return"1"===i.getQuery("isNativePage")||"2"===i.getQuery("isNativePage");
}
function n(e){
var t=arguments.length<=1||void 0===arguments[1]?50:arguments[1],n=void 0;
return function(){
for(var i=arguments.length,o=Array(i),r=0;i>r;r++)o[r]=arguments[r];
var s=this,a=function(){
n=null,e.apply(s,o);
};
n||(n=setTimeout(a,t));
};
}
var i=e("biz_common/utils/url/parse.js"),o=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/wapsdk.js"),s=e("biz_wap/utils/storage.js"),a=e("biz_wap/utils/device.js"),c=e("biz_wap/utils/mmversion.js"),u=e("biz_wap/jsapi/log.js"),g=e("biz_wap/utils/jsmonitor_report.js"),p=e("biz_common/dom/event.js");
try{
"undefined"==typeof parent.window.hasListenMpPageAction&&(parent.window.hasListenMpPageAction=!1),
"undefined"==typeof parent.window.hasListenStateChange&&(parent.window.hasListenStateChange=!1);
}catch(l){}
var d=[],f=[],w=new s("history4secondopen"),m="from",h=!1,_={
status:"loading"
},v=[],y={
isNativePage:t,
isNewNativePage:function(){
return"2"===i.getQuery("isNativePage");
},
isOldNativePage:function(){
return"1"===i.getQuery("isNativePage");
},
__useWcSlPlayer:!1,
isWcSlPage:function(){
return y.__useWcSlPlayer;
},
getPlayerType:function(){
return y.isWcSlPage()?3:t()?2:1;
},
getParam:function(e){
if(!e)return null;
var t=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return t?t[2]:null;
},
insertAfter:function(e,t){
var n=t.parentNode;
n.lastChild===t?n.appendChild(e):n.insertBefore(e,t.nextSibling);
},
getInnerHeight:function(){
var e=window.getInnerHeight&&window.getInnerHeight();
return e||window.innerHeight||document.documentElement.clientHeight;
},
getInnerWidth:function(){
return window.innerWidth||document.documentElement.clientWidth;
},
getScrollTop:function(){
return document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
},
getDocumentHeight:function(){
return document.body.scrollHeight;
},
getElementActualTop:function(e){
var t=e.getBoundingClientRect(),n=t.top-this.getScrollTop();
return n;
},
getElementTop:function(e){
return e.getBoundingClientRect().top;
},
getElementHeight:function(e){
return e.getBoundingClientRect().height;
},
isScrollEnd:function(e){
return this.getScrollTop()+this.getInnerHeight()+e>=this.getDocumentHeight();
},
listenStateChange:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
f.push(e.cb);
try{
if(parent.window.hasListenStateChange)return;
}catch(t){}
o.on("activity:state_change",function(e){
f.forEach(function(t){
t(e);
});
});
try{
parent.window.hasListenStateChange=!0;
}catch(t){}
},
listenMpPageAction:function(e){
d.push(e);
try{
if(parent.window.hasListenMpPageAction)return;
}catch(t){}
o.on("onMPPageAction",function(e){
d.forEach(function(t){
t(e);
});
});
try{
parent.window.hasListenMpPageAction=!0;
}catch(t){}
},
getIosMainVersion:function(){
var e=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return e&&e[1]&&parseInt(e[1].split("_")[0],10);
},
report120081:function(e,t){
r.jsmonitor({
id:120081,
key:e,
value:t
});
},
loadNewPageKeepingHistoryStackIfSecOpen:function(e){
window.__second_open__&&"string"==typeof e&&/^https?:\/\/mp.weixin.qq.com\//.test(e)&&w.set(m,location.href,Date.now()+1e4),
location.href=e.replace(/#.*$/,"")+"#wechat_redirect";
},
initNewPageHistoryStackFromSecOpen:function(){
var e=w.get(m);
if(e&&"string"==typeof e&&/^https?:\/\/mp.weixin.qq.com\//.test(e)&&(w.remove(m),
history&&history.replaceState&&history.pushState)){
var t=location.href;
try{
history.replaceState({
__mock_secopen_history_stack_reload__:1
},"",e),history.pushState({
__mock_secopen_history_stack_reload__:1
},"",t);
}catch(n){
console.error("[initNewPageHistoryStackFromSecOpen]",n);
}
}
h||(h=!0,window.addEventListener("popstate",function(e){
e.state&&1===e.state.__mock_secopen_history_stack_reload__&&location.reload();
}));
},
initWebCompt:function(e,t){
var n=function(){
for(;v.length;){
var e=v.shift();
e(_);
}
};
if(a.os.iphone&&c.isWechat&&a.os.getNumVersion()>=10.3&&(c.gtVersion("7.0.14",1)&&a.os.getNumVersion()<15||c.gtVersion("8.0.7"))||a.os.android&&c.isWechat&&c.gtVersion("7.0.15",1)&&a.os.getNumVersion()>=5)document.addEventListener("WeixinOpenTagsReady",function(){
_={
status:"ready"
},n();
}),document.addEventListener("WeixinOpenTagsError",function(e){
_={
status:"error",
error:e&&e.detail&&e.detail.errMsg
},n();
}),o.invoke("handleMPPageAction",{
action:"wxConfig",
appid:"wxmpfakeid",
webComptList:e
},function(i){
console.log("wx config web compt result",e,i),u.info("wx config web compt result",e,JSON.stringify(i)),
i&&i.err_msg&&-1===i.err_msg.indexOf(":ok")&&(_={
status:"error",
error:i.err_msg
},n()),"function"==typeof t&&t(i);
});else{
var i={
err_msg:"handleMPPageAction:fail_webcompt unsupported"
};
console.log("wx config web compt result",e,i),u.info("wx config web compt result",e,JSON.stringify(i)),
_={
status:"error",
error:i.err_msg
},n(),"function"==typeof t&&t(i);
}
},
initWebComptForWcSlVideoSharePage:function(){
o.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!0
});
var e=function(e){
-1!==e.err_msg.indexOf(":ok")?y.initNewPageHistoryStackFromSecOpen():(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: res not ok"),g.setSum(221515,a.os.iphone?7:8,1),
window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&e&&window.WX_BJ_REPORT.BadJs.report("WcSlPlayer:CfgError",(window.__second_open__?"secopen:":"h5:")+JSON.stringify(e)));
};
if(c.isAndroid){
var t=c.getInner();
t>"27001037"&&"27001060">t||t>="27001100"?y.initWebCompt(["wxOpen","wxAd"],e):c.gtVersion("7.0.15",1)?(y.initWebCompt(["wxAd"]),
window.__failConfigWxOpen=!0,u.info("failed to config wxopen: android version check failed (gt 7.0.15)")):(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: android version check failed"));
}else c.gtVersion("7.0.15",1)?y.initWebCompt(["wxOpen","wxAd"],e):(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: ios version check failed"));
},
getWebComptStatus:function(e){
return"function"!=typeof e?_:("loading"===_.status?v.push(e):e(_),!0);
},
supportImmersiveMode:c.isWechat&&(a.os.iphone&&c.gtVersion("8.0.7")||a.os.android&&c.gtVersion("8.0.8")),
debounce:n,
bindDebounceScrollEvent:function(e){
var t=arguments.length<=1||void 0===arguments[1]?window:arguments[1],i=arguments.length<=2||void 0===arguments[2]?50:arguments[2],o=n(e,i);
p.on(t,"scroll",o);
},
once:function(e){
return function(){
if(e){
for(var t=arguments.length,n=Array(t),i=0;t>i;i++)n[i]=arguments[i];
var o=e.apply(this,n);
return e=null,o;
}
};
}
};
return y;
});define("biz_wap/utils/wapsdk.js",["biz_common/utils/wxgspeedsdk.js","biz_wap/utils/jsmonitor_report.js"],function(s){
"use strict";
function e(s){
var e=.001;
"number"==typeof s.sample&&(e=s.sample);
var i=Math.random();
e>i&&n.saveSpeeds(s);
}
function i(s){
var e=s.sample||.001,i=Math.random();
e>i&&n.setBasicTime(s);
}
function t(){
n.send();
}
function a(s){
var s=s||[];
if(!s.length){
var e=s;
s=[],s.push(e);
}
for(var i=0;i<s.length;i++){
var e=s[i],t=e.id,a=e.key,n=e.value||1;
void 0!==t&&void 0!==a&&o.setSum(t,a,n);
}
}
var n=s("biz_common/utils/wxgspeedsdk.js"),o=s("biz_wap/utils/jsmonitor_report.js");
return{
saveSpeeds:e,
setBasicTime:i,
send:t,
jsmonitor:a
};
});define("a/mpAdAsync.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js","a/a.js","a/a_utils.js","biz_common/utils/url/parse.js","a/a_config.js","pages/version4video.js","common/utils.js","biz_common/utils/wxgspeedsdk.js","appmsg/without_iframe/iframe_communicate.js"],function(e){
"use strict";
function i(e,i){
var t=window.withoutIframe?document.getElementsByClassName("video_iframe"):document.getElementsByTagName("iframe");
if(window.originalVideoAdFramesAdData=window.originalVideoAdFramesAdData||{},window.originalVideoAdFramesUnsetList)for(var a=0;a<window.originalVideoAdFramesUnsetList.length;a++)for(var s=0;s<t.length;s++)if(t[s].dataset&&t[s].dataset.mpvid===window.originalVideoAdFramesUnsetList[a]){
window.originalVideoAdFramesAdData[t[s].dataset.mpvid]||(window.originalVideoAdFramesAdData[t[s].dataset.mpvid]={}),
i=window.originalVideoAdFramesAdData[t[s].dataset.mpvid],window.withoutIframe?l.triggerListener({
vid:window.originalVideoAdFramesUnsetList[a],
data:i,
type:"receiveOriginalVideoData"
}):t[s].contentWindow.postMessage({
action:"receiveOriginalVideoData",
vid:window.originalVideoAdFramesUnsetList[a],
adData:i
},"*");
break;
}
e[0]&&window.postMessage({
action:"receiveOriginalVideoData",
vid:e[0],
adData:i||{}
},"*");
}
function t(e){
if(window.withoutIframe)l.triggerListener({
type:_.APPMSGAD_READY_ACTION,
data:e
}),m.listenMessage(window,function(i,t){
t.action===_.GET_APPMSGAD_READY_STATUS_ACTION&&l.triggerListener({
type:_.APPMSGAD_READY_ACTION,
data:e,
vid:t.value&&t.value.vid
});
});else{
var i=document.getElementsByTagName("iframe");
m.broadcastFrame(i,_.APPMSGAD_READY_ACTION,e),m.listenMessage(window,function(i,t){
t.action===_.GET_APPMSGAD_READY_STATUS_ACTION&&m.postMessage(i.source,_.APPMSGAD_READY_ACTION,e);
});
}
}
function a(e){
o("[Appmsg] error get async ad data or false no ad, biz="+window.biz+", mid="+window.mid),
i(e),t();
}
function s(e){
var s=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],l=arguments[2],u=[],f=r.checkNeedAds();
f.is_need_ad=s.forceGetAd?1:f.is_need_ad;
var v=window.isPaySubscribe?0:f.is_need_ad,A=window.isPaySubscribe?1:0,y=w.getQuery("mock"),D=w.getQuery("rtx"),j="/mockserver/mockservercgi-bin/offerTestCase/mmbizwap/mp/getappmsgad",h="/mp/getappmsgad",b="5"===window.item_show_type,k=b&&!p.isNativePage()&&!w.getQuery("get_ad_after_video"),V=c.isUseAd()&&!k,x=window.pos_type_list?JSON.stringify(window.pos_type_list.split("|").map(function(e){
return Number(e);
})):"",I=Date.now(),P="string"==typeof s.version?s.devicetype:window.clientversion.htmlDecode();
window.__second_open__&&(P=window.clientversion.htmlDecode()),e=e||[];
for(var S=0;S<e.length;S++)0===e[S].indexOf(_.ORIGIN_VIDEO_VID_PREFIX)&&u.push(e[S]);
(y&&"-1"!==y||D)&&(console.info("[广告走mock系统] mockId",y,"rtx",D),h=j),console.info("[广告发送请求] 是否拉取广告",v),
console.info("[强制广告] 是否强制去掉广告",A),A?a(u):n({
url:h+"?f=json&mockid="+y+"&rtx="+D,
data:{
r:Math.random(),
appmsg_type:window.appmsg_type||"",
mid:window.mid,
sn:window.sn,
idx:window.idx,
scene:s.scene||window.scene,
title:s.title||encodeURIComponent(window.msg_title.htmlDecode()),
ct:s.ct||window.ct,
abtest_cookie:s.abtest_cookie||window.abtest_cookie||"",
devicetype:"string"==typeof s.devicetype?s.devicetype:window.devicetype.htmlDecode(),
version:P,
is_need_ad:v,
both_ad:f.both_ad,
send_time:s.send_time||window.send_time||"",
msg_daily_idx:s.msg_daily_idx||window.msg_daily_idx,
pass_ticket:window.pass_ticket,
is_temp_url:window.is_temp_url||0,
item_show_type:window.item_show_type,
tmp_version:1,
pos_type_list:x,
vid_list:JSON.stringify(V?e:[]),
exportkey:w.getQuery("exportkey"),
waid:w.getQuery("waid")
},
type:"POST",
dataType:"json",
rtId:27613,
rtKey:50,
rtDesc:d,
async:!0,
success:function(e){
o("[Appmsg] success get async ad data"),console.info("[广告响应请求]",e),window.can_see_complaint=e.can_see_complaint,
r.afterGetAdData(f,e),m.setBackgroundClass();
var a=e;
if(a.advertisement_info&&0!==a.advertisement_info.length)try{
if(o("[Appmsg] success get async ad data, async data is: "+JSON.stringify(a)),window.originalVideoAdFramesAdData={},
a.advertisement_info)for(var s=0;s<a.advertisement_info.length;s++){
a.advertisement_info[s].cdg_appid=a.appid;
var n=a.advertisement_info[s].vid;
n&&"string"==typeof n&&1===a.advertisement_info[s].is_mp_video&&(window.originalVideoAdFramesAdData[n]=m.saveCopy(a.advertisement_info[s]),
p.report120081("0"));
}
i(u,window.originalVideoAdFramesAdData[u[0]]);
}catch(d){
console.error(d);
}else o("[Appmsg] success get async ad data, async data is empty"),i(u);
l&&l(),t(e),Math.random()<.005&&(g.saveSpeeds({
uin:window.user_uin,
pid:2587,
speeds:[{
sid:21,
time:Date.now()-I
}]
}),g.send());
},
error:function(){
a(u);
}
});
}
var o=e("appmsg/log.js"),n=e("biz_wap/utils/ajax.js"),d=e("rt/appmsg/getappmsgext.rt.js"),r=e("a/a.js"),m=e("a/a_utils.js"),w=e("biz_common/utils/url/parse.js"),_=e("a/a_config.js"),c=e("pages/version4video.js"),p=e("common/utils.js"),g=e("biz_common/utils/wxgspeedsdk.js"),l=e("appmsg/without_iframe/iframe_communicate.js");
return{
getAdData:s
};
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n,t){
var a=r(e),i=a.query_str,s=[];
for(var o in n)n.hasOwnProperty(o)&&s.push(o+"="+(t?n[o]:encodeURIComponent(n[o])));
return s.length>0&&(i+=(""!=i?"&":"")+s.join("&")),a.host+(""!=i?"?"+i:"")+(""!=a.hash?"#"+a.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});define("appmsg/appmsg_report.js",["biz_wap/utils/ajax.js","appmsg/without_iframe/video_communicate_adaptor.js","pages/video_communicate_adaptor.js"],function(i){
"use strict";
function e(i){
if(!i)return null;
var e=location.href.match(new RegExp("(\\?|&)"+i+"=([^&]+)"));
return e?e[2]:null;
}
function o(i){
var o=i.link,t=i.action_type,n=o.split("?").pop();
if(n=n.split("#").shift(),""!=n){
var p=i.reportVid||window.reportVid,a=i.reportMid||window.reportMid,d=i.reportVoiceid||window.reportVoiceid,w=i.reportWeappid||window.reportWeappid,_=[],u=[],c=[];
if("undefined"==typeof i.ori_status_arr||"undefined"==typeof i.hit_bizuin_arr)for(var h=r.getVideoInfo(),f=0;f<p.length;f++){
var m=p[f];
_.push(h[m]&&"undefined"!=typeof h[m].ori_status?h[m].ori_status:0),u.push(h[m]&&"undefined"!=typeof h[m].hit_bizuin?h[m].hit_bizuin:""),
c.push(h[m]&&"undefined"!=typeof h[m].hit_vid?h[m].hit_vid:"");
}else _=i.ori_status_arr,u=i.hit_bizuin_arr,c=i.hit_vid_arr;
var y=[n,"action=share","action_type="+t,"scene="+(i.source||window.source||e("scene")),"subscene="+e("subscene"),"ascene="+(i.ascene||window.ascene||-1),"req_id="+(i.req_id||window.req_id||""),"vid="+("undefined"!=typeof p?p.join(";"):""),"musicid="+("undefined"!=typeof a?a.join(";"):""),"voiceid="+("undefined"!=typeof d?d.join(";"):""),"weappid="+("undefined"!=typeof w?w.join(";"):""),"item_show_type="+(i.item_show_type||window.item_show_type||0),"ori_status_arr="+_.join(";"),"hit_bizuin="+u.join(";"),"hit_vid_arr="+c.join(";"),"top_stories="+(i.top_stories||0),"content_url="+encodeURIComponent(window.location.href),"channel_session_id="+e("channel_session_id"),"is_pay_subscribe="+window.isPaySubscribe,"is_paid="+window.isPaid,"preview_percent="+window.previewPercent,"fee="+(window.paySubscribeInfo?window.paySubscribeInfo.fee:""),"worthy_cnt="+(window.paySubscribeInfo?window.paySubscribeInfo.like_cnt:""),"pay_cnt="+(window.paySubscribeInfo?window.paySubscribeInfo.pay_cnt:""),"album_id="+(window.appmsg_album_info?window.appmsg_album_info.id:""),"album_type="+(window.appmsg_album_info?0:""),"is_cartoon_copyright="+(window.isCartoonCopyright?1:2),"share_source="+i.share_source,"exptype="+window.exptype||"","expsessionid="+window.expsessionid||""];
i.hotspotjson?y.push("hotspotjson="+i.hotspotjson):window.hotspotInfoList&&y.push("hotspotjson="+JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})),i.sharer_shareid&&y.push("sharer_shareid="+i.sharer_shareid),i.sharer_sharetime&&y.push("sharer_sharetime="+i.sharer_sharetime),
y=y.join("&"),s({
url:"/mp/appmsgreport",
type:"POST",
data:y,
async:!1,
timeout:2e3
});
}
}
function t(i){
s({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:i.title||window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1,
isnew:i.isnew||0,
item_show_type:i.item_show_type||window.item_show_type||0,
hotspotjson:i.hotspotjson||""
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function n(i){
s({
url:"/mp/appmsgreport?action=hotspotreport",
data:{
title:i.title||window.msg_title||"",
__biz:window.biz||"",
appmsgid:window.mid||"",
itemidx:window.idx||"",
scene:window.source||"",
hotspotjson:i.hotspotjson||""
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
var s=i("biz_wap/utils/ajax.js"),r=i(window.withoutIframe?"appmsg/without_iframe/video_communicate_adaptor.js":"pages/video_communicate_adaptor.js");
return{
shareReport:o,
profileReport:t,
hotspotReport:n
};
});define("biz_common/moment.js",[],function(t,e,n){
"use strict";
function i(){
return xi.apply(null,arguments);
}
function r(t){
xi=t;
}
function s(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function a(t){
return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t);
}
function o(t,e){
var n,i=[];
for(n=0;n<t.length;++n)i.push(e(t[n],n));
return i;
}
function u(t,e){
return Object.prototype.hasOwnProperty.call(t,e);
}
function d(t,e){
for(var n in e)u(e,n)&&(t[n]=e[n]);
return u(e,"toString")&&(t.toString=e.toString),u(e,"valueOf")&&(t.valueOf=e.valueOf),
t;
}
function l(t,e,n,i){
return Ce(t,e,n,i,!0).utc();
}
function c(){
return{
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function h(t){
return null==t._pf&&(t._pf=c()),t._pf;
}
function f(t){
if(null==t._isValid){
var e=h(t);
t._isValid=!(isNaN(t._d.getTime())||!(e.overflow<0)||e.empty||e.invalidMonth||e.invalidWeekday||e.nullInput||e.invalidFormat||e.userInvalidated),
t._strict&&(t._isValid=t._isValid&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour);
}
return t._isValid;
}
function m(t){
var e=l(0/0);
return null!=t?d(h(e),t):h(e).userInvalidated=!0,e;
}
function _(t,e){
var n,i,r;
if("undefined"!=typeof e._isAMomentObject&&(t._isAMomentObject=e._isAMomentObject),
"undefined"!=typeof e._i&&(t._i=e._i),"undefined"!=typeof e._f&&(t._f=e._f),"undefined"!=typeof e._l&&(t._l=e._l),
"undefined"!=typeof e._strict&&(t._strict=e._strict),"undefined"!=typeof e._tzm&&(t._tzm=e._tzm),
"undefined"!=typeof e._isUTC&&(t._isUTC=e._isUTC),"undefined"!=typeof e._offset&&(t._offset=e._offset),
"undefined"!=typeof e._pf&&(t._pf=h(e)),"undefined"!=typeof e._locale&&(t._locale=e._locale),
Ai.length>0)for(n in Ai)i=Ai[n],r=e[i],"undefined"!=typeof r&&(t[i]=r);
return t;
}
function y(t){
_(this,t),this._d=new Date(null!=t._d?t._d.getTime():0/0),zi===!1&&(zi=!0,i.updateOffset(this),
zi=!1);
}
function p(t){
return t instanceof y||null!=t&&null!=t._isAMomentObject;
}
function g(t){
return 0>t?Math.ceil(t):Math.floor(t);
}
function D(t){
var e=+t,n=0;
return 0!==e&&isFinite(e)&&(n=g(e)),n;
}
function v(t,e,n){
var i,r=Math.min(t.length,e.length),s=Math.abs(t.length-e.length),a=0;
for(i=0;r>i;i++)(n&&t[i]!==e[i]||!n&&D(t[i])!==D(e[i]))&&a++;
return a+s;
}
function M(){}
function Y(t){
return t?t.toLowerCase().replace("_","-"):t;
}
function w(t){
for(var e,n,i,r,s=0;s<t.length;){
for(r=Y(t[s]).split("-"),e=r.length,n=Y(t[s+1]),n=n?n.split("-"):null;e>0;){
if(i=S(r.slice(0,e).join("-")))return i;
if(n&&n.length>=e&&v(r,n,!0)>=e-1)break;
e--;
}
s++;
}
return null;
}
function S(e){
var i=null;
if(!Zi[e]&&"undefined"!=typeof n&&n&&n.exports)try{
i=Ii._abbr,t("./locale/"+e),k(i);
}catch(r){}
return Zi[e];
}
function k(t,e){
var n;
return t&&(n="undefined"==typeof e?b(t):T(t,e),n&&(Ii=n)),Ii._abbr;
}
function T(t,e){
return null!==e?(e.abbr=t,Zi[t]=Zi[t]||new M,Zi[t].set(e),k(t),Zi[t]):(delete Zi[t],
null);
}
function b(t){
var e;
if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return Ii;
if(!s(t)){
if(e=S(t))return e;
t=[t];
}
return w(t);
}
function O(t,e){
var n=t.toLowerCase();
ji[n]=ji[n+"s"]=ji[e]=t;
}
function U(t){
return"string"==typeof t?ji[t]||ji[t.toLowerCase()]:void 0;
}
function W(t){
var e,n,i={};
for(n in t)u(t,n)&&(e=U(n),e&&(i[e]=t[n]));
return i;
}
function C(t,e){
return function(n){
return null!=n?(F(this,t,n),i.updateOffset(this,e),this):G(this,t);
};
}
function G(t,e){
return t._d["get"+(t._isUTC?"UTC":"")+e]();
}
function F(t,e,n){
return t._d["set"+(t._isUTC?"UTC":"")+e](n);
}
function P(t,e){
var n;
if("object"==typeof t)for(n in t)this.set(n,t[n]);else if(t=U(t),"function"==typeof this[t])return this[t](e);
return this;
}
function H(t,e,n){
var i=""+Math.abs(t),r=e-i.length,s=t>=0;
return(s?n?"+":"":"-")+Math.pow(10,Math.max(0,r)).toString().substr(1)+i;
}
function L(t,e,n,i){
var r=i;
"string"==typeof i&&(r=function(){
return this[i]();
}),t&&(qi[t]=r),e&&(qi[e[0]]=function(){
return H(r.apply(this,arguments),e[1],e[2]);
}),n&&(qi[n]=function(){
return this.localeData().ordinal(r.apply(this,arguments),t);
});
}
function x(t){
return t.match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");
}
function I(t){
var e,n,i=t.match(Ei);
for(e=0,n=i.length;n>e;e++)i[e]=qi[i[e]]?qi[i[e]]:x(i[e]);
return function(r){
var s="";
for(e=0;n>e;e++)s+=i[e]instanceof Function?i[e].call(r,t):i[e];
return s;
};
}
function A(t,e){
return t.isValid()?(e=z(e,t.localeData()),Vi[e]=Vi[e]||I(e),Vi[e](t)):t.localeData().invalidDate();
}
function z(t,e){
function n(t){
return e.longDateFormat(t)||t;
}
var i=5;
for(Ni.lastIndex=0;i>=0&&Ni.test(t);)t=t.replace(Ni,n),Ni.lastIndex=0,i-=1;
return t;
}
function Z(t){
return"function"==typeof t&&"[object Function]"===Object.prototype.toString.call(t);
}
function j(t,e,n){
or[t]=Z(e)?e:function(t){
return t&&n?n:e;
};
}
function E(t,e){
return u(or,t)?or[t](e._strict,e._locale):new RegExp(N(t));
}
function N(t){
return t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,i,r){
return e||n||i||r;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");
}
function V(t,e){
var n,i=e;
for("string"==typeof t&&(t=[t]),"number"==typeof e&&(i=function(t,n){
n[e]=D(t);
}),n=0;n<t.length;n++)ur[t[n]]=i;
}
function q(t,e){
V(t,function(t,n,i,r){
i._w=i._w||{},e(t,i._w,i,r);
});
}
function J(t,e,n){
null!=e&&u(ur,t)&&ur[t](e,n._a,n,t);
}
function $(t,e){
return new Date(Date.UTC(t,e+1,0)).getUTCDate();
}
function R(t){
return this._months[t.month()];
}
function B(t){
return this._monthsShort[t.month()];
}
function Q(t,e,n){
var i,r,s;
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),
i=0;12>i;i++){
if(r=l([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(r,"").replace(".","")+"$","i"),
this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(r,"").replace(".","")+"$","i")),
n||this._monthsParse[i]||(s="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[i]=new RegExp(s.replace(".",""),"i")),
n&&"MMMM"===e&&this._longMonthsParse[i].test(t))return i;
if(n&&"MMM"===e&&this._shortMonthsParse[i].test(t))return i;
if(!n&&this._monthsParse[i].test(t))return i;
}
}
function X(t,e){
var n;
return"string"==typeof e&&(e=t.localeData().monthsParse(e),"number"!=typeof e)?t:(n=Math.min(t.date(),$(t.year(),e)),
t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,n),t);
}
function K(t){
return null!=t?(X(this,t),i.updateOffset(this,!0),this):G(this,"Month");
}
function te(){
return $(this.year(),this.month());
}
function ee(t){
var e,n=t._a;
return n&&-2===h(t).overflow&&(e=n[lr]<0||n[lr]>11?lr:n[cr]<1||n[cr]>$(n[dr],n[lr])?cr:n[hr]<0||n[hr]>24||24===n[hr]&&(0!==n[fr]||0!==n[mr]||0!==n[_r])?hr:n[fr]<0||n[fr]>59?fr:n[mr]<0||n[mr]>59?mr:n[_r]<0||n[_r]>999?_r:-1,
h(t)._overflowDayOfYear&&(dr>e||e>cr)&&(e=cr),h(t).overflow=e),t;
}
function ne(t){
i.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t);
}
function ie(t,e){
var n=!0;
return d(function(){
return n&&(ne(t+"\n"+(new Error).stack),n=!1),e.apply(this,arguments);
},e);
}
function re(t,e){
gr[t]||(ne(e),gr[t]=!0);
}
function se(t){
var e,n,i=t._i,r=Dr.exec(i);
if(r){
for(h(t).iso=!0,e=0,n=vr.length;n>e;e++)if(vr[e][1].exec(i)){
t._f=vr[e][0];
break;
}
for(e=0,n=Mr.length;n>e;e++)if(Mr[e][1].exec(i)){
t._f+=(r[6]||" ")+Mr[e][0];
break;
}
i.match(rr)&&(t._f+="Z"),Se(t);
}else t._isValid=!1;
}
function ae(t){
var e=Yr.exec(t._i);
return null!==e?void(t._d=new Date(+e[1])):(se(t),void(t._isValid===!1&&(delete t._isValid,
i.createFromInputFallback(t))));
}
function oe(t,e,n,i,r,s,a){
var o=new Date(t,e,n,i,r,s,a);
return 1970>t&&o.setFullYear(t),o;
}
function ue(t){
var e=new Date(Date.UTC.apply(null,arguments));
return 1970>t&&e.setUTCFullYear(t),e;
}
function de(t){
return le(t)?366:365;
}
function le(t){
return t%4===0&&t%100!==0||t%400===0;
}
function ce(){
return le(this.year());
}
function he(t,e,n){
var i,r=n-e,s=n-t.day();
return s>r&&(s-=7),r-7>s&&(s+=7),i=Ge(t).add(s,"d"),{
week:Math.ceil(i.dayOfYear()/7),
year:i.year()
};
}
function fe(t){
return he(t,this._week.dow,this._week.doy).week;
}
function me(){
return this._week.dow;
}
function _e(){
return this._week.doy;
}
function ye(t){
var e=this.localeData().week(this);
return null==t?e:this.add(7*(t-e),"d");
}
function pe(t){
var e=he(this,1,4).week;
return null==t?e:this.add(7*(t-e),"d");
}
function ge(t,e,n,i,r){
var s,a=6+r-i,o=ue(t,0,1+a),u=o.getUTCDay();
return r>u&&(u+=7),n=null!=n?1*n:r,s=1+a+7*(e-1)-u+n,{
year:s>0?t:t-1,
dayOfYear:s>0?s:de(t-1)+s
};
}
function De(t){
var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;
return null==t?e:this.add(t-e,"d");
}
function ve(t,e,n){
return null!=t?t:null!=e?e:n;
}
function Me(t){
var e=new Date;
return t._useUTC?[e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()]:[e.getFullYear(),e.getMonth(),e.getDate()];
}
function Ye(t){
var e,n,i,r,s=[];
if(!t._d){
for(i=Me(t),t._w&&null==t._a[cr]&&null==t._a[lr]&&we(t),t._dayOfYear&&(r=ve(t._a[dr],i[dr]),
t._dayOfYear>de(r)&&(h(t)._overflowDayOfYear=!0),n=ue(r,0,t._dayOfYear),t._a[lr]=n.getUTCMonth(),
t._a[cr]=n.getUTCDate()),e=0;3>e&&null==t._a[e];++e)t._a[e]=s[e]=i[e];
for(;7>e;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];
24===t._a[hr]&&0===t._a[fr]&&0===t._a[mr]&&0===t._a[_r]&&(t._nextDay=!0,t._a[hr]=0),
t._d=(t._useUTC?ue:oe).apply(null,s),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),
t._nextDay&&(t._a[hr]=24);
}
}
function we(t){
var e,n,i,r,s,a,o;
e=t._w,null!=e.GG||null!=e.W||null!=e.E?(s=1,a=4,n=ve(e.GG,t._a[dr],he(Ge(),1,4).year),
i=ve(e.W,1),r=ve(e.E,1)):(s=t._locale._week.dow,a=t._locale._week.doy,n=ve(e.gg,t._a[dr],he(Ge(),s,a).year),
i=ve(e.w,1),null!=e.d?(r=e.d,s>r&&++i):r=null!=e.e?e.e+s:s),o=ge(n,i,r,a,s),t._a[dr]=o.year,
t._dayOfYear=o.dayOfYear;
}
function Se(t){
if(t._f===i.ISO_8601)return void se(t);
t._a=[],h(t).empty=!0;
var e,n,r,s,a,o=""+t._i,u=o.length,d=0;
for(r=z(t._f,t._locale).match(Ei)||[],e=0;e<r.length;e++)s=r[e],n=(o.match(E(s,t))||[])[0],
n&&(a=o.substr(0,o.indexOf(n)),a.length>0&&h(t).unusedInput.push(a),o=o.slice(o.indexOf(n)+n.length),
d+=n.length),qi[s]?(n?h(t).empty=!1:h(t).unusedTokens.push(s),J(s,n,t)):t._strict&&!n&&h(t).unusedTokens.push(s);
h(t).charsLeftOver=u-d,o.length>0&&h(t).unusedInput.push(o),h(t).bigHour===!0&&t._a[hr]<=12&&t._a[hr]>0&&(h(t).bigHour=void 0),
t._a[hr]=ke(t._locale,t._a[hr],t._meridiem),Ye(t),ee(t);
}
function ke(t,e,n){
var i;
return null==n?e:null!=t.meridiemHour?t.meridiemHour(e,n):null!=t.isPM?(i=t.isPM(n),
i&&12>e&&(e+=12),i||12!==e||(e=0),e):e;
}
function Te(t){
var e,n,i,r,s;
if(0===t._f.length)return h(t).invalidFormat=!0,void(t._d=new Date(0/0));
for(r=0;r<t._f.length;r++)s=0,e=_({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[r],
Se(e),f(e)&&(s+=h(e).charsLeftOver,s+=10*h(e).unusedTokens.length,h(e).score=s,(null==i||i>s)&&(i=s,
n=e));
d(t,n||e);
}
function be(t){
if(!t._d){
var e=W(t._i);
t._a=[e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],Ye(t);
}
}
function Oe(t){
var e=new y(ee(Ue(t)));
return e._nextDay&&(e.add(1,"d"),e._nextDay=void 0),e;
}
function Ue(t){
var e=t._i,n=t._f;
return t._locale=t._locale||b(t._l),null===e||void 0===n&&""===e?m({
nullInput:!0
}):("string"==typeof e&&(t._i=e=t._locale.preparse(e)),p(e)?new y(ee(e)):(s(n)?Te(t):n?Se(t):a(e)?t._d=e:We(t),
t));
}
function We(t){
var e=t._i;
void 0===e?t._d=new Date:a(e)?t._d=new Date(+e):"string"==typeof e?ae(t):s(e)?(t._a=o(e.slice(0),function(t){
return parseInt(t,10);
}),Ye(t)):"object"==typeof e?be(t):"number"==typeof e?t._d=new Date(e):i.createFromInputFallback(t);
}
function Ce(t,e,n,i,r){
var s={};
return"boolean"==typeof n&&(i=n,n=void 0),s._isAMomentObject=!0,s._useUTC=s._isUTC=r,
s._l=n,s._i=t,s._f=e,s._strict=i,Oe(s);
}
function Ge(t,e,n,i){
return Ce(t,e,n,i,!1);
}
function Fe(t,e){
var n,i;
if(1===e.length&&s(e[0])&&(e=e[0]),!e.length)return Ge();
for(n=e[0],i=1;i<e.length;++i)(!e[i].isValid()||e[i][t](n))&&(n=e[i]);
return n;
}
function Pe(){
var t=[].slice.call(arguments,0);
return Fe("isBefore",t);
}
function He(){
var t=[].slice.call(arguments,0);
return Fe("isAfter",t);
}
function Le(t){
var e=W(t),n=e.year||0,i=e.quarter||0,r=e.month||0,s=e.week||0,a=e.day||0,o=e.hour||0,u=e.minute||0,d=e.second||0,l=e.millisecond||0;
this._milliseconds=+l+1e3*d+6e4*u+36e5*o,this._days=+a+7*s,this._months=+r+3*i+12*n,
this._data={},this._locale=b(),this._bubble();
}
function xe(t){
return t instanceof Le;
}
function Ie(t,e){
L(t,0,0,function(){
var t=this.utcOffset(),n="+";
return 0>t&&(t=-t,n="-"),n+H(~~(t/60),2)+e+H(~~t%60,2);
});
}
function Ae(t){
var e=(t||"").match(rr)||[],n=e[e.length-1]||[],i=(n+"").match(br)||["-",0,0],r=+(60*i[1])+D(i[2]);
return"+"===i[0]?r:-r;
}
function ze(t,e){
var n,r;
return e._isUTC?(n=e.clone(),r=(p(t)||a(t)?+t:+Ge(t))-+n,n._d.setTime(+n._d+r),i.updateOffset(n,!1),
n):Ge(t).local();
}
function Ze(t){
return 15*-Math.round(t._d.getTimezoneOffset()/15);
}
function je(t,e){
var n,r=this._offset||0;
return null!=t?("string"==typeof t&&(t=Ae(t)),Math.abs(t)<16&&(t=60*t),!this._isUTC&&e&&(n=Ze(this)),
this._offset=t,this._isUTC=!0,null!=n&&this.add(n,"m"),r!==t&&(!e||this._changeInProgress?sn(this,Ke(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,
i.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?r:Ze(this);
}
function Ee(t,e){
return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset();
}
function Ne(t){
return this.utcOffset(0,t);
}
function Ve(t){
return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(Ze(this),"m")),
this;
}
function qe(){
return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ae(this._i)),
this;
}
function Je(t){
return t=t?Ge(t).utcOffset():0,(this.utcOffset()-t)%60===0;
}
function $e(){
return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset();
}
function Re(){
if("undefined"!=typeof this._isDSTShifted)return this._isDSTShifted;
var t={};
if(_(t,this),t=Ue(t),t._a){
var e=t._isUTC?l(t._a):Ge(t._a);
this._isDSTShifted=this.isValid()&&v(t._a,e.toArray())>0;
}else this._isDSTShifted=!1;
return this._isDSTShifted;
}
function Be(){
return!this._isUTC;
}
function Qe(){
return this._isUTC;
}
function Xe(){
return this._isUTC&&0===this._offset;
}
function Ke(t,e){
var n,i,r,s=t,a=null;
return xe(t)?s={
ms:t._milliseconds,
d:t._days,
M:t._months
}:"number"==typeof t?(s={},e?s[e]=t:s.milliseconds=t):(a=Or.exec(t))?(n="-"===a[1]?-1:1,
s={
y:0,
d:D(a[cr])*n,
h:D(a[hr])*n,
m:D(a[fr])*n,
s:D(a[mr])*n,
ms:D(a[_r])*n
}):(a=Ur.exec(t))?(n="-"===a[1]?-1:1,s={
y:tn(a[2],n),
M:tn(a[3],n),
d:tn(a[4],n),
h:tn(a[5],n),
m:tn(a[6],n),
s:tn(a[7],n),
w:tn(a[8],n)
}):null==s?s={}:"object"==typeof s&&("from"in s||"to"in s)&&(r=nn(Ge(s.from),Ge(s.to)),
s={},s.ms=r.milliseconds,s.M=r.months),i=new Le(s),xe(t)&&u(t,"_locale")&&(i._locale=t._locale),
i;
}
function tn(t,e){
var n=t&&parseFloat(t.replace(",","."));
return(isNaN(n)?0:n)*e;
}
function en(t,e){
var n={
milliseconds:0,
months:0
};
return n.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(n.months,"M").isAfter(e)&&--n.months,
n.milliseconds=+e-+t.clone().add(n.months,"M"),n;
}
function nn(t,e){
var n;
return e=ze(e,t),t.isBefore(e)?n=en(t,e):(n=en(e,t),n.milliseconds=-n.milliseconds,
n.months=-n.months),n;
}
function rn(t,e){
return function(n,i){
var r,s;
return null===i||isNaN(+i)||(re(e,"moment()."+e+"(period, number) is deprecated. Please use moment()."+e+"(number, period)."),
s=n,n=i,i=s),n="string"==typeof n?+n:n,r=Ke(n,i),sn(this,r,t),this;
};
}
function sn(t,e,n,r){
var s=e._milliseconds,a=e._days,o=e._months;
r=null==r?!0:r,s&&t._d.setTime(+t._d+s*n),a&&F(t,"Date",G(t,"Date")+a*n),o&&X(t,G(t,"Month")+o*n),
r&&i.updateOffset(t,a||o);
}
function an(t,e){
var n=t||Ge(),i=ze(n,this).startOf("day"),r=this.diff(i,"days",!0),s=-6>r?"sameElse":-1>r?"lastWeek":0>r?"lastDay":1>r?"sameDay":2>r?"nextDay":7>r?"nextWeek":"sameElse";
return this.format(e&&e[s]||this.localeData().calendar(s,this,Ge(n)));
}
function on(){
return new y(this);
}
function un(t,e){
var n;
return e=U("undefined"!=typeof e?e:"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),
+this>+t):(n=p(t)?+t:+Ge(t),n<+this.clone().startOf(e));
}
function dn(t,e){
var n;
return e=U("undefined"!=typeof e?e:"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),
+t>+this):(n=p(t)?+t:+Ge(t),+this.clone().endOf(e)<n);
}
function ln(t,e,n){
return this.isAfter(t,n)&&this.isBefore(e,n);
}
function cn(t,e){
var n;
return e=U(e||"millisecond"),"millisecond"===e?(t=p(t)?t:Ge(t),+this===+t):(n=+Ge(t),
+this.clone().startOf(e)<=n&&n<=+this.clone().endOf(e));
}
function hn(t,e,n){
var i,r,s=ze(t,this),a=6e4*(s.utcOffset()-this.utcOffset());
return e=U(e),"year"===e||"month"===e||"quarter"===e?(r=fn(this,s),"quarter"===e?r/=3:"year"===e&&(r/=12)):(i=this-s,
r="second"===e?i/1e3:"minute"===e?i/6e4:"hour"===e?i/36e5:"day"===e?(i-a)/864e5:"week"===e?(i-a)/6048e5:i),
n?r:g(r);
}
function fn(t,e){
var n,i,r=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(r,"months");
return 0>e-s?(n=t.clone().add(r-1,"months"),i=(e-s)/(s-n)):(n=t.clone().add(r+1,"months"),
i=(e-s)/(n-s)),-(r+i);
}
function mn(){
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function _n(){
var t=this.clone().utc();
return 0<t.year()&&t.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():A(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):A(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function yn(t){
var e=A(this,t||i.defaultFormat);
return this.localeData().postformat(e);
}
function pn(t,e){
return this.isValid()?Ke({
to:this,
from:t
}).locale(this.locale()).humanize(!e):this.localeData().invalidDate();
}
function gn(t){
return this.from(Ge(),t);
}
function Dn(t,e){
return this.isValid()?Ke({
from:this,
to:t
}).locale(this.locale()).humanize(!e):this.localeData().invalidDate();
}
function vn(t){
return this.to(Ge(),t);
}
function Mn(t){
var e;
return void 0===t?this._locale._abbr:(e=b(t),null!=e&&(this._locale=e),this);
}
function Yn(){
return this._locale;
}
function wn(t){
switch(t=U(t)){
case"year":
this.month(0);

case"quarter":
case"month":
this.date(1);

case"week":
case"isoWeek":
case"day":
this.hours(0);

case"hour":
this.minutes(0);

case"minute":
this.seconds(0);

case"second":
this.milliseconds(0);
}
return"week"===t&&this.weekday(0),"isoWeek"===t&&this.isoWeekday(1),"quarter"===t&&this.month(3*Math.floor(this.month()/3)),
this;
}
function Sn(t){
return t=U(t),void 0===t||"millisecond"===t?this:this.startOf(t).add(1,"isoWeek"===t?"week":t).subtract(1,"ms");
}
function kn(){
return+this._d-6e4*(this._offset||0);
}
function Tn(){
return Math.floor(+this/1e3);
}
function bn(){
return this._offset?new Date(+this):this._d;
}
function On(){
var t=this;
return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()];
}
function Un(){
var t=this;
return{
years:t.year(),
months:t.month(),
date:t.date(),
hours:t.hours(),
minutes:t.minutes(),
seconds:t.seconds(),
milliseconds:t.milliseconds()
};
}
function Wn(){
return f(this);
}
function Cn(){
return d({},h(this));
}
function Gn(){
return h(this).overflow;
}
function Fn(t,e){
L(0,[t,t.length],0,e);
}
function Pn(t,e,n){
return he(Ge([t,11,31+e-n]),e,n).week;
}
function Hn(t){
var e=he(this,this.localeData()._week.dow,this.localeData()._week.doy).year;
return null==t?e:this.add(t-e,"y");
}
function Ln(t){
var e=he(this,1,4).year;
return null==t?e:this.add(t-e,"y");
}
function xn(){
return Pn(this.year(),1,4);
}
function In(){
var t=this.localeData()._week;
return Pn(this.year(),t.dow,t.doy);
}
function An(t){
return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3);
}
function zn(t,e){
return"string"!=typeof t?t:isNaN(t)?(t=e.weekdaysParse(t),"number"==typeof t?t:null):parseInt(t,10);
}
function Zn(t){
return this._weekdays[t.day()];
}
function jn(t){
return this._weekdaysShort[t.day()];
}
function En(t){
return this._weekdaysMin[t.day()];
}
function Nn(t){
var e,n,i;
for(this._weekdaysParse=this._weekdaysParse||[],e=0;7>e;e++)if(this._weekdaysParse[e]||(n=Ge([2e3,1]).day(e),
i="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),
this._weekdaysParse[e]=new RegExp(i.replace(".",""),"i")),this._weekdaysParse[e].test(t))return e;
}
function Vn(t){
var e=this._isUTC?this._d.getUTCDay():this._d.getDay();
return null!=t?(t=zn(t,this.localeData()),this.add(t-e,"d")):e;
}
function qn(t){
var e=(this.day()+7-this.localeData()._week.dow)%7;
return null==t?e:this.add(t-e,"d");
}
function Jn(t){
return null==t?this.day()||7:this.day(this.day()%7?t:t-7);
}
function $n(t,e){
L(t,0,0,function(){
return this.localeData().meridiem(this.hours(),this.minutes(),e);
});
}
function Rn(t,e){
return e._meridiemParse;
}
function Bn(t){
return"p"===(t+"").toLowerCase().charAt(0);
}
function Qn(t,e,n){
return t>11?n?"pm":"PM":n?"am":"AM";
}
function Xn(t,e){
e[_r]=D(1e3*("0."+t));
}
function Kn(){
return this._isUTC?"UTC":"";
}
function ti(){
return this._isUTC?"Coordinated Universal Time":"";
}
function ei(t){
return Ge(1e3*t);
}
function ni(){
return Ge.apply(null,arguments).parseZone();
}
function ii(t,e,n){
var i=this._calendar[t];
return"function"==typeof i?i.call(e,n):i;
}
function ri(t){
var e=this._longDateFormat[t],n=this._longDateFormat[t.toUpperCase()];
return e||!n?e:(this._longDateFormat[t]=n.replace(/MMMM|MM|DD|dddd/g,function(t){
return t.slice(1);
}),this._longDateFormat[t]);
}
function si(){
return this._invalidDate;
}
function ai(t){
return this._ordinal.replace("%d",t);
}
function oi(t){
return t;
}
function ui(t,e,n,i){
var r=this._relativeTime[n];
return"function"==typeof r?r(t,e,n,i):r.replace(/%d/i,t);
}
function di(t,e){
var n=this._relativeTime[t>0?"future":"past"];
return"function"==typeof n?n(e):n.replace(/%s/i,e);
}
function li(t){
var e,n;
for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e;
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source);
}
function ci(t,e,n,i){
var r=b(),s=l().set(i,e);
return r[n](s,t);
}
function hi(t,e,n,i,r){
if("number"==typeof t&&(e=t,t=void 0),t=t||"",null!=e)return ci(t,e,n,r);
var s,a=[];
for(s=0;i>s;s++)a[s]=ci(t,s,n,r);
return a;
}
function fi(t,e){
return hi(t,e,"months",12,"month");
}
function mi(t,e){
return hi(t,e,"monthsShort",12,"month");
}
function _i(t,e){
return hi(t,e,"weekdays",7,"day");
}
function yi(t,e){
return hi(t,e,"weekdaysShort",7,"day");
}
function pi(t,e){
return hi(t,e,"weekdaysMin",7,"day");
}
function gi(){
var t=this._data;
return this._milliseconds=Xr(this._milliseconds),this._days=Xr(this._days),this._months=Xr(this._months),
t.milliseconds=Xr(t.milliseconds),t.seconds=Xr(t.seconds),t.minutes=Xr(t.minutes),
t.hours=Xr(t.hours),t.months=Xr(t.months),t.years=Xr(t.years),this;
}
function Di(t,e,n,i){
var r=Ke(e,n);
return t._milliseconds+=i*r._milliseconds,t._days+=i*r._days,t._months+=i*r._months,
t._bubble();
}
function vi(t,e){
return Di(this,t,e,1);
}
function Mi(t,e){
return Di(this,t,e,-1);
}
function Yi(t){
return 0>t?Math.floor(t):Math.ceil(t);
}
function wi(){
var t,e,n,i,r,s=this._milliseconds,a=this._days,o=this._months,u=this._data;
return s>=0&&a>=0&&o>=0||0>=s&&0>=a&&0>=o||(s+=864e5*Yi(ki(o)+a),a=0,o=0),u.milliseconds=s%1e3,
t=g(s/1e3),u.seconds=t%60,e=g(t/60),u.minutes=e%60,n=g(e/60),u.hours=n%24,a+=g(n/24),
r=g(Si(a)),o+=r,a-=Yi(ki(r)),i=g(o/12),o%=12,u.days=a,u.months=o,u.years=i,this;
}
function Si(t){
return 4800*t/146097;
}
function ki(t){
return 146097*t/4800;
}
function Ti(t){
var e,n,i=this._milliseconds;
if(t=U(t),"month"===t||"year"===t)return e=this._days+i/864e5,n=this._months+Si(e),
"month"===t?n:n/12;
switch(e=this._days+Math.round(ki(this._months)),t){
case"week":
return e/7+i/6048e5;

case"day":
return e+i/864e5;

case"hour":
return 24*e+i/36e5;

case"minute":
return 1440*e+i/6e4;

case"second":
return 86400*e+i/1e3;

case"millisecond":
return Math.floor(864e5*e)+i;

default:
throw new Error("Unknown unit "+t);
}
}
function bi(){
return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*D(this._months/12);
}
function Oi(t){
return function(){
return this.as(t);
};
}
function Ui(t){
return t=U(t),this[t+"s"]();
}
function Wi(t){
return function(){
return this._data[t];
};
}
function Ci(){
return g(this.days()/7);
}
function Gi(t,e,n,i,r){
return r.relativeTime(e||1,!!n,t,i);
}
function Fi(t,e,n){
var i=Ke(t).abs(),r=ms(i.as("s")),s=ms(i.as("m")),a=ms(i.as("h")),o=ms(i.as("d")),u=ms(i.as("M")),d=ms(i.as("y")),l=r<_s.s&&["s",r]||1===s&&["m"]||s<_s.m&&["mm",s]||1===a&&["h"]||a<_s.h&&["hh",a]||1===o&&["d"]||o<_s.d&&["dd",o]||1===u&&["M"]||u<_s.M&&["MM",u]||1===d&&["y"]||["yy",d];
return l[2]=e,l[3]=+t>0,l[4]=n,Gi.apply(null,l);
}
function Pi(t,e){
return void 0===_s[t]?!1:void 0===e?_s[t]:(_s[t]=e,!0);
}
function Hi(t){
var e=this.localeData(),n=Fi(this,!t,e);
return t&&(n=e.pastFuture(+this,n)),e.postformat(n);
}
function Li(){
var t,e,n,i=ys(this._milliseconds)/1e3,r=ys(this._days),s=ys(this._months);
t=g(i/60),e=g(t/60),i%=60,t%=60,n=g(s/12),s%=12;
var a=n,o=s,u=r,d=e,l=t,c=i,h=this.asSeconds();
return h?(0>h?"-":"")+"P"+(a?a+"Y":"")+(o?o+"M":"")+(u?u+"D":"")+(d||l||c?"T":"")+(d?d+"H":"")+(l?l+"M":"")+(c?c+"S":""):"P0D";
}
var xi,Ii,Ai=i.momentProperties=[],zi=!1,Zi={},ji={},Ei=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Ni=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Vi={},qi={},Ji=/\d/,$i=/\d\d/,Ri=/\d{3}/,Bi=/\d{4}/,Qi=/[+-]?\d{6}/,Xi=/\d\d?/,Ki=/\d{1,3}/,tr=/\d{1,4}/,er=/[+-]?\d{1,6}/,nr=/\d+/,ir=/[+-]?\d+/,rr=/Z|[+-]\d\d:?\d\d/gi,sr=/[+-]?\d+(\.\d{1,3})?/,ar=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,or={},ur={},dr=0,lr=1,cr=2,hr=3,fr=4,mr=5,_r=6;
L("M",["MM",2],"Mo",function(){
return this.month()+1;
}),L("MMM",0,0,function(t){
return this.localeData().monthsShort(this,t);
}),L("MMMM",0,0,function(t){
return this.localeData().months(this,t);
}),O("month","M"),j("M",Xi),j("MM",Xi,$i),j("MMM",ar),j("MMMM",ar),V(["M","MM"],function(t,e){
e[lr]=D(t)-1;
}),V(["MMM","MMMM"],function(t,e,n,i){
var r=n._locale.monthsParse(t,i,n._strict);
null!=r?e[lr]=r:h(n).invalidMonth=t;
});
var yr="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),pr="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),gr={};
i.suppressDeprecationWarnings=!1;
var Dr=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,vr=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Mr=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Yr=/^\/?Date\((\-?\d+)/i;
i.createFromInputFallback=ie("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(t){
t._d=new Date(t._i+(t._useUTC?" UTC":""));
}),L(0,["YY",2],0,function(){
return this.year()%100;
}),L(0,["YYYY",4],0,"year"),L(0,["YYYYY",5],0,"year"),L(0,["YYYYYY",6,!0],0,"year"),
O("year","y"),j("Y",ir),j("YY",Xi,$i),j("YYYY",tr,Bi),j("YYYYY",er,Qi),j("YYYYYY",er,Qi),
V(["YYYYY","YYYYYY"],dr),V("YYYY",function(t,e){
e[dr]=2===t.length?i.parseTwoDigitYear(t):D(t);
}),V("YY",function(t,e){
e[dr]=i.parseTwoDigitYear(t);
}),i.parseTwoDigitYear=function(t){
return D(t)+(D(t)>68?1900:2e3);
};
var wr=C("FullYear",!1);
L("w",["ww",2],"wo","week"),L("W",["WW",2],"Wo","isoWeek"),O("week","w"),O("isoWeek","W"),
j("w",Xi),j("ww",Xi,$i),j("W",Xi),j("WW",Xi,$i),q(["w","ww","W","WW"],function(t,e,n,i){
e[i.substr(0,1)]=D(t);
});
var Sr={
dow:0,
doy:6
};
L("DDD",["DDDD",3],"DDDo","dayOfYear"),O("dayOfYear","DDD"),j("DDD",Ki),j("DDDD",Ri),
V(["DDD","DDDD"],function(t,e,n){
n._dayOfYear=D(t);
}),i.ISO_8601=function(){};
var kr=ie("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){
var t=Ge.apply(null,arguments);
return this>t?this:t;
}),Tr=ie("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){
var t=Ge.apply(null,arguments);
return t>this?this:t;
});
Ie("Z",":"),Ie("ZZ",""),j("Z",rr),j("ZZ",rr),V(["Z","ZZ"],function(t,e,n){
n._useUTC=!0,n._tzm=Ae(t);
});
var br=/([\+\-]|\d\d)/gi;
i.updateOffset=function(){};
var Or=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ur=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
Ke.fn=Le.prototype;
var Wr=rn(1,"add"),Cr=rn(-1,"subtract");
i.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";
var Gr=ie("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){
return void 0===t?this.localeData():this.locale(t);
});
L(0,["gg",2],0,function(){
return this.weekYear()%100;
}),L(0,["GG",2],0,function(){
return this.isoWeekYear()%100;
}),Fn("gggg","weekYear"),Fn("ggggg","weekYear"),Fn("GGGG","isoWeekYear"),Fn("GGGGG","isoWeekYear"),
O("weekYear","gg"),O("isoWeekYear","GG"),j("G",ir),j("g",ir),j("GG",Xi,$i),j("gg",Xi,$i),
j("GGGG",tr,Bi),j("gggg",tr,Bi),j("GGGGG",er,Qi),j("ggggg",er,Qi),q(["gggg","ggggg","GGGG","GGGGG"],function(t,e,n,i){
e[i.substr(0,2)]=D(t);
}),q(["gg","GG"],function(t,e,n,r){
e[r]=i.parseTwoDigitYear(t);
}),L("Q",0,0,"quarter"),O("quarter","Q"),j("Q",Ji),V("Q",function(t,e){
e[lr]=3*(D(t)-1);
}),L("D",["DD",2],"Do","date"),O("date","D"),j("D",Xi),j("DD",Xi,$i),j("Do",function(t,e){
return t?e._ordinalParse:e._ordinalParseLenient;
}),V(["D","DD"],cr),V("Do",function(t,e){
e[cr]=D(t.match(Xi)[0],10);
});
var Fr=C("Date",!0);
L("d",0,"do","day"),L("dd",0,0,function(t){
return this.localeData().weekdaysMin(this,t);
}),L("ddd",0,0,function(t){
return this.localeData().weekdaysShort(this,t);
}),L("dddd",0,0,function(t){
return this.localeData().weekdays(this,t);
}),L("e",0,0,"weekday"),L("E",0,0,"isoWeekday"),O("day","d"),O("weekday","e"),O("isoWeekday","E"),
j("d",Xi),j("e",Xi),j("E",Xi),j("dd",ar),j("ddd",ar),j("dddd",ar),q(["dd","ddd","dddd"],function(t,e,n){
var i=n._locale.weekdaysParse(t);
null!=i?e.d=i:h(n).invalidWeekday=t;
}),q(["d","e","E"],function(t,e,n,i){
e[i]=D(t);
});
var Pr="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Hr="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Lr="Su_Mo_Tu_We_Th_Fr_Sa".split("_");
L("H",["HH",2],0,"hour"),L("h",["hh",2],0,function(){
return this.hours()%12||12;
}),$n("a",!0),$n("A",!1),O("hour","h"),j("a",Rn),j("A",Rn),j("H",Xi),j("h",Xi),j("HH",Xi,$i),
j("hh",Xi,$i),V(["H","HH"],hr),V(["a","A"],function(t,e,n){
n._isPm=n._locale.isPM(t),n._meridiem=t;
}),V(["h","hh"],function(t,e,n){
e[hr]=D(t),h(n).bigHour=!0;
});
var xr=/[ap]\.?m?\.?/i,Ir=C("Hours",!0);
L("m",["mm",2],0,"minute"),O("minute","m"),j("m",Xi),j("mm",Xi,$i),V(["m","mm"],fr);
var Ar=C("Minutes",!1);
L("s",["ss",2],0,"second"),O("second","s"),j("s",Xi),j("ss",Xi,$i),V(["s","ss"],mr);
var zr=C("Seconds",!1);
L("S",0,0,function(){
return~~(this.millisecond()/100);
}),L(0,["SS",2],0,function(){
return~~(this.millisecond()/10);
}),L(0,["SSS",3],0,"millisecond"),L(0,["SSSS",4],0,function(){
return 10*this.millisecond();
}),L(0,["SSSSS",5],0,function(){
return 100*this.millisecond();
}),L(0,["SSSSSS",6],0,function(){
return 1e3*this.millisecond();
}),L(0,["SSSSSSS",7],0,function(){
return 1e4*this.millisecond();
}),L(0,["SSSSSSSS",8],0,function(){
return 1e5*this.millisecond();
}),L(0,["SSSSSSSSS",9],0,function(){
return 1e6*this.millisecond();
}),O("millisecond","ms"),j("S",Ki,Ji),j("SS",Ki,$i),j("SSS",Ki,Ri);
var Zr;
for(Zr="SSSS";Zr.length<=9;Zr+="S")j(Zr,nr);
for(Zr="S";Zr.length<=9;Zr+="S")V(Zr,Xn);
var jr=C("Milliseconds",!1);
L("z",0,0,"zoneAbbr"),L("zz",0,0,"zoneName");
var Er=y.prototype;
Er.add=Wr,Er.calendar=an,Er.clone=on,Er.diff=hn,Er.endOf=Sn,Er.format=yn,Er.from=pn,
Er.fromNow=gn,Er.to=Dn,Er.toNow=vn,Er.get=P,Er.invalidAt=Gn,Er.isAfter=un,Er.isBefore=dn,
Er.isBetween=ln,Er.isSame=cn,Er.isValid=Wn,Er.lang=Gr,Er.locale=Mn,Er.localeData=Yn,
Er.max=Tr,Er.min=kr,Er.parsingFlags=Cn,Er.set=P,Er.startOf=wn,Er.subtract=Cr,Er.toArray=On,
Er.toObject=Un,Er.toDate=bn,Er.toISOString=_n,Er.toJSON=_n,Er.toString=mn,Er.unix=Tn,
Er.valueOf=kn,Er.year=wr,Er.isLeapYear=ce,Er.weekYear=Hn,Er.isoWeekYear=Ln,Er.quarter=Er.quarters=An,
Er.month=K,Er.daysInMonth=te,Er.week=Er.weeks=ye,Er.isoWeek=Er.isoWeeks=pe,Er.weeksInYear=In,
Er.isoWeeksInYear=xn,Er.date=Fr,Er.day=Er.days=Vn,Er.weekday=qn,Er.isoWeekday=Jn,
Er.dayOfYear=De,Er.hour=Er.hours=Ir,Er.minute=Er.minutes=Ar,Er.second=Er.seconds=zr,
Er.millisecond=Er.milliseconds=jr,Er.utcOffset=je,Er.utc=Ne,Er.local=Ve,Er.parseZone=qe,
Er.hasAlignedHourOffset=Je,Er.isDST=$e,Er.isDSTShifted=Re,Er.isLocal=Be,Er.isUtcOffset=Qe,
Er.isUtc=Xe,Er.isUTC=Xe,Er.zoneAbbr=Kn,Er.zoneName=ti,Er.dates=ie("dates accessor is deprecated. Use date instead.",Fr),
Er.months=ie("months accessor is deprecated. Use month instead",K),Er.years=ie("years accessor is deprecated. Use year instead",wr),
Er.zone=ie("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ee);
var Nr=Er,Vr={
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},qr={
LTS:"h:mm:ss A",
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY h:mm A",
LLLL:"dddd, MMMM D, YYYY h:mm A"
},Jr="Invalid date",$r="%d",Rr=/\d{1,2}/,Br={
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},Qr=M.prototype;
Qr._calendar=Vr,Qr.calendar=ii,Qr._longDateFormat=qr,Qr.longDateFormat=ri,Qr._invalidDate=Jr,
Qr.invalidDate=si,Qr._ordinal=$r,Qr.ordinal=ai,Qr._ordinalParse=Rr,Qr.preparse=oi,
Qr.postformat=oi,Qr._relativeTime=Br,Qr.relativeTime=ui,Qr.pastFuture=di,Qr.set=li,
Qr.months=R,Qr._months=yr,Qr.monthsShort=B,Qr._monthsShort=pr,Qr.monthsParse=Q,Qr.week=fe,
Qr._week=Sr,Qr.firstDayOfYear=_e,Qr.firstDayOfWeek=me,Qr.weekdays=Zn,Qr._weekdays=Pr,
Qr.weekdaysMin=En,Qr._weekdaysMin=Lr,Qr.weekdaysShort=jn,Qr._weekdaysShort=Hr,Qr.weekdaysParse=Nn,
Qr.isPM=Bn,Qr._meridiemParse=xr,Qr.meridiem=Qn,k("en",{
ordinalParse:/\d{1,2}(th|st|nd|rd)/,
ordinal:function(t){
var e=t%10,n=1===D(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th";
return t+n;
}
}),i.lang=ie("moment.lang is deprecated. Use moment.locale instead.",k),i.langData=ie("moment.langData is deprecated. Use moment.localeData instead.",b);
var Xr=Math.abs,Kr=Oi("ms"),ts=Oi("s"),es=Oi("m"),ns=Oi("h"),is=Oi("d"),rs=Oi("w"),ss=Oi("M"),as=Oi("y"),os=Wi("milliseconds"),us=Wi("seconds"),ds=Wi("minutes"),ls=Wi("hours"),cs=Wi("days"),hs=Wi("months"),fs=Wi("years"),ms=Math.round,_s={
s:45,
m:45,
h:22,
d:26,
M:11
},ys=Math.abs,ps=Le.prototype;
ps.abs=gi,ps.add=vi,ps.subtract=Mi,ps.as=Ti,ps.asMilliseconds=Kr,ps.asSeconds=ts,
ps.asMinutes=es,ps.asHours=ns,ps.asDays=is,ps.asWeeks=rs,ps.asMonths=ss,ps.asYears=as,
ps.valueOf=bi,ps._bubble=wi,ps.get=Ui,ps.milliseconds=os,ps.seconds=us,ps.minutes=ds,
ps.hours=ls,ps.days=cs,ps.weeks=Ci,ps.months=hs,ps.years=fs,ps.humanize=Hi,ps.toISOString=Li,
ps.toString=Li,ps.toJSON=Li,ps.locale=Mn,ps.localeData=Yn,ps.toIsoString=ie("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Li),
ps.lang=Gr,L("X",0,0,"unix"),L("x",0,0,"valueOf"),j("x",ir),j("X",sr),V("X",function(t,e,n){
n._d=new Date(1e3*parseFloat(t,10));
}),V("x",function(t,e,n){
n._d=new Date(D(t));
}),i.version="2.10.6",r(Ge),i.fn=Nr,i.min=Pe,i.max=He,i.utc=l,i.unix=ei,i.months=fi,
i.isDate=a,i.locale=k,i.invalid=m,i.duration=Ke,i.isMoment=p,i.weekdays=_i,i.parseZone=ni,
i.localeData=b,i.isDuration=xe,i.monthsShort=mi,i.weekdaysMin=pi,i.defineLocale=T,
i.weekdaysShort=yi,i.normalizeUnits=U,i.relativeTimeThreshold=Pi;
var gs=i;
return gs;
});