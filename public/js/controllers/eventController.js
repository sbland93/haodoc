var app = new Vue({

    el : "#app",

    data : {

        events: "",
      

    },

    mounted: function(){
        var self = this;
    
        getEvents().then(function(events){
            console.log(events[0]);
            self.events = events;
    
        });
    
    },

    methods: {

        //handlebars랑 겹쳐서, href를만드는 것을 method로 뺌. 방법을 강구해봐야할 듯.
        eventHref : function(id){
        
            return "/event/"+id;
        
        },

        eventThumbnailHref: function(thumb_file_name){

            return "/images/event/"+thumb_file_name;
        
        }


    }

});
