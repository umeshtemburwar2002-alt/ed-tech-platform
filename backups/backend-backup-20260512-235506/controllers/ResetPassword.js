const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const supabaseAdmin = require("../config/supabaseAdmin");

/** In-memory reset tokens (lost on server restart). For production, persist in DB. */
const pendingResets = new Map();

exports.resetPasswordToken = async (req, res) => {
    try {
        if (!supabaseAdmin) {
            return res.status(500).json({
                success: false,
                message: "Server is not configured for password reset",
            });
        }

        const email = req.body.email;
        const { data: profile, error } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (error) throw error;
        if (!profile) {
            return res.json({
                success: false,
                message: "Your Email is not registered with us",
            });
        }

        const token = crypto.randomUUID();
        pendingResets.set(token, {
            userId: profile.id,
            expires: Date.now() + 5 * 60 * 1000,
        });

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(
            email,
            "Password Reset Link",
            `Password Reset Link: ${url}`
        );
        return res.json({
            success: true,
            message:
                "Email sent successfully, please check email and change password",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password mail",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        if (!supabaseAdmin) {
            return res.status(500).json({
                success: false,
                message: "Server is not configured for password reset",
            });
        }

        const { password, confirmPassword, token } = req.body;
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password not matching",
            });
        }

        const entry = pendingResets.get(token);
        if (!entry) {
            return res.json({
                success: false,
                message: "Token is invalid",
            });
        }
        if (entry.expires < Date.now()) {
            pendingResets.delete(token);
            return res.json({
                success: false,
                message: "Token is expired, please regenerate your token",
            });
        }

        const { error } = await supabaseAdmin.auth.admin.updateUserById(
            entry.userId,
            { password }
        );
        if (error) throw error;

        pendingResets.delete(token);
        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password",
        });
    }
};
