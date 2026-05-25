const supabase = require("../config/supabase");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        const { data, error } = await supabase
            .from('categories')
            .insert([{ name, description }])
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) throw error;

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        
        // 1. Get courses for the specified category
        const { data: selectedCategory, error: catError } = await supabase
            .from('categories')
            .select('*, courses(*, ratings_reviews(*))')
            .eq('id', categoryId)
            .single();

        if (catError || !selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // 2. Get top selling courses (dummy logic for now)
        const { data: mostSellingCourses } = await supabase
            .from('courses')
            .select('*, instructor:instructor_id(*)')
            .eq('status', 'Published')
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
