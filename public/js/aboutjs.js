$(document).ready(function() {
    $('.brand-title').fadeIn(1000);
    $('.brand-semi-title').fadeIn(1500);
    $('#question').fadeIn(2000);
    $('.paragraph p').fadeIn(2500);

    $('#menubar').on('click', function() {
        $('#menu-display').fadeIn(500);
        $('#menu-display').css('display', 'flex');
        $('#menubar').css('display', 'none');
    });

    $('.closebtn').on('click', function() {
        $('#menu-display').fadeOut(500);
        $('#menubar').css('display', 'block');
    }); 
});