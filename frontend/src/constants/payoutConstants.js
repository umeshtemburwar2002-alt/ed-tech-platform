export const PROVIDERS = {
  STRIPE: "stripe",
  RAZORPAY: "razorpay",
  BANK_TRANSFER: "bank_transfer",
};

export const METHODS = {
  UPI: "upi",
  BANK: "bank_account",
  CARD: "debit_card",
};

export const PROVIDER_CONFIG = {
  [PROVIDERS.STRIPE]: {
    label: "Stripe",
    icon: "⚡",
    description: "Global payouts",
    gradient: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/60",
    shadow: "shadow-indigo-500/20",
    methods: [METHODS.BANK, METHODS.CARD],
    currency: ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY"],
    recommended: true,
  },
  [PROVIDERS.RAZORPAY]: {
    label: "Razorpay",
    icon: "₹",
    description: "India instant payouts",
    gradient: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/60",
    shadow: "shadow-orange-500/20",
    methods: [METHODS.UPI, METHODS.BANK, METHODS.CARD],
    currency: ["INR"],
  },
  [PROVIDERS.BANK_TRANSFER]: {
    label: "Bank Transfer",
    icon: "🏦",
    description: "3–5 business days",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/60",
    shadow: "shadow-emerald-500/20",
    methods: [METHODS.BANK],
    currency: ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY"],
  },
};

export const METHOD_CONFIG = {
  [METHODS.UPI]: {
    label: "UPI",
    icon: "📱",
    placeholder: "yourname@upi",
  },
  [METHODS.BANK]: {
    label: "Bank Account",
    icon: "🏦",
    placeholder: "Account Number",
  },
  [METHODS.CARD]: {
    label: "Debit Card",
    icon: "💳",
    placeholder: "Card Number",
  },
};

export const TAX_FORM_STATUS = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const TAX_STATUS_LABELS = {
  [TAX_FORM_STATUS.NOT_STARTED]: "Not Submitted",
  [TAX_FORM_STATUS.IN_PROGRESS]: "In Progress",
  [TAX_FORM_STATUS.SUBMITTED]: "Submitted",
  [TAX_FORM_STATUS.APPROVED]: "Approved ✓",
  [TAX_FORM_STATUS.REJECTED]: "Rejected",
};

export const TAX_STATUS_CLASSES = {
  [TAX_FORM_STATUS.NOT_STARTED]: "bg-slate-500/15 border-slate-500/30 text-slate-400",
  [TAX_FORM_STATUS.IN_PROGRESS]: "bg-amber-500/15 border-amber-500/30 text-amber-400",
  [TAX_FORM_STATUS.SUBMITTED]: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
  [TAX_FORM_STATUS.APPROVED]: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  [TAX_FORM_STATUS.REJECTED]: "bg-red-500/15 border-red-500/30 text-red-400",
};

export const getPayoutSpeed = (provider) => {
  switch (provider) {
    case PROVIDERS.RAZORPAY:
      return "Instant";
    case PROVIDERS.STRIPE:
      return "2-3 days";
    case PROVIDERS.BANK_TRANSFER:
      return "3-5 days";
    default:
      return "3-5 days";
  }
};
