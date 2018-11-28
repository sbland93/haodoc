var url =  window.location.pathname;
var translateID = url.replace("/translateInfo/", "");

var app = new Vue({

    el : "#app",

    data : {

    	translate: "",
        translateID : translateID,
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
        
        getTranslate(translateID).then(function(rtn){
            console.log(rtn);
            if(rtn.success){
                self.translate = rtn;
            }else{
                alert("문제가 생긴 것 같아요.");
            }
        
        });
    
    },

    methods: {

        toggleAnswer : function(){
            
            var self = this;
            var pass=prompt("HaoDoc 만 답변을 남길 수 있어요. 금방 답변을 남겨드릴게요:)")
            if(pass !== "inspire") return;
            self.answerToggle = !self.answerToggle;

        },

        makeAnswer : function(){

            var self = this;

            if(self.newAnswer.length < 10){
                
                alert("10글자 이상의 답변을 작성하세요.")
                return;
            
            }

            var updateObj = {"$set" : {"answer" : {"content" : self.newAnswer } } };

            updateTranslate(translateID, updateObj).then(function(rtnValue){
                
                if(rtnValue.success){
                
                    alert("답변이 달렸습니다.");
                    self.newAnswer = "";
                    self.answerToggle = false;
                    getTranslate(translateID).then(function(rtn){

                        if(rtn.success){
                            self.translate = rtn;
                        }else{
                            alert("문제가 생긴것 같아요. 새로고침 해주세요.");
                        }

                    })
                
                }else{
                
                    alert("문제가 생긴것 같습니다.");
                
                }
                
            
            });


        }

        


    }

});
