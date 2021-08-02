define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:117,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:23.37
};
});function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function t(t,e){
for(var i=0;i<e.length;i++){
var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);
}
}
return function(e,i,n){
return i&&t(e.prototype,i),n&&t(e,n),e;
};
}();
define("appmsg/emotion/slide.js",["appmsg/emotion/nav.js"],function(t){
"use strict";
function e(t){
return t.touches&&t.touches.length>0?t.touches[0].clientX:t.clientX;
}
var i=t("appmsg/emotion/nav.js"),n=300,a=!1,r=void 0,s=!1,o=function(){
function t(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
_classCallCheck(this,t),this.currentPage=0,this.distX=0,this.opt=e,this.wrapper=e.emotionSlideWrapper,
this.commonWidth=e.commonWidth,r=-e.wrapperWidth+this.commonWidth,this.listenAndSlide();
var i="translate3d(0, 0, 0)";
this.wrapper.css({
webkitTransform:i,
transform:i
});
}
return _createClass(t,[{
key:"moveWrapper",
value:function(){
var t=this.commonWidth,e=t/4,i=-this.currentPage*t+this.distX;
i>e?i=e:r-e>i&&(i=r-e);
var n="translate3d("+i+"px, 0, 0)";
this.wrapper.css({
webkitTransform:n,
transform:n
});
}
},{
key:"addAnimation",
value:function(){
var t="all 0.3s ease";
this.wrapper.css({
transition:t,
webkitTransition:t
});
}
},{
key:"removeAnimation",
value:function(){
var t=this.wrapper.el[0].style;
t.transition="",t.webkitTransition="";
}
},{
key:"animateTo",
value:function(t){
var e=this;
a=!0,this.addAnimation(),this.moveWrapper(),setTimeout(function(){
a=!1,e.removeAnimation();
},n),i.activeNav(t,this.opt.navs);
}
},{
key:"slideToCertainPage",
value:function(){
var t=this.commonWidth,e=55,i=parseInt(this.distX/t,10),n=this.distX%t;
this.currentPage-=i,Math.abs(n)>e&&(this.currentPage-=Math.abs(n)/n*1),this.currentPage>this.opt.pageCount-1?this.currentPage=this.opt.pageCount-1:this.currentPage<0&&(this.currentPage=0),
this.distX=0,this.animateTo(this.currentPage);
}
},{
key:"listenAndSlide",
value:function(){
var t=this,i=void 0,n=void 0,r=function(n){
n.preventDefault(),n.stopPropagation(),a||(s=!0,i=e(n),t.isMoved=!1);
},o=function(){
a||(s=!1,t.slideToCertainPage());
},u=function(r){
r.preventDefault(),r.stopPropagation(),!a&&s&&(n=e(r),t.distX=n-i,t.moveWrapper(),
Math.abs(t.distX)>6&&(t.isMoved=!0));
};
this.wrapper.on("touchstart",r),this.wrapper.on("mousedown",r),this.wrapper.on("touchmove",u),
this.wrapper.on("mousemove",u),this.wrapper.on("touchend",o),this.wrapper.on("mouseup",o);
}
}]),t;
}();
return o;
});define("common/navShadow.js",["biz_wap/jsapi/core.js"],function(a){
"use strict";
var n=a("biz_wap/jsapi/core.js"),o="navShadowKey_",c="",t=null;
return n.on("onNavShadowClick",function(a){
c&&a.traceId===c&&"function"==typeof t&&t();
}),{
show:function(){
var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e={
action:"showNavShadow",
color:a.color||"#000000",
alpha:a.alpha||.6
};
a.onClick&&(t=a.onClick,c||(c=o+1*new Date,e.traceId=c)),n.invoke("handleMPPageAction",e,function(n){
/:ok$/.test(n.err_msg)?"function"==typeof a.callback&&a.callback(!0):"function"==typeof a.callback&&a.callback(!1);
});
},
hide:function(){
var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
c="",t=null,n.invoke("handleMPPageAction",{
action:"hideNavShadow"
},function(n){
/:ok$/.test(n.err_msg)?"function"==typeof a.callback&&a.callback(!0):"function"==typeof a.callback&&a.callback(!1);
});
}
};
});define("pages/mod/bottom_modal.html.js",[],function(){
return'<div class="wx_bottom_modal_wrp <#=extClass#>">\n  <div class="weui-half-screen-dialog wx_bottom_modal js_bottom_modal_content">\n    <# if (hasHeader) { #>\n      <div class="weui-half-screen-dialog__hd__wrp">\n        <div class="weui-half-screen-dialog__hd js_bottom_modal_hd">\n          <div class="weui-half-screen-dialog__hd__side">\n            <button class="weui-icon-btn js_close_bottom_modal">Back<i class="weui-icon-close-thin"></i></button>\n          </div>\n\n          <div class="weui-half-screen-dialog__hd__main">\n            <strong class="weui-half-screen-dialog__title js_bottom_modal_title">Title</strong>\n          </div>\n\n          <div class="weui-half-screen-dialog__hd__side">\n            <# if (hasBtn) { #>\n              <# if (btnSlot) { #>\n                <div class="js_submit_bottom_modal">\n                  <#==btnSlot#>\n                </div>\n              <# } else { #>\n                <button class="weui-btn weui-btn_primary weui-btn_mini js_submit_bottom_modal"><#=btnText#></button>\n              <# } #>\n            <# } #>\n            <button class="weui-icon-btn" style="display:none;">更多<i class="weui-icon-more"></i></button>\n          </div>\n        </div>\n      </div>\n    <# } #>\n    <div class="weui-half-screen-dialog__bd js_bottom_modal_bd">\n      <div class="wx_bottom_modal_msg_wrp js_modal_loading" style="display: none;">\n        <div class="wx_bottom_modal_msg">\n          <i class="weui-loading"></i>\n        </div>\n      </div>\n      <!-- 上下拉加载loading -->\n      <div class="weui-loadmore js_pull_loading" style="display: none;">\n        <i class="weui-loading"></i>\n        <span class="weui-loadmore__tips">Loading...</span>\n      </div>\n\n      <!-- 加载完成的dom，插到js_bottom_modal_bd下 -->\n      <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot js_modal_end_line" style="display: none;">\n        <span class="weui-loadmore__tips"></span>\n      </div>\n    </div>\n    <# if (hasFooter) { #>\n      <div class="weui-half-screen-dialog__ft js_bottom_modal_ft"></div>\n    <# } #>\n  </div>\n  <# if (hasMask) { #>\n    <!-- 透明mask，用于防止点透 -->\n    <div class="wx_bottom_modal_mask_fixed js_bottom_modal_mask_not_click"></div>\n\n    <!-- 有底色的mask -->\n    <div class="weui-mask wx_bottom_modal_mask js_bottom_modal_mask"></div>\n  <# } #>\n</div>\n';
});;define('widget/wx-widget/wx_bottom_modal.css', [], function(require, exports, module) {
	return ".weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}body{--weui-BTN-DISABLED-FONT-COLOR:rgba(0,0,0,0.2)}body[data-weui-theme='dark']{--weui-BTN-DISABLED-FONT-COLOR:rgba(255,255,255,0.2)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DISABLED-FONT-COLOR:rgba(255,255,255,0.2)}}body{--weui-BTN-DEFAULT-BG:#f2f2f2}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-BG:rgba(255,255,255,0.08)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-BG:rgba(255,255,255,0.08)}}body{--weui-BTN-DEFAULT-COLOR:#06ae56}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-COLOR:rgba(255,255,255,0.8)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-COLOR:rgba(255,255,255,0.8)}}body{--weui-BTN-DEFAULT-ACTIVE-BG:#e6e6e6}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-ACTIVE-BG:rgba(122,122,122,0.1536)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-ACTIVE-BG:rgba(122,122,122,0.1536)}}body{--weui-DIALOG-LINE-COLOR:rgba(0,0,0,0.1)}body[data-weui-theme='dark']{--weui-DIALOG-LINE-COLOR:rgba(255,255,255,0.1)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-DIALOG-LINE-COLOR:rgba(255,255,255,0.1)}}body{--weui-BG-0:#ededed;--weui-BG-1:#f7f7f7;--weui-BG-2:#fff;--weui-BG-3:#f7f7f7;--weui-BG-4:#4c4c4c;--weui-BG-5:#fff;--weui-FG-0:rgba(0,0,0,0.9);--weui-FG-HALF:rgba(0,0,0,0.9);--weui-FG-1:rgba(0,0,0,0.5);--weui-FG-2:rgba(0,0,0,0.3);--weui-FG-3:rgba(0,0,0,0.1);--weui-RED:#fa5151;--weui-ORANGE:#fa9d3b;--weui-YELLOW:#ffc300;--weui-GREEN:#91d300;--weui-LIGHTGREEN:#95ec69;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1485ee;--weui-PURPLE:#6467f0;--weui-WHITE:#fff;--weui-LINK:#576b95;--weui-TEXTGREEN:#06ae56;--weui-FG:black;--weui-BG:white;--weui-TAG-TEXT-ORANGE:#fa9d3b;--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:#06ae56;--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:#10aeff;--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(0,0,0,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(0,0,0,0.05)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BG-0:#111;--weui-BG-1:#1e1e1e;--weui-BG-2:#191919;--weui-BG-3:#202020;--weui-BG-4:#404040;--weui-BG-5:#2c2c2c;--weui-FG-0:rgba(255,255,255,0.8);--weui-FG-HALF:rgba(255,255,255,0.6);--weui-FG-1:rgba(255,255,255,0.5);--weui-FG-2:rgba(255,255,255,0.3);--weui-FG-3:rgba(255,255,255,0.05);--weui-RED:#fa5151;--weui-ORANGE:#c87d2f;--weui-YELLOW:#cc9c00;--weui-GREEN:#74a800;--weui-LIGHTGREEN:#3eb575;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1196ff;--weui-PURPLE:#8183ff;--weui-WHITE:rgba(255,255,255,0.8);--weui-LINK:#7d90a9;--weui-TEXTGREEN:#259c5c;--weui-FG:white;--weui-BG:black;--weui-TAG-TEXT-ORANGE:rgba(250,157,59,0.6);--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:rgba(6,174,86,0.6);--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:rgba(16,174,255,0.6);--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(255,255,255,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(255,255,255,0.05)}}body[data-weui-theme='dark']{--weui-BG-0:#111;--weui-BG-1:#1e1e1e;--weui-BG-2:#191919;--weui-BG-3:#202020;--weui-BG-4:#404040;--weui-BG-5:#2c2c2c;--weui-FG-0:rgba(255,255,255,0.8);--weui-FG-HALF:rgba(255,255,255,0.6);--weui-FG-1:rgba(255,255,255,0.5);--weui-FG-2:rgba(255,255,255,0.3);--weui-FG-3:rgba(255,255,255,0.05);--weui-RED:#fa5151;--weui-ORANGE:#c87d2f;--weui-YELLOW:#cc9c00;--weui-GREEN:#74a800;--weui-LIGHTGREEN:#3eb575;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1196ff;--weui-PURPLE:#8183ff;--weui-LINK:#7d90a9;--weui-TEXTGREEN:#259c5c;--weui-FG:white;--weui-BG:black;--weui-TAG-TEXT-ORANGE:rgba(250,157,59,0.6);--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:rgba(6,174,86,0.6);--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:rgba(16,174,255,0.6);--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(255,255,255,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(255,255,255,0.05)}body{--weui-BG-COLOR-ACTIVE:#ececec}body[data-weui-theme='dark']{--weui-BG-COLOR-ACTIVE:#282828}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BG-COLOR-ACTIVE:#282828}}.weui-half-screen-dialog{position:fixed;left:0;right:0;bottom:0;max-height:75%;z-index:5000;line-height:1.4;background-color:#fff;background-color:var(--weui-BG-2);border-top-left-radius:12px;border-top-right-radius:12px;overflow:hidden;padding:0 24px;padding:0 calc(24px + constant(safe-area-inset-right)) constant(safe-area-inset-bottom) calc(24px + constant(safe-area-inset-left));padding:0 calc(24px + env(safe-area-inset-right)) env(safe-area-inset-bottom) calc(24px + env(safe-area-inset-left))}@media only screen and (max-height:558px){.weui-half-screen-dialog{max-height:none}}.weui-half-screen-dialog__hd{font-size:8px;height:8em;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-half-screen-dialog__hd .weui-icon-btn{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.weui-half-screen-dialog__hd .weui-icon-btn:active{opacity:.5}.weui-half-screen-dialog__hd__side{position:relative;left:-8px}.weui-btn__word-wrp{font-size:15px;display:-webkit-box;display:-webkit-flex;display:flex;position:relative;right:2px}.weui-btn__word-wrp:active{opacity:.5}.weui-btn__word{color:rgba(0,0,0,0.5)}.weui_right_arrow{display:inline-block;vertical-align:middle;width:10px;height:20px;margin-left:4px;background-size:cover;background-image:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='10' height='20' viewBox='0 0 10 20'%3E  %3Cpath fill-opacity='.5' fill-rule='evenodd' d='M2.045 5.484l.884-.884 4.816 4.816a.83.83 0 0 1 0 1.177l-4.816 4.816-.884-.884 4.52-4.52-4.52-4.521z'\/%3E%3C\/svg%3E\")}.weui-half-screen-dialog__hd__main{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-half-screen-dialog__hd__side+.weui-half-screen-dialog__hd__main{text-align:center;padding:0 40px}.weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side{right:-8px;left:auto}.weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side .weui-icon-btn{right:0}.weui-half-screen-dialog__title{display:block;color:rgba(0,0,0,0.9);color:var(--weui-FG-0);font-weight:700;font-size:15px}.weui-half-screen-dialog__subtitle{display:block;color:rgba(0,0,0,0.5);color:var(--weui-FG-1);font-size:10px}.weui-half-screen-dialog__bd{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:4px;padding-bottom:40px;font-size:14px;color:rgba(0,0,0,0.9);color:var(--weui-FG-0)}.weui-half-screen-dialog__desc{font-size:17px;font-weight:700;color:rgba(0,0,0,0.9);color:var(--weui-FG-0);line-height:1.4}.weui-half-screen-dialog__tips{padding-top:16px;font-size:14px;color:rgba(0,0,0,0.3);color:var(--weui-FG-2);line-height:1.4}.weui-half-screen-dialog__ft{padding:0 24px 32px;text-align:center}.weui-half-screen-dialog__ft .weui-btn:nth-last-child(n+2),.weui-half-screen-dialog__ft .weui-btn:nth-last-child(n+2)+.weui-btn{display:inline-block;vertical-align:top;margin:0 8px;width:120px}@media(prefers-color-scheme:dark){.weui-btn__word{color:rgba(255,255,255,0.5)}.weui_right_arrow{background-image:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='10' height='20' viewBox='0 0 10 20'%3E  %3Cpath fill='%23FFFFFF' fill-opacity='.5' fill-rule='evenodd' d='M2.045 5.484l.884-.884 4.816 4.816a.83.83 0 0 1 0 1.177l-4.816 4.816-.884-.884 4.52-4.52-4.52-4.521z'\/%3E%3C\/svg%3E\")}}.weui-loadmore.weui-loadmore_line .weui-loadmore__tips{padding:0 8px}.weui-loadmore.weui-loadmore_dot{width:68px}.weui-loadmore.weui-loadmore_dot .weui-loadmore__tips{padding:0 8px}.weui-loadmore_default.weui-loadmore{width:auto;line-height:1.4;margin:0 56px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.weui-loadmore_default.weui-loadmore_line{margin-top:0;margin-bottom:0;border:0}.weui-loadmore_default.weui-loadmore_line:before,.weui-loadmore_default.weui-loadmore_line:after{content:\"\";width:24px;height:1px;background:rgba(0,0,0,0.1)}.weui-loadmore_default.weui-loadmore_line .weui-loadmore__tips{top:auto;padding:0 8px;background:transparent;color:rgba(0,0,0,0.3)}.weui-loadmore_default.weui-loadmore_dot{margin-top:0;margin-bottom:0}.weui-loadmore_default.weui-loadmore_dot .weui-loadmore__tips{line-height:.5}@media(prefers-color-scheme:dark){.weui-loadmore_default.weui-loadmore_line:before,.weui-loadmore_default.weui-loadmore_line:after{background:rgba(255,255,255,0.05)}.weui-loadmore_default.weui-loadmore_line .weui-loadmore__tips{color:rgba(255,255,255,0.3)}}.wx_page_no_scroll{height:100%;overflow:hidden}.wx_bottom_modal{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;top:100%;-webkit-transition:top .3s;transition:top .3s;visibility:hidden}.wx_bottom_modal .weui-half-screen-dialog__hd__side{min-width:64px}.wx_bottom_modal .weui-half-screen-dialog__hd__side+.weui-half-screen-dialog__hd__main{padding:0}.wx_bottom_modal .weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side{text-align:right}.wx_bottom_modal .weui-half-screen-dialog__hd .weui-icon-btn{position:static;-webkit-transform:unset;transform:unset;background:transparent;width:32px;height:32px;margin-left:-4px}.wx_bottom_modal .weui-btn__word-wrp{-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-tap-highlight-color:rgba(0,0,0,0)}.wx_bottom_modal.weui-half-screen-dialog{max-height:none;overflow:initial}.wx_bottom_modal .weui-half-screen-dialog__bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow-y:auto;position:relative;-ms-scroll-chaining:none;overscroll-behavior:contain}.wx_bottom_modal .album_keep_read_item{pointer-events:auto!important}.wx_bottom_modal_wrp>.wx_bottom_modal_mask_fixed,.wx_bottom_modal_wrp>.weui-mask{visibility:hidden}.wx_bottom_modal_show>.wx_bottom_modal_mask_fixed,.wx_bottom_modal_show>.weui-mask{visibility:visible}.wx_bottom_modal_show .weui-half-screen-dialog{top:100%}.wx_bottom_modal_show.wx_bottom_modal_right .weui-half-screen-dialog{top:auto;-webkit-transform:translateX(100%);transform:translateX(100%)}.wx_bottom_modal_right .weui-half-screen-dialog{-webkit-transform:translateX(100%);transform:translateX(100%);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.wx_bottom_modal_form .wx_bottom_modal{-webkit-transition:none;transition:none;opacity:0}.wx_bottom_modal_msg_wrp{height:100%}.wx_bottom_modal_msg{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:20px;box-sizing:border-box;color:rgba(0,0,0,0.9);font-size:14px}.wx_bottom_modal_msg .weui-loading{width:20px;height:20px}.weui-mask.wx_bottom_modal_mask{top:-100px}.wx_bottom_modal_mask_fixed{width:100%;height:100%;position:fixed;top:0;background-color:transparent}.weui-half-screen-dialog_headline .weui-half-screen-dialog__hd__wrp .weui-half-screen-dialog__hd{margin-bottom:-1px}.weui-half-screen-dialog_headline .weui-half-screen-dialog__hd__wrp:after{content:\"\";display:block;height:1px;background:rgba(0,0,0,0.1);-webkit-transform:scaleY(0.5);transform:scaleY(0.5);-webkit-transform-origin:0 100%;transform-origin:0 100%;position:relative;bottom:0;z-index:1}@media(prefers-color-scheme:dark){.wx_bottom_modal .weui-loadmore__tips{color:rgba(255,255,255,0.5)}.wx_bottom_modal_msg{color:rgba(255,255,255,0.8)}.weui-half-screen-dialog_headline .weui-half-screen-dialog__hd__wrp:after{background:rgba(255,255,255,0.05)}}";
});define("pages/audition_tpl.html.js",[],function(){
return'<div id="js_music_dialog">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog">\n        <div class="weui-dialog__bd"><#=msg#></div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:void(0);" class="weui-dialog__btn weui-dialog__btn_primary js_submit">OK</a>\n        </div>\n    </div>\n</div>';
});define("pages/musicUrlReport.js",["biz_wap/utils/ajax.js"],function(s){
"use strict";
var e=s("biz_wap/utils/ajax.js"),r=function(){
var s=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=[""];
r.push(1*s.type===1?1:2),r.push(s.songid||""),r.push(s.musicid||""),r.push(s.jumpurlkey||""),
r.push(""),r.push(s.kugouParams||"");
for(var t=encodeURIComponent(s.responseData||""),u=2e3,a=parseInt(t.length/u,10),p=0;a>=p;p++){
var n=t.substr(p*u,u);
n&&r.push(n);
}
e({
url:"/mp/webcommreport?action=report",
type:"POST",
data:{
logid:18027,
buffer:r.join(",")
}
});
};
return{
reportRespData:r
};
});define("pages/music_report_conf.js",[],function(){
"use strict";
return{
m_pv:"28306_0",
m_wx_pv:"28306_1",
m_h5_pv:"28306_2",
m_unload_wx_pv:"28306_3",
v_pv:"28306_4",
v_wx_pv:"28306_5",
v_h5_pv:"28306_6",
v_unload_wx_pv:"28306_7",
force_h5:"28306_30",
m_h5_err_total:"28306_31",
m_h5_err_1:"28306_32",
m_h5_err_2:"28306_33",
m_h5_err_3:"28306_34",
m_h5_err_4:"28306_35",
m_h5_err_5:"28306_36",
v_h5_err_total:"28306_37",
v_h5_err_1:"28306_38",
v_h5_err_2:"28306_39",
v_h5_err_3:"28306_40",
v_h5_err_4:"28306_41",
v_h5_err_5:"28306_42",
m_wx_pv_2:"28306_43",
v_wx_pv_2:"28306_44",
m_wx_pv_1:"28306_50",
v_wx_pv_1:"28306_55",
m_wx_err_1:"28306_58",
m_wx_err_2:"28306_59",
v_wx_err_1:"28306_60",
v_wx_err_2:"28306_61",
v_stoped_android:"59288_1",
v_stoped_ios:"59288_0",
v_paused_android:"59288_7",
v_paused_ios:"59288_6",
m_stoped_android:"59288_3",
m_stoped_ios:"59288_2",
m_paused_android:"59288_9",
m_paused_ios:"59288_8",
k_stoped_android:"59288_5",
k_stoped_ios:"59288_4",
k_paused_android:"59288_11",
k_paused_ios:"59288_10",
k_pv:"28306_66",
k_wx_pv:"28306_67",
k_h5_pv:"28306_69",
k_unload_wx_pv:"28306_71",
k_h5_err_total:"28306_72",
k_h5_err_1:"28306_74",
k_h5_err_2:"28306_75",
k_h5_err_3:"28306_76",
k_h5_err_4:"28306_77",
k_h5_err_5:"28306_78",
k_wx_pv_1:"28306_79",
k_wx_pv_2:"28306_81",
k_wx_err_1:"28306_83",
k_wx_err_2:"28306_85",
aac_pv:"28306_104",
ios_aac_err_1:"28306_106",
ios_aac_err_2:"28306_108",
android_aac_err_1:"28306_110",
android_aac_err_2:"28306_112",
v_seek_err:"28306_114",
android_aac_err_3:"28306_116",
ios_aac_err_3:"28306_118",
QMClient_pv:"62866_0",
QMClient_play:"62866_1",
QMClient_js_num:"62866_2",
QMClient_js_suc:"62866_3",
QMClient_js_err:"62866_5",
QMClient_js_timeout:"62866_7",
QMClient_js_network:"62866_9"
};
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",s.biz||"","&mid=",s.mid||"","&idx=",s.idx||"","&scene=",s.scene||"","&t=",Math.random()].join("");
_({
type:"GET",
url:i,
timeout:2e4
});
}
function t(e){
_({
type:"POST",
url:"/mp/videoreport?",
timeout:5e3,
async:e.async===!0?!0:!1,
data:e.data
});
}
function o(e){
for(var i=JSON.parse(JSON.stringify(e.data)),t=[],o=0,n=i.seek_position.length;n>o;o++){
var a=i.seek_position[o];
if(a&&a.length>0){
var d=a.join("#");
t.push(d||"");
}else t.push("");
}
i.seek_position=t;
for(var r=[],o=0,n=i.seek_loaded.length;n>o;o++){
var a=i.seek_loaded[o];
if(a&&a.length>0){
var d=a.join(",");
r.push(d||"");
}else r.push("");
}
i.seek_loaded=r;
for(var p=[],c=30;i.musicid.length>0;){
var a={};
for(var o in i)i.hasOwnProperty(o)&&("[object Array]"==Object.prototype.toString.call(i[o])?(a[o]=i[o].splice(0,c),
a[o]=a[o].join("mtitle"==o?";#":";")):a[o]=i[o]);
p.push(a);
}
return p;
}
function n(e){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(s.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function a(e){
if(3==e.step||6==e.step||1999==e.step){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(s.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function d(){
var e=v.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=v.device;
return e.ipad?"v4010":e.is_android_phone&&v.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&v.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||0,
__biz:window.biz||0,
idx:window.idx||0,
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
errorcode:[],
seek:[],
seek_position:[],
duration2:[],
play_duration2:[],
play_last_time:[],
local_time:[],
seek_loaded:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:0,
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:Math.round(+new Date/1e3),
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown",
content_url:s.location.href,
auto_play:0,
ori_status:3,
hit_bizuin:"",
sessionid:window.sessionid||"",
hit_vid:""
};
return e;
}
function l(e,i,t){
var o=0,n=[],a={};
if(i&&"[object String]"==Object.prototype.toString.call(i))o=1,"img"==t&&(i=encodeURIComponent(i)),
n.push("log0="+i),a.log0=i;else if(i&&"[object Array]"==Object.prototype.toString.call(i)){
o=i.length;
for(var d=0;o>d;d++){
var r="img"==t?encodeURIComponent(i[d]):i[d];
n.push("log"+d+"="+r),a["log"+d]=r;
}
}
if("img"==t){
var p=new Image,c="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
o>0&&(c+="&lc="+o+"&"+n.join("&")),c+="&t="+Math.random(),p.src=c;
}else{
var l={};
o>0&&(l=a),l.idkey=e,l.lc=o,_({
type:"POST",
url:"//mp.weixin.qq.com/mp/jsmonitor?",
timeout:1e4,
data:l,
dataType:"json"
});
}
}
var s=window.withoutIframe?window:window.parent.window,_=e("biz_wap/utils/ajax.js"),v=e("pages/version4video.js");
try{
{
s.location.href;
}
}catch(m){
s=window;
}
return{
report:i,
videoreport:t,
getPlatformType:d,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:a,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c,
logReport:l
};
});define("pages/player_adaptor.js",["pages/music_player.js","biz_wap/utils/jsmonitor_report.js","pages/loadscript.js","pages/music_report_conf.js"],function(t){
"use strict";
function i(t,i){
0!=t.type&&1!=t.type||!p.inQMClient?"function"==typeof i.callback&&i.callback(new a.init(t)):(p.initPlayerQueue.push(e("QMClient",t,i)),
n("QMClient"));
}
function e(t,i,e){
var n=p.config[t].func;
return function(t,i,e,n){
return function(){
"function"==typeof window[i]?"function"==typeof n.callback&&n.callback(new o(e,{
type:t
})):"function"==typeof n.callback&&n.callback(new a.init(e));
};
}(t,n,i,e);
}
function n(t){
var i=p.config[t];
if(1!=i.jsLoadState){
if(2==i.jsLoadState||3==i.jsLoadState)return void r();
i.jsLoadState=1;
var e=+new Date,n=l[t+"_js_num"];
n&&(n=n.split("_"),u.setSum(n[0],n[1],1)),c({
url:i.jsLink,
timeout:1e4,
type:"JS",
callback:function(){
+new Date-e;
2==i.jsLoadState,r();
var n=l[t+"_js_suc"];
n&&(n=n.split("_"),u.setSum(n[0],n[1],1));
},
onerror:function(n){
+new Date-e;
i.jsLoadState=3,r();
var s=l[t+"_js_err"],o=l[t+"_js_timeout"],a=l[t+"_js_network"];
if(s&&o&&a)switch(s=s.split("_"),o=o.split("_"),a=a.split("_"),u.setSum(s[0],s[1],1),
1*n){
case 400:
u.setSum(a[0],a[1],1);
break;

case 500:
u.setSum(o[0],o[1],1);
}
}
});
}
}
function r(){
for(var t=0,i=p.initPlayerQueue.length;i>t;t++)"function"==typeof p.initPlayerQueue[t]&&p.initPlayerQueue[t]();
p.initPlayerQueue=[];
}
function s(){
for(var t in p.config)"function"==typeof p[t+"EvInit"]&&p[t+"EvInit"]();
}
function o(t,i){
if(this.opt=t,this.opt2=i,this._g={
_blockPlugin:{},
playType:"-1"
},"QMClient"==i.type&&p.inQMClient){
var e=p.config[i.type];
e.playerObj||(p.config[i.type].playerObj=new window[e.func]),this._g.playType=i.type,
this.player=e.playerObj,this._initPlugins(),this._bindQMEvent();
}
}
var a=t("pages/music_player.js"),u=t("biz_wap/utils/jsmonitor_report.js"),c=t("pages/loadscript.js"),l=t("pages/music_report_conf.js"),p={
debug:location.href.indexOf("_qqclient=1")>0?!0:!1,
config:{
QMClient:{
func:"Player",
playerObj:null,
jsLink:"https://imgcache.qq.com/music/h5/player/player.js?max_age=604800&v=1",
jsLoadState:-1
}
},
inQMClient:!1,
initPlayerQueue:[]
};
return p.QMClientEvInit=function(){
if(p.inQMClient=window.navigator.userAgent.indexOf("QQMusic/")>0||p.debug?!0:!1,
p.inQMClient&&window.msg_cdn_url&&window.msg_title){
var t=window.location.href,i=a.getQuery("scene",t);
i&&(t=t.replace("&scene="+i,"").replace("?scene="+i,"")),t=t.replace(/#rd$/,"").replace(/#wechat_redirect$/,""),
-1==t.indexOf("?")&&(t+="?"),t+="&scene=112#wechat_redirect";
var e=function(t){
window.WebViewJavascriptBridge?t():document.addEventListener("WebViewJavascriptBridgeReady",t);
},n=(window.msg_title||"").html(!1),r=(window.msg_desc||"").html(!1);
e(function(){
M.client.invoke("ui","setActionBtn",{
type:"icon",
content:"share"
},function(){
M.client.invoke("other","callShareWeb",{
imgUrl:window.msg_cdn_url,
link:t,
title:n,
desc:r
});
});
});
}
},s(),o.prototype={
_initPlugins:function(){
this.opt.plugins||(this.opt.plugins=[]);
for(var t=this.opt.plugins,i=0,e=t.length;e>i;++i){
var n=t[i];
n.setPlayer(this),!!n.init&&n.init();
}
},
_trigger:function(t,i){
var e=this.opt,n=this._g,r=e.plugins,s=n._blockPlugin[t]||n._blockPlugin.all,o=0;
if(s&&"function"==typeof s.recv&&(o|=s.recv(t,i),1&o))return!1;
for(var a=0,u=r.length;u>a&&(o|=r[a].recv(t,i),!(2&o));++a);
if(!(4&o)){
var c=this["__"+t+"Handler"];
c&&c.call(this,i);
}
8&o||this.__triggerOutside(t,i);
},
__triggerOutside:function(){
var t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var e=this.opt["on"+i];
"function"==typeof e&&e.apply(this,t);
}
},
_setBlockPlugin:function(t,i){
this._g._blockPlugin[t]=i;
},
_bindQMEvent:function(){
var t=this;
this.player.on("play",function(i){
i&&i.song&&i.song.mid==t.opt.mid?(t._trigger("statusChange",1),t._trigger("QMClientPlay")):t._trigger("statusChange",3);
}),this.player.on("pause",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",2);
}),this.player.on("stop",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",3);
});
},
play:function(){
"QMClient"==this._g.playType&&this.player.play(this.opt.mid);
},
pause:function(){
this.player.pause();
},
stop:function(){
this.player.stop();
},
getDuration:function(){
return this.opt.duration?this.opt.duration:"QMClient"==this._g.playType?this.player.duration||0:0;
},
getCurTime:function(){
return"QMClient"==this._g.playType?this.player.currentTime||0:0;
},
surportSeekRange:function(){
return!1;
},
getSrc:function(){
return"";
},
destory:function(){},
seek:function(){},
setDuration:function(){},
setSrc:function(){}
},{
create:i,
inQMClient:p.inQMClient
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js"],function(t){
"use strict";
function e(){
j.hasInit||(j.hasInit=!0,d(),c(),r());
}
function i(t){
var i=this;
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){},
albumId:"",
audioList:[],
playAudioId:"",
speedList:[]
},this._extend(t),this._o.audioList.length&&this._o.audioList.forEach(function(t){
t.srcId=j.wxtag+i._o.albumId+"_"+t.audioId;
}),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0,
hasPlayedDuration:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==j.surportType&&(this._initData(),
this._synPlayStatus());
}
function o(t){
b.invoke("musicPlay",{
app_id:"a",
title:"Weixin Official Accounts Platform",
singer:"Weixin Official Accounts Platform",
epname:"Weixin Official Accounts Platform",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:j.ev,
lowbandUrl:j.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function a(t){
n({
cur:t,
stopCur:!1
});
}
function n(t){
function e(){
if(j.mutexCount==s&&(s=0,j.mutexCount=0,"function"==typeof a)){
var t=0;
1==j.surportType?t=2e3:3==j.surportType&&(t=0),setTimeout(function(){
a();
},t);
}
}
if(0!=j.mutexCount)return void setTimeout(function(){
n(t);
},200);
var i=t.cur,o=t.stopCur===!0?!0:!1,a=t.callback,s=0;
for(var u in j.mutexPlayers)for(var r=0,d=j.mutexPlayers[u].length;d>r;r++)s++;
for(var u in j.mutexPlayers)for(var r=0,d=j.mutexPlayers[u].length;d>r;r++){
var l=j.mutexPlayers[u][r];
if(l&&l!==i){
var p=l.getSurportType(),c="";
2!=p||1!=l._status&&4!=l._status?1!=p&&3!=p||1!=l._status&&2!=l._status&&4!=l._status||(c="stop"):c=l._o.allowPause?"pause":"stop",
c&&"function"==typeof l[c]?l[c](o,function(){
j.mutexCount++,e();
}):(j.mutexCount++,e());
}else j.mutexCount++,e();
}
}
function s(){
return j.surportType;
}
function u(t,e){
return new i(t,e);
}
function r(){
j.surportType>0&&j.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function d(){
j.jsapiGlobalEvent={
error:h,
pause:y,
stop:_,
play:g,
preempted:_,
waiting:f
};
}
function l(t){
return"&"+j.wxtag+"="+t;
}
function p(t,e){
e=e||"info";
var i="[musicplay]"+t+"[location:"+location.href+"]";
I(i,e);
}
function c(){
b.on("onBackgroundAudioStateChange",function(t){
if(t.state){
var e;
t.albumId?(e=t.albumId,t.srcId=""):t.srcId&&t.audioId&&(e=t.srcId.match(new RegExp(j.wxtag+"(.*?)_"+t.audioId)))?(e=e[1],
t.srcId="",t.albumId=e):(e=P(j.wxtag,t.src)||"",e&&(e=l(e)));
var i=j.mutexPlayers[t.src]||j.mutexPlayers2[t.src]||j.mutexPlayers[e];
if(i){
var o;
if(t.srcId)for(var a=0,n=i.length;n>a;a++)i[a]._g.jsapiSrcId==t.srcId&&(o=i[a]);else if(1==i.length)o=i[0];else for(var a=0,n=i.length;n>a;a++)if(-1!=i[a]._status&&0!=i[a]._status&&3!=i[a]._status){
o=i[a];
break;
}
if(o&&o._g.stateChangeCallback){
t.albumId===o._o.albumId&&t.audioId!==o.getPlayAudioId()&&(o.setPlayAudioId(t.audioId),
o._initJsapiData());
var s=t.state,u=!1;
"ended"===s&&(s="stop",u=!0),"wait"==s&&(s="waiting");
var r=!1,d=JSON.stringify(t||{});
if("error"==s){
o.jsapiLog("onBackgroundAudioStateChange error;res:"+d);
for(var p in o._g.stateChangeCallback)o._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof o._g.stateChangeCallback[p]&&(r=!0,
o._g.stateChangeCallback[p](-1,t.errMsg||""),o._g.stateChangeCallback[p]=null);
}else"function"==typeof o._g.stateChangeCallback[s]&&(j.debug,o.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+d),
r=!0,o._g.stateChangeCallback[s](0),o._g.stateChangeCallback[s]=null);
r||"function"!=typeof j.jsapiGlobalEvent[s]||(o.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+d),
"stop"===s?j.jsapiGlobalEvent[s](t,o,u):j.jsapiGlobalEvent[s](t,o));
}
}
}
});
}
function h(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function _(t,e,i){
e.stop(!1,null,t,i),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in j.mutexPlayers)if(j.mutexPlayers.hasOwnProperty(t))for(var e=0,i=j.mutexPlayers[t].length;i>e;e++){
var o=j.mutexPlayers[t][e];
if(o&&1==o._status&&(1==o._surportType||3==o._surportType)){
o._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=e.substr(e.indexOf("?")+1).match(i);
return null!=o?o[2]:"";
}
function v(t,e,i){
function o(t,e){
for(;j.synPlayStatusArr.length>0;){
var i=j.synPlayStatusArr.shift();
i&&"function"==typeof i[t]&&i[t](e);
}
}
j.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:i
}),j.synPlayStatusId&&clearTimeout(j.synPlayStatusId),j.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
o("onSuccess",t);
},
onError:function(t){
o("onError",t);
}
});
},0);
}
function S(t){
var e=1*t;
j.playbackRate=isNaN(e)?1:e;
}
function A(){
return j.playbackRate;
}
var T=t("biz_wap/utils/mmversion.js"),b=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),k=t("pages/version4video.js"),I=(t("biz_wap/utils/jsmonitor_report.js"),
t("appmsg/log.js")),j={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!k.device.inWechat||k.device.inWindowWechat||k.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:T.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__",
playbackRate:1,
autoplayAudioList:[],
autoplayAudioListLen:10
};
return i.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,i=t.length;i>e;++e){
var o=t[e];
o.setPlayer(this),!!o.init&&o.init();
}
},i.prototype._trigger=function(t,e){
var i=this._o,o=this._g,a=i.plugins,n=o._blockPlugin[t]||o._blockPlugin.all,s=0;
if(n&&"function"==typeof n.recv&&(s|=n.recv(t,e),1&s))return!1;
for(var u=0,r=a.length;r>u&&(s|=a[u].recv(t,e),!(2&s));++u);
if(!(4&s)){
var d=this["__"+t+"Handler"];
d&&d.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},i.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var i=this._o["on"+e];
"function"==typeof i&&i.apply(this,t);
}
},i.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},i.prototype._synPlayStatus=function(){
function t(t){
if(s&&clearTimeout(s),n.hasCheckPlay===!0,n.hasCheckPlay=!0,o._surportType=3,j.surportType=3,
S(t.playbackRate),!!j.debug&&console.log("_synPlayStatus mutexKey:"+n.mutexKey),
t&&t.audioListState)try{
t.audioListState=JSON.parse(t.audioListState),t.albumId=t.audioListState.albumId;
}catch(i){}
if(a.albumId){
if(t.albumId&&a.albumId===t.albumId){
var u="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
o._onAlbumSync({
action:"updatePlayStatus",
isPlay:u
});
}else o._onAlbumSync({
action:"updatePlayStatus",
isPlay:!1
});
e(t);
}else if(t.src&&(a.src==t.src||t.src.indexOf(n.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=n.jsapiSrcId)return;
}else if(j.mutexPlayers[n.mutexKey].length>1&&j.mutexPlayers[n.mutexKey][0]!==o)return;
e(t);
}
}
function e(t){
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,i="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||i?(o._onPlay(null,t),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
function i(){
s&&clearTimeout(s),n.hasCheckPlay!==!0&&(n.hasCheckPlay=!0,o._o.autoPlay&&o.play());
}
var o=this,a=this._o,n=this._g;
if(!j.inWechat||1*j._playtype>0)return n.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var s;
v(o,t,i);
+new Date;
s=setTimeout(function(){
i();
},a.syncTimeout||1e4);
},i.prototype._fixAndroidSizeLimit=function(){
if(!(1*j._playtype>0)&&j.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||T.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},i.prototype._createAutoAndPlay=function(){
function t(){
function t(){
e._h5Audio.src=e._o.albumId&&e._o.playAudioId?e.getPlayAudioOpt().src:e._o.src;
}
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),j.isAndroidLow?(t(),
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
t(),e._h5Audio.playbackRate=e._o.isAudio?j.playbackRate:1,e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
j.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},i.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},i.prototype._onLoading=function(t){
this._status=4;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},i.prototype._onPlay=function(){
{
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
}
this._status=1;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t,this._status),
this._startCountTime();
},i.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},i.prototype._onAlbumSync=function(t){
"function"==typeof this._o.onAlbumSync&&this._o.onAlbumSync.call(this,t||{});
},i.prototype.getAudioListState=function(t,e){
b.invoke("getBackgroundAudioState",{
albumId:t
},function(t){
if(t&&t.audioListState){
if("string"==typeof t.audioListState)try{
t.audioListState=JSON.parse(t.audioListState);
}catch(i){
t.audioListState={};
}
e(t.audioListState);
}
});
},i.prototype._onEnd=function(t){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],o=e.audioId,a=void 0===o?"":o,n=j.autoplayAudioList[j.autoplayAudioList.length-1];
if(this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime(),i?this.updatePlayedDuration(0):this.updatePlayedDuration(),
this._o.albumId&&i&&n&&n.audioId===a){
var s=this._o.audioList&&this._o.audioList.findIndex(function(t){
return t.audioId===a;
});
s>-1&&(j.autoplayAudioList=this._o.audioList.slice(s+1,s+1+j.autoplayAudioListLen),
b.invoke("setBackgroundAudioState",{
albumId:this._o.albumId,
playAudioId:this._o.audioList[s+1].audioId,
audioList:j.autoplayAudioList
}));
}
},i.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},i.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},i.prototype._onTimeupdate=function(t,e,i){
"function"!=typeof this._o.onTimeupdate||i||this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},i.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},i.prototype._initH5Event=function(){
var t=this,e=this._o,i=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var o=i.h5Event;
o.canplaythrough=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},o.play=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},o.ended=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},o.pause=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},o.waiting=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var a,n=100;
o.seeking=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
a=setTimeout(function(){
!!j.debug&&console.log("seek loading Timeout excute"),a=null,t._trigger("seekNeed2Load");
},n));
},o.seeked=function(e){
t._h5Audio&&(!!j.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),a&&(clearTimeout(a),a=null,t._trigger("seekNotNeed2Load")));
},o.error=function(e){
var i=1*e.target.error.code||5;
(1>i||i>5)&&(i=5),t._trigger("h5Error",{
code:i
}),t._onError(e,{
type:1,
code:i
}),t._destoryH5Audio();
},o.timeupdate=function(i){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(i,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},o.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},i.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),i={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var o in i)i.hasOwnProperty(o)&&this._h5Audio.removeEventListener(o,e.h5Event[i[o]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(a){}
if(t){
for(var o in i)i.hasOwnProperty(o)&&this._h5Audio.addEventListener(o,e.h5Event[i[o]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},i.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),j.mutexPlayers[this._g.mutexKey]?j.mutexPlayers[this._g.mutexKey].push(this):j.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(j.mutexPlayers2[t.jsapi2Src]?j.mutexPlayers2[t.jsapi2Src].push(this):j.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},i.prototype._createMutexKey=function(){
if(this._o.albumId)this._g.mutexKey=this._o.albumId,this._g.jsapiSrcId=j.wxtag+"_"+this._o.wxIndex;else{
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=j.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=l(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
}
},i.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},i.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},i.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||t.duration||void 0,
lastPlaytime:null,
albumId:"",
audioId:""
};
},i.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,i=t.jsApiData;
i&&i.getStatusId&&clearTimeout(i.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(o){
if(o&&o.audioListState&&"string"==typeof o.audioListState)try{
o.audioListState=JSON.parse(o.audioListState),o.albumId=o.audioListState.albumId;
}catch(a){
o.audioListState={};
}
(o.albumId&&o.albumId===e.albumId||o.src==e.jsapi2Src||o.src==e.src)&&(i.curTime=o.currentTime,
i.starTime=+new Date-1e3*o.currentTime,i.bufferedPercent=o.bufferedPercent,i.albumId=o.albumId||"",
i.audioId=o.audioId||"",(1==t._status||2==t._status||4==t._status)&&(i.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},i.getStatusTime)),t._onUpdateSeekRange(i.bufferedPercent),1==o.paused&&1==t._status?(j.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==o.paused&&2==t._status&&(j.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(o);
},
onError:function(){
i.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},i.getStatusTime);
}
});
},i.prototype._analogUpdateTime=function(t){
var e=this,i=e.jsApiData;
if(i){
if(i.updateTimeoutId&&clearTimeout(i.updateTimeoutId),1==e._status||2==e._status){
if(1==e._status&&(i.curTime=1*((+new Date-i.starTime)/1e3).toFixed(2)),i.curTime>=i.duration)return e._stopJsapiPlay(!1),
!0;
e._onTimeupdate(null,i.curTime,t);
}
return i.updateTimeoutId=setTimeout(function(){
e._analogUpdateTime();
},1e3),!1;
}
},i.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o,i={};
e.albumId&&(i.albumId=e.albumId),b.invoke("getBackgroundAudioState",{},function(i){
if(/:ok$/.test(i.err_msg)){
if(i.paused=1*i.paused,i.currentTime=i.currentTime?(1*i.currentTime).toFixed(2):0,
i.buffered){
var o=Math.floor(i.buffered/e.duration*100);
o=Math.max(o,0),o=Math.min(o,100),i.bufferedPercent=o;
}else i.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(i);
}else"function"==typeof t.onError&&(console.log("get err invoke err",i),t.onError(i));
});
},i.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==j._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,i=this._o;
this.jsapiLog("jsapi_musicPlay"),b.invoke("musicPlay",{
app_id:"a",
title:i.title,
singer:i.singer,
epname:i.epname,
coverImgUrl:i.coverImgUrl,
dataUrl:i.src,
lowbandUrl:i.src,
webUrl:i.webUrl
},function(o){
!!j.debug&&console.log("playlog:"+JSON.stringify(o||{})),o.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,j.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof i.duration&&1*i.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(o)):"function"==typeof t.onError&&t.onError(o);
});
},i.prototype._jsapi_setBackgroundAudioState=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",j._playtype);
var e=t.onSuccess,i=t.onError,o=t.needStartMusicUI,a=t.playAudioId,n=t.playbackRate,s=t.startTime,u=void 0===s?0:s;
if("function"!=typeof e&&(e=function(){}),"function"!=typeof i&&(i=function(){}),
1*j._playtype>0){
var r={};
return r.err_code=1,void i(r);
}
var d=this,l=this._o,p=d._g;
console.log("invoke set setBackgroundAudioState with param",l),this.jsapiLog("jsapi_setBackgroundAudioState"),
n&&S(n);
var c;
if(l.albumId){
d.setPlayAudioId(a),l.audioList.forEach(function(t){
t.audioId===a?(t.stopTime>=0&&t.stopTime<t.duration&&(t.startTime=t.stopTime),t.stopTime>=t.duration&&(t.startTime=0)):t.startTime=0,
t.isaac&&(t.src+="&voice_type=1"),t.playbackRate=j.playbackRate;
});
var h=l.audioList&&l.audioList.findIndex(function(t){
return t.audioId===a;
});
j.autoplayAudioList=h>-1?l.audioList.slice(h,h+j.autoplayAudioListLen):[],c={
albumId:l.albumId,
playAudioId:a,
audioList:j.autoplayAudioList
};
}else c={
protocol:l.protocal||"",
src:l.jsapi2Src||l.src,
lowbandUrl:l.jsapi2Src||l.src,
title:l.title,
epname:l.epname,
singer:l.singer,
srcId:p.jsapiSrcId,
coverImgUrl:l.coverImgUrl,
webUrl:l.webUrl,
musicbar_url:l.musicbar_url||"",
needStartMusicUI:1*o>0?1:0,
playbackRate:l.isAudio?j.playbackRate:1,
startTime:u
};
b.invoke("setBackgroundAudioState",c,function(t){
if(!!j.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(t||{})),
t.err_msg.indexOf("ok")>=0){
var a=1*d._status;
!o||1!==a&&2!==a&&4!==a?(e("waiting"),p.stateChangeCallback.play=function(t,o){
0==t?e("play"):0!=t&&i({
err_code:2,
err_msg:o||""
});
}):e();
}else t=t||{},t.err_code=1,i(t);
});
},i.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,i=(this._o,e._g),o=1*t.position||0,a=t.type;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),b.invoke("operateBackgroundAudio",{
operationType:a,
currentTime:o
},function(e){
!!j.debug&&console.log("operateBackgroundAudio "+a+",position:"+o+", log:"+JSON.stringify(e||{})),
-1===e.err_msg.indexOf("ok")&&("function"==typeof t.onError&&t.onError(e),"seek"===a?(i.stateChangeCallback.seeking=null,
i.stateChangeCallback.seeked=null):i.stateChangeCallback[a]=null);
}),"seek"==a?(i.stateChangeCallback.seeking=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",o):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
},i.stateChangeCallback.seeked=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",o):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
}):i.stateChangeCallback[a]=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
};
},i.prototype._jsapiPlay=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=this,i=(this._o,
this._g);
console.log("supporttype",j.surportType);
var o=t.onError,a=t.onSuccess,n=t.needStartMusicUI,s=t.playAudioId,u=t.playbackRate,r=t.startTime,d=t.isDoubleSpeed;
"function"!=typeof o&&(o=function(){}),"function"!=typeof a&&(a=function(){}),1==j.surportType?n?o():this._jsapi_musicPlay({
onError:function(){
e._h5Play({
playAudioId:s
});
}
}):this._jsapi_setBackgroundAudioState({
playAudioId:s,
needStartMusicUI:n,
playbackRate:u,
startTime:r||i.hasPlayedDuration,
onSuccess:function(t){
"waiting"===t?(e._trigger("jsapi2Begin2Play",t),e._initJsapiData(),e._surportType=3,
j.surportType=3,e._onLoading()):"play"===t&&(e._initJsapiData(),e._onPlay(),e._analogUpdateTime(!!d),
e._getMusicPlayerState(),e._trigger("jsapi2PlaySuccess")),"function"==typeof a&&(a(),
a=null,o=null);
},
onError:function(t){
t&&1==t.err_code&&!n?e._jsapi_musicPlay({
onError:function(){
e._h5Play({
playAudioId:s
});
}
}):(n||e._h5Play({
playAudioId:s
}),e._trigger("jsapi2Begin2PlayErr")),"function"==typeof o&&(o(),o=null,a=null);
}
});
},i.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!j.debug&&console.log("downloadSec:"+t),t;
},i.prototype._jsapiSeek=function(t){
function e(){
a.seeking=!1,i._onPlay(),a.starTime=+new Date-1e3*j.seekingPosition,i._analogUpdateTime(),
i._getMusicPlayerState();
}
var i=this,o=this._g,a=(this._o,this.jsApiData),n=parseInt(t,10);
this._o.duration&&n>=this._o.duration&&(n=this._o.duration-1),a.getStatusId&&clearTimeout(a.getStatusId),
a.updateTimeoutId&&clearTimeout(a.updateTimeoutId),a.seekWaitId&&clearTimeout(a.seekWaitId),
a.seeking=!0;
var s,u,r=100;
j.seekingPosition=n,a.starTime=+new Date-1e3*j.seekingPosition,console.log("begin to seek to",n),
this._jsapi_operateBackgroundAudio({
type:"seek",
position:n,
onError:function(){
i._trigger("seekErr"),!!j.debug&&console.log("seek callback fail"),a.seeking=!1,
i._analogUpdateTime(),i._getMusicPlayerState();
},
onSuccess:function(t){
console.log("jsapi seek res is ",t),"seeking"==t?(!!j.debug&&console.log("seeking callback success"),
a.seeking=!0,o.stateChangeCallback.play=function(){
console.log("seeked to play"),s&&(clearTimeout(s),s=null),e();
},u=setTimeout(function(){
u=null,i._trigger("seekNeed2Load");
},r)):"seeked"==t&&((2==i._status||4==i._status)&&(s=setTimeout(function(){
!!j.debug&&console.log("setTimeout to play"),o.stateChangeCallback.play=null,a.seeking=!1,
a.curTime=n,i._resumeJsapiPlay(!0);
},1e3)),u&&(clearTimeout(u),u=null,i._trigger("seekNotNeed2Load")));
}
}),i._getMusicPlayerState();
},i.prototype._resumeJsapiPlay=function(t,e){
function i(t){
var e=o.jsApiData;
e.starTime=+new Date-1e3*e.curTime,o._onPlay(),o._analogUpdateTime(),o._getMusicPlayerState(),
"function"==typeof t&&t();
}
var o=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
o._stopJsapiPlay(!1,function(){
o.play();
});
},
onSuccess:function(){
i(e);
}
}):i(e));
},i.prototype._pauseJsapiPlay=function(t,e,i){
function o(t){
var e=a.jsApiData;
a._analogUpdateTime(),a._getMusicPlayerState(),e&&(e.updateTimeoutId=null),t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),
1==a._status&&a._onPause();
}
var a=this;
return 2==a._status?(o(e),void("function"==typeof i&&i())):void(1==this._surportType?this._stopJsapiPlay(t,i):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
o(e),"function"==typeof i&&i();
},
onError:function(){
a._stopJsapiPlay(!0,i);
}
}):(o(e),"function"==typeof i&&i())));
},i.prototype._stopJsapiPlay=function(t,e,i,a){
function n(t,e){
s._onTimeupdate(null,0),s._onUpdateSeekRange(0),s._onEnd(null,e,a),s._initJsapiData(),
"function"==typeof t&&t();
}
{
var s=this;
s.jsApiData;
}
t?1==s._surportType?o(function(){
n(e);
}):s._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
n(e,i);
},
onError:function(){
n(e,i);
}
}):n(e,i);
},i.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!j.debug&&console.log("h5 downloadSec:"+t),t;
},i.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=this._o.albumId&&this._o.playAudioId?parseInt(e/this.getPlayAudioOpt().duration*100,10):parseInt(e/this._o.duration*100,10),
this._h5Data.downloadDuration;
},i.prototype._h5Play=function(t){
0!==j.surportType&&(this.jsapiLog("h5Play"),this.setPlayAudioId(t.playAudioId),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},i.prototype._h5Resume=function(){
this._h5Audio&&(this._h5Audio.playbackRate=j.playbackRate,this._h5Audio.play());
},i.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},i.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!j.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},i.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},i.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var i=this.jsApiData;
i.curTime>0&&i.curTime>i.lastPlaytime&&null!==i.lastPlaytime&&(this._g.totalPlayTime+=i.curTime-i.lastPlaytime),
i.lastPlaytime=null;
}
},i.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,i=j.mutexPlayers[e];
if(i){
for(var o=0,a=i.length;a>o;o++)if(i[o]===this){
i.splice(o,1);
break;
}
if(0==i.length)try{
delete j.mutexPlayers[e];
}catch(n){}
}
if(t.jsapi2Src&&j.mutexPlayers2[t.jsapi2Src]){
for(var s=j.mutexPlayers2[t.jsapi2Src],o=0,a=s.length;a>o;o++)if(s[o]===this){
s.splice(o,1);
break;
}
if(0==s.length)try{
delete j.mutexPlayers2[t.jsapi2Src];
}catch(n){}
}
},i.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},i.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},i.prototype.surportSeekRange=function(){
return 1==j._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},i.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=l(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,j.mutexPlayers[this._g.mutexKey]?j.mutexPlayers[this._g.mutexKey].push(this):j.mutexPlayers[this._g.mutexKey]=[this];
},i.prototype.getSrc=function(){
return this._o.src||"";
},i.prototype.setDuration=function(t){
this._o.duration=t||0;
},i.prototype.getSurportType=function(){
return this._surportType||0;
},i.prototype.getPlayStatus=function(){
return this._status;
},i.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},i.prototype.getDuration=function(){
return this._o.duration||void 0;
},i.prototype.pause=function(t,e,i){
return i===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},i.prototype.stop=function(t,e,i,o){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e,i,o):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},i.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},i.prototype.resume=function(t,e,i){
(i===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():j.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},i.prototype.onload=function(){
this._onLoading();
},i.prototype.jsapiLog=function(t,e){
try{
var i=this._o,o={
type:i.type,
src:i.src,
mid:i.mid,
protocal:i.protocal,
webUrl:i.webUrl,
musicbar_url:i.musicbar_url
},a="["+JSON.stringify(o)+"]"+t;
p(a,e);
}catch(n){}
},i.prototype.openStartMusicUI=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.onError,i=t.onSuccess;
"function"!=typeof e&&(e=function(){}),"function"!=typeof i&&(i=function(){}),T.isWechat&&(T.isIOS||T.isAndroid)&&T.gtVersion("7.0.5",!0)?this._jsapiPlay({
needStartMusicUI:!0,
onError:function(){
e();
},
onSuccess:function(){
i();
}
}):e();
},i.prototype.play=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=this,i=this._g,o=t.playAudioId;
if(e._o.src||e._o.albumId){
if(2==e._status&&e._o.allowPause){
if(e._o.src)return void e.resume();
if(e._o.playAudioId&&e._o.playAudioId===o)return void e.resume();
}
return i.playTimeoutId&&clearTimeout(i.playTimeoutId),i.hasCheckPlay?void(j.inWechat?this._jsapiPlay({
playAudioId:o
}):0!=j.surportType&&this._h5Play({
playAudioId:o
})):void(i.playTimeoutId=setTimeout(function(){
e.play();
},1e3));
}
},i.prototype.seek=function(t){
{
var e=this;
this._g;
}
if(1==e._status||2==e._status||4==e._status)return 3==this._surportType?(this._endCountTime(),
void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0;
},i.prototype.getBackgroundAudioState=function(t){
t||(t={}),b.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},i.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},i.prototype.reverseList=function(t){
this._o.audioList.reverse(),this.update(t);
},i.prototype.update=function(t){
if(1===this._status||4===this._status){
var e=this._o.playAudioId;
this._o.audioList.forEach(function(i){
i.startTime=t&&e&&i.audioId===e?t:0;
});
var i=this._o.audioList&&this._o.audioList.findIndex(function(t){
return t.audioId===e;
});
j.autoplayAudioList=i>-1?this._o.audioList.slice(i,i+j.autoplayAudioListLen):[],
b.invoke("setBackgroundAudioState",{
albumId:this._o.albumId,
playAudioId:this._o.playAudioId||this.jsApiData.audioId,
audioList:j.autoplayAudioList
}),this._o.audioList.forEach(function(t){
console.log(t.audioId);
});
}
},i.prototype.getPlayAudioOpt=function(t){
if(t=t||this._o.playAudioId,!t)return null;
for(var e=0;e<this._o.audioList.length;e++)if(this._o.audioList[e].audioId===t)return this._o.audioList[e];
},i.prototype.getPlayAudioId=function(){
return this._o.playAudioId;
},i.prototype.setPlayAudioId=function(t){
this._o.playAudioId=t;
},i.prototype.doubleSpeed=function(t){
var e=t.succCallback,i=t.pcCallback,o=this,a=o._o.speedList;
j.inWechat?o.getBackgroundAudioState({
success:function(t){
var i=t.playbackRate,n=t.currentTime,s=a.findIndex(function(t){
return t===+i;
}),u=a[(s+1)%a.length];
o._jsapiPlay({
isDoubleSpeed:!0,
playbackRate:u,
startTime:+n,
onSuccess:function(){
j.isAndroid&&o.seek(+n),e();
}
});
}
}):!function(){
var t=o._h5Audio.playbackRate,n=a.findIndex(function(e){
return e===+t;
}),s=a[(n+1)%a.length];
S(s),o._h5Audio.playbackRate=s,o._h5Audio.play(),i(),e();
}();
},i.prototype.updatePlayedDuration=function(t){
return"undefined"!=typeof t?void(this._g.hasPlayedDuration=t):void(this._g.hasPlayedDuration=this.getCurTime());
},{
isAndroid:j.isAndroid,
init:u,
triggerUnloadPlaying:m,
getSurportType:s,
getQuery:P,
getPlaybackRate:A
};
});define("biz_wap/zepto/zepto.js",[],function(){
"use strict";
var t=function(){
function t(t){
return null==t?String(t):J[W.call(t)]||"object";
}
function n(n){
return"function"==t(n);
}
function e(t){
return null!=t&&t==t.window;
}
function i(t){
return null!=t&&t.nodeType==t.DOCUMENT_NODE;
}
function r(n){
return"object"==t(n);
}
function o(t){
return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype;
}
function s(t){
return t instanceof Array;
}
function u(t){
return"number"==typeof t.length;
}
function c(t){
return P.call(t,function(t){
return null!=t;
});
}
function a(t){
return t.length>0?C.fn.concat.apply([],t):t;
}
function l(t){
return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase();
}
function f(t){
return t in M?M[t]:M[t]=new RegExp("(^|\\s)"+t+"(\\s|$)");
}
function h(t,n){
return"number"!=typeof n||z[l(t)]?n:n+"px";
}
function p(t){
var n,e;
return j[t]||(n=L.createElement(t),L.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),
n.parentNode.removeChild(n),"none"==e&&(e="block"),j[t]=e),j[t];
}
function d(t){
return"children"in t?$.call(t.children):C.map(t.childNodes,function(t){
return 1==t.nodeType?t:void 0;
});
}
function g(t,n,e){
for(E in n)e&&(o(n[E])||s(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),s(n[E])&&!s(t[E])&&(t[E]=[]),
g(t[E],n[E],e)):n[E]!==x&&(t[E]=n[E]);
}
function m(t,n){
return null==n?C(t):C(t).filter(n);
}
function v(t,e,i,r){
return n(e)?e.call(t,i,r):e;
}
function y(t,n,e){
null==e?t.removeAttribute(n):t.setAttribute(n,e);
}
function b(t,n){
var e=t.className,i=e&&e.baseVal!==x;
return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n);
}
function w(t){
var n;
try{
return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?C.parseJSON(t):t:n):t;
}catch(e){
return t;
}
}
function N(t,n){
n(t);
for(var e in t.childNodes)N(t.childNodes[e],n);
}
var x,E,C,O,T,S,A=[],$=A.slice,P=A.filter,L=window.document,j={},M={},z={
"column-count":1,
columns:1,
"font-weight":1,
"line-height":1,
opacity:1,
"z-index":1,
zoom:1
},Z=/^\s*<(\w+|!)[^>]*>/,q=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,B=/^(?:body|html)$/i,R=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],F=["after","prepend","before","append"],H=L.createElement("table"),I=L.createElement("tr"),U={
tr:L.createElement("tbody"),
tbody:H,
thead:H,
tfoot:H,
td:I,
th:I,
"*":L.createElement("div")
},_=/complete|loaded|interactive/,D=/^[\w-]*$/,J={},W=J.toString,X={},Y=L.createElement("div"),G={
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
};
X.matches=function(t,n){
if(!n||!t||1!==t.nodeType)return!1;
var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;
if(e)return e.call(t,n);
var i,r=t.parentNode,o=!r;
return o&&(r=Y).appendChild(t),i=~X.qsa(r,n).indexOf(t),o&&Y.removeChild(t),i;
},T=function(t){
return t.replace(/-+(.)?/g,function(t,n){
return n?n.toUpperCase():"";
});
},S=function(t){
return P.call(t,function(n,e){
return t.indexOf(n)==e;
});
},X.fragment=function(t,n,e){
var i,r,s;
return q.test(t)&&(i=C(L.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(k,"<$1></$2>")),
n===x&&(n=Z.test(t)&&RegExp.$1),n in U||(n="*"),s=U[n],s.innerHTML=""+t,i=C.each($.call(s.childNodes),function(){
s.removeChild(this);
})),o(e)&&(r=C(i),C.each(e,function(t,n){
V.indexOf(t)>-1?r[t](n):r.attr(t,n);
})),i;
},X.Z=function(t,n){
t=t||[];
for(var e in C.fn)t[e]=C.fn[e];
return t.selector=n||"",t;
},X.isZ=function(t){
return t instanceof X.Z;
},X.init=function(t,e){
var i;
if(!t)return X.Z();
if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&Z.test(t))i=X.fragment(t,RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}else{
if(n(t))return C(L).ready(t);
if(X.isZ(t))return t;
if(s(t))i=c(t);else if(r(t))i=[t],t=null;else if(Z.test(t))i=X.fragment(t.trim(),RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}
}
return X.Z(i,t);
},C=function(t,n){
return X.init(t,n);
},C.extend=function(t){
var n,e=$.call(arguments,1);
return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){
g(t,e,n);
}),t;
},X.qsa=function(t,n){
var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,u=D.test(s);
return i(t)&&u&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:$.call(u&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n));
},C.contains=function(t,n){
return t!==n&&t.contains(n);
},C.type=t,C.isFunction=n,C.isWindow=e,C.isArray=s,C.isPlainObject=o,C.isEmptyObject=function(t){
var n;
for(n in t)return!1;
return!0;
},C.inArray=function(t,n,e){
return A.indexOf.call(n,t,e);
},C.camelCase=T,C.trim=function(t){
return null==t?"":String.prototype.trim.call(t);
},C.uuid=0,C.support={},C.expr={},C.map=function(t,n){
var e,i,r,o=[];
if(u(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),
null!=e&&o.push(e);
return a(o);
},C.each=function(t,n){
var e,i;
if(u(t)){
for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t;
}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;
return t;
},C.grep=function(t,n){
return P.call(t,n);
},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){
J["[object "+n+"]"]=n.toLowerCase();
}),C.fn={
forEach:A.forEach,
reduce:A.reduce,
push:A.push,
sort:A.sort,
indexOf:A.indexOf,
concat:A.concat,
map:function(t){
return C(C.map(this,function(n,e){
return t.call(n,e,n);
}));
},
slice:function(){
return C($.apply(this,arguments));
},
ready:function(t){
return _.test(L.readyState)&&L.body?t(C):L.addEventListener("DOMContentLoaded",function(){
t(C);
},!1),this;
},
get:function(t){
return t===x?$.call(this):this[t>=0?t:t+this.length];
},
toArray:function(){
return this.get();
},
size:function(){
return this.length;
},
remove:function(){
return this.each(function(){
null!=this.parentNode&&this.parentNode.removeChild(this);
});
},
each:function(t){
return A.every.call(this,function(n,e){
return t.call(n,e,n)!==!1;
}),this;
},
filter:function(t){
return n(t)?this.not(this.not(t)):C(P.call(this,function(n){
return X.matches(n,t);
}));
},
add:function(t,n){
return C(S(this.concat(C(t,n))));
},
is:function(t){
return this.length>0&&X.matches(this[0],t);
},
not:function(t){
var e=[];
if(n(t)&&t.call!==x)this.each(function(n){
t.call(this,n)||e.push(this);
});else{
var i="string"==typeof t?this.filter(t):u(t)&&n(t.item)?$.call(t):C(t);
this.forEach(function(t){
i.indexOf(t)<0&&e.push(t);
});
}
return C(e);
},
has:function(t){
return this.filter(function(){
return r(t)?C.contains(this,t):C(this).find(t).size();
});
},
eq:function(t){
return-1===t?this.slice(t):this.slice(t,+t+1);
},
first:function(){
var t=this[0];
return t&&!r(t)?t:C(t);
},
last:function(){
var t=this[this.length-1];
return t&&!r(t)?t:C(t);
},
find:function(t){
var n,e=this;
return n="object"==typeof t?C(t).filter(function(){
var t=this;
return A.some.call(e,function(n){
return C.contains(n,t);
});
}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){
return X.qsa(this,t);
});
},
closest:function(t,n){
var e=this[0],r=!1;
for("object"==typeof t&&(r=C(t));e&&!(r?r.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;
return C(e);
},
parents:function(t){
for(var n=[],e=this;e.length>0;)e=C.map(e,function(t){
return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0;
});
return m(n,t);
},
parent:function(t){
return m(S(this.pluck("parentNode")),t);
},
children:function(t){
return m(this.map(function(){
return d(this);
}),t);
},
contents:function(){
return this.map(function(){
return $.call(this.childNodes);
});
},
siblings:function(t){
return m(this.map(function(t,n){
return P.call(d(n.parentNode),function(t){
return t!==n;
});
}),t);
},
empty:function(){
return this.each(function(){
this.innerHTML="";
});
},
pluck:function(t){
return C.map(this,function(n){
return n[t];
});
},
show:function(){
return this.each(function(){
"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName));
});
},
replaceWith:function(t){
return this.before(t).remove();
},
wrap:function(t){
var e=n(t);
if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;
return this.each(function(n){
C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i);
});
},
wrapAll:function(t){
if(this[0]){
C(this[0]).before(t=C(t));
for(var n;(n=t.children()).length;)t=n.first();
C(t).append(this);
}
return this;
},
wrapInner:function(t){
var e=n(t);
return this.each(function(n){
var i=C(this),r=i.contents(),o=e?t.call(this,n):t;
r.length?r.wrapAll(o):i.append(o);
});
},
unwrap:function(){
return this.parent().each(function(){
C(this).replaceWith(C(this).children());
}),this;
},
clone:function(){
return this.map(function(){
return this.cloneNode(!0);
});
},
hide:function(){
return this.css("display","none");
},
toggle:function(t){
return this.each(function(){
var n=C(this);
(t===x?"none"==n.css("display"):t)?n.show():n.hide();
});
},
prev:function(t){
return C(this.pluck("previousElementSibling")).filter(t||"*");
},
next:function(t){
return C(this.pluck("nextElementSibling")).filter(t||"*");
},
html:function(t){
return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(n){
var e=this.innerHTML;
C(this).empty().append(v(this,t,n,e));
});
},
text:function(t){
return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){
this.textContent=t===x?"":""+t;
});
},
attr:function(t,n){
var e;
return"string"==typeof t&&n===x?0==this.length||1!==this[0].nodeType?x:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:this.each(function(e){
if(1===this.nodeType)if(r(t))for(E in t)y(this,E,t[E]);else y(this,t,v(this,n,e,this.getAttribute(t)));
});
},
removeAttr:function(t){
return this.each(function(){
1===this.nodeType&&y(this,t);
});
},
prop:function(t,n){
return t=G[t]||t,n===x?this[0]&&this[0][t]:this.each(function(e){
this[t]=v(this,n,e,this[t]);
});
},
data:function(t,n){
var e=this.attr("data-"+t.replace(R,"-$1").toLowerCase(),n);
return null!==e?w(e):x;
},
val:function(t){
return 0===arguments.length?this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){
return this.selected;
}).pluck("value"):this[0].value):this.each(function(n){
this.value=v(this,t,n,this.value);
});
},
offset:function(t){
if(t)return this.each(function(n){
var e=C(this),i=v(this,t,n,e.offset()),r=e.offsetParent().offset(),o={
top:i.top-r.top,
left:i.left-r.left
};
"static"==e.css("position")&&(o.position="relative"),e.css(o);
});
if(0==this.length)return null;
var n=this[0].getBoundingClientRect();
return{
left:n.left+window.pageXOffset,
top:n.top+window.pageYOffset,
width:Math.round(n.width),
height:Math.round(n.height)
};
},
css:function(n,e){
if(arguments.length<2){
var i=this[0],r=getComputedStyle(i,"");
if(!i)return;
if("string"==typeof n)return i.style[T(n)]||r.getPropertyValue(n);
if(s(n)){
var o={};
return C.each(s(n)?n:[n],function(t,n){
o[n]=i.style[T(n)]||r.getPropertyValue(n);
}),o;
}
}
var u="";
if("string"==t(n))e||0===e?u=l(n)+":"+h(n,e):this.each(function(){
this.style.removeProperty(l(n));
});else for(E in n)n[E]||0===n[E]?u+=l(E)+":"+h(E,n[E])+";":this.each(function(){
this.style.removeProperty(l(E));
});
return this.each(function(){
this.style.cssText+=";"+u;
});
},
index:function(t){
return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0]);
},
hasClass:function(t){
return t?A.some.call(this,function(t){
return this.test(b(t));
},f(t)):!1;
},
addClass:function(t){
return t?this.each(function(n){
O=[];
var e=b(this),i=v(this,t,n,e);
i.split(/\s+/g).forEach(function(t){
C(this).hasClass(t)||O.push(t);
},this),O.length&&b(this,e+(e?" ":"")+O.join(" "));
}):this;
},
removeClass:function(t){
return this.each(function(n){
return t===x?b(this,""):(O=b(this),v(this,t,n,O).split(/\s+/g).forEach(function(t){
O=O.replace(f(t)," ");
}),void b(this,O.trim()));
});
},
toggleClass:function(t,n){
return t?this.each(function(e){
var i=C(this),r=v(this,t,e,b(this));
r.split(/\s+/g).forEach(function(t){
(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t);
});
}):this;
},
scrollTop:function(t){
if(this.length){
var n="scrollTop"in this[0];
return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){
this.scrollTop=t;
}:function(){
this.scrollTo(this.scrollX,t);
});
}
},
scrollLeft:function(t){
if(this.length){
var n="scrollLeft"in this[0];
return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){
this.scrollLeft=t;
}:function(){
this.scrollTo(t,this.scrollY);
});
}
},
position:function(){
if(this.length){
var t=this[0],n=this.offsetParent(),e=this.offset(),i=B.test(n[0].nodeName)?{
top:0,
left:0
}:n.offset();
return e.top-=parseFloat(C(t).css("margin-top"))||0,e.left-=parseFloat(C(t).css("margin-left"))||0,
i.top+=parseFloat(C(n[0]).css("border-top-width"))||0,i.left+=parseFloat(C(n[0]).css("border-left-width"))||0,
{
top:e.top-i.top,
left:e.left-i.left
};
}
},
offsetParent:function(){
return this.map(function(){
for(var t=this.offsetParent||L.body;t&&!B.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;
return t;
});
}
},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){
var n=t.replace(/./,function(t){
return t[0].toUpperCase();
});
C.fn[t]=function(r){
var o,s=this[0];
return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){
s=C(this),s.css(t,v(this,r,n,s[t]()));
});
};
}),F.forEach(function(n,e){
var i=e%2;
C.fn[n]=function(){
var n,r,o=C.map(arguments,function(e){
return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e);
}),s=this.length>1;
return o.length<1?this:this.each(function(t,n){
r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null,o.forEach(function(t){
if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();
N(r.insertBefore(t,n),function(t){
null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML);
});
});
});
},C.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){
return C(t)[n](this),this;
};
});
for(var K in C.fn)X.Z[K]=C.fn[K];
return X.uniq=S,X.deserializeValue=w,C.zepto=X,C;
}();
window.Zepto=t,void 0===window.$&&(window.$=t);
});define("pages/video_plugin/video_app.js",["appmsg/without_iframe/iframe_communicate.js","pages/iframe_communicate.js","pages/video_plugin/base.js","pages/loadscript.js","biz_wap/jsapi/core.js","pages/video_plugin/sha1.js","biz_common/dom/event.js","pages/app_open.js"],function(o,t,a,e){
"use strict";
function n(){
this._g={
appInfo:{},
downloadStatus:{
progress:0,
status:0,
androidDownloadId:null
}
},this._defineEvent();
}
function i(o){
if(g.loadingMd5!==!0&&"function"==typeof o.callback){
var t=d({
vid:o.vid,
id:o.id,
id_type:o.id_type,
fromId:o.fromId
});
if(t.android_md5||"android"!=g.system)return void o.callback(t);
var a=o.callbackName||"DownInfoCallback",e="https://commdata.v.qq.com/commdatav2?cmd=39&confid="+o.fromId+"&platform=aphone&callback="+a;
g.loadingMd5=!0,_({
url:e,
timeout:3e4,
callbackName:a,
callback:function(a){
g.loadingMd5=!1,a&&a.md5&&(t.android_md5=a.md5,g.android_md5=a.md5),o.callback(t);
},
onerror:function(){
g.loadingMd5=!1;
}
});
}
}
function d(o){
var t="video_id="+o.id;
return 1==o.id_type?t="cover_id="+o.id:2==o.id_type&&(t="column_id="+o.id),{
packageUrl:g.packageUrl,
packageName:g.packageName,
ios_open_url:"tenvideo2://?action=5&callback=weixin%3A%2F%2F&sender=%e5%be%ae%e4%bf%a1&"+t+"&from="+o.fromId+"&wxplugopenid="+(window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:""),
android_open_url:g.android_open_url.replace("#defaultArg#",t).replace("#fromId#",o.fromId),
wp_open_url:"",
pc_open_url:"http://v.qq.com/page/"+o.vid+".html",
wp_download_url:"",
ios_download_url:"https://itunes.apple.com/cn/app/id458318329?mt=8",
android_md5:g.android_md5,
android_download_url:"http://mcgi.v.qq.com/commdatav2?cmd=4&platform=aphone&confid="+o.fromId,
task_name:"Tencent Video",
title:"Tencent Video",
thumb_url:"http://i.gtimg.cn/qqlive/images/20150608/logo_app.png",
download_fail_callback:function(){
setTimeout(function(){
e("Failed to download Tencent Video. Check your download queue.");
},0);
},
check_downloading_callback:function(){
setTimeout(function(){
e("Downloading Tencent Video. Please wait.");
},0);
}
};
}
function r(o){
m.checkInstallState({
callback:o,
packageUrl:g.packageUrl,
packageName:g.packageName
});
}
var s=window.withoutIframe?window:window.parent.window,l=o(window.withoutIframe?"appmsg/without_iframe/iframe_communicate.js":"pages/iframe_communicate.js"),p=o("pages/video_plugin/base.js"),_=o("pages/loadscript.js"),c=o("biz_wap/jsapi/core.js"),u=o("pages/video_plugin/sha1.js"),w=o("biz_common/dom/event.js"),m=o("pages/app_open.js"),g={
debug:s.location.href.indexOf("&vconsole=1")>=0?!0:!1,
android_md5:"",
system:m.getSystemType(),
loadingMd5:!1,
packageUrl:"tenvideo2://",
packageName:"com.tencent.qqlive",
sha1_key:"e6673c1cda34653754ab03792617eda636c5ff",
android_open_url:"tenvideo2://?action=5&jumpaction=1000&sender=%e5%be%ae%e4%bf%a1&#defaultArg#&from=#fromId#&wxplugopenid="+(window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"")
};
return p.inherit(n,p.Class),n.prototype.init=function(){
this.setBlockEvt("openapp"),this._removePostmessageListener(),this._addPostmessageListener();
},n.prototype.destroy=function(){
this._removePostmessageListener();
},n.prototype._defineEvent=function(){
var o=this;
this._g._event={
txAppDownloadStatusChanged:function(t){
var a=o._g.downloadStatus,e=t.downloadStatus;
for(var n in e)a.hasOwnProperty(n)&&(a[n]=e[n]);
}
};
},n.prototype._removePostmessageListener=function(){
l.removeListener({
type:"txAppDownloadStatusChanged",
vid:this.player._o.vid,
func:this._g._event.txAppDownloadStatusChanged
});
},n.prototype._addPostmessageListener=function(){
l.addListener({
type:"txAppDownloadStatusChanged",
vid:this.player._o.vid,
func:this._g._event.txAppDownloadStatusChanged
});
},n.prototype.playerReadyHandler=function(){
var o=this,t=(this._g,this.player),a=this._getDownloadDom();
return w.tap(a.main[0],function(){
t._trigger("openapp",{
vid:t._o.vid,
id:t._o.vid,
fromId:787
});
}),r(function(t){
t&&o._setDownloadStatus({
status:2
});
}),p.BASE_BITSET;
},n.prototype.userplayHandler=function(){
var o=this._getDownloadDom();
return o.main.hide(),p.BASE_BITSET;
},n.prototype.userpauseHandler=function(){
var o=this._g;
if(this._beforeAndroidDownload(!1)!==!1){
this._setDownloadStatus({
progress:0
}),o.downloadTimeoutId&&window.clearTimeout(o.downloadTimeoutId);
var t=this._getDownloadDom();
t.main.show(),this._showDownloadStatus();
}
return p.BASE_BITSET;
},n.prototype.openappHandler=function(){
var o=arguments[1],t=this,a=this.player,e=this._g,n=o.id,d=o.id,r=o.id_type,l=o.alginfo,p=o.pc_open_url,_=e.appInfo[n];
return _?(_.open(),1):(i({
vid:n,
id:d,
id_type:r,
fromId:o.fromId,
callback:function(i){
i.alginfo=l||"",i.vid=n,i.id=d,i.pc_open_url=p||"",i.id_type=r,i.fromId=o.fromId,
i.before_open_callback=function(o){
t._clearCommData(),a._trigger("beforeOpenApp",{
res:o,
instance:this
});
},i.final_fail_callback=function(){
var o=this._o.pc_open_url;
o&&(a._trigger("openAppPcUrl",{
instance:this
}),top!=window?s.location.href=o:window.location.href=o);
},i.beforeDownload=function(){
return t._beforeAndroidDownload(!0);
},i.download_start_callback=function(){
t._androidDownloadStart(this._o);
},i.download_complete_callback=function(){
t._androidDownloadComplete();
},i.download_fail_callback=function(){
t._androidDownloadFail(!0);
},i.download_remove_callback=function(){
t._androidDownloadFail(!1);
},i.check_downloading_callback=function(o){
t._androidDownloading(o,!0);
},e.appInfo[n]=new m.create(i),e.appInfo[n].open();
}
}),1);
},n.prototype._writeCommData=function(o){
var t="video_id="+o.id;
1==o.id_type?t="cover_id="+o.id:2==o.id_type&&(t="column_id="+o.id);
var a=new u("SHA-1","TEXT",{
numRounds:1
}),e={
report_id:123,
from:"微信",
start_time_stamp:+new Date,
validate_time_interval:6e5,
action_url:g.android_open_url.replace("#defaultArg#",t).replace("#fromId#",o.fromId)
};
e=JSON.stringify(e),a.update(e+g.sha1_key);
var n=a.getHash("HEX"),i=JSON.stringify({
open_launch_config:{
content:e,
sha1:n
}
});
!!g.debug&&s.console.log("data:"+i),this._writeCommDataJsapi({
data:i
});
},n.prototype._clearCommData=function(){
this._writeCommDataJsapi({
data:""
});
},n.prototype._writeCommDataJsapi=function(o){
c.invoke("writeCommData",{
packageName:g.packageName,
data:o.data||""
},function(t){
!!g.debug&&s.console.log("writeCommData res:"+JSON.stringify(t)),/:ok$/.test(t.err_msg)?"function"==typeof o.onSuccess&&o.onSuccess():"function"==typeof o.onError&&o.onError();
});
},n.prototype._androidDownloadFail=function(o){
this._clearCommData(),this._stopDownloadBar(),o===!0&&setTimeout(function(){
e("Failed to download Tencent Video. Check your network or try again later.");
},0);
},n.prototype._stopDownloadBar=function(){
this._setDownloadStatus({
status:0,
androidDownloadId:null,
progress:0
}),this._resetDownloadBar(!1);
},n.prototype._androidDownloadComplete=function(){
this._completeDownloadBar();
},n.prototype._resetDownloadBar=function(o){
var t=this._g;
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId);
var a=this._getDownloadDom();
this._updateDownloadBar(),o?a.main.show():a.main.hide(),this._showDownloadStatus();
},n.prototype._downloadProgressTimeout=function(){
var o=this,t=this._g;
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId),t.downloadTimeoutId=setTimeout(function(){
var t=o._getDownloadStatus();
if(1*t.status===1){
var a=Math.min(t.progress+5,90);
o._updateDownloadBar(a),o._downloadProgressTimeout();
}else 1*t.status===2?o._completeDownloadBar():o._resetDownloadBar(!1);
},500);
},n.prototype._startDownloadBar=function(){
this._setDownloadStatus({
status:1
}),this._resetDownloadBar(!0),this._downloadProgressTimeout();
},n.prototype._androidDownloadStart=function(o){
this._setDownloadStatus({
progress:0,
androidDownloadId:o.id
}),this._startDownloadBar(),this._writeCommData(o);
},n.prototype._beforeAndroidDownload=function(o){
var t=this._getDownloadStatus();
return 1*t.status===1?(this._androidDownloading(t.androidDownloadId,o),!1):1*t.status===2?(this._completeDownloadBar(o),
!1):void 0;
},n.prototype._completeDownloadBar=function(o){
var t=this._g,a=this._getDownloadStatus();
a.androidDownloadId&&o?m.install(a.androidDownloadId):o&&e("Tencent Video downloaded. Check your downloads and install it."),
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId),this._updateDownloadBar(100),
this._setDownloadStatus({
status:2
});
var n=this._getDownloadDom();
n.main.show(),this._showDownloadStatus();
},n.prototype._showDownloadStatus=function(o){
var t=this._getDownloadStatus();
o=o||this._getDownloadDom(),0==t.status?(o.progress_main.hide(),o.download_btn.show().find(".js_download_text").text("Download"),
o.main.find(".js_installStatus").text("Install"),o.suc_main.hide()):1==t.status?(o.progress_main.show(),
o.main.find(".js_installStatus").text("Install"),o.download_btn.hide(),o.suc_main.hide()):2==t.status&&(o.progress_main.hide(),
o.download_btn.show().find(".js_download_text").text("Open"),o.main.find(".js_installStatus").text("Open"),
o.suc_main.show());
},n.prototype._updateDownloadBar=function(o){
var t=this._getDownloadDom(),a=o||this._getDownloadStatus().progress||0;
this._setDownloadStatus({
progress:a
}),t.progress.css({
width:a+"%"
}),t.progress_text.text(a+"%");
},n.prototype._getDownloadDom=function(){
return this.player._trigger("getAppDownloadDom");
},n.prototype._androidDownloading=function(o,t){
t&&e("Downloading Tencent Video. Please wait."),this._startDownloadBar();
},n.prototype._setDownloadStatus=function(o){
l.broadcastMessage({
type:"txAppDownloadStatusChanged",
data:{
downloadStatus:o
}
});
},n.prototype._getDownloadStatus=function(){
return this._g.downloadStatus;
},n;
});define("pages/video_plugin/pause_tips.js",["pages/video_plugin/base.js"],function(s){
"use strict";
function e(){
this._g={};
}
var n=s("pages/video_plugin/base.js");
return n.inherit(e,n.Class),e.prototype.hidePauseTipsHandler=function(){
this.getDownloadDom().main.hide();
},e.prototype.getAppDownloadDomHandler=function(){
var s=(this._g,this),e=this.player,i=e._g.myPlayer;
return i&&!i.isEnd()?{
data:s.getDownloadDom(),
code:7
}:n.BASE_BITSET;
},e.prototype.getDownloadDom=function(){
var s=$("#ing_download_"+this.player._g.myPlayer.id),e={
main:s,
progress_main:s.find(".js_progress_main"),
download_btn:s.find(".js_download_btn"),
progress_text:s.find(".js_progress_text"),
suc_main:s.find(".js_suc_main"),
progress:s.find(".js_progress"),
suc_text:s.find(".js_suc_text")
};
return e;
},e;
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);
}
return e;
};
define("pages/qq_video_info.js",["biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_wap/ui/weui.js","biz_common/utils/string/html.js","a/a_utils.js","appmsg/without_iframe/iframe_communicate.js","pages/iframe_communicate.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","pages/loadscript.js","pages/video_plugin/video_monitor.js","biz_wap/utils/localstorage.js","biz_wap/utils/storage.js","pages/version4video.js","biz_common/dom/event.js","pages/report.js","new_video/plugin/proxy.js","new_video/plugin/ad.js","new_video/plugin/danmu.js","new_video/player.js","new_video/ctl.js","biz_common/tmpl.js","pages/video_error.html.js","pages/create_txv.js","biz_wap/utils/jsmonitor_report.js","biz_wap/jsapi/leaveReport.js","biz_wap/jsapi/log.js"],function(e){
"use strict";
function t(){
return new Promise(function(e){
D.invoke("getNetworkType",{},function(t){
e(t),Q.networkType=K[t.err_msg]||"fail",("network_type:edge"==t.err_msg||"network_type:wwan"==t.err_msg)&&(t.detailtype||t.subtype)&&(Q.networkType=t.detailtype||t.subtype);
});
});
}
function i(){
U.on(window,"load",function(){
if(window.__wxjs_is_wkwebview){
Q.videoDataLs=new C("video_report_11949");
var e=Q.videoDataLs.getData();
for(var t in e){
var i=+new Date;
i-(e[t].exp-Q.videoDataLsExpTime)>6e4&&(V.videoreport({
data:e[t].val,
async:!0
}),Q.videoDataLs.remove(t));
}
Q.neeedTimoutSaveReportData=!0;
}else Q.neeedTimoutSaveReportData=!1;
});
var e=function(){
if(!Q.hasLeaveReport){
Q.hasLeaveReport=!0;
for(var e=0;e<Q.videoInstance.length;e++){
var t=Q.videoInstance[e];
t.mpVideoReport(),t.destroy();
}
}
};
window.top===window&&G.addReport(e),window.top===window&&G.addSpecificReport("native_data",function(){
var e=Q.videoInstance[0];
return e?{
video_data:{
vid:e._o.vid,
lastPlayedTime:e._g.myPlayer&&e._g.myPlayer.getCurTime(),
lastPlayedTimeExpiredTime:(Date.now()+Q.cacheTime)/1e3
}
}:{};
}),U.on(window,"unload",e);
}
function o(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
this._o={
bizUserName:"",
bizNickName:"",
videoTitle:"",
headImgUrl:"",
jsapiFullScreen:!0,
canShareVideo:!0,
videoMd5:"",
pauseShowControll:!0,
preview:!1,
isInIframe:!1,
fromid:0,
ori_status:3,
is_mp_video:0,
plugins:[],
oriVid:"",
vid:"",
ckey:"",
ckey_ad:"",
width:0,
height:0,
container:"",
autoplay:!1,
loop:!1,
resume:Q.resume,
__biz:"",
uin:"",
mid:"",
idx:"",
comment_id:"",
scene_type:0,
hit_bizuin:"",
hit_vid:"",
totalRange:10,
noAd:!1,
isVideoSharePage:!1,
useWcSlPlayer:!1,
useDanmu:!1,
auto:{
loadRetryTime:0,
isShowTip:!1,
isChangeAuto:!1,
isShowSuc:!1
},
onReady:function(){},
onUserplay:function(){}
},this.cgiData=_extends({},window.cgiData,t),w(this._o,e),(!Q.isWechat||!Q.isIOS&&!Q.isAndroid||Q.isIOS&&I.ltVersion("7.0.9",!1)||Q.isAndroid&&I.ltVersion("7.0.10",!1)||I.isInMiniProgram||!this._o.videoMd5)&&(this._o.jsapiFullScreen=!1,
this._o.canShareVideo=!1),this._o.is_mp_video||this._o.useWcSlPlayer||(this._o.pauseShowControll=!1),
!this._o.headImgUrl&&this._o.jsapiFullScreen&&Q.isAndroid&&(this._o.headImgUrl="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
this._o.oriVid=this._o.oriVid||this._o.vid,1!=this._o.ori_status&&2!=this._o.ori_status&&(this._o.ori_status=3),
this._init({
noProxy:this._o.useWcSlPlayer
}),"number"==typeof this._o.leaveReport12710Type&&this._leaveReport12710();
}
function r(e){
function t(o){
var r=Math.floor(Math.max(o.width,o.height));
if(r>3841)switch(1*o.format_id){
case 10002:
o=e.url_info[i["480p"].index],H.setSum(27302,6,1),t(o);
break;

case 10003:
o=e.url_info[i["270p"].index],H.setSum(27302,7,1);
}
return o;
}
for(var i={},o=0;o<e.url_info.length;o++){
var r=e.url_info[o];
switch(1*r.format_id){
case 20003:
Q.isWechat&&Q.isAndroid&&I.gtVersion("7.0.16",1)&&(i["1080p"]={
index:o
});
break;

case 10002:
i["720p"]={
index:o
};
break;

case 10003:
i["480p"]={
index:o
};
break;

case 10004:
i["270p"]={
index:o
};
}
}
var a=void 0;
if(Q.playerStatus&&Q.playerStatus.formatId&&1*e.is_mp_video_urgent_state!==1)switch(1*Q.playerStatus.formatId){
case 10002:
i["720p"]&&(a=e.url_info[i["720p"].index]);
break;

case 10003:
i["480p"]&&(a=e.url_info[i["480p"].index]);
break;

case 10004:
i["270p"]&&(a=e.url_info[i["270p"].index]);
}
a||(1*e.is_mp_video_urgent_state===1?i["270p"]?a=e.url_info[i["270p"].index]:i["480p"]&&(a=e.url_info[i["480p"].index]):Q.isPc||"wifi"==Q.networkType?i["720p"]?a=e.url_info[i["720p"].index]:i["480p"]&&(a=e.url_info[i["480p"].index]):i["480p"]?a=e.url_info[i["480p"].index]:i["720p"]&&(a=e.url_info[i["720p"].index])),
a||(a=e.url_info[0]),a=t(a);
var n=Math.floor(a.duration_ms/1e3),s=(parseFloat(a.filesize)/1024/1024).toFixed(2),d=window.biz;
return d||window.cgiData&&window.cgiData.__biz&&(d=window.cgiData.__biz),{
formatid:a.format_id,
time:n,
title:a.title||"",
width:a.width,
height:a.height,
file_size:a.filesize,
totalUrl:a.url+"&spec_id="+encodeURIComponent(d)+parseInt(+new Date/1e3,10),
rate:Math.round(a.filesize/1024*8/n),
flow:s,
ori_url_info:e.url_info
};
}
function a(e){
function t(){
S({
type:"GET",
dataType:"json",
timeout:3e4,
url:s,
success:function(e){
if(e&&e.base_resp&&0==e.base_resp.ret){
var t="",i=void 0;
if(e.is_mp_video_delete?(t="This video has been deleted by the publisher.",i=72):e.is_mp_video_forbid?(t="This video has been removed due to a violation of the terms of service.",
i=73):1*e.is_mp_video_transing===1?(t="正在转码，转码完成后可播放",i=78):e.is_mp_video_checking?(t="Under Review",
i=75):e.is_mp_video_check_fail?(t="Verification failed",i=76):1*e.is_appmsg_unauthorized===1&&(t="This video is not authorized for use. Unable to watch.",
i=77),t&&"undefined"!=typeof i)return void a({
err_msg:t,
code:i
});
if(e.url_info&&e.url_info.length>0)return void o({
data:r(e)
});
a({
err_msg:F,
code:71
});
}else a({
err_msg:"Unable to watch this video as it does not exist.",
code:74
});
},
error:function(e){
var t=void 0;
t=e?e.status>=200&&e.status<400?81:e.status>=400&&e.status<500?82:e.status>=500&&e.status<600?83:0==e.status&&4==e.readyState?84:85:80,
a({
err_msg:F,
code:t
});
}
});
}
var i=e.retry||1,o="function"==typeof e.onSuccess?e.onSuccess:function(){},a=function(o){
return o&&o.code>=80&&o.code<=85&&i>0?(i--,void t()):void("function"==typeof e.onError&&e.onError(o));
},s=["/mp/videoplayer?action=get_mp_video_play_url","&preview=",e.preview?"1":"0","&__biz=",e.__biz,"&mid=",e.mid,"&idx=",e.idx,"&vid=",e.vid,e.auto?"&isauto=true":""].join("");
n(t);
}
function n(e){
window.networkType||Q.networkType||Q.isPc?e():Y?D.invoke("getNetworkType",{},function(t){
Q.networkType=K[t.err_msg]||"fail",("network_type:edge"==t.err_msg||"network_type:wwan"==t.err_msg)&&(t.detailtype||t.subtype)&&(Q.networkType=t.detailtype||t.subtype),
e();
}):e();
}
function s(e){
function t(){
M({
url:i,
timeout:3e4,
callbackName:"video_dynamic_callback",
callback:function(t){
var i=+new Date,r=i-o;
t=t||{},"undefined"==typeof t.em&&(t.em=0);
var a=t.em,n=void 0;
if(!R.getQuery("channel_session_id")||61!==t.em&&62!==t.em||S({
type:"POST",
dataType:"json",
timeout:3e4,
url:"/mp/videochannel_profile_page",
data:{
action:"report_tx_video",
vid:e.vid,
status:t.em
},
success:function(e){
console.log(e);
}
}),0==t.em){
if(t.exem>0?a=-4:0==t.exem&&t.vl&&t.vl.vi&&t.vl.vi[0]&&8==t.vl.vi[0].st&&(a=t.preview>0?-5:-3),
0!=a||t.vl&&t.vl.vi&&t.vl.vi[0]||(a=-2),0==a){
var s=t.vl.vi[0];
if(n={
newVid:s.lnk,
time:Math.floor(s.td),
title:s.ti,
width:s.vw,
height:s.vh,
file_size:s.fs,
rate:Math.round(s.fs/1024*8/s.td),
flow:(parseFloat(s.fs)/1024/1024).toFixed(2)
},s.ul&&s.ul.ui&&s.ul.ui[0]){
var _=s.ul.ui[0],c=_.url+s.fn,p=t.fl,u="";
if(p&&p.cnt>0){
for(var g=p.fi,l={},h=0;h<g.length;h++){
var v=g[h];
switch(v.name){
case"msd":
l["270P"]={
index:h
};
break;

case"mp4":
l["480p"]={
index:h
};
}
var f;
Q.isPc||"wifi"==Q.networkType?l["480p"]?f=g[l["480p"].index]:l["270P"]&&(f=g[l["270P"].index]):l["270P"]?f=g[l["270P"].index]:l["480p"]&&(f=g[l["480p"].index]),
f||(f=g[0]),n.formatid=f.id,u=f.name,n.resolution=(f.cname||"").replace(/^.*;\((:?.*)P\)$/,"$1")||0;
}
n.format=u,n.vt=_.vt,n.totalUrl=[c,-1!=c.indexOf("?")?"&":"?","vkey=",s.fvkey,"&sdtfrom=",V.getsdtfrom(),"&type=",1==_.dt?"tflv":2==_.dt||0==_.dt?"mp4":"","&platform=",V.getPlatformType(),"&fmt=",u,"&level=",s.level,"&br=",s.br,"&sp=",s.sp].join("");
}else a=-2;
}
}
0==a?(V.getinfoReport({
vid:e.vid,
val:r,
val1:a,
vurl:n.totalUrl
}),e.onSuc({
data:n,
oriData:t,
c_time:r,
ret_code:a
})):(V.getinfoReport({
vid:e.vid,
val:r,
val1:a,
vurl:""
}),e.onError(-2,{
ret_code:a,
c_time:r,
err_msg:d(1*a,1*t.exem,t)
}));
}else e.onError(a,{
ret_code:a,
c_time:r,
err_msg:d(a)
});
},
onerror:function(t){
var i=void 0,r=+new Date,a=r-o;
switch(1*t){
case 400:
i=-22;
break;

case 500:
i=-21;
break;

default:
i=-23;
}
"function"==typeof e.onError&&e.onError(i,{
ret_code:i,
c_time:a,
err_msg:d(-1)
}),V.getinfoReport({
vid:e.vid,
val:a,
val1:i,
vurl:""
});
}
});
}
var i="https://h5vv6.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=#sdtfrom#";
i=i.replace("#vid#",e.vid).replace("#ckey#",e.ckey).replace("#sdtfrom#",V.getsdtfrom()),
i=i+"&device="+V.getPlatformType()+"&use_proxy_sdk="+(z.isUseProxy()?1:0);
var o=+new Date;
n(t);
}
function d(e,t){
var i="";
switch(1*e){
case-4:
i="Unable to play due to copyright restrictions.";
break;

case-5:
i="Unable to play due to copyright restrictions.";
break;

case-3:
i="Unable to play due to copyright restrictions.";
break;

case 61:
i="Unable to watch this video as it does not exist.";
break;

case 62:
i="Unable to watch this video as it has been removed.";
break;

case 63:
i="Failed to load video. Unable to watch.";
break;

case 65:
i="Failed to load video. Unable to watch.";
break;

case 67:
i="Failed to load video. Unable to watch.";
break;

case 69:
i="The video format does not support mobile devices. Watch it on a computer instead.";
break;

case 71:
i="Failed to load video. Unable to watch.";
break;

case 73:
i="Failed to load video. Unable to watch.";
break;

case 74:
i="Failed to load video. Unable to watch.";
break;

case 80:
switch(1*t){
case 1:
i="Unfortunately, this video is not supported in your region.";
break;

case 2:
i="Unable to play due to copyright restrictions.";
break;

default:
i="Unable to play due to copyright restrictions.";
}
break;

case 81:
i="Failed to load video. Unable to watch.";
break;

case 82:
i="Failed to load video. Unable to watch.";
break;

case 83:
switch(1*t){
case-1:
i=F;
break;

case-2:
i="Unable to play due to copyright restrictions.";
break;

default:
i="Paid video. Open Tencent Video to watch it.";
}
break;

case 84:
i="Unfortunately, this video cannot be played in your region.";
break;

default:
i=F;
}
return i;
}
function _(e){
var t="https://h5vv.video.qq.com/getextinfo?otype=json&callback=video_static_callback&vid="+e.vid;
M({
url:t,
timeout:3e4,
callbackName:"video_static_callback",
callback:function(t){
if(!t||"o"!=t.s||t.vl.cnt<=0)return void("function"==typeof e.onError&&e.onError(-1));
var i=t.vl.vi[0],o={
title:i.title||"Video",
desc:1*i.desc===0?"":i.desc||"",
director:i.director||"",
leading_actor:i.leading_actor||"",
costar:i.costar||"",
time:Math.floor(i.td)||0
};
if(i.pl&&i.pl.cnt>0){
var r=i.pl.pi;
o.p400_300=r[0]?r[0].url:"",o.p140_100=r[1]?r[1].url:"",o.p120_90=r[2]?r[2].url:"",
o.p400_300=o.p400_300&&-1==o.p400_300.indexOf("http")?"http://"+o.p400_300:o.p400_300,
o.p140_100=o.p140_100&&-1==o.p140_100.indexOf("http")?"http://"+o.p140_100:o.p140_100,
o.p120_90=o.p120_90&&-1==o.p120_90.indexOf("http")?"http://"+o.p120_90:o.p120_90;
}
e.onSuc(o);
},
onerror:function(t){
"function"==typeof e.onError&&e.onError(t);
}
});
}
function c(e){
for(var t=1e8,i=0,o=0,r=e.length;r>o;o++)i=(i<<5)+i+e.charCodeAt(o);
return i%t;
}
function p(e,t,i){
return i?"/mp/videoplayer?action=get_mp_video_cover&vid="+e:location.protocol+"//puui.qpic.cn/qqvideo/0/"+e+"/0";
}
function u(e,t,i,o){
var r=j.get(Q.cachekey+o);
if(!r)return null;
try{
if(r=JSON.parse(r)||{},!r.time||Date.now()-Q.cacheTime>1*r.time)return f(o),r.videoInfo={
status:g(e,t,i,o)
},r;
}catch(a){
return f(o),null;
}
return r=r.videoInfo?r:{
videoInfo:{}
},r.videoInfo.status=g(e,t,i,o),r.videoInfo?r:null;
}
function g(e,t,i,o){
var r=j.get(Q.cachekey+e+t+i+o);
if(!r)return null;
try{
r=JSON.parse(r)||{};
}catch(a){
return m(e,t,i,o),null;
}
return r;
}
function l(){
var e=j.get(Q.cachekey+"playerStatus");
if(e){
try{
e=JSON.parse(e)||{};
}catch(t){
return void f("playerStatus");
}
e.playerStatus&&(Q.playerStatus=e.playerStatus,console.log("get player status cache",Q.playerStatus));
}
}
function h(e,t,i,o,r,a){
var n={
dynamicData:r.dynamicData||null,
coverUrl:r.coverUrl||""
};
j.set(Q.cachekey+o,JSON.stringify({
time:a||Date.now(),
videoInfo:n
})),r.status&&j.set(Q.cachekey+e+t+i+o,JSON.stringify(r.status));
}
function v(){
j.set(Q.cachekey+"playerStatus",JSON.stringify({
playerStatus:Q.playerStatus
}));
}
function f(e){
j.remove(Q.cachekey+e);
}
function m(e,t,i,o){
j.remove(Q.cachekey+e+t+i+o);
}
function y(e){
return document.getElementById(e);
}
function w(e,t){
for(var i in t)e[i]=t[i];
}
function b(){
t(),i(),l();
}
var k=window.withoutIframe?window:window.parent.window;
-1!=location.href.indexOf("__td=qq.com")&&(document.domain="qq.com"),e("biz_wap/zepto/zepto.js"),
e("biz_wap/zepto/event.js"),e("biz_wap/zepto/touch.js"),e("biz_wap/ui/weui.js"),
e("biz_common/utils/string/html.js");
var P=e("a/a_utils.js"),T=e(window.withoutIframe?"appmsg/without_iframe/iframe_communicate.js":"pages/iframe_communicate.js"),D=e("biz_wap/jsapi/core.js"),I=e("biz_wap/utils/mmversion.js"),R=e("biz_common/utils/url/parse.js"),S=e("biz_wap/utils/ajax.js"),M=e("pages/loadscript.js"),x=e("pages/video_plugin/video_monitor.js"),j=e("biz_wap/utils/localstorage.js"),C=e("biz_wap/utils/storage.js"),z=e("pages/version4video.js"),U=e("biz_common/dom/event.js"),V=e("pages/report.js"),E=e("new_video/plugin/proxy.js"),L=e("new_video/plugin/ad.js"),O=e("new_video/plugin/danmu.js"),A=e("new_video/player.js"),q=e("new_video/ctl.js"),B=e("biz_common/tmpl.js"),W=e("pages/video_error.html.js"),F="Unable to load video. Refresh page to retry.",N=e("pages/create_txv.js"),H=e("biz_wap/utils/jsmonitor_report.js"),G=e("biz_wap/jsapi/leaveReport.js"),J=e("biz_wap/jsapi/log.js"),Q={
isUseProxy:z.isUseProxy(),
isWechat:I.isWechat,
isAndroid:I.isAndroid,
isIOS:I.isIOS,
isGoTx:k.location.href.indexOf("&_gotx=1")>0,
_debug:k.location.href.indexOf("&vconsole=1")>0,
cachekey:"qqmovieStatus_",
videoDataLs:null,
videoDataLsExpTime:864e7,
cacheTime:6e5,
videoInfo:{},
videoInstance:[],
neeedTimoutSaveReportData:!0,
networkType:"",
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
hasLeaveReport:!1,
playerStatus:{
formatId:null
}
},K={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
b(),o.prototype._init=function(e){
function i(){
try{
if(window.withoutIframe){
for(var e=k.document.getElementsByClassName("video_iframe"),t=0;t<e.length;t++)if(n._o.vid===e[t].getAttribute("vid")&&e[t].adVidFromAppmsg)return!0;
}else for(var e=k.document.getElementsByTagName("iframe"),t=0;t<e.length;t++)if(window===e[t].contentWindow&&e[t].adVidFromAppmsg||e[t].adVidFromAppmsg===window.realVid&&window.realVid)return!0;
}catch(i){}
}
var o=this;
e=e||{},this.destroy(),Q.videoInstance.push(this),this._report=V.getVideoReportData(),
this._g={
gWidth:e.gWidth||this._o.width,
gHeight:e.gHeight||this._o.height,
playRangeInfo:[],
dynamicErrMsg:"",
hasReportProxyError:e.hasReportProxyError===!0,
noProxy:e.noProxy===!0,
hasDestroy:!1,
reportDataTimeoutId:null,
reportDataLsKey:this._o.vid+"_"+Math.random(),
hasReport:!1,
isShowTx:!1,
dataCount:0,
targetDataCount:2,
coverUrl:"",
cacheStartTs:0,
vInfo:{
status:null,
coverUrl:"",
dynamicData:null,
is_report_pv:!1
},
dom:{
page_content:y("page-content"),
js_mpvedio:y("js_mpvedio")
},
initialData:null
},this._getRatio(),this._initPlugins(e),this._initReportData(),this._defineEvent(),
P.report115849(71);
var r=setInterval(function(){
i()&&(P.report115849(75),P.report115849(76),clearInterval(r));
},500);
if(this._isGotoTx()===!0)return void P.report115849(70);
this._getCache(),window.__timelineInitialData?(this._g.initialData=window.__timelineInitialData,
this._setCoverUrl()):this._setCoverUrl(),this._cacheOnPageInvisible();
var a=setInterval(function(){
i()&&(P.report115849(83),P.report115849(84),clearInterval(a));
},500);
this._reportH265VideoSupport();
var n=this;
z.isUseAd()&&this._o.noAd!==!0&&(this._g.myAdPlugin=new L({
fromid:this._o.fromid,
videoReportType:this.getReportTypeBySceneType(),
isMpVideo:n._o.is_mp_video,
vid:this._o.vid,
ratio:this._o.ratio,
oriVid:this._o.oriVid,
tmpGetAd:function(e,t){
s({
vid:"b0163rzlnn7",
ckey:n._o.ckey_ad,
onSuc:function(t){
e&&e(t);
},
onError:function(){
t&&t();
}
});
}
})),this._cacheReportData();
var d=!1;
"undefined"!=typeof Promise&&(d=!0),Q.isWechat&&!Q.networkType&&Q.playerStatus&&!Q.playerStatus.formatId&&d?(t().then(function(){
o._getDynamic();
}).catch(function(){
o._getDynamic();
}),setTimeout(function(){
o.hasInitNetwork||o._getDynamic();
},5e3)):this._getDynamic();
},o.prototype._getRatio=function(){
for(var e=this._o.width/this._o.height,t=[4/3,16/9],i=t[0],o=Math.abs(i-e),r=1,a=t.length;a>r;r++){
var n=Math.abs(t[r]-e);
o>n&&(o=n,i=t[r]);
}
this._o.ratio=i;
},o.prototype._isGotoTx=function(){
var e=this,t=this._o;
if((!t.ckey||Q.isGoTx)&&!t.is_mp_video){
e._g.isShowTx=!0;
var i=$(this._o.container),o=i.attr("id");
o||(o="js_tx_video_container_"+Math.random(),i.attr("id",o)),N.createTxVideo({
win:window,
containerId:o,
vid:t.vid,
width:e._g.gWidth,
height:e._g.gHeight,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(t){
e._g.txPlayer=t.player,e._g.dataCount=e._g.targetDataCount,e.videoDataReady();
},
onError:function(){}
});
var r=this._g.monitorUid;
if(1==window.is_login)this._trigger("setMonitor",r,{
38:1
});else if(this._trigger("setMonitor",r,{
39:1
}),1===k.is_login){
var a=JSON.stringify({
tag:"video_player_login_status",
uin:window.user_uin,
bizUin:encodeURIComponent(t.__biz),
appmsgBizUin:encodeURIComponent(k.biz),
appmsgUserUin:k.user_uin,
isSecOpen:!!k.__second_open__
});
H.setLogs({
id:115849,
key:73,
value:1,
lc:1,
log0:a
});
}
return this._trigger("sendMonitor",r),!0;
}
return!1;
},o.prototype._reportH265VideoSupport=function(){
var e=this._g.monitorUid2;
this._trigger("setMonitor",e,{
36:1
});
var t=document.createElement("video");
if("function"==typeof t.canPlayType){
var i=t.canPlayType('video/mp4; codecs="hevc"');
("maybe"==i.toLowerCase()||"probably"==i.toLowerCase())&&this._trigger("setMonitor",e,{
37:1
});
}
this._trigger("sendMonitor",e);
},o.prototype._initPlugins=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.hasInitPlugins){
var t=this._o.plugins||[];
t.push(new x),this._blockPlugin={};
for(var i=0,o=t.length;o>i;++i){
var r=t[i];
r.setPlayer(this),!!r.init&&r.init();
}
this.plugins=t;
}
},o.prototype.isInFullScreen=function(){
return this._g.myPlayer?this._g.myPlayer.isInFullScreen():!1;
},o.prototype._initReportData=function(){
var e=this._report,t=this._o;
e.mid=t.mid,e.__biz=t.__biz,e.idx=t.idx,e.vid=t.vid,e.commentid=t.comment_id,e.scene_type=t.scene_type,
e.auto_play=t.autoplay?1:0,e.fromid=t.fromid,e.hit_bizuin=t.hit_bizuin,e.hit_vid=t.hit_vid,
this._g.monitorUid=this._trigger("initMonitor",64728),this._g.monitorUid2=this._trigger("initMonitor",110644);
},o.prototype._initPlayRangeInfo=function(e){
function t(e,t){
for(var i=[{
start:0,
end:e,
hasReport:!1
}];;){
var o=i[i.length-1];
if(o.end>=t)break;
i.push({
start:o.end,
end:o.end+e,
hasReport:!1
});
}
return i;
}
if(!(e.durationMs<=0)){
var i=this._o.totalRange;
this._g.playRangeInfo=1e3*i>=e.durationMs?t(1e3,e.durationMs):t(Math.ceil(e.durationMs/i),e.durationMs);
}
},o.prototype._reportCurRangeInfo=function(e){
var t=this._g.playRangeInfo;
if(t&&0!==t.length)for(var i=t.length,o=this._o,r=0;i>r;r++){
var a=t[r];
if(a.start<e.curTime&&a.end>=e.curTime){
a.hasReport||(a.hasReport=!0,q.report({
step:14,
vid:o.vid,
hit_bizuin:o.hit_bizuin,
hit_vid:o.hit_vid,
traceid:this._getTraceId(),
orderid:this._getOrderid(),
ori_status:this._getOriStatus(),
type:this.getReportTypeBySceneType(),
fromid:this._getFromid(),
total_range:i,
current_range:r+1,
duration:this._report.duration_ms||t[i-1].end
}));
break;
}
}
},o.prototype._defineEvent=function(){
var e=this;
this._g.event={
afterRemoveLoading:function(){
e._afterRemoveLoading();
}
};
},o.prototype.videoDataReady=function(){
var e=this;
this._g.dataCount===this._g.targetDataCount&&(this._g.isShowTx?this._removeLoading():this._g.vInfo.dynamicData?this._createPlayer({
onLoaded:function(){
setTimeout(function(){
e._removeLoading();
},0);
}
}):(this._removeLoading(),J.error("qq_video_info: failed to create player because no dynamic data")));
},o.prototype._removeLoading=function(){
this._o.isInIframe?(T.addListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading,
vid:this._o.oriVid
}),T.postMessage({
type:"removeVideoLoading",
data:{
vid:this._o.oriVid
}
})):this._afterRemoveLoading();
},o.prototype._afterRemoveLoading=function(){
if(!this._g.isShowTx&&!this._g.vInfo.dynamicData)if(this._o.is_mp_video){
var e=1;
(72==this._report.videoerror||73==this._report.videoerror)&&(e=2),this._showError(this._g.dynamicErrMsg,e);
}else this._showError(this._g.dynamicErrMsg||"");
T.removeListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading
}),this._bindResize(),this._o.onReady.call(this),this._trigger("videoReady");
},o.prototype._setCoverUrl=function(){
function e(){
S({
type:"GET",
dataType:"json",
timeout:3e4,
url:a,
success:function(e){
e&&e.base_resp&&0==e.base_resp.ret&&e.url&&(i._g.coverUrl=e.url),i._g.dataCount++,
i.videoDataReady();
},
error:r
});
}
var t="";
if(this._g.initialData&&this._g.initialData.initialCover?t=this._g.initialData.initialCover:this._o.is_mp_video&&window.__mpVideoCoverUrl?t=window.__mpVideoCoverUrl:this._g.vInfo.coverUrl&&(t=this._g.vInfo.coverUrl),
t)return this._g.coverUrl=t,this._g.dataCount++,void this.videoDataReady();
if(this._g.coverUrl=this._getCover(),!this._o.is_mp_video)return this._g.dataCount++,
void this.videoDataReady();
var i=this,o=1,r=function(){
return o>0?(o--,void e()):(i._g.dataCount++,void i.videoDataReady());
},a=this._g.coverUrl+"&f=json";
e();
},o.prototype._getDynamic=function(){
var e=this,t=this._o,i=this._g;
if(e.hasInitNetwork=!0,t.is_mp_video&&window.__mpVideoTransInfo&&window.__mpVideoTransInfo.length>0)return i.dataCount++,
i.vInfo.dynamicData={
data:r({
url_info:window.__mpVideoTransInfo.map(function(e){
return e.url=e.url.htmlDecode(),e;
})
})
},void this.videoDataReady();
if(i.vInfo.dynamicData){
i.dataCount++;
var o=i.vInfo.dynamicData;
return this._report.getvinfo_ret="undefined"!=typeof o.ret_code?o.ret_code:-2,this._report.getvinfo_time=o.c_time||0,
t.is_mp_video&&o.data&&o.data.ori_url_info&&o.data.ori_url_info.length>0&&(i.vInfo.dynamicData={
data:r({
url_info:o.data.ori_url_info
})
}),void this.videoDataReady();
}
var n=this._report,d=i.monitorUid,_=i.monitorUid2;
return t.is_mp_video?void a({
preview:t.preview,
vid:t.vid,
__biz:t.__biz,
mid:t.mid,
idx:t.idx,
auto:!(!Q.isAndroid||!I.gtVersion("7.0.16",1)),
onSuccess:function(t){
e._trigger("setMonitor",_,{
4:1,
5:1
}),e._trigger("sendMonitor",_),i.dataCount++,i.vInfo.dynamicData=t,e.videoDataReady();
},
onError:function(t){
switch(e._trigger("setMonitor",_,{
4:1,
6:1
}),1*t.code){
case 80:
e._trigger("setMonitor",_,{
7:1,
24:1
});
break;

case 81:
e._trigger("setMonitor",_,{
7:1,
25:1
});
break;

case 82:
e._trigger("setMonitor",_,{
7:1,
26:1
});
break;

case 83:
e._trigger("setMonitor",_,{
7:1,
27:1
});
break;

case 84:
e._trigger("setMonitor",_,{
7:1,
28:1
});
break;

case 85:
e._trigger("setMonitor",_,{
7:1,
29:1
});
break;

case 71:
e._trigger("setMonitor",_,{
8:1
});
break;

case 72:
e._trigger("setMonitor",_,{
9:1
});
break;

case 73:
e._trigger("setMonitor",_,{
10:1
});
break;

case 74:
e._trigger("setMonitor",_,{
11:1
});
break;

case 75:
e._trigger("setMonitor",_,{
34:1
});
break;

case 76:
e._trigger("setMonitor",_,{
35:1
});
}
e._trigger("sendMonitor",_),n.videoerror=t.code,e._g.dynamicErrMsg=t.err_msg||"",
n.duration_ms=0,i.vInfo.dynamicData=null,e._g.dataCount=e._g.targetDataCount,e.videoDataReady();
}
}):void s({
vid:t.vid,
ckey:t.ckey,
onSuc:function(t){
if(e._trigger("setMonitor",d,{
10:1,
11:1,
13:Math.min(t.c_time,6e4)
}),t.data.width&&t.data.height){
var o=Math.round(10*t.data.width/t.data.height*1);
o>20?o=20:0>o&&(o=0);
var r=41+2*o,a={};
a[r]=1,e._trigger("setMonitor",d,a);
}else e._trigger("setMonitor",d,{
83:1
});
e._trigger("sendMonitor",d),i.dataCount++,i.vInfo.dynamicData=t,n.getvinfo_ret=t.ret_code,
n.getvinfo_time=t.c_time,n.file_size=t.data.file_size,n.rate=t.data.rate,n.resolution=t.data.resolution,
n.format=t.data.format,n.vt=t.data.vt,n.video_ext=V.getsdtfrom(),e.videoDataReady();
},
onError:function(t,o){
if(e._trigger("setMonitor",d,{
10:1,
12:1,
13:Math.min(o.c_time,6e4)
}),-2==t)switch(1*o.ret_code){
case-2:
e._trigger("setMonitor",d,{
17:1
}),n.videoerror=2;
break;

case-3:
e._trigger("setMonitor",d,{
40:1
}),n.videoerror=53;
break;

case-4:
e._trigger("setMonitor",d,{
109:1
}),n.videoerror=54;
break;

case-5:
e._trigger("setMonitor",d,{
110:1
}),n.videoerror=55;
break;

case 61:
e._trigger("setMonitor",d,{
18:1
}),n.videoerror=25;
break;

case 62:
e._trigger("setMonitor",d,{
19:1
}),n.videoerror=26;
break;

case 64:
e._trigger("setMonitor",d,{
20:1
}),n.videoerror=27;
break;

case 67:
e._trigger("setMonitor",d,{
21:1
}),n.videoerror=28;
break;

case 69:
e._trigger("setMonitor",d,{
22:1
}),n.videoerror=52;
break;

case 80:
e._trigger("setMonitor",d,{
23:1
}),n.videoerror=29;
break;

case 81:
e._trigger("setMonitor",d,{
24:1
}),n.videoerror=50;
break;

case 85:
e._trigger("setMonitor",d,{
25:1
}),n.videoerror=51;
break;

default:
e._trigger("setMonitor",d,{
26:1
}),n.videoerror=24;
}else{
switch(1*t){
case-22:
e._trigger("setMonitor",d,{
15:1
});
break;

case-21:
e._trigger("setMonitor",d,{
14:1
});
break;

case-23:
e._trigger("setMonitor",d,{
16:1
});
}
n.videoerror=-1*t;
}
e._trigger("sendMonitor",d),e._g.dynamicErrMsg=o.err_msg||"",n.getvinfo_ret=o.ret_code,
n.duration_ms=0,n.getvinfo_time=o.c_time||0,i.vInfo.dynamicData=null,e._g.dataCount=e._g.targetDataCount,
e.videoDataReady();
}
});
},o.prototype._createPlayer=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this,i=this._g,o=this._o,r=i.vInfo,a=this._report,n=r.dynamicData.data,s=[];
i.myAdPlugin&&s.push(i.myAdPlugin),i.noProxy!==!0&&Q.isUseProxy&&s.push(new E({
vid:o.vid,
data:n,
cdn_url:n.totalUrl
})),o.useDanmu===!0&&s.push(new O({
bizUin:this.cgiData.biz,
msgId:1*this.cgiData.mid,
idx:1*this.cgiData.idx,
vid:o.vid
})),a.duration_ms=parseInt(1e3*n.time),this._initPlayRangeInfo({
durationMs:a.duration_ms
}),a.vtitle=this.cgiData&&this.cgiData.video_title&&this.cgiData.video_title.htmlDecode()||n.title||"";
var d=!1,_=i.monitorUid,c=i.monitorUid2,p=t.getReportTypeBySceneType(),u=void 0;
n.ori_url_info&&!function(){
var e={
10002:"超清",
10003:"高清",
10004:"流畅",
20003:"自动"
};
u=[],n.ori_url_info.forEach(function(t){
(1*t.format_id!==20003||Q.isWechat&&Q.isAndroid&&I.gtVersion("7.0.16",1))&&u.push({
name:t.video_quality_wording||e[t.format_id],
formatId:t.format_id,
height:t.height,
width:t.width,
src:t.url
});
});
}();
var g=[{
rate:.5,
name:"0.5倍"
},{
rate:.75,
name:"0.75倍"
},{
rate:1,
name:"1.0倍"
},{
rate:1.5,
name:"1.5倍"
},{
rate:2,
name:"2.0倍"
}],l=R.getQuery("play_time"),h=0;
i.initialData?h=i.initialData.initialTime||0:""!==l?h=1*l||0:r.status&&!r.status.isEnd&&(h=r.status.playTime||0),
J.info("qq_video_info: begin to create player"),i.myPlayer=new A({
__biz:o.__biz,
mid:o.mid,
idx:o.idx,
bizUserName:o.bizUserName,
bizNickName:o.bizNickName,
videoTitle:a.vtitle,
videoReportType:p,
defineCSS:!0,
container:o.container,
cover:i.coverUrl,
ratio:o.ratio,
width:i.gWidth,
height:i.gHeight,
videoWidth:n.width,
videoHeight:n.height,
duration:n.time,
autoplay:o.autoplay,
autoReplay:o.autoReplay,
isVideoSharePage:o.isVideoSharePage,
flowNotice:o.flowNotice,
flow:n.flow,
loop:o.loop,
plugins:s,
src:n.totalUrl,
formatId:n.formatid,
headImgUrl:o.headImgUrl,
jsapiFullScreen:o.jsapiFullScreen,
canShareVideo:o.canShareVideo,
pauseShowControll:o.pauseShowControll,
videoMd5:o.videoMd5,
useWcSlPlayer:o.useWcSlPlayer,
initialTime:h,
resolutionInfo:u,
playbackRateInfo:g,
playbackRateBtnInfoDefaultId:2,
cgiData:this.cgiData,
extinfo:{
hit_bizuin:o.hit_bizuin,
hit_vid:o.hit_vid,
vid:o.vid,
preview:o.preview,
pageplayer:t
},
isTLpage:o.isTLpage||!1,
muted:o.muted||!1,
fileSize:n.file_size,
onLoaded:function(){
"function"==typeof e.onLoaded&&e.onLoaded(),J.info("qq_video_info: succ created player");
},
onTimeupdate:function(e,r){
if(!d){
d=!0,q.report({
step:6,
vid:o.vid,
traceid:t._getTraceId(),
orderid:t._getOrderid(),
type:p,
fromid:t._o.fromid
});
var n=this.getLog(),s=n.loadwait||0;
t._qqVideoReport({
step:6,
loadwait:s
});
}
i.is_report_pv||(i.is_report_pv=!0,t._trigger("clearMonitor",_),t._trigger("clearMonitor",c),
t._o.is_mp_video?(t._trigger("setMonitor",c,{
12:1,
13:1
}),t._trigger("sendMonitor",c)):(t._trigger("setMonitor",_,{
0:1,
1:1
}),t._trigger("sendMonitor",_))),a.last_ms=parseInt(1e3*r.currentTime),a.video_play_time=parseInt(1e3*r.currentTime),
t._reportCurRangeInfo({
curTime:a.last_ms
}),t._trigger("timeupdate",r);
},
onBeginPlay:function(){
var e=r.status,i=this;
1*h>0&&1*h<.99*n.time&&(i.play(h),e&&e.playTime&&(e.playTime=0)),a.client_time_when_play=Math.round(+new Date/1e3),
a.click_play_button=1,"string"==typeof o.container&&"#"==o.container.charAt(0)&&"number"==typeof o.__count__&&o.__hasReport===!1&&(0==o.__count__?(new Image).src="/mp/jsreport?key=103&content=video_test&r="+Math.random():1==o.__count__?(new Image).src="/mp/jsreport?key=104&content=video_test&r="+Math.random():o.__count__>=2&&((new Image).src="/mp/jsreport?key=105&content=video_test&r="+Math.random()),
o.__hasReport=!0),t._trigger("beginPlay");
},
onDurationchange:function(){
if(this._useWcSlPlayer()){
var e=r.status;
e&&1*e.playbackRate!==1&&(this.setPlaybackRate(e.playbackRate),e.playbackRate=1);
}
},
onFullscreenchange:function(e,i){
t._trigger("fullscreenchange",i);
},
onAriaReplay:function(){
t._trigger("ariaReplay");
},
onStatusChange:function(e,i){
"loading"!==i.status||"seeked"!==i.subStatus&&"seeking"!==i.subStatus||t._initPlayRangeInfo({
durationMs:a.duration_ms
}),t._trigger("statusChange",i);
},
onAfterReplay:function(){
t._trigger("afterReplay");
},
onHandDragComplete:function(e,i){
t._trigger("handDragComplete",i);
},
onBarDragComplete:function(e,i){
t._trigger("barDragComplete",i);
},
onEnd:function(){
this.hideControllBar(),this.autoChangeTip({
type:"autoChange",
option:"hide"
}),this.autoChangeTip({
type:"autoSuc",
option:"hide"
}),a.hasended=1,q.report({
step:7,
vid:o.vid,
ext1:1e3*n.time,
traceid:t._getTraceId(),
orderid:t._getOrderid(),
type:p,
fromid:t._o.fromid,
duration:a.duration_ms,
cgiData:this.cgiData
}),t._debug("onend isend:"+this.isEnd()),t._trigger("hidePauseTips"),t._trigger("showEndContent"),
t._reportCurRangeInfo({
curTime:a.last_ms
}),t._initPlayRangeInfo({
durationMs:a.duration_ms
});
},
onError:function(e,o){
if(a.videoerror=!o||!o.errorcode||o.errorcode>5||o.errorcode<=0?46:o.errorcode+40,
Q.isUseProxy&&!t._g.noProxy?Q.isAndroid?t._trigger("setMonitor",c,{
30:1
}):Q.isIOS&&t._trigger("setMonitor",c,{
32:1
}):Q.isUseProxy&&t._g.noProxy&&!t._g.hasReportProxyError&&(t._g.hasReportProxyError=!0,
Q.isAndroid?t._trigger("setMonitor",c,{
31:1
}):Q.isIOS&&t._trigger("setMonitor",c,{
33:1
})),t._o.is_mp_video){
switch(i.is_report_pv||(i.is_report_pv=!0,t._trigger("setMonitor",c,{
12:1
})),t._trigger("setMonitor",c,{
14:1
}),1*o.errorcode){
case 1:
t._trigger("setMonitor",c,{
15:1
});
break;

case 2:
t._trigger("setMonitor",c,{
16:1
});
break;

case 3:
t._trigger("setMonitor",c,{
17:1
});
break;

case 4:
t._trigger("setMonitor",c,{
18:1
});
break;

case 5:
t._trigger("setMonitor",c,{
19:1
});
break;

case 6:
t._trigger("setMonitor",c,{
39:1
});
break;

default:
t._trigger("setMonitor",c,{
20:1
});
}
t._trigger("sendMonitor",c);
}else{
switch(i.is_report_pv||(i.is_report_pv=!0,t._trigger("setMonitor",_,{
0:1
})),t._trigger("setMonitor",_,{
2:1,
3:1
}),1*o.errorcode){
case 1:
t._trigger("setMonitor",_,{
4:1
});
break;

case 2:
t._trigger("setMonitor",_,{
5:1
});
break;

case 3:
t._trigger("setMonitor",_,{
6:1
});
break;

case 4:
t._trigger("setMonitor",_,{
7:1
});
break;

case 5:
t._trigger("setMonitor",_,{
8:1
});
break;

default:
t._trigger("setMonitor",_,{
9:1
});
}
t._trigger("sendMonitor",_),t._trigger("sendMonitor",c);
}
a.v_err_code=o.errorcode,t._showError(),t._qqVideoReport({
step:1999,
val:a.videoerror
}),t._initPlayRangeInfo({
durationMs:a.duration_ms
});
},
onFirstBufferingTime:function(e,i){
t._trigger("firstBufferingTime",i);
},
onPlayingBufferingTime:function(e,i){
t._trigger("playingBufferingTime",i);
},
onFlowNotice:function(e,i){
t._trigger("flowNotice",i);
},
onUserplay:function(e,i){
t._trigger("userplay",i);
},
onUserpause:function(e,i){
t._trigger("userpause",_extends({
curTime:this.getCurTime()
},i)),a.pause_num=(a.pause_num||0)+1;
},
onWaiting:function(e,o){
if(Q.isWechat&&Q.isAndroid&&I.gtVersion("7.0.16",1)){
var r={
10004:1,
10003:2,
10002:3,
20003:4
},a={
"自动":"20003",
"超清":"10002",
"高清":"10003",
"流畅":"10004"
},n={
WiFI:1,
"2G":2,
"3G":3,
"4G":4
};
o&&!function(){
for(var e=3,s=i.myPlayer,d=s.getResolutionInfo(),_=d?d.src:null,c=t._o.auto.loadRetryTime,p=t._o.auto.isShowTip,u=null,g=5e3,l=$(".js_auto_change_tip_mask")[0],h=void 0,v=void 0,f=i.vInfo.dynamicData?i.vInfo.dynamicData.data.ori_url_info.map(function(e){
var t=e.video_quality_wording,i=a[t];
return{
formatId:i,
src:e.url,
name:t
};
}):[],m=0;m<f.length;m++)"20003"===f[m].formatId&&(h=f[m].src),f[m].src===_&&(v=r[[f[m].formatId]]);
var y=function(e){
var i=$(".js_auto_change_tip")[0];
U.tap(i,function(){
t._o.auto.isChangeAuto=!0,t._trigger("autoTip",{
networkType:networkType,
DefinitionBefore:e.definitionBefore
});
});
},w=function(){
U.on(l,"tap",function(e){
e.cancelBubble=!0,i.myPlayer.autoChangeTip({
type:"autoChange",
option:"hide"
}),s.hideControllBar();
});
},b=function(){
u&&clearTimeout(u),u=setTimeout(function(){
i.myPlayer.autoChangeTip({
type:"autoChange",
option:"hide"
});
},g);
},k=function(){
s.hideControllBar(),i.myPlayer.autoChangeTip({
type:"autoChange",
option:"show"
}),p=!0;
var e=-1;
D.invoke("getNetworkType",{},function(t){
e=n[K[t.err_msg]]||0,("network_type:edge"==t.err_msg||"network_type:wwan"==t.err_msg)&&(t.detailtype||t.subtype)&&(e=n[t.detailtype]||n[t.subtype]);
}),y({
networkType:e,
definitionBefore:v
}),t._trigger("showTip");
},P=o.action;
_!==h&&h&&(p||("changeToAuto"===P||++c>e?(k(),b(),w()):t._o.auto.loadRetryTime+=1)),
t._o.auto.isShowTip=p;
}();
}
},
onPlay:function(e,o){
console.log("[onPlaying]",i.myPlayer.getResolutionInfo()),t._o.auto.isChangeAuto===!0&&t._o.auto.isShowSuc===!1&&i.myPlayer.getResolutionInfo()&&i.myPlayer.getResolutionInfo().src.indexOf("m3u8")&&!function(){
var e=null,o=4e3,r=function(){
e&&clearTimeout(e),e=setTimeout(function(){
i.myPlayer.autoChangeTip({
type:"autoSuc",
option:"hide"
});
},o);
};
i.myPlayer.hideControllBar(),i.myPlayer.autoChangeTip({
type:"autoSuc",
option:"show"
}),r(),t._o.auto.isShowSuc=!0;
}(),t._trigger("play",o);
},
onAfterCheckVideoFit:function(e,i){
var o={
97:1
};
i.needToFit===!0&&(o[98]=1,o[100]=1,i.os.ios&&(o[103]=1),i.os.android&&(o[106]=1),
i.supportObjectFit===!0&&(o[101]=1,i.os.ios&&(o[104]=1),i.os.android&&(o[107]=1))),
t._trigger("setMonitor",_,o),t._trigger("sendMonitor",_);
},
onBindError:function(e,i){
t._trigger("bindError",i);
},
onRateChange:function(e,i){
t._trigger("rateChange",i);
},
onResolutionChange:function(e,i){
"changed"===i.action&&(Q.playerStatus.formatId=i.infoAfter&&i.infoAfter.formatId||null,
D.invoke("handleMPPageAction",{
action:"setLocalData",
key:"formatId",
data:String(Q.playerStatus.formatId)
},function(e){
console.log("setLocalData"+JSON.stringify(e));
}),v()),t._trigger("resolutionChange",i);
},
onBrightnessChange:function(e,i){
t._trigger("brightnessChange",i);
},
onVolumeChange:function(e,i){
t._trigger("volumeChange",i);
},
onProfileJump:function(e,i){
t._trigger("profileJump",i);
},
onProcessStateChange:function(e,i){
t._trigger("processStateChange",i);
},
onGetDanmuInfo:function(e,i){
t._trigger("getDanmuInfo",i);
},
onCanplay:function(e,i){
t._trigger("canplay",i);
},
onShowControllBar:function(e,i){
t._trigger("showControlBar",i);
},
onHideControllBar:function(e,i){
t._trigger("hideControlBar",i);
},
canMePlay:function(e){
o.checkNoPaid?S({
type:"GET",
dataType:"json",
timeout:3e4,
url:"/mp/videoplayer?action=check_video_paid_status&__biz="+o.__biz+"&mid="+o.mid+"&idx="+o.idx,
success:function(t){
var i=1==t.can_play;
i?e():window.weui.confirm("此视频来自于付费内容，在原文付费后才可播放",{
buttons:[{
type:"default",
label:"Cancel"
},{
label:"前往原文",
onClick:function(){
o.openArticle();
}
}]
});
},
error:function(e){
var t=void 0;
t=e?e.status>=200&&e.status<400?81:e.status>=400&&e.status<500?82:e.status>=500&&e.status<600?83:0==e.status&&4==e.readyState?84:85:80,
onError({
err_msg:F,
code:t
});
}
}):e();
},
onShowMenu:function(e,i){
t._trigger("showMenu",i);
}
}),this._pvReport(),this._trigger("playerReady"),o.__count__=0,o.__hasReport=!1,
"string"==typeof o.container&&"#"==o.container.charAt(0)&&document.getElementById(o.container.substr(1)).getElementsByClassName("js_video_play_controll")[0].addEventListener("click",function(){
o.__count__++;
});
},o.prototype.getReportTypeBySceneType=function(){
return 0==this._o.scene_type?1:1==this._o.scene_type||2==this._o.scene_type?2:4==this._o.scene_type?3:7==this._o.scene_type?4:0;
},o.prototype._getFromid=function(){
return this._o.fromid;
},o.prototype._bindResize=function(){
var e=this;
U.on(window,"resize",function(){
return e._g.myPlayer&&e._g.myPlayer._useWcSlPlayer()?void(e._g.myPlayer.isInFullScreen()||setTimeout(function(){
var t=$(e._o.container),i=t.offset().width;
0!=i&&e.setVideoCSS({
width:i+"px"
});
},0)):void(e._o.height&&e._o.width&&(e._g.isShowTx&&e._g.txPlayer?setTimeout(function(){
try{
var t=$(e._o.container),i=e._o.width/e._o.height,o=t.offset().width,r=Math.floor(o/i);
0!=o&&(e._g.gWidth=o,e._g.gHeight=r,t.css({
height:r+"px"
}),e._g.txPlayer.resize({
width:o,
height:r
}));
}catch(a){}
},0):setTimeout(function(){
var t=$(e._o.container),i=e._o.width/e._o.height,o=t.offset().width,r=Math.floor(o/i);
0!=o&&(e._g.gWidth=o,e._g.gHeight=r,e.setVideoCSS({
width:o+"px",
height:r+"px"
}),t.css({
height:r+"px"
}));
},0)));
},!1);
},o.prototype._setBlockPlugin=function(e,t){
this._blockPlugin[e]=t;
},o.prototype._trigger=function(e){
var t=void 0,i=void 0,o=this.plugins,r=this._blockPlugin[e]||this._blockPlugin.all,a=0;
if(r&&"function"==typeof r.recv&&(t=r.recv.apply(r,arguments),"[object Object]"==Object.prototype.toString.call(t)?(a|=t.code,
i=t.data):a|=t,1&a))return i;
for(var n=0,s=o.length;s>n&&(t=o[n].recv.apply(o[n],arguments),"[object Object]"==Object.prototype.toString.call(t)?(a|=t.code,
i=t.data):a|=t,!(2&a));++n);
if(!(this._blockInnerHandler||4&a)){
var d=this["__"+e+"Handler"];
d&&(t=d.apply(this,arguments),"[object Object]"==Object.prototype.toString.call(t)&&(i=t.data));
}
return 8&a||this.__triggerOutside.apply(this,arguments),i;
},o.prototype.__triggerOutside=function(){
var e=this._o,t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var o=e["on"+i];
"function"==typeof o&&o.apply(this,t);
}
},o.prototype._getCover=function(){
var e=this._o;
return p(e.vid,e.ratio,e.is_mp_video);
},o.prototype._cacheData=function(){
var e=this._g.myPlayer,t=this._g.vInfo;
e&&(t.status||(t.status={}),"function"==typeof e.isEnd&&(t.status.isEnd=e.isEnd()),
"function"==typeof e.getCurTime&&(t.status.playTime=e.getCurTime()),"function"==typeof e.getPlaybackRate&&(t.status.playbackRate=e.getPlaybackRate()),
!this._g.initialData&&this._g.coverUrl&&(t.coverUrl=this._g.coverUrl),h(this._o.__biz,this._o.mid,this._o.idx,this._o.vid,this._g.vInfo,this._g.cacheStartTs));
},o.prototype._getCache=function(){
var e=u(this._o.__biz,this._o.mid,this._o.idx,this._o.vid);
if(e){
var t=this._g.vInfo;
t.dynamicData=e.videoInfo.dynamicData||null,t.coverUrl=e.videoInfo.coverUrl||"",
t.status=e.videoInfo.status||null,this._g.cacheStartTs=e.time||null;
}
},o.prototype._clearCache=function(){
f(this._o.vid);
},o.prototype._qqVideoReport=function(e){
var t={
step:e.step,
loadwait:e.loadwait||0,
val:e.val||0,
vid:this._o.vid
};
6==e.step&&(t.vt=this._report.vt),V.qqvideo_common_report(t);
},o.prototype._pvReport=function(){
this._qqVideoReport({
step:3
});
},o.prototype._showError=function(e,t){
t=t||1;
var i=this,o=this._report.videoerror,r=y(this._o.container.replace(/^#/,""));
if(r){
e=e||F;
var a=!1;
e===F&&(a=!0),r.innerHTML=B.tmpl(W,{
errType:t,
msg:e,
errcode:o,
showBtn:a,
width:r.offsetWidth,
height:r.offsetHeight,
is_mp_video:this._o.is_mp_video
},!1);
{
var n=$(r).find(".js_video_errormsg_btn");
$(r).find(".js_video_errormsg_loading"),$(r).find(".js_error_area");
}
U.tap(n[0],function(){
i._reInit();
});
}
},o.prototype._reInit=function(){
var e=y(this._o.container.replace(/^#/,""));
e.innerHTML="";
var t=!1,i=!1;
Q.isUseProxy&&this._report.videoerror>=41&&this._report.videoerror<=46&&(t=!0,this._g.noProxy&&(i=!0)),
this._init({
noProxy:t,
hasReportProxyError:i,
hasInitPlugins:!0,
gWidth:this._g.gWidth,
gHeight:this._g.gHeight
});
},o.prototype.__showEndContentHandler=function(){
this._debug("resetVideo"),this._g.myPlayer._useWcSlPlayer()?this._g.myPlayer.showCover():this._g.myPlayer.resetVideo(),
this._g.myPlayer.hidePlayBtn();
},o.prototype._debug=function(){},o.prototype.__ariaReplayHandler=function(){
this.__replayHandler();
},o.prototype.__replayHandler=function(){
this._g.is_report_pv=!1,this._qqVideoReport({
step:3
}),this._report.replay=1,this._g.myPlayer.replay();
},o.prototype._getTraceId=function(){
var e=this._g.myAdPlugin;
return e?e.getTraceId():0;
},o.prototype._getOrderid=function(){
var e=this._g.myAdPlugin;
return e?e.getOrderid():0;
},o.prototype._getOriStatus=function(){
return this._o.ori_status;
},o.prototype._getPlayerReportData=function(){
var e=this._report,t=this._g.myPlayer,i=this._g.myAdPlugin;
t&&(e.quick_play=t.hasDrag()?1:0,e.full_screen=t.hasFullScreen()?1:0,e.drag_times=t.getDrag().join(":|:"),
e.play_time=this.getRealPlayTime()),i&&(e.ad_play_time=i.getAdPlaytime(),e.traceid=i.getTraceId(),
e.orderid=i.getOrderid()),e.webviewid=q.getWebviewid();
},o.prototype._cacheReportData=function(){
var e=this;
this._g.reportDataTimeoutId&&(clearTimeout(this._g.reportDataTimeoutId),this._g.reportDataTimeoutId=null),
!Q.videoDataLs||this._g.hasReport||this._g.hasDestroy||(this._getPlayerReportData(),
Q.videoDataLs.set(this._g.reportDataLsKey,this._report,+new Date+Q.videoDataLsExpTime)),
Q.neeedTimoutSaveReportData&&!this._g.hasDestroy&&(this._g.reportDataTimeoutId=window.setTimeout(function(){
e._cacheReportData();
},1e3));
},o.prototype.getVid=function(){
return this._o.vid;
},o.prototype.pause=function(){
this._g.myPlayer&&this._g.myPlayer.pause4outer();
},o.prototype.play=function(e){
this._g.myPlayer&&this._g.myPlayer.play4outer(e);
},o.prototype.firstPlay=function(){
this._g.myPlayer&&this._g.myPlayer.firstPlay();
},o.prototype.resetVideo=function(){
this._g.myPlayer&&this._g.myPlayer.resetVideo();
},o.prototype.getRealPlayTime=function(){
var e=0;
return this._g.myPlayer&&(e=Math.round(1e3*this._g.myPlayer.getPlayTotalTime())),
e;
},o.prototype.getCurrentTime=function(){
var e=0,t=this._g.myPlayer;
return this._g.myPlayer&&(e=t.getCurTime()),e;
},o.prototype.getVideoData=function(){
return this._g.vInfo&&this._g.vInfo.dynamicData&&this._g.vInfo.dynamicData.data?this._g.vInfo.dynamicData.data:null;
},o.prototype.getReportData=function(){
return this._report;
},o.prototype.mpVideoReport=function(e){
if(e=e||{},!this._g.hasReport&&!this._g.hasDestroy){
this._g.hasReport=!0;
var t=this._report;
0===t.videoerror?this.cacheData():this.clearCache(),Q.videoDataLs&&Q.videoDataLs.remove(this._g.reportDataLsKey),
this._getPlayerReportData(),Q._debug&&console.log("report video data:"+JSON.stringify(t)),
V.videoreport({
data:t,
async:e.async
});
}
},o.prototype.extendMpReportData=function(e){
w(this._report,e);
},o.prototype.getMpReportData=function(){
return this._report;
},o.prototype.clearCache=function(){
this._clearCache();
},o.prototype.cacheData=function(){
this._cacheData();
},o.prototype._cacheOnPageInvisible=function(){
var e=this;
document.addEventListener("visibilitychange",function(){
document.hidden&&e.cacheData();
});
},o.prototype._leaveReport12710=function(){
var e=this,t={
type:this._o.leaveReport12710Type,
step:17,
useruin:this._o.uin,
bizuin:this._o.__biz,
mid:this._o.mid,
idx:this._o.idx,
vid:this._o.vid
};
G.addReport(function(){
var i=e.getRealPlayTime();
if(!i)return!1;
var o=e.getVideoData();
return t.duration=Math.round(1e3*o.time),t.clienttime=Date.now(),t.real_play_time=i,
{
reportUrl:"https://mp.weixin.qq.com/mp/ad_video_report?action=video_play_exit_report",
reportData:Object.keys(t).map(function(e){
return e+"="+encodeURIComponent(t[e]||"");
}).join("&"),
method:"POST"
};
});
},o.prototype.setWidth=function(e){
this._g.myPlayer.setWidth(e);
},o.prototype.setHeight=function(e){
this._g.myPlayer.setHeight(e);
},o.prototype.renderLike=function(){
var e=this._g.myPlayer;
e&&e.isEnd()&&this._trigger("showEndContent");
},o.prototype.setVideoCSS=function(e){
var t=this,i=this._g.myPlayer,o=this._g.myAdPlugin;
i&&(i.setVideoCSS(e),o&&o.setSize(e),setTimeout(function(){
t.renderLike();
},0));
var r=$(this._o.container).find(".js_error_box");
r&&r.length>0&&r.css(e);
},o.prototype.destroy=function(){
for(var e=0;e<Q.videoInstance.length;e++)Q.videoInstance[e]===this&&(Q.videoInstance.splice(e,1),
e--);
this._g&&(this._g.event&&T.removeListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading
}),this._g.myPlayer&&this._g.myPlayer.destroy(),this._g.hasDestroy=!0);
},o.prototype.supportWcSlPlayer=function(){
return!!this._g.myPlayer&&this._g.myPlayer.supportWcSlPlayer();
};
var Y=-1!=navigator.userAgent.indexOf("MicroMessenger")&&(I.isIOS||I.isAndroid||I.isWp);
return{
getHashByVid:c,
mpVideoPlayer:o,
getFormatTime:A._getFormatTime,
getCoverByVid:p,
getQQVideoStaticInfo:_
};
});