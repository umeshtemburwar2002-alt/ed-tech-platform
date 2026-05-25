import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEllipsisV, FaBook, FaChartLine, FaCertificate, FaHeart, FaNewspaper, FaBlog, FaQuestionCircle, FaBriefcase, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const studentMenuItems = [
    {
      icon: FaBook,
      label: "My Learning",
      path: "/dashboard/my-courses",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaChartLine,
      label: "Progress",
      path: "/dashboard/progress",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaCertificate,
      label: "Certificates",
      path: "/dashboard/certificates",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaHeart,
      label: "Wishlist",
      path: "/dashboard/wishlist",
      color: "from-red-500 to-pink-500"
    }
  ];

  const commonMenuItems = [
    {
      icon: FaNewspaper,
      label: "Articles",
      path: "/resources/articles",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: FaBlog,
      label: "Blog",
      path: "/resources/blog",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: FaQuestionCircle,
      label: "Help",
      path: "/support/help-center",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FaBriefcase,
      label: "Careers",
      path: "/careers",
      color: "from-gray-500 to-slate-500"
    }
  ];

  const menuItems = user?.accountType === ACCOUNT_TYPE.STUDENT 
    ? [...studentMenuItems, ...commonMenuItems]
    : commonMenuItems;

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      rotate: 0
    },
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Floating Menu Button */}
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="text-white text-sm" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaEllipsisV className="text-white text-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-12 w-64 bg-richblack-800 border border-richblack-700 rounded-xl shadow-2xl overflow-hidden z-[1001]"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500">
              <h3 className="text-white font-semibold text-sm">
                {user?.accountType === ACCOUNT_TYPE.STUDENT ? "Quick Access" : "Explore"}
              </h3>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="px-2"
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-richblack-700 transition-colors duration-200 group"
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="text-white text-sm" />
                      </div>
                      <span className="text-richblack-25 font-medium text-sm group-hover:text-yellow-50 transition-colors duration-200">
                        {item.label}
                      </span>
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-richblack-900 border-t border-richblack-700">
              <p className="text-richblack-400 text-xs text-center">
                {user?.accountType === ACCOUNT_TYPE.STUDENT 
                  ? "Manage your learning journey"
                  : "Discover more resources"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-[999]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;