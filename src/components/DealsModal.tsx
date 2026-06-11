import React, { useState, useEffect } from 'react';
import { X, Sparkles, Flame, Copy, Check, ShoppingCart, Percent } from 'lucide-react';
import { Product } from '../types';

interface DealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const DealsModal: React.FC<DealsModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer simulation
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter only items with discount
  const discountedProducts = products.filter((p) => p.oldPrice && p.oldPrice > p.price);

  const promoCoupons = [
    { code: 'AFIA20', discount: '20% خصم إضافي', desc: 'على كافة إكسسوارات الألعاب وألعاب الأطفال' },
    { code: 'BBQSUMMER', discount: 'خصم 150 ج.م', desc: 'صالح لأدوات الشواء ومآزر الآباء الفاخرة' },
    { code: 'EIDSPRING', discount: 'شحن مجاني مضاعف', desc: 'للطلبات أكثر من 1500 ج.م' },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="deals-modal-container">
      <div className="bg-[#fcfdfd] w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-x-2">
            <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-sm md:text-base font-extrabold text-white">عروض اليوم الحصرية وتخفيضات عافية</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/85 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area scrollable */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-right">
          
          {/* Urgent banner & Timer row */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-y-3">
            <div>
              <h3 className="text-sm font-black text-amber-900 flex items-center gap-x-1">
                ⚡ اقتنص الفرصة قبل النفاد!
              </h3>
              <p className="text-[11px] text-amber-700 font-bold mt-0.5">خصومات تصل إلى 40% كاش باك فوري على المنتجات المحددة.</p>
            </div>
            {/* Timer countdown display */}
            <div className="flex items-center gap-x-1.5 font-mono">
              <span className="text-[10px] font-sans font-bold text-gray-500 self-center ml-1">تنتهي عروض اليوم خلال:</span>
              <div className="bg-[#0d3230] text-[#e9be64] px-2.5 py-1.5 rounded font-black text-sm shadow">
                {formatNum(timeLeft.hours)}
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <div className="bg-[#0d3230] text-[#e9be64] px-2.5 py-1.5 rounded font-black text-sm shadow">
                {formatNum(timeLeft.minutes)}
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <div className="bg-[#0d3230] text-[#e9be64] px-2.5 py-1.5 rounded font-black text-sm shadow">
                {formatNum(timeLeft.seconds)}
              </div>
            </div>
          </div>

          {/* Promo Codes Sections */}
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2.5">قسائم الخصم الإضافية المتوفرة:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {promoCoupons.map((coupon) => (
                <div 
                  key={coupon.code} 
                  className="border border-dashed border-teal-200 bg-teal-50/30 p-3 rounded-lg flex items-center justify-between gap-x-2"
                >
                  <div className="text-right flex-1">
                    <p className="text-xs font-black text-teal-980">{coupon.code}</p>
                    <p className="text-[10px] font-black text-emerald-700 mt-0.5">{coupon.discount}</p>
                    <p className="text-[9px] text-gray-400 truncate max-w-[150px]">{coupon.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(coupon.code)}
                    className="p-1.5 rounded-md hover:bg-teal-100 bg-white border border-teal-200 transition-colors cursor-pointer shrink-0"
                    title="نسخ قسيمة الخصم"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-extrabold" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog products under deals */}
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3.5">المنتجات تحت التخفيض المباشر الآن:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discountedProducts.map((p) => {
                const savings = p.oldPrice ? p.oldPrice - p.price : 0;
                const savingsPercent = p.oldPrice ? Math.round((savings / p.oldPrice) * 100) : 0;
                
                return (
                  <div 
                    key={p.id} 
                    className="border border-gray-150 hover:border-teal-300 rounded-lg p-3.5 bg-white transition-all hover:shadow-md flex gap-x-3 text-right group relative"
                  >
                    {/* Badge discount */}
                    <div className="absolute top-2 right-2 bg-red-500 text-white font-black text-[9px] py-0.5 px-2.5 rounded-full flex items-center gap-x-0.5 shadow-sm">
                      <Percent className="w-2.5 h-2.5" /> وفر {savingsPercent}%
                    </div>

                    {/* Image Placeholder */}
                    <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-md shrink-0 flex items-center justify-center p-1">
                      <img
                        src={`https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=150&q=55`}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain rounded opacity-90 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta detail column */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title click */}
                        <h5 
                          onClick={() => {
                            onSelectProduct(p);
                            onClose();
                          }}
                          className="text-xs font-extrabold text-gray-800 line-clamp-2 hover:text-[#115e59] leading-tight cursor-pointer"
                        >
                          {p.title}
                        </h5>
                        <p className="text-[10px] text-gray-400 mt-1">{p.category}</p>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex items-end justify-between mt-2.5 border-t border-gray-50 pt-2">
                        <div>
                          <div className="flex items-baseline gap-x-1.5">
                            <span className="text-sm font-black text-[#115e59]">{p.price.toLocaleString('ar-EG')} ج.م</span>
                            <span className="text-[11px] text-gray-400 line-through">{p.oldPrice?.toLocaleString('ar-EG')} ج.م</span>
                          </div>
                          <p className="text-[9px] text-[#f08804] font-black">وفرنا لك {(savings).toLocaleString('ar-EG')} ج.م في الحال!</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddToCart(p, 1)}
                          className="bg-[#115e59] hover:bg-[#0d4f4b] text-white p-2 rounded-full cursor-pointer hover:scale-105 transition-transform shadow-sm border-0 flex items-center justify-center"
                          title="إضافة فورية لعربة التسوق"
                        >
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0">
          <p className="text-[10px] text-gray-400 font-bold">تطبق الشروط والأحكام الخاصة بالتخفيضات الكبرى لعام 2026.</p>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق نافذة العروض
          </button>
        </div>

      </div>
    </div>
  );
};
