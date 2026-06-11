import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Send, Check, Wallet, Smartphone, Landmark } from 'lucide-react';

interface GiftCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const GiftCardsModal: React.FC<GiftCardsModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'redeem'>('create');
  
  // Custom Designer State
  const [template, setTemplate] = useState<'ramadan' | 'birthday' | 'thankyou' | 'general'>('ramadan');
  const [value, setValue] = useState(500);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  
  // Redemption State
  const [voucherCode, setVoucherCode] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  // Load wallet balance from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('afia_wallet_balance');
    if (savedBalance) {
      setWalletBalance(parseFloat(savedBalance));
    } else {
      localStorage.setItem('afia_wallet_balance', '0');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !sender.trim()) {
      showToast('⚠️ من فضلك أكمل كتابة اسم المرسل والراسل لإصدار وإرسال البطاقة.');
      return;
    }
    
    // Simulate generation
    showToast(`🎉 تم إرسال بطاقة الهدايا بقيمة ${value} ج.م إلى البريد المحدد بنجاح! وسيحصل على الكود لتمكينه من شحن رصيده.`);
    // Reset
    setRecipient('');
    setMessage('');
  };

  const handleRedeemBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    
    // Pre-defined code vouchers to help user do real testing
    let amountToAdd = 0;
    
    if (code === 'AFIA-RAMADAN-500') {
      amountToAdd = 500;
    } else if (code === 'AFIA-HBD-200') {
      amountToAdd = 200;
    } else if (code === 'AFIA-THANKYOU-100') {
      amountToAdd = 100;
    } else if (code === 'EAFIA-EID-1000') {
      amountToAdd = 1000;
    } else if (code.startsWith('AFIA-') && code.length > 8) {
      // Secret key generator
      amountToAdd = Math.floor(50 + Math.random() * 450);
    } else {
      showToast('❌ الكود الذي أدخلته غير متوافر أو تم استخدامه مسبقاً.');
      return;
    }

    const currentUsedCodes = JSON.parse(localStorage.getItem('afia_used_vouchers') || '[]');
    if (currentUsedCodes.includes(code)) {
      showToast(`⚠️ هذا الكود (${code}) تم استخدامه في محفظتك مسبقاً ولا يمكن شحنه مجدداً!`);
      return;
    }

    const newBalance = walletBalance + amountToAdd;
    setWalletBalance(newBalance);
    localStorage.setItem('afia_wallet_balance', newBalance.toString());
    
    // Save in utilized list
    currentUsedCodes.push(code);
    localStorage.setItem('afia_used_vouchers', JSON.stringify(currentUsedCodes));

    // Force dispatching storage event for custom live header counters
    window.dispatchEvent(new Event('storage'));

    showToast(`🎉 مبروك! تم إضافة ${amountToAdd} ج.م إلى رصيد محفظتك بموقع عافية. رصيدك الحالي: ${newBalance} ج.م. 💰`);
    setVoucherCode('');
  };

  // Switch card preview styles based on selection
  const getBannerDetails = () => {
    switch (template) {
      case 'ramadan':
        return {
          bg: 'from-[#0a1e1b] via-[#104a3e] to-[#cba358]',
          title: 'بطاقة عافية الرمضانية 🌙',
          textColor: 'text-[#ffe7ba]',
          subText: 'رمضان كريم وكل عام وأنتم بخير'
        };
      case 'birthday':
        return {
          bg: 'from-[#be185d] via-[#e11d48] to-[#fb7185]',
          title: 'بطاقة عيد ميلاد سعيد 🎂',
          textColor: 'text-rose-50',
          subText: 'أتمنى لك عاماً رائعاً مليئاً بالصحة والعافية'
        };
      case 'thankyou':
        return {
          bg: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
          title: 'بطاقة شكر وتقدير مخصصة 💝',
          textColor: 'text-sky-50',
          subText: 'شكراً جزيلاً لك على كل شيء'
        };
      default:
        return {
          bg: 'from-[#0d3230] via-[#0d9488] to-[#e9be64]',
          title: 'بطاقة هدايا عافية العامة 🎉',
          textColor: 'text-teal-50',
          subText: 'من عافية، تسوق غني بالصحة والأمل والسعادة'
        };
    }
  };

  const activeTheme = getBannerDetails();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="gift-cards-modal-wrapper">
      <div className="bg-[#fcfdfd] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header banner */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-x-2">
            <Gift className="w-5 h-5 text-[#e9be64]" />
            <span className="text-sm md:text-base font-extrabold text-white">متجر بطاقات الشحن والهدايا المخصصة للآباء والمقربين</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-gray-150 bg-teal-50/10 shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 text-center py-3 text-xs font-bold border-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'create' 
                ? 'border-[#0d9488] text-[#0d9488] bg-white font-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            🎁 صمم بطاقة إهداء فاخرة
          </button>
          <button
            onClick={() => setActiveTab('redeem')}
            className={`flex-1 text-center py-3 text-xs font-bold border-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'redeem' 
                ? 'border-[#0d9488] text-[#0d9488] bg-white font-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            💰 شحن رصيد محفظتي عافية
          </button>
        </div>

        {/* Content Box */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-right">

          {activeTab === 'create' ? (
            <div className="space-y-6">
              
              {/* Live Preview Display Card of design */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-extrabold block">معاينة حية لبطاقة الهدايا:</span>
                
                <div className={`w-full h-44 rounded-xl bg-gradient-to-tr ${activeTheme.bg} p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group`}>
                  
                  {/* Backdrop lights */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                  
                  {/* Top line value and brand */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-x-1">
                      <div className="w-6 h-6 rounded-sm bg-[#e9be64] flex items-center justify-center text-teal-950 font-bold text-xs shadow-sm">ع</div>
                      <span className="text-xs font-extrabold tracking-tight">AFIA GIFT CARD</span>
                    </div>
                    {/* Price stamp */}
                    <div className="bg-[#e9be64] text-teal-950 px-3 py-1 rounded-sm shadow-md font-mono font-black text-sm">
                      {value.toLocaleString('ar-EG')} ج.م
                    </div>
                  </div>

                  {/* Centered message banner */}
                  <div className="my-2 relative z-10 text-center">
                    <p className={`text-sm md:text-base font-black ${activeTheme.textColor}`}>{activeTheme.title}</p>
                    <p className="text-[10px] opacity-80 font-medium mt-1">
                      {message.trim() ? `"${message}"` : activeTheme.subText}
                    </p>
                  </div>

                  {/* Bottom line names */}
                  <div className="flex items-end justify-between relative z-10 text-right border-t border-white/10 pt-2 text-[10px] opacity-90">
                    <div>
                      <span>إلى العزيز: </span>
                      <span className="font-extrabold underline decoration-white/20">{recipient || '.....'}</span>
                    </div>
                    <div>
                      <span>من الراسل: </span>
                      <span className="font-extrabold underline decoration-white/20">{sender || '.....'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Customizer Forms */}
              <form onSubmit={handleCreateGiftCard} className="space-y-4 pt-1.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Theme */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">اختر قالب التصميم واللون:</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTemplate('ramadan')}
                        className={`py-1.5 px-1 rounded text-[10px] font-black border text-center cursor-pointer transition-colors ${
                          template === 'ramadan' 
                            ? 'bg-[#104a3e] border-[#cba358] text-white shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-150'
                        }`}
                      >
                        🌙 رمضان
                      </button>
                      <button
                        type="button"
                        onClick={() => setTemplate('birthday')}
                        className={`py-1.5 px-1 rounded text-[10px] font-black border text-center cursor-pointer transition-colors ${
                          template === 'birthday' 
                            ? 'bg-rose-600 border-rose-300 text-white shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-150'
                        }`}
                      >
                        🎂 ميلاد
                      </button>
                      <button
                        type="button"
                        onClick={() => setTemplate('thankyou')}
                        className={`py-1.5 px-1 rounded text-[10px] font-black border text-center cursor-pointer transition-colors ${
                          template === 'thankyou' 
                            ? 'bg-sky-600 border-sky-300 text-white shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-150'
                        }`}
                      >
                        💝 شكر
                      </button>
                      <button
                        type="button"
                        onClick={() => setTemplate('general')}
                        className={`py-1.5 px-1 rounded text-[10px] font-black border text-center cursor-pointer transition-colors ${
                          template === 'general' 
                            ? 'bg-[#0d3230] border-[#e9be64] text-white shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-150'
                        }`}
                      >
                        🌟 عافية
                      </button>
                    </div>
                  </div>

                  {/* Pick Value */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">قيمة رصيد بطاقة الهدايا:</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[100, 250, 500, 1000].map((val) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setValue(val)}
                          className={`py-1.5 px-1 rounded text-[10px] font-black border text-center cursor-pointer transition-colors ${
                            value === val 
                              ? 'bg-[#0d9488] border-teal-500 text-white shadow-sm font-extrabold' 
                              : 'bg-white border-gray-200 text-gray-750 hover:bg-gray-150'
                          }`}
                        >
                          {val} ج.م
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Recipient */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">اسم المستلم أو المهدى إليه:</label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="مثال: والدي العزيز أبو أحمد"
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 bg-white"
                      required
                    />
                  </div>

                  {/* Sender */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">اسم الراسل أو المـهدي:</label>
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="مثال: ابنك البار علاء الدين"
                      className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">رسالة إهداء معبرة مخصصة:</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب تهنئتك هنا ليتم كتابتها فوراً وبدقة على بطاقتك..."
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-teal-500 bg-white"
                  />
                </div>

                {/* Submit Order */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#115e59] hover:bg-[#0d4f4b] text-white font-extrabold py-2 px-4 rounded text-xs select-none cursor-pointer border-0 shadow flex items-center justify-center gap-x-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" /> تأكيد الدفع وإصدار وإرسال البطاقة له
                  </button>
                </div>
              </form>

            </div>
          ) : (
            // REDEEM TAB
            <div className="space-y-5">
              
              {/* Wallet Card status */}
              <div className="bg-[#232f3e]/10 border border-[#232f3e]/20 p-4 rounded-lg flex items-center justify-between text-right">
                <div className="flex items-center gap-x-3">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-[#115e59]">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs text-gray-400 font-bold">رصيد محفظتي المالي لخدمات عافية:</h5>
                    <p className="text-xl font-black text-gray-900 mt-0.5">{walletBalance.toLocaleString('ar-EG')} ج.م</p>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 font-black text-left bg-white px-2 py-1 border rounded shadow-xs">
                  محفظة رقمية آمنة 🔒
                </div>
              </div>

              {/* Redeem Voucher Code Form */}
              <form onSubmit={handleRedeemBalance} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">أدخل كود قسيمة الشحن أو بطاقة الهدايا:</label>
                  <div className="flex gap-x-2">
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="مثال: AFIA-RAMADAN-500"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#115e59] bg-white text-center font-mono font-black placeholder:font-sans uppercase text-gray-800"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#115e59] hover:bg-[#0d4f4b] text-white px-6 py-2 rounded text-xs font-black cursor-pointer border-0 shadow"
                    >
                      شحن الرصيد مجاناً
                    </button>
                  </div>
                </div>

                {/* Helpful list of active voucher codes to let users explore */}
                <div className="border border-dashed border-teal-200 rounded-lg p-3 bg-teal-50/20 text-right space-y-2">
                  <p className="text-[10px] font-black text-teal-980">💡 أكواد تجريبية جاهزة للاستخدام من عافية (انسخ الكود في الأعلى واشحن):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-gray-600 font-bold">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span>هدية رمضان:</span>
                      <code className="font-mono bg-white px-1 border select-all text-teal-700">AFIA-RAMADAN-500</code>
                      <span className="text-[#0d9488]">500 ج.م</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <span>هدية العيد:</span>
                      <code className="font-mono bg-white px-1 border select-all text-teal-700">EAFIA-EID-1000</code>
                      <span className="text-[#0d9488]">1000 ج.م</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <span>عيد ميلاد سعيد:</span>
                      <code className="font-mono bg-white px-1 border select-all text-teal-700">AFIA-HBD-200</code>
                      <span className="text-[#0d9488]">200 ج.م</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-1">
                      <span>بطاقة شكر:</span>
                      <code className="font-mono bg-white px-1 border select-all text-teal-700">AFIA-THANKYOU-100</code>
                      <span className="text-[#0d9488]">100 ج.م</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-amber-600 font-bold pt-1">⚠️ ملحوظة: الكود صالح شحنه لمرة واحدة فقط لكل حساب عافية.</p>
                </div>
              </form>

              {/* Simulated bank transfer block */}
              <div className="border border-gray-150 rounded-lg p-4 bg-gray-50/50 text-right space-y-3">
                <h6 className="text-[11px] font-black text-gray-500 flex items-center gap-x-1">
                  <Landmark className="w-3.5 h-3.5 text-gray-400" /> الشحن البنكي المباشر والمحفظة الإلكترونية:
                </h6>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-white p-2 border rounded flex items-center gap-x-1.5 py-1.5 px-3 flex-1">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <div className="text-[10px]">
                      <p className="text-gray-400">محفظة فودافون كاش 📱</p>
                      <p className="font-black text-gray-700 mt-0.5">01012345678</p>
                    </div>
                  </div>
                  <div className="bg-white p-2 border rounded flex items-center gap-x-1.5 py-1.5 px-3 flex-1">
                    <Landmark className="w-4 h-4 text-sky-700" />
                    <div className="text-[10px]">
                      <p className="text-gray-400">التحويل على حساب CIB 🏦</p>
                      <p className="font-black text-gray-700 mt-0.5">100020304050</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0">
          <p className="text-[10px] text-gray-450">جميع بطاقات عافية مشفرة ببروتوكولات أمان SSL ومحمية بشكل كامل.</p>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-750 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
