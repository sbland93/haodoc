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
		holClose: hospital.holClose

	}




}



/*
	name: String, 
	city: String,
	district : String,
	address : String,
	tel : String,
	category : String, //의원, 병원 등
	homepage: String,
	subjects : Array,

	remarks: String,
	hospitalID: String,

	xPos: Number, //위도 경도
	yPos : Number,

	monStart: String, //월~금 진료시간
	monClose: String,
	tueStart: String,
	tueClose: String,
	wedStart: String,
	wedClose: String,
	thuStart: String,
	thuClose: String,
	friStart: String,
	friClose: String,
	satStart: String,
	satClose: String,
	sunStart: String,
	sunClose: String,
	holStart: String,
	holClose: String,
*/