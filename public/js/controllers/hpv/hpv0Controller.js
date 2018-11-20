
var url =  window.location.pathname;
var hpvID = url.replace("/hpv0/", "");




var app = new Vue({

  el:'#hpv0_app',

  data:{
    errors:[],
    terms:null,
    refundTerms:null,
  },
  
  methods:{
    
    checkForm:function(e) {
      
      e.preventDefault();
      var self = this;

      if(self.terms && self.refundTerms){

          alert('同意书成功提交!');//동의 성공
          location.href = '/hpv1/' + hpvID;	
          return;

    	} 

    	self.errors = [];
      
    	if(!self.terms) self.errors.push("Term 1 is requred");
    	if(!self.refundTerms) self.errors.push("Term 2 is required.");
    	

    
    }
  
  }

});
