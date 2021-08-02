var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var o=arguments[t];
for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);
}
return e;
};
define("appmsg/live.js",["biz_common/dom/event.js","appmsg/weapp_common.js","biz_common/moment.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/tmpl.js","appmsg/appmsg_live_tpl.html.js","biz_wap/utils/wapsdk.js","common/utils.js","biz_common/dom/offset.js","common/comm_report.js"],function(e){
"use strict";
function t(e,t){
g.jsmonitor({
id:223326,
key:e,
value:t
});
}
function o(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
f.report(21032,_extends({
MsgId:1*z.mid,
ItemIdx:1*z.idx,
BizUin:z.biz,
PreScene:1*z.scene,
ActionType:1e4
},e));
}
function n(e){
var t=arguments.length<=1||void 0===arguments[1]?1:arguments[1];
return e=Number(e),null===e?0:isNaN(e)?"-":((isNaN(t)||null===t)&&(t=1),e>9999e8?"9990%s".replace("%s","亿+"):e>99999499?Number((e/1e8).toFixed(t))+"00M":e>=1e4?Number((e/1e4).toFixed(t))+"0K":e);
}
function s(){
function e(){
if(h.length)for(var e=0;e<h.length;e++){
var n=h[e];
if(!n.cardExposed){
var s=_.getOffset(n).offsetTop,i=v.getScrollTop();
i+v.getInnerHeight()>=s&&i<=s+n.offsetHeight&&(t(9),o({
SubActionType:1,
RoomId:n.liveInfo.room_id
}),n.cardExposed=!0);
}
}
}
m.on(document.body,"tap","."+j,function(e){
var n=e.delegatedTarget.liveInfo,s=encodeURIComponent(location.href);
t(10),o({
SubActionType:2,
RoomId:n.room_id
}),107!==n.status&&r.jumpUrl({
options:{
userName:"gh_9dcc2ce385c1",
appId:"wx60422b707e49ff2e",
relativeURL:"pages/player/player?roomId="+n.room_id+"&roomAppId="+n.room_appid+"&sceneNote="+s+"&preScene="+z.scene,
openType:2
}
});
}),v.bindDebounceScrollEvent(e),e();
}
function i(){
for(var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=0;t<e.length;t++){
var o="",i="",a="",m="",r=e[t],d=r.status;
if(104!==d){
var c=101===d||105===d||106===d,g=103===d||107===d;
if(c)o="直播中",i="正在直播: ",a="进入直播";else if(0===d||102===d){
o="直播",i="即将直播: ",a="开播提醒";
var v=z.svrTime?new Date(1e3*z.svrTime):new Date,_=v.getFullYear(),f=v.getMonth(),j=v.getDate(),h=new Date(_,f,j,0,0,0).getTime(),w=h+864e5,y=1e3*r.begin_time,I=new Date(y).getFullYear()!==_,T=y>=h&&w>y,x=y>=w&&w+864e5>y,N=void 0;
N=T?"Today":x?"明天":I?"YYYY年M月D日":"M月D日";
var S=l(y).format(N+" HH:MM");
m=S+" 开播";
}else g&&(o="直播结束",i="直播已结束: ",a="查看直播");
(c||g)&&(m=n(r.view_count)+" Watch");
var D=document.getElementsByClassName(""+b+r.room_id)[0];
D&&(D.liveInfo=r,D.innerHTML=p.tmpl(u,{
tagStatusWord:o,
liveStatusWord:i,
btnStatusWord:a,
statusInfoWord:m,
showEntryBtn:107!==d,
title:""+i+r.room_name,
desc:r.nickname+"的直播",
cover:r.cover,
isInLive:c,
isEnd:g,
likeCount:n(r.like_count),
liveDeleted:1===r.room_status
}));
}
}
s();
}
function a(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(h.length){
_extends(z,e);
for(var t=[],o=0;o<h.length;o++)t.push(h[o].dataset.id),d.addClass(h[o],j),d.addClass(h[o],""+b+h[o].dataset.id);
c({
url:"/mp/getappmsglive",
type:"POST",
dataType:"json",
data:{
__biz:e.biz,
mid:e.mid,
idx:e.idx,
scene:e.scene,
live_id:t.join(",")
},
success:function(e){
e&&e.live_info&&e.live_info.length&&i(e.live_info);
}
});
}
}
var m=e("biz_common/dom/event.js"),r=e("appmsg/weapp_common.js"),l=e("biz_common/moment.js"),d=e("biz_common/dom/class.js"),c=e("biz_wap/utils/ajax.js"),p=e("biz_common/tmpl.js"),u=e("appmsg/appmsg_live_tpl.html.js"),g=e("biz_wap/utils/wapsdk.js"),v=e("common/utils.js"),_=e("biz_common/dom/offset.js"),f=e("common/comm_report.js"),j="js_live_card",b="js_live_card_",h=document.getElementsByTagName("mplive"),z={};
return{
init:a
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("appmsg/profile/mp_insert_profile.js",["biz_common/tmpl.js","appmsg/profile/mp_profile_tpl.html.js","biz_common/dom/event.js","common/utils.js","common/comm_report.js","appmsg/profile/ban_alert_tpl.html.js","appmsg/appmsg_card.js","biz_wap/utils/mmversion.js","pages/utils.js"],function(e){
"use strict";
function t(e){
try{
return 1*window.atob(e);
}catch(t){}
return 0;
}
function n(e,n,i,o){
p.report(22316,{
BizUin:t(window.biz),
AppMsgID:window.parseInt(window.mid,10)||0,
ItemIndex:window.parseInt(window.idx,10)||0,
Itemshowtype:0,
SessionId:window.sessionid+"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:1*window.source,
Subscene:1*window.subscene,
ActionType:e,
toBizuin:t(n),
isBizBan:1*i,
isMassSend:1*window.appmsg_type,
CardType:o
});
}
function i(){
if(g&&g.length&&_.length===g.length)return void d.off(window,"scroll",i);
for(var e=0;e<g.length;e++){
var t=g[e],o=t.querySelector(".js_wx_profile_card");
if(o&&o.getBoundingClientRect().top>0&&o.getBoundingClientRect().top+o.getBoundingClientRect().height/2<=m.getInnerHeight()){
var r=o.getAttribute("data-id"),s=o.getAttribute("data-index");
if(-1===_.indexOf(s)){
_.push(s);
var a=o.getAttribute("data-isban"),p=1*t.getAttribute("data-from");
n(0,r,a,p);
}
}
}
}
function o(e,t,i,o,r){
e.addEventListener("click",function(){
if(n(1,i,o,r),o){
var e=function(){
var e=document.getElementById("js_profile_ban");
return"none"===e.style.display&&(e.style.display="block",setTimeout(function(){
e.style.display="none";
},2e3)),{
v:void 0
};
}();
if("object"===("undefined"==typeof e?"undefined":_typeof(e)))return e.v;
}
!u.isWechat||u.is_wxwork?window.weui.alert("请在微信内打开"):f.goProfile({
biz:i,
scene:124
},{
username:t,
scene:"200"
});
});
var s=e.querySelector(".js_wx_profile_card");
c.addAppmsgCardTouchEvent(s);
}
function r(){
var e=document.getElementById("js_content");
if(e){
g=document.getElementsByTagName("mpprofile")||[];
for(var t=window.mp_profile,n=0;n<g.length;n++){
var r=g[n],d=r.getAttribute("data-id"),m=1*r.getAttribute("data-from"),p=t[n],c=document.querySelector('[data-preloadingid="'+d+'"]');
c&&r.parentNode.removeChild(c),p?(r.innerHTML=s.tmpl(a,{
index:n,
id:p.fakeid,
round_head_img:p.round_head_img,
nickname:p.nickname.htmlDecode(),
alias:p.alias.htmlDecode(),
signature:p.signature.htmlDecode(),
original_num:p.original_num,
isban:p.is_biz_ban
}),o(r,p.username,p.fakeid,p.is_biz_ban,m)):r.innerHTML="";
}
i();
var u=document.createElement("div");
u.innerHTML=s.tmpl(l,{}),document.body.appendChild(u);
}
}
var s=e("biz_common/tmpl.js"),a=e("appmsg/profile/mp_profile_tpl.html.js"),d=e("biz_common/dom/event.js"),m=e("common/utils.js"),p=e("common/comm_report.js"),l=e("appmsg/profile/ban_alert_tpl.html.js"),c=e("appmsg/appmsg_card.js"),u=e("biz_wap/utils/mmversion.js"),f=e("pages/utils.js"),g=[],_=[];
d.on(window,"scroll",i),r();
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
};
define("appmsg/channel/channels.js",["biz_common/tmpl.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/appmsg_card.js","appmsg/channel/video_snap_tpl.html.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","pages/utils.js","common/utils.js","common/comm_report.js","appmsg/channel/time_format.js","appmsg/channel/report_live.js","biz_common/dom/class.js"],function(e,t,n,i){
"use strict";
function o(){
return!N.isWechat||F.os.pc||N.is_wxwork?!1:N.isIOS&&N.ltVersion("7.0.15",!1)?!1:N.isAndroid&&window.clientversion<="27001337"?!1:N.isAndroid&&window.clientversion>"2700135F"&&window.clientversion<"27001400"?!1:!0;
}
function a(){
return!N.isWechat||F.os.pc||N.is_wxwork?!1:N.isAndroid&&window.clientversion<"2700143c"?!1:N.isIOS&&window.clientversion<"17001228"?!1:!0;
}
function r(){
return!N.isWechat||F.os.pc||N.is_wxwork?!1:N.isAndroid&&window.clientversion<"2700143c"?!1:N.isIOS&&window.clientversion<"17001228"?!1:!0;
}
function s(){
return F.os.pc?N.isMac&&N.cpVersion("3.1.0",1,!0,"mac")?!0:N.isWindows&&N.getWindows()>="63030000"?!0:!1:!1;
}
function d(e,t,n){
D.report(21146,{
BizUin:X,
AppMsgID:window.parseInt(window.mid,10)||0,
ItemIndex:window.parseInt(window.idx,10)||0,
ExportId:t||"",
Action:e,
Username:n||"",
Scene:window.parseInt(window.scene,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
EnterId:window.parseInt(window.enterid,10)||0
});
}
function c(e){
return"live"===e?void(N.isAndroid&&window.clientversion<"2700143c"||N.isIOS&&window.clientversion<"17001228"?window.weui.alert("请升级微信客户端版本后查看"):N.isWechat&&F.os.pc?window.weui.alert("当前版本暂不支持查看，请在手机上查看"):N.isInMiniProgram?window.weui.alert("暂不支持从小程序进入直播间"):(!N.isWechat||N.is_wxwork)&&i("请在微信内打开")):(("1"===e||0===e)&&N.isInMiniProgram&&window.weui.alert("暂不支持从小程序进入视频号"),
N.isAndroid&&window.clientversion>"2700135F"&&window.clientversion<"27001400"?void window.weui.alert("当前版本暂不支持查看"):(N.isWechat&&F.os.pc?window.weui.alert("当前版本暂不支持查看，请在手机上查看"):(!N.isWechat||N.is_wxwork)&&i("请在微信内打开"),
void(!N.isWechat||F.os.pc||N.is_wxwork||B.jumpUrl("https://support.weixin.qq.com/update/",!0))));
}
function u(e){
if(r()){
var t={
action:"openFinderProfile",
finderUserName:e,
commentScene:5,
reportExtraInfo:JSON.stringify({
scenenote:{
bizUin:X,
msgid:window.parseInt(window.mid,10)||0,
idx:window.parseInt(window.idx,10)||0,
scene:window.parseInt(window.scene,10)||0,
enterid:window.parseInt(window.enterid,10)||0,
action:5,
status:Q,
actionTS:Math.ceil(Date.now()/1e3)
}
})
};
W.invoke("openFinderView",{
extInfo:t
},function(e){
console.log("openFinderView",e);
});
}else c("profile");
}
function l(e,t){
if(a())W.invoke("openFinderView",{
extInfo:{
action:"autoOpenFinderLive",
finderUserName:e,
commentScene:5,
reportExtraInfo:JSON.stringify({
scenenote:{
bizUin:X,
msgid:window.parseInt(window.mid,10)||0,
idx:window.parseInt(window.idx,10)||0,
scene:window.parseInt(window.scene,10)||0,
enterid:window.parseInt(window.enterid,10)||0,
action:4,
status:Q,
actionTS:Math.ceil(Date.now()/1e3)
}
})
}
},function(e){
console.log("openFinderLive",e);
});else if(s())if(t){
var n=window.location.protocol||"https:";
t=encodeURIComponent(t);
var i=n+("//channels.weixin.qq.com/web/pages/live?eid="+t);
W.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
console.log("openUrlWithExtraWebview",e);
});
}else c();else c("live");
}
function p(e,t,n,i,a){
if(d(2,e,n),o()){
var r={
action:"openFinderFeed",
feedID:e,
nonceID:t,
notGetReleatedList:9===i?"1":0,
shareScene:11,
requestScene:16,
reportExtraInfo:JSON.stringify({
mp:{
scene:1
}
})
};
W.invoke("openFinderView",{
extInfo:r
},function(e){
console.log("openFinderDetailView",e);
});
}else if(s())if(a){
var u=window.location.protocol||"https:";
a=encodeURIComponent(a);
var l=u+("//channels.weixin.qq.com/web/pages/feed?eid="+a);
W.invoke("openUrlWithExtraWebview",{
url:l,
openType:1
},function(e){
console.log("openUrlWithExtraWebview",e);
});
}else c(i);else d(3,e,n),c(i);
}
function w(e){
return H.filter(function(t){
return t.export_id===e;
});
}
function m(e){
return J.filter(function(t){
return t.notice_id===e;
});
}
function _(e){
var t=e.parentNode;
if(t){
var n=t.getAttribute("data-id"),i=w(n),o=void 0;
i&&i.length>0&&(o=i[0]);
var a=o&&o.nonce_id?o.nonce_id:t.getAttribute("data-nonceid"),r=o&&o.flag||0,s=o&&o.username?o.username:t.getAttribute("data-username"),d=o&&o.media_type?o.media_type:t.getAttribute("data-mediatype"),c=o&&o.export_id;
0===r&&p(n,a,s,d,c);
}
}
function v(){
for(var e=document.getElementsByClassName("js_wechannel_img_card"),t=function(t){
var n=e[t];
z.on(n,"tap",function(){
_(n);
}),O.addAppmsgCardTouchEvent(n);
},n=0;n<e.length;n++)t(n);
}
function g(){
for(var e=document.getElementsByClassName("js_wechannel_video_card"),t=function(t){
var n=e[t];
z.on(n,"tap",function(){
_(n);
}),O.addAppmsgCardTouchEvent(n);
},n=0;n<e.length;n++)t(n);
}
function f(e){
var t=m(e);
t&&t.length>0&&(t=t[0]);
var n=t.status,i=t.reservation;
return 0===n?0===i?1:2:1===n?5:2===n?3:3===n?4:1;
}
function h(){
for(var e=document.getElementsByClassName("js_wechannel_live_card"),t=function(e){
var t=e.currentTarget,n=t.getAttribute("data-username"),i=t.getAttribute("data-noticeid");
V.report(5,i,n,f(i)),Q=f(i),u(n);
},n=0;n<e.length;n++){
var i=e[n];
z.on(i,"tap",t),O.addAppmsgCardTouchEvent(i,".js_channel_btn_operation");
}
}
function b(e,t,n){
return N.is_wxwork||!N.isWechat?void window.weui.alert("请在微信内操作"):void q({
url:"/mp/appmsg_video_snap?action=reserve_live",
type:"POST",
dataType:"json",
async:!0,
data:{
username:e,
notice_id:t,
reserve_status:n
},
success:function(e){
if(e&&e.base_resp&&0===e.base_resp.ret){
for(var i=document.querySelectorAll('.js_channel_btn_operation[data-noticeid="'+t+'"]'),o=0;o<i.length;o++){
var a=i[o];
a.setAttribute("data-reservation",1===n?1:0),a.querySelector(".js_channel_btn_operation_wording").innerHTML=1===n?"已预约":"预约",
1===n?L.addClass(a,"weui-btn_disabled"):L.removeClass(a,"weui-btn_disabled");
}
var r=m(t);
r&&r.length>0&&r.forEach(function(e){
e.reservation=1===n?1:0;
});
}else window.weui.alert("System busy. Try again later.");
},
error:function(){
window.weui.alert("Operation failed");
}
});
}
function y(){
for(var e=document.getElementsByClassName("js_channel_btn_operation"),t=function(e){
var t=e.currentTarget,n=t.getAttribute("data-noticeid"),i=t.getAttribute("data-username"),o="";
return J instanceof Array&&J.forEach(function(e){
e.notice_id===n&&(o=e.export_id);
}),V.report(4,n,i,f(n)),Q=f(n),l(i,o),!1;
},n=function(n){
var i=e[n],o=parseInt(i.getAttribute("data-status"),10);
2===o?z.on(i,"tap",t):0===o&&z.on(i,"tap",function(){
if(window.is_temp_url)return window.weui.alert("Unable to do this in preview"),!1;
var e=i.getAttribute("data-noticeid"),t=i.getAttribute("data-reservation"),n=i.getAttribute("data-username");
return"0"===t?V.report(2,e,n,f(e)):V.report(3,e,n,f(e)),b(n,e,"0"===t?1:2,i),!1;
});
},i=0;i<e.length;i++)n(i);
}
function j(){
if(P&&P.length&&G.length===P.length)return void z.off(window,"scroll",j);
for(var e=0;e<P.length;e++){
var t=P[e],n=t.firstChild;
if(n&&n.getBoundingClientRect().top>0&&n.getBoundingClientRect().top+n.getBoundingClientRect().height/2<=M.getInnerHeight()){
var i=t.getAttribute("data-id")||t.getAttribute("data-noticeid"),o=t.getAttribute("data-username"),a=t.getAttribute("data-type");
-1===G.indexOf(i)&&(G.push(i),"live"===a?V.report(1,i,o,f(i)):d(1,i,o));
}
}
}
function A(e,t,n,i){
for(var o=document.querySelectorAll('.js_wechannel_live_card[data-noticeid="'+e+'"]'),a=0;a<o.length;a++){
var r=o[a],s=r.querySelector('.js_channel_btn_operation[data-noticeid="'+e+'"]'),d=R.getStatusWording(t,n),c=R.getStatusDesc(i,t);
s&&(s.querySelector(".js_channel_btn_operation_wording").innerHTML=d,s.setAttribute("data-reservation",n),
s.setAttribute("data-status",t),r.querySelector(".js_wechannel_live_desc").innerHTML=c,
0!==t&&2!==t||0!==n?L.addClass(s,"weui-btn_disabled"):L.removeClass(s,"weui-btn_disabled"),
s.querySelector(".js_wechannnel_live").style.display=2===t?"block":"none");
}
}
function I(){
for(var e={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
video_snap_num:J.length
},t=0;t<J.length;t++){
var n=J[t].notice_id,i=J[t].username;
e["notice_id_"+t]=n,e["username_"+t]=i;
}
var o="/mp/appmsg_video_snap?action=batch_get_flag_info";
for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(o+="&"+a+"="+encodeURIComponent(e[a]));
q({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
if(e&&e.base_resp&&0===e.base_resp.ret&&e.live_info&&e.live_info.length>0)for(var t=0;t<e.live_info.length;t++){
var n=e.live_info[t],i=m(n.notice_id);
if(i&&i.length>0){
var o=i[0];
(n.status!==o.status||n.reservation!==o.reservation)&&(o.reservation=n.reservation,
o.status=n.status,A(n.notice_id,n.status,n.reservation,o.start_time));
}
}
},
error:function(){}
});
}
function x(){
z.bindVisibilityChangeEvt(function(e){
e&&I();
});
}
function S(){
v(),g(),y(),h(),x(),z.on(window,"scroll",j);
}
function k(){
var e=document.getElementById("js_content");
if(e){
P=e.getElementsByTagName("mpvideosnap")||[];
for(var t=0;t<P.length;t++){
var n=P[t],i=n.getAttribute("data-id")||n.getAttribute("data-noticeid")||"",o=n.getAttribute("data-type")||"video",a=void 0;
if("live"===o){
var r=n.getAttribute("data-noticeid")||"",s=m(r),d=s.length>0?s[0]:{};
a={
snapType:"live",
headImgUrl:d.head_url||n.getAttribute("data-headimgurl")||"",
nickname:d.nickname||n.getAttribute("data-nickname")||"",
desc:R.getStatusDesc(d.start_time,d.status)||n.getAttribute("data-desc")||"",
reservation:d.reservation||0,
status:d.status||0,
username:d.username||n.getAttribute("data-username")||"",
noticeid:d.notice_id||n.getAttribute("data-noticeid")||"",
liveWording:R.getStatusWording(d.status||0,d.reservation||0),
flag:1===d.spam_flag||2===d.spam_flag?1:0
},K.push({
noticeid:d.notice_id||n.getAttribute("data-noticeid")||"",
status:d.status||0
});
}else{
var s=w(i),c=s.length>0?s[0]:{},u=4===c.media_type||9===c.media_type?"video":"image";
a={
snapType:c&&c.media_type?u:n.getAttribute("data-type"),
url:c.feed_cover_url||c.feed_thumb_url||n.getAttribute("data-url")||"",
headImgUrl:c.head_url||n.getAttribute("data-headimgurl")||"",
nickname:c.nickname||n.getAttribute("data-nickname")||"",
desc:c.feed_desc||n.getAttribute("data-desc")||"",
flag:c.flag||0
},"image"===a.snapType&&(a=_extends(a,{
imgCount:parseInt(c.media_num||"0",10)||parseInt(n.getAttribute("data-imgcount")||"0",10)||0
}));
}
var l=document.createElement("div");
l.innerHTML=T.tmpl(U,a),l.firstElementChild&&n.appendChild(l.firstElementChild);
var p=document.querySelector('[data-preloadingid="'+i+'"]');
p&&n.parentNode.removeChild(p);
}
j(),S();
}
}
function E(){
var e=[];
try{
e=JSON.parse(window.video_snap_json).list;
}catch(t){
console.log(t);
}
for(var n={},i={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||""
},o=0;o<e.length;o++){
var a=e[o].export_id||e[o].notice_id,r=e[o].username;
n[a]?n[a].push(o):(n[a]=[o],e[o].export_id?i["exportid_"+o]=a:e[o].notice_id&&(i["notice_id_"+o]=a),
i["username_"+o]=r);
}
i.video_snap_num=Object.keys(n).length;
var s="/mp/appmsg_video_snap?action=batch_get_video_snap";
for(var d in i)Object.prototype.hasOwnProperty.call(i,d)&&(s+="&"+d+"="+encodeURIComponent(i[d]));
q({
url:s,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e&&e.base_resp&&0===e.base_resp.ret&&(H=e.video_snap_info||[],J=e.live_info||[]),
k();
},
error:function(){
k();
}
});
}
function C(){
E();
}
var T=e("biz_common/tmpl.js"),z=e("biz_common/dom/event.js"),W=e("biz_wap/jsapi/core.js"),O=e("appmsg/appmsg_card.js"),U=e("appmsg/channel/video_snap_tpl.html.js"),q=e("biz_wap/utils/ajax.js"),N=e("biz_wap/utils/mmversion.js"),F=e("biz_wap/utils/device.js"),B=e("pages/utils.js"),M=e("common/utils.js"),D=e("common/comm_report.js"),R=e("appmsg/channel/time_format.js"),V=e("appmsg/channel/report_live.js"),L=e("biz_common/dom/class.js"),P=[],H=[],J=[],G=[],K=[],Q=1,X=0;
try{
X=1*window.atob(window.biz);
}catch(Y){}
C();
});var _extends=Object.assign||function(e){
for(var n=1;n<arguments.length;n++){
var t=arguments[n];
for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);
}
return e;
};
define("question_answer/appmsg.js",["biz_common/utils/string/html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","pages/utils.js","biz_common/tmpl.js","question_answer/qa_card.html.js","question_answer/answer_item.html.js","question_answer/reply_item.html.js","question_answer/write_answer_reply.html.js","biz_common/utils/url/parse.js","biz_common/dom/class.js","pages/mod/bottom_modal.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js","common/comm_report.js","biz_wap/utils/device.js","common/utils.js","biz_common/dom/offset.js","biz_wap/utils/wapsdk.js"],function(e){
"use strict";
function n(e,n){
var t=arguments.length<=2||void 0===arguments[2]?0:arguments[2];
return e.getElementsByClassName(n)[t];
}
function t(e){
var n=void 0;
if(window.qnaCardData)try{
n=JSON.parse(window.qnaCardData);
var t=n.list;
if(t&&t.length)for(var s=0;s<t.length;s++)if(e===t[s].question_id)return t[s].qna_sn;
}catch(a){
console.error(a);
}
return"";
}
function s(e){
e&&(e.style.display="none");
}
function a(e){
e&&(e.style.display="block");
}
function o(e,n){
Q.jsmonitor({
id:223326,
key:e,
value:n
});
}
function i(){
window.weui.topTips("System error. Try again later");
}
function r(){
return A.os.ios?1:A.os.android?2:-1;
}
function l(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
R.report(20883,_extends({
Device:r(),
MsgId:1*fn.mid,
ItemIdx:1*fn.idx,
BizUin:$.biz,
ItemShowType:1*$.itemShowType,
SessionId:$.sessionId,
EnterId:1*$.enterId,
Scene:1*$.scene,
SubScene:1*$.subScene,
QaId:J.dataset.id
},e));
}
function _(e,n,t){
var s={
replyListHtml:"",
replyList:document.createDocumentFragment()
};
return e&&e.reply_list&&e.reply_list.length&&(s.leftReplyCount=e.left_reply_cnt,
s.leftReplyTips="余下%s条回复".replace("%s",e.left_reply_cnt),e.reply_list.forEach(function(e){
e.canOp=t,e.content=e.content.htmlEncode(),e.content=O.encode(e.content),e.likeNumFormated=H.formatReadNum(e.like_num),
e.replyStatus=void 0===e.reply_status?1:e.reply_status,e.isLogin=G;
var n=document.createElement("div");
n.innerHTML=k.tmpl(x,e,!1),s.replyListHtml+=n.innerHTML,s.replyList.appendChild(n.firstChild);
})),s;
}
function d(e,n){
var t=arguments.length<=2||void 0===arguments[2]?"":arguments[2],s={
answerListHtml:"",
fragment:document.createDocumentFragment()
};
return e.forEach(function(e){
e.likeNumFormated=H.formatReadNum(e.like_num),e.canOp=n,e.answer_sn=e.answer_sn||"",
e.content=e.content.htmlEncode(),e.oriContent=e.content,e.content=O.encode(e.content),
e.isLogin=G;
var a=_(e.reply_info,e.answer_id,n,t);
_extends(e,a);
var o=document.createElement("div");
o.innerHTML=k.tmpl(B,e,!1),s.answerListHtml+=o.innerHTML,s.fragment.appendChild(o.firstChild);
}),t===cn?nn+=_n:t===dn&&(en+=_n),s;
}
function c(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=_extends({
action:e.action,
limit:_n,
offset:e.offset
},fn);
E({
url:P.join("/mp/qna",n),
dataType:"json",
success:function(n){
var t=void 0;
n&&(t=n.qna_info?n.qna_info.answer_info:n.answer_info,e.successCb(t,n));
},
complete:function(){
e.complete&&e.complete();
}
});
}
function p(e,n){
for(var t=0;e.offsetParent&&e!==n;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function m(e,t,a){
var o=e.dataset.answerid,i=a?p(e,V.getScrollEle()):0;
E({
url:P.join("/mp/qna",_extends({
action:"get_more_reply",
answer_id:o,
answer_sn:e.dataset.answersn,
limit:10
},fn)),
dataType:"json",
success:function(r){
if(r&&r.reply_info&&r.reply_info.reply_list&&r.reply_info.reply_list.length){
var l=_(r.reply_info,o,!0,t);
l.replyListHtml?(n(e.parentNode,"js_qa_reply_list").appendChild(l.replyList),l.leftReplyCount?e.innerHTML=l.leftReplyTips:s(e),
a&&V.scrollTo(0,i-48)):s(e);
}
}
});
}
function u(e){
var t=n(X,"js_get_more_reply_"+e);
t&&m(t,dn,!0);
}
function f(){
S.on(X,"tap",".js_get_more_reply",function(e){
var n=e.delegatedTarget;
m(n,dn);
});
}
function w(){
return n(Z,"js_qa_input");
}
function y(){
var e=w();
return(e.value||e.innerHTML).trim();
}
function g(){
y()?Y.enableBtn():Y.disableBtn();
}
function v(){
var e=w();
S.on(Z,"tap",".js_get_more_reply",function(e){
var n=e.delegatedTarget;
m(n,cn);
}),S.on(e,"input",g),S.on(e,"tap",function(){
Y.scrollTo(0,0);
});
}
function j(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
c({
action:e.action,
offset:e.offset,
successCb:function(t,s){
if(t&&t.answer_list&&t.answer_list.length){
var o=void 0,i=void 0;
"get_my_answer"===e.action?(o=cn,i=Z,a(n(Z,"js_qa_write_head"))):(o=dn,i=X);
var r=n(i,"js_qa_qna_answer_list");
r.appendChild(d(t.answer_list,!0,o).fragment);
}
e.cb&&e.cb(t,s);
}
});
}
function b(){
if(Z){
var e="回复: %s".replace("%s",O.encode(ln)),t=n(Z,"js_reply_top_content");
sn?(t.innerHTML=e,a(t)):s(t);
}
}
function h(e){
n(Z,"js_alert_toast_word").innerHTML=e,a(n(Z,"js_alert_toast")),setTimeout(function(){
s(n(Z,"js_alert_toast"));
},800);
}
function q(){
for(var e=0,n=X.getElementsByClassName("js_qa_list_item"),t=0;t<n.length&&n[t].getBoundingClientRect().y<F.getInnerHeight();t++)e++;
e>tn&&(tn=e);
}
function T(e,t){
if(V)return V.show(),void(e&&t&&u(t));
var a=void 0;
X=J.firstChild.cloneNode(!0);
var o=n(X,"qa__list-more"),i=n(X,"js_qa_write_answer");
o&&s(o),i&&M.addClass(i,mn),n(X,"js_qa_qna_answer_list").innerHTML="",V=new D(X,{
title:"读者讨论",
extClass:"qa__card",
onPullUpLoad:function(){
a>0&&(V.showPullUpLoading(),j({
action:"get_more_answer",
offset:en,
cb:function(e,n){
V.hidePullUpLoading(),e.left_answer_cnt||0!==n.base_resp.ret?V.finishPullUpLoad():V.showEndLine();
}
}));
},
cb:function(){
j({
action:"get_more_answer",
offset:en,
cb:function(s){
if(e&&t)u(t);else{
var o=K.dataset.count,i=n(X,"js_qa_list_item",o),r=p(i,V.getScrollEle());
V.scrollTo(0,r-96);
}
a=s.left_answer_cnt,a||V.showEndLine();
}
});
},
onScroll:function(){
q();
},
onHide:function(){
q(),l({
EventType:3,
Exposure:tn
}),tn=0;
}
}),V.show(),f();
}
function C(e){
var t=void 0,o=sn?"Reply":"参与讨论";
return Y?(b(),Y.setTitle(o),Y.setCloseBtnStyle(e?"back":"close"),void Y.show(!0,w())):(Z=document.createElement("div"),
Z.innerHTML=k.tmpl(I,{}),Y=new D(Z,{
title:o,
top:un,
extClass:"qa__card qa__card_write",
hasBtn:!0,
disableTransition:!0,
innerScrollList:[w()],
onPullUpLoad:function(){
t>0&&(Y.showPullUpLoading(),j({
action:"get_my_answer",
offset:nn,
cb:function(e,n){
Y.hidePullUpLoading(),e.left_answer_cnt||0!==n.base_resp.ret?Y.finishPullUpLoad():Y.showEndLine();
}
}));
},
onHide:function(){
w().blur();
},
onScroll:function(e){
"up"===e&&w().blur();
},
cb:function(){
j({
action:"get_my_answer",
offset:nn,
cb:function(e){
t=e.left_answer_cnt,t||Y.showEndLine();
}
});
},
btnClickCb:function(){
Y.disableBtn();
var e=sn?"add_reply":"add_answer";
a(n(Z,"js_loading_toast")),E({
url:"/mp/qna?action="+e,
type:"POST",
dataType:"json",
data:_extends({
answer_id:on,
answer_sn:rn,
content:y(),
my_reply_cnt:an+1,
ignore_tips:1
},fn),
success:function(e){
if(e&&e.base_resp&&0===e.base_resp.ret){
if(a(n(Z,"js_sended_toast")),setTimeout(function(){
s(n(Z,"js_sended_toast"));
},800),w().value="",Y.disableBtn(),sn&&e.reply_info&&e.reply_info.reply_list){
var t=_(e.reply_info,on,!0).replyList,o=n(Z,"js_qa_reply_list_"+on);
o.appendChild(t.cloneNode(!0)),a(n(o.parentNode,"js_write_reply")),s(n(o.parentNode.parentNode,"js_write_reply"));
}else if(!sn&&e.answer_info&&e.answer_info.answer_list){
var r=n(Z,"js_qa_qna_answer_list");
r.insertBefore(d(e.answer_info.answer_list,!0).fragment,r.firstChild),a(n(Z,"js_qa_write_head"));
}
}else Y.enableBtn(),168003===e.base_resp.ret||168007===e.base_resp.ret?h("内容涉嫌违反平台协议或法规政策"):168004===e.base_resp.ret?h("关注该公众号才能参与讨论"):168005===e.base_resp.ret?h("关注该公众号3天及以上才能参与讨论"):168008===e.base_resp.ret||168009===e.base_resp.ret?h("字数不能多于"+(sn?140:600)):i();
},
error:function(){
i(),Y.enableBtn();
},
complete:function(){
s(n(Z,"js_loading_toast")),w().blur();
}
});
},
makeFakeInputEle:function(){
var e=w(),n=e.cloneNode();
n.id="tmp_input",n.style.top=0,n.style.position="absolute",e.parentNode.insertBefore(n,e),
n.value=e.value,n.scrollTop=e.scrollTop;
},
removeInputEle:function(){
var e=document.getElementById("tmp_input");
e&&e.parentNode.removeChild(e);
},
makeInputEleBigger:function(){
var e=w(),n="1000px";
e.style.borderTop="solid "+n+" transparent",e.style.position="relative",e.style.top="-"+n;
}
}),b(),Y.disableBtn(),Y.setCloseBtnStyle(e?"back":"close"),Y.show(!0,w()),v(),void new O.Emotion({
emotionPanel:U("#js_qa_emotion_panel"),
inputArea:U(w()),
emotionPanelArrowWrp:U("#js_qa_emotion_panel_arrow_wrp"),
emotionSwitcher:U("#js_qa_emotion_switch"),
emotionSlideWrapper:U("#js_qa_emotion_slide_wrapper"),
emotionNavBar:U("#js_qa_emotion_navbar"),
inputEmotion:function(){
g();
}
}));
}
function L(){
function e(){
if(!t){
var e=J.firstChild,n=W.getOffset(e).offsetTop,s=F.getScrollTop();
s+F.getInnerHeight()>=n&&s<=n+e.offsetHeight&&(l({
EventType:1
}),o("0"),t=!0);
}
}
var t=void 0;
S.on(J,"tap",".js_get_more_reply",function(e){
var n=e.delegatedTarget,t=n.dataset.answerid;
wn[t]?T():(T(!0,t),wn[t]=!0);
}),S.on(document.body,"click",".js_qa_write_answer",function(e){
sn=!1,C(M.hasClass(e.delegatedTarget,mn)),o(2);
}),S.on(document.body,"click",".js_write_reply",function(e){
var t=e.delegatedTarget,s=t.parentNode.parentNode;
if(on=t.dataset.answerid,rn=t.dataset.answersn,s){
var a=s.getElementsByClassName("js_qa_reply_content");
an=s.getElementsByClassName("js_qa_my_reply").length,ln=a.length?a[a.length-1].innerHTML:n(s,"js_qa_item_content").innerHTML;
}
sn=on,sn&&(C(!0),o(3));
}),S.on(K,"click",function(){
T(),l({
EventType:2
}),o(1);
}),S.on(document.body,"tap",".js_qa_like",function(e){
var t=e.delegatedTarget,s=M.hasClass(t,pn);
M.toggleClass(t,pn);
var a=n(t,"js_like_num"),i=parseInt(a.dataset.num,10)||0,r=i+(s?-1:1);
r=r>=0?r:0,a.innerHTML=H.formatReadNum(r),a.dataset.num=r,o("2"===t.dataset.type?6:5),
E({
url:"/mp/qna?action=like",
type:"POST",
data:_extends({
like_type:t.dataset.type,
op:s?2:1,
answer_id:t.dataset.id,
reply_id:t.dataset.id
},fn)
});
}),S.on(document.body,"tap",".js_delete_answer",function(e){
var n=e.delegatedTarget;
o(7),setTimeout(function(){
window.weui.confirm("确定删除讨论内容吗？",{
buttons:[{
label:"Cancel",
type:"default"
},{
label:"Delete",
type:"primary",
onClick:function(){
E({
url:"/mp/qna?action=del_answer",
type:"POST",
dataType:"json",
data:_extends({
answer_id:n.dataset.id
},fn),
success:function(e){
if(e&&e.base_resp&&0===e.base_resp.ret){
var t=n.parentNode.parentNode.parentNode.parentNode;
t&&M.hasClass(t,"js_qa_list_item")&&t.parentNode.removeChild(t);
}else i();
}
});
}
}]
});
},50);
}),S.on(document.body,"tap",".js_delete_reply",function(e){
var t=e.delegatedTarget;
o(8),setTimeout(function(){
window.weui.confirm("Delete this reply?",{
buttons:[{
label:"Cancel",
type:"default"
},{
label:"Delete",
type:"primary",
onClick:function(){
E({
url:"/mp/qna?action=del_reply",
type:"POST",
dataType:"json",
data:_extends({
reply_id:t.dataset.id
},fn),
success:function(e){
if(e&&e.base_resp&&0===e.base_resp.ret){
var o=t.parentNode.parentNode.parentNode;
if(o&&M.hasClass(o,"js_qa_reply_item")){
var r=o.parentNode;
r.removeChild(o),r.children.length||(s(r.parentNode),s(n(r.parentNode,"js_write_reply")),
a(n(r.parentNode.parentNode,"js_write_reply")));
}
}else i();
}
});
}
}]
});
},50);
}),F.bindDebounceScrollEvent(e),e();
}
function N(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
fn.mid=e.mid,fn.idx=e.idx,$.userUin=e.userUin,$.biz=e.biz,$.itemShowType=e.itemShowType,
$.enterId=e.enterId,$.scene=e.scene,$.subScene=e.subScene,$.sessionId=e.sessionId,
G=e.isLogin,c({
action:"get_qna_info",
successCb:function(e,t){
var s=void 0,a=void 0,i=void 0,r=void 0,l=t.base_resp.ret,_=168001===l,c=t.qna_info&&t.qna_info.question_info;
return _?void(J.innerHTML=k.tmpl(z,{
qaDeleted:_
})):void(0===l&&("1"===P.getQuery("js_my_answer")&&(C(),o(4)),e&&e.answer_list&&e.answer_list.length&&(i=d(e.answer_list,!1).answerListHtml,
a=e.answer_list.length,e.left_answer_cnt&&(s="余下%s条讨论内容".replace("%s",e.left_answer_cnt))),
1===c.can_answer_type&&0===t.qna_info.is_fans?r="作者已设置关注后才可参与讨论":2===c.can_answer_type&&0===t.qna_info.is_fans_days&&(r="作者已设置关注3天后才可参与讨论"),
J.innerHTML=k.tmpl(z,{
qaDeleted:_,
answerCount:a,
leftAnswerCnt:s,
answerListStr:i,
disableAnswerWord:r,
title:O.encode(c.question_title.htmlEncode()),
nickname:c.biz_info.nickname,
isLogin:G
}),K=n(J,"js_more_answer_entry"),L()));
}
});
}
e("biz_common/utils/string/html.js");
var E=e("biz_wap/utils/ajax.js"),S=e("biz_common/dom/event.js"),H=e("pages/utils.js"),k=e("biz_common/tmpl.js"),z=e("question_answer/qa_card.html.js"),B=e("question_answer/answer_item.html.js"),x=e("question_answer/reply_item.html.js"),I=e("question_answer/write_answer_reply.html.js"),P=e("biz_common/utils/url/parse.js"),M=e("biz_common/dom/class.js"),D=e("pages/mod/bottom_modal.js"),O=e("appmsg/emotion/emotion.js"),U=e("appmsg/emotion/dom.js"),R=e("common/comm_report.js"),A=e("biz_wap/utils/device.js"),F=e("common/utils.js"),W=e("biz_common/dom/offset.js"),Q=e("biz_wap/utils/wapsdk.js"),J=document.getElementsByTagName("mp-qa")[0];
if(!J)return{};
var G=void 0,K=void 0,V=void 0,X=void 0,Y=void 0,Z=void 0,$={},en=0,nn=0,tn=0,sn=void 0,an=void 0,on=void 0,rn=void 0,ln="",_n=10,dn="answerList",cn="myAnswerList",pn="praised",mn="modalWriteAnswerClass",un="25px",fn={
__biz:J.dataset.bizuin,
question_id:J.dataset.id,
qna_sn:t(J.dataset.id)
},wn={};
return{
renderQaCard:N
};
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","biz_wap/utils/device.js","appmsg/weapp_common.js","common/utils.js","biz_wap/utils/mmversion.js","biz_common/base64.js","appmsg/popup_report.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024);
}
function n(e,t,n,o,i,p,a){
h({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:o||0,
weapp_nickname:n||0,
type:i||0,
scene:window.source||-1,
weapp_type:p,
is_confirm:a||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function o(e){
var t=e.innerHTML,n=/<img.*src=[\'\"]/,o=/background-image:(\s*)url\(/,i=/background:[^;"']+url\(/;
return n.test(t)||o.test(t)||i.test(t)?!0:!1;
}
function i(e){
var t=e.innerHTML,n=e.style.fontSize;
return 0===t.trim().length||0===parseFloat(n)?!0:!1;
}
function p(){
var e=c("js_content");
if(!e)return!1;
z=e.getElementsByTagName("mp-weapp")||[],R=e.getElementsByTagName("mp-miniprogram")||[],
x=[];
for(var t=e.getElementsByTagName("a"),n=0,o=t.length;o>n;n++){
var i=t[n],p=i.getAttribute("data-miniprogram-appid");
p&&x.push(i);
}
return z.length<=0&&R.length<=0&&0==x.length?!1:T&&0!=T.length?!0:(window.__addIdKeyReport&&window.__addIdKeyReport("27613","52",1),
!1);
}
function a(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function r(e,t,o,i,p){
n(e,t,o,i,4,p),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function d(e,t,o,i,p){
n(e,t,o,i,5,p);
}
function s(){
function e(e){
e.preventDefault();
}
function p(e){
e&&(l=setTimeout(function(){
e.style.display="none",c=-1;
},100));
}
window.reportWeappid=[];
for(var s=0;s<T.length;s++)window.reportWeappid.push(T[s].appid);
var m=function(){};
y.on(document.getElementById("js_minipro_dialog_ok"),"click",function(t){
t.stopPropagation(),t.preventDefault(),document.querySelector("body").removeEventListener("touchmove",e);
var n=document.getElementById("js_minipro_dialog");
m&&m(),document.getElementById("js_minipro_dialog").style.display="none",C.report([4,1,"",img_popup?1:0,window.source,n._appid]);
}),y.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(t){
t.stopPropagation(),t.preventDefault(),document.querySelector("body").removeEventListener("touchmove",e);
var o=document.getElementById("js_minipro_dialog");
o.style.display="none",n(o._appid,o._i,o._nickname,o._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116),
C.report([3,1,"",img_popup?1:0,window.source,o._appid]);
});
var l,c,h=j.os.pc,E=document.getElementById("js_pc_weapp_code"),z=document.getElementById("js_pc_weapp_code_img"),R=document.getElementById("js_pc_weapp_code_des");
h&&(y.on(E,"mouseenter",function(){
clearTimeout(l);
}),y.on(E,"mouseleave",function(){
p(E);
})),I.getAppidInfo({
onSuccess:function(j){
console.log("WeappCommon.getAppidInfo onsuccess");
var x=j.data.infoMap;
if(!x)return void(window.__addIdKeyReport&&window.__addIdKeyReport("27613","52",1));
for(s=0;s<B.length;s++)(function(s){
window.__addIdKeyReport("111535",1);
var k=B[s].appid,K=B[s].path,T=B[s].imageUrl,A=B[s].title,N=B[s].elem,S=x[k];
if(!S)return void(window.__addIdKeyReport&&window.__addIdKeyReport("27613","52",1));
var W=N.tagName.toLowerCase(),q=N.firstChild&&1==N.firstChild.nodeType&&"IMG"===N.firstChild.tagName;
if(q=q||N.firstElementChild&&"IMG"===N.firstElementChild.tagName,"a"!=W)N.innerHTML=v.tmpl(w,{
imageUrl:a(T),
title:a(A),
nickname:a(S.nickname),
avatar:a(S.logo_url)
},!1);else{
if(q){
var L=N.firstChild;
L&&b.addClass(N,"weapp_image_link");
}else b.addClass(N,"weapp_text_link");
N.setAttribute("href","");
}
if(j.resp&&j.resp.weapp_info&&j.resp.weapp_info.length)for(var M=0;M<j.resp.weapp_info.length;M++){
var U=N.getElementsByClassName("guarantee_icon")[0];
if(j.resp.weapp_info[M].weapp_appid===k&&1===j.resp.weapp_info[M].has_guarantee_flag){
U&&b.addClass(U,"show");
break;
}
}
y.on(N,"tap",function(){
if(m=function(){
var e=q?1:"a"==W?2:0;
return I.jumpUrl({
sceneNote:encodeURIComponent(location.href)+":"+window.biz,
appid:k,
path:K,
scene:window.__weapp_scene__||1058,
beforeNonWechatWarn:function(){
d(k,s,S.nickname,A,e);
},
beforeJumpBackupPage:function(){
r(k,s,S.nickname,A,e);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(k,s,S.nickname,A,3,e,q?2:0),
q&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},q&&C.report([2,1,"",img_popup?1:0,window.source,k]),(q||b.hasClass(N,"weapp_text_link")&&(o(N)||i(N)))&&img_popup){
document.getElementById("js_minipro_dialog_head").innerText="即将打开小程序",document.getElementById("js_minipro_dialog_body").innerText=S.nickname;
var p=document.getElementById("js_minipro_dialog");
return p.style.display="block",document.querySelector("body").addEventListener("touchmove",e,{
passive:!1
}),p._appid=k,p._i=s,p._nickname=S.nickname,p._title=A,n(k,s,S.nickname,A,3,1,0),
I.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),!1;
}
return m();
},"a"==W),y.on(N,"click",function(e){
e.preventDefault(),e.stopPropagation();
},"a"==W),h&&(y.on(N,"mouseenter",function(){
function e(e){
function t(){
if(!l&&c===s){
E.style.display="block",l=!0;
var e=E.offsetHeight,t=E.offsetWidth;
"a"!=W||q?n>t?(f(E,"right-center"),E.style.left=n-t-m+"px",E.style.top=o+"px"):(f(E),
E.style.top=o+d-e-m+"px",E.style.left=n+r-t-m+"px"):(E.style.left=i>n+r/2-t/2?i+"px":n+r/2+t/2>i+p?i+p-t+"px":n+r/2-t/2+"px",
a>e?(f(E,"down-center"),E.style.top=o-e-m+"px"):(f(E,"up-center"),E.style.top=o+d-m+"px"));
}
}
if(e){
var n=u(N),o=_(q?N.firstElementChild:N),i=u(N.parentNode),p=N.parentNode.offsetWidth,a=N.getBoundingClientRect().top,r=q?N.firstElementChild.offsetWidth:N.offsetWidth,d=q?N.firstElementChild.offsetHeight:N.offsetHeight,m=8,l=!1;
R.innerText=g(S.nickname,48),z.onload=t,z.src=e,(z.complete||z.width)&&t();
}
}
clearTimeout(l),c!==s&&(E.style.display="none",c=s,I.getAppidCode({
appid:k,
path:K
},e));
}),y.on(N,"mouseleave",function(){
p(E);
}));
})(s);
var K=null,T=function(){
K=null;
for(var e=0;e<A.length;e++){
var t=A[e].elem,o=t.tagName.toLowerCase(),i=t.firstChild&&1==t.firstChild.nodeType,p=i?1:"a"==o?2:0,a=A[e].elem.getBoundingClientRect();
if(a.top<k.getInnerHeight()&&a.bottom>0){
setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0);
var r=A[e].appid;
r&&x[r]&&x[r].nickname&&n(r,e,x[r].nickname,A[e].title,2,p),A.splice(e--,1);
}
}
};
T(),y.on(window,"scroll",function(){
K||(K=setTimeout(T,100));
});
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function m(){
for(var e=0,t=0;t<R.length+z.length;t++){
var n=t<R.length,o=n?R[t]:z[t-R.length],i=o.getAttribute(n?"data-miniprogram-appid":"data-weapp-appid")||"",p=o.getAttribute(n?"data-miniprogram-path":"data-weapp-path")||"",a=o.getAttribute(n?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",r=o.getAttribute(n?"data-miniprogram-title":"data-weapp-title")||"",d=document.createElement("span");
o.setAttribute("class",""),d.setAttribute("class","weapp_display_element js_weapp_display_element"),
B.push({
appid:i,
path:p,
imageUrl:a,
title:r,
elem:d
}),A.push({
appid:i,
elem:d,
title:r
}),o.parentNode.insertBefore(d,o.nextSibling),l(a)||e++;
}
for(var t=0;t<x.length;t++){
var s=x[t];
B.push({
appid:s.getAttribute("data-miniprogram-appid"),
path:s.getAttribute("data-miniprogram-path")||"",
elem:s
});
}
e>0&&E.setSum(64469,33,e);
}
function l(e){
for(var t,n=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i],o=0;t=n[o++];)if(t.test(e))return!0;
return!1;
}
function c(e){
return document.getElementById(e);
}
function u(e){
for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;
return t;
}
function _(e){
for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function f(e,t){
for(var n=0;3>n;n++)b.removeClass(e,"weui-desktop-popover_pos-up-"+N[n]),b.removeClass(e,"weui-desktop-popover_pos-down-"+N[n]),
b.removeClass(e,"weui-desktop-popover_pos-left-"+S[n]),b.removeClass(e,"weui-desktop-popover_pos-right-"+S[n]);
b.removeClass(e,"weui-desktop-popover_hide-arrow"),t?b.addClass(e,"weui-desktop-popover_pos-"+t):b.addClass(e,"weui-desktop-popover_hide-arrow");
}
function g(e,t){
var n=/[^\x00-\xff]/g;
if(e.replace(n,"**").length>t)for(var o=Math.floor(t/2),i=o,p=e.length;p>i;i++)if(e.substring(0,i).replace(n,"**").length>=t)return e.substring(0,i)+"...";
return e;
}
e("biz_common/utils/string/html.js");
var w=e("pages/weapp_tpl.html.js"),h=e("biz_wap/utils/ajax.js"),y=e("biz_common/dom/event.js"),v=e("biz_common/tmpl.js"),b=e("biz_common/dom/class.js"),j=e("biz_wap/utils/device.js"),I=e("appmsg/weapp_common.js"),k=e("common/utils.js"),C=(e("biz_wap/utils/mmversion.js"),
e("biz_common/base64.js"),e("appmsg/popup_report.js")),E=e("biz_wap/utils/jsmonitor_report.js"),z=null,R=null,x=null,K={},B=[],T=I.appidSnInfo,A=[];
if(p()){
m(),s();
var N=["left","center","right"],S=["top","center","bottom"];
return K;
}
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/jsmonitor_report.js","common/utils.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),d.getAppidInfo({
onSuccess:function(e){
g.data=e.data,o(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var o=t[e];
if(o.className.indexOf("js_list_container")>=0){
var i=o.querySelector("img.js_cover");
if(i){
var r=i.parentNode.getBoundingClientRect();
i.style.setProperty("width",r.width+"px","important"),i.style.setProperty("height",r.height+"px","important"),
i.style.setProperty("background-size","unset","important"),"0"==i.getAttribute("data-fail")?n.call(i):i.getAttribute("data-fail")||(i.lazyLoadOnload=i.lazyLoadOnload||[],
i.lazyLoadOnload.push(n));
}
}
}
}catch(p){}
}
function n(){
var t=this.parentNode;
if(t){
var e=document.createElement("span");
e.className=this.className,e.style.background='url("'+this.src+'") no-repeat center',
t.insertBefore(e,this),t.removeChild(this);
}
}
function o(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
s.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),o=a.getAttribute("data-wxapath"),i=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return d.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:o,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(i),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&i){
var o=a.getAttribute("data-pidtype"),r=2;
2==o&&(r=4),p([{
wxa_appid:n,
pid:i,
type:r,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
}]);
}
}
}),!1;
});
}(t[e],e);
var n=document.getElementsByClassName("js_product_loop_content");
if(n&&n.length>0&&m.getInnerHeight()){
for(var e=0;e<n.length;e++)g.pvele.push(n[e]);
i(),s.on(window,"scroll",i);
}
}
function i(){
g.checkInScreenId&&clearTimeout(g.checkInScreenId),g.checkInScreenId=setTimeout(function(){
g.checkInScreenId=null;
for(var t=[],e=0;e<g.pvele.length;e++){
var a=g.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.getInnerHeight()&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var d=a.getAttribute("data-pidtype"),c=1;
2==d&&(c=3),t.push({
wxa_appid:a.getAttribute("data-wxaappid"),
pid:r,
type:c,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
});
}
g.pvele.splice(e--,1);
}
}
p(t),0==g.pvele.length&&(s.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e);
},0);
}
function p(t){
if(t&&0!=t.length){
for(var e={
batch_no:l.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:t.length
},a=0;a<t.length;a++){
var n=t[a],o=a+1;
for(var i in n)n.hasOwnProperty(i)&&(e[i+""+o]=n[i]);
}
c({
url:"/mp/productreport?",
type:"POST",
data:e,
dataType:"json",
async:!0
});
}
}
var d=t("appmsg/weapp_common.js"),s=t("biz_common/dom/event.js"),c=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_wap/utils/jsmonitor_report.js"),m=t("common/utils.js"),g={
pvele:[],
checkInScreenId:null,
reportRandom:Math.random()
};
e();
});define("appmsg/voicemsg.js",["biz_wap/ui/weui.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","pages/voice_component.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var i=e("biz_wap/jsapi/core.js"),t=e("biz_wap/utils/ajax.js"),o=e("pages/voice_component.js"),a=document.getElementById("js_read_container"),n={
player:null,
srcId:"__wxtag__"+window.biz+"-"+window.mid+"-"+window.idx,
mediaId:"",
tag:"===mediaId-sep===",
playDuration:0,
playTime:0,
maxNum:5,
curNum:0,
format:"",
type:6,
speed:100,
voiceInfo:{
title:"",
nickname:"",
appmsgUrl:"",
duration:0
},
voiceOpt:null,
lock:!1,
status:"stop",
currentTime:0,
beginTime:0,
leaveNeedReport:!1,
pause2PlayNeedReport:!1,
isSeek:!1,
loadingTimer:null
},s=function(e){
return e+"&uin="+window.uin+"&key="+window.key+"&pass_ticket="+encodeURIComponent(window.pass_ticket);
},r=function(e){
return e||null===n.loadingTimer?void i.invoke("handleMPPageAction",{
action:"showToast",
status:e?"loading":"dismissloading"
}):(clearTimeout(n.loadingTimer),void(n.loadingTimer=null));
},d=function m(){
if(n.curNum>10)return r(!1),n.lock=!1,void weui.alert("System busy. Try again later.");
n.curNum++;
var e=n.curNum>n.maxNum?5e3:1e3;
t({
url:"/mp/msgvoice?action=getvoiceinfo&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+n.type+"&speed="+n.speed,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
if(i&&i.base_resp&&0===i.base_resp.ret)if(i.mediaid){
n.mediaId=i.mediaid;
var t=encodeURIComponent("__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx),o=n.voiceInfo;
n.voiceOpt={
protocol:2===i.format?"hls":"",
src:s("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&mediaid="+i.mediaid+"&devicetype="+window.devicetype+"&_type="+n.type+"&speed="+n.speed+"&encodeurl="+t),
lowbandUrl:s("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&mediaid="+i.mediaid+"&devicetype="+window.devicetype+"&_type="+n.type+"&speed="+n.speed+"&encodeurl="+t),
title:o.title,
epname:"Source Article",
singer:o.nickname?"的语音":"Official Account audio",
srcId:n.srcId+n.tag+n.mediaId,
coverImgUrl:"",
webUrl:o.appmsgUrl,
musicbar_url:"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+n.type+"#wechat_redirect",
needStartMusicUI:0
},c();
}else setTimeout(m,1e3);else console.log("getvoiceinfo err",i),setTimeout(m,e);
},
error:function(i){
console.log("getvoiceinfo err",i),setTimeout(m,e);
}
});
},c=function(){
n.player=o.init({
protocal:"hls",
wxIndex:n.voiceOpt.srcId,
type:7,
comment_id:"",
src:n.voiceOpt.src,
jsapi2Src:n.voiceOpt.src+"&voice_type=1",
allowPause:!0,
duration:n.voiceInfo.duration,
title:n.voiceOpt.title,
singer:n.voiceOpt.singer,
epname:n.voiceOpt.epname,
coverImgUrl:n.voiceOpt.coverImgUrl,
playingCss:"share_audio_playing",
playCssDom:a.getElementsByClassName("js_read_main")[0],
playArea:a.getElementsByClassName("js_read_play")[0],
progress:a.getElementsByClassName("js_read_progress")[0],
fileSize:0,
playtimeDom:a.getElementsByClassName("js_read_playtime")[0],
bufferDom:a.getElementsByClassName("js_read_buffer")[0],
playdotDom:a.getElementsByClassName("js_read_playdot")[0],
seekRange:a.getElementsByClassName("js_read_seekRange")[0],
seekContainer:a.getElementsByClassName("js_read_main")[0],
loadingDom:a.getElementsByClassName("js_read_loading")[0],
detailArea:"",
detailUrl:n.voiceOpt.musicbar_url,
webUrl:n.voiceOpt.musicbar_url
});
};
t({
url:"/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&type="+n.type+"&f=json",
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e&&e.base_resp&&0===e.base_resp.ret?(n.voiceInfo={
title:e.title,
nickname:e.nickname,
appmsgUrl:e.appmsg_url,
duration:1*e.voice_info.duration
},d(),a.getElementsByClassName("js_read_duration")[0].innerHTML=function(e){
var i=function(e){
return e>=10?e:"0"+e;
};
return i(Math.floor(e/60))+":"+i(e%60);
}(1*e.voice_info.duration)):weui.alert("System busy. Try again later.");
},
error:function(e){
console.log("ttspage err: ",e),weui.alert("网络不可用，请检查网络设置");
}
});
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
u.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(r,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"'s audio":"Official Account audio",
epname:"Source Article",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var u=e("biz_common/dom/event.js"),r=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var o=arguments[e];
for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);
}
return t;
};
define("appmsg/poi/poi.js",["biz_common/utils/string/html.js","appmsg/poi/poi_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","pages/player_tips.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/jsmonitor_report.js","biz_common/base64.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var e=t("appmsg/poi/poi_tpl.html.js"),o=t("biz_common/dom/event.js"),n=t("biz_wap/jsapi/core.js"),i=t("biz_common/tmpl.js"),a=t("common/utils.js"),r=t("pages/player_tips.js"),d=t("biz_wap/utils/mmversion.js"),s=t("common/comm_report.js"),m=t("biz_wap/utils/jsmonitor_report.js"),p=t("biz_common/base64.js"),c={
tagName:"mppoi",
isWechat:(d.isAndroid||d.isIOS)&&d.isWechat&&!d.isWxwork,
screen_height:a.getInnerHeight(),
commonReportData:{
bizuin:1*p.decode(window.biz),
msgid:1*window.mid,
itemidx:1*window.idx,
sessionidnew:window.sessionid,
enterid:1*window.enterid
},
poiDom:[]
},u=function(){
return document.documentElement.scrollTop||document.body.scrollTop;
},l=function(t){
c.isWechat?n.invoke("openLocation",{
latitude:1*t.latitude,
longitude:1*t.longitude,
name:t.name,
address:t.address,
infoUrl:""
},function(t){
-1!==t.err_msg.indexOf("ok")?m.setSum(110809,53,1):m.setSum(110809,54,1);
}):new r({
msg:"请使用移动端微信打开。"
});
},g=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.dom,n=t.poiInfo;
o.on(e,"tap",function(t){
t.stopPropagation(),t.preventDefault(),s.report(19937,_extends({},c.commonReportData,{
type:2,
actiontype:2
})),m.setSum(110809,55,1),l(n);
},!0),o.on(e,"click",function(t){
t.preventDefault(),t.stopPropagation();
},!0);
},f=function(){
for(var t=0;t<c.poiDom.length;t++){
var e=c.poiDom[t];
if(1*e.getAttribute("data-hasreport")!==1){
e.setAttribute("data-hasreport",1);
var o=u();
e.clientHeight+e.offsetTop>=o+e.clientHeight/2&&e.clientHeight+e.offsetTop<=o+e.clientHeight/2+c.screen_height&&("A"===e.tagName?(s.report(19937,_extends({},c.commonReportData,{
type:1,
actiontype:1
})),m.setSum(110809,58,1)):(s.report(19937,_extends({},c.commonReportData,{
type:2,
actiontype:1
})),m.setSum(110809,56,1)));
}
}
};
o.on(window,"scroll",f);
var b=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.node&&t.data&&t.data.img&&!function(){
var o=function(t){
var o=t.node,n=t.data;
return function(){
var t=document.createElement("div");
t.innerHTML=i.tmpl(e,{
data:n
},!0).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var a=t.firstChild;
o.parentNode.insertBefore(a,o.nextSibling);
var r=o.parentNode.querySelector('[data-preloadingid="'+n.id+'"]');
r&&r.parentNode.removeChild(r),g({
dom:a,
poiInfo:n
}),c.poiDom.push(a),f();
};
}(t),n=function(){
this.onload=null,this.onerror=null,o();
},a=new Image;
a.onload=n,a.onerror=n,a.src=t.data.img;
}();
},v=function(){
for(var t=document.querySelectorAll(c.tagName),e=0,n=t.length;n>e;e++){
var i=t[e],a={
id:decodeURIComponent(i.getAttribute("data-id")||""),
name:decodeURIComponent(i.getAttribute("data-name")||""),
address:decodeURIComponent(i.getAttribute("data-address")||""),
img:decodeURIComponent(i.getAttribute("data-img")||""),
longitude:decodeURIComponent(i.getAttribute("data-longitude")||""),
latitude:decodeURIComponent(i.getAttribute("data-latitude")||""),
type:decodeURIComponent(i.getAttribute("data-type")||"")
};
b({
data:a,
node:i
});
}
for(var r=document.getElementsByClassName("js_poi_entry"),d=0;d<r.length;d++)!function(t){
var e=r[t];
c.poiDom.push(e),o.on(e,"tap",function(t){
t.stopPropagation(),t.preventDefault();
var o={
id:decodeURIComponent(e.getAttribute("data-id")||""),
name:decodeURIComponent(e.getAttribute("data-name")||""),
address:decodeURIComponent(e.getAttribute("data-address")||""),
img:decodeURIComponent(e.getAttribute("data-img")||""),
longitude:decodeURIComponent(e.getAttribute("data-longitude")||""),
latitude:decodeURIComponent(e.getAttribute("data-latitude")||""),
type:decodeURIComponent(e.getAttribute("data-type")||"")
};
return o.longitude&&o.latitude&&o.name&&o.address&&(s.report(19937,_extends({},c.commonReportData,{
type:1,
actiontype:2
})),m.setSum(110809,57,1),l(o)),!1;
},!0),o.on(e,"click",function(t){
t.preventDefault(),t.stopPropagation();
},!0);
}(d);
f();
};
v();
});var _extends=Object.assign||function(e){
for(var o=1;o<arguments.length;o++){
var t=arguments[o];
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
}
return e;
};
define("appmsg/search/search.js",["biz_common/utils/string/html.js","appmsg/search/search_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","pages/player_tips.js","biz_wap/utils/mmversion.js","common/comm_report.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var o=e("appmsg/search/search_tpl.html.js"),t=e("biz_common/dom/event.js"),n=e("biz_wap/jsapi/core.js"),r=e("biz_common/tmpl.js"),i=e("common/utils.js"),s=e("pages/player_tips.js"),a=e("biz_wap/utils/mmversion.js"),m=e("common/comm_report.js"),d=e("biz_wap/utils/jsmonitor_report.js"),c={
tagName:"mpsearch",
isWechat:(a.isAndroid||a.isIOS)&&a.isWechat&&!a.isWxwork,
keywords:[],
screen_height:i.getInnerHeight(),
exposeHasReport:0,
commonReportData:{
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
SearchKeyWord:"",
SessionId:window.sessionid,
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene
}
},p=function(){
return document.documentElement.scrollTop||document.body.scrollTop;
},l=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.on(e.dom,"click",function(){
var e=c.keywords.map(function(e){
return e.label;
}).join(";");
if(m.report(19453,_extends({},c.commonReportData,{
SearchKeyWord:e,
EventType:2
})),d.setSum(110809,47,1),c.isWechat){
if(a.isIOS&&a.ltVersion("7.0.12")||a.isAndroid&&a.ltVersion("7.0.12"))return void new s({
msg:"当前微信版本不支持展示该内容，请升级至最新版本。"
});
for(var o=[],t=0;t<c.keywords.length;t++)o.push({
hotword:c.keywords[t].label,
id:t,
optype:1
});
n.invoke("openWXSearchPage",{
query:"",
thirdExtParam:JSON.stringify({
data:[{
items:o,
title:window.nickname+"推荐搜索",
type:4
}],
from:"mpWidget",
bizUserName:window.user_name,
bizNickName:window.nickname,
id:"mpWidget_"+c.commonReportData.BizUin+":"+c.commonReportData.MsgId+":"+c.commonReportData.ItemIdx
})
},function(e){
-1!==e.err_msg.indexOf("ok")?d.setSum(110809,48,1):d.setSum(110809,49,1);
});
}else new s({
msg:"请使用移动端微信打开。"
});
});
var o=function(){
if(!c.exposeHasReport){
c.exposeHasReport=1;
var o=p();
if(e.dom.clientHeight+e.dom.offsetTop>=o+e.dom.clientHeight/2&&e.dom.clientHeight+e.dom.offsetTop<=o+e.dom.clientHeight/2+c.screen_height){
var t=c.keywords.map(function(e){
return e.label;
}).join(";");
m.report(19453,_extends({},c.commonReportData,{
SearchKeyWord:t,
EventType:1
})),d.setSum(110809,46,1);
}
}
};
t.on(window,"scroll",o),o();
},u=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.node&&e.data&&e.data.keywords){
var t=function(e){
var t=e.node,n=e.data;
return function(){
var e=document.createElement("div");
e.innerHTML=r.tmpl(o,{
data:n
},!0).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var i=e.firstChild;
t.parentNode.insertBefore(i,t.nextSibling);
var s=t.parentNode.querySelector('[data-preloadingid="mpsearch"]');
s&&s.parentNode.removeChild(s),l({
dom:i,
keywords:n.keywords
});
};
}(e);
t();
}
},w=function(){
var e=document.querySelectorAll(c.tagName);
if(!(e.length<=0))for(var o=0,t=e.length;t>o;o++){
var n=e[o],r=[];
try{
r=JSON.parse(window.decodeURIComponent(n.getAttribute("data-keywords")));
}catch(i){
d.setSum(110809,50,1);
}
if(r.length){
var s={
nickname:window.nickname,
avatar:window.round_head_img,
keywords:r
};
c.keywords=r,u({
data:s,
node:n
});
}
}
};
w();
});define("redpackage/redpacketcover.js",["biz_common/utils/string/html.js","redpackage/tpl/card_tpl.html.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","common/utils.js","common/comm_report.js","pages/player_tips.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("redpackage/tpl/card_tpl.html.js"),a=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),i=e("biz_common/tmpl.js"),o=e("common/utils.js"),n=e("common/comm_report.js"),d=e("pages/player_tips.js"),s=e("biz_common/utils/url/parse.js"),c=e("biz_wap/utils/mmversion.js"),u=e("biz_wap/utils/ajax.js"),p={
tagName:"redpacketcover",
isWechat:c.isWechat,
domMap:{},
dataMap:{},
startTime:window.page_begintime||0,
screen_height:o.getInnerHeight(),
screen_num:0,
pvData:[],
request_id:encodeURIComponent(window.biz+";"+window.mid+";"+window.idx+";"+window.page_begintime||0),
hasBindVisibility:!1,
hasBindScroll:!1,
needReportNum:0,
reportedNum:0
},m=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=window.pageYOffset||document.documentElement.scrollTop,a=(window.logs.read_height||t)+p.screen_height,r={
BizUin:window.biz,
MsgId:1*window.mid,
Idx:1*window.idx,
CoverUri:e.coverUri,
Scene:1*window.source,
Subscene:1*window.subscene,
CoverStatus:1*e.coverStatus,
EventType:1*e.eventType,
EventScreenNum:Math.ceil(a/p.screen_height)||1,
ScreenNum:p.screen_num,
StartTimeMs:p.startTime
};
n.report(19119,r);
},l=function(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=e+p.screen_height,r=0;r<p.pvData.length;r++){
var i=p.pvData[r];
t>=i.start&&t<=i.end&&(p.reportedNum++,p.dataMap&&p.dataMap[i.coverUri]&&(p.dataMap[i.coverUri].reported=!0),
m({
eventType:2,
coverUri:i.coverUri,
coverStatus:p.dataMap[i.coverUri].status
}),p.pvData.splice(r,1),r--);
}
p.reportedNum>=p.needReportNum&&(a.off(window,"scroll",l),p.pvData=[],l=null);
},v=function(){
p.pvData.length>0&&(!p.hasBindScroll&&l&&(p.hasBindScroll=!0,a.on(window,"scroll",l)),
l());
},_=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(p.isWechat){
p.scroll_height=document.body.scrollHeight||document.body.offsetHeight,p.screen_num=Math.ceil(p.scroll_height/p.screen_height);
var t=e.node;
if(p.dataMap[e.coveruri]&&1*p.dataMap[e.coveruri].status!==-1&&!p.dataMap[e.coveruri].reported){
var a=t.getBoundingClientRect();
p.pvData.push({
start:a.top+a.height/2,
end:a.top+a.height/2+p.screen_height,
coverUri:e.coveruri
});
}
v();
}
},g=null,h=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
p.dataMap[e.coveruri]&&a.on(e.dom,"click",function(){
window.is_temp_url?new d({
msg:"预览时不支持领取红包封面"
}):p.isWechat?!function(){
var t=e.dom.getAttribute("data-coveruri")||"",a=t&&p.dataMap[t]?p.dataMap[t].redirect_url:"";
a&&(m({
eventType:1,
coverUri:t,
coverStatus:p.dataMap[t].status
}),r.invoke("openUrlWithExtraWebview",{
url:a,
openType:1
},function(e){
-1===e.err_msg.indexOf("ok")&&(location.href=a);
}));
}():new d({
msg:"请在微信客户端打开"
});
}),!p.hasBindVisibility&&p.isWechat&&(p.hasBindVisibility=!0,o.listenStateChange({
cb:function(e){
("onResume"===e.state_change||"onResume"===e.state)&&u({
type:"GET",
dataType:"json",
url:"/mp/wapredpacketcover?action=get_red_packet_cover_data&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"&send_time="+window.send_time,
timeout:1e4,
success:function(e){
if(e&&e.base_resp&&1*e.base_resp.ret===0&&e.red_packet_cover_data&&e.red_packet_cover_data.cover_uri_data&&e.red_packet_cover_data.cover_uri_data.length>0)for(var t=e.red_packet_cover_data.cover_uri_data,a=0,r=t.length;r>a;a++){
var i=t[a],o=p.domMap[i.cover_uri],n=p.dataMap[i.cover_uri];
if(n&&o){
var d=1*n.status,s=1*i.status;
-1!==s&&d!==s&&(n.status=s,g({
data:n,
node:o,
isUpdate:!0
}));
}
}
}
});
}
}));
};
g=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.node&&e.data&&e.data.cover_uri&&(e.isUpdate?e.node.innerHTML=i.tmpl(t,{
data:e.data,
isUpdate:!0
},!1).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,""):e.data.receive_image&&!function(){
var a=function(e){
var a=e.node,r=e.data;
return function(){
var e=document.createElement("div");
e.innerHTML=i.tmpl(t,{
data:r,
isUpdate:!1
},!1).replace(/>\s*</g,"><").replace(/^\s+/,"").replace(/\s+$/,"");
var o=e.firstChild;
a.parentNode.insertBefore(o,a.nextSibling);
var n=a.parentNode.querySelector('[data-preloadingid="'+r.cover_uri+'"]');
n&&n.parentNode.removeChild(n),p.domMap[r.cover_uri]=o,h({
dom:o,
coveruri:r.cover_uri
}),_({
coveruri:r.cover_uri,
node:o
});
};
}(e),r=function(){
this.onload=null,this.onerror=null,a();
},o=new Image;
o.onload=r,o.onerror=r,o.src=e.data.receive_image;
}());
};
var w=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.list&&0!==e.list.length){
for(var t=0,a=e.list.length;a>t;t++){
var r=e.list[t];
p.dataMap[r.cover_uri]=r;
}
var i=document.querySelectorAll(p.tagName);
e.list.length!==i.length&&window.__addIdKeyReport&&window.__addIdKeyReport("27613","51",1),
p.needReportNum=i.length;
for(var t=0,a=i.length;a>t;t++){
var r=i[t],o=r.getAttribute("data-coveruri")||"",n=decodeURIComponent(o),d=p.dataMap[n];
if(d&&1*d.status!==-1){
if(d.redirect_url){
var c=d.redirect_url.html(!1);
c=s.addParam(c,"request_id",p.request_id,!0);
var u=s.parseUrl(c);
u.hash?-1===u.hash.indexOf("wechat_redirect")&&(c+="&wechat_redirect"):c+="#wechat_redirect",
d.redirect_url=c;
}
g({
data:d,
node:r,
isUpdate:!1
});
}
}
}
},f=function(){
var e=document.querySelectorAll(p.tagName);
if(!window.__appmsgCgiData||1*window.__appmsgCgiData.has_red_packet_cover!==1)return void(e.length>0&&window.__addIdKeyReport&&window.__addIdKeyReport("27613","51",1));
if(!p.isWechat)for(var t=0,a=e.length;a>t;t++){
var r=e[t],i=r.getAttribute("data-coveruri")||"",o=decodeURIComponent(i),n=decodeURIComponent(r.getAttribute("data-receiveimg")||"");
if(o&&n&&/^http(s)?:\/\/mmcomm\.qpic\.cn([\/?].*)*$/i.test(n)){
var d={
cover_uri:o,
status:0,
name:"",
redirect_url:"",
receive_image:n
};
p.dataMap[o]=d,g({
data:d,
node:r,
isUpdate:!1
});
}
}
};
return f(),{
render:w
};
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=c("js_content");
return e?(m._oElements=e.getElementsByTagName("mpvoice")||[],m._oElements.length<=0?!1:!0):!1;
}
function o(){
m.musicLen=m._oElements.length;
}
function n(e){
for(var i=0,o=0;o<m.musicLen;o++){
var n=m._oElements[o],t={},c=n.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(d){}
t.voiceid=l.encodeStr(c),t.voiceid=t.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
t.isaac=1*n.getAttribute("isaac2")||0,t.src=m.srcRoot.replace("#meidaid#",t.voiceid),
1===t.isaac&&(t.jsapi2Src=t.src+"&voice_type=1"),t.voiceid&&"undefined"!=t.voiceid&&(t.albumLink="",
e&&e.length>0&&e.forEach(function(e){
return e.voice_id===c?(e.appmsgalbuminfo&&(t.albumTitle=e.appmsgalbuminfo.title,
t.albumLink=e.appmsgalbuminfo.link.replace("#wechat_redirect","")+"#wechat_redirect",
t.albumNum=e.appmsgalbuminfo.tag_content_num||0,t.albumid=e.appmsgalbuminfo.album_id||0),
!1):void 0;
}),a(n,t,i),"undefined"!=typeof voiceid&&c&&voiceid&&c===voiceid&&!function(){
var e=n.offsetTop+122-40;
setTimeout(function(){
window.scrollTo(0,e);
},0);
}(),i++);
}
}
function a(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=l.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(a){}
i.title=l.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,l.renderPlayer(r,i,e);
var c=i.voiceid+"_"+i.posIndex,d=e.parentNode.querySelector('[data-preloadingid="'+c+'"]');
d&&d.parentNode.removeChild(d),t(i),m.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function t(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],a=window.biz||"",t=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(a=n.bizuin,t=n.appmsgid,d=n.idx);
var r=window.location.protocol||"https:";
o=r+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",a).replace("#mid#",t).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=l.decodeStr(e.title);
e.player=l.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"'s audio":"Official Account audio",
epname:"Source Article",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:c("voice_main_"+i),
playArea:c("voice_play_"+i),
progress:c("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:c("voice_playtime_"+i),
bufferDom:c("voice_buffer_"+i),
playdotDom:c("voice_playdot_"+i),
seekRange:c("voice_seekRange_"+i),
seekContainer:c("voice_main_"+i),
loadingDom:c("voice_loading_"+i),
detailArea:o?c("voice_main_"+i):"",
albumDom:c("voice_album_"+i),
detailUrl:o,
webUrl:o,
speedList:[1,1.25,1.5,2],
audioCardBody:c("audio_card_bd_"+i),
ctrlArea:c("audio_card_control_"+i),
fastBackBtn:c("audio_fast_back_"+i),
fastForwardBtn:c("audio_fast_forward_"+i),
doubleSpeedBtn:c("audio_double_speed_"+i),
isAudio:!0
});
}
function c(e){
return document.getElementById(e);
}
function d(e){
i()&&(o(),n(e));
}
e("biz_common/utils/string/html.js");
var r=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),l=e("pages/voice_component.js"),m={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return{
init:d
};
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(o._oElements=e.getElementsByTagName("qqmusic")||[],o._oElements.length<=0?!1:!0):!1;
}
function i(){
o.musicLen=o._oElements.length;
}
function s(){
for(var e=0,t=0;t<o.musicLen;t++){
var i=o._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(c.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
o.adapter[t.musictype]&&"function"==typeof o.adapter[t.musictype].initData&&(t=o.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e);
var u=t.musicid+"_"+t.posIndex,a=e.parentNode.querySelector('[data-preloadingid="'+u+'"]');
a&&a.parentNode.removeChild(a),n(t),o.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
a("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
jumpurlkey:e.jumpurlkey,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"Recommended Songs":"Songs recommended by Official Accounts",
epname:"Music",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var c=e("biz_common/utils/url/parse.js"),a=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),o={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),o.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","appmsg/without_iframe/video_communicate_adaptor.js","pages/video_communicate_adaptor.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","biz_wap/utils/ajax.js","appmsg/without_iframe/video_appmsg.js","common/utils.js","appmsg/finance_communicate.js","biz_wap/utils/jsmonitor_report.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
console.info("iframe_onload");
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
c&&c.postPageHeightMessage&&c.postPageHeightMessage("updatePageHeight"),console.log("financeUtils done");
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=u.video_top.length,n=e+a.getInnerHeight(),d=0,r=0;t>r;r++){
var s=u.video_top[r];
s.reported?d++:n>=s.start&&n<=s.end&&(s.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="",r="",s=3;
n[e]&&(n[e].hit_bizuin&&(d=n[e].hit_bizuin),n[e].hit_vid&&(r=n[e].hit_vid),n[e].ori_status&&(s=n[e].ori_status)),
_.report({
step:1,
hit_vid:r,
hit_bizuin:d,
ori_status:s,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(s.vid,n,a.getInnerHeight()),1e4));
}
d==t&&(f.off(window,"scroll",i),u.video_top=u.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
var o=e(window.withoutIframe?"appmsg/without_iframe/video_communicate_adaptor.js":"pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/mmversion.js"),d=e("biz_wap/utils/device.js"),r=e("biz_wap/utils/ajax.js");
if(window.withoutIframe)var s=e("appmsg/without_iframe/video_appmsg.js");
{
var a=e("common/utils.js"),c=e("appmsg/finance_communicate.js"),m=e("biz_wap/utils/jsmonitor_report.js"),p=e("biz_common/utils/url/parse.js"),_=e("new_video/ctl.js"),u={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},l=e("pages/version4video.js"),w=e("biz_common/dom/attr.js"),f=(w.setProperty,e("biz_common/dom/event.js")),g=[].slice.call(document.getElementsByTagName("iframe")),v=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var h=Math.ceil(1e4*Math.random()),x=0,b=g.length;b>x;++x)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",a=e.getAttribute("src")||i;
if(!i||"#"==i){
var c=e.getAttribute("data-display-src");
if(c&&(0==c.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==c.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
c=c.replace(/&amp;/g,"&");
for(var _=c.split("&"),w=["/mp/newappmsgvote?action=show"],f=0;f<_.length;f++)(0==_[f].indexOf("__biz=")||0==_[f].indexOf("supervoteid="))&&w.push(_[f]);
w.length>1&&(i=w.join("&")+"#wechat_redirect");
}
}
if(a&&(u.txVideoReg.test(a)||u.mpVideoReg.test(a))){
if(l.isShowMpVideo()||u.mpVideoReg.test(a)){
var g=p.getQuery("vid",i);
if(!g)return;
var x=e.getAttribute("data-vw"),b=e.getAttribute("data-vh"),y=document.domain;
if("qq.com"==y&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
m.setLogs({
id:27302,
key:100,
value:1,
lc:1,
log0:"[beforeD]"+window.encodeURIComponent(window.location.href)
})),window.reportVid.push(g),a=["/mp/videoplayer?video_h=",b,"&video_w=",x,"&scene=",window.source,"&random_num=",h,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",g,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||"","&preview=",window.is_temp_url?1:0,"&is_in_pay_subscribe=",window.isPaySubscribe,"&nickname="+window.nickname,"&roundHeadImg="+window.round_head_img,"&enterid="+window.enterid,"&subscene="+window.subscene].join(""),
window.withoutIframe){
var j=s().createMpVideoDom(e,a);
u.video_iframe.push({
dom:j,
vid:g
});
}else u.video_iframe.push({
dom:e,
vid:g
}),uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
if(t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__)if(n.isIOS){
var i,o,s;
!function(){
var n=function(e,t,i,o){
i&&o&&(e.contentWindow.__auto_play__=!!e.getAttribute("__sec_open_auto_play__"),
e.contentWindow.is_login=t.is_login,e.contentWindow.user_uin=t.user_uin,e.contentWindow.cgiData.ckey=t.ckey,
e.contentWindow.cgiData.ckey_ad=t.ckey_ad,e.contentWindow.seajs.use("pages/video_appmsg.js"));
},a=function(){
d.os.getNumVersion()<14?t.setAttribute("src",e):t.contentWindow.location.replace(e);
};
window.__videohook__=1,i=!1,o=!1,s={},t.onload=function(){
t.contentWindow&&t.contentWindow.cgiData?i=!0:(i=!1,a()),n(t,s,i,o);
},a(),r({
url:e,
type:"GET",
f:"json",
success:function(d){
o=!0;
try{
s=JSON.parse(d),n(t,s,i,o);
}catch(r){
n(t,s,i,o);
}
window.resp=d,t.setAttribute("data-realsrc",e),t.contentWindow.__iframe_src__=e;
}
});
}();
}else r({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("data-realsrc",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e,t.contentWindow.history.replaceState(null,null,e);
}
});else t.setAttribute("src",e);
},0,a,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&(o.indexOf("js_editor_vote_card")>=0||o.indexOf("vote_iframe")>=0)||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&(o.indexOf("card_iframe")>=0||o.indexOf("js_editor_card")>=0)||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void v.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0||o.indexOf("js_editor_card")>=0){
-1===o.indexOf("card_iframe")&&(e.className+=" card_iframe"),-1===o.indexOf("res_iframe")&&(e.className+=" res_iframe");
var k=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(k+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?r({
url:k,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",k),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,k),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",k),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var O=i.indexOf("#wechat_redirect")>-1,z=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?z+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):(o.indexOf("vote_iframe")>=0||o.indexOf("js_editor_vote_card")>=0)&&(z+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""),
-1===o.indexOf("vote_iframe")&&(e.className+=" vote_iframe"));
var k=O?i.replace("#wechat_redirect",z):i+z;
window.__second_open__?r({
url:k,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=r,e.setAttribute("src",k),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,k),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",k),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=f;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&x>0){
var W=x,q=3*W/4;
e.width=W,e.height=q,e.style.setProperty&&(e.style.setProperty("width",W+"px","important"),
e.style.setProperty("height",q+"px","important"));
}
}(g[x]);
for(var y=0;y<v.length;y++){
var j=v[y];
j.parentNode.removeChild(j);
}
if(window.iframe_reload=function(){
for(var e=0,i=g.length;i>e;++e){
var o=g[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var k,O=document.getElementsByClassName("video_iframe"),x=0;k=O.item(x++);)k.setAttribute("scrolling","no"),
k.style.overflow="hidden";
u.video_iframe.length>0&&setTimeout(function(){
for(var e=u.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var r=d.dom,s=parseFloat(getComputedStyle(r).getPropertyValue("height")),c=0;r&&t!==r;)c+=r.offsetTop,
r=r.offsetParent;
u.video_top.push({
start:c+s/2,
end:c+s/2+a.getInnerHeight(),
reported:!1,
vid:d.vid
});
}
i(),f.on(window,"scroll",i);
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/utils/ajax_wx.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","common/utils.js","appmsg/log.js","biz_common/utils/url/parse.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function o(e){
window.logs||(window.logs={}),x.js_content=e.js_content||document.getElementById("js_content");
var o=e.js_toobar3||document.getElementById("js_toobar3");
x.pageEndTop=o?o.offsetTop:0,x.imgs=x.js_content?x.js_content.getElementsByTagName("img")||[]:[],
x.media=e.media||document.getElementById("media"),x.title=e.title||(window.msg_title||"").htmlDecode(),
x.video_cnt=e.video_cnt||window.logs.video_cnt||0,x.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
x.item_show_type=e.item_show_type||window.item_show_type||0,T=document.getElementsByTagName("html"),
T&&1==!!T.length&&c&&(T=T[0].innerHTML,O.content_length=c.htmlSize),window.logs.pageinfo=O,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var o=localStorage.key(e);
o.match(/^\d+$/)?localStorage.removeItem(o):o.match(/^adinfo_/)&&localStorage.removeItem(o),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(m.on(window,"load",function(){
H=1*S.get(P);
var o=""!==j.getQuery("imageIndex");
if(!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1;
t&&"scrollRestoration"in history&&(history.scrollRestoration="manual"),t||"undefined"!=typeof voiceid&&voiceid||(!e.disableScroll&&!o&&window.scrollTo(0,H),
v.saveSpeeds({
uin:uin,
pid:"https:"==R?462:417,
speeds:{
sid:36,
time:Math.ceil(H/b.getInnerHeight())
}
}),v.send());
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
if(G)return;
var i=A.getData(),n=localStorage.getItem("hand_up_id");
for(var p in i)p!=n&&i[p]&&(s(i[p].val),z.setSum(28307,59,1),A.remove(p));
window.setInterval(function(){
var e=a();
A.set(q,e,+new Date+864e7);
},1e3);
}
var m=I.getData("spad");
m&&m.spad&&d(m.spad.val),e.hasSpAd&&window.setInterval(function(){
r();
var e=_();
I.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
w({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:a(),
async:!0,
timeout:2e3
});
},5e3);
}),m.on(window,"unload",function(){
if(y("[Appmsg leaveReport in page_pos 3]"),console.log("[Appmsg leaveReport in page_pos 3]"),
!window.__second_open__&&(y("[Appmsg leaveReport in page_pos 4]"),console.log("[Appmsg leaveReport in page_pos 4]"),
!window.__jsapi_report_has_done__)){
y("[Appmsg leaveReport in page_pos 5]"),console.log("[Appmsg leaveReport in page_pos 5]"),
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
s(e),window.__unload_has_done__=!0;
}
}),window.logs.read_height=0,m.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(N),N=setTimeout(function(){
H=window.pageYOffset,S.set(P,H,+new Date+864e5);
},500);
}),m.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(N),N=setTimeout(function(){
H=window.pageYOffset,S.set(P,H,+new Date+864e5);
},500);
})),f.addReport(function(){
if(y("[Appmsg leaveReport in page_pos 1]"),console.log("[Appmsg leaveReport in page_pos 1]"),
!window.__unload_has_done__){
y("[Appmsg leaveReport in page_pos 2]"),console.log("[Appmsg leaveReport in page_pos 2]"),
D=!0,A.remove(q);
var e=a(),o=[];
for(var t in e)e.hasOwnProperty(t)&&o.push(t+"="+encodeURIComponent(e[t]));
var i={
reportUrl:"https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz,
reportData:o.join("&"),
method:"POST"
};
return window.__jsapi_report_has_done__=!0,y("[Appmsg leaveReport length]: "+JSON.stringify(i).length),
console.log("[Appmsg leaveReport length]: "+JSON.stringify(i).length),i;
}
}),m.on(document,"visibilitychange",function(){
u.isHidden()?localStorage.setItem("hand_up_id",q):localStorage.setItem("hand_up_id","");
}),p();
}
function t(e,o){
if(e&&!(e.length<=0))for(var t,i,n,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,r=e.length;r>s;++s)t=e[s],
t&&(i=t.getAttribute(o),i&&(n=i.match(a),n&&n[2]&&(E[n[2]]=!0)));
}
function i(e){
for(var o=0,t=B.length;t>o;++o)if(B[o]==e)return!0;
return!1;
}
function n(){
E={},t(document.getElementsByTagName("a"),"href"),t(document.getElementsByTagName("link"),"href"),
t(document.getElementsByTagName("iframe"),"src"),t(document.getElementsByTagName("script"),"src"),
t(document.getElementsByTagName("img"),"src");
var e=[];
for(var o in E)E.hasOwnProperty(o)&&(window.networkType&&"wifi"==window.networkType&&!k&&i(o)&&(k=!0),
e.push(o));
return E={},e.join(",");
}
function a(){
{
var e,o=window.pageYOffset||document.documentElement.scrollTop,t=x.js_content,i=b.getInnerHeight(),a=x.screen_width,s=x.scroll_height,r=Math.ceil(s/i),_=Math.ceil((t.scrollHeight||t.offsetHeight)/i),d=(window.logs.read_height||o)+i,p=x.pageEndTop,m=x.imgs,w=Math.ceil(d/i)||1,l=x.media,c=50,g=0,h=0,f=0,v=0,y=d+c>p?1:0;
t.offsetTop+t.scrollHeight;
}
w>r&&(w=r);
var j=function(o){
if(o)for(var t=0,i=o.length;i>t;++t){
var n=o[t];
if(n){
g++;
var a=n.getAttribute("src"),s=n.getAttribute("data-type");
a&&0==a.indexOf("http")&&(h++,a.isCDN()&&(f++,-1!=a.indexOf("tp=webp")&&v++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=v||0,e.download_img_cnt=h||0,e.download_cdn_img_cnt=f||0,
e.img_cnt=g||0,e.report_time=parseInt(Date.now()/1e3,10);
},z=window.appmsgstat||{},S=window.logs.img||{},A=window.logs.pagetime||{},I=S.load||{},E=S.read||{},R=[],B=[],D=0,N=0,H=0;
for(var P in E)P&&0==P.indexOf("http")&&E.hasOwnProperty(P)&&B.push(P);
for(var P in I)P&&0==P.indexOf("http")&&I.hasOwnProperty(P)&&R.push(P);
for(var M=0,q=R.length;q>M;++M){
var G=R[M];
G&&G.isCDN()&&(-1!=G.indexOf("/0")&&D++,-1!=G.indexOf("/640")&&N++,-1!=G.indexOf("/300")&&H++);
}
var e={
report_bizuin:biz,
title:x.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
read_cnt:z.read_num||0,
old_like_cnt:z.old_like_num||0,
like_cnt:z.like_num||0,
screen_width:a,
screen_height:b.getInnerHeight(),
screen_num:_,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:x.video_cnt,
read_screen_num:w||0,
is_finished_read:y,
scene:source,
content_len:O.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:u.getHandUpTime(),
total_height:p,
exit_height:d>p?p:d,
img_640_cnt:N,
img_0_cnt:D,
img_300_cnt:H,
wtime:A.onload_time||0,
ftime:A.ftime||0,
ptime:A.ptime||0,
onload_time:A.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:x.item_show_type,
page_req_info:JSON.stringify({
startGetAppmsgExtTime:window.startGetAppmsgExtTime,
startGetAppmsgAdTime:window.startGetAppmsgAdTime,
receiveGetAppmsgExt:window.receiveGetAppmsgExt,
receiveGetAppmsgAd:window.receiveGetAppmsgAd,
jsapiReadyTime:window.jsapiReadyTime,
domCompleteTime:window.domCompleteTime
})
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=R.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var C=window.logs.webplog;
e.webp_total=1,e.webp_lossy=C.lossy,e.webp_lossless=C.lossless,e.webp_alpha=C.alpha,
e.webp_animation=C.animation;
}
if(e.copyright_stat=window.isCartoonCopyright?"3":window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,J=[];
for(var U in Y)if(Y.hasOwnProperty(U)){
var K=Y[U];
K.val>0&&J.push(U+"_"+K.val);
}
e.idkey=J.join(";");
}
j(!!l&&l.getElementsByTagName("img")),j(m);
var L=(new Date).getDay(),V=n();
return(k||0!==user_uin&&Math.floor(user_uin/100)%7==L)&&(e.domain_list=V),k&&(e.html_content=T),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e.is_pay_subscribe=window.isPaySubscribe,e.is_paid=window.isPaid,e.preview_percent=window.previewPercent,
e.is_finished_preview=window.is_finished_preview||0,e.fee=window.paySubscribeInfo?window.paySubscribeInfo.fee:"",
e.pay_cnt=window.paySubscribeInfo?window.paySubscribeInfo.pay_cnt:"",e.worthy_cnt=window.paySubscribeInfo?window.paySubscribeInfo.like_cnt:"",
e.exptype=window.exptype||"",e.expsessionid=window.expsessionid||"",e;
}
function s(e){
if(!D){
D=!0,A.remove(q);
var o="/mp/appmsgreport?action=page_time&__biz="+biz;
if(navigator.sendBeacon){
var t="";
for(var i in e)t+=i+"="+e[i]+"&";
navigator.sendBeacon(l.joinUrl(o),t),console.log("sendBeacon send 10945 data");
}else w({
url:o,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
});
}
}
function r(){
S.set(P,H,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function d(e){
e&&e.play_type&&(I.remove("spad"),e.report_type=1,w({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function p(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?__biz="+biz+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var m=e("biz_common/dom/event.js"),w=e("biz_wap/utils/ajax.js"),l=e("biz_wap/utils/ajax_wx.js"),c=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var g=e("biz_wap/utils/storage.js"),u=e("biz_wap/utils/hand_up_state.js"),h=e("biz_wap/utils/mmversion.js"),f=(e("biz_wap/jsapi/core.js"),
e("biz_wap/jsapi/leaveReport.js")),v=e("biz_wap/utils/wapsdk.js"),b=e("common/utils.js"),y=e("appmsg/log.js"),j=e("biz_common/utils/url/parse.js"),z=(-1!=navigator.userAgent.indexOf("TBS/"),
e("biz_wap/utils/jsmonitor_report.js"));
window.__unload_has_done__=!1;
var T,x={
js_cmt_area:null,
js_content:null,
screen_height:b.getInnerHeight(),
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
},S=new g("page_pos"),A=new g("time_on_page"),I=new g("spad"),O={},E={},R=window.location.protocol,k=!1,B=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],D=!1,N=null,H=0,P=[biz,sn,mid,idx].join("_"),M=Math.random(),q=[biz,sn,mid,idx,M].join("_"),G=h.isAndroid&&h.gtVersion("7.0.4",!0)||h.isIOS&&h.gtVersion("7.0.4",!0);
return{
init:o
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});