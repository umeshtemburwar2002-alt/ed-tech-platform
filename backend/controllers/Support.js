const supabase = require("../config/supabase");

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VALID_STATUSES   = ["open", "pending", "in_progress", "resolved", "closed"];
const VALID_PRIORITIES = ["low", "medium", "high", "urgent"];

// ─── Create Ticket ─────────────────────────────────────────────────────────────

exports.createTicket = async (req, res) => {
    try {
        const { subject, category, message, priority = "medium", attachment_url = null } = req.body;

        if (!subject || !category || !message) {
            return res.status(400).json({ success: false, message: "subject, category, and message are required" });
        }

        const userId   = req.user?.id   ?? null;
        const userRole = req.user?.accountType?.toLowerCase() ?? "guest";

        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .insert([{
                user_id:        userId,
                role:           userRole,
                subject:        subject.trim(),
                category:       category.trim(),
                message:        message.trim(),
                status:         "open",
                priority:       VALID_PRIORITIES.includes(priority.toLowerCase()) ? priority.toLowerCase() : "medium",
                attachment_url: attachment_url ?? null,
            }])
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            message: "Support ticket created successfully",
            data: ticket,
        });
    } catch (error) {
        console.error("[createTicket]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── Get My Tickets (authenticated user) ──────────────────────────────────────

exports.getMyTickets = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, priority, search } = req.query;

        let query = supabase
            .from("support_tickets")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (status   && VALID_STATUSES.includes(status.toLowerCase()))   query = query.eq("status",   status.toLowerCase());
        if (priority && VALID_PRIORITIES.includes(priority.toLowerCase())) query = query.eq("priority", priority.toLowerCase());
        if (search)  query = query.ilike("subject", `%${search}%`);

        const { data: tickets, error } = await query;
        if (error) throw error;

        return res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        console.error("[getMyTickets]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── Get Single Ticket ─────────────────────────────────────────────────────────

exports.getTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const userId = req.user.id;

        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .select("*")
            .eq("id", ticketId)
            .eq("user_id", userId) // users can only read their own tickets
            .maybeSingle();

        if (error) throw error;
        if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

        return res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        console.error("[getTicket]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── Guest Contact (no auth required) ─────────────────────────────────────────

exports.guestContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .insert([{
                user_id:  null,
                role:     "guest",
                subject:  `[${subject}] ${name} <${email}>`,
                category: subject,
                message:  message.trim(),
                status:   "open",
                priority: "low",
            }])
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json({
            success: true,
            message: "Message received! We'll get back to you within 24 hours.",
            ticketId: ticket.id,
        });
    } catch (error) {
        console.error("[guestContact]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── Upload Attachment (returns public URL) ────────────────────────────────────

exports.uploadAttachment = async (req, res) => {
    try {
        if (!req.files?.attachment) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const file     = req.files.attachment;
        const maxBytes = 5 * 1024 * 1024; // 5 MB

        if (file.size > maxBytes) {
            return res.status(400).json({ success: false, message: "File must be under 5 MB" });
        }

        const ext      = file.name.split(".").pop().toLowerCase();
        const allowed  = ["jpg", "jpeg", "png", "gif", "webp", "pdf"];
        if (!allowed.includes(ext)) {
            return res.status(400).json({ success: false, message: `File type .${ext} not allowed` });
        }

        const fileName = `support/${req.user.id}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

        const { error: uploadError } = await supabase.storage
            .from("support-attachments")
            .upload(fileName, file.data, {
                contentType:  file.mimetype,
                cacheControl: "3600",
                upsert:       false,
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from("support-attachments")
            .getPublicUrl(fileName);

        return res.status(200).json({ success: true, url: publicUrl });
    } catch (error) {
        console.error("[uploadAttachment]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── ADMIN: Get All Tickets ────────────────────────────────────────────────────

exports.adminGetAllTickets = async (req, res) => {
    try {
        const { status, priority, role, search, page = 1, limit = 20 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let query = supabase
            .from("support_tickets")
            .select("*, profile:user_id(first_name, last_name, email)", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(offset, offset + Number(limit) - 1);

        if (status   && VALID_STATUSES.includes(status.toLowerCase()))   query = query.eq("status",   status.toLowerCase());
        if (priority && VALID_PRIORITIES.includes(priority.toLowerCase())) query = query.eq("priority", priority.toLowerCase());
        if (role)    query = query.eq("role", role.toLowerCase());
        if (search)  query = query.ilike("subject", `%${search}%`);

        const { data: tickets, error, count } = await query;
        if (error) throw error;

        return res.status(200).json({ success: true, data: tickets, total: count });
    } catch (error) {
        console.error("[adminGetAllTickets]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ─── ADMIN: Update Ticket Status ───────────────────────────────────────────────

exports.adminUpdateTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status, priority, admin_note } = req.body;

        const patch = { updated_at: new Date().toISOString() };
        if (status   && VALID_STATUSES.includes(status.toLowerCase()))   patch.status   = status.toLowerCase();
        if (priority && VALID_PRIORITIES.includes(priority.toLowerCase())) patch.priority = priority.toLowerCase();
        if (admin_note !== undefined) patch.admin_note = admin_note;

        const { data: ticket, error } = await supabase
            .from("support_tickets")
            .update(patch)
            .eq("id", ticketId)
            .select()
            .single();

        if (error) throw error;

        return res.status(200).json({ success: true, data: ticket, message: "Ticket updated" });
    } catch (error) {
        console.error("[adminUpdateTicket]", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
