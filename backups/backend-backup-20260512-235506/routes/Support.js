const express = require("express");
const router  = express.Router();

const {
    createTicket,
    getMyTickets,
    getTicket,
    guestContact,
    uploadAttachment,
    adminGetAllTickets,
    adminUpdateTicket,
} = require("../controllers/Support");

const { auth, isAdmin } = require("../middleware/auth");

// ─── Public (no auth required) ────────────────────────────────────────────────
// Guest contact form submission
router.post("/contact", guestContact);

// ─── Authenticated users (student / instructor) ───────────────────────────────
// Create a ticket
router.post("/tickets", auth, createTicket);

// Get all my tickets (supports ?status= ?priority= ?search= filters)
router.get("/tickets", auth, getMyTickets);

// Get single ticket by ID
router.get("/tickets/:ticketId", auth, getTicket);

// Upload attachment — returns { url }
router.post("/tickets/upload", auth, uploadAttachment);

// ─── Admin only ───────────────────────────────────────────────────────────────
// View all tickets with filters
router.get("/admin/tickets", auth, isAdmin, adminGetAllTickets);

// Update ticket status / priority / admin_note
router.patch("/admin/tickets/:ticketId", auth, isAdmin, adminUpdateTicket);

module.exports = router;
