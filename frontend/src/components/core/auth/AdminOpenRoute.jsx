import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function AdminOpenRoute({ children }) {
  const { user } = useSelector((s) => s.profile)
  if (user && user.accountType === "Admin") return <Navigate to="/admin/dashboard" />
  if (user && user.accountType !== "Admin") return <Navigate to="/403" />
  return children
}
