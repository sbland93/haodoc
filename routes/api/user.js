var User = require('../../models/user.js');
var userViewModel = require('../../viewModels/user.js');
var userHandlers =require('../../handlers/api/user.js')();


module.exports = function(app){

	//Query를 보내면,쿼리에 해당하는 user에 해당하는 것들을 내보내고
	//Query가 없으면 모든 User를 내보낸다.
	app.get('/api/user', userHandlers.getUsers);

	//요청본문에 해당하는 user를 새로 생성한다.
	//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
	app.post('/api/user', userHandlers.newUser);

	//해당 id의 user를 available상태로 만들고 응답은 success를 담아준다.
	app.get('/api/user/:id', userHandlers.getUser);

	//id에 해당하는 user를 삭제한다.
	app.delete('/api/user/:id', userHandlers.deleteUser);

	//id에 해당하는 user를 요청본문을 토대로 업데이트한다.
	app.put('/api/user', userHandlers.updateUser);

}