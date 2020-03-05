// ==UserScript==
// @name        智慧树挂机脚本(改)
// @description 改自simpsonlau的脚本.支持见面课半自动挂机.主要功能为:跳过视频内试题 1.5倍加速 自动下一章 自动切换标清
// @icon        http://assets.zhihuishu.com/icon/favicon.ico
// @match	    *://*.zhihuishu.com/*
// @namespace   http://tampermonkey.net/
// @version	    1.0
// @author      llwxi & simpsonlau & LengSword
// @grant       none
// ==/UserScript==

/* jshint esversion: 6 */

//ablePlayerX('mediaplayer').options
//saveCacheIntervalTime

(function() {
    'use strict';
    const $ = window.jQuery;
    //$(window).contents();

    function query() {

        //保持播放状态
        if($("video")[0].paused){
            $("#playButton").click()
        }

        // 模拟弹题答题测试
        if ($(".el-dialog[aria-label='弹题测验']").length > 0) {
            $(".el-dialog").find(".topic-item")[0].click();
            $(".el-dialog__headerbtn")[5].click();
            // console.log('关闭窗口');
        }

        //自动切换下一个视频
        if ($(".clearfix.video.current_play>div>b").eq(1).attr("class") == "fl time_icofinish" || $("video")[0].ended) {
            console.log("123123");
            var _this = $(".clearfix.video.current_play");
            if(_this.next().length){
                console.log("1111");
                _this.next().click()
            }else{
                _this.parents(".list").next().find(".clearfix.video")[0].click();
            }

        }

        // 高清则切换
        if($(".definiLines .active")[0].className === "line1gq switchLine active") {
            // console.log('切换到标清');
            $(".line1bq")[0].click();
        }

        //静音
        if ($("video")[0].volume > 0) {
            $(".volumeIcon").click();
        }

        //自动切换到1.5倍
        if ($("video").length > 0 && $("video")[0].playbackRate != 1.5) {
            console.log('切换到1.5倍');
            $(".speedTab15")[0].click();
        }
    }
    $(window).ready(function(){
        //判断是直播课还是录播课，再用定时器不断的触发函数
        if(window.location.href.indexOf("lc.zhihuishu.com/live/vod_room.html") !== -1) {
           // window.setInterval(liveQuery, 1000);
        } else {
            window.setInterval(query, 1000);
        }
    })
})();