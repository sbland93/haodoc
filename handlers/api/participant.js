var Participant = require('../../models/participant.js');
var participantViewModel = require('../../viewModels/participant.js');

module.exports = function(){
	return {
		
		//Query를 보내면,쿼리에 해당하는 Participant에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Participant를 내보낸다.
		getParticipants: function(req, res, next){
			Participant.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, participants){
				if(err) return next(err);
				res.json(participants.map(participantViewModel));
			});
		},

		//요청본문에 해당하는 Participant를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newParticipant: function(req, res, next){
			if(req.body.participantName && req.body.wechatID && req.body.gender && req.body.eventName){
				Participant.create(req.body, function(err, participant){
					if(err) return next(err);
					res.json({
						success: true,
						id: participant._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Required Data is not filled yet.',
				});
			}
		},

		//해당 id의 Participant를 available상태로 만들고 응답은 success를 담아준다.
		getParticipant: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Participant.findById({_id: req.params.id}, function(err, participant){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!participant){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(participantViewModel(participant));
			});
		},

		//id에 해당하는 Participant를 삭제한다.
		deleteParticipant: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Participant.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},

		//id에 해당하는 Participant를 요청본문을 토대로 업데이트한다.
		updateParticipant: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Participant.update({_id: req.params.id}, req.body ,function(err, response){
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