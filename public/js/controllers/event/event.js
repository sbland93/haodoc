jQuery(window).load(function() {
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

  // fixed bottom event
  $('.fixed-bottom .btn-expand, .fixed-bottom-mobile .btn-apply').click(function(){
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
  /* $('.box-hospital-info li').click(function(){
    var clickLi = $(this).html();
    $(this).remove();
    $('.box-hospital-info ul').prepend('<li class="image vertical-middle">' + clickLi + '</li>');
  }); */
});
