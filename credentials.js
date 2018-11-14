
module.exports = {

	cookieSecret : 'haodoc king',


	mongo: {
		//기본 mlab주소.
		development: {
			connectionString : 'mongodb://haodoc:inspire0407!@ds225902.mlab.com:25902/haodoc_development',
			//connectionString : 'mongodb://haodoc:inspire0407@ds147391.mlab.com:47391/haodoc'
		},
		//deploy된 상태에서의 mongodb mlab 주소.
		production: {
			connectionString : 'mongodb://haodoc:inspire0407@ds147391.mlab.com:47391/haodoc'
		},

		test: {
			connectionString: 'mongodb://inspire:inspire0407@ds033259.mlab.com:33259/haodoc_test'
		},
		
		options : { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 

        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } },
	}

};