import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InstructorSidebar from "../../components/layout/InstructorSidebar";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Upload, Plus, Trash2, Play } from "lucide-react";

const steps = ["Course Details", "Course Content", "Resources", "Publish"];

export default function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
    thumbnail: null,
    sections: [
      { id: 1, title: "Introduction", lectures: [] }
    ]
  });

  const addSection = () => {
    setCourseData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: Date.now(),
        title: "New Section",
        lectures: []
      }]
    }));
  };

  const addLecture = (sectionId) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId
          ? { ...section, lectures: [...section.lectures, { id: Date.now(), title: "New Lecture" }] }
          : section
      )
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <InstructorSidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Course</h1>
            <p className="text-gray-400 mt-2">Build your course step by step</p>
          </div>

          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white"
                    : "bg-white/[0.05] text-gray-500"
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? "text-white" : "text-gray-500"
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < currentStep ? "bg-violet-500" : "bg-white/[0.05]"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card className="p-8">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <label className="block text-white font-medium">Course Thumbnail</label>
                    <div className="border-2 border-dashed border-white/[0.12] rounded-2xl p-12 text-center hover:border-violet-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Drag & drop an image or click to browse</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2">Course Title</label>
                      <Input
                        placeholder="e.g., Complete Web Development Bootcamp"
                        value={courseData.title}
                        onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2">Description</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your course..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
                        value={courseData.description}
                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Category</label>
                      <select
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white"
                        value={courseData.category}
                        onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                      >
                        <option value="">Select Category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Level</label>
                      <select
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white"
                        value={courseData.level}
                        onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Price (₹)</label>
                      <Input
                        type="number"
                        placeholder="2999"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Course Content</h2>
                    <Button onClick={addSection}>
                      <Plus className="w-4 h-4 mr-2" /> Add Section
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {courseData.sections.map((section, sectionIndex) => (
                      <Card key={section.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Input
                            value={section.title}
                            onChange={(e) => {
                              const updated = [...courseData.sections];
                              updated[sectionIndex].title = e.target.value;
                              setCourseData({ ...courseData, sections: updated });
                            }}
                            className="text-lg font-semibold"
                          />
                        </div>

                        <div className="space-y-3 ml-4">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <div key={lecture.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                              <Play className="w-4 h-4 text-violet-400" />
                              <Input
                                value={lecture.title}
                                placeholder="Lecture title"
                                className="flex-1"
                              />
                              <button className="p-2 text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            onClick={() => addLecture(section.id)}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Lecture
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-white">Resources</h2>
                  <div className="border-2 border-dashed border-white/[0.12] rounded-2xl p-12 text-center hover:border-violet-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Upload PDFs, notes, and other resources</p>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 text-center"
                >
                  <h2 className="text-2xl font-bold text-white">Ready to Publish?</h2>
                  <p className="text-gray-400">Your course will be visible to all students</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              <div className="flex-1" />
              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button variant="ghost">Save as Draft</Button>
                  <Button>Publish Course</Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
