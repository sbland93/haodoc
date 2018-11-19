
    
var url =  window.location.pathname;
var hpvID = url.replace("/hpv2/", "");
console.log("hpvID", hpvID);


var app = new Vue({

    el : "#hpv2_app",

    data : {

    	coupon : "",
        hpvID : hpvID,
    },

    mounted: function(){
    	var self = this;
    	
        getCoupon(hpvID).then(function(coupon){
            
            self.coupon = coupon;
            console.log(self.coupon);
        });
    
    },
    methods: {




    }

});
