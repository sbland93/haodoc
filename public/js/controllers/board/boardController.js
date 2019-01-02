





var app = new Vue({

  el:'#board_app',

  data: {
    boards : "",
    newBoardObj : {},
    updateObj: {},
    updateToggle : false,

    board_id : "",

  },
  
  mounted: function(){
    var self = this;
    util_data_init(self, getBoards, "boards");
    
  },

  methods:{
    newBoard:function(){
      var self = this;
      addBoard(self.newBoardObj).then(function(rtn){
        if(rtn.success) alert("success!");
        util_data_init(self, getBoards, "boards");
        
      })
    },

    removeBoard: function(id){
      var self = this;
      deleteBoard(id).then(function(rtn){
        console.log(rtn);
        util_data_init(self, getBoards, "boards");
      })
    },
    toggleUpdate: function(obj){

      var self = this;
      self.updateObj = obj;
      self.updateToggle = true;


    },
    updateBoard: function(){
      var self = this;
      console.log(self.updateObj);
      updateBoard(self.updateObj.id, self.updateObj).then(function(data){
        console.log(data);
        self.updateObj = {};
        self.updateToggle = false;
      });
    },
  
  },

});
