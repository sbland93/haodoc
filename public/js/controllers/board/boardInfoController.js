

var url =  window.location.pathname;
var boardID = url.replace("/test/board/", "");


var app = new Vue({

  el:'#board_info_app',

  data: {
    board: "",
    comment: {},
  },
  
  mounted: function(){
    var self = this;
    
    getBoard(boardID).then(function(rtn){
      if(rtn.success){
        
        self.board = rtn;
        self.board.views +=1;
    
        updateBoard(boardID, self.board).then(function(rtn){
          if(rtn.success){
            console.log(rtn);
          }
        });

      }
    });


  },


  methods:{
   
    newComment: function(){
      
      var self = this;
      if (!self.board.comments){
        alert("dpfj")
      }
      self.board.comments.push(self.comment);

      updateBoard(self.board.id, self.board).then(function(rtn){
        console.log(rtn);
      });


    },
  
  },

});
