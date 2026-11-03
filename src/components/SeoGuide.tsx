import { Check, Info, ShieldCheck } from "lucide-react";

export default function SeoGuide() {
  return (
    <section id="seoGuideSection" className="w-full max-w-[480px] my-3 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 text-slate-700">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
        <Info className="w-5 h-5 text-blue-600 shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          उम्र कैसे निकालें? (Step-by-Step Guide)
        </h2>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed mb-4 text-slate-600">
        यह ऑनलाइन आयु कैलकुलेटर (Online Age Calculator) किसी भी दो तारीखों के बीच की सटीक उम्र, कुल दिन, महीने एवं आगामी जन्मदिन के दिन निकालने के लिए विकसित किया गया है।
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2.5 text-xs sm:text-sm">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
            1
          </div>
          <div>
            <strong className="text-slate-900">Age at Date (लक्ष्य तारीख):</strong> जिस तारीख तक आपको अपनी उम्र निकालनी है, वह दर्ज करें (जैसे आज की तारीख या परीक्षा की कट-ऑफ तारीख)।
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs sm:text-sm">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
            2
          </div>
          <div>
            <strong className="text-slate-900">Date of Birth (जन्म तिथि):</strong> अपनी सही जन्मतिथि (दिन, माह, वर्ष) दर्ज करें या कैलेंडर आइकन से चुनें।
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs sm:text-sm">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
            3
          </div>
          <div>
            <strong className="text-slate-900">Calculate Age पर क्लिक करें:</strong> तुरंत आपकी उम्र दिन, महीने व साल में, कुल दिन व कुल महीने स्क्रीन पर प्रदर्शित हो जाएंगे।
          </div>
        </div>
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-start gap-2.5 text-xs text-blue-950">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Googlebot & User Privacy:</strong> यह टूल 100% क्लाइंट-साइड सुरक्षा के साथ कार्य करता है। आपका डेटा किसी भी बाहरी सर्वर पर स्टोर नहीं किया जाता।
        </div>
      </div>
    </section>
  );
}
