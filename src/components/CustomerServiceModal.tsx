import React, { useState } from 'react';
import { X, HelpingHand, MessageSquare, ChevronDown, ChevronUp, Send, CheckCircle, ShieldCheck, Ticket } from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIAssistant: () => void;
  showToast: (msg: string) => void;
}

interface FAQItem {
  q: string;
  a: string;
}

interface TicketLog {
  id: string;
  topic: string;
  message: string;
  status: 'pending' | 'reviewed';
  createdAt: string;
}

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  onOpenAIAssistant,
  showToast,
}) => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  
  // Ticketing states
  const [topic, setTopic] = useState('شحنات وتوصيل الطلبات');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTickets, setSubmittedTickets] = useState<TicketLog[]>([]);

  if (!isOpen) return null;

  const faqs: FAQItem[] = [
    {
      q: 'كيف يمكنني تتبع خط سير شحنتي في مصر؟',
      a: 'بمجرد تأكيد طلبك، ستحصل فوراً على رقم شحنة فريد يبدأ بـ (AF-). يمكنك مراجعة شحناتك الحالية وتتبع حالتها وسجل الفواتير من خلال الضغط على زر "السجل" أو "الطلبات" المطور في أعلى الصفحة.',
    },
    {
      q: 'هل خيار الدفع نقدًا عند الاستلام يضيف رسوماً إضافية؟',
      a: 'لا، في متجر عافية نوفر ميزة التوصيل مع فحص المشتريات والدفع نقدًا عند الاستلام بالكامل مجانًا، بدون أي مصاريف أو رسوم إدارية مخفية نهائياً لضمان رضاك الأكيد.',
    },
    {
      q: 'ما هي سياسة وسيستم الإرجاع والاستبدال المتبع؟',
      a: 'يمكنك طلب إرجاع مجاني لأي سلعة قمت بشرائها من عافية في غضون ١٤ يوماً من تاريخ الاستلام، طالما أن السلعة في حالتها الأصلية غير منزوعة الأغلفة والكتالوجات والمكونات المرفقة بها.',
    },
    {
      q: 'كيف أبدأ في عرض سلعي ومنتجاتي للبيع بصفتي بائع مستقل؟',
      a: 'اضغط على زر "ابدأ البيع عبر عافية" في شريط القائمة العلوي لفتح مركز التجار مباشرة. يمكنك إدراج صور ومواصفات وسعر أي سلعة تريدها، وسيقوم فريق عافية بمراجعتها ونشرها فوراً للجمهور المصري.',
    }
  ];

  const handleFAQToggle = (idx: number) => {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('⚠️ يرجى كتابة تفاصيل الشكوى أو الاستفسار أولاً قبل الإرسال.');
      return;
    }

    const newTicket: TicketLog = {
      id: `TIC-${Math.floor(10000 + Math.random() * 89999).toString()}`,
      topic,
      message,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setSubmittedTickets((prev) => [newTicket, ...prev]);
    showToast(`🎉 تم تسجيل تذكرتك بنجاح برقم: ${newTicket.id}. سيقوم أحد ممثلي الدعم الفني بمراجعتها والرد عليك خلال بضع ساعات.`);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="customer-service-modal-wrapper">
      <div className="bg-[#fcfdfd] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header bar */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-x-2">
            <HelpingHand className="w-5 h-5 text-[#e9be64]" />
            <span className="text-sm md:text-base font-extrabold text-white">مركز خدمة وعناية عملاء عافية الموحد</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll content */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-right">
          
          {/* Quick AI gateway */}
          <div className="bg-gradient-to-l from-teal-900 to-teal-800 p-4 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-right">
              <h4 className="text-sm font-black text-white">هل تفضل الحصول على إجابة ذكية فورية؟</h4>
              <p className="text-[10px] text-teal-150 font-bold">مساعد عافية الذكي مدرب على إيجاد العروض وحل مشاكل التسليم فوراً.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onOpenAIAssistant();
                onClose();
              }}
              className="bg-[#e9be64] hover:bg-[#dfb055] text-teal-980 font-black px-4 py-2 rounded-lg text-xs border-0 cursor-pointer shadow-md flex items-center gap-x-1.5 shrink-0 transition-transform hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-teal-980" /> تحدث مع المساعد الذكي 🤖
            </button>
          </div>

          {/* Collapsible FAQ list */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">أسئلة شائعة مكررة وتوجيهات سريعة:</h4>
            
            <div className="space-y-1.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFAQIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-gray-150 bg-white rounded-lg overflow-hidden transition-all hover:bg-gray-50/50"
                  >
                    <button
                      type="button"
                      onClick={() => handleFAQToggle(idx)}
                      className="w-full text-right px-4 py-3 flex items-center justify-between font-bold text-xs text-gray-800 cursor-pointer border-0 bg-transparent"
                    >
                      <span>💡 {faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-0.5 text-[11px] text-gray-600 leading-normal border-t border-gray-50 bg-gray-50/30 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complaint Ticketing form */}
          <div className="border border-dashed border-teal-200 rounded-xl p-4 bg-teal-50/10 space-y-4">
            <div className="text-right">
              <h4 className="text-xs font-black text-teal-980 flex items-center gap-x-1.5">
                <Ticket className="w-4 h-4 text-[#0d9488]" /> تقديم بطاقة شكوى أو استفسار فني مباشر:
              </h4>
              <p className="text-[10px] text-gray-450 mt-0.5">في حالة وجود أي مشكلة بشحن الطلبات، يرجى كتابتها وسيتم تتبعها فورا.</p>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Topic selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 block">تصنيف أو موطن الاستفسار:</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white cursor-pointer"
                  >
                    <option value="شحنات وتوصيل الطلبات">شحنات وتوصيل الطلبات</option>
                    <option value="بوابة الدفع الإلكتروني وتفاصيل الفاتورة">بوابة الدفع الإلكتروني وتفاصيل الفاتورة</option>
                    <option value="جودة المنتجات والضمان والكتالوجات">جودة المنتجات والضمان والكتالوجات</option>
                    <option value="المقترحات والأفكار التطويرية للموقع">المقترحات والأفكار التطويرية للموقع</option>
                  </select>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 block">بريدك الإلكتروني لمتابعة الردود (اختياري):</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@yourdomain.eg"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white text-left font-mono"
                  />
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 block">المحتوى والشكوى بالتفصيل:</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب هنا تفاصيل الشكوى أو كود الشحنة والاتصال لنبادر بمساعدتك فوراً..."
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#115e59] bg-white"
                  required
                />
              </div>

              {/* Submit Ticket */}
              <div>
                <button
                  type="submit"
                  className="bg-[#115e59] hover:bg-[#0d4f4b] text-white font-extrabold px-5 py-2 rounded text-xs select-none cursor-pointer border-0 shadow flex items-center gap-x-1"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" /> إرسال بطاقة المقابلة والدعم الفني
                </button>
              </div>
            </form>

            {/* List Submitted current tickets */}
            {submittedTickets.length > 0 && (
              <div className="pt-2 border-t border-gray-150 space-y-2">
                <p className="text-[10px] font-black text-gray-400">تذاكر الدعم والشكاوى المفتوحة والموثقة بنشاطك ({submittedTickets.length}):</p>
                <div className="space-y-1.5">
                  {submittedTickets.map((tc) => (
                    <div key={tc.id} className="bg-white p-2.5 rounded border border-gray-150 text-[10px] flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-gray-800">📌 تصنيف: {tc.topic} (رقم {tc.id})</p>
                        <p className="text-gray-500 mt-0.5 line-clamp-1">تفاصيل الرسالة: "{tc.message}"</p>
                      </div>
                      <span className="inline-flex items-center gap-x-1 text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                        ⏳ جاري معالجة الشكوى من قبل ممثل عافية
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0 text-[10px] text-gray-450">
          <span className="flex items-center gap-x-1 text-emerald-700 font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5" /> جميع اتصالاتك مشفرة ومؤمنة بالكامل
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-750 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق نافذة خدمة العملاء
          </button>
        </div>

      </div>
    </div>
  );
};
