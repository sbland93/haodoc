



var app = new Vue({

    el : "#app",

    data : {

    	newTranslate: {
            agreement: null,
            content: null,
            remarks: null,
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

        makeTranslate: function(){


            var self = this;

            var _a = self.newTranslate;
            
            if(_a.agreement === "true" && _a.content && _a.name && _a.password){

                addTranslate(self.newTranslate).then(function(rtn){

                    if(rtn.success){

                        alert("글 작성이 완료되었습니다. HaoDoc이 빠르게 확인하고 연락드리겠습니다.")
                        location.href = "/translateInfo/" + rtn.id;
                   
                    }else{
                        
                        alert("문제가 생겼습니다. 다시한번 시도해주세요!")
                   
                    }

                
                });
            
            }else{

                self.errors = [];

                if(!_a.agreement !== "true") self.errors.push("번역 주의사항 동의를 해주셔야 하오닥 증상번역 서비스가 가능합니다.");
                if(!_a.content) self.errors.push("번역이 필요한 증상정보 입력은 필수입니다.");
                if(!_a.name) self.errors.push("이름은 필수로 입력해주셔야 합니다.");
                if(!_a.password) self.errors.push("비밀번호는 필수로 입력해 주셔야 합니다.");

            }
        
        }
        


    }

});
