	
$(document).ready(function(){
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".stepOneForm").validate({
		// Specify validation rules
		rules: {
			name:{
				required: true,
			},
			birthDay:{
				required: true,
			},
			phone: {
				required: true,
			},
			wechatID: {
				required: true,
			},
		},
		// Specify validation error messages
		messages: {
			name: "Name is required",
			birthDay : "BirthDay is required",
			phone : "Phone is required",
			wechatID : "WeChatID is required",
		},
		submitHandler: function(form, evt) {
			evt.preventDefault();
			var sendingData = $(form).serialize();
			
			addUser(sendingData).then(function(data){
				if(data.success){
					alert('Step 1 Success!');
					location.href = '/hpv2';
				} 
				else{
					alert('Error Occured');
				}
			}).catch(function(err){
				alert(err);
			});
		
		}
	});


});