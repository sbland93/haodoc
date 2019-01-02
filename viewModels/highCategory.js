

module.exports = function(highCategory){
    
    if(!highCategory){
        return {
            success: false,
            message: 'No Data',
        };
    }
    return {
        
        success: true,
        id: highCategory._id,
        categoryName: highCategory.categoryName,
        iconImage : highCategory.iconImage,
        middleCategorys : highCategory.middleCategorys,
        updated_at : highCategory.updated_at,

    };

};

