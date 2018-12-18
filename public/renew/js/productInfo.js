// sub content background
  var winHeight = $(window).height();
  var subContHeight = winHeight - 450;
  var subContHeightFull = winHeight - 140;
  $('.box-sub-content').css('min-height',subContHeight);
  $('.box-sub-content.full').css('min-height',subContHeightFull);
  $('.box-sub-content.auto').css('min-height', 'auto');

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
  var setImageClick = function(){
    $('.box-hospital-info li').click(function(){
        var clickLi = $(this).html();
        $(this).remove();
        $('.box-hospital-info ul').prepend('<li class="image vertical-middle">' + clickLi + '</li>');
        $('.box-hospital-info li').unbind("click").on("click", setImageClick);
    }); 
  }
  setImageClick();