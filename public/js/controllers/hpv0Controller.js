$(document).ready(function(){
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".stepZeroForm").validate({
		// Specify validation rules
		rules: {
			terms: {
				required : true
			},
			refundTerms: {
				required : true
			}
		},
		messages:{
			terms: {
				required : "Term should be checked"
			},
			refundTerms: {
				required : "Refund term should be checked"
			}
		},
		submitHandler: function(form, evt) {
			evt.preventDefault();
			alert('Step 0 Success!');
			location.href = '/hpv1';
		
		}
	});


});