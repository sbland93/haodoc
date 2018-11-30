

var app = new Vue({

    el : "#app",

    data : {

        questions: [],
    	recommends : [],
        translates : [],
        accompanys : [],
        insurances : [],

    },

    mounted: function(){
    	
    	var self = this;
        self.questions = [];

        var p1 = new Promise(function(resolve, reject){
            getRecommends().then(function(rtn){
                if(Array.isArray(rtn)){
                    self.recommends = rtn;
                    self.questions = self.questions.concat(rtn);
                    resolve();
                }else{
                    alert("出错了，请刷新");
                    //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
                    reject();
                }
            });
        });
        var p2 = new Promise(function(resolve, reject){
            getTranslates().then(function(rtn){
                if(Array.isArray(rtn)){
                    self.translates = rtn;
                    self.questions = self.questions.concat(rtn);
                    resolve();
                }else{
                    alert("出错了，请刷新");
                    //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
                    reject();
                }
            });
        });
        var p3 = new Promise(function(resolve, reject){
            getAccompanys().then(function(rtn){
                if(Array.isArray(rtn)){
                    self.accompanys = rtn;
                    self.questions = self.questions.concat(rtn);
                    resolve();
                }else{
                    alert("出错了，请刷新");
                    //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
                    reject();
                }
            });
        });
        
        var p4 = new Promise(function(resolve, reject){
            getInsurances().then(function(rtn){
                if(Array.isArray(rtn)){
                    self.insurances = rtn;
                    self.questions = self.questions.concat(rtn);
                    resolve();
                }else{
                    alert("出错了，请刷新");
                    //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
                    reject();
                }
            });
        });

        Promise.all([p1, p2, p3, p4]).then(function(rtnArr){

            self.questions = self.questions.sort(function(a, b){
                
                var a_time = new Date(a.updated_at).getTime();
                var b_time = new Date(b.updated_at).getTime();
                return b_time - a_time;
            
            })

        }).catch(function(rtnArr){
            alert("出错了，请刷新");
            //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
        })
        

    },
    filters:{
        moment: function (date) {
            return moment(date).format('MM/DD hh:mm a');
        },

        changeCategory : function(category){

            var rtnValue = "";
        
            switch (category) {

                case "recommend"  : rtnValue = "医院推荐"; break;
                case "accompany" : rtnValue = "陪同服务"; break;
                case "translate"  : rtnValue = "症状翻译"; break;
                case "insurance"  : rtnValue = "保险咨询"; break;
                default   : alert("出错了，请刷新 "); return; break;
                //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
            
            }
            return rtnValue;
        
        }
    },
    methods: {

        checkOwner : function(question){
            
            var self = this;
            var pass=prompt("Password")
            
            if(pass === "inspire" || pass === question.password){

                var targetHref = "";


                switch (question.category) {
                    case "recommend"  : targetHref = "/recommendInfo/"; break;
                    case "accompany" : targetHref = "/accompanyInfo/"; break;
                    case "translate"  : targetHref = "/translateInfo/"; break;
                    case "insurance"  : targetHref = "/insuranceInfo/"; break;
                    default   : alert("出错了，请刷新 "); return; break;
                    //에러입니다. 새로고침을 하고 다시한번 시도해주세요.
                }

                targetHref += question.id;

                window.location.href = targetHref;

            }else{
                alert("您好，由于不是内容的填写者，非公开内容只有填写者才可查看");
                // alert("글의 주인이 아닌 것 같아요. 비공개 글은 주인만 확인할 수 있어요!")
            
            }
        
        },




    }

});
