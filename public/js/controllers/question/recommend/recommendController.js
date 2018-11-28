

var app = new Vue({

    el : "#app",

    data : {

    	newRecommend: {
            symptom: null,
            subject: "没有选择",
            position: null,
            reservation : null,
            day : null,
            name: null,
            wechatID: null,
            password: null,
        },
        errors:[],

        subjectList : _subjectList,
    },

    mounted: function(){
    	
    	var self = this;
    
    },

    methods: {

        makeRecommend: function(){

            var self = this;

            var _a = self.newRecommend;
            
            if(_a.symptom && _a.position && _a.name && _a.password){

                addRecommend(self.newRecommend).then(function(rtn){

                    if(rtn.success){

                        alert("글 작성이 완료되었습니다. HaoDoc이 빠르게 확인하고 연락드리겠습니다.")
                        location.href = "/recommendInfo/" + rtn.id;
                   
                    }else{
                        
                        alert("문제가 생겼습니다. 다시한번 시도해주세요!")
                   
                    }

                
                });
            
            }else{

                self.errors = [];

                if(!_a.symptom) self.errors.push("증상정보는 필수로 입력해주셔야 합니다.");
                if(!_a.position) self.errors.push("위치정보는 필수로 입력해주셔야 합니다.");
                if(!_a.name) self.errors.push("이름은 필수로 입력해주셔야 합니다.");
                if(!_a.password) self.errors.push("비밀번호는 필수로 입력해 주셔야 합니다.");

            }

            
        
        }
        


    }

});
