// var pass = prompt("Password");

// if(pass !== "inspire"){

//     alert("접근이 불가능합니다.");
//     location.href = '/';  

// }else{

//     alert("환영합니다. 인스파이어 제이 조지 조이 케리 레이첼 가자미!!!!!!!!!!!!!!!");

// }


var app = new Vue({

    el : "#app",

    data : {

        payers : "",
    	participants : "",
    	events : "",
        eventFiles : "",
        coupons: "",
        couponFiles : "",
        categorys : "",
        categoryFiles : "",
        banners: "",
        bannerFiles : "",

        list_array : [ {} ],
        list_array_2 : [ {} ],
        list_array_3 : [ {} ],

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
            categorys : [],
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
            categorys : [],
            thumbnailImage: "",
            couponImage: "",
            updated_at: "",
        },

        //For Update Event Obj
        update_category_toggle : false,
        update_category_index : -1,

        update_category : {
            categoryName: "",
            iconImage : "",
            content_1: "",
            content_2: "",
            questions : "",
            caution_1 : "",
            caution_2 : "",
            updated_at : "",
            remarks: "",
        },

        //For Update Event Obj
        update_banner_toggle : false,
        update_banner_index : -1,

        update_banner : {

            bannerImage: "",
            url : "",
            remarks: "",
            category : "",
            updated_at: "",
        
        },

        toggles : {
            payerToggle : false,
            participantToggle : false,
            couponToggle : false,
            eventToggle : false,
            categoryToggle : false,
            bannerToggle : true,
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

        getCategorys().then(function(categorys){
            self.categorys = categorys;
        });

        getBanners().then(function(banners){
            console.log(banners);
            self.banners = banners;
        });

        getFiles({dir: "event"}).then(function(files){
            self.eventFiles = files;
        });

        getFiles({dir : "coupon"}).then(function(files){
            self.couponFiles = files;
        });

        getFiles({dir : "category"}).then(function(files){
            self.categoryFiles = files;
        });

        getFiles({dir : "banner"}).then(function(files){
            self.bannerFiles = files;
        });
    
    },

    filters: {
        moment: function (date) {
          return moment(date).format('MM/DD hh:mm a');
        }
    },
    methods: {
        
        getEvents : function(){
            util_vue_init(this, getEvents, "events");
        },
        //추가값을 활용하기 위함
        change_list_array : function(_arr, manipulate_string, event){
            
            event.preventDefault();
            
            var self = this;
            
            if(manipulate_string === "+"){
              
                _arr.push({});
            
            }else if(manipulate_string === "-"){
              
                _arr.shift();
           
            }else if(/^\d+$/.test(manipulate_string)){ //숫자가 들어오면 해당 값을 삭제한다.
              
                _arr.splice(parseInt(manipulate_string), 1);
           
            }else{
                
                return false;
            
            }

        },

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
            console.log(newEvent);
            addEvent(newEvent).then(function(rtn){
                console.log(rtn);
            	if(rtn.success){
            		alert("추가 완료");
            		location.href = '/event/'+rtn.id;
            	}else{
            		alert("실패!");
            	}
            
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
                    alert("필드를 다 채워주셔야 합니다.");
                } 
            });
        },

        newCategory: function(event){
            event.preventDefault();
            var self = this;
            var newCategory = new FormData($("#category-form")[0]);

            //file이 있는지 확인한다.
            var val1 = $("#iconImage").val();

            if(val1 == ''){
               
               alert("파일은 필수입니다.");
               return false;
            
            }
            addCategory(newCategory).then(function(rtn){
                
                if(rtn.success){

                    alert("추가 완료");
                    //class로 val를 한번에 없애게끔.
                    $("#iconImage").val("");
                    $("#category-form-categoryName").val("");
                    $("#category-form-content").val("");

                    getCategorys().then(function(categorys){
                        self.categorys = categorys;
                    })
                
                }else{
                
                    alert("필드를 다 채워주셔야 합니다.");
                
                }

            });
        },

        newBanner: function(event){

            event.preventDefault();
            var self = this;
            var newBanner = new FormData($("#banner-form")[0]);

            //file이 있는지 확인한다.
            var val1 = $("#bannerImage").val();
            var val2 = $("#mobileImage").val();

            if(val1 == '' || val2 == ''){
               
               alert("파일은 필수입니다.");
               return false;
            
            }

            addBanner(newBanner).then(function(rtn){
                
                if(rtn.success){

                    alert("추가 완료");
                    getBanners().then(function(banners){
                        self.banners = banners;
                    });
                
                }else{
                    alert("필드를 다 채워주셔야 합니다.");
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

        new_category_file : function(event){
            
            event.preventDefault();

            var self = this;

            //file이 있는지 확인한다.
            var val = $("#new-category-file").val();
            
            if(val == ''){
               return false;
            }

            var new_category_file_form = new FormData($("#category-file-form")[0]);
            
            addFile("category", new_category_file_form).then(function(rtn){
            
                if(rtn.success){
                    
                    getFiles({dir: "category"}).then(function(files){
                        self.categoryFiles = files;
                        $("#new-category-file").val("");
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

        new_banner_file : function(event){
            
            event.preventDefault();

            var self = this;

            //file이 있는지 확인한다.
            var val = $("#new-banner-file").val();
            if(val == ''){
               return false;
            }

            var new_banner_file_form = new FormData($("#banner-file-form")[0]);
            
            addFile("banner", new_banner_file_form).then(function(rtn){
            
                if(rtn.success){
                    
                    getFiles({dir: "banner"}).then(function(files){
                        self.bannerFiles = files;
                        $("#new-banner-file").val("");
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

        toggle_change_category : function(category, index){

            var self = this;
            self.update_category = category;
            self.update_category_toggle = !self.update_category_toggle;
            self.update_category_index = index;

        },

        toggle_change_banner : function(banner, index){

            var self = this;
            self.update_banner = banner;
            self.update_banner_toggle = !self.update_banner_toggle;
            self.update_banner_index = index;

        },

        changeCategory: function(){

            var self = this;

            updateCategory(self.update_category.id, self.update_category).then(function(rtn){
                
                if(rtn.success){

                    alert("이벤트 수정 완료!");
                    //Reload하지 않도록 setting 시킴.
                    Vue.set(self.categorys, self.update_category_index, self.update_category);
                    self.update_category_index = -1;

                    self.update_category_toggle = false;

                }else{

                    alert("수정한게 없거나, 에러가 난거 같아요");
                
                }
            
            });

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
                        categorys : [],
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
            console.log(self.update_coupon);
            updateCoupon(self.update_coupon.id, self.update_coupon).then(function(rtn){
                console.log(rtn);
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

        changeBanner: function(){

            var self = this;

            updateBanner(self.update_banner.id, self.update_banner).then(function(rtn){

                if(rtn.success){

                    alert("배너 수정 완료!");
                    //Reload하지 않도록 setting 시킴.
                    Vue.set(self.banners, self.update_banner_index, self.update_banner);
                    self.update_banner_index = -1;

                    self.udpate_banner = {
                        bannerImage: "",
                        url : "",
                        remarks: "",
                        category : "",
                        updated_at: "",
                    },

                    self.update_banner_toggle = false;

                }else{

                    alert("수정한게 없거나, 에러가 난거 같아요");
                
                }
            
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

        removeEvent: function(id){

        	var pass=prompt("Password")
			if(pass !== "inspire") return;
        	var self = this;
        	deleteEvent(id).then(function(rtn){
        		getEvents().then(function(events){
                    alert("삭제완료!");
		        	self.events = events;
		        });
        		return;
        	});
       
        },

        removeCategory: function(id){

            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deleteCategory(id).then(function(rtn){
                getCategorys().then(function(categorys){
                    alert("삭제완료!");
                    self.categorys = categorys;
                });
                return;
            });
        
        },

        removeBanner : function(id){
            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deleteBanner(id).then(function(rtn){
                getBanners().then(function(banners){
                    alert("삭제완료!");
                    self.banners = banners;
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

        remove_category_file : function(_fileName){
            var self = this;

            deleteFile({dir : "category", fileName : _fileName}).then(function(rtn){

                if(rtn.success){
                    alert("삭제성공!");
                    getFiles({dir: "category"}).then(function(files){
                        self.categoryFiles = files;
                    });
                }
            
            });
        },

        remove_banner_file : function(_fileName){
            var self = this;

            deleteFile({dir : "banner", fileName : _fileName}).then(function(rtn){

                if(rtn.success){
                    alert("삭제성공!");
                    getFiles({dir: "banner"}).then(function(files){
                        self.bannerFiles = files;
                    });
                }
            
            });
        },

        
        


    }

});
