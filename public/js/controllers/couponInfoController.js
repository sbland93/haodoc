
var url =  window.location.pathname;
var couponID = url.replace("/coupon/", "");
console.log("couponID", couponID);


var app = new Vue({

    el : "#app",
    
    data : {

        //쿠폰과 쿠폰리뷰들
        coupon : '',
        couponReviews: '',
        
        newQuestion : {
            name: "",
            content: "",
            wechatID: "",
            password: "",
        },
        
        changeQuestion:{
            name : "",
            content: "",
            wechatID: "",
            password: "",
        },
        
        newAnswer : {
            name: "",
            password : "",
            content: "",
        },
        
        newReview: {

            name : "",
            coupon: "",
            content: "",
            score: "",
            wechatID: "",
            password: "",
        
        },

        //질문에 대한 응답이나, 질문 업데이트시 잡고있는 flag 변수
        answerIndex : -1,
        questionIndex : -1,
        couponID : couponID,

        // 질문하기, 리뷰남기기 클릭시에 questionToggle로 질문시트가 내려옴
        questionToggle: false,
        reviewToggle: false,

    },
    
    mounted: function(){
        //마운트 시에, 쿠폰의 정보와, 쿠폰의 리뷰들을 불러온다.
        var self = this;

        getCoupon(couponID).then(function(coupon){
            self.coupon = coupon;
        });

        getCouponReviews({coupon: couponID}).then(function(couponReviews){
            self.couponReviews = couponReviews;
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
                            alert("问题已经成功提交") // 질문이 등록되었습니다.
                        });    
                    }else{
                        alert("出错了，请刷新"); //에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.
                    }
                    
                });
            }else{
                alert("名字为2个字以上， 密码为3个字以上，问题请填写5个字以上");//이름은 두글자 이상, 비밀번호는 세글자 이상, 질문은 다섯자 이상으로 해주세요!
            }

        },

        // question을 update하는 modal이 생성되었을 시에 변경후에 업데이트 버튼을 누르면,
        updateQuestion: function(){
            
            var self = this;

            if(self.questionIndex !== -1){
                console.log("changeQuestion", self.changeQuestion);

                self.coupon.questions[self.questionIndex] = self.changeQuestion;
                updateCoupon(self.couponID, self.coupon).then(function(rtn){
                    $("#updateModal").modal("hide");
                    console.log("Finally");
                });

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

        toggleQuestion : function(){

            var self = this;

            self.reviewToggle = false;
            self.questionToggle = !self.questionToggle;
        
        },

        toggleReview : function(){
           
            var self = this;

            self.questionToggle = false;
            self.reviewToggle = !self.reviewToggle;

        },

        changeAnswerIndex : function(index){
            var self = this;
            self.answerIndex = index;
            var pass=prompt("Password");
            if(pass !== "inspire") return;
            $("#answerModal").modal("show");
            return;
        },

        // question Update를 하고 싶으면, index를 받아서 해당하는 question 값을 넣고, modal을 띄워준다.
        questionUpdate : function(index){
            var self = this;
            self.questionIndex = index;
            var thisQuestion = self.coupon.questions[index];
            var pass=prompt("Password");
            if(pass !== thisQuestion.password) return;

            //비밀번호를 맞추면, update-question-modal에 v-model로 잡고있는 changeQuestion에 값을 넣고 
            self.changeQuestion = thisQuestion;
            $("#updateModal").modal("show");
            return;
        },

        //review를 업데이트 하고 싶으면, index에 해당하는 review 값을 띄워지는 modal창에서 사용하고 있는
        //changeReview값에 넣고, modal을 띄워준다.
        /*reviewUpdate: function(index){
            var self = this;
            self.reviewIndex = index;
            var thisReview = self.couponReviews[index];
            var pass = prompt("Password");
            if(pass !== thisReview.password) return;

            self.changeReview = thisReview;
            $("updateReview").modal()

        }*/

        //coupon review 작성하기 클릭시, 
        newCouponReview : function(){

            var self = this;
            self.newReview["coupon"] = self.couponID;

            for(var key in self.newReview){

                if ( key !== "wechatID" && self.newReview[key] === "" ){
                    alert("名字，满意度，一次性密码，使用后记都为必须填写项目");
                    // 이름, 만족도, 일회용비밀번호, 사용후기는 모두 필수 입력 칸입니다.
                    return;
                }
            
            }

            console.log(self.newReview);
            
            addCouponReview(self.newReview).then(function(rtn){
                if(rtn.success){
                    
                    alert("感谢您填写后记");
                    // 리뷰를 작성해 주셔서 정말 감사합니다.
                    self.reviewToggle = false;
                    getCouponReviews().then(function(couponReviews){
                        self.couponReviews = couponReviews;
                        self.newReview =  {

                            name : "",
                            coupon: "",
                            content: "",
                            score: "",
                            wechatID: "",
                            password: "",
                        
                        };
                    });

                }else{
                    
                    alert("出错了，请刷新"); //에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.
                    self.reviewToggle = false;
                
                }
            });
        
        }


    }

})

