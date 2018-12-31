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
        highCategorys : "",
        highCategoryFiles : "",

        banners: "",
        bannerFiles : "",
        feeds : "",
        feedFiles : "",

        list_array : [ {} ],
        list_array_2 : [ {} ],
        list_array_3 : [ {} ],

        array_list : [[{}]], //highCategory에 속의 리스트를 분류하기 위함.

        updateIndex : -1,
        updateObj : {},

        update_participant_toggle : false,
        update_payer_toggle : false,
        update_event_toggle : false,
        update_coupon_toggle : false,
        update_category_toggle : false,
        update_highCategory_toggle : false,
        update_banner_toggle : false,
        update_feed_toggle : false,

        toggles : {
            payerToggle : false,
            participantToggle : false,
            couponToggle : false,
            eventToggle : false,
            categoryToggle : false,
            highCategoryToggle : true,
            bannerToggle : false,
            feedToggle : false,
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
                func_name : getHighCategorys, data_name: "highCategorys"
            },
            {
                func_name : getBanners, data_name: "banners"
            },
            {
                func_name : getFeeds, data_name: "feeds"
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
            {
                dirString : "feed", data_name : "feedFiles"
            },
            {
                dirString : "highCategory", data_name : "highCategoryFiles"
            },
        ];

        for (var i = init_file_arr.length - 1; i >= 0; i--) {
            util_file_init(self, init_file_arr[i].dirString, init_file_arr[i].data_name);
        }
    
    },

    watch: {
        array_list : function(_old, _new){
            console.log(_old, _new);
        }
    },

    methods: {

        //category가 현재 populate해서 전달되기 때문에
        isInclude : function(arr, id){
            var isInclude = false;
            arr.map(function(el){
                if(el._id === id) isInclude = "checked";
            })
            return isInclude;
        },


        //추가값을 활용하기 위함 //Event는 form내부에서 submit을 막기 위함.
        change_list_array : function(_arr, manipulate_string, event){
            
            event.preventDefault();
            
            var self = this;
            console.log(_arr);
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

        change_array_list : function(manipulate_string, event){
            var self = this;
            event.preventDefault();
            if(manipulate_string === "+"){
                self.array_list.push([{}]);
            }else if(manipulate_string === "-"){
                self.array_list.shift();
            }else if(/^\d+$/.test(manipulate_string)){ //숫자가 들어오면 해당 값을 삭제한다.
                self.array_list.splice(parseInt(manipulate_string), 1);
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
            var new_banner_form = $("#banner-form")[0];
            var newBanner = new FormData(new_banner_form);

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
                    new_banner_form.reset();
                    util_data_init(self, getBanners, "banners");
                }else{
                    alert("필드를 다 채워주셔야 합니다.");
                }

            });
        },

        newFeed: function(event){

            event.preventDefault();
            var self = this;
            var new_feed_form = $("#feed-form")[0];
            var newFeed = new FormData(new_feed_form);

            //file이 있는지 확인한다.
            var val1 = $("#feedImage").val();
            var val2 = $("#feed-mobile-image").val();

            if(val1 == '' || val2 == ''){
               alert("파일은 필수입니다.");
               return false;
            }
            addFeed(newFeed).then(function(rtn){
                
                if(rtn.success){
                    alert("추가 완료");
                    new_feed_form.reset();
                    util_data_init(self, getFeeds, "feeds");
                }else{
                    alert("필드를 다 채워주셔야 합니다.");
                }

            });
        },

        newHighCategory: function(event){

            event.preventDefault();
            var self = this;
            var new_highCategory_form = $("#highCategory-form")[0];
            var newHighCategory = new FormData(new_highCategory_form);

            for(var key of newHighCategory.keys()){
                console.log(key);
            }
            for(var value of newHighCategory.values()){
                console.log(value);
            }            
            //file이 있는지 확인한다.
            var val1 = $("#icon-high-image-file").val();

            if(val1 == ''){
               alert("파일은 필수입니다.");
               return false;
            }

            addHighCategory(newHighCategory).then(function(rtn){
                
                if(rtn.success){
                    alert("추가 완료");
                    new_highCategory_form.reset();
                    util_data_init(self, getHighCategorys, "highCategorys");
                }else{
                    console.log(rtn);
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
            self.updateObj.middleCategorys.map(function(el){
                console.log(el.lowCategorys);
            });
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

        changeParticipant: function(){
            var self = this;
            self.changeThing(updateParticipant, "participants", "update_participant_toggle");
        },
        changePayer: function(){
            var self = this;
            self.changeThing(updatePayer, "payers", "update_payer_toggle");
        },
        changeCategory: function(){
            var self = this;
            self.changeThing(updateCategory, "categorys", "update_category_toggle");
        },
        changeHighCategory: function(){
            var self = this;
            self.changeThing(updateHighCategory, "highCategorys", "update_highCategory_toggle");
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
        changeFeed: function(){
            var self = this;
            self.changeThing(updateFeed, "feeds", "update_feed_toggle");
        },

        //id를 받아 해당 model의 obj를 삭제해주는 함수.
        removeThing : function(deleteFunc, id, getFunc, dataName){

            var pass=prompt("Password")
            if(pass !== "inspire") return;
            var self = this;
            console.log(deleteFunc);
            deleteFunc(id).then(function(rtn){
                console.log(rtn);
                if(rtn.success){
                    alert("삭제완료!");
                    util_data_init(self, getFunc, dataName);
                    //dataName이 현재, "categorys" -> category
                    if(dataName === "categorys" || dataName === "coupons" ||
                     dataName === "events" || dataName === "banners"){
                        dataName = dataName.slice(0, -1);
                        util_file_init(self, dataName, dataName+"Files")
                    }
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
            self.removeThing(deleteParticipant, id, getParticipants, "participants");
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
            self.removeThing(deleteCategory, id, getCategorys, "categorys");
        },
        removeHighCategory: function(id){
            var self = this;
            self.removeThing(deleteHighCategory, id, getHighCategorys, "highCategorys");
        },
        removeBanner : function(id){
            var self = this;
            self.removeThing(deleteBanner, id, getBanners, "banners");
        },
        removeFeed : function(id){
            var self = this;
            self.removeThing(deleteFeed, id, getFeeds, "feeds");
        },




    }

});
