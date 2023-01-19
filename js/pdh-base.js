/* Responsive Status Check */
function sCheck(){
	
	var	wc	=	$('.s_check'),
		wcL	=	wc.find('.sc_l').css('display'),
		wcP	=	wc.find('.sc_p').css('display'),
		wcT	=	wc.find('.sc_t').css('display'),
		wcM	=	wc.find('.sc_m').css('display');
	
	
	return "block" === wcL ? "l" : "block" === wcP ? "p" : "block" === wcT ? "t" : "block" === wcM ? "m" : void 0

}

/* Slide */
function fnSlide({ dom, loop, auto, center, direct, effect, breakPoint }) {

    var $dom = $(dom),
        $domP = $dom.parents('.s_o'),
        status = sCheck();

    var sSlide;

    if ($dom.length > 0) {

        /* s: set */
        var strSW = 's_w',
            strSL = 'sw_l'
            sL = $domP.find('.' + strSL),
            sLleng = sL.length,
            sC = $domP.find('.s_c'),
            btnPrev = $domP.find('.btn_prev'),
            btnNext = $domP.find('.btn_next'),
            btnPause = $domP.find('.btn_pause'),
            btnPlay = $domP.find('.btn_play'),
            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
            sP = $domP.find('.s_p'),
            sPleng = sP.length,
            sG = $domP.find('.s_g');

        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());
        !auto && (btnPlay.hide(), btnPause.hide());

        sSlide = new Swiper(dom, {
            wrapperClass: strSW,
            slideClass: strSL,
            loop: loop,
            autoplay: auto,
            centeredSlides: !center ? false : true,
            direction: !direct ? 'horizontal' : direct,
            effect: !effect ? 'slide' : effect,
            slidesPerView: "auto",
            slidesPerGroup: 1,
            nested: true,
            pagination: sPleng > 0 && {
                el: sP[0],
                clickable: true,
                renderBullet: function(i, c) {
                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                }
            },
            navigation: isBtn && {
                prevEl: btnPrev[0],
                nextEl: btnNext[0]
            },
            on: {
                init: function(a) {
                    var $wrap = $(a.el).parents('.s_o');
                    var isCount = $wrap.find('.s_c').length > 0;
                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                    isCount && ($wrap.find('.s_c strong').text(1), $wrap.find('.s_c span').text(listleng));
                    $wrap.find('.swiper-slide-duplicate a').attr('tabindex', '-1');
                },
                transitionStart: function(a) {
                    var $wrap = $(a.el).parents('.s_o');
                    var isGauge = $wrap.find('.s_g').length > 0;
                    if (isGauge) {
                        $wrap.find('.s_g i').removeAttr('style');
                        setTimeout(function(){
                            $wrap.find('.s_g i').css({
                                'width': '100%',
                                'transition': 'width 2.99s linear'
                            });
                        }, 10);
                    }
                },
                transitionEnd: function(a) {
                    var $wrap = $(a.el).parents('.s_o');
                    var isCount = $wrap.find('.s_c').length > 0;
                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                    isCount && ($wrap.find('.s_c strong').text(a.realIndex + 1), $wrap.find('.s_c span').text(listleng));
                    if (auto) {
                        if ($wrap.find('.btn_pause').css('display') !== 'none') {
                            a.autoplay.start();
                        } else {
                            a.autoplay.stop();
                        }
                    }
                }
            }
        });

        /* custom event */
        var $wrap = $(sSlide.el).parents('.s_o');
        var domLastFocus = loop ? $wrap.find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + ' a"]') : $wrap.find('.sw_l:last-child a');

        if (auto) {
            btnPlay.hide();
            btnPause.click(function() {
                if (sSlide !== undefined) {
                    sSlide.autoplay.stop();
                    $(this).next().show();
                    $(this).hide();
                    return false;
                }
            });
            btnPlay.click(function() {
                if (sSlide !== undefined) {
                    sSlide.autoplay.start();
                    $(this).prev().show();
                    $(this).hide();
                    return false;
                }
            });
        }

        $wrap.find('.s_w .sw_l a').focusin(function() {
            if (sSlide !== undefined) {
                var isFirstIndex = loop ? $(this).parents('.sw_l').attr('data-swiper-slide-index') === '0' : $(this).parents('.sw_l').index() === 0;
                if (auto) {
                    sSlide.autoplay.stop();
                    $wrap.find('.btn_pause').hide();
                    $wrap.find('.btn_play').show();
                }
                loop ? (isFirstIndex && sSlide.slideToLoop(0)) : (isFirstIndex && sSlide.slideTo(0));
            }
        });

        $wrap.find('.s_w').focusout(function() {
            if (sSlide !== undefined) {
                if (auto) {
                    sSlide.autoplay.start();
                    $wrap.find('.btn_pause').show();
                    $wrap.find('.btn_play').hide();
                }
            }
        });

        domLastFocus.keydown(function(e) {
            if (sSlide !== undefined) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 9) {
                    sSlide.slideTo(0);
                    if (auto) {
                        sSlide.autoplay.start();
                        $wrap.find('.btn_pause').show();
                        $wrap.find('.btn_play').hide();
                    }
                }
            }
        });

        /* e: set */

        if (breakPoint !== undefined) {

            $(window).on('resize', $.debounce(80, function(){

                var status = sCheck(),
                    isSame = breakPoint.includes(status);

                if (isSame) {
                    if (sSlide !== undefined) {
                        return;
                    } else {

                        /* s: set */
                        var strSW = 's_w',
                            strSL = 'sw_l'
                            sL = $domP.find('.' + strSL),
                            sLleng = sL.length,
                            sC = $domP.find('.s_c'),
                            btnPrev = $domP.find('.btn_prev'),
                            btnNext = $domP.find('.btn_next'),
                            btnPause = $domP.find('.btn_pause'),
                            btnPlay = $domP.find('.btn_play'),
                            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
                            sP = $domP.find('.s_p'),
                            sPleng = sP.length;

                        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());
                        !auto && (btnPlay.hide(), btnPause.hide());

                        sSlide = new Swiper(dom, {
                            wrapperClass: strSW,
                            slideClass: strSL,
                            loop: loop,
                            autoplay: auto,
                            centeredSlides: !center ? false : true,
                            direction: !direct ? 'horizontal' : direct,
                            effect: !effect ? 'slide' : effect,
                            slidesPerView: "auto",
                            slidesPerGroup: 1,
                            nested: true,
                            pagination: sPleng > 0 && {
                                el: sP[0],
                                clickable: true,
                                renderBullet: function(i, c) {
                                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                                }
                            },
                            navigation: isBtn && {
                                prevEl: btnPrev[0],
                                nextEl: btnNext[0]
                            },
                            on: {
                                init: function(a) {
                                    var $wrap = $(a.el).parents('.s_o');
                                    var isCount = $wrap.find('.s_c').length > 0;
                                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                                    isCount && ($wrap.find('.s_c strong').text(1), $wrap.find('.s_c span').text(listleng));
                                    $wrap.find('.swiper-slide-duplicate a').attr('tabindex', '-1');
                                },
                                transitionEnd: function(a) {
                                    var $wrap = $(a.el).parents('.s_o');
                                    var isCount = $wrap.find('.s_c').length > 0;
                                    var listleng = $wrap.find('.sw_l:not(".swiper-slide-duplicate")').length;
                                    isCount && ($wrap.find('.s_c strong').text(a.realIndex + 1), $wrap.find('.s_c span').text(listleng));
                                    if (auto) {
                                        if ($wrap.find('.btn_pause').css('display') !== 'none') {
                                            a.autoplay.start();
                                        } else {
                                            a.autoplay.stop();
                                        }
                                    }
                                }
                            }
                        });

                        /* custom event */
                        var $wrap = $(sSlide.el).parents('.s_o');
                        var domLastFocus = loop ? $wrap.find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + ' a"]') : $wrap.find('.sw_l:last-child a');

                        if (auto) {
                            btnPlay.hide();
                            btnPause.click(function() {
                                if (sSlide !== undefined) {
                                    sSlide.autoplay.stop();
                                    $(this).next().show();
                                    $(this).hide();
                                    return false;
                                }
                            });
                            btnPlay.click(function() {
                                if (sSlide !== undefined) {
                                    sSlide.autoplay.start();
                                    $(this).prev().show();
                                    $(this).hide();
                                    return false;
                                }
                            });
                        }

                        $wrap.find('.s_w .sw_l a').focusin(function() {
                            if (sSlide !== undefined) {
                                var isFirstIndex = loop ? $(this).parents('.sw_l').attr('data-swiper-slide-index') === '0' : $(this).parents('.sw_l').index() === 0;
                                if (auto) {
                                    sSlide.autoplay.stop();
                                    $wrap.find('.btn_pause').hide();
                                    $wrap.find('.btn_play').show();
                                }
                                loop ? (isFirstIndex && sSlide.slideToLoop(0)) : (isFirstIndex && sSlide.slideTo(0));
                            }
                        });

                        $wrap.find('.s_w').focusout(function() {
                            if (sSlide !== undefined) {
                                if (auto) {
                                    sSlide.autoplay.start();
                                    $wrap.find('.btn_pause').show();
                                    $wrap.find('.btn_play').hide();
                                }
                            }
                        });

                        domLastFocus.keydown(function(e) {
                            if (sSlide !== undefined) {
                                var keyCode = e.keyCode || e.which;
                                if (keyCode === 9) {
                                    sSlide.slideTo(0);
                                    if (auto) {
                                        sSlide.autoplay.start();
                                        $wrap.find('.btn_pause').show();
                                        $wrap.find('.btn_play').hide();
                                    }
                                }
                            }
                        });

                        /* e: set */
    
                    }
                } else {
                    if (sSlide === undefined) {
                        return;
                    } else {
                        sSlide.destroy(true, true);
                        sSlide = undefined;
                    }
                }

            }));

            var isSame = breakPoint.includes(status);

            if (!isSame) {
                sSlide.destroy(true, true);
                sSlide = undefined;
            }

        }
    
    }
    
}

/* slide tab */
function fnSlideTab() {

    if ($('.tab_scrl').length > 0) {
        new Swiper('.tab_scrl', {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });
    }
    
}

function fnResSlideTab({dom, breakPoint}) {

    var sSlide;
    var status = sCheck();
    var $dom = $(dom);

    if ($dom.length > 0) {

        sSlide = new Swiper(dom, {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });

        if (breakPoint !== undefined) {

            $(window).on('resize', $.debounce(80, function(){
    
                var isSame = breakPoint.includes(status);
    
                if (isSame) {
    
                    if (sSlide !== undefined) {
                        return;
                    } else {
    
                    }
    
                } else {
                    if (sSlide === undefined) {
                        return;
                    } else {
                        sSlide.destroy(true, true);
                        sSlide = undefined;
                    }
                }
    
            }));
    
            var isSame = breakPoint.includes(status);
            
            if (!isSame) {
                sSlide.destroy(true, true);
                sSlide = undefined;
            }
    
        }

    }

}

/* Tab Common */
function tabCommon(wrapClass) {

    var tabWrap = $(wrapClass),
        tabList = tabWrap.find(".tab_list li"),
        tabContent = tabWrap.find(".tab_content");

    tabList.removeClass("on");
    tabList.first().addClass("on");
    tabList.find("a .hdn").remove();
    tabList.first().find("a").append('<em class="hdn">선택된 탭</em>');
    tabContent.removeClass("on");
    tabContent.first().addClass("on");

    tabList.find("a").click(function() {

        var 
        	thP = $(this).parent(),
            thPIdx = thP.index(),
        	isOn = thP.hasClass("on");

        if (!isOn) {
            tabList.removeClass("on");
            tabList.find("a .hdn").remove();
            thP.addClass("on");
            $(this).append('<em class="hdn">선택된 탭</em>');
            tabContent.removeClass("on");
            tabContent.eq(thPIdx).addClass('on');
        }
        
        var sTab = $(this).parents('.s_tab'),
        	isSTab = sTab.length > 0,
        	thPIdx = thP.index(),
	        thPLeft = thPIdx === 0 ? (thP.position().left - 8) : (thP.position().left);
        
        if (isSTab) {
        	sTab.animate({ scrollLeft: thPLeft }, 160, 'swing');
        }

        return false;
    });
    
}

/* Tab Accessibility */
function tabAccess(wrapClass) {

    var tabWrap = $(wrapClass),
        tabBox = tabWrap.find(".tab_box"),
        tabTitle = tabWrap.find(".tab_box .tab_title a");

    tabBox.removeClass("on");
    tabBox.first().addClass("on");
    tabBox.find(".tab_title a .hdn").remove();
    tabBox.first().find(".tab_title a").append('<em class="hdn">선택된 탭</em>');

    tabTitle.click(function() {
        tabBox.removeClass("on");
        $(this).parents(".tab_box").addClass("on");
        tabBox.find(".tab_title a .hdn").remove();
        $(this).append('<em class="hdn">선택된 탭</em>');

        return false;
    });

}

/* after hasCheck */
function afterHasCheck(dom, f, isResize, ratio) {
    var $dom = $(dom);
    $dom.length > 0 && $dom.each(!ratio ? f : function(){
        f($(this), ratio);
    });
    isResize && $(window).on('resize', $.debounce(80, function(){
        $dom.length > 0 && $dom.each(!ratio ? f : function(){
            f($(this), ratio);
        });
    }));
}

/*
    className : lt_l
    afterHasCheck('.lt_l', listToggle)
 */
function listToggle() {

    var th = $(this),
        thP = th.parent('.lt_p'),
        isOpen = thP.hasClass("open");

    !isOpen ? (th.append('<em class="hdn">열기</em>')) : (th.append('<em class="hdn">닫기</em>'));

    th.click(function() {

        var thP = $(this).parent('.lt_p'),
            isOpen = thP.hasClass("open"),
            thTxt = $(this).find(".hdn");

        !isOpen ? (thP.addClass("open"), thTxt.text("닫기")) : (thP.removeClass("open"), thTxt.text("열기"));

        var thPP = $(this).parents('.lt_ap'),
            thPPLinkText = thPP.find('.lt_al .hdn'),
            thPPList = thPP.find('.lt_p'),
            thPPListLeng = thPPList.length,
            checkNum = 0;

        thPPList.each(function(){
            var isOpen = $(this).hasClass('open');
            isOpen ? checkNum += 1 : checkNum -= 1;
        });

        if (checkNum === thPPListLeng) {
            thPP.addClass('open');
            thPPLinkText.text('닫기');
        } else if (checkNum === thPPListLeng * -1) {
            thPP.removeClass('open');
            thPPLinkText.text('열기');
        }

        return false;

    });
}
function listAllToggle() {

    var th = $(this),
        thP = th.parents('.lt_ap'),
        isOpen = thP.hasClass("open"),
        thPlist = thP.find('.lt_p');

    !isOpen ? (th.append('<em class="hdn">열기</em>'), thPlist.removeClass('open')) : (th.append('<em class="hdn">닫기</em>'), thPlist.addClass('open'));

    th.click(function(){

        var thP = $(this).parents('.lt_ap'),
            thTxt = $(this).find(".hdn"),
            isOpen = thP.hasClass("open"),
            thPlist = thP.find('.lt_p'),
            thPlistLinkTxt = thPlist.find('.lt_l .hdn');

        if (!isOpen) {
            thP.addClass("open");
            thTxt.text("닫기");
            thPlist.addClass('open');
            thPlistLinkTxt.text('닫기');
        } else {
            thP.removeClass("open");
            thTxt.text("열기");
            thPlist.removeClass("open");
            thPlistLinkTxt.text('열기');
        }

        return false;

    });
}

/*
    className : dt_l
    afterHasCheck('.dt_l', targetToggle)
 */
function targetToggle() {

    var th = $(this),
        thTargetDiv = $("." + th.attr("data-target")),
        thBtnCloseTop = $(thTargetDiv.find(".btn_popup_close")[0]);
        thBtnCloseBottom = $(thTargetDiv.find(".btn_popup_close")[1])
        isIbw = thTargetDiv.find('.ib_w').length > 0,
        $html = $('html'),
        bdShadow = $('.body_shadow');

    thTargetDiv.length > 0 && thTargetDiv.css({
        'opacity': 0,
        'transition' : 'opacity 0.16s ease-out'
    }).hide();

    th.click(function() {
        var isOpen = thTargetDiv.hasClass('open');
        var isBody = th.hasClass('bd_on');
        var isHidden = th.hasClass('bd_hdn');
        if (!isOpen) {
            isBody && bdShadow.addClass('open');
            isHidden && $html.addClass('of_h');
            thTargetDiv.show();
            setTimeout(function(){
                thTargetDiv.addClass("open").css('opacity', 1);
                thBtnCloseTop.focus();
            }, 160);
            (isIbw && afterHasCheck('.ib_w', inlineBlockWidth));
        } else {
            isBody && bdShadow.removeClass('open');
            isHidden && $html.removeClass('of_h');
            thTargetDiv.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                thTargetDiv.hide();
            }, 160);
        }
        return false;
    });

    thBtnCloseTop.click(function() {
        var isBody = th.hasClass('bd_on');
        var isHidden = th.hasClass('bd_hdn');
        isBody && bdShadow.removeClass('open');
        isHidden && $html.removeClass('of_h');
        thTargetDiv.removeClass("open").css('opacity', 0);
        setTimeout(function(){
            thTargetDiv.hide();
        }, 160);
        th.focus();

        return false;
    });

    thBtnCloseBottom.click(function() {
        var isBody = th.hasClass('bd_on');
        var isHidden = th.hasClass('bd_hdn');
        isBody && bdShadow.removeClass('open');
        isHidden && $html.removeClass('of_h');
        thTargetDiv.removeClass("open").css('opacity', 0);
        setTimeout(function(){
            thTargetDiv.hide();
        }, 160);
        th.focus();

        return false;
    });

}

/*
    className : a
    afterHasCheck('a', newWindow)
 */
function newWindow() {
    var th = $(this),
        thTarget = th.attr("target"),
        thTitle = th.attr("title");

    if (thTarget === "_blank") {
        th.append('<i class="ico_window"><em class="hdn">새창</em></i>');    
        (thTitle === undefined || thTitle === null || thTitle === "") && th.attr("title", "새창");
    }
}
/*
    className : [class^="tab_"] .on a
    afterHasCheck('[class^="tab_"] .on a', tabSelected)
 */
function tabSelected() {
    $(this).attr("title", '선택된 탭');
}
/* 
    className : target 
    afterHasCheck(target, domRatio, true, ratio)
*/
// function domRatio(th, ratio) {
//     th.css('height', th.outerWidth() * ratio);
// }
/* 
    className : ib_w 
    afterHasCheck('.ib_w', inlineBlockWidth)
*/
function inlineBlockWidth() {
    var thClass = $(this).parent().attr('class');
    var isPdl = thClass.includes('pd_l');
    var pdVal = isPdl ? Number(thClass.split(' ')[0].split('pd_l')[1]) : 0;
    $(this).parent().css({
        'width': $(this).outerWidth() + pdVal
    });
}
/* 
    className : f_unit
    afterHasCheck('.f_unit', fUnitTextWidth)
*/
function fUnitTextWidth() {
    $(this).find('input').css({
        'padding-right': $(this).find('.f_txt').outerWidth()
    })
}
/* 
    className : form_area
    afterHasCheck('.form_area', formAreaTitleWidth)
*/
function formAreaTitleWidth() {

    var arr = [],
        th = $(this),
        thList = th.find('> ul > li'),
        thtitle = th.find('.fa_title'),
        isTitle = thtitle.length > 0,
        isPdNone = th.hasClass('pd_n'),
        per = 16;

    if (isPdNone) return;

    if (isTitle) {
        thList.each(function(){
            arr.push($(this).find('.fa_title').outerWidth());
        });
        arr.sort(function(a, b){ return b - a });
        thList.css('padding-left', arr[0] + per);
    }

}
/* 
    className : s_tab
    afterHasCheck('.s_tab', subTabScroll)
*/
function subTabScroll() {

    var th = $(this),
        thW = th.outerWidth(),
        thUl = th.find('ul'),
        thLi = th.find('li'),
        liOn = th.find('.on'),
        liOnPosX = liOn.position().left,
        thPd = 16,
        x = 0;

    th.scrollLeft(liOnPosX - (thPd / 2));
    thLi.each(function(){
        x =  x + $(this).outerWidth();
    });
    thW < x ? thUl.css('width', x + thPd) : thUl.removeAttr('style');

}

function boardLinkWidth() {

    var th = $(this);
    th.each(function(){
        var _th = $(this);
            isEps = _th.hasClass('board_link_elps'),
            thLink = _th.find('.bl_link'),
            thLinkNot = _th.find('> *').not('.bl_link'),
            totalWidth = 0;
        if (isEps) {
            thLinkNot.each(function(){
                totalWidth += $(this).outerWidth() + 10;
            });
        }
        thLink.css('max-width', 'calc(100% - ' + parseInt(totalWidth) + 'px)');
    });

}

function fCheckToggle() {

    var fci = $('.f_check input');

    fci.keydown(function(e){
        var codeKey = e.keyCode || e.which;
        if (codeKey === 13) {
            $(this).trigger('click');
        }
    });

}

function layerAlert({th, tit, cont, pf, cf, nf}){
    var $html = $('html');
    var $body = $('body');

    $html.addClass('of_h');
    var la = `<div class="layer_alert">
        <div>
            <button class="btn_close"><em class="hdn">닫기</em></button>
            ${!!tit ? `<div class="la_t"><h3 class="fs_18 fw_500">${tit}</h3></div>` : ''}
            <div class="la_c">
                ${cont}
            </div>
            <div class="la_b">
                <div class="b_btn">
                    <button class="btn btn_xs btn_gray btn_cancel"><span>취소</span></button>
                    ${!!cf ? '<button class="btn btn_xs btn_black btn_common"><span>일반</span></button>' : ''}
                    ${!!pf ? '<button class="btn btn_xs btn_black btn_confirm"><span>확인</span></button>' : ''}
                </div>
            </div>
        </div>
    </div>
    `;
    $body.append(la);
    $('.layer_alert .btn_close').focus();
    $('.layer_alert .btn_close').click(function(){
        $('.layer_alert').remove();
        $html.removeClass('of_h');
        $(th).focus();
    });
    $('.layer_alert .btn_cancel').click(function(){
        !!nf && nf();
        $('.layer_alert').remove();
        $html.removeClass('of_h');
        $(th).focus();
    })
    !!pf && $('.layer_alert .btn_confirm').click(function(){
        pf();
        $('.layer_alert').remove();
        $html.removeClass('of_h');
        $(th).focus();
    });
    !!cf && $('.layer_alert .btn_common').click(function(){
        cf();
        $('.layer_alert').remove();
        $html.removeClass('of_h');
        $(th).focus();
    });
};

// modalClose('.a') - x / modalClose('#a') - x / modalClose('a') - o, className
function modalClose(dom) {
    var $dom = $('.' + dom);
    $('html').removeClass('of_h');
    $dom.removeClass("open").css('opacity', 0);
    setTimeout(function(){
        $dom.hide();
    }, 160);
    $("[data-target='" + dom + "']").focus();
    return false;
}

function loadingOpen() {
    var $body = $('body');
    var l = `<div class="loading"><div></div></div>`;
    $body.append(l);
}

function loadingClose() {
    $('.loading').remove();
}


/* header relate function */

var glhCount = 0;
var gphCount = 0;

function gnbTgl() {

    var status = sCheck(),
        bs = $('.body_shadow'),
        h = $('.header'),
        g = $('.gnb'),
        hH = 118,
        gLi = g.find('> ul > li');
    var gs = $('.global_search'),
        mm = $('.my_menu');

    if (status === 'l' && glhCount === 0) {
        var arr = [];
        gLi.each(function(){
            var childH = $(this).find('> div').outerHeight() || 0;
            arr.push(childH);
        });
        g.attr('data-l-height', Math.max.apply(null, arr) + hH);
        glhCount = 1;
    } else if (status === 'p' && gphCount === 0) {
        var arr = [];
        gLi.each(function(){
            var childH = $(this).find('> div').outerHeight() || 0;
            arr.push(childH);
        });
        g.attr('data-p-height', Math.max.apply(null, arr) + hH);
        gphCount = 1;
    }

    gLi.on('mouseenter', function(){
        var status = sCheck();
        bs.addClass('visible');
        status === 'l' ? h.css('height', g.attr('data-l-height')) : h.css('height', g.attr('data-p-height'));
        gLi.css('height', (status === 'l' ? (80 + g.attr('data-l-height')) : (80 + g.attr('data-p-height'))));
        gLi.removeClass('over');
        $(this).addClass('over');

        gs.hasClass('open') && (
            gs.removeClass("open").css('opacity', 0),
            setTimeout(function(){
                gs.hide();
            }, 160),
            gs.find('.gs_form input').val('')
        );
        mm.hasClass('open') && (
            mm.find('.mm_b').removeClass('open'),
            mm.removeClass("open").css('opacity', 0),
            bs.removeClass('visible_mm'),
            setTimeout(function(){
                mm.hide();
            }, 160)
        );
    });

    g.on('mouseleave', function(){
        bs.removeClass('visible');
        h.removeAttr('style');
        gLi.removeClass('over');
    });

    gLi.on('focusin', function(){
        var status = sCheck();
        bs.addClass('visible');
        status === 'l' ? h.css('height', g.attr('data-l-height')) : h.css('height', g.attr('data-p-height'));
        gLi.css('height', (status === 'l' ? (80 + g.attr('data-l-height')) : (80 + g.attr('data-p-height'))));
        gLi.removeClass('over');
        $(this).addClass('over');

        gs.hasClass('open') && (
            gs.removeClass("open").css('opacity', 0),
            setTimeout(function(){
                gs.hide();
            }, 160),
            gs.find('.gs_form input').val('')
        );
        mm.hasClass('open') && (
            mm.find('.mm_b').removeClass('open'),
            mm.removeClass("open").css('opacity', 0),
            bs.removeClass('visible_mm'),
            setTimeout(function(){
                mm.hide();
            }, 160)
        );;
    });

    g.on('focusout', function(){
        bs.removeClass('visible');
        h.removeAttr('style');
        gLi.removeClass('over');
    });

    $(window).resize(function(){
        var status = sCheck();
        if (status === 'l' && glhCount === 0) {
            var arr = [];
            gLi.each(function(){
                var childH = $(this).find('> div').outerHeight() || 0;
                arr.push(childH);
            });
            g.attr('data-l-height', Math.max.apply(null, arr) + hH);
            glhCount = 1;
        } else if (status === 'p' && gphCount === 0) {
            var arr = [];
            gLi.each(function(){
                var childH = $(this).find('> div').outerHeight() || 0;
                arr.push(childH);
            });
            g.attr('data-p-height', Math.max.apply(null, arr) + hH);
            gphCount = 1;
        }
    });
    
}

function mymenuTgl() {

    var btnOpen = $('.header .btn_mymenu');
    var btnOpen_ = $('.global_menu .gm_t .btn_mymenu');
    var mm = $('.my_menu');
    var bs = $('.body_shadow');
    var btnClose = mm.find('.mm_t .btn_close');

    mm.css({
        'opacity': 0,
        'transition' : 'transform 0.16s ease-out, opacity 0.16s ease-out'
    }).hide();

    btnOpen.click(function() {
        var isOpen = mm.hasClass('open');
        if (!isOpen) {
            bs.addClass('visible_mm');
            mm.show();
            setTimeout(function(){
                mm.addClass("open").css('opacity', 1);
                btnClose.focus();
            }, 160);
        } else {
            mm.find('.mm_b').removeClass('open');
            bs.removeClass('visible_mm');
            mm.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                mm.hide();
            }, 160);
            btnOpen.focus();
        }

        var gs = $('.global_search');
        var gsIsOpen = gs.hasClass('open');

        if (gsIsOpen) {
            bs.removeClass('visible');
            gs.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                gs.hide();
            }, 160);
            gs.find('.gs_form input').val('');
        }
        
        return false;
    });

    btnOpen_.click(function() {
        var isOpen = mm.hasClass('open');
        if (!isOpen) {
            bs.addClass('visible_mm');
            mm.show();
            setTimeout(function(){
                mm.addClass("open").css('opacity', 1);
                btnClose.focus();
            }, 160);
        } else {
            mm.find('.mm_b').removeClass('open');
            bs.removeClass('visible_mm');
            mm.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                mm.hide();
            }, 160);
            btnOpen_.focus();
        }

        var gs = $('.global_search');
        var gsIsOpen = gs.hasClass('open');

        if (gsIsOpen) {
            bs.removeClass('visible');
            gs.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                gs.hide();
            }, 160);
            gs.find('.gs_form input').val('');
        }
        
        return false;
    });

    btnClose.click(function() {
        mm.find('.mm_b').removeClass('open');
        bs.removeClass('visible_mm');
        mm.removeClass("open").css('opacity', 0);
        setTimeout(function(){
            mm.hide();
        }, 160);
        btnOpen.focus();
        return false;
    });

    var btnSettingOpen = mm.find('.mm_util .mmu_btns .btn_setting');
    var mmb = mm.find('.mm_b');
    var btnSettingClose = mmb.find('.mmb_t .btn_close');

    btnSettingOpen.click(function() {
        var isOpen = mmb.hasClass('open');
        if (!isOpen) {
            mmb.addClass('open');
            btnSettingClose.focus();
        } else {
            mmb.removeClass('open');
            btnSettingOpen.focus();
        }
        return false;
    });

    btnSettingClose.click(function() {
        mmb.removeClass('open');
        btnSettingOpen.focus();
        return false;
    });

}

function globalsearchTgl() {

    var btnOpen = $('.header .btn_globalsearch');
    var gs = $('.global_search');
    var gsFormInput = gs.find('.gs_form input');
    var bs = $('.body_shadow');
    var btnClose = gs.find('.gs_t .btn_close');

    gs.css({
        'opacity': 0,
        'transition' : 'transform 0.16s ease-out, opacity 0.16s ease-out'
    }).hide();

    btnOpen.click(function() {
        var isOpen = gs.hasClass('open');
        if (!isOpen) {
            bs.addClass('visible');
            gs.show();
            setTimeout(function(){
                gs.addClass("open").css('opacity', 1);
                gsFormInput.focus();
            }, 160);
        } else {
            bs.removeClass('visible');
            gs.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                gs.hide();
            }, 160);
            gs.find('.gs_form input').val('');
            btnOpen.focus();
        }

        var mm = $('.my_menu');
        var mmb = mm.find('.mm_b');
        var mmIsOpen = mm.hasClass('open');

        if (mmIsOpen) {
            mm.find('.mm_b').removeClass('open'),
            bs.removeClass('visible_mm');
            mm.removeClass("open").css('opacity', 0);
            mmb.removeClass('open');
            setTimeout(function(){
                mm.hide();
            }, 160);
        }
        
        return false;
    });

    btnClose.click(function() {
        bs.removeClass('visible');
        gs.removeClass("open").css('opacity', 0);
        setTimeout(function(){
            gs.hide();
        }, 160);
        gs.find('.gs_form input').val('');
        btnOpen.focus();
        return false;
    });

    gsFormInput.on('focusin', function(){
        if ($(this).val() !== '') {
            gs.find('.gs_result').addClass('open');
            gs.find('.gs_b').removeClass('open');
            console.log('입력');
        } else {
            gs.find('.gs_result').removeClass('open');
            gs.find('.gs_b').addClass('open');
            console.log('빈값');
        }
        console.log('포커스들어옴');
    });
    gsFormInput.on('focusout', function(){
        $('.gs_b').removeClass('open');
        console.log('포커스벗어남');
    });
    gsFormInput.on("propertychange change keyup paste input", function(){
        if ($(this).val() !== '') {
            gs.find('.gs_result').addClass('open');
            gs.find('.gs_b').removeClass('open');
            console.log('입력');
        } else {
            gs.find('.gs_result').removeClass('open');
            gs.find('.gs_b').addClass('open');
            console.log('빈값');
        }
    });

}

function globalmenuTgl() {

    var btnOpen = $('.header .btn_globalmenu');
    var gm = $('.global_menu');
    var gmt = gm.find('.gm_t');
    var gmc = gm.find('.gm_c');
    var gmb = gm.find('.gm_b');
    var bd = $('body');
    var btnClose = gm.find('.gm_t .btn_close');

    gm.css({
        'opacity': 0,
        'transition' : 'opacity 0.16s ease-out'
    }).hide();

    btnOpen.click(function() {
        bd.addClass('of_h');
        gm.show();
        gmb.css('height', 'calc(100% - ' + (gmt.outerHeight() + gmc.outerHeight()) + 'px)');
        setTimeout(function(){
            gm.addClass("open").css('opacity', 1);
            btnClose.focus();
        }, 160);

        var gs = $('.global_search');
        var bs = $('.body_shadow');
        var gsIsOpen = gs.hasClass('open');

        if (gsIsOpen) {
            bs.removeClass('visible');
            gs.removeClass("open").css('opacity', 0);
            setTimeout(function(){
                gs.hide();
            }, 160);
            gs.find('.gs_form input').val('');
        }

        return false;
    });

    btnClose.click(function() {
        bd.removeClass('of_h');
        gm.removeClass("open").css('opacity', 0);
        setTimeout(function(){
            gm.hide();
        }, 160);
        btnOpen.focus();
        return false;
    });

    var gmLi = gm.find('.gm_list > ul > li');
    gmLi.each(function(){
        var hasChild = $(this).find('ul').length > 0;
        hasChild && (
            $(this).addClass('lt_p'),
            $(this).find('> a').addClass('lt_l'),
            $(this).find('> div').addClass('lt_c')
        )
    });

    $(window).resize(function(){
        var status = sCheck();
        var isOpen = gm.hasClass('open');
        ((status === 'l' || status === 'p') && isOpen) && (
            bd.removeClass('of_h'),
            gm.removeClass("open").css('opacity', 0),
            setTimeout(function(){
                gm.hide();
            }, 160)
        )
    });

}

function popupDoc02Layout() {
    var pd02 = $('.popup_doc02');
    var pd02tH = pd02.find('.pd_t').outerHeight();
    var pd02b = pd02.find('.pd_b');
    pd02b.css('height', 'calc(100vh - ' + pd02tH + 'px)');
    var emptyH = 0;

    $(window).on('resize', $.debounce(80, function(){
        var pd02tH = pd02.find('.pd_t').outerHeight();
        if (emptyH !== pd02tH) {
            pd02b.css('height', 'calc(100vh - ' + pd02tH + 'px)');
            emptyH = pd02tH;
        }
    }));
}

$(document).ready(function(){

    gnbTgl();
    mymenuTgl();
    globalsearchTgl();
    globalmenuTgl();

    afterHasCheck('a', newWindow);
    afterHasCheck('.lt_l', listToggle);
    afterHasCheck('.lt_al', listAllToggle);
    afterHasCheck('.dt_l', targetToggle);
    afterHasCheck('.ib_w', inlineBlockWidth);
    afterHasCheck('.f_unit', fUnitTextWidth);
    // afterHasCheck('.s_tab', subTabScroll);
    afterHasCheck('.board_link', boardLinkWidth);
    afterHasCheck('[class^="tab_"] .on a', tabSelected);
    afterHasCheck('.form_area', formAreaTitleWidth);
    fCheckToggle();
    // fnSlideTab();
    fnResSlideTab({dom: '.tab_scrl'});
    $('.scrollbar-inner').scrollbar();

    popupDoc02Layout();

});

$(document).mouseup(function(e){
    $('.lt_p').each(function(){
        var th = $(this);
        if (th.has(e.target).length === 0) {
            var isOpen = th.hasClass('open');
            if (isOpen) {
                th.removeClass('open');
                th.find('.lt_l em.hdn').text('열기');
            }
        }
    });
});