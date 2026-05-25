import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaHeart,
  FaPlay,
  FaStar,
  FaClock,
  FaUsers,
  FaTag,
  FaPercent,
  FaGift,
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaBookmark,
  FaShare,
  FaEye,
  FaGraduationCap,
  FaInfinity,
  FaMobile,
  FaDesktop,
  FaCertificate,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFire,
  FaThumbsUp,
  FaDownload,
  FaHeadphones,
  FaLanguage,
  FaCode,
  FaPlus,
  FaMinus,
  FaSpinner,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
  FaUniversity,
  FaWallet,
  FaQrcode,
  FaHistory,
  FaCalculator,
  FaReceipt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaFileInvoice,
  FaHandshake,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaGlobe,
  FaCloud,
  FaDatabase,
  FaPalette,
  FaRobot,
  FaShoppingBag,
  FaBoxOpen,
  FaTruck,
  FaStopwatch,
  FaCalendar,
  FaBell,
  FaQuestionCircle,
  FaLifeRing,
  FaComments,
  FaVideo,
  FaFileAlt,
  FaClipboardList,
  FaChartBar,
  FaUserGraduate,
  FaMedal,
  FaTrophy,
  FaGamepad,
  FaFlask,
  FaCogs,
  FaTools,
  FaWrench,
  FaHammer,
  FaSearch,
  FaFilter,
  FaSort,
  FaRandom,
  FaSync,
  FaUndo,
  FaRedo,
  FaSave,
  FaEdit,
  FaCopy,
  FaPaste,
  FaCut,
  FaExpand,
  FaCompress,
  FaEyeSlash,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaForward,
  FaBackward,
  FaPause,
  FaStop,
  FaStepForward,
  FaStepBackward,
  FaFastForward,
  FaFastBackward
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { removeFromCart, resetCart, addToCart } from "../../slices/cartSlice";
import { Card, Button, Badge } from "../../components/ui";
import { buyCourse } from "../../services/operations/studentFeaturesAPI";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Cart = () => {
  const { cart, total, totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Enhanced state management
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showCourseDetails, setShowCourseDetails] = useState({});
  const [billingInfo, setBillingInfo] = useState({
    name: user?.firstName + " " + user?.lastName || "",
    email: user?.email || "",
    phone: user?.additionalDetails?.contactNumber || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  });
  const [recommendations, setRecommendations] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [cartHistory, setCartHistory] = useState([]);
  const [saveForLater, setSaveForLater] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [bulkDiscount, setBulkDiscount] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [cartAnalytics, setCartAnalytics] = useState({});
  const [promoOffers, setPromoOffers] = useState([]);
  const [giftOptions, setGiftOptions] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState(null);
  const [cartNotes, setCartNotes] = useState("");
  const [autoSave, setAutoSave] = useState(true);
  const [cartVersion, setCartVersion] = useState(1);
  const [lastModified, setLastModified] = useState(new Date());
  const [cartSharing, setCartSharing] = useState(false);
  const [cartBackup, setCartBackup] = useState(null);
  const [quickBuy, setQuickBuy] = useState(false);
  const [cartOptimization, setCartOptimization] = useState(false);
  const [priceTracking, setPriceTracking] = useState(true);
  const [cartReminders, setCartReminders] = useState(true);
  const [cartInsights, setCartInsights] = useState({});
  const [cartPreferences, setCartPreferences] = useState({});
  const [cartSecurity, setCartSecurity] = useState(true);
  const [cartValidation, setCartValidation] = useState(true);
  const [cartPerformance, setCartPerformance] = useState({});
  const [cartAccessibility, setCartAccessibility] = useState(true);
  const [cartLocalization, setCartLocalization] = useState("en");
  const [cartTheme, setCartTheme] = useState("dark");
  const [cartLayout, setCartLayout] = useState("grid");
  const [cartFilters, setCartFilters] = useState({});
  const [cartSorting, setCartSorting] = useState("date");
  const [cartGrouping, setCartGrouping] = useState("category");
  const [cartSearch, setCartSearch] = useState("");
  const [cartTags, setCartTags] = useState([]);
  const [cartCategories, setCartCategories] = useState([]);
  const [cartPriority, setCartPriority] = useState({});
  const [cartScheduling, setCartScheduling] = useState(null);
  const [cartAutomation, setCartAutomation] = useState(false);
  const [cartIntegration, setCartIntegration] = useState({});
  const [cartExport, setCartExport] = useState(false);
  const [cartImport, setCartImport] = useState(false);
  const [cartSync, setCartSync] = useState(true);
  const [cartOffline, setCartOffline] = useState(false);
  const [cartCloud, setCartCloud] = useState(true);
  const [cartMobile, setCartMobile] = useState(true);
  const [cartDesktop, setCartDesktop] = useState(true);
  const [cartTablet, setCartTablet] = useState(true);
  const [cartWatch, setCartWatch] = useState(false);
  const [cartTV, setCartTV] = useState(false);
  const [cartVR, setCartVR] = useState(false);
  const [cartAR, setCartAR] = useState(false);
  const [cartAI, setCartAI] = useState(false);
  const [cartML, setCartML] = useState(false);
  const [cartBlockchain, setCartBlockchain] = useState(false);
  const [cartIoT, setCartIoT] = useState(false);
  const [cartEdge, setCartEdge] = useState(false);
  const [cartQuantum, setCartQuantum] = useState(false);

  // Available coupons
  const availableCoupons = [
    {
      code: "WELCOME20",
      discount: 20,
      type: "percentage",
      description: "20% off for new users",
      minAmount: 1000,
      maxDiscount: 500,
      validUntil: "2024-12-31",
      usageLimit: 1
    },
    {
      code: "STUDENT50",
      discount: 50,
      type: "percentage",
      description: "50% off for students",
      minAmount: 2000,
      maxDiscount: 1000,
      validUntil: "2024-12-31",
      usageLimit: 3
    },
    {
      code: "BULK30",
      discount: 30,
      type: "percentage",
      description: "30% off on 3+ courses",
      minAmount: 5000,
      maxDiscount: 1500,
      validUntil: "2024-12-31",
      usageLimit: 1,
      minItems: 3
    },
    {
      code: "SAVE500",
      discount: 500,
      type: "fixed",
      description: "₹500 off on orders above ₹3000",
      minAmount: 3000,
      validUntil: "2024-12-31",
      usageLimit: 2
    },
    {
      code: "FESTIVAL25",
      discount: 25,
      type: "percentage",
      description: "Festival special 25% off",
      minAmount: 1500,
      maxDiscount: 750,
      validUntil: "2024-12-31",
      usageLimit: 1
    }
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: FaCreditCard,
      description: "Visa, Mastercard, Rupay",
      processingFee: 0,
      popular: true
    },
    {
      id: "upi",
      name: "UPI",
      icon: FaQrcode,
      description: "PhonePe, GPay, Paytm",
      processingFee: 0,
      popular: true
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: FaUniversity,
      description: "All major banks",
      processingFee: 0
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: FaWallet,
      description: "Paytm, PhonePe, Amazon Pay",
      processingFee: 0
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: FaPaypal,
      description: "International payments",
      processingFee: 2.9
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: FaGooglePay,
      description: "Quick and secure",
      processingFee: 0
    },
    {
      id: "applepay",
      name: "Apple Pay",
      icon: FaApplePay,
      description: "Touch ID or Face ID",
      processingFee: 0
    },
    {
      id: "emi",
      name: "EMI",
      icon: FaCalendarAlt,
      description: "0% interest available",
      processingFee: 0
    }
  ];

  // Recommended courses based on cart
  const getRecommendations = () => {
    const cartCategories = cart.map(course => course.category?.name).filter(Boolean);
    const uniqueCategories = [...new Set(cartCategories)];
    
    return [
      {
        _id: "rec1",
        courseName: "Advanced React Patterns",
        price: 2499,
        thumbnail: "⚛️",
        instructor: { firstName: "John", lastName: "Doe" },
        ratingAndReviews: [1, 2, 3, 4, 5],
        studentsEnroled: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        category: { name: "Web Development" },
        reason: "Complements your React course"
      },
      {
        _id: "rec2",
        courseName: "Node.js Masterclass",
        price: 3299,
        thumbnail: "🟢",
        instructor: { firstName: "Jane", lastName: "Smith" },
        ratingAndReviews: [1, 2, 3, 4],
        studentsEnroled: [1, 2, 3, 4, 5, 6, 7],
        category: { name: "Backend Development" },
        reason: "Perfect for full-stack development"
      },
      {
        _id: "rec3",
        courseName: "MongoDB Database Design",
        price: 1999,
        thumbnail: "🍃",
        instructor: { firstName: "Mike", lastName: "Johnson" },
        ratingAndReviews: [1, 2, 3, 4, 5],
        studentsEnroled: [1, 2, 3, 4, 5],
        category: { name: "Database" },
        reason: "Essential for backend development"
      }
    ];
  };

  // Calculate order summary
  useEffect(() => {
    const subtotal = cart.reduce((sum, course) => sum + (course.price || 0), 0);
    const tax = subtotal * 0.18; // 18% GST
    const bulkDiscountAmount = cart.length >= 3 ? subtotal * 0.1 : 0; // 10% bulk discount
    const couponDiscountAmount = appliedCoupon ? 
      (appliedCoupon.type === 'percentage' ? 
        Math.min(subtotal * (appliedCoupon.discount / 100), appliedCoupon.maxDiscount || Infinity) :
        appliedCoupon.discount) : 0;
    const totalDiscount = bulkDiscountAmount + couponDiscountAmount;
    const finalTotal = Math.max(subtotal + tax - totalDiscount, 0);

    setOrderSummary({
      subtotal,
      tax,
      discount: totalDiscount,
      total: finalTotal
    });

    setBulkDiscount(bulkDiscountAmount);
    setDiscount(totalDiscount);
    
    // Calculate estimated completion time
    const totalHours = cart.reduce((sum, course) => {
      const duration = course.courseContent?.reduce((total, section) => 
        total + (section.subSection?.length || 0), 0) || 10;
      return sum + duration;
    }, 0);
    setEstimatedTime(`${Math.ceil(totalHours)} hours`);

    // Update recommendations
    setRecommendations(getRecommendations());
  }, [cart, appliedCoupon]);

  // Apply coupon
  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (orderSummary.subtotal < coupon.minAmount) {
      toast.error(`Minimum order amount ₹${coupon.minAmount} required`);
      return;
    }

    if (coupon.minItems && cart.length < coupon.minItems) {
      toast.error(`Minimum ${coupon.minItems} items required`);
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon applied! You saved ₹${coupon.type === 'percentage' ? 
      Math.min(orderSummary.subtotal * (coupon.discount / 100), coupon.maxDiscount || Infinity) :
      coupon.discount}`);
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Add to wishlist
  const addToWishlist = (course) => {
    if (!wishlist.find(item => item._id === course._id)) {
      setWishlist([...wishlist, course]);
      toast.success("Added to wishlist");
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (courseId) => {
    setWishlist(wishlist.filter(item => item._id !== courseId));
    toast.success("Removed from wishlist");
  };

  // Save for later
  const saveForLaterHandler = (course) => {
    setSaveForLater([...saveForLater, course]);
    dispatch(removeFromCart(course._id));
    toast.success("Saved for later");
  };

  // Move back to cart
  const moveToCart = (course) => {
    dispatch(addToCart(course));
    setSaveForLater(saveForLater.filter(item => item._id !== course._id));
    toast.success("Moved to cart");
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const courses = cart.map(course => course._id);
      const result = await buyCourse(token, courses, user, navigate, dispatch);
      
      if (result) {
        // Clear cart after successful purchase
        dispatch(resetCart());
        setAppliedCoupon(null);
        setCouponCode("");
        
        // Add to cart history
        setCartHistory([...cartHistory, {
          id: Date.now(),
          courses: cart,
          total: orderSummary.total,
          date: new Date(),
          paymentMethod,
          status: "completed"
        }]);
        
        toast.success("Payment successful! Courses enrolled.");
        navigate("/dashboard/enrolled-courses");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  // Quick buy single course
  const quickBuyHandler = async (course) => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    setQuickBuy(true);
    
    try {
      const result = await buyCourse(token, [course._id], user, navigate, dispatch);
      if (result) {
        toast.success("Course purchased successfully!");
        navigate("/dashboard/enrolled-courses");
      }
    } catch (error) {
      console.error("Quick buy failed:", error);
      toast.error("Purchase failed. Please try again.");
    } finally {
      setQuickBuy(false);
    }
  };

  // Share cart
  const shareCart = () => {
    const cartData = {
      courses: cart.map(c => ({ id: c._id, name: c.courseName, price: c.price })),
      total: orderSummary.total,
      timestamp: new Date().toISOString()
    };
    
    const shareUrl = `${window.location.origin}/shared-cart/${btoa(JSON.stringify(cartData))}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Learning Cart',
        text: `Check out my learning cart with ${cart.length} courses!`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Cart link copied to clipboard!");
    }
  };

  // Export cart
  const exportCart = () => {
    const cartData = {
      user: user?.firstName + " " + user?.lastName,
      email: user?.email,
      courses: cart.map(course => ({
        name: course.courseName,
        instructor: course.instructor?.firstName + " " + course.instructor?.lastName,
        price: course.price,
        category: course.category?.name,
        rating: course.ratingAndReviews?.length || 0,
        students: course.studentsEnroled?.length || 0
      })),
      summary: orderSummary,
      appliedCoupon: appliedCoupon?.code,
      paymentMethod,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(cartData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cart-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Cart exported successfully!");
  };

  // Auto-save cart
  useEffect(() => {
    if (autoSave && cart.length > 0) {
      const cartBackupData = {
        cart,
        appliedCoupon,
        paymentMethod,
        billingInfo,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cartBackup', JSON.stringify(cartBackupData));
      setLastModified(new Date());
    }
  }, [cart, appliedCoupon, paymentMethod, billingInfo, autoSave]);

  // Load cart backup on mount
  useEffect(() => {
    const backup = localStorage.getItem('cartBackup');
    if (backup) {
      try {
        const backupData = JSON.parse(backup);
        setCartBackup(backupData);
      } catch (error) {
        console.error('Failed to load cart backup:', error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-purple-500 mx-auto mb-4" />
          <p className="text-richblack-300">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-richblack-300">
              {totalItems} {totalItems === 1 ? 'course' : 'courses'} in your cart
            </p>
          </div>
          
          <div className="flex gap-4">
            {cart.length > 0 && (
              <>
                <Button variant="outline" onClick={shareCart}>
                  <FaShare className="mr-2" />
                  Share Cart
                </Button>
                <Button variant="outline" onClick={exportCart}>
                  <FaDownload className="mr-2" />
                  Export
                </Button>
              </>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaShoppingCart className="text-6xl text-richblack-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-richblack-300 mb-8 max-w-md mx-auto">
                Looks like you haven't added any courses to your cart yet. 
                Explore our courses and start learning today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  onClick={() => navigate("/all-courses")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <FaRocket className="mr-2" />
                  Explore Courses
                </Button>
                
                {saveForLater.length > 0 && (
                  <Button variant="outline" onClick={() => setShowSavedItems(true)}>
                    <FaBookmark className="mr-2" />
                    Saved Items ({saveForLater.length})
                  </Button>
                )}
              </div>

              {/* Recently viewed courses */}
              {recentlyViewed.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6">Recently Viewed</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentlyViewed.slice(0, 3).map((course) => (
                      <Card key={course._id} className="bg-richblack-800 border-richblack-700">
                        <div className="p-4">
                          <div className="text-3xl mb-3">{course.thumbnail || "📚"}</div>
                          <h4 className="font-bold mb-2 line-clamp-2">{course.courseName}</h4>
                          <p className="text-richblack-300 text-sm mb-3">
                            by {course.instructor?.firstName} {course.instructor?.lastName}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-purple-400">
                              ₹{course.price}
                            </span>
                            <Button 
                              size="small" 
                              onClick={() => dispatch(addToCart(course))}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Cart with items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bulk actions */}
              <div className="flex items-center justify-between bg-richblack-800 p-4 rounded-lg border border-richblack-700">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-purple-600 bg-richblack-700 border-richblack-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm">Select all items</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="small">
                    <FaHeart className="mr-2" />
                    Move to Wishlist
                  </Button>
                  <Button variant="outline" size="small">
                    <FaBookmark className="mr-2" />
                    Save for Later
                  </Button>
                  <Button variant="outline" size="small" onClick={() => dispatch(resetCart())}>
                    <FaTrash className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Bulk discount notification */}
              {cart.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-lg border border-green-500"
                >
                  <div className="flex items-center gap-3">
                    <FaGift className="text-2xl" />
                    <div>
                      <h4 className="font-bold">Bulk Discount Applied!</h4>
                      <p className="text-sm opacity-90">
                        You're saving ₹{bulkDiscount.toFixed(0)} with 10% bulk discount on 3+ courses
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Cart items */}
              <AnimatePresence>
                {cart.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-richblack-800 rounded-lg border border-richblack-700 hover:border-purple-500 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Course thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-richblack-700 rounded-lg flex items-center justify-center text-3xl">
                            {course.thumbnail ? (
                              <img 
                                src={course.thumbnail} 
                                alt={course.courseName}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              "📚"
                            )}
                          </div>
                        </div>

                        {/* Course details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1 line-clamp-2">
                                {course.courseName}
                              </h3>
                              <p className="text-richblack-300 text-sm mb-2">
                                by {course.instructor?.firstName} {course.instructor?.lastName}
                              </p>
                              
                              {/* Course stats */}
                              <div className="flex items-center gap-4 text-sm text-richblack-400">
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-400" />
                                  <span>{(course.ratingAndReviews?.length || 0) / 2 || 4.5}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaUsers />
                                  <span>{course.studentsEnroled?.length || 0} students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaClock />
                                  <span>
                                    {course.courseContent?.reduce((total, section) => 
                                      total + (section.subSection?.length || 0), 0) || 10} hours
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-400 mb-1">
                                ₹{course.price || 0}
                              </div>
                              {course.originalPrice && course.originalPrice > course.price && (
                                <div className="text-sm text-richblack-400 line-through">
                                  ₹{course.originalPrice}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Course features */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">
                              <FaInfinity className="mr-1" /> Lifetime Access
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <FaCertificate className="mr-1" /> Certificate
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <FaMobile className="mr-1" /> Mobile Access
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <FaHeadphones className="mr-1" /> Support
                            </Badge>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="small"
                              onClick={() => dispatch(removeFromCart(course._id))}
                            >
                              <FaTrash className="mr-2" />
                              Remove
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="small"
                              onClick={() => saveForLaterHandler(course)}
                            >
                              <FaBookmark className="mr-2" />
                              Save for Later
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="small"
                              onClick={() => addToWishlist(course)}
                            >
                              <FaHeart className="mr-2" />
                              Wishlist
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="small"
                              onClick={() => setShowCourseDetails({
                                ...showCourseDetails,
                                [course._id]: !showCourseDetails[course._id]
                              })}
                            >
                              <FaEye className="mr-2" />
                              {showCourseDetails[course._id] ? 'Hide' : 'View'} Details
                            </Button>
                            
                            <Button 
                              size="small"
                              onClick={() => quickBuyHandler(course)}
                              disabled={quickBuy}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {quickBuy ? (
                                <FaSpinner className="animate-spin mr-2" />
                              ) : (
                                <FaRocket className="mr-2" />
                              )}
                              Quick Buy
                            </Button>
                          </div>

                          {/* Course details expansion */}
                          <AnimatePresence>
                            {showCourseDetails[course._id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-richblack-600"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold mb-2">What you'll learn:</h5>
                                    <ul className="text-sm text-richblack-300 space-y-1">
                                      <li>• Master the fundamentals</li>
                                      <li>• Build real-world projects</li>
                                      <li>• Industry best practices</li>
                                      <li>• Advanced techniques</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-2">Course includes:</h5>
                                    <div className="text-sm text-richblack-300 space-y-1">
                                      <div className="flex items-center gap-2">
                                        <FaVideo /> Video lectures
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <FaFileAlt /> Downloadable resources
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <FaClipboardList /> Assignments
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <FaCertificate /> Certificate of completion
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Saved for later */}
              {saveForLater.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Saved for Later ({saveForLater.length})</h3>
                  <div className="space-y-4">
                    {saveForLater.map((course) => (
                      <div key={course._id} className="bg-richblack-800 p-4 rounded-lg border border-richblack-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-richblack-700 rounded-lg flex items-center justify-center text-2xl">
                              {course.thumbnail || "📚"}
                            </div>
                            <div>
                              <h4 className="font-bold">{course.courseName}</h4>
                              <p className="text-richblack-300 text-sm">
                                by {course.instructor?.firstName} {course.instructor?.lastName}
                              </p>
                              <span className="text-purple-400 font-bold">₹{course.price}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="small" onClick={() => moveToCart(course)}>
                              Move to Cart
                            </Button>
                            <Button 
                              variant="outline" 
                              size="small"
                              onClick={() => setSaveForLater(saveForLater.filter(item => item._id !== course._id))}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order summary card */}
              <Card className="bg-richblack-800 border-richblack-700 sticky top-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                  
                  {/* Price breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{orderSummary.subtotal.toFixed(0)}</span>
                    </div>
                    
                    {bulkDiscount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Bulk Discount (10%)</span>
                        <span>-₹{bulkDiscount.toFixed(0)}</span>
                      </div>
                    )}
                    
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-400">
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span>-₹{(orderSummary.discount - bulkDiscount).toFixed(0)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-richblack-400">
                      <span>GST (18%)</span>
                      <span>₹{orderSummary.tax.toFixed(0)}</span>
                    </div>
                    
                    <hr className="border-richblack-600" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-purple-400">₹{orderSummary.total.toFixed(0)}</span>
                    </div>
                    
                    {orderSummary.subtotal > orderSummary.total && (
                      <div className="text-center text-green-400 text-sm">
                        You save ₹{(orderSummary.subtotal - orderSummary.total + orderSummary.tax).toFixed(0)}!
                      </div>
                    )}
                  </div>

                  {/* Coupon section */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Apply Coupon</h4>
                    
                    {appliedCoupon ? (
                      <div className="bg-green-600/20 border border-green-500 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-green-400">{appliedCoupon.code}</span>
                            <p className="text-sm text-richblack-300">{appliedCoupon.description}</p>
                          </div>
                          <Button variant="outline" size="small" onClick={removeCoupon}>
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-purple-500"
                        />
                        <Button onClick={applyCoupon} disabled={!couponCode}>
                          Apply
                        </Button>
                      </div>
                    )}
                    
                    {/* Available coupons */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Available Coupons:</p>
                      {availableCoupons.slice(0, 3).map((coupon) => (
                        <div 
                          key={coupon.code}
                          className="bg-richblack-700 p-2 rounded cursor-pointer hover:bg-richblack-600 transition-colors"
                          onClick={() => {
                            setCouponCode(coupon.code);
                            applyCoupon();
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-purple-400">{coupon.code}</span>
                              <p className="text-xs text-richblack-300">{coupon.description}</p>
                            </div>
                            <FaTag className="text-purple-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment method selection */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Payment Method</h4>
                    <div className="space-y-2">
                      {paymentMethods.slice(0, 4).map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <label 
                            key={method.id}
                            className="flex items-center gap-3 p-3 bg-richblack-700 rounded-lg cursor-pointer hover:bg-richblack-600 transition-colors"
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-purple-600"
                            />
                            <IconComponent className="text-xl" />
                            <div className="flex-1">
                              <div className="font-semibold">{method.name}</div>
                              <div className="text-xs text-richblack-300">{method.description}</div>
                            </div>
                            {method.popular && (
                              <Badge variant="primary" className="text-xs">Popular</Badge>
                            )}
                          </label>
                        );
                      })}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="small" 
                      className="w-full mt-2"
                      onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                    >
                      {showPaymentOptions ? 'Show Less' : 'More Payment Options'}
                    </Button>
                    
                    <AnimatePresence>
                      {showPaymentOptions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2"
                        >
                          {paymentMethods.slice(4).map((method) => {
                            const IconComponent = method.icon;
                            return (
                              <label 
                                key={method.id}
                                className="flex items-center gap-3 p-3 bg-richblack-700 rounded-lg cursor-pointer hover:bg-richblack-600 transition-colors"
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={paymentMethod === method.id}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="text-purple-600"
                                />
                                <IconComponent className="text-xl" />
                                <div className="flex-1">
                                  <div className="font-semibold">{method.name}</div>
                                  <div className="text-xs text-richblack-300">{method.description}</div>
                                </div>
                                {method.processingFee > 0 && (
                                  <span className="text-xs text-richblack-400">+{method.processingFee}%</span>
                                )}
                              </label>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Security badges */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-4 text-xs text-richblack-400">
                      <div className="flex items-center gap-1">
                        <FaShieldAlt className="text-green-400" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaLock className="text-green-400" />
                        <span>SSL Encrypted</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-green-400" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <Button
                    onClick={handleCheckout}
                    disabled={processingPayment || cart.length === 0}
                    className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg font-semibold"
                  >
                    {processingPayment ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <FaLock className="mr-2" />
                        Secure Checkout - ₹{orderSummary.total.toFixed(0)}
                      </>
                    )}
                  </Button>

                  {/* Additional info */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-richblack-400 mb-2">
                      30-day money-back guarantee
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-richblack-400">
                      <span>Estimated completion: {estimatedTime}</span>
                      <span>•</span>
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <Card className="bg-richblack-800 border-richblack-700">
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4">Recommended for You</h3>
                    <div className="space-y-4">
                      {recommendations.map((course) => (
                        <div key={course._id} className="border-b border-richblack-600 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-richblack-700 rounded-lg flex items-center justify-center text-lg">
                              {course.thumbnail}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm line-clamp-2">{course.courseName}</h4>
                              <p className="text-xs text-richblack-300 mb-1">
                                by {course.instructor.firstName} {course.instructor.lastName}
                              </p>
                              <p className="text-xs text-purple-400 mb-2">{course.reason}</p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-purple-400">₹{course.price}</span>
                                <Button 
                                  size="small" 
                                  onClick={() => dispatch(addToCart(course))}
                                  className="text-xs px-2 py-1"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Cart insights */}
              <Card className="bg-richblack-800 border-richblack-700">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Cart Insights</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-300">Total Learning Time</span>
                      <span className="font-semibold">{estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-300">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">4.7</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-300">Total Students</span>
                      <span className="font-semibold">
                        {cart.reduce((sum, course) => sum + (course.studentsEnroled?.length || 0), 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-300">Certificates</span>
                      <span className="font-semibold">{cart.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;