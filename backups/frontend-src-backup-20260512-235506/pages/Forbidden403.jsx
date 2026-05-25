import React from "react"
import { Link } from "react-router-dom"

export default function Forbidden403() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000814] text-white px-6">
      <div className="max-w-lg w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
        <div className="text-6xl font-black text-yellow-400">403</div>
        <h1 className="mt-4 text-3xl font-bold">Forbidden</h1>
        <p className="mt-3 text-richblack-300">You don’t have permission to access this area.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/" className="px-6 py-3 rounded-xl bg-yellow-400 text-richblack-900 font-bold">Home</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl border border-white/15 bg-white/10 font-bold">Login</Link>
        </div>
      </div>
    </div>
  )
}
