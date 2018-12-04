var url =  window.location.pathname;
var recommendID = url.replace("/recommendInfo/", "");

var app = new Vue({

    el : "#app",

    data : {

    	recommend: "",
        recommendID : recommendID,
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
        
        getRecommend(recommendID).then(function(rtn){
        
            if(rtn.success){
                self.recommend = rtn;
            }else{
                alert("出现了问题，请再次尝试");
                //alert("문제가 생긴것 같습니다.");
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

            updateRecommend(recommendID, updateObj).then(function(rtnValue){
                
                if(rtnValue.success){
                
                    alert("填写完成");
                    //alert("답변이 달렸습니다.");
                    self.newAnswer = "";
                    self.answerToggle = false;
                    getRecommend(recommendID).then(function(rtn){

                        if(rtn.success){
                            self.recommend = rtn;
                        }else{
                            alert("出现了问题，请再次尝试");
                            //alert("문제가 생긴것 같습니다.");
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
