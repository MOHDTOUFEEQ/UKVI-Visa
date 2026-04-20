export const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir","Ladakh","Puducherry","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep","Andaman and Nicobar Islands",
];

export const EDU_BOARDS = ["CBSE","ICSE","State Board","IB (International Baccalaureate)","NIOS","UGC University","AICTE Institution","Other"];

export const ENGLISH_TESTS = ["IELTS UKVI","PTE Academic UKVI","TOEFL iBT","Duolingo English Test","MOI (exempt via CAS)"];

export const calcMaintenance = (location: "london" | "outside-london", months: number) => {
  const cap = Math.min(months, 9);
  const rate = location === "london" ? 1334 : 1023;
  return cap * rate;
};

export const IHS_RATE_PER_YEAR = 776;
export const VISA_FEE = 524;

export const calcIHS = (months: number) => {
  // UKVI rule: half-year rounding. We approximate: round up to nearest 6 months.
  const halves = Math.ceil(months / 6);
  return halves * (IHS_RATE_PER_YEAR / 2);
};

// Validators
export const validators = {
  passport: (v: string) => /^[A-Z][0-9]{7}$/.test(v.toUpperCase()) || "Indian passport: 1 letter + 7 digits (8 characters total).",
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Please enter a valid email address.",
  phoneIndia: (v: string) => /^[6-9][0-9]{9}$/.test(v.replace(/\s+/g, "")) || "Indian mobile: 10 digits starting with 6, 7, 8 or 9.",
  pincode: (v: string) => /^[1-9][0-9]{5}$/.test(v) || "Indian PIN code: 6 digits.",
  required: (v: string) => v.trim().length > 0 || "This field is required.",
  cas: (v: string) => /^[A-Z0-9]{14,18}$/i.test(v) || "CAS number is usually 14–18 letters/digits (from your university).",
};
