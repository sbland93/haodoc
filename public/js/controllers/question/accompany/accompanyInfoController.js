var url =  window.location.pathname;
var accompanyID = url.replace("/accompanyInfo/", "");

var app = new Vue({

    el : "#app",

    data : {

    	accompany: "",
        accompanyID : accompanyID,
        answerToggle : false,
        newAnswer : "",
    },

    filters: {
        
        moment: function (date) {
        
            return moment(date).format('MM/DD hh:mm a');
        
        },

    },

    mounted: function(){
    	
    	var self = this;
        
        getAccompany(accompanyID).then(function(rtn){
            console.log(rtn);
            if(rtn.success){
                self.accompany = rtn;
            }else{
                //alert("문제가 생긴 것 같아요.");
                alert("出现了问题，请再次尝试");

            }
        
        });
    
    },

    methods: {

        toggleAnswer : function(){
            
            var self = this;
            var pass=prompt("只有HaoDoc才可以答复，会马上回复您的")
            //var pass=prompt("HaoDoc 만 답변을 남길 수 있어요. 금방 답변을 남겨드릴게요:)")
            if(pass !== "inspire") return;
            self.answerToggle = !self.answerToggle;

        },

        makeAnswer : function(){

            var self = this;

            if(self.newAnswer.length < 10){
                
                alert("请填写10个字以上的回答");
                //alert("10글자 이상의 답변을 작성하세요.")
                return;
            
            }

            var updateObj = {"$set" : {"answer" : {"content" : self.newAnswer } } };

            updateAccompany(accompanyID, updateObj).then(function(rtnValue){
                
                if(rtnValue.success){
                
                    alert("填写完成");
                    //alert("답변이 달렸습니다.");
                    self.newAnswer = "";
                    self.answerToggle = false;
                    getAccompany(accompanyID).then(function(rtn){

                        if(rtn.success){
                            self.accompany = rtn;
                        }else{
                            alert("出现了问题，请再次尝试");
                            //alert("문제가 생긴것 같아요. 새로고침 해주세요.");
                        }

                    })
                
                }else{
                    alert("出现了问题，请再次尝试");
                    //alert("문제가 생긴것 같습니다.");
                
                }
                
            
            });


        }

        


    }

});
