
module.exports = {

	cookieSecret : 'haodoc king',


	mongo: {
		//기본 mlab주소.
		development: {
			connectionString : 'mongodb://haodoc:haodoc1234@ds139879.mlab.com:39879/haodoc_local',
		},
		//deploy된 상태에서의 mongodb mlab 주소.
		production: {
			connectionString : 'mongodb://haodoc:inspire0407!@ds225902.mlab.com:25902/haodoc_development',
		},

		test: {
			connectionString: 'mongodb://inspire:inspire0407@ds033259.mlab.com:33259/haodoc_test'
		},
		
		options : { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 

        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } },
	}

};