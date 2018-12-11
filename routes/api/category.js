var categoryHandlers =require('../../handlers/api/category.js')();

var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/category/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });

module.exports = function(app){

	app.get('/api/category', categoryHandlers.getCategorys);

	app.post('/api/category', upload.any(), categoryHandlers.newCategory);

	app.get('/api/category/:id', categoryHandlers.getCategory);

	app.delete('/api/category/:id', categoryHandlers.deleteCategory);

	app.put('/api/category/:id', categoryHandlers.updateCategory);

}