import React, { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaSignOutAlt, FaCog } from "react-icons/fa"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const userImage =
    user.image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
      `${user.firstName || ""} ${user.lastName || ""}`
    )}`

  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-richblack-800 px-2 py-1 hover:bg-richblack-700 transition"
      >
        <img
          src={userImage}
          alt="profile"
          className="h-8 w-8 rounded-full object-cover border border-richblack-600"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-richblack-700 bg-richblack-800 shadow-2xl"
          >
            <div className="flex items-center gap-3 p-4 border-b border-richblack-700 bg-richblack-900/40">
              <img
                src={userImage}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border border-richblack-600"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-richblack-5 truncate">
                  {(user.firstName || "") + " " + (user.lastName || "")}
                </div>
                <div className="text-xs text-richblack-300 truncate">{user.email}</div>
              </div>
            </div>

            <div className="p-2">
              <Link
                to="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-richblack-25 hover:bg-richblack-700"
              >
                <FaCog className="text-yellow-50" />
                <span>Settings</span>
              </Link>
            </div>

            <div className="p-2 border-t border-richblack-700">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-pink-200 hover:bg-richblack-700"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileDropDown
