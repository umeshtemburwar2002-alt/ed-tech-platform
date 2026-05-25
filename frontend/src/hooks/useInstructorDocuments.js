import { useState } from "react";
import { supabase } from "../config/supabaseClient";
import toast from "react-hot-toast";

export const DOC_TYPE_MAP = {
  id_proof: "id",
  qualification: "qualification_certificate",
  resume: "resume",
  portfolio: "portfolio",
};

export const REVERSE_DOC_TYPE_MAP = {
  id: "id_proof",
  qualification_certificate: "qualification",
  resume: "resume",
  portfolio: "portfolio",
};

const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const useInstructorDocuments = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file) => {
    if (!file) throw new Error("No file selected");
    if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type. Use PDF, PNG, JPG, or WEBP.");
    if (file.size > MAX_FILE_SIZE) throw new Error("File too large. Max 10MB.");
    return true;
  };

  const uploadDocument = async ({ file, docTypeKey, user }) => {
    try {
      validateFile(file);
      
      const docType = DOC_TYPE_MAP[docTypeKey] || docTypeKey;
      const fileExt = file.name.split(".").pop();
      const fileName = `${docType}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      setUploading(true);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + Math.random() * 25, 90));
      }, 300);

      const { data: storageData, error: storageError } = await supabase.storage
        .from("instructor-documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (storageError) throw storageError;

      const { data: dbData, error: dbError } = await supabase
        .from("instructor_documents")
        .insert([
          {
            user_id: user.id,
            doc_type: docType,
            storage_bucket: "instructor-documents",
            storage_object: filePath,
            original_filename: file.name,
            mime_type: file.type,
            file_size_bytes: file.size,
            status: "uploaded",
          },
        ]);

      if (dbError) throw dbError;

      toast.success("Document uploaded successfully! 🎉");
      return { storageData, dbData, filePath };
    } catch (error) {
      console.error("[useInstructorDocuments] Upload failed:", error);
      toast.error(error.message || "Failed to upload document");
      throw error;
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const fetchInstructorDocuments = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("instructor_documents")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[useInstructorDocuments] Fetch failed:", error);
      return [];
    }
  };

  return {
    uploading,
    uploadProgress,
    uploadDocument,
    fetchInstructorDocuments,
  };
};
