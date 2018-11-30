

var app = new Vue({

    el : "#app",

    data : {

    	newAccompany: {
            symptom: null,
            subject: "没有选择",
            hospital: null,
            remarks: null,
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

        makeAccompany: function(){

            var self = this;

            var _a = self.newAccompany;
            
            if(_a.symptom && _a.day && _a.name && _a.password && _a.wechatID){

                addAccompany(self.newAccompany).then(function(rtn){

                    if(rtn.success){
                        alert("内容已经填写完成，我们HaoDoc会尽快确认后回复您");

                        //alert("글 작성이 완료되었습니다. HaoDoc이 빠르게 확인하고 연락드리겠습니다.")
                        location.href = "/accompanyInfo/" + rtn.id;
                   
                    }else{
                                                alert("出现了问题，请再次尝试");

//                        alert("문제가 생겼습니다. 다시한번 시도해주세요!")
                   
                    }

                
                });
            
            }else{

                self.errors = [];

                if(!_a.symptom) self.errors.push("症状内容必须输入");
                //if(!_a.symptom) self.errors.push("증상정보는 필수로 입력해주셔야 합니다.");
                if(!_a.day) self.errors.push("병원 방문 예정일과 시간 입력 필수입니다.");
                if(!_a.name) self.errors.push("名字必须输入");
                //if(!_a.name) self.errors.push("이름은 필수로 입력해주셔야 합니다.");
                if(!_a.password) self.errors.push("密码必须输入");
                //if(!_a.password) self.errors.push("비밀번호는 필수로 입력해 주셔야 합니다.");

            }

        
        }
        


    }

});
