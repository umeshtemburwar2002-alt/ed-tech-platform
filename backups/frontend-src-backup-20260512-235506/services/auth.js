export const authService = {
    // Register a new user
    register: async (email, password, displayName) => {
        console.log("Mock Register:", email);
        return { id: 'dummy-id', email, user_metadata: { display_name: displayName } };
    },

    // Register without sending verification
    registerWithOtpFlow: async (email, password, displayName) => {
        console.log("Mock Register OTP:", email);
        return { id: 'dummy-id', email, user_metadata: { display_name: displayName } };
    },

    // Login user
    login: async (email, password, accountType = "Student") => {
        console.log("Mock Login:", email);
        return {
            id: 'dummy-id-' + Date.now(),
            uid: 'dummy-id',
            email: email,
            user_metadata: {
                display_name: email.split('@')[0],
                first_name: email.split('@')[0],
                role: accountType.toLowerCase()
            },
            displayName: email.split('@')[0],
            photoURL: `https://api.dicebear.com/5.x/initials/svg?seed=${email}`,
            accountType: accountType || "Student",
        };
    },

    // Logout user
    logout: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        console.log("Mock Logout");
    },

    // Reset password
    resetPassword: async (email) => {
        console.log("Mock Reset Password:", email);
    },

    // Google Sign In
    signInWithGoogle: async (accountType = "Student") => {
        console.log("Mock Google Sign In");
        return { user: { id: 'google-dummy-id', email: 'google-user@example.com' } };
    },
    
    // Delete User Account
    deleteUserAccount: async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log("Mock Account Deletion");
        return { success: true };
    },
};
