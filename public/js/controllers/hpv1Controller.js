	
var url =  window.location.pathname;
var hpvID = url.replace("/hpv1/", "");
console.log("hpvID", hpvID);


$(document).ready(function(){
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$(".stepOneForm").validate({
		// Specify validation rules
		rules: {
			chineseName:{
				required: true,
			},
			englishName: {
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
			chineseName: "ChineseName is required",
			englishName: "EnglishName is required",
			birthDay : "BirthDay is required",
			phone : "Phone is required",
			wechatID : "WeChatID is required",
		},
		submitHandler: function(form, evt) {
			evt.preventDefault();
			var sendingData = $(form).serialize();
			
			sendingData += '&coupon=' + hpvID;
			console.log(sendingData);
			
			addPayer(sendingData).then(function(data){
				if(data.success){
					alert('个人信息成功提交!');//개인정보 제출 성공
					location.href = '/hpv2/' + hpvID;
				} 
				else{
					alert('Error Occured');
					alert(data);
					console.log(data);
				}
			}).catch(function(err){
				alert(err);
			});

		
		}
	});


});