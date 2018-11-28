

var app = new Vue({

    el : "#app",

    data : {

    	newInsurance: {
            questionType: null,
            kindOfInsurance: null,
            school: null,
            whatInsurnace: null,
            remarks : null,
            name: null,
            wechatID: null,
            password: null,
        },
        errors:[],

    },

    mounted: function(){
    	
    	var self = this;
    
    },

    methods: {

        makeInsurance: function(){

            var self = this;

            var _a = self.newInsurance;
            
            if(_a.questionType && _a.name && _a.password){

                addInsurance(self.newInsurance).then(function(rtn){

                    if(rtn.success){

                        alert("글 작성이 완료되었습니다. HaoDoc이 빠르게 확인하고 연락드리겠습니다.")
                        location.href = "/insuranceInfo/" + rtn.id;
                   
                    }else{
                        
                        alert("문제가 생겼습니다. 다시한번 시도해주세요!")
                   
                    }

                
                });
            
            }else{

                self.errors = [];

                if(!_a.questionType) self.errors.push("질문 종류는 필수입니다.");
                if(!_a.name) self.errors.push("이름은 필수로 입력해주셔야 합니다.");
                if(!_a.password) self.errors.push("비밀번호는 필수로 입력해 주셔야 합니다.");

            }


            
        
        }
        


    }

});
