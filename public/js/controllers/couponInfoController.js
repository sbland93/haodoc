
var url =  window.location.pathname;
var couponID = url.replace("/coupon/", "");
console.log("couponID", couponID);


var app = new Vue({

    el : "#app",
    
    data : {

        coupon : '',
        newQuestion : {
            name: "",
            content: "",
            wechatID: "",
            password: "",
        },
        newAnswer : {
            name: "",
            password : "",
            content: "",
        },
        answerIndex : -1,
        couponID : couponID,

    },
    
    mounted: function(){
        
        var self = this;
        console.log("dd",couponID);
        getCoupon(couponID).then(function(coupon){
        
            console.log(coupon);
            self.coupon = coupon;
        
        });
    
    },
    filters: {
        moment: function (date) {
            return moment(date).format('MM/DD hh:mm a');
        },

    },
    methods: {

        moment: function (date) {
          return moment(date);
        },

        couponImageHref: function(image_file_name){

            return "/images/coupon/all/" + image_file_name;
        
        },

        hpvZeroHref: function(){
            return "/hpv0/" + self.couponID;
        },

        addQuestion : function(){
            var self = this;
            //이름 두글자, 비밀번호 세글자, 질문 다섯글자 이상입력
            if(self.newQuestion.name.length > 1 && self.newQuestion.password.length > 2 && self.newQuestion.content.length > 4){
                console.log(self.newQuestion);
                updateCoupon(self.couponID, {"$push" : { "questions": self.newQuestion}}).then(function(rtn){
                    if(rtn.success){
                        getCoupon(self.couponID).then(function(coupon){
                            self.coupon = coupon;
                            self.newQuestion =  {
                                name: "",
                                content: "",
                                wechatID: "",
                                password: "",
                            };
                            alert("问题已经成功提交"
) // 질문이 등록되었습니다.
                        });    
                    }else{
                        alert("에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.");
                    }
                    
                });
            }else{
                alert("名字为2个字以上， 密码为3个字以上，问题请填写5个字以上");//이름은 두글자 이상, 비밀번호는 세글자 이상, 질문은 다섯자 이상으로 해주세요!
            }

        },

        //answer-modald에서 답글완성 클릭시, 
        addAnswer : function(){
            var self = this;

            //제대로 answerIndex가 변경되어서, 타겟 질문을 잡고있는지 확인 후
            if(self.answerIndex !== -1){
                //이름 두글자 이상, 비밀번호 세글자 이상, 응답 다섯글자 이상
                if(self.newAnswer.name.length > 1 && self.newAnswer.password.length > 2 && self.newAnswer.content.length > 4 ){
                    //index에 해당하는 질문이 있는지 파악 후에, 해당 index의 질문에 대답을 추가한다.
                    if(self.coupon.questions && self.coupon.questions[self.answerIndex]){
                        self.newAnswer["updated_at"] = Date.now();
                        self.coupon.questions[self.answerIndex]["answer"] = self.newAnswer;
                        updateCoupon(self.couponID, self.coupon).then(function(rtn){
                            //답글 작성 완료시, 모달을 끄고(클릭으로), 새롭게 랜더링해준다.
                            console.log("updateCouponAnser RTN", rtn);
                            self.answerIndex = -1;
                            self.newAnswer =  {
                                name: "",
                                password : "",
                                content: "",
                            },
                            alert("답글 작성 완료.");
                            $('#dismissAnswerModal').click();
                            getCoupon(self.couponID).then(function(coupon){
                                self.coupon = coupon;
                            });
                        });
                    }
                    
                }else{
                    alert("이름은 두글자 이상, 비밀번호는 세글자 이상, 질문은 다섯자 이상으로 해주세요!");
                }
            }

        },


        changeAnswerIndex : function(index){
            var self = this;
            self.answerIndex = index;
            var pass=prompt("Password");
            if(pass !== "inspire") return;
            $("#answerModal").modal("show");
            return;
        },


    }

})

