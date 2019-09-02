$(function () {
 

    $('.detectionAnimated').on('transitionend', function() {
        $(this).closest('.show').addClass('animated');
    });

    // 滚动进度栏
	// ------------------------------
    $(window).on('load scroll', function() {
        var docHeight = $(document).height();
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var completion = windowPos / (docHeight - windowHeight);
        console.log(windowWidth)
        if (docHeight <= windowHeight) {
          $('#progress').width(windowWidth);
        } else {
            $('#progress').width(completion * windowWidth);
        }
    });
        
    
    // 输入按钮
	// ------------------------------
    var initEntryButton = function () {
        $('.block-entry-button').on('click', function (e) {
            e.preventDefault();

            var url = 'https://baidu.com';

            $('.entry-gate-block').addClass('show');
            setTimeout(function () {
                $('.entry-gate-block').addClass('start');
            }, 50);
            setTimeout(function () {
                // 在此处过渡到窗体
                window.location.href = url;
            }, 1600);
            setTimeout(function () {
                $('.entry-gate-block').removeClass('show').removeClass('start');
            }, 1900);
            
        });
    }
    initEntryButton();

    
	// 平滑滚动
	// ------------------------------
	$('a[href^="#"]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "easeOutCubic");
		return false;
	});


    // 菜单
    // ----------------------------
	$('#btnNav').click(function(){
        if ($('header').hasClass('open')) {
            $('header').removeClass('open');
            $('header').addClass('close');
            setTimeout(function(){
                $('#gNav').removeClass('show');
                $('header').removeClass('close');                
            },600);
        } else {
            $('header').addClass('open');
            $('#gNav').addClass('show');
        }
	});

    
    // iPad 时间更改视口
    // ----------------------------    
    if(navigator.userAgent.indexOf('iPad') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('A1_07') > 0 || navigator.userAgent.indexOf('SC-01C') > 0){
        $('head').prepend('<meta name="viewport" content="' + 'width=1280px' + '" id="viewport">');
    }

    
    addClassToBodyByBrowser();

    
});

$(window).on('load scroll resize',function(){
    
    // 在特定位置启动动画
    // ------------------------------ 
    var scrolltop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var pcPos = 250;
    var spPos = 150;
    $('.startAnim').each(function(){
        if( window.matchMedia('(max-width:767px)').matches ){
            var elmPos = $(this).offset().top + spPos;
        } else {
            var elmPos = $(this).offset().top + pcPos;
        }   
        // 如果尚未在滚动中，请跳过
        if (scrolltop < elmPos - windowHeight + 0){
            return;
        }

        // 授予 css 动画启动类
        $(this).addClass('show');
    });

});

// 使用较低页面
// ------------------------------
if($('body').hasClass('low')) {
    
    // SP 的小标头
    // ------------------------------
    $(window).on('load scroll', function() {
        if ($(this).scrollTop() > 0) { 
            $("header").addClass('forSp')
        } else { // 除了
            $("header").removeClass('forSp')
        }
    });

}

// 类由 UA 和操作系统提供给正文
// ------------------------------
function addClassToBodyByBrowser() {
    // UserAgent
    var ua = window.navigator.userAgent.toLowerCase();
    if(navigator.userAgent.toLowerCase().indexOf('win') != -1){
    }else if(navigator.userAgent.toLowerCase().indexOf('mac') != -1) {
          $('body').addClass('mac');
    }

    // UA 判定＆処理
    $('body').removeClass('ie');
    $('body').removeClass('edge');
    $('body').removeClass('chrome');
    $('body').removeClass('safari');
    $('body').removeClass('firefox');
	$('body').removeClass('android');
    if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
        // IE
        $('body').addClass('ie');
    } else if (ua.indexOf('edge') != -1) {
        // Edge
        $('body').addClass('edge');
    } else if (ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1) {
        // Android
		$('body').addClass('android');
    } else if (ua.indexOf('chrome') != -1) {
        // Chrome
        $('body').addClass('chrome');
    } else if (ua.indexOf('safari') != -1) {
        // Safari
        $('body').addClass('safari');
    } else if (ua.indexOf('firefox') != -1) {
        // FireFox
        $('body').addClass('firefox');
    }
}
