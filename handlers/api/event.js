var Event = require('../../models/event.js');
var eventViewModel = require('../../viewModels/event.js');

var fs = require('fs');
var path = require('path');



var deleteFiles = function(base_path, file_name_arr){
	var delete_promise_arr = [];

	for (var i = file_name_arr.length - 1; i >= 0; i--) {
		//하나의 transaction 단위로 묶어야 한다. TODO
		var delete_prmoise = new Promise(function(resolve, reject){
			fs.unlink(path.join(__dirname + base_path) + file_name_arr[i], (err) => {
				if (err) reject(err);
				else{
					console.log('path/file.txt was deleted');
					resolve();
				}
			});
		});

		delete_promise_arr.push(delete_prmoise);
		
	}

	return delete_promise_arr;

}


module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 Event에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Event를 내보낸다.
		getEvents: function(req, res, next){
			Event.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, events){
				if(err) return next(err);
				res.json(events.map(eventViewModel));
			});
		},
		//요청본문에 해당하는 Event를 새로 생성한다.
		//이벤트 생성을 위한 post에서는 이벤트이름과, 이벤트 기간, 병원 주소, 병원 이름, 지하철이 있어야 한다.
		newEvent: function(req, res, next){
			if(req.body.eventName && req.body.eventRange && req.body.address && req.body.hospitalName && req.body.subway){
				//새로운 이벤트 객체를 만든다. 이벤트 이미지는 세개로 나뉘어서 들어온다.
				var newEventObject = req.body;
				//순서 고정을 위해 세개의 칸을 잡아두고, 1, 2, 3이미지를 순서대로 넣는다.
				newEventObject["eventImage"] = ["", "", ""];
				for (var i = req.files.length - 1; i >= 0; i--) {
					var thisFile = req.files[i];
					if(thisFile["fieldname"] == "thumbnailImage"){
						newEventObject["thumbnailImage"] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "eventImage1"){
						newEventObject["eventImage"][0] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "eventImage2"){
						newEventObject["eventImage"][1] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "eventImage3"){
						newEventObject["eventImage"][2] = thisFile["filename"];
					}
				}

				Event.create(newEventObject, function(err, event){
					if(err) return next(err);
					res.json({
						success: true,
						id: event._id,
					});
				});

			}else{
				res.json({
					success: false,
					message: 'REQUIRED Field is not yet filled',
				});
			}

		},
		//해당 id의 Event를 available상태로 만들고 응답은 success를 담아준다.
		getEvent: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Event.findById({_id: req.params.id}, function(err, event){
				if(err) console.error(err);
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
			
			Event.findById({_id: req.params.id}, function(err, event){
				if(err) return next(err);
				var imageArr =  event.eventImage;
				imageArr.push(event.thumbnailImage);
				//eventImages(file이름들)을 받아, 이벤트들을 삭제한다.
				Promise.all(deleteFiles('../../../public/images/event/', imageArr)).then(function(rtn){
					Event.remove({_id: req.params.id}, function(err){
						if(err) return next(err);
						res.json({
							success: true,
							id: req.params.id,
						});
					})
				}).catch(function(rtn){
					console.log(rtn);
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