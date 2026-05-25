import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaRocket,
  FaHeart,
  FaLightbulb,
  FaGraduationCap,
  FaCode,
  FaDesktop,
  FaMobile,
  FaChartLine,
  FaPalette,
  FaDatabase,
  FaShieldAlt,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { Card, Button, Badge } from '../components/ui';
import Footer from '../components/common/Footer';

const Careers = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    {
      icon: FaHeart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs',
      color: 'red'
    },
    {
      icon: FaGraduationCap,
      title: 'Learning & Development',
      description: 'Continuous learning opportunities, conference attendance, and skill development budget',
      color: 'blue'
    },
    {
      icon: FaRocket,
      title: 'Career Growth',
      description: 'Clear career progression paths, mentorship programs, and leadership opportunities',
      color: 'purple'
    },
    {
      icon: FaDollarSign,
      title: 'Competitive Compensation',
      description: 'Market-competitive salaries, equity options, and performance bonuses',
      color: 'green'
    },
    {
      icon: FaClock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and unlimited PTO',
      color: 'orange'
    },
    {
      icon: FaUsers,
      title: 'Amazing Team',
      description: 'Work with passionate, talented individuals who are changing education',
      color: 'yellow'
    }
  ];

  const departments = [
    { id: 'engineering', name: 'Engineering', icon: FaCode, openings: 8 },
    { id: 'design', name: 'Design', icon: FaPalette, openings: 3 },
    { id: 'product', name: 'Product', icon: FaLightbulb, openings: 4 },
    { id: 'marketing', name: 'Marketing', icon: FaChartLine, openings: 5 },
    { id: 'education', name: 'Education', icon: FaGraduationCap, openings: 6 },
    { id: 'operations', name: 'Operations', icon: FaBriefcase, openings: 2 }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'engineering',
      location: 'Remote / Bangalore',
      type: 'Full-time',
      experience: '4-6 years',
      salary: '₹15-25 LPA',
      description: 'Build scalable web applications using React, Node.js, and modern technologies.',
      requirements: ['React.js', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'design',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹12-18 LPA',
      description: 'Design intuitive and engaging user experiences for our learning platform.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'product',
      location: 'Delhi / Hybrid',
      type: 'Full-time',
      experience: '5-8 years',
      salary: '₹20-30 LPA',
      description: 'Lead product strategy and roadmap for our educational technology platform.',
      requirements: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Pune / Remote',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '₹14-22 LPA',
      description: 'Manage cloud infrastructure and deployment pipelines for high-scale applications.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'Content Marketing Manager',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      experience: '4-7 years',
      salary: '₹10-16 LPA',
      description: 'Create compelling content strategies to engage our learning community.',
      requirements: ['Content Strategy', 'SEO', 'Social Media', 'Analytics'],
      posted: '1 day ago'
    },
    {
      id: 6,
      title: 'Curriculum Designer',
      department: 'education',
      location: 'Bangalore / Hybrid',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹8-14 LPA',
      description: 'Design and develop engaging course content for technology subjects.',
      requirements: ['Instructional Design', 'Technology Skills', 'Video Production'],
      posted: '4 days ago'
    },
    {
      id: 7,
      title: 'Data Scientist',
      department: 'engineering',
      location: 'Remote / Hyderabad',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹12-20 LPA',
      description: 'Analyze learning data to improve student outcomes and platform performance.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      posted: '6 days ago'
    },
    {
      id: 8,
      title: 'Mobile App Developer',
      department: 'engineering',
      location: 'Chennai / Remote',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹13-19 LPA',
      description: 'Develop cross-platform mobile applications using React Native.',
      requirements: ['React Native', 'iOS', 'Android', 'JavaScript', 'Redux'],
      posted: '1 week ago'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || 
                           job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      purple: 'bg-purple-500 text-purple-100',
      orange: 'bg-orange-500 text-orange-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      red: 'bg-red-500 text-red-100'
    };
    return colors[color] || colors.blue;
  };

  const getDepartmentIcon = (department) => {
    const dept = departments.find(d => d.id === department);
    return dept ? dept.icon : FaBriefcase;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading careers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Join Our Mission to Transform Education
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Help us build the future of learning. Work with passionate people who are making education accessible to millions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                View Open Positions
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Why Work With Us?</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              We offer more than just a job - we provide a platform to make a real impact on education
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                    <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${getColorClasses(benefit.color)}`}>
                      <IconComponent className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-richblack-5 mb-3">{benefit.title}</h3>
                    <p className="text-richblack-400 leading-relaxed">{benefit.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Open Positions by Department</h2>
            <p className="text-richblack-300 text-lg">
              Find opportunities across different teams and functions
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedDepartment(dept.id)}>
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-richblack-5 mb-2">{dept.name}</h3>
                    <p className="text-richblack-400 mb-3">{dept.openings} open positions</p>
                    <Badge variant="success">{dept.openings} openings</Badge>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-8 text-center">Current Openings</h2>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="pune">Pune</option>
                <option value="chennai">Chennai</option>
                <option value="hyderabad">Hyderabad</option>
              </select>
            </div>
          </motion.div>
          
          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => {
              const DeptIcon = getDepartmentIcon(job.department);
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <DeptIcon className="text-white text-xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-richblack-5 mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-richblack-400 mb-3">
                              <div className="flex items-center space-x-1">
                                <FaMapMarkerAlt />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaClock />
                                <span>{job.type}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaBriefcase />
                                <span>{job.experience}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaDollarSign />
                                <span>{job.salary}</span>
                              </div>
                            </div>
                            <p className="text-richblack-300 mb-4">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.requirements.map((req, reqIndex) => (
                                <Badge key={reqIndex} variant="neutral" size="small">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-richblack-500">Posted {job.posted}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:ml-6 flex flex-col space-y-2">
                        <Button variant="primary" size="medium">
                          Apply Now
                        </Button>
                        <Button variant="outline" size="medium">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <FaBriefcase className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No jobs found</h3>
              <p className="text-richblack-400">Try adjusting your search criteria or check back later for new openings.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                Send Your Resume
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                Join Our Talent Pool
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;