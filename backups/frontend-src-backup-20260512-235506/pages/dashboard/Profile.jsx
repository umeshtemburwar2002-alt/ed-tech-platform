import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FaUser, FaPhone, FaCamera, FaSave, FaGraduationCap, 
  FaCheckCircle, FaAward, FaLock, FaHistory, FaSignOutAlt, 
  FaCreditCard, FaEdit 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const StudentProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.contactNumber || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image || null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Image preview updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Dummy data for learning summary
  const learningSummary = {
    enrolled: 12,
    completed: 4,
    certificates: 3
  };

  // Dummy purchase history
  const purchaseHistory = [
    { id: 1, course: "Modern JavaScript Masterclass", date: "2024-03-10", amount: "₹499", status: "Success" },
    { id: 2, course: "Python for Data Science", date: "2024-02-15", amount: "₹899", status: "Success" },
    { id: 3, course: "UI/UX Design Essentials", date: "2024-01-20", amount: "₹599", status: "Success" },
  ];

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password updated successfully!");
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    // In a real app, you'd dispatch a logout action
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 text-richblack-5"
    >
      {/* 1. PROFILE HEADER */}
      <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <img 
            src={profileImage || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=00B4D8&color=fff`} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500 shadow-lg transition-all group-hover:brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FaCamera className="text-white text-2xl" />
          </div>
          <button className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full hover:bg-cyan-600 transition-colors shadow-lg border-2 border-richblack-800">
            <FaEdit className="text-white text-sm" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h1 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30 self-center">
              Level 12 Learner
            </span>
          </div>
          <p className="text-richblack-300 flex items-center justify-center md:justify-start gap-2">
            <FaUser className="text-sm" /> {user?.email}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-all shadow-lg font-bold"
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: EDIT PROFILE & SECURITY */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. EDIT PROFILE */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaEdit className="text-cyan-400" /> Edit Profile
              </h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1"
                >
                  Change Details
                </button>
              )}
            </div>
            <form onSubmit={saveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-richblack-300 ml-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-richblack-300 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1 flex items-center gap-2">
                  <FaPhone className="text-xs" /> Phone Number
                </label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                  className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                />
              </div>
              {isEditing && (
                <div className="flex gap-4 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FaSave /> Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-richblack-700 hover:bg-richblack-600 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </motion.div>

          {/* 4. ACCOUNT SECURITY */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <FaLock className="text-pink-500" /> Account Security
            </h2>
            <form onSubmit={updatePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-richblack-300 ml-1">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-richblack-300 ml-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-richblack-700 hover:bg-richblack-600 text-white font-bold py-3 rounded-xl transition-all"
              >
                Update Password
              </button>
            </form>
          </motion.div>

          {/* 5. PURCHASE HISTORY */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl overflow-hidden">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <FaHistory className="text-yellow-400" /> Purchase History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-richblack-400 border-b border-richblack-700">
                    <th className="pb-4 font-medium">Course Name</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-richblack-700/50">
                  {purchaseHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-richblack-900/50 transition-colors">
                      <td className="py-4 font-medium">{item.course}</td>
                      <td className="py-4 text-richblack-300">{item.date}</td>
                      <td className="py-4 text-cyan-400 font-bold">{item.amount}</td>
                      <td className="py-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-bold border border-green-500/30">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: LEARNING SUMMARY & STATS */}
        <div className="space-y-8">
          {/* 3. LEARNING SUMMARY */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Learning Summary</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-richblack-900/50 p-4 rounded-2xl border border-richblack-700">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 text-xl border border-cyan-500/20">
                  <FaGraduationCap />
                </div>
                <div>
                  <p className="text-richblack-300 text-xs uppercase tracking-wider font-bold">Enrolled</p>
                  <p className="text-2xl font-bold">{learningSummary.enrolled} Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-richblack-900/50 p-4 rounded-2xl border border-richblack-700">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 text-xl border border-green-500/20">
                  <FaCheckCircle />
                </div>
                <div>
                  <p className="text-richblack-300 text-xs uppercase tracking-wider font-bold">Completed</p>
                  <p className="text-2xl font-bold">{learningSummary.completed} Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-richblack-900/50 p-4 rounded-2xl border border-richblack-700">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-400 text-xl border border-yellow-500/20">
                  <FaAward />
                </div>
                <div>
                  <p className="text-richblack-300 text-xs uppercase tracking-wider font-bold">Certificates</p>
                  <p className="text-2xl font-bold">{learningSummary.certificates} Earned</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PAYMENT METHODS (Bonus) */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaCreditCard className="text-blue-400" /> Payment Methods
            </h2>
            <div className="bg-gradient-to-br from-richblack-900 to-richblack-700 p-6 rounded-2xl border border-richblack-600 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <FaCreditCard className="text-6xl rotate-12" />
              </div>
              <p className="text-xs text-richblack-400 mb-4 tracking-widest">PRIMARY CARD</p>
              <p className="text-lg font-mono mb-6">**** **** **** 4242</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-richblack-400 uppercase">Card Holder</p>
                  <p className="text-sm font-bold uppercase">{user?.firstName} {user?.lastName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-richblack-400 uppercase">Expires</p>
                  <p className="text-sm font-bold">12/28</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 text-richblack-300 hover:text-cyan-400 border border-dashed border-richblack-600 rounded-xl text-sm transition-all hover:border-cyan-400">
              + Add New Payment Method
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProfile;
