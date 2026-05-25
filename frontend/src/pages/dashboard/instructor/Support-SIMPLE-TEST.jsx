import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { supabase } from '../../../config/supabaseClient';

const InstructorSupportSimpleTest = () => {
  const { user } = useSelector(s => s.profile);
  const [userData, setUserData] = useState(null);
  
  // EXACT state from your instructions
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [course_name, setCourseName] = useState("");
  const [priority, setPriority] = useState("medium");
  const [message, setMessage] = useState("");
  const [attachment_url, setAttachmentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setUserData(data);
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        toast.error("User not logged in");
        return;
      }

      // EXACT insert from your instructions
      const { data, error } = await supabase
        .from("instructor_support_tickets")
        .insert([
          {
            instructor_id: authUser.id,
            name: `${userData?.firstName} ${userData?.lastName}`,
            email: userData?.email,
            subject,
            category,
            course_name,
            priority,
            message,
            attachment_url,
          },
        ])
        .select();

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error('Supabase insert error:', error);
        toast.error("Ticket submission failed");
        return;
      }

      toast.success("Support ticket submitted successfully!");
      setSubject("");
      setCategory("");
      setCourseName("");
      setPriority("medium");
      setMessage("");
      setAttachmentUrl(null);

    } catch (error) {
      console.error('Ticket submission error:', error);
      toast.error("Ticket submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Instructor Support - SIMPLE TEST</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Subject <span className="text-red-400">*</span></label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            placeholder="Enter subject"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            placeholder="Enter category"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Course Name</label>
          <input
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            placeholder="Enter course name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Message <span className="text-red-400">*</span></label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white"
            placeholder="Enter message"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-4 rounded-xl"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      <div className="mt-8 p-4 bg-gray-900 rounded-xl">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>User Data: {JSON.stringify(userData)}</p>
        <p>Subject: {subject}</p>
        <p>Message: {message}</p>
      </div>
    </div>
  );
};

export default InstructorSupportSimpleTest;
