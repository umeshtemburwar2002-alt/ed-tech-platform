const supabase = require("../config/supabase");

exports.getAdminStats = async (req, res) => {
    try {
        const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('account_type', 'Student');
        const { count: instructorCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('account_type', 'Instructor');
        const { count: courseCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });

        const { data: courses } = await supabase.from('courses').select('price, enrollments(count)');
        
        let totalRevenue = 0;
        courses?.forEach(course => {
            const enrollCount = course.enrollments[0]?.count || 0;
            totalRevenue += (course.price * enrollCount);
        });

        const { data: recentUsers } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5);
        const { data: recentCourses } = await supabase.from('courses').select('*').order('created_at', { ascending: false }).limit(5);

        const recent = [
            ...(recentUsers?.map(u => ({ message: `New user registered: ${u.first_name} ${u.last_name}`, time: u.created_at })) || []),
            ...(recentCourses?.map(c => ({ message: `New course created: ${c.course_name}`, time: c.created_at })) || [])
        ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

        res.status(200).json({
            success: true,
            data: {
                students: studentCount || 0,
                instructors: instructorCount || 0,
                courses: courseCount || 0,
                revenue: totalRevenue
            },
            recent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch admin stats" });
    }
};

exports.getAdminCourses = async (req, res) => {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*, instructor:instructor_id(first_name, last_name)')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedCourses = courses.map(c => ({
            id: c.id,
            title: c.course_name,
            instructor: c.instructor ? `${c.instructor.first_name} ${c.instructor.last_name}` : "Unknown",
            status: c.status
        }));

        res.status(200).json({ success: true, courses: formattedCourses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
};

exports.approveCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('courses').update({ status: "Published" }).eq('id', id);
        if (error) throw error;
        res.status(200).json({ success: true, message: "Course approved" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to approve course" });
    }
};

exports.editCourseAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const { error } = await supabase.from('courses').update({ course_name: title }).eq('id', id);
        if (error) throw error;
        res.status(200).json({ success: true, message: "Course updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update course" });
    }
};

exports.deleteCourseAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (error) throw error;
        res.status(200).json({ success: true, message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete course" });
    }
};
