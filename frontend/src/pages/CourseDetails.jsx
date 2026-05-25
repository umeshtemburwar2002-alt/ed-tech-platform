import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import { ACCOUNT_TYPE } from "../utils/constants"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-hot-toast"
import { FaShareSquare } from "react-icons/fa"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  
  useEffect(() => {
    // Calling fetchCourseDetails function to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        console.log("course details res: ", res)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(response.data.courseDetails))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <div className="text-white">Error loading course details.</div>
  }

  // Map database fields to frontend format
  const courseDetails = response.data.courseDetails;
  const {
    course_name,
    course_description,
    thumbnail,
    price,
    what_you_will_learn,
    sections,
    instructor,
    created_at,
  } = courseDetails;
  
  // Use title if available, fallback to course_name
  const courseTitle = courseDetails.title || course_name || "Untitled Course";
  const courseDescription = courseDetails.description || course_description || "";

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-richblack-800 to-transparent"></div>
              <img
                src={thumbnail}
                alt={courseTitle}
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseTitle}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">4.5</span>
                <span className="text-richblack-400">
                  (245 reviews)
                </span>
                <span className="text-richblack-600">
                  12 students enrolled
                </span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.first_name} ${instructor.last_name}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {new Date(created_at).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-full max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
             <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
                <img
                    src={thumbnail}
                    alt={course_name}
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
                <div className="px-4">
                    <div className="space-x-3 pb-4 text-3xl font-semibold">
                        Rs. {price}
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            className="yellowButton"
                            onClick={
                                user && response?.data?.courseDetails?.students_enrolled?.includes(user?._id)
                                    ? () => navigate("/dashboard/enrolled-courses")
                                    : handleBuyCourse
                            }
                        >
                            {user && response?.data?.courseDetails?.students_enrolled?.includes(user?._id)
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>
                        {(!user || !response?.data?.courseDetails?.students_enrolled?.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="blackButton">
                                Add to Cart
                            </button>
                        )}
                    </div>
                    <div>
                        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{what_you_will_learn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {sections?.length} {`section(s)`}
                  </span>
                  <span>
                    {response.data?.totalDuration} total length
                  </span>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
                {sections?.map((section) => (
                    <div key={section.id} className="border border-richblack-600 bg-richblack-700 p-4 mb-2">
                        <p className="font-bold">{section.section_name}</p>
                        <div className="ml-4 mt-2">
                            {section.sub_sections?.map((sub) => (
                                <div key={sub.id} className="flex items-center gap-2 py-1">
                                    <FaShareSquare className="text-yellow-50" />
                                    <span>{sub.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={instructor.image}
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.first_name} ${instructor.last_name}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetails
