import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  X,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { ExamPreset, CategoryType } from "../App";

export interface EligibilitySlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    years: number;
    months: number;
    days: number;
    totalMonths: number;
    totalDays: number;
    nextBirthdayDays: number;
    isBirthdayToday: boolean;
  };
  eligibilityStatus: {
    status: string;
    label: string;
    badgeColor: string;
    boxBg: string;
    message: string;
  } | null;
  attemptsInfo: {
    status: "UNDER_AGE" | "OVER_AGE" | "LAST_ATTEMPT" | "ELIGIBLE";
    remainingYears: number;
    estimatedAttempts: number;
    lastEligibleYear: number;
    firstEligibleYear: number;
    headline: string;
    badgeText: string;
    adviceText: string;
  } | null;
  selectedExamObj: ExamPreset | null;
  category: CategoryType;
  categoryLabel: string;
  categoryReliefYears: number;
  effectiveMaxAge: number;
  minAgeRequirement: number;
  dobFormatted: string;
  targetDateFormatted: string;
}

export default function EligibilitySlipModal({
  isOpen,
  onClose,
  result,
  eligibilityStatus,
  attemptsInfo,
  selectedExamObj,
  categoryLabel,
  categoryReliefYears,
  effectiveMaxAge,
  minAgeRequirement,
  dobFormatted,
  targetDateFormatted,
}: EligibilitySlipModalProps) {
  const [copiedSlip, setCopiedSlip] = useState(false);

  if (!isOpen) return null;

  const examTitle = selectedExamObj ? selectedExamObj.name : "Government Job (सरकारी भर्ती)";
  const isEligible = eligibilityStatus?.status === "ELIGIBLE";
  const isOverAge = eligibilityStatus?.status === "OVER_AGE";
  const slipId = `GOV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDateStr = new Date().toLocaleDateString("hi-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handlePrintSlip = () => {
    window.print();
  };

  const handleDownloadSlipHtml = () => {
    // Generate clean self-contained HTML file with print-ready styling and Sarkari Age Calculator branding
    const slipHtmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sarkari Age Calculator - Eligibility Verification Slip (${slipId})</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background: #f1f5f9; padding: 20px; color: #0f172a; }
    .slip-card { max-width: 600px; margin: 0 auto; background: #fff; border: 2px solid #0f172a; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
    .brand-tag { display: inline-block; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 999px; padding: 4px 12px; font-size: 11px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; }
    h1 { font-size: 20px; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
    .ref-text { font-size: 12px; color: #64748b; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 12px; }
    .label { color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 2px; }
    .val { font-weight: 800; color: #0f172a; }
    .age-highlight { background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 14px; }
    .age-title { font-size: 11px; font-weight: 800; color: #1d4ed8; text-transform: uppercase; margin-bottom: 6px; }
    .age-big { font-size: 26px; font-weight: 900; color: #1e3a8a; }
    .age-details { font-size: 11px; color: #475569; margin-top: 6px; }
    .status-badge { padding: 12px 14px; border-radius: 8px; border: 2px solid ${isEligible ? '#059669' : isOverAge ? '#dc2626' : '#d97706'}; background: ${isEligible ? '#ecfdf5' : isOverAge ? '#fef2f2' : '#fffbeb'}; color: ${isEligible ? '#064e3b' : isOverAge ? '#7f1d1d' : '#78350f'}; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .status-main { font-size: 15px; font-weight: 900; }
    .status-tag { background: ${isEligible ? '#059669' : isOverAge ? '#dc2626' : '#d97706'}; color: #fff; font-size: 10px; font-weight: 900; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; }
    .attempts-box { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; font-size: 11px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
    .footer { border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
    .brand-watermark { text-align: center; margin-top: 14px; font-size: 11px; font-weight: 700; color: #2563eb; }
    .print-btn-bar { text-align: center; margin-top: 16px; }
    .btn { background: #2563eb; color: #fff; border: none; padding: 10px 20px; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: pointer; }
    @media print {
      body { background: #fff; padding: 0; }
      .slip-card { box-shadow: none; border-color: #000; width: 100%; max-width: 100%; }
      .print-btn-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="slip-card">
    <div class="header">
      <div class="brand-tag">🏛️ Sarkari Age Calculator • Official Verification Slip</div>
      <h1>सरकारी परीक्षा आयु एवं पात्रता सत्यापन पर्ची</h1>
      <div class="ref-text">Sarkari Age Calculator Verification Code: <strong>${slipId}</strong> • Date: ${currentDateStr}</div>
    </div>

    <div class="grid">
      <div>
        <div class="label">भर्ती परीक्षा (Exam Name)</div>
        <div class="val">${examTitle}</div>
      </div>
      <div>
        <div class="label">कटऑफ तिथि (Cutoff Date)</div>
        <div class="val" style="color: #1d4ed8;">${targetDateFormatted}</div>
      </div>
      <div>
        <div class="label">जन्म तिथि (Date of Birth)</div>
        <div class="val">${dobFormatted}</div>
      </div>
      <div>
        <div class="label">आरक्षण श्रेणी (Category)</div>
        <div class="val">${categoryLabel}</div>
      </div>
    </div>

    <div class="age-highlight">
      <div class="age-title">कटऑफ तिथि तक सटीक आयु (Exact Age on Cutoff Date)</div>
      <div class="age-big">${result.years} साल ${result.months} माह ${result.days} दिन</div>
      <div class="age-details">कुल दिन: <strong>${result.totalDays.toLocaleString()}</strong> • कुल माह: <strong>${result.totalMonths.toLocaleString()}</strong> • निर्धारित सीमा: <strong>${minAgeRequirement} से ${effectiveMaxAge} वर्ष</strong></div>
    </div>

    <div class="status-badge">
      <div>
        <div class="status-main">${eligibilityStatus?.label || "जांची गई"}</div>
        <div style="font-size: 11px; opacity: 0.9;">${eligibilityStatus?.message || ""}</div>
      </div>
      <div class="status-tag">${isEligible ? 'VERIFIED VALID' : isOverAge ? 'DISQUALIFIED' : 'PENDING'}</div>
    </div>

    ${attemptsInfo ? `
    <div class="attempts-box">
      <div>
        <strong style="color: #0f172a;">${attemptsInfo.badgeText}</strong>
        <div style="font-size: 10px; color: #64748b;">अंतिम भर्ती पात्रता वर्ष: ${attemptsInfo.lastEligibleYear}</div>
      </div>
      <div style="background: #fff; padding: 4px 8px; border-radius: 4px; font-weight: 800; color: #1e3a8a; border: 1px solid #cbd5e1;">${attemptsInfo.estimatedAttempts > 0 ? attemptsInfo.estimatedAttempts + ' Attempts' : '0 Attempts'}</div>
    </div>` : ''}

    <div class="footer">
      <span>जारी दिनांक: ${currentDateStr}</span>
      <span style="font-weight: 700; color: #334155;">✓ Verified by Sarkari Age Calculator (100% Accurate Govt Formula)</span>
    </div>

    <div class="brand-watermark">
      🌐 Sarkari Age Calculator • साइबर कैफे (Cyber Cafe) एवं ऑनलाइन आवेदन रिकॉर्ड हेतु मान्य
    </div>
  </div>

  <div class="print-btn-bar">
    <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([slipHtmlContent], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sarkari-Age-Calculator-Slip-${selectedExamObj ? selectedExamObj.id : "Job"}-${slipId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySlipText = () => {
    const text = `================================================
🏛️ Sarkari Age Calculator - पात्रता सत्यापन पर्ची
================================================
सत्यापन संदर्भ संख्या: ${slipId}
तारीख: ${currentDateStr}
भर्ती परीक्षा: ${examTitle}
कटऑफ तिथि (Cutoff Date): ${targetDateFormatted}
जन्म तिथि (Date of Birth): ${dobFormatted}
------------------------------------------------
गणना की गई सटीक आयु: ${result.years} वर्ष, ${result.months} माह, ${result.days} दिन
कुल दिन: ${result.totalDays.toLocaleString()} दिन | कुल माह: ${result.totalMonths.toLocaleString()} माह
चुनी गई श्रेणी (Category): ${categoryLabel} (${categoryReliefYears > 0 ? `+${categoryReliefYears} साल आयु छूट` : "कोई छूट नहीं"})
निर्धारित आयु सीमा: ${minAgeRequirement} से ${effectiveMaxAge} वर्ष
------------------------------------------------
पात्रता स्थिति: ${eligibilityStatus?.label || "जांची गई"}
${attemptsInfo ? `बाकी मौके (Attempts): ${attemptsInfo.badgeText} (अंतिम भर्ती वर्ष: ${attemptsInfo.lastEligibleYear})` : ""}
================================================
यह पर्ची साइबर कैफे / ऑनलाइन फॉर्म भरने एवं आधिकारिक रिकॉर्ड हेतु मान्य है।
Verified by: Sarkari Age Calculator (सरकारी एज कैलकुलेटर)
================================================`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSlip(true);
      setTimeout(() => setCopiedSlip(false), 2500);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slipModalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="no-print bg-slate-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="font-bold text-sm tracking-wide block">
                Sarkari Age Calculator
              </span>
              <span className="text-[10px] text-slate-300 block">
                Official Eligibility Verification Slip
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close slip"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Printable Official Slip Document */}
          <div
            id="printableEligibilitySlip"
            className="bg-white border-2 border-slate-800 rounded-xl p-4 sm:p-5 text-slate-900 shadow-xs relative"
          >
            {/* Watermark Logo / Govt Seal Style */}
            <div className="text-center border-b-2 border-slate-800 pb-3 mb-3">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 mb-1.5">
                <span>🇮🇳</span>
                <span>Sarkari Age Calculator • Official Verification Slip</span>
              </div>
              <h2 id="slipModalTitle" className="text-lg sm:text-xl font-black text-slate-900">
                सरकारी परीक्षा आयु एवं पात्रता सत्यापन पर्ची
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                साइबर कैफे (Cyber Cafe) फॉर्म भरने एवं रिकॉर्ड हेतु मान्य • Slip Ref:{" "}
                <span className="font-mono font-bold text-slate-700">{slipId}</span>
              </p>
            </div>

            {/* Candidate & Exam Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  परीक्षा (Exam Name)
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {examTitle}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  निर्धारित कटऑफ तिथि (Cutoff)
                </span>
                <span className="font-bold text-blue-700 text-xs sm:text-sm">
                  {targetDateFormatted}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  अभ्यर्थी जन्म तिथि (DOB)
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {dobFormatted}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  आरक्षण श्रेणी (Category)
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Exact Age Calculated Block */}
            <div className="border border-indigo-200 bg-indigo-50/70 rounded-xl p-3 mb-3 text-center">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide block">
                कटऑफ तिथि तक सटीक आयु (Exact Age on Cutoff Date)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 my-1">
                {result.years}{" "}
                <span className="text-sm sm:text-base font-semibold text-slate-600">साल</span>{" "}
                {result.months}{" "}
                <span className="text-sm sm:text-base font-semibold text-slate-600">माह</span>{" "}
                {result.days}{" "}
                <span className="text-sm sm:text-base font-semibold text-slate-600">दिन</span>
              </div>
              <div className="flex justify-center gap-4 text-[11px] text-slate-600 mt-1">
                <span>कुल दिन: <strong>{result.totalDays.toLocaleString()}</strong></span>
                <span>•</span>
                <span>कुल माह: <strong>{result.totalMonths.toLocaleString()}</strong></span>
                <span>•</span>
                <span>स्वीकृत सीमा: <strong>{minAgeRequirement} से {effectiveMaxAge} वर्ष</strong></span>
              </div>
            </div>

            {/* Official Eligibility Status Stamp */}
            <div
              className={`p-3 rounded-xl border-2 flex items-center justify-between gap-3 mb-3 ${
                isEligible
                  ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                  : isOverAge
                  ? "bg-red-50 border-red-600 text-red-950"
                  : "bg-amber-50 border-amber-600 text-amber-950"
              }`}
            >
              <div className="flex items-center gap-2">
                {isEligible ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : isOverAge ? (
                  <XCircle className="w-7 h-7 text-red-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-amber-600 shrink-0" />
                )}
                <div>
                  <div className="font-black text-sm sm:text-base tracking-wide uppercase">
                    {eligibilityStatus?.label}
                  </div>
                  <div className="text-[11px] opacity-90 line-clamp-1">
                    {eligibilityStatus?.message}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    isEligible
                      ? "bg-emerald-600 text-white"
                      : isOverAge
                      ? "bg-red-600 text-white"
                      : "bg-amber-600 text-white"
                  }`}
                >
                  {isEligible ? "VERIFIED VALID" : isOverAge ? "DISQUALIFIED" : "PENDING AGE"}
                </span>
              </div>
            </div>

            {/* Attempts Breakdown Row */}
            {attemptsInfo && (
              <div className="bg-slate-100 border border-slate-300 rounded-lg p-2.5 mb-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">
                      {attemptsInfo.badgeText}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      अंतिम भर्ती पात्रता वर्ष: <strong>{attemptsInfo.lastEligibleYear}</strong>
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-300">
                  {attemptsInfo.estimatedAttempts > 0
                    ? `${attemptsInfo.estimatedAttempts} Attempts`
                    : "0 Attempts"}
                </span>
              </div>
            )}

            {/* Footer Verification Stamp */}
            <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
              <span>जारी दिनांक: {currentDateStr}</span>
              <span className="font-semibold text-slate-700">
                ✓ System Verified • 100% Accurate Govt Formula
              </span>
            </div>
          </div>

          {/* Clean Sponsored Study Material / Mock Test Ad Block (Zero Irritation, Extra Revenue) */}
          <div className="no-print bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold block text-slate-900">
                  📚 {examTitle} फ्री मॉक टेस्ट एवं पिछले 10 साल के पेपर
                </span>
                <span className="text-[11px] text-slate-600">
                  फॉर्म भरने से पहले अपनी तैयारी जांचें • Sponsored Study Kit
                </span>
              </div>
            </div>
            <span className="shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1 shadow-xs">
              <span>फ्री टेस्ट दें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden in Print) */}
        <div className="no-print bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            id="printSlipBtn"
            onClick={handlePrintSlip}
            className="flex-1 py-3 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            title="Save as PDF or Print Slip"
          >
            <Printer className="w-4 h-4" />
            <span>Save as PDF (प्रिंट करें)</span>
          </button>

          <button
            type="button"
            id="downloadSlipFileBtn"
            onClick={handleDownloadSlipHtml}
            className="flex-1 py-3 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            title="Download slip file directly"
          >
            <Download className="w-4 h-4" />
            <span>Download Slip (सेव करें)</span>
          </button>

          <button
            type="button"
            onClick={handleCopySlipText}
            className="py-3 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
          >
            {copiedSlip ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-500" />
            )}
            <span>{copiedSlip ? "कॉपी हुआ!" : "कॉपी टेक्स्ट"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-3 text-slate-500 hover:text-slate-800 font-medium text-xs sm:text-sm rounded-lg transition"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
