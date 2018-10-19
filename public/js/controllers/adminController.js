

var app = new Vue({

    el : "#app",

    data : {

    	participants : "",


        eventName: "",
        eventRange: "",
        hospitalName: "",
        subway: "",
        address: "",
        thumbnailImage: "",
        eventImage: "",
      

    },

    mounted: function(){
    	var self = this;
        getParticipants().then(function(data){
        	
        	self.participants = data;
            console.log(data);

        
        });
    
    },
    methods: {


        newEvent: function(){
            var self = this;
            var newEventObj = {
                eventName: self.eventName,
                eventRange: self.eventRange,
                hospitalName: self.hospitalName,
                subway: self.subway,
                address: self.address,
                thumbnailImage: self.thumbnailImage,
                eventImage: self.eventImage,
            };
            addEvent(newEventObj).then(function(rtn){
                if(rtn.success){
                    alert('추가 완료');
                    self.eventName=  "";
                    self.eventRange=  "";
                    self.hospitalName=  "";
                    self.subway=  "";
                    self.address=  "";
                    self.thumbnailImage=  "";
                    self.eventImage=  "";
                }else{
                    alert('실패');
                }
            });

        }

    }

});
