import React, { useState, useEffect } from 'react';
import { X, History, Trash2, Eye, Search, ShieldCheck, RefreshCw, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  showToast: (msg: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  showToast,
}) => {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load history variables on isOpen
  useEffect(() => {
    if (!isOpen) return;
    
    // Load recently viewed
    const savedViewed = localStorage.getItem('afia_recently_viewed');
    if (savedViewed) {
      try {
        setRecentlyViewedIds(JSON.parse(savedViewed));
      } catch (err) {
        setRecentlyViewedIds([]);
      }
    }

    // Load search queries
    const savedSearches = localStorage.getItem('afia_search_history');
    if (savedSearches) {
      try {
        setSearchHistory(JSON.parse(savedSearches));
      } catch (err) {
        setSearchHistory([]);
      }
    } else {
      const initialSearches = ['ألعاب تفاعلية', 'إكسسوارات الألعاب', 'أدوات الشواء للآباء', 'تخفيضات العيد'];
      localStorage.setItem('afia_search_history', JSON.stringify(initialSearches));
      setSearchHistory(initialSearches);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Derive products from the viewed ID list
  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  const handleClearBrowsingHistory = () => {
    localStorage.removeItem('afia_recently_viewed');
    setRecentlyViewedIds([]);
    showToast('🧹 تم مسح سجل تصفح المنتجات بالكامل لأسباب الأمان والخصوصية.');
  };

  const handleClearSearches = () => {
    localStorage.removeItem('afia_search_history');
    setSearchHistory([]);
    showToast('🧹 تم مسح تاريخ وسجل عمليات البحث بنجاح.');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="history-modal-wrapper">
      <div className="bg-[#fcfdfd] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header banner */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-x-2">
            <History className="w-5 h-5 text-[#e9be64] animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-sm md:text-base font-extrabold text-white">سجل الزيارات والنشاط ومستودع الخصوصية والبيانات</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll body */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-right">
          
          {/* Privacy awareness card */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3.5 flex items-center justify-between gap-x-3 text-right">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-teal-980 flex items-center gap-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> ميزة حماية خصوصية بيانات عملاء عافية:
              </h4>
              <p className="text-[10px] text-teal-800 leading-relaxed font-semibold">
                بيان الخصوصية: كل سجل التصفح والبحث الخاص بك يتم معالجته وحفظه داخل قرص متصفحك الصلب المحلي فقط. نحن لا نحفظ نشاطك على خوادم خارجية حفاظاً التام على الخصوصية.
              </p>
            </div>
          </div>

          {/* Recently Viewed Products */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-x-1">
                <Eye className="w-4 h-4 text-[#0d9488]" /> المنتجات التي قمت بمعاينتها مؤخراً ({recentlyViewedProducts.length}):
              </h4>
              {recentlyViewedProducts.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearBrowsingHistory}
                  className="bg-transparent border-0 text-red-650 hover:text-red-700 font-bold text-[10px] flex items-center gap-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> مسح سجل المعاينة
                </button>
              )}
            </div>

            {recentlyViewedProducts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 border border-dashed rounded-lg space-y-1.5">
                <p className="text-xs text-gray-500 font-extrabold">السجل العام فارغ تماماً.</p>
                <p className="text-[10px] text-gray-400">بمجرد تصفح وفتح صندوق تفاصيل أي منتج على المتجر، سيظهر هنا تلقائياً لسهولة العودة.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentlyViewedProducts.map((p) => (
                  <div 
                    key={p.id}
                    className="border border-gray-150 rounded-lg p-3 bg-white hover:border-teal-300 transition-all flex items-center gap-x-3 text-right relative group"
                  >
                    <div className="w-12 h-12 bg-gray-50 border rounded shrink-0 flex items-center justify-center p-0.5">
                      <img 
                        src={`https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=100&q=55`} 
                        alt={p.title} 
                        className="max-h-full max-w-full object-contain rounded opacity-90 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h5 
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="text-[11px] font-black text-gray-800 truncate line-clamp-1 hover:text-[#115e59] cursor-pointer"
                      >
                        {p.title}
                      </h5>
                      <span className="text-[9px] text-[#115e59] font-bold block mt-0.5">{p.price.toLocaleString('ar-EG')} ج.م</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(p, 1)}
                      className="bg-[#000000]/5 hover:bg-[#115e59]/10 text-[#115e59] p-1.5 rounded-full cursor-pointer shrink-0 transition-colors border-0 flex items-center justify-center ml-1"
                      title="إضافة سريعة للعربة"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Queries History */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-x-1">
                <Search className="w-4 h-4 text-[#0d9488]" /> عمليات البحث وكلمات الاستعراض الأخيرة:
              </h4>
              {searchHistory.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSearches}
                  className="bg-transparent border-0 text-red-650 hover:text-red-700 font-bold text-[10px] flex items-center gap-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> مسح سجل البحث الكلي
                </button>
              )}
            </div>

            {searchHistory.length === 0 ? (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-[10px] text-gray-450 font-black">لا توجد كلمات بحث مسجلة حالياً.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {searchHistory.map((query, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-x-1 bg-gray-100 border border-gray-150 hover:bg-teal-50 hover:text-teal-950 px-2.5 py-1 rounded text-[10px] text-gray-600 font-bold transition-all"
                  >
                    🔍 {query}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0 text-[10px] text-gray-450">
          <span>تم التحديث تلقائياً • متوافق مع لوائح الأمان المصرية لحماية الخصوصية الرقمية.</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-750 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق لوحة النشاط
          </button>
        </div>

      </div>
    </div>
  );
};
