var Main = (function ($) {

    var SP_WIDTH = 767;
    var MAX_INTRO_BLOCK = 5;
    
    var IS_DEBUG = false;
	
    var init = function () {
        var is_movie_played = true;
        var pan_image_index = 0;

		// TOP调整视频大小
		// ------------------------------
        if (is_movie_played) {
            adjustTopMovieSize();
        }

		// 首字母缩写处的动画
		// ------------------------------
        setTimeout(function () {
            IS_INTRO_MOTION = true;

            $('header').addClass('show');
            $('.top-skip').addClass('show');

            $('.bt-skip').on('click', function (e) {
                e.preventDefault();

                IS_INTRO_MOTION = false;
                $('.top-skip').addClass('on').removeClass('show');
                $('.intro-animation-block').hide();

                Main.showMainCopy();
            });

			//访问2次以上跳过前奏
			if($.cookie("access") == undefined) {
				//首次访问
				$('body').addClass('mainContentsHidden');
				setTimeout(function () {
					introAnimation(1);
				}, 1000);
				$.cookie("access","onece");

			} else {
				//第二次访问后
				IS_INTRO_MOTION = false;
				$('.top-skip').addClass('on').removeClass('show');
				$('.intro-animation-block').hide();

				Main.showMainCopy();
			}
            
            // Sp 布局
            if (document.documentElement.clientWidth <= SP_WIDTH) {
                // SP 的背景设置
                panBackgroundImage();
            }

        }, 1000);
        
        function introAnimation(_i) {
            var iab = $('.intro-animation-block[data-animation-index=' + _i + ']');
            var body_duration = parseInt(iab.data('body-duration'));

            iab.addClass('start');

            // 1.5秒以后开始文本动画
            setTimeout(function () {
                if (IS_INTRO_MOTION) iab.find('h3.en').addClass('show');
            }, 150);
            setTimeout(function () {
                if (IS_INTRO_MOTION) iab.find('h3.jp').addClass('show');
            }, 250);
            //四秒钟后完成
            setTimeout(function () {
                if (IS_INTRO_MOTION) iab.addClass('finish');
            }, body_duration);
            // 5.5秒後到下一个场景
            setTimeout(function () {
                if (IS_INTRO_MOTION) {
                    _i++;

                    if (_i >= MAX_INTRO_BLOCK) {
                        IS_INTRO_MOTION = false;
                        $('.top-skip').addClass('on').removeClass('show');
                        $('.intro-animation-block').hide();

                        Main.showMainCopy();
                    } else {
                        introAnimation(_i);
                    }
                }
            }, body_duration + 1500);
        }
        
        function panBackgroundImage() {
            var imageIndex = 0;
            var autoSlideDuration = 12000; //10000;
            var autoSlideDiff = 1000;
            var pan_images = $('.bg-pan').find('.pan-image');
            var image_length = pan_images.length;

            if (image_length > 1) {

                // 与自动滑动操作相关
                var setAutoSlideTimer = function () {
                    autoSlideTimer = setTimeout(function () {
                        autoSlideImage();
                    }, autoSlideDuration - autoSlideDiff);
                }
                var autoSlideImage = function () {
                    isAutoSlide = true;

                    var index = imageIndex;
                    if (index == image_length - 1) index = 0;
                    else index++;

                    switchMainImage(index);

                    imageIndex = index;
                }

                // 切换自动幻灯片
                var switchMainImage = function (i) {
                    // $('.pan-image').filter('.selected').removeClass('selected');
                    // $('.pan-image').eq(i).addClass('selected');

                    var a = $('.pan-image').filter('.selected');
                    var b = $('.pan-image').eq(i).addClass('selected');

                    setTimeout(function () {
                        a.removeClass('selected').css({
                            'z-index': '1'
                        });
                        b.css({
                            'z-index': '2'
                        });
                    }, autoSlideDiff);


                    // $('.head-slide-indicator a').filter('.selected').removeClass('selected');
                    // $('.head-slide-indicator a').eq(i).addClass('selected');

                    setAutoSlideTimer();
                }

                // 第一次呼叫
                autoSlideImage();
            }
        }
        
        function adjustTopMovieSize() {
            var r = 16 / 9;
            var w = $(window).width();
            var h = $(window).height();

            // SP 布局
            if (document.documentElement.clientWidth <= SP_WIDTH) {
                // h = $(window).width();
                var l = '-' + Math.abs((h * r - w) * 0.5);
                // console.log('A',$(window).width(),h,r,h*r,l);
                w = h * r;
                $('#yt-movie-top').css({
                    left: l + 'px',
                    top: 0
                });
                $('#yt-movie-top').css({
                    width: w,
                    height: (w / r)
                });
            }
            //在 PC 布局 
            else {
                // ヨコ:>100%、縦:100%
                if (h > w / r) {
                    // h = w / r;
                    var l = '-' + Math.abs((h * r - w) * 0.5);
                    // console.log('B1',$(window).width(),h,r,h*r,l);
                    w = h * r;
                    $('#yt-movie-top').css({
                        left: l + 'px',
                        top: 0
                    });
                }
                // ヨコ:100%、縦:>100%
                else {
                    var t = '-' + Math.abs((w - h * r) * 0.5);
                    // console.log('B2',$(window).width(),h,r,h*r);
                    $('#yt-movie-top').css({
                        left: 0,
                        top: t + 'px'
                    });
                }
                $('#yt-movie-top').css({
                    width: w,
                    height: (w / r)
                });
            }
        }
        
		// 发生调整大小事件时
		// ------------------------------
        $(window).resize(function(){
          var ww = document.documentElement.clientWidth,
              wh = document.documentElement.clientHeight;

          //
          if (is_movie_played) {
            adjustTopMovieSize();
          }

        });
        
        var icoScroll = $('.scroll');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                icoScroll.fadeOut();
            } else {
                icoScroll.fadeIn();
            }
        });
        

        
        $(window).bind("load resize", function() {
            var windowHeight = $(window).innerHeight() + 'px';
            $('#secIntro').css('height',windowHeight);
            //$('.block-movie').css('height',windowHeight);
        });
        
    }
    
	// 主拷贝显示动画
	// ------------------------------
    var showMainCopy = function () {
        IS_ARROW_SCROLL = true;

        $('.intro-animation-final-block').addClass('show');

        var copy = $('.intro-animation-final-block').find('.copy');
        var cover = $('.intro-animation-final-block').find('.cover');
        var img = $('.intro-animation-final-block').find('h1');
        var m = 40;
        // SPレイアウト時
        if (document.documentElement.clientWidth <= SP_WIDTH) m = 0;

        // console.log(img,img.innerHeight());
        cover.css('top', img.innerHeight() * 0.5 + 'px').addClass('firstAnimation');

        // IE11用
        var is_IE = false;

        setTimeout(function () {
            cover.css({
                height: img.innerHeight() + m + 'px',
                top: -(m * 0.5) + 'px'
            });

            setTimeout(function () {
                cover.removeClass('firstAnimation').addClass('secondAnimation');
            }, 600);
            setTimeout(function () {
                cover.css({
                    width: img.innerWidth() + m + 'px',
                    left: -(m * 0.5) + 'px'
                });
            }, 610);

            setTimeout(function () {
                // img.addClass('show')
                cover.removeClass('secondAnimation').addClass('thirdAnimation').css({
                    left: 'auto',
                    right: '-' + (m * 0.5) + 'px',
                });
            }, 1250);
            setTimeout(function () {
                cover.css({
                    width: '0px',
                });

                // 获取浏览器 UA 小写
                var userAgent = window.navigator.userAgent.toLowerCase();
                console.log(userAgent);
                // 一般浏览器确定
                if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
                    img.find('#svg').addClass('show-fill');
                    is_IE = true;
                    console.log('browser: ie');

                } else {
                    img.find('#svg').addClass('show');
                    console.log('browser: other');
                }
            }, 1260);

            // 到概念的现场
            var d1 = IS_DEBUG ? 1500 : is_IE ? 2500 : 4000;
            setTimeout(function () {
                $('.intro-animation-final-block').find('h4').addClass('show');

                // 添加类而不是动画完整标志
                $('.intro-section').addClass('animated');

                //Main.showConceptWords();
            }, d1);
            // }, 1500);

            // 把其余的元素有点晚了
            var d2 = IS_DEBUG ? 1650 : is_IE ? 2750 : 4250;
            setTimeout(function () {
                $('.site-name').addClass('show');
                $('.scroll').addClass('show');
                $('.site-indicator').addClass('show');
            }, d2);
            // }, 1650);

            // ちょっと遅れて残りの要素を出す
            var d3 = IS_DEBUG ? 1750 : is_IE ? 3000 : 4500;
            setTimeout(function () {
                $('.site-indicator span').css('height', '20%');
            }, d3);
            // }, 1750);

            // 之后，滚动以展开
        }, 10);
        $('body').addClass('mainContentsShow');
		$('body').removeClass('mainContentsHidden');
    }
    
   
	// 最后一个固定场景的动画
	// ------------------------------
    var showLastScene = function () {
        var ab = $('.last-animation-block');

        if (ab.hasClass('start')) {
            IS_SCENE_MOVING = false;
        } else {
            ab.addClass('start');

            // 1.5秒在之后开始文本动画
            setTimeout(function () {
                ab.find('h4').addClass('show');
            }, 500);
            setTimeout(function () {
                ab.find('.copy').addClass('show');
            }, 650);
            // 1.5秒以开始文本动画
            setTimeout(function () {
                ab.find('h3.en').addClass('show');
            }, 800);
            setTimeout(function () {
                ab.find('h3.jp').addClass('show');
            }, 950);
            // 等待 3 秒，页脚出现
            var d5 = IS_DEBUG ? 500 : 4000;
            setTimeout(function () {
                ab.addClass('finish');
                $('footer').addClass('show');

                // 能够在这里定居和返回
                IS_SCENE_MOVING = false;

                // ENTRY能够
                initEntryButton();
            }, d5);
            // }, 500);

            // BACK TO TOPボタン
            $('a.bt-backtotop').on('click', function (e) {
                e.preventDefault();

                _currentScene = 0;
                IS_SCENE_MOVING = false;

                $('.site-indicator span').css('height', '20%');

                $('.block').each(function (i, el) {
                    var ot = 0;
                    var wh = document.documentElement.clientHeight;
                    var mv = ot + (wh * i);
                    console.log(ot, wh, mv);

                    $(this).css({
                        transform: 'translateY(' + mv + 'px)'
                    });
                });
            })
        }
    }
    
	// 访问时的视频播放
	// ------------------------------
    var ytPlayer;
    var ytDebug = false
    function initMovie() {
        var mov_id = '' + $('#yt-movie-top').data('movie-id');

        // YouTube Playerの初期化
        if (!ytPlayer) {
            ytPlayer = new YT.Player('yt-movie-top', {
                width: 800,
                height: 450,
                videoId: mov_id,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                },
                playerVars: {
                    loop: 1,
                    playlist: mov_id,
                    playsinline: 1,
                    controls: 0,
                    showinfo: 0,
                    autoplay: 0,
                    rel: 0,
                    autohide: 1,
                    modestbranding: 1,
                }
            });
        }
    }

    /**
     * YouTube API 関連
     */
    function onPlayerReady(event) {
        if (ytDebug) console.log('[YT]onPlayerReady');
        event.target.setVolume(0);

        // PC仅在布局上播放
        if (document.documentElement.clientWidth > SP_WIDTH) {
            event.target.playVideo();
        }
    }
    function onPlayerStateChange(event) {
        if (ytDebug) console.log('[YT]onPlayerStateChange', event);

        var d = event.data;
        if (ytDebug) console.log('[YT] YT.PlayerState.ENDED');
        //缓冲
        if (d == YT.PlayerState.BUFFERING) {
            if (ytDebug) console.log('[YT] YT.PlayerState.BUFFERING');
        }
        // 再生中
        if (d == YT.PlayerState.PLAYING) {
            if (ytDebug) console.log('[YT] YT.PlayerState.PLAYING');
        }
        // 一時停止
        if (d == YT.PlayerState.PAUSED) {
            if (ytDebug) console.log('[YT] YT.PlayerState.PAUSE`');
            console.log(event.target)
        }
        // 再生終了
        if (d == YT.PlayerState.ENDED) {
            if (ytDebug) console.log('[YT] YT.PlayerState.ENDED');
            // if ( !$('.popup').hasClass('init') ) {
            // 循环播放
            event.target.playVideo();
        }
    }

    return {
        init: init,
        initMovie: initMovie,
        showMainCopy: showMainCopy,
        showLastScene: showLastScene,
    };

}(jQuery));

/**
 * Initialize
 *
 */
jQuery(function () {
    Main.init();
});


//加载 IFrame 播放器 API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube API加载完成
function onYouTubeIframeAPIReady() {
    Main.initMovie();
}

var changePosition01;
var changePosition02;
$(window).bind("load resize", function() {
	changePosition01 = $(window).innerHeight() - ( $('.fixedGate').position().top + $('.fixedGate').innerHeight()  );
	if( window.matchMedia('(max-width:767px)').matches ){
		changePosition02 = $('#secWhatIsGate').offset().top - $('header').innerHeight();
	} else {
		changePosition02 = $(window).outerHeight() - ( $('#btnNav').position().top + $('#btnNav').innerHeight() - 8  );      
	}
	setTimeout(function(){
		changePosition01 = $(window).innerHeight() - ( $('.fixedGate').position().top + $('.fixedGate').innerHeight()  );
		if( window.matchMedia('(max-width:767px)').matches ){
			changePosition02 = $('#secWhatIsGate').offset().top - $('header').innerHeight();
		} else {
			changePosition02 = $(window).outerHeight() - ( $('#btnNav').position().top + $('#btnNav').innerHeight() - 8  );      
		}
	},1300)
});

$(window).bind("load scroll resize", function() {

	var scrollPosition = $(window).scrollTop();
	//var changePosition = $('#secIntro').offset().top / 2;
	if ((scrollPosition) > changePosition01){
		$(".fixedGate").addClass('change')
	} else {
		$(".fixedGate").removeClass('change')
	}
	if ((scrollPosition) > changePosition02){
		$("#logo").addClass('change')
		$("#btnNav").addClass('change')
		$("header").addClass('forSp')
	} else {
		$("#logo").removeClass('change')
		$("#btnNav").removeClass('change')
		$("header").removeClass('forSp')
	}
});

$('.first').on('click', function () {
    $('.first').addClass('wordsClick')
    setTimeout(function () {
        $('.first').removeClass('wordsClick')
    }, 1000)
})
$('.simple>div').on('click', function () {
    $('.simple>div').removeClass("mark-container");
    // 添加立方体
    $('.simple>div:first-of-type').html('<ul class="square"><li>青春</li><li>拼搏</li><li>奋斗</li><li>人生</li><li>未来</li><li>意志</li></ul>');
    $('.simple').css("backgroundColor", "transparent")
})
$(".fair").on('click', function () {
    $('.fair>div>span:nth-child(1)').addClass("leave");

    setTimeout(function () {
        $('.fair>div>span:nth-child(2)').addClass("leave");
    }, 1000)
    setTimeout(function () {
        $('.fair>div>span').remove();
        $(".fair").html("<div  class='words'><P>生活总有不尽如人意之处，</p><p>学会苦中作乐世界很美好，</p><p>要学会向更远更高处看</p>")
    }, 1299)



})
$(".innovative").on('click', function () {
    $('.innovative>div>span:nth-child(1)').css("background", "black");
    $('.innovative>div>span:nth-child(2)').css("background", "black");
    $('.innovative>div>span:nth-child(3)').css("background", "black");
    $('.innovative').css("backgroundColor", "transparent");
    $(".innovative>div").addClass('up')
    setTimeout(function () {
        $('.innovative>div>span').remove();
    }, 1800)
    setTimeout(function () {
        $('.innovative').addClass("gradation");
        $(".innovative").html("<div  class='words'><P>生活总有不尽如人意之处，</p><p>学会苦中作乐世界很美好，</p><p>要学会向更远更高处看</p>")
    }, 1800)
})