import React, { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

export default function AdminReports() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await apiConnector("GET", adminEndpoints.REPORTS)
      setData(res.data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold">Reports</h1>
      {loading ? (
        <div className="mt-6 text-sm text-richblack-300">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card title="Enrollments" value={data.enrollments} />
            <Card title="Revenue (₹)" value={data.revenue} />
            <Card title="Active Students" value={data.activeStudents} />
          </div>
          <div className="mt-8 bg-white/5 rounded-2xl border border-white/10 p-6">
            <div className="text-lg font-semibold mb-2">Top Courses</div>
            <div className="grid gap-2">
              {data.topCourses.map((c)=>(
                <div key={c.id} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                  <span className="text-sm">{c.title}</span>
                  <span className="text-sm text-yellow-400">{c.enrollments}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-2xl">
      <div className="text-sm text-blue-100">{title}</div>
      <div className="mt-2 text-3xl font-extrabold">{Number(value).toLocaleString()}</div>
    </div>
  )
}
