
//외부 노출 함수.
var common_make_box, common_make_swiper;

Vue.filter('price',function (price) {
        
    if(price > 10000){
      price = price / 10000;
      price = price + "万韩元";
    }
    return price;
});

Vue.filter('changeCNY', function(price){

  price = parseInt(price / 163);
  price = "约" + price + "人民币";
  return price;

});

$(document).ready(function() {
  

  // lnb 2depth
  $('.lnb .swiper-slide.eye').mouseenter(function(){
    $('.box-lnb-2depth.eye').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.nose').mouseenter(function(){
    $('.box-lnb-2depth.nose').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.breast').mouseenter(function(){
    $('.box-lnb-2depth.breast').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.pillar').mouseenter(function(){
    $('.box-lnb-2depth.pillar').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.botox').mouseenter(function(){
    $('.box-lnb-2depth.botox').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.face').mouseenter(function(){
    $('.box-lnb-2depth.face').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.fat').mouseenter(function(){
    $('.box-lnb-2depth.fat').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.hair').mouseenter(function(){
    $('.box-lnb-2depth.hair').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.lnb .swiper-slide.teeth').mouseenter(function(){
    $('.box-lnb-2depth.teeth').css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });


  $('.lnb .swiper-slide').mouseleave(function(){
    $('.box-lnb-2depth').css({'width':'0','padding-left':'0','padding-right':'0'});
  });
  $('.box-lnb-2depth').mouseenter(function(){
    $(this).css({'width':'420px','padding-left':'20px','padding-right':'20px'});
  });
  $('.box-lnb-2depth').mouseleave(function(){
    $(this).css({'width':'0','padding-left':'0','padding-right':'0'});
  });

  common_make_swiper = function(){
    // lnb
    var swiper = new Swiper('.lnb .swiper-container', {
      spaceBetween: 0,
      slidesPerView: 9,
      direction: 'vertical',
      loop: false,
      navigation: {
        nextEl: '.lnb .swiper-button-next',
      },
    });
    // lnb mobile
    var swiper = new Swiper('.lnb-m .swiper-container', {
      spaceBetween: 0,
      slidesPerView: 5,
      slidesPerGroup: 4,
      loop: false,
      pagination: {
        el: '.lnb-m .swiper-pagination',
        clickable: true,
      },
    });

    // bg main
    var swiper = new Swiper('.slide-main .swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: '.slide-main .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.slide-main .swiper-button-next',
        prevEl: '.slide-main .swiper-button-prev',
      },
    });

    // box all category
    var swiper = new Swiper('.box-all .swiper-container', {
      loop: false,
      spaceBetween: 20,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.box-all .swiper-button-next',
      },
    });
    // btn more
    $('.btn-more').click(function(){
      if($('.btn-qr').is(':visible')){
        $('.btn-more').removeClass('active');
        $('.btn-qr').css('display','none');
      }else{
        $('.btn-more').addClass('active');
        $('.btn-qr').css('display','block');
      }
    });

  }
  //For Delay Some Time => Swiper가 Vue를 잡기 위함.
  //setTimeout(common_make_swiper, 1000);

  

  // banner qr
  // $('.btn-qr').hover(function(){
  //   $('.btn-qr').addClass('active');
  // },function(){
  //   $('.btn-qr').removeClass('active');
  // });

  common_make_box = function(){
    // box fold slide up down
    $('.box-fold.active').find('.content').slideDown();
    $('.box-fold .title').unbind('click').click(function(){
      if($(this).next('.content').is(':visible')){
        $(this).parents('.box-fold').removeClass('active');
        $(this).parents('.box-fold').find('.content').slideUp();
      }else{
        $(this).parents('.box-fold').addClass('active');
        $(this).parents('.box-fold').find('.content').slideDown();
      }
    });

    $('.box-fold .question').unbind('click').click(function(){
      if($(this).next('.answer').is(':visible')){
        $(this).next('.answer').slideUp();
      }else{
        $('.box-fold .answer').slideUp();
        $(this).next('.answer').slideDown();
      }
    });
  }
  //TODO 타이밍 맞추기
  setTimeout(common_make_box, 400);

  // sub content background
  var winHeight = $(window).height();
  var subContHeight = winHeight - 450;
  var subContHeightFull = winHeight - 140;
  $('.box-sub-content').css('min-height',subContHeight);
  $('.box-sub-content.full').css('min-height',subContHeightFull);
  $('.box-sub-content.auto').css('min-height', 'auto');


});
