var _extends=Object.assign||function(e){
for(var a=1;a<arguments.length;a++){
var i=arguments[a];
for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t]);
}
return e;
};
define("appmsg/without_iframe/video_plugin/video_tail.js",["biz_wap/jsapi/core.js","common/utils.js","biz_wap/utils/device.js","common/comm_report.js","pages/video_plugin/base.js","appmsg/without_iframe/video_plugin/video_tail_utils.js","pages/video_collection/report.js","appmsg/like_and_share.js","pages/video_collection/weapp_channel.js"],function(e){
"use strict";
function a(e,a){
e&&e.contentWindow&&e.contentWindow.postMessage(a,location.origin||"*");
}
function i(e){
this._g={
hasInit:0,
tailIframe:null,
status:"init",
opt:e
},this.videoTailUtils=o(e.cgiData);
}
var t=e("biz_wap/jsapi/core.js"),l=e("common/utils.js"),r=e("biz_wap/utils/device.js"),n=e("common/comm_report.js"),s=e("pages/video_plugin/base.js"),o=e("appmsg/without_iframe/video_plugin/video_tail_utils.js"),d=e("pages/video_collection/report.js"),p=e("appmsg/like_and_share.js"),g=e("pages/video_collection/weapp_channel.js");
return s.inherit(i,s.Class),i.prototype.playerReadyHandler=function(){
this.__initVideoTail();
},i.prototype.fullscreenchangeHandler=function(e,i){
if(1===this._g.hasInit){
var t=_extends({},i);
if(r.os.android&&this.player._g.myPlayer&&this.player._g.myPlayer.opt.width<=this.player._g.myPlayer.opt.height)if(i.state){
var l=this.player._g.myPlayer.getWcSlPlayerAndroidSafeAreaInsets();
t.padding=l.top+"px 0 0 0";
}else t.padding="0";
a(this._g.tailIframe,{
hostEnvEvent:"onWcSlPlayerFullscreenChange",
res:t
});
}else i.state?this.videoTailPanel.removeClass("video_screen_half"):this.videoTailPanel.addClass("video_screen_half");
},i.prototype.updateOpt=function(e){
_extends(this._g.opt,e);
},i.prototype.showEndContentHandler=function(){
var e=this;
1===this._g.hasInit?(this._g.tailIframe.style.display="",this.videoTailUtils.sendMPPageData(JSON.stringify({
dataType:"syncLikeStatus",
isLike:this._g.opt.isLike,
likeNum:this._g.opt.likeNum
}),"adWeb"),this.videoTailUtils.sendMPPageData(JSON.stringify({
dataType:"syncTestFlag",
testFlag:this._g.opt.testFlag
}),"adWeb"),a(this._g.tailIframe,{
hostEnvEvent:"onMPAdWebviewStateChange",
res:{
state:"appear"
}
})):this.videoTailUtils.initWebTailPanel(_extends({
replay:function(){
e.player._trigger("replay");
},
fallback:function(){
setTimeout(function(){
e.player._g.myPlayer&&e.player._g.myPlayer.showPlayBtn();
});
}
},this._g.opt));
},i.prototype.__initVideoTail=function(){
var e=this;
this._g.hasInit||(this.videoTailPanel=$("#js_video_tail_panel_"+this._g.opt.vid),
this.videoTailPanel[0].addEventListener("touchmove",function(a){
e.player.isInFullScreen()&&a.preventDefault();
}),this.player._g.myPlayer&&this.player._g.myPlayer._useWcSlPlayer()?!function(){
e._g.hasInit=1,e._g.tailIframe=$('<iframe class="'+e.videoTailPanel.attr("class")+'" style="display:none;padding:0;'+e.videoTailPanel.attr("style")+'" frameborder="no" border="0" scrolling="no"></iframe>')[0],
e.player._g.myPlayer.container.find(".js_page_video").prepend(e._g.tailIframe),e.videoTailUtils.initTailIframe4WcSlPlayer(e._g.tailIframe,e.player._g.myPlayer.id),
e.videoTailPanel.parent().remove(),e.__initWcSlVideoTailListeners();
var a=function t(){
e._g.tailIframe.removeEventListener("load",t),e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
});
};
e._g.tailIframe.addEventListener("load",a);
var i=function l(){
e._g.tailIframe.removeEventListener("error",l),e._g.tailIframe.remove(),e._g.tailIframe=null,
e._g.hasInit=2,e.player._g.myPlayer.container.find(".js_page_video").prepend(e.videoTailPanel.parent()),
e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
}),console.error("[Video Tail Plugin] Failed to init iframe tail, fallback to h5 tail");
};
e._g.tailIframe.addEventListener("error",i);
}():(this._g.hasInit=2,this.player._g.myPlayer&&this.player._g.myPlayer.container.find(".js_page_video").prepend(this.videoTailPanel.parent())));
},i.prototype.__initWcSlVideoTailListeners=function(){
var e=this;
p.onLikeChange(function(a,i){
e._g.opt.isLike=a,e._g.opt.likeNum=i,e.videoTailUtils.sendMPPageData(JSON.stringify({
dataType:"syncLikeStatus",
isLike:a,
likeNum:i
}),"adWeb");
}),this.videoTailUtils.onReceiveMPPageData(function(a){
var i=e.player&&e.player._g.myPlayer;
if("sharePage"===a.data)return void t.invoke("handleMPPageAction",{
action:"share"
});
if("triggerLikeBtn"===a.data)return void p.triggerLike(6);
if("openChannel"===a.data)return void(i.isInFullScreen()?(i.exitFullScreen(),setTimeout(function(){
g.openChannel();
},250)):g.openChannel());
"hasSubscribed"===a.data&&e.videoTailUtils.setTailOpts({
hasSubscribed:!0
});
var l=void 0;
try{
l=JSON.parse(a.data);
}catch(r){
return;
}
"commReport"===l.dataType&&n.report(l.logId,l.logData);
}),window.addEventListener("message",function(i){
var t=void 0;
if(i.origin?t=i.origin:i.originalEvent&&(t=i.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(t)&&i.source){
var r=e.player._g.myPlayer;
if(r&&i.data.__wcSlPlayerLoadTailRelateVideo__)return r.exitFullScreen(),d.leaveReportNowForSwitchVideo(),
void l.loadNewPageKeepingHistoryStackIfSecOpen(i.data.__wcSlPlayerLoadTailRelateVideo__);
if(r&&i.data.__videoTailPlayerId__&&i.data.__videoTailPlayerId__===r.id){
var n=i.data.data;
switch(i.data.action){
case"handleMPPageAction":
var s={
callbackId:i.data.callbackId,
res:{
err_msg:"handleMPPageAction:ok"
}
};
switch(n.action){
case"sendMPPageData":
e.videoTailUtils.emitHostEnvEvent4WcSlPlayer({
data:{
hostEnvEvent:"onReceiveMPPageData",
res:n
}
});
break;

case"opPlayer":
"play"===n.opType&&r.replay();
break;

case"closeAdWebview":
var o=function(){
var a=e._g.tailIframe.getAttribute("class"),i=e._g.tailIframe.getAttribute("style");
e._g.tailIframe.remove(),e._g.tailIframe=$('<iframe class="'+a+'" style="display:none;'+i+'" frameborder="no" border="0" scrolling="no"></iframe>')[0],
e.player._g.myPlayer.container.find(".js_page_video").prepend(e._g.tailIframe),e.videoTailUtils.initTailIframe4WcSlPlayer(e._g.tailIframe,e.player._g.myPlayer.id,!0);
var t=function r(){
e._g.tailIframe.removeEventListener("load",r),e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
});
};
e._g.tailIframe.addEventListener("load",t);
var l=function n(){
e._g.tailIframe.removeEventListener("error",n),e._g.tailIframe.remove(),e._g.tailIframe=null,
e._g.hasInit=2,e.player._g.myPlayer.container.find(".js_page_video").prepend(e.videoTailPanel.parent()),
e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
}),console.error("[Video Tail Plugin] Failed to init iframe tail, fallback to h5 tail");
};
return e._g.tailIframe.addEventListener("error",l),"break";
}();
if("break"===o)break;
}
s.callbackId&&a(e._g.tailIframe,s);
}
}
}
});
},i;
});define("appmsg/without_iframe/video_appmsg.html.js",[],function(){
return'<div id="page-content">\n    <!--S ???????????? full_screen_mv-->\n    <div id="js_mpvedio_wrapper_<#=vid#>" style="position:relative; height: <#=video_h#>px">\n        <div class="add_bg_color appmsg_video">\n            <div id="js_video_tail_panel_<#=vid#>" class="video_tail_module video_screen_half" style="display: none;">\n                <div class="video_tail_module__hd" id="js_video_tail_hd">\n                    <div class="account_info_wrp">\n                        <div class="profile_info_wrp js_go_profile">\n                            <img class="account_avatar" src="" alt="" id="js_tail_panel_account_avatar">\n                            <div class="account_name" id="js_tail_panel_account_name"></div>\n                            <div class="subscription_info subscription_success">\n                                <div class="account_subscription_tips js_subscription_success" id="js_subscription_success"\n                                    style="display: none;">?????????</div>\n                                <i class="account_link_icon js_profile_icon" id="js_profile_icon"></i>\n                            </div>\n                        </div>\n                        <div class="btn_account_subscription js_btn_account_subscription" id="js_btn_account_subscription" style="display: none;">\n                            Follow</div>\n                    </div>\n                    <div class="opr_wrp">\n                        <span class="opr_item_wrp js_replay" id="js_replay">\n                            <i class="opr_item refresh_icon"></i>\n                            <span class="opr_item_text">Replay</span>\n                        </span>\n                        <span class="opr_item_wrp share_item_wrp js_share_button" id="js_tail_share_button"\n                            style="display: none;">\n                            <i class="opr_item share_icon"></i>\n                            <span class="opr_item_text">Share</span>\n                        </span>\n                        <!--????????? ???className selected-->\n                        <span class="opr_item_wrp like_item_wrp" id="js_tail_like_button" style="display: none;">\n                            <i class="opr_item like_icon"></i>\n                            <span class="opr_item_text">Like</span>\n                        </span>\n                        <span class="opr_item_wrp recommend_item_wrp" id="js_tail_channel_button"\n                            style="display: none;">\n                            <i class="opr_item video-logo_icon"></i>\n                            <span class="opr_item_text">????????????</span>\n                        </span>\n                    </div>\n                </div>\n\n                <!-- ??????????????? -->\n                <div class="have_expand" id="js_expand_area">\n                </div>\n\n                <!-- ???????????? -->\n                <div class="ad_area" id="js_tail_video_ad_area">\n                </div>\n            </div>\n        </div>\n\n    </div>\n    <!--E ???????????????-->\n    <!-- S ????????????-->\n    <div id="bottom_bar" class="interact_video" style="display:none;height: 35px;">\n        <div class="inter_opr">\n            <a id="video_detail_btn" href="javascript:;" target="_blank" class="access_original">\n                Video Details            </a>\n        </div>\n    </div>\n</div>';
});;define('page/appmsg_new/mod/album_read.css', [], function(require, exports, module) {
	return ".wx_icon_pay_tag{color:#fff;background:#fa9d3b;border-radius:2px;font-size:10px;line-height:1;padding:3px 4px}.wx_icon_pay_tag_paid{color:#fa9d3b;background:rgba(250,157,59,0.2)}@media(prefers-color-scheme:dark){.wx_icon_pay_tag{background:#c87d2f}.wx_icon_pay_tag_paid{color:rgba(250,157,59,0.6);background:rgba(250,157,59,0.2)}}.album_read_card{overflow:hidden;margin-top:16px;font-size:14px;color:rgba(0,0,0,0.9);line-height:1.4}.album_read_card .weui-flex__item{min-width:0}.album_read_card .weui-btn__word-wrp{font-size:14px;color:rgba(0,0,0,0.5)}.album_read_card .weui-btn__word-wrp:before{content:\"\\00B7\";margin-left:2px}.album_read_hd{padding:18px 16px;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:relative}.album_read_hd:active{opacity:.5}.album_read_source{width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;color:rgba(0,0,0,0.5)}.album_read_source a:active{opacity:.5}.album_read_directory_access{color:#576b95;margin-left:24px}.album_read_directory_access:active{opacity:.5}.album_read_directory_access:before{content:\"\";display:inline-block;vertical-align:middle;font-size:10px;width:2em;height:2em;margin-top:-0.2em;-webkit-mask:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='20' height='20' viewBox='0 0 20 20'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath fill='%23D8D8D8' d='M0 0h20v20H0z' opacity='0'\/%3E    %3Cpath fill='%23576B95' d='M14.8 13c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 14v-.8c0-.11.09-.2.2-.2h9.6zm0-4c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 10v-.8c0-.11.09-.2.2-.2h9.6zm0-4c.11 0 .2.09.2.2V6a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 6v-.8c0-.11.09-.2.2-.2h9.6z'\/%3E  %3C\/g%3E%3C\/svg%3E\") no-repeat 50% 50%;mask:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='20' height='20' viewBox='0 0 20 20'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath fill='%23D8D8D8' d='M0 0h20v20H0z' opacity='0'\/%3E    %3Cpath fill='%23576B95' d='M14.8 13c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 14v-.8c0-.11.09-.2.2-.2h9.6zm0-4c.11 0 .2.09.2.2v.8a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 10v-.8c0-.11.09-.2.2-.2h9.6zm0-4c.11 0 .2.09.2.2V6a.2.2 0 0 1-.2.2H5.2A.2.2 0 0 1 5 6v-.8c0-.11.09-.2.2-.2h9.6z'\/%3E  %3C\/g%3E%3C\/svg%3E\") no-repeat 50% 50%;-webkit-mask-size:cover;mask-size:cover;background-color:currentColor}.album_read_nav_item{position:relative;text-align:center;padding:4px 24px 20px}.album_read_nav_item:before{content:\"\";position:absolute;top:4px;bottom:20px;left:0;width:1px;background:-webkit-linear-gradient(top,rgba(0,0,0,0.03),rgba(0,0,0,0.05) 50%,rgba(0,0,0,0.03) 100%)}.album_read_nav_item:active .album_read_nav_inner{opacity:.5}.album_read_nav_item.album_read_nav_prev{text-align:left}.album_read_nav_item.album_read_nav_next{text-align:right}.album_read_nav_item:first-child:before{display:none}.album_read_nav_item:first-child:last-child{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:14px;padding-bottom:32px}.album_read_nav_item:first-child:last-child:before{top:14px;bottom:32px}.album_read_nav_item:first-child:last-child .album_read_nav_btn:before,.album_read_nav_item:first-child:last-child .album_read_nav_btn:after{display:none}.album_read_nav_item:first-child:last-child .album_read_nav_inner{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.album_read_nav_item:first-child:last-child .album_read_nav_inner:before,.album_read_nav_item:first-child:last-child .album_read_nav_inner:after{content:\"\";display:inline-block;vertical-align:middle;font-size:10px;margin-top:-1px;width:1em;height:2em;-webkit-mask-size:cover;mask-size:cover;background-color:currentColor;-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.album_read_nav_item:first-child:last-child.album_read_nav_prev .album_read_nav_inner:before{transform:matrix(-1,0,0,-1,0,0);-ms-transform:matrix(-1,0,0,-1,0,0);-webkit-transform:matrix(-1,0,0,-1,0,0);margin-right:8px}.album_read_nav_item:first-child:last-child.album_read_nav_prev .album_read_nav_inner:after{display:none}.album_read_nav_item:first-child:last-child.album_read_nav_next .album_read_nav_inner:before{display:none}.album_read_nav_item:first-child:last-child.album_read_nav_next .album_read_nav_inner:after{margin-left:8px}.album_read_nav_item:first-child:last-child .album_read_nav_title{-webkit-line-clamp:1;margin-top:0;-webkit-box-flex:1;-webkit-flex:1;flex:1}.album_read_nav_item:first-child:last-child .album_read_nav_title:before{content:\"\\00B7\";margin-left:4px;margin-right:4px}.album_read_nav_btn{display:block;color:rgba(0,0,0,0.9);font-weight:500}.album_read_nav_btn:before,.album_read_nav_btn:after{content:\"\";display:inline-block;vertical-align:middle;font-size:10px;margin-top:-0.2em;width:1em;height:2em;-webkit-mask-size:cover;mask-size:cover;background-color:currentColor;-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.album_read_nav_prev .album_read_nav_btn:before{transform:matrix(-1,0,0,-1,0,0);-ms-transform:matrix(-1,0,0,-1,0,0);-webkit-transform:matrix(-1,0,0,-1,0,0);margin-right:8px}.album_read_nav_prev .album_read_nav_btn:after{display:none}.album_read_nav_next .album_read_nav_btn:before{display:none}.album_read_nav_next .album_read_nav_btn:after{margin-left:8px}.album_read_nav_title{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;margin-top:8px;line-height:1.2}.album_read_directory .weui-half-screen-dialog{padding:0;padding:0 constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);padding:0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}.album_read_directory .weui-half-screen-dialog__hd{padding-left:24px;padding-right:24px}.album_read_directory .weui-icon-close-thin{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);-webkit-transform:rotate(90deg);transform:rotate(90deg);width:14px}.album_read_directory .weui-btn__word-wrp{font-size:14px}.album_read_title{color:#576b95}.album_read_directory_item{color:rgba(0,0,0,0.9);line-height:1.4;padding:24px 16px;position:relative}.album_read_directory_item:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid rgba(0,0,0,0.1);-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:16px;right:16px}.album_read_directory_item:last-child:after{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid rgba(0,0,0,0.1);-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);left:16px;right:16px}.album_read_directory_item:active{background-color:rgba(0,0,0,0.05)}.album_read_directory_item .wx_icon_pay_tag{margin-left:8px;margin-top:-2px;display:inline-block;vertical-align:middle}.album_read_directory_current{background-color:rgba(0,0,0,0.05)}.album_read_directory_disabled{color:rgba(0,0,0,0.28)}@media(prefers-color-scheme:dark){.album_read_card{color:rgba(255,255,255,0.8)}.album_read_card .weui-btn__word-wrp{color:rgba(255,255,255,0.5)}.album_read_bd:before{border-top-color:rgba(255,255,255,0.05)}.album_read_directory_access{color:#7d90a9}.album_read_title{color:#7d90a9}.album_read_source{color:rgba(255,255,255,0.5)}.album_read_nav_item:before{background:-webkit-linear-gradient(top,rgba(255,255,255,0.03),rgba(255,255,255,0.05) 50%,rgba(255,255,255,0.03) 100%)}.album_read_nav_btn{color:rgba(255,255,255,0.8)}.album_read_directory_item{color:rgba(255,255,255,0.8)}.album_read_directory_item:before{border-top-color:rgba(255,255,255,0.05)}.album_read_directory_item:active{background-color:rgba(255,255,255,0.1)}.album_read_directory_item:last-child:after{border-bottom-color:rgba(255,255,255,0.05)}.album_read_directory_current{background-color:rgba(255,255,255,0.1)}.album_read_directory_disabled{color:rgba(255,255,255,0.24)}}";
});define("appmsg/more_read_tpl.html.js",[],function(){
return'<p class="read-more__desc">You can also read </p>\n<div class="read-more__article__area">\n  <# list.forEach(function (item) { #>\n    <div class="read-more__article__item">\n      <a href="javascript:;" class="more_read_link"><#=item.title#></a>\n      <# if (item.fans_read_cnt > 0) { #>\n        <p class="read-more__article__extra">Read by <#=item.fans_read_cnt#> friend(s)</p>\n      <# } #>\n    </div>\n  <# }); #>\n</div>';
});function _defineProperty(e,n,s){
return n in e?Object.defineProperty(e,n,{
value:s,
enumerable:!0,
configurable:!0,
writable:!0
}):e[n]=s,e;
}
var _extends=Object.assign||function(e){
for(var n=1;n<arguments.length;n++){
var s=arguments[n];
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);
}
return e;
};
define("pages_new/common_share/video/store.js",["pages_new/3rd/vue.js","pages_new/3rd/vuex.js","pages_new/modules/utils/url.js","pages_new/common_share/video/lifecycle_manager.js","pages_new/common_share/video/player/player_store.js","pages_new/common_share/video/related_video_list/related_video_list_store.js","pages_new/common_share/video/like_and_share/like_and_share_store.js","pages_new/common_share/video/topic/topic_store.js","pages_new/modules/comment/comment_store.js","pages_new/modules/reward/reward_store.js","pages_new/common_share/video/player/plugins/tail/tail_store.js","pages_new/common_share/video/player/plugins/danmu/danmu_store.js","pages_new/common_share/video/player/plugins/popup/popup_store.js","pages_new/common_share/video/player/plugins/mid_ad/mid_ad_store.js","pages_new/common_share/video/player/plugins/auto_next/auto_next_store.js"],function(e){
"use strict";
function n(){
return _extends({},window.cgiData,{
uin:window.uin,
biz:window.biz,
appmsgid:window.appmsgid,
idx:window.idx,
scene:window.scene,
subscene:window.subscene,
enterid:window.enterid,
sessionid:window.sessionid,
channel_session_id:window.channel_session_id,
item_show_type:window.item_show_type,
clientversion:window.clientversion,
devicetype:window.devicetype,
continueid:window.continueid,
continueseq:window.continueseq,
reloadid:window.reloadid,
exptype:window.exptype,
expsessionid:window.expsessionid,
source:window.source,
is_temp_url:window.is_temp_url,
appmsg_like_type:window.appmsg_like_type,
pass_ticket:window.pass_ticket,
passparam:window.passparam,
wxtoken:window.wxtoken,
copyright_stat:window.copyright_stat,
need_pay:window.need_pay,
is_pay_subscribe:window.is_pay_subscribe,
msg_title:window.msg_title,
msg_desc:window.msg_desc,
ct:window.ct,
ori_send_time:window.ori_send_time,
msg_link:window.msg_link,
is_login:window.is_login,
user_uin:window.user_uin,
isprofileblock:window.isprofileblock,
round_head_img:window.round_head_img,
kanyikan_video_educate_pic:window.kanyikan_video_educate_pic,
kanyikan_educate_pic:window.kanyikan_educate_pic,
appmsg_type:window.appmsg_type,
send_time:window.send_time,
isPaySubscribe:window.isPaySubscribe,
defaultAvatarUrl:window.defaultAvatarUrl
});
}
function s(){
y.forEach(function(e){
return x.registerModule(e.name,e);
});
}
function i(){
y.forEach(function(e){
return x.unregisterModule(e.name);
});
}
function o(){
j.forEach(function(e){
return x.registerModule([l.name,e.name],e);
});
}
function _(){
j.forEach(function(e){
return x.unregisterModule([l.name,e.name]);
});
}
function t(){
i(),_(),x.commit(u.SET_CGI_DATA,n()),x.commit(u.SET_URL_PARAMS,w.getParams()),s(),
o();
}
function a(e){
x.commit(u.SET_CGI_DATA,n()),x.commit(u.SET_URL_PARAMS,w.getParams()),e&&(s(),o());
}
function r(){
x.commit(u.SET_EXT_RES,{}),x.commit(u.SET_AD_RES,{}),x.commit(u.SET_CGI_DATA,{}),
x.commit(u.SET_URL_PARAMS,{});
}
var d,p=e("pages_new/3rd/vue.js"),m=e("pages_new/3rd/vuex.js"),w=e("pages_new/modules/utils/url.js"),c=e("pages_new/common_share/video/lifecycle_manager.js");
p.use(m);
var u={
SET_EXT_RES:"SET_EXT_RES",
SET_AD_RES:"SET_AD_RES",
SET_CGI_DATA:"SET_CGI_DATA",
SET_URL_PARAMS:"SET_URL_PARAMS",
SET_PRAISE_NUM:"SET_PRAISE_NUM",
SET_RECOMMEND_NUM:"SET_RECOMMEND_NUM",
SET_RECOMMEND_STATUS:"SET_RECOMMEND_STATUS",
SET_PRAISE_STATUS:"SET_PRAISE_STATUS",
SET_SUBSCRIBE_STATUS:"SET_SUBSCRIBE_STATUS",
SET_PUBLIC_RELATED_VIDEO:"SET_PUBLIC_RELATED_VIDEO"
},l=e("pages_new/common_share/video/player/player_store.js"),g=e("pages_new/common_share/video/related_video_list/related_video_list_store.js"),S=e("pages_new/common_share/video/like_and_share/like_and_share_store.js"),E=e("pages_new/common_share/video/topic/topic_store.js"),T=e("pages_new/modules/comment/comment_store.js"),R=e("pages_new/modules/reward/reward_store.js"),y=[g,S,E,T,R],f=e("pages_new/common_share/video/player/plugins/tail/tail_store.js"),A=e("pages_new/common_share/video/player/plugins/danmu/danmu_store.js"),v=e("pages_new/common_share/video/player/plugins/popup/popup_store.js"),h=e("pages_new/common_share/video/player/plugins/mid_ad/mid_ad_store.js"),P=e("pages_new/common_share/video/player/plugins/auto_next/auto_next_store.js"),j=[f,A,v,h,P],x=new m.Store({
modules:_defineProperty({},l.name,l),
state:{
extRes:{},
adRes:{},
cgiData:{},
urlParams:{}
},
mutations:(d={},_defineProperty(d,u.SET_EXT_RES,function(e,n){
e.extRes=n;
}),_defineProperty(d,u.SET_AD_RES,function(e,n){
e.adRes=n;
}),_defineProperty(d,u.SET_CGI_DATA,function(e,n){
e.cgiData=n;
}),_defineProperty(d,u.SET_URL_PARAMS,function(e,n){
e.urlParams=n;
}),_defineProperty(d,u.SET_PRAISE_NUM,function(e,n){
e.extRes.appmsgstat&&e.extRes.appmsgstat.old_like_num&&(e.extRes.appmsgstat.old_like_num=n.praiseNum);
}),_defineProperty(d,u.SET_RECOMMEND_NUM,function(e,n){
e.extRes.appmsgstat&&e.extRes.appmsgstat.like_num&&(e.extRes.appmsgstat.like_num=n.recommendNum);
}),_defineProperty(d,u.SET_RECOMMEND_STATUS,function(e,n){
e.extRes.appmsgstat&&(e.extRes.appmsgstat.liked=n.hasRecommended?1:0);
}),_defineProperty(d,u.SET_PRAISE_STATUS,function(e,n){
e.extRes.appmsgstat&&(e.extRes.appmsgstat.old_liked=n.hasPraised?1:0);
}),_defineProperty(d,u.SET_SUBSCRIBE_STATUS,function(e,n){
e.extRes.is_fans=n.hasSubscribed?1:0;
}),_defineProperty(d,u.SET_PUBLIC_RELATED_VIDEO,function(e,n){
e.cgiData.isPublicRelatedVideo=n.isPublicRelatedVideo;
}),d)
});
return c.register({
getData:t,
init:a,
destroy:r
}),x;
});var _extends=Object.assign||function(n){
for(var e=1;e<arguments.length;e++){
var t=arguments[e];
for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);
}
return n;
};
define("appmsg/comment/comment_report.js",["common/comm_report.js"],function(n){
"use strict";
var e=n("common/comm_report.js"),t=void 0;
switch(1*window.item_show_type){
case 5:
t=1;
break;

case 7:
t=2;
break;

case 8:
t=3;
break;

case 10:
t=4;
break;

case 0:
case 9:
case 11:
default:
t=0;
}
return{
report22214:function(n){
return function(t){
return e.report(22214,_extends({},n,t));
};
}({
BizUin:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
AppMsgItemIdx:window.parseInt(window.idx,10)||0,
Scene:t,
EnterId:window.parseInt(window.enterid,10)||0,
CommentId64Bit:window.parseInt(window.comment_id,10)||0
}),
report22215:function(n){
return function(t){
return e.report(22215,_extends({},n,t));
};
}({
BizUin:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
AppMsgItemIdx:window.parseInt(window.idx,10)||0,
Scene:t,
EnterId:window.parseInt(window.enterid,10)||0,
CommentId64Bit:window.parseInt(window.comment_id,10)||0
})
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var i=t[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);
}
}
return function(t,n,i){
return n&&e(t.prototype,n),i&&e(t,i),t;
};
}();
define("appmsg/emotion/emotion_panel.js",["widget/wx-widget/wx_emotion_panel.css","biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/utils/emoji_panel_data.js","biz_common/utils/emoji_data.js","biz_wap/utils/mmversion.js","appmsg/emotion/selection.js","appmsg/comment/comment_input/comment_input.js"],function(require,exports,module,alert){
"use strict";
require("widget/wx-widget/wx_emotion_panel.css");
var JSAPI=require("biz_wap/jsapi/core.js"),DomEvent=require("biz_common/dom/event.js"),panelData=require("biz_common/utils/emoji_panel_data.js"),emojiData=require("biz_common/utils/emoji_data.js"),mmversion=require("biz_wap/utils/mmversion.js"),Selection=require("appmsg/emotion/selection.js"),CommentInput=require("appmsg/comment/comment_input/comment_input.js"),emotionPanelList=[],EmotionPanel=function(){
function EmotionPanel(e){
switch(_classCallCheck(this,EmotionPanel),this.isShow=!1,this.opt=e,this.__bindEvent(),
e.type){
case"contenteditable":
this.valueKey="innerHTML",this.lastRange=null,this.__bindContenteditableEvent();
break;

default:
this.valueKey="value";
}
this.limit=e.limit,mmversion.isAndroid&&this.__initEmojiPanel(),emotionPanelList.push(this);
}
return _createClass(EmotionPanel,[{
key:"show",
value:function(){
var e=this;
this.isShow||(mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!1,
duration:.01
},function(t){
/:ok$/.test(t.err_msg)&&(e.isShow=!0,"function"==typeof e.opt.onShow&&e.opt.onShow(t.height));
}):(this.opt.input.blur(),JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),setTimeout(function(){
e.panel.style.display="",e.isShow=!0,"function"==typeof e.opt.onShow&&e.opt.onShow(e.panel.offsetHeight);
},200)));
}
},{
key:"hide",
value:function(){
var e=this;
this.isShow&&(mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(t){
/:ok$/.test(t.err_msg)&&(e.isShow=!1,"function"==typeof e.opt.onHide&&e.opt.onHide());
}):(this.panel.style.display="none",this.isShow=!1,"function"==typeof this.opt.onHide&&this.opt.onHide(),
JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){})));
}
},{
key:"toggle",
value:function(){
this[this.isShow?"hide":"show"]();
}
},{
key:"setLimit",
value:function(e){
this.limit=e;
}
},{
key:"restoreRange",
value:function(){
if(this.lastRange)if("contenteditable"===this.opt.type){
var e=Selection.getSelection(),t=document.createRange();
t.setStart(this.lastRange.endContainer,this.lastRange.endOffset),t.setEnd(this.lastRange.endContainer,this.lastRange.endOffset),
e.removeAllRanges(),e.addRange(t);
}else{
var e=Selection.getSelection();
if(e.addRange)e.removeAllRanges(),e.addRange(this.lastRange);else{
var t=Selection.getRange();
t.setEndPoint&&(t.setEndPoint("EndToEnd",this.lastRange),t.setEndPoint("StartToStart",this.lastRange)),
t.select();
}
}else if("contenteditable"===this.opt.type){
var e=Selection.getSelection();
e.selectAllChildren(this.opt.input),e.collapseToEnd();
}else{
var n=this.opt.input,i=n.value.length;
n.setSelectionRange(i,i);
}
this.__saveRange();
}
},{
key:"__bindEvent",
value:function(){
var e=this;
DomEvent.on(this.opt.input,"touchstart",function(){
e.hide();
});
}
},{
key:"__bindContenteditableEvent",
value:function(){
var e=this;
DomEvent.on(this.opt.input,"input",function(){
e.__saveRange();
}),DomEvent.on(this.opt.input,"keyup",function(){
e.__saveRange();
}),DomEvent.on(this.opt.input,"mouseup",function(){
e.__saveRange();
});
var t=null;
DomEvent.on(this.opt.input,"paste",function(){
t&&clearTimeout(t),t=setTimeout(function(){
Selection.setCursorToEnd(CommentInput.FilterNode(e.opt.input,!0)),e.__saveRange();
},10);
});
}
},{
key:"__saveRange",
value:function(e){
this.lastRange=e||Selection.getRange();
}
},{
key:"__getContent",
value:function(e,t){
return this.opt.input[this.valueKey].substring(e,t);
}
},{
key:"__setInputValue",
value:function(e,t){
var n=this,i=this.opt.input;
if(this.opt.vueOpt){
var o=this.opt.vueOpt;
o.instance[o.key]=e,o.instance.$nextTick(function(){
n.__setSelectionRange(t);
});
}else i[this.valueKey]=e,this.__setSelectionRange(t);
}
},{
key:"__setSelectionRange",
value:function(e){
var t=this.opt.input;
if("contenteditable"===this.opt.type){
var n=(e||t.childNodes.length-1+"_").split("_").map(function(e,n,i){
return 1===n&&""===e?t.childNodes[1*i[0]].nodeValue.length:+e;
});
this.__saveRange({
endContainer:t.childNodes[n[0]],
endOffset:n[1]
});
}else t.setSelectionRange(e,e);
}
},{
key:"__insertContent",
value:function(e){
var t=this;
if(this.opt.input){
var n=this.opt.input,i="",o="",a=void 0,s=void 0;
"contenteditable"===this.opt.type?!function(){
var l=-1;
Array.prototype.forEach.call(n.childNodes,function(e,n){
t.lastRange?-1===l?e===t.lastRange.endContainer?1===e.nodeType?(l=n+1,i+=e.outerHTML):(l=n,
i+=e.nodeValue.slice(0,t.lastRange.endOffset),o+=e.nodeValue.slice(t.lastRange.endOffset)):i+=1===e.nodeType?e.outerHTML:e.nodeValue:o+=1===e.nodeType?e.outerHTML:e.nodeValue:i+=1===e.nodeType?e.outerHTML:e.nodeValue;
}),a=i+e+o,s=t.lastRange&&-1!==l?l+"_"+(t.lastRange.endOffset+e.length):"";
}():(i=this.__getContent(0,n.selectionStart),o=this.__getContent(n.selectionEnd),
a=i+e+o,s=n.selectionStart+e.length);
var l=this.opt.counter?this.opt.counter(a):a.length;
if(0!==this.limit&&l>this.limit)return;
this.__setInputValue(EmotionPanel.__filterContent(a),s);
}
}
},{
key:"__delContent",
value:function(){
var e=this;
if(this.opt.input){
var t=this.opt.input,n="",i="";
if("contenteditable"===this.opt.type){
var o=function(){
var o=-1;
if(e.lastRange?Array.prototype.some.call(t.childNodes,function(t){
return o++,t===e.lastRange.endContainer?!0:!1;
}):o=t.childNodes.length-1,-1===o)return{
v:void 0
};
var a=t.childNodes[o];
if(1===a.nodeType)if(t.removeChild(a),0===t.childNodes.length)e.lastRange=null;else{
var s=o,l=void 0;
o?(s--,l=3===t.childNodes[s].nodeType?t.childNodes[s].nodeValue.length:0):l=0,e.__saveRange({
endContainer:t.childNodes[s],
endOffset:l
});
}else{
var r=a.nodeValue;
if(r){
if(0===o&&0===e.lastRange.endOffset)return{
v:void 0
};
e.lastRange?(n=r.slice(0,e.lastRange.endOffset),i=r.slice(e.lastRange.endOffset)):(n=r,
i="");
var u=EmotionPanel.__delEmojiText(n,i),l=void 0;
null===u.value?(l=e.lastRange.endOffset-1,a.nodeValue=n.substring(0,n.length-1)+i):(l=e.lastRange.endOffset-u.length,
a.nodeValue=u.value),e.__saveRange({
endContainer:t.childNodes[o],
endOffset:l
});
}else if(o){
t.removeChild(a);
var c=t.childNodes[o-1];
e.__saveRange({
endContainer:c,
endOffset:3===c.nodeType?c.nodeValue.length:0
}),e.__delContent();
}
}
}();
if("object"===("undefined"==typeof o?"undefined":_typeof(o)))return o.v;
}else{
n=this.__getContent(0,t.selectionStart),i=this.__getContent(t.selectionEnd);
var a=void 0,s=void 0;
if(t.selectionStart===t.selectionEnd){
var l=EmotionPanel.__delEmojiText(n,i);
null===l.value?(a=n.substring(0,n.length-1)+i,s=t.selectionStart-1):(a=l.value,s=t.selectionStart-l.length);
}else a=n+i,s=t.selectionStart;
this.__setInputValue(EmotionPanel.__filterContent(a),s);
}
}
}
},{
key:"__initEmojiPanel",
value:function(){
for(var e=this,t=16,n=7,i=34,o=[],a={},s=[],l=0;l<panelData.length;l++)for(var r=0;r<emojiData.length;r++)if(emojiData[r].id===panelData[l]){
s[l]=emojiData[r];
break;
}
for(var l=0;n>l;l++)for(var r=0;t>r;r++){
var u=l*t+r;
s[u]&&o.push({
name:s[u].style,
title:s[u].emoji?s[u].emoji:s[u].cn,
bp:"background-position: 0 -"+u*i+"px;",
id:s[u].id
});
}
for(var l=0;l<s.length;l++)a[s[l].style]=s[l].emoji||s[l].cn;
var c=document.createDocumentFragment();
this.panel=document.createElement("ul"),this.panel.className="comment_primary_emotion_list_mobile comment__emoji__panel",
this.panel.style.display="none",c.appendChild(this.panel),o.forEach(function(t,n){
var i=document.createElement("li"),o=document.createElement("span");
i.className="comment_primary_emotion_item js_emotion_item",i.setAttribute("data-index",n),
o.className="comment_primary_emotion",o.setAttribute("style",t.bp),o.setAttribute("text-name",t.name),
o.setAttribute("role","button"),o.setAttribute("title",t.title),i.appendChild(o),
e.panel.appendChild(i);
}),document.body.appendChild(this.panel);
var h=void 0;
DomEvent.on(this.panel,"touchstart",function(e){
h=e.changedTouches[0].clientY;
}),DomEvent.on(this.panel,"touchmove",function(t){
var n=t.changedTouches[0].clientY,i=e.panel.scrollTop,o=e.panel.scrollHeight,a=e.panel.clientHeight;
(.5>i&&n>h||.5>o-i-a&&h>n)&&t.preventDefault(),"function"==typeof e.opt.onTouchmove&&e.opt.onTouchmove(t);
}),DomEvent.on(this.panel,"click",function(t){
if(console.log("click",t),"comment_primary_emotion"===t.target.className){
var n=t.target.getAttribute("text-name"),i=a[n];
i&&e.__insertContent(i),"function"==typeof e.opt.onChange&&e.opt.onChange({
type:"emotion",
value:n,
text:i
});
}
});
}
}],[{
key:"__filterContent",
value:function(e){
var t=e;
return t;
}
},{
key:"__getEmojiText",
value:function __getEmojiText(emoji){
for(var i=0;i<emojiData.length;i++){
var e=emojiData[i];
switch(emoji){
case e.cn:
return e.emoji||e.cn;

case e.hk:
return e.emoji||e.hk;

case e.us:
return e.emoji||e.us;

case e.emoji:
return e.emoji;

case e.code:
return e.emoji||e.cn;

default:
if(!mmversion.isIOS&&e.code.startsWith("\\ue"))try{
var c=eval("'"+e.code+"'");
if(emoji===c)return e.emoji||e.cn;
}catch(err){}
}
}
return"";
}
},{
key:"__delEmojiText",
value:function(e,t){
for(var n=null,i=0;i<emojiData.length;i++){
var o=emojiData[i];
if(o.cn&&e.endsWith(o.cn)){
n=o.cn.length;
break;
}
if(o.hk&&e.endsWith(o.hk)){
n=o.hk.length;
break;
}
if(o.us&&e.endsWith(o.us)){
n=o.us.length;
break;
}
if(o.emoji&&e.endsWith(o.emoji)){
n=o.emoji.length;
break;
}
}
return{
value:null===n?null:e.substring(0,e.length-n)+t,
length:n
};
}
}]),EmotionPanel;
}();
return mmversion.isIOS&&!function(){
var e=function(e,t,n){
"function"==typeof n&&n(),"function"==typeof e.opt.onChange&&e.opt.onChange(t);
};
JSAPI.on("onGetSmiley",function(t){
emotionPanelList.some(function(n){
if(n.isShow){
switch(t.smiley){
case"[DELETE_EMOTION]":
e(n,{
type:"action",
value:"del"
},function(){
n.__delContent();
});
break;

case"[DONE_EMOTION]":
e(n,{
type:"action",
value:"done"
},function(){
n.isShow=!1;
});
break;

default:
var i=EmotionPanel.__getEmojiText(t.smiley);
e(n,{
type:"emotion",
value:t.smiley,
text:i
},function(){
i&&n.__insertContent(i);
});
}
return!0;
}
return!1;
});
});
}(),EmotionPanel;
});function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var i=t[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);
}
}
return function(t,n,i){
return n&&e(t.prototype,n),i&&e(t,i),t;
};
}();
define("common/fixed_input.js",["biz_common/dom/event.js"],function(e){
"use strict";
var t=e("biz_common/dom/event.js"),n=function(){
function e(n){
var i=this;
switch(_classCallCheck(this,e),n.type){
case"contenteditable":
this.valueKey="innerHTML";
break;

default:
this.valueKey="value";
}
this.input=n.input,this.placeholder=this.input.cloneNode(),this.placeholder.removeAttribute("id"),
this.placeholder.style.display="none","function"==typeof n.onCreate&&n.onCreate(this.placeholder),
t.on(this.input,"focus",function(e){
var t=i.input.scrollTop;
i.input.style.padding=0,i.input.style.height=0,i.placeholder.style.display="",i.placeholder.scrollTop=t,
setTimeout(function(){
i.input.style.removeProperty("padding"),i.input.style.removeProperty("height"),i.placeholder.style.display="none";
},300),"function"==typeof n.onFocus&&n.onFocus(e);
}),t.on(this.input,"input",function(e){
i.placeholder[i.valueKey]=i.input[i.valueKey],"function"==typeof n.onInput&&n.onInput(e);
}),this.input.insertAdjacentElement("afterend",this.placeholder);
}
return _createClass(e,[{
key:"setInput",
value:function(e){
this.input[this.valueKey]=e,this.setPlaceholder(e);
}
},{
key:"setPlaceholder",
value:function(e){
this.placeholder[this.valueKey]=e;
}
}]),e;
}();
return n;
});define("appmsg/comment/comment_length.js",["pages/utils.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js"],function(e){
"use strict";
var t=e("pages/utils.js"),i=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/utils/device.js"),n=i.is_wxwork,r=s.os.pc&&!n;
return{
remindWordCount:10,
getLength:function(e){
return e=t.trim(e),r&&(e=e.replace(/<br\/>/g,"").replace(/\n/g,"")||""),Math.ceil(e.replace(/[^\x00-\xff]/g,"**").length/2);
},
getLimit:function(e){
return"comment"===e?600:140;
}
};
});function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function t(t,e){
for(var n=0;n<e.length;n++){
var i=e[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);
}
}
return function(e,n,i){
return n&&t(e.prototype,n),i&&t(e,i),e;
};
}();
define("appmsg/comment/comment_input/comment_input.js",["biz_common/dom/event.js","pages/utils.js","appmsg/emotion/selection.js","common/utils.js","appmsg/emotion/dom.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_common/tmpl.js","appmsg/comment/comment_input/comment_input.html.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js"],function(t){
"use strict";
var e=t("biz_common/dom/event.js"),n=t("pages/utils.js"),i=t("appmsg/emotion/selection.js"),o=t("common/utils.js"),s=t("appmsg/emotion/dom.js"),a=t("biz_wap/utils/device.js"),m=t("biz_wap/utils/mmversion.js"),l=t("biz_common/tmpl.js"),r=t("appmsg/comment/comment_input/comment_input.html.js"),u=a.os.pc&&!m.is_wxwork,d=t(u?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js").Emotion,c="comment_primary_counter_warn",p="comment_primary_input_editing",h=o.getInnerHeight(),g=function(t,e){
for(var n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","??","&amp;","&"],i=["&","&amp;","??","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"],o=e?i:n,s=0;s<o.length;s+=2)t=t.replace(new RegExp(o[s],"g"),o[s+1]);
return t;
},v=function(){
function t(e){
var i=this;
_classCallCheck(this,t),this.type=e.type||"comment",this.placeholder=e.placeholder,
this.length=e.length,this.onChange=e.onChange,this.onSubmit=e.onSubmit,this.onShow=e.onShow,
this.onHide=e.onHide,this.onBlur=e.onBlur,this.onClick=e.onClick,this.dom={},this.renderEl=null,
this.target=null,this.value="",this.lastRange=null,this.isShow=!1,this.params=null;
var o=document.createElement("div");
o.innerHTML=l.tmpl(r,{
deviceIsPc:u,
placeholder:this.placeholder,
submitText:e.submitText,
length:this.length,
iconEmotionSwitch:window.icon_emotion_switch,
iconEmotionSwitchActive:window.icon_emotion_switch_active,
iconEmotionSwitchPrimary:window.icon_emotion_switch_primary,
iconEmotionSwitchActivePrimary:window.icon_emotion_switch_active_primary
},!1);
var a=n.qs(".js_wrp",o);
this.dom={
wrp:a,
input:n.qs(".js_input",a),
placeholder:n.qs(".js_placeholder",a),
emotionWrp:n.qs(".js_emotion_wrp",a),
submit:n.qs(".js_submit",a),
counter:n.qs(".js_counter",a),
counterLen:n.qs(".js_counter_len",a)
},document.body.appendChild(a),this.emotion=new d(u?{
emotionSwitch:this.dom.emotionWrp,
input:this.dom.input,
submit:this.dom.submit,
tool:n.qs(".js_tool",a),
onSelect:function(t){
i.insertHTML('<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single '+t.name+'" alt="mo-'+t.title+'">'),
i.emotion.emotionPanelMove();
}
}:{
emotionPanel:s(n.qs(".js_emotion_panel")),
inputArea:s(this.dom.input),
emotionPanelArrowWrp:s(n.qs(".js_emotion_panel_arrow_wrp")),
emotionSwitcher:s(this.dom.emotionWrp),
emotionSlideWrapper:s(n.qs(".js_slide_wrapper")),
emotionNavBar:s(n.qs(".js_navbar")),
submitBtn:s(this.dom.submit),
inputEmotion:function(){
i.dom.submit.disabled=0===n.trim(i.dom.input.value).length;
}
}),this.bindEvent();
}
return _createClass(t,[{
key:"bindEvent",
value:function(){
var o=this;
e.tap(this.dom.submit,function(t){
t.preventDefault(),"function"==typeof o.onSubmit&&o.onSubmit(o.params);
}),u?!function(){
a.os.Mac&&e.on(window,"blur",function(){
o.dom.input&&"none"!==o.dom.input.display&&""!==o.dom.input.innerHTML&&o.blur();
}),e.on(o.dom.input,"focus",function(){
o.dom.wrp.classList.add(p);
}),e.on(o.dom.input,"blur",function(){
o.dom.wrp.classList.remove(p);
}),e.on(o.dom.input,"input",function(){
o.inputHandler();
}),e.tap(o.dom.input,function(){
o.emotion.hide(),"function"==typeof o.onClick&&o.onClick();
}),e.on(o.dom.input,"keyup",function(){
o.saveRange(),o.save();
}),e.on(o.dom.input,"keydown",function(t){
return 13===t.keyCode?(o.saveRange(),o.insertHTML("<br/>"),o.saveRange(),!1):!0;
}),e.on(o.dom.input,"mouseup",function(){
o.saveRange(),o.save();
});
var s=null;
e.on(o.dom.input,"paste",function(){
s&&clearTimeout(s),s=setTimeout(function(){
return i.setCursorToEnd(t.FilterNode(o.dom.input,!0)),o.saveRange(),o.save(),!1;
},10);
}),e.on(document,"click",function(t){
if(o.isShow){
var e=t.target;
n.isParent(e,o.target)||n.isParent(e,o.dom.wrp)||""!==n.trim(o.dom.input.innerHTML)?!o.emotion.isShow||n.isParent(e,o.emotion.dom.emotionPanel)||n.isParent(e,o.dom.emotionWrp)||o.emotion.hide():o.hide();
}
},!1);
}():!function(){
var t=["??????","??????","??????","??????","??????","??????","??????","??????","??????","??????","[]","??????","{}","()","<>"],i=!1;
e.on(o.dom.input,"input",function(e){
o.dom.submit.disabled=0===n.trim(o.dom.input.value).length,a.os.ios&&e.data&&t.indexOf(e.data)>-1&&(i=!0);
}),a.os.ios&&(e.on(o.dom.input,"click",function(){
i&&(o.blur(),o.focus(),i=!1),"function"==typeof o.onClick&&o.onClick();
}),window.__second_open__&&e.on(o.dom.input,"blur",function(){
"function"==typeof o.onBlur&&o.onBlur();
}));
}();
}
},{
key:"inputHandler",
value:function(){
var t=this.dom.input.innerHTML;
""===t||"<br>"===t?(this.dom.placeholder.style.display="",this.dom.input.innerHTML=""):this.dom.placeholder.style.display="none";
}
},{
key:"show",
value:function(t){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
t!==this.renderEl&&("append"===e.renderType?t.appendChild(this.dom.wrp):t.insertAdjacentElement("afterend",this.dom.wrp),
this.renderEl=t),this.target=e.target||t,void 0!==e.placeholder&&e.placeholder!==this.placeholder&&(this.dom.placeholder.innerHTML=e.placeholder,
this.placeholder=e.placeholder),this.params=e.params||null,this.dom.wrp.style.display="";
var n=this.dom.wrp.getBoundingClientRect();
n.top+n.height>=h&&window.scrollTo(0,window.scrollY+n.height),this.dom.input.innerHTML=e.text||"",
this.isShow=!0,u&&(this.inputHandler(),this.lastRange=null,this.save()),this.focus(),
"function"==typeof this.onShow&&this.onShow(t,this.dom.input);
}
},{
key:"hide",
value:function(){
this.isShow=!1,this.dom.wrp.style.display="none",this.emotion.hide(),"function"==typeof this.onHide&&this.onHide(this.target,this.params),
this.params=null;
}
},{
key:"focus",
value:function(){
this.dom.input.focus();
}
},{
key:"blur",
value:function(){
this.dom.input.blur();
}
},{
key:"hideEmotionPannel",
value:function(){
this.emotion.hidePannel();
}
},{
key:"getInput",
value:function(){
return this.dom.input;
}
},{
key:"getSubmit",
value:function(){
return this.dom.submit;
}
},{
key:"saveRange",
value:function(){
this.lastRange=i.getRange();
}
},{
key:"restoreRange",
value:function(){
if(this.lastRange){
var t=i.getSelection();
if(t.addRange)t.removeAllRanges(),t.addRange(this.lastRange);else{
var e=i.getRange();
e.setEndPoint&&(e.setEndPoint("EndToEnd",this.lastRange),e.setEndPoint("StartToStart",this.lastRange)),
e.select();
}
}
}
},{
key:"save",
value:function(){
if(document.execCommand("AutoUrlDetect",!1,!1),this.value=this.emotion.textFilter(g(this.getAfterFilterNodeHtml())),
u){
var t=n.trim(this.value).replace(/(<br\/>)|\n/g,"").length;
this.dom.counterLen.innerText=t,t>this.length?(this.dom.counter.style.display="",
this.dom.counter.classList.add(c),this.dom.submit.disabled=!0):1>t?(this.dom.counter.style.display="none",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!0):t>=this.length-10?(this.dom.counter.style.display="",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!1):(this.dom.counter.style.display="none",
this.dom.counter.classList.remove(c),this.dom.submit.disabled=!1);
}
"function"==typeof this.onChange&&this.onChange(this.renderEl,this.dom.input);
}
},{
key:"insertHTML",
value:function(t){
this.focus(),this.dom.input.scrollTop=this.dom.input.scrollHeight,this.restoreRange();
var e=i.getRange();
if(e){
if(e.createContextualFragment){
t+='<img style="width:1px;height:1px;"></img>';
var n=e.createContextualFragment(t),o=n.lastChild,s=i.getSelection();
e.deleteContents(),e.insertNode(n),e.setStartBefore(o),e.setEndAfter(o),s.removeAllRanges(),
s.addRange(e),document.execCommand("Delete",!1,null);
}else e.pasteHTML&&t&&(e.pasteHTML(t),e.select(),e.collapse&&e.collapse(!1));
this.saveRange(),this.save();
}
}
},{
key:"getAfterFilterNodeHtml",
value:function(){
var e=document.createElement("div");
return e.innerHTML=this.dom.input.innerHTML,t.FilterNode(e),e.innerHTML;
}
}],[{
key:"FilterNode",
value:function(t,e){
for(var n=null,i=t.childNodes.length-1;i>=0;i--){
var o=t.childNodes[i];
switch(o.nodeType){
case 1:
var s=o.nodeName.toUpperCase();
if("BR"!==s){
var a=void 0,m=!1;
if("IMG"===s&&o.classList.contains("icon_emotion_single")?a=o:(a=o.textContent||o.innerText||"",
m=!0),a){
var l=m?document.createTextNode(a):a;
e&&!n&&(n=l),t.replaceChild(l,o);
}else t.removeChild(o);
}
break;

case 3:
break;

default:
t.removeChild(o);
}
}
return e?n:void 0;
}
}]),t;
}();
return v;
});function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var o=arguments[e];
for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i]);
}
return t;
},_createClass=function(){
function t(t,e){
for(var o=0;o<e.length;o++){
var i=e[o];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);
}
}
return function(e,o,i){
return o&&t(e.prototype,o),i&&t(e,i),e;
};
}();
define("appmsg/comment/comment_dialog/comment_dialog.js",["biz_common/dom/event.js","pages/utils.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/jsmonitor_report.js","pages/mod/bottom_modal.js","appmsg/comment/comment_list/comment_list.js","biz_common/tmpl.js","appmsg/comment/comment_dialog/c2c_not_support_dialog.html.js","appmsg/comment/comment_dialog/comment_dialog.html.js","biz_wap/utils/device.js","pages/scrollY.js","appmsg/set_font_size.js","appmsg/comment/comment_report.js"],function(t){
"use strict";
var e=t("biz_common/dom/event.js"),o=t("pages/utils.js"),i=t("biz_wap/utils/ajax.js"),n=t("biz_common/utils/url/parse.js"),a=t("biz_wap/utils/mmversion.js"),s=t("biz_wap/utils/jsmonitor_report.js"),l=t("pages/mod/bottom_modal.js"),p=t("appmsg/comment/comment_list/comment_list.js"),c=t("biz_common/tmpl.js"),r=t("appmsg/comment/comment_dialog/c2c_not_support_dialog.html.js"),d=t("appmsg/comment/comment_dialog/comment_dialog.html.js"),m=t("biz_wap/utils/device.js"),u=t("pages/scrollY.js"),y=t("appmsg/set_font_size.js"),g=t("appmsg/comment/comment_report.js"),_=g.report22214,h=m.os.pc,f=10,L="https://itunes.apple.com/cn/app/id414478124?mt=8&ls=1",v="https://support.weixin.qq.com/update/",D="page_no_scroll",b="weui-half-screen-dialog_headline",j=function(t){
return window.weui.alert(t,{
className:"weui-pop-zindex-primary"
});
},k=function(){
function t(e){
_classCallCheck(this,t),this.initDialog(e),this.initNotSupportDialog();
}
return _createClass(t,[{
key:"initDialog",
value:function(t){
var i=this;
this.globalData=t.globalData,this.replyData={},this.myId2ContentIdMap={},this.replyListData=null,
this.cmtData=null,this.onGetReplyList=t.onGetReplyList;
var n=document.createElement("div");
n.innerHTML=c.tmpl(d,{
deviceIsPc:h
});
var s=o.qs(".js_bd",n),r=function(){
i.replyListData&&i.replyListData.continue_flag&&i.getReplyList({
success:function(t){
i.replyList.add({
data:t,
type:"reply",
cmtData:i.cmtData
}),i.ending&&(i.ending.style.display=i.replyListData.continue_flag?"none":""),i.dialog.finishPullUpLoad();
},
getNextPage:!0
});
},m=function(){
i.replyListData.scrollTop=i.getScrollTop(),i.replyListData.exposedStatus={
comment:[],
reply:[]
},[i.commentList.getItemList(),i.replyList.getItemList()].forEach(function(t,e){
var o=i.replyListData.exposedStatus[e?"reply":"comment"];
t.forEach(function(t){
t.isExposed&&o.push(t.dataset[e?"replyId":"contentId"]);
});
}),i.replyListData=null,i.cmtData=null,i.dialog.finishPullUpLoad(),o.enableSelect();
};
this.dialogTop=-1,this.dialogBottom=-1,this.canCheckExposedStatus=!1;
var u=null,g=null;
if(h)!function(){
n=o.qs(".js_comment_dialog_pc",n),document.body.appendChild(n);
var t=o.qs(".js_bd_main",s),a=!1;
i.dialog={
pullingUpLock:!1,
show:function(){
n.style.display="",document.body.classList.add(D),i.canCheckExposedStatus=!0,i.checkExposedStatus();
},
hide:function(){
m(),n.style.display="none",document.body.classList.remove(D);
},
scrollTo:function(){
s.scrollTo.apply(s,arguments);
},
getScrollEle:function(){
return s;
},
finishPullUpLoad:function(){
this.pullingUpLock=!1;
},
checkReachBoundary:function(){
a&&0!==s.scrollTop||(a=!0,setTimeout(function(){
a=!1;
},50),setTimeout(function(){
!i.dialog.pullingUpLock&&s.scrollTop+s.offsetHeight+100>t.offsetHeight&&(r(),i.dialog.pullingUpLock=!0);
},100));
}
},e.on(o.qs(".js_close",n),"click",function(){
i.hideDialog();
}),e.on(s,"scroll",function(){
i.dialog.checkReachBoundary(),i.checkExposedStatus();
});
}();else{
this.dialog=new l(s,{
top:"16px",
title:"Comment",
extClass:"discuss_more_dialog_wrp weui-half-screen-dialog_wrp",
scroll2Hide:!0,
sideslip2Hide:!0,
onPullUpLoad:r,
onHide:m,
onShowAfterAnimation:function(){
i.canCheckExposedStatus=!0,i.checkExposedStatus();
},
onScroll:function(){
i.dialog.contentArea.classList[i.dialog.contentAreaWrp.scrollTop>0?"add":"remove"](b),
i.checkExposedStatus();
}
});
var _=o.qs(".js_reply_btn",s);
this.replyWrp=_.parentNode,u=function(){
i.replyWrp.style.display="none";
},g=function(){
i.replyWrp.style.display="";
},e.on(_,"click",function(t){
u(),i.commentList.commentReply("comment",i.commentList.getItemList()[0],i.commentList.data[0],null,t.target.classList.contains("js_emotion_btn"));
}),y.onFontScaleChange(function(){
return i.setBdPaddingBottom();
}),a.isIOS&&e.on(document,"visibilitychange",function(){
"hidden"===document.visibilityState&&i.dialog.hide(!0);
});
}
this.bd=s,this.loading=o.qs(".js_loading",s),this.ending=o.qs(".js_end",s),this.empty=o.qs(".js_empty",s),
this.placeholder=o.qs(".js_placeholder",s),this.commentList=new p({
globalData:t.globalData,
container:o.qs(".js_comment_list",s),
type:"comment",
canAddComment:t.canAddComment,
onPraise:function(t,e,o,n,a){
i.globalData.cmtList.setLikeInfo({
type:t,
contentId:e,
likeStatus:n,
likeNum:a,
force:!0
});
},
onRender:function(){
i.replyListData&&i.replyListData.exposedStatus&&!function(){
var t=i.replyListData.exposedStatus.comment;
i.commentList.getItemList().forEach(function(e){
t.indexOf(e.dataset.contentId)>-1&&(e.isExposed=!0);
});
}(),i.checkExposedStatus();
},
onRemove:function(t,e){
i.globalData.cmtList.remove({
type:t,
contentId:e
});
},
onEmpty:function(){
i.hideDialog();
},
onKeyboardShow:u,
onKeyboardHide:g,
onCanNotReply:g
}),this.replyList=new p({
globalData:t.globalData,
container:o.qs(".js_reply_list",s),
type:"reply",
canAddComment:t.canAddComment,
onPraise:function(t,e,o,n,a){
i.globalData.cmtList.setLikeInfo({
type:t,
contentId:e,
replyId:o,
likeStatus:n,
likeNum:a
});
},
onRender:function(){
i.replyListData&&i.replyListData.exposedStatus&&!function(){
var t=i.replyListData.exposedStatus.reply;
i.replyList.getItemList().forEach(function(e){
t.indexOf(e.dataset.replyId)>-1&&(e.isExposed=!0);
});
}(),i.checkExposedStatus();
},
onAdd:function(t,e,o,n){
i.globalData.cmtList.updateReplyLen({
newCnt:i.cmtData.reply_new.reply_total_cnt,
contentId:n
}),i.checkExposedStatus();
},
onRemove:function(t,e,o){
var n=i.cmtData.reply_new.reply_total_cnt;
i.globalData.cmtList.remove({
type:t,
contentId:e,
replyId:o.reply_id
}),i.cmtData.reply_new.reply_total_cnt=n,i.globalData.cmtList.updateReplyLen({
newCnt:n,
contentId:e
}),i.checkExposedStatus(),i.dialog.checkReachBoundary(!1,!0);
},
onEmpty:function(t){
"reply"===t&&(i.empty.style.display="");
},
onKeyboardShow:u,
onKeyboardHide:g,
onCanNotReply:g
});
}
},{
key:"showDialog",
value:function(t,e){
var i=this;
o.disableSelect(),this.cmtData=t;
var n=t.content_id;
this.replyListData=this.replyData[n]||null,this.getReplyList({
success:function(){
var t=i.replyListData.reply_list;
t.length?(i.empty.style.display="none",i.replyList.render(t,i.cmtData),i.ending&&(i.ending.style.display=i.replyListData.continue_flag?"none":"")):i.empty.style.display="",
i.dialog.scrollTo(0,i.replyListData.scrollTop||0),setTimeout(function(){
i.dialog.finishPullUpLoad();
},300);
},
topReplyId:e
}),this.commentList.render([t]),this.placeholder&&(this.placeholder.innerHTML="?????? "+p.sliceNickname(t.nick_name)+"???"),
this.dialog.show(),this.setBdPaddingBottom();
}
},{
key:"hideDialog",
value:function(){
this.dialog.hide();
}
},{
key:"addReply",
value:function(t){
var e=t.data,o=t.mode,i=void 0===o?"push":o,n=t.replyId,a=this.replyListData.reply_list,s=0;
n&&!a.some(function(t){
return s++,t.reply_id===n;
})&&(s=-1),this.replyListData.reply_list="push"===i?s>0&&s<a.length?a.slice(0,s).concat(e,a.slice(s)):a.concat(e):s>0&&s<=a.length?a.slice(0,s-1).concat(e,a.slice(s-1)):e.concat(a);
}
},{
key:"addReplyAndRender",
value:function(t){
this.addReply(t),this.replyList.add({
data:t.data,
mode:t.mode,
type:"reply",
cmtData:this.cmtData,
pos:t.replyId
});
}
},{
key:"removeReply",
value:function(t){
var e=this.replyListData.reply_list,o=-1;
e.some(function(e){
return o++,e.reply_id===t;
})&&e.splice(o,1);
}
},{
key:"getReplyList",
value:function(t){
var e=this,o=t.success,a=t.getNextPage,s=void 0===a?!1:a,l=t.cmtData,p=void 0===l?this.cmtData:l,c=t.topReplyId,r=p.content_id;
new Promise(function(t,o){
var a=!0;
if(s||(null!==e.replyListData?(a=!1,t()):e.replyData[r]&&(e.replyListData=e.replyData[r],
a=!1,t())),a){
e.loading.style.display="",!s&&e.replyList.empty();
var l={
action:"getcommentreply",
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:e.globalData.commentId,
content_id:r,
id:p.id,
limit:f,
offset:s?e.replyListData.offset:0,
max_reply_id:s?e.replyListData.max_reply_id:p.reply_new.max_reply_id
};
void 0!==c&&(l.top_reply_id=c),i({
url:n.join("/mp/appmsg_comment",l,!0),
dataType:"json",
success:function(i){
if(i&&i.base_resp&&0===i.base_resp.ret){
var n=i.reply_list||{
reply_list:[]
};
s&&void 0!==e.replyListData.topReplyId&&(c=e.replyListData.topReplyId),void 0!==c&&(n.reply_list=n.reply_list.filter(function(t,e){
return!s&&0===e||t.reply_id!==c;
})),s?_extends(e.replyListData,{
max_reply_id:n.max_reply_id,
reply_list:e.replyListData.reply_list.concat(n.reply_list),
continue_flag:i.continue_flag,
offset:e.replyListData.offset+f
}):(n.continue_flag=i.continue_flag,n.offset=f,void 0!==c&&(n.topReplyId=c),e.replyData[r]=n,
e.myId2ContentIdMap[p.my_id]=r,e.replyListData=n),t(n.reply_list),"function"==typeof e.onGetReplyList&&e.onGetReplyList(r,n.reply_list);
}else o();
},
error:function(t){
console.error(t),o();
},
complete:function(){
e.loading.style.display="none";
}
});
}
}).then(o,function(){
j("System error. Try again later.");
});
}
},{
key:"setReplyLikeInfo",
value:function(t){
var e=t.contentId,o=t.replyId,i=t.myId,n=t.likeStatus,a=t.likeNum;
void 0===e&&(e=this.myId2ContentIdMap[i]);
var s=this.replyData[e];
if(s){
var l=p.getDataByKey(s.reply_list,"reply_id",o);
l&&(l.reply_like_status=n,"number"!=typeof a&&(a=l.reply_like_num+(n?1:-1)),l.reply_like_num=a);
}
}
},{
key:"scrollY",
value:function(t,e){
var o={
el:this.dialog.contentAreaWrp,
y:t
};
e?o.speed=300:o.duration=.3,u.start(o);
}
},{
key:"setMarginBottom",
value:function(t){
this.bd.style.marginBottom=t+"px";
}
},{
key:"checkExposedStatus",
value:function(){
var t=this;
if(this.canCheckExposedStatus){
if(-1===this.dialogTop||-1===this.dialogBottom){
var e=this.dialog.getScrollEle().getBoundingClientRect();
this.dialogTop=e.top,this.dialogBottom=e.bottom;
}
[this.commentList.getItemList(),this.replyList.getItemList()].forEach(function(e,o){
var i=t[o?"replyList":"commentList"];
e.some(function(e){
if(!e.isExposed){
var o=e.getBoundingClientRect(),n=.5*o.height;
if(o.bottom>t.dialogTop+n&&o.top<t.dialogBottom-n){
e.isExposed=!0;
var a=e.dataset,s={
PersonalCommentId:1*a.myId,
ReplyId:0,
IsPopup:1,
IsReplyOther:0,
CommentReplyType:1
};
if(a.replyId){
var l=i.getData({
type:"reply",
contentId:a.contentId,
replyId:1*a.replyId
});
s.ReplyId=l.reply_id,s.IsReplyOther=l.to_nick_name&&l.to_content?1:0;
}
_(s);
}else if(o.top>=t.dialogBottom-n)return!0;
}
return!1;
});
});
}
}
},{
key:"getScrollTop",
value:function(){
return this.dialog.getScrollEle().scrollTop;
}
},{
key:"setBdPaddingBottom",
value:function(){
this.replyWrp&&(this.bd.style.paddingBottom=this.replyWrp.offsetHeight+"px");
}
},{
key:"initNotSupportDialog",
value:function(){
var t=this,i=document.createElement("div");
i.innerHTML=c.tmpl(r,{
comment_c2c_not_support_img:window.comment_c2c_not_support_img
});
var n=o.qs(".js_bd",i),p=o.qs(".js_ft",i);
this.notSupportDialog=new l(n,{
top:"16px",
hasHeader:!1,
footerEl:p,
extClass:"weui-half-screen-dialog_wrp"
}),i=null,e.tap(o.qs(".js_close",p),function(){
t.notSupportDialog.hide();
}),e.tap(o.qs(".js_update",p),function(){
s.setSum(110809,52,1),o.jumpUrl(a.isIOS?L:v,!0),t.notSupportDialog.hide();
});
}
},{
key:"showNotSupportDialog",
value:function(){
this.notSupportDialog.show();
}
}]),t;
}();
return k;
});function _defineProperty(e,t,n){
return t in e?Object.defineProperty(e,t,{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=n,e;
}
function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
},_createClass=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var i=t[n];
i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);
}
}
return function(t,n,i){
return n&&e(t.prototype,n),i&&e(t,i),t;
};
}();
define("appmsg/comment/comment_list/comment_list.js",["biz_wap/ui/weui.js","biz_common/utils/string/html.js","biz_wap/jsapi/core.js","appmsg/i18n.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","appmsg/retry_ajax.js","biz_common/dom/event.js","pages/utils.js","common/utils.js","biz_wap/utils/openUrl.js","common/keyboard.js","common/actionSheet.js","common/navShadow.js","biz_wap/utils/jsmonitor_report.js","biz_common/tmpl.js","appmsg/comment/comment_list/comment_item.html.js","appmsg/comment/comment_list/item.html.js","biz_wap/utils/mmversion.js","biz_wap/utils/device.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js","appmsg/comment/comment_input/comment_input.js","appmsg/comment/comment_write_dialog/comment_write_dialog.js","pages/scrollY.js","appmsg/comment/comment_report.js","appmsg/comment/comment_length.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js"),e("biz_common/utils/string/html.js");
var t=e("biz_wap/jsapi/core.js"),n=e("appmsg/i18n.js"),i=e("biz_common/utils/url/parse.js"),o=e("biz_wap/utils/ajax.js"),a=e("appmsg/retry_ajax.js"),l=e("biz_common/dom/event.js"),r=e("pages/utils.js"),s=e("common/utils.js"),c=e("biz_wap/utils/openUrl.js"),m=e("common/keyboard.js"),p=e("common/actionSheet.js"),d=e("common/navShadow.js"),u=e("biz_wap/utils/jsmonitor_report.js"),y=e("biz_common/tmpl.js"),_=e("appmsg/comment/comment_list/comment_item.html.js"),f=e("appmsg/comment/comment_list/item.html.js"),g=e("biz_wap/utils/mmversion.js"),h=g.is_wxwork,v=g.isWechat,D=v&&!h,b=e("biz_wap/utils/device.js"),k=b.os.pc&&!h,w=e(k?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js"),L=e("appmsg/comment/comment_input/comment_input.js"),C=e("appmsg/comment/comment_write_dialog/comment_write_dialog.js"),j=e("pages/scrollY.js"),I=e("appmsg/comment/comment_report.js"),R=I.report22215,T=e("appmsg/comment/comment_length.js"),P="praised",S="js_item",x="js_comment_item",N="js_reply_item",E="js_comment_praise",H="js_reply_praise",M="praise_num",A="js_comment_del",z="js_reply_del",W="js_comment_main",K="js_extend_comment",O="discuss_media_active",B="js_can_reply",q="js_reply_btn",V="js_folder",F="wx_scroll_tansition",Y="wx_margin_top_tansition",U="js_comment_reply_pc",Q="js_reply_reply_pc",G="js_input_pc",X="js_dropdown",Z="js_comment_complain",$="js_reply_complain",J="commenting",et="openning",tt="comment_primary_input_multiline",nt=2,it=T.getLimit("reply"),ot=s.getInnerHeight(),at=60,lt=g.isAndroid&&m.canUseCancel,rt=m.onlyUseH5Keyboard,st=g.isAndroid?33:0,ct=r.getId("js_article"),mt=r.getId("activity-name")||"";
mt&&(mt=r.trim(mt.innerText)||"");
var pt=function(e){
return window.weui.alert(e,{
className:"weui-pop-zindex-primary"
});
},dt=function(){
var e=null,t=null;
return function(n){
null===e&&null===t&&(e=document.createElement("input"),e.setAttribute("aria-hidden","true"),
e.style.cssText="position: absolute; left: -999999px;",e.readOnly=!0,document.body.appendChild(e),
t=document.createElement("button"),t.setAttribute("aria-hidden","true"),t.style.cssText="position: absolute; left: -999999px;",
document.body.appendChild(t),l.on(t,"click",function(){
document.queryCommandEnabled("copy")?(document.execCommand("copy"),window.weui.toast("????????????",750)):pt("????????????");
})),e.value=n,e.select(),e.setSelectionRange(0,n.length),t.click();
};
}(),ut=function(){
return g.isWechat?g.isInMiniProgram?0:m.canUseKeyboard?2:g.isIOS&&(g.gtVersion("7.0.12")||s.isNativePage())?2:g.isAndroid&&(g.gtVersion("7.0.13")||s.isNativePage())?2:0:0;
}(),yt=function(e){
return e.replace("???","");
},_t=function(e){
var t=document.createElement("div");
return t.innerHTML=e,Array.prototype.forEach.call(r.qsAll("div.discuss_message_content",t),function(e){
e.innerHTML=w.encode(e.innerHTML);
}),Array.prototype.forEach.call(r.qsAll("p.js_to_content",t),function(e){
e.innerHTML=w.encode(e.innerHTML);
}),t;
},ft=function(){
var e=null,t=null,n=null;
return function(i){
e||(e=r.getId("js_warning_toast"),t=r.qs(".js_content",e)),t.innerHTML=i,n?clearTimeout(n):e.style.display="",
n=setTimeout(function(){
e.style.display="none",n=null;
},750);
};
}(),gt=function(e){
return function(t){
var n=t.logo_url||e;
t.logo_url=n.indexOf("wx.qlogo.cn")>-1?n.replace(/\/132$/,"/96"):n;
};
}("http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0"),ht=function(){
function e(t){
var n=this;
switch(_classCallCheck(this,e),this.data=[],this.count=0,this.globalData=t.globalData,
this.renderContainer=t.container,this.container=document.createElement("div"),this.renderContainer.appendChild(this.container),
this.type=t.type,this.cmtData=null,this.canAddComment=t.canAddComment,this.onPraise=t.onPraise,
this.onRender=t.onRender,this.onAdd=t.onAdd,this.onRemove=t.onRemove,this.onEmpty=t.onEmpty,
this.onKeyboardShow=t.onKeyboardShow,this.onKeyboardHide=t.onKeyboardHide,this.beforeShowKeyboard=t.beforeShowKeyboard,
this.onCanNotReply=t.onCanNotReply,this.replyLock=!1,this.isShowAll="mine"!==t.type,
this.openningDropdown=null,this.curReplyEl=null,this.itemList=[],this.type){
case"elected":
this.scene=0;
break;

default:
this.scene="";
}
this.inputInitHeight=0,this.inputInitWidth=0,this.inputValue={},this.input=k?new L({
type:"reply",
placeholder:"Comments are visible to everyone after being approved by the Official Account",
submitText:"Reply",
length:it,
onChange:function(e,t){
if(n.inputInitHeight&&t.offsetHeight>n.inputInitHeight)e.classList.add(tt);else if(t.childNodes.length){
var i=document.createRange();
i.selectNodeContents(t.childNodes[0]),i.getBoundingClientRect().width>n.inputInitWidth?e.classList.add(tt):e.classList.remove(tt);
}else e.classList.remove(tt);
},
onSubmit:function(e){
var t=e.type,i=e.cmtData,o=e.replyData,a=e.key;
n.sendReply({
cnt:n.input.value,
type:t,
cmtData:i,
replyData:o,
success:function(){
n.inputValue[a]="";
}
});
},
onShow:function(e,t){
""===n.input.value&&(n.inputInitHeight=t.offsetHeight,n.inputInitWidth=t.offsetWidth-20);
},
onHide:function(e,t){
var i=t.key;
e.parentNode.classList.remove(J),n.inputValue[i]=n.input.value;
}
}):null,this.commentWriteDialog=new C({
globalData:this.globalData,
type:"elected"===this.type||"mine"===this.type?"reply":"dialog",
canC2CReply:this.globalData.canC2CReply,
onSubmit:function(e,t){
n.commentWriteDialog.disableSubmit(),n.sendReply({
cnt:e,
type:t.type,
cmtData:t.cmtData,
replyData:t.replyData,
success:function(){
n.commentWriteDialog.hide(),n.commentWriteDialog.setInputValue(""),n.inputValue[t.key]="";
},
fail:function(){
n.commentWriteDialog.enableSubmit();
}
});
},
onHide:function(e,t){
"comment"!==n.type&&(n.inputValue[t.key]=e,n.commentWriteDialog.setInputValue("")),
"elected"!==n.type&&"mine"!==n.type&&r.disableSelect();
}
}),this.bindEvent();
}
return _createClass(e,[{
key:"bindEvent",
value:function(){
var e,t=this,n=(e={},_defineProperty(e,E,function(e){
var n=e.cmtData;
t.praiseComment("comment",n);
}),_defineProperty(e,H,function(e){
var n=e.cmtData,i=e.replyData;
t.praiseComment("reply",n,i);
}),_defineProperty(e,A,function(e){
var n=e.cmtData;
t.delComment("comment",n);
}),_defineProperty(e,z,function(e){
var n=e.cmtData,i=e.replyData;
t.delComment("reply",n,i);
}),_defineProperty(e,K,function(e){
var n=e.cmtData;
t.globalData.cmtDialog.showDialog(n);
}),_defineProperty(e,V,function(e){
var t=e.el;
t.parentNode.classList.add("wx_folder_unfold");
}),e);
k?!function(){
var e,i;
_extends(n,(e={},_defineProperty(e,U,function(e){
var n=e.el,i=e.cmtData,o=e.cmtEl;
t.commentReplyPC("comment",n,o,i);
}),_defineProperty(e,Q,function(e){
var n=e.el,i=e.cmtData,o=e.replyData,a=e.replyEl;
t.commentReplyPC("reply",n,a,i,o);
}),_defineProperty(e,X,function(e){
var n=e.el,i=n.parentNode;
t.openningDropdown!==i?(i.classList.add(et),t.openningDropdown=i):(i.classList.remove(et),
t.openningDropdown=null);
}),_defineProperty(e,Z,function(e){
var n=e.cmtData;
t.complain("comment",n);
}),_defineProperty(e,$,function(e){
var n=e.cmtData,i=e.replyData;
t.complain("reply",n,i);
}),e));
var o=function(){
t.openningDropdown.classList.remove(et),t.openningDropdown=null;
};
l.on(document,"click",function(e){
t.openningDropdown&&!r.isParent(e.target,t.openningDropdown)&&o();
},!1);
var a=function(e){
var n=e.e,i=e.el;
t.openningDropdown&&n.target===i&&o();
};
t.delegatedContainer("mouseout",(i={},_defineProperty(i,W,function(e){
return a(e);
}),_defineProperty(i,N,function(e){
return a(e);
}),i));
}():D&&!function(){
var e,i,o,a,s,c,p=function(e,n){
var i=n.e,o=n.el,a=n.cmtData,l=n.replyData;
o.classList.contains(B)&&(i.preventDefault(),t.commentReply(e,o,a,l));
};
_extends(n,(e={},_defineProperty(e,W,function(e){
return p("comment",e);
}),_defineProperty(e,N,function(e){
return p("reply",e);
}),_defineProperty(e,q,function(e){
var t=e.el,n=t.dataset.type,i=e.e.currentTarget;
for(t=t.parentNode;t&&t!==i&&!t.classList.contains(B);)t=t.parentNode;
e.el=t,p(n,e);
}),e));
var d=null,u=null,y=null,_=!1,f=function(){
var e=function(e,t){
d=setTimeout(function(){
e.classList.add(O),d=null;
},t);
};
return function(n){
var i=n.e,o=n.el;
("elected"===t.type||"mine"===t.type)&&(u=setTimeout(function(){
r.disableSelect(),u=null;
},100)),y=o,1===i.touches.length&&e(o,o.classList.contains(B)?100:200);
};
}();
t.delegatedContainer("touchstart",(i={},_defineProperty(i,W,function(e){
return f(e);
}),_defineProperty(i,N,function(e){
return f(e);
}),i));
var g=function(){
var e=function(e){
e.classList.remove(O),d&&(clearTimeout(d),d=null),_&&(_=!1);
};
return function(n){
var i=n.el;
("elected"===t.type||"mine"===t.type)&&setTimeout(function(){
r.enableSelect();
},300),y=null,i.classList.contains(B)?setTimeout(function(){
return e(i);
},500):e(i);
};
}();
t.delegatedContainer("touchend",(o={},_defineProperty(o,W,function(e){
return g(e);
}),_defineProperty(o,N,function(e){
return g(e);
}),o));
var h=function(e,n){
var i=n.e,o=n.el,a=n.cmtData,l=n.replyData;
R({
opType:1,
PersonalCommentId:a.my_id,
ReplyId:"reply"===e?l.reply_id:0
}),t.showActionSheet(e,a,l),o.classList.remove(O),i.preventDefault(),_=!0;
},v=function(e){
var t=e.el;
d?(clearTimeout(d),d=null):t.classList.remove(O),u&&clearTimeout(u);
};
t.delegatedContainer("longtap",(a={},_defineProperty(a,W,function(e){
return h("comment",e);
}),_defineProperty(a,N,function(e){
return h("reply",e);
}),a),(s={},_defineProperty(s,W,function(e){
return v(e);
}),_defineProperty(s,N,function(e){
return v(e);
}),s));
var D=function(e){
var t=e.e,n=e.el;
"newDiscuss"===t.animationName&&n.classList.remove("discuss_new_show");
};
t.delegatedContainer("animationend",(c={},_defineProperty(c,W,function(e){
return D(e);
}),_defineProperty(c,N,function(e){
return D(e);
}),c)),l.on(document,"contextmenu",function(e){
y&&r.isParent(e.target,y)&&(e.preventDefault(),("elected"===t.type||"mine"===t.type)&&r.enableSelect());
}),2===ut&&m.onGetKeyboardHeight(function(e){
var n=e.keyboard;
t.curReplyEl&&t.scroll2Reply(n);
});
}(),this.delegatedContainer("click",n);
}
},{
key:"render",
value:function(e,t){
var n=this;
this.data=e,"reply"!==this.type?this.container.innerHTML=_t(this.getCommentListHTML(e)).innerHTML:(this.cmtData=t,
this.container.innerHTML=_t(this.getReplyListHTML(e,t)).innerHTML),this.itemList=Array.prototype.slice.call(r.qsAll("."+S,this.container)),
"comment"===this.type&&!function(){
var e=r.qs(".js_folder_area",n.container),t=r.qs(".js_content",e);
setTimeout(function(){
t.style.cssText="-webkit-line-clamp: 5;",setTimeout(function(){
t.style.cssText="-webkit-line-clamp: 10;",r.qs(".js_fake_content",e).offsetHeight>t.offsetHeight&&(r.qs("."+V,e).style.display="");
},0);
},0);
}(),"function"==typeof this.onRender&&this.onRender();
}
},{
key:"empty",
value:function(){
this.container.innerHTML="";
}
},{
key:"changeContainer",
value:function(){
var e=arguments.length<=0||void 0===arguments[0]?this.renderContainer:arguments[0];
e&&e!==this.renderContainer&&(this.renderContainer=e,this.renderContainer.appendChild(this.container));
}
},{
key:"add",
value:function(e){
var t=this,n=e.data,i=e.mode,o=void 0===i?"push":i,a=e.type,l=void 0===a?"comment":a,s=e.cmtData,c=e.contentId,m=e.myId,p=e.pos;
if(n.length){
var d=void 0,u=void 0,y=void 0,_=void 0,f=void 0;
"comment"===l?(d="getCommentListHTML",u="content_id",y=this,_="data",f=this.container):(d="getReplyListHTML",
u="reply_id","reply"!==this.type?(s||(s=this.getData(void 0!==c?{
contentId:c
}:{
myId:m
})),s&&(y=s.reply_new,_="reply_list",f=r.qs(".js_reply_list",this.getComment(s.content_id).parentNode))):(s||(s=this.cmtData),
s&&(y=this,_="data",f=this.container))),f&&!function(){
var e=y[_],i=0;
p&&!e.some(function(e){
return i++,e[u]===p;
})&&(i=-1);
var a=!1;
if("push"===o){
if(i>0&&i<e.length){
if(e[i][u]!==n[0][u]){
var r=t.getItemFrag(d,n,s),c=r.frag,m=r.itemList,g="comment"===l?t.getCommentIdx(p):t.getReplyIdx(s.content_id,p);
t.itemList=t.itemList.slice(0,g+1).concat(m,t.itemList.slice(g+1)),f.insertBefore(c,t.itemList[g].nextElementSibling),
y[_]=e.slice(0,i).concat(n,e.slice(i)),a=!0;
}
}else if(!e.length||e[e.length-1][u]!==n[n.length-1][u]){
var h=t.getItemFrag(d,n,s),c=h.frag,m=h.itemList;
if("reply"===l&&"reply"!==t.type){
var g=t.getCommentIdx(s.content_id)+y[_].length;
t.itemList=t.itemList.slice(0,g+1).concat(m,t.itemList.slice(g+1));
}else t.itemList=t.itemList.concat(m);
f.appendChild(c),y[_]=e.concat(n),a=!0;
}
}else if(i>0&&i<=e.length){
if(2>i||e[i-2][u]!==n[n.length-1][u]){
var v=t.getItemFrag(d,n,s),c=v.frag,m=v.itemList,g="comment"===l?t.getCommentIdx(p):t.getReplyIdx(s.content_id,p);
t.itemList=t.itemList.slice(0,g).concat(m,t.itemList.slice(g)),f.insertBefore(c,t.itemList[g]),
y[_]=e.slice(0,i-1).concat(n,e.slice(i-1)),a=!0;
}
}else if(e.length){
if(e[0][u]!==n[0][u]){
var D=t.getItemFrag(d,n,s),c=D.frag,m=D.itemList;
if("reply"===l&&"reply"!==t.type){
var g=t.getCommentIdx(s.content_id);
t.itemList=t.itemList.slice(0,g+1).concat(m,t.itemList.slice(g+1));
}else t.itemList=m.concat(t.itemList);
f.insertBefore(c,f.firstChild),y[_]=n.concat(e),a=!0;
}
}else{
var b=t.getItemFrag(d,n,s),c=b.frag,m=b.itemList;
if("reply"===l&&"reply"!==t.type){
var g=t.getCommentIdx(s.content_id);
t.itemList=t.itemList.slice(0,g+1).concat(m,t.itemList.slice(g+1));
}else t.itemList=m.concat(t.itemList);
f.appendChild(c),y[_]=n.concat(e),a=!0;
}
a&&"function"==typeof t.onAdd&&t.onAdd(n,o,l,s?s.content_id:"",p);
}();
}
}
},{
key:"remove",
value:function(t){
var n=this,i=t.type,o=void 0===i?"comment":i,a=t.cmtData,l=t.replyData,r=t.contentId,s=t.replyId,c=t.myId;
a||(a=this.getData(void 0!==r?{
contentId:r
}:{
myId:c
})),a&&!function(){
var t=void 0,i=void 0,r=void 0,c=void 0;
if("comment"===o?(t=n.data,i="content_id",r=a.content_id,c=n.getCommentIdx(a.content_id)):("reply"!==n.type?t=a.reply_new.reply_list:(a=n.cmtData,
t=n.data),l||(l=e.getDataByKey(t,"reply_id",s)),l&&(i="reply_id",r=l.reply_id,c=n.getReplyIdx(a.content_id,l.reply_id),
n.globalData.canC2CReply&&"mine"!==n.type&&n.updateReplyLen({
newCnt:--a.reply_new.reply_total_cnt,
cmtData:a
}),n.globalData.canC2CReply&&"elected"===n.type&&n.globalData.cmtDialog.getReplyList({
success:function(){
n.globalData.cmtDialog.removeReply(l.reply_id);
},
cmtData:a
}))),r){
var m=-1;
if(t.some(function(e,t){
return e[i]===r?(m=t,!0):!1;
}),m>-1){
n.count--;
var p=t.splice(m,1)[0],d=void 0;
d="comment"===o?n.itemList.splice(c,p.reply_new.reply_list.length+1)[0].parentNode:n.itemList.splice(c,1)[0],
d.parentNode.removeChild(d),"function"==typeof n.onRemove&&n.onRemove(o,a.content_id,p),
"function"==typeof n.onEmpty&&("comment"===o&&0===n.itemList.length||"reply"===o&&0===a.reply_new.reply_total_cnt)&&n.onEmpty(o);
}
}
}();
}
},{
key:"getData",
value:function(t){
var n=t.type,i=void 0===n?"comment":n,o=t.contentId,a=t.replyId,l=t.myId;
if("reply"===this.type)return"comment"===i?this.cmtData:e.getDataByKey(this.data,"reply_id",a);
var r=void 0;
return r=void 0===o?e.getDataByKey(this.data,"my_id",l):e.getDataByKey(this.data,"content_id",o),
"comment"===i?r:e.getDataByKey(r.reply_new.reply_list,"reply_id",a);
}
},{
key:"getItemList",
value:function(){
return this.itemList;
}
},{
key:"getCommentIdx",
value:function(e){
var t=0;
return this.data.some(function(n){
return n.content_id===e?!0:(t+=n.reply_new.reply_list.length+1,!1);
})?t:-1;
}
},{
key:"getComment",
value:function(e){
if("reply"===this.type)return null;
var t=this.getCommentIdx(e);
return t>-1&&t<this.itemList.length?this.itemList[t]:null;
}
},{
key:"getReplyIdx",
value:function(e,t){
var n=0;
if("reply"===this.type){
if(this.data.some(function(e){
return e.reply_id===t?!0:(n++,!1);
}))return n;
}else if(this.data.some(function(i){
return i.content_id===e?(n++,i.reply_new.reply_list.some(function(e){
return e.reply_id===t?!0:(n++,!1);
}),!0):(n+=i.reply_new.reply_list.length+1,!1);
}))return n;
return-1;
}
},{
key:"getReply",
value:function(e,t){
var n=this.getReplyIdx(e,t);
return n>-1&&n<this.itemList.length?this.itemList[n]:null;
}
},{
key:"setLikeInfo",
value:function(t){
var n=t.type,i=void 0===n?"comment":n,o=t.cmtData,a=t.replyData,l=t.contentId,s=t.replyId,c=t.myId,m=t.likeStatus,p=t.likeNum,d=t.force;
if(o||(o=this.getData(void 0!==l?{
contentId:l
}:{
myId:c
})),o){
var u=void 0,y=void 0,_=void 0;
"comment"===i?(u=o,y="like_status",_="like_num"):(a||(a=e.getDataByKey(o.reply_new.reply_list,"reply_id",s)),
a&&(u=a,y="reply_like_status",_="reply_like_num")),u&&(d||u[y]!==m&&("number"!=typeof p||u[_]!==p))&&(u[y]=m,
"number"!=typeof p&&(p=u[_]+(m?1:-1)),u[_]=p,e.changeLikeStatus("comment"===i?r.qs("."+E,this.getComment(o.content_id)):r.qs("."+H,this.getReply(o.content_id,a.reply_id)),m,p),
"function"==typeof this.onPraise&&this.onPraise(i,o.content_id,"reply"===i?a.reply_id:"",m,p));
}
}
},{
key:"updateReplyLen",
value:function(e){
var t=e.newCnt,n=e.cmtData,i=e.contentId,o=e.myId;
if(n||(n=this.getData(void 0!==i?{
contentId:i
}:{
myId:o
})),n){
var a=this.getComment(n.content_id);
if(a){
var l=r.qs(".js_more_reply",a.parentNode);
l&&(l.style.display=0===t||t===n.reply_new.reply_list.length?"none":"",r.qs(".js_reply_length",l).innerHTML=t);
}
}
}
},{
key:"getCommentListHTML",
value:function(e){
var t=this,n={},i="";
return e.forEach(function(o){
i+=t.getCommentItemHTML(o,t.count++).replace("<mp-reply-list></mp-reply-list>",t.getReplyListHTML(o.reply_new.reply_list,o));
try{
if(t.globalData.reportData&&t.globalData.contentIDs){
var a=o.nick_name+o.content,l=!1,r=t.globalData.reportData.repeatContentID;
n[a]&&(l=!0,r=t.globalData.reportData.repeatContent),t.globalData.contentIDs.indexOf(o.content_id)>-1&&(l=!0,
r=t.globalData.reportData.repeatContentID),t.globalData.contentIDs.push(o.content_id),
n[a]=!0,l&&t.myReport(r,encodeURIComponent(JSON.stringify({
comment_id:t.globalData.commentId,
content_id:o.content_id,
offset:t.globalData.offset,
length:e.length,
url:location.href
})));
}
}catch(s){
console.error(s);
}
}),i;
}
},{
key:"getReplyListHTML",
value:function(e,t){
var n=this;
return e.map(function(e){
return n.getReplyItemHTML(e,t,n.count++);
}).join("");
}
},{
key:"getCommentItemHTML",
value:function(t){
t.time=e.dateToString(t.create_time),t.status="",gt(t),t.content=t.content.htmlDecodeLite().htmlEncodeLite(),
t.nick_name=yt(t.nick_name.htmlDecodeLite().htmlEncodeLite()),t.is_from_friend=t.is_from_friend||0,
t.is_from_me="mine"===this.type?1:t.is_from_me||0,t.is_from_author=!1,t.is_from=t.is_from||0,
t.reply_new=t.reply_new||{
reply_list:[]
},t.is_elected="elected"===this.type?1:t.is_elected,t.report_elected=t.is_elected||0,
t.report_friend=t.is_from_friend||0,t.scene=this.scene,t.like_num_format=e.formatLikeNum(t.like_num);
var n={
item:t,
deviceIsPc:k,
isWxWork:h,
type:this.type,
itemType:"comment",
isOversize:!this.isShowAll&&this.getIsOversize(),
supportReply:D,
canC2CReply:this.globalData.canC2CReply
};
return y.tmpl(_,n,!1).replace("<mp-comment-item></mp-comment-item>",y.tmpl(f,n,!1));
}
},{
key:"getReplyItemHTML",
value:function(t,n){
return t.time=e.dateToString(t.create_time),t.content=(t.content||"").htmlDecodeLite().htmlEncodeLite(),
t.is_from_me=1===t.is_from,t.is_from_author=2===t.is_from,t.reply_like_status=t.reply_like_status||0,
t.reply_like_num=t.reply_like_num||0,t.reply_like_num_format=e.formatLikeNum(t.reply_like_num),
t.reply_is_elected="reply"===this.type?1:t.reply_is_elected||0,t.to_reply_del_flag=t.to_reply_del_flag||0,
t.to_nick_name=e.sliceNickname(t.to_nick_name||""),t.to_content=(t.to_content||"").htmlDecodeLite().htmlEncodeLite(),
t.author_like_status=!!t.author_like_status,"mine"===this.type&&1===t.is_from?(!t.nick_name&&(t.nick_name=this.globalData.nickName),
!t.logo_url&&(t.logo_url=this.globalData.headImg)):t.nick_name=yt(t.nick_name.htmlDecodeLite().htmlEncodeLite()),
gt(t),y.tmpl(f,{
item:t,
deviceIsPc:k,
isWxWork:h,
type:this.type,
content_id:n.content_id,
my_id:n.my_id,
itemType:"reply",
isOversize:!this.isShowAll&&this.getIsOversize(),
supportReply:D,
canC2CReply:this.globalData.canC2CReply
},!1);
}
},{
key:"getItemFrag",
value:function(e,t,n){
for(var i=document.createDocumentFragment(),o=[],a=_t(this[e](t,n)).childNodes;a.length;){
var l=a[0];
1===l.nodeType&&o.push(l.classList.contains(S)?l:r.qs("."+S,l)),i.appendChild(l);
}
return{
frag:i,
itemList:o
};
}
},{
key:"getIsOversize",
value:function(){
return this.count>nt;
}
},{
key:"delegatedContainer",
value:function(t,n,i){
var o=this,a=function(t){
var n;
t=_extends((n={},_defineProperty(n,E,null),_defineProperty(n,H,null),_defineProperty(n,A,null),
_defineProperty(n,z,null),_defineProperty(n,K,null),_defineProperty(n,W,null),_defineProperty(n,N,null),
_defineProperty(n,V,null),_defineProperty(n,q,null),n),t);
var i=Object.keys(t);
return function(n){
for(var a=n.target,l="",r=function(e){
return 1===a.nodeType&&a.classList.contains(e)?(l=e,!0):!1;
};a&&a!==n.currentTarget&&!i.some(r);)a=a.parentNode;
if(l&&"function"==typeof t[l]){
for(var s=null,c=null,m=null,p=null,d=a,u=d.classList;d&&!u.contains(x)&&!u.contains(N);)d=d.parentNode,
u=d.classList;
if(u.contains(x))s=o.getData({
contentId:d.dataset.contentId
}),m=d;else if(p=d,"reply"===o.type)s=o.cmtData,c=e.getDataByKey(o.data,"reply_id",1*d.dataset.replyId);else{
for(var y=1*d.dataset.replyId;d&&!d.classList.contains(x);)d=d.parentNode;
s=o.getData({
contentId:d.dataset.contentId
}),m=d,c=e.getDataByKey(s.reply_new.reply_list,"reply_id",y);
}
t[l]({
e:n,
el:a,
cmtData:s,
replyData:c,
cmtEl:m,
replyEl:p
});
}
};
};
l.on(this.container,t,a(n),!1,"longtap"===t?a(i):null);
}
},{
key:"praiseComment",
value:function(e,t,n){
var i="/mp/appmsg_comment?action=",o={
comment_id:this.globalData.commentId,
content_id:t.content_id,
item_show_type:window.item_show_type||0,
scene:t.scene
},l=void 0,r=void 0;
"comment"===e?(l=t.like_status?0:1,r=t.like_num+(t.like_status?-1:1),i+="likecomment",
o.appmsgid=window.appmsgid):(l=n.reply_like_status?0:1,r=n.reply_like_num+(n.reply_like_status?-1:1),
i+="like_reply",o.reply_id=n.reply_id),this.setLikeInfo({
type:e,
cmtData:t,
replyData:n,
likeStatus:l,
likeNum:r
}),o.like=l,a({
type:"POST",
url:i,
data:o
});
}
},{
key:"delComment",
value:function(e,t,n){
var a=this;
setTimeout(function(){
window.weui.confirm("comment"===e?"Delete this comment?":"Delete this reply?",{
className:"weui-pop-zindex-primary",
buttons:[{
label:"Cancel",
type:"default"
},{
label:"Delete",
type:"primary",
onClick:function(){
var l={
scene:a.globalData.reportData.scene,
appmsgid:window.appmsgid,
my_id:t.my_id,
comment_id:a.globalData.commentId,
content_id:t.content_id
};
"comment"===e?l.action="delete":(l.action="deletecommentreply",l.reply_id=n.reply_id),
o({
url:i.join("/mp/appmsg_comment",l,!0),
dataType:"json",
success:function(i){
0===i.ret?a.remove({
type:e,
cmtData:t,
replyData:n
}):pt("Deletion failed. Try again.");
},
error:function(){
pt("Network error. Try again.");
}
});
}
}]
});
},100);
}
},{
key:"commentReply",
value:function(n,i,o,a,l){
var s=this;
if(this.checkReplyQualification(o)){
var c="comment"===n&&o.is_from_me||"reply"===n&&o.is_from_me&&(1===a.is_from||2===a.is_from);
if(2===ut)!function(){
var t=void 0,c=void 0,p=void 0;
"comment"===n?(t=""+o.content_id,c=o.nick_name,p=o.content):(t=o.content_id+"_"+a.reply_id,
c=a.nick_name,p=a.content),"function"==typeof s.beforeShowKeyboard&&s.beforeShowKeyboard();
var d="comment"===s.type||"reply"===s.type;
i&&(d||lt||rt)&&(s.curReplyEl=i,m.lastData.keyboard&&s.scroll2Reply(m.lastData.keyboard)),
r.enableSelect(),m.show({
mask:!0,
disableScroll:d||lt||rt,
text:s.inputValue[t]||"",
placeholder:s.globalData.canC2CReply?"?????? "+e.sliceNickname(c)+"???":"???????????????????????????????????????",
maxLength:it,
showRemindWordCount:T.remindWordCount,
disableScrollAdjustment:d,
scrollContentY:i&&!d?r.getScrollTop()+i.getBoundingClientRect().bottom+92:0,
toggleEmotion:l,
success:function(e){
s.submitReply(e,n,o,a,t);
},
cancel:function(e){
s.inputValue[t]=e;
},
show:s.onKeyboardShow,
fail:function(){
"comment"!==s.type&&(s.inputValue[t]&&r.trim(s.inputValue[t])?(s.commentWriteDialog.setInputValue(s.inputValue[t]),
s.commentWriteDialog.enableSubmit()):(s.commentWriteDialog.setInputValue(""),s.commentWriteDialog.disableSubmit())),
d&&r.enableSelect(),s.commentWriteDialog.show({
nickName:c,
toContent:p,
params:{
type:n,
cmtData:o,
replyData:a,
key:t
}
});
},
hide:function(e,i){
if(d&&r.disableSelect(),"DONE_EMOTION"===i&&s.submitReply(e,n,o,a,t),delete s.curReplyEl.dataset.bottom,
s.curReplyEl=null,d)s.globalData.cmtDialog.setMarginBottom(0);else if(lt)document.body.style.removeProperty("margin-bottom");else if(rt)if(ct.classList.remove(F),
ct.style.removeProperty("transform"),ct.dataset.distance){
var l=r.getScrollTop()-1*ct.dataset.distance;
delete ct.dataset.distance,document.documentElement.scrollTop=l,document.body.scrollTop=l;
}else s.globalData.articleContent.classList.remove(Y),s.globalData.articleContent.style.removeProperty("margin-top"),
document.documentElement.scrollTop=0,document.body.scrollTop=0;
"function"==typeof s.onKeyboardHide&&s.onKeyboardHide();
},
showEmotionPanel:function(e){
s.scroll2Reply(e,!0);
},
hideEmotionPanel:function(){
m.lastData.keyboard&&s.scroll2Reply(m.lastData.keyboard);
}
});
}();else if(1===ut&&c){
var p=void 0;
p="comment"===n?o.content:a.content,t.invoke("handleMPPageAction",{
action:"writeCommentReply",
title:mt,
comment_id:this.globalData.commentId,
style:"white",
personal_comment_id:""+o.my_id,
reply_content:p||""
});
}else u.setSum(110809,51,1),this.globalData.cmtDialog.showNotSupportDialog();
}
}
},{
key:"submitReply",
value:function(e,t,n,i,o){
var a=this;
this.sendReply({
cnt:e,
type:t,
cmtData:n,
replyData:i,
success:function(){
a.inputValue[o]="";
}
});
}
},{
key:"commentReplyPC",
value:function(e,t,n,i,o){
if(this.checkReplyQualification(i)){
if(this.input.isShow&&(this.input.hide(),t===this.input.target))return;
t.parentNode.classList.add(J);
var a=void 0,l=void 0;
"comment"===e?(a=""+i.content_id,l=i.nick_name):(a=i.content_id+"_"+o.reply_id,l=o.nick_name),
this.input.show(r.qs("."+G,n),{
target:t,
renderType:"append",
text:this.inputValue[a],
placeholder:this.globalData.canC2CReply?"?????? "+l+"???":"???????????????????????????????????????",
params:{
type:e,
cmtData:i,
replyData:o,
key:a
}
});
}
}
},{
key:"checkReplyQualification",
value:function(e){
var t=this.globalData.replyFlag;
if(1===t)return ft("??????????????????"),!1;
if(e.is_from_me)return!0;
if(0===t)ft("????????????????????????????????????");else if(3!==t||this.globalData.isFans){
if(4!==t||this.globalData.isFansDays)return!0;
ft("?????????????????????7??????????????????");
}else ft("???????????????????????????????????????");
return"function"==typeof this.onCanNotReply&&this.onCanNotReply(),!1;
}
},{
key:"sendReply",
value:function(t){
var n=this,i=t.cnt,a=t.type,l=t.cmtData,r=t.replyData,s=t.success,c=t.fail,m=e.validContent(i,"reply"),p=m.valid,d=m.content;
p&&!this.replyLock&&(this.replyLock=!0,o({
url:"/mp/appmsg_comment?action=addcommentreply",
data:{
appmsgid:window.appmsgid,
idx:window.idx,
comment_id:this.globalData.commentId,
sn:window.sn,
title:mt,
nickname:this.globalData.nickName,
head_img:this.globalData.headImg,
content:d,
enterid:window.enterid,
my_id:l.my_id,
scene:this.globalData.reportData.scene,
to_reply_id:"reply"===a?r.reply_id:"",
content_id:l.content_id
},
type:"POST",
dataType:"json",
success:function(t){
switch(+t.ret){
case 0:
k&&n.input.hide(),n.globalData.canC2CReply&&"mine"!==n.type&&n.updateReplyLen({
newCnt:++l.reply_new.reply_total_cnt,
cmtData:l
});
var i={
content:d,
create_time:Math.floor(new Date/1e3),
reply_id:t.reply_id,
reply_like_num:0,
reply_like_status:0,
nick_name:n.globalData.nickName,
logo_url:n.globalData.headImg,
to_content:"reply"===a?r.content:"",
to_nick_name:e.sliceNickname("reply"===a?r.nick_name:""),
is_from:1,
to_reply_del_flag:0,
reply_is_elected:n.globalData.canC2CReply?1:0,
needAnimation:!0
};
switch(n.type){
case"elected":
n.add({
data:[i],
type:"reply",
cmtData:l,
pos:"reply"===a&&r.reply_id,
mode:"reply"===a?"push":"unshift"
}),n.globalData.canC2CReply&&n.globalData.cmtDialog.getReplyList({
success:function(){
n.globalData.cmtDialog.addReply({
data:[i],
mode:"unshift"
});
},
cmtData:l
});
break;

case"comment":
n.globalData.cmtDialog.addReplyAndRender({
data:[i],
mode:"unshift"
});
break;

case"reply":
n.globalData.cmtDialog.addReplyAndRender({
data:[i],
replyId:r.reply_id
});
break;

case"mine":
n.add({
data:[i],
cmtData:l,
type:"reply"
});
}
return void("function"==typeof s&&s());

case-6:
pt("??????????????????????????????????????????");
break;

case-7:
pt("????????????????????????????????????????????????");
break;

case-10:
pt("??????????????????"+it+"???");
break;

case-15:
pt("???????????????");
break;

case-18:
pt("??????????????????????????????????????????");
break;

case-20:
pt("???????????????????????????7????????????????????????");
break;

case 167003:
pt("????????????????????????????????????");
break;

default:
pt("System error. Try again later.");
}
"function"==typeof c&&c();
},
error:function(e){
console.error(e),"function"==typeof c&&c();
},
complete:function(){
n.replyLock=!1;
}
}));
}
},{
key:"showAll",
value:function(){
this.isShowAll||(this.itemList.forEach(function(e){
e.style.display="",e.classList.contains(W)&&(e.parentNode.style.display="");
}),this.isShowAll=!0);
}
},{
key:"showTopItems",
value:function(){
var e=arguments.length<=0||void 0===arguments[0]?2:arguments[0];
return this.itemList.length>e?(this.itemList.some(function(t,n){
return e>n?(t.classList.contains(W)&&(t.parentNode.style.display=""),t.style.display="",
!1):!0;
}),!1):!0;
}
},{
key:"showActionSheet",
value:function(e,n,i){
var o=this;
p.show({
buttons:[{
label:"??????",
onClick:function(){
R({
opType:2,
PersonalCommentId:n.my_id,
ReplyId:"reply"===e?i.reply_id:0
});
var o=("comment"===e?n:i).content;
t.invoke("handleMPPageAction",{
action:"setClipboardData",
text:o
},function(e){
/:ok$/.test(e.err_msg)?window.weui.toast("????????????",750):window.navigator.clipboard&&window.navigator.clipboard.writeText?window.navigator.clipboard.writeText(o).then(function(){
window.weui.toast("????????????",750);
},function(){
dt(o);
}):dt(o);
});
}
},{
label:"Report",
onClick:function(){
R({
opType:3,
PersonalCommentId:n.my_id,
ReplyId:"reply"===e?i.reply_id:0
}),o.complain(e,n,i);
}
}],
onClose:function(){
("comment"===o.type||"reply"===o.type)&&d.show({
onClick:function(){
o.globalData.cmtDialog.hideDialog();
}
});
}
});
}
},{
key:"complain",
value:function(e,t,n){
var i={
comment:1,
reply:2
},o="/mp/report?action=getcommentcomplain&comment_id="+this.globalData.commentId+"&content_id="+t.content_id+"&type="+i[e]+"&url="+encodeURIComponent(window.location.href);
"reply"===e&&(o+="&reply_id="+n.reply_id),o+="#wechat_redirect",c.openUrlWithExtraWebview(o);
}
},{
key:"scroll2Reply",
value:function(e,t){
var n=this;
if("comment"===this.type||"reply"===this.type){
var i=this.globalData.cmtDialog,o=e+at-(t?0:st),a=ot-this.curReplyEl.getBoundingClientRect().bottom-o;
i.setMarginBottom(o),i.scrollY(i.getScrollTop()-a,Math.abs(a)<150);
}else if(lt){
var o=e+at-st,a=ot-this.curReplyEl.getBoundingClientRect().bottom-o,l={
y:r.getScrollTop()-a,
end:g.isAndroid?function(){
var e=n.curReplyEl.getBoundingClientRect().bottom,t=s.getInnerHeight();
e+at!==t&&j.start({
distance:e+at-t,
duration:.1
});
}:null
};
Math.abs(a)<150?l.speed=300:l.duration=.3,document.body.style.marginBottom=o+"px",
j.start(l);
}else if(rt){
var o=e+at-st,c=void 0;
this.curReplyEl.dataset.bottom?c=1*this.curReplyEl.dataset.bottom:(c=this.curReplyEl.getBoundingClientRect().bottom,
this.curReplyEl.dataset.bottom=c);
var a=ot-c-o,m=r.getScrollTop();
ct.classList.add(F),a>m?(this.globalData.articleContent.classList.add(Y),this.globalData.articleContent.style.marginTop=a-m+"px",
ct.style.transform="translateY("+m+"px)"):(ct.style.transform="translateY("+a+"px)",
ct.dataset.distance=a);
}
}
},{
key:"myReport",
value:function(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];
"undefined"!=typeof e&&(this.globalData.reportData.idkey?u.setSum(this.globalData.reportData.idkey,e,1):(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random());
}
}],[{
key:"formatLikeNum",
value:function(e){
return e=parseInt(e,10)>=1e4?(e/1e4).toFixed(1)+"???":e,"en"===window.LANG?n.dealLikeReadShow_en(e):e;
}
},{
key:"dateToString",
value:function(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var i=t/1e3-e,o=n/1e3-e,a=new Date(n).getFullYear(),l=new Date(1e3*e);
return 3600>i?Math.ceil(i/60)+"?????????":86400>o?Math.floor(i/60/60)+"?????????":172800>o?"Yesterday":604800>o?Math.floor(o/24/60/60)+"??????":l.getFullYear()===a?l.getMonth()+1+"/"+l.getDate():l.getFullYear()+"???"+(l.getMonth()+1)+"???"+l.getDate()+"???";
}
},{
key:"validContent",
value:function(e){
var t=arguments.length<=1||void 0===arguments[1]?"comment":arguments[1],n=T.getLength(e);
if(0===n)return pt("comment"===t?"Comment cannot be blank":"??????????????????"),{
valid:!1
};
var i=T.getLimit(t);
return n>i?(pt("??????????????????"+i+"???"),{
valid:!1
}):{
valid:!0,
content:e
};
}
},{
key:"getDataByKey",
value:function(e,t,n){
var i=null;
return e.some(function(e){
return e[t]===n?(i=e,!0):!1;
}),i;
}
},{
key:"changeLikeStatus",
value:function(t,n,i){
var o=r.qs("."+M,t);
o.innerHTML=0>=i?"":e.formatLikeNum(i),t.classList[n?"add":"remove"](P);
}
},{
key:"sliceNickname",
value:function(e){
for(var t=arguments.length<=1||void 0===arguments[1]?6:arguments[1],n="",i=0,o=e.length,a=0;o>i&&t>a;i++)/\w/.test(e[i])?(a+=.5,
n+=e[i]):(a++,t>=a&&(n+=e[i]));
return n+(o>i?"...":"");
}
}]),e;
}();
return ht;
});