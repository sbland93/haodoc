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

        updateIndex : -1,
        updateObj : {

        },
        update_event_toggle : false,
        update_coupon_toggle : false,
        update_category_toggle : false,
        update_banner_toggle : false,

        toggles : {
            payerToggle : false,
            participantToggle : false,
            couponToggle : false,
            eventToggle : false,
            categoryToggle : false,
            bannerToggle : true,
        },

        eventSet : {
            update_toggle : "update_event_toggle",
            updateFunc : updateEvent,
            getFunc : getEvents,
            deleteFunc : deleteEvent,
        },


    },

    mounted: function(){
    	
    	var self = this;
        
        var init_data_arr = [
            {
                func_name : getPayers, data_name : "payers"
            },
            {
                func_name : getCoupons, data_name: "coupons"
            },
            {
                func_name : getParticipants, data_name : "participants"
            },
            {
                func_name : getEvents, data_name: "events"
            },
            {
                func_name : getCategorys, data_name: "categorys"
            },
            {
                func_name : getBanners, data_name: "banners"
            },
        ];        

        for (var i = init_data_arr.length - 1; i >= 0; i--) {
            util_data_init(self, init_data_arr[i].func_name, init_data_arr[i].data_name);
        }
        
        var init_file_arr = [
            {
                dirString : "event", data_name : "eventFiles"
            },
            {
                dirString : "coupon", data_name : "couponFiles"
            },
            {
                dirString : "category", data_name : "categoryFiles"
            },
            {
                dirString : "banner", data_name : "bannerFiles"
            },
        ];

        for (var i = init_file_arr.length - 1; i >= 0; i--) {
            util_file_init(self, init_file_arr[i].dirString, init_file_arr[i].data_name);
        }
    
    },

    filters: {
        moment: function (date) {
          return moment(date).format('MM/DD hh:mm a');
        }
    },
    methods: {

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
            var newCategory = new FormData($("#add-category-form")[0]);

            //file이 있는지 확인한다.
            var val1 = $("#icon-image-file").val();
            if(val1 == ''){
               
               alert("파일은 필수입니다.");
               return false;
            
            }
            addCategory(newCategory).then(function(rtn){
                
                if(rtn.success){

                    alert("추가 완료");
                    //form에 추가시에 적어뒀던 데이터 삭제, categorys 초기화.
                    $("#add-category-form")[0].reset();
                    util_data_init(self, getCategorys, "categorys");
                
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
                    util_data_init(self, getBanners, "banners");
                }else{
                    alert("필드를 다 채워주셔야 합니다.");
                }

            });
        },

        //dirName에 해당하는, File을 생성하는 함수.
        //id가 new-dirName-file인 form의 파일을 가져와서 추가한다.
        newFile : function(dirName, event){
            event.preventDefault();

            var self = this;

            //file이 있는지 확인한다. new-event-file형식의 id를 규칙으로 매김.
            var val = $("#new-"+dirName+"-file").val();
            if(val == ''){
               return false;
            }
            var fileForm = $("#"+dirName+"-file-form")[0]
            var new_file_form = new FormData(fileForm);
            
            //dirName(ex. "event", "banner", ..)에 해당하는, 파일을 추가한다.
            addFile(dirName, new_file_form).then(function(rtn){
                if(rtn.success){
                    //파일폼을 비워주고, 파일 렌더링 리스트를 초기화.
                    fileForm.reset();
                    util_file_init(self, dirName, dirName+"Files");
                    alert("추가성공!");
                }else{
                    alert("실패!");
                }
            });
        },

        //파일 삭제 함수.
        //_driName("event", "banner", ..)에 해당하는 fileName의 파일을 삭제한다.
        removeFile : function(_dirName, _fileName){
            var self = this;
            deleteFile({dir : _dirName, fileName : _fileName}).then(function(rtn){
                if(rtn.success){
                    alert("삭제성공!");
                    util_file_init(self, _dirName, _dirName+"Files");
                }
            });
        },

        //update시에, 하나의 toggleChange함수를 사용하는데, 
        //updateObj에 update하고 싶은 obj를 넣고, 해당 obj의 배열 내의 index를 넣어준다.
        toggleChange : function(oldObj, updateToggle, index){
            var self = this;
            self.updateObj = oldObj;
            self[updateToggle] = !self[updateToggle];
            self.updateIndex = index;
        },

        //updateObj에 해당하는 값의 id로 들어가 update 시키는 함수.
        changeThing : function(whichFunc, dataString, toggleString){
            var self = this;
            whichFunc(self.updateObj.id, self.updateObj).then(function(rtn){
                
                if(rtn.success){
                    alert("수정 완료!");
                    //Reload하지 않도록 setting 시킴.
                    Vue.set(self[dataString], self.updateIndex, self.updateObj);
                    self.updateIndex = -1;
                    self.updateObj = {};
                    self[toggleString] = false;
                }else{
                    alert("수정한게 없거나, 에러가 난거 같아요");
                }

            });
        },

        changeCategory: function(){
            var self = this;
            self.changeThing(updateCategory, "categorys", "update_category_toggle");
        },
        changeEvent: function(){
            var self = this;
            self.changeThing(updateEvent, "events", "update_event_toggle");
        },
        changeCoupon: function(){
            var self = this;
            self.changeThing(updateCoupon, "coupons", "update_coupon_toggle");
        },
        changeBanner: function(){
            var self = this;
            self.changeThing(updateBanner, "banners", "update_banner_toggle");
        },

        //id를 받아 해당 model의 obj를 삭제해주는 함수.
        removeThing : function(deleteFunc, id, getFunc, dataName){

            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            deleteFunc(id).then(function(rtn){
                if(rtn.success){
                    alert("삭제완료!");
                    util_data_init(self, getFunc, dataName);
                }else{
                    alert("실패!");
                }
            });
        },

        removePayer: function(id){
            var self = this;
            self.removeThing(deletePayer, id, getPayers, "payers");
        },
        removeParticipant: function(id){
            var self = this;
            self.removeThing(deleteParticipant, id, getParticipants, "payers");
        },
        removeCoupon: function(id){
            var self = this;
            self.removeThing(deleteCoupon, id, getCoupons, "coupons");
        },
        removeEvent: function(id){
            var self = this;
            self.removeThing(deleteEvent, id, getEvents, "events");
        },
        removeCategory: function(id){
            var self = this;
            self.removeCategory(deleteCategory, id, getCategorys, "categorys");
        },
        removeBanner : function(id){
            var self = this;
            self.removeBanner(deleteBanner, id, getBanners, "banners");
        },




    }

});
