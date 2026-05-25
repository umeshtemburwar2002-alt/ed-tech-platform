const supabase = require("../config/supabase");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../utils/courseEnrollmentEmail");

// Capture the payment (DUMMY VERSION)
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        try {
            const { data: course, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', course_id)
                .single();

            if (error || !course) {
                return res.status(200).json({ success: false, message: "Could not find the course" });
            }

            const { data: enrollment } = await supabase
                .from('enrollments')
                .select('*')
                .eq('user_id', userId)
                .eq('course_id', course_id)
                .single();

            if (enrollment) {
                return res.status(200).json({ success: false, message: "Student is already enrolled" });
            }

            totalAmount += Number(course.price);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    return res.status(200).json({
        success: true,
        message: "Payment initiated (Dummy)",
        totalAmount,
        currency: "INR",
        orderId: "dummy_order_" + Date.now()
    });
};

// Verify the payment (DUMMY VERSION)
exports.verifyPayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Payment Failed" });
    }

    await enrollStudents(courses, userId, res);
};

// Send Payment Success Email (DUMMY)
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { amount, orderId, paymentId } = req.body;
    const userId = req.user.id;

    if (!amount || !orderId || !paymentId || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        const { data: profile } = await supabase.from('profiles').select('email').eq('id', userId).single();
        if (profile) {
            await mailSender(
                profile.email,
                `Payment Received`,
                `Payment Successful for order ${orderId}. Amount: ${amount}`
            );
        }
        return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.log("error in sending mail", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
};

// Helper to enroll students
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide data for Courses or UserId" });
    }

    for (const courseId of courses) {
        try {
            // 1. Create Enrollment
            const { error: enrollError } = await supabase
                .from('enrollments')
                .insert([{ user_id: userId, course_id: courseId }]);

            if (enrollError) throw enrollError;

            // 2. Create Course Progress
            const { error: progressError } = await supabase
                .from('course_progress')
                .insert([{ user_id: userId, course_id: courseId, completed_videos: [] }]);

            if (progressError) throw progressError;

            // 3. Send email
            const { data: course } = await supabase.from('courses').select('course_name').eq('id', courseId).single();
            const { data: profile } = await supabase.from('profiles').select('first_name, email').eq('id', userId).single();

            if (course && profile) {
                await mailSender(
                    profile.email,
                    `Successfully Enrolled into ${course.course_name}`,
                    courseEnrollmentEmail(course.course_name, `${profile.first_name}`)
                );
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    return res.status(200).json({ success: true, message: "Enrolled Successfully" });
};
