import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { registerWithSupabase } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"
import { toast } from "react-hot-toast"

export default function InstructorSignup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    country: "",
    expertise: "",
    experience: "",
    linkedin: "",
    bio: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Must be 8+ characters"
    if (formData.password !== formData.confirm) newErrors.confirm = "Passwords do not match"
    return newErrors
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const submit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) { setErrors(v); return }
    try {
      setLoading(true)
      
      const nameParts = formData.name.split(" ")
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(" ")

      dispatch(setSignupData({
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        accountType: "Instructor",
        contactNumber: formData.phone,
      }))

      await dispatch(registerWithSupabase(navigate))
      
      toast.success("Signup Successful! Please verify your email.")
      navigate("/verify-email")
    } catch (e) {
      toast.error(e.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/5"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Instructor Signup</h1>
          <p className="mt-2 text-slate-400 text-sm font-medium">Share your knowledge with the world</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className={`input-field ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="mt-1 text-xs font-bold text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className={`input-field ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="mt-1 text-xs font-bold text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`input-field pr-10 ${errors.password ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs font-bold text-red-400">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Confirm</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                className={`input-field ${errors.confirm ? 'border-red-500/50 focus:border-red-500' : ''}`}
                placeholder="••••••••"
                value={formData.confirm}
                onChange={handleInputChange}
              />
              {errors.confirm && <p className="mt-1 text-xs font-bold text-red-400">{errors.confirm}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Expertise</label>
              <input
                type="text"
                name="expertise"
                className="input-field"
                placeholder="Web Dev, Data Science"
                value={formData.expertise}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Experience (Years)</label>
              <input
                type="text"
                name="experience"
                className="input-field"
                placeholder="5"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                name="linkedin"
                className="input-field"
                placeholder="linkedin.com/in/..."
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="input-field"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Bio</label>
            <textarea
              name="bio"
              className="input-field"
              placeholder="Tell us about yourself..."
              rows={2}
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 relative overflow-hidden mt-2 group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <i className="fas fa-rocket"></i>
                Create Instructor Account
              </>
            )}
          </button>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
              Log In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
