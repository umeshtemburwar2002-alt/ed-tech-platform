
import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-hot-toast";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to fetch tickets");
        return;
      }

      setTickets(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Support Tickets</h1>
            <p className="text-gray-400">View and manage your support requests</p>
          </div>
          <button
            onClick={fetchTickets}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 bg-[#0f172a] border border-gray-800 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">No tickets yet</h2>
            <p className="text-gray-400 mb-6">Create your first support ticket if you need help!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold">{ticket.ticket_id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusBadgeColor(ticket.status)}`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityBadgeColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{ticket.subject}</h3>
                    <p className="text-gray-400 mb-4">
                      Category: {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </p>
                    <p className="text-gray-300">{ticket.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-2">
                      Created: {new Date(ticket.created_at).toLocaleString()}
                    </p>
                    {ticket.attachment_url && (
                      <p className="text-cyan-400 text-sm">📎 Attachment included</p>
                    )}
                  </div>
                </div>
                {ticket.admin_note && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">Admin Note:</h4>
                    <p className="text-gray-300">{ticket.admin_note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
