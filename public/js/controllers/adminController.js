

var app = new Vue({

    el : "#app",

    data : {

    	participants : "",
    	events : "",
        payers : "",
        coupons: "",

        toggles : {
            payerToggle : true,
            participantToggle : false,
            couponToggle : false,
            eventToggle : false,
            addCouponToggle : false,
            addEventToggle : false,
        },


    },

    mounted: function(){
    	
    	var self = this;

        getParticipants().then(function(participants){
        	self.participants = participants;
        });

        getEvents().then(function(events){
        	self.events = events;
        });

        getPayers().then(function(payers){
            self.payers = payers;
        });

        getCoupons().then(function(coupons){
            self.coupons = coupons;
        })
    
    },

    filters: {
        moment: function (date) {
          return moment(date).format('MM/DD hh:mm a');
        }
    },
    methods: {

        toggleTo : function(target_string){
            var self = this;
            for(key in self.toggles){
                self.toggles[key] = false;
                if(key === target_string){
                    self.toggles[key] = true;
                }
            }
        },

        moment: function (date) {
          return moment(date);
        },

        date: function (date) {
          return moment(date).format('MMMM Do YYYY, hh:mmm:ss a');
        },
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
        		getEvents().then(function(events){
		        	self.events = events;
		        });
        		return;
        	});
        },

        removeCoupon: function(id){
            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deleteCoupon(id).then(function(rtn){
                alert("삭제 완료");
                getCoupons().then(function(coupons){
                    self.coupons = coupons;
                });
                return;
            });
        },

        removePayer: function(id){
            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deletePayer(id).then(function(rtn){
                alert("삭제 완료");
                getPayers().then(function(payers){
                    self.payers = payers;
                });
                return;
            });
        },

        removeParticipant: function(id){
            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deleteParticipant(id).then(function(rtn){
                alert("삭제 완료");
                getParticipants().then(function(participants){
                    self.participants = participants;
                });
                return;
            });
        },

        newCoupon: function(event){
            event.preventDefault();
            var self = this;
            var newCoupon = new FormData($("#coupon-form")[0]);
            
            addCoupon(newCoupon).then(function(rtn){
                if(rtn.success){
                    alert("추가 완료");
                    location.href = '/coupon/'+rtn.id;
                }else{
                    alert("실패!");
                } 
            });
        },
        


    }

});
