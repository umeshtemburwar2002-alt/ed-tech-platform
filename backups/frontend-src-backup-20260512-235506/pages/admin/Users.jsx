import React, { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

export default function AdminUsers() {
  const [role, setRole] = useState("all")
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async (r = role) => {
    setLoading(true)
    const res = await apiConnector("GET", `${adminEndpoints.USERS}?role=${r}`)
    setRows(res.data.users || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggleBan = async (id) => {
    await apiConnector("PATCH", adminEndpoints.BAN_USER.replace(":id", id))
    load()
  }
  const remove = async (id) => {
    await apiConnector("DELETE", adminEndpoints.DELETE_USER.replace(":id", id))
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center gap-3">
          <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2" value={role} onChange={(e)=>{setRole(e.target.value);load(e.target.value)}}>
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-sm">Name</th>
              <th className="px-4 py-3 text-sm">Email</th>
              <th className="px-4 py-3 text-sm">Role</th>
              <th className="px-4 py-3 text-sm">Status</th>
              <th className="px-4 py-3 text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-6 text-sm text-richblack-300" colSpan="5">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-6 text-sm text-richblack-300" colSpan="5">No users</td></tr>
            ) : rows.map(u=>(
              <tr key={u.id} className="border-t border-white/10">
                <td className="px-4 py-3">{u.name || "-"}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3">{u.banned ? "Banned" : "Active"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={()=>toggleBan(u.id)} className="px-3 py-2 rounded-lg bg-yellow-400 text-black text-sm">{u.banned ? "Unban" : "Ban"}</button>
                    <button onClick={()=>remove(u.id)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
