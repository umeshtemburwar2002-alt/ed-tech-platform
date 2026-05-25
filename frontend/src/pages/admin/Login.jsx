import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { setUser } from "../../slices/profileSlice"
import { setToken } from "../../slices/authSlice"
import { authService } from "../../services/auth"
import { toast } from "react-hot-toast"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const cred = await authService.login(email, password, "Admin")
      const idToken = await cred.getIdToken()
      const user = {
        email: cred.email,
        firstName: cred.displayName || "Admin",
        lastName: "",
        image: cred.photoURL || `https://api.dicebear.com/5.x/initials/svg?seed=Admin`,
        uid: cred.uid,
        accountType: "Admin"
      }
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", idToken)
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('isLoggedIn', 'true');
      
      dispatch(setUser(user))
      dispatch(setToken(idToken))
      
      toast.success("Welcome Admin!")
      navigate("/admin/dashboard")
    } catch (e2) {
      setError("Invalid credentials or not an admin")
      toast.error("Invalid admin credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#000814] px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/5"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <i className="fas fa-user-shield text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="mt-2 text-slate-400 text-sm font-medium">Restricted access area</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-bold border border-red-500/20 flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </motion.div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Admin Email</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00B4D8] transition-colors">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                className="input-field pl-12"
                placeholder="admin@edtech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00B4D8] transition-colors">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="input-field pl-12 pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Sign In <i className="fas fa-sign-in-alt text-sm group-hover:translate-x-1 transition-transform"></i></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link to="/" className="text-slate-400 hover:text-white font-bold text-sm transition-all group flex items-center justify-center gap-2">
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i> Back to Main Site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
