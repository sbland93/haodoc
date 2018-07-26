

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

});