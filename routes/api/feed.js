

var feedViewModel = require('../../viewModels/feed.js');
var feedHandlers =require('../../handlers/api/feed.js')();

var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/feed/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });


module.exports = function(app){



	app.get('/api/feed', feedHandlers.getFeeds);

	app.post('/api/feed', upload.any(), feedHandlers.newFeed);

	app.get('/api/feed/:id', feedHandlers.getFeed);

	app.delete('/api/feed/:id', feedHandlers.deleteFeed);

	app.put('/api/feed/:id', feedHandlers.updateFeed);



}





