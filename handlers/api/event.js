var Event = require('../../models/event.js');
var eventViewModel = require('../../viewModels/event.js');

module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 Event에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Event를 내보낸다.
		getEvents: function(req, res, next){
			Event.find(req.query)
			.exec(function(err, events){
				if(err) return next(err);
				res.json(events.map(eventViewModel));
			});
		},
		//요청본문에 해당하는 Event를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newEvent: function(req, res, next){
			if(req.body.eventName && req.body.eventImage && req.body.address && req.body.thumbnailImage && req.body.hospitalName && req.body.eventRange && req.body.subway){
				Event.create(req.body, function(err, event){
					if(err) return next(err);
					res.json({
						success: true,
						id: event._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'TITLE CONTENT SCHOOL REQUIRED',
				});
			}
		},
		//해당 id의 Event를 available상태로 만들고 응답은 success를 담아준다.
		getEvent: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Event.findById({_id: req.params.id}, function(err, event){
				if(err) console.error(err);
				console.log("ID", req.params.id);
				console.log(event);
				/*DOLATER err 처리 */
				if(!event){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(eventViewModel(event));
			});
		},
		//id에 해당하는 Event를 삭제한다.
		deleteEvent: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Event.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		//id에 해당하는 Event를 요청본문을 토대로 업데이트한다.
		updateEvent: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Event.update({_id: req.params.id}, req.body ,function(err, response){
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