import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, Globe, ChevronDown, User, FileText, Menu, Sparkles } from 'lucide-react';
import { CartItem, UserProfile } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenAIAssistant: () => void;
  selectedCity: string;
  onOpenCitySelector: () => void;
  onOpenOrdersModal: () => void;
  user: UserProfile;
  onOpenAuthModal: () => void;
  onOpenWishlistModal: (tab: 'favorites' | 'custom_lists') => void;
  onOpenAddressesModal: () => void;
  onOpenDealsModal: () => void;
  onOpenGiftCardsModal: () => void;
  onOpenSellModal: () => void;
  onOpenPrimeVideoModal: () => void;
  onOpenHistoryModal: () => void;
  onOpenCustomerServiceModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onSearch,
  onSelectCategory,
  onOpenAIAssistant,
  selectedCity,
  onOpenCitySelector,
  onOpenOrdersModal,
  user,
  onOpenAuthModal,
  onOpenWishlistModal,
  onOpenAddressesModal,
  onOpenDealsModal,
  onOpenGiftCardsModal,
  onOpenSellModal,
  onOpenPrimeVideoModal,
  onOpenHistoryModal,
  onOpenCustomerServiceModal,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedCat, setSelectedCat] = useState('الكل');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('afia_custom_logo');
    } catch {
      return null;
    }
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCat(val);
    onSelectCategory(val);
  };

  return (
    <header className="w-full text-white bg-[#131921] font-sans rtl" dir="rtl" id="afia-main-header">
      {/* Top Banner / Main Header row */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 gap-y-2 md:gap-x-4">
        
        {/* Right Section: Logo & Address */}
        <div className="flex items-center gap-x-4">
          {/* Custom brand logo: Wellness Afia Logo */}
          <div 
            className="flex items-center gap-x-2 cursor-pointer select-none group py-1 px-2.5 border border-transparent hover:border-white/20 rounded transition-all"
            onClick={() => {
              onSearch('');
              onSelectCategory('الكل');
              setSearchVal('');
              setSelectedCat('الكل');
            }}
            id="afia-logo-container"
          >
            <div className="relative group/logo w-7 h-7 rounded-sm bg-gradient-to-br from-[#e47911] to-[#febd69] flex items-center justify-center text-white shadow-md overflow-hidden shrink-0">
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="شعار مخصص" 
                  className="w-full h-full object-cover rounded-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              )}
              
              {/* Camera upload badge overlay on hover */}
              <label 
                className="absolute inset-0 bg-black/70 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-10"
                onClick={(e) => e.stopPropagation()}
                title="اضغط لتغيير شعار المتجر بملف من جهازك"
              >
                <span className="text-[10px] text-white">📷</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          const base64 = event.target.result as string;
                          try {
                            localStorage.setItem('afia_custom_logo', base64);
                            setCustomLogo(base64);
                          } catch (err) {
                            alert("عذراً، حجم الصورة كبير جداً لهذا المتصفح. يرجى اختيار صورة أصغر.");
                          }
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-black tracking-tight text-white font-sans flex items-center gap-x-1">
                Afia Store
                {customLogo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        localStorage.removeItem('afia_custom_logo');
                      } catch {}
                      setCustomLogo(null);
                    }}
                    className="text-[9px] bg-red-600/90 hover:bg-red-600 text-white border-0 rounded px-1 py-0.5 cursor-pointer font-bold leading-none select-all transition-colors"
                    title="استعادة الشعار الافتراضي للمتجر"
                  >
                    إعادة
                  </button>
                )}
              </span>
              <span className="text-[9px] font-bold text-[#febd69] tracking-widest uppercase -mt-1 font-sans">
                {customLogo ? 'شعارك المخصص 🖼️' : 'عافية ستور'}
              </span>
            </div>
          </div>

          {/* Deliver to Egypt Widget */}
          <div 
            className="hidden sm:flex items-center gap-x-1 cursor-pointer py-1.5 px-2.5 border border-transparent hover:border-white/20 rounded transition-all duration-155"
            onClick={onOpenCitySelector}
            id="afia-delivery-widget"
          >
            <MapPin className="w-5 h-5 text-amber-200 mt-2" />
            <div className="flex flex-col text-right">
              <span className="text-[11px] text-gray-300 leading-3 font-normal">توصيل إلى</span>
              <span className="text-sm font-bold leading-4 tracking-tight text-white flex items-center gap-x-0.5">
                {selectedCity} <ChevronDown className="w-3 h-3 text-amber-200" />
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex flex-1 min-w-[280px] max-w-3xl h-10 bg-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f3a847] border-0"
          id="afia-search-form"
        >
          {/* Dropdown on the right end of search bar */}
          <div className="relative bg-gray-100 hover:bg-gray-200 border-l border-gray-150 px-3 flex items-center cursor-pointer text-gray-750 h-full">
            <select 
              value={selectedCat} 
              onChange={handleCategoryChange}
              className="bg-transparent text-xs font-bold text-gray-700 cursor-pointer pr-4 pl-1 outline-none appearance-none h-full w-full py-2"
              style={{ direction: 'rtl' }}
            >
              <option value="الكل">الكل</option>
              <option value="أجهزة الكمبيوتر وملحقاتها">كمبيوتر وملحقاته</option>
              <option value="ألعاب الفيديو">ألعاب فيديو</option>
              <option value="الأطفال">الأطفال</option>
              <option value="إكسسوارات الألعاب">إكسسوارات الألعاب</option>
              <option value="ألعاب أطفال من فائض تخزين المصانع">ألعاب الفائض</option>
              <option value="الأدوات الضرورية للشواء للآباء">أدوات الشواء</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-600 absolute left-2 pointer-events-none" />
          </div>

          {/* Main search text input */}
          <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder={`بحث في Afia`}
            className="flex-1 px-3 text-sm text-black border-none outline-none text-right bg-white w-full"
            dir="rtl"
          />

          {/* Soothing green Search Magnifying key on the left end */}
          <button 
            type="submit" 
            className="bg-[#f0c14b] hover:bg-[#ebd07f] px-6 text-gray-900 flex items-center justify-center cursor-pointer transition-colors duration-150 h-full border-0"
            id="afia-search-button"
          >
            <Search className="w-5 h-5 text-gray-900 stroke-[2.5px]" />
          </button>
        </form>

        {/* Left Section: Language, Orders, Cart, Smart AI Assistant */}
        <div className="flex items-center gap-x-2 md:gap-x-4">
          
          {/* AI Assistant Button (Glows with a premium soothing mint/teal vibe) */}
          <div 
            className="flex items-center gap-x-1.5 cursor-pointer py-1 px-2.5 bg-[#232f3e] hover:bg-[#2e3e52] border border-gray-600/35 rounded-md transition-all duration-150 animate-pulse"
            onClick={onOpenAIAssistant}
            title="مساعد عافية الذكي بالذكاء الاصطناعي"
            id="afia-ai-assistant-btn"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden lg:inline text-xs font-extrabold text-amber-100">مساعد عافية الذكي</span>
            <span className="inline lg:hidden text-xs font-bold text-amber-100">مُساعد عافية</span>
          </div>

          {/* Language Flag Selector */}
          <div className="hidden md:flex items-center gap-x-1 cursor-pointer py-2 px-2.5 border border-transparent hover:border-white/20 rounded text-xs font-bold leading-3">
            <span className="text-sm">🇪🇬</span>
            <span>AR</span>
            <ChevronDown className="w-3 h-3 text-gray-300" />
          </div>

          {/* Accounts & Lists */}
          <div 
            className="relative cursor-pointer py-1 px-2 border border-transparent hover:border-white/20 rounded text-right transition-all duration-155 select-none"
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
            onClick={onOpenAuthModal}
            id="afia-account-trigger"
          >
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-350 leading-3 font-normal truncate max-w-[120px]">
                {user.isLoggedIn ? `مرحباً، ${user.name}` : 'مرحباً، تسجيل الدخول'}
              </span>
              <span className="text-xs md:text-sm font-bold leading-4 tracking-tight flex items-center gap-x-0.5">
                الحساب والقوائم <ChevronDown className="w-3 h-3 text-white" />
              </span>
            </div>

            {/* Account mini dropdown markup */}
            {showAccountDropdown && (
              <div 
                className="absolute left-0 mt-1 w-52 bg-white text-gray-800 rounded shadow-xl z-50 p-4 border border-gray-100 transition-all duration-200 text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={onOpenAuthModal}
                  className="w-full bg-[#f0c14b] hover:bg-[#ebd07f] border border-[#a88734] text-gray-900 font-bold py-1.5 px-3 rounded text-xs text-center cursor-pointer shadow-xs mb-3"
                >
                  {user.isLoggedIn ? 'إدارة حساب عافية' : 'تسجيل الدخول الآمن'}
                </button>
                <div className="border-t border-gray-100 pt-2 text-xs space-y-2">
                  <p className="font-extrabold text-gray-905 border-b border-gray-50 pb-1">قائمتك</p>
                  <p className="hover:text-[#c45500] hover:underline cursor-pointer" onClick={() => { onOpenWishlistModal('custom_lists'); setShowAccountDropdown(false); }}>إنشاء قوائم التسوق</p>
                  <p className="hover:text-[#c45500] hover:underline cursor-pointer" onClick={() => { onOpenWishlistModal('favorites'); setShowAccountDropdown(false); }}>عرض مفضلاتي</p>
                  <p className="font-extrabold text-gray-905 border-b border-gray-50 pt-1 pb-1">حسابك الشخصي</p>
                  <p className="hover:text-[#c45500] hover:underline cursor-pointer" onClick={() => { onOpenOrdersModal(); setShowAccountDropdown(false); }}>مشترياتي وطلباتي</p>
                  <p className="hover:text-[#c45500] hover:underline cursor-pointer" onClick={() => { onOpenAddressesModal(); setShowAccountDropdown(false); }}>إدارة العناوين</p>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <div 
            className="cursor-pointer py-1 px-2 border border-transparent hover:border-white/20 rounded text-right transition-all"
            onClick={onOpenOrdersModal}
            id="afia-orders-btn"
          >
            <span className="text-[11px] text-gray-350 leading-3 font-normal block">المرجعات</span>
            <span className="text-xs md:text-sm font-bold leading-4 block">والمشتريات</span>
          </div>

          {/* Interactive Cart Widget */}
          <div 
            className="flex items-center gap-x-1 cursor-pointer py-1.5 px-2 border border-transparent hover:border-white/20 rounded text-white relative transition-all"
            onClick={onOpenCart}
            id="afia-cart-btn"
          >
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white stroke-[1.8px]" />
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#f0c14b] text-xs font-black px-1.5 py-0.5 rounded-full text-gray-900 leading-none border-2 border-[#131921] min-w-[20px] text-center">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-black self-end mb-1">العربة</span>
          </div>

        </div>
      </div>

      {/* Sub header navigation links bar */}
      <div className="w-full bg-[#232f3e] flex items-center justify-between px-4 py-1.5 text-xs text-gray-100">
        <div className="flex items-center gap-x-3 overflow-x-auto whitespace-nowrap scrollbar-none">
          {/* Hamburger All list link */}
          <button 
            onClick={() => onSelectCategory('الكل')}
            className="flex items-center gap-x-1 hover:text-white font-extrabold cursor-pointer border-0 bg-transparent py-1 px-1.5 hover:ring-1 hover:ring-white rounded"
          >
            <Menu className="w-4 h-4" />
            <span>الكل</span>
          </button>
          
          <button 
            onClick={onOpenDealsModal}
            className="hover:text-white font-semibold py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            عروض اليوم
          </button>
          <button 
            onClick={onOpenGiftCardsModal}
            className="hover:text-white py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            بطاقات الهدايا
          </button>
          <button 
            onClick={onOpenSellModal}
            className="hover:text-white py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            ابدأ البيع عبر عافية
          </button>
          <button 
            onClick={onOpenPrimeVideoModal}
            className="hover:text-white py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            برايم فيديو
          </button>
          <button 
            onClick={onOpenHistoryModal}
            className="hover:text-white py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            السجل
          </button>
          <button 
            onClick={onOpenCustomerServiceModal}
            className="hover:text-white py-1 px-1.5 hover:ring-1 hover:ring-white rounded bg-transparent border-0 cursor-pointer"
          >
            خدمة العملاء
          </button>
        </div>
        <div className="hidden md:block py-1 pr-4 font-black text-[#febd69]">
          عافية بلا حدود - تسوق آمن بأفضل الأسعار الموثوقة 🌟
        </div>
      </div>
    </header>
  );
};
