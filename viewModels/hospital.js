module.exports = function(hospital){
	if(!hospital){
		return {
			success: false,
			message : "No Data",
		}
	}

	return {
		success : true,
		id : hospital._id,
		name: hospital.name,
		city: hospital.city,
		district: hospital.district,
		tel : hospital.tel,
		neighborhood: hospital.neighborhood,
		address: hospital.address,
		subjects: hospital.subjects,
		homepage : hospital.homepage,
		remarks: hospital.remarks,
		subway : hospital.subway,
		reviews: hospital.reviews,

		xPos : hospital.xPos,
		yPos : hospital.yPos,

		monStart: hospital.monStart, //월~금 진료시간
		monClose: hospital.monClose,
		tueStart: hospital.tueStart,
		tueClose: hospital.tueClose,
		wedStart: hospital.wedStart,
		wedClose: hospital.wedClose,
		thuStart: hospital.thuStart,
		thuClose: hospital.thuClose,
		friStart: hospital.friStart,
		friClose: hospital.friClose,
		satStart: hospital.satStart,
		satClose: hospital.satClose,
		sunStart: hospital.sunStart,
		sunClose: hospital.sunClose,
		holStart: hospital.holStart,
		holClose: hospital.holClose,

		photos: hospital.photos,
		keywords: hospital.keywords,
		score: hospital.score,

	}




}
