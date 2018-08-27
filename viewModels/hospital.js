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
		city: hospital.city,
		district: hospital.district,
		neighborhood: hospital.neighborhood, 
		subject: hospital.subject,
		name: hospital.name,
		category : hospital.category,
		tel : hospital.tel,
		zipcode: hospital.zipcode,
		address: hospital.address,
		weekday : hospital.weekday,
		saturday: hospital.saturday,
		holiday: hospital.holiday,
		review: hospital.review,
		photo : hospital.photo,

	}




}

