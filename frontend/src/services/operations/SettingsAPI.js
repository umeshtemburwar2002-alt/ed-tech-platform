// ============================================================
// MOCK-ONLY: No backend connected. Settings update locally only.
// ============================================================
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    toast.success("Display picture updated! (Demo mode)");
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    toast.success("Profile updated successfully! (Demo mode)");
  };
}

export async function changePassword(token, formData) {
  toast.success("Password changed successfully! (Demo mode)");
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    toast.success("Account deleted! (Demo mode)");
    navigate("/");
  };
}