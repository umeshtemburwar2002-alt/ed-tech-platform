import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { setUser } from "../../slices/profileSlice"
import { setToken } from "../../slices/authSlice"
import { toast } from "react-hot-toast"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (roleHint) => {
    try {
      setLoading(true)
      setError("")
      
      console.log("Frontend-only Login attempt:", email);
      
      // Automatic role detection for easy testing
      const role = (roleHint || (email.includes('admin') ? 'admin' : email.includes('teacher') ? 'instructor' : 'student')).toLowerCase();
      
      const u = { 
        firstName: email.split('@')[0] || "User", 
        lastName: "", 
        email: email, 
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(email)}`, 
        accountType: role === "instructor" ? "Instructor" : role === "admin" ? "Admin" : "Student" 
      }
      
      const token = "dummy-token-" + Date.now();
      
      dispatch(setUser(u))
      dispatch(setToken(token))
      
      if (remember) {
        localStorage.setItem("user", JSON.stringify(u))
        localStorage.setItem("token", token)
      }
      
      localStorage.setItem('userRole', role);
      localStorage.setItem('isLoggedIn', 'true');
      
      toast.success(`Welcome back, ${u.firstName}!`)
      
      if (role === "admin") navigate("/admin/dashboard")
      else if (role === "instructor") navigate("/dashboard/instructor")
      else navigate("/dashboard/my-profile")
    } catch (e) {
      setError(e.message || "Login failed")
      toast.error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async (roleHint) => {
    handleLogin(roleHint);
  }

  useEffect(() => {
    setError("")
  }, [email, password])

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
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-slate-400 text-sm font-medium">Log in to your account to continue</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-bold border border-red-500/20 flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00B4D8] transition-colors">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                className="input-field pl-12"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-300">Password</label>
              <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#00B4D8] hover:text-[#00B4D8]/80 transition-colors">
                Forgot Password?
              </Link>
            </div>
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

          <div className="flex items-center">
            <input type="checkbox" id="remember" checked={remember} onChange={(e)=>setRemember(e.target.checked)} className="w-4 h-4 rounded bg-white/5 border-white/10 text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer" />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-400 font-medium cursor-pointer">Remember Me</label>
          </div>

          <button
            onClick={() => handleLogin()}
            disabled={loading}
            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Login <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i></>
            )}
          </button>
        </div>

        <div className="mt-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#000814] px-4 text-slate-500 font-bold">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button onClick={()=>handleGoogle("Student")} className="flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-slate-300 text-sm">
              <i className="fab fa-google text-red-500"></i> Google (Student)
            </button>
            <button onClick={()=>handleGoogle("Instructor")} className="flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-slate-300 text-sm">
              <i className="fab fa-google text-blue-500"></i> Google (Instructor)
            </button>
            <button 
              onClick={() => navigate("/phone-verification")}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-all font-bold text-slate-300 text-sm"
            >
              <i className="fas fa-phone text-green-500"></i> Phone
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-400 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#00B4D8] font-bold hover:underline transition-all">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
