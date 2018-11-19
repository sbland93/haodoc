
var url =  window.location.pathname;
var eventID = url.replace("/event/", "");
console.log("eventID", eventID);

var app = new Vue({

	el : "#app",
	
	data : {

		event : '',
		eventID : eventID,

		participantName: "",
		wechatID: "",
		gender: "",
		memo: "",
		eventName: "",

	},
	
	mounted: function(){
		
		var self = this;
		console.log("dd",eventID);
		getEvent(eventID).then(function(event){
		
			console.log(event);
			self.event = event;
		
		});
	
	},
	methods: {
		
		eventImageHref:function(image_file_name){
			console.log(image_file_name);

			return "/images/event/" + image_file_name;
		
		},

		newParticipant: function(){
			
			var self = this;
			
			var newObj = {

				participantName : self.participantName,
				wechatID : self.wechatID,
				gender : self.gender,
				memo : self.memo,
				eventName: self.event.eventName,
			
			};

			addParticipant(newObj).then(function(rtn){
				console.log(rtn);
				if(rtn.success){
					self.participantName = "";
					self.wechatID = "";
					self.gender = "";
					self.memo = "";
					alert("您的活动申请已经成功! 我们会尽快联系您，感谢您的支持与关注");
					console.log(rtn);
				}else{
					alert("存在未填写的空格.请每个空格都进行填写")
				}
				
			});

		}

	}

})