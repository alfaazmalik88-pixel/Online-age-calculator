import { useState, useRef, useMemo } from "react";
import {
  Calendar,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  Cake,
  CalendarDays,
  XCircle,
  Award,
  ChevronRight,
  Info,
  MessageCircle,
  Share2,
  Target,
  Flame,
  TrendingUp,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  FileText,
  Download,
} from "lucide-react";
import FaqSection from "./components/FaqSection";
import SeoGuide from "./components/SeoGuide";
import LegalModals, { LegalModalType } from "./components/LegalModals";
import EligibilitySlipModal from "./components/EligibilitySlipModal";

export type CategoryType = "GEN" | "OBC" | "SC_ST" | "PWD" | "EWS";

interface CategoryOption {
  id: CategoryType;
  label: string;
  nameHindi: string;
  reliefYears: number;
}

const CATEGORIES: CategoryOption[] = [
  { id: "GEN", label: "General / UR", nameHindi: "सामान्य", reliefYears: 0 },
  { id: "OBC", label: "OBC (NCL)", nameHindi: "अन्य पिछड़ा वर्ग (+3 साल)", reliefYears: 3 },
  { id: "SC_ST", label: "SC / ST", nameHindi: "अनुसूचित जाति / जनजाति (+5 साल)", reliefYears: 5 },
  { id: "PWD", label: "PwD / Divyang", nameHindi: "दिव्यांग (+10 साल)", reliefYears: 10 },
  { id: "EWS", label: "EWS", nameHindi: "आर्थिक रूप से कमजोर (0 साल)", reliefYears: 0 },
];

export interface ExamPreset {
  id: string;
  categoryGroup: string;
  name: string;
  label: string;
  minAge: number;
  baseMaxAge: number;
  cutoffDay: string;
  cutoffMonth: string;
  cutoffYear: string;
  badge: string;
  isQuickChip?: boolean;
}

const EXAM_PRESETS: ExamPreset[] = [
  // 1. राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)
  {
    id: "UP_POLICE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "UP Police Constable",
    label: "UP Police Constable (18-25)",
    minAge: 18,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-25 Yrs",
    isQuickChip: true,
  },
  {
    id: "UP_POLICE_SI",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "UP Police SI",
    label: "UP Police Sub-Inspector (SI) (21-28)",
    minAge: 21,
    baseMaxAge: 28,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "21-28 Yrs",
  },
  {
    id: "BIHAR_POLICE_CONSTABLE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "Bihar Police Constable",
    label: "Bihar Police Constable (18-25)",
    minAge: 18,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "18-25 Yrs",
  },
  {
    id: "BIHAR_DAROGA_SI",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "Bihar Daroga (SI)",
    label: "Bihar Daroga / Sub-Inspector (20-37)",
    minAge: 20,
    baseMaxAge: 37,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "20-37 Yrs",
  },
  {
    id: "RAJASTHAN_POLICE_CONSTABLE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "Rajasthan Police Constable",
    label: "Rajasthan Police Constable (18-24)",
    minAge: 18,
    baseMaxAge: 24,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2027",
    badge: "18-24 Yrs",
  },
  {
    id: "MP_POLICE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "MP Police Constable",
    label: "MP Police Constable (18-33)",
    minAge: 18,
    baseMaxAge: 33,
    cutoffDay: "10",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-33 Yrs",
  },
  {
    id: "DELHI_POLICE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "Delhi Police Constable",
    label: "Delhi Police Constable (18-25)",
    minAge: 18,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-25 Yrs",
    isQuickChip: true,
  },
  {
    id: "HARYANA_POLICE_CONSTABLE",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "Haryana Police Constable",
    label: "Haryana Police Constable (18-25)",
    minAge: 18,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "02",
    cutoffYear: "2026",
    badge: "18-25 Yrs",
  },
  {
    id: "UPSSSC_PET",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "UPSSSC PET / लेखपाल / VDO",
    label: "UPSSSC PET / लेखपाल / VDO (18-40)",
    minAge: 18,
    baseMaxAge: 40,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-40 Yrs",
    isQuickChip: true,
  },
  {
    id: "BSSC_INTER",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "BSSC Inter Level (Bihar)",
    label: "BSSC Inter Level (Bihar) (18-37)",
    minAge: 18,
    baseMaxAge: 37,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "18-37 Yrs",
  },
  {
    id: "RSMSSB_CET",
    categoryGroup: "🏛️ राज्य स्तरीय पुलिस एवं सेवाएँ (State Exams)",
    name: "RSMSSB CET / पटवारी (Rajasthan)",
    label: "RSMSSB CET / पटवारी (Rajasthan) (18-40)",
    minAge: 18,
    baseMaxAge: 40,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2026",
    badge: "18-40 Yrs",
  },

  // 2. 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)
  {
    id: "SSC_GD",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "SSC GD",
    label: "SSC GD Constable (18-23)",
    minAge: 18,
    baseMaxAge: 23,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2026",
    badge: "18-23 Yrs",
    isQuickChip: true,
  },
  {
    id: "RAILWAY_RRB",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "Railway (RRB NTPC / Group D)",
    label: "Railway (RRB NTPC / Group D) (18-33)",
    minAge: 18,
    baseMaxAge: 33,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-33 Yrs",
    isQuickChip: true,
  },
  {
    id: "SSC_MTS",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "SSC MTS & Havaldar",
    label: "SSC MTS & Havaldar (18-25)",
    minAge: 18,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "18-25 Yrs",
    isQuickChip: true,
  },
  {
    id: "RPF_CONSTABLE",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "RPF Constable & SI",
    label: "RPF Constable & Sub-Inspector (Railway) (18-28)",
    minAge: 18,
    baseMaxAge: 28,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-28 Yrs",
    isQuickChip: true,
  },
  {
    id: "RRB_ALP",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "RRB ALP & Technician",
    label: "RRB ALP & Technician (18-30)",
    minAge: 18,
    baseMaxAge: 30,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "18-30 Yrs",
  },
  {
    id: "SSC_STENO",
    categoryGroup: "⚡ 10वीं/12वीं स्तर की केंद्रीय परीक्षाएँ (SSC & Railway)",
    name: "SSC Stenographer (Grade C & D)",
    label: "SSC Stenographer (Grade C & D) (18-30)",
    minAge: 18,
    baseMaxAge: 30,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "18-30 Yrs",
  },

  // 3. डिफेंस एवं सेना भर्ती (Armed Forces)
  {
    id: "ARMY_AGNIVEER",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "Army Agniveer",
    label: "Indian Army Agniveer (17.5-21)",
    minAge: 17.5,
    baseMaxAge: 21,
    cutoffDay: "01",
    cutoffMonth: "10",
    cutoffYear: "2026",
    badge: "17.5-21 Yrs",
    isQuickChip: true,
  },
  {
    id: "NAVY_AGNIVEER",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "Indian Navy Agniveer (SSR/MR)",
    label: "Indian Navy Agniveer (SSR / MR) (17.5-21)",
    minAge: 17.5,
    baseMaxAge: 21,
    cutoffDay: "01",
    cutoffMonth: "11",
    cutoffYear: "2026",
    badge: "17.5-21 Yrs",
  },
  {
    id: "AIRFORCE_AGNIVEER",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "Indian Airforce (Agniveer Vayu)",
    label: "Airforce Agniveer (17.5-21)",
    minAge: 17.5,
    baseMaxAge: 21,
    cutoffDay: "01",
    cutoffMonth: "07",
    cutoffYear: "2026",
    badge: "17.5-21 Yrs",
  },
  {
    id: "NDA",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "NDA (National Defence Academy)",
    label: "NDA (National Defence Academy - 12वीं) (16.5-19.5)",
    minAge: 16.5,
    baseMaxAge: 19.5,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2027",
    badge: "16.5-19.5 Yrs",
  },
  {
    id: "CDS",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "CDS (Combined Defence Services)",
    label: "CDS (Combined Defence Services) (19-24)",
    minAge: 19,
    baseMaxAge: 24,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2027",
    badge: "19-24 Yrs",
  },
  {
    id: "AFCAT",
    categoryGroup: "🎖️ डिफेंस एवं सेना भर्ती (Armed Forces)",
    name: "AFCAT (Air Force Common Admission Test)",
    label: "AFCAT (Air Force Common Admission Test) (20-24)",
    minAge: 20,
    baseMaxAge: 24,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2027",
    badge: "20-24 Yrs",
  },

  // 4. ग्रेजुएट व ऑफिसर स्तर (SSC CGL & CPO)
  {
    id: "SSC_CGL_CHSL",
    categoryGroup: "🎓 ग्रेजुएट व ऑफिसर स्तर (SSC CGL & CPO)",
    name: "SSC CGL / CHSL",
    label: "SSC CGL / CHSL (18-27)",
    minAge: 18,
    baseMaxAge: 27,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "18-27 Yrs",
  },
  {
    id: "SSC_CPO",
    categoryGroup: "🎓 ग्रेजुएट व ऑफिसर स्तर (SSC CGL & CPO)",
    name: "SSC CPO SI (Delhi Police & CAPF)",
    label: "SSC CPO SI (Delhi Police & CAPF) (20-25)",
    minAge: 20,
    baseMaxAge: 25,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "20-25 Yrs",
  },

  // 5. बैंकिंग सेवाएँ (Bank Exams)
  {
    id: "IBPS_SBI_CLERK",
    categoryGroup: "🏦 बैंकिंग सेवाएँ (Bank Exams)",
    name: "IBPS Clerk / SBI Clerk",
    label: "IBPS Clerk / SBI Clerk (20-28)",
    minAge: 20,
    baseMaxAge: 28,
    cutoffDay: "01",
    cutoffMonth: "04",
    cutoffYear: "2026",
    badge: "20-28 Yrs",
  },
  {
    id: "IBPS_SBI_PO",
    categoryGroup: "🏦 बैंकिंग सेवाएँ (Bank Exams)",
    name: "IBPS PO / SBI PO",
    label: "IBPS PO / SBI PO (20-30)",
    minAge: 20,
    baseMaxAge: 30,
    cutoffDay: "01",
    cutoffMonth: "04",
    cutoffYear: "2026",
    badge: "20-30 Yrs",
  },
  {
    id: "IBPS_RRB",
    categoryGroup: "🏦 बैंकिंग सेवाएँ (Bank Exams)",
    name: "IBPS RRB (Gramin Bank Clerk & PO)",
    label: "IBPS RRB (Gramin Bank Clerk & PO) (18-30)",
    minAge: 18,
    baseMaxAge: 30,
    cutoffDay: "01",
    cutoffMonth: "06",
    cutoffYear: "2026",
    badge: "18-30 Yrs",
  },

  // 6. शिक्षण और सिविल सेवा (Teaching & Civil Services)
  {
    id: "CTET_STATE_TET",
    categoryGroup: "📚 शिक्षण और सिविल सेवा (Teaching & Civil Services)",
    name: "CTET / State TET (UPTET, REET, BTET)",
    label: "CTET / State TET (UPTET, REET, BTET) (18-40)",
    minAge: 18,
    baseMaxAge: 40,
    cutoffDay: "01",
    cutoffMonth: "01",
    cutoffYear: "2026",
    badge: "18-40 Yrs",
  },
  {
    id: "BPSC_TRE",
    categoryGroup: "📚 शिक्षण और सिविल सेवा (Teaching & Civil Services)",
    name: "BPSC TRE (Bihar Teacher)",
    label: "BPSC TRE (Bihar Teacher) (21-37)",
    minAge: 21,
    baseMaxAge: 37,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "21-37 Yrs",
  },
  {
    id: "UPSC_CSE",
    categoryGroup: "📚 शिक्षण और सिविल सेवा (Teaching & Civil Services)",
    name: "UPSC Civil Services (IAS / IPS)",
    label: "UPSC Civil Services (IAS / IPS) (21-32)",
    minAge: 21,
    baseMaxAge: 32,
    cutoffDay: "01",
    cutoffMonth: "08",
    cutoffYear: "2026",
    badge: "21-32 Yrs",
  },
];

interface AgeCalculationResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalDays: number;
  nextBirthdayDays: number;
  isBirthdayToday: boolean;
  exactAgeDecimal: number;
}

export default function App() {
  const today = new Date();
  const initDay = String(today.getDate()).padStart(2, "0"); // "18"
  const initMonth = String(today.getMonth() + 1).padStart(2, "0"); // "09"
  const initYear = String(today.getFullYear()); // "2026"

  // Target Date: 18 first (Day, Month, Year)
  const [tDay, setTDay] = useState<string>(initDay);
  const [tMonth, setTMonth] = useState<string>(initMonth);
  const [tYear, setTYear] = useState<string>(initYear);

  // DOB: Day, Month, Year
  const [bDay, setBDay] = useState<string>("");
  const [bMonth, setBMonth] = useState<string>("");
  const [bYear, setBYear] = useState<string>("");

  // Category & Age Criteria
  const [category, setCategory] = useState<CategoryType>("GEN");
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [minAgeRequirement, setMinAgeRequirement] = useState<number>(18);
  const [baseMaxAge, setBaseMaxAge] = useState<number>(25); // Standard general upper age (e.g. 18-25 or 18-27)
  const [showCriteriaCustomize, setShowCriteriaCustomize] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgeCalculationResult | null>(null);
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);

  const hiddenTargetDateRef = useRef<HTMLInputElement>(null);
  const hiddenDobRef = useRef<HTMLInputElement>(null);

  // Mobile-friendly input refs for auto-advance
  const tDayInputRef = useRef<HTMLInputElement>(null);
  const tMonthInputRef = useRef<HTMLInputElement>(null);
  const tYearInputRef = useRef<HTMLInputElement>(null);

  const bDayInputRef = useRef<HTMLInputElement>(null);
  const bMonthInputRef = useRef<HTMLInputElement>(null);
  const bYearInputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState<boolean>(false);

  // Current category config
  const selectedCategoryObj = useMemo(
    () => CATEGORIES.find((c) => c.id === category) || CATEGORIES[0],
    [category]
  );

  // Current selected exam config
  const selectedExamObj = useMemo(
    () => EXAM_PRESETS.find((e) => e.id === selectedExam) || null,
    [selectedExam]
  );

  // Effective Max Age with relief (e.g. 25 + 3 = 28 or 27 + 3 = 30)
  const effectiveMaxAge = baseMaxAge + selectedCategoryObj.reliefYears;

  // Instant calculation logic
  const calculateAgeInternal = (
    targetD: string,
    targetM: string,
    targetY: string,
    birthD: string,
    birthM: string,
    birthY: string
  ): { res: AgeCalculationResult | null; err: string | null } => {
    const cleanTDay = parseInt(targetD, 10);
    const cleanTMonth = parseInt(targetM, 10);
    const cleanTYear = parseInt(targetY, 10);

    const cleanBDay = parseInt(birthD, 10);
    const cleanBMonth = parseInt(birthM, 10);
    const cleanBYear = parseInt(birthY, 10);

    if (
      !cleanTDay ||
      !cleanTMonth ||
      !cleanTYear ||
      !cleanBDay ||
      !cleanBMonth ||
      !cleanBYear
    ) {
      return { res: null, err: null };
    }

    if (cleanTMonth < 1 || cleanTMonth > 12 || cleanBMonth < 1 || cleanBMonth > 12) {
      return { res: null, err: "Mahina 1 se 12 ke beech hona chahiye!" };
    }

    if (cleanTDay < 1 || cleanTDay > 31 || cleanBDay < 1 || cleanBDay > 31) {
      return { res: null, err: "Din (तारीख) 1 se 31 ke beech honi chahiye!" };
    }

    const birthDate = new Date(cleanBYear, cleanBMonth - 1, cleanBDay);
    const target = new Date(cleanTYear, cleanTMonth - 1, cleanTDay);

    if (birthDate.getTime() > target.getTime()) {
      return { res: null, err: "Date of Birth aaj ki date se aage nahi ho sakti!" };
    }

    let years = target.getFullYear() - birthDate.getFullYear();
    let months = target.getMonth() - birthDate.getMonth();
    let days = target.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total Days
    const diffTime = Math.abs(target.getTime() - birthDate.getTime());
    const totalDaysCount = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalMonthsCount = years * 12 + months;
    const exactAgeDecimal = years + months / 12 + days / 365.25;

    // Next Birthday Countdown
    let nextBirthday = new Date(target.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday.getTime() < target.getTime()) {
      nextBirthday = new Date(target.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }

    const bdayDiffTime = nextBirthday.getTime() - target.getTime();
    const bdayDiff = Math.ceil(bdayDiffTime / (1000 * 60 * 60 * 24));
    const isBirthdayToday = bdayDiff === 0;

    return {
      err: null,
      res: {
        years,
        months,
        days,
        totalMonths: totalMonthsCount,
        totalDays: totalDaysCount,
        nextBirthdayDays: bdayDiff,
        isBirthdayToday,
        exactAgeDecimal,
      },
    };
  };

  // Handle Exam One-Tap Quick Select
  const handleSelectExam = (exam: ExamPreset) => {
    setSelectedExam(exam.id);
    setTDay(exam.cutoffDay);
    setTMonth(exam.cutoffMonth);
    setTYear(exam.cutoffYear);
    setMinAgeRequirement(exam.minAge);
    setBaseMaxAge(exam.baseMaxAge);
    setError(null);
    if (result && bDay && bMonth && bYear) {
      const { res, err } = calculateAgeInternal(
        exam.cutoffDay,
        exam.cutoffMonth,
        exam.cutoffYear,
        bDay,
        bMonth,
        bYear
      );
      if (!err && res) {
        setResult(res);
      }
    }
  };

  const handleClearExam = () => {
    setSelectedExam(null);
    setTDay(initDay);
    setTMonth(initMonth);
    setTYear(initYear);
    setMinAgeRequirement(18);
    setBaseMaxAge(25);
    if (result && bDay && bMonth && bYear) {
      const { res, err } = calculateAgeInternal(
        initDay,
        initMonth,
        initYear,
        bDay,
        bMonth,
        bYear
      );
      if (!err && res) {
        setResult(res);
      }
    }
  };

  // Sync from native date picker
  const handleNativeTargetDateChange = (val: string) => {
    if (!val) return;
    const [y, m, d] = val.split("-");
    if (d) setTDay(d);
    if (m) setTMonth(m);
    if (y) setTYear(y);
  };

  const handleNativeDobChange = (val: string) => {
    if (!val) return;
    const [y, m, d] = val.split("-");
    if (d) setBDay(d);
    if (m) setBMonth(m);
    if (y) setBYear(y);
  };

  // Set Today for target date in 1 tap (mobile quick action)
  const handleSetTodayTarget = () => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const y = String(now.getFullYear());
    setTDay(d);
    setTMonth(m);
    setTYear(y);
    setSelectedExam(null);
    if (result && bDay && bMonth && bYear) {
      const { res, err } = calculateAgeInternal(d, m, y, bDay, bMonth, bYear);
      if (!err && res) {
        setResult(res);
      }
    }
  };

  // Mobile Auto-Advance inputs
  const handleTDayChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setTDay(clean);
    if (clean.length === 2) {
      tMonthInputRef.current?.focus();
    }
  };

  const handleTMonthChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setTMonth(clean);
    if (clean.length === 2) {
      tYearInputRef.current?.focus();
    }
  };

  const handleTYearChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    setTYear(clean);
  };

  const handleBDayChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setBDay(clean);
    if (clean.length === 2) {
      bMonthInputRef.current?.focus();
    }
  };

  const handleBMonthChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setBMonth(clean);
    if (clean.length === 2) {
      bYearInputRef.current?.focus();
    }
  };

  const handleBYearChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    setBYear(clean);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentVal: string,
    prevRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Backspace" && !currentVal && prevRef?.current) {
      prevRef.current.focus();
    }
  };

  // Copy result to clipboard
  const handleCopyResult = () => {
    if (!result) return;
    const examName = selectedExamObj ? selectedExamObj.name : "Sarkari Exam";
    let attemptsText = "";
    if (attemptsInfo) {
      attemptsText = `\n• संभावित मौके: ${attemptsInfo.estimatedAttempts} बार (${attemptsInfo.lastEligibleYear} तक)`;
    }
    const textToCopy = `📋 उम्र गणना परिणाम (${examName}):
• कुल उम्र: ${result.years} वर्ष, ${result.months} माह, ${result.days} दिन
• कुल दिन: ${result.totalDays.toLocaleString()} दिन
• कुल महीने: ${result.totalMonths.toLocaleString()} माह
• पात्रता स्थिति: ${eligibilityStatus?.label || "जांच पूर्ण"}${attemptsText}
• अगला जन्मदिन: ${result.isBirthdayToday ? "आज ही है! 🎉" : `${result.nextBirthdayDays} दिन शेष`}

Online Age Calculator: https://onlineagecalculator.app`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Show result only after user clicks Calculate button
  const handleManualCalculate = () => {
    if (!bDay || !bMonth || !bYear) {
      setError("कृपया अपनी जन्मतिथि (Din, Mahina, Saal) दर्ज करें!");
      setResult(null);
      return;
    }
    const { res, err } = calculateAgeInternal(tDay, tMonth, tYear, bDay, bMonth, bYear);
    setError(err);
    setResult(res);
    if (res) {
      setTimeout(() => {
        const el = document.getElementById("eligibilityBox") || document.getElementById("resultBox");
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    }
  };

  const handleReset = () => {
    setBDay("");
    setBMonth("");
    setBYear("");
    setTDay(initDay);
    setTMonth(initMonth);
    setTYear(initYear);
    setCategory("GEN");
    setSelectedExam(null);
    setMinAgeRequirement(18);
    setBaseMaxAge(25);
    setError(null);
    setResult(null);
  };

  // Eligibility evaluation
  const eligibilityStatus = useMemo(() => {
    if (!result) return null;

    // Under-age check: age strictly less than minAge
    if (result.exactAgeDecimal < minAgeRequirement - 0.001) {
      return {
        status: "UNDER_AGE",
        label: "Under-age (आयु अभी कम है)",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        boxBg: "bg-amber-50/90 border-amber-300",
        message: `न्यूनतम आयु सीमा ${minAgeRequirement} वर्ष है। आपकी वर्तमान आयु ${result.years} वर्ष ${result.months} माह ${result.days} दिन है।`,
      };
    }

    // Over-age check: age strictly exceeds effectiveMaxAge
    if (result.exactAgeDecimal > effectiveMaxAge + 0.001) {
      return {
        status: "OVER_AGE",
        label: "Over-age (अधिक आयु / अपात्र)",
        badgeColor: "bg-red-100 text-red-800 border-red-300",
        boxBg: "bg-red-50/90 border-red-300",
        message: `${selectedCategoryObj.label} श्रेणी के लिए अधिकतम आयु सीमा ${effectiveMaxAge} वर्ष है। आपकी आयु ${result.years} वर्ष ${result.months} माह ${result.days} दिन हो चुकी है।`,
      };
    }

    // Eligible
    return {
      status: "ELIGIBLE",
      label: "Eligible (योग्य / पात्र) ✓",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      boxBg: "bg-emerald-50/90 border-emerald-300",
      message: `बधाई हो! आपकी आयु ${result.years} वर्ष ${result.months} माह ${result.days} दिन है, जो ${minAgeRequirement} से ${effectiveMaxAge} वर्ष की निर्धारित सीमा (${selectedCategoryObj.label}) के अंदर 100% योग्य है।`,
    };
  }, [result, effectiveMaxAge, minAgeRequirement, selectedCategoryObj]);

  // Upcoming Attempts calculation ("कितने मौके बाकी हैं?")
  const attemptsInfo = useMemo(() => {
    if (!result) return null;
    const cleanBYear = parseInt(bYear, 10);
    if (!cleanBYear) return null;

    const currentAge = result.exactAgeDecimal;
    const examName = selectedExamObj ? selectedExamObj.name : "इस भर्ती";

    // Under-age
    if (currentAge < minAgeRequirement - 0.001) {
      const remainingYearsToMin = minAgeRequirement - currentAge;
      const firstEligibleYear = cleanBYear + Math.ceil(minAgeRequirement);
      return {
        status: "UNDER_AGE" as const,
        remainingYears: remainingYearsToMin,
        estimatedAttempts: 0,
        lastEligibleYear: cleanBYear + Math.floor(effectiveMaxAge),
        firstEligibleYear,
        percentageUsed: 0,
        headline: `अभी इंतज़ार करें! पहला मौका वर्ष ${firstEligibleYear} में मिलेगा`,
        badgeText: "पहला मौका बाकी (Upcoming First Attempt)",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
        adviceText: `न्यूनतम आयु (${minAgeRequirement} वर्ष) पूरी होने में लगभग ${Math.floor(remainingYearsToMin)} वर्ष ${Math.round((remainingYearsToMin % 1) * 12)} माह का समय बाकी है। अभी से सिलेबस और मॉक टेस्ट की मजबूत तैयारी शुरू करें!`,
      };
    }

    // Over-age
    if (currentAge > effectiveMaxAge + 0.001) {
      return {
        status: "OVER_AGE" as const,
        remainingYears: 0,
        estimatedAttempts: 0,
        lastEligibleYear: cleanBYear + Math.floor(effectiveMaxAge),
        firstEligibleYear: cleanBYear + Math.ceil(minAgeRequirement),
        percentageUsed: 100,
        headline: `${examName} के लिए 0 मौके बाकी (आयु सीमा समाप्त)`,
        badgeText: "0 मौके बाकी (Over-age)",
        badgeColor: "bg-red-100 text-red-900 border-red-300",
        adviceText: `इस परीक्षा की अधिकतम आयु (${effectiveMaxAge} वर्ष) समाप्त हो चुकी है। निराश न हों! आप अन्य परीक्षाएँ चुन सकते हैं जिनकी ऊपरी आयु सीमा 33 से 40 वर्ष तक है (जैसे Railway RRB - 33 वर्ष, UPSSSC लेखपाल - 40 वर्ष, BSSC Inter - 37/40 वर्ष, या CTET/TET - 40 वर्ष)।`,
      };
    }

    // Eligible
    const remainingYears = Math.max(0, effectiveMaxAge - currentAge);
    const lastEligibleYear = cleanBYear + Math.floor(effectiveMaxAge);
    const estimatedAttempts = Math.max(1, Math.floor(remainingYears) + 1);

    // Percentage of age window used
    const totalSpan = Math.max(1, effectiveMaxAge - minAgeRequirement);
    const usedSpan = Math.max(0, currentAge - minAgeRequirement);
    const percentageUsed = Math.min(100, Math.max(5, Math.round((usedSpan / totalSpan) * 100)));

    if (remainingYears < 1.0 || estimatedAttempts === 1) {
      return {
        status: "LAST_ATTEMPT" as const,
        remainingYears,
        estimatedAttempts: 1,
        lastEligibleYear,
        firstEligibleYear: cleanBYear + Math.ceil(minAgeRequirement),
        percentageUsed,
        headline: `🔥 यह आपका आखिरी मौका (Last Attempt) हो सकता है!`,
        badgeText: "🔥 अंतिम मौका (Last Attempt)",
        badgeColor: "bg-orange-100 text-orange-900 border-orange-300 ring-1 ring-orange-400",
        adviceText: `आपकी अधिकतम आयु सीमा (${effectiveMaxAge} वर्ष) पूरी होने में लगभग ${Math.max(1, Math.round(remainingYears * 12))} महीने शेष हैं। वर्ष ${lastEligibleYear} आपका अंतिम भर्ती मौका हो सकता है — जी-जान लगा दीजिए!`,
      };
    }

    return {
      status: "ELIGIBLE" as const,
      remainingYears,
      estimatedAttempts,
      lastEligibleYear,
      firstEligibleYear: cleanBYear + Math.ceil(minAgeRequirement),
      percentageUsed,
      headline: `आपके पास लगभग ${estimatedAttempts} मौके (Annual Attempts) बाकी हैं!`,
      badgeText: `🎯 ${estimatedAttempts} संभावित मौके बाकी (${lastEligibleYear} तक)`,
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      adviceText: `आपकी श्रेणी (${selectedCategoryObj.label}) के अनुसार आप वर्ष ${lastEligibleYear} तक होने वाली आगामी वार्षिक भर्तियों में लगातार परीक्षा दे सकते हैं।`,
    };
  }, [result, bYear, minAgeRequirement, effectiveMaxAge, selectedExamObj, selectedCategoryObj]);

  // WhatsApp Viral Share URL generator
  const whatsappShareUrl = useMemo(() => {
    if (!result || !eligibilityStatus) return "#";
    const examName = selectedExamObj ? selectedExamObj.name : "Sarkari Exam";
    const appUrl = typeof window !== "undefined" ? window.location.href : "https://onlineagecalculator.app";

    let outcomeText = "";
    if (attemptsInfo) {
      if (attemptsInfo.status === "LAST_ATTEMPT") {
        outcomeText = `Bhai ${examName} me mera Aakhiri Mauka (Last Attempt) bacha hai!`;
      } else if (attemptsInfo.status === "ELIGIBLE") {
        outcomeText = `Bhai ${examName} me mere paas ${attemptsInfo.estimatedAttempts} mauke bache hain (${attemptsInfo.lastEligibleYear} tak)!`;
      } else if (attemptsInfo.status === "OVER_AGE") {
        outcomeText = `Bhai ${examName} me meri age cross ho gayi hai (0 mauke)!`;
      } else {
        outcomeText = `Bhai ${examName} me mera pehla mauka ${attemptsInfo.firstEligibleYear} me aayega!`;
      }
    } else {
      if (eligibilityStatus.status === "ELIGIBLE") {
        outcomeText = `Mai ${examName} ke liye Eligible hoon!`;
      } else if (eligibilityStatus.status === "OVER_AGE") {
        outcomeText = `Mai ${examName} ke liye Over-age ho gaya!`;
      } else {
        outcomeText = `Meri umar abhi ${result.years} Saal ${result.months} Mahine hai.`;
      }
    }

    const shareMessage = `Bhai maine apni age calculate ki - ${outcomeText} Aap bhi check karo aapke kitne attempts/mauke bache hain: ${appUrl}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  }, [result, eligibilityStatus, selectedExamObj, attemptsInfo]);

  const formattedTargetDate =
    tYear && tMonth && tDay
      ? `${tYear}-${String(tMonth).padStart(2, "0")}-${String(tDay).padStart(2, "0")}`
      : "";

  const formattedDob =
    bYear && bMonth && bDay
      ? `${bYear}-${String(bMonth).padStart(2, "0")}-${String(bDay).padStart(2, "0")}`
      : "";

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 flex flex-col items-center px-3 py-2 sm:p-6 antialiased pb-24 sm:pb-8 w-full">
      {/* 1. Top Banner (Fixed Size 320x50 ya Responsive Banner - AdSense Display) */}
      <div
        id="adSlotTop"
        className="w-full max-w-[480px] h-[50px] sm:h-[55px] bg-white border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center px-3 py-1 my-1.5 shadow-xs transition hover:border-slate-400 select-none overflow-hidden"
      >
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
          Advertisement • AdSense Display Responsive (320x50 Mobile Strip)
        </span>
        <span className="text-xs text-slate-600 font-semibold truncate max-w-full">
          📢 सरकारी भर्ती ऑल इंडिया लाइव टेस्ट सीरीज़ & स्टडी पैकेज
        </span>
      </div>

      {/* Main Card */}
      <main
        id="ageCalculatorCard"
        className="w-full max-w-[480px] bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 my-2 transition-all"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-center">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sarkari Age Calculator (उम्र निकालें)
          </h1>
        </div>

        {/* Quick prompt for user */}
        <p className="text-xs text-center text-slate-500 mb-5">
          अपनी <strong>Date of Birth</strong> और <strong>Category</strong> चुनें, फिर <strong>Calculate</strong> बटन दबाकर अपनी उम्र और पात्रता (Eligible / Over-age) देखें
        </p>

        {error && (
          <div
            id="errorMessage"
            role="alert"
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2.5 animate-fadeIn"
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleManualCalculate();
          }}
          className="space-y-4"
        >
          {/* Target Date Section: Day 18 first */}
          <div className="input-group">
            <div className="flex justify-between items-center mb-1.5 flex-wrap gap-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Age at Date (किस तारीख तक निकालना है):
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSetTodayTarget}
                  className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-semibold cursor-pointer active:scale-95 transition"
                  title="आज की तारीख सेट करें"
                >
                  आज (Today)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    hiddenTargetDateRef.current?.showPicker?.() ||
                    hiddenTargetDateRef.current?.focus()
                  }
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-pointer active:scale-95 transition"
                  title="Calendar se chunein"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Calendar</span>
                </button>
              </div>
            </div>

            {/* 3 boxes: Day First, Month, Year - Mobile Optimized Numeric Input */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="block text-xs font-semibold text-blue-600 mb-1">
                  1. Date / दिन (DD)
                </span>
                <input
                  ref={tDayInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={tDay}
                  onChange={(e) => handleTDayChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, tDay)}
                  placeholder="DD"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-900 border-2 border-blue-500/80 bg-blue-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1">
                  2. Month / माह
                </span>
                <input
                  ref={tMonthInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={tMonth}
                  onChange={(e) => handleTMonthChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, tMonth, tDayInputRef)}
                  placeholder="MM"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1">
                  3. Year / वर्ष
                </span>
                <input
                  ref={tYearInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={tYear}
                  onChange={(e) => handleTYearChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, tYear, tMonthInputRef)}
                  placeholder="YYYY"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>
            </div>

            {/* Hidden native input for compatibility */}
            <input
              type="date"
              id="targetDate"
              ref={hiddenTargetDateRef}
              value={formattedTargetDate}
              onChange={(e) => handleNativeTargetDateChange(e.target.value)}
              className="sr-only"
              tabIndex={-1}
            />
          </div>

          {/* Popular Exam Quick-Select (One-Tap Buttons) */}
          <div className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Popular Exam Quick-Select (1-Click Cutoff):
              </span>
              {selectedExamObj ? (
                <button
                  type="button"
                  onClick={handleClearExam}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Clear Cutoff
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-medium">Auto-Set Cutoff</span>
              )}
            </div>

            {/* 1. Quick One-Tap Buttons (Top 8 Popular Exams) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5">
              {EXAM_PRESETS.filter((e) => e.isQuickChip).map((exam) => {
                const isSelected = selectedExam === exam.id;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => handleSelectExam(exam)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition cursor-pointer border flex flex-col items-center justify-center min-h-[52px] active:scale-[0.98] touch-manipulation ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-400"
                        : "bg-white text-slate-800 border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight line-clamp-1">{exam.name}</div>
                    <div
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {exam.badge}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 2. Categorized Dropdown for ALL 25+ Sarkari Exams */}
            <div className="pt-2 border-t border-slate-200/80">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center justify-between">
                <span>अन्य सभी परीक्षाएँ (Dropdown से चुनें):</span>
                <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">25+ प्रमुख भर्तियां</span>
              </label>
              <select
                id="examDropdown"
                value={selectedExam || ""}
                onChange={(e) => {
                  const found = EXAM_PRESETS.find((x) => x.id === e.target.value);
                  if (found) {
                    handleSelectExam(found);
                  } else {
                    handleClearExam();
                  }
                }}
                className="w-full h-11 text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs touch-manipulation"
              >
                <option value="">-- अपनी परीक्षा चुनें (All Categories) --</option>
                {Array.from(new Set(EXAM_PRESETS.map((e) => e.categoryGroup))).map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {EXAM_PRESETS.filter((e) => e.categoryGroup === cat).map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.label} ({e.badge})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {selectedExamObj && (
              <div className="mt-2 text-[11px] text-blue-900 bg-blue-100/70 py-1.5 px-2.5 rounded-lg flex items-center justify-between">
                <span>
                  ✓ <strong>{selectedExamObj.name}</strong> Cutoff Date:{" "}
                  <strong>
                    {selectedExamObj.cutoffDay}/{selectedExamObj.cutoffMonth}/{selectedExamObj.cutoffYear}
                  </strong>{" "}
                  auto-set hui (आयु: {selectedExamObj.minAge}-{selectedExamObj.baseMaxAge} वर्ष)
                </span>
              </div>
            )}
          </div>

          {/* DOB Section: Day (Date) first */}
          <div className="input-group">
            <div className="flex justify-between items-center mb-1.5 flex-wrap gap-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Date of Birth (जन्म तिथि डालें):
              </label>
              <button
                type="button"
                onClick={() =>
                  hiddenDobRef.current?.showPicker?.() || hiddenDobRef.current?.focus()
                }
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-pointer active:scale-95 transition"
                title="Calendar se chunein"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>
            </div>

            {/* 3 boxes: Day (Date) First, Month, Year - Mobile Optimized Numeric Input */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="block text-xs font-semibold text-blue-600 mb-1">
                  1. Date / दिन (DD)
                </span>
                <input
                  ref={bDayInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={bDay}
                  onChange={(e) => handleBDayChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, bDay)}
                  placeholder="DD"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-900 border-2 border-blue-500/80 bg-blue-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1">
                  2. Month / माह
                </span>
                <input
                  ref={bMonthInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={bMonth}
                  onChange={(e) => handleBMonthChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, bMonth, bDayInputRef)}
                  placeholder="MM"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1">
                  3. Year / वर्ष
                </span>
                <input
                  ref={bYearInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={bYear}
                  onChange={(e) => handleBYearChange(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, bYear, bMonthInputRef)}
                  placeholder="YYYY"
                  className="w-full h-11 sm:h-10 px-2 py-2 text-center font-bold text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg sm:text-base transition"
                  required
                />
              </div>
            </div>

            {/* Hidden native input for compatibility */}
            <input
              type="date"
              id="dob"
              ref={hiddenDobRef}
              value={formattedDob}
              onChange={(e) => handleNativeDobChange(e.target.value)}
              className="sr-only"
              tabIndex={-1}
            />
          </div>

          {/* Category Relief Option (OBC / SC / ST / General) */}
          <div className="input-group bg-slate-50/90 border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="categorySelect"
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-blue-600" />
                Category Relief (आरक्षण छूट):
              </label>
              {selectedCategoryObj.reliefYears > 0 ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  +{selectedCategoryObj.reliefYears} साल की छूट
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                  सामान्य (0 छूट)
                </span>
              )}
            </div>

            {/* Category Pill Buttons */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition cursor-pointer border min-h-[46px] flex flex-col items-center justify-center active:scale-[0.98] touch-manipulation ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs ring-1 ring-blue-500"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <div>{cat.label}</div>
                    <div
                      className={`text-[10px] ${
                        isSelected ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {cat.reliefYears > 0 ? `+${cat.reliefYears} साल` : "0 छूट"}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Age Range Display */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200/80">
              <span>
                आयु सीमा (Age Limit):{" "}
                <strong className="text-slate-900 font-semibold">
                  {minAgeRequirement} से {effectiveMaxAge} वर्ष
                </strong>
                {selectedCategoryObj.reliefYears > 0 && (
                  <span className="text-emerald-700 ml-1">
                    ({baseMaxAge} + {selectedCategoryObj.reliefYears} yr छूट)
                  </span>
                )}
              </span>

              <button
                type="button"
                onClick={() => setShowCriteriaCustomize(!showCriteriaCustomize)}
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 text-[11px] cursor-pointer"
              >
                {showCriteriaCustomize ? "कस्टम बंद करें" : "सीमा बदलें"}
              </button>
            </div>

            {/* Optional Custom Criteria expansion (e.g. Police 18-25, SSC 18-27, 18-30) */}
            {showCriteriaCustomize && (
              <div className="mt-2.5 pt-2.5 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-600 block mb-1">न्यूनतम उम्र (Min):</span>
                  <input
                    type="number"
                    min="14"
                    max="35"
                    value={minAgeRequirement}
                    onChange={(e) => setMinAgeRequirement(Number(e.target.value) || 18)}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium text-center"
                  />
                </div>
                <div>
                  <span className="text-slate-600 block mb-1">सामान्य अधिकतम (Base Max):</span>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    value={baseMaxAge}
                    onChange={(e) => setBaseMaxAge(Number(e.target.value) || 25)}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium text-center"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-1 flex flex-col gap-2">
            <button
              type="submit"
              id="calculateBtn"
              className="w-full h-12 sm:h-13 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.99] text-white font-bold rounded-xl text-base shadow-sm hover:shadow transition duration-150 flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            >
              <Sparkles className="w-5 h-5" />
              <span>Calculate & Check Eligibility (उम्र निकालें)</span>
            </button>

            {(bDay || bMonth || bYear || result) && (
              <button
                type="button"
                onClick={handleReset}
                id="resetBtn"
                className="w-full py-1.5 px-4 text-xs sm:text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition cursor-pointer"
              >
                Clear / Reset
              </button>
            )}
          </div>
        </form>

        {/* IMMEDIATE ELIGIBILITY BADGE / BOX (Eligible Green / Over-age Red) */}
        {result && eligibilityStatus && (
          <section
            id="eligibilityBox"
            aria-live="polite"
            className={`mt-5 rounded-xl p-4 border transition-all animate-fadeIn ${eligibilityStatus.boxBg}`}
          >
            <div className="flex items-center gap-3">
              {eligibilityStatus.status === "ELIGIBLE" && (
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                </div>
              )}
              {eligibilityStatus.status === "OVER_AGE" && (
                <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <XCircle className="w-7 h-7 stroke-[2.5]" />
                </div>
              )}
              {eligibilityStatus.status === "UNDER_AGE" && (
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <AlertCircle className="w-7 h-7 stroke-[2.5]" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-sm font-extrabold tracking-wide uppercase border ${eligibilityStatus.badgeColor}`}
                  >
                    {eligibilityStatus.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                    {selectedCategoryObj.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-snug">
                  {eligibilityStatus.message}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* UPCOMING ATTEMPTS COUNTER CARD ("कितने मौके बाकी हैं?") */}
        {result && attemptsInfo && (
          <section
            id="attemptsCounterCard"
            aria-live="polite"
            className="mt-4 bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/80 border-2 border-indigo-200/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all animate-fadeIn"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-indigo-100 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 flex-wrap">
                    <span>Upcoming Attempts Counter</span>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                      कितने मौके बाकी हैं?
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    भर्ती: <strong>{selectedExamObj ? selectedExamObj.name : "निर्धारित परीक्षा (Age Criteria)"}</strong>
                  </p>
                </div>
              </div>

              <span
                className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg border shrink-0 ${attemptsInfo.badgeColor}`}
              >
                {attemptsInfo.badgeText}
              </span>
            </div>

            {/* Main Headline & Callout */}
            <div className="mt-3 bg-white/90 rounded-xl p-3 border border-indigo-100/80">
              <div className="flex items-start gap-2.5">
                {attemptsInfo.status === "LAST_ATTEMPT" ? (
                  <Flame className="w-5 h-5 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
                ) : attemptsInfo.status === "ELIGIBLE" ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : attemptsInfo.status === "OVER_AGE" ? (
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {attemptsInfo.headline}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {attemptsInfo.adviceText}
                  </p>
                </div>
              </div>

              {/* Visual Age Window Progress Bar */}
              {attemptsInfo.status !== "OVER_AGE" && (
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1 flex-wrap gap-1">
                    <span>न्यूनतम: {minAgeRequirement} वर्ष</span>
                    <span className="font-bold text-indigo-700">
                      आयु: {result.years}y {result.months}m ({attemptsInfo.percentageUsed}% Age Window Used)
                    </span>
                    <span>अधिकतम: {effectiveMaxAge} वर्ष</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        attemptsInfo.status === "LAST_ATTEMPT"
                          ? "bg-gradient-to-r from-amber-500 to-orange-600"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600"
                      }`}
                      style={{ width: `${attemptsInfo.percentageUsed}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick 3-Pillar Stats Breakdown - Mobile Optimized */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3 text-center">
              <div className="bg-white/90 border border-indigo-100 rounded-xl p-2 sm:p-2.5 shadow-xs">
                <span className="block text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  कुल मौके (Attempts)
                </span>
                <span className="block text-sm sm:text-lg font-black text-indigo-700 mt-0.5 truncate">
                  {attemptsInfo.status === "OVER_AGE"
                    ? "0"
                    : attemptsInfo.status === "UNDER_AGE"
                    ? "0 (जल्द)"
                    : `${attemptsInfo.estimatedAttempts} बार`}
                </span>
              </div>

              <div className="bg-white/90 border border-indigo-100 rounded-xl p-2 sm:p-2.5 shadow-xs">
                <span className="block text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  समय बाकी (Years Left)
                </span>
                <span className="block text-sm sm:text-lg font-black text-slate-800 mt-0.5 truncate">
                  {attemptsInfo.status === "OVER_AGE"
                    ? "0 वर्ष"
                    : attemptsInfo.status === "UNDER_AGE"
                    ? `${Math.floor(attemptsInfo.remainingYears)} वर्ष बाद`
                    : `${attemptsInfo.remainingYears.toFixed(1)} वर्ष`}
                </span>
              </div>

              <div className="bg-white/90 border border-indigo-100 rounded-xl p-2 sm:p-2.5 shadow-xs">
                <span className="block text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate">
                  अंतिम वर्ष (Last Year)
                </span>
                <span className="block text-sm sm:text-lg font-black text-emerald-700 mt-0.5 truncate">
                  {attemptsInfo.status === "UNDER_AGE"
                    ? `${attemptsInfo.firstEligibleYear} (Start)`
                    : attemptsInfo.lastEligibleYear}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Age Breakdown Result Box */}
        {result && (
          <section
            id="resultBox"
            aria-live="polite"
            className="mt-4 bg-slate-50/90 border border-slate-200 rounded-xl p-4 sm:p-5"
          >
            {/* Exact Age Display: Din / Days First */}
            <div
              id="mainResult"
              className="text-lg sm:text-xl font-bold text-blue-600 text-center pb-2 border-b border-slate-200 flex flex-col items-center justify-center gap-1"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>
                  {result.days} Din, {result.months} Mahine, {result.years} Saal
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                ({result.years} Saal, {result.months} Mahine, {result.days} Din)
              </span>
            </div>

            <div className="divide-y divide-slate-200/70 text-sm mt-2">
              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" /> Total Days (कुल दिन):
                </span>
                <strong id="totalDays" className="font-semibold text-slate-900">
                  {result.totalDays.toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Total Months (कुल माह):
                </span>
                <strong id="totalMonths" className="font-semibold text-slate-900">
                  {result.totalMonths.toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Cake className="w-4 h-4 text-slate-400" /> Next Birthday In:
                </span>
                <strong
                  id="nextBday"
                  className={`font-semibold ${
                    result.isBirthdayToday ? "text-amber-600 font-bold" : "text-slate-900"
                  }`}
                >
                  {result.isBirthdayToday
                    ? "Aaj hi Birthday hai! 🎉"
                    : `${result.nextBirthdayDays} Din bache hain`}
                </strong>
              </div>
            </div>

            {/* 2. Result Card Ke Niche: Native / In-Article Ad (300x250 / In-Article Display) */}
            <div
              id="adSlotResultNative"
              className="mt-4 p-3 bg-gradient-to-b from-slate-50 to-indigo-50/40 border border-indigo-100 rounded-xl shadow-xs text-center select-none"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-indigo-100/80 mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  AdSense In-Article / 300x250 Native Ad (Study & Mock Tests)
                </span>
                <span className="text-[9px] bg-indigo-100 text-indigo-700 font-semibold px-1.5 py-0.5 rounded">
                  Sponsored
                </span>
              </div>
              <div className="py-2.5 px-3 bg-white rounded-lg border border-indigo-100 flex flex-col items-center justify-center">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{selectedExamObj ? `${selectedExamObj.name} Special` : "Govt Job"} Mock Test Series</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  🎯 50+ All India Mock Tests & Previous Year Papers (Hindi & English)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                  अपनी परीक्षा की कटऑफ पार करें। 1 लाख+ अभ्यर्थियों द्वारा रेटेड स्टडी किट।
                </p>
                <div className="mt-2">
                  <span className="inline-block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition cursor-pointer">
                    फ्री टेस्ट दें (Start Free Mock Test)
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Ek Smart Trick: Download Result Card / Save Eligibility Slip (PDF) */}
            <div className="mt-3.5 space-y-1.5">
              <button
                type="button"
                id="downloadSlipBtn"
                onClick={() => setShowSlipModal(true)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 hover:from-blue-800 hover:to-indigo-700 active:from-blue-900 active:to-indigo-800 text-white font-black rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center cursor-pointer active:scale-[0.99] touch-manipulation ring-2 ring-indigo-200"
                title="Download / Save Sarkari Age Calculator Official Eligibility Slip"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>Save / Download Result Card (Sarkari Eligibility Slip)</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                📄 <strong>Sarkari Age Calculator</strong>: साइबर कैफे (Cyber Cafe) फॉर्म भरने एवं रिकॉर्ड हेतु PDF पर्ची सेव व डाउनलोड करें
              </p>
            </div>

            {/* Action Buttons: WhatsApp Share & Copy Details */}
            <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
              <a
                id="whatsappShareBtn"
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-white font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-center cursor-pointer active:scale-[0.99]"
                title="WhatsApp par share karein"
              >
                <MessageCircle className="w-5 h-5 shrink-0 fill-white/25 text-white" />
                <span>WhatsApp Par Result Share Karein</span>
              </a>

              <button
                type="button"
                onClick={handleCopyResult}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 border border-slate-300 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                title="Result details copy karein"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-500" />
                )}
                <span>{copied ? "रिजल्ट कॉपी हो गया! (Copied to Clipboard)" : "📋 रिजल्ट कॉपी करें (Copy Details)"}</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Ad Slot */}
      <div
        id="adSlotBottom"
        className="w-full max-w-[480px] h-[60px] bg-slate-200 border border-dashed border-slate-400 rounded-lg flex items-center justify-center text-xs sm:text-sm text-slate-500 my-2 select-none"
      >
        Ad Slot: Banner (Bottom)
      </div>

      {/* Info Section */}
      <div
        id="infoSection"
        className="w-full max-w-[480px] mt-2 mb-3 text-xs sm:text-sm text-slate-600 bg-white/70 border border-slate-200 rounded-xl p-3.5 leading-relaxed"
      >
        <p>
          <strong className="text-slate-800">Note:</strong> Yeh tool official government job forms
          (SSC, UPSC, Railway, Police Bharti, Army), police verification aur school admission me
          exact age calculate karne aur OBC / SC / ST category age relaxation verify karne ke liye 100%
          accurate hai.
        </p>
      </div>

      {/* SEO Step-by-Step Guide for Googlebot & Users */}
      <SeoGuide />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* Googlebot & AdSense Compliant Footer */}
      <footer
        id="mainFooter"
        className="w-full max-w-[480px] mt-4 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-3 pb-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveModal("privacy")}
            className="hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveModal("terms")}
            className="hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("faqSection");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            FAQ
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveModal("about")}
            className="hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            About Us
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveModal("contact")}
            className="hover:text-blue-600 underline underline-offset-2 transition cursor-pointer"
          >
            Contact
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} Sarkari Age Calculator (सरकारी उम्र निकालें). All rights reserved.
        </p>
      </footer>

      {/* Mobile Sticky Quick Action Bar (Only shows on mobile when result is active) */}
      {result && (
        <aside
          id="mobileStickyBar"
          aria-label="Quick Actions"
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-lg flex items-center justify-between gap-2 pb-[max(10px,env(safe-area-inset-bottom))]"
        >
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 bg-[#25D366] active:bg-[#20bd5a] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>WhatsApp शेयर</span>
          </a>

          <button
            type="button"
            onClick={() => setShowSlipModal(true)}
            className="py-2.5 px-3 bg-indigo-600 active:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition shrink-0 cursor-pointer shadow-xs"
            title="Download / Save Sarkari Age Calculator Eligibility Slip (PDF)"
          >
            <Download className="w-4 h-4" />
            <span>पर्ची सेव करें (PDF)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyResult}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition shrink-0 cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600" />
            )}
            <span>{copied ? "कॉपी हुआ!" : "कॉपी"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-2.5 bg-blue-50 active:bg-blue-100 text-blue-600 font-bold rounded-xl text-xs flex items-center justify-center active:scale-[0.98] transition shrink-0 cursor-pointer"
            title="ऊपर जाएं / नई गणना"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Official Government Job Eligibility Slip Modal (Cyber Cafe & Form PDF) */}
      {result && (
        <EligibilitySlipModal
          isOpen={showSlipModal}
          onClose={() => setShowSlipModal(false)}
          result={result}
          eligibilityStatus={eligibilityStatus}
          attemptsInfo={attemptsInfo}
          selectedExamObj={selectedExamObj}
          category={category}
          categoryLabel={selectedCategoryObj.label}
          categoryReliefYears={selectedCategoryObj.reliefYears}
          effectiveMaxAge={effectiveMaxAge}
          minAgeRequirement={minAgeRequirement}
          dobFormatted={`${bDay ? bDay.padStart(2, "0") : "00"}/${bMonth ? bMonth.padStart(2, "0") : "00"}/${bYear || "0000"}`}
          targetDateFormatted={`${tDay ? tDay.padStart(2, "0") : "00"}/${tMonth ? tMonth.padStart(2, "0") : "00"}/${tYear || "0000"}`}
        />
      )}

      {/* Legal & Compliance Modals (Privacy, Terms, About, Contact) */}
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
