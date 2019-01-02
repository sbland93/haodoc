var Board = require('../../models/board.js');
var boardViewModel = require('../../viewModels/board.js');
var util_server = require('../../util_server.js')();

module.exports = function(){
	return {
		
		getBoards: function(req, res, next){
			Board.find(req.query).sort({updated_at:'-1'}).exec(function(err, boards){
				if(err) return next(err);
				res.json(boards.map(boardViewModel));
			});
		},
		
		//요청본문에 해당하는 board를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newBoard: function(req, res, next){

			if(req.body.boardTitle && req.body.content){
				Board.create(req.body, function(err, board){
					if(err) return next(err);
					res.json({
						success: true,
						id: board._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		
		},
		
		//해당 id의 board를 available상태로 만들고 응답은 success를 담아준다.
		getBoard: function(req, res, next){
			
			if(!req.params.id) return next('No Id');
			Board.findById({_id: req.params.id}, function(err, board){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!board){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(boardViewModel(board));
			});
		
		},
		
		//id에 해당하는 board를 삭제한다.
		deleteBoard: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Board.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 board를 요청본문을 토대로 업데이트한다.
		updateBoard: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Board.update({_id: req.params.id}, req.body ,function(err, response){
				if(err) console.error(err);
				if(response.nModified === 1){
					res.json({
						success: true,
						id: req.params.id,
					});
				} else {
					res.json({
						success: false,
						message: ''
					});
				}
			});
		},

	}
}