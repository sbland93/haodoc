
var feed_swiper;

jQuery(window).load(function() {
  
  feed_swiper = function(){
    
    var swiper = new Swiper('.slide-feed .swiper-container', {
      slidesPerView: 1.12,
      spaceBetween: 10,
      centeredSlides: true,
      navigation: {
        nextEl: '.slide-feed .swiper-button-next',
        prevEl: '.slide-feed .swiper-button-prev',
      },
      pagination: {
        el: '.slide-feed .swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1199: {
          spaceBetween: 5,
        }
      }
    });

  }

  setTimeout(500, feed_swiper);

  $('.label-heart').click(function () {
    if ($(this).find('input').prop('checked')) {
      $(this).find('input').prop('checked', true);
      $(this).find('input').attr('checked', true);
      $(this).addClass('active');
    } else {
      $(this).find('input').prop('checked', false);
      $(this).find('input').attr('checked', false);
      $(this).removeClass('active');
    }
  });


});
