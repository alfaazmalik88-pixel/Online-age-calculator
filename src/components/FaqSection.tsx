import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "उम्र (Age) की सही गणना कैसे की जाती है?",
    answer:
      "उम्र की गणना जन्म तिथि (Date of Birth) और वर्तमान या लक्ष्य तारीख (Target Date) के बीच साल, महीने और दिनों को घटाकर की जाती है। हमारा टूल प्रत्येक महीने में दिनों की वास्तविक संख्या (28, 29, 30 या 31 दिन) तथा लीप वर्ष (Leap Year) को ध्यान में रखकर 100% सटीक परिणाम देता है।",
  },
  {
    question: "क्या यह कैलकुलेटर सरकारी भर्ती (SSC, UPSC, Police, Railway, Army) के लिए मान्य है?",
    answer:
      "हाँ, बिल्कुल! अधिकांश सरकारी भर्तियों में एक निश्चित तारीख (जैसे 01/01/2026 या 01/07/2026) पर न्यूनतम व अधिकतम आयु सीमा मांगी जाती है। आप 'Age at Date' में विज्ञापन में दी गई कट-ऑफ तारीख डालकर अपनी योग्य आयु आसानी से जांच सकते हैं।",
  },
  {
    question: "18 साल की उम्र कब पूरी होगी यह कैसे पता करें?",
    answer:
      "यदि आप जानना चाहते हैं कि आप 18 वर्ष के कब होंगे, तो अपनी जन्मतिथि में 18 वर्ष जोड़ें। जैसे यदि जन्मतिथि 18-09-2008 है, तो आप ठीक 18-09-2026 को पूरे 18 वर्ष के हो जाएंगे।",
  },
  {
    question: "क्या इस वेबसाइट पर मेरा व्यक्तिगत डेटा या जन्मतिथि सुरक्षित है?",
    answer:
      "हाँ, आपका डेटा 100% सुरक्षित और गोपनीय है। यह कैलकुलेटर पूर्णतः क्लाइंट-साइड (आपके मोबाइल या कंप्यूटर ब्राउज़र में) चलता है। आपकी जन्मतिथि किसी भी सर्वर या डेटाबेस में सेव नहीं की जाती है।",
  },
  {
    question: "आरक्षण श्रेणी (OBC / SC / ST) में आयु सीमा में कितनी छूट मिलती है?",
    answer:
      "सामान्यतः केंद्र एवं राज्य सरकार की भर्तियों (जैसे SSC, Police, Railway आदि) में OBC (नॉन-क्रीमी लेयर) को 3 वर्ष, SC / ST वर्ग को 5 वर्ष तथा PwD दिव्यांग अभ्यर्थियों को 10 वर्ष की ऊपरी आयु सीमा में छूट मिलती है। आप ऊपर अपनी श्रेणी चुनकर तुरंत अपनी पात्रता (Eligible/Over-age) देख सकते हैं।",
  },
  {
    question: "अगले जन्मदिन (Next Birthday) के दिन कैसे गिने जाते हैं?",
    answer:
      "कैलकुलेटर आपकी जन्मतिथि के दिन और महीने को चालू वर्ष से मिलाकर गणना करता है। यदि इस वर्ष का जन्मदिन बीत चुका है, तो यह अगले वर्ष के जन्मदिन तक बचे हुए सटीक दिनों की गिनती दिखाता है।",
  },
  {
    question: "Upcoming Attempts Counter से 'कितने मौके बाकी हैं' कैसे पता चलता है?",
    answer:
      "हमारा टूल आपकी चुनी गई भर्ती परीक्षा की अधिकतम आयु सीमा (आरक्षण छूट सहित) और आपकी वर्तमान सटीक आयु का अंतर निकालता है। यदि आप पात्र हैं, तो यह बताता है कि आप किस वर्ष तक परीक्षा दे सकते हैं और आपके पास कितने वार्षिक मौके बाकी हैं। यदि आपकी उम्र ऊपरी सीमा के बहुत करीब है, तो यह 'अंतिम मौका (Last Attempt)' का अलर्ट भी दिखाता है।",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqSection" className="w-full max-w-[480px] my-4 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          अक्सर पूछे जाने वाले सवाल (FAQ & Questions)
        </h2>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left px-4 py-3 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-sm font-semibold text-slate-800 transition cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 py-3 text-xs sm:text-sm text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
