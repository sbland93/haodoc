var app = new Vue({

    el : "#app",

    data : {

        events: "",
        coupons: "",

    },

    mounted: function(){
        var self = this;
    
        getEvents().then(function(events){
            self.events = events;
    
        });
        getCoupons().then(function(coupons){
            self.coupons = coupons;
    
        });
    
    },

    methods: {

        //handlebars랑 겹쳐서, href를만드는 것을 method로 뺌. 방법을 강구해봐야할 듯.
        eventHref : function(id){
            return "/event/"+id;
        },

        couponHref : function(id){
            return "/coupon/" + id
        },
        eventThumbnailHref: function(thumb_file_name){
            return "/images/event/"+thumb_file_name;
        },
        couponThumbnailHref: function(thumb_file_name){
            return "/images/coupon/all/" + thumb_file_name;
        },


    }

});
