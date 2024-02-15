const SubSection = require("../models/SubSectionModel");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try{
        // Fetch Data with File, video and Validate
        const {sectionId, title, timeDuration, description, videoUrl} = req.body;
        // const video = req.files.videoFile;
        if(!sectionId || !title || !timeDuration || !description ){
            return res.status(500).json({
                success: false,
                message: "All items not present",
            })
        }

        // Upload Video to Cloudinary
        // const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // Create SubSection, Update Section with the Id of this New SubSection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            // videoUrl: uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(

            {_id:sectionId},
            {push: {
                subSection: SubSectionDetails._id,
            }},
            {new: true}

            // HW Log updated Section here after adding populate query
            
        )
        
        return res.status(200).json({
            success: true,
            message: "SubSection added Successfully",
            updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// HW update Subsection

exports.updateSubSection = async (req, res) => {
    try{
        // Data Fetch and Validation
        const {sectionId, subSectionId, title, description} = req.body;
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
            success: false,
            message: "SubSection not found",
            })
        }
        console.log("Subsection Id: ", subSectionId)
    
        if (title !== undefined) {
            subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        // if (req.files && req.files.video !== undefined) {
        //     const video = req.files.video
        //     const uploadDetails = await uploadImageToCloudinary(
        //     video,
        //     process.env.FOLDER_NAME
        //     )
        //     subSection.videoUrl = uploadDetails.secure_url
        //     subSection.timeDuration = `${uploadDetails.duration}`
        // }
    
        await subSection.save()
    
        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )
    
        console.log("updated section", updatedSection)

        // // Return Response
        return res.status(200).json({
            success: true,
            message: "Sub Section Successfully Updated",
            updatedSection,
            subSection
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//  HW Delete Subsection
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }