import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { authService } from "../../services/auth"
import { setUser } from "../../slices/profileSlice"
import { supabase } from "../../config/supabaseClient"
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
      const user = await authService.register(formData.email, formData.password, formData.name)
      
      // Store additional details in Supabase 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          email: formData.email, 
          role: "instructor", 
        }])

      if (profileError) throw profileError

      const u = { firstName: formData.name, lastName: "", email: formData.email, image: "", accountType: "Instructor" }
      dispatch(setUser(u))
      toast.success("Signup Successful! Please verify your email.")
      navigate("/instructor")
    } catch (e) {
      toast.error(e.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      setLoading(true)
      await authService.signInWithGoogle("Instructor")
      // Google redirect will handle the rest
    } catch (e) {
      toast.error(e.message || "Google signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>

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
              <label className="block text-sm font-bold text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                className="input-field"
                placeholder="+1 234..."
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-1">Short Bio</label>
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
              <>Create Account <i className="fas fa-user-plus text-sm group-hover:translate-x-1 transition-transform"></i></>
            )}
          </button>
        </form>

        <div className="mt-6">
          <button onClick={googleSignup} className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-slate-300 text-sm">
            <i className="fab fa-google text-red-500"></i> Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-slate-400 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00B4D8] font-bold hover:underline transition-all duration-300">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
