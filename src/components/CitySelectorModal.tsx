import React from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  const egyptCities = [
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
  ];

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="city-selector-backdrop">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 animate-fade-in" id="city-selector-card">
        
        {/* Header */}
        <div className="bg-[#154e4b] text-white px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-black flex items-center gap-x-1.5 text-white">
            <MapPin className="w-4 h-4 text-[#e9be64]" /> اختر موقع التسليم لخدمة عافية (جميع محافظات مصر)
          </span>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 hover:bg-white/10 rounded-full border-0 bg-transparent cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cities grid */}
        <div className="p-4 space-y-3">
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed text-right">
            حدد المحافظة أو المدينة لتحديث توفر السلع المتاحة وسرعة شحنها لباب منزلك:
          </p>

          <div className="max-h-[300px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-right">
              {egyptCities.map((city) => {
                const isSelected = city === selectedCity;
                return (
                  <button
                    key={city}
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded text-[11px] font-bold transition-all border cursor-pointer ${
                      isSelected 
                        ? 'bg-teal-50 border-teal-400 text-teal-900 shadow-xs' 
                        : 'bg-gray-50 hover:bg-gray-105 border-gray-200 text-gray-805'
                    }`}
                  >
                    <span>{city}</span>
                    {isSelected && <Check className="w-3 h-3 text-teal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 text-[10px] text-gray-450 text-center font-medium leading-normal">
            * توصيل عافية يغطي جميع المراكز والقرى المجاورة للمحافظات المختارة شحناً وتأميناً مع برمجيات تتبع الشحنات المبرمة.
          </div>
        </div>

      </div>
    </div>
  );
};
