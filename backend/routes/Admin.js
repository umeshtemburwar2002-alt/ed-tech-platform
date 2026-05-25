const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { 
    getAdminStats, 
    getAdminCourses, 
    approveCourse, 
    editCourseAdmin, 
    deleteCourseAdmin 
} = require("../controllers/Admin");

router.get("/overview", auth, isAdmin, getAdminStats);
router.get("/courses", auth, isAdmin, getAdminCourses);
router.patch("/approve-course/:id", auth, isAdmin, approveCourse);
router.patch("/edit-course/:id", auth, isAdmin, editCourseAdmin);
router.delete("/delete-course/:id", auth, isAdmin, deleteCourseAdmin);

module.exports = router;
