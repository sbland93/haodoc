
var url =  window.location.pathname;
var couponID = url.replace("/coupon/", "");


var app = new Vue({

    el : "#coupon-info-app",
    
    data : {

        //쿠폰과 쿠폰리뷰들
        couponID : couponID,
        coupon : '',
        couponReviews: '',

        add_answer_toggle: false,
        question_update_toggle: false,

        newQuestion : {},
        newReview: {},
        updateObj : {},


        //질문에 대한 응답이나, 질문 업데이트시 잡고있는 flag 변수
        updateIndex : -1,

        // 질문하기, 리뷰남기기 클릭시에 questionToggle로 질문시트가 내려옴
        questionToggle: false,
        reviewToggle: false,

    },

    mounted: function(){




        //마운트 시에, 쿠폰의 정보와, 쿠폰의 리뷰들을 불러온다.
        var self = this;

        getCoupon(couponID).then(function(coupon){
            
            self.coupon = coupon;
            //마운트시에 조회가 된 것이므로, 조회수를 올린다.
            self.coupon.views += 1;
            self.coupon.realViews += 1;
            updateCoupon(couponID, self.coupon).then(function(rtn){
                if(rtn.success) return;
            });

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
            return "/coupon0/" + self.couponID;
        },

        addQuestion : function(){
            var self = this;
            //이름 두글자, 비밀번호 세글자, 질문 다섯글자 이상입력
            if(self.newQuestion.name.length > 1 && self.newQuestion.password.length > 2 && self.newQuestion.content.length > 4){
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
                            self.questionToggle = false;
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


        removeQuestion : function(index, question){
            
            var self = this;
            var pass=prompt("Password");
            if(pass !== question.password && pass !== "inspire") return;

            self.coupon.questions.splice(index, 1); //배열에서 해당 index의 question삭제 후
            updateCoupon(self.couponID, self.coupon).then(function(rtn){
                if(rtn.success){
                    alert("删除");
                }else{
                    alert("出错了，请刷新");
                }
            });


        },

        //answer-modald에서 답글완성 클릭시, 
        toggle_add_answer : function(index){

            var self = this;
            var pass = prompt("Password");
            if(pass !== "inspire") return;
            self.updateIndex = index;
            self.add_answer_toggle = true;
        },

        //answer-modald에서 답글완성 클릭시, 
        toggle_update_question : function(index, oldObj){

            var self = this;
            var pass = prompt("Password");
            if(pass !== "inspire" && pass !== oldObj.password) return;
            self.updateIndex = index;
            self.question_update_toggle = true;
            self.updateObj = oldObj;

        },

        addAnswer: function(){
            var self = this;
            //이름 두글자 이상, 비밀번호 세글자 이상, 응답 다섯글자 이상
            if(self.updateObj.name.length > 1 && self.updateObj.password.length > 2 && self.updateObj.content.length > 4 ){
                //index에 해당하는 질문이 있는지 파악 후에, 해당 index의 질문에 대답을 추가한다.
                if(self.coupon.questions && self.coupon.questions[self.updateIndex]){
                    self.coupon.questions[self.updateIndex]["answer"] = self.updateObj;
                    updateCoupon(self.couponID, self.coupon).then(function(rtn){
                        //답글 작성 완료시, 모달을 끄고(클릭으로), 새롭게 랜더링해준다.
                        if(rtn.success){
                            self.updateIndex = -1;
                            self.updateObj =  {};
                            self.add_answer_toggle = false;
                            Vue.set(self.coupon.questions, self.updateIndex, self.coupon.questions[self.updateIndex]);
                            alert("답글 작성 완료.");
                        }else{
                            alert("에러가 있는거 같네요. 새로고침후 다시 시도해주세요.");
                        }
                    });
                }else{
                    alert("出错了，请刷新"); //에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.
                }
            }else{
                alert("이름은 두글자 이상, 비밀번호는 세글자 이상, 질문은 다섯자 이상으로 해주세요!");
            }

        },


        // 해당 questions[index]에 update된 Obj를 넣은후에 통채로 보내 업데이트 시킨다.
        updateQuestion: function(){
            
            var self = this;
            self.coupon.questions[self.updateIndex] = self.updateObj;
            
            updateCoupon(self.couponID, self.coupon).then(function(rtn){
                
                if(rtn.success){

                    self.updateIndex = -1;
                    self.updateObj =  {};
                    self.question_update_toggle = false;
                    Vue.set(self.coupon.questions, self.updateIndex, self.updateObj);
                    alert("问题已经成功提交") // 질문이 등록되었습니다.
                }else{
                    alert("出错了，请刷新"); //에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.
                }
            
            });

        
        },

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

            
            addCouponReview(self.newReview).then(function(rtn){
                if(rtn.success){
                    
                    alert("感谢您填写后记");
                    // 리뷰를 작성해 주셔서 정말 감사합니다.
                    self.reviewToggle = false;
                    getCouponReviews({coupon: couponID}).then(function(couponReviews){
                        self.couponReviews = couponReviews;
                        self.newReview =  {

                            name : "",
                            coupon: "",
                            content: "",
                            score: "",
                            wechatID: "",
                            password: "",
                        
                        };
                        self.reviewToggle = false;
                    });

                }else{
                    
                    alert("出错了，请刷新"); //에러입니다. 새로고침을 하고 다시한번 시도해봐주세요.
                    self.reviewToggle = false;
                
                }
            });
        
        }


    }

})

