const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try{
        // Fetch Data and Thumbnail
        const {name, description} = req.body

        // Validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are not present",
            })
        }

        console.log("Admin Found")

        // Create an entry for the new course
        const newCategory = await Category.create({
            name: name,
            description: description,
        }) 


        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCategory,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async (req, res) => {
    try{

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.categoryPageDetails= async (req, res) => {
    try{
        // Get category Id, get courses and validate
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();
        if(!selectedCategory){
            return res.status(500).json({
                success: false,
                message: "Data Not Found",
            })
        }                                                

        // Get courses for different categories
        differentCategories = await Category.find({
            _id: {$ne: categoryId}
        })
        .populate("courses")
        .exec();

        // HW Top selling courses

        // Return Response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            }
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}