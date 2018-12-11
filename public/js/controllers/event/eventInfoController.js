
var url =  window.location.pathname;
var eventID = url.replace("/event/", "");

var app = new Vue({

	el : "#app",
	
	data : {

		event : '',
		eventID : eventID,


		new_participant_obj : {

			participantName: null,
			wechatID: null,
			gender: null,
			memo: null,
			eventName: null,
			phone : null,
		
		},
		
		terms1 : null,
		terms2 : null,

		term_1_toggle : false,
		term_2_toggle : false,

		errors : [],

	},
	
	mounted: function(){
		
		var self = this;
		getEvent(eventID).then(function(event){
		
			self.event = event;
			//이벤트 이름을 잡고 있도록
			self.new_participant_obj.eventName = event.eventName;
		
		});
	
	},
	methods: {
		
		//toggling
		toggle: function(toggleString){
			var self = this;
			if(self[toggleString] === false || self[toggleString] === true) self[toggleString] = !self[toggleString];
			return;
		},

		eventImageHref:function(image_file_name){

			return "/images/event/" + image_file_name;
		
		},

		newParticipant: function(){
			
			var self = this;
			var validation_flag = true;
	    	self.errors = [];

			for(key in self.new_participant_obj){
				if(!self.new_participant_obj[key]){
					validation_flag = false;
				} 
			}
			if(!self.terms1 || !self.terms2){
				validation_flag = false;
			}
			console.log("validation_flag", validation_flag);
			if(validation_flag){
				addParticipant(self.new_participant_obj).then(function(rtn){
					if(rtn.success){
						
						self.new_participant_obj = {
							participantName: null,
							wechatID: null,
							gender: null,
							memo: null,
							eventName: null,
							phone : null,
						};

						self.terms1 = null;
						self.terms2 = null;
						self.term_1_toggle = false;
						self.term_2_toggle = false;

						alert("您的活动申请已经成功! 我们会尽快联系您，感谢您的支持与关注");
					}else{
						alert("存在未填写的空格.请每个空格都进行填写")
					}
					
				});
			}else{

     			if(!self.terms1) self.errors.push("个人信息第三方提供同意 (咨询)必须输入");
     			if(!self.terms2) self.errors.push("个人信息处理委托同意必须输入");
	    		if(!self.new_participant_obj.participantName) self.errors.push("名字必须输入");
	    		if(!self.new_participant_obj.wechatID) self.errors.push("微信账号必须输入");
	      		if(!self.new_participant_obj.gender) self.errors.push("性别必须输入");
	      		if(!self.new_participant_obj.memo) self.errors.push("记录必须输入");
	      		if(!self.new_participant_obj.phone) self.errors.push("电话号码必须输入");

			}


		}

	}

})