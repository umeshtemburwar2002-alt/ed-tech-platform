import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  const dropdownVariants = {
    closed: { 
      maxHeight: 0, 
      opacity: 0, 
      y: -8,
      scaleY: 0.95,
      transition: { 
        duration: 0.18, 
        ease: "easeInOut",
        when: "afterChildren"
      } 
    },
    open: { 
      maxHeight: "500px", // Larger for section content
      opacity: 1, 
      y: 0,
      scaleY: 1,
      transition: { 
        duration: 0.18, 
        ease: "easeOut",
        staggerChildren: 0.05,
        when: "beforeChildren"
      } 
    }
  };

  const subItemVariants = {
    closed: { x: -8, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onMouseEnter={() => setActiveStatus(course?._id)}
              onMouseLeave={() => setActiveStatus("")}
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === course?._id
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              <AnimatePresence initial={false}>
                {activeStatus === course?._id && (
                  <motion.div
                    key={course?._id}
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{ transformOrigin: "top", willChange: "transform, opacity", transform: "translateZ(0)" }}
                     className="overflow-hidden flex flex-col"
                  >
                    {course.subSection.map((topic, i) => (
                      <motion.div
                        key={topic._id}
                        variants={subItemVariants}
                        className={`flex gap-3 px-5 py-2 cursor-pointer transition-colors duration-200 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        } `}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          )
                          setVideoBarActive(topic._id)
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        {topic.title}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}