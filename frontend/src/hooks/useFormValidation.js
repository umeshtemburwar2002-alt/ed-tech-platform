export const useFormValidation = () => {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const validateUPI = (upi) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validateIFSC = (ifsc) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  };

  const validateAccountNumber = (accountNumber) => {
    return accountNumber.length >= 9 && accountNumber.length <= 18;
  };

  const validateStep1 = (data) => {
    const errors = {};

    if (!data.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!data.headline?.trim()) {
      errors.headline = "Headline is required";
    }

    if (!data.bio?.trim()) {
      errors.bio = "Bio is required";
    }

    if (!data.profilePhoto) {
      errors.profilePhoto = "Profile photo is required";
    }

    if (!data.country) {
      errors.country = "Country is required";
    }

    if (!data.city?.trim()) {
      errors.city = "City is required";
    }

    if (!data.languages || data.languages.length === 0) {
      errors.languages = "Select at least one language";
    }

    return errors;
  };

  const validateStep2 = (data) => {
    const errors = {};

    if (!data.skills || data.skills.length === 0) {
      errors.skills = "Add at least one skill";
    }

    if (!data.experienceYears || data.experienceYears < 0) {
      errors.experienceYears = "Experience years is required";
    }

    if (!data.profession?.trim()) {
      errors.profession = "Profession is required";
    }

    if (data.portfolioWebsite && !validateUrl(data.portfolioWebsite)) {
      errors.portfolioWebsite = "Invalid portfolio website URL";
    }

    if (data.linkedinUrl && !validateUrl(data.linkedinUrl)) {
      errors.linkedinUrl = "Invalid LinkedIn URL";
    }

    if (data.githubUrl && !validateUrl(data.githubUrl)) {
      errors.githubUrl = "Invalid GitHub URL";
    }

    if (data.youtubeUrl && !validateUrl(data.youtubeUrl)) {
      errors.youtubeUrl = "Invalid YouTube URL";
    }

    return errors;
  };

  const validateStep3 = (data) => {
    const errors = {};

    if (!data.teachingCategories || data.teachingCategories.length === 0) {
      errors.teachingCategories = "Select at least one teaching category";
    }

    if (!data.courseLanguage) {
      errors.courseLanguage = "Course language is required";
    }

    if (!data.teachingExperienceYears || data.teachingExperienceYears < 0) {
      errors.teachingExperienceYears = "Teaching experience is required";
    }

    return errors;
  };

  const validateStep4 = (data) => {
    const errors = {};

    if (!data.governmentId) {
      errors.governmentId = "Government ID is required";
    }

    if (!data.phoneNumber?.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    return errors;
  };

  const validateStep5 = (data) => {
    const errors = {};

    const hasPaymentMethod =
      data.bankAccountNumber ||
      data.upiId ||
      data.paypalEmail;

    if (!hasPaymentMethod) {
      errors.payment = "Add at least one payment method";
    }

    if (data.bankAccountNumber && !validateAccountNumber(data.bankAccountNumber)) {
      errors.bankAccountNumber = "Invalid account number";
    }

    if (data.bankIfscCode && !validateIFSC(data.bankIfscCode)) {
      errors.bankIfscCode = "Invalid IFSC code";
    }

    if (data.upiId && !validateUPI(data.upiId)) {
      errors.upiId = "Invalid UPI ID";
    }

    if (data.gstNumber && !validateGST(data.gstNumber)) {
      errors.gstNumber = "Invalid GST number";
    }

    return errors;
  };

  return {
    validateEmail,
    validateUrl,
    validatePhoneNumber,
    validateUPI,
    validateGST,
    validateIFSC,
    validateAccountNumber,
    validateStep1,
    validateStep2,
    validateStep3,
    validateStep4,
    validateStep5,
  };
};
