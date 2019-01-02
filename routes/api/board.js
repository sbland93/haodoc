

var boardHandlers =require('../../handlers/api/board.js')();


module.exports = function(app){



	app.get('/api/board', boardHandlers.getBoards);

	app.post('/api/board', boardHandlers.newBoard);

	app.get('/api/board/:id', boardHandlers.getBoard);

	app.delete('/api/board/:id', boardHandlers.deleteBoard);

	app.put('/api/board/:id', boardHandlers.updateBoard);



}





