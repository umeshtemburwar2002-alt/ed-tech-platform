import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Play, Star, Users, BookOpen, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function CourseDetails() {
  const [expandedSection, setExpandedSection] = useState(0);

  const course = {
    title: "Complete Web Development Bootcamp",
    instructor: "John Doe",
    instructorBio: "Full-stack developer with 10+ years of experience",
    rating: 4.8,
    reviews: 1248,
    students: 12480,
    price: 2999,
    originalPrice: 5999,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    whatYouWillLearn: [
      "HTML, CSS, and JavaScript",
      "React and Node.js",
      "MongoDB and Express",
      "Build real-world projects"
    ],
    curriculum: [
      {
        title: "Introduction",
        lectures: [
          { title: "Welcome to the Course", duration: "5:00", free: true },
          { title: "What You'll Learn", duration: "10:00", free: true }
        ]
      },
      {
        title: "HTML & CSS Basics",
        lectures: [
          { title: "HTML Fundamentals", duration: "20:00", free: false },
          { title: "CSS Styling", duration: "25:00", free: false },
          { title: "Responsive Design", duration: "30:00", free: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-96 object-cover opacity-20 blur-xl"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold text-white mb-4">
                  {course.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">{course.rating}</span>
                    <span className="text-gray-400">({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                  <div>
                    <p className="text-white font-medium">{course.instructor}</p>
                    <p className="text-gray-400 text-sm">{course.instructorBio}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 sticky top-8">
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-white">₹{course.price}</span>
                      <span className="text-xl text-gray-500 line-through">₹{course.originalPrice}</span>
                      <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-semibold">
                        50% OFF
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full">
                      Buy Now
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Add to Cart
                    </Button>
                  </div>

                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <Card key={sectionIndex} className="overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                          <p className="text-gray-400 text-sm">{section.lectures.length} lectures</p>
                        </div>
                      </div>
                      {expandedSection === sectionIndex ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedSection === sectionIndex && (
                      <div className="border-t border-white/[0.06]">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div key={lectureIndex} className="flex items-center justify-between p-4 px-6 hover:bg-white/[0.03]">
                            <div className="flex items-center gap-3">
                              <Play className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{lecture.title}</span>
                              {lecture.free && (
                                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-medium">
                                  Free Preview
                                </span>
                              )}
                            </div>
                            <span className="text-gray-500 text-sm">{lecture.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
