


var app = new Vue({

    el : "#app",

    data : {

    	participants : "",
    	events : "",
        eventFiles : "",
        payers : "",
        coupons: "",
        couponFiles : "",

        //For Update Event Obj
        update_event_toggle : false,
        update_event_index : -1,

        update_event : {
            eventName: "",
            price : "",
            eventRange: "",
            hospitalName: "",
            subway: "",
            address: "",
            thumbnailImage: "",
            eventImage: "",
            updated_at: "",
        },

        //For Update Event Obj
        update_coupon_toggle : false,
        update_coupon_index : -1,

        update_coupon : {
            couponName: "",
            price : "",
            couponRange: "",
            hospitalName: "",
            subway: "",
            address: "",
            thumbnailImage: "",
            couponImage: "",
            updated_at: "",
        },

        toggles : {
            payerToggle : true,
            participantToggle : false,
            couponToggle : false,
            eventToggle : false,
            addCouponToggle : false,
            addEventToggle : false,
            cateogryToggle : false,
            coupon_file_toggle: false,
            event_file_toggle : false,
        },


    },

    mounted: function(){
    	
    	var self = this;
        
        getPayers().then(function(payers){
            self.payers = payers;
        });

        getCoupons().then(function(coupons){
            self.coupons = coupons;
        });

        getParticipants().then(function(participants){
        	self.participants = participants;
        });

        getEvents().then(function(events){
        	self.events = events;
        });

        getFiles({dir: "event"}).then(function(files){
            self.eventFiles = files;
        });

        getFiles({dir : "coupon"}).then(function(files){
            self.couponFiles = files;
        });
    
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
            
            //file이 있는지 확인한다.
            var val1 = $("#event-image-1").val();
            var val2 = $("#event-image-2").val();
            var val3 = $("#event-image-3").val();
            var val4 = $("#event-thumbnail-image").val();
            
            if(val1 == '' || val2 == '' || val3 == '' || val4 == ''){
               
               alert("파일은 필수입니다.");
               return false;
            
            }

            addEvent(newEvent).then(function(rtn){
            
            	if(rtn.success){
            		alert("추가 완료");
            		location.href = '/event/'+rtn.id;
            	}else{
            		alert("실패!");
            	}
            
            });
        },

        new_event_file : function(event){
            
            event.preventDefault();

            var self = this;

            //file이 있는지 확인한다.
            var val = $("#new-event-file").val();
            if(val == ''){
               return false;
            }

            var new_event_file_form = new FormData($("#event-file-form")[0]);
            
            addFile("event", new_event_file_form).then(function(rtn){
            
                if(rtn.success){
                    
                    getFiles({dir: "event"}).then(function(files){
                        self.eventFiles = files;
                        $("#new-event-file").val("");
                        alert("추가 완료");
                    });

                }else{
                    alert("실패!");
                }
            
            });

        },

        new_coupon_file : function(event){
            
            event.preventDefault();

            var self = this;

            //file이 있는지 확인한다.
            var val = $("#new-coupon-file").val();
            if(val == ''){
               return false;
            }

            var new_coupon_file_form = new FormData($("#coupon-file-form")[0]);
            
            addFile("coupon", new_coupon_file_form).then(function(rtn){
            
                if(rtn.success){
                    
                    getFiles({dir: "coupon"}).then(function(files){
                        self.couponFiles = files;
                        $("#new-coupon-file").val("");
                        alert("추가 완료");
                    });

                }else{
                    alert("실패!");
                }
            
            });

        },

        toggle_change_event : function(event, index){

            var self = this;
            self.update_event = event;
            self.update_event_toggle = !self.update_event_toggle;
            self.update_event_index = index;

        },

        toggle_change_coupon : function(coupon, index){

            var self = this;
            self.update_coupon = coupon;
            self.update_coupon_toggle = !self.update_coupon_toggle;
            self.update_coupon_index = index;

        },

        changeEvent: function(){

            var self = this;
            //Vue.set(self.events, self.udpate_event_index, self.update_event);
            updateEvent(self.update_event.id, self.update_event).then(function(rtn){
                
                if(rtn.success){

                    alert("이벤트 수정 완료!");
                    //Reload하지 않도록 setting 시킴.
                    Vue.set(self.events, self.update_event_index, self.update_event);
                    self.update_event_index = -1;

                    self.udpate_event = {
                        eventName: "",
                        price : "",
                        eventRange: "",
                        hospitalName: "",
                        subway: "",
                        address: "",
                        thumbnailImage: "",
                        eventImage: "",
                        updated_at: "",
                    };

                    self.update_event_toggle = false;

                }else{

                    alert("수정한게 없거나, 에러가 난거 같아요");
                
                }
            
            });

        },

        changeCoupon: function(){

            var self = this;
            //Vue.set(self.events, self.udpate_event_index, self.update_event);
            updateCoupon(self.update_coupon.id, self.update_coupon).then(function(rtn){
                
                if(rtn.success){

                    alert("쿠폰 수정 완료!");
                    //Reload하지 않도록 setting 시킴.
                    Vue.set(self.coupons, self.update_coupon_index, self.update_coupon);
                    self.update_coupon_index = -1;

                    self.udpate_coupon = {
                        couponName: "",
                        price : "",
                        couponRange: "",
                        hospitalName: "",
                        subway: "",
                        address: "",
                        thumbnailImage: "",
                        couponImage: "",
                        updated_at: "",
                    };

                    self.update_coupon_toggle = false;

                }else{

                    alert("수정한게 없거나, 에러가 난거 같아요");
                
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

        remove_event_file : function(_fileName){
            var self = this;
            deleteFile({dir : "event", fileName : _fileName}).then(function(rtn){

                if(rtn.success){
                    alert("삭제성공!");
                    getFiles({dir: "event"}).then(function(files){
                        self.eventFiles = files;
                    });
                }
            
            });
        },

        remove_coupon_file : function(_fileName){
            var self = this;
            deleteFile({dir : "coupon", fileName : _fileName}).then(function(rtn){

                if(rtn.success){
                    alert("삭제성공!");
                    getFiles({dir: "coupon"}).then(function(files){
                        self.couponFiles = files;
                    });
                }
            
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
            //file이 있는지 확인한다.
            var val1 = $("#coupon-image-1").val();
            var val2 = $("#coupon-image-2").val();
            var val3 = $("#coupon-image-3").val();
            var val4 = $("#coupon-thumbnail-image").val();

            if(val1 == '' || val2 == '' || val3 == '' || val4 == ''){
               
               alert("파일은 필수입니다.");
               return false;
            
            }
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
