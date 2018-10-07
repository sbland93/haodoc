
//credentials보안파일 로드
var credentials = require('./credentials.js');
var express = require('express');

var app = express();

//Model들 로드.
// var Schools = require('./models/school.js');
var Users = require('./models/user.js');

//몽구스 설정.
var mongoose = require('mongoose');
var opts = {
	keepAlive: 1,
	useNewUrlParser: true,
};
mongoose.Promise = global.Promise;

//개발 환경에 따른 몽구스 연결.
//DOLATER
switch(app.get('env')){
	
	case 'development' : 
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		//데이터 초기화 및 생성.
		//매번 독립적으로 같은 데이터를 생성하기위해, 모두 삭제후 생성.
		require('./seed.js').development();
		break;
	case 'production' :
		//production에서는 실행하지 않는다.
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	//test환경에서는, 완전히 독립적이게 유지하는게 좋을것이다.
	case 'test' :
		mongoose.connect(credentials.mongo.test.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}


//static 미들우어는 정적 자원을 담고 있는 하나 이상의 디렉터리를 지목해서
//특별한 처리 없이 클라이언트에 전송 할 수 있도록 해준다.
//여기선 퍼블릭 디렉토리 지정.
app.use(express.static(__dirname + '/public'));


//핸들바 뷰 엔진 설정.
var hbs = require('express-handlebars');
var handlebars = hbs.create({
	defaultLayout: 'layout',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},

	}
});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//포트 지정, 기본 포트는 3000
app.set('port', process.env.PORT || 3000);

//쿠키 설정및 접근을 위한 쿠키파서 링크
//세션 연결 req.session을 확장한다.
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret
}));


//요청본문 파싱을 위한 바디파서 링크
//req.body를 확장시킨다
app.use(require('body-parser').urlencoded({extended: true}));


//모든 routing 로드.
require('./routes/routes.js')(app);

//커스텀 404페이지.
app.use(function(req, res, next){
	//200이 default이므로 바꿔준다.
	res.status(404);
	res.render('404');
});

//커스텀 500 페이지
app.use(function(err, req, res, next){
	console.error('Error handler is coming....',err.stack);
	res.type('text/html');
	res.status(500);
	res.render('500');
});

function startServer() {
	//해당 미들웨어들을 연결한 후, 서버 실행.
	var server = app.listen(app.get('port'), function(){
		console.log('하오닥 서버가 ' + app.get('env') + ' 모드로 ' + app.get('port') + ' 포트에서 실행되었습니다. 종료는 Ctrl+C 입니다.');
	});
	app.set('server', server);
}

startServer();