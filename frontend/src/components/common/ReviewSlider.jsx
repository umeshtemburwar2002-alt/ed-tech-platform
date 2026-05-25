import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"

// Mock reviews — no API call
const MOCK_REVIEWS = [
  { user: { firstName: "Aarav", lastName: "Sharma", image: null }, course: { courseName: "Modern JavaScript" }, review: "Absolutely fantastic course! The instructor explains everything so clearly. I went from a complete beginner to building full projects.", rating: 5 },
  { user: { firstName: "Priya", lastName: "Singh", image: null }, course: { courseName: "React Bootcamp" }, review: "Best React course I've taken. Hooks, Context, and Redux are all explained with real-world examples.", rating: 4.5 },
  { user: { firstName: "Emma", lastName: "Wilson", image: null }, course: { courseName: "UI/UX Design" }, review: "This course transformed how I think about design. Got a job offer after completing the capstone project!", rating: 5 },
  { user: { firstName: "Lucas", lastName: "Martin", image: null }, course: { courseName: "Full Stack MERN" }, review: "Went from zero to building full-stack apps in 2 months. Mind-blowing content and great support.", rating: 5 },
  { user: { firstName: "Rajan", lastName: "Mehta", image: null }, course: { courseName: "Node.js Mastery" }, review: "Very practical course. Learned about REST APIs, authentication, and deployment all in one place.", rating: 4 },
  { user: { firstName: "Nadia", lastName: "Khan", image: null }, course: { courseName: "Data Science with Python" }, review: "The hands-on notebooks are excellent. Covers everything from pandas to machine learning.", rating: 4.5 },
];

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    // Load mock data immediately — no API call
    setReviews(MOCK_REVIEWS);
  }, [])

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                <div className="flex items-center gap-4">
                  <img
                    src={review?.user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">{review?.course?.courseName}</h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">{review.rating.toFixed(1)}</h3>
                  <ReactStars count={5} value={review.rating} size={20} edit={false} activeColor="#ffd700" emptyIcon={<FaStar />} fullIcon={<FaStar />} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider