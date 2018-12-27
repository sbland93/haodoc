var highCategoryHandlers =require('../../handlers/api/highCategory.js')();

var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/category/high/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });

module.exports = function(app){

	app.get('/api/highCategory', highCategoryHandlers.getCategorys);

	app.post('/api/highCategory', upload.any(), highCategoryHandlers.newCategory);

	app.get('/api/highCategory/:id', highCategoryHandlers.getCategory);

	app.delete('/api/highCategory/:id', highCategoryHandlers.deleteCategory);

	app.put('/api/highCategory/:id', highCategoryHandlers.updateCategory);

}