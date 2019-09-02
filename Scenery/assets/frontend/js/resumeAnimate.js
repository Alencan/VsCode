  $(function(){

    
    var anite = function (obj,cs){
        $(obj).removeClass("hide");
        $(obj).addClass(cs);
        $(obj).on('animationend webkitAnimationEnd',function (){
            $(obj).removeClass(cs);
        })
    }

    function section(){
        
        $('.section1').delay(50).animate({
            opacity: '1'
        }, 100, function(){
            $(".resume").addClass("on");
            setTimeout(function(){
                $(".resume").addClass("dong") 
            },250)
        });
    }
    section();

    $('#dowebok').fullpage({
        sectionsColor: ['transparent', 'transparent', 'transparent', 'transparent',"transparent","transparent","transparent"],
        afterLoad: function(anchorLink, index){
            console.log(index)
            if(index == 1){
                section();
                
            }
            if(index == 2){
                anite($('.section2 .fp-tableCell>div'),"animation_3d_top");
                var qxMuneLi = $(".qxMune li");
                $(".qxMune li").hover(
                  function(){
                    $(this).find(".info").animate({
                      left:"100%"
                    })
                  },
                  function(){
                    $(this).find(".info").animate({
                      left:"0"
                    })
                })


                
               
            }
            if(index == 3){
                $(".qxgd.style").animate({
                  left: '0'
                 },500,function(){
                      $(this).addClass("skew")
                 });
                 $(".wmanMenu li").each(function(i){
                   $(this).on("click",function(){
                    $(this).addClass("active");
                    $(this).siblings("li").removeClass("active");
                    $(".anCase>div").eq(i).addClass("active");
                    $(".anCase>div").eq(i).siblings("div").removeClass("active");
                   })
                 })   
            }
            if(index == 4){
                $(".section4").removeClass("hide")
                function factory(obj,str){
                    this.len = 0; 
                    this.txtDom = "";
                    this.str = "";
                    this.arrTxt = [];  
                    this.init(obj,str);
                }

                factory.prototype = {
                    constructor:factory, 
                    init:function(obj,str){ 
                        this.obj = obj;
                        this.str = str;   
                        this.txtDom = this.str.replace(/\s+/g,"");
                        obj.innerHTML = "";
                        this.len = this.txtDom.length;
                        this.addDom(obj);
                       
                    }, 
                     addDom:function(obj){

                        for(var i=0;i<this.len;i++){
                            var spanDom = "";
                            spanDom = document.createElement("span");
                            spanDom.innerHTML = this.txtDom.substring(i,i+1);
                            this.obj.appendChild(spanDom);
                            this.arrTxt.push(spanDom);
                        };
                        for(var j=0;j<this.len;j++){
                            this.arrTxt[j].style.position = "relative";
                        };
                        this.start();
                    },
                    start:function(){
                        for(var i=0;i<this.len;i++){
                            this.arrTxt[i].onmouseover = function(){
                                
                                this.stop = 0;
                                this.speed = -1;
                                var $this = this;
                         
                                this.timer = setInterval(function(){
                                    $this.stop += $this.speed;//0  += -1
                                    if($this.stop <= -20){
                                        $this.speed = 1;
                                    }

                                    $this.style.top = $this.stop + "px";

                                    if($this.stop >= 0){
                                        clearInterval($this.timer)
                                        $this.style.top = 0 + "px";
                                    };

                                },15);
                            };
                        }
                    }
                }
                var str1 = '泰姬陵全称为"泰姬·玛哈尔陵"，是一座白色大理石建成的巨大陵墓清真寺，是莫卧儿皇帝沙贾汗为纪念他心爱的妃子于1631年至1648年在阿格拉而建的陵墓... ...'; 
                var str2 = '自由女神像是美国的象征，举世闻名的自由女神像，高高地耸立在纽约港口的自由岛上，象征着美国人民争取自由的崇高理想，也象征着美国人民对美好生活的向往与追求......';
                var str3 = '托斯卡纳以其美丽的风景和丰富的艺术遗产而著称。已有6处被列为世界遗产：佛罗伦萨历史中心、比萨主教座堂广场、圣吉米尼亚诺历史中心、锡耶纳历史中心、皮恩扎历史中心和瓦尔道尔契亚';
                var str4 = '马赛马拉国家野生动物保护区，低矮的丘陵绵延起伏，宽广的草原一望无际，巨大的金合欢树和波巴布树散落其间，马拉河的众多支流纵横穿越，景色美轮美奂... ...';
                var str5 = '惠山寺始建于南北朝，香火旺盛。无锡的标志性建筑锡山龙光塔，始建于明万历间，古镇一景。唐代陆羽品宜茗者，惠泉第二，“天下第二泉”因之得名... ...';

                new factory($(".leftInfor .lInfor").eq(0).find("div")[0],str1);
                new factory($(".leftInfor .lInfor").eq(1).find("div")[0],str2);
                new factory($(".rightInfor .lInfor").eq(0).find("div")[0],str3);
                new factory($(".rightInfor .lInfor").eq(1).find("div")[0],str4);
                new factory($(".rightInfor .lInfor").eq(2).find("div")[0],str5);                 
                if($(window).height()<660){

                     $(".qxxw .leftInfor").animate({
                      left:"-27%"
                    },400);
                    $(".qxxw .rightInfor").animate({
                      right:"-36%"
                    },400);
                }  else{
                   $(".qxxw .leftInfor").animate({
                    left:"1%"
                  },400);
                  $(".qxxw .rightInfor").animate({
                    right:"-5%"
                  },400);
                }


             $(".rDate").hover(function(){
              $(this).closest(".clearfix").find(".lInfor .title").css({color:"#027afd"})
             },function(){
              $(this).closest(".clearfix").find(".lInfor .title").css({color:"#fff"})
             })   

            }
            if(index == 5){
                var time = 400;
                var a = 0;
                var $entryLi = $('.gywmMenu li');
                function dg(){
                     
                     $entryLi.eq(a).animate({
                         left :''+a*$entryLi.outerWidth(true)+'px'
                     },time,function(){
                          a++;
                          if(a == $entryLi.size()){
                             return;        
                          }
                          dg();
                     })
                }
                dg();
            }
            if(index == 6){
       
            }
        },
        onLeave: function(index, direction){
          
            if(index == 1){
              
            }
            if(index == 2){
              setTimeout(function(){
                 $('.section2 .fp-tableCell>div').addClass("hide")
             },100)
            }
            if(index == 3){
               setTimeout(function(){
                    $(".qxgd.style").css({left:"-250%"}).removeClass("skew")
                },300)

            }
            if(index == 4){
                var $qxxwl = $(".qxxw .leftInfor");
                var $qxxwr = $(".qxxw .rightInfor");
                $qxxwl.animate({
                  left:"-50%"
                },400);
                $qxxwr.animate({
                  right:"-55%"
                },400);
            }
            if(index == 5){
                var time = 50;
                var a = 0;
                var $entryLi = $('.gywmMenu li');
                function dg(){
                     $entryLi.eq(a).animate({
                         left :'-100%'
                     },time,function(){
                          a++;
                          if(a == $entryLi.size()){
                             return;        
                          }
                          dg();
                     })
                }
                setTimeout(function(){
                  dg();
                },100)
            }
            if(index == 6){
       
            }
        },
        navigation: true
//      continuousVertical: true
    });
});