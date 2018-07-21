$(document).ready(function() {
    $('#menubar').on('click', function() {
        $('#menu-display').fadeIn(500);
        $('#menu-display').css('display', 'flex');
        $('#menubar').css('display', 'none');
    });

    $('.closebtn').on('click', function() {
        $('#menu-display').fadeOut(500);
        $('#menubar').css('display', 'block');
    });

    $('.product a').on('click', function () {
        alert('8월 중 런칭 예정입니다!');
    });
});