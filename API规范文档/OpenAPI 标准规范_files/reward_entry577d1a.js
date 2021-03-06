function _classCallCheck(t,e){
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
define("appmsg/comment/comment_write_dialog/comment_write_dialog.js",["biz_common/dom/event.js","pages/utils.js","biz_common/tmpl.js","biz_wap/utils/mmversion.js","pages/mod/bottom_modal.js","appmsg/comment/comment_write_dialog/comment_write_dialog.html.js","common/navShadow.js","common/keyboard.js","appmsg/emotion/emotion.js","appmsg/emotion/emotion_panel.js","appmsg/comment/comment_length.js"],function(t){
"use strict";
var e=t("biz_common/dom/event.js"),n=t("pages/utils.js"),i=t("biz_common/tmpl.js"),o=t("biz_wap/utils/mmversion.js"),s=t("pages/mod/bottom_modal.js"),a=t("appmsg/comment/comment_write_dialog/comment_write_dialog.html.js"),l=t("common/navShadow.js"),c=t("common/keyboard.js"),u=t("appmsg/emotion/emotion.js"),r=t("appmsg/emotion/emotion_panel.js"),m=t("appmsg/comment/comment_length.js"),p=function(t){
var e=document.createElement("div");
return e.innerHTML=t,Array.prototype.forEach.call(n.qsAll(".js_to_content",e),function(t){
t.innerHTML=u.encode(t.innerHTML);
}),e;
},h="discuss_write_dialog_android_onfocus",d=[],g=0,b={};
Object.defineProperty(b,"keyboardHeight",{
set:function(t){
d.some(function(e){
return e.dialog.getShowStatus()?(e.bd.setAttribute("style","padding-bottom: "+t+"px; padding-bottom: calc("+t+"px - constant(safe-area-inset-bottom)); padding-bottom: calc("+t+"px - env(safe-area-inset-bottom));"),
!0):!1;
});
}
}),o.isAndroid&&!function(){
var t=document.documentElement.clientHeight||document.body.clientHeight;
e.on(window,"resize",function(){
d.some(function(e){
if(e.dialog.getShowStatus()&&!e.emotionPanel.isShow){
var n=document.documentElement.clientHeight||document.body.clientHeight;
return n===t?e.dialog.getRootEle().classList.remove(h):e.dialog.getRootEle().classList.add(h),
!0;
}
return!1;
});
});
}();
var y=!1;
c.onGetKeyboardHeight(function(t){
var e=t.keyboard;
y&&(o.isIOS?b.keyboardHeight=e:e&&(g=e,b.keyboardHeight=g),document.body.style.height=window.screen.availHeight-e+"px");
});
var f=function(){
function t(c){
var u=this;
_classCallCheck(this,t),d.push(this),this.globalData=c.globalData,this.type=c.type||"comment",
this.limit=m.getLimit(this.type),this.params=null;
var p=document.createElement("div"),h=void 0;
h="comment"===this.type?"Comments are visible to everyone after being approved by the Official Account":c.canC2CReply?"Replies are visible to everyone":"Replies are visible to everyone after being approved by the Official Account",
p.innerHTML=i.tmpl(a,{
type:this.type,
placeholder:h
}),this.bd=n.qs(".js_bd",p),this.input=n.qs(".js_input",this.bd);
var f=function(){
u.emotionPanel.hide(),u.input.blur(),"function"==typeof c.onHide&&c.onHide(u.getInputValue(),u.params);
},v={
top:"16px",
extClass:"discuss_write_dialog_wrp",
hasBtn:!0,
innerScrollList:[this.input],
btnClickCb:function(){
u.input.blur(),"function"==typeof c.onSubmit&&c.onSubmit(u.getInputValue(),u.params);
},
onHide:f
};
switch(this.type){
case"comment":
v.title="Comment",v.btnText="Submit";
break;

case"dialog":
v.title="Reply",v.btnText="Reply",v.transparentMask=!0,v.animationType="right",v.onHide=function(){
l.show({
onClick:function(){
u.globalData.cmtDialog.hideDialog();
}
}),f();
};
break;

case"reply":
v.title="Reply",v.btnText="Reply";
}
this.dialog=new s(this.bd,v),this.dialog.disableBtn(),"dialog"===this.type&&this.dialog.setCloseBtnStyle("back"),
this.replyTo=n.qs(".js_reply_to",this.bd),this.placeholder=n.qs(".js_placeholder",this.bd),
this.toolbar=n.qs(".js_toolbar",this.bd),this.emotion=n.qs(".js_emotion_btn",this.toolbar),
this.inputTips=n.qs(".js_input_tips",this.toolbar),this.toolBar=this.emotion.parentNode,
e.on(this.input,"input",function(){
u.onInputChange();
}),e.on(this.input,"paste",function(t){
var e=t.clipboardData.getData("text"),n=m.getLength(e),i=m.getLength(u.getInputValue());
if(i+n>u.limit){
t.preventDefault();
for(var o=u.limit-i,s="",a=0,l=e.length;l>a&&o>0&&(o-=/[^\x00-\xff]/.test(e[a])?1:.5,
!(0>o));a++)s+=e[a];
u.input.value+=s,u.onInputChange(),u.input.scrollTop=u.input.scrollHeight;
}
}),e.on(this.input,"keydown",function(t){
if(!t.altKey&&!t.ctrlKey)switch(t.keyCode){
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
m.getLength(u.getInputValue())>=u.limit&&t.preventDefault();
}
}),e.on(this.input,"focus",function(){
y=!0,document.body.style.overflow="hidden";
var t=u.input.scrollTop;
u.input.style.height=0,u.input.style.flex="none",u.placeholder.style.display="",
u.placeholder.scrollTop=t;
var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
setTimeout(function(){
u.input.style.removeProperty("height"),u.input.style.removeProperty("flex"),u.placeholder.style.display="none",
u.dialog.getBdEle().scrollTop=0,document.documentElement.scrollTop=e,document.body.scrollTop=e;
},300);
}),e.on(this.input,"blur",function(){
y=!1,document.body.style.removeProperty("overflow"),document.body.style.removeProperty("height");
}),e.on(this.emotion,"click",function(){
u.emotionPanel.isShow?o.isAndroid?setTimeout(function(){
u.input.focus();
}):u.input.focus():u.input.blur(),u.emotionPanel.toggle();
}),this.emotionPanel=new r({
input:this.input,
limit:this.limit,
counter:function(t){
return m.getLength(t);
},
onChange:function(t){
var e=t.type,n=t.value;
("action"!==e||"done"!==n)&&u.onInputChange();
},
onShow:function(t){
b.keyboardHeight=t;
},
onHide:function(){
o.isAndroid&&(b.keyboardHeight=g);
}
});
}
return _createClass(t,[{
key:"show",
value:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this.setReplyTo(t.nickName,t.toContent),this.params=t.params,this.dialog.show(!0,this.input);
}
},{
key:"hide",
value:function(){
this.dialog.hide();
}
},{
key:"onInputChange",
value:function(){
var t=m.getLength(this.getInputValue());
this[t&&t<=this.limit?"enableSubmit":"disableSubmit"](),this.placeholder.value=this.getInputValue(),
this.setInputTips(t);
}
},{
key:"getInputValue",
value:function(){
return this.input.value;
}
},{
key:"setInputValue",
value:function(t){
this.input.value=t,this.onInputChange();
}
},{
key:"enableSubmit",
value:function(){
this.dialog.enableBtn();
}
},{
key:"disableSubmit",
value:function(){
this.dialog.disableBtn();
}
},{
key:"setReplyTo",
value:function(t,e){
t&&e&&(this.replyTo.innerHTML=p("<span>"+t+'</span>:&nbsp;<span class="js_to_content">'+e+"</span>").innerHTML);
}
},{
key:"setInputTips",
value:function(t){
t=t||m.getLength(this.getInputValue()),this.inputTips.innerHTML=t>=this.limit-m.remindWordCount&&t<this.limit?"???????????????"+(this.limit-t)+"??????":t===this.limit?"??????"+this.limit+"???????????????":t>this.limit?"?????????"+(t-this.limit)+"???":"";
}
}]),t;
}();
return f;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/keyboard.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js","pages/bottom_input_bar.js","common/utils.js"],function(e){
"use strict";
var n=e("biz_wap/jsapi/core.js"),t=e("biz_common/dom/event.js"),o=e("biz_wap/utils/mmversion.js"),i=e("pages/bottom_input_bar.js"),s=e("common/utils.js"),a=o.getInner(),r={
vertical:0,
horizontal:0
};
0===window.orientation||180===window.orientation?(r.vertical=s.getInnerHeight(),
r.horizontal=screen.width-(screen.height-r.vertical)):(r.horizontal=s.getInnerHeight(),
r.vertical=screen.width-(screen.height-r.horizontal+60));
var c=!1,l=!1,d=!0;
o.isIOS&&o.gtVersion("7.0.16")?(c=!0,l=!0):o.isAndroid&&(o.gtVersion("7.0.18")&&"27001634">a||a>="28000038")&&(c=!0,
l=a>="27001700");
var u={
keyboard:0,
input:0
},f=[],p=!1,h=null,y=!1,m=null,b=null,w=null;
c&&(l&&(h=document.createElement("div"),h.style.cssText="width: 100%; height: 100%; position: fixed; top: 0; background-color: transparent; z-index: 99999999; display: none;",
document.body.appendChild(h),t.on(h,"touchmove",function(e){
y&&e.preventDefault();
})),s.listenStateChange({
cb:function(e){
"onDestroy"===e.state&&(h&&(h.style.display="none"),"function"==typeof b&&b(""),
"function"==typeof w&&w(""));
}
}));
var g=function(){
return c?!0:(console.log("Not support keyboard."),!1);
},v=function(e,n){
f.length&&f.forEach(function(t){
"function"==typeof t&&t({
keyboard:e,
input:n,
updateKeyboard:u.keyboard!==e,
updateInput:u.input!==n
});
}),u.keyboard=e,u.input=n;
};
return{
canUseKeyboard:c,
canUseCancel:l,
onlyUseH5Keyboard:d,
lastData:u,
onGetKeyboardHeight:function(e){
-1===f.indexOf(e)&&(p||(p=!0,o.isIOS||!window.__second_open__?n.on("onGetKeyboardHeight",function(e){
return v(e.height,e.inputHeight);
}):t.on(window,"resize",function(){
var e=0===window.orientation||180===window.orientation?"vertical":"horizontal",n=r[e],t=s.getInnerHeight();
n>t?v(n-t,60):t>n&&(r[e]=t);
})),f.push(e));
},
offGetKeyboardHeight:function(e){
var n=f.indexOf(e);
n>-1&&f.splice(n,1);
},
show:function(e){
if(g()||e.forceFallback||e.forceFallbackIfUnsupport){
if(b=e.cancel,w=e.hide,d||e.forceFallback){
var t=function(){
m||(m=new i);
var n=!1;
return m.addListener("submit",function(){
n=!0,"function"==typeof e.success&&e.success(m.getContent());
}),m.addListener("hide",function(e){
var t=m.getContent();
n||"function"==typeof b&&b(t),"function"==typeof w&&w(t,e),n=!1;
}),m.addListener("show",function(){
"function"==typeof e.show&&e.show();
}),m.addListener("input",function(){
"function"==typeof e.input&&e.input(m.getContent());
}),m.addListener("fail",function(){
"function"==typeof e.fail&&e.fail();
}),m.addListener("showEmotionPanel",function(n){
"function"==typeof e.showEmotionPanel&&e.showEmotionPanel(n);
}),m.addListener("hideEmotionPanel",function(){
"function"==typeof e.hideEmotionPanel&&e.hideEmotionPanel();
}),m.setContent(e.text||""),m.setLimit(e.maxLength||0),m.setPlaceholder(e.placeholder||""),
m.show(e.toggleEmotion),{
v:void 0
};
}();
if("object"===("undefined"==typeof t?"undefined":_typeof(t)))return t.v;
}
var o={
text:e.text||"",
placeholder:e.placeholder||"",
maxLength:e.maxLength||0,
showRemindWordCount:e.showRemindWordCount||0,
disableScrollAdjustment:void 0===e.disableScrollAdjustment?!0:e.disableScrollAdjustment
};
e.scrollContentY&&(o.scrollContentY=e.scrollContentY),e.mask&&h&&(h.style.display=""),
y=!!e.disableScroll,n.invoke("showKeyboard",o,function(n){
switch(h&&(h.style.display="none"),n.err_msg){
case"showKeyboard:ok":
"function"==typeof e.success&&e.success(n.text);
break;

case"showKeyboard:cancel":
"function"==typeof b&&b(n.text);
}
"function"==typeof w&&w(n.text);
}),"function"==typeof e.show&&e.show();
}
},
hide:function(){
d&&m&&m.hide();
},
setFullscreenStyle:function(e){
d&&m&&m.setFullscreenStyle(e);
}
};
});define("appmsg/comment/comment_write_old.html.js",[],function(){
return'<!-- ??????????????? -->\n<div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n  <div class="discuss_container editing access">\n    <div class="discuss_container_inner">\n      <div class="discuss_container_hd">\n        <h2 class="discuss_rich_media_title"><#=textPageTitle#></h2> <!-- ??????????????? -->\n        <span id="log"></span>\n\n        <div id="js_comment_input_old" class="dicuss_form_area">\n          <!-- ?????????input?????? -->\n        </div>\n      </div>\n      <div class="discuss_container_bd">\n        <!-- ?????? -->\n        <div class="rich_media_extra_title_wrp weui-flex">\n          <div class="weui-flex__item">\n            <strong class="rich_media_extra_title">My Comments</strong>\n          </div>\n        </div>\n\n        <div class="discuss_list_wrp">\n          <ul class="discuss_list" id="js_my_list_old"></ul>\n        </div>\n\n        <!-- ??????????????? -->\n        <div class="js_mycmt_loading">\n          <div class="weui-loadmore weui-loadmore_default">\n            <i class="weui-loading"></i>\n            <span class="weui-loadmore__tips">Loading...</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ??????????????????????????? -->\n<div class="weui-webview-nav" style="display: none;" id="js_fake_bar">\n  <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n  <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>\n';
});define("appmsg/comment/comment_write.html.js",[],function(){
return'<# if (!deviceIsPc) { #>\n  <!-- ?????????????????? -->\n  <div id="js_cmt_write_area" class="discuss_form_write_area">\n    <div class="js_cmt_write_area_inner discuss_form_write_mod">\n      <div class="rich_media_extra_title_wrp weui-flex">\n        <div class="weui-flex__item js_title">\n          <strong class="rich_media_extra_title">Comment</strong>\n        </div>\n        <a class="js_cancel" href="javascript:;">Cancel</a>\n      </div>\n      <textarea class="discuss_form_write_input js_cmt_input" placeholder="???????????????????????????????????????"></textarea>\n      <div class="js_keyboard_tool">\n        <div class="discuss_form_write_tool weui-flex">\n          <div class="weui-flex__item">\n            <span class="discuss_form_write_tips js_cmt_tips"></span>\n          </div>\n          <a class="icon_discuss_emotion js_emotion_btn" role="button" aria-pressed="false" href="javascript:;">??????</a>\n          <button class="weui-btn weui-btn_primary weui-btn_xmini weui-btn_disabled js_cmt_submit_btn discuss_form_write_btn" type="button">Comment</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="weui-mask_transparent" style="display:none;"></div>\n<# } else { #>\n  <!-- pc???????????? -->\n  <div class="comment_primary_area" id="js_comment_pc" style="display: none">\n    <div class="comment_primary_form" id="js_cmt_addbtn_pc">\n      <div class="comment_primary_form_bd comment_primary_input_multiline" id="js_cmt_panel_pc">\n        <div class="comment_primary_input_default" id="js_cmt_input_pc" style="display: none">Comment</div>\n      </div>\n    </div>\n  </div>\n<# } #>\n';
});define("appmsg/comment/comment_tpl.html.js",[],function(){
return'<!-- ???????????? -->\n<div class="discuss_container my_discuss_container" id="js_my_list_container" style="display: none;">\n  <div class="rich_media_extra_title_wrp weui-flex">\n    <div class="weui-flex__item">\n      <strong class="rich_media_extra_title">My Comments</strong>\n    </div>\n    <# if (!isWxWork) { #>\n      <p class="tips_global js_cmt_nofans_mine" style="display: none;">Follow first to comment</p>\n      <a class="js_cmt_addbtn" href="javascript:;" style="display: none;">Comment</a>\n    <# } #>\n  </div>\n\n  <div class="discuss_list_wrp">\n    <ul class="discuss_list" id="js_my_list"></ul>\n  </div>\n\n  <!-- ??????????????? -->\n  <div class="js_mycmt_loading">\n    <div class="weui-loadmore weui-loadmore_default">\n      <i class="weui-loading"></i>\n      <span class="weui-loadmore__tips">Loading...</span>\n    </div>\n  </div>\n\n  <!-- ????????????????????????weui-fold-tips_unfold -->\n  <div id="js_my_list_folder" class="weui-fold-tips" style="display: none;">Show My Comments</div> <!-- ??????????????????????????????????????? -->\n\n  <!-- ?????????????????????????????????????????????????????? -->\n  <div id="js_my_list_footer" style="display: none;">\n    <div class="my_dicuss_list_end_tips weui-loadmore weui-loadmore_default weui-loadmore_line">\n      <span class="weui-loadmore__tips">\n        Comments above are visible to everyone after being approved      </span>\n    </div>\n  </div>\n</div>\n\n<!-- ???????????? -->\n<div class="discuss_container star_discuss_container" id="js_cmt_main" style="display: none;">\n  <div class="rich_media_extra_title_wrp weui-flex">\n    <div class="weui-flex__item">\n      <strong class="rich_media_extra_title">Top Comments</strong>\n    </div>\n    <# if (!isWxWork) { #>\n      <p class="tips_global js_cmt_nofans_elected" style="display: none;">Follow first to comment</p>\n      <a class="js_cmt_addbtn" href="javascript:;" style="display: none;">Comment</a>\n    <# } #>\n  </div>\n  <div class="discuss_list_wrp">\n    <ul class="discuss_list" id="js_cmt_list"></ul>\n  </div>\n</div>\n\n<# if (!isWxWork) { #>\n  <div class="discuss_container discuss_data_empty js_cmt_nofans_single" style="display: none;">\n    <div class="rich_media_extra_title_wrp tc">\n      <div class="tips_global js_cmt_nofans_single_inner" style="display: none;">Follow first to comment</div>\n      <a class="js_cmt_addbtn" style="display: none;" href="javascript:;">Comment</a>\n    </div>\n  </div>\n<# } #>\n\n<div id="js_cmt_loading">\n  <div class="weui-loadmore weui-loadmore_default">\n    <i class="weui-loading"></i>\n    <span class="weui-loadmore__tips">Loading...</span>\n  </div>\n</div>\n\n<div id="js_cmt_statement" style="display: none;">\n  <div class="weui-loadmore weui-loadmore_default weui-loadmore_line weui-loadmore_dot">\n    <span class="weui-loadmore__tips"></span>\n  </div>\n</div>\n\n<!-- warning toast -->\n<div class="discuss_warn_toast weui-toast__wrp" id="js_warning_toast" style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast weui-toast_text-more">\n    <i class="weui-icon-warn weui-icon_toast"></i>\n    <p class="weui-toast__content js_content"></p>\n  </div>\n</div>\n';
});define("biz_wap/utils/fakehash.js",["biz_common/dom/event.js"],function(t){
"use strict";
function s(t){
t=t||location.hash.substr(1);
var s,o,e,i,r=!1,c=[];
for(s=0;s<h.length;s++)o=h[s],e=o[0],i=o[1],e!==a?("string"==typeof e&&e===t||e instanceof RegExp&&e.test(t))&&(i(n),
r=!0):c.push(i);
if(!r)for(s=0;s<c.length;s++)c[s](n,t);
n=t;
}
var o=t("biz_common/dom/event.js"),h=[],a="__default_hash__",n=location.hash.substr(1);
return o.on(window,"popstate",function(t){
var o=a;
t.state&&t.state.hash&&(o=t.state.hash),s(o);
}),o.on(window,"hashchange",s),o.on(window,"load",function(){
history.state&&history.state.hash&&s(history.state.hash);
}),{
val:function(){
return history.state&&history.state.hash||location.hash.substr(1);
},
push:function(t){
history.pushState?(history.pushState({
hash:t
},document.title,location.href),s(t)):location.hash=t;
},
replace:function(t){
history.replaceState?(history.replaceState({
hash:t
},document.title,location.href),s(t)):this.push(t);
},
on:function(t,s){
"function"==typeof t&&(s=t,t=a),h.push([t,s]);
}
};
});define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js","common/utils.js","biz_common/dom/offset.js"],function(e){
"use strict";
function t(){
if(!n&&(n=!0,setTimeout(function(){
n=!1;
},20),o||(o=document.getElementById("js_cmt_area")))){
var e=c.getInnerHeight(),t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,i=o.querySelectorAll(".js_comment_item");
if(m=p.getOffset(o).offsetTop,i.length)for(var s=0;s<i.length&&m+i[s].offsetTop<t+e;s++)1!=i[s].getAttribute("data-hasreport")&&(i[s].setAttribute("data-hasreport",1),
_.data.push({
content_id:i[s].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*i[s].dataset.friend,
scene:1
}));
d.set("comment_expose",_,Date.now()+6048e5);
}
}
var o,m,n,i=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/event.js"),a=e("biz_wap/utils/storage.js"),c=e("common/utils.js"),d=new a("comment_expose"),p=e("biz_common/dom/offset.js"),_={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},r=function(e){
e&&e.data&&e.data.length&&(u(e),d.remove("comment_expose"));
},u=function(e){
i({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:e.comment_id,
appmsgid:e.appmsgid,
idx:e.idx,
item_show_type:e.item_show_type,
__biz:e.biz,
data:JSON.stringify(e.data)
},
async:!1,
timeout:2e3
});
};
s.on(window,"scroll",t),s.on(window,"unload",function(){
r(_);
}),s.on(window,"load",function(){
var e=d.getData("comment_expose");
e&&e.comment_expose&&e.comment_expose.val&&e.comment_expose.val.appmsgid&&r(e.comment_expose.val),
t();
});
var f=function(e){
_.comment_id=e.comment_id,_.appmsgid=e.appmsgid,_.idx=e.idx,_.item_show_type=e.item_show_type||0,
_.biz=e.biz,setTimeout(function(){
t();
});
};
return f;
});define("appmsg/retry_ajax.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module,alert){
"use strict";
function Retry_ajax(e){
checkAjaxDo(e),e&&(e.success=function(a){
dealWithSucceed(a,e);
},e.error=function(){
dealWithFailed(e);
}),ajax(e);
}
function checkAjaxDo(e){
var a=isContainExceptLike(e,failedQueue),i=isContainAjax(e,failedQueue);
-1===i&&a>-1&&failedQueue.splice(a,1);
}
function isContainExceptLike(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url||-1!=e.url.indexOf("&like=")||-1!=t.url.indexOf("&like=")){
if(!(e.url.indexOf("&like=")>-1&&t.url.indexOf("&like=")>-1))continue;
if(removeLikeParam(e.url)!==removeLikeParam(t.url))continue;
}else if(!t.url||t.url!==e.url)continue;
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqualExceptLike(u,n))continue;
}
i=r;
break;
}
return i;
}
function isContainAjax(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url&&t.url&&e.url==t.url){
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqual(u,n))continue;
}
i=r;
break;
}
}
return i;
}
function removeLikeParam(e){
var a=e.indexOf("&like="),i=e.substring(0,a)+e.substring(a+7);
return i;
}
function isEqualExceptLike(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if("like"!==u&&e[u]!==a[u])return!1;
}
return!0;
}
function isEqual(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if(e[u]!==a[u])return!1;
}
return!0;
}
function dealWithSucceed(res,obj){
try{
var data=eval("("+res+")");
}catch(e){
var data=!1;
}
if(data&&data.base_resp&&0===data.base_resp.ret){
var findIndex=isContainExceptLike(obj,failedQueue);
findIndex>-1&&failedQueue.splice(findIndex,1);
}else dealWithFailed(obj);
}
function dealWithFailed(e){
var a=isContainExceptLike(e,failedQueue);
if(-1===a){
if(e.failedTimes=1,failedQueue.length>=MAX_QUEUE_LEN)return;
failedQueue.push(e);
}else{
var i=isContainAjax(e,failedQueue);
if(i>-1){
if(failedQueue[a].failedTimes++,e.failedTimes=failedQueue[a].failedTimes,e.failedTimes>MAX_FAILED_TIMES)return void failedQueue.splice(i,1);
}else failedQueue.splice(i,1),e.failedTimes=1,failedQueue.push(e);
}
Retry_ajax(e);
}
var ajax=require("biz_wap/utils/ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),failedQueue=[],MAX_FAILED_TIMES=2,MAX_QUEUE_LEN=20;
return Retry_ajax;
});define("complain/tips.js",["biz_common/utils/string/html.js","biz_common/dom/event.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var i=t("biz_common/dom/event.js"),o={
tipsTimeoutId:null,
tipsDom:document.getElementById("tips")
},s={
showErrTips:function(t,i){
var s=i||o.tipsDom;
return t===!1?void(s.style.display="none"):(this.resetTips(),s.innerHTML=t.htmlEncode(),
s.style.display="block",clearTimeout(o.tipsTimeoutId),void(o.tipsTimeoutId=setTimeout(function(){
s.style.display="none";
},4e3)));
},
resetTips:function(t){
setTimeout(function(){
var i=t||o.tipsDom;
i&&(i.style.top=document.body.scrollTop+"px");
},0);
}
};
return i.on(window,"scroll",function(){
s.resetTips();
}),s;
});define("appmsg/like_profile_tpl.html.js",[],function(){
return'<!-- ?????? -->\n<!-- ???????????????wx_follow_hide????????????function_mod_inner?????????????????????function_mod??????-->\n<div class="wx_follow_context wx_follow_hide" id="js_like_profile_bar">\n    <div class="function_mod js_function_mod">\n        <div class="function_mod_inner js_function_mod_inner">\n        <div class="function_hd">???????????????????????????</div>\n        <div class="function_bd">\n            <div class="wx_follow_media weui-flex">\n            <div class="wx_follow_hd">\n                <img class="wx_follow_avatar" src="{roundHeadImg}" alt="<#=nickname#>">\n\n            </div>\n            <div class="wx_follow_bd weui-flex__item">\n                <div class="wx_follow_nickname">{nickname}</div>\n                <div class="wx_follow_tips">\n                    {if orignalNum}\n                    <span class="wx_follow_tips_meta">{orignalNum}???????????????</span>\n                    {/if}\n                    {if friendSubscribeCount}\n                    <span class="wx_follow_tips_meta">{friendSubscribeCount} friend(s) following</span>\n                    {/if}\n                </div>\n            </div>\n            <div class="wx_follow_ft">\n                <button class="weui-btn weui-btn_primary weui-btn_xmini" type="button" id="js_focus">Follow</button>\n                <button class="weui-btn weui-btn_primary weui-btn_xmini weui-btn_disabled" type="button" id="js_already_focus" style="display: none;">?????????</button>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n';
});define("biz_common/template-2.0.1-cmd.js",[],function(){
"use strict";
var e=function(n,t){
return e["object"==typeof t?"render":"compile"].apply(e,arguments);
};
return window.template=e,function(e,n){
e.version="2.0.1",e.openTag="<#",e.closeTag="#>",e.isEscape=!0,e.isCompress=!1,e.parser=null,
e.render=function(e,n){
var t=r(e);
return void 0===t?o({
id:e,
name:"Render Error",
message:"No Template"
}):t(n);
},e.compile=function(n,r){
function a(t){
try{
return new l(t)+"";
}catch(i){
return u?(i.id=n||r,i.name="Render Error",i.source=r,o(i)):e.compile(n,r,!0)(t);
}
}
var c=arguments,u=c[2],s="anonymous";
"string"!=typeof r&&(u=c[1],r=c[0],n=s);
try{
var l=i(r,u);
}catch(p){
return p.id=n||r,p.name="Syntax Error",o(p);
}
return a.prototype=l.prototype,a.toString=function(){
return l.toString();
},n!==s&&(t[n]=a),a;
},e.helper=function(n,t){
e.prototype[n]=t;
},e.onerror=function(e){
var t="[template]:\n"+e.id+"\n\n[name]:\n"+e.name;
e.message&&(t+="\n\n[message]:\n"+e.message),e.line&&(t+="\n\n[line]:\n"+e.line,
t+="\n\n[source]:\n"+e.source.split(/\n/)[e.line-1].replace(/^[\s\t]+/,"")),e.temp&&(t+="\n\n[temp]:\n"+e.temp),
n.console&&console.error(t);
};
var t={},r=function(r){
var o=t[r];
if(void 0===o&&"document"in n){
var i=document.getElementById(r);
if(i){
var a=i.value||i.innerHTML;
return e.compile(r,a.replace(/^\s*|\s*$/g,""));
}
}else if(t.hasOwnProperty(r))return o;
},o=function(n){
function t(){
return t+"";
}
return e.onerror(n),t.toString=function(){
return"{Template Error}";
},t;
},i=function(){
e.prototype={
$render:e.render,
$escape:function(e){
return"string"==typeof e?e.replace(/&(?![\w#]+;)|[<>"']/g,function(e){
return{
"<":"&#60;",
">":"&#62;",
'"':"&#34;",
"'":"&#39;",
"&":"&#38;"
}[e];
}):e;
},
$string:function(e){
return"string"==typeof e||"number"==typeof e?e:"function"==typeof e?e():"";
}
};
var n=Array.prototype.forEach||function(e,n){
for(var t=this.length>>>0,r=0;t>r;r++)r in this&&e.call(n,this[r],r,this);
},t=function(e,t){
n.call(e,t);
},r="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",o=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,i=/[^\w$]+/g,a=new RegExp(["\\b"+r.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),c=/\b\d[^,]*/g,u=/^,+|,+$/g,s=function(e){
return e=e.replace(o,"").replace(i,",").replace(a,"").replace(c,"").replace(u,""),
e=e?e.split(/,+/):[];
};
return function(n,r){
function o(n){
return g+=n.split(/\n/).length-1,e.isCompress&&(n=n.replace(/[\n\r\t\s]+/g," ")),
n=n.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n"),n=w[1]+"'"+n+"'"+w[2],
n+"\n";
}
function i(n){
var t=g;
if(p?n=p(n):r&&(n=n.replace(/\n/g,function(){
return g++,"$line="+g+";";
})),0===n.indexOf("=")){
var o=0!==n.indexOf("==");
if(n=n.replace(/^=*|[\s;]*$/g,""),o&&e.isEscape){
var i=n.replace(/\s*\([^\)]+\)/,"");
$.hasOwnProperty(i)||/^(include|print)$/.test(i)||(n="$escape($string("+n+"))");
}else n="$string("+n+")";
n=w[1]+n+w[2];
}
return r&&(n="$line="+t+";"+n),a(n),n+"\n";
}
function a(e){
e=s(e),t(e,function(e){
h.hasOwnProperty(e)||(c(e),h[e]=!0);
});
}
function c(e){
var n;
"print"===e?n=O:"include"===e?(y.$render=$.$render,n=j):(n="$data."+e,$.hasOwnProperty(e)&&(y[e]=$[e],
n=0===e.indexOf("$")?"$helpers."+e:n+"===undefined?$helpers."+e+":"+n)),m+=e+"="+n+",";
}
var u=e.openTag,l=e.closeTag,p=e.parser,f=n,d="",g=1,h={
$data:!0,
$helpers:!0,
$out:!0,
$line:!0
},$=e.prototype,y={},m="var $helpers=this,"+(r?"$line=0,":""),v="".trim,w=v?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=v?"if(content!==undefined){$out+=content;return content}":"$out.push(content);",O="function(content){"+b+"}",j="function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);"+b+"}";
t(f.split(u),function(e){
e=e.split(l);
var n=e[0],t=e[1];
1===e.length?d+=o(n):(d+=i(n),t&&(d+=o(t)));
}),f=d,r&&(f="try{"+f+"}catch(e){e.line=$line;throw e}"),f="'use strict';"+m+w[0]+f+"return new String("+w[3]+")";
try{
var E=new Function("$data",f);
return E.prototype=y,E;
}catch(T){
throw T.temp="function anonymous($data) {"+f+"}",T;
}
};
}();
e.openTag="{",e.closeTag="}",e.parser=function(n){
n=n.replace(/^\s/,"");
var t=n.split(" "),r=t.shift(),o=e.keywords,i=o[r];
return i&&o.hasOwnProperty(r)?(t=t.join(" "),n=i.call(n,t)):e.prototype.hasOwnProperty(r)?(t=t.join(","),
n="=="+r+"("+t+");"):(n=n.replace(/[\s;]*$/,""),n="="+n),n;
},e.keywords={
"if":function(e){
return"if("+e+"){";
},
"else":function(e){
return e=e.split(" "),e="if"===e.shift()?" if("+e.join(" ")+")":"","}else"+e+"{";
},
"/if":function(){
return"}";
},
each:function(e){
e=e.split(" ");
var n=e[0]||"$data",t=e[1]||"as",r=e[2]||"$value",o=e[3]||"$index",i=r+","+o;
return"as"!==t&&(n="[]"),"$each("+n+",function("+i+"){";
},
"/each":function(){
return"});";
},
echo:function(e){
return"print("+e+");";
},
include:function(e){
e=e.split(" ");
var n=e[0],t=e[1],r=n+(t?","+t:"");
return"include("+r+");";
}
},e.helper("$each",function(e,n){
var t=Array.isArray||function(e){
return"[object Array]"===Object.prototype.toString.call(e);
};
if(t(e))for(var r=0,o=e.length;o>r;r++)n.call(e,e[r],r,e);else for(r in e)n.call(e,e[r],r);
});
}(e,window),e;
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var r=arguments[t];
for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);
}
return e;
};
define("appmsg/reward_entry.js",["biz_wap/ui/weui.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js","appmsg/open_url_with_webview.js","common/utils.js","biz_wap/utils/device.js","appmsg/loading.js","common/comm_report.js","appmsg/pay_read_utils.js","biz_wap/utils/jsmonitor_report.js","appmsg/rec_report_key.js"],function(e,t,r,n){
"use strict";
function a(e){
e&&(e.style.display="block");
}
function i(e){
e&&(e.style.display="none");
}
function d(e){
v.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
pass_ticket:window.pass_ticket,
scene:S.scene,
title:S.title,
ct:ct,
devicetype:S.devicetype,
version:S.version,
is_need_reward:S.is_need_reward,
reward_uin_count:S.is_need_reward?3*p:0,
send_time:S.send_time||"",
item_show_type:window.item_show_type||"",
rtId:S.appmsgextRtId,
rtKey:S.appmsgextRtKey,
is_pay_subscribe:window.isPaySubscribe,
pay_subscribe_uin_count:window.isPaySubscribe?3*k.getCountPerLine():0,
onSuccess:function(t){
t&&(e||(z.rewardLink&&m.off(z.rewardLink,"click",q),z.authorAvatarLink&&m.off(z.authorAvatarLink,"click",F),
D=[],s({
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
timestamp:t.timestamp,
reward_author_head:t.reward_author_head,
rewardsn:t.rewardsn,
can_whisper:t.can_whisper
})),console.log("reloadRewardData:",t,e),k.init(t.pay_subscribe_info,{
rewardTotal:t.reward_total_count,
rewardTotalCut:t.is_reward_total_count_cut
},!0));
},
onError:function(){}
});
}
function o(e,t,r){
if("link"===r){
var a="#wechat_redirect";
e=e.replace(a,"&__tc=1"+a);
}
var i=function(){
U.src=t+"&qrcode_timestamp="+1*new Date+"#wechat_redirect";
},d=null;
return function(t){
if(t.preventDefault(),"link"===r&&S.is_teenager)return weui.alert("??????????????????????????????"),
void T.setSum(232209,0,1);
if("0"==S.user_can_reward)return void n("??????????????????????????????????????????????????????????????????");
if(B(L.kReward),S.isWindowsWechat){
var a=function(){
var e="js_author_reward_qrcode",t="reward_pop_show",r=document.getElementById(e);
if(r.classList.contains(t))return{
v:void 0
};
i(),d=setInterval(i,12e4),r.classList[z.rewardLink.getBoundingClientRect().top<222?"add":"remove"]("reward_pop_bottom"),
r.classList.add(t);
var n=function a(n){
if(r.classList.contains(t)){
for(var i=n.target;null!==i&&i.id!==e;)i=i.parentNode;
(null===i||i.id!==e)&&(r.classList.remove(t),clearInterval(d),d=null,m.off(window,"click",a));
}
};
setTimeout(function(){
m.on(window,"click",n);
},1);
}();
if("object"===("undefined"==typeof a?"undefined":_typeof(a)))return a.v;
}else"avatar"===r&&window.__addIdKeyReport?window.__addIdKeyReport(S.likeHeadId,S.likeHeadKey):window.__addIdKeyReport&&window.__addIdKeyReport(S.likeBtnId,S.likeBtnKey),
f.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
});
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,r=(Math.ceil((b.getInnerHeight()-188)/42)+1)*Math.floor((t-15)/42);
_="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+r+"&source=1#wechat_redirect";
var n="#wechat_redirect",s="";
s="https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+S.author_id+"&idx="+idx+"&scene="+S.authorPageScene+"&rscene="+S.authorPageRscene+"&from_scene="+window.source+"&from_subscene="+window.subscene+"&from_enterid="+window.enterid+"&from_sessionid="+window.sessionid+"&is_fans="+e.isFans,
e.rewardsn&&(s+="&rewardsn="+e.rewardsn),s+=n,-1==navigator.userAgent.indexOf("Android")||S.author_id||(s="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1&rewardsn="+e.rewardsn+n);
var u=z.rewardLink,v=z.authorAvatarLink;
if(!G&&b.listenStateChange({
cb:function(e){
if("onResume"==e.state_change||"onResume"==e.state)if(u){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=H)return;
localStorage.setItem("lastOnresumeTime",t),g.isAndroid&&!S.author_id&&f.invoke("setNavigationBarColor",{
actionCode:"1"
}),d();
}else d(!0);
}
}),G=!0,u){
var x="/mp/authorreward?action=getqrcode&author_id="+S.author_id+"&rewardsn="+e.rewardsn+"&timestamp="+e.timestamp+"&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&size=160";
if(q=o(s,x,"link"),F=o(s,x,"avatar"),m.on(u,"click",q),S.author_id&&1==e.can_reward&&v&&m.on(v,"click",F),
1==e.can_reward&&S.author_id&&z.reward){
a(document.getElementById("js_reward_author")),a(z.authorAvatarLink),z.rewardAuthorHead&&z.rewardAuthorHead.setAttribute("src",e.reward_author_head),
z.reward.classList.add("reward_area_primary");
var I=z.rewardLinkText;
I&&(I.innerText="Like the Author",Math.random()<.05?I.innerText="Kudos to the Author":Math.random()>.05&&Math.random()<.1&&(I.innerText="Love the Author")),
z.rewardTotalText&&(z.rewardTotalText.innerText=" like(s)"),S.isWindowsWechat&&z.reward.classList.add("reward_area_win"),
!b.isNativePage()&&e.can_whisper?J():Y();
}
}
A=e.reward_head_imgs;
var j=c();
z.reward&&(S.author_id||g.isAndroid)&&1==e.can_reward?(a(z.reward),m.on(window,"load",function(){
l&&(m.off(window,"scroll",l),m.on(window,"scroll",l));
})):i(z.reward);
var k=document.getElementById("js_reward_inner");
!window.isPaySubscribe&&k&&j>0&&a(k);
var T=[].concat(A),E=document.getElementById("js_reward_total");
if(M=16*p,D=[].concat(A),E)if(E.innerText=e.reward_total,S.isWindowsWechat){
var L=E.parentNode;
L.dataset.hasEvent||!function(){
var t=document.getElementById("js_reward_pagination"),r=t.getElementsByClassName("js_reward_pagination_curpage")[0],n=Math.ceil(e.reward_total/M),d=1,o=!0,s=document.getElementById("js_reward_list"),c=function(t,r){
for(var a=(t-1)*M,i=o?3*p:0,d=document.createDocumentFragment(),c=a+i,l=t===n?e.reward_total:t*M;l>c;c++)w(d,r?window.defaultAvatarUrl:D[c]);
return!o&&(s.innerHTML=""),s.appendChild(d),o=!1,r?function(){
for(var e=s.getElementsByClassName("reward_user_avatar"),t=i,r=e.length;r>t;t++)e[t].firstElementChild.src=D[a+t];
}:!1;
};
r.innerHTML=d,t.getElementsByClassName("js_reward_pagination_totalpage")[0].innerHTML=n;
var l="/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&count="+M,u=null,_=function(t){
var r=D.length;
e.reward_total>r&&t*M>r?(u=null,u=c(t,!0),h({
url:l+"&offset="+(t-1)*M+"#wechat_redirect",
type:"GET",
success:function(e){
try{
e=JSON.parse(e),e.reward_heads=JSON.parse(e.reward_heads).reward_heads;
}catch(t){
e={};
}
e.base_resp&&0===e.base_resp.ret&&(e.reward_heads.forEach(function(e){
var t=T.indexOf(e);
t>-1?T.splice(t,1):D.push(e);
}),"function"==typeof u&&u());
}
})):c(t);
};
j<e.reward_total&&!function(){
z.reward.classList.add("reward_avatar_overflow");
for(var w=s.children[0];1!==w.nodeType;)w=reward.nextElementSibling;
var c=getComputedStyle(w),l=w.offsetHeight+parseInt(c.marginBottom)+parseInt(c.marginTop);
R=function(t){
s.style.height="fold"===t?3*l+"px":n>d?l*Math.ceil(M/p)+"px":l*Math.ceil(e.reward_total%M/p)+"px";
},R("fold"),m.on(L,"click",function(){
z.reward.classList.contains("reward_avatar_unfold")?(z.reward.classList.remove("reward_avatar_unfold"),
n>1&&i(t),R("fold")):(1===d&&o&&_(d),z.reward.classList.add("reward_avatar_unfold"),
n>1&&a(t),R("unfold"));
}),n>1&&m.on(t,"click",function(e){
var t=e.target;
if(t.classList.contains("js_reward_pagination_prev")){
if(d--,r.innerHTML=d,_(d),1===d&&(t.disabled=!0),d===n-1){
for(;t&&!t.classList.contains("js_reward_pagination_next");)t=t.nextElementSibling;
t&&(t.disabled=!1),R("unfold");
}
}else if(t.classList.contains("js_reward_pagination_next")&&(d++,r.innerHTML=d,_(d),
d===n&&(t.disabled=!0,R("unfold")),2===d)){
for(;t&&!t.classList.contains("js_reward_pagination_prev");)t=t.previousElementSibling;
t&&(t.disabled=!1);
}
});
}(),L.dataset.hasEvent=1;
}();
}else E.setAttribute("data-href",_),E.getAttribute("data-hasevent")||(m.on(E,"click",function(){
var e=E.getAttribute("data-href");
return y(e,{
sample:1,
reject:function(){
location.href=e;
}
}),!1;
}),E.setAttribute("data-hasevent",1));
}
function w(e,t){
var r=document.createElement("span");
r.className="reward_user_avatar";
var n=new Image;
return n.onload=function(){
window.logs&&window.logs.reward_heads_total++,n.onload=n.onerror=null;
},n.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
n.onload=n.onerror=null;
},n.src=t,r.appendChild(n),e.appendChild(r),r;
}
function c(e){
var t=D.length?D:A;
if(t.length){
var r=document.getElementById("js_reward_list"),n=0,a=document.createDocumentFragment();
if(r){
var i=z.reward.classList.contains("reward_avatar_unfold");
if("function"==typeof R&&R(i?"unfold":"fold"),!e){
for(var d=0,o=t.length;o>d&&(n++,w(a,t[d]),i||n!==3*p)&&n!==(M||16*p);++d);
n>p&&(r.className+=" tl"),r.innerHTML="",r.appendChild(a);
}
}
return n;
}
}
function l(){
if(z.reward){
var e=window.pageYOffset||document.documentElement.scrollTop;
if(e+b.getInnerHeight()>z.reward.offsetTop){
var t="__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&item_show_type="+item_show_type;
window.cgiData&&window.cgiData.vid&&(t+="&vid="+cgiData.vid),h({
type:"GET",
url:"/bizmall/reward?act=report&"+t,
async:!0
}),m.off(window,"scroll",l),l=null;
}
}
}
function u(e){
"undefined"!=typeof e.scene&&(S.scene=e.scene),"undefined"!=typeof e.is_need_reward&&(S.is_need_reward=e.is_need_reward),
"undefined"!=typeof e.title&&(S.title=e.title),"undefined"!=typeof e.author_id&&(S.author_id=e.author_id),
"undefined"!=typeof e.user_can_reward&&(S.user_can_reward=e.user_can_reward),"undefined"!=typeof e.appmsgextRtId&&(S.appmsgextRtId=e.appmsgextRtId),
"undefined"!=typeof e.appmsgextRtKey&&(S.appmsgextRtKey=e.appmsgextRtKey),"undefined"!=typeof e.likeHeadId&&(S.likeHeadId=e.likeHeadId),
"undefined"!=typeof e.likeHeadKey&&(S.likeHeadKey=e.likeHeadKey),"undefined"!=typeof e.likeBtnId&&(S.likeBtnId=e.likeBtnId),
"undefined"!=typeof e.likeBtnKey&&(S.likeBtnKey=e.likeBtnKey),"undefined"!=typeof e.authorPageScene&&(S.authorPageScene=e.authorPageScene),
"undefined"!=typeof e.authorPageRscene&&(S.authorPageRscene=e.authorPageRscene),
"undefined"!=typeof e.devicetype&&(S.devicetype=e.devicetype),"undefined"!=typeof e.version&&(S.version=e.version),
"undefined"!=typeof e.send_time&&(S.send_time=e.send_time);
}
e("biz_wap/ui/weui.js");
var p,_,m=e("biz_common/dom/event.js"),h=e("biz_wap/utils/ajax.js"),f=e("biz_wap/jsapi/core.js"),g=e("biz_wap/utils/mmversion.js"),v=e("appmsg/appmsgext.js"),y=e("appmsg/open_url_with_webview.js"),b=e("common/utils.js"),x=e("biz_wap/utils/device.js"),I=e("appmsg/loading.js"),j=e("common/comm_report.js"),k=e("appmsg/pay_read_utils.js"),T=e("biz_wap/utils/jsmonitor_report.js"),E=e("appmsg/rec_report_key.js"),L=E.RecActionType,B=E.reportRecAction,S={
scene:window.source||"",
is_need_reward:!1,
is_teenager:window.is_teenager,
title:window.msg_title||"",
author_id:window.author_id||"",
user_can_reward:!0,
appmsgextRtId:"",
appmsgextRtKey:"",
likeHeadId:"110809",
likeHeadKey:"2",
likeBtnId:"110809",
likeBtnKey:"3",
authorPageScene:"142",
authorPageRscene:"128",
devicetype:window.devicetype||"",
version:window.version||"",
send_time:window.send_time||"",
isWindowsWechat:-1!==window.navigator.userAgent.indexOf("WindowsWechat"),
whisperMaxLen:40,
focusTag:!1,
doubleInputChar:["??????","??????","??????","??????","??????","??????","??????","??????","??????","??????","[]","??????","{}","()","<>"],
sendLock:!1
},z={
reward:document.getElementById("js_reward_area"),
rewardLink:document.getElementById("js_reward_link"),
authorAvatarLink:document.getElementById("js_reward_avatar"),
rewardAuthorHead:document.getElementById("js_reward_author_head"),
rewardLinkText:document.getElementById("js_reward_link_text"),
rewardTotalText:document.getElementById("js_reward_total_text"),
whisperWrap:document.getElementById("js_reward_whisper"),
whisperDialogShow:document.getElementById("js_show_whisper_dialog"),
whisperDialogHide:document.getElementById("js_hide_whisper_dialog"),
whisperDialogMask:document.getElementById("js_whisper_dialog_mask"),
whisperDialog:document.getElementById("js_reward_whisper_dialog"),
whisperTextarea:document.getElementById("js_whisper_text"),
whisperMsg:document.getElementById("js_whisper_msg"),
whisperCnt:document.getElementById("js_whisper_current_cnt"),
whisperSend:document.getElementById("js_whisper_send")
},A=[],H=500,R=null,M=0,D=[];
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var K,W=function(e){
var t=e.target;
"TEXTAREA"!==t.tagName&&"BUTTON"!==t.tagName&&(e.preventDefault(),e.stopPropagation());
},C=function(e){
var t=e.targetTouches||[];
if(t.length>0){
var r=t[0]||{};
K=r.clientY;
}
},O=function(e){
var t=!1,r=e.changedTouches,n=this.scrollTop,a=this.offsetHeight,i=this.scrollHeight;
if(r.length>0){
var d=r[0]||{},o=d.clientY;
t=o>K&&0>=n?!1:K>o&&n+a>=i?!1:!0,t||e.preventDefault();
}
},P=function(){
document.addEventListener("touchmove",W,{
passive:!1
}),z.whisperTextarea.addEventListener("touchstart",C,{
passive:!1
}),z.whisperTextarea.addEventListener("touchmove",O,!1);
},N=function(){
document.removeEventListener("touchmove",W,{
passive:!1
}),z.whisperTextarea.removeEventListener("touchstart",C,{
passive:!1
}),z.whisperTextarea.removeEventListener("touchmove",O,!1);
},q=function(){},F=function(){},U=document.getElementById("js_author_reward_qrcode_img"),J=function(){
return a(z.whisperWrap);
},Y=function(){
return i(z.whisperWrap);
},G=!1,$=function(e){
var t=0;
try{
t=1*window.atob(window.biz);
}catch(r){}
var n={
BizUin:t,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
IsFans:1*e||0
},d=function(e){
return weui.alert(e&&e>S.whisperMaxLen?"???????????????????????????":"Network unavailable. Try again later.");
},o=function(){
if(!z.whisperSend.disabled&&!S.sendLock){
S.sendLock=!0,j.report(19048,_extends({
EventType:3
},n)),I.show("Sending");
var e=z.whisperTextarea.value.replace(/^\s+|\s+$/g,"");
h({
url:"/mp/author?action=whisper",
data:{
__biz:window.biz||window.__biz,
mid:window.mid||window.appmsgid,
idx:window.idx,
content:e,
scene:window.source,
subscene:window.subscene,
enterid:window.enterid,
sessionid:window.sessionid
},
type:"POST",
success:function(t){
try{
t=JSON.parse(t);
}catch(r){
t={};
}
S.sendLock=!1,I.hide(),t&&t.base_resp&&0===t.base_resp.ret?(s(),Y(),weui.toast("Posted",1e3)):d(e.length);
},
error:function(){
S.sendLock=!1,I.hide(),d();
}
});
}
},s=function(){
i(z.whisperDialog),z.whisperTextarea.value="",z.whisperSend.disabled=!0,N();
};
m.on(z.whisperDialogShow,"click",function(){
j.report(19048,_extends({
EventType:2
},n)),a(z.whisperDialog),z.whisperTextarea.focus(),P();
}),m.on(z.whisperDialogHide,"mousedown",s),m.on(z.whisperDialogMask,"mousedown",s),
m.on(z.whisperTextarea,"input",function(e){
var t=e.target.value.replace(/^\s+|\s+$/g,"").length;
t>S.whisperMaxLen?(z.whisperSend.disabled=!0,z.whisperCnt.innerHTML=t,z.whisperMsg.style.visibility="visible"):(z.whisperSend.disabled=0===t,
z.whisperMsg.style.visibility="hidden"),x.os.ios&&e.data&&S.doubleInputChar.indexOf(e.data)>-1&&(S.focusTag=!0);
}),m.on(z.whisperTextarea,"click",function(e){
if(x.os.ios&&S.focusTag){
var t=e.target;
t.blur(),t.focus(),S.focusTag=!1;
}
}),m.on(z.whisperSend,"mousedown",o);
};
return{
handle:function(e,t){
p=t,u(e),1==e.can_reward&&S.author_id&&z.reward&&$(e.isFans),s(e);
},
render:function(e){
p=e,c(!0);
},
bindWhisperEvent:$,
showWhisperWrap:J
};
});