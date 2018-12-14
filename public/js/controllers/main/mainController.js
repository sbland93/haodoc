


var app = new Vue({

	el : "#main_app",
	
	data : {

		events: ""

	},
	
	
	mounted : function(){

		var self = this;
		self.getEvents();		

	},

	
	
	methods: {
		
		//TODO
		getEvents : function(){
			
			var self = this;
			
			getEvents().then(function(events){
				self.events = events;
			});

		},

	}

})