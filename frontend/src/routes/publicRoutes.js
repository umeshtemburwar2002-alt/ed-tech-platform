import React from "react";

const LandingPage = React.lazy(() => import("../pages/LandingPage"));
const Home = React.lazy(() => import("../pages/Home"));
const Offers = React.lazy(() => import("../pages/Offers"));
const AllCoursesOffer = React.lazy(() => import("../pages/AllCoursesOffer"));
const StartLearningFree = React.lazy(() => import("../pages/StartLearningFree"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const Students = React.lazy(() => import("../pages/Students"));
const ExploreCourses = React.lazy(() => import("../pages/ExploreCourses"));
const CoursePurchase = React.lazy(() => import("../pages/CoursePurchase"));
const CourseDetail = React.lazy(() => import("../pages/CourseDetail"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Careers = React.lazy(() => import("../pages/Careers"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const CourseDetails = React.lazy(() => import("../pages/CourseDetails"));
const Error = React.lazy(() => import("../pages/Error"));
const Forbidden403 = React.lazy(() => import("../pages/Forbidden403"));

const Articles = React.lazy(() => import("../pages/resources/Articles"));
const Blog = React.lazy(() => import("../pages/resources/Blog"));
const HelpCenter = React.lazy(() => import("../pages/support/HelpCenter"));
const AI = React.lazy(() => import("../pages/subjects/AI"));
const Python = React.lazy(() => import("../pages/languages/Python"));

const PrivacyPolicy = React.lazy(() => import("../pages/legal/PrivacyPolicy"));
const CookiePolicy = React.lazy(() => import("../pages/legal/CookiePolicy"));
const TermsOfService = React.lazy(() => import("../pages/legal/TermsOfService"));

export const publicRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/home", element: <Home /> },
  { path: "/offers", element: <Offers /> },
  { path: "/all-courses-offer", element: <AllCoursesOffer /> },
  { path: "/start-learning-free", element: <StartLearningFree /> },
  { path: "catalog/:catalogName", element: <Catalog /> },
  { path: "students", element: <Students /> },
  { path: "explore-courses", element: <ExploreCourses /> },
  { path: "course-catalog", element: <ExploreCourses /> },
  { path: "course-purchase", element: <CoursePurchase /> },
  { path: "/courses/:courseId", element: <CourseDetail /> },
  { path: "cart", element: <Cart /> },
  { path: "/403", element: <Forbidden403 /> },
  { path: "/careers", element: <Careers /> },
  { path: "/resources/articles", element: <Articles /> },
  { path: "/resources/blog", element: <Blog /> },
  { path: "/support/help-center", element: <HelpCenter /> },
  { path: "/subjects/ai", element: <AI /> },
  { path: "/languages/python", element: <Python /> },
  { path: "/legal/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/legal/cookie-policy", element: <CookiePolicy /> },
  { path: "/legal/terms-of-service", element: <TermsOfService /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/course/:courseId", element: <CourseDetails /> },
  { path: "*", element: <Error /> },
];
