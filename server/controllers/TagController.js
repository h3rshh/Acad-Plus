const Tag = require("../models/Tag");

// Tag Handler Function
exports.createTag = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(500).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Create Entry In DB
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        });
        console.log("Tag Details : ", tagDetails);

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })
    }
    catch(error){
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get all tags
exports.showAllTags = async (req, res) => {
    try{
        const allTags = await Tag.find({}, {name: true, description: true});
        return res.status(200).json({
            success: true,
            message: "All tags Returned Successfully",
            allTags,
        })

    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}