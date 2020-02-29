// UI LIB 0.7
// banisle@gmail.com

'use strict';
var context = window,
    $root = $(document.documentElement).addClass("js"),
    tmpInput = document.createElement("input"),
    isTouch = ("ontouchstart" in context),
    isMobile = ("orientation" in context) || isTouch || window.IS_MOBILE === true,
    supportPlaceholder = ("placeholder" in tmpInput),
    detectIe = get_version_of_IE();

isTouch && $root.addClass("touch");
isMobile && $root.addClass("mobile");

function get_version_of_IE() { //ie aegent 체크
    var word;
    var agent = navigator.userAgent.toLowerCase();
    // IE old version ( IE 10 or Lower ) 
    if (navigator.appName == "Microsoft Internet Explorer") word = "msie ";
    // IE 11 
    else if (agent.search("trident") > -1) word = "trident/.*rv:";
    // Microsoft Edge  
    else if (agent.search("edge/") > -1) word = "edge/";
    // 그외, IE가 아니라면 ( If it's not IE or Edge )  
    else return -1;
    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
    if (reg.exec(agent) != null) return parseInt(RegExp.$1 + RegExp.$2);
    return -1;
}

if (!(window.console && console.log)) {
    console = {
        log: function () {},
        debug: function () {},
        info: function () {},
        warn: function () {},
        error: function () {}
    };
}


if (typeof Function.prototype.bind === "undefined") {
    Function.prototype.bind = function () {
        var fn = this,
            args = arraySlice.call(arguments),
            object = args.shift();
        return function (context) {
            var local_args = args.concat(arraySlice.call(arguments));
            if (this !== window) {
                local_args.push(this)
            }
            return fn.apply(object, local_args)
        }
    }
}

var TNUI = TNUI || {};

TNUI.module = (function () {
    // (sta) TNUI returm module
    return {
        
        // mark :scrollUi
        scrollUi: function () {
            
            // 모바일 체크
            // console.log('pc',!isMobile);

            if (!isMobile) {

                var scrollWrap = $('.ui-scrollview'),
                    scrollArea = scrollWrap.find('.ui-scrollarea'),
                    scrollCt = scrollArea.find('.ui-content'),
                    scrollBar = scrollWrap.find('.ui-scrollbar'),
                    barCursor = scrollBar.find('.bar'),
                    down = false,
                    rangeTop,
                    rangeSize;

                if (scrollWrap.length !== 0) {
                    //scroll width & height 구하기
                        var i = 0;

                        scrollWrap.each(function (i) {
                            var wrapW = scrollWrap.eq(i).parent().width(),
                                wrapH = scrollCt.eq(i).prop('scrollHeight'),
                                wrapOrgH = scrollWrap.eq(i).height(),
                                barSize = parseFloat((wrapOrgH / wrapH) * 100);

                            // console.log(
                            //     'wrapW' + wrapW,
                            //     'wrapOrgH' + wrapOrgH,
                            //     'wrapH' + wrapH,
                            //     'barSize' + barSize
                            //     );
                            scrollWrap.eq(i).width(wrapW);
                            scrollCt.eq(i).width(wrapW).height(wrapOrgH);

                            barCursor.eq(i).height(barSize + '%');

                        });

                        // scrollbar 위치 구하기
                        scrollArea.on('scroll', function () {
                            var t = $(this),
                                wrapH = t.find('.ui-content').prop('scrollHeight'),
                                wrapOrgH = t.parent().height(),
                                barCursor = t.parent().find('.bar'),
                                barSize = barCursor.height(),
                                scTop = $(this).scrollTop(),
                                scTopPer = parseFloat(scTop / ((wrapH - wrapOrgH) / 100)),
                                barPer = (wrapOrgH - barSize) / 100;

                            barCursor.eq(i).css({
                                'top': parseFloat(barPer * scTopPer) + 'px'
                            });
                        });

                        scrollBar.on('mousedown', function (e) {
                            var t = $(this);
                                rangeTop = t.offset().top,
                                rangeSize = t.height();
                                scrollCt = t.closest(scrollWrap).find(scrollArea),
                                down = true;

                                
                            // console.log(scrollCt);


                            return false;
                        });

                        $(document).on('mousemove', function (e) {
                            updateDrag(e);
                        });

                        $(document).on('mouseup', function () {
                            down = false;
                        });

                        //스크롤바 drag 이벤트
                        var updateDrag = function(e) {
                            var t = $(e.target),
                                barCursor = t.closest(scrollWrap).find('.bar'),
                                barSize = parseFloat(barCursor.height()) / 2,
                                curTop = e.pageY - rangeTop - barSize,
                                curScTop = Math.round((curTop * 100) / (rangeSize - (barSize * 2)) * (scrollCt.find('.ui-content').prop('scrollHeight') - scrollCt.height()) / 100);

                            // console.log('updateDrag',e.pageY,rangeTop,barSize);

                            if (down && e.pageY >= (rangeTop + barSize) && e.pageY <= (rangeTop + rangeSize - barSize)) {
                                barCursor.css('top', curTop + 'px');
                                scrollCt.scrollTop(curScTop);

                            }
                            
                        }




                    // 리사이즈시 적용
                    var thisObj = this;

                    $(window).on('resize', function () {
                        clearTimeout(window.resizedFinished);
                        window.resizedFinished = setTimeout(function () {
                            thisObj.scrollUi();
                            // console.log('s');

                        }, 250);
                    });


                    // console.log('scrollUi');
                }
            }
        },
        // mark : init
        init: function () {
            // var t = this;

            // t.tabUi();
            // t.selectUi();
            // t.tooltipUi();
            // t.modalUi();
            // t.scrollUi();
            // t.accoUi();
        }

    }
    // (end) TNUI returm module



})();

