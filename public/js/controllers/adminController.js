

var app = new Vue({

    el : "#app",

    data : {

    	participants : "",
    	events : "",

      

    },

    mounted: function(){
    	
    	var self = this;

        getParticipants().then(function(participants){
        	self.participants = participants;
            console.log(participants);
        });

        getEvents().then(function(events){
        	self.events = events;
        	console.log(events);
        });
    
    },
    methods: {

        newEvent: function(event){
            event.preventDefault();

            var self = this;

            var newEvent = new FormData($("#event-form")[0]);
            
            addEvent(newEvent).then(function(rtn){
            
            	if(rtn.success){
            		alert("추가 완료");
            		location.href = '/event/'+rtn.id;
            	}else{
            		alert("실패!");
            	}
            
            });
        },

        removeEvent: function(id){
        	var pass=prompt("Password")
			if(pass !== "inspire") return;
        	var self = this;
        	deleteEvent(id).then(function(rtn){
        		console.log(rtn);
        		getEvents().then(function(events){
		        	self.events = events;
		        	console.log(events);
		        });
        		return;
        	});
        }

    }

});
