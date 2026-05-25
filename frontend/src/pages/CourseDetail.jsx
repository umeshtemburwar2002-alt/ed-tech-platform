import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, Users, Clock, Play, Heart, Share2, CheckCircle, 
  BookOpen, Award, MessageSquare, Calendar, Download, ChevronDown, ChevronUp
} from 'lucide-react';
import Footer from '../components/common/Footer';
import { supabase } from '../config/supabaseClient';

const bgPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log('[CourseDetail] Fetching course details for id:', courseId);
        setLoading(true);
        
        // Fetch course from Supabase
        const { data: course, error: courseError } = await supabase
          .from("courses")
          .select(`
            *,
            instructor:instructor_id(first_name, last_name, avatar_url, image)
          `)
          .eq("id", courseId)
          .single();

        if (courseError) throw courseError;
        console.log('[CourseDetail] Course data:', course);

        // Enrich course data with the same fields used in ExploreCourses
        const enrichedCourse = {
          ...course,
          course_name: course.title,
          course_description: course.description,
          enrolled_students_count: course.sold_count || 0,
          instructor: course.instructor || {
            first_name: "Instructor",
            last_name: "",
            avatar_url: null,
            image: null
          },
          what_you_will_learn: [],
          sections: [],
          instructions: []
        };

        setCourseData(enrichedCourse);
      } catch (error) {
        console.error('[CourseDetail] Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Course not found</h2>
          <button
            onClick={() => navigate('/explore-courses')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-[#0B1020]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30 py-20">
        <div className="absolute inset-0 opacity-20" style={bgPattern}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {courseData.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-5xl font-bold text-white mb-6">
                  {courseData.course_name}
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {courseData.course_description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400" />
                    <span className="text-2xl font-bold text-white">{courseData.average_rating || 0}</span>
                    <span className="text-gray-400">({courseData.ratings_count || 0} ratings)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-5 w-5" />
                    <span>{courseData.enrolled_students_count || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-5 w-5" />
                    <span>{courseData.total_duration || '10 hours'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {courseData.instructor?.image || courseData.instructor?.avatar_url ? (
                    <img
                      src={courseData.instructor?.image || courseData.instructor?.avatar_url}
                      alt={courseData.instructor?.first_name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {courseData.instructor?.first_name?.charAt(0) || 'I'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold">
                      {courseData.instructor?.first_name} {courseData.instructor?.last_name}
                    </p>
                    <p className="text-gray-400 text-sm">Course Instructor</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sticky Enroll Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-8 bg-[#1A1F36] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={courseData.thumbnail || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop'}
                    alt={courseData.course_name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-white">
                        {courseData.price > 0 ? `₹${courseData.price}` : <span className="text-emerald-400">FREE</span>}
                      </span>
                      {courseData.original_price > courseData.price && (
                        <span className="text-xl text-gray-500 line-through">
                          ₹{courseData.original_price}
                        </span>
                      )}
                    </div>
                    {courseData.discount_percentage > 0 && (
                      <p className="text-emerald-400 font-semibold">
                        {courseData.discount_percentage}% off
                      </p>
                    )}
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-opacity mb-4">
                    Enroll Now
                  </button>

                  <div className="flex gap-2 mb-6">
                    <button className="flex-1 py-3 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </button>
                    <button className="flex-1 py-3 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* What You'll Learn */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseData.what_you_will_learn?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Master the fundamentals</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Build real-world projects</span>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Course Content</h2>
              <div className="space-y-4">
                {courseData.sections?.map((section, index) => (
                  <div key={section.id} className="bg-[#1A1F36] border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-purple-400 font-bold text-lg">{index + 1}</div>
                        <div>
                          <h3 className="text-white font-semibold">{section.section_name}</h3>
                          <p className="text-gray-400 text-sm">
                            {section.sub_sections?.length || 0} lessons • {section.duration || '30 min'}
                          </p>
                        </div>
                      </div>
                      {activeSection === section.id ? (
                        <ChevronUp className="h-6 w-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                    
                    {activeSection === section.id && (
                      <div className="border-t border-white/10">
                        {section.sub_sections?.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="px-6 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                            <Play className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-300 flex-1">{lesson.title}</span>
                            <span className="text-gray-500 text-sm">{lesson.time_duration || '5 min'}</span>
                          </div>
                        )) || (
                          <div className="px-6 py-4 text-gray-400">No lessons yet</div>
                        )}
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="text-gray-400">No sections available</div>
                )}
              </div>
            </section>

            {/* Requirements */}
            {courseData.instructions?.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">Requirements</h2>
                <ul className="space-y-3">
                  {courseData.instructions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Instructor */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Instructor</h2>
              <div className="bg-[#1A1F36] border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  {courseData.instructor?.image || courseData.instructor?.avatar_url ? (
                    <img
                      src={courseData.instructor?.image || courseData.instructor?.avatar_url}
                      alt={courseData.instructor?.first_name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {courseData.instructor?.first_name?.charAt(0) || 'I'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {courseData.instructor?.first_name} {courseData.instructor?.last_name}
                    </h3>
                    <p className="text-gray-400 mb-4">{courseData.instructor?.bio || 'Experienced instructor'}</p>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{courseData.instructor?.courses_count || 1}</div>
                        <div className="text-gray-400">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{courseData.instructor?.students_count || 0}</div>
                        <div className="text-gray-400">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{courseData.instructor?.reviews_count || 0}</div>
                        <div className="text-gray-400">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
