import React, { useState } from 'react';
import { X, MapPin, Plus, Trash2, Check, CheckCircle2, Navigation } from 'lucide-react';
import { SavedAddress } from '../types';

interface AddressesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedAddresses: SavedAddress[];
  onAddAddress: (address: Omit<SavedAddress, 'id'>) => void;
  onDeleteAddress: (id: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const AddressesModal: React.FC<AddressesModalProps> = ({
  isOpen,
  onClose,
  savedAddresses,
  onAddAddress,
  onDeleteAddress,
  selectedCity,
  onSelectCity,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [label, setLabel] = useState('المنزل');
  const [customLabel, setCustomLabel] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [city, setCity] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setError('يرجى كتابة اسم المستلم بالكامل.');
      return;
    }
    if (!address.trim() || address.length < 8) {
      setError('يرجى وصف العنوان بالتفصيل (الشارع، البنك، رقم المبنى).');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('يرجى كتابة رقم هاتف مصري صحيح للتوصيل.');
      return;
    }

    const finalLabel = label === 'أخرى' && customLabel.trim() ? customLabel.trim() : label;

    onAddAddress({
      label: finalLabel,
      recipientName: recipientName.trim(),
      city,
      address: address.trim(),
      phone: phone.trim(),
    });

    // Reset Form
    setIsAddingNew(false);
    setRecipientName('');
    setAddress('');
    setPhone('');
    setCustomLabel('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl">
      <div 
        className="bg-[#fcfdfd] w-[95%] max-w-xl rounded-lg shadow-2xl overflow-hidden relative max-h-[88vh] flex flex-col border border-gray-150 animate-fade-in"
        id="addresses-modal-card"
      >
        {/* Top Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150">
          <div className="flex items-center gap-x-2">
            <MapPin className="w-5 h-5 text-[#e9be64]" />
            <span className="text-sm md:text-base font-extrabold text-white">إدارة عناوين التوصيل اللوجستية شحن عافية</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 flex flex-col min-h-0 bg-white">
          {isAddingNew ? (
            /* ADD NEW ADDRESS FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-gray-150 pb-2 flex items-center justify-between">
                <h4 className="text-xs font-black text-gray-800 flex items-center gap-x-1">
                  <Navigation className="w-4 h-4 text-[#0d9488]" /> إضافة عنوان شحن مفصل جديد
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs font-bold text-[#0d9488] hover:underline bg-transparent border-0 cursor-pointer"
                >
                  العودة للعناوين المحفوظة
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs py-1.5 px-3 rounded text-right font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Title label segment selector */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">تصنيف العنوان</label>
                <div className="flex gap-x-2">
                  {['المنزل', 'العمل', 'أخرى'].map((lbl) => {
                    const isSelected = label === lbl;
                    return (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => setLabel(lbl)}
                        className={`flex-1 py-1.5 px-3 rounded text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-teal-300 text-teal-900 font-extrabold'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {lbl}
                      </button>
                    );
                  })}
                </div>
                {label === 'أخرى' && (
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="امثلة: بيت العيلة، الشاليه بالساحل الشمالي..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white mt-1.5"
                    required
                  />
                )}
              </div>

              {/* Recipient Name Field */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">اسم المستلم بالكامل</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="الرجاء كتابة الاسم الحقيقي لسلامة تسليم المندوب"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>

              {/* Governorate Selector Dropdown */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">المحافظة / المدينة</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs outline-none focus:border-teal-500 cursor-pointer bg-white"
                >
                  {[
                    'القاهرة',
                    'الجيزة',
                    'الإسكندرية',
                    'القليوبية',
                    'الدقهلية',
                    'الشرقية',
                    'الغربية',
                    'المنوفية',
                    'البحيرة',
                    'كفر الشيخ',
                    'دمياط',
                    'بورسعيد',
                    'الإسماعيلية',
                    'السويس',
                    'شمال سيناء',
                    'جنوب سيناء',
                    'البحر الأحمر',
                    'مطروح',
                    'الوادي الجديد',
                    'الفيوم',
                    'بني سويف',
                    'المنيا',
                    'أسيوط',
                    'سوهاج',
                    'قنا',
                    'الأقصر',
                    'أسوان'
                  ].map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Address detail text description */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">العنوان بالتفصيل المُميز</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="رقم الشارع، رقم العمارة، الطابق، بجوار علامة مميزة كبرى..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">رقم هاتف الاتصال للمندوب</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 01023456789"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white text-left"
                  dir="ltr"
                  required
                />
              </div>

              {/* Buttons row */}
              <div className="pt-2 flex items-center gap-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded text-xs cursor-pointer border-0"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold py-2.5 px-4 rounded text-xs cursor-pointer border-0 shadow flex items-center justify-center gap-x-1"
                >
                  حفظ العنوان الجديد ✔️
                </button>
              </div>
            </form>
          ) : (
            /* SAVED ADDRESSES ARRAY DISPLAY */
            <div className="flex-1 flex flex-col min-h-0 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-150 pb-2 shrink-0">
                <span className="text-xs font-black text-gray-800">العناوين المسجلة حالياً ({savedAddresses.length})</span>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-[10px] font-black py-1 px-3 rounded-md cursor-pointer border-0 shadow-xs flex items-center gap-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> إضافة عنوان جديد
                </button>
              </div>

              {savedAddresses.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-3">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800">لا يوجد عناوين مسجلة حالياً</p>
                    <p className="text-xs text-gray-400">انقر فوق "إضافة عنوان جديد" بالأعلى لشحن الأغراض المشتراة لجهات متعددة.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-4">
                  {savedAddresses.map((addr) => {
                    const isSelected = selectedCity === addr.city;
                    return (
                      <div 
                        key={addr.id}
                        onClick={() => {
                          onSelectCity(addr.city);
                        }}
                        className={`border rounded-lg p-3.5 text-right transition-all cursor-pointer relative group flex items-start gap-x-3.5 ${
                          isSelected 
                            ? 'bg-teal-50/50 border-teal-300 text-teal-900 shadow-xs ring-1 ring-teal-300' 
                            : 'bg-white border-gray-200 text-gray-700 hover:border-teal-200 hover:bg-teal-50/10'
                        }`}
                      >
                        {/* Selector check check mark */}
                        <div className="pt-0.5 shrink-0">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected 
                              ? 'bg-[#0d9488] border-[#0d9488] text-white' 
                              : 'border-gray-300 text-transparent'
                          }`}>
                            <Check className="w-3 h-3 stroke-[3px]" />
                          </div>
                        </div>

                        {/* Text fields of address */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-x-2 animate-fade-in">
                            <span className="text-xs font-black text-gray-950 bg-gray-100 border px-1.5 py-0.5 rounded-sm">
                              {addr.label}
                            </span>
                            <span className="text-xs font-extrabold text-gray-900">
                              مستلم الشحنة: {addr.recipientName}
                            </span>
                            {isSelected && (
                              <span className="text-[9px] font-black text-[#0d9488] shrink-0 bg-white border border-teal-400 px-1.5 py-0.5 rounded-full animate-pulse">
                                موقع التسليم النشط حالياً 📌
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs leading-normal text-gray-550 break-words">
                            العنوان: {addr.address}، {addr.city}، مصر 🇪🇬
                          </p>
                          <p className="text-[10px] text-gray-400 font-mono" dir="ltr">
                            📞 {addr.phone}
                          </p>
                        </div>

                        {/* Delete action button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteAddress(addr.id);
                          }}
                          className="text-gray-400 hover:text-red-500 bg-transparent border-0 cursor-pointer p-1 absolute top-2 left-2 shrink-0 opacity-80 group-hover:opacity-100 transition-all duration-100"
                          title="حذف هذا العنوان"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
          <span>شحنات عافية مؤمنة ضد الضياع بالتعاون مع بريد مصر 🇪🇬</span>
          <button 
            onClick={onClose}
            className="bg-[#115e59] hover:bg-[#0d4f4b] text-white font-bold py-1 px-4 rounded-sm cursor-pointer border-0"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
