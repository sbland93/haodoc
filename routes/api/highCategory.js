var highCategoryHandlers =require('../../handlers/api/highCategory.js')();

var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/category/highCategory/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });

module.exports = function(app){

	app.get('/api/highCategory', highCategoryHandlers.getHighCategorys);

	app.post('/api/highCategory', upload.any(), highCategoryHandlers.newHighCategory);

	app.get('/api/highCategory/:id', highCategoryHandlers.getHighCategory);

	app.delete('/api/highCategory/:id', highCategoryHandlers.deleteHighCategory);

	app.put('/api/highCategory/:id', highCategoryHandlers.updateHighCategory);

}