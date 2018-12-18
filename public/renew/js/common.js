$(document).ready(function() {
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

  var common_make_swiper = function(){
    // lnb mobile
    var swiper = new Swiper('.lnb-m .swiper-container', {
      spaceBetween: 0,
      slidesPerView: 5,
      slidesPerGroup: 4,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
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
  }
  //For Delay Some Time => Swiper가 Vue를 잡기 위함.
  setTimeout(common_make_swiper, 350);

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

  // banner qr
  $('.btn-qr').hover(function(){
    $('.btn-qr').addClass('active');
  },function(){
    $('.btn-qr').removeClass('active');
  });

  var makeQuestionFold = function(){
    // box fold slide up down
    $('.box-fold.active').find('.content').slideDown();
    $('.box-fold .title').click(function(){
      if($(this).next('.content').is(':visible')){
        $(this).parents('.box-fold').removeClass('active');
        $(this).parents('.box-fold').find('.content').slideUp();
      }else{
        $(this).parents('.box-fold').addClass('active');
        $(this).parents('.box-fold').find('.content').slideDown();
      }
    });

    $('.box-fold .question').click(function(){
      if($(this).next('.answer').is(':visible')){
        $(this).next('.answer').slideUp();
      }else{
        $('.box-fold .answer').slideUp();
        $(this).next('.answer').slideDown();
      }
    });
  }
  //TODO 타이밍 맞추기
  setTimeout(makeQuestionFold, 400);

  // sub content background
  var winHeight = $(window).height();
  var subContHeight = winHeight - 450;
  var subContHeightFull = winHeight - 140;
  $('.box-sub-content').css('min-height',subContHeight);
  $('.box-sub-content.full').css('min-height',subContHeightFull);
  $('.box-sub-content.auto').css('min-height', 'auto');

  // fixed bottom event
  /*$('.fixed-bottom .btn-expand, .fixed-bottom-mobile .btn-apply').click(function(){
    $('.fixed-bottom').toggleClass('active');
  });

  var hospitalInfo = $('.box-hospital-info').offset().top;
  $('.btn-hospital-info').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: hospitalInfo
    }, 400)
  });

  $(document).mouseup(function (e){
  var container = $('.fixed-bottom');
    if( container.has(e.target).length === 0){
    container.removeClass('active');
    }
  });

  // event detail tab
  $('.tab-menu li').click(function(){
    var index = $(this).index();
    $('.tab-menu li a').removeClass('active');
    $(this).find('a').addClass('active');
    $('.tab-cont > div').css('display','none');
    $('.tab-cont > div').eq(index).css('display','block');
  });

  // event hospital detail img
  var setImageClick = function(){
    $('.box-hospital-info li').click(function(){
        var clickLi = $(this).html();
        $(this).remove();
        $('.box-hospital-info ul').prepend('<li class="image vertical-middle">' + clickLi + '</li>');
        $('.box-hospital-info li').unbind("click").on("click", setImageClick);
    }); 
  }
  setImageClick();
*/


});
