define("appmsg/without_iframe/video_appmsg.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","appmsg/without_iframe/video_appmsg.html.js","biz_common/utils/url/parse.js","appmsg/without_iframe/iframe_communicate.js","appmsg/without_iframe/video_plugin/video_tail.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","pages/qq_video_info.js","pages/video_plugin/pause_tips.js","pages/video_plugin/video_app.js","pages/video_ctrl.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
i("biz_common/utils/string/html.js");
var e=i("biz_common/tmpl.js"),t=i("appmsg/without_iframe/video_appmsg.html.js"),o=i("biz_common/utils/url/parse.js"),n=i("appmsg/without_iframe/iframe_communicate.js"),d=i("appmsg/without_iframe/video_plugin/video_tail.js"),s=i("biz_wap/utils/ajax.js"),a=i("biz_common/dom/event.js"),_=i("pages/qq_video_info.js"),r=i("pages/video_plugin/pause_tips.js"),m=i("pages/video_plugin/video_app.js"),p=i("pages/video_ctrl.js"),v=i("biz_wap/jsapi/core.js");
return function(){
function i(i,e){
var t=e||window.location.search,o=new RegExp("(^|&)"+i+"=([^&]*)(&|$)"),n=t.substr(t.indexOf("?")+1).match(o);
return null!=n?n[2]:"";
}
function c(i){
return document.querySelector("#js_mp_video_container_"+f.vid+" #"+i);
}
function u(){
f.ori_status=1*y.ori_status===1?1:1*y.ori_status===2?2:3,f.showComment=1*y.show_comment===1,
f.comment_id=y.comment_id,f.vid=y.vid,f.ckey=y.ckey,f.ckey_ad=y.ckey_ad,f.__biz=y.__biz,
f.uin=y.uin,f.mid=y.mid,f.idx=y.idx,f.scene=y.scene||i("scene",window.location.href)||0,
f.autoplay=!!f.container.getAttribute("__sec_open_auto_play__"),f.dom={
js_mpvedio:c("js_mpvedio_wrapper_"+f.vid),
page_content:c("page-content")
};
}
function w(){
var i=f.ratio;
y.vw&&y.vh&&(i=y.vw/y.vh);
var e=y.vw||f.dom.js_mpvedio.offsetWidth,t=Math.ceil(e/i),o=[],s=!1;
p.showPauseTips()&&!y.is_mp_video&&(o.push(new r),s=!0),s&&!y.is_mp_video&&o.push(new m),
o.push(new d({
vid:y.vid,
nickname:y.bizNickname,
headImg:y.roundHeadImg,
userName:y.username,
isAppMsg:!0,
cgiData:y,
reportData:{
BizUserName:y.__biz,
MsgId:1*y.mid,
Idx:1*y.idx,
EnterId:y.enterid,
VideoId:y.vid,
Scene:y.scene,
Subscene:1*y.subscene,
OrStatus:1*y.ori_status,
HitBizuin:1*y.hit_bizuin,
HitVid:y.hit_vid,
SessionIdStr:window.sessionid,
Url:window.location.href,
Device:window.devicetype
}
})),f.myPlayer=new _.mpVideoPlayer({
preview:!(1*y.preview!==1),
isInIframe:!0,
hit_bizuin:y.hit_bizuin,
hit_vid:y.hit_vid,
fromid:f.scene,
ori_status:f.ori_status,
is_mp_video:y.txvideo_vid?0:y.is_mp_video,
plugins:o,
oriVid:f.vid,
vid:y.txvideo_vid?y.txvideo_vid:f.vid,
ckey:y.txvideo_vid?"":f.ckey,
ckey_ad:f.ckey_ad,
width:e,
height:t,
container:"#js_mpvedio_wrapper_"+f.vid,
__biz:f.__biz,
uin:f.uin,
mid:f.mid,
idx:f.idx,
comment_id:f.comment_id,
scene_type:0,
autoplay:f.autoplay,
videoMd5:y.video_md5,
headImgUrl:window.round_head_img,
canShareVideo:!y.is_in_pay_subscribe,
leaveReport12710Type:1,
onReady:function(){
if(f.dom.js_mpvedio.style.height="100%",(p.showVideoDetail()||p.showReprint())&&!f.hasShowBotbar){
var i=c("bottom_bar");
i&&(i.style.display="",f.hasShowBotbar=!0,n.postMessage({
type:"addVideoIframeHeight",
data:{
vid:y.txvideo_vid||f.id,
height:f.mpVideoBotH
}
}));
}
n.postMessage({
type:"videoInited",
data:{
vid:f.id,
ori_status:f.ori_status,
hit_bizuin:y.hit_bizuin,
hit_vid:y.hit_vid
}
});
}
},y);
}
function h(){
w();
}
function l(){
var e=c("h5_profile_btn");
e&&2===y.ori_status&&a.tap(e,function(){
var i="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+y.source_encode_biz+"&scene=111#wechat_redirect";
-1!==navigator.userAgent.indexOf("WindowsWechat")||-1!==navigator.userAgent.indexOf("Mac OS")?location.href=i:v.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
-1===e.err_msg.indexOf("ok")&&(location.href=i);
});
});
var t=c("video_detail_btn");
t&&1===y.media_source&&a.tap(t,function(){
var e=["https://mp.weixin.qq.com/mp/video?t=pages/video_detail_new","&vid=",f.vid,"&mid=",f.mid,"&__biz=",f.__biz,"&idx=",f.idx,"&sn=",window.sn||i("sign",window.location.href)||"","&vidsn=",y&&y.vidsn?y.vidsn:"","&scene=100#wechat_redirect"];
f.myPlayer&&f.myPlayer.extendMpReportData({
detail_click:1
}),window.location.href=e.join("");
});
}
function b(i,e){
s({
url:e,
type:"GET",
f:"json",
success:function(e){
var t=JSON.parse(e),o=i.vid,n=i.vh,d=i.vw,s=i.ratio;
y={
hit_bizuin:t.hit_bizuin,
hit_vid:t.hit_vid,
txvideo_vid:t.txvideo_vid,
txvideo_openid:t.txvideo_openid,
ckey:t.ckey,
ckey_ad:t.ckey_ad,
video_title:t.video_title,
ori_status:t.ori_status,
nick_name:window.nickname,
hit_username:t.hit_username,
is_mp_video:t.is_mp_video,
vh:n,
vw:d,
scene:window.scene||0,
ratio:s,
openid:t.openid,
show_comment:window.show_comment,
comment_id:window.comment_id,
vid:o,
__biz:window.biz,
mid:window.mid,
idx:window.idx,
uin:window.uin,
media_source:t.media_source,
vidsn:t.vidsn,
username:t.biz_user_name,
preview:window.preview,
source_encode_biz:window.source_encode_biz,
video_md5:t.video_md5,
is_in_pay_subscribe:1*window.isPaySubscribe||0,
bizNickname:window.nickname,
roundHeadImg:window.round_head_img,
enterid:1*window.enterid,
subscene:window.subscene
},u(),h(),l();
}
});
}
function g(i,n){
for(var d=i.getAttribute("data-src")||i.getAttribute("src"),s=o.getQuery("vid",d),a=i.getAttribute("data-vw"),_=i.getAttribute("data-vh"),r=i.getAttribute("data-ratio"),m=document.createElement("span"),p=i.attributes,v=p.length-1;v>=0;v--)m.setAttribute(p[v].name,p[v].value);
m.id="js_mp_video_container_"+s,m.setAttribute("vid",s),m.style.cssText=i.style.cssText,
m.style.display="none";
var c=e.tmpl(t,{
vid:s,
video_h:_
},!1);
m.innerHTML=c;
var u=i.parentNode;
return u?(u.lastChild===i?u.appendChild(m):u.insertBefore(m,i.nextSibling),u.removeChild(i),
f.container=m,b({
iframe:m,
vid:s,
vh:_,
vw:a,
ratio:r
},n),m):null;
}
var f={
hasShowBotbar:!1,
mpVideoBotH:37,
showComment:!0,
loverCount:{}
},y={};
return{
createMpVideoDom:g
};
};
});define("biz_wap/jsapi/leaveReport.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/log.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=l?"1":"0",t.f="json",f.join(e,t);
}
function o(e){
return e&&"object"==typeof e;
}
function n(e,t){
if(o(e)&&o(t))for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
function r(e){
u("[leaveReport 1]"),console.log("[leaveReport 1]");
var r={};
for(var i in y){
r[i]||(r[i]={});
for(var a=0;a<y[i].length;a++){
var p=y[i][a];
"function"==typeof p?n(r[i],p(e)):o(p)&&n(r[i],p);
}
}
u("[leaveReport getDataFunc.length "+_.length+"]"),console.log("[leaveReport getDataFunc.length "+_.length+"]");
for(var a=0;a<_.length;a++){
var s=_[a](e);
o(s)&&g.push(s);
}
for(var a=0;a<g.length;a++)g[a].reportUrl&&(g[a].reportUrl=t(g[a].reportUrl));
return r.data={
requestList:g
},r;
}
function i(e){
"function"==typeof e?_.push(e):o(e)&&g.push(e);
}
function a(e,t){
y[e]||(y[e]=[]),y[e].push(t);
}
function p(e){
var t=r(!0);
c.invoke("handleMPPageAction",{
action:"reportByLeaveForMPGateway",
reportData:t
},function(o){
if(o&&o.err_msg&&-1!==o.err_msg.indexOf(":ok"))_=[],g=[],y={},"function"==typeof e&&e(o);else{
_=[],g=[];
var n=t.data.requestList.length;
t.data.requestList.forEach(function(t){
t.reportUrl&&s({
type:t.method||"GET",
url:t.reportUrl,
data:t.reportData,
async:!1,
success:function(t){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:ok",
fallback:!0,
resp:t
});
},
error:function(t,o){
--n<0&&"function"==typeof e&&e({
err_msg:"handleMPPageAction:fail",
fallback:!0,
err:o
});
}
});
});
}
});
}
var s=e("biz_wap/utils/ajax.js"),c=e("biz_wap/jsapi/core.js"),f=e("biz_common/utils/url/parse.js"),u=e("biz_wap/utils/log.js"),l=-1!=navigator.userAgent.indexOf("TBS/"),d={},v=!1;
try{
d=top.window.document;
}catch(w){
v=!0;
}
if(!v&&top.window.__leaveReport)return top.window.__leaveReport;
if(window.__leaveReport)return window.__leaveReport;
var _=[],g=[],y={};
c.on("reportOnLeaveForMP",function(){
return r(!1);
});
var h={
reportNow:p,
addReport:i,
addSpecificReport:a
};
return window.__leaveReport=h,h;
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=-1!=navigator.userAgent.indexOf("WindowsWechat"),i=function(e,i){
if(n)return location.href=e,!1;
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=window.user_uin||0,s=0!==t&&Math.floor(t/100)%1e3<o;
return s?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1,
scene:i.scene||"",
bizUsername:i.user_name||""
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});var _extends=Object.assign||function(e){
for(var i=1;i<arguments.length;i++){
var n=arguments[i];
for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);
}
return e;
};
define("appmsg/album_keep_read.js",["page/appmsg_new/mod/album_read.css","biz_common/dom/event.js","biz_common/dom/class.js","pages/mod/bottom_modal.js","biz_wap/utils/openUrl.js","pages/utils.js","biz_wap/utils/ajax.js","common/comm_report.js","common/utils.js","biz_common/dom/offset.js","biz_wap/utils/wapsdk.js"],function(e){
"use strict";
function i(e,i){
v.jsmonitor({
id:223326,
key:e,
value:i
});
}
function n(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
b.report(21277,_extends({},x,e));
}
function t(){
function e(){
if(!t){
var e=w.getOffset(h).offsetTop,o=f.getScrollTop();
o+f.getInnerHeight()>=e+a&&e+a>=o&&(n({
ActionType:1
}),i(11),t=!0);
}
}
var t=void 0,a=h.offsetHeight/2;
f.bindDebounceScrollEvent(e),e();
}
function a(){
var e=window.appmsg_album_info;
if(e.link){
var i=e.link.replace("#wechat_redirect","&subscene=159&subscene="+window.source+"&scenenote="+encodeURIComponent(window.location.href)+"&nolastread=1#wechat_redirect");
_.openUrlWithExtraWebview(i.htmlDecode());
}
}
function o(e){
e&&c.on(e,"click","."+y.itemClassName,function(e){
var i=e.delegatedTarget;
if(!u.hasClass(i,"album_read_directory_current")){
var t=void 0;
t=i.dataset.url.includes("#")?i.dataset.url.replace("#",T+"&scene=190#"):i.dataset.url+(T+"&scene=190"),
n({
ActionType:5,
Url:t
}),p.jumpUrl(t,!0),u.addClass(i,"album_read_directory_disabled");
}
});
}
function s(){
var e=document.createElement("div"),i=document.createElement("span");
return i.innerHTML="#"+window.appmsg_album_info.title,e.appendChild(i),e.innerHTML;
}
function r(e){
g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+y.albumId+"&cur_msgid="+y.msgid+"&cur_itemidx="+y.idx+"&count="+y.pageCount,
timeout:5e3,
dataType:"json",
success:function(i){
i.base_resp&&0===i.base_resp.ret&&e(i.getalbum_resp);
},
error:function(){
console.log("[error]");
}
});
}
function l(){
function e(e){
var i=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],n=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],t=document.createDocumentFragment();
if(_)if(i){
h=1;
for(var a=0;a<e.length;a++)if(e[a].msgid.toString()===y.msgid.toString()&&e[a].itemidx.toString()===y.idx.toString()){
h=a;
break;
}
e.forEach(function(e,i){
e.index=p?c-(i-h):c+(i-h);
});
}else e.forEach(n?function(e,i){
e.index=p?v.index-i-1:v.index+i+1;
}:function(i,n){
i.index=p?w.index+(e.length-n):w.index-(e.length-n);
});
return e.forEach(function(e){
var i=document.createElement("div");
if(u.addClass(i,y.itemClassName),e.msgid.toString()===window.mid.toString()&&e.itemidx.toString()===window.idx.toString()?u.addClass(i,"album_read_directory_current"):1===e.user_read_status&&u.addClass(i,"album_read_directory_disabled"),
i.innerText=_?e.index+"."+e.title:e.title,i.setAttribute("data-url",e.url),e.is_paid){
var n="Paid";
i.innerHTML+='<span class="wx_icon_pay_tag wx_icon_pay_tag_paid">'+n+"</span>";
}else if(e.is_pay_subscribe){
var a="Pay";
i.innerHTML+='<span class="wx_icon_pay_tag">'+a+"</span>";
}
t.appendChild(i);
}),t;
}
function t(e){
1*e.reverse_continue_flag||(b=!1),1*e.continue_flag||(f=!1);
}
var l=document.createElement("div");
l.style.position="relative";
var d=[],c=void 0,_=void 0,p=void 0,b=!0,f=!0,w=void 0,v=void 0,h=1,x={
extClass:"album_read_directory",
hasBtn:!0,
btnSlot:'<div id="js_topic_detail" class="weui-btn__word-wrp">\n                  <span class="weui-btn__word">Details</span>\n                  <i class="weui_right_arrow"></i>\n                </div>',
title:s(),
btnClickCb:function(){
n({
ActionType:6
}),i(15),a();
},
cb:function(){
r(function(i){
j.hideLoading(),p=i.base_info.is_reverse,c=i.base_info.cur_article_num,_=c?1:0,l.appendChild(e(i.article_list,!0)),
w=i.article_list[0],v=i.article_list[i.article_list.length-1],t(i),f||j.showEndLine();
var n=l.childNodes[h];
setTimeout(function(){
n.offsetTop+n.clientHeight>j.contentAreaWrp.clientHeight&&j.scrollTo(0,l.offsetHeight);
},200);
});
},
onShow:function(){
n({
ActionType:4
}),i(14);
},
onPullUpLoad:function(){
f&&(j.showPullUpLoading(),g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+y.albumId+"&begin_msgid="+v.msgid+"&begin_itemidx="+v.itemidx+"&count="+y.pageCount,
timeout:5e3,
dataType:"json",
success:function(i){
j.hidePullUpLoading();
var n=i.base_resp&&1*i.base_resp.ret;
if(0===n){
var a=i.getalbum_resp.article_list;
t(i.getalbum_resp),l.appendChild(e(a,!1,!0)),d=d.concat(a),j.finishPullUpLoad(),
v=d[d.length-1],1*i.getalbum_resp.continue_flag||j.showEndLine();
}
},
error:function(){}
}));
},
onPullDownLoad:function(){
b&&(j.showPullDownLoading(),g({
type:"GET",
url:"/mp/appmsgalbum?action=paging&__biz="+window.biz+"&album_id="+y.albumId+"&begin_msgid="+w.msgid+"&begin_itemidx="+w.itemidx+"&count="+y.pageCount+"&isbackward=1",
timeout:5e3,
dataType:"json",
success:function(i){
j.hidePullDownLoading();
var n=i.base_resp&&1*i.base_resp.ret;
if(0===n){
var a=i.getalbum_resp.article_list,o=i.getalbum_resp.continue_flag;
i.getalbum_resp.continue_flag=i.getalbum_resp.reverse_continue_flag,i.getalbum_resp.reverse_continue_flag=o,
t(i.getalbum_resp);
var s=e(a,!1,!1),r=l.firstChild;
l.insertBefore(s,r),d=a.concat(d),j.scrollTo(0,r.offsetTop-69),j.finishPullDownLoad(),
w=d[0];
}
},
error:function(){}
}));
}
};
window.appmsg_album_info.size<=4&&(x.top=screen.height/2-(screen.height-window.innerHeight)+"px"),
j=new m(l,x),j.showLoading(),j.show(),o(l);
}
function d(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=document.getElementById("js_album_directory");
c.on(t,"click",function(){
j?j.show():l();
});
var a=document.getElementById("js_album_prev"),o=document.getElementById("js_album_next");
e.pre_article_link?c.on(a,"click",function(){
var t=void 0;
n({
ActionType:2,
SubActionType:1
}),i(12),t=e.pre_article_link.includes("#")?e.pre_article_link.replace("#",T+"&scene=189#"):e.pre_article_link+(T+"&scene=189"),
location.href=t.replace(/&amp;/g,"&");
}):a.parentNode.removeChild(a),e.next_article_link?c.on(o,"click",function(){
var t=void 0;
n({
ActionType:2,
SubActionType:2
}),i(13),t=e.next_article_link.includes("#")?e.next_article_link.replace("#",T+"&scene=189#"):e.next_article_link+(T+"&scene=189"),
location.href=t.replace(/&amp;/g,"&");
}):o.parentNode.removeChild(o);
}
e("page/appmsg_new/mod/album_read.css");
var c=e("biz_common/dom/event.js"),u=e("biz_common/dom/class.js"),m=e("pages/mod/bottom_modal.js"),_=e("biz_wap/utils/openUrl.js"),p=e("pages/utils.js"),g=e("biz_wap/utils/ajax.js"),b=e("common/comm_report.js"),f=e("common/utils.js"),w=e("biz_common/dom/offset.js"),v=e("biz_wap/utils/wapsdk.js"),h=document.getElementById("js_album_keep_read"),y={
link:window.appmsg_album_info.link,
albumId:window.appmsg_album_info.id,
msgid:window.mid,
idx:window.idx,
pageCount:10,
itemClassName:"album_read_directory_item"
},x={
MsgId:1*y.msgid,
ItemIdx:1*y.idx,
BizUin:window.biz,
Itemshowtype:1*window.item_show_type,
SessionId:window.sessionid,
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
Albumid:y.albumId,
Albumtype:window.appmsg_album_info.type,
Title:window.appmsg_album_info.title
},j=void 0,T="&cur_album_id="+y.albumId;
return{
init:function(e){
h&&(e.pre_article_link||e.next_article_link)&&(document.getElementById("js_album_keep_read_title").innerHTML=window.appmsg_album_info.title,
document.getElementById("js_album_keep_read_size").innerHTML=window.appmsg_album_info.size,
document.getElementById("js_album_keep_read_pre_title").innerHTML=e.pre_article_title||"",
document.getElementById("js_album_keep_read_next_title").innerHTML=e.next_article_title||"",
h.style.display="block",d(e),t());
}
};
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_wap/utils/jsmonitor_report.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=r.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],a=0;a<l.length;a++){
var w=[l[a].bizuin||window.biz||"",l[a].mid||"",l[a].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var p=c[n.index].getBoundingClientRect(),h="fans_read_cnt="+l[n.index].fans_read_cnt,g={
act:n.action||0,
bizuin:window.biz||"",
msgid:window.mid||"",
idx:window.idx||"",
scene:window.source||"",
sub_scene:window.subscene||"",
get_a8_key_scene:window.ascene||"",
screen_height:i,
screen_width:e,
screen_num:Math.ceil(t/i),
action_screen_num:Math.ceil((p.top+p.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:h,
session_id:u
};
o({
url:"/mp/appmsgreport?action=more_read",
type:"POST",
data:g,
timeout:2e3,
async:!1,
mayAbort:!0
});
var b=1===n.action?4:5;
d.setSum(110809,b,1);
}
function e(){
if(l){
for(var n=0,t=r.getInnerHeight(),o=0;o<c.length;o++)if(c[o].dataset.show)n++;else{
var s=c[o].getBoundingClientRect();
s.top+s.height<t&&(c[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=c.length&&a.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),a=n("biz_common/dom/event.js"),d=n("biz_wap/utils/jsmonitor_report.js"),r=n("common/utils.js"),l=null,c=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return a.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
},!1),c=n.getElementsByClassName("more_read_link");
for(var o=0;o<c.length;o++)a.on(c[o],"click",function(n){
return function(){
window.__second_open__?m.openUrlWithExtraWebview(l[n].link.htmlDecode()):window.location.href=l[n].link.htmlDecode(),
i({
action:2,
index:n
});
};
}(o));
n.style.display="";
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);
}
return e;
};
define("appmsg/comment.js",["biz_wap/ui/weui.js","biz_common/utils/string/html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","common/utils.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment/comment_tpl.html.js","appmsg/comment/comment_write.html.js","appmsg/comment/comment_write_old.html.js","pages/utils.js","biz_wap/utils/mmversion.js","common/comm_report.js","appmsg/set_font_size.js","biz_wap/utils/jsmonitor_report.js","common/keyboard.js","appmsg/comment/comment_write_dialog/comment_write_dialog.js","appmsg/comment/comment_list/comment_list.js","appmsg/comment/comment_dialog/comment_dialog.js","appmsg/comment/comment_input/comment_input.js","appmsg/comment/comment_length.js","common/fixed_input.js","appmsg/emotion/emotion_panel.js","pages/scrollY.js","appmsg/comment/comment_report.js","appmsg/rec_report_key.js","pages_new/common_share/video/store.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js"),e("biz_common/utils/string/html.js");
var t=e("biz_common/utils/wxgspeedsdk.js"),n=e("appmsg/comment_report.js"),o=e("biz_wap/utils/device.js"),i=e("biz_common/utils/url/parse.js"),s=e("biz_wap/jsapi/core.js"),m=e("common/utils.js"),a=e("biz_common/dom/event.js"),c=e("biz_wap/utils/ajax.js"),r=e("biz_common/tmpl.js"),l=e("biz_wap/utils/fakehash.js"),d=e("appmsg/log.js"),p=e("appmsg/comment/comment_tpl.html.js"),u=e("appmsg/comment/comment_write.html.js"),_=e("appmsg/comment/comment_write_old.html.js"),g=e("pages/utils.js"),w=e("biz_wap/utils/mmversion.js"),y=e("common/comm_report.js"),f=e("appmsg/set_font_size.js"),I=e("biz_wap/utils/jsmonitor_report.js"),b=e("common/keyboard.js"),h=e("appmsg/comment/comment_write_dialog/comment_write_dialog.js"),v=e("appmsg/comment/comment_list/comment_list.js"),C=e("appmsg/comment/comment_dialog/comment_dialog.js"),j=e("appmsg/comment/comment_input/comment_input.js"),k=e("appmsg/comment/comment_length.js"),L=e("common/fixed_input.js"),D=e("appmsg/emotion/emotion_panel.js"),T=e("pages/scrollY.js"),S=e("appmsg/comment/comment_report.js"),R=S.report22214,x=e("appmsg/rec_report_key.js"),A=x.RecActionType,F=x.reportRecAction,P=!window.isPaySubscribe||window.isPaySubscribe&&window.isPaid,E=k.getLimit("comment"),z=0;
try{
z=1*window.atob(window.biz);
}catch(W){}
var B={
BizUin:z,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0
},H={
bizuin:z,
msgid:window.parseInt(window.mid,10)||0,
itemidx:window.parseInt(window.idx,10)||0,
scene:window.parseInt(window.source,10)||0
},M=!1,O=void 0,N=void 0,q=void 0,U=void 0,K=!1,Y=[],V={},G=0,J=Date.now(),Q=[],X=null,Z=!1,$=!1,et=!1,tt=!1,nt=!1,ot=null,it=!1,st=null,mt=null,at={
commentCount:"",
scrollCount:0,
nickName:"Me",
headImg:"",
offset:0,
commentId:window.comment_id,
onlyFansCanComment:0,
onlyFansDaysCanComment:0,
isFans:0,
isFansDays:0,
replyFlag:0,
reportData:{
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},
contentIDs:[],
canC2CReply:!1,
cmtFixedInput:null,
cmtDialog:null,
cmtList:null,
myList:null,
articleContent:null
},ct=100,rt=location.href,lt=w.is_wxwork,dt=o.os.pc&&!lt,pt="comment_editing",ut="my_comment_empty_data",_t="weui-btn_disabled",gt="discuss_form_write_show",wt="icon_discuss_keyboard",yt=navigator.userAgent.indexOf("MicroMessenger")>-1,ft=g.getId("js_cmt_area"),It=rt.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1,bt={
vertical:0,
horizontal:0
};
0===window.orientation||180===window.orientation?(bt.vertical=m.getInnerHeight(),
bt.horizontal=screen.width-(screen.height-bt.vertical)):(bt.horizontal=m.getInnerHeight(),
bt.vertical=screen.width-(screen.height-bt.horizontal+60));
var ht=g.getId("activity-name")||"";
ht&&(ht=g.trim(ht.innerText)||""),window.pageCommentReportData&&window.pageCommentReportData.idkey&&(It&&console.log("init reportData"),
at.reportData=window.pageCommentReportData),"undefined"!=typeof window.comment_id?at.commentId=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(at.commentId=window.cgiData.comment_id),
yt||(ft&&(ft.style.display="none"),at.commentId=0),It&&console.info("[Comment on Article] Comment ID:",at.commentId);
var vt=function(){
return w.isWechat?w.isInMiniProgram?0:b.canUseKeyboard?2:(w.isIOS||w.isAndroid)&&(w.gtVersion("7.0.8")||m.isNativePage())?2:0:0;
}(),Ct=function(e,t){
e&&(e.style.display=t||"block");
},jt=function(e){
e&&(e.style.display="none");
},kt=function(e){
if(!e)return!1;
var t=m.getScrollTop(),n=e.offsetTop;
return t+m.getInnerHeight()>n&&n>=t;
},Lt=function(e,n){
Math.random()<.999||(t.saveSpeeds({
uin:window.uin,
pid:"https:"===window.location.protocol?18:9,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:n
}]
}),t.send());
},Dt=function(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];
if("undefined"!=typeof e)if(at.reportData.idkey)I.setSum(at.reportData.idkey,e,1);else{
var n=new Image,o=Math.random();
n.src="/mp/jsreport?key="+e+"&content="+t+"&r="+o;
}
},Tt=function(){
Array.prototype.forEach.call(g.getByClass("js_more_reply"),function(e){
var t=e.dataset.myId;
-1===Q.indexOf(t)&&kt(e)&&(y.report(19462,_extends({
PersonalCommentId:parseInt(t,10)||0,
CommentId:parseInt(at.commentId,10)||0,
actiontype:1,
wording:"??????N???",
number:parseInt(e.dataset.num,10)||0,
devicetype:dt?1:2
},H)),Q.push(t));
});
},St=function(){
if(!(2>G)){
var e=m.getInnerHeight();
[at.myList.getItemList(),at.cmtList.getItemList()].forEach(function(t,n){
var o=at[n?"cmtList":"myList"];
t.some(function(t){
if(!t.isExposed){
var i=t.getBoundingClientRect(),s=.5*i.height;
if(i.bottom>s&&i.top<e-s){
t.isExposed=!0;
var m=t.dataset,a={
PersonalCommentId:1*m.myId,
ReplyId:0,
IsPopup:0,
IsReplyOther:0,
CommentReplyType:n?1:2
};
if(m.replyId){
var c=o.getData({
type:"reply",
contentId:m.contentId,
replyId:1*m.replyId
});
a.ReplyId=c.reply_id,a.IsReplyOther=c.to_nick_name&&c.to_content?1:0;
}
R(a);
}else if(i.top>=e-s)return!0;
}
return!1;
});
});
}
},Rt=function(){
N||(N=!0,new n({
comment_id:at.commentId,
appmsgid:window.appmsgid,
idx:window.idx,
item_show_type:window.item_show_type||0,
biz:window.biz
}),Tt());
},xt=function sn(){
try{
kt(V.loading)&&K&&(I.setLogs({
id:28307,
key:45,
value:1,
lc:1,
log0:""
}),a.off(window,"scroll",sn));
}catch(e){
console.error(e);
}
},At=function(){
var e=function(e,t,n){
at.onlyFansDaysCanComment&&0===at.isFansDays?((t||e).innerHTML="?????????????????????7??????????????????",
Ct(e),t&&Ct(t)):at.onlyFansCanComment&&0===at.isFans?((t||e).innerHTML="Follow first to comment",
Ct(e),t&&Ct(t)):P&&(dt?(Ct(V.commentPC),Ct(V.inputPC)):(t&&(jt(t),Ct(e)),Ct(n)));
};
return function(){
if(!lt){
var t=g.qs(".js_cmt_nofans_mine",ft),n=g.qs(".js_cmt_nofans_elected",ft),o=g.qs(".js_cmt_nofans_single",ft),i=g.qs(".js_cmt_nofans_single_inner",o),s=g.qs(".js_cmt_addbtn",o);
at.myList.count?(jt(n),jt(n.nextElementSibling),jt(o),jt(i),jt(s),e(t,null,t.nextElementSibling)):at.cmtList.count?(jt(t),
jt(t.nextElementSibling),jt(o),jt(i),jt(s),e(n,null,n.nextElementSibling)):(jt(t),
jt(t.nextElementSibling),jt(n),jt(n.nextElementSibling),e(o,i,s));
}
};
}(),Ft=function(){
at.myList.showAll(),St(),V.mylistFolder&&(V.mylistFolder.parentNode.removeChild(V.mylistFolder),
V.mylistFolder=null);
},Pt=function(){
var e=!0,t=!0,n=!1,o=null,i=null,s=null,m=function(e){
e&&window.scrollTo(0,e.getBoundingClientRect().top+g.getScrollTop()-6);
};
return function(a,c){
if(At(),e&&window.goContentId&&!c&&a)if(!window.onload_endtime||new Date-window.onload_endtime<1e3){
if($&&(null===o&&(o=null!==at.myList.getData({
contentId:window.goContentId
})),o))return void("none"!==ft.style.display&&(Ft(),m(""!==window.goReplyId?at.myList.getReply(window.goContentId,1*window.goReplyId):at.myList.getComment(window.goContentId)),
e=!1));
Z&&(null===i&&(s=at.cmtList.getData({
contentId:window.goContentId
}),i=null!==s),i&&(t&&""!==window.goReplyId&&(s.reply_new.reply_total_cnt&&s.reply_new.reply_total_cnt!==s.reply_new.reply_list.length?at.cmtDialog.showDialog(at.cmtList.getData({
contentId:window.goContentId
}),1*window.goReplyId):n=!0,t=!1),$&&(m(n?at.cmtList.getReply(window.goContentId,1*window.goReplyId):at.cmtList.getComment(window.goContentId)),
e=!1)));
}else e=!1;
};
}(),Et=function(e){
var n=Date.now(),o=e.resp,i=e.loadTime,s=e.forceRefresh,m=e.notFirstRender;
if(at.onlyFansCanComment=o.only_fans_can_comment,at.isFans=o.is_fans,window.isPaySubscribe&&!window.isPaid&&(at.canC2CReply=!1),
at.replyFlag=at.canC2CReply?o.reply_flag:0,Dt(at.reportData.handleList,encodeURIComponent(JSON.stringify({
comment_id:at.commentId,
offset:at.offset,
url:rt
}))),1!==o.enabled?(ft&&(ft.style.display="none"),o.elected_comment=[],o.elected_comment_total_cnt=0):ft&&(ft.style.display="block"),
0===at.offset){
at.headImg=o.logo_url,at.nickName=o.nick_name,s&&(at.contentIDs=[]);
var a=o.elected_comment;
a&&a.length?(Ct(V.main),at.cmtList.render(a),o.elected_comment_total_cnt<=10&&Ct(V.statement),
q||"5"!==window.item_show_type||(q=!0,Math.random()<.1&&(t.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:27,
time:Date.now()-window.logs.pagetime.page_begin
}]
}),t.send()))):jt(V.main),Z=!0,Pt(s,m);
var c=ft.getBoundingClientRect().y;
location.href.indexOf("scrolltodown")>-1&&c&&window.scrollTo(0,c-25);
}else{
var a=o.elected_comment;
a&&a.length&&at.cmtList.add({
data:a
});
}
0===o.elected_comment_total_cnt?(at.offset=-1,jt(V.loading),jt(V.statement)):at.offset+ct>=o.elected_comment_total_cnt?(at.offset=-1,
jt(V.loading),Ct(V.statement)):at.offset+=o.elected_comment.length,window.ipados13_font_scale&&f.setFontSize(V.main,window.ipados13_font_scale/100),
Rt(),g.setTwoTabHeight("js_comment_content"),i&&Lt(i,Date.now()-n);
},zt=function(e){
if(at.commentId=window.comment_id,0!==Number(at.commentId)){
var t=e.notFirstRender,n=e.forceRefresh,o=e.cb;
n=n===!0,n&&(at.offset=0);
var s=m.getScrollTop(),r=document.documentElement.scrollHeight;
if(!(K||-1===at.offset||at.offset>0&&r-s-m.getInnerHeight()>500)){
if("number"==typeof at.commentCount&&0===at.commentCount&&!n)return void Et({
resp:{
enabled:1,
elected_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:at.onlyFansCanComment,
is_fans:at.isFans,
logo_url:at.headImg,
nick_name:at.nickName
}
});
var l=i.join("/mp/appmsg_comment",{
action:"getcomment",
scene:at.reportData.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:at.commentId,
offset:at.offset,
limit:ct,
send_time:window.send_time
},!0),p=+new Date;
K=!0,Ct(V.loading),xt();
try{
at.scrollCount++,n&&(Y=[]),at.scrollCount>1&&!n&&Dt(at.reportData.moreList,encodeURIComponent(l)),
Y.indexOf(l)>-1&&Dt(at.reportData.repeatList,encodeURIComponent(l)),Y.push(l);
}catch(u){
console.error(u);
}
It&&console.info("[Comment on Article] Request comment data:",l),d("[Appmsg comment] start get comment data, url:"+l),
c({
url:l,
dataType:"json",
success:function(e){
var i=e.base_resp&&e.base_resp.ret;
0===i?o&&o({
resp:e,
forceRefresh:n,
notFirstRender:t,
loadTime:Date.now()-p
}):Dt(at.reportData.errList,"type:resperr;url:"+encodeURIComponent(l)+";ret="+i),
d("[Appmsg comment] get comment success");
},
error:function(){
Dt(at.reportData.errList,"type:ajaxerr;url:"+encodeURIComponent(l)),d("[Appmsg comment] get comment ajax error");
},
complete:function(){
K=!1,jt(V.loading),a.off(window,"scroll",xt);
}
});
}
}
},Wt=function(e){
var t=v.validContent(e);
return t.valid&&dt&&(t.content=X.value),t;
},Bt=!1,Ht=function(e){
var t=e.content,n=e.successBegin,o=e.successEnd,s=e.fail,m=e.complete;
Bt||!function(){
Bt=!0,O!==t&&(J=Date.now());
var e=i.join("/mp/appmsg_comment",{
action:"addcomment",
scene:at.reportData.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:at.commentId,
sn:window.sn
},!0);
c({
url:e,
data:{
content:t,
title:ht,
head_img:at.headImg,
nickname:at.nickName,
client_id:J
},
type:"POST",
dataType:"json",
success:function(i){
switch("function"==typeof n&&n(),+i.ret){
case 0:
var m={
content:t,
nick_name:at.nickName,
create_time:Date.now()/1e3|0,
is_elected:0,
logo_url:at.headImg,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:i.my_id,
content_id:i.content_id,
reply_new:{
reply_list:[]
},
needAnimation:!0
};
return Ct(V.mylistContainer),Ct(V.mylistFooter),at.myList.add({
data:[m],
mode:"unshift"
}),void("function"==typeof o&&o());

case-6:
window.weui.alert("You're commenting too frequently. Take a break and try again later.");
break;

case-7:
window.weui.alert("You have not followed this Official Account yet. Unable to comment.");
break;

case-10:
window.weui.alert("??????????????????"+E+"???");
break;

case-15:
window.weui.alert("Comments have been disabled");
break;

case-18:
window.weui.alert("??????????????????????????????????????????");
break;

default:
O=t,window.weui.alert("System error. Try again later.");
}
Dt(at.reportData.addCommentErr,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i.ret),
"function"==typeof s&&s();
},
error:function(t){
console.log(t),Dt(at.reportData.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(e)),
"function"==typeof s&&s();
},
complete:function(){
Bt=!1,"function"==typeof m&&m();
}
});
}();
},Mt=function(){
var e=X.getSubmit(),t=X.getInput();
if(e.disabled!==!0){
var n=Wt(dt?X.value:t.value),o=n.valid,i=n.content;
o&&(e.disabled=!0,Ht({
content:i,
successBegin:function(){
!dt&&X.hideEmotionPannel();
},
successEnd:function(){
dt?(X.hide(),Ct(V.inputPC)):t.value="";
},
complete:function(){
""!==t.value&&(e.disabled=!1);
}
}));
}
},Ot=function(){
var e=i.join("/mp/appmsg_comment",{
action:"getmycomment",
scene:at.reportData.scene,
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:at.commentId
},!0);
0===G&&(G=1,Array.prototype.forEach.call(V.myCmtLoading,Ct),c({
url:e,
dataType:"json",
success:function(t){
var n=t.base_resp&&t.base_resp.ret;
if(0===n){
G=2;
var o=t.my_comment;
o&&o.length&&(Ct(V.mylistContainer),Ct(V.mylistFooter),at.myList.render(o),at.myList.getIsOversize()&&Ct(V.mylistFolder));
}else G=0,Dt(at.reportData.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+n);
$=!0,Pt(!0,!1);
},
error:function(){
G=0,Dt(at.reportData.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
},
complete:function(){
Array.prototype.forEach.call(V.myCmtLoading,jt);
}
}));
},Nt=function(){
return{
enterEditing:function(){
et=!0,b.canUseCancel;
},
leaveEditing:function(){
et&&(et=!1,b.canUseCancel&&w.isAndroid&&document.body.style.removeProperty("margin-bottom"));
}
};
}(),qt=Nt.leaveEditing,Ut=function(){
switch(vt){
case 2:
at.cmtWriteDialog.show();
break;

case 1:
s.invoke("handleMPPageAction",{
action:"writeComment",
title:ht,
comment_id:at.commentId,
style:"white"
});
}
return vt;
},Kt=function(e){
M=!0,U=m.getScrollTop(),!dt&&jt(V.article),at.myList.changeContainer(V.mylistOld),
Ft(),Ct(V.mine),document.body.classList[at.myList.count?"remove":"add"](ut),window.__second_open__&&o.os.ios&&Ct(V.fakebar),
window.scrollTo(0,0),Ot(),!e&&setTimeout(function(){
return X.focus();
},3);
},Yt=function(){
M=!1,at.myList.changeContainer(V.mylist),jt(V.mine),Ct(V.article),window.scrollTo(0,U),
X.blur(),document.body.classList.remove(pt),document.body.classList.remove(ut);
},Vt=function(t,n){
if(1*window.item_show_type===5){
var i=e("pages_new/common_share/video/store.js");
i.dispatch("mp-video-player/auto-next-plugin/cancelAutoNextWhenTipsShowed",6);
}
switch(t&&t.preventDefault(),Ut()){
case 2:
y.report(19048,_extends({
EventType:1,
IsFans:at.isFans,
CommentPageType:3
},B));
break;

case 1:
y.report(19048,_extends({
EventType:1,
IsFans:at.isFans,
CommentPageType:2
},B));
break;

case 0:
default:
if(m.isNativePage()||document.body.classList.add(pt),n)return It&&console.log("FakeHash on comment"),
void Kt();
t.preventDefault(),window.__second_open__&&o.os.ios?Kt():(It&&console.log("push comment"),
l.push("comment")),y.report(19048,_extends({
EventType:1,
IsFans:at.isFans,
CommentPageType:1
},B));
}
},Gt=w.isAndroid?30:0,Jt=function(e,t){
if(tt){
var n=V.commentWriteArea.getBoundingClientRect(),o=n.bottom,i=bt[0===window.orientation||180===window.orientation?"vertical":"horizontal"],s=o-(i-e)-(t?0:Gt),a=Math.abs(s),c=g.getScrollTop(),r=document.body.scrollHeight-c-i;
s>r?document.body.style.marginBottom=(document.body.style.marginBottom?parseInt(document.body.style.marginBottom,10):0)+s-r+"px":0>s&&a>c&&(at.articleContent.style.marginTop=(at.articleContent.style.marginTop?parseInt(at.articleContent.style.marginTop,10):0)+a-c+"px");
var l={
distance:s,
end:w.isAndroid?function(){
var n=V.commentWriteArea.getBoundingClientRect().bottom,o=m.getInnerHeight()-(t?e:0);
n!==o&&T.start({
distance:n-o,
duration:.1
});
}:null
};
150>a?l.speed=300:l.duration=.3,T.start(l);
}
},Qt=function(e){
e=e||k.getLength(V.input.value),V.cmtTips.innerHTML=e>=E-k.remindWordCount&&E>e?"???????????????"+(E-e)+"??????":e===E?"??????"+E+"???????????????":e>E?"?????????"+(e-E)+"???":"";
},Xt=function(){
var e=k.getLength(V.input.value);
V.cmtSubmitBtn.classList[e&&E>=e?"remove":"add"](_t),Qt();
},Zt=function(){
V.cmtEmotionBtn.classList.remove(wt),V.cmtEmotionBtn.setAttribute("aria-pressed",!1),
b.lastData.keyboard&&!nt&&Jt(b.lastData.keyboard);
},$t=function(e){
V.input.blur(),tt=!1,document.body.style.removeProperty("margin-bottom"),at.articleContent.style.removeProperty("margin-top"),
at.cmtEmotionPanel.hide(),V.commentWriteArea.style.height=0,V.commentWriteArea.classList.remove(gt),
mt&&(clearTimeout(mt),mt=null),e===!0?jt(V.commentWriteMask):mt=setTimeout(function(){
jt(V.commentWriteMask),mt=null;
},500),w.isIOS&&s.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!0
});
},en=function(){
var e=V.cmtSubmitBtn.classList;
if(!e.contains(_t)){
var t=Wt(V.input.value),n=t.valid,o=t.content;
n&&(at.cmtWriteDialog.disableSubmit(),e.add(_t),Ht({
content:o,
successEnd:function(){
at.cmtFixedInput.setInput(""),setTimeout(function(){
nt=!1,$t();
},10);
},
fail:function(){
e.remove(_t);
}
}));
}
},tn=function(){
a.on(V.mylistFolder,"click",Ft),a.on(window,"scroll",xt),a.on(window,"scroll",Tt),
a.bindVisibilityChangeEvt(function(e){
e&&!kt(V.cmtContainer)&&zt({
notFirstRender:!0,
forceRefresh:!0,
cb:Et
}),w.isIOS&&"hidden"===document.visibilityState&&$t(!0);
});
var e=function t(){
V.mylistFolder?kt(V.mylistFolder)&&(y.report(19462,_extends({
CommentId:parseInt(at.commentId,10)||0,
actiontype:1,
wording:"??????????????????",
number:at.myList.count,
devicetype:1
},H)),a.off(window,"scroll",t)):a.off(window,"scroll",t);
};
a.on(window,"scroll",e),e(),m.bindDebounceScrollEvent(St),dt?a.tap(V.inputPC,function(){
jt(V.inputPC),X.show(V.inputPC);
}):!function(){
b.onGetKeyboardHeight(function(e){
var t=e.keyboard;
st&&(clearTimeout(st),st=null),!nt&&Jt(t);
}),a.on(ft,"click",function(e){
var t=e.target;
if(t.classList.contains("js_cmt_addbtn")){
var n=window.getComputedStyle(V.commentWriteAreaInner),o=n.marginTop,i=n.marginBottom;
tt=!0,nt=!1,V.commentWriteArea.style.height=V.commentWriteAreaInner.offsetHeight+parseInt(o,10)+parseInt(i,10)+"px",
V.commentWriteArea.classList.add(gt),Ct(V.commentWriteMask),it||(st=setTimeout(function(){
it=!0;
},1e3)),w.isIOS?(s.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!1
}),V.input.focus()):setTimeout(function(){
return V.input.focus();
});
}
});
var e=null;
switch(a.on(V.input,"touchstart",function(t){
nt=!1,w.isAndroid?setTimeout(function(){
return V.input.focus();
}):V.input.focus(),e=1===t.touches.length?t.touches[0]:null;
}),a.on(V.input,"paste",function(e){
var t=e.clipboardData.getData("text"),n=k.getLength(t),o=k.getLength(V.input.value);
if(o+n>E){
e.preventDefault();
for(var i=E-o,s="",m=0,a=t.length;a>m&&i>0&&(i-=/[^\x00-\xff]/.test(t[m])?1:.5,!(0>i));m++)s+=t[m];
var c=V.input,r=c.value.substring(0,c.selectionStart),l=c.value.substring(c.selectionEnd),d=c.selectionStart+s.length;
c.value=r+s+l,at.cmtFixedInput.setPlaceholder(c.value),Xt(),c.scrollTop=c.scrollHeight,
c.setSelectionRange(d,d);
}
}),a.on(V.input,"keydown",function(e){
if(!e.altKey&&!e.ctrlKey)switch(e.keyCode){
case 8:
case 9:
case 12:
case 16:
case 17:
case 18:
case 20:
case 27:
case 33:
case 34:
case 35:
case 36:
case 37:
case 38:
case 39:
case 40:
case 45:
case 46:
case 144:
case 175:
case 174:
case 179:
case 173:
case 172:
case 180:
case 170:
break;

default:
k.getLength(V.input.value)>=E&&e.preventDefault();
}
}),a.on(V.cmtCancel,"click",$t),a.on(V.commentWriteMask,"touchstart",$t),a.on(V.cmtWriteTitle,"touchstart",function(e){
return e.preventDefault();
}),V.commentWriteAreaInner.addEventListener("touchmove",function(t){
if(t.target===V.input)if(null===e)t.preventDefault();else{
var n=t.changedTouches[0].clientY-e.clientY;
(V.input.scrollTop<=0&&n>0||V.input.scrollTop>=V.input.scrollHeight-V.input.offsetHeight&&0>n)&&t.preventDefault();
}else t.preventDefault();
},{
passive:!1
}),w.isAndroid?a.on(window,"resize",function(){
if(tt){
var e=0===window.orientation||180===window.orientation?"vertical":"horizontal",t=bt[e],n=m.getInnerHeight();
t>n?Zt():(!nt&&$t(),n>t&&(bt[e]=n));
}
}):a.on(V.input,"blur",function(){
ot=setTimeout(function(){
!it&&$t(),ot=null;
});
}),a.on(V.cmtEmotionBtn,"click",function(){
ot&&(clearTimeout(ot),ot=null),at.cmtEmotionPanel.isShow?(nt=!1,w.isAndroid?setTimeout(function(){
return V.input.focus();
}):V.input.focus()):(V.cmtEmotionBtn.classList.add(wt),V.cmtEmotionBtn.setAttribute("aria-pressed",!0),
nt=!0,V.input.blur()),at.cmtEmotionPanel.toggle();
}),a.on(V.cmtSubmitBtn,"click",function(){
ot&&(clearTimeout(ot),ot=null),en();
}),a.on(V.keyboardTool,"touchstart",function(e){
var t=e.target;
t===V.cmtEmotionBtn||t===V.cmtSubmitBtn&&!t.classList.contains(_t)||e.preventDefault();
}),vt){
case 2:
break;

case 1:
m.listenMpPageAction(function(e){
"deleteComment"===e.action&&at.cmtList.remove({
myId:e.personal_comment_id
}),"deleteCommentReply"===e.action&&at.cmtList.remove({
type:"reply",
myId:e.personal_comment_id,
replyId:e.replyId
}),"praiseComment"===e.action&&(e.reply_id&&0!==e.reply_id?(at.cmtList.setLikeInfo({
type:"reply",
myId:e.personal_comment_id,
replyId:e.reply_id,
likeStatus:e.is_like
}),at.cmtDialog.setReplyLikeInfo({
myId:e.personal_comment_id,
replyId:e.reply_id,
likeStatus:e.is_like
})):at.cmtList.setLikeInfo({
myId:e.personal_comment_id,
likeStatus:e.is_like
}));
});
break;

case 0:
V.goback&&a.on(V.goback,"click",function(e){
e.preventDefault(),Yt(),jt(V.fakebar);
}),o.os.ios&&window.__second_open__&&!function(){
var e=null,t=null;
a.on(window,"orientationchange",function(){
"none"!==V.fakebar.style.display&&(clearTimeout(e),e=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(V.fakebar).width)&&(clearTimeout(t),
V.mine.style.height=m.getInnerHeight()+"px",window.scrollBy&&window.scrollBy(0,1),
t=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),V.mine.style.height="";
},100));
},50));
});
}();
}
}();
},nn=function(e){
if(at.canC2CReply=0!==(256&e.test_flag),at.onlyFansCanComment=e.only_fans_can_comment,
at.nickName=e.nick_name,at.isFans=e.is_fans,at.headImg=e.logo_url,at.commentCount=e.comment_count,
at.onlyFansDaysCanComment=e.only_fans_days_can_comment,at.isFansDays=e.is_fans_days,
at.articleContent=e.articleContent||g.getId("img-content"),window._has_comment=!0,
console.log("inwechat",yt,"commentid",at.commentId),!yt||0===Number(at.commentId))return void(window._has_comment=!1);
var t=g.getId("js_cmt_container");
ft&&(t.insertAdjacentHTML("afterbegin",r.tmpl(u,{
deviceIsPc:dt
})),at.cmtWriteDialog=new h({
globalData:at,
canC2CReply:at.canC2CReply,
onSubmit:function(e){
var t=Wt(e),n=t.valid,o=t.content;
n&&(at.cmtWriteDialog.disableSubmit(),Ht({
content:o,
successEnd:function(){
at.cmtWriteDialog.hide(),at.cmtWriteDialog.setInputValue(""),F(A.kComment);
},
fail:function(){
at.cmtWriteDialog.enableSubmit();
}
}));
}
}),ft.innerHTML=r.tmpl(p,{
isWxWork:lt
})),dt?document.body.classList.add("pages_skin_pc"):0===vt&&document.body.insertAdjacentHTML("beforeend",r.tmpl(_,{
textPageTitle:1*window.item_show_type===10?g.getId("js_text_content").innerHTML.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,""):window.msg_title.html(1)
},!1)),V={
article:g.getId("js_article"),
mine:g.getId("js_cmt_mine"),
main:g.getId("js_cmt_main"),
goback:g.getId("js_cmt_goback"),
list:g.getId("js_cmt_list"),
mylistContainer:g.getId("js_my_list_container"),
mylist:g.getId("js_my_list"),
mylistFolder:g.getId("js_my_list_folder"),
mylistFooter:g.getId("js_my_list_footer"),
mylistOld:g.getId("js_my_list_old"),
morelist:g.getId("js_cmt_morelist"),
loading:g.getId("js_cmt_loading"),
fakebar:g.getId("js_fake_bar"),
statement:g.getId("js_cmt_statement"),
myCmtLoading:g.qsAll(".js_mycmt_loading"),
cmtContainer:t,
commentPC:g.getId("js_comment_pc"),
inputPC:g.getId("js_cmt_input_pc"),
containerPC:g.getId("js_cmt_container_pc"),
addbtnPC:g.getId("js_cmt_addbtn_pc"),
emotionSwitchPC:g.getId("js_emotion_wrp_pc"),
inputHolder:g.getId("js_cmt_input_holder"),
commentWriteArea:g.getId("js_cmt_write_area"),
updateDialog:g.getId("js_update_dialog"),
updateCancel:g.getId("js_update_cancel"),
updateConfirm:g.getId("js_update_confirm"),
deleteReplyPanel:g.getId("js_delete_reply_panel"),
deleteReplyConfirm:g.getId("js_delete_reply_confirm"),
deleteReplyCancel:g.getId("js_delete_reply_cancel"),
cmtDialog:g.getId("js_cmt_dialog")
},V.commentWriteArea&&(V.commentWriteMask=V.commentWriteArea.nextElementSibling,
V.commentWriteAreaInner=g.qs(".js_cmt_write_area_inner",V.commentWriteArea),V.cmtWriteTitle=g.qs(".js_title",V.commentWriteAreaInner),
V.cmtCancel=g.qs(".js_cancel",V.commentWriteAreaInner),V.input=g.qs(".js_cmt_input",V.commentWriteAreaInner),
V.keyboardTool=g.qs(".js_keyboard_tool",V.commentWriteAreaInner),V.cmtEmotionBtn=g.qs(".js_emotion_btn",V.keyboardTool),
V.cmtSubmitBtn=g.qs(".js_cmt_submit_btn",V.keyboardTool),V.cmtTips=g.qs(".js_cmt_tips",V.keyboardTool)),
dt||(at.cmtFixedInput=new L({
input:V.input,
onFocus:function(){
w.isIOS&&Zt();
},
onInput:Xt
}),at.cmtEmotionPanel=new D({
input:V.input,
limit:E,
counter:function(e){
return k.getLength(e);
},
onChange:function(e){
var t=e.type,n=e.value;
return"action"===t&&"done"===n?void en():(Xt(),at.cmtFixedInput.setPlaceholder(V.input.value),
void(nt=!0));
},
onShow:function(e){
tt?Jt(e,!0):at.cmtEmotionPanel.hide();
},
onTouchmove:function(e){
e.stopPropagation();
}
})),at.cmtDialog=new C({
globalData:at,
canAddComment:P,
onGetReplyList:function(e,t){
t.filter(function(e){
return 2===e.is_from;
}).forEach(function(t){
at.cmtList.setLikeInfo({
type:"reply",
contentId:e,
replyId:t.reply_id,
likeStatus:t.reply_like_status,
likeNum:t.reply_like_num
});
});
}
}),at.cmtList=new v({
globalData:at,
container:V.list,
type:"elected",
canAddComment:P,
onPraise:function(e,t,n,o,i){
!at.canC2CReply&&at.myList.setLikeInfo({
type:e,
contentId:t,
replyId:n,
likeStatus:o,
likeNum:i
}),at.cmtDialog.setReplyLikeInfo({
contentId:t,
replyId:n,
likeStatus:o,
likeNum:i
});
},
onRender:function(){
St();
},
onAdd:function(e,t,n,o,i){
!at.canC2CReply&&at.myList.add({
data:e,
mode:t,
type:n,
contentId:o,
pos:i
}),St();
},
onRemove:function(e,t,n){
!at.canC2CReply&&at.myList.remove({
type:e,
contentId:t,
replyId:n.reply_id
}),St();
},
onEmpty:function(e){
"comment"===e&&(jt(V.main),jt(V.statement),At());
},
beforeShowKeyboard:function(){
qt();
}
}),at.myList=new v({
globalData:at,
container:V.mylist,
type:"mine",
canAddComment:P,
onPraise:function(e,t,n,o,i){
!at.canC2CReply&&at.cmtList.setLikeInfo({
type:e,
contentId:t,
replyId:n,
likeStatus:o,
likeNum:i
});
},
onRender:function(){
St();
},
onAdd:function(e,t,n,o,i){
!at.canC2CReply&&"reply"===n&&at.cmtList.add({
data:e,
mode:t,
type:n,
contentId:o,
pos:i
}),St(),Ft(),At();
},
onRemove:function(e,t,n){
V.mylistFolder&&at.myList.showTopItems()&&Ft(),!at.canC2CReply&&at.cmtList.remove({
type:e,
contentId:t,
replyId:n.reply_id
}),St();
},
onEmpty:function(){
jt(V.mylistContainer),jt(V.mylistFooter),M&&document.body.classList.add(ut),At();
},
beforeShowKeyboard:function(){
qt();
}
}),window.cl=at.cmtList,window.ml=at.myList,0===vt&&window.__second_open__&&o.os.ios&&(V.mine.style.marginBottom=getComputedStyle(V.fakebar).height),
!e.notAutoGetComment&&zt({
forceRefresh:!0,
cb:Et
}),"1"===i.getQuery("js_my_comment")&&(1===vt?Ut():0!==vt||dt||Kt(!0)),Ot(),tn(),
dt?X=new j({
placeholder:"Comments are visible to everyone after being approved by the Official Account",
submitText:"Comment",
length:E,
onSubmit:Mt,
onHide:function(){
Ct(V.inputPC);
}
}):0===vt&&(X=new j({
placeholder:"Comments are visible to everyone after being approved by the Official Account",
submitText:"Comment",
length:E,
onSubmit:Mt,
onClick:function(){
window.__second_open__&&jt(V.fakebar);
},
onBlur:function(){
"none"!==V.mine.style.display&&Ct(V.fakebar);
}
}),X.show(g.getId("js_comment_input_old"),{
renderType:"append"
}));
},on=function(){
dt||0!==vt||(l.on("comment",function(){
Vt(null,!0);
}),l.on("article",function(){
It&&console.log("FakeHash on article"),Yt();
}),l.on(function(e){
"comment"===e&&Yt();
}));
};
return on(),{
initComment:nn,
getCommentData:zt,
renderComment:Et
};
});define("appmsg/like_and_share.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","pages/utils.js","appmsg/retry_ajax.js","appmsg/set_font_size.js","common/comm_report.js","appmsg/related_article.js","appmsg/like_profile.js","common/utils.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","appmsg/rec_report_key.js"],function(e,i,o,n){
"use strict";
var t=e("biz_common/dom/event.js"),s=e("biz_common/dom/class.js"),r=e("biz_wap/jsapi/core.js"),a=e("pages/utils.js"),m=a.formatReadNum,l=e("appmsg/retry_ajax.js"),d=e("appmsg/set_font_size.js"),p=e("common/comm_report.js"),w=e("appmsg/related_article.js"),c=e("appmsg/like_profile.js"),_=e("common/utils.js"),k=e("biz_wap/utils/device.js"),u=e("biz_wap/utils/mmversion.js"),g=e("appmsg/appmsg_report.js"),h=e("appmsg/rec_report_key.js"),j=h.RecActionType,f=h.reportRecAction,v=function(e){
return document.getElementById(e);
},b=function(e){
e.style.display="block";
},D={
likeNum:0,
isLike:0,
likeDom:v("like_old"),
likeNumDom:v("likeNum_old"),
shareDom:v("js_bottom_share"),
collectDom:v("js_bottom_collect"),
oprRightDom:v("js_bottom_opr_right"),
shareBottomBtn:v("js_bottom_share_btn"),
likeBottomBtn:v("js_bottom_zan_btn"),
similarZanCard:v("js_similar_video_card"),
overflowFontScale:1
},y=function(e){
c&&c.renderLikeProfile&&c.renderLikeProfile(e);
},B=function(){
var e=0;
try{
e=1*window.atob(window.biz);
}catch(i){}
var o={
BizUin:e,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
EventType:4
};
p.report(19048,o);
},N=function(){
setTimeout(function(){
s.removeClass(D.oprRightDom,"sns_opr_overflow");
var e=D.oprRightDom.querySelectorAll(".js_media_tool_meta"),i=v("js_toobar3").getBoundingClientRect().width,o=0;
if(e&&e.length){
v("js_like_wording").textContent="Wow",v("js_parise_wording").textContent="Like";
for(var n=0;n<e.length;n++)o+=e[n].getBoundingClientRect().width;
if(console.log("benchmarkWidth",i,o),e.length>1&&(i-o)/(e.length-1)<20){
v("js_like_wording").textContent="",v("js_parise_wording").textContent="";
for(var t=0,n=0;n<e.length;n++)t+=e[n].getBoundingClientRect().width;
(i-t)/(e.length-1)<20&&s.addClass(D.oprRightDom,"sns_opr_overflow");
}
}
},50);
},L=function(){
s.addClass(D.likeDom,"praised"),D.likeNum++;
var e=D.likeNumDom.innerHTML;
("100k+"!==e||"100k+"!==e)&&(D.likeNumDom.innerHTML=m(D.likeNum)),D.likeNumDom.style.display="",
w&&w.render&&w.render("praise"),y(["like"]);
},z=function(){
s.removeClass(D.likeDom,"praised"),D.likeNum--;
var e=D.likeNumDom.innerHTML;
D.likeNum>=0&&"100k+"!==e&&"100k+"!==e&&(D.likeNumDom.innerHTML=m(D.likeNum)),0===D.likeNum&&(D.likeNumDom.style.display="none");
},I=[],x=function(e){
"function"==typeof e&&I.push(e);
},C=function(e){
D.isLike=D.isLike?0:1,D.isLike?L():z(),l({
url:"/mp/appmsg_like?__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&like="+D.isLike+"&f=json&appmsgid="+window.appmsgid+"&itemidx="+window.itemidx,
data:{
scene:window.source,
appmsg_like_type:1,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
is_temp_url:window.is_temp_url||0,
style:e||0,
exptype:window.exptype||"",
expsessionid:window.expsessionid||""
},
type:"POST"
}),I.forEach(function(e){
e(D.isLike,D.likeNum);
});
},S=function(e){
return D.likeBottomBtn&&D.likeBottomBtn.disabled===!0?void 0:window.is_temp_url?void("5"!==window.item_show_type||!_.isNativePage()||k.os.pc?window.weui.alert("Unable to do this in preview"):n("Unable to do this in preview")):void C(e);
};
t.on(D.likeDom,"click",function(){
S(),f(j.kLike,D.isLike?1:0);
}),t.on(D.shareDom,"click",function(){
D.shareBottomBtn&&D.shareBottomBtn.disabled===!0||(B(),r.invoke("handleMPPageAction",{
action:"share"
}),y(["share"]),f(j.kShare));
}),t.on(D.collectDom,"click",function(){
r.invoke("handleMPPageAction",{
action:"doFavorite"
}),w&&w.render&&w.render("favorite"),y(["collect"]),g.shareReport({
link:window.msg_link||window.cgiData&&window.cgiData.msg_link,
action_type:24,
share_source:2
}),f(j.kFavorite);
});
var R=function(){
N(),d.onFontScaleChange(N),window.addEventListener("resize",N);
},T=function(e){
var i=e.shareShow,o=e.likeShow,n=e.likeNum,t=e.isLike,r=e.shareGray,a=e.likeGray;
D.likeNum=n,D.isLike=t,i&&D.shareDom&&(k.os.pc?k.os.windows&&u.getInner()>="63010000"&&b(D.shareDom):b(D.shareDom)),
r&&D.shareBottomBtn&&(D.shareBottomBtn.disabled=!0),o&&D.likeDom&&b(D.likeDom),a&&D.likeBottomBtn&&(D.likeBottomBtn.disabled=!0),
o&&D.likeNumDom&&0!==n&&(D.likeNumDom.innerHTML=m(D.likeNum),D.likeNumDom.style.display="",
t&&s.addClass(D.likeDom,"praised")),(u.isWechat&&(k.os.iphone&&u.getInner()>"17001000"||k.os.android&&u.getInner()>"27001300")||k.os.windows&&u.getInner()>="63010000")&&b(D.collectDom),
R(),I.forEach(function(e){
e(D.isLike,D.likeNum);
});
};
return{
initLikeShareDom:T,
triggerLike:S,
onLikeChange:x,
renderProfile:y
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js","appmsg/loading.js","appmsg/like_and_share.js","biz_wap/utils/device.js","appmsg/pay_report_utils.js","pages/utils.js","appmsg/related_article.js","appmsg/rec_report_key.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,i){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:i||"success"
});
}
function initLikeEvent(opt){
function show(e){
e.style.display="";
}
function hide(e){
e.style.display="none";
}
function vShow(e){
e.style.visibility="visible";
}
function vHide(e){
e.style.visibility="hidden";
}
function clear(e){
e.value="";
}
function showLoading(){
commonUtils.isNativePage()?showAppToast("Sending","loading"):Loading.show("Sending");
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):Loading.hide();
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function alert2(e){
"5"!==window.item_show_type||!commonUtils.isNativePage()||Device.os.pc?window.weui.alert(e):alert(e);
}
function failAlert(e){
return e&&e.length>maxLikeCommentWord?void alert2("Comment cannot exceed %s characters".replace("%s",maxLikeCommentWord)):void alert2("Network unavailable. Try again later.");
}
function isAppCommentAvailable(){
return mmversion.isWechat?Device.os.ipad?!1:mmversion.isInMiniProgram?!1:mmversion.isIOS&&mmversion.gtVersion("7.0.8")?!0:mmversion.isAndroid&&mmversion.gtVersion("7.0.8")?!0:commonUtils.isNativePage()&&(mmversion.isIOS||mmversion.isAndroid)?!0:!1:!1;
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,haokanLock=!1,startY,jumpWowLock=!1,el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_toastMsg=qs("js_toast_msg"),el_likeEducate=qs("js_like_educate"),el_friend_like=qs("js_friend_like_area"),el_go_wow=qs("js_go_wow"),el_likeComment=qs("js_like_comment"),el_bcommentPanel2=qs("js_comment_panel"),el_likeCommentShare=qs("js_like_comment_share"),el_likeCommentText=qs("js_comment_text"),el_commentCancel=qs("js_comment_cancel"),el_commentConfirm=qs("js_comment_confirm"),el_commentErrorMsg=qs("js_like_comment_msg"),el_commentCurrentCount=qs("js_like_current_cnt"),el_commentArea=qs("js_comment_area"),el_panelLikeTitle=qs("js_panel_like_title"),el_wowClosePanel=qs("wow_close_inform"),el_wowCloseAck=qs("wow_close_ack"),el_alertPanel=qs("js_alert_panel"),el_alertContent=qs("js_alert_content"),el_alertConfirm=qs("js_alert_confirm");
if(el_like&&el_likeNum){
window.appmsg_like_type&&2===window.appmsg_like_type?jsmonitorReport.setSum(114217,0,1):window.appmsg_like_type&&1===window.appmsg_like_type&&jsmonitorReport.setSum(114217,1,1);
var like_report=function(){
var e=el_like.getAttribute("like"),i=el_likeNum.innerHTML,t=parseInt(e)?parseInt(e):0,o=t?0:1,n=parseInt(i)?parseInt(i):0,s=opt.appmsgid||opt.mid,l=opt.itemidx||opt.idx;
if(reportRecAction(RecActionType.kSeen,o),t){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),n>0&&"100000+"!==i&&(el_likeNum.innerHTML=n-1==0?"Like":n-1);
}else if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==i&&(el_likeNum.innerHTML=n+1);else if(2===appmsg_like_type)return void initRecommendPanel();
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+o+"&f=json&appmsgid="+s+"&itemidx="+l,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
action_type:o?1:2,
device_type:window.devicetype,
exptype:window.exptype||"",
expsessionid:window.expsessionid||""
},
type:"POST"
});
},initRecommendPanel=function(){
sendRecommendAjax(1,"",1);
},isBeenUnvisible=function(e){
function i(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
}
return e.offsetTop+el_likeComment.offsetHeight-i()>=commonUtils.getInnerHeight()?!0:!1;
},disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_likeCommentText.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_likeCommentText.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var i=e.target;
"TEXTAREA"!==i.tagName&&"BUTTON"!==i.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var i=e.targetTouches||[];
if(i.length>0){
var t=i[0]||{};
startY=t.clientY;
}
},preventText=function(e){
var i=!1,t=e.changedTouches,o=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(t.length>0){
var l=t[0]||{},a=l.clientY;
i=a>startY&&0>=o?!1:startY>a&&o+n>=s?!1:!0,i||e.preventDefault();
}
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},validataComment=function(e,i){
var t=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,t,i);
},showEducatePanel=function(e,i,t){
show(el_likeComment);
var o=window.source||window.cgiData&&window.cgiData.source||0;
return o&&(o=parseInt(o,10),94===o)?void(e&&5===e&&hide(el_likeComment)):void(i||(show(el_likeEducate),
t&&t>0&&(el_friend_like.innerHTML="%s friend(s) reading".replace("%s",t),document.getElementById("js_friend_like_word").innerText='Go to "Discover" > "Top Stories" to view',
show(el_friend_like)),1===showType&&(hide(el_go_wow),hide(el_likeCommentShare)),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment),educateExpose()));
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"100k+"!==e&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),renderProfile(["zaikan"]);
},setLike2Status=function(e,i,t){
var o="Wow'ed";
switch(showType){
case 1:
switch(prompted){
case 0:
showEducatePanel(e,i,t),show(el_likeComment),prompted=1;
break;

case 1:
hide(el_likeEducate),showToast(o);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),clear(el_likeCommentText),prompted){
case 0:
showEducatePanel(e,i,t),5===e&&hide(el_likeCommentShare);
break;

case 1:
(4===e||5===e)&&showToast(4===e?"Posted":o);
}
5!==e&&(4===e&&"none"!==el_likeEducate.style.display?hide(el_likeCommentShare):4===e?hide(el_likeComment):(show(el_commentArea),
show(el_likeCommentShare),1===prompted&&hide(el_likeEducate),show(el_likeComment),
isBeenUnvisible(el_likeComment)&&scrollToShow(el_likeComment))),4!==e&&setBtnLike(),
prompted=1;
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
}),log("[Appmsg] zaikan set like success");
},unsetLike2Status=function(e){
1===e?setTimeout(function(){
alert2(" Wow canceled and comment deleted.");
},20):showToast("Canceled"),2===showType&&isShow(el_likeComment)&&hide(el_likeComment);
var i=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_likeComment&&hide(el_likeComment),
realLikeNum-=1,realLikeNum>=0&&"100k+"!==i&&(el_likeNum.innerHTML=formatReadNum(realLikeNum)),
log("[Appmsg] zaikan set unlike success");
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType){
if(!haokanLock){
log("[Appmsg] prepare to send appmsg like request"),showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
like?(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(12),action_type=type):(window.isPaySubscribe&&payReportUtils.reportPayAppmsg(13),
action_type=2),ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
comment:comment?comment:"",
prompted:1,
style:clientType||showType,
action_type:action_type,
passparam:window.passparam,
request_id:(new Date).getTime(),
device_type:window.devicetype,
exptype:window.exptype||"",
expsessionid:window.expsessionid||""
},
type:"POST",
success:function success(res){
haokanLock=!1;
var data=eval("("+res+")");
hideLoading(),log("[Appmsg] success send appmsglike like "+like+" return value is "+JSON.stringify(res)),
0==data.base_resp.ret?(like?(setLike2Status(type,data.is_eu_user,data.friend_like_num),
relatedArticles&&relatedArticles.render&&relatedArticles.render("like")):unsetLike2Status(data.has_comment),
connectWithApp(like,comment,clientType)):failAlert(comment);
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
};
JSAPI.on("menu:haokan",function(e){
var i=0===parseInt(e.recommend)?0:1;
if(0===i)sendRecommendAjax(i,"",2,clientShowType);else{
var t="";
t=e.comment;
var o=1===e.scene?4:5;
sendRecommendAjax(i,t,o,clientShowType);
}
});
var connectWithApp=function(e,i){
var t={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:i?i:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(t)
},function(e){
console.log("handleHaokanAction",e);
}),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
});
},goWoW=function(){
jumpWowLock||(jumpToWowClickReport(),jumpWowLock=!0,JSAPI.invoke("handleHaokanAction",{
action:"jumpToWow",
extParams:JSON.stringify({
autoDropLoad:!0
})
},function(e){
jumpWowLock=!1,console.log("jumpToWow",e),e.err_msg&&"handleHaokanAction:fail_entrance_not_open"===e.err_msg?show(el_wowClosePanel):"handleHaokanAction:fail  action not support"===e.err_msg||"handleHaokanAction:fail, action not support"===e.err_msg?alert2("Your Weixin version is out-of-date. Unable to perform this operation."):"handleHaokanAction:ok"===e.err_msg&&hide(el_likeComment),
JSAPI.invoke("handleHaokanAction",{
action:actionString,
server_data:JSON.stringify({
origin:"mp",
autoDropLoad:!0
})
},function(e){
console.log("sendAutoDropLoad",e);
});
}));
},likeClickReport=function(){
ajax({
url:"/mp/appmsgreport?action=appmsglikeclickcomment&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
});
},likeExpose=function e(){
var i=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,t=qs("like3").offsetTop,o=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
i+commonUtils.getInnerHeight()>t&&t>=i&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+o+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
},educateExpose=function i(){
var e=(document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,
opt.appmsgid||opt.mid),t=opt.itemidx||opt.idx,o=window.item_show_type,n=window.enterid||window.cgiData&&window.cgiData.enterid||"";
el_likeEducate&&"none"!=el_likeEducate.style.display&&commonUtils.getInnerHeight()>el_likeEducate.getBoundingClientRect().top&&el_likeEducate.getBoundingClientRect().top+el_likeEducate.getBoundingClientRect().height>0&&(ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,t,window.source,window.subscene,1,o,sessionid,n]
},
async:!1,
timeout:2e3
}),DomEvent.off(window,"scroll",i));
},jumpToWowClickReport=function(){
var e=opt.appmsgid||opt.mid,i=opt.itemidx||opt.idx,t=window.enterid||window.cgiData&&window.cgiData.enterid||"";
ajax({
url:"/mp/webcommreport?action=report&report_useruin=1&__biz="+window.biz,
type:"POST",
data:{
logid:18266,
buffer:["",Base64.decode(opt.biz),e,i,window.source,window.subscene,2,window.item_show_type,sessionid,t]
},
async:!1,
timeout:2e3
});
};
DomEvent.on(el_alertConfirm,"click",function(){
el_alertPanel.style.display="none";
}),DomEvent.on(el_like,"click",function(e){
if(el_likeBtn.disabled!==!0){
if(window.is_temp_url)return void alert2("Unable to do this in preview");
var i=el_like.getBoundingClientRect();
return log("[Appmsg zaikan location] top: "+i.top+" left: "+i.left+" bottom: "+i.bottom+" right: "+i.right),
log("[Appmsg zaikan click] clientX: "+e.clientX+" clientY: "+e.clientY),e.currentTarget.classList.contains("js_disabled")?!1:(like_report(e),
!1);
}
}),DomEvent.on(el_wowCloseAck,"click",function(){
hide(el_wowClosePanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_commentConfirm,"mousedown",function(){
validataComment(el_likeCommentText,4);
}),DomEvent.on(el_commentCancel,"mousedown",function(){
hide(el_bcommentPanel2),clear(el_likeCommentText),vHide(el_commentErrorMsg),enableMove();
}),DomEvent.on(el_likeCommentShare,"click",function(){
return commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,1*window.item_show_type===10&&(el_panelLikeTitle.innerHTML=window.msg_title.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,"")),
show(el_bcommentPanel2),el_likeCommentText.focus(),el_commentConfirm.setAttribute("disabled","disabled"),
disableMove(),void likeClickReport());
}),DomEvent.on(el_likeCommentText,"focus",function(){}),DomEvent.on(el_likeCommentText,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose),DomEvent.on(window,"scroll",educateExpose),
DomEvent.on(el_go_wow,"click",goWoW);
var scrollToShow=function(e){
e.scrollIntoView(!1);
};
DomEvent.on(el_likeCommentText,"input",function(e){
var i=el_likeCommentText.value.replace(/^\s+|\s+$/g,"");
i.length>maxLikeCommentWord?(el_commentCurrentCount.innerHTML=i.length,vShow(el_commentErrorMsg)):vHide(el_commentErrorMsg),
i.length>0&&i.length<=maxLikeCommentWord?el_commentConfirm.removeAttribute("disabled"):el_commentConfirm.setAttribute("disabled","disabled"),
Device.os.ios&&e.data&&doubleInputChar.indexOf(e.data)>-1&&(focusTag=!0);
}),DomEvent.on(el_likeCommentText,"click",function(){
Device.os.ios&&focusTag&&(el_likeCommentText.blur(),el_likeCommentText.focus(),focusTag=!1);
});
}
}
function showLikeNum(e){
var i=e||{};
if(i.show){
var t=i.likeAreaDom,o=i.likeNumDom,n=document.getElementById("js_like_btn");
t&&(t.style.display=i.likeAreaDisplayValue,t.style.visibility="",i.liked&&(1===appmsg_like_type?Class.addClass(t,i.className):Class.addClass(n,i.className)),
t.setAttribute("like",i.liked?"1":"0"),i.likeGray&&(n.disabled=!0));
var s=1===appmsg_like_type?"Like":"";
realLikeNum=i.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
o&&(o.innerHTML=realLikeNum)):2===appmsg_like_type&&(o.innerHTML=formatReadNum(realLikeNum));
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),Base64=require("biz_common/base64.js"),jsmonitorReport=require("biz_wap/utils/jsmonitor_report.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),Loading=require("appmsg/loading.js"),_require=require("appmsg/like_and_share.js"),renderProfile=_require.renderProfile,realLikeNum,clientShowType=5,Device=require("biz_wap/utils/device.js"),payReportUtils=require("appmsg/pay_report_utils.js"),_require2=require("pages/utils.js"),formatReadNum=_require2.formatReadNum,relatedArticles=require("appmsg/related_article.js"),_require3=require("appmsg/rec_report_key.js"),RecActionType=_require3.RecActionType,reportRecAction=_require3.reportRecAction,maxLikeCommentWord=200,focusTag=!1,doubleInputChar=["??????","??????","??????","??????","??????","??????","??????","??????","??????","??????","[]","??????","{}","()","<>"];
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum
};
});define("appmsg/read.js",["pages/utils.js","biz_wap/utils/device.js"],function(e){
"use strict";
function i(e){
var i=e||{},n=1586325600,d="undefined"!=typeof window.ct?parseInt(window.ct,10):0;
if(i.show){
var s=i.readAreaDom,o=i.readNumDom;
s&&(s.style.display=i.readAreaDisplayValue);
var r=i.readNum||1,w=window.ori_send_time||window.cgiData&&window.cgiData.ori_send_time||0,p=/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),m=1566025200,u=1565971200,_=a.os.ios||p?m:u;
parseInt(w,10)>_&&window.item_show_type&&"5"===window.item_show_type&&(n>d?("en"!==window.LANG&&(document.getElementById("readTxt").innerText="Play"),
r=i.videouv||0):("en"!==window.LANG&&(document.getElementById("readTxt").innerText="Watch"),
r=i.readNum||0)),1===window.appmsg_like_type?(parseInt(r,10)>1e5?r="100000+":"",
o&&(o.innerHTML=r)):2===window.appmsg_like_type&&(o.innerHTML=t(r),""===o.innerHTML&&(o.innerHTML="0"));
}
}
var n=e("pages/utils.js"),t=n.formatReadNum,a=e("biz_wap/utils/device.js");
return{
showReadNum:i
};
});var _extends=Object.assign||function(o){
for(var e=1;e<arguments.length;e++){
var i=arguments[e];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o[n]=i[n]);
}
return o;
};
define("appmsg/like_profile.js",["biz_common/template-2.0.1-cmd.js","appmsg/like_profile_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/utils.js","common/comm_report.js","biz_wap/utils/mmversion.js"],function(o){
"use strict";
function e(){
console.log(h),l.isWindows?location.href=h:c.invoke("profile",{
username:f,
scene:"209"
},function(){});
}
function i(o){
var i={
bottomOpr:m("js_bottom_opr_right"),
container:m("js_like_profile_container")
};
s({
url:"/mp/getbizbanner?__biz="+window.biz,
type:"GET",
dataType:"json",
success:function(s){
if(!s.base_resp||0===s.base_resp.ret){
var r=s.friend_subscribe_count,b=s.is_subscribed,k=s.orignal_num,z=s.is_ban;
if(!b&&!z){
_=!b,i.container.innerHTML=n.compile(t)({
friendSubscribeCount:r,
isSubscribed:b,
orignalNum:k,
isShowFocusBottom:_,
roundHeadImg:u,
nickname:w
}),o.forEach(function(o){
d.report(23219,_extends({},g,{
Actiontype:1,
type:j[o]
}));
}),m("js_like_profile_bar").classList.remove("wx_follow_hide");
var B=p("js_function_mod_inner")[0].offsetHeight;
p("js_function_mod")[0].style.height=B+"px",i.focusBottom=m("js_focus"),i.alreadyFocusBottom=m("js_already_focus"),
_?(i.focusBottom.style.display="block",i.alreadyFocusBottom.style.display="none"):(i.focusBottom.style.display="none",
i.alreadyFocusBottom.style.display="block"),a.on(i.focusBottom,"click",function(e){
e.stopPropagation(),o.forEach(function(o){
d.report(23219,_extends({},g,{
Actiontype:2,
type:j[o]
}));
}),l.isWindows?location.href=h:c.invoke("quicklyAddBrandContact",{
username:f,
scene:y
},function(o){
/ok/.test(o.err_msg)&&(i.focusBottom.style.display="none",i.alreadyFocusBottom.style.display="block");
});
}),a.on(i.alreadyFocusBottom,"click",function(i){
o.forEach(function(o){
d.report(23219,_extends({},g,{
Actiontype:4,
type:j[o]
}));
}),i.stopPropagation(),e();
}),a.on(m("js_like_profile_bar"),"click",function(){
o.forEach(function(o){
d.report(23219,_extends({},g,{
Actiontype:3,
type:j[o]
}));
}),e();
});
}
}
}
});
}
var n=o("biz_common/template-2.0.1-cmd.js"),t=o("appmsg/like_profile_tpl.html.js"),s=o("biz_wap/utils/ajax.js"),a=o("biz_common/dom/event.js"),c=o("biz_wap/jsapi/core.js"),r=o("pages/utils.js"),m=r.getId,p=r.getByClass,d=o("common/comm_report.js"),l=o("biz_wap/utils/mmversion.js"),_=!0,u=window.round_head_img||window.cgiData.round_head_img||"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0",w=window.nickname||window.cgiData.nick_name,f=window.user_name||window.cgiData.user_name,b=window.appuin||window.cgiData.biz,y=209,j={
share:1,
collect:2,
zaikan:3,
like:4
},g={
Msgid_from:1*(window.msgid||window.appmsgid),
Itemidx_from:1*window.idx,
Bizuin:window.biz,
Itemshowtype:1*window.item_show_type,
Sessioid:window.sessionid,
Enterid:1*window.enterid,
Scene:1*window.source,
Subscene:1*window.subscene
},h="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+b+"&scene=112#wechat_redirect";
return{
renderLikeProfile:i
};
});define("appmsg/share_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <a href="<#= url #>" class="share_appmsg_container appmsg_card_context flex_context">\n        <div class="flex_hd">\n            <i class="share_appmsg_icon"> </i>\n        </div>\n        <div class="flex_bd">\n            <div class="share_appmsg_title">Share with followers</div>\n            <p class="share_appmsg_desc">Immediately share Original Articles with followers of your Official Account.</p>\n        </div>\n    </a>\n</div>\n';
});define("appmsg/appmsgext.js",["appmsg/log.js","biz_wap/utils/ajax.js","rt/appmsg/getappmsgext.rt.js","biz_common/utils/wxgspeedsdk.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function i(e){
var i={
biz:"",
appmsg_type:"",
mid:"",
sn:"",
album_id:"",
idx:"",
scene:"",
title:"",
ct:"",
abtest_cookie:"",
devicetype:"",
version:"",
is_need_ticket:0,
is_need_ad:0,
comment_id:"",
is_need_reward:0,
both_ad:0,
reward_uin_count:0,
send_time:"",
msg_daily_idx:"",
is_original:0,
is_only_read:0,
req_id:"",
pass_ticket:"",
is_temp_url:0,
more_read_type:0,
rtId:"",
rtKey:"",
appmsg_like_type:1,
related_video_sn:"",
vid:"",
is_pay_subscribe:0,
pay_subscribe_uin_count:0,
has_red_packet_cover:0,
related_video_num:e.isPublicRelatedVideo?10:5,
album_video_num:5,
onSuccess:function(){},
onError:function(){}
};
for(var o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);
console.info("[(Comment, Like, Reward) Send request]:",new Date),t({
url:"/mp/getappmsgext?f=json&mock="+a.getQuery("mock"),
data:{
r:Math.random(),
__biz:i.biz,
appmsg_type:i.appmsg_type,
mid:i.mid,
sn:i.sn,
idx:i.idx,
scene:i.scene,
title:encodeURIComponent(i.title.htmlDecode()),
ct:i.ct,
abtest_cookie:i.abtest_cookie,
devicetype:i.devicetype.htmlDecode(),
version:i.version.htmlDecode(),
is_need_ticket:i.is_need_ticket,
is_need_ad:i.is_need_ad,
comment_id:i.comment_id,
is_need_reward:i.is_need_reward,
both_ad:i.both_ad,
reward_uin_count:i.is_need_reward?i.reward_uin_count:0,
send_time:i.send_time,
msg_daily_idx:i.msg_daily_idx,
is_original:i.is_original,
is_only_read:i.is_only_read,
req_id:i.req_id,
pass_ticket:i.pass_ticket,
is_temp_url:i.is_temp_url,
item_show_type:i.item_show_type,
tmp_version:1,
more_read_type:i.more_read_type,
appmsg_like_type:i.appmsg_like_type,
related_video_sn:i.related_video_sn,
related_video_num:i.related_video_num,
vid:i.vid,
is_pay_subscribe:i.is_pay_subscribe,
pay_subscribe_uin_count:i.pay_subscribe_uin_count,
has_red_packet_cover:i.has_red_packet_cover,
album_id:0x11fd1c7c75070000,
album_video_num:i.album_video_num,
cur_album_id:window.appmsg_album_info?window.appmsg_album_info.id:"",
is_public_related_video:i.isPublicRelatedVideo,
encode_info_by_base64:i.encodeInfoByBase64
},
type:"POST",
dataType:"json",
rtId:i.rtId,
rtKey:i.rtKey,
rtDesc:_,
async:!0,
success:function(e){
if(console.info("[(Comment, Like, Reward) Respond to request]:",new Date,e),s("[Appmsg] success get async data"),
"function"==typeof i.onSuccess&&i.onSuccess(e),e)try{
s("[Appmsg] success get async data, async data is: "+JSON.stringify(e));
}catch(t){}else s("[Appmsg] success get async data, async data is empty");
if(!d&&"5"===window.item_show_type){
var _=Date.now()-window.logs.pagetime.page_begin;
if(d=!0,Math.random()>.1)return;
n.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:29,
time:_
}]
}),n.send();
}
},
error:function(){
s("[Appmsg] error get async data, biz="+i.biz+", mid="+i.mid),"function"==typeof i.onError&&i.onError();
},
complete:function(){
"function"==typeof i.onComplete&&i.onComplete();
}
});
}
var s=e("appmsg/log.js"),t=e("biz_wap/utils/ajax.js"),_=e("rt/appmsg/getappmsgext.rt.js"),n=e("biz_common/utils/wxgspeedsdk.js"),a=e("biz_common/utils/url/parse.js"),d=void 0;
return{
getData:i
};
});