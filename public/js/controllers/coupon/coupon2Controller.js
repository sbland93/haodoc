
    
var url =  window.location.pathname;
var couponID = url.replace("/coupon2/", "");


var app = new Vue({

    el : "#coupon2_app",

    data : {

    	coupon : "",
        couponID : couponID,
    },

    mounted: function(){
    	var self = this;
    	
        getCoupon(couponID).then(function(coupon){
            
            self.coupon = coupon;
        });
    
    },
    methods: {




    }

});
