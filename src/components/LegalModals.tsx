import { X, Shield, FileText, Info, Mail } from "lucide-react";

export type LegalModalType = "privacy" | "terms" | "about" | "contact" | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export default function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  if (!activeModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh] my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
            {activeModal === "privacy" && (
              <>
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Privacy Policy (गोपनीयता नीति)</span>
              </>
            )}
            {activeModal === "terms" && (
              <>
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Terms & Conditions (नियम एवं शर्तें)</span>
              </>
            )}
            {activeModal === "about" && (
              <>
                <Info className="w-5 h-5 text-blue-600" />
                <span>About Us (हमारे बारे में)</span>
              </>
            )}
            {activeModal === "contact" && (
              <>
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Contact Us (संपर्क करें)</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
          {activeModal === "privacy" && (
            <>
              <p className="font-semibold text-slate-800">
                अंतिम अपडेट: 18 सितम्बर 2026 (Last Updated: September 18, 2026)
              </p>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">1. डेटा संग्रह (No Data Storage)</h3>
                <p>
                  यह Online Age Calculator आपकी निजता (Privacy) का पूर्ण सम्मान करता है। जब आप अपनी जन्मतिथि (Date of Birth) या गणना तारीख दर्ज करते हैं, तो वह केवल आपके वेब ब्राउज़र में प्रोसेस होती है। हम कोई भी व्यक्तिगत डेटा किसी सर्वर पर स्टोर या प्रोसेस नहीं करते हैं।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">2. कुकीज़ और वेब बीकन (Cookies & Google AdSense)</h3>
                <p>
                  विज्ञापन दिखाने के लिए गूगल (Google) और उसके सहयोगी वेंडर तीसरे पक्ष की कुकीज़ (जैसे DART Cookie) का उपयोग कर सकते हैं ताकि उपयोगकर्ताओं को उनकी प्राथमिकताओं के अनुसार उपयुक्त विज्ञापन दिखाए जा सकें। उपयोगकर्ता अपनी ब्राउज़र सेटिंग्स में जाकर कुकीज़ को अक्षम कर सकते हैं।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">3. तृतीय-पक्ष लिंक (Third-Party Links)</h3>
                <p>
                  हमारी वेबसाइट पर बाहरी वेबसाइटों के विज्ञापन या लिंक हो सकते हैं। उन वेबसाइटों की अपनी स्वतंत्र गोपनीयता नीतियां होती हैं, जिनके लिए हम उत्तरदायी नहीं हैं।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">4. बच्चों की सुरक्षा (COPPA Policy)</h3>
                <p>
                  हम जानबूझकर 13 वर्ष से कम उम्र के बच्चों से कोई भी व्यक्तिगत रूप से पहचान योग्य जानकारी एकत्र नहीं करते हैं।
                </p>
              </div>
            </>
          )}

          {activeModal === "terms" && (
            <>
              <p className="font-semibold text-slate-800">
                उपयोग की शर्तें (Terms of Service)
              </p>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">1. सेवा की स्वीकृति</h3>
                <p>
                  इस वेबसाइट का उपयोग करके आप इन नियमों व शर्तों को पूरी तरह स्वीकार करते हैं। यह टूल केवल सामान्य सूचना एवं शैक्षणिक उपयोग के लिए निःशुल्क प्रदान किया गया है।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">2. गणना की सटीकता एवं सरकारी फॉर्म</h3>
                <p>
                  यद्यपि हमारे एल्गोरिदम कैलेंडर के सटीक गणित और लीप वर्ष के अनुसार 100% शुद्ध गणना करते हैं, फिर भी किसी भी आधिकारिक भर्ती (जैसे UPSC, SSC, State Police, Railway) या कानूनी दस्तावेज़ में आवेदन करते समय संबंधित आधिकारिक अधिसूचना (Official Notification) के दिशा-निर्देशों से मिलान करने की सलाह दी जाती है।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">3. अस्वीकरण (Disclaimer of Liability)</h3>
                <p>
                  इस कैलकुलेटर के उपयोग से होने वाले किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान या असुविधा के लिए वेबसाइट संचालक उत्तरदायी नहीं होगा।
                </p>
              </div>
            </>
          )}

          {activeModal === "about" && (
            <>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">हमारे बारे में (About Online Age Calculator)</h3>
                <p>
                  Online Age Calculator एक निःशुल्क, आधुनिक और तेज़ वेब यूटिलिटी टूल है जिसे छात्रों, नौकरी के उम्मीदवारों और आम जनता की सुविधा के लिए तैयार किया गया है।
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">हमारा उद्देश्य</h3>
                <p>
                  अक्सर सरकारी परीक्षाओं, स्कूल दाखिले, पेंशन या पासपोर्ट आवेदन के दौरान सटीक दिन, महीने और साल में उम्र निकालने में परेशानी होती है। हमारा उद्देश्य एक अत्यंत सरल, तेज़ और मोबाइल-फ्रेंडली इंटरफ़ेस प्रदान करना है जो बिना किसी देरी के सटीक उत्तर दे।
                </p>
              </div>
            </>
          )}

          {activeModal === "contact" && (
            <>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">संपर्क सूत्र (Contact Information)</h3>
                <p>
                  यदि आपके पास किसी भी प्रकार का सुझाव, प्रश्न या तकनीकी समस्या है, तो आप हमें संपर्क कर सकते हैं:
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-medium text-slate-700">
                <p>📧 ईमेल: support@onlineagecalculator.app</p>
                <p>🌐 वेबसाइट: Online Age Calculator (Umar Kaise Nikale)</p>
                <p>⏰ प्रतिक्रिया समय: 24-48 कार्य घंटे</p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
