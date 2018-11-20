	
var url =  window.location.pathname;
var hpvID = url.replace("/hpv1/", "");


var app = new Vue({

  el:'#hpv1_app',

  data:{
    errors:[],

    newPayer : {
    	chineseName: null,
		englishName: null,
		payerName : null,
		gender: null,
		birthDay:null,
		phone: null,
		wechatID: null,
    }
    
  },
  
  methods:{
    
    checkForm:function(e) {
		
		e.preventDefault();
      
      	var self = this;
    	var newPayer = self.newPayer

    	if(newPayer.chineseName && newPayer.englishName && newPayer.gender && newPayer.birthDay && newPayer.phone && newPayer.wechatID){
			
    		newPayer["coupon"] = hpvID;
			addPayer(newPayer).then(function(data){
			
				if(data.success){		
					alert('个人信息成功提交!');//개인정보 제출 성공
					location.href = '/hpv2/' + hpvID;
					return;
				} 
				else{
					alert('Error Occured');
				}
			}).catch(function(err){
				alert(err);
			});


    	} 

    	self.errors = [];
      

    	if(!newPayer.chineseName) self.errors.push("中文姓名 is requred");
    	if(!newPayer.englishName) self.errors.push("护照英文姓名 is required.");
    	if(!newPayer.gender) self.errors.push("性别 is required.");
    	if(!newPayer.birthDay) self.errors.push("出生年月日 is required.");
    	if(!newPayer.phone) self.errors.push("电话号码 is required.");
    	if(!newPayer.wechatID) self.errors.push("微信号 is required.");

    
    }
  
  }

});

