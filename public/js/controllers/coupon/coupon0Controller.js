
var url =  window.location.pathname;
var couponID = url.replace("/coupon0/", "");




var app = new Vue({

  el:'#coupon0_app',

  data:{
    errors:[],
    terms:null,
    refundTerms:null,
    thirdTerms : null,

  },
  
  methods:{
    
    checkForm:function(e) {
      
      e.preventDefault();
      var self = this;

      if(self.terms && self.refundTerms){

          alert('同意书成功提交!');//동의 성공
          location.href = '/coupon1/' + couponID;	
          return;

    	} 

    	self.errors = [];
      
    	if(!self.terms) self.errors.push("使用条款同意必须输入");
    	if(!self.refundTerms) self.errors.push("个人信息处理委托同意必须输入");
      if(!self.thirdTerms) self.errors.push("治疗委托合同事前同意必须输入");


    
    }
  
  }

});
