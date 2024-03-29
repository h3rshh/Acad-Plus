import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from 'services/operations/courseDetailsAPI';
import { updateCompletedLectures } from 'slices/viewCourseSlice';
import { Player } from 'video-react';
import '~video-react/dist/video-react.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import { IconButton } from 'components/common/IconButton';


const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = userRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const setVideoSpecificDetails = async () => {

      if(!courseSectionData.length){
        return;
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }
      else{
        // Lets assume all 3 fields are present
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        const filteredVideoData = filteredData?.[0].subsection.filter(
          (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    } 

    setVideoSpecificDetails();

  }, [courseSectionData, courseEntireData, location.pathname]);
  

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectiondata.findIndex(
      (data) => data._id === sectionId
    )

    const subSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSectionIndex === 0){
      return true
    }
    else{
      return false
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 && 
      currentSubSectionIndex === noOfSubsections - 1){
      return true
    }
    else{
      return false
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectiondata.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubsections - 1){
      // Same section Next Video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      // Different Section First video
      const nextSectionId = courseSectionData[currentSectionIndex + 1];
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subsection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }

  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectiondata.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex !== 0){
      // Same section previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[0]._id; 
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      // Different Section Last Video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseEntireData[currentSectionIndex - 1].subsection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }

  }

  const handleLectureCompletion = async() => {
    // To be completed later, Filler code here
    setLoading(true);
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false); 
  }

  return (
    <div >
      {
        !videoData ? (<div>No Data Found</div>) : 
        (<div>
          <Player
            ref={playerRef}
            aspectRatio='16:9'
            playsInline
            onEnded={() => setVideoEnded()}
            src={videoData?.videoUrl}
          >
            <AiFillPlayCircle />
            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconButton 
                        disabled={loading}
                        onClick={() => handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Loading..."}
                      />
                    )
                  }

                  <IconButton 
                    disabled={loading}
                    onClick={() => {
                      if(playerRef?.current){
                        playerRef.current?.seek[0];
                        setVideoEnded(false);
                      }
                    }}
                    text="Rewatch"
                    custonClasses="text-xl"
                  />

                  <div>
                    {
                      !isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPreviousVideo}
                          className='blackButton'
                        >
                          Previous
                        </button>
                      )
                    }

                    {
                      !isLastVideo() && (
                        <button 
                          disabled={loading}
                          onClick={goToNextVideo}
                          className='blackButton '
                        >
                          Next
                        </button>
                      )
                    }
                  </div>

                </div>
              )
            }
          </Player>
        </div>)
      }
    </div>
  )
}

export default VideoDetails