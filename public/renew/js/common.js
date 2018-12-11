jQuery(window).load(function() {
  // lnb
  var swiper = new Swiper('.lnb .swiper-container', {
    spaceBetween: 0,
    slidesPerView: 9,
    direction: 'vertical',
    loop: true,
    navigation: {
      nextEl: '.lnb .swiper-button-next',
    },
  });

  // lnb mobile
  var swiper = new Swiper('.lnb-m .swiper-container', {
    spaceBetween: 0,
    slidesPerView: 5,
    slidesPerGroup: 4,
    loop: true,
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
    loop: true,
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

  // banner qr
  $('.btn-qr').hover(function(){
    $('.btn-qr').addClass('active');
  },function(){
    $('.btn-qr').removeClass('active');
  });
});
