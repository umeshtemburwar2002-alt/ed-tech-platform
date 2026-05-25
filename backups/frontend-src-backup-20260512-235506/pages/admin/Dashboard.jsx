import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await apiConnector("GET", adminEndpoints.OVERVIEW)
        if (!mounted) return
        setStats(res.data.data)
        setRecent(res.data.recent || [])
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Overview</h1>
        <Link to="/admin/reports" className="px-5 py-2 rounded-xl bg-yellow-400 text-black font-bold">Reports</Link>
      </div>
      {loading ? (
        <div className="mt-10 text-richblack-300">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Stat title="Students" value={stats?.students || 0} />
            <Stat title="Instructors" value={stats?.instructors || 0} />
            <Stat title="Courses" value={stats?.courses || 0} />
            <Stat title="Revenue" value={`₹${(stats?.revenue||0).toLocaleString()}`} />
          </div>
          <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="text-lg font-semibold mb-4">Recent Activity</div>
            <div className="grid gap-3">
              {recent.map((r,i)=>(
                <div key={i} className="flex items-center justify-between text-sm bg-white/5 rounded-xl p-3">
                  <span className="text-blue-100">{r.message}</span>
                  <span className="text-richblack-400">{new Date(r.time).toLocaleString()}</span>
                </div>
              ))}
              {recent.length===0 && <div className="text-sm text-richblack-400">No recent activity</div>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-2xl">
      <div className="text-sm text-blue-100">{title}</div>
      <div className="mt-2 text-3xl font-extrabold">{value}</div>
    </div>
  )
}
