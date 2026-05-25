const supabase = require("../config/supabase");

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            accountType,
            contactNumber,
        } = req.body;

        if (!firstName || !lastName || !email || !password || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Normalize accountType to correct capitalization
        let normalizedAccountType = accountType.toLowerCase();
        if (normalizedAccountType === "teacher" || normalizedAccountType === "instructor") normalizedAccountType = "Instructor";
        else if (normalizedAccountType === "admin") normalizedAccountType = "Admin";
        else normalizedAccountType = "Student";

        // 1. Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName,
                    accountType: normalizedAccountType,
                }
            }
        });

        if (authError) throw authError;

        // 2. Create profile in public.profiles
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
                id: authData.user.id,
                first_name: firstName,
                last_name: lastName,
                email,
                account_type: normalizedAccountType,
                contact_number: contactNumber,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            }]);

        if (profileError) throw profileError;

        return res.status(200).json({
            success: true,
            message: "User registered successfully. Please check your email for verification.",
            user: authData.user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "User cannot be registered. Please try again.",
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 1. Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        // 2. Fetch profile details
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) throw profileError;

        const token = data.session.access_token;
        const user = { ...profile, token };

        // Create cookie and send response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Login failure, please try again",
        });
    }
};

// Send OTP (Optional with Supabase - can use built-in email verification or phone auth)
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "OTP/Magic Link sent successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Change Password (authenticated user)
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // req.user is populated by the auth middleware
        const { email } = req.user;

        // 1. Verify old password by attempting sign-in
        const { error: verifyError } = await supabase.auth.signInWithPassword({
            email,
            password: oldPassword,
        });

        if (verifyError) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // 2. Update password using the user's own session token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        const { error: updateError } = await supabase.auth.updateUser(
            { password: newPassword },
            { accessToken: token }
        );

        if (updateError) throw updateError;

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("changePassword error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update password. Please try again.",
        });
    }
};

